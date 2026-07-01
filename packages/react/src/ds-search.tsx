import * as React from 'react';
import { createComponent, type EventName } from '@lit/react';
import {
  DsSearch as LitDsSearch,
  type DsSearchVariant,
} from '@my-ds/components/src/ds-search/ds-search.js';
import type {
  DsInputEvent,
  DsSearchExpandEvent,
  DsSearchClearEvent,
} from '@my-ds/components/src/shared/events.js';

export type { DsSearchVariant };
export type DsSearchElement = LitDsSearch;

export interface DsSearchProps {
  variant?: DsSearchVariant;
  placeholder?: string;
  hasValue?: boolean;
  disabled?: boolean;
  value?: string;
  name?: string;
  closeButtonAssistiveText?: string;
  className?: string;
  children?: React.ReactNode;
  onDsInput?: (event: DsInputEvent) => void;
  onDsSearchExpand?: (event: DsSearchExpandEvent) => void;
  onDsSearchClear?: (event: DsSearchClearEvent) => void;
}

export const DsSearch = createComponent({
  tagName: 'ds-search',
  elementClass: LitDsSearch,
  react: React,
  events: {
    onDsInput: 'ds-input' as EventName<DsInputEvent>,
    onDsSearchExpand: 'ds-search-expand' as EventName<DsSearchExpandEvent>,
    onDsSearchClear: 'ds-search-clear' as EventName<DsSearchClearEvent>,
  },
});

DsSearch.displayName = 'DsSearch';
