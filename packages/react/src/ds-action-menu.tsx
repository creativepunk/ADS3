import React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsActionMenu as LitActionMenu,
  DsActionMenuItem as LitActionMenuItem,
  DsActionMenuSeparator as LitActionMenuSeparator,
  DsActionMenuGroup as LitActionMenuGroup,
} from '@my-ds/components/src/ds-action-menu/ds-action-menu.js';
import type { DsMenuActionEvent } from '@my-ds/components/src/shared/events.js';

export type DsActionMenuElement = LitActionMenu;
export type DsActionMenuItemElement = LitActionMenuItem;
export type DsActionMenuSeparatorElement = LitActionMenuSeparator;
export type DsActionMenuGroupElement = LitActionMenuGroup;
export type { DsActionMenuItemVariant, DsActionMenuItemSize } from '@my-ds/components/src/ds-action-menu/ds-action-menu.js';

// ─── DsActionMenu ────────────────────────────────────────────────────────────

export interface DsActionMenuProps {
  size?: 'sm' | 'md';
  className?: string;
  children?: React.ReactNode;
}

export const DsActionMenu = createComponent({
  tagName: 'ds-action-menu',
  elementClass: LitActionMenu,
  react: React,
  events: {},
});
DsActionMenu.displayName = 'DsActionMenu';

// ─── DsActionMenuGroup ────────────────────────────────────────────────────────

export interface DsActionMenuGroupProps {
  hasSeparator?: boolean;
  title?: string;
  selectionType?: 'checkbox' | 'radio';
  className?: string;
  children?: React.ReactNode;
}

export const DsActionMenuGroup = createComponent({
  tagName: 'ds-action-menu-group',
  elementClass: LitActionMenuGroup,
  react: React,
  events: {},
});
DsActionMenuGroup.displayName = 'DsActionMenuGroup';

// ─── DsActionMenuItem ─────────────────────────────────────────────────────────

export interface DsActionMenuItemProps {
  value?: string;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  size?: 'sm' | 'md';
  shortcut?: string;
  hasSubMenu?: boolean;
  isChecked?: boolean;
  className?: string;
  children?: React.ReactNode;
  onDsMenuAction?: (event: DsMenuActionEvent) => void;
}

export const DsActionMenuItem = createComponent({
  tagName: 'ds-action-menu-item',
  elementClass: LitActionMenuItem,
  react: React,
  events: {
    onDsMenuAction: 'ds-menu-action' as EventName<DsMenuActionEvent>,
  },
});
DsActionMenuItem.displayName = 'DsActionMenuItem';

// ─── DsActionMenuSeparator (escape hatch) ─────────────────────────────────────

export interface DsActionMenuSeparatorProps {
  className?: string;
}

export const DsActionMenuSeparator = createComponent({
  tagName: 'ds-action-menu-separator',
  elementClass: LitActionMenuSeparator,
  react: React,
  events: {},
});
DsActionMenuSeparator.displayName = 'DsActionMenuSeparator';
