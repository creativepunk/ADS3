# Token Sync

To update design tokens from a new Figma export, either:

- **Attach the JSON** in the chat and say **"Sync tokens"**
- **Reference a local path** and say **"Sync tokens from [path to file]"**

Claude will copy the file to `figma/ads3_variables.json` and run the pipeline.

---

## What runs

```bash
pnpm figma:sync   # Figma JSON → tokens/*.json (Style Dictionary input)
pnpm sd:build     # tokens/*.json → dist/ (CSS + JS output)
```

## What to expect in the output

The sync diffs the **raw Figma JSON** directly — alias paths are compared before any transforms, so a mapping change like `{_layer.layer-01} → {color.default.gray.90}` is reported even if the resolved color happens to be the same.

```
📋  3 raw mapping changes detected:

  ~  Color/Dark/text/text-subtlest
     {color.default.gray.60}  →  {color.default.gray.70}

  +  Color/Dark/text/text-brand
     → {color.default.blue.50}

  -  Color/Dark/border/border-focused
     was: {color.default.blue.50}

✅  Figma → Style Dictionary transform complete.
```

| Symbol | Meaning |
|---|---|
| `✅  No token changes detected.` | Export is identical to the previous sync |
| `~` | Mapping changed (alias path or value) |
| `+` | New token added in Figma |
| `-` | Token removed in Figma |

The previous export is saved as `figma/ads3_variables.prev.json` and used as the baseline for the next diff.

The sync **always takes precedence** — Figma's exported values overwrite the local token files. Manual edits to `tokens/*.json` will be lost on the next sync.

---

## Output files

| File | Used by |
|---|---|
| `dist/base.css` | Primitive color, spacing, radius, type-scale CSS vars |
| `dist/semantic-dark.css` | Semantic color tokens for dark theme |
| `dist/typography.css` | Typography styles — Cozy density (default) |
| `dist/typography-compact.css` | Typography styles — Compact density override |
| `dist/tokens.css` | Combined `@import` bundle (import this one) |
| `dist/sd-tokens.js` | Flat ESM token map for JS/TS consumers |

---

## Consuming the tokens

The components reference CSS custom properties (e.g. `--ds-typography-cozy-body-sm-font-size`, `--ds-text-text-default`). **The consuming app must load the token CSS** so those properties are defined — the components do not bundle it.

Import the **combined** bundle once, at your app's entry point:

```ts
import '@my-ds/tokens/css'; // base + semantic + typography in one
```

> ⚠️ **Do not** cherry-pick the sub-bundles (`/css/base`, `/css/semantic`, `/css/typography`) unless you know you need only a subset. Missing one is a silent failure: any `var(--ds-…)` referencing a token from the un-imported file resolves to **undefined with no fallback**, so the declaration is dropped and the element inherits browser defaults (e.g. text renders at **16px** in the default **serif** instead of the DS type scale). There is no error — just wrong rendering.

The Inter font itself ships with `@my-ds/components` (via `@fontsource/inter`), so you do not need to load it separately — but you still need the token CSS above for the type scale, colors, spacing, etc.
