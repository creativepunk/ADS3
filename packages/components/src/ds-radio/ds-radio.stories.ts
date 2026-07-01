import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-radio.js';
import './ds-radio-group.js';

interface RadioArgs {
  label: string;
  description: string;
  isChecked: boolean;
  isDisabled: boolean;
  isReadOnly: boolean;
  hasError: boolean;
  isRequired: boolean;
  name: string;
  value: string;
  inputId: string;
  title: string;
}

const radioMeta: Meta<RadioArgs> = {
  title: 'Components/Radio',
  component: 'ds-radio',
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text rendered next to the radio.',
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
      description: 'Controlled selected state.',
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
      description: 'Renders the circle border in the danger color.',
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
      description: 'Form field name — should match across all radios in a group.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Props',
      },
    },
    value: {
      control: 'text',
      description: 'Form field value submitted when selected.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
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
    isDisabled: false,
    isReadOnly: false,
    hasError: false,
    isRequired: false,
    name: '',
    value: 'option',
    inputId: '',
    title: '',
  },
};

export default radioMeta;
type RadioStory = StoryObj<RadioArgs>;

export const Default: RadioStory = {
  render: (args) => html`
    <ds-radio
      label=${args.label}
      description=${ifDefined(args.description || undefined)}
      ?is-checked=${args.isChecked}
      ?is-disabled=${args.isDisabled}
      ?is-read-only=${args.isReadOnly}
      ?has-error=${args.hasError}
      ?is-required=${args.isRequired}
      name=${ifDefined(args.name || undefined)}
      value=${ifDefined(args.value || undefined)}
    ></ds-radio>
  `,
};

export const Selected: RadioStory = {
  args: { isChecked: true, label: 'Option' },
  render: (args) => html`
    <ds-radio
      label=${args.label}
      ?is-checked=${args.isChecked}
      ?is-disabled=${args.isDisabled}
      ?has-error=${args.hasError}
    ></ds-radio>
  `,
};

export const WithDescription: RadioStory = {
  args: { label: 'Option', description: 'Helpful description text', isChecked: false },
  render: (args) => html`
    <ds-radio
      label=${args.label}
      description=${args.description}
      ?is-checked=${args.isChecked}
    ></ds-radio>
  `,
};

export const Disabled: RadioStory = {
  args: { isDisabled: true, label: 'Option' },
  render: (args) => html`
    <ds-radio label=${args.label} ?is-disabled=${args.isDisabled}></ds-radio>
  `,
};

export const ReadOnly: RadioStory = {
  args: { isReadOnly: true, isChecked: true, label: 'Option' },
  render: (args) => html`
    <ds-radio
      label=${args.label}
      ?is-read-only=${args.isReadOnly}
      ?is-checked=${args.isChecked}
    ></ds-radio>
  `,
};

export const Error: RadioStory = {
  args: { hasError: true, label: 'Option' },
  render: (args) => html`
    <ds-radio label=${args.label} ?has-error=${args.hasError}></ds-radio>
  `,
};

export const Required: RadioStory = {
  args: { isRequired: true, label: 'Option' },
  render: (args) => html`
    <ds-radio label=${args.label} ?is-required=${args.isRequired}></ds-radio>
  `,
};

// ─── Showcase stories ─────────────────────────────────────────────────────────

export const ShowcaseStates: RadioStory = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;padding:16px;">
      <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
        <ds-radio label="Unselected"></ds-radio>
        <ds-radio label="Selected" is-checked></ds-radio>
        <ds-radio label="Disabled" is-disabled></ds-radio>
        <ds-radio label="Selected + Disabled" is-checked is-disabled></ds-radio>
        <ds-radio label="Read-only" is-read-only></ds-radio>
        <ds-radio label="Read-only selected" is-read-only is-checked></ds-radio>
      </div>
      <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
        <ds-radio label="Error" has-error></ds-radio>
        <ds-radio label="Error selected" has-error is-checked></ds-radio>
      </div>
    </div>
  `,
};

export const ShowcaseWithDescription: RadioStory = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <ds-radio label="Option with description" description="This is a helper line beneath the label"></ds-radio>
      <ds-radio label="Selected with description" description="Selected state example" is-checked></ds-radio>
    </div>
  `,
};
