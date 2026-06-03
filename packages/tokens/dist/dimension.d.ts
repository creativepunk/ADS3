/**
 * Dimension, Typography & Scale Tokens
 *
 * ⚠️  Auto-generated — do NOT edit manually.
 *     Re-run `pnpm figma:sync && pnpm sd:build` to regenerate.
 */
/**
 * Spacing Tokens — Figma "Spacing" collection.
 */
export declare const spacing: {
    readonly 'spacing-00': 0;
    readonly 'spacing-01': 2;
    readonly 'spacing-02': 4;
    readonly 'spacing-03': 6;
    readonly 'spacing-04': 8;
    readonly 'spacing-05': 12;
    readonly 'spacing-06': 16;
    readonly 'spacing-07': 20;
    readonly 'spacing-08': 24;
    readonly 'spacing-09': 32;
    readonly 'spacing-10': 40;
    readonly 'spacing-11': 48;
    readonly 'spacing-12': 64;
    readonly 'spacing-13': 80;
    readonly 'spacing-14': 96;
    readonly 'spacing-15': 160;
};
/**
 * Border Radius Tokens — Figma "Radius" collection (semantic aliases).
 */
export declare const radius: {
    readonly 'radius-none': 0;
    readonly 'radius-pill': 9999;
    readonly 'radius-xs': 2;
    readonly 'radius-sm': 4;
    readonly 'radius-md': 6;
    readonly 'radius-lg': 8;
    readonly 'radius-xl': 12;
    readonly 'radius-focus-xs': 4;
    readonly 'radius-focus-sm': 6;
    readonly 'radius-focus-md': 8;
    readonly 'radius-focus-lg': 10;
    readonly 'radius-focus-xl': 14;
};
/**
 * Type Scale Tokens — Figma "Type scale" collection (y₀–y₉ → scale-0–scale-9).
 */
export declare const typeScale: {
    readonly 'scale-0': 12;
    readonly 'scale-1': 14;
    readonly 'scale-2': 16;
    readonly 'scale-3': 20;
    readonly 'scale-4': 24;
    readonly 'scale-5': 28;
    readonly 'scale-6': 32;
    readonly 'scale-7': 40;
    readonly 'scale-8': 48;
    readonly 'scale-9': 56;
};
/**
 * Font Family Tokens — Figma "Font family" collection.
 * Fallback stacks are added here; the Figma export only contains the primary name.
 */
export declare const fontFamily: {
    readonly normal: "Inter, sans-serif";
    readonly mono: "\"IBM Plex Mono\", monospace";
};
/**
 * Font Weight Tokens — Figma "Type weight" collection.
 */
