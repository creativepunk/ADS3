import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsToggle as LitToggle } from '@my-ds/components/src/ds-toggle/ds-toggle.js';
import type { DsToggleChangeEvent } from '@my-ds/components';

export type { DsToggleSize } from '@my-ds/components/src/ds-toggle/ds-toggle.js';
export type { DsToggleChangeEvent } from '@my-ds/components';

export interface DsToggleProps {
  isChecked?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: 'sm' | 'md';
  label?: string;
  description?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  className?: string;
  onDsToggleChange?: (event: DsToggleChangeEvent) => void;
}

export const DsToggle = createComponent({
  tagName: 'ds-toggle',
  elementClass: LitToggle,
  react: React,
  events: {
    onDsToggleChange: 'ds-toggle-change' as EventName<DsToggleChangeEvent>,
  },
});

DsToggle.displayName = 'DsToggle';
