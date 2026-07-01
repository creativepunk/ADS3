import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsCheckboxGroup as LitDsCheckboxGroup } from '@my-ds/components/src/ds-checkbox/ds-checkbox-group.js';
import type { DsCheckboxGroupOrientation, DsCheckboxGroupType } from '@my-ds/components/src/ds-checkbox/ds-checkbox-group.js';

export type { DsCheckboxGroupOrientation, DsCheckboxGroupType };
export type DsCheckboxGroupElement = LitDsCheckboxGroup;

export interface DsCheckboxGroupProps {
  label?: string;
  name?: string;
  isRequired?: boolean;
  hasInfoTip?: boolean;
  hasError?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  optionOrientation?: DsCheckboxGroupOrientation;
  type?: DsCheckboxGroupType;
  helperText?: string;
  errorText?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DsCheckboxGroup = createComponent({
  tagName: 'ds-checkbox-group',
  elementClass: LitDsCheckboxGroup,
  react: React,
  events: {},
});

DsCheckboxGroup.displayName = 'DsCheckboxGroup';