export declare const fontWeight: {
    readonly thin: 100;
    readonly extralight: 200;
    readonly light: 300;
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
/**
 * Typography Style Tokens — Cozy density (default).
 * Sourced from Figma "Typography styles" collection, Cozy mode.
 */
export declare const typography: {
    readonly 'body-sm': {
        readonly fontSize: 14;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'body-md': {
        readonly fontSize: 16;
        readonly fontWeight: 400;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'body-lg': {
        readonly fontSize: 20;
        readonly fontWeight: 400;
        readonly lineHeight: 24;
        readonly letterSpacing: 0.16;
    };
    readonly 'mono-body-sm': {
        readonly fontFamily: "mono";
        readonly fontSize: 14;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'mono-body-md': {
        readonly fontFamily: "mono";
        readonly fontSize: 16;
        readonly fontWeight: 400;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'mono-body-lg': {
        readonly fontFamily: "mono";
        readonly fontSize: 20;
        readonly fontWeight: 400;
        readonly lineHeight: 24;
        readonly letterSpacing: 0.16;
    };
    readonly code: {
        readonly fontFamily: "mono";
        readonly fontSize: 12;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.32;
    };
    readonly helper: {
        readonly fontSize: 12;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.32;
    };
    readonly 'heading-xxs': {
        readonly fontSize: 14;
        readonly fontWeight: 600;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'heading-xs': {
        readonly fontSize: 16;
        readonly fontWeight: 600;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'heading-sm': {
        readonly fontSize: 20;
        readonly fontWeight: 500;
        readonly lineHeight: 24;
        readonly letterSpacing: 0;
    };
    readonly 'heading-md': {
        readonly fontSize: 24;
        readonly fontWeight: 400;
        readonly lineHeight: 28;
        readonly letterSpacing: 0;
    };
    readonly 'heading-lg': {
        readonly fontSize: 28;
        readonly fontWeight: 400;
        readonly lineHeight: 32;
        readonly letterSpacing: -0.2;
    };
    readonly 'heading-xl': {
        readonly fontSize: 32;
        readonly fontWeight: 300;
        readonly lineHeight: 36;
        readonly letterSpacing: 0;
    };
    readonly 'heading-xxl': {
        readonly fontSize: 40;
        readonly fontWeight: 300;
        readonly lineHeight: 48;
        readonly letterSpacing: 0;
    };
    readonly 'metric-xxs': {
        readonly fontFamily: "mono";
        readonly fontSize: 14;
        readonly fontWeight: 600;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'metric-xs': {
        readonly fontFamily: "mono";
        readonly fontSize: 16;
        readonly fontWeight: 600;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'metric-sm': {
        readonly fontFamily: "mono";
        readonly fontSize: 20;
        readonly fontWeight: 500;
        readonly lineHeight: 24;
        readonly letterSpacing: 0;
    };
    readonly 'metric-md': {
        readonly fontFamily: "mono";
        readonly fontSize: 24;
        readonly fontWeight: 400;
        readonly lineHeight: 28;
        readonly letterSpacing: 0;
    };
    readonly 'metric-lg': {
        readonly fontFamily: "mono";
        readonly fontSize: 28;
        readonly fontWeight: 400;
        readonly lineHeight: 32;
        readonly letterSpacing: 0;
    };
    readonly 'metric-xl': {
        readonly fontFamily: "mono";
        readonly fontSize: 32;
        readonly fontWeight: 300;
        readonly lineHeight: 36;
        readonly letterSpacing: 0;
    };
    readonly 'metric-xxl': {
        readonly fontFamily: "mono";
        readonly fontSize: 40;
        readonly fontWeight: 300;
        readonly lineHeight: 48;
        readonly letterSpacing: 0;
    };
};
/**
 * Typography Style Tokens — Compact density.
 * Sourced from Figma "Typography styles" collection, Compact mode.
 */
export declare const typographyCompact: {
    readonly 'body-sm': {
        readonly fontSize: 12;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'body-md': {
        readonly fontSize: 14;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'body-lg': {
        readonly fontSize: 16;
        readonly fontWeight: 400;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'mono-body-sm': {
        readonly fontFamily: "mono";
        readonly fontSize: 12;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'mono-body-md': {
        readonly fontFamily: "mono";
        readonly fontSize: 14;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'mono-body-lg': {
        readonly fontFamily: "mono";
        readonly fontSize: 16;
        readonly fontWeight: 400;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly code: {
        readonly fontFamily: "mono";
        readonly fontSize: 12;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.32;
    };
    readonly helper: {
        readonly fontSize: 12;
        readonly fontWeight: 400;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.32;
    };
    readonly 'heading-xxs': {
        readonly fontSize: 12;
        readonly fontWeight: 600;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'heading-xs': {
        readonly fontSize: 14;
        readonly fontWeight: 600;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'heading-sm': {
        readonly fontSize: 16;
        readonly fontWeight: 500;
        readonly lineHeight: 24;
        readonly letterSpacing: 0;
    };
    readonly 'heading-md': {
        readonly fontSize: 20;
        readonly fontWeight: 400;
        readonly lineHeight: 28;
        readonly letterSpacing: 0;
    };
    readonly 'heading-lg': {
        readonly fontSize: 24;
        readonly fontWeight: 400;
        readonly lineHeight: 32;
        readonly letterSpacing: 0;
    };
    readonly 'heading-xl': {
        readonly fontSize: 28;
        readonly fontWeight: 300;
        readonly lineHeight: 36;
        readonly letterSpacing: 0;
    };
    readonly 'heading-xxl': {
        readonly fontSize: 32;
        readonly fontWeight: 300;
        readonly lineHeight: 48;
        readonly letterSpacing: 0;
    };
    readonly 'metric-xxs': {
        readonly fontFamily: "mono";
        readonly fontSize: 14;
        readonly fontWeight: 600;
        readonly lineHeight: 16;
        readonly letterSpacing: 0.16;
    };
    readonly 'metric-xs': {
        readonly fontFamily: "mono";
        readonly fontSize: 16;
        readonly fontWeight: 600;
        readonly lineHeight: 20;
        readonly letterSpacing: 0.16;
    };
    readonly 'metric-sm': {
        readonly fontFamily: "mono";
        readonly fontSize: 20;
        readonly fontWeight: 500;
        readonly lineHeight: 24;
        readonly letterSpacing: 0;
    };
    readonly 'metric-md': {
        readonly fontFamily: "mono";
        readonly fontSize: 24;
        readonly fontWeight: 400;
        readonly lineHeight: 28;
        readonly letterSpacing: 0;
    };
    readonly 'metric-lg': {
        readonly fontFamily: "mono";
        readonly fontSize: 28;
        readonly fontWeight: 400;
        readonly lineHeight: 32;
        readonly letterSpacing: 0;
    };
    readonly 'metric-xl': {
        readonly fontFamily: "mono";
        readonly fontSize: 32;
        readonly fontWeight: 300;
        readonly lineHeight: 36;
        readonly letterSpacing: 0;
    };
    readonly 'metric-xxl': {
        readonly fontFamily: "mono";
        readonly fontSize: 40;
        readonly fontWeight: 300;
        readonly lineHeight: 48;
        readonly letterSpacing: 0;
    };
};
export type Spacing = typeof spacing;
export type Radius = typeof radius;
export type TypeScale = typeof typeScale;
export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
export type Typography = typeof typography;
export type TypographyCompact = typeof typographyCompact;
//# sourceMappingURL=dimension.d.ts.map