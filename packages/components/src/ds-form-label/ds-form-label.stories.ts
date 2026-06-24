import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-form-label.js';

interface FormLabelArgs {
  label: string;
  isRequired: boolean;
  hasInfoTip: boolean;
  for?: string;
}

const meta: Meta<FormLabelArgs> = {
  title: 'Internal/Form Label',
  component: 'ds-form-label',
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text content.',
      table: { category: 'Props', type: { summary: 'string' }, defaultValue: { summary: 'Label' } },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends a red asterisk (*) to indicate a required field.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    hasInfoTip: {
      control: 'boolean',
      description: 'Shows an info icon after the label text.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    for: {
      control: 'text',
      description: 'Associates the label with a form control by id.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
  },
  args: {
    label: 'Label',
    isRequired: false,
    hasInfoTip: false,
  },
  render: (args: FormLabelArgs) => html`
    <ds-form-label
      label=${args.label}
      ?is-required=${args.isRequired}
      ?has-info-tip=${args.hasInfoTip}
      for=${ifDefined(args.for || undefined)}
    ></ds-form-label>
  `,
};

export default meta;
type Story = StoryObj<FormLabelArgs>;

export const Default: Story = {
  args: { label: 'Label', isRequired: false, hasInfoTip: false },
};

export const Required: Story = {
  args: { label: 'Label', isRequired: true },
};

export const WithInfoTip: Story = {
  name: 'With Info Tip',
  args: { label: 'Label', hasInfoTip: true },
};

export const RequiredWithInfoTip: Story = {
  name: 'Required + Info Tip',
  args: { label: 'Label', isRequired: true, hasInfoTip: true },
};

export const ShowcaseStates: Story = {
  name: 'Showcase — States',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px;">
      <ds-form-label label="Default label"></ds-form-label>
      <ds-form-label label="Required label" is-required></ds-form-label>
      <ds-form-label label="With info tip" has-info-tip></ds-form-label>
      <ds-form-label label="Required + info tip" is-required has-info-tip></ds-form-label>
    </div>
  `,
};
