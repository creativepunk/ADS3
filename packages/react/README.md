# @my-ds/react

React wrappers for the My Design System web components. Each export is a thin
[`@lit/react`](https://www.npmjs.com/package/@lit/react) wrapper around the
underlying `<ds-*>` custom element, giving you typed props, ref forwarding, and
React-style event handlers.

```tsx
import { DsButton } from '@my-ds/react';

export function Example() {
  return (
    <DsButton variant="primary" onDsClick={() => console.log('clicked')}>
      Save
    </DsButton>
  );
}
```

## ⚠️ Required: load the token CSS once

The components style themselves with CSS custom properties (`--ds-*`). Those
properties are **not** bundled into the components — your app must load the
token stylesheet, **once**, at its entry point:

```ts
import '@my-ds/tokens/css'; // base + semantic + typography, combined
```

If you skip this, the components still render but every `var(--ds-…)` resolves
to undefined with no fallback, so text falls back to the browser defaults
(**16px**, **serif**) and colors/spacing are wrong. There is no error — just
incorrect rendering. Import the **combined** `@my-ds/tokens/css` bundle rather
than cherry-picking `/css/base`, `/css/semantic`, `/css/typography`
individually; a missing sub-bundle is the most common cause of this trap.

The **Inter font** ships with `@my-ds/components` (via `@fontsource/inter`) and
loads automatically when any component is imported — you do **not** need to add
it yourself.

## Install

```bash
pnpm add @my-ds/react @my-ds/tokens
```

`react` and `react-dom` (>=18) are peer dependencies.
