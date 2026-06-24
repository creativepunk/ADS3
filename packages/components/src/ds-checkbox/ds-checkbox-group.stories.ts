import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-checkbox.js';
import './ds-checkbox-group.js';
import type { DsCheckboxGroupOrientation, DsCheckboxGroupType } from './ds-checkbox-group.js';

interface CheckboxGroupArgs {
  label: string;
  name: string;
  isRequired: boolean;
  hasInfoTip: boolean;
  hasError: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  orientation: DsCheckboxGroupOrientation;
  type: DsCheckboxGroupType;
  helperText: string;
  errorText: string;
}

const meta: Meta<CheckboxGroupArgs> = {
  title: 'Components/CheckboxGroup',
  component: 'ds-checkbox-group',
  argTypes: {
    label: {
      control: 'text',
      description: 'Group label text.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Label' }, category: 'Props' },
    },
    name: {
      control: 'text',
      description: 'HTML form field name propagated to all child checkboxes.',
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
      description: 'Puts all child checkboxes into the error state and shows errorText.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables all child checkboxes.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Makes all child checkboxes read-only.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction of checkbox items.',
      table: {
        type: { summary: `'vertical' | 'horizontal'` },
        defaultValue: { summary: 'vertical' },
        category: 'Props',
      },
    },
    type: {
      control: 'inline-radio',
      options: ['default', 'inline'],
      description: 'Spacing style.',
      table: {
        type: { summary: `'default' | 'inline'` },
        defaultValue: { summary: 'default' },
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
    orientation: 'vertical',
    type: 'default',
    helperText: 'Optional helper text',
    errorText: 'Field is required',
  },
};

export default meta;
type Story = StoryObj<CheckboxGroupArgs>;

export const Default: Story = {
  render: (args) => html`
    <ds-checkbox-group
      label=${args.label}
      name=${args.name}
      ?is-required=${args.isRequired}
      ?has-info-tip=${args.hasInfoTip}
      ?has-error=${args.hasError}
      ?is-disabled=${args.isDisabled}
      ?is-read-only=${args.isReadOnly}
      orientation=${args.orientation}
      type=${args.type}
      helper-text=${args.helperText}
      error-text=${args.errorText}
    >
      <ds-checkbox value="option-1" label="Option 1"></ds-checkbox>
      <ds-checkbox value="option-2" label="Option 2"></ds-checkbox>
      <ds-checkbox value="option-3" label="Option 3"></ds-checkbox>
      <ds-checkbox value="option-4" label="Option 4"></ds-checkbox>
    </ds-checkbox-group>
  `,
};

export const Horizontal: Story = {
  render: (args) => html`
    <ds-checkbox-group
      label=${args.label}
      ?is-required=${args.isRequired}
      orientation="horizontal"
      helper-text=${args.helperText}
      error-text=${args.errorText}
    >
      <ds-checkbox label="Option 1"></ds-checkbox>
      <ds-checkbox label="Option 2"></ds-checkbox>
      <ds-checkbox label="Option 3"></ds-checkbox>
      <ds-checkbox label="Option 4"></ds-checkbox>
    </ds-checkbox-group>
  `,
};

export const Error: Story = {
  args: { hasError: true, errorText: 'Please select at least one option.' },
  render: (args) => html`
    <ds-checkbox-group
      label=${args.label}
      ?is-required=${args.isRequired}
      ?has-error=${args.hasError}
      error-text=${args.errorText}
    >
      <ds-checkbox label="Option 1"></ds-checkbox>
      <ds-checkbox label="Option 2"></ds-checkbox>
      <ds-checkbox label="Option 3"></ds-checkbox>
      <ds-checkbox label="Option 4"></ds-checkbox>
    </ds-checkbox-group>
  `,
};

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => html`
    <ds-checkbox-group
      label=${args.label}
      ?is-disabled=${args.isDisabled}
      helper-text=${args.helperText}
    >
      <ds-checkbox label="Option 1"></ds-checkbox>
      <ds-checkbox label="Option 2"></ds-checkbox>
      <ds-checkbox label="Option 3"></ds-checkbox>
    </ds-checkbox-group>
  `,
};

export const ReadOnly: Story = {
  args: { isReadOnly: true },
  render: (args) => html`
    <ds-checkbox-group
      label=${args.label}
      ?is-read-only=${args.isReadOnly}
      helper-text=${args.helperText}
    >
      <ds-checkbox label="Option 1" is-checked></ds-checkbox>
      <ds-checkbox label="Option 2"></ds-checkbox>
      <ds-checkbox label="Option 3" is-checked></ds-checkbox>
    </ds-checkbox-group>
  `,
};

export const WithHelperText: Story = {
  render: (args) => html`
    <ds-checkbox-group
      label=${args.label}
      ?is-required=${args.isRequired}
      helper-text=${args.helperText}
    >
      <ds-checkbox label="Option 1"></ds-checkbox>
      <ds-checkbox label="Option 2"></ds-checkbox>
      <ds-checkbox label="Option 3"></ds-checkbox>
    </ds-checkbox-group>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;gap:48px;flex-wrap:wrap;padding:16px;align-items:flex-start;">
      <ds-checkbox-group label="Vertical" is-required helper-text="Optional helper text">
        <ds-checkbox label="Option 1"></ds-checkbox>
        <ds-checkbox label="Option 2"></ds-checkbox>
        <ds-checkbox label="Option 3"></ds-checkbox>
        <ds-checkbox label="Option 4"></ds-checkbox>
      </ds-checkbox-group>

      <ds-checkbox-group label="Horizontal" is-required orientation="horizontal" helper-text="Optional helper text">
        <ds-checkbox label="Option 1"></ds-checkbox>
        <ds-checkbox label="Option 2"></ds-checkbox>
        <ds-checkbox label="Option 3"></ds-checkbox>
        <ds-checkbox label="Option 4"></ds-checkbox>
      </ds-checkbox-group>

      <ds-checkbox-group label="Error" is-required has-error error-text="Please select one.">
        <ds-checkbox label="Option 1"></ds-checkbox>
        <ds-checkbox label="Option 2"></ds-checkbox>
        <ds-checkbox label="Option 3"></ds-checkbox>
        <ds-checkbox label="Option 4"></ds-checkbox>
      </ds-checkbox-group>

      <ds-checkbox-group label="Disabled" is-disabled helper-text="Optional helper text">
        <ds-checkbox label="Option 1"></ds-checkbox>
        <ds-checkbox label="Option 2"></ds-checkbox>
        <ds-checkbox label="Option 3"></ds-checkbox>
      </ds-checkbox-group>

      <ds-checkbox-group label="Read-only" is-read-only helper-text="Optional helper text">
        <ds-checkbox label="Option 1" is-checked></ds-checkbox>
        <ds-checkbox label="Option 2"></ds-checkbox>
        <ds-checkbox label="Option 3" is-checked></ds-checkbox>
      </ds-checkbox-group>
    </div>
  `,
};
