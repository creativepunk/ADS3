/**
 * @my-ds/components
 *
 * Lit Web Component library for My Design System.
 * Import individual components or side-effect register them all.
 *
 * @example
 * // Tree-shakeable: import only what you need
 * import '@my-ds/components/src/ds-button.js';
 *
 * // Or import the class for use with @lit/react
 * import { DsButton } from '@my-ds/components';
 */
export * from './shared/events.js';
export * from './shared/styles.js';
export { DsButton } from './ds-button/ds-button.js';
export type { DsButtonVariant, DsButtonSize, DsButtonType, } from './ds-button/ds-button.js';
export { DsIconButton } from './ds-icon-button/ds-icon-button.js';
export type { DsIconButtonVariant, DsIconButtonSize, DsIconButtonShape, } from './ds-icon-button/ds-icon-button.js';
export { DsIcon, setIconResolver, createMaterialSymbolsResolver, } from './ds-icon/ds-icon.js';
export type { DsIconSize, DsIconStyle, DsIconResolver, } from './ds-icon/ds-icon.js';
export { DsCalendar } from './ds-calendar/ds-calendar.js';
export type { DsCalendarMarkerColor, DsCalendarMarkers, DsCalendarDisabledDates, } from './ds-calendar/ds-calendar.js';
export { DsTooltip } from './ds-tooltip/ds-tooltip.js';
//# sourceMappingURL=index.d.ts.map