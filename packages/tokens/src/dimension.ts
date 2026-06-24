/**
 * Dimension, Typography & Scale Tokens
 *
 * ⚠️  Auto-generated — do NOT edit manually.
 *     Re-run `pnpm figma:sync && pnpm sd:build` to regenerate.
 */

/**
 * Spacing Tokens — Figma "Spacing" collection.
 */
export const spacing = {
  'spacing-00': 0,  // 0px
  'spacing-01': 2,  // 2px
  'spacing-02': 4,  // 4px
  'spacing-03': 6,  // 6px
  'spacing-04': 8,  // 8px
  'spacing-05': 12,  // 12px
  'spacing-06': 16,  // 16px
  'spacing-07': 20,  // 20px
  'spacing-08': 24,  // 24px
  'spacing-09': 32,  // 32px
  'spacing-10': 40,  // 40px
  'spacing-11': 48,  // 48px
  'spacing-12': 64,  // 64px
  'spacing-13': 80,  // 80px
  'spacing-14': 96,  // 96px
  'spacing-15': 160,  // 160px
} as const;

/**
 * Border Radius Tokens — Figma "Radius" collection (semantic aliases).
 */
export const radius = {
  'radius-none': 0,
  'radius-pill': 9999,
  'radius-xs': 2,
  'radius-sm': 4,
  'radius-md': 6,
  'radius-lg': 8,
  'radius-xl': 12,
  'radius-focus-xs': 4,
  'radius-focus-sm': 6,
  'radius-focus-md': 8,
  'radius-focus-lg': 10,
  'radius-focus-xl': 14,
} as const;

/**
 * Type Scale Tokens — Figma "Type scale" collection (y₀–y₉ → scale-0–scale-9).
 */
export const typeScale = {
  'scale-0': 12,  // y0 — 12px
  'scale-1': 14,  // y1 — 14px
  'scale-2': 16,  // y2 — 16px
  'scale-3': 20,  // y3 — 20px
  'scale-4': 24,  // y4 — 24px
  'scale-5': 28,  // y5 — 28px
  'scale-6': 32,  // y6 — 32px
  'scale-7': 40,  // y7 — 40px
  'scale-8': 48,  // y8 — 48px
  'scale-9': 56,  // y9 — 56px
} as const;

/**
 * Font Family Tokens — Figma "Font family" collection.
 * Fallback stacks are added here; the Figma export only contains the primary name.
 */
export const fontFamily = {
  normal: 'Inter, sans-serif',
  mono: '"IBM Plex Mono", monospace',
} as const;

/**
 * Font Weight Tokens — Figma "Type weight" collection.
 */
export const fontWeight = {
  thin: 100,
  extralight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Typography Style Tokens — Cozy density (default).
 * Sourced from Figma "Typography styles" collection, Cozy mode.
 */
export const typography = {
  'regular-body-sm': {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.16,
    paragraphSpacing: 16,
  },
  'regular-body-md': {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.16,
    paragraphSpacing: 20,
  },
  'regular-body-lg': {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0.16,
    paragraphSpacing: 24,
  },
  'regular-mono-body-sm': {
    fontFamily: 'mono',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.16,
    paragraphSpacing: 16,
  },
  'regular-mono-body-md': {
    fontFamily: 'mono',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.16,
    paragraphSpacing: 20,
  },
  'regular-mono-body-lg': {
    fontFamily: 'mono',
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 24,
    letterSpacing: 0.16,
    paragraphSpacing: 24,
  },
  'medium-body-sm': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
    paragraphSpacing: 16,
  },
  'medium-body-md': {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 20,
    letterSpacing: 0.5,
    paragraphSpacing: 20,
  },
  'medium-body-lg': {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0.5,
    paragraphSpacing: 24,
  },
  'bold-body-sm': {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 16,
    letterSpacing: 0.5,
    paragraphSpacing: 16,
  },
  'bold-body-md': {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 20,
    letterSpacing: 0.5,
    paragraphSpacing: 20,
  },
  'bold-body-lg': {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 24,
    letterSpacing: 0.5,
    paragraphSpacing: 24,
  },
  'code-code-regular': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  'code-code-medium': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'code-code-bold': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'helper-helper-regular': {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  'helper-helper-medium': {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'helper-helper-bold': {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'heading-xxs': {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16,
    letterSpacing: 0.16,
  },
  'heading-xs': {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0.16,
  },
  'heading-sm': {
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0,
  },
  'heading-md': {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 28,
    letterSpacing: 0,
  },
  'heading-lg': {
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  'heading-xl': {
    fontSize: 32,
    fontWeight: 300,
    lineHeight: 36,
    letterSpacing: 0,
  },
  'heading-xxl': {
    fontSize: 40,
    fontWeight: 300,
    lineHeight: 48,
    letterSpacing: 0,
  },
  'metric-xxs': {
    fontFamily: 'mono',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16,
    letterSpacing: 0.16,
  },
  'metric-xs': {
    fontFamily: 'mono',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0.16,
  },
  'metric-sm': {
    fontFamily: 'mono',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0,
  },
  'metric-md': {
    fontFamily: 'mono',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 28,
    letterSpacing: 0,
  },
  'metric-lg': {
    fontFamily: 'mono',
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 32,
    letterSpacing: 0,
  },
  'metric-xl': {
    fontFamily: 'mono',
    fontSize: 32,
    fontWeight: 300,
    lineHeight: 36,
    letterSpacing: 0,
  },
  'metric-xxl': {
    fontFamily: 'mono',
    fontSize: 40,
    fontWeight: 300,
    lineHeight: 48,
    letterSpacing: 0,
  },
} as const;

/**
 * Typography Style Tokens — Compact density.
 * Sourced from Figma "Typography styles" collection, Compact mode.
 */
export const typographyCompact = {
  'regular-body-sm': {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.16,
    paragraphSpacing: 16,
  },
  'regular-body-md': {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.16,
    paragraphSpacing: 16,
  },
  'regular-body-lg': {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.16,
    paragraphSpacing: 20,
  },
  'regular-mono-body-sm': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.16,
    paragraphSpacing: 16,
  },
  'regular-mono-body-md': {
    fontFamily: 'mono',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.16,
    paragraphSpacing: 16,
  },
  'regular-mono-body-lg': {
    fontFamily: 'mono',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.16,
    paragraphSpacing: 20,
  },
  'medium-body-sm': {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
    paragraphSpacing: 16,
  },
  'medium-body-md': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
    paragraphSpacing: 16,
  },
  'medium-body-lg': {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.5,
    paragraphSpacing: 20,
  },
  'bold-body-sm': {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
    paragraphSpacing: 16,
  },
  'bold-body-md': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
    paragraphSpacing: 16,
  },
  'bold-body-lg': {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.5,
    paragraphSpacing: 20,
  },
  'code-code-regular': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  'code-code-medium': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'code-code-bold': {
    fontFamily: 'mono',
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'helper-helper-regular': {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 16,
    letterSpacing: 0.32,
  },
  'helper-helper-medium': {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'helper-helper-bold': {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  'heading-xxs': {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 16,
    letterSpacing: 0.16,
  },
  'heading-xs': {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0.16,
  },
  'heading-sm': {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0,
  },
  'heading-md': {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 28,
    letterSpacing: 0,
  },
  'heading-lg': {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 32,
    letterSpacing: 0,
  },
  'heading-xl': {
    fontSize: 28,
    fontWeight: 300,
    lineHeight: 36,
    letterSpacing: 0,
  },
  'heading-xxl': {
    fontSize: 32,
    fontWeight: 300,
    lineHeight: 48,
    letterSpacing: 0,
  },
  'metric-xxs': {
    fontFamily: 'mono',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16,
    letterSpacing: 0.16,
  },
  'metric-xs': {
    fontFamily: 'mono',
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 20,
    letterSpacing: 0.16,
  },
  'metric-sm': {
    fontFamily: 'mono',
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 24,
    letterSpacing: 0,
  },
  'metric-md': {
    fontFamily: 'mono',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: 28,
    letterSpacing: 0,
  },
  'metric-lg': {
    fontFamily: 'mono',
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 32,
    letterSpacing: 0,
  },
  'metric-xl': {
    fontFamily: 'mono',
    fontSize: 32,
    fontWeight: 300,
    lineHeight: 36,
    letterSpacing: 0,
  },
  'metric-xxl': {
    fontFamily: 'mono',
    fontSize: 40,
    fontWeight: 300,
    lineHeight: 48,
    letterSpacing: 0,
  },
} as const;

export type Spacing    = typeof spacing;
export type Radius     = typeof radius;
export type TypeScale  = typeof typeScale;
export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
export type Typography = typeof typography;
export type TypographyCompact = typeof typographyCompact;
