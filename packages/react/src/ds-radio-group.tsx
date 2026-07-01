import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsRadioGroup as LitDsRadioGroup } from '@my-ds/components/src/ds-radio/ds-radio-group.js';
import type { DsRadioGroupOrientation, DsRadioGroupType } from '@my-ds/components/src/ds-radio/ds-radio-group.js';

export type { DsRadioGroupOrientation, DsRadioGroupType };
export type DsRadioGroupElement = LitDsRadioGroup;

export interface DsRadioGroupProps {
  label?: string;
  name?: string;
  isRequired?: boolean;
  hasInfoTip?: boolean;
  hasError?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  defaultFirstSelected?: boolean;
  optionOrientation?: DsRadioGroupOrientation;
  type?: DsRadioGroupType;
  helperText?: string;
  errorText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DsRadioGroup = createComponent({
  tagName: 'ds-radio-group',
  elementClass: LitDsRadioGroup,
  react: React,
  events: {},
});

DsRadioGroup.displayName = 'DsRadioGroup';
