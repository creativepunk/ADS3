import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-select.js';
import '../ds-single-select-menu/ds-single-select-menu.js';
import '../ds-multi-select-menu/ds-multi-select-menu.js';
import type { DsSelectSelection, DsSelectType } from './ds-select.js';

interface SelectArgs {
  selection: DsSelectSelection;
  type: DsSelectType;
  label: string;
  placeholder: string;
  helperText: string;
  errorMessage: string;
  successMessage: string;
  isRequired: boolean;
  isClearable: boolean;
  disabled: boolean;
  readonly: boolean;
  invalid: boolean;
  valid: boolean;
}

const singleOptions = html`
  <ds-single-select-menu>
    <ds-single-select-menu-item value="apple">Apple</ds-single-select-menu-item>
    <ds-single-select-menu-item value="banana">Banana</ds-single-select-menu-item>
    <ds-single-select-menu-item value="cherry">Cherry</ds-single-select-menu-item>
    <ds-single-select-menu-item value="date">Date</ds-single-select-menu-item>
    <ds-single-select-menu-item value="elderberry">Elderberry</ds-single-select-menu-item>
  </ds-single-select-menu>
`;

const multiOptions = html`
  <ds-multi-select-menu>
    <ds-multi-select-menu-item value="apple">Apple</ds-multi-select-menu-item>
    <ds-multi-select-menu-item value="banana">Banana</ds-multi-select-menu-item>
    <ds-multi-select-menu-item value="cherry">Cherry</ds-multi-select-menu-item>
    <ds-multi-select-menu-item value="date">Date</ds-multi-select-menu-item>
    <ds-multi-select-menu-item value="elderberry">Elderberry</ds-multi-select-menu-item>
  </ds-multi-select-menu>
`;

const meta: Meta<SelectArgs> = {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    selection: {
      control: { type: 'inline-radio' },
      options: ['single', 'multi'],
      description: 'Whether the user can select one or multiple options.',
      table: {
        type: { summary: "'single' | 'multi'" },
        defaultValue: { summary: 'single' },
        category: 'Props',
      },
    },
    type: {
      control: { type: 'inline-radio' },
      options: ['default', 'inline'],
      description: '`default` stacks the label above the trigger; `inline` places the label 180px to the left.',
      table: {
        type: { summary: "'default' | 'inline'" },
        defaultValue: { summary: 'default' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above or beside the trigger.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when no value is selected.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select' },
        category: 'Props',
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the trigger.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message shown when invalid=true.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Error message' },
        category: 'Props',
      },
    },
    successMessage: {
      control: 'text',
      description: 'Success message shown when valid=true.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Success message' },
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
    isClearable: {
      control: 'boolean',
      description: 'Shows a clear (×) button when a single value is selected.',
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
      description: 'Makes the field read-only — trigger is non-interactive.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    invalid: {
      control: 'boolean',
      description: 'Shows error state — red bottom border and error message.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    valid: {
      control: 'boolean',
      description: 'Shows success state — green bottom border and success message.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
  },
  args: {
    selection: 'single',
    type: 'default',
    label: 'Fruit',
    placeholder: 'Select a fruit',
    helperText: 'Pick your favourite',
    errorMessage: 'Please select a value',
    successMessage: 'Looks great!',
    isRequired: false,
    isClearable: false,
    disabled: false,
    readonly: false,
    invalid: false,
    valid: false,
  },
};

export default meta;
type Story = StoryObj<SelectArgs>;

const render = (args: SelectArgs) => html`
  <ds-select
    selection=${args.selection}
    type=${args.type}
    label=${args.label}
    placeholder=${args.placeholder}
    helper-text=${args.helperText}
    error-message=${args.errorMessage}
    success-message=${args.successMessage}
    ?is-required=${args.isRequired}
    ?is-clearable=${args.isClearable}
    ?disabled=${args.disabled}
    ?readonly=${args.readonly}
    ?invalid=${args.invalid}
    ?valid=${args.valid}
    style="width: 320px;"
  >
    ${args.selection === 'multi' ? multiOptions : singleOptions}
  </ds-select>
`;

export const Default: Story = { render };

export const SingleVariant: Story = {
  render: (args) => render({ ...args, selection: 'single', label: 'Single select' }),
};

export const MultiVariant: Story = {
  render: (args) => render({ ...args, selection: 'multi', label: 'Multi select' }),
};

export const InlineType: Story = {
  render: (args) =>
    render({ ...args, type: 'inline', label: 'Inline label', placeholder: 'Select option' }),
};

export const Required: Story = {
  render: (args) => render({ ...args, isRequired: true }),
};

export const Disabled: Story = {
  render: (args) => render({ ...args, disabled: true }),
};

export const ReadOnly: Story = {
  render: (args) => render({ ...args, readonly: true }),
};

export const Error: Story = {
  render: (args) =>
    render({ ...args, invalid: true, errorMessage: 'Please select a value' }),
};

export const Valid: Story = {
  render: (args) =>
    render({ ...args, valid: true, successMessage: 'Looks great!' }),
};

export const ShowcaseVariants: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px; padding: 24px;">
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Single select</p>
        <ds-select selection="single" label="Fruit" placeholder="Select a fruit" style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Multi select</p>
        <ds-select selection="multi" label="Fruits" placeholder="Select fruits" style="width: 320px;">
          ${multiOptions}
        </ds-select>
      </div>
    </div>
  `,
};

export const ShowcaseTypes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 40px; padding: 24px;">
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Default (stacked)</p>
        <ds-select type="default" label="Fruit" placeholder="Select" style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Inline</p>
        <ds-select type="inline" label="Fruit" placeholder="Select" style="min-width: 420px;">
          ${singleOptions}
        </ds-select>
      </div>
    </div>
  `,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Default</p>
        <ds-select label="Fruit" placeholder="Select" helper-text="Pick your favourite" style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Error</p>
        <ds-select label="Fruit" placeholder="Select" invalid error-message="Required field" style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Valid</p>
        <ds-select label="Fruit" placeholder="Select" valid success-message="Looks great!" style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Disabled</p>
        <ds-select label="Fruit" placeholder="Select" disabled style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Read-only</p>
        <ds-select label="Fruit" placeholder="Select" readonly style="width: 320px;">
          ${singleOptions}
        </ds-select>
      </div>
    </div>
  `,
};
