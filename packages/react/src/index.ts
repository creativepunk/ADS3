/**
 * @my-ds/react
 *
 * React wrappers for My Design System Web Components.
 * Built with @lit/react createComponent().
 *
 * Each wrapper:
 * - Maps Lit @property() → React prop (including boolean attrs)
 * - Maps custom `ds-*` events → React `on*` synthetic event props
 * - Re-exports the prop types for full TypeScript support
 *
 * @example
 * import { DsButton } from '@my-ds/react';
 * <DsButton variant="primary" onDsClick={(e) => console.log(e.detail)} />
 */

// ─── Components ──────────────────────────────────────────────────────────────
// Add new wrappers here as components are created.

export { DsButton } from './ds-button.js';
export type { DsButtonProps } from './ds-button.js';

export { DsIconButton } from './ds-icon-button.js';
export type { DsIconButtonProps } from './ds-icon-button.js';

export { DsIcon } from './ds-icon.js';
export type { DsIconProps, DsIconSize, DsIconStyle } from './ds-icon.js';

export { DsCalendar } from './ds-calendar.js';
export type {
  DsCalendarProps,
  DsCalendarMarkerColor,
  DsCalendarMarkers,
} from './ds-calendar.js';

export { DsTooltip } from './ds-tooltip.js';
export type { DsTooltipProps } from './ds-tooltip.js';

export { DsSplitButton } from './ds-split-button.js';
export type { DsSplitButtonProps } from './ds-split-button.js';

export {
  DsActionMenu,
  DsActionMenuGroup,
  DsActionMenuItem,
  DsActionMenuSeparator,
} from './ds-action-menu.js';
export type {
  DsActionMenuProps,
  DsActionMenuGroupProps,
  DsActionMenuItemProps,
  DsActionMenuSeparatorProps,
} from './ds-action-menu.js';

export { DsSingleSelectMenu, DsSingleSelectMenuItem } from './ds-single-select-menu.js';
export type {
  DsSingleSelectMenuProps,
  DsSingleSelectMenuItemProps,
} from './ds-single-select-menu.js';

export { DsMultiSelectMenu, DsMultiSelectMenuItem } from './ds-multi-select-menu.js';
export type {
  DsMultiSelectMenuProps,
  DsMultiSelectMenuItemProps,
} from './ds-multi-select-menu.js';

export { DsFormLabel } from './ds-form-label.js';
export type { DsFormLabelProps } from './ds-form-label.js';

export { DsFormMessage } from './ds-form-message.js';
export type { DsFormMessageProps, DsFormMessageType } from './ds-form-message.js';

export { DsCheckbox } from './ds-checkbox.js';
export type { DsCheckboxProps, DsCheckboxChangeEvent } from './ds-checkbox.js';

export { DsCheckboxGroup } from './ds-checkbox-group.js';
export type {
  DsCheckboxGroupProps,
  DsCheckboxGroupOrientation,
  DsCheckboxGroupType,
} from './ds-checkbox-group.js';
