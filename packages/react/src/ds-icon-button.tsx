import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsIconButton as LitDsIconButton,
  type DsIconButtonVariant,
  type DsIconButtonSize,
  type DsIconButtonShape,
  type DsTooltipAlign,
} from '@my-ds/components/src/ds-icon-button/ds-icon-button.js';
import type { DsClickEvent } from '@my-ds/components/src/shared/events.js';

export type { DsIconButtonVariant, DsIconButtonSize, DsIconButtonShape, DsTooltipAlign };
export type DsIconButtonElement = LitDsIconButton;

export interface DsIconButtonProps {
  variant?: 'primary' | 'tertiary' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  shape?: 'default' | 'circle';
  isDisabled?: boolean;
  isSelected?: boolean;
  ariaLabel?: string;
  /** Tooltip label text. The tooltip only renders when this is set and isTooltipDisabled is false. */
  tooltip?: string;
  /** Hides the built-in tooltip. Defaults to true — opt in by setting this to false. */
  isTooltipDisabled?: boolean;
  /** Alignment of the built-in tooltip. Defaults to 'bottom'. */
  tooltipAlign?: DsTooltipAlign;
  className?: string;
  children?: React.ReactNode;
  onDsClick?: (event: DsClickEvent) => void;
}

export const DsIconButton = createComponent({
  tagName: 'ds-icon-button',
  elementClass: LitDsIconButton,
  react: React,
  events: {
    onDsClick: 'ds-click' as EventName<DsClickEvent>,
  },
});

DsIconButton.displayName = 'DsIconButton';
