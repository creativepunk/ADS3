import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-toggle.js';
import type { DsToggleSize } from './ds-toggle.js';

interface ToggleArgs {
  isChecked: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  size: DsToggleSize;
  label: string;
  description: string;
  name: string;
  value: string;
  ariaLabel: string;
}

const meta: Meta<ToggleArgs> = {
  title: 'Components/Toggle',
  component: 'ds-toggle',
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: 'Controlled checked / on state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents interaction and shows disabled appearance.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner inside the track to indicate a pending state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['md', 'sm'],
      description: 'Track size: md = 40×20px, sm = 32×16px.',
      table: {
        type: { summary: "'md' | 'sm'" },
        defaultValue: { summary: "'md'" },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Label text rendered to the right of the track.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    description: {
      control: 'text',
      description: 'Optional helper text rendered below the label.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    name: {
      control: 'text',
      description: 'Form field name.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    value: {
      control: 'text',
      description: 'Form field value submitted when checked.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'on'" },
        category: 'Props',
      },
    },
    ariaLabel: {
      control: 'text',
      description: 'Required when there is no visible label (icon-only).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
  },
  args: {
    isChecked: false,
    isDisabled: false,
    isLoading: false,
    size: 'md',
    label: 'Label',
    description: 'Description',
    name: '',
    value: 'on',
    ariaLabel: '',
  },
};

export default meta;
type Story = StoryObj<ToggleArgs>;

const render = (args: ToggleArgs) => html`
  <ds-toggle
    ?is-checked=${args.isChecked}
    ?is-disabled=${args.isDisabled}
    ?is-loading=${args.isLoading}
    size=${args.size}
    label=${ifDefined(args.label || undefined)}
    description=${ifDefined(args.description || undefined)}
    name=${ifDefined(args.name || undefined)}
    value=${ifDefined(args.value || undefined)}
    aria-label=${ifDefined(args.ariaLabel || undefined)}
  ></ds-toggle>
`;

export const Default: Story = {
  render,
};

export const Checked: Story = {
  args: { isChecked: true },
  render,
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render,
};

export const DisabledChecked: Story = {
  args: { isDisabled: true, isChecked: true },
  render,
};

export const Loading: Story = {
  args: { isLoading: true },
  render,
};

export const LoadingChecked: Story = {
  args: { isLoading: true, isChecked: true },
  render,
};

export const SizeSm: Story = {
  args: { size: 'sm' },
  render,
};

export const NoLabel: Story = {
  args: { label: '', description: '', ariaLabel: 'Enable notifications' },
  render,
};

export const ShowcaseVariants: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <ds-toggle label="Unchecked" description="Default state"></ds-toggle>
      <ds-toggle is-checked label="Checked" description="On state"></ds-toggle>
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <ds-toggle size="md" label="Medium (default)" description="40×20px track"></ds-toggle>
      <ds-toggle size="sm" label="Small" description="32×16px track"></ds-toggle>
    </div>
  `,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;">
      <ds-toggle label="Default"></ds-toggle>
      <ds-toggle is-checked label="Checked"></ds-toggle>
      <ds-toggle is-disabled label="Disabled"></ds-toggle>
      <ds-toggle is-disabled is-checked label="Disabled + Checked"></ds-toggle>
      <ds-toggle is-loading label="Loading"></ds-toggle>
      <ds-toggle is-loading is-checked label="Loading + Checked"></ds-toggle>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(2,auto);gap:16px 32px;">
      <ds-toggle size="md" label="md / unchecked"></ds-toggle>
      <ds-toggle size="md" is-checked label="md / checked"></ds-toggle>
      <ds-toggle size="sm" label="sm / unchecked"></ds-toggle>
      <ds-toggle size="sm" is-checked label="sm / checked"></ds-toggle>
      <ds-toggle size="md" is-disabled label="md / disabled"></ds-toggle>
      <ds-toggle size="md" is-disabled is-checked label="md / disabled checked"></ds-toggle>
      <ds-toggle size="sm" is-disabled label="sm / disabled"></ds-toggle>
      <ds-toggle size="sm" is-disabled is-checked label="sm / disabled checked"></ds-toggle>
    </div>
  `,
};
