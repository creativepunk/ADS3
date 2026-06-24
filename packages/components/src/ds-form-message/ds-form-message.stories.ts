import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-form-message.js';
import type { DsFormMessageType } from './ds-form-message.js';

interface FormMessageArgs {
  type: DsFormMessageType;
  errorText: string;
  successText: string;
  helperText: string;
}

const meta: Meta<FormMessageArgs> = {
  title: 'Internal/Form Message',
  component: 'ds-form-message',
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['error', 'success', 'helper'],
      description: 'Visual and semantic type — controls which text prop is shown.',
      table: {
        type: { summary: `'error' | 'success' | 'helper'` },
        defaultValue: { summary: 'error' },
        category: 'Props',
      },
    },
    errorText: {
      control: 'text',
      description: 'Text shown when type="error".',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    successText: {
      control: 'text',
      description: 'Text shown when type="success".',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    helperText: {
      control: 'text',
      description: 'Text shown when type="helper".',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
  },
  args: {
    type: 'error',
    errorText: 'This field is required',
    successText: 'Looks good!',
    helperText: 'Optional helper text',
  },
  render: (args: FormMessageArgs) => html`
    <ds-form-message
      type=${args.type}
      error-text=${args.errorText}
      success-text=${args.successText}
      helper-text=${args.helperText}
    ></ds-form-message>
  `,
};

export default meta;
type Story = StoryObj<FormMessageArgs>;

export const Default: Story = {
  args: { type: 'error', errorText: 'This field is required' },
};

export const Error: Story = {
  args: { type: 'error', errorText: 'This field is required' },
};

export const Success: Story = {
  args: { type: 'success', successText: 'Looks good!' },
};

export const Helper: Story = {
  args: { type: 'helper', helperText: 'Optional helper text' },
};

export const ShowcaseTypes: Story = {
  name: 'Showcase — Types',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; padding: 24px;">
      <ds-form-message type="error">Error message</ds-form-message>
      <ds-form-message type="success">Success message</ds-form-message>
      <ds-form-message type="helper">Optional helper text</ds-form-message>
    </div>
  `,
};
