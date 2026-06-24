import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsFormLabel as LitDsFormLabel } from '@my-ds/components/src/ds-form-label/ds-form-label.js';

export type DsFormLabelElement = LitDsFormLabel;

export interface DsFormLabelProps {
  /** Label text content. */
  label?: string;
  /** Appends a red asterisk to mark the field as required. */
  isRequired?: boolean;
  /** Shows a small info icon after the label text. */
  hasInfoTip?: boolean;
  /** Associates this label with a form control via its id. */
  for?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DsFormLabel = createComponent({
  tagName: 'ds-form-label',
  elementClass: LitDsFormLabel,
  react: React,
  events: {},
});

DsFormLabel.displayName = 'DsFormLabel';
