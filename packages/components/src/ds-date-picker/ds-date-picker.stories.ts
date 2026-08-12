import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-date-picker.js';
import type { DsDatePickerLayoutType } from './ds-date-picker.js';

interface DatePickerArgs {
  type: DsDatePickerLayoutType;
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

const meta: Meta<DatePickerArgs> = {
  title: 'Components/Date Picker',
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
      description: 'Label text.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends a red asterisk to the label.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    value: {
      control: 'text',
      description: 'Selected date as ISO `YYYY-MM-DD`.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when empty.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Pick a date' }, category: 'Props' },
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
      description: 'Triggers error styling + shows error message.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    valid: {
      control: 'boolean',
      description: 'Triggers success styling + shows success message.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the picker.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the input read-only; calendar cannot open.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    min: {
      control: 'text',
      description: 'Earliest selectable date (`YYYY-MM-DD`).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    max: {
      control: 'text',
      description: 'Latest selectable date (`YYYY-MM-DD`).',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
  },
  args: {
    type: 'stacked',
    label: 'Label',
    isRequired: true,
    value: '',
    placeholder: 'Pick a date',
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
type Story = StoryObj<DatePickerArgs>;

const render = (args: DatePickerArgs) => html`
  <ds-date-picker
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
  ></ds-date-picker>
`;

export const Default: Story = { render };

export const Selected: Story = {
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
      <ds-date-picker label="Default" is-required helper-text="Optional helper text"></ds-date-picker>
      <ds-date-picker label="Selected" is-required value="2025-07-15" helper-text="Optional helper text"></ds-date-picker>
      <ds-date-picker label="Invalid" is-required invalid error-message="Error message"></ds-date-picker>
      <ds-date-picker label="Valid" is-required valid success-message="Success message"></ds-date-picker>
      <ds-date-picker label="Disabled" disabled helper-text="Optional helper text"></ds-date-picker>
    </div>
  `,
};

export const ShowcaseInline: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:24px">
      <ds-date-picker type="inline" label="Default" is-required helper-text="Optional helper text"></ds-date-picker>
      <ds-date-picker type="inline" label="Selected" is-required value="2025-07-15"></ds-date-picker>
      <ds-date-picker type="inline" label="Invalid" is-required invalid error-message="Error message"></ds-date-picker>
      <ds-date-picker type="inline" label="Disabled" disabled helper-text="Optional helper text"></ds-date-picker>
    </div>
  `,
};
