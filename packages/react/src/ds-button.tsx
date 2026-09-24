import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsButton as LitDsButton,
  type DsButtonVariant,
  type DsButtonSize,
  type DsButtonType,
} from '@my-ds/components/src/ds-button/ds-button.js';
import type { DsClickEvent } from '@my-ds/components/src/shared/events.js';

export type { DsButtonVariant, DsButtonSize, DsButtonType };
export type DsButtonElement = LitDsButton;

export interface DsButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  isDisabled?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsClick?: (event: DsClickEvent) => void;
}

export const DsButton = createComponent({
  tagName: 'ds-button',
  elementClass: LitDsButton,
  react: React,
  events: {
    onDsClick: 'ds-click' as EventName<DsClickEvent>,
  },
});

DsButton.displayName = 'DsButton';
