import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-text-area.js';
import type { DsTextAreaType, DsTextAreaResize } from './ds-text-area.js';

interface TextAreaArgs {
  type: DsTextAreaType;
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
  maxlength: number | null;
  hasCount: boolean;
  resize: DsTextAreaResize;
}

const meta: Meta<TextAreaArgs> = {
  title: 'Components/Text Area',
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
      description: 'Label text displayed above or beside the textarea.',
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
      description: 'Current string value of the textarea.',
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
      description: 'Helper text shown below the textarea.',
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
      description: 'Makes the textarea read-only.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    maxlength: {
      control: { type: 'number' },
      description: 'Maximum character length. Pairs with `has-count` to display `n/max`.',
      table: {
        type: { summary: 'number | null' },
        defaultValue: { summary: 'null' },
        category: 'Props',
      },
    },
    hasCount: {
      control: 'boolean',
      description: 'Shows a character count in the footer row.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    resize: {
      control: { type: 'select' },
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Controls the resize handle direction. `none` disables resizing (default).',
      table: {
        type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: 'none' },
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
    maxlength: 100,
    hasCount: true,
    resize: 'none',
  },
};

export default meta;
type Story = StoryObj<TextAreaArgs>;

const render = (args: TextAreaArgs) => html`
  <ds-text-area
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
    maxlength=${args.maxlength ?? ''}
    ?has-count=${args.hasCount}
    resize=${args.resize}
    style="width: 240px;"
  ></ds-text-area>
`;

export const Default: Story = { render };

export const WithValue: Story = {
  render,
  args: {
    value: 'This is some existing content in the text area.',
    helperText: 'Helper text',
  },
};

export const NoCount: Story = {
  render,
  args: { hasCount: false },
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
  args: { valid: true, value: 'Valid content', helperText: '' },
};

export const Disabled: Story = {
  render,
  args: { disabled: true },
};

export const Readonly: Story = {
  render,
  args: { readonly: true, value: 'Read-only content that cannot be edited.' },
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;width:240px;">
      <ds-text-area
        label="Default"
        is-required
        placeholder="Placeholder"
        helper-text="Optional helper text"
        maxlength="100"
        has-count
        style="width:240px;"
      ></ds-text-area>
      <ds-text-area
        label="With value"
        is-required
        value="This is some existing content in the text area."
        helper-text="Optional helper text"
        maxlength="100"
        has-count
        style="width:240px;"
      ></ds-text-area>
      <ds-text-area
        label="Invalid"
        is-required
        placeholder="Placeholder"
        invalid
        error-message="Error message"
        maxlength="100"
        has-count
        style="width:240px;"
      ></ds-text-area>
      <ds-text-area
        label="Valid"
        is-required
        value="Valid content"
        valid
        success-message="Success message"
        maxlength="100"
        has-count
        style="width:240px;"
      ></ds-text-area>
      <ds-text-area
        label="Disabled"
        placeholder="Placeholder"
        disabled
        helper-text="Optional helper text"
        maxlength="100"
        has-count
        style="width:240px;"
      ></ds-text-area>
      <ds-text-area
        label="Read-only"
        value="Read-only content that cannot be edited."
        readonly
        helper-text="Optional helper text"
        maxlength="100"
        has-count
        style="width:240px;"
      ></ds-text-area>
    </div>
  `,
};

export const ShowcaseInlineLayouts: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;">
      <ds-text-area
        type="inline"
        label="Label"
        is-required
        placeholder="Placeholder"
        helper-text="Optional helper text"
        maxlength="100"
        has-count
      ></ds-text-area>
      <ds-text-area
        type="inline"
        label="Label"
        is-required
        placeholder="Placeholder"
        invalid
        error-message="Error message"
        maxlength="100"
        has-count
      ></ds-text-area>
      <ds-text-area
        type="inline"
        label="Label"
        is-required
        value="Valid content"
        valid
        success-message="Success message"
        maxlength="100"
        has-count
      ></ds-text-area>
      <ds-text-area
        type="inline"
        label="Label"
        placeholder="Placeholder"
        disabled
        helper-text="Optional helper text"
        maxlength="100"
        has-count
      ></ds-text-area>
    </div>
  `,
};

export const ResizeVertical: Story = {
  render,
  args: { resize: 'vertical', helperText: 'Drag the handle to resize vertically' },
};

export const ResizeHorizontal: Story = {
  render,
  args: { resize: 'horizontal', helperText: 'Drag the handle to resize horizontally' },
};

export const ResizeBoth: Story = {
  render,
  args: { resize: 'both', helperText: 'Drag the handle to resize in both directions' },
};

export const ShowcaseResizeVariants: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <p style="font:12px/16px Inter,sans-serif;color:#acacac;margin:0;">none (default)</p>
        <ds-text-area
          label="Label"
          placeholder="Placeholder"
          helper-text="No resize handle"
          resize="none"
          maxlength="100"
          has-count
          style="width:220px;"
        ></ds-text-area>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <p style="font:12px/16px Inter,sans-serif;color:#acacac;margin:0;">vertical</p>
        <ds-text-area
          label="Label"
          placeholder="Placeholder"
          helper-text="Drag to resize vertically"
          resize="vertical"
          maxlength="100"
          has-count
          style="width:220px;"
        ></ds-text-area>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <p style="font:12px/16px Inter,sans-serif;color:#acacac;margin:0;">horizontal</p>
        <ds-text-area
          label="Label"
          placeholder="Placeholder"
          helper-text="Drag to resize horizontally"
          resize="horizontal"
          maxlength="100"
          has-count
          style="width:220px;"
        ></ds-text-area>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <p style="font:12px/16px Inter,sans-serif;color:#acacac;margin:0;">both</p>
        <ds-text-area
          label="Label"
          placeholder="Placeholder"
          helper-text="Drag to resize in both directions"
          resize="both"
          maxlength="100"
          has-count
          style="width:220px;"
        ></ds-text-area>
      </div>
    </div>
  `,
};

export const ShowcaseGrowBehavior: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:24px;width:300px;">
      <ds-text-area
        label="Short content (min-height 56px)"
        placeholder="Start typing..."
        maxlength="500"
        has-count
        style="width:300px;"
      ></ds-text-area>
      <ds-text-area
        label="Long content (scrolls at 192px)"
        value="Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10 — scrolls past here"
        maxlength="500"
        has-count
        style="width:300px;"
      ></ds-text-area>
    </div>
  `,
};
