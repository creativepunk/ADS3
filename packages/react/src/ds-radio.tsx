import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsRadio as LitDsRadio } from '@my-ds/components/src/ds-radio/ds-radio.js';
import type { DsRadioChangeEvent } from '@my-ds/components/src/shared/events.js';

export type { DsRadioChangeEvent };
export type DsRadioElement = LitDsRadio;

export interface DsRadioProps {
  label?: string;
  description?: string;
  name?: string;
  value?: string;
  inputId?: string;
  title?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  isRequired?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsRadioChange?: (event: DsRadioChangeEvent) => void;
}

export const DsRadio = createComponent({
  tagName: 'ds-radio',
  elementClass: LitDsRadio,
  react: React,
  events: {
    onDsRadioChange: 'ds-radio-change' as EventName<DsRadioChangeEvent>,
  },
});

DsRadio.displayName = 'DsRadio';
