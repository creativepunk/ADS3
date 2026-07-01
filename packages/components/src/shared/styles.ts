// Self-hosted Inter Variable ships with the component library so any consumer
// (React wrappers, apps) gets the font without extra setup. Loaded as a
// document-level side effect — @font-face is not scoped by shadow DOM, so it
// reaches every component. The variable font retains the full OpenType feature
// table (cv05 lowercase-l tail, cv06 uppercase-I serifs, zero slashed-zero)
// which the static @fontsource/inter subsets strip during subsetting.
import '@fontsource-variable/inter/standard.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';

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
    font-family: var(--ds-font-family-normal, 'Inter Variable', 'Inter', sans-serif);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
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
    line-height: var(--ds-typography-cozy-regular-body-sm-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-regular-body-sm-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-regular-body-md {
    font-family: var(--ds-typography-cozy-regular-body-md-font-family);
    font-size: var(--ds-typography-cozy-regular-body-md-font-size);
    font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
    line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
    letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-medium-body-sm {
    font-family: var(--ds-typography-cozy-medium-body-sm-font-family);
    font-size: var(--ds-typography-cozy-medium-body-sm-font-size);
    font-weight: var(--ds-typography-cozy-medium-body-sm-font-weight);
    line-height: var(--ds-typography-cozy-medium-body-sm-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-medium-body-sm-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-medium-body-md {
    font-family: var(--ds-typography-cozy-medium-body-md-font-family);
    font-size: var(--ds-typography-cozy-medium-body-md-font-size);
    font-weight: var(--ds-typography-cozy-medium-body-md-font-weight);
    line-height: var(--ds-typography-cozy-medium-body-md-line-height, 20px);
    letter-spacing: var(--ds-typography-cozy-medium-body-md-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-helper-helper-regular {
    font-family: var(--ds-typography-cozy-helper-helper-regular-font-family);
    font-size: var(--ds-typography-cozy-helper-helper-regular-font-size);
    font-weight: var(--ds-typography-cozy-helper-helper-regular-font-weight);
    line-height: var(--ds-typography-cozy-helper-helper-regular-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-helper-helper-regular-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-helper-helper-bold {
    font-family: var(--ds-typography-cozy-helper-helper-bold-font-family);
    font-size: var(--ds-typography-cozy-helper-helper-bold-font-size);
    font-weight: var(--ds-typography-cozy-helper-helper-bold-font-weight);
    line-height: var(--ds-typography-cozy-helper-helper-bold-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-helper-helper-bold-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-regular-mono-body-sm {
    font-family: var(--ds-typography-cozy-regular-mono-body-sm-font-family);
    font-size: var(--ds-typography-cozy-regular-body-sm-font-size);
    font-weight: var(--ds-typography-cozy-regular-body-sm-font-weight);
    line-height: var(--ds-typography-cozy-regular-body-sm-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-regular-body-sm-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-xxs {
    font-family: var(--ds-typography-cozy-heading-xxs-font-family);
    font-size: var(--ds-typography-cozy-heading-xxs-font-size);
    font-weight: var(--ds-typography-cozy-heading-xxs-font-weight);
    line-height: var(--ds-typography-cozy-heading-xxs-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-heading-xxs-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-regular-body-lg {
    font-family: var(--ds-typography-cozy-regular-body-lg-font-family);
    font-size: var(--ds-typography-cozy-regular-body-lg-font-size);
    font-weight: var(--ds-typography-cozy-regular-body-lg-font-weight);
    line-height: var(--ds-typography-cozy-regular-body-lg-line-height, 24px);
    letter-spacing: var(--ds-typography-cozy-regular-body-lg-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-regular-mono-body-md {
    font-family: var(--ds-typography-cozy-regular-mono-body-md-font-family);
    font-size: var(--ds-typography-cozy-regular-mono-body-md-font-size);
    font-weight: var(--ds-typography-cozy-regular-mono-body-md-font-weight);
    line-height: var(--ds-typography-cozy-regular-mono-body-md-line-height, 20px);
    letter-spacing: var(--ds-typography-cozy-regular-mono-body-md-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-regular-mono-body-lg {
    font-family: var(--ds-typography-cozy-regular-mono-body-lg-font-family);
    font-size: var(--ds-typography-cozy-regular-mono-body-lg-font-size);
    font-weight: var(--ds-typography-cozy-regular-mono-body-lg-font-weight);
    line-height: var(--ds-typography-cozy-regular-mono-body-lg-line-height, 24px);
    letter-spacing: var(--ds-typography-cozy-regular-mono-body-lg-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-medium-body-lg {
    font-family: var(--ds-typography-cozy-medium-body-lg-font-family);
    font-size: var(--ds-typography-cozy-medium-body-lg-font-size);
    font-weight: var(--ds-typography-cozy-medium-body-lg-font-weight);
    line-height: var(--ds-typography-cozy-medium-body-lg-line-height, 24px);
    letter-spacing: var(--ds-typography-cozy-medium-body-lg-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-bold-body-sm {
    font-family: var(--ds-typography-cozy-bold-body-sm-font-family);
    font-size: var(--ds-typography-cozy-bold-body-sm-font-size);
    font-weight: var(--ds-typography-cozy-bold-body-sm-font-weight);
    line-height: var(--ds-typography-cozy-bold-body-sm-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-bold-body-sm-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-bold-body-md {
    font-family: var(--ds-typography-cozy-bold-body-md-font-family);
    font-size: var(--ds-typography-cozy-bold-body-md-font-size);
    font-weight: var(--ds-typography-cozy-bold-body-md-font-weight);
    line-height: var(--ds-typography-cozy-bold-body-md-line-height, 20px);
    letter-spacing: var(--ds-typography-cozy-bold-body-md-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-bold-body-lg {
    font-family: var(--ds-typography-cozy-bold-body-lg-font-family);
    font-size: var(--ds-typography-cozy-bold-body-lg-font-size);
    font-weight: var(--ds-typography-cozy-bold-body-lg-font-weight);
    line-height: var(--ds-typography-cozy-bold-body-lg-line-height, 24px);
    letter-spacing: var(--ds-typography-cozy-bold-body-lg-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-code-code-regular {
    font-family: var(--ds-typography-cozy-code-code-regular-font-family);
    font-size: var(--ds-typography-cozy-code-code-regular-font-size);
    font-weight: var(--ds-typography-cozy-code-code-regular-font-weight);
    line-height: var(--ds-typography-cozy-code-code-regular-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-code-code-regular-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-code-code-medium {
    font-family: var(--ds-typography-cozy-code-code-medium-font-family);
    font-size: var(--ds-typography-cozy-code-code-medium-font-size);
    font-weight: var(--ds-typography-cozy-code-code-medium-font-weight);
    line-height: var(--ds-typography-cozy-code-code-medium-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-code-code-medium-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-code-code-bold {
    font-family: var(--ds-typography-cozy-code-code-bold-font-family);
    font-size: var(--ds-typography-cozy-code-code-bold-font-size);
    font-weight: var(--ds-typography-cozy-code-code-bold-font-weight);
    line-height: var(--ds-typography-cozy-code-code-bold-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-code-code-bold-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-helper-helper-medium {
    font-family: var(--ds-typography-cozy-helper-helper-medium-font-family);
    font-size: var(--ds-typography-cozy-helper-helper-medium-font-size);
    font-weight: var(--ds-typography-cozy-helper-helper-medium-font-weight);
    line-height: var(--ds-typography-cozy-helper-helper-medium-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-helper-helper-medium-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-xs {
    font-family: var(--ds-typography-cozy-heading-xs-font-family);
    font-size: var(--ds-typography-cozy-heading-xs-font-size);
    font-weight: var(--ds-typography-cozy-heading-xs-font-weight);
    line-height: var(--ds-typography-cozy-heading-xs-line-height, 20px);
    letter-spacing: var(--ds-typography-cozy-heading-xs-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-sm {
    font-family: var(--ds-typography-cozy-heading-sm-font-family);
    font-size: var(--ds-typography-cozy-heading-sm-font-size);
    font-weight: var(--ds-typography-cozy-heading-sm-font-weight);
    line-height: var(--ds-typography-cozy-heading-sm-line-height, 24px);
    letter-spacing: var(--ds-typography-cozy-heading-sm-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-md {
    font-family: var(--ds-typography-cozy-heading-md-font-family);
    font-size: var(--ds-typography-cozy-heading-md-font-size);
    font-weight: var(--ds-typography-cozy-heading-md-font-weight);
    line-height: var(--ds-typography-cozy-heading-md-line-height, 28px);
    letter-spacing: var(--ds-typography-cozy-heading-md-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-lg {
    font-family: var(--ds-typography-cozy-heading-lg-font-family);
    font-size: var(--ds-typography-cozy-heading-lg-font-size);
    font-weight: var(--ds-typography-cozy-heading-lg-font-weight);
    line-height: var(--ds-typography-cozy-heading-lg-line-height, 32px);
    letter-spacing: var(--ds-typography-cozy-heading-lg-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-xl {
    font-family: var(--ds-typography-cozy-heading-xl-font-family);
    font-size: var(--ds-typography-cozy-heading-xl-font-size);
    font-weight: var(--ds-typography-cozy-heading-xl-font-weight);
    line-height: var(--ds-typography-cozy-heading-xl-line-height, 36px);
    letter-spacing: var(--ds-typography-cozy-heading-xl-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-heading-xxl {
    font-family: var(--ds-typography-cozy-heading-xxl-font-family);
    font-size: var(--ds-typography-cozy-heading-xxl-font-size);
    font-weight: var(--ds-typography-cozy-heading-xxl-font-weight);
    line-height: var(--ds-typography-cozy-heading-xxl-line-height, 48px);
    letter-spacing: var(--ds-typography-cozy-heading-xxl-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-xxs {
    font-family: var(--ds-typography-cozy-metric-xxs-font-family);
    font-size: var(--ds-typography-cozy-metric-xxs-font-size);
    font-weight: var(--ds-typography-cozy-metric-xxs-font-weight);
    line-height: var(--ds-typography-cozy-metric-xxs-line-height, 16px);
    letter-spacing: var(--ds-typography-cozy-metric-xxs-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-xs {
    font-family: var(--ds-typography-cozy-metric-xs-font-family);
    font-size: var(--ds-typography-cozy-metric-xs-font-size);
    font-weight: var(--ds-typography-cozy-metric-xs-font-weight);
    line-height: var(--ds-typography-cozy-metric-xs-line-height, 20px);
    letter-spacing: var(--ds-typography-cozy-metric-xs-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-sm {
    font-family: var(--ds-typography-cozy-metric-sm-font-family);
    font-size: var(--ds-typography-cozy-metric-sm-font-size);
    font-weight: var(--ds-typography-cozy-metric-sm-font-weight);
    line-height: var(--ds-typography-cozy-metric-sm-line-height, 24px);
    letter-spacing: var(--ds-typography-cozy-metric-sm-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-md {
    font-family: var(--ds-typography-cozy-metric-md-font-family);
    font-size: var(--ds-typography-cozy-metric-md-font-size);
    font-weight: var(--ds-typography-cozy-metric-md-font-weight);
    line-height: var(--ds-typography-cozy-metric-md-line-height, 28px);
    letter-spacing: var(--ds-typography-cozy-metric-md-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-lg {
    font-family: var(--ds-typography-cozy-metric-lg-font-family);
    font-size: var(--ds-typography-cozy-metric-lg-font-size);
    font-weight: var(--ds-typography-cozy-metric-lg-font-weight);
    line-height: var(--ds-typography-cozy-metric-lg-line-height, 32px);
    letter-spacing: var(--ds-typography-cozy-metric-lg-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-xl {
    font-family: var(--ds-typography-cozy-metric-xl-font-family);
    font-size: var(--ds-typography-cozy-metric-xl-font-size);
    font-weight: var(--ds-typography-cozy-metric-xl-font-weight);
    line-height: var(--ds-typography-cozy-metric-xl-line-height, 36px);
    letter-spacing: var(--ds-typography-cozy-metric-xl-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
  .text-metric-xxl {
    font-family: var(--ds-typography-cozy-metric-xxl-font-family);
    font-size: var(--ds-typography-cozy-metric-xxl-font-size);
    font-weight: var(--ds-typography-cozy-metric-xxl-font-weight);
    line-height: var(--ds-typography-cozy-metric-xxl-line-height, 48px);
    letter-spacing: var(--ds-typography-cozy-metric-xxl-letter-spacing);
    font-feature-settings: 'cv05' 1, 'cv06' 1, 'zero' 1;
  }
`;
