import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './ds-calendar.js';

interface CalendarArgs {
  year: number;
  month: number;
  day: number;
  value: string;
  min?: string;
  max?: string;
  disabledDates: string[];
  weekStartDay: number;
  locale: string;
  today?: string;
  isDisabled: boolean;
  showTodayButton: boolean;
}

const _now = new Date();
const _today = `${_now.getFullYear()}-${String(_now.getMonth() + 1).padStart(2, '0')}-${String(_now.getDate()).padStart(2, '0')}`;
const _year = _now.getFullYear();
const _month = _now.getMonth() + 1;
const _day = _now.getDate();

const meta: Meta<CalendarArgs> = {
  title: 'Components/Calendar',
  component: 'ds-calendar',
  argTypes: {
    year: {
      control: 'number',
      description: 'Displayed / focused year.',
      table: { type: { summary: 'number' }, category: 'Props' },
    },
    month: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Displayed month, 1-based (1 = January).',
      table: { type: { summary: 'number' }, category: 'Props' },
    },
    day: {
      control: { type: 'number', min: 1, max: 31 },
      description: 'Focused day of the month (keyboard roving focus target).',
      table: { type: { summary: 'number' }, category: 'Props' },
    },
    value: {
      control: 'text',
      description: 'Selected date as an ISO string (YYYY-MM-DD).',
      table: { type: { summary: 'string' }, defaultValue: { summary: "''" }, category: 'Props' },
    },
    min: {
      control: 'text',
      description: 'Earliest selectable date (YYYY-MM-DD).',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    max: {
      control: 'text',
      description: 'Latest selectable date (YYYY-MM-DD).',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    disabledDates: {
      control: 'object',
      description: 'Array of ISO dates (YYYY-MM-DD) that are individually disabled. Comma-separated in the controls panel.',
      table: { type: { summary: 'string[]' }, defaultValue: { summary: '[]' }, category: 'Props' },
    },
    weekStartDay: {
      control: { type: 'inline-radio' },
      options: [0, 1, 6],
      description: 'First day of the week: 0 = Sunday, 1 = Monday, 6 = Saturday.',
      table: { type: { summary: '0–6' }, defaultValue: { summary: '0' }, category: 'Props' },
    },
    locale: {
      control: 'text',
      description: 'BCP-47 locale used to format weekday and month names.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'en-US' }, category: 'Props' },
    },
    today: {
      control: 'text',
      description: 'ISO date treated as "today". Defaults to the real current date.',
      table: { type: { summary: 'string' }, category: 'Props' },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the whole calendar.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' }, category: 'Props' },
    },
    showTodayButton: {
      control: 'boolean',
      description: 'Show the "Today" shortcut button in the footer.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' }, category: 'Props' },
    },
  },
  args: {
    year: _year,
    month: _month,
    day: _day,
    value: _today,
    max: _today,
    weekStartDay: 0,
    locale: 'en-US',
    today: _today,
    disabledDates: [],
    isDisabled: false,
    showTodayButton: true,
  },
  parameters: {
    options: { showPanel: true },
  },
  render: (args) => html`
    <ds-calendar
      year=${args.year}
      month=${args.month}
      day=${args.day}
      value=${ifDefined(args.value || undefined)}
      min=${ifDefined(args.min || undefined)}
      max=${ifDefined(args.max || undefined)}
      .disabledDates=${args.disabledDates}
      week-start-day=${args.weekStartDay}
      locale=${args.locale}
      today=${ifDefined(args.today || undefined)}
      ?is-disabled=${args.isDisabled}
      ?show-today-button=${args.showTodayButton}
      @ds-select=${(e: CustomEvent) => console.log('ds-select', e.detail)}
      @ds-navigate=${(e: CustomEvent) => console.log('ds-navigate', e.detail)}
    ></ds-calendar>
  `,
};

export default meta;
type Story = StoryObj<CalendarArgs>;

export const Default: Story = {};

export const MondayStart: Story = {
  name: 'Week starts Monday',
  args: { weekStartDay: 1 },
};

export const WithoutTodayButton: Story = {
  args: { showTodayButton: false },
};

export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Localized: Story = {
  name: 'Localized (fr-FR)',
  args: { locale: 'fr-FR', weekStartDay: 1 },
};

export const WithDisabledDates: Story = {
  name: 'Specific disabled dates',
  args: {
    disabledDates: [
      `${_year}-${String(_month).padStart(2, '0')}-03`,
      `${_year}-${String(_month).padStart(2, '0')}-07`,
      `${_year}-${String(_month).padStart(2, '0')}-14`,
      `${_year}-${String(_month).padStart(2, '0')}-21`,
    ],
  },
};

export const WithMinMax: Story = {
  name: 'Min / max range',
  args: { min: '2026-05-10', max: '2026-05-24', value: '2026-05-15', day: 15 },
};

/* ─── Showcase stories — embedded in the Overview MDX ─────────────────────── */

export const ShowcaseMarkers: Story = {
  name: 'Showcase / Markers',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => {
    const cal = document.createElement('ds-calendar');
    cal.setAttribute('year', String(_year));
    cal.setAttribute('month', String(_month));
    cal.setAttribute('value', _today);
    cal.setAttribute('today', _today);
    (cal as unknown as { markers: Record<string, string> }).markers = {
      '2026-05-06': 'red',
      '2026-05-14': 'yellow',
      '2026-05-20': 'blue',
      '2026-05-28': 'white',
    };
    return cal;
  },
};

export const ShowcaseDisabledDates: Story = {
  name: 'Showcase / Disabled dates',
  tags: ['!dev'],
  parameters: { controls: { disable: true } },
  render: () => {
    const cal = document.createElement('ds-calendar');
    cal.setAttribute('year', String(_year));
    cal.setAttribute('month', String(_month));
    cal.setAttribute('today', _today);
    // Disable every weekend in the displayed month.
    (cal as unknown as { disabledDateFilter: (iso: string) => boolean }).disabledDateFilter = (
      iso: string,
    ) => {
      const d = new Date(iso);
      const wd = d.getUTCDay();
      return wd === 0 || wd === 6;
    };
    return cal;
  },
};
