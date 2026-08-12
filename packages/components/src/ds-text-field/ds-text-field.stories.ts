import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-text-field.js';
import type { DsTextFieldType } from './ds-text-field.js';

interface TextFieldArgs {
  type: DsTextFieldType; // 'stacked' | 'inline'
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
  inputType: string;
}

const meta: Meta<TextFieldArgs> = {
  title: 'Components/Text Field',
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
      control: 'text',
      description: 'Current string value of the input.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
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
    inputType: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'url', 'search', 'tel'],
      description: 'HTML input type attribute.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
        category: 'Props',
      },
    },
  },
  args: {
    type: 'stacked',
    label: 'Label',
    isRequired: true,
    value: '',
    placeholder: 'Placeholder',
    helperText: 'Optional helper text',
    errorMessage: 'Error message',
    successMessage: 'Success message',
    invalid: false,
    valid: false,
    disabled: false,
    readonly: false,
    inputType: 'text',
  },
};

export default meta;
type Story = StoryObj<TextFieldArgs>;

const render = (args: TextFieldArgs) => html`
  <ds-text-field
    type=${args.type}
    label=${args.label}
    ?is-required=${args.isRequired}
    .value=${args.value}
    placeholder=${args.placeholder}
    helper-text=${args.helperText}
    error-message=${args.errorMessage}
    success-message=${args.successMessage}
    ?invalid=${args.invalid}
    ?valid=${args.valid}
    ?disabled=${args.disabled}
    ?readonly=${args.readonly}
    input-type=${args.inputType}
    style="width: 240px;"
  ></ds-text-field>
`;

export const Default: Story = { render };

export const WithValue: Story = {
  render,
  args: { value: 'Value', helperText: 'Helper text' },
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
  args: { valid: true, value: 'Valid value', helperText: '' },
};

export const Disabled: Story = {
  render,
  args: { disabled: true },
};

export const Readonly: Story = {
  render,
  args: { readonly: true, value: 'Read-only value' },
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;width:240px;">
      <ds-text-field
        label="Default"
        is-required
        placeholder="Placeholder"
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-text-field>
      <ds-text-field
        label="With value"
        is-required
        value="Value"
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-text-field>
      <ds-text-field
        label="Invalid"
        is-required
        placeholder="Placeholder"
        invalid
        error-message="Error message"
        style="width:240px;"
      ></ds-text-field>
      <ds-text-field
        label="Valid"
        is-required
        value="Valid value"
        valid
        success-message="Success message"
        style="width:240px;"
      ></ds-text-field>
      <ds-text-field
        label="Disabled"
        placeholder="Placeholder"
        disabled
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-text-field>
      <ds-text-field
        label="Read-only"
        value="Read-only value"
        readonly
        helper-text="Optional helper text"
        style="width:240px;"
      ></ds-text-field>
    </div>
  `,
};

export const ShowcaseInlineLayouts: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <ds-text-field
        type="inline"
        label="Label"
        is-required
        placeholder="Placeholder"
        helper-text="Optional helper text"
      ></ds-text-field>
      <ds-text-field
        type="inline"
        label="Label"
        is-required
        placeholder="Placeholder"
        invalid
        error-message="Error message"
      ></ds-text-field>
      <ds-text-field
        type="inline"
        label="Label"
        is-required
        value="Value"
        valid
        success-message="Success message"
      ></ds-text-field>
      <ds-text-field
        type="inline"
        label="Label"
        placeholder="Placeholder"
        disabled
        helper-text="Optional helper text"
      ></ds-text-field>
    </div>
  `,
};
