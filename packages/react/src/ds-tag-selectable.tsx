import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsTagSelectable as LitDsTagSelectable } from '@my-ds/components/src/ds-tag-selectable/ds-tag-selectable.js';
import type { DsTagSelectableSize } from '@my-ds/components/src/ds-tag-selectable/ds-tag-selectable.js';
import type { DsChangeEvent } from '@my-ds/components';

export type { DsTagSelectableSize };

export interface DsTagSelectableProps {
  size?: DsTagSelectableSize;
  selected?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
  label?: string;
  className?: string;
  children?: React.ReactNode;
  onDsChange?: (event: DsChangeEvent) => void;
}

export const DsTagSelectable = createComponent({
  tagName: 'ds-tag-selectable',
  elementClass: LitDsTagSelectable,
  react: React,
  events: {
    onDsChange: 'ds-change' as EventName<DsChangeEvent>,
  },
});

DsTagSelectable.displayName = 'DsTagSelectable';
