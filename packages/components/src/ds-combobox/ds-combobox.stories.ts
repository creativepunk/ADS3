import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-combobox.js';
import type { DsComboboxOption, DsComboboxType } from './ds-combobox.js';

const FRUITS: DsComboboxOption[] = [
  { value: 'apple', label: 'Apple', description: 'A crisp red fruit' },
  { value: 'apricot', label: 'Apricot' },
  { value: 'banana', label: 'Banana', description: 'Yellow and curved' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry', description: 'Deep purple berry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'grapefruit', label: 'Grapefruit', disabled: true },
  { value: 'guava', label: 'Guava' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'lime', label: 'Lime' },
  { value: 'lychee', label: 'Lychee' },
  { value: 'mango', label: 'Mango', description: 'Tropical stone fruit' },
  { value: 'melon', label: 'Melon' },
  { value: 'nectarine', label: 'Nectarine' },
  { value: 'orange', label: 'Orange' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'peach', label: 'Peach' },
  { value: 'pear', label: 'Pear' },
  { value: 'pineapple', label: 'Pineapple' },
  { value: 'plum', label: 'Plum' },
  { value: 'pomegranate', label: 'Pomegranate' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'tangerine', label: 'Tangerine' },
  { value: 'watermelon', label: 'Watermelon' },
];

interface ComboboxArgs {
  selection: 'single' | 'multi';
  type: DsComboboxType;
  label: string;
  placeholder: string;
  helperText: string;
  errorMessage: string;
  successMessage: string;
  isRequired: boolean;
  isClearable: boolean;
  loading: boolean;
  disabled: boolean;
  readonly: boolean;
  invalid: boolean;
  valid: boolean;
}

const meta: Meta<ComboboxArgs> = {
  title: 'Components/Combobox',
  tags: ['autodocs'],
  argTypes: {
    selection: {
      control: { type: 'inline-radio' },
      options: ['single', 'multi'],
      description: 'Single or multi selection.',
      table: { type: { summary: "'single' | 'multi'" }, defaultValue: { summary: 'single' }, category: 'Props' },
    },
    type: {
      control: { type: 'inline-radio' },
      options: ['default', 'inline'],
      description: '`default` stacks label above; `inline` places it 180px to the left.',
      table: { type: { summary: "'default' | 'inline'" }, defaultValue: { summary: 'default' }, category: 'Props' },
    },
    label: {
      control: 'text',
      description: 'Label text.',
      table: { category: 'Props' },
    },
    placeholder: {
      control: 'text',
      description: 'Search input placeholder.',
      table: { category: 'Props' },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the trigger.',
      table: { category: 'Props' },
    },
    errorMessage: {
      control: 'text',
      description: 'Error text shown when invalid.',
      table: { category: 'Props' },
    },
    successMessage: {
      control: 'text',
      description: 'Success text shown when valid.',
      table: { category: 'Props' },
    },
    isRequired: {
      control: 'boolean',
      description: 'Appends asterisk to label.',
      table: { category: 'Props' },
    },
    isClearable: {
      control: 'boolean',
      description: 'Shows a clear (×) button when a single value is selected.',
      table: { category: 'Props' },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner in dropdown.',
      table: { category: 'Props' },
    },
    disabled: { control: 'boolean', table: { category: 'Props' } },
    readonly: { control: 'boolean', table: { category: 'Props' } },
    invalid: { control: 'boolean', table: { category: 'Props' } },
    valid: { control: 'boolean', table: { category: 'Props' } },
  },
  args: {
    selection: 'single',
    type: 'default',
    label: 'Fruit',
    placeholder: 'Select a fruit',
    helperText: 'Search and pick your favourite',
    errorMessage: 'Please select a value',
    successMessage: 'Looks great!',
    isRequired: false,
    isClearable: false,
    loading: false,
    disabled: false,
    readonly: false,
    invalid: false,
    valid: false,
  },
};

export default meta;
type Story = StoryObj<ComboboxArgs>;

const render = (args: ComboboxArgs) => html`
  <ds-combobox
    selection=${args.selection}
    type=${args.type}
    label=${args.label}
    placeholder=${args.placeholder}
    helper-text=${args.helperText}
    error-message=${args.errorMessage}
    success-message=${args.successMessage}
    ?is-required=${args.isRequired}
    ?is-clearable=${args.isClearable}
    ?loading=${args.loading}
    ?disabled=${args.disabled}
    ?readonly=${args.readonly}
    ?invalid=${args.invalid}
    ?valid=${args.valid}
    .options=${FRUITS}
    style="width: 320px;"
  ></ds-combobox>
`;

export const Default: Story = { render };

export const SingleSelect: Story = {
  render: (args) => render({ ...args, selection: 'single', label: 'Single' }),
};

export const MultiSelect: Story = {
  render: (args) => render({ ...args, selection: 'multi', label: 'Multi' }),
};

export const WithDescriptions: Story = {
  render: (args) =>
    render({
      ...args,
      label: 'With descriptions',
    }),
};

export const Loading: Story = {
  render: (args) => render({ ...args, loading: true }),
};

export const Disabled: Story = {
  render: (args) => render({ ...args, disabled: true }),
};

export const ReadOnly: Story = {
  render: (args) => render({ ...args, readonly: true }),
};

export const Error: Story = {
  render: (args) => render({ ...args, invalid: true }),
};

export const Valid: Story = {
  render: (args) => render({ ...args, valid: true }),
};

export const Inline: Story = {
  render: (args) =>
    render({ ...args, type: 'inline', label: 'Fruit' }),
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 32px; padding: 24px;">
      ${(['Default', 'Error', 'Valid', 'Disabled', 'Read-only'] as const).map((label, i) => html`
          <div>
            <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">${label}</p>
            <ds-combobox
              label="Fruit"
              placeholder="Select a fruit"
              helper-text="Search and pick"
              .options=${FRUITS}
              style="width: 320px;"
              ?invalid=${i === 1}
              ?valid=${i === 2}
              ?disabled=${i === 3}
              ?readonly=${i === 4}
              error-message="Required field"
              success-message="Looks great!"
            ></ds-combobox>
          </div>
        `)}
    </div>
  `,
};

export const ShowcaseVariants: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 48px; padding: 24px; align-items: flex-start;">
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Single select</p>
        <ds-combobox
          label="Single"
          placeholder="Select a fruit"
          .options=${FRUITS}
          style="width: 320px;"
        ></ds-combobox>
      </div>
      <div>
        <p style="color: var(--ds-text-text-subtle); margin-bottom: 8px; font-size: 12px;">Multi select</p>
        <ds-combobox
          selection="multi"
          label="Multi"
          placeholder="Select fruits"
          .options=${FRUITS}
          style="width: 320px;"
        ></ds-combobox>
      </div>
    </div>
  `,
};
