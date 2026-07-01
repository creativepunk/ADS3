import React from 'react';
import { createComponent } from '@lit/react';
import { DsStatusMarker as LitStatusMarker } from '@my-ds/components/src/ds-status-marker/ds-status-marker.js';

export type { DsStatusMarkerStatus, DsStatusMarkerType } from '@my-ds/components/src/ds-status-marker/ds-status-marker.js';

export interface DsStatusMarkerProps {
  status?: 'failed' | 'in-progress' | 'success' | 'undefined' | 'warning' | 'in-active' | 'live';
  type?: 'subtle' | 'bold' | 'bolder' | 'boldest';
  className?: string;
  children?: React.ReactNode;
}

export const DsStatusMarker = createComponent({
  tagName: 'ds-status-marker',
  elementClass: LitStatusMarker,
  react: React,
  events: {},
});

DsStatusMarker.displayName = 'DsStatusMarker';
