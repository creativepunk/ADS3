---
name: figma-component
description: Build a production-ready design system component from a Figma spec. Use this skill whenever the user asks to implement, build, create, or scaffold a component from Figma — even if they just paste a Figma link, mention a component name alongside a node ID, say "implement the button", "build the input", "create the badge", or share a node URL from figma.com/design/. Also triggers when a user says "next component", "do the card now", or any variation of turning a Figma design into Lit + React code within this design system. Always use this skill when a Figma node is in scope, even if the user's phrasing is casual.
---

# Figma Component Skill

Translate a Figma component node into a production-ready **Lit Web Component** (`packages/components/`) and a **React wrapper** (`packages/react/`), strictly following the monorepo architecture of this design system.

---

## Step 0 — Orient before touching any file

Before writing a single line of code, answer these four questions from the available context:

1. **What is the component's tag name?** (e.g. `ds-button`, `ds-input`, `ds-badge`)
2. **What Figma node ID are we working from?** Extract from the URL: `node-id=896-16039` → `896:16039`
3. **Has the token package been set up?** Check for `packages/tokens/dist/base.css`. If missing, stop and tell the user to run the token build first.
4. **Does a component file already exist?** Check `packages/components/src/ds-{name}/`. If yes, confirm with the user before overwriting.

---

## Step 1 — Extract the Figma spec

Use the Figma MCP tools in this order. **Never skip a step** — each extracts different data.

### 1a. Screenshot the component
```
Figma:get_screenshot(fileKey, nodeId, maxDimension=1400)
```
Study the image carefully before writing any code. Note:
- Visual states present (default, hover, focus, active, disabled, loading…)
- Slot regions — where does text go? icons? prefix/suffix content?
- Visible size variants (sm / md / lg)
- Whether the component uses an outline, fill, ghost, or other variant pattern

### 1b. Pull design context
```
Figma:get_design_context(fileKey, nodeId)
```
Extract from the response:
- All **component properties** (Figma variant keys → map to `@property` names)
- **Auto-layout** direction, gap, padding values
- **Fill, stroke, corner radius** values and which token they reference
- **Typography** — font size, weight, line-height, letter-spacing per variant
- **Icon slots** — leading/trailing, size constraints

### 1c. Resolve variable bindings
```
Figma:get_variable_defs(fileKey, nodeId)
```
For every color, spacing, or radius value returned:
- Map it to the corresponding `--ds-*` CSS custom property from `packages/tokens/dist/`
- If a value has no token mapping, flag it in a comment and use the raw value as a fallback

### 1d. Pull children/variants (if it's a component set)
```
Figma:use_figma — figma.currentPage.findOne(n => n.id === nodeId)?.children
```
List all Figma variant combinations. These map 1:1 to your `@property` union types.

---

## Step 2 — Map Figma → Component API

Before writing code, write out a mapping table in a comment block or scratch pad:

```
Figma Property      | Type            | @property name   | Default
--------------------|-----------------|------------------|--------
Variant=Primary     | STRING enum     | variant          | 'primary'
Size=Medium         | STRING enum     | size             | 'md'
State=Disabled      | BOOLEAN         | disabled         | false
Has Icon=True       | BOOLEAN         | (slot presence)  | —
Label               | TEXT            | (slot)           | —
```

**Naming rules:**
- Figma `Variant` → `variant` prop, values lowercased and kebab-cased
- Figma `Size` (sm/md/lg) → `size` prop, values `'sm' | 'md' | 'lg'`
- Figma `State=Disabled` → `disabled: boolean`
- Figma `State=Loading` → `loading: boolean`
- Figma text layers that vary → `<slot>` (never a string prop unless it's an attribute like `label` for aria purposes)
- Figma icon layers → named slots (`slot="leading-icon"`, `slot="trailing-icon"`)

---

## Step 3 — Write the Lit component

File path: `packages/components/src/ds-{name}/ds-{name}.ts`

### Required structure (in this exact order):

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, innerFocusRingStyles } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';

@customElement('ds-{name}')
export class Ds{Name} extends LitElement {

