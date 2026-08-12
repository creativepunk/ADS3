import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsDateInput as LitDateInput } from '@my-ds/components/src/ds-date-input/ds-date-input.js';
import type { DsDateInputLayoutType } from '@my-ds/components/src/ds-date-input/ds-date-input.js';
import type {
  DsChangeEvent,
  DsFocusEvent,
  DsBlurEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsDateInputLayoutType };

export interface DsDateInputProps {
  type?: DsDateInputLayoutType;
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

export const DsDateInput = createComponent({
  tagName: 'ds-date-input',
  elementClass: LitDateInput,
  react: React,
  events: {
    onDsChange: 'ds-change' as EventName<DsChangeEvent>,
    onDsFocus: 'ds-focus' as EventName<DsFocusEvent>,
    onDsBlur: 'ds-blur' as EventName<DsBlurEvent>,
  },
});

DsDateInput.displayName = 'DsDateInput';
