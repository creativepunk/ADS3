import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsCombobox as LitDsCombobox } from '@my-ds/components/src/ds-combobox/ds-combobox.js';
import type { DsComboboxType, DsComboboxOption } from '@my-ds/components/src/ds-combobox/ds-combobox.js';
import type { DsComboboxChangeEvent } from '@my-ds/components/src/shared/events.js';

export type { DsComboboxType, DsComboboxOption };
export type DsComboboxElement = LitDsCombobox;

export interface DsComboboxProps {
  selection?: 'single' | 'multi';
  type?: DsComboboxType;
  label?: string;
  placeholder?: string;
  options?: DsComboboxOption[];
  values?: string[];
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  isRequired?: boolean;
  loading?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  valid?: boolean;
  className?: string;
  onDsComboboxChange?: (event: DsComboboxChangeEvent) => void;
}

export const DsCombobox = createComponent({
  tagName: 'ds-combobox',
  elementClass: LitDsCombobox,
  react: React,
  events: {
    onDsComboboxChange: 'ds-combobox-change' as EventName<DsComboboxChangeEvent>,
  },
});

DsCombobox.displayName = 'DsCombobox';
