import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-badge.js';
import '../ds-icon/ds-icon.js';
import type { DsBadgeColor } from './ds-badge.js';

interface BadgeArgs {
  color: DsBadgeColor;
  hasIcon: boolean;
  count: string;
}

const COLORS: DsBadgeColor[] = [
  'gray', 'blue', 'cyan', 'teal', 'green', 'purple',
  'magenta', 'red', 'orange', 'yellow', 'inverted',
];

const ICON = html`<ds-icon slot="icon" name="info" size="sm"></ds-icon>`;

const meta: Meta<BadgeArgs> = {
  title: 'Components/Badge',
  component: 'ds-badge',
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
      description: 'Color variant of the badge.',
      table: {
        type: { summary: COLORS.map(c => `'${c}'`).join(' | ') },
        defaultValue: { summary: 'gray' },
        category: 'Props',
      },
    },
    hasIcon: {
      control: 'boolean',
      description: 'When true, renders the icon slot before the count label.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    count: {
      control: 'text',
      description: 'The count or label text rendered inside the badge (default slot).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '25' },
        category: 'Slots',
      },
    },
  },
  args: {
    color: 'gray',
    hasIcon: false,
    count: '25',
  },
  render: ({ color, hasIcon, count }) => html`
    <ds-badge
      color=${ifDefined(color)}
      ?has-icon=${hasIcon}
      count=${ifDefined(count)}
    >
      ${hasIcon ? ICON : null}
    </ds-badge>
  `,
};

export default meta;
type Story = StoryObj<BadgeArgs>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { hasIcon: true, color: 'gray' },
};

export const Blue: Story = {
  args: { color: 'blue' },
};

export const Cyan: Story = {
  args: { color: 'cyan' },
};

export const Teal: Story = {
  args: { color: 'teal' },
};

export const Green: Story = {
  args: { color: 'green' },
};

export const Purple: Story = {
  args: { color: 'purple' },
};

export const Magenta: Story = {
  args: { color: 'magenta' },
};

export const Red: Story = {
  args: { color: 'red' },
};

export const Orange: Story = {
  args: { color: 'orange' },
};

export const Yellow: Story = {
  args: { color: 'yellow' },
};

export const Inverted: Story = {
  args: { color: 'inverted' },
};

export const ShowcaseColors: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      ${COLORS.map(c => html`<ds-badge color=${c} count="25"></ds-badge>`)}
    </div>
  `,
};

export const ShowcaseWithIcons: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      ${COLORS.map(c => html`
        <ds-badge color=${c} has-icon count="25">
          ${ICON}
        </ds-badge>
      `)}
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:12px 16px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      <span style="color:#ccc;font-size:12px;font-family:Inter,sans-serif;"></span>
      <span style="color:#ccc;font-size:12px;font-family:Inter,sans-serif;">No icon</span>
      <span style="color:#ccc;font-size:12px;font-family:Inter,sans-serif;">With icon</span>
      ${COLORS.map(c => html`
        <span style="color:#ccc;font-size:11px;font-family:Inter,sans-serif;text-transform:capitalize;">${c}</span>
        <ds-badge color=${c} count="25"></ds-badge>
        <ds-badge color=${c} has-icon count="25">${ICON}</ds-badge>
      `)}
    </div>
  `,
};
