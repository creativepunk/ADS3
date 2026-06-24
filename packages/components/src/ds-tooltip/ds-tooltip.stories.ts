import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-tooltip.js';
import '../ds-button/ds-button.js';
import type { DsTooltipAlign } from './ds-tooltip.js';

interface TooltipArgs {
  align: DsTooltipAlign;
  closeOnActivation: boolean;
  enterDelayMs: number;
  leaveDelayMs: number;
  mousePointer: boolean;
  onlyWhenTruncated: boolean;
  shortcut: string;
  content: string;
}

const LONG_TEXT =
  'Do not put essential information in a tooltip. Tooltips have low discoverability and have usability issues on devices without hover interactions.';

const ALIGN_OPTIONS: DsTooltipAlign[] = [
  'top', 'top-start', 'top-end',
  'bottom', 'bottom-start', 'bottom-end',
  'left', 'left-start', 'left-end',
  'right', 'right-start', 'right-end',
];


const meta: Meta<TooltipArgs> = {
  title: 'Components/Tooltip',
  component: 'ds-tooltip',
  argTypes: {
    align: {
      control: 'select',
      options: ALIGN_OPTIONS,
      description: 'Where the bubble appears relative to the trigger.',
      table: {
        type: { summary: ALIGN_OPTIONS.map(a => `'${a}'`).join(' | ') },
        defaultValue: { summary: 'top' },
        category: 'Props',
      },
    },
    closeOnActivation: {
      control: 'boolean',
      description: 'Close the tooltip when the trigger is activated (click, Enter, Space).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    enterDelayMs: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Milliseconds to wait before showing.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '100' }, category: 'Props' },
    },
    leaveDelayMs: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Milliseconds to wait before hiding.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '300' }, category: 'Props' },
    },
    mousePointer: {
      control: 'boolean',
      description: 'Tooltip follows the cursor using fixed positioning.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    onlyWhenTruncated: {
      control: 'boolean',
      description: 'Only show the tooltip when the trigger text is visually truncated.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    shortcut: {
      control: 'text',
      description: 'Keyboard shortcut displayed as a kbd badge inside the bubble. e.g. "⌘K".',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    content: {
      control: 'text',
      description: 'Text rendered in the default slot.',
      table: { category: 'Slot content' },
    },
  },
  args: {
    align: 'top',
    closeOnActivation: false,
    enterDelayMs: 100,
    leaveDelayMs: 300,
    mousePointer: false,
    onlyWhenTruncated: false,
    shortcut: '',
    content: 'Short and brief',
  },
  parameters: { options: { showPanel: true } },
  render: (args) => html`
    <div style="padding: 60px; display: inline-block;">
      <ds-tooltip
        align=${args.align}
        ?close-on-activation=${args.closeOnActivation}
        enter-delay-ms=${ifDefined(args.enterDelayMs)}
        leave-delay-ms=${ifDefined(args.leaveDelayMs)}
        ?mouse-pointer=${args.mousePointer}
        ?only-when-truncated=${args.onlyWhenTruncated}
        shortcut=${ifDefined(args.shortcut || undefined)}
      >
        <ds-button slot="trigger" variant="secondary">Hover me</ds-button>
        ${args.content}
      </ds-tooltip>
    </div>
  `,
};

export default meta;
type Story = StoryObj<TooltipArgs>;

/* ─── Primary playground ─────────────────────────────────────────────────── */

export const Default: Story = {
  args: { align: 'top', content: 'Short and brief' },
};

/* ─── Feature: mouse pointer ─────────────────────────────────────────────── */

export const MousePointer: Story = {
  name: 'Mouse pointer',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 80px 120px; display: inline-block;">
      <ds-tooltip mouse-pointer>
        <ds-button slot="trigger" variant="secondary">
          Move the cursor around
        </ds-button>
        Follows the cursor
      </ds-tooltip>
    </div>
  `,
};

/* ─── Feature: updating position ─────────────────────────────────────────── */

export const UpdatingPosition: Story = {
  name: 'Updating position',
  parameters: { controls: { disable: true } },
  render: () => {
    let count = 0;
    return html`
      <div style="padding: 60px; display: inline-block;">
        <p style="font-size: 12px; color: var(--ds-text-text-subtle); margin-bottom: 16px;">
          The tooltip repositions as the trigger width changes.
        </p>
        <ds-tooltip align="top">
          <ds-button
            slot="trigger"
            variant="secondary"
            id="pos-btn"
            @click=${() => {
              count++;
              const btn = document.getElementById('pos-btn');
              if (btn) btn.textContent = `Clicked ${count} time${count === 1 ? '' : 's'}`;
            }}
          >Click me</ds-button>
          Tooltip repositions automatically
        </ds-tooltip>
      </div>
    `;
  },
};

/* ─── Feature: conditional truncation ───────────────────────────────────── */

export const ConditionalTruncation: Story = {
  name: 'Conditional (truncation)',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 60px; display: flex; flex-direction: column; gap: 24px;">
      <p style="font-size: 12px; color: var(--ds-text-text-subtle);">
        Tooltip only appears on the cell that is actually truncated.
      </p>
      ${(['This text is short', 'This text is long enough to be truncated by the container'] as string[]).map(text => html`
        <ds-tooltip align="bottom" only-when-truncated>
          <div
            slot="trigger"
            style="
              width: 200px; overflow: hidden; text-overflow: ellipsis;
              white-space: nowrap; padding: 6px 8px;
              background: var(--ds-background-neutral-default);
              border-radius: var(--ds-radius-semantic-radius-sm);
              font-size: 13px; color: var(--ds-text-text-default);
              cursor: default;
            "
          >${text}</div>
          ${text}
        </ds-tooltip>
      `)}
    </div>
  `,
};

