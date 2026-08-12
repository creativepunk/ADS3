import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './ds-tabs.js';

interface TabsArgs {
  value: string;
  isDisabled: boolean;
}

const meta: Meta<TabsArgs> = {
  title: 'Components/Tabs',
  component: 'ds-tabs',
  argTypes: {
    value: {
      control: 'text',
      description: 'The value of the currently selected tab.',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' }, category: 'Props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables all tabs in the group.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
  },
  args: {
    value: 'overview',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<TabsArgs>;

const render = ({ value, isDisabled }: TabsArgs) => html`
  <ds-tabs value=${value} ?is-disabled=${isDisabled}>
    <ds-tab value="overview" .isSelected=${value === 'overview'}>Overview</ds-tab>
    <ds-tab value="details" .isSelected=${value === 'details'}>Details</ds-tab>
    <ds-tab value="history" .isSelected=${value === 'history'}>History</ds-tab>
    <ds-tab value="settings" .isSelected=${value === 'settings'}>Settings</ds-tab>
  </ds-tabs>
`;

export const Default: Story = { render };

export const WithCount: Story = {
  render: () => html`
    <ds-tabs value="inbox">
      <ds-tab value="inbox" is-selected .count=${17}>Inbox</ds-tab>
      <ds-tab value="sent">Sent</ds-tab>
      <ds-tab value="drafts" .count=${3}>Drafts</ds-tab>
      <ds-tab value="archive">Archive</ds-tab>
    </ds-tabs>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <ds-tabs value="overview" is-disabled>
      <ds-tab value="overview" is-selected>Overview</ds-tab>
      <ds-tab value="details">Details</ds-tab>
      <ds-tab value="history">History</ds-tab>
    </ds-tabs>
  `,
};

export const SingleTabDisabled: Story = {
  render: () => html`
    <ds-tabs value="overview">
      <ds-tab value="overview" is-selected>Overview</ds-tab>
      <ds-tab value="details">Details</ds-tab>
      <ds-tab value="history" is-disabled>History</ds-tab>
      <ds-tab value="settings">Settings</ds-tab>
    </ds-tabs>
  `,
};

export const ShowcaseStates: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div>
        <p style="font-size:12px;color:#9a9a9a;margin:0 0 8px">Default</p>
        <ds-tabs value="overview">
          <ds-tab value="overview" is-selected>Overview</ds-tab>
          <ds-tab value="details">Details</ds-tab>
          <ds-tab value="history">History</ds-tab>
        </ds-tabs>
      </div>
      <div>
        <p style="font-size:12px;color:#9a9a9a;margin:0 0 8px">With count badge</p>
        <ds-tabs value="inbox">
          <ds-tab value="inbox" is-selected .count=${17}>Inbox</ds-tab>
          <ds-tab value="sent">Sent</ds-tab>
          <ds-tab value="drafts" .count=${3}>Drafts</ds-tab>
        </ds-tabs>
      </div>
      <div>
        <p style="font-size:12px;color:#9a9a9a;margin:0 0 8px">All disabled</p>
        <ds-tabs value="overview" is-disabled>
          <ds-tab value="overview" is-selected>Overview</ds-tab>
          <ds-tab value="details">Details</ds-tab>
          <ds-tab value="history">History</ds-tab>
        </ds-tabs>
      </div>
      <div>
        <p style="font-size:12px;color:#9a9a9a;margin:0 0 8px">Single tab disabled</p>
        <ds-tabs value="overview">
          <ds-tab value="overview" is-selected>Overview</ds-tab>
          <ds-tab value="details">Details</ds-tab>
          <ds-tab value="history" is-disabled>History</ds-tab>
        </ds-tabs>
      </div>
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div>
        <p style="font-size:12px;color:#9a9a9a;margin:0 0 8px">Without count</p>
        <ds-tabs value="tab1">
          <ds-tab value="tab1" is-selected>Tab</ds-tab>
          <ds-tab value="tab2">Tab</ds-tab>
          <ds-tab value="tab3">Tab</ds-tab>
          <ds-tab value="tab4">Tab</ds-tab>
          <ds-tab value="tab5">Tab</ds-tab>
          <ds-tab value="tab6">Tab</ds-tab>
          <ds-tab value="tab7">Tab</ds-tab>
          <ds-tab value="tab8">Tab</ds-tab>
        </ds-tabs>
      </div>
      <div>
        <p style="font-size:12px;color:#9a9a9a;margin:0 0 8px">With count</p>
        <ds-tabs value="tab1">
          <ds-tab value="tab1" is-selected .count=${17}>Tab</ds-tab>
          <ds-tab value="tab2" .count=${5}>Tab</ds-tab>
          <ds-tab value="tab3">Tab</ds-tab>
          <ds-tab value="tab4">Tab</ds-tab>
        </ds-tabs>
      </div>
    </div>
  `,
};
