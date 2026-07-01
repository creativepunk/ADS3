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

// ─── Shared utilities (re-exported for wrapper authors) ──────────────────────
export * from './shared/events.js';
export * from './shared/styles.js';

// ─── Components ──────────────────────────────────────────────────────────────
// Each export both registers the custom element AND exports the class.
// Add new components here as they are created.

export { DsButton } from './ds-button/ds-button.js';
export type {
  DsButtonVariant,
  DsButtonSize,
  DsButtonType,
} from './ds-button/ds-button.js';

export { DsIconButton } from './ds-icon-button/ds-icon-button.js';
export type {
  DsIconButtonVariant,
  DsIconButtonSize,
  DsIconButtonShape,
} from './ds-icon-button/ds-icon-button.js';

export {
  DsIcon,
  setIconResolver,
  createMaterialSymbolsResolver,
} from './ds-icon/ds-icon.js';
export type {
  DsIconSize,
  DsIconStyle,
  DsIconResolver,
} from './ds-icon/ds-icon.js';

export { DsCalendar } from './ds-calendar/ds-calendar.js';
export type {
  DsCalendarMarkerColor,
  DsCalendarMarkers,
  DsCalendarDisabledDates,
} from './ds-calendar/ds-calendar.js';

export { DsTooltip } from './ds-tooltip/ds-tooltip.js';

export { DsSplitButton } from './ds-split-button/ds-split-button.js';
export type { DsSplitButtonSize } from './ds-split-button/ds-split-button.js';

export { DsMenuCategory } from './ds-menu-category/ds-menu-category.js';

export {
  DsActionMenu,
  DsActionMenuItem,
  DsActionMenuSeparator,
} from './ds-action-menu/ds-action-menu.js';
export type {
  DsActionMenuItemVariant,
  DsActionMenuItemSize,
} from './ds-action-menu/ds-action-menu.js';

export {
  DsSingleSelectMenu,
  DsSingleSelectMenuItem,
} from './ds-single-select-menu/ds-single-select-menu.js';
export type { DsSingleSelectMenuItemSize } from './ds-single-select-menu/ds-single-select-menu.js';

export {
  DsMultiSelectMenu,
  DsMultiSelectMenuItem,
} from './ds-multi-select-menu/ds-multi-select-menu.js';
export type { DsMultiSelectMenuItemSize } from './ds-multi-select-menu/ds-multi-select-menu.js';

export { DsFormLabel } from './ds-form-label/ds-form-label.js';

export { DsFormMessage } from './ds-form-message/ds-form-message.js';
export type { DsFormMessageType } from './ds-form-message/ds-form-message.js';

export { DsCheckbox } from './ds-checkbox/ds-checkbox.js';

export { DsCheckboxGroup } from './ds-checkbox/ds-checkbox-group.js';
export type {
  DsCheckboxGroupOrientation,
  DsCheckboxGroupType,
} from './ds-checkbox/ds-checkbox-group.js';

export { DsRadio } from './ds-radio/ds-radio.js';

export { DsRadioGroup } from './ds-radio/ds-radio-group.js';
export type {
  DsRadioGroupOrientation,
  DsRadioGroupType,
} from './ds-radio/ds-radio-group.js';

export { DsBadge } from './ds-badge/ds-badge.js';
export type { DsBadgeColor } from './ds-badge/ds-badge.js';

export { DsSegmentedButton, DsSegmentedButtonItem } from './ds-segmented-button/ds-segmented-button.js';
export type { DsSegmentedButtonSize } from './ds-segmented-button/ds-segmented-button.js';

export { DsFieldInput } from './ds-field-input/ds-field-input.js';
export type { DsFieldInputLayoutType } from './ds-field-input/ds-field-input.js';

export { DsSelect } from './ds-select/ds-select.js';
export type { DsSelectSelection, DsSelectType } from './ds-select/ds-select.js';

export { DsCombobox } from './ds-combobox/ds-combobox.js';
export type { DsComboboxType, DsComboboxOption } from './ds-combobox/ds-combobox.js';

export { DsSpinner } from './ds-spinner/ds-spinner.js';
export type { DsSpinnerSize, DsSpinnerAppearance } from './ds-spinner/ds-spinner.js';

export { DsStatusMarker } from './ds-status-marker/ds-status-marker.js';
export type {
  DsStatusMarkerStatus,
  DsStatusMarkerType,
} from './ds-status-marker/ds-status-marker.js';

export { DsNumberField } from './ds-number-field/ds-number-field.js';
export type { DsNumberFieldType } from './ds-number-field/ds-number-field.js';

export { DsSearch } from './ds-search/ds-search.js';
export type { DsSearchVariant } from './ds-search/ds-search.js';
