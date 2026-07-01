import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-status-marker.js';
import type { DsStatusMarkerStatus, DsStatusMarkerType } from './ds-status-marker.js';

interface StatusMarkerArgs {
  status: DsStatusMarkerStatus;
  type: DsStatusMarkerType;
  label: string;
}

const STATUSES: DsStatusMarkerStatus[] = [
  'failed', 'success', 'warning', 'in-progress', 'undefined', 'in-active', 'live',
];

const TYPES: DsStatusMarkerType[] = ['subtle', 'bold', 'bolder', 'boldest'];

const LABELS: Record<DsStatusMarkerStatus, string> = {
  failed: 'Failed',
  success: 'Success',
  warning: 'Warning',
  'in-progress': 'In-progress',
  undefined: 'Undefined',
  'in-active': 'Inactive',
  live: 'Live',
};

const meta: Meta<StatusMarkerArgs> = {
  title: 'Components/Status Marker',
  component: 'ds-status-marker',
  argTypes: {
    status: {
      control: 'select',
      options: STATUSES,
      description: 'Semantic status state driving icon and color.',
      table: {
        type: { summary: STATUSES.map(s => `'${s}'`).join(' | ') },
        defaultValue: { summary: 'failed' },
        category: 'Props',
      },
    },
    type: {
      control: 'inline-radio',
      options: TYPES,
      description: 'Visual weight: subtle (text only), bold (colored text), bolder (bordered), boldest (filled).',
      table: {
        type: { summary: TYPES.map(t => `'${t}'`).join(' | ') },
        defaultValue: { summary: 'subtle' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Text label rendered in the default slot.',
      table: { type: { summary: 'string' }, category: 'Slots' },
    },
  },
  args: {
    status: 'failed',
    type: 'subtle',
    label: '',
  },
  render: ({ status, type, label }) => html`
    <ds-status-marker
      status=${ifDefined(status)}
      type=${ifDefined(type)}
    >${label || LABELS[status]}</ds-status-marker>
  `,
};

export default meta;
type Story = StoryObj<StatusMarkerArgs>;

export const Default: Story = {};

export const Subtle: Story = {
  args: { type: 'subtle', status: 'failed' },
};

export const Bold: Story = {
  args: { type: 'bold', status: 'failed' },
};

export const Bolder: Story = {
  args: { type: 'bolder', status: 'failed' },
};

export const Boldest: Story = {
  args: { type: 'boldest', status: 'failed' },
};

export const Success: Story = {
  args: { status: 'success' },
};

export const Warning: Story = {
  args: { status: 'warning' },
};

export const InProgress: Story = {
  args: { status: 'in-progress' },
};

export const Live: Story = {
  args: { status: 'live' },
};

export const Undefined: Story = {
  args: { status: 'undefined' },
};

export const Inactive: Story = {
  args: { status: 'in-active' },
};

export const ShowcaseStatuses: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;padding:16px;">
      ${STATUSES.map(s => html`
        <ds-status-marker status=${s}>${LABELS[s]}</ds-status-marker>
      `)}
    </div>
  `,
};

export const ShowcaseTypes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;padding:16px;">
      ${TYPES.map(t => html`
        <ds-status-marker status="failed" type=${t}>Failed</ds-status-marker>
      `)}
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:auto repeat(4,1fr);gap:8px 16px;align-items:center;padding:16px;">
      <span style="font-size:11px;font-family:Inter,sans-serif;color:#ccc;"></span>
      ${TYPES.map(t => html`<span style="font-size:11px;font-family:Inter,sans-serif;color:#ccc;text-transform:capitalize;">${t}</span>`)}
      ${STATUSES.map(s => html`
        <span style="font-size:11px;font-family:Inter,sans-serif;color:#ccc;text-transform:capitalize;">${s}</span>
        ${TYPES.map(t => html`<ds-status-marker status=${s} type=${t}>${LABELS[s]}</ds-status-marker>`)}
      `)}
    </div>
  `,
};
