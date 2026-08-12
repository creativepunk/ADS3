import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsDatePicker as LitDatePicker } from '@my-ds/components/src/ds-date-picker/ds-date-picker.js';
import type { DsDatePickerLayoutType } from '@my-ds/components/src/ds-date-picker/ds-date-picker.js';
import type {
  DsChangeEvent,
  DsFocusEvent,
  DsBlurEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsDatePickerLayoutType };

export interface DsDatePickerProps {
  type?: DsDatePickerLayoutType;
  label?: string;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  invalid?: boolean;
  valid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  min?: string;
  max?: string;
  className?: string;
  onDsChange?: (event: DsChangeEvent) => void;
  onDsFocus?: (event: DsFocusEvent) => void;
  onDsBlur?: (event: DsBlurEvent) => void;
}

export const DsDatePicker = createComponent({
  tagName: 'ds-date-picker',
  elementClass: LitDatePicker,
  react: React,
  events: {
    onDsChange: 'ds-change' as EventName<DsChangeEvent>,
    onDsFocus: 'ds-focus' as EventName<DsFocusEvent>,
    onDsBlur: 'ds-blur' as EventName<DsBlurEvent>,
  },
});

DsDatePicker.displayName = 'DsDatePicker';
