import type { Meta, StoryObj } from '@storybook/web-components';
import { html, render } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-tag.js';
import '../ds-icon/ds-icon.js';
import type { DsTagColor, DsTagSize } from './ds-tag.js';

interface TagArgs {
  color: DsTagColor;
  size: DsTagSize;
  disabled: boolean;
  isDismissable: boolean;
  hasIcon: boolean;
  label: string;
}

const COLORS: DsTagColor[] = [
  'gray', 'blue', 'cyan', 'teal', 'green', 'purple',
  'magenta', 'red', 'orange', 'yellow', 'high-contrast',
];

const SIZES: DsTagSize[] = ['xs', 'sm', 'md'];

const ICON = html`<ds-icon slot="icon" name="sentiment_satisfied" size="sm"></ds-icon>`;

const meta: Meta<TagArgs> = {
  title: 'Components/Tag',
  component: 'ds-tag',
  argTypes: {
    color: {
      control: 'select',
      options: COLORS,
      description: 'Color variant of the tag.',
      table: {
        type: { summary: COLORS.map(c => `'${c}'`).join(' | ') },
        defaultValue: { summary: 'gray' },
        category: 'Props',
      },
    },
    size: {
      control: 'inline-radio',
      options: SIZES,
      description: 'Size of the tag.',
      table: {
        type: { summary: `'xs' | 'sm' | 'md'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    disabled: {
      control: 'boolean',
      description: 'When true, disables all interaction and applies disabled styling.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    isDismissable: {
      control: 'boolean',
      description: 'When true, renders a dismiss (×) button that fires `ds-tag-dismiss` on click.',
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
    color: 'gray',
    size: 'md',
    disabled: false,
    isDismissable: false,
    hasIcon: false,
    label: 'Tag',
  },
  render: ({ color, size, disabled, isDismissable, hasIcon, label }) => html`
    <ds-tag
      color=${ifDefined(color)}
      size=${ifDefined(size)}
      ?disabled=${disabled}
      ?is-dismissable=${isDismissable}
      ?has-icon=${hasIcon}
      label=${ifDefined(label)}
    >
      ${hasIcon ? ICON : null}
    </ds-tag>
  `,
};

export default meta;
type Story = StoryObj<TagArgs>;

export const Default: Story = {};

const DISMISSABLE_TAGS: Array<{ id: number; color: DsTagColor; label: string; icon: string }> = [
  { id: 0, color: 'gray',         label: 'Design system',  icon: 'palette' },
  { id: 1, color: 'blue',         label: 'TypeScript',     icon: 'code' },
  { id: 2, color: 'cyan',         label: 'Lit',            icon: 'bolt' },
  { id: 3, color: 'teal',         label: 'Web components', icon: 'widgets' },
  { id: 4, color: 'green',        label: 'Accessible',     icon: 'accessibility' },
  { id: 5, color: 'purple',       label: 'Storybook',      icon: 'auto_stories' },
  { id: 6, color: 'magenta',      label: 'Figma',          icon: 'draw' },
  { id: 7, color: 'red',          label: 'Breaking change',icon: 'warning' },
  { id: 8, color: 'orange',       label: 'In progress',    icon: 'pending' },
  { id: 9, color: 'yellow',       label: 'Needs review',   icon: 'rate_review' },
];

let _dismissableVisible = new Set(DISMISSABLE_TAGS.map(t => t.id));
let _dismissableContainer: HTMLElement | null = null;
let _dismissableArgs: Partial<TagArgs> = {};

const renderDismissable = () => {
  if (!_dismissableContainer) return;
  const { size, disabled, hasIcon, isDismissable } = _dismissableArgs;
  render(html`
    <button
      style="display:block;margin-bottom:12px;padding:4px 12px;cursor:pointer;font-family:Inter,sans-serif;font-size:12px;border-radius:4px;border:1px solid #555;background:transparent;color:#ccc;"
      @click=${() => { _dismissableVisible = new Set(DISMISSABLE_TAGS.map(t => t.id)); renderDismissable(); }}
    >Reset</button>
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
      ${DISMISSABLE_TAGS.filter(t => _dismissableVisible.has(t.id)).map(t => html`
        <ds-tag
          color=${t.color}
          label=${t.label}
          size=${ifDefined(size)}
          ?has-icon=${hasIcon}
          ?disabled=${disabled}
          ?is-dismissable=${isDismissable}
          @ds-tag-dismiss=${() => { _dismissableVisible.delete(t.id); renderDismissable(); }}
        >
          ${hasIcon ? html`<ds-icon slot="icon" name=${t.icon} size="sm"></ds-icon>` : null}
        </ds-tag>
      `)}
    </div>
  `, _dismissableContainer);
};

export const Dismissable: Story = {
  args: { isDismissable: true, hasIcon: true, size: 'md', disabled: false },
  render: (args) => {
    _dismissableArgs = args;
    if (!_dismissableContainer) {
      _dismissableVisible = new Set(DISMISSABLE_TAGS.map(t => t.id));
      _dismissableContainer = document.createElement('div');
    }
    renderDismissable();
    return _dismissableContainer;
  },
};

export const WithIcon: Story = {
  args: { hasIcon: true },
};

export const WithIconAndDismiss: Story = {
  args: { hasIcon: true, isDismissable: true },
};

export const Disabled: Story = {
  args: { disabled: true, isDismissable: true, hasIcon: true },
};

/* ── Per-color stories ───────────────────────────────────────────────────── */
export const Blue: Story = { args: { color: 'blue' } };
export const Cyan: Story = { args: { color: 'cyan' } };
export const Teal: Story = { args: { color: 'teal' } };
export const Green: Story = { args: { color: 'green' } };
export const Purple: Story = { args: { color: 'purple' } };
export const Magenta: Story = { args: { color: 'magenta' } };
export const Red: Story = { args: { color: 'red' } };
export const Orange: Story = { args: { color: 'orange' } };
export const Yellow: Story = { args: { color: 'yellow' } };
export const HighContrast: Story = { args: { color: 'high-contrast' } };

/* ── Showcase stories ────────────────────────────────────────────────────── */
export const ShowcaseColors: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      ${COLORS.map(c => html`<ds-tag color=${c} label=${c}></ds-tag>`)}
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      ${SIZES.map(s => html`<ds-tag size=${s} label=${s}></ds-tag>`)}
    </div>
  `,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      <ds-tag label="Default"></ds-tag>
      <ds-tag label="With icon" has-icon>${ICON}</ds-tag>
      <ds-tag label="Dismissable" is-dismissable></ds-tag>
      <ds-tag label="Disabled" disabled is-dismissable has-icon>${ICON}</ds-tag>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:auto repeat(3, auto);gap:12px 16px;align-items:center;padding:16px;background:#1c1c1c;border-radius:8px;">
      <span style="color:#ccc;font-size:12px;font-family:Inter,sans-serif;"></span>
      ${SIZES.map(s => html`<span style="color:#ccc;font-size:12px;font-family:Inter,sans-serif;">${s}</span>`)}
      ${COLORS.map(c => html`
        <span style="color:#ccc;font-size:11px;font-family:Inter,sans-serif;text-transform:capitalize;">${c}</span>
        ${SIZES.map(s => html`
          <ds-tag color=${c} size=${s} label="Tag" is-dismissable has-icon>${ICON}</ds-tag>
        `)}
      `)}
    </div>
  `,
};
