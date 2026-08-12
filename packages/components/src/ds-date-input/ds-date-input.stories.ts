import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-date-input.js';
import type { DsDateInputLayoutType } from './ds-date-input.js';

interface DateInputArgs {
  type: DsDateInputLayoutType;
  label: string;
  isRequired: boolean;
  value: string;
  placeholder: string;
  helperText: string;
  errorMessage: string;
  successMessage: string;
  invalid: boolean;
  valid: boolean;
  disabled: boolean;
  readonly: boolean;
  min: string;
  max: string;
  isClearable: boolean;
}

const meta: Meta<DateInputArgs> = {
  title: 'Components/Date Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['stacked', 'inline'],
      description: '`stacked` stacks the label above; `inline` places the label 180px to the left.',
      table: {
        type: { summary: "'stacked' | 'inline'" },
        defaultValue: { summary: 'stacked' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above or beside the input.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends a red asterisk to the label.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    value: {
      control: 'text',
      description: 'Current value as ISO `YYYY-MM-DD`.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when empty.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Enter a date' }, category: 'Props' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown when `invalid` is true.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Error message' }, category: 'Props' },
    },
    successMessage: {
      control: 'text',
      description: 'Success message shown when `valid` is true.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Success message' }, category: 'Props' },
    },
    invalid: {
      control: 'boolean',
      description: 'Triggers error styling and shows the error message.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    valid: {
      control: 'boolean',
      description: 'Triggers success styling and shows the success message.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the input read-only.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    min: {
      control: 'text',
      description: 'Earliest valid date as `YYYY-MM-DD`.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    max: {
      control: 'text',
      description: 'Latest valid date as `YYYY-MM-DD`.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
  },
  args: {
    type: 'stacked',
    label: 'Label',
    isRequired: true,
    value: '',
    placeholder: 'Enter a date',
    helperText: 'Optional helper text',
    errorMessage: 'Error message',
    successMessage: 'Success message',
    invalid: false,
    valid: false,
    disabled: false,
    readonly: false,
    min: '',
    max: '',
    isClearable: true,
  },
};

export default meta;
type Story = StoryObj<DateInputArgs>;

const render = (args: DateInputArgs) => html`
  <ds-date-input
    type=${args.type}
    label=${ifDefined(args.label || undefined)}
    ?is-required=${args.isRequired}
    value=${ifDefined(args.value || undefined)}
    placeholder=${args.placeholder}
    helper-text=${ifDefined(args.helperText || undefined)}
    error-message=${args.errorMessage}
    success-message=${args.successMessage}
    ?invalid=${args.invalid}
    ?valid=${args.valid}
    ?disabled=${args.disabled}
    ?readonly=${args.readonly}
    min=${ifDefined(args.min || undefined)}
    max=${ifDefined(args.max || undefined)}
    ?is-clearable=${args.isClearable}
  ></ds-date-input>
`;

export const Default: Story = { render };

export const Filled: Story = {
  render,
  args: { value: '2025-07-15', label: 'Date' },
};

export const Invalid: Story = {
  render,
  args: { invalid: true, helperText: '' },
};

export const Valid: Story = {
  render,
  args: { valid: true, helperText: '' },
};

export const Disabled: Story = {
  render,
  args: { disabled: true },
};

export const Inline: Story = {
  render,
  args: { type: 'inline', label: 'Date' },
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px">
      <ds-date-input label="Default" is-required helper-text="Optional helper text"></ds-date-input>
      <ds-date-input label="Filled" is-required value="2025-07-15" helper-text="Optional helper text"></ds-date-input>
      <ds-date-input label="Invalid" is-required invalid error-message="Error message"></ds-date-input>
      <ds-date-input label="Valid" is-required valid success-message="Success message"></ds-date-input>
      <ds-date-input label="Disabled" disabled helper-text="Optional helper text"></ds-date-input>
    </div>
  `,
};

export const ShowcaseInline: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px">
      <ds-date-input type="inline" label="Default" is-required helper-text="Optional helper text"></ds-date-input>
      <ds-date-input type="inline" label="Filled" is-required value="2025-07-15"></ds-date-input>
      <ds-date-input type="inline" label="Invalid" is-required invalid error-message="Error message"></ds-date-input>
      <ds-date-input type="inline" label="Disabled" disabled helper-text="Optional helper text"></ds-date-input>
    </div>
  `,
};