  // 1. Static styles — ALWAYS css`` tagged template, never inline style=""
  static styles = [resetStyles, typographyBaseStyles, innerFocusRingStyles, css`
    /* host sizing */
    /* variant styles via :host([variant="..."]) */
    /* size styles via :host([size="..."]) */
    /* state styles: :host([disabled]), :host([loading]) */
    /* interactive states: :hover, :active, :focus-visible */
    /* slot layout */
  `];

  // 2. Public API (@property) — all reflected
  @property({ type: String, reflect: true }) variant: '...' = '...';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;

  // 3. Internal state (@state) — NOT reflected
  @state() private _focused = false;

  // 4. Render
  render() { ... }

  // 5. Private handlers
  private _handleClick(e: MouseEvent) { ... }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-{name}': Ds{Name};
  }
}
```

### CSS rules — strictly follow these:

**Token usage:**
```css
/* CORRECT — use design tokens */
background: var(--ds-color-background-neutral-default);
padding: var(--ds-spacing-04) var(--ds-spacing-06);
border-radius: var(--ds-radius-md);
font-size: var(--ds-scale-1);   /* 14px */
color: var(--ds-color-text-default);

/* WRONG — never hardcode */
background: #ffffff;
padding: 8px 16px;
```

**Variant pattern:**
```css
/* Driven by reflected attribute on :host — no JS class toggling.
   Target the actual inner element for this component (.inner, input, etc.)
   Never hardcode a specific element tag here — use the real inner selector. */
:host([variant="primary"]) .inner { ... }
:host([variant="secondary"]) .inner { ... }
:host([variant="ghost"]) .inner { ... }

/* Size — adjust selector to match this component's inner structure */
:host([size="sm"]) .inner { padding: var(--ds-spacing-02) var(--ds-spacing-04); }
:host([size="md"]) .inner { padding: var(--ds-spacing-03) var(--ds-spacing-05); }
:host([size="lg"]) .inner { padding: var(--ds-spacing-04) var(--ds-spacing-06); }

/* Disabled — pointer-events on :host only; never use opacity to dim anything.
   Apply explicit disabled tokens to every text, icon, and background element.
   NEVER do: :host([disabled]) { opacity: 0.4; } — this dims everything
   including child components that manage their own disabled appearance. */
:host([disabled]) { pointer-events: none; cursor: not-allowed; }
:host([disabled]) .label,
:host([disabled]) ::slotted([slot='description']) { color: var(--ds-text-text-disabled); }
:host([disabled]) .icon-wrap,
:host([disabled]) ::slotted(ds-icon)             { color: var(--ds-icon-icon-disabled); }
:host([disabled]) .inner                         { background: var(--ds-background-disabled); }

/* ⚠ Token gap rule: if any of --ds-text-text-disabled, --ds-icon-icon-disabled,
   or --ds-background-disabled are missing from the token package, flag them as
   token gaps in the Step 8 summary rather than falling back to opacity. */
```

**Focus ring:**
```css
/* Always use the shared focus token, never custom color */
:focus-visible {
  outline: 2px solid var(--ds-color-focus-default);
  outline-offset: 2px;
  border-radius: var(--ds-radius-focus-sm);
}
```

**Slot layout:**
```css
/* Use flexbox on the inner wrapper, not :host */
.inner {
  display: inline-flex;
  align-items: center;
  gap: var(--ds-spacing-03);
}

/* Hide empty slots cleanly */
::slotted([slot="leading-icon"]:empty) { display: none; }
```

### Accessibility rules — no exceptions:

- **Buttons:** `<button type="button" ?disabled=${this.disabled}>` — never `<div role="button">`
- **Inputs:** Always include `<label>` or `aria-label`. Associate with `for`/`id`.
- **aria-disabled vs disabled:** Use `?disabled=${this.disabled}` on the native element. Only use `aria-disabled` when you need to keep the element focusable while visually disabled.
- **role="status"** on loading states
- **Keyboard:** Every interactive component must handle `Enter` and `Space` to trigger the primary action.
- **Screen reader text:** Use `.sr-only` from `shared/styles.ts` for icon-only buttons

### Event dispatching:
```typescript
private _handleClick(e: MouseEvent) {
  if (this.disabled) return;
  dispatch(this, 'ds-click', { originalEvent: e });
}
```

---

## Step 4 — Write the React wrapper

File path: `packages/react/src/ds-{name}.tsx`

### Required pattern:
```typescript
import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { Ds{Name} as Lit{Name} } from '@my-ds/components/src/ds-{name}/ds-{name}.js';
import type { DsClickEvent, DsChangeEvent } from '@my-ds/components';

