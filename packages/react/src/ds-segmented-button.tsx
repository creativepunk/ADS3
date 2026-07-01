import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsSegmentedButton as LitDsSegmentedButton } from '@my-ds/components/src/ds-segmented-button/ds-segmented-button.js';
import { DsSegmentedButtonItem as LitDsSegmentedButtonItem } from '@my-ds/components/src/ds-segmented-button/ds-segmented-button.js';
import type { DsSegmentedChangeEvent } from '@my-ds/components';
import type { DsSegmentedButtonSize } from '@my-ds/components/src/ds-segmented-button/ds-segmented-button.js';

export type { DsSegmentedButtonSize };
export type { DsSegmentedChangeEvent };
export type DsSegmentedButtonElement = LitDsSegmentedButton;
export type DsSegmentedButtonItemElement = LitDsSegmentedButtonItem;

export interface DsSegmentedButtonProps {
  size?: DsSegmentedButtonSize;
  isDisabled?: boolean;
  widthFill?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface DsSegmentedButtonItemProps {
  value?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  iconOnly?: boolean;
  label?: string;
  size?: DsSegmentedButtonSize;
  className?: string;
  children?: React.ReactNode;
  onDsSegmentedChange?: (event: DsSegmentedChangeEvent) => void;
}

export const DsSegmentedButton = createComponent({
  tagName: 'ds-segmented-button',
  elementClass: LitDsSegmentedButton,
  react: React,
  events: {},
});

DsSegmentedButton.displayName = 'DsSegmentedButton';

export const DsSegmentedButtonItem = createComponent({
  tagName: 'ds-segmented-button-item',
  elementClass: LitDsSegmentedButtonItem,
  react: React,
  events: {
    onDsSegmentedChange: 'ds-segmented-change' as EventName<DsSegmentedChangeEvent>,
  },
});

DsSegmentedButtonItem.displayName = 'DsSegmentedButtonItem';
