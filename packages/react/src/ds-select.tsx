import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsSelect as LitDsSelect } from '@my-ds/components/src/ds-select/ds-select.js';
import type { DsSelectSelection, DsSelectType } from '@my-ds/components/src/ds-select/ds-select.js';
import type { DsSelectChangeEvent } from '@my-ds/components/src/shared/events.js';

export type { DsSelectSelection, DsSelectType };
export type DsSelectElement = LitDsSelect;

export interface DsSelectProps {
  selection?: DsSelectSelection;
  type?: DsSelectType;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  isRequired?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  valid?: boolean;
  values?: string[];
  className?: string;
  children?: React.ReactNode;
  onDsSelectChange?: (event: DsSelectChangeEvent) => void;
}

export const DsSelect = createComponent({
  tagName: 'ds-select',
  elementClass: LitDsSelect,
  react: React,
  events: {
    onDsSelectChange: 'ds-select-change' as EventName<DsSelectChangeEvent>,
  },
});

DsSelect.displayName = 'DsSelect';