// 1. Re-export the Lit class for advanced usage
export type { Ds{Name} } from '@my-ds/components/src/ds-{name}/ds-{name}.js';

// 2. Props interface — mirrors @property() public API
export interface Ds{Name}Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  // Event handlers — always `on` + PascalCase event name
  onDsClick?: (event: DsClickEvent) => void;
}

// 3. createComponent wrapper
export const Ds{Name} = createComponent({
  tagName: 'ds-{name}',
  elementClass: Lit{Name},
  react: React,
  events: {
    onDsClick: 'ds-click' as EventName<DsClickEvent>,
  },
});

Ds{Name}.displayName = 'Ds{Name}';
```

**Event mapping rules:**
- `ds-click` → `onDsClick`
- `ds-change` → `onDsChange`
- `ds-input` → `onDsInput`
- `ds-focus` → `onDsFocus`
- `ds-blur` → `onDsBlur`
- Custom events follow the same pattern: `ds-{verb}` → `onDs{Verb}`

---

## Step 5 — Register in barrel exports

**`packages/components/src/index.ts`** — uncomment or add:
```typescript
export { Ds{Name} } from './ds-{name}/ds-{name}.js';
```

**`packages/react/src/index.ts`** — uncomment or add:
```typescript
export { Ds{Name} } from './ds-{name}.js';
export type { Ds{Name}Props } from './ds-{name}.js';
```

---

## Step 6 — Write the Storybook story + Overview MDX

### 6a. Story file
File path: `packages/components/src/ds-{name}/ds-{name}.stories.ts`

Every component needs a story file. Model it exactly after `ds-button.stories.ts`:

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-{name}.js';
import type { Ds{Name}Variant, Ds{Name}Size } from './ds-{name}.js';

// 1. Define an Args interface mirroring all @property() fields
// 2. Declare sample slot content (SVGs, text) as tagged-template constants
// 3. Write the meta with argTypes — one entry per prop:
//    - control type (select / inline-radio / boolean / text)
//    - description
//    - table.type.summary (union string), defaultValue.summary, category: 'Props'
// 4. Set sensible defaults in args: {}
// 5. Write the render() function using html`` — wire every arg to an attribute

// Required named exports (use tags: ['!dev'] on Showcase stories):
//   Default          — primary/default variant, all controls live here
//   <Variant>        — one export per non-default variant
//   <Shape>          — one export per shape (if the component has a shape prop)
//   Disabled         — isDisabled: true
//   Selected         — isSelected: true (if applicable)
//   ShowcaseVariants — all variants side-by-side
//   ShowcaseSizes    — all sizes side-by-side
//   ShowcaseStates   — default / disabled / selected side-by-side
//   ShowcaseMatrix   — variants × sizes grid
```

**Rules:**
- Import the side-effect registering file (`./ds-{name}.js`), not the class directly
- Slot content in stories uses no `slot=""` attribute on the default slot
- `ariaLabel` arg always maps to `aria-label` control with description "Required for icon-only buttons" or similar
- `ifDefined` for optional string attrs; `?attr=${bool}` for boolean attrs
- Showcase stories use `tags: ['!dev']` and `parameters: { controls: { disable: true } }`

### 6b. Overview MDX
File path: `packages/components/src/ds-{name}/ds-{name}.mdx`

Every component needs a `<Meta of={...} name="Overview" />` MDX doc alongside its stories. Model it after `ds-button.mdx`:

