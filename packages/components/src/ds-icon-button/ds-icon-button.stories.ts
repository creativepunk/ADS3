import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-icon-button.js';
import '../ds-icon/ds-icon.js';
import type {
  DsIconButtonVariant,
  DsIconButtonSize,
  DsIconButtonShape,
  DsTooltipAlign,
} from './ds-icon-button.js';

interface IconButtonArgs {
  variant: DsIconButtonVariant;
  size: DsIconButtonSize;
  shape: DsIconButtonShape;
  isDisabled: boolean;
  isSelected: boolean;
  ariaLabel: string;
  tooltip: string;
  isTooltipDisabled: boolean;
  tooltipAlign: DsTooltipAlign;
}

const PLUS_ICON = html`<ds-icon name="add" size="sm"></ds-icon>`;

const meta: Meta<IconButtonArgs> = {
  title: 'Components/Icon Button',
  component: 'ds-icon-button',
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'tertiary', 'ghost'],
      description: 'Visual treatment for the button.',
      table: {
        type: { summary: `'primary' | 'tertiary' | 'ghost'` },
        defaultValue: { summary: 'primary' },
        category: 'Props',
      },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Button dimension — xs (20px), sm (24px), md (32px), lg (40px).',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    shape: {
      control: 'inline-radio',
      options: ['default', 'circle'],
      description: 'Corner treatment — default (4px radius) or circle (pill radius).',
      table: {
        type: { summary: `'default' | 'circle'` },
        defaultValue: { summary: 'default' },
        category: 'Props',
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the button. Suppresses clicks and dims to the disabled token.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isSelected: {
      control: 'boolean',
      description: 'Toggle-on appearance. Adds the selected border and sets aria-pressed="true".',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    ariaLabel: {
      control: 'text',
      name: 'aria-label',
      description: 'Accessible name. Falls back to tooltip text when not set.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip label text. Also used as aria-label when ariaLabel is not set.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Tooltip' },
    },
    isTooltipDisabled: {
      control: 'boolean',
      description: 'Hides the built-in tooltip. Defaults to true — opt in by setting false.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'Tooltip' },
    },
    tooltipAlign: {
      control: 'select',
      options: [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end',
      ],
      description: 'Alignment of the built-in tooltip relative to the button.',
      table: { type: { summary: 'DsTooltipAlign' }, defaultValue: { summary: 'bottom' }, category: 'Tooltip' },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    shape: 'default',
    isDisabled: false,
    isSelected: false,
    ariaLabel: 'Add',
    tooltip: '',
    isTooltipDisabled: true,
    tooltipAlign: 'bottom',
  },
  parameters: {
    options: { showPanel: true },
  },
  render: (args) => html`
    <div style="padding: 40px; display: inline-block;">
      <ds-icon-button
        variant=${args.variant}
        size=${args.size}
        shape=${args.shape}
        ?is-disabled=${args.isDisabled}
        ?is-selected=${args.isSelected}
        aria-label=${ifDefined(args.ariaLabel || undefined)}
        tooltip=${ifDefined(args.tooltip || undefined)}
        ?is-tooltip-disabled=${args.isTooltipDisabled}
        tooltip-align=${args.tooltipAlign}
        @ds-click=${(e: CustomEvent) => console.log('ds-click', e.detail)}
      >
        ${PLUS_ICON}
      </ds-icon-button>
    </div>
  `,
};

export default meta;
type Story = StoryObj<IconButtonArgs>;

/* ─── Variant stories ────────────────────────────────────────────────────── */

export const Default: Story = {
  args: { variant: 'primary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

/* ─── Shape stories ──────────────────────────────────────────────────────── */

export const Circle: Story = {
  args: { shape: 'circle' },
};

/* ─── State stories ──────────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { variant: 'primary', isDisabled: true },
};

export const Selected: Story = {
  args: { variant: 'tertiary', isSelected: true },
};

/* ─── Tooltip stories ────────────────────────────────────────────────────── */

export const WithTooltip: Story = {
  name: 'With tooltip',
  args: {
    tooltip: 'Add item',
    isTooltipDisabled: false,
    tooltipAlign: 'bottom',
    ariaLabel: '',
  },
};

export const OverrideTooltipProps: Story = {
  name: 'Override tooltip props',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 60px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle);">bottom (default)</span>
        <ds-icon-button tooltip="Add item" ?is-tooltip-disabled=${false} tooltip-align="bottom" aria-label="Add item">
          ${PLUS_ICON}
        </ds-icon-button>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle);">top</span>
        <ds-icon-button tooltip="Add item" ?is-tooltip-disabled=${false} tooltip-align="top" aria-label="Add item">
          ${PLUS_ICON}
        </ds-icon-button>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle);">left</span>
        <ds-icon-button tooltip="Add item" ?is-tooltip-disabled=${false} tooltip-align="left" aria-label="Add item">
          ${PLUS_ICON}
        </ds-icon-button>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <span style="font-size: 11px; color: var(--ds-text-text-subtle);">right</span>
        <ds-icon-button tooltip="Add item" ?is-tooltip-disabled=${false} tooltip-align="right" aria-label="Add item">
          ${PLUS_ICON}
        </ds-icon-button>
      </div>
    </div>
  `,
};

/* ─── Showcase stories — hidden from sidebar, embedded in Overview MDX ───── */

const VARIANTS: DsIconButtonVariant[] = ['primary', 'tertiary', 'ghost'];
const SIZES: DsIconButtonSize[] = ['xs', 'sm', 'md', 'lg'];
const SHAPES: DsIconButtonShape[] = ['default', 'circle'];

export const ShowcaseVariants: Story = {
  name: 'Showcase / Variants',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      ${VARIANTS.map(
        (v) => html`
          <ds-icon-button variant=${v} aria-label=${v}>${PLUS_ICON}</ds-icon-button>
        `,
      )}
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  name: 'Showcase / Sizes',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center;">
      ${SIZES.map(
        (s) => html`
          <ds-icon-button size=${s} aria-label=${s}>${PLUS_ICON}</ds-icon-button>
        `,
      )}
    </div>
  `,
};

export const ShowcaseShapes: Story = {
  name: 'Showcase / Shapes',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      ${VARIANTS.map(
        (v) => html`
          <div style="display: flex; gap: 12px; align-items: center;">
            ${SHAPES.map(
              (s) => html`
                <ds-icon-button variant=${v} shape=${s} aria-label="${v} ${s}">
                  ${PLUS_ICON}
                </ds-icon-button>
              `,
            )}
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
    <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
      <ds-icon-button aria-label="Default">${PLUS_ICON}</ds-icon-button>
      <ds-icon-button is-disabled aria-label="Disabled">${PLUS_ICON}</ds-icon-button>
      <ds-icon-button is-selected variant="tertiary" aria-label="Selected">${PLUS_ICON}</ds-icon-button>
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
        grid-template-columns: 90px repeat(${SIZES.length}, max-content);
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
          (s) => html`
            <ds-icon-button variant=${v} size=${s} aria-label="${v} ${s}">
              ${PLUS_ICON}
            </ds-icon-button>
          `,
        ),
      ])}
    </div>
  `,
};
