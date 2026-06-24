import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-multi-select-menu.js';
import type { DsMultiSelectMenuItemSize } from './ds-multi-select-menu-item.js';

interface Args { size: DsMultiSelectMenuItemSize; loading: boolean }

const meta: Meta<Args> = {
  title: 'Components/Multi Select Menu',
  component: 'ds-multi-select-menu' as never,
  subcomponents: {
    'ds-multi-select-menu-group': 'ds-multi-select-menu-group' as never,
    'ds-multi-select-menu-item': 'ds-multi-select-menu-item' as never,
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
    <ds-multi-select-menu size=${ifDefined(size)} ?loading=${loading} style="width:280px"
      @ds-select-menu-change=${(e: CustomEvent) => console.log('change', e.detail.values)}>
      <ds-multi-select-menu-group>
        <ds-multi-select-menu-item value="read">Read</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="write">Write</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="delete">Delete</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="admin">Admin</ds-multi-select-menu-item>
      </ds-multi-select-menu-group>
    </ds-multi-select-menu>
  `,
};

export const WithGroups: Story = {
  name: 'With groups',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-multi-select-menu style="width:280px">
      <ds-multi-select-menu-group title="Permissions">
        <ds-multi-select-menu-item value="read" selected>Read</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="write" selected>Write</ds-multi-select-menu-item>
      </ds-multi-select-menu-group>
      <ds-multi-select-menu-group title="Admin">
        <ds-multi-select-menu-item value="delete">Delete</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="admin" disabled>Admin (disabled)</ds-multi-select-menu-item>
      </ds-multi-select-menu-group>
    </ds-multi-select-menu>
  `,
};

export const Preselected: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-multi-select-menu style="width:280px">
      <ds-multi-select-menu-group>
        <ds-multi-select-menu-item value="read" selected>Read</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="write" selected>Write</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="delete">Delete</ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="admin" disabled>Admin</ds-multi-select-menu-item>
      </ds-multi-select-menu-group>
    </ds-multi-select-menu>
  `,
};

export const WithDescription: Story = {
  name: 'With description',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-multi-select-menu style="width:300px">
      <ds-multi-select-menu-group>
        <ds-multi-select-menu-item value="email" selected>
          Email notifications
          <span slot="description">Receive updates via email</span>
        </ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="sms">
          SMS notifications
          <span slot="description">Receive updates via text message</span>
        </ds-multi-select-menu-item>
        <ds-multi-select-menu-item value="push">
          Push notifications
          <span slot="description">Receive updates in your browser</span>
        </ds-multi-select-menu-item>
      </ds-multi-select-menu-group>
    </ds-multi-select-menu>
  `,
};

export const Loading: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`<ds-multi-select-menu loading style="width:280px"></ds-multi-select-menu>`,
};

export const Empty: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`<ds-multi-select-menu style="width:280px"></ds-multi-select-menu>`,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;gap:32px;align-items:flex-start">
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">None selected</p>
        <ds-multi-select-menu style="width:200px">
          <ds-multi-select-menu-group>
            <ds-multi-select-menu-item value="a">Option A</ds-multi-select-menu-item>
            <ds-multi-select-menu-item value="b">Option B</ds-multi-select-menu-item>
            <ds-multi-select-menu-item value="c">Option C</ds-multi-select-menu-item>
          </ds-multi-select-menu-group>
        </ds-multi-select-menu>
      </div>
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">Two selected</p>
        <ds-multi-select-menu style="width:200px">
          <ds-multi-select-menu-group>
            <ds-multi-select-menu-item value="a" selected>Option A</ds-multi-select-menu-item>
            <ds-multi-select-menu-item value="b" selected>Option B</ds-multi-select-menu-item>
            <ds-multi-select-menu-item value="c">Option C</ds-multi-select-menu-item>
          </ds-multi-select-menu-group>
        </ds-multi-select-menu>
      </div>
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">Loading</p>
        <ds-multi-select-menu loading style="width:200px"></ds-multi-select-menu>
      </div>
    </div>
  `,
};
