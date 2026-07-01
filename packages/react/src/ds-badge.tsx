import * as React from 'react';
import { createComponent } from '@lit/react';
import { DsBadge as LitDsBadge } from '@my-ds/components/src/ds-badge/ds-badge.js';
import type { DsBadgeColor } from '@my-ds/components/src/ds-badge/ds-badge.js';

export type { DsBadgeColor };

export interface DsBadgeProps {
  color?: DsBadgeColor;
  hasIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const DsBadge = createComponent({
  tagName: 'ds-badge',
  elementClass: LitDsBadge,
  react: React,
  events: {},
});

DsBadge.displayName = 'DsBadge';
