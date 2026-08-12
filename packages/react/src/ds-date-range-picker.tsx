import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsDateRangePicker as LitDateRangePicker } from '@my-ds/components/src/ds-date-range-picker/ds-date-range-picker.js';
import type { DsDateRangePickerLayoutType } from '@my-ds/components/src/ds-date-range-picker/ds-date-range-picker.js';
import type {
  DsDateRangeChangeEvent,
  DsFocusEvent,
  DsBlurEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsDateRangePickerLayoutType, DsDateRangeChangeEvent };

export interface DsDateRangePickerProps {
  type?: DsDateRangePickerLayoutType;
  label?: string;
  isRequired?: boolean;
  startDate?: string;
  endDate?: string;
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
  onDsDateRangeChange?: (event: DsDateRangeChangeEvent) => void;
  onDsFocus?: (event: DsFocusEvent) => void;
  onDsBlur?: (event: DsBlurEvent) => void;
}

export const DsDateRangePicker = createComponent({
  tagName: 'ds-date-range-picker',
  elementClass: LitDateRangePicker,
  react: React,
  events: {
    onDsDateRangeChange: 'ds-date-range-change' as EventName<DsDateRangeChangeEvent>,
    onDsFocus: 'ds-focus' as EventName<DsFocusEvent>,
    onDsBlur: 'ds-blur' as EventName<DsBlurEvent>,
  },
});

DsDateRangePicker.displayName = 'DsDateRangePicker';
