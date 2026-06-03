import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
/**
 * Global component reset applied to every :host.
 * Ensures box-model consistency across shadow roots.
 */
export declare const resetStyles: import("lit").CSSResult;
/**
 * Focus ring styles using the design system focus tokens.
 * Apply to interactive elements via the .ds-focus-ring mixin pattern.
 */
export declare const focusRingStyles: import("lit").CSSResult;
/**
 * Standard focus ring for inner elements (buttons, inputs).
 * outline automatically follows the element's own border-radius at the
 * 2px offset — no border-radius override needed here.
 */
export declare const innerFocusRingStyles: import("lit").CSSResult;
/**
 * Visually hidden — accessible but invisible.
 * For screen-reader-only text.
 */
export declare const srOnlyStyles: import("lit").CSSResult;
/**
 * Typography base applied to all components.
 * Sets font family from the design token.
 */
export declare const typographyBaseStyles: import("lit").CSSResult;
//# sourceMappingURL=styles.d.ts.map