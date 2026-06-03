import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  DsIcon as LitDsIcon,
  type DsIconSize,
  type DsIconStyle,
} from '@my-ds/components/src/ds-icon/ds-icon.js';

export type { DsIconSize, DsIconStyle };
export type DsIconElement = LitDsIcon;

export interface DsIconProps {
  name?: string;
  size?: DsIconSize;
  /** Maps to the `icon-style` HTML attribute. */
  iconStyle?: DsIconStyle;
  fill?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const DsIcon = createComponent({
  tagName: 'ds-icon',
  elementClass: LitDsIcon,
  react: React,
  events: {},
});

DsIcon.displayName = 'DsIcon';
