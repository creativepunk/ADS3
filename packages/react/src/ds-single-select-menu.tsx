import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsSingleSelectMenu as LitSingleSelectMenu,
  DsSingleSelectMenuItem as LitSingleSelectMenuItem,
} from '@my-ds/components/src/ds-single-select-menu/ds-single-select-menu.js';
import type { DsSelectMenuChangeEvent } from '@my-ds/components/src/shared/events.js';

export type DsSingleSelectMenuElement = LitSingleSelectMenu;
export type DsSingleSelectMenuItemElement = LitSingleSelectMenuItem;
export type { DsSingleSelectMenuItemSize } from '@my-ds/components/src/ds-single-select-menu/ds-single-select-menu.js';

// ─── DsSingleSelectMenu ───────────────────────────────────────────────────────

export interface DsSingleSelectMenuProps {
  size?: 'sm' | 'md';
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsSelectMenuChange?: (event: DsSelectMenuChangeEvent) => void;
}

export const DsSingleSelectMenu = createComponent({
  tagName: 'ds-single-select-menu',
  elementClass: LitSingleSelectMenu,
  react: React,
  events: {
    onDsSelectMenuChange: 'ds-select-menu-change' as EventName<DsSelectMenuChangeEvent>,
  },
});
DsSingleSelectMenu.displayName = 'DsSingleSelectMenu';

// ─── DsSingleSelectMenuItem ───────────────────────────────────────────────────

export interface DsSingleSelectMenuItemProps {
  value?: string;
  selected?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
  children?: React.ReactNode;
}

export const DsSingleSelectMenuItem = createComponent({
  tagName: 'ds-single-select-menu-item',
  elementClass: LitSingleSelectMenuItem,
  react: React,
  events: {},
});
DsSingleSelectMenuItem.displayName = 'DsSingleSelectMenuItem';
