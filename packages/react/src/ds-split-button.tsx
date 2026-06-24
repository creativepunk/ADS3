import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsSplitButton as LitDsSplitButton,
  type DsSplitButtonSize,
  type DsSplitButtonVariant,
  type DsSplitButtonType,
} from '@my-ds/components/src/ds-split-button/ds-split-button.js';
import type {
  DsButtonClickEvent,
  DsMenuClickEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsSplitButtonSize, DsSplitButtonVariant, DsSplitButtonType };
export type DsSplitButtonElement = LitDsSplitButton;

export interface DsSplitButtonProps {
  variant?: DsSplitButtonVariant;
  type?: DsSplitButtonType;
  size?: DsSplitButtonSize;
  isDisabled?: boolean;
  isMenuOpen?: boolean;
  menuAriaLabel?: string;
  className?: string;
  children?: React.ReactNode;
  onDsButtonClick?: (event: DsButtonClickEvent) => void;
  onDsMenuClick?: (event: DsMenuClickEvent) => void;
}

export const DsSplitButton = createComponent({
  tagName: 'ds-split-button',
  elementClass: LitDsSplitButton,
  react: React,
  events: {
    onDsButtonClick: 'ds-button-click' as EventName<DsButtonClickEvent>,
    onDsMenuClick: 'ds-menu-click' as EventName<DsMenuClickEvent>,
  },
});

DsSplitButton.displayName = 'DsSplitButton';
