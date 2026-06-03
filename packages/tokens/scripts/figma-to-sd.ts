/**
 * figma-to-sd.ts
 *
 * Transforms a Figma variables JSON export into Style Dictionary token files.
 *
 * Usage:
 *   tsx scripts/figma-to-sd.ts [path/to/figma-export.json]
 *
 * Defaults to reading from figma/ads3_variables.json.
 * Writes token files to tokens/*.json which Style Dictionary then processes.
 *
 * Figma collections handled:
 *   Base             → tokens/base.json          (primitive colors + radius)
 *   Color / Dark     → tokens/color-dark.json    (semantic colors)
 *   Spacing          → tokens/spacing.json
 *   Radius           → tokens/radius.json        (semantic radius aliases)
 *   Type scale       → tokens/type-scale.json
 *   Font family      → tokens/font-family.json
 *   Type weight      → tokens/type-weight.json
 *   Typography / Cozy    → tokens/typography-cozy.json
 *   Typography / Compact → tokens/typography-compact.json
 *   Breakpoint       → tokens/breakpoint.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT, 'tokens');
const INPUT = process.argv[2] ?? path.join(ROOT, 'figma', 'ads3_variables.json');

// ─── Types ────────────────────────────────────────────────────────────────────

type FigmaLeaf = {
  $type: string;
  $value: unknown;
  $scopes?: string[];
  $hiddenFromPublishing?: boolean;
};

type FigmaNode = FigmaLeaf | { [key: string]: FigmaNode };
type FigmaCollection = { modes: Record<string, Record<string, FigmaNode>> };
type FigmaExport = Array<Record<string, FigmaCollection>>;
type SDToken = { $type: string; $value: unknown };
type SDGroup = { [key: string]: SDToken | SDGroup };

// ─── New-format types (Figma plugin export v2) ────────────────────────────────

type NewVarEntry = {
  name: string;
  token: string;
  type: string;
  value: unknown;
  values: Record<string, unknown>;
};

type NewCollection = {
  id?: string;
  modes: Array<{ id: string; name: string }>;
  variables: Record<string, NewVarEntry[]>;
};

type StylesPropRef = { variable: string };
type StylesTextEntry = {
  fontFamily?: StylesPropRef | string;
  fontStyle?: string;
  fontSize?: StylesPropRef | number;
  lineHeight?: StylesPropRef | number;
  letterSpacing?: StylesPropRef | number;
  paragraphSpacing?: number;
  paragraphIndent?: number;
};

type NewJsonFormat = {
  collections: Record<string, NewCollection>;
  styles: {
    text?: Record<string, StylesTextEntry>;
    effects?: Record<string, unknown>;
  };
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SUBSCRIPT: Record<string, string> = {
  '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
  '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
};

/** "y₁ (14px)"  →  "y1" */
function normalizeKey(s: string): string {
  return s
    .replace(/[₀-₉]/g, c => SUBSCRIPT[c] ?? c)
    .replace(/\s*\(.*?\)\s*/g, '')
    .trim();
}

function isLeaf(node: FigmaNode): node is FigmaLeaf {
  return typeof node === 'object' && node !== null && '$type' in node;
}

/**
 * Rewrite Figma alias paths to match our Style Dictionary token structure.
 */
function rewriteRef(value: string): string {
  if (!value.startsWith('{')) return value;
  const inner = value.slice(1, -1);

  if (/^y[₀-₉]/.test(inner)) {
    return `{typeScale.${normalizeKey(inner)}}`;
  }
  if (inner === 'Normal') return '{fontFamily.normal}';
  if (inner === 'Mono') return '{fontFamily.mono}';
  if (inner.startsWith('Normal.')) {
    const weightNum = inner.split('.')[1].split(' ')[0];
    return `{typeWeight.${weightNum}}`;
  }
  if (inner === 'Transparent') return 'rgba(0, 0, 0, 0)';
  return value;
}

