import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-segmented-button.js';
import '../ds-icon/ds-icon.js';
import type { DsSegmentedButtonSize } from './ds-segmented-button.js';

interface SegmentedButtonArgs {
  size: DsSegmentedButtonSize;
  isDisabled: boolean;
}

const meta: Meta<SegmentedButtonArgs> = {
  title: 'Components/SegmentedButton',
  component: 'ds-segmented-button',
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the segmented button.',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables all items in the group.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
  },
  args: {
    size: 'md',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<SegmentedButtonArgs>;

const render = ({ size, isDisabled }: SegmentedButtonArgs) => html`
  <ds-segmented-button
    size=${ifDefined(size)}
    ?is-disabled=${isDisabled}
  >
    <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
    <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
    <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
  </ds-segmented-button>
`;

export const Default: Story = { render };

export const SmallSize: Story = {
  render: () => html`
    <ds-segmented-button size="sm">
      <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
      <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
      <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
    </ds-segmented-button>
  `,
};

export const LargeSize: Story = {
  render: () => html`
    <ds-segmented-button size="lg">
      <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
      <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
      <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
    </ds-segmented-button>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <ds-segmented-button is-disabled>
      <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
      <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
      <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
    </ds-segmented-button>
  `,
};

export const ItemDisabled: Story = {
  render: () => html`
    <ds-segmented-button>
      <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
      <ds-segmented-button-item value="week" is-disabled>Week</ds-segmented-button-item>
      <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
    </ds-segmented-button>
  `,
};

export const TwoItems: Story = {
  render: () => html`
    <ds-segmented-button>
      <ds-segmented-button-item value="on" is-selected>On</ds-segmented-button-item>
      <ds-segmented-button-item value="off">Off</ds-segmented-button-item>
    </ds-segmented-button>
  `,
};

export const WidthFill: Story = {
  render: () => html`
    <div style="width: 320px; border: 1px dashed rgba(255,255,255,0.15); padding: 12px;">
      <ds-segmented-button width-fill>
        <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
        <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
        <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
      </ds-segmented-button>
    </div>
  `,
};

export const IconOnly: Story = {
  render: () => html`
    <ds-segmented-button>
      <ds-segmented-button-item value="list" icon-only label="List view" is-selected>
        <ds-icon name="list" size="sm"></ds-icon>
      </ds-segmented-button-item>
      <ds-segmented-button-item value="grid" icon-only label="Grid view">
        <ds-icon name="grid_view" size="sm"></ds-icon>
      </ds-segmented-button-item>
      <ds-segmented-button-item value="map" icon-only label="Map view">
        <ds-icon name="map" size="sm"></ds-icon>
      </ds-segmented-button-item>
    </ds-segmented-button>
  `,
};

export const IconOnlySizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <ds-segmented-button size="sm">
        <ds-segmented-button-item value="list" icon-only label="List view" is-selected>
          <ds-icon name="list" size="sm"></ds-icon>
        </ds-segmented-button-item>
        <ds-segmented-button-item value="grid" icon-only label="Grid view">
          <ds-icon name="grid_view" size="sm"></ds-icon>
        </ds-segmented-button-item>
        <ds-segmented-button-item value="map" icon-only label="Map view">
          <ds-icon name="map" size="sm"></ds-icon>
        </ds-segmented-button-item>
      </ds-segmented-button>
      <ds-segmented-button size="md">
        <ds-segmented-button-item value="list" icon-only label="List view" is-selected>
          <ds-icon name="list" size="sm"></ds-icon>
        </ds-segmented-button-item>
        <ds-segmented-button-item value="grid" icon-only label="Grid view">
          <ds-icon name="grid_view" size="sm"></ds-icon>
        </ds-segmented-button-item>
        <ds-segmented-button-item value="map" icon-only label="Map view">
          <ds-icon name="map" size="sm"></ds-icon>
        </ds-segmented-button-item>
      </ds-segmented-button>
      <ds-segmented-button size="lg">
        <ds-segmented-button-item value="list" icon-only label="List view" is-selected>
          <ds-icon name="list" size="sm"></ds-icon>
        </ds-segmented-button-item>
        <ds-segmented-button-item value="grid" icon-only label="Grid view">
          <ds-icon name="grid_view" size="sm"></ds-icon>
        </ds-segmented-button-item>
        <ds-segmented-button-item value="map" icon-only label="Map view">
          <ds-icon name="map" size="sm"></ds-icon>
        </ds-segmented-button-item>
      </ds-segmented-button>
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <ds-segmented-button size="sm">
        <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
        <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
        <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
      </ds-segmented-button>
      <ds-segmented-button size="md">
        <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
        <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
        <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
      </ds-segmented-button>
      <ds-segmented-button size="lg">
        <ds-segmented-button-item value="day" is-selected>Day</ds-segmented-button-item>
        <ds-segmented-button-item value="week">Week</ds-segmented-button-item>
        <ds-segmented-button-item value="month">Month</ds-segmented-button-item>
      </ds-segmented-button>
    </div>
  `,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <ds-segmented-button>
        <ds-segmented-button-item value="a" is-selected>Selected</ds-segmented-button-item>
        <ds-segmented-button-item value="b">Default</ds-segmented-button-item>
        <ds-segmented-button-item value="c">Default</ds-segmented-button-item>
      </ds-segmented-button>
      <ds-segmented-button>
        <ds-segmented-button-item value="a" is-selected>Active</ds-segmented-button-item>
        <ds-segmented-button-item value="b" is-disabled>Disabled</ds-segmented-button-item>
        <ds-segmented-button-item value="c">Default</ds-segmented-button-item>
      </ds-segmented-button>
      <ds-segmented-button is-disabled>
        <ds-segmented-button-item value="a" is-selected>All</ds-segmented-button-item>
        <ds-segmented-button-item value="b">Disabled</ds-segmented-button-item>
        <ds-segmented-button-item value="c">Disabled</ds-segmented-button-item>
      </ds-segmented-button>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; align-items: flex-start;">
      ${(['sm', 'md', 'lg'] as DsSegmentedButtonSize[]).map((size) => html`
        <div style="display: flex; gap: 16px; align-items: center;">
          <span style="font: 500 12px/16px Inter, sans-serif; color: #9a9a9a; width: 24px;">${size}</span>
          <ds-segmented-button size=${size}>
            <ds-segmented-button-item value="a" is-selected>Day</ds-segmented-button-item>
            <ds-segmented-button-item value="b">Week</ds-segmented-button-item>
            <ds-segmented-button-item value="c">Month</ds-segmented-button-item>
          </ds-segmented-button>
          <ds-segmented-button size=${size} is-disabled>
            <ds-segmented-button-item value="a" is-selected>Day</ds-segmented-button-item>
            <ds-segmented-button-item value="b">Week</ds-segmented-button-item>
            <ds-segmented-button-item value="c">Month</ds-segmented-button-item>
          </ds-segmented-button>
          <ds-segmented-button size=${size}>
            <ds-segmented-button-item value="list" icon-only label="List view" is-selected>
              <ds-icon name="list" size="sm"></ds-icon>
            </ds-segmented-button-item>
            <ds-segmented-button-item value="grid" icon-only label="Grid view">
              <ds-icon name="grid_view" size="sm"></ds-icon>
            </ds-segmented-button-item>
            <ds-segmented-button-item value="map" icon-only label="Map view">
              <ds-icon name="map" size="sm"></ds-icon>
            </ds-segmented-button-item>
          </ds-segmented-button>
          <ds-segmented-button size=${size} is-disabled>
            <ds-segmented-button-item value="list" icon-only label="List view" is-selected>
              <ds-icon name="list" size="sm"></ds-icon>
            </ds-segmented-button-item>
            <ds-segmented-button-item value="grid" icon-only label="Grid view">
              <ds-icon name="grid_view" size="sm"></ds-icon>
            </ds-segmented-button-item>
            <ds-segmented-button-item value="map" icon-only label="Map view">
              <ds-icon name="map" size="sm"></ds-icon>
            </ds-segmented-button-item>
          </ds-segmented-button>
        </div>
      `)}
    </div>
  `,
};
