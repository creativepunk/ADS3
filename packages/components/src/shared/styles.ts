// Self-hosted Inter ships with the component library so any consumer (React
// wrappers, apps) gets the font without extra setup. Loaded as a document-level
// side effect — @font-face is not scoped by shadow DOM, so it reaches every
// component. Weights match the typography tokens: 300 / 400 / 500 / 600.
// The DS `--ds-font-family-normal` token is a bare `Inter` with no generic
// fallback, so without this text degrades to the browser default serif.
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

import { css } from 'lit';

/**
 * Global component reset applied to every :host.
 * Ensures box-model consistency across shadow roots.
 */
export const resetStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

/**
 * Focus ring styles using the design system focus tokens.
 * Apply to interactive elements via the .ds-focus-ring mixin pattern.
 */
export const focusRingStyles = css`
  :host(:focus-visible),
  :focus-visible {
    outline: 2px solid var(--ds-focus-focus, #ffffff);
    outline-offset: 2px;
  }

  :host(:focus:not(:focus-visible)) {
    outline: none;
  }
`;

/**
 * Standard focus ring for inner elements (buttons, inputs).
 * outline automatically follows the element's own border-radius at the
 * 2px offset — no border-radius override needed here.
 */
export const innerFocusRingStyles = css`
  :focus-visible {
    outline: 2px solid var(--ds-focus-focus);
    outline-offset: 2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }
`;

/**
 * Inset focus ring for elements that sit inside a bordered container (e.g.
 * text inputs) where an outset ring would be clipped by the parent.
 * Mirrors ADS Focusable isInset: uses --ds-focus-focus-inset (gray-100) and
 * a negative offset so the ring renders inside the element boundary.
 */
export const insetFocusRingStyles = css`
  :focus-visible {
    outline: 2px solid var(--ds-focus-focus);
    outline-offset: -2px;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }
`;

/**
 * Visually hidden — accessible but invisible.
 * For screen-reader-only text.
 */
export const srOnlyStyles = css`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

/**
 * Typography base applied to all components.
 * Sets font family from the design token.
 */
export const typographyBaseStyles = css`
  :host {
    font-family: var(--ds-font-family-normal, 'Inter', sans-serif);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
