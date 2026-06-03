/**
 * @my-ds/tokens
 *
 * Design token exports for use in JS/TS consumers.
 * For CSS, import from '@my-ds/tokens/css'.
 */

export { baseColors, hoverColors } from './base-colors.js';
export type { BaseColor } from './base-colors.js';

export {
  spacing,
  radius,
  typeScale,
  fontFamily,
  fontWeight,
  typography,
  typographyCompact,
} from './dimension.js';
export type {
  Spacing,
  Radius,
  TypeScale,
  FontFamily,
  FontWeight,
  Typography,
  TypographyCompact,
} from './dimension.js';

export { semanticColorsDark } from './semantic-colors.js';
export type { SemanticColors } from './semantic-colors.js';

// ─── Convenience re-exports ───────────────────────────────────────────────────

/**
 * All tokens as a single object — useful for theming and testing.
 */
export { default as tokens } from './tokens.js';
