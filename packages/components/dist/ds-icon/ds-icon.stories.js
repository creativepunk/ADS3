import { html } from 'lit';
import './ds-icon.js';
// A few representative Material Symbol names used across these stories
const SAMPLE_ICONS = [
    'add',
    'close',
    'search',
    'settings',
    'home',
    'star',
    'favorite',
    'arrow_forward',
    'check',
    'delete',
];
const meta = {
    title: 'Components/Icon',
    component: 'ds-icon',
    argTypes: {
        name: {
            control: 'select',
            options: SAMPLE_ICONS,
            description: 'Material Symbol name (e.g. "add", "close", "search"). Maps directly to the icon filename in @material-symbols/svg-400.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
                category: 'Props',
            },
        },
        size: {
            control: 'inline-radio',
            options: ['sm', 'md', 'lg'],
            description: 'Icon dimension — sm (16px), md (20px, default), lg (24px).',
            table: {
                type: { summary: `'sm' | 'md' | 'lg'` },
                defaultValue: { summary: 'md' },
                category: 'Props',
            },
        },
        iconStyle: {
            control: 'inline-radio',
            options: ['outlined', 'rounded', 'sharp'],
            name: 'icon-style',
            description: 'Material Symbols style variant.',
            table: {
                type: { summary: `'outlined' | 'rounded' | 'sharp'` },
                defaultValue: { summary: 'outlined' },
                category: 'Props',
            },
        },
        fill: {
            control: 'boolean',
            description: 'Load the filled variant of the icon (e.g. star-fill instead of star).',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Props',
            },
        },
    },
    args: {
        name: 'add',
        size: 'md',
        iconStyle: 'outlined',
        fill: false,
    },
    render: (args) => html `
    <ds-icon
      name=${args.name}
      size=${args.size}
      icon-style=${args.iconStyle}
      ?fill=${args.fill}
    ></ds-icon>
  `,
};
export default meta;
/* ─── Interactive playground ─────────────────────────────────────────────── */
export const Default = {
    args: { name: 'add' },
};
/* ─── Fill variant ───────────────────────────────────────────────────────── */
export const Filled = {
    args: { name: 'star', fill: true },
};
/* ─── Custom SVG via slot ────────────────────────────────────────────────── */
export const CustomSlot = {
    name: 'Custom (slot)',
    parameters: { controls: { disable: true } },
    render: () => html `
    <ds-icon size="md">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M8 3v10M3 8h10" stroke-linecap="round" />
      </svg>
    </ds-icon>
  `,
};
/* ─── Showcase stories — hidden from sidebar ─────────────────────────────── */
const SIZES = ['sm', 'md', 'lg'];
const STYLES = ['outlined', 'rounded', 'sharp'];
export const ShowcaseSizes = {
    name: 'Showcase / Sizes',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; gap: 20px; align-items: center;">
      ${SIZES.map((s) => html `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <ds-icon name="star" size=${s}></ds-icon>
            <span style="font-size: 11px; color: var(--ds-text-text-subtle);">${s}</span>
          </div>
        `)}
    </div>
  `,
};
export const ShowcaseStyles = {
    name: 'Showcase / Styles',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; gap: 24px; align-items: center;">
      ${STYLES.map((s) => html `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <ds-icon name="star" icon-style=${s}></ds-icon>
            <span style="font-size: 11px; color: var(--ds-text-text-subtle);">${s}</span>
          </div>
        `)}
    </div>
  `,
};
export const ShowcaseFill = {
    name: 'Showcase / Fill vs Outline',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; gap: 24px; align-items: center;">
      ${['star', 'favorite', 'home', 'settings'].map((name) => html `
          <div style="display: flex; gap: 8px; align-items: center;">
            <ds-icon name=${name}></ds-icon>
            <ds-icon name=${name} fill></ds-icon>
          </div>
        `)}
    </div>
  `,
};
export const ShowcaseSwatch = {
    name: 'Showcase / Sample icons',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      ${SAMPLE_ICONS.map((name) => html `
          <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
            <ds-icon name=${name}></ds-icon>
            <span style="font-size: 10px; color: var(--ds-text-text-subtle); font-family: monospace;">${name}</span>
          </div>
        `)}
    </div>
  `,
};
export const ShowcaseInContext = {
    name: 'Showcase / In context',
    tags: ['!dev'],
    parameters: { controls: { disable: true } },
    render: () => html `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <!-- Icon inheriting parent color -->
      <div style="display: flex; gap: 8px; align-items: center; color: var(--ds-text-text-default);">
        <ds-icon name="check" size="sm"></ds-icon>
        <span style="font-size: 14px;">Inherits parent color via currentColor</span>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; color: var(--ds-text-text-success);">
        <ds-icon name="check_circle" size="sm"></ds-icon>
        <span style="font-size: 14px;">Success state</span>
      </div>
      <div style="display: flex; gap: 8px; align-items: center; color: var(--ds-text-text-danger);">
        <ds-icon name="error" size="sm"></ds-icon>
        <span style="font-size: 14px;">Danger state</span>
      </div>
    </div>
  `,
};
//# sourceMappingURL=ds-icon.stories.js.map