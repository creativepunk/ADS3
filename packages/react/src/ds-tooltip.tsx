import * as React from 'react';
import { createComponent } from '@lit/react';
import {
  DsTooltip as LitDsTooltip,
  type DsTooltipAlign,
} from '@my-ds/components/src/ds-tooltip/ds-tooltip.js';

export type { DsTooltipAlign };
export type DsTooltipElement = LitDsTooltip;

export interface DsTooltipProps {
  /** Where the bubble appears relative to the trigger. Default: `'top'`. */
  align?: DsTooltipAlign;
  /** Single-line ellipsis truncation (420px) when true; wrapping (240px) when false. */
  truncate?: boolean;
  /** Close the tooltip when the trigger is activated (click, Enter, Space). */
  closeOnActivation?: boolean;
  /** Milliseconds before showing the tooltip. Default: 100. */
  enterDelayMs?: number;
  /** Milliseconds before hiding the tooltip. Default: 300. */
  leaveDelayMs?: number;
  /** Tooltip follows the mouse cursor instead of anchoring to the trigger. */
  mousePointer?: boolean;
  /** Only show the tooltip when the trigger element's text is visually truncated. */
  onlyWhenTruncated?: boolean;
  /** Keyboard shortcut displayed as a <kbd> badge inside the bubble. e.g. "⌘K". */
  shortcut?: string;
  className?: string;
  children?: React.ReactNode;
}

export const DsTooltip = createComponent({
  tagName: 'ds-tooltip',
  elementClass: LitDsTooltip,
  react: React,
  events: {},
});

DsTooltip.displayName = 'DsTooltip';
