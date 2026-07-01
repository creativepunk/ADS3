/**
 * Shared event utilities for Lit components.
 *
 * All custom events in this design system:
 * - Are prefixed with `ds-`
 * - Bubble and compose by default
 * - Carry typed detail payloads
 */

export interface DsEventMap {
  'ds-click': DsClickEvent;
  'ds-change': DsChangeEvent;
  'ds-input': DsInputEvent;
  'ds-focus': DsFocusEvent;
  'ds-blur': DsBlurEvent;
  'ds-select': DsSelectEvent;
  'ds-navigate': DsNavigateEvent;
  'ds-button-click': DsButtonClickEvent;
  'ds-menu-click': DsMenuClickEvent;
  'ds-menu-action': DsMenuActionEvent;
  'ds-menu-select': DsMenuSelectEvent;
  'ds-select-menu-change': DsSelectMenuChangeEvent;
  'ds-select-change': DsSelectChangeEvent;
  'ds-combobox-change': DsComboboxChangeEvent;
  'ds-checkbox-change': DsCheckboxChangeEvent;
  'ds-radio-change': DsRadioChangeEvent;
  'ds-segmented-change': DsSegmentedChangeEvent;
  'ds-search-expand': DsSearchExpandEvent;
  'ds-search-clear': DsSearchClearEvent;
}

export interface DsClickEvent extends CustomEvent {
  detail: {
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

export interface DsButtonClickEvent extends CustomEvent {
  detail: {
    originalEvent: MouseEvent;
  };
}

export interface DsMenuClickEvent extends CustomEvent {
  detail: {
    originalEvent: MouseEvent;
  };
}

export interface DsMenuActionEvent extends CustomEvent {
  detail: {
    value: string;
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

export interface DsMenuSelectEvent extends CustomEvent {
  detail: {
    value: string;
    selected: boolean;
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

/** Fired by <ds-select-menu> when the user commits a selection change. */
export interface DsSelectMenuChangeEvent extends CustomEvent {
  detail: {
    /** All currently selected values. Single-select has at most one entry. */
    values: string[];
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

export interface DsChangeEvent extends CustomEvent {
  detail: {
    value: string | boolean | number;
    originalEvent?: Event;
  };
}

/** Fired by <ds-combobox> when the user commits a selection change. */
export interface DsComboboxChangeEvent extends CustomEvent {
  detail: {
    values: string[];
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

/** Fired by <ds-select> when the user commits a selection change. */
export interface DsSelectChangeEvent extends CustomEvent {
  detail: {
    /** All currently selected values. Single-select has at most one entry. */
    values: string[];
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

export interface DsCheckboxChangeEvent extends CustomEvent {
  detail: {
    value: boolean;
    originalEvent?: Event;
  };
}

export interface DsRadioChangeEvent extends CustomEvent {
  detail: {
    value: string;
    originalEvent?: Event;
  };
}

export interface DsSegmentedChangeEvent extends CustomEvent {
  detail: {
    value: string;
    selected: boolean;
    originalEvent: MouseEvent | KeyboardEvent;
  };
}

export interface DsSearchExpandEvent extends CustomEvent {
  detail: {
    originalEvent: MouseEvent | KeyboardEvent;
  };
}


export interface DsSearchClearEvent extends CustomEvent {
  detail: {
    originalEvent: MouseEvent;
  };
}

export interface DsInputEvent extends CustomEvent {
  detail: {
    value: string;
    originalEvent: InputEvent;
  };
}

export interface DsFocusEvent extends CustomEvent {
  detail: {
    originalEvent: FocusEvent;
  };
}

export interface DsBlurEvent extends CustomEvent {
  detail: {
    originalEvent: FocusEvent;
  };
}

/**
 * Fired when a date is selected (e.g. clicking a day in `<ds-calendar>`).
 * `value` is the ISO date string `YYYY-MM-DD`.
 */
export interface DsSelectEvent extends CustomEvent {
  detail: {
    value: string;
    day: number;
    month: number;
    year: number;
    date: Date;
    originalEvent?: Event;
  };
}

/**
 * Fired when the displayed/focused period changes (month or year navigation
 * in `<ds-calendar>`). `iso` is the focused date as `YYYY-MM-DD`.
 */
export interface DsNavigateEvent extends CustomEvent {
  detail: {
    day: number;
    month: number;
    year: number;
    iso: string;
    originalEvent?: Event;
  };
}

/**
 * Dispatch a typed custom event from a Lit element.
 *
 * @example
 * dispatch(this, 'ds-click', { originalEvent: e });
 */
export function dispatch<K extends keyof DsEventMap>(
  element: HTMLElement,
  eventName: K,
  detail: DsEventMap[K]['detail'],
  options?: Omit<CustomEventInit, 'detail'>,
): boolean {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    composed: true, // crosses shadow DOM boundary
    cancelable: true,
    detail,
    ...options,
  });
  return element.dispatchEvent(event);
}
