import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-number-field.js';
import type { DsNumberFieldType } from './ds-number-field.js';

interface NumberFieldArgs {
  type: DsNumberFieldType;
  label: string;
  isRequired: boolean;
  value: number | undefined;
  min: number | undefined;
  max: number | undefined;
  step: number;
  placeholder: string;
  helperText: string;
  errorMessage: string;
  successMessage: string;
  invalid: boolean;
  valid: boolean;
  disabled: boolean;
  readonly: boolean;
  allowNegative: boolean;
}

const meta: Meta<NumberFieldArgs> = {
  title: 'Components/Number Field',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['default', 'inline'],
      description: '`default` stacks the label above; `inline` places the label 180px to the left.',
      table: {
        type: { summary: "'default' | 'inline'" },
        defaultValue: { summary: 'default' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above or beside the input.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends a red asterisk to the label.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    value: {
      control: { type: 'number' },
      description: 'Current numeric value.',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
        category: 'Props',
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum allowed value.',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
        category: 'Props',
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum allowed value.',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
        category: 'Props',
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Amount to increment/decrement per step.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Props',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when no value is set.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown when `invalid=true`.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Error message' },
        category: 'Props',
      },
    },
    successMessage: {
      control: 'text',
      description: 'Success message shown when `valid=true`.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Success message' },
        category: 'Props',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Shows error state — red bottom border + error message.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    valid: {
      control: 'boolean',
      description: 'Shows success state — green bottom border + success message.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire control.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    readonly: {
      control: 'boolean',
      description: 'Makes the input read-only.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    allowNegative: {
      control: 'boolean',
      description: 'When true, the decrement button and keyboard entry can go below zero.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
  },
  args: {
    type: 'default',
    label: 'Label',
    isRequired: true,
    value: undefined,
    min: undefined,
    max: undefined,
    step: 1,
    placeholder: '',
    helperText: 'Optional helper text',
    errorMessage: 'Error message',
    successMessage: 'Success message',
    invalid: false,
    valid: false,
    disabled: false,
    readonly: false,
    allowNegative: false,
  },
};

export default meta;
type Story = StoryObj<NumberFieldArgs>;

const render = (args: NumberFieldArgs) => html`
  <ds-number-field
    type=${args.type}
    label=${args.label}
    ?is-required=${args.isRequired}
    .value=${args.value ?? null}
    .min=${args.min ?? null}
    .max=${args.max ?? null}
    .step=${args.step}
    placeholder=${args.placeholder}
    helper-text=${args.helperText}
    error-message=${args.errorMessage}
    success-message=${args.successMessage}
    ?invalid=${args.invalid}
    ?valid=${args.valid}
    ?disabled=${args.disabled}
    ?readonly=${args.readonly}
    ?allow-negative=${args.allowNegative}
    style="width: 240px;"
  ></ds-number-field>
`;

export const Default: Story = { render };

export const WithValue: Story = {
  render,
  args: { value: 42, helperText: 'Type a number or use the +/- buttons' },
};

export const WithMinMax: Story = {
  render,
  args: { value: 5, min: 0, max: 10, helperText: 'Range: 0–10' },
};

export const WithStep: Story = {
  render,
  args: { value: 0, step: 5, helperText: 'Steps of 5' },
};

export const Inline: Story = {
  render,
  args: { type: 'inline', helperText: 'Inline layout' },
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
  args: { disabled: true, value: 10 },
};

export const Readonly: Story = {
  render,
  args: { readonly: true, value: 7 },
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;width:240px;">
      <ds-number-field
        label="Default"
        is-required
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-number-field>
      <ds-number-field
        label="With value"
        is-required
        .value=${42}
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-number-field>
      <ds-number-field
        label="Invalid"
        is-required
        invalid
        error-message="Value must be a positive number"
        style="width:240px;"
      ></ds-number-field>
      <ds-number-field
        label="Valid"
        is-required
        valid
        .value=${10}
        success-message="Looks good!"
        style="width:240px;"
      ></ds-number-field>
      <ds-number-field
        label="Disabled"
        .value=${0}
        disabled
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-number-field>
    </div>
  `,
};

export const ShowcaseInlineLayouts: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <ds-number-field
        type="inline"
        label="Quantity"
        is-required
        .value=${1}
        .min=${0}
        helper-text="Optional helper text"
      ></ds-number-field>
      <ds-number-field
        type="inline"
        label="Temperature"
        invalid
        error-message="Out of range"
      ></ds-number-field>
      <ds-number-field
        type="inline"
        label="Port"
        disabled
        .value=${8080}
        helper-text="Optional helper text"
      ></ds-number-field>
    </div>
  `,
};
