import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-tag-selectable.js';
import '../ds-icon/ds-icon.js';
import type { DsTagSelectableSize } from './ds-tag-selectable.js';

interface TagSelectableArgs {
  size: DsTagSelectableSize;
  selected: boolean;
  disabled: boolean;
  hasIcon: boolean;
  label: string;
}

const SIZES: DsTagSelectableSize[] = ['sm', 'md', 'lg'];

const ICON = html`<ds-icon slot="icon" name="sentiment_satisfied" size="sm"></ds-icon>`;

const meta: Meta<TagSelectableArgs> = {
  title: 'Components/Tag Selectable',
  component: 'ds-tag-selectable',
  argTypes: {
    size: {
      control: 'inline-radio',
      options: SIZES,
      description: 'Size of the tag.',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    selected: {
      control: 'boolean',
      description: 'When true, the tag appears in its selected (active) state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables interaction and applies disabled styling.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    hasIcon: {
      control: 'boolean',
      description: 'When true, renders the icon slot before the label.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Text label rendered inside the tag.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Tag' },
        category: 'Props',
      },
    },
  },
  args: {
    size: 'md',
    selected: false,
    disabled: false,
    hasIcon: false,
    label: 'Tag',
  },
  render: ({ size, selected, disabled, hasIcon, label }) => html`
    <ds-tag-selectable
      size=${ifDefined(size)}
      ?selected=${selected}
      ?disabled=${disabled}
      ?has-icon=${hasIcon}
      label=${ifDefined(label)}
    >
      ${hasIcon ? ICON : null}
    </ds-tag-selectable>
  `,
};

export default meta;
type Story = StoryObj<TagSelectableArgs>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const WithIcon: Story = {
  args: { hasIcon: true },
};

export const WithIconSelected: Story = {
  args: { hasIcon: true, selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledWithIcon: Story = {
  args: { disabled: true, hasIcon: true },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

/* ── Showcase stories ────────────────────────────────────────────────────── */

export const ShowcaseSizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      ${SIZES.map(s => html`
        <ds-tag-selectable size=${s} label=${s}></ds-tag-selectable>
      `)}
    </div>
  `,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      <ds-tag-selectable label="Default"></ds-tag-selectable>
      <ds-tag-selectable label="Selected" selected></ds-tag-selectable>
      <ds-tag-selectable label="Disabled" disabled></ds-tag-selectable>
      <ds-tag-selectable label="With icon" has-icon>${ICON}</ds-tag-selectable>
      <ds-tag-selectable label="Icon selected" has-icon selected>${ICON}</ds-tag-selectable>
      <ds-tag-selectable label="Icon disabled" has-icon disabled>${ICON}</ds-tag-selectable>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:auto repeat(3, auto);gap:12px 16px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;font-family:Inter,sans-serif;font-size:12px;color:#ccc;">
      <span></span>
      ${SIZES.map(s => html`<span>${s}</span>`)}

      <span>Default</span>
      ${SIZES.map(s => html`<ds-tag-selectable size=${s} label="Tag"></ds-tag-selectable>`)}

      <span>Selected</span>
      ${SIZES.map(s => html`<ds-tag-selectable size=${s} label="Tag" selected></ds-tag-selectable>`)}

      <span>Disabled</span>
      ${SIZES.map(s => html`<ds-tag-selectable size=${s} label="Tag" disabled></ds-tag-selectable>`)}

      <span>With icon</span>
      ${SIZES.map(s => html`
        <ds-tag-selectable size=${s} label="Tag" has-icon>
          <ds-icon slot="icon" name="sentiment_satisfied" size="sm"></ds-icon>
        </ds-tag-selectable>
      `)}

      <span>Icon selected</span>
      ${SIZES.map(s => html`
        <ds-tag-selectable size=${s} label="Tag" has-icon selected>
          <ds-icon slot="icon" name="sentiment_satisfied" size="sm"></ds-icon>
        </ds-tag-selectable>
      `)}
    </div>
  `,
};
