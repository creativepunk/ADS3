import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsNumberField as LitNumberField } from '@my-ds/components/src/ds-number-field/ds-number-field.js';
import type { DsNumberFieldType } from '@my-ds/components/src/ds-number-field/ds-number-field.js';
import type {
  DsChangeEvent,
  DsInputEvent,
  DsFocusEvent,
  DsBlurEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsNumberFieldType };
export type DsNumberFieldElement = LitNumberField;

export interface DsNumberFieldProps {
  type?: 'default' | 'inline';
  label?: string;
  isRequired?: boolean;
  value?: number | null;
  min?: number | null;
  max?: number | null;
  step?: number;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  invalid?: boolean;
  valid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  allowNegative?: boolean;
  className?: string;
  onDsChange?: (event: DsChangeEvent) => void;
  onDsInput?: (event: DsInputEvent) => void;
  onDsFocus?: (event: DsFocusEvent) => void;
  onDsBlur?: (event: DsBlurEvent) => void;
}

export const DsNumberField = createComponent({
  tagName: 'ds-number-field',
  elementClass: LitNumberField,
  react: React,
  events: {
    onDsChange: 'ds-change' as EventName<DsChangeEvent>,
    onDsInput: 'ds-input' as EventName<DsInputEvent>,
    onDsFocus: 'ds-focus' as EventName<DsFocusEvent>,
    onDsBlur: 'ds-blur' as EventName<DsBlurEvent>,
  },
});

DsNumberField.displayName = 'DsNumberField';
