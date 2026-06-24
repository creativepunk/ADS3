import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-split-button.js';
import '../ds-icon/ds-icon.js';
import type {
  DsSplitButtonSize,
  DsSplitButtonVariant,
  DsSplitButtonType,
} from './ds-split-button.js';

interface SplitButtonArgs {
  variant: DsSplitButtonVariant;
  type: DsSplitButtonType;
  size: DsSplitButtonSize;
  isDisabled: boolean;
  isMenuOpen: boolean;
  menuAriaLabel: string;
  label: string;
}

const meta: Meta<SplitButtonArgs> = {
  title: 'Components/Split Button',
  component: 'ds-split-button',
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'tertiary'],
      description: 'Visual treatment — solid brand fill or transparent with border.',
      table: {
        type: { summary: `'primary' | 'tertiary'` },
        defaultValue: { summary: 'primary' },
        category: 'Props',
      },
    },
    type: {
      control: 'inline-radio',
      options: ['text', 'icon'],
      description: 'Action button content — text label or icon.',
      table: {
        type: { summary: `'text' | 'icon'` },
        defaultValue: { summary: 'text' },
        category: 'Props',
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Height — sm (24px), md (32px), lg (40px).',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables both halves of the split button.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isMenuOpen: {
      control: 'boolean',
      description:
        'Sets aria-expanded on the menu button. The host controls this based on menu state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    menuAriaLabel: {
      control: 'text',
      description: 'Accessible label for the chevron / menu button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Open menu' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Text rendered in the default slot. Only relevant when type="text".',
      table: { category: 'Slot content' },
    },
  },
  args: {
    variant: 'primary',
    type: 'text',
    size: 'md',
    isDisabled: false,
    isMenuOpen: false,
    menuAriaLabel: 'Open menu',
    label: 'Button',
  },
  parameters: {
    options: { showPanel: true },
  },
  render: (args: SplitButtonArgs) => html`
    <ds-split-button
      variant=${args.variant}
      type=${args.type}
      size=${args.size}
      ?is-disabled=${args.isDisabled}
      ?is-menu-open=${args.isMenuOpen}
      menu-aria-label=${ifDefined(args.menuAriaLabel || undefined)}
      @ds-button-click=${(e: CustomEvent) => console.log('ds-button-click', e.detail)}
      @ds-menu-click=${(e: CustomEvent) => console.log('ds-menu-click', e.detail)}
    >
      ${args.type === 'icon'
        ? html`<ds-icon slot="actionIcon" name="play_arrow" size="sm"></ds-icon>`
        : args.label}
    </ds-split-button>
  `,
};

export default meta;
type Story = StoryObj<SplitButtonArgs>;

/* ─── Dev stories ─────────────────────────────────────────────────────────── */

export const Default: Story = {};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const IconType: Story = {
  name: 'Icon type',
  args: { type: 'icon' },
};

export const TertiaryIcon: Story = {
  name: 'Tertiary + Icon',
  args: { variant: 'tertiary', type: 'icon' },
};

export const Disabled: Story = {
  args: { isDisabled: true, label: 'Disabled' },
};

export const DisabledTertiary: Story = {
  name: 'Disabled (tertiary)',
  args: { variant: 'tertiary', isDisabled: true, label: 'Disabled' },
};

export const MenuOpen: Story = {
  name: 'Menu open (aria-expanded)',
  args: { isMenuOpen: true },
};

/* ─── Showcase stories — embedded in Overview MDX ─────────────────────────── */

const SIZES: DsSplitButtonSize[] = ['sm', 'md', 'lg'];
const VARIANTS: DsSplitButtonVariant[] = ['primary', 'tertiary'];
const TYPES: DsSplitButtonType[] = ['text', 'icon'];

export const ShowcaseVariants: Story = {
  name: 'Showcase / Variants',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <ds-split-button variant="primary">Primary</ds-split-button>
      <ds-split-button variant="tertiary">Tertiary</ds-split-button>
    </div>
  `,
};

export const ShowcaseTypes: Story = {
  name: 'Showcase / Types',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <ds-split-button type="text">Text</ds-split-button>
      <ds-split-button type="icon">
        <ds-icon slot="actionIcon" name="play_arrow" size="sm"></ds-icon>
      </ds-split-button>
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  name: 'Showcase / Sizes',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      <ds-split-button size="sm">Small</ds-split-button>
      <ds-split-button size="md">Medium</ds-split-button>
      <ds-split-button size="lg">Large</ds-split-button>
    </div>
  `,
};

export const ShowcaseStates: Story = {
  name: 'Showcase / States',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <ds-split-button>Default</ds-split-button>
      <ds-split-button is-disabled>Disabled</ds-split-button>
      <ds-split-button is-menu-open>Menu open</ds-split-button>
      <ds-split-button variant="tertiary">Tertiary</ds-split-button>
      <ds-split-button variant="tertiary" is-disabled>Tertiary disabled</ds-split-button>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  name: 'Showcase / Matrix',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      ${TYPES.map(
        (t) => html`
          <div>
            <p
              style="
                font-size: 11px;
                color: var(--ds-text-text-subtle);
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin: 0 0 12px;
              "
            >
              type=${t}
            </p>
            <div style="display: flex; gap: 24px; align-items: flex-end;">
              ${VARIANTS.map(
                (v) => html`
                  <div style="display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
                    <span
                      style="
                        font-size: 11px;
                        color: var(--ds-text-text-subtle);
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                      "
                    >${v}</span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      ${SIZES.map(
                        (s) => html`
                          <ds-split-button variant=${v} type=${t} size=${s}>
                            ${t === 'icon'
                              ? html`<ds-icon slot="actionIcon" name="play_arrow" size="sm"></ds-icon>`
                              : 'Button'}
                          </ds-split-button>
                        `,
                      )}
                    </div>
                  </div>
                `,
              )}
            </div>
          </div>
        `,
      )}
    </div>
  `,
};
