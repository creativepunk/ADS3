import React from 'react';
import { createComponent } from '@lit/react';
import { DsSpinner as LitSpinner } from '@my-ds/components/src/ds-spinner/ds-spinner.js';

export type { DsSpinnerSize, DsSpinnerAppearance } from '@my-ds/components/src/ds-spinner/ds-spinner.js';

export interface DsSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  appearance?: 'inherit' | 'inverted';
  label?: string;
  className?: string;
}

export const DsSpinner = createComponent({
  tagName: 'ds-spinner',
  elementClass: LitSpinner,
  react: React,
  events: {},
});

DsSpinner.displayName = 'DsSpinner';