```mdx
import { Meta, Canvas, ArgTypes } from '@storybook/blocks';
import * as {Name}Stories from './ds-{name}.stories';

<Meta of={{Name}Stories} name="Overview" />

# {Name}

One-paragraph description of what this component is for and when to use it
vs. a related component.

<Canvas of={{Name}Stories.Default} />

## Variants        → table + ShowcaseVariants canvas
## Sizes           → prose + ShowcaseSizes canvas
## Shape           → (if applicable) ShowcaseShapes canvas
## States          → ShowcaseStates canvas + per-state prose
## Full matrix     → ShowcaseMatrix canvas

## API
### Properties    → <ArgTypes of={{Name}Stories} />
### Slots         → markdown table
### Events        → markdown table
### CSS parts     → markdown table
### Attribute names → boolean prop → attribute mapping table + HTML snippet

## Accessibility  → bullet list covering: aria-label requirements, aria-pressed,
                    disabled vs aria-disabled, focus ring behavior, keyboard
## React usage    → tsx code block
```

---

## Step 7 — Verify

Run a quick sanity check after writing the files:

```bash
# TypeScript must compile with zero errors
cd packages/components && npx tsc --noEmit
cd packages/react && npx tsc --noEmit
```

If there are type errors, fix them before presenting the output. Do not present broken code.

---

## Step 8 — Present output

Show the user a structured summary:

```
✅ ds-{name} — complete

Files created:
  packages/components/src/ds-{name}/ds-{name}.ts
  packages/components/src/ds-{name}/ds-{name}.stories.ts
  packages/components/src/ds-{name}/ds-{name}.mdx
  packages/react/src/ds-{name}.tsx

Barrels updated:
  packages/components/src/index.ts
  packages/react/src/index.ts

Public API:
  variant: 'primary' | 'secondary' | 'ghost'   default: 'primary'
  size: 'sm' | 'md' | 'lg'                       default: 'md'
  disabled: boolean                               default: false

Events:
  ds-click  →  onDsClick (React)

Slots:
  default       — label text
  leading-icon  — icon before label
  trailing-icon — icon after label

Token gaps (values with no --ds-* mapping, using raw fallback):
  ⚠ border-width: 1.5px (no token — hardcoded as fallback)
```

Then immediately ask: **"Ready for the next component, or would you like to review this one first?"**

---

## Common pitfalls — check these before submitting

- [ ] No hardcoded hex colors or pixel values (except documented fallbacks)
- [ ] All variants driven by `:host([attr])` CSS selectors, not JS class manipulation
- [ ] `disabled` uses native `?disabled=${...}` not just `aria-disabled`
- [ ] Disabled state never uses `opacity: 0.4` on `:host` — uses `--ds-text-text-disabled` / `--ds-icon-icon-disabled` on individual elements instead; missing tokens flagged as token gaps in Step 8
- [ ] Focus ring uses `--ds-color-focus-default`, not a custom color
- [ ] `composed: true` on all dispatched events (already in `dispatch()` utility)
- [ ] React wrapper has `displayName` set
- [ ] Both barrels updated
- [ ] Storybook story written with Default, per-variant, Disabled, Selected, and all Showcase exports
- [ ] Overview MDX written covering Variants, Sizes, States, Matrix, API, Accessibility, React usage
- [ ] Zero TypeScript errors

---

## Architecture reference (when in doubt)

```
packages/
├── tokens/                     @my-ds/tokens
│   └── dist/
│       ├── base.css            --ds-color-*, --ds-spacing-*, --ds-radius-*, --ds-scale-*
│       └── semantic.css        --ds-color-text-*, --ds-color-border-*, etc.
│
├── components/                 @my-ds/components  (Lit)
│   └── src/
│       ├── shared/
│       │   ├── styles.ts       resetStyles, typographyBaseStyles, innerFocusRingStyles, srOnlyStyles
│       │   └── events.ts       dispatch(), DsEventMap, typed event interfaces
│       ├── ds-{name}/
│       │   └── ds-{name}.ts    ← YOU ARE HERE
│       └── index.ts            barrel
│
└── react/                      @my-ds/react  (@lit/react wrappers)
    └── src/
        ├── ds-{name}.tsx       ← YOU ARE HERE
        └── index.ts            barrel
```

## Token reference

Never guess token names. Before writing any CSS, read the actual sources:
- `packages/tokens/src/semantic-colors.ts` — all semantic color tokens
- `packages/tokens/src/dimension.ts` — spacing, radius, type scale
- `packages/tokens/dist/base.css` — generated CSS custom property names

Search for the value you need (e.g. "focus", "border", "input") rather than
relying on memory.