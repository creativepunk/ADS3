import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-button.js';
import '../ds-icon/ds-icon.js';
import type {
  DsButtonSize,
  DsButtonType,
  DsButtonVariant,
} from './ds-button.js';

interface ButtonArgs {
  variant: DsButtonVariant;
  size: DsButtonSize;
  type: DsButtonType;
  isDisabled: boolean;
  isLoading: boolean;
  isSelected: boolean;
  ariaLabel?: string;
  label: string;
  showIconBefore: boolean;
  iconAfter: boolean;
}

const PLUS_ICON = html`<ds-icon slot="iconBefore" name="add" size="sm"></ds-icon>`;

const meta: Meta<ButtonArgs> = {
  title: 'Components/Button',
  component: 'ds-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Visual treatment for the button.',
      table: {
        type: { summary: `'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'` },
        defaultValue: { summary: 'primary' },
        category: 'Props',
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button height — sm (24px), md (32px), or lg (40px).',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit', 'reset'],
      description:
        "Native button type. submit / reset trigger the closest form via ElementInternals.",
      table: {
        type: { summary: `'button' | 'submit' | 'reset'` },
        defaultValue: { summary: 'button' },
        category: 'Props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description:
        'Disables the button. Suppresses clicks and dims to the disabled token.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Shows a spinner. The label and icons collapse so the button width hugs the spinner. Sets aria-busy.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isSelected: {
      control: 'boolean',
      description:
        'Toggle-on appearance. Adds the selected border and sets aria-pressed="true".',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    ariaLabel: {
      control: 'text',
      name: 'aria-label',
      description: 'Accessible name. Required for icon-only buttons.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    label: {
      control: 'text',
      description: 'Text rendered in the default slot.',
      table: { category: 'Slot content' },
    },
    showIconBefore: {
      control: 'boolean',
      name: 'iconBefore',
      description: 'Toggle a sample icon in the iconBefore slot.',
      table: { category: 'Slot content' },
    },
    iconAfter: {
      control: 'boolean',
      description: 'Show the built-in keyboard_arrow_down iconAfter after the label.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    type: 'button',
    isDisabled: false,
    isLoading: false,
    isSelected: false,
    label: 'Button',
    showIconBefore: false,
    iconAfter: false,
  },
  parameters: {
    options: { showPanel: true },
  },
  render: (args) => html`
    <ds-button
      variant=${args.variant}
      size=${args.size}
      type=${args.type}
      ?is-disabled=${args.isDisabled}
      ?is-loading=${args.isLoading}
      ?is-selected=${args.isSelected}
      ?iconAfter=${args.iconAfter}
      aria-label=${ifDefined(args.ariaLabel || undefined)}
      @ds-click=${(e: CustomEvent) => console.log('ds-click', e.detail)}
    >
      ${args.showIconBefore ? PLUS_ICON : nothing}
      ${args.label}
    </ds-button>
  `,
};

export default meta;
type Story = StoryObj<ButtonArgs>;

/* ─── Variant stories (one per sidebar entry) ──────────────────────────── */

export const Default: Story = {
  args: { variant: 'primary', label: 'Button' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', label: 'Button' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', label: 'Button' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', label: 'Button' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Button' },
};

/* ─── State stories ────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { variant: 'primary', isDisabled: true, label: 'Disabled' },
};

export const Loading: Story = {
  args: { variant: 'primary', isLoading: true, label: 'Loading' },
};

export const Selected: Story = {
  args: { variant: 'secondary', isSelected: true, label: 'Selected' },
};

/* ─── Form integration ─────────────────────────────────────────────────── */

export const FormExample: Story = {
  name: 'Form Example',
  parameters: { controls: { disable: true } },
  render: () => html`
    <form
      style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget as HTMLFormElement);
        const out = (e.currentTarget as HTMLFormElement).querySelector(
          '#status',
        );
        if (out) out.textContent = `submitted: ${data.get('email') || '(empty)'}`;
      }}
      @reset=${(e: Event) => {
        const out = (e.currentTarget as HTMLFormElement).querySelector(
          '#status',
        );
        if (out) out.textContent = 'reset';
      }}
    >
      <input
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        style="
          all: unset;
          padding: 8px 12px;
          border-radius: 4px;
          background: var(--ds-background-input-default);
          color: var(--ds-text-text-default);
          border: 1px solid var(--ds-border-border-default);
          min-width: 220px;
        "
      />
      <ds-button type="submit" variant="primary">Submit</ds-button>
      <ds-button type="reset" variant="tertiary">Reset</ds-button>
      <span id="status" style="color: var(--ds-text-text-subtle);"></span>
    </form>
  `,
};

/* ─── Showcase stories — hidden from sidebar, embedded in Overview MDX ── */

const VARIANTS: DsButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'danger',
];
const SIZES: DsButtonSize[] = ['sm', 'md', 'lg'];

export const ShowcaseVariants: Story = {
  name: 'Showcase / Variants',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      ${VARIANTS.map((v) => html`<ds-button variant=${v}>${v}</ds-button>`)}
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  name: 'Showcase / Sizes',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <ds-button size="sm">Small</ds-button>
      <ds-button size="md">Medium</ds-button>
      <ds-button size="lg">Large</ds-button>
    </div>
  `,
};

export const ShowcaseStates: Story = {
  name: 'Showcase / States',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <ds-button>Default</ds-button>
      <ds-button is-disabled>Disabled</ds-button>
      <ds-button is-loading>Loading</ds-button>
      <ds-button is-selected>Selected</ds-button>
    </div>
  `,
};

export const ShowcaseLoading: Story = {
  name: 'Showcase / Loading per variant',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      ${VARIANTS.map(
        (v) => html`<ds-button variant=${v} is-loading>${v}</ds-button>`,
      )}
    </div>
  `,
};

export const ShowcaseSelected: Story = {
  name: 'Showcase / Selected per variant',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      ${VARIANTS.map(
        (v) => html`<ds-button variant=${v} is-selected>${v}</ds-button>`,
      )}
    </div>
  `,
};

export const ShowcaseWithIcons: Story = {
  name: 'Showcase / With icons',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <ds-button>${PLUS_ICON}Add item</ds-button>
      <ds-button variant="secondary" iconAfter>Open</ds-button>
      <ds-button variant="tertiary" iconAfter>${PLUS_ICON}New</ds-button>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  name: 'Showcase / Matrix',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div
      style="
        display: grid;
        grid-template-columns: 110px repeat(${SIZES.length}, max-content);
        gap: 16px 24px;
        align-items: center;
      "
    >
      <span></span>
      ${SIZES.map(
        (s) => html`
          <span
            style="
              font-size: 12px;
              color: var(--ds-text-text-subtle);
              text-transform: uppercase;
              letter-spacing: 0.08em;
            "
          >${s}</span>
        `,
      )}
      ${VARIANTS.flatMap((v) => [
        html`<span style="font-size: 12px; color: var(--ds-text-text-subtle);">${v}</span>`,
        ...SIZES.map(
          (s) => html`<ds-button variant=${v} size=${s}>Button</ds-button>`,
        ),
      ])}
    </div>
  `,
};
