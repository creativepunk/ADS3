import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-search.js';
import type { DsSearchVariant } from './ds-search.js';

interface SearchArgs {
  variant: DsSearchVariant;
  placeholder: string;
  ariaLabel?: string;
  disabled: boolean;
  value?: string;
  name?: string;
  closeButtonAssistiveText: string;
}

const meta: Meta<SearchArgs> = {
  title: 'Components/Search',
  component: 'ds-search',
  argTypes: {
    variant: {
      control: 'select',
      options: ['expanded', 'expandable-ghost', 'expandable-tertiary'],
      description:
        'Visual treatment. `expanded` is always a full-width field. `expandable-ghost` and `expandable-tertiary` start as an icon trigger and expand on click, collapsing again when focus is lost with no value.',
      table: {
        type: { summary: `'expanded' | 'expandable-ghost' | 'expandable-tertiary'` },
        defaultValue: { summary: 'expandable-ghost' },
        category: 'Props',
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown inside the input when empty.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Search' },
        category: 'Props',
      },
    },
    ariaLabel: {
      control: 'text',
      name: 'aria-label',
      description:
        'Accessible name. Defaults to "Open search" when collapsed and the placeholder value when expanded.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the search input and all interaction.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    value: {
      control: 'text',
      description: 'Controlled value — sets the input value from outside.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    name: {
      control: 'text',
      description: 'Native input name attribute for form submission.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    closeButtonAssistiveText: {
      control: 'text',
      description: 'Accessible label for the clear (×) button — used for i18n.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Clear search' },
        category: 'Props',
      },
    },
  },
  args: {
    variant: 'expandable-ghost',
    placeholder: 'Search',
    disabled: false,
    closeButtonAssistiveText: 'Clear search',
  },
  parameters: {
    options: { showPanel: true },
  },
  render: (args) => html`
    <ds-search
      variant=${args.variant}
      placeholder=${args.placeholder}
      aria-label=${ifDefined(args.ariaLabel || undefined)}
      ?disabled=${args.disabled}
      value=${ifDefined(args.value || undefined)}
      name=${ifDefined(args.name || undefined)}
      close-button-assistive-text=${args.closeButtonAssistiveText}
      @ds-input=${(e: CustomEvent) => console.log('ds-input', e.detail)}
      @ds-search-expand=${(e: CustomEvent) => console.log('ds-search-expand', e.detail)}
      @ds-search-clear=${(e: CustomEvent) => console.log('ds-search-clear', e.detail)}
    ></ds-search>
  `,
};

export default meta;
type Story = StoryObj<SearchArgs>;

/* ─── Variant stories ───────────────────────────────────────────────────── */

export const Default: Story = {
  args: { variant: 'expandable-ghost' },
};

export const ExpandableGhost: Story = {
  name: 'Expandable Ghost',
  args: { variant: 'expandable-ghost' },
};

export const ExpandableTertiary: Story = {
  name: 'Expandable Tertiary',
  args: { variant: 'expandable-tertiary' },
};

export const Expanded: Story = {
  name: 'Expanded (always open)',
  args: { variant: 'expanded' },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { variant: 'expanded', disabled: true },
};

/* ─── Showcase stories (hidden from sidebar, embedded in MDX) ───────────── */

const VARIANTS: DsSearchVariant[] = [
  'expandable-ghost',
  'expandable-tertiary',
  'expanded',
];

export const ShowcaseVariants: Story = {
  name: 'Showcase / Variants',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
      ${VARIANTS.map(
        (v) => html`
          <div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-start;">
            <span style="font-size: 11px; color: var(--ds-text-text-subtle);">${v}</span>
            <ds-search variant=${v}></ds-search>
          </div>
        `,
      )}
    </div>
  `,
};

export const ShowcaseStates: Story = {
  name: 'Showcase / States',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle); width: 160px;">Collapsed (click to expand)</span>
        <ds-search variant="expandable-ghost"></ds-search>
        <ds-search variant="expandable-tertiary"></ds-search>
      </div>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle); width: 160px;">Always expanded</span>
        <ds-search variant="expanded"></ds-search>
      </div>
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle); width: 160px;">Disabled</span>
        <ds-search variant="expanded" disabled></ds-search>
      </div>
    </div>
  `,
};
