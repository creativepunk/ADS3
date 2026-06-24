import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsMultiSelectMenu as LitMultiSelectMenu,
  DsMultiSelectMenuItem as LitMultiSelectMenuItem,
} from '@my-ds/components/src/ds-multi-select-menu/ds-multi-select-menu.js';
import type { DsSelectMenuChangeEvent } from '@my-ds/components/src/shared/events.js';

export type DsMultiSelectMenuElement = LitMultiSelectMenu;
export type DsMultiSelectMenuItemElement = LitMultiSelectMenuItem;
export type { DsMultiSelectMenuItemSize } from '@my-ds/components/src/ds-multi-select-menu/ds-multi-select-menu.js';

// ─── DsMultiSelectMenu ────────────────────────────────────────────────────────

export interface DsMultiSelectMenuProps {
  size?: 'sm' | 'md';
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsSelectMenuChange?: (event: DsSelectMenuChangeEvent) => void;
}

export const DsMultiSelectMenu = createComponent({
  tagName: 'ds-multi-select-menu',
  elementClass: LitMultiSelectMenu,
  react: React,
  events: {
    onDsSelectMenuChange: 'ds-select-menu-change' as EventName<DsSelectMenuChangeEvent>,
  },
});
DsMultiSelectMenu.displayName = 'DsMultiSelectMenu';

// ─── DsMultiSelectMenuItem ────────────────────────────────────────────────────

export interface DsMultiSelectMenuItemProps {
  value?: string;
  selected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  children?: React.ReactNode;
}

export const DsMultiSelectMenuItem = createComponent({
  tagName: 'ds-multi-select-menu-item',
  elementClass: LitMultiSelectMenuItem,
  react: React,
  events: {},
});
DsMultiSelectMenuItem.displayName = 'DsMultiSelectMenuItem';
