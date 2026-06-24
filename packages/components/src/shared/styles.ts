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
    font-feature-settings: 'cv08' 1, 'cv05' 1, 'zero' 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

/**
 * Composite typography utility classes — one class per Figma text style.
 * Adopt into a shadow root via static styles to use class="text-*" on
 * inner elements, mirroring Figma's single-name text-style assignment.
 */
export const typographyStyles = css`
  .text-regular-body-sm {
    font-family: var(--ds-typography-cozy-regular-body-sm-font-family);
    font-size: var(--ds-typography-cozy-regular-body-sm-font-size);
    font-weight: var(--ds-typography-cozy-regular-body-sm-font-weight);
    line-height: var(--ds-typography-cozy-regular-body-sm-line-height);
    letter-spacing: var(--ds-typography-cozy-regular-body-sm-letter-spacing);
  }
  .text-regular-body-md {
    font-family: var(--ds-typography-cozy-regular-body-md-font-family);
    font-size: var(--ds-typography-cozy-regular-body-md-font-size);
    font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
    line-height: var(--ds-typography-cozy-regular-body-md-line-height);
    letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing);
  }
  .text-medium-body-sm {
    font-family: var(--ds-typography-cozy-medium-body-sm-font-family);
    font-size: var(--ds-typography-cozy-medium-body-sm-font-size);
    font-weight: var(--ds-typography-cozy-medium-body-sm-font-weight);
    line-height: var(--ds-typography-cozy-medium-body-sm-line-height);
    letter-spacing: var(--ds-typography-cozy-medium-body-sm-letter-spacing);
  }
  .text-medium-body-md {
    font-family: var(--ds-typography-cozy-medium-body-md-font-family);
    font-size: var(--ds-typography-cozy-medium-body-md-font-size);
    font-weight: var(--ds-typography-cozy-medium-body-md-font-weight);
    line-height: var(--ds-typography-cozy-medium-body-md-line-height);
    letter-spacing: var(--ds-typography-cozy-medium-body-md-letter-spacing);
  }
  .text-helper-helper-regular {
    font-family: var(--ds-typography-cozy-helper-helper-regular-font-family);
    font-size: var(--ds-typography-cozy-helper-helper-regular-font-size);
    font-weight: var(--ds-typography-cozy-helper-helper-regular-font-weight);
    line-height: var(--ds-typography-cozy-helper-helper-regular-line-height);
    letter-spacing: var(--ds-typography-cozy-helper-helper-regular-letter-spacing);
  }
  .text-regular-mono-body-sm {
    font-family: var(--ds-typography-cozy-regular-mono-body-sm-font-family);
    font-size: var(--ds-typography-cozy-regular-body-sm-font-size);
    font-weight: var(--ds-typography-cozy-regular-body-sm-font-weight);
    line-height: var(--ds-typography-cozy-regular-body-sm-line-height);
    letter-spacing: var(--ds-typography-cozy-regular-body-sm-letter-spacing);
  }
  .text-heading-xxs {
    font-family: var(--ds-typography-cozy-heading-xxs-font-family);
    font-size: var(--ds-typography-cozy-heading-xxs-font-size);
    font-weight: var(--ds-typography-cozy-heading-xxs-font-weight);
    line-height: var(--ds-typography-cozy-heading-xxs-line-height);
    letter-spacing: var(--ds-typography-cozy-heading-xxs-letter-spacing);
  }
`;
