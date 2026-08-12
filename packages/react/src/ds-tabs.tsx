import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import { DsTabs as LitDsTabs } from '@my-ds/components/src/ds-tabs/ds-tabs.js';
import { DsTab as LitDsTab } from '@my-ds/components/src/ds-tabs/ds-tabs.js';
import type { DsTabChangeEvent } from '@my-ds/components';

export type { DsTabChangeEvent };
export type DsTabsElement = LitDsTabs;
export type DsTabElement = LitDsTab;

export interface DsTabsProps {
  value?: string;
  isDisabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsTabChange?: (event: DsTabChangeEvent) => void;
}

export interface DsTabProps {
  value?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  count?: number;
  className?: string;
  children?: React.ReactNode;
  onDsTabChange?: (event: DsTabChangeEvent) => void;
}

export const DsTabs = createComponent({
  tagName: 'ds-tabs',
  elementClass: LitDsTabs,
  react: React,
  events: {
    onDsTabChange: 'ds-tab-change' as EventName<DsTabChangeEvent>,
  },
});

DsTabs.displayName = 'DsTabs';

export const DsTab = createComponent({
  tagName: 'ds-tab',
  elementClass: LitDsTab,
  react: React,
  events: {
    onDsTabChange: 'ds-tab-change' as EventName<DsTabChangeEvent>,
  },
});

DsTab.displayName = 'DsTab';
