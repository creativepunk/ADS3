import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-action-menu.js';
import '../ds-icon/ds-icon.js';
import type { DsActionMenuItemSize, DsActionMenuItemVariant } from './ds-action-menu-item.js';

interface Args {
  size: DsActionMenuItemSize;
  variant: DsActionMenuItemVariant;
  disabled: boolean;
  shortcut: string;
  hasSubMenu: boolean;
  isChecked: boolean;
}

const meta: Meta<Args> = {
  title: 'Components/Action Menu',
  component: 'ds-action-menu' as never,
  subcomponents: {
    'ds-action-menu-group': 'ds-action-menu-group' as never,
    'ds-action-menu-item': 'ds-action-menu-item' as never,
    'ds-action-menu-separator': 'ds-action-menu-separator' as never,
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['md', 'sm'],
      description: 'Propagated to all child items. md = 40 px, sm = 32 px.',
      table: { type: { summary: "'md' | 'sm'" }, defaultValue: { summary: 'md' }, category: 'ds-action-menu' },
    },
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'danger'],
      description: 'Colour treatment. danger uses red text and a full red hover background.',
      table: { type: { summary: "'default' | 'danger'" }, defaultValue: { summary: 'default' }, category: 'ds-action-menu-item' },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Dims the item to 40 % opacity and blocks interaction.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'ds-action-menu-item' },
    },
    shortcut: {
      control: { type: 'text' },
      description: 'Keyboard shortcut hint shown in the trailing area (e.g. "⌘K"). Hidden when a sub-menu caret is present.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'ds-action-menu-item' },
    },
    hasSubMenu: {
      control: { type: 'boolean' },
      description: 'Shows a right-chevron caret indicating a flyout sub-menu.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'ds-action-menu-item' },
    },
    isChecked: {
      control: { type: 'boolean' },
      description: 'Renders a checkmark in the indent column. The parent auto-shows the indent column on all items when any item is checked.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'ds-action-menu-item' },
    },
  },
  args: {
    size: 'md',
    variant: 'default',
    disabled: false,
    shortcut: '',
    hasSubMenu: false,
    isChecked: false,
  },
};
export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  render: ({ size, variant, disabled, shortcut, hasSubMenu, isChecked }) => html`
    <ds-action-menu size=${ifDefined(size)} style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="new">
          <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
          New item
        </ds-action-menu-item>
        <ds-action-menu-item
          value="edit"
          variant=${variant}
          ?disabled=${disabled}
          shortcut=${ifDefined(shortcut || undefined)}
          ?has-sub-menu=${hasSubMenu}
          ?is-checked=${isChecked}
        >
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit
        </ds-action-menu-item>
        <ds-action-menu-item value="share">
          <ds-icon slot="leadingIcon" name="share" size="sm"></ds-icon>
          Share
        </ds-action-menu-item>
        <ds-action-menu-item value="delete" variant="danger">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const WithGroups: Story = {
  name: 'With groups',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="copy-link">Copy task link</ds-action-menu-item>
        <ds-action-menu-item value="add-flag">Add flag</ds-action-menu-item>
        <ds-action-menu-item value="add-label">Add label</ds-action-menu-item>
        <ds-action-menu-item value="print">Print</ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group>
        <ds-action-menu-item value="remove">Remove from sprint</ds-action-menu-item>
        <ds-action-menu-item value="delete" variant="danger">Delete</ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group selection-type="checkbox">
        <ds-action-menu-item value="action" is-checked>Action</ds-action-menu-item>
        <ds-action-menu-item value="filter">Filter</ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const WithTitles: Story = {
  name: 'With titles',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group title="File">
        <ds-action-menu-item value="new">
          <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
          New
        </ds-action-menu-item>
        <ds-action-menu-item value="edit">
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit
        </ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group title="Danger zone">
        <ds-action-menu-item value="delete" variant="danger">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const Danger: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="edit">
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit
        </ds-action-menu-item>
        <ds-action-menu-item value="delete" variant="danger">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="new">
          <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
          New item
        </ds-action-menu-item>
        <ds-action-menu-item value="edit" disabled>
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit (disabled)
        </ds-action-menu-item>
        <ds-action-menu-item value="delete" variant="danger">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const SizeSmall: Story = {
  name: 'Size: small',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu size="sm" style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="new">
          <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
          New item
        </ds-action-menu-item>
        <ds-action-menu-item value="edit">
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit
        </ds-action-menu-item>
        <ds-action-menu-item value="delete" variant="danger">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const WithSubMenu: Story = {
  name: 'With sub-menu',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="new" shortcut="⌘N">
          <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
          New
        </ds-action-menu-item>
        <ds-action-menu-item value="edit" shortcut="⌘E">
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit
        </ds-action-menu-item>
        <ds-action-menu-item value="share">
          <ds-icon slot="leadingIcon" name="share" size="sm"></ds-icon>
          Share
          <ds-action-menu slot="subMenu" style="width:200px">
            <ds-action-menu-group>
              <ds-action-menu-item value="share-link">Copy link</ds-action-menu-item>
              <ds-action-menu-item value="share-email">Send via email</ds-action-menu-item>
              <ds-action-menu-item value="share-embed">Embed</ds-action-menu-item>
            </ds-action-menu-group>
          </ds-action-menu>
        </ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group>
        <ds-action-menu-item value="delete" variant="danger">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const WithShortcuts: Story = {
  name: 'With shortcuts',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group>
        <ds-action-menu-item value="new" shortcut="⌘N">
          <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
          New
        </ds-action-menu-item>
        <ds-action-menu-item value="edit" shortcut="⌘E">
          <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
          Edit
        </ds-action-menu-item>
        <ds-action-menu-item value="share" shortcut="⌘⇧S">
          <ds-icon slot="leadingIcon" name="share" size="sm"></ds-icon>
          Share
        </ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group>
        <ds-action-menu-item value="delete" variant="danger" shortcut="⌫">
          <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
          Delete
        </ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const WithCheckedItems: Story = {
  name: 'With checked items',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:272px">
      <ds-action-menu-group>
        <ds-action-menu-item value="share">
          <ds-icon slot="leadingIcon" name="share" size="sm"></ds-icon>
          Share with
          <ds-action-menu slot="subMenu" style="width:200px">
            <ds-action-menu-group>
              <ds-action-menu-item value="share-link">Copy link</ds-action-menu-item>
            </ds-action-menu-group>
          </ds-action-menu>
        </ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group>
        <ds-action-menu-item value="cut" shortcut="⌘X">
          <ds-icon slot="leadingIcon" name="content_cut" size="sm"></ds-icon>
          Cut
        </ds-action-menu-item>
        <ds-action-menu-item value="copy" shortcut="⌘C">
          <ds-icon slot="leadingIcon" name="content_copy" size="sm"></ds-icon>
          Copy
        </ds-action-menu-item>
        <ds-action-menu-item value="paste" disabled shortcut="⌘V">
          <ds-icon slot="leadingIcon" name="content_paste" size="sm"></ds-icon>
          Paste
        </ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group selection-type="checkbox">
        <ds-action-menu-item value="bold" is-checked shortcut="⌘B">
          <ds-icon slot="leadingIcon" name="format_bold" size="sm"></ds-icon>
          Bold
        </ds-action-menu-item>
        <ds-action-menu-item value="italic" shortcut="⌘I">
          <ds-icon slot="leadingIcon" name="format_italic" size="sm"></ds-icon>
          Italic
        </ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group selection-type="radio">
        <ds-action-menu-item value="none" is-checked>None</ds-action-menu-item>
        <ds-action-menu-item value="overline">Overline</ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

export const WithoutIcons: Story = {
  name: 'Without icons',
  parameters: { controls: { disable: true } },
  render: () => html`
    <ds-action-menu style="width:240px">
      <ds-action-menu-group selection-type="checkbox">
        <ds-action-menu-item value="bold" is-checked shortcut="⌘B">Bold</ds-action-menu-item>
        <ds-action-menu-item value="italic" shortcut="⌘I">Italic</ds-action-menu-item>
      </ds-action-menu-group>
      <ds-action-menu-group selection-type="radio">
        <ds-action-menu-item value="none" is-checked>None</ds-action-menu-item>
        <ds-action-menu-item value="overline">Overline</ds-action-menu-item>
      </ds-action-menu-group>
    </ds-action-menu>
  `,
};

/* ─── Showcase stories — hidden from sidebar, embedded in Overview MDX ─── */

export const ShowcaseSizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;gap:32px;align-items:flex-start">
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">size="md" (40px)</p>
        <ds-action-menu style="width:220px">
          <ds-action-menu-group>
            <ds-action-menu-item value="new">
              <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
              New
            </ds-action-menu-item>
            <ds-action-menu-item value="edit">
              <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
              Edit
            </ds-action-menu-item>
            <ds-action-menu-item value="delete" variant="danger">
              <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
              Delete
            </ds-action-menu-item>
          </ds-action-menu-group>
        </ds-action-menu>
      </div>
      <div>
        <p style="font-family:var(--ds-typography-cozy-helper-helper-regular-font-family);font-size:var(--ds-typography-cozy-helper-helper-regular-font-size);color:var(--ds-text-text-subtlest);margin:0 0 8px">size="sm" (32px)</p>
        <ds-action-menu size="sm" style="width:220px">
          <ds-action-menu-group>
            <ds-action-menu-item value="new">
              <ds-icon slot="leadingIcon" name="add" size="sm"></ds-icon>
              New
            </ds-action-menu-item>
            <ds-action-menu-item value="edit">
              <ds-icon slot="leadingIcon" name="edit" size="sm"></ds-icon>
              Edit
            </ds-action-menu-item>
            <ds-action-menu-item value="delete" variant="danger">
              <ds-icon slot="leadingIcon" name="delete" size="sm"></ds-icon>
              Delete
            </ds-action-menu-item>
          </ds-action-menu-group>
        </ds-action-menu>
      </div>
    </div>
  `,
};
