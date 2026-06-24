import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsCheckbox as LitDsCheckbox } from '@my-ds/components/src/ds-checkbox/ds-checkbox.js';
import type { DsCheckboxChangeEvent } from '@my-ds/components/src/shared/events.js';

export type { DsCheckboxChangeEvent };
export type DsCheckboxElement = LitDsCheckbox;

export interface DsCheckboxProps {
  label?: string;
  description?: string;
  name?: string;
  value?: string;
  inputId?: string;
  title?: string;
  isChecked?: boolean;
  isIndeterminate?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsCheckboxChange?: (event: DsCheckboxChangeEvent) => void;
}

export const DsCheckbox = createComponent({
  tagName: 'ds-checkbox',
  elementClass: LitDsCheckbox,
  react: React,
  events: {
    onDsCheckboxChange: 'ds-checkbox-change' as EventName<DsCheckboxChangeEvent>,
  },
});

DsCheckbox.displayName = 'DsCheckbox';
