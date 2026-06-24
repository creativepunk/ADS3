import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-single-select-menu.js';
import type { DsSingleSelectMenuItemSize } from './ds-single-select-menu-item.js';

interface Args { size: DsSingleSelectMenuItemSize; loading: boolean }

const meta: Meta<Args> = {
  title: 'Components/Single Select Menu',
  component: 'ds-single-select-menu' as never,
  subcomponents: {
    'ds-single-select-menu-group': 'ds-single-select-menu-group' as never,
    'ds-single-select-menu-item': 'ds-single-select-menu-item' as never,
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['md', 'sm'],
      description: 'Item height: md = 40 px, sm = 32 px.',
      table: { type: { summary: "'md' | 'sm'" }, defaultValue: { summary: 'md' }, category: 'Props' },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
  },
  args: { size: 'md', loading: false },
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  render: ({ size, loading }) => html`
    <ds-single-select-menu size=${ifDefined(size)} ?loading=${loading} style="width:280px"
      @ds-select-menu-change=${(e: CustomEvent) => console.log('change', e.detail.values)}>
      <ds-single-select-menu-group>
        <ds-single-select-menu-item value="apple">Apple</ds-single-select-menu-item>
        <ds-single-select-menu-item value="banana">Banana</ds-single-select-menu-item>
        <ds-single-select-menu-item value="cherry">Cherry</ds-single-select-menu-item>
        <ds-single-select-menu-item value="grape">Grape</ds-single-select-menu-item>
      </ds-single-select-menu-group>
    </ds-single-select-menu>
  `,
};

export const WithGroups: Story = {
  name: 'With groups',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-single-select-menu style="width:280px">
      <ds-single-select-menu-group title="Fruits">
        <ds-single-select-menu-item value="apple">Apple</ds-single-select-menu-item>
        <ds-single-select-menu-item value="banana">Banana</ds-single-select-menu-item>
      </ds-single-select-menu-group>
      <ds-single-select-menu-group title="Vegetables">
        <ds-single-select-menu-item value="carrot">Carrot</ds-single-select-menu-item>
        <ds-single-select-menu-item value="pea">Pea</ds-single-select-menu-item>
      </ds-single-select-menu-group>
    </ds-single-select-menu>
  `,
};

export const Preselected: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-single-select-menu style="width:280px">
      <ds-single-select-menu-group>
        <ds-single-select-menu-item value="apple">Apple</ds-single-select-menu-item>
        <ds-single-select-menu-item value="banana" selected>Banana</ds-single-select-menu-item>
        <ds-single-select-menu-item value="cherry">Cherry</ds-single-select-menu-item>
      </ds-single-select-menu-group>
    </ds-single-select-menu>
  `,
};

export const WithDescription: Story = {
  name: 'With description',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-single-select-menu style="width:300px">
      <ds-single-select-menu-group>
        <ds-single-select-menu-item value="opt1">
          Option Alpha
          <span slot="description">Best choice for most use cases</span>
        </ds-single-select-menu-item>
        <ds-single-select-menu-item value="opt2">
          Option Beta
          <span slot="description">Advanced configuration required</span>
        </ds-single-select-menu-item>
        <ds-single-select-menu-item value="opt3" disabled>
          Option Gamma (disabled)
          <span slot="description">Not available in your plan</span>
        </ds-single-select-menu-item>
      </ds-single-select-menu-group>
    </ds-single-select-menu>
  `,
};

export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`<ds-single-select-menu loading style="width:280px"></ds-single-select-menu>`,
};

export const Empty: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`<ds-single-select-menu style="width:280px"></ds-single-select-menu>`,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;gap:32px;align-items:flex-start">
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">Default</p>
        <ds-single-select-menu style="width:200px">
          <ds-single-select-menu-group>
            <ds-single-select-menu-item value="a">Option A</ds-single-select-menu-item>
            <ds-single-select-menu-item value="b" selected>Option B</ds-single-select-menu-item>
            <ds-single-select-menu-item value="c">Option C</ds-single-select-menu-item>
          </ds-single-select-menu-group>
        </ds-single-select-menu>
      </div>
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">Loading</p>
        <ds-single-select-menu loading style="width:200px"></ds-single-select-menu>
      </div>
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">Empty</p>
        <ds-single-select-menu style="width:200px"></ds-single-select-menu>
      </div>
    </div>
  `,
};
