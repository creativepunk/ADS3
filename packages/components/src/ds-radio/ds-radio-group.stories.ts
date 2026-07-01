import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-radio.js';
import './ds-radio-group.js';
import type { DsRadioGroupOrientation, DsRadioGroupType } from './ds-radio-group.js';

interface RadioGroupArgs {
  label: string;
  name: string;
  isRequired: boolean;
  hasInfoTip: boolean;
  hasError: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  defaultFirstSelected: boolean;
  optionOrientation: DsRadioGroupOrientation;
  type: DsRadioGroupType;
  helperText: string;
  errorText: string;
}

const meta: Meta<RadioGroupArgs> = {
  title: 'Components/RadioGroup',
  component: 'ds-radio-group',
  argTypes: {
    label: {
      control: 'text',
      description: 'Group label text.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Label' }, category: 'Props' },
    },
    name: {
      control: 'text',
      description: 'HTML form field name propagated to all child radios.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends a red asterisk to the group label.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    hasInfoTip: {
      control: 'boolean',
      description: 'Shows an info icon next to the group label.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    hasError: {
      control: 'boolean',
      description: 'Puts all child radios into the error state and shows errorText.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables all child radios.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Makes all child radios read-only.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    defaultFirstSelected: {
      control: 'boolean',
      description: 'Automatically checks the first radio if none are already checked.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'Props' },
    },
    optionOrientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of radio items.',
      table: {
        type: { summary: `'vertical' | 'horizontal'` },
        defaultValue: { summary: 'vertical' },
        category: 'Props',
      },
    },
    type: {
      control: 'inline-radio',
      options: ['stacked', 'inline'],
      description: 'Spacing style — default stacks label above items; inline places label beside.',
      table: {
        type: { summary: `'stacked' | 'inline'` },
        defaultValue: { summary: 'stacked' },
        category: 'Props',
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the group when there is no error.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Optional helper text' }, category: 'Props' },
    },
    errorText: {
      control: 'text',
      description: 'Error text shown below the group when hasError is true.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Field is required' }, category: 'Props' },
    },
  },
  args: {
    label: 'Label',
    name: 'options',
    isRequired: true,
    hasInfoTip: false,
    hasError: false,
    isDisabled: false,
    isReadOnly: false,
    defaultFirstSelected: true,
    optionOrientation: 'vertical',
    type: 'stacked',
    helperText: 'Optional helper text',
    errorText: 'Field is required',
  },
};

export default meta;
type Story = StoryObj<RadioGroupArgs>;

export const Default: Story = {
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      name=${args.name}
      ?is-required=${args.isRequired}
      ?has-info-tip=${args.hasInfoTip}
      ?has-error=${args.hasError}
      ?is-disabled=${args.isDisabled}
      ?is-read-only=${args.isReadOnly}
      ?default-first-selected=${args.defaultFirstSelected}
      option-orientation=${args.optionOrientation}
      type=${args.type}
      helper-text=${args.helperText}
      error-text=${args.errorText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
      <ds-radio value="option-4" label="Option 4"></ds-radio>
    </ds-radio-group>
  `,
};

export const Horizontal: Story = {
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-required=${args.isRequired}
      option-orientation="horizontal"
      helper-text=${args.helperText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
      <ds-radio value="option-4" label="Option 4"></ds-radio>
    </ds-radio-group>
  `,
};

export const Error: Story = {
  args: { hasError: true, errorText: 'Please select an option.' },
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-required=${args.isRequired}
      ?has-error=${args.hasError}
      error-text=${args.errorText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
    </ds-radio-group>
  `,
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-disabled=${args.isDisabled}
      helper-text=${args.helperText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
    </ds-radio-group>
  `,
};

export const ReadOnly: Story = {
  args: { isReadOnly: true },
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-read-only=${args.isReadOnly}
      helper-text=${args.helperText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
    </ds-radio-group>
  `,
};

export const WithHelperText: Story = {
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-required=${args.isRequired}
      helper-text=${args.helperText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
    </ds-radio-group>
  `,
};

export const InlineVertical: Story = {
  args: { type: 'inline', optionOrientation: 'vertical' },
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-required=${args.isRequired}
      option-orientation="vertical"
      type="inline"
      helper-text=${args.helperText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
    </ds-radio-group>
  `,
};

export const InlineHorizontal: Story = {
  args: { type: 'inline', optionOrientation: 'horizontal' },
  render: (args) => html`
    <ds-radio-group
      label=${args.label}
      ?is-required=${args.isRequired}
      option-orientation="horizontal"
      type="inline"
      helper-text=${args.helperText}
    >
      <ds-radio value="option-1" label="Option 1"></ds-radio>
      <ds-radio value="option-2" label="Option 2"></ds-radio>
      <ds-radio value="option-3" label="Option 3"></ds-radio>
    </ds-radio-group>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;gap:48px;flex-wrap:wrap;padding:16px;align-items:flex-start;">
      <ds-radio-group label="Vertical" is-required helper-text="Optional helper text">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>

      <ds-radio-group label="Horizontal" is-required option-orientation="horizontal" helper-text="Optional helper text">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>

      <ds-radio-group label="Error" is-required has-error error-text="Please select one.">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>

      <ds-radio-group label="Disabled" is-disabled helper-text="Optional helper text">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>

      <ds-radio-group label="Read-only" is-read-only helper-text="Optional helper text">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>

      <ds-radio-group label="Inline vertical" is-required type="inline" helper-text="Optional helper text">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>

      <ds-radio-group label="Inline horizontal" is-required type="inline" option-orientation="horizontal" helper-text="Optional helper text">
        <ds-radio value="option-1" label="Option 1"></ds-radio>
        <ds-radio value="option-2" label="Option 2"></ds-radio>
        <ds-radio value="option-3" label="Option 3"></ds-radio>
      </ds-radio-group>
    </div>
  `,
};
