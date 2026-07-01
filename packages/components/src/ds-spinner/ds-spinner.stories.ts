import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-spinner.js';
import type { DsSpinnerSize, DsSpinnerAppearance } from './ds-spinner.js';

interface SpinnerArgs {
  size: DsSpinnerSize;
  appearance: DsSpinnerAppearance;
  label: string;
}

const SIZES: DsSpinnerSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const APPEARANCES: DsSpinnerAppearance[] = ['inherit', 'inverted'];

const meta: Meta<SpinnerArgs> = {
  title: 'Components/Spinner',
  component: 'ds-spinner',
  argTypes: {
    size: {
      control: 'inline-radio',
      options: SIZES,
      description: 'Diameter of the spinner: xs=12px, sm=16px, md=24px, lg=48px, xl=96px.',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl'` },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    appearance: {
      control: 'inline-radio',
      options: APPEARANCES,
      description: 'Color style: inherit uses currentColor for the arc; inverted uses white.',
      table: {
        type: { summary: `'inherit' | 'inverted'` },
        defaultValue: { summary: 'inherit' },
        category: 'Props',
      },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers (aria-label on the SVG).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' },
        category: 'Props',
      },
    },
  },
  args: {
    size: 'md',
    appearance: 'inherit',
    label: 'Loading',
  },
  render: ({ size, appearance, label }) => html`
    <ds-spinner
      size=${ifDefined(size)}
      appearance=${ifDefined(appearance)}
      label=${ifDefined(label)}
    ></ds-spinner>
  `,
};

export default meta;
type Story = StoryObj<SpinnerArgs>;

export const Default: Story = {};

export const Inherit: Story = {
  args: { appearance: 'inherit' },
};

export const Inverted: Story = {
  args: { appearance: 'inverted' },
  decorators: [
    (story) => html`<div style="background:var(--ds-background-brand-default);padding:16px;border-radius:8px;display:inline-flex;">${story()}</div>`,
  ],
};

export const SizeXs: Story = {
  args: { size: 'xs' },
};

export const SizeSm: Story = {
  args: { size: 'sm' },
};

export const SizeMd: Story = {
  args: { size: 'md' },
};

export const SizeLg: Story = {
  args: { size: 'lg' },
};

export const SizeXl: Story = {
  args: { size: 'xl' },
};

export const ShowcaseAppearances: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;align-items:center;gap:24px;padding:16px;">
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
        <ds-spinner appearance="inherit"></ds-spinner>
        <span style="font-size:12px;color:var(--ds-text-text-subtle);">inherit</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:8px;background:var(--ds-background-brand-default);padding:12px;border-radius:8px;">
        <ds-spinner appearance="inverted"></ds-spinner>
        <span style="font-size:12px;color:var(--ds-color-default-neutral-white);">inverted</span>
      </div>
    </div>
  `,
};

export const ShowcaseSizes: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:flex;align-items:center;gap:24px;padding:16px;">
      ${SIZES.map(
        (size) => html`
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <ds-spinner size=${size}></ds-spinner>
            <span style="font-size:12px;color:var(--ds-text-text-subtle);">${size}</span>
          </div>
        `,
      )}
    </div>
  `,
};

export const ShowcaseMatrix: Story = {
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(${SIZES.length},auto);gap:24px;padding:16px;align-items:center;justify-items:center;">
      ${APPEARANCES.flatMap((appearance) =>
        SIZES.map(
          (size) => html`
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;${appearance === 'inverted' ? 'background:var(--ds-background-brand-default);padding:12px;border-radius:8px;' : 'padding:12px;'}">
              <ds-spinner appearance=${appearance} size=${size}></ds-spinner>
              <span style="font-size:10px;color:var(--ds-text-text-subtlest);${appearance === 'inverted' ? 'color:var(--ds-color-default-neutral-white);' : ''}">${appearance}/${size}</span>
            </div>
          `,
        ),
      )}
    </div>
  `,
};