/* ─── Feature: ignoring pointer events ──────────────────────────────────── */

export const IgnoringPointerEvents: Story = {
  name: 'Ignoring pointer events',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 60px; display: flex; flex-direction: column; gap: 24px;">
      <p style="font-size: 12px; color: var(--ds-text-text-subtle);">
        Host-level event listeners work even when the trigger has pointer-events: none
        (e.g. a disabled button).
      </p>
      <ds-tooltip align="top">
        <ds-button slot="trigger" variant="secondary" is-disabled>Disabled action</ds-button>
        This action is unavailable right now
      </ds-tooltip>
    </div>
  `,
};

/* ─── Feature: keyboard shortcut ────────────────────────────────────────── */

export const WithKeyboardShortcut: Story = {
  name: 'With keyboard shortcut',
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="padding: 60px; display: flex; gap: 24px; flex-wrap: wrap; align-items: center;">
      <ds-tooltip shortcut="⌘K">
        <ds-button slot="trigger" variant="secondary">Open command palette</ds-button>
        Quick actions
      </ds-tooltip>
      <ds-tooltip shortcut="⌘Z" align="bottom">
        <ds-button slot="trigger" variant="secondary">Undo</ds-button>
        Undo last action
      </ds-tooltip>
      <ds-tooltip shortcut="Ctrl+C" align="bottom">
        <ds-button slot="trigger" variant="secondary">Copy</ds-button>
        Copy to clipboard
      </ds-tooltip>
    </div>
  `,
};

/* ─── Other existing stories ─────────────────────────────────────────────── */

export const LongContent: Story = {
  name: 'Long content (wraps)',
  args: { content: LONG_TEXT },
};

export const CloseOnActivation: Story = {
  name: 'Close on activation',
  args: { closeOnActivation: true, content: 'Click the button to dismiss' },
};

export const NoDelay: Story = {
  name: 'No delay',
  args: { enterDelayMs: 0, leaveDelayMs: 0, content: 'Instant' },
};

export const AlignBottom: Story = {
  name: 'Align / Bottom',
  args: { align: 'bottom', content: 'Below the trigger' },
};

export const AlignLeft: Story = {
  name: 'Align / Left',
  args: { align: 'left', content: 'Left of trigger' },
};

export const AlignRight: Story = {
  name: 'Align / Right',
  args: { align: 'right', content: 'Right of trigger' },
};

/* ─── Showcase stories ────────────────────────────────────────────────────── */

export const ShowcaseAlignments: Story = {
  name: 'Showcase / All alignments',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => {
    const groups: Array<{ label: string; aligns: DsTooltipAlign[] }> = [
      { label: 'top', aligns: ['top-start', 'top', 'top-end'] },
      { label: 'bottom', aligns: ['bottom-start', 'bottom', 'bottom-end'] },
      { label: 'left', aligns: ['left-start', 'left', 'left-end'] },
      { label: 'right', aligns: ['right-start', 'right', 'right-end'] },
    ];
    return html`
      <div style="display: flex; flex-direction: column; gap: 48px; padding: 40px;">
        ${groups.map(group => html`
          <div>
            <p style="font-size: 11px; color: var(--ds-text-text-subtle); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px;">${group.label}</p>
            <div style="display: flex; gap: 32px; flex-wrap: wrap; align-items: center;">
              ${group.aligns.map(align => html`
                <div style="padding: 32px;">
                  <ds-tooltip align=${align}>
                    <ds-button slot="trigger" variant="secondary">${align}</ds-button>
                    Tooltip label
                  </ds-tooltip>
                </div>
              `)}
            </div>
          </div>
        `)}
      </div>
    `;
  },
};

export const ShowcaseShortcuts: Story = {
  name: 'Showcase / Keyboard shortcuts',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => {
    const items: Array<{ label: string; tip: string; shortcut: string }> = [
      { label: 'Command palette', tip: 'Quick actions', shortcut: '⌘K' },
      { label: 'Undo', tip: 'Undo last action', shortcut: '⌘Z' },
      { label: 'Redo', tip: 'Redo last action', shortcut: '⌘⇧Z' },
      { label: 'Save', tip: 'Save changes', shortcut: '⌘S' },
      { label: 'Find', tip: 'Find in document', shortcut: '⌘F' },
    ];
    return html`
      <div style="display: flex; gap: 16px; flex-wrap: wrap; padding: 60px;">
        ${items.map(item => html`
          <ds-tooltip shortcut=${item.shortcut} align="bottom">
            <ds-button slot="trigger" variant="secondary">${item.label}</ds-button>
            ${item.tip}
          </ds-tooltip>
        `)}
      </div>
    `;
  },
};
