import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsTag as LitDsTag } from '@my-ds/components/src/ds-tag/ds-tag.js';
import type { DsTagColor, DsTagSize } from '@my-ds/components/src/ds-tag/ds-tag.js';
import type { DsTagDismissEvent } from '@my-ds/components';

export type { DsTagColor, DsTagSize };

export interface DsTagProps {
  color?: DsTagColor;
  size?: DsTagSize;
  disabled?: boolean;
  isDismissable?: boolean;
  hasIcon?: boolean;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  onDsTagDismiss?: (event: DsTagDismissEvent) => void;
}

export const DsTag = createComponent({
  tagName: 'ds-tag',
  elementClass: LitDsTag,
  react: React,
  events: {
    onDsTagDismiss: 'ds-tag-dismiss' as EventName<DsTagDismissEvent>,
  },
});

DsTag.displayName = 'DsTag';