/** Recursively walk a Figma group and produce a Style Dictionary token tree. */
function transform(
  node: FigmaNode,
  keyFn: (k: string) => string = k => k,
): SDGroup | SDToken {
  if (isLeaf(node)) {
    const raw = node.$value;
    const value = typeof raw === 'string' ? rewriteRef(raw) : raw;
    const type = node.$type === 'float' ? 'number' : node.$type;
    return { $type: type, $value: value } satisfies SDToken;
  }
  const out: SDGroup = {};
  for (const [k, v] of Object.entries(node)) {
    out[keyFn(k)] = transform(v, keyFn) as SDGroup | SDToken;
  }
  return out;
}

// ─── New-format normalizer ────────────────────────────────────────────────────

/** Compute the Style Dictionary path for a token given its collection context. */
function computeSdPath(varEntry: NewVarEntry, collectionName: string): string {
  if (collectionName === 'Type scale') {
    return `typeScale.${normalizeKey(varEntry.name)}`;
  }
  if (collectionName === 'Font family') {
    return `fontFamily.${varEntry.name.toLowerCase()}`;
  }
  if (collectionName === 'Type weight') {
    const parts = varEntry.name.split('/');
    if (parts.length >= 2) {
      const num = parts[1].split(' ')[0];
      return `typeWeight.${num}`;
    }
    return `typeWeight.${varEntry.name}`;
  }
  const cleanName = varEntry.name.replace(/ float$/, '').replace(/ string$/, '');
  return cleanName.replace(/\//g, '.');
}

/** Build a map of token-name → SD alias path for all variables. */
function buildTokenSdPathMap(input: NewJsonFormat): Map<string, string> {
  const map = new Map<string, string>();
  for (const [collectionName, collection] of Object.entries(input.collections)) {
    const allVars: NewVarEntry[] = [
      ...(collection.variables.colors ?? []),
      ...(collection.variables.numbers ?? []),
      ...(collection.variables.strings ?? []),
    ];
    for (const varEntry of allVars) {
      map.set(varEntry.token, computeSdPath(varEntry, collectionName));
    }
  }
  return map;
}

/** Convert a { hex, alpha } color object to an rgba() string. */
function hexAlphaToRgba(color: { hex: string; alpha: number }): string {
  const hex = color.hex.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${color.alpha})`;
}

/** Resolve a raw variable value, converting $ref objects to {alias} strings
 *  and { hex, alpha } objects to rgba() strings. */
function resolveRef(rawValue: unknown, tokenSdPathMap: Map<string, string>): unknown {
  if (rawValue !== null && typeof rawValue === 'object') {
    const obj = rawValue as Record<string, unknown>;
    if ('$ref' in obj) {
      const ref = obj.$ref as string;
      const sdPath = tokenSdPathMap.get(ref);
      // If unresolvable, emit as a dot-path alias (SD will warn but won't emit [object Object])
      return `{${sdPath ?? ref.replace(/-/g, '.')}}`;
    }
    if ('hex' in obj && 'alpha' in obj) {
      return hexAlphaToRgba(obj as { hex: string; alpha: number });
    }
  }
  return rawValue;
}

/** Recursively set a value at a nested path, building intermediate objects as needed. */
function setNestedPath(
  obj: Record<string, FigmaNode>,
  parts: string[],
  leaf: FigmaLeaf,
): void {
  let current: Record<string, FigmaNode> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || isLeaf(current[part])) {
      current[part] = {} as Record<string, FigmaNode>;
    }
    current = current[part] as Record<string, FigmaNode>;
  }
  current[parts[parts.length - 1]] = leaf;
}

/**
 * Convert the new Figma plugin export format (v2) into the legacy FigmaExport
 * array format that the rest of the pipeline expects.
 */
function normalizeNewFormat(input: NewJsonFormat): FigmaExport {
  const tokenSdPathMap = buildTokenSdPathMap(input);
  const result: FigmaExport = [];

  for (const [collectionName, collection] of Object.entries(input.collections)) {
    const modeMap: Record<string, Record<string, FigmaNode>> = {};

    for (const modeEntry of collection.modes) {
      const modeData: Record<string, FigmaNode> = {};

      const allVars: NewVarEntry[] = [
        ...(collection.variables.colors ?? []),
        ...(collection.variables.numbers ?? []),
        ...(collection.variables.strings ?? []),
      ];

      for (const varEntry of allVars) {
        const rawValue = varEntry.values[modeEntry.name];
        if (rawValue === undefined) continue;

        const type = varEntry.type === 'float' ? 'number' : varEntry.type;
        const value = resolveRef(rawValue, tokenSdPathMap);
        const leaf: FigmaLeaf = { $type: type, $value: value };

        // Strip type suffixes and build nested path from slash-delimited name
        const cleanName = varEntry.name.replace(/ float$/, '').replace(/ string$/, '');
        const parts = cleanName.split('/');
        setNestedPath(modeData, parts, leaf);
      }

      modeMap[modeEntry.name] = modeData;
    }

    result.push({ [collectionName]: { modes: modeMap } });
  }

  return result;
}

// ─── Load & normalize input ───────────────────────────────────────────────────

if (!fs.existsSync(INPUT)) {
  console.error(`❌  Figma export not found at: ${INPUT}`);
  console.error(`    Drop your Figma variables export into packages/tokens/figma/ and re-run.`);
  process.exit(1);
}

const inputJson = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

// Detect format: new format has a top-level "collections" object; old format is an array.
const isNewFormat = !Array.isArray(inputJson) && 'collections' in inputJson;
const raw: FigmaExport = isNewFormat ? normalizeNewFormat(inputJson as NewJsonFormat) : inputJson;
const newFormatInput: NewJsonFormat | null = isNewFormat ? (inputJson as NewJsonFormat) : null;

const PREV = INPUT.replace('.json', '.prev.json');

// ─── Helpers that operate on the normalized FigmaExport ──────────────────────

function getCollection(name: string): FigmaCollection | undefined {
  const item = raw.find(i => name in i);
  return item ? item[name] : undefined;
}

function mode(collection: FigmaCollection, modeName: string) {
  const m = collection.modes[modeName];
  if (!m) throw new Error(`Mode "${modeName}" not found`);
  return m;
}

// ─── Raw diff: new export vs previous export ──────────────────────────────────

const prevRaw: FigmaExport = fs.existsSync(PREV)
  ? (() => {
      const p = JSON.parse(fs.readFileSync(PREV, 'utf-8'));
      return !Array.isArray(p) && 'collections' in p ? normalizeNewFormat(p as NewJsonFormat) : p;
    })()
  : [];

const diff = diffRaw(flattenExport(prevRaw), flattenExport(raw));
printDiff(diff);

// ─── Write helpers ────────────────────────────────────────────────────────────

fs.mkdirSync(TOKENS_DIR, { recursive: true });

function write(filename: string, tokens: SDGroup) {
  const out = path.join(TOKENS_DIR, filename);
  fs.writeFileSync(out, JSON.stringify(tokens, null, 2), 'utf-8');
  console.log(`  ✓  ${filename}`);
}

function countLeaves(obj: SDGroup | SDToken): number {
  if ('$type' in obj) return 1;
  return Object.values(obj).reduce(
    (acc, v) => acc + countLeaves(v as SDGroup | SDToken),
    0,
  );
}

// ─── Raw Figma diff ───────────────────────────────────────────────────────────

type FlatRaw = Record<string, unknown>;

function flattenFigmaNode(node: FigmaNode, prefix = ''): FlatRaw {
  if (isLeaf(node)) return { [prefix]: node.$value };
  const out: FlatRaw = {};
  for (const [k, v] of Object.entries(node as Record<string, FigmaNode>)) {
    const key = prefix ? `${prefix}.${k}` : k;
    Object.assign(out, flattenFigmaNode(v, key));
  }
  return out;
}

/** Flatten every collection/mode in a full Figma export into one map. */
function flattenExport(export_: FigmaExport): FlatRaw {
  const out: FlatRaw = {};
  for (const item of export_) {
    for (const [collectionName, collection] of Object.entries(item)) {
      for (const [modeName, modeData] of Object.entries(collection.modes)) {
        const prefix = `${collectionName}/${modeName}`;
        for (const [group, tokens] of Object.entries(modeData)) {
          Object.assign(out, flattenFigmaNode(tokens as FigmaNode, `${prefix}/${group}`));
        }
      }
    }
  }
  return out;
}

type Diff = {
  added:   Array<{ key: string; value: unknown }>;
  removed: Array<{ key: string; value: unknown }>;
  changed: Array<{ key: string; from: unknown; to: unknown }>;
};

function diffRaw(prev: FlatRaw, next: FlatRaw): Diff {
  const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)]);
  const added:   Diff['added']   = [];
  const removed: Diff['removed'] = [];
  const changed: Diff['changed'] = [];

  for (const key of allKeys) {
    const inPrev = key in prev;
    const inNext = key in next;
    if (!inPrev) added.push({ key, value: next[key] });
    else if (!inNext) removed.push({ key, value: prev[key] });
    else if (JSON.stringify(prev[key]) !== JSON.stringify(next[key]))
      changed.push({ key, from: prev[key], to: next[key] });
  }
  return { added, removed, changed };
}

function printDiff(diff: Diff) {
  const total = diff.added.length + diff.removed.length + diff.changed.length;
  if (total === 0) {
    console.log('✅  No token changes detected.\n');
    return;
  }
  console.log(`📋  ${total} raw mapping change${total === 1 ? '' : 's'} detected:\n`);
  for (const { key, value } of diff.added)
    console.log(`  +  ${key}\n     → ${value}`);
  for (const { key, value } of diff.removed)
    console.log(`  -  ${key}\n     was: ${value}`);
  for (const { key, from, to } of diff.changed)
    console.log(`  ~  ${key}\n     ${from}  →  ${to}`);
  console.log('');
}

// ─── Base collection ──────────────────────────────────────────────────────────

{
  const base = getCollection('Base')!;
  const val = mode(base, 'Value');

  const colors = transform(val['color'] as FigmaNode) as SDGroup;
  const radiusPrimitives = transform(val['radius'] as FigmaNode) as SDGroup;

  write('base.json', {
    color: colors,
    radius: radiusPrimitives,
  });
}

// ─── Color / Dark semantic ─────────────────────────────────────────────────────

{
  const col = getCollection('Color')!;
  const dark = mode(col, 'Dark');

  const semantic: SDGroup = {};
  for (const [group, tokens] of Object.entries(dark)) {
    if (group === '_Gantt Chart Library' || group === '_charts') continue;
    semantic[group] = transform(tokens as FigmaNode) as SDGroup;
  }

  write('color-dark.json', semantic);
}

// ─── Spacing ──────────────────────────────────────────────────────────────────

{
  const sp = getCollection('Spacing')!;
  const vals = mode(sp, 'Mode 1');

  const spacing: SDGroup = {};
  for (const [label, token] of Object.entries(vals)) {
    const match = label.match(/\(([^)]+)\)/);
    const key = match ? match[1].trim() : normalizeKey(label);
    spacing[key] = transform(token as FigmaNode) as SDToken;
  }

  write('spacing.json', { spacing });
}

// ─── Radius (semantic aliases) ────────────────────────────────────────────────

{
  const rad = getCollection('Radius')!;
  const vals = mode(rad, 'Mode 1');

  const radiusSemantic: SDGroup = {};
  for (const [key, token] of Object.entries(vals)) {
    radiusSemantic[key] = transform(token as FigmaNode) as SDToken;
  }

  write('radius.json', { radiusSemantic });
}

// ─── Type scale ───────────────────────────────────────────────────────────────

{
  const ts = getCollection('Type scale')!;
  const vals = mode(ts, 'Mode 1');

  const typeScale: SDGroup = {};
  for (const [label, token] of Object.entries(vals)) {
    const key = normalizeKey(label);
    typeScale[key] = transform(token as FigmaNode) as SDToken;
  }

  write('type-scale.json', { typeScale });
}

// ─── Font family ──────────────────────────────────────────────────────────────

{
  const ff = getCollection('Font family')!;
  const vals = mode(ff, 'Inter+IBM plex mono');

  write('font-family.json', {
    fontFamily: {
      normal: transform(vals['Normal'] as FigmaNode) as SDToken,
      mono: transform(vals['Mono'] as FigmaNode) as SDToken,
    },
  });
}

// ─── Type weight ──────────────────────────────────────────────────────────────

{
  const tw = getCollection('Type weight')!;
  const vals = mode(tw, 'Mode 1');
  const normal = vals['Normal'] as Record<string, FigmaNode>;

  const typeWeight: SDGroup = {};
  for (const [label, token] of Object.entries(normal)) {
    const num = label.split(' ')[0];
    const numericMap: Record<string, number> = {
      Thin: 100, ExtraLight: 200, Light: 300, Regular: 400,
      Medium: 500, SemiBold: 600, Bold: 700,
    };
    const leaf = token as FigmaLeaf;
    const numeric = numericMap[leaf.$value as string] ?? parseInt(num, 10);
    typeWeight[num] = { $type: 'number', $value: numeric };
  }

  write('type-weight.json', { typeWeight });
}

// ─── Typography styles ────────────────────────────────────────────────────────

/**
 * Build a typography SD group from the old nested FigmaNode structure.
 * Used when the input is in legacy array format.
 */
function buildTypographyFromLegacy(modeData: Record<string, FigmaNode>): SDGroup {
  const out: SDGroup = {};
  for (const [group, styles] of Object.entries(modeData)) {
    if (isLeaf(styles as FigmaNode)) continue;
    const groupNode = styles as Record<string, FigmaNode>;
    for (const [styleName, styleProps] of Object.entries(groupNode)) {
      if (isLeaf(styleProps)) continue;
      const props = styleProps as Record<string, FigmaNode>;
      const key = normalizeKey(styleName).toLowerCase();
      out[key] = {
        fontFamily: {
          $type: 'string',
          $value: rewriteRef(
            (isLeaf(props['Font family'] as FigmaNode)
              ? (props['Font family'] as FigmaLeaf).$value
              : isLeaf(groupNode['Font family'] as FigmaNode)
                ? (groupNode['Font family'] as FigmaLeaf).$value
                : '{fontFamily.normal}') as string,
          ),
        },
        fontSize:      transform(props['Size'] as FigmaNode) as SDToken,
        fontWeight:    transform(props['Weight'] as FigmaNode) as SDToken,
        lineHeight:    transform(props['Line height'] as FigmaNode) as SDToken,
        letterSpacing: transform(props['Letter spacing'] as FigmaNode) as SDToken,
      } as unknown as SDGroup;
    }
  }
  return out;
}

/**
 * Build a typography SD group from the new Figma plugin export format.
 *
 * Uses styles.text as the canonical list of text styles, resolving each
 * property via the Typography styles variable map for the given density mode.
 *
 * Style key derivation:  "Body/Body-sm" → "body-sm"
 *                        "Body/mono/Body-sm" → "mono-body-sm"
 *                        "Heading/Heading-xxs" → "heading-xxs"
 */
function buildTypographyFromNew(
  stylesText: Record<string, StylesTextEntry>,
  typoVarMap: Map<string, NewVarEntry>,
  modeName: string,
  tokenSdPathMap: Map<string, string>,
): SDGroup {
  const fontStyleToWeight: Record<string, string> = {
    'Thin': '{typeWeight.100}', 'ExtraLight': '{typeWeight.200}',
    'Light': '{typeWeight.300}', 'Regular': '{typeWeight.400}',
    'Medium': '{typeWeight.500}', 'Semi Bold': '{typeWeight.600}',
    'SemiBold': '{typeWeight.600}', 'Bold': '{typeWeight.700}',
  };

  function resolveVar(
    prop: StylesPropRef | string | number | undefined,
  ): unknown {
    if (prop === undefined || prop === null) return undefined;
    if (typeof prop === 'object' && 'variable' in prop) {
      const entry = typoVarMap.get(prop.variable);
      if (!entry) return undefined;
      const val = entry.values[modeName];
      if (val === undefined) return undefined;
      return resolveRef(val, tokenSdPathMap);
    }
    return prop;
  }

  const out: SDGroup = {};

  for (const [styleName, styleProps] of Object.entries(stylesText)) {
    const parts = styleName.split('/');
    // Drop the top-level category (e.g. "Body"), join the rest with "-"
    const key = parts.slice(1).map(p => normalizeKey(p)).join('-').toLowerCase();
    if (!key) continue;

    const fontFamily = resolveVar(styleProps.fontFamily);
    const fontSize   = resolveVar(styleProps.fontSize);
    const lineHeight = resolveVar(styleProps.lineHeight);
    const letterSpacing = resolveVar(styleProps.letterSpacing);

    // Derive the weight variable token: "Body/Body-sm" → "body-body-sm-weight"
    const tokenPrefix = parts
      .map(p => normalizeKey(p).toLowerCase().replace(/\s+/g, '-'))
      .join('-');
    const weightEntry = typoVarMap.get(`${tokenPrefix}-weight`);
    const fontWeight: unknown = weightEntry
      ? resolveRef(weightEntry.values[modeName], tokenSdPathMap)
      : (styleProps.fontStyle ? fontStyleToWeight[styleProps.fontStyle] : undefined);

    if (fontFamily === undefined && fontSize === undefined) continue;

    const entry: SDGroup = {};
    if (fontFamily   !== undefined) entry.fontFamily   = { $type: 'string', $value: fontFamily }   as SDToken;
    if (fontSize     !== undefined) entry.fontSize     = { $type: 'number', $value: fontSize }     as SDToken;
    if (fontWeight   !== undefined) entry.fontWeight   = { $type: 'string', $value: fontWeight }   as SDToken;
    if (lineHeight   !== undefined) entry.lineHeight   = { $type: 'number', $value: lineHeight }   as SDToken;
    if (letterSpacing !== undefined) entry.letterSpacing = { $type: 'number', $value: letterSpacing } as SDToken;

    out[key] = entry;
  }
  return out;
}

{
  if (newFormatInput?.styles?.text) {
    // New format: build typography from styles.text + Typography styles variables
    const typoCollection = newFormatInput.collections['Typography styles'];
    const typoVarMap = new Map<string, NewVarEntry>();
    if (typoCollection) {
      const allTypoVars: NewVarEntry[] = [
        ...(typoCollection.variables.strings ?? []),
        ...(typoCollection.variables.numbers ?? []),
      ];
      for (const v of allTypoVars) typoVarMap.set(v.token, v);
    }

    const tokenSdPathMap = buildTokenSdPathMap(newFormatInput);
    const stylesText = newFormatInput.styles.text!;

    write('typography-cozy.json', {
      typography: { cozy: buildTypographyFromNew(stylesText, typoVarMap, 'Cozy', tokenSdPathMap) },
    });
    write('typography-compact.json', {
      typography: { compact: buildTypographyFromNew(stylesText, typoVarMap, 'Compact', tokenSdPathMap) },
    });
  } else {
    // Legacy format: use nested FigmaNode structure
    const typo = getCollection('Typography styles')!;
    write('typography-cozy.json', {
      typography: { cozy: buildTypographyFromLegacy(typo.modes['Cozy'] as Record<string, FigmaNode>) },
    });
    write('typography-compact.json', {
      typography: { compact: buildTypographyFromLegacy(typo.modes['Compact'] as Record<string, FigmaNode>) },
    });
  }
}

// ─── Breakpoints ──────────────────────────────────────────────────────────────

{
  const bp = getCollection('Breakpoint')!;

  const breakpoint: SDGroup = {};
  for (const [modeName, vals] of Object.entries(bp.modes)) {
    const key = modeName.split(' ')[0].toLowerCase();
    breakpoint[key] = {
      min: transform(vals['Min Width'] as FigmaNode) as SDToken,
      max: transform(vals['Max Width'] as FigmaNode) as SDToken,
    } as unknown as SDGroup;
  }

  write('breakpoint.json', { breakpoint });
}

// Save the normalized export as the baseline for the next diff
fs.writeFileSync(PREV, JSON.stringify(raw, null, 2), 'utf-8');

console.log('✅  Figma → Style Dictionary transform complete.');
console.log(`   Token files written to: ${TOKENS_DIR}`);
