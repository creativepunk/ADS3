import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-checkbox.js';
import './ds-checkbox-group.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';

interface CheckboxArgs {
  label: string;
  description: string;
  isChecked: boolean;
  isIndeterminate: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  hasError: boolean;
  isRequired: boolean;
  name: string;
  value: string;
  inputId: string;
  title: string;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

const checkboxMeta: Meta<CheckboxArgs> = {
  title: 'Components/Checkbox',
  component: 'ds-checkbox',
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text rendered next to the checkbox.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Option' },
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
    isChecked: {
      control: 'boolean',
      description: 'Controlled checked state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Renders a dash instead of a checkmark (partial selection).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Prevents interaction and dims the control.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Prevents interaction; retains a subdued appearance.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    hasError: {
      control: 'boolean',
      description: 'Renders the box border in the danger color.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends a red asterisk after the label.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
        defaultValue: { summary: 'on' },
        category: 'Props',
      },
    },
    inputId: {
      control: 'text',
      description: 'ID forwarded to the native <input>; useful for external <label for="..."> or aria-describedby.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    title: {
      control: 'text',
      description: 'Tooltip text set on the <label> element.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
  },
  args: {
    label: 'Option',
    description: '',
    isChecked: false,
    isIndeterminate: false,
    isDisabled: false,
    isReadOnly: false,
    hasError: false,
    isRequired: false,
    name: '',
    value: 'on',
    inputId: '',
    title: '',
  },
};

export default checkboxMeta;
type CheckboxStory = StoryObj<CheckboxArgs>;

export const Default: CheckboxStory = {
  render: (args) => html`
    <ds-checkbox
      label=${args.label}
      description=${ifDefined(args.description || undefined)}
      ?is-checked=${args.isChecked}
      ?is-indeterminate=${args.isIndeterminate}
      ?is-disabled=${args.isDisabled}
      ?is-read-only=${args.isReadOnly}
      ?has-error=${args.hasError}
      ?is-required=${args.isRequired}
      name=${ifDefined(args.name || undefined)}
      value=${ifDefined(args.value || undefined)}
    ></ds-checkbox>
  `,
};

export const Checked: CheckboxStory = {
  args: { isChecked: true, label: 'Option' },
  render: (args) => html`
    <ds-checkbox
      label=${args.label}
      ?is-checked=${args.isChecked}
      ?is-disabled=${args.isDisabled}
      ?has-error=${args.hasError}
    ></ds-checkbox>
  `,
};

export const Indeterminate: CheckboxStory = {
  args: { isIndeterminate: true, label: 'Option' },
  render: (args) => html`
    <ds-checkbox
      label=${args.label}
      ?is-indeterminate=${args.isIndeterminate}
      ?is-disabled=${args.isDisabled}
      ?has-error=${args.hasError}
    ></ds-checkbox>
  `,
};

export const WithDescription: CheckboxStory = {
  args: { label: 'Option', description: 'Helpful description text', isChecked: false },
  render: (args) => html`
    <ds-checkbox
      label=${args.label}
      description=${args.description}
      ?is-checked=${args.isChecked}
    ></ds-checkbox>
  `,
};

export const Disabled: CheckboxStory = {
  args: { isDisabled: true, label: 'Option' },
  render: (args) => html`
    <ds-checkbox label=${args.label} ?is-disabled=${args.isDisabled}></ds-checkbox>
  `,
};

export const ReadOnly: CheckboxStory = {
  args: { isReadOnly: true, isChecked: true, label: 'Option' },
  render: (args) => html`
    <ds-checkbox
      label=${args.label}
      ?is-read-only=${args.isReadOnly}
      ?is-checked=${args.isChecked}
    ></ds-checkbox>
  `,
};

export const Error: CheckboxStory = {
  args: { hasError: true, label: 'Option' },
  render: (args) => html`
    <ds-checkbox label=${args.label} ?has-error=${args.hasError}></ds-checkbox>
  `,
};

export const Required: CheckboxStory = {
  args: { isRequired: true, label: 'Option' },
  render: (args) => html`
    <ds-checkbox label=${args.label} ?is-required=${args.isRequired}></ds-checkbox>
  `,
};

// ─── Showcase stories ─────────────────────────────────────────────────────────

export const ShowcaseStates: CheckboxStory = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
      <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
        <ds-checkbox label="Unchecked"></ds-checkbox>
        <ds-checkbox label="Checked" is-checked></ds-checkbox>
        <ds-checkbox label="Indeterminate" is-indeterminate></ds-checkbox>
        <ds-checkbox label="Disabled" is-disabled></ds-checkbox>
        <ds-checkbox label="Checked + Disabled" is-checked is-disabled></ds-checkbox>
        <ds-checkbox label="Read-only" is-read-only></ds-checkbox>
        <ds-checkbox label="Read-only checked" is-read-only is-checked></ds-checkbox>
      </div>
      <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
        <ds-checkbox label="Error" has-error></ds-checkbox>
        <ds-checkbox label="Error checked" has-error is-checked></ds-checkbox>
        <ds-checkbox label="Error indeterminate" has-error is-indeterminate></ds-checkbox>
      </div>
    </div>
  `,
};

export const ShowcaseWithDescription: CheckboxStory = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <ds-checkbox label="Option with description" description="This is a helper line beneath the label"></ds-checkbox>
      <ds-checkbox label="Checked with description" description="Checked state example" is-checked></ds-checkbox>
    </div>
  `,
};

