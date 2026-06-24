import { LitElement, html, css, nothing, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
  srOnlyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
// Register <ds-button> — used for the month-label and Today controls.
import '../ds-button/ds-button.js';
// Register <ds-icon-button> — used for the nav arrow controls.
import '../ds-icon-button/ds-icon-button.js';
// Register picker item components.
import '../ds-single-select-menu/ds-single-select-menu-item.js';
import '../ds-menu-category/ds-menu-category.js';

export type DsCalendarMarkerColor = 'red' | 'yellow' | 'blue' | 'white';

/** Map of ISO date (`YYYY-MM-DD`) → marker color shown under the day. */
export type DsCalendarMarkers = Record<string, DsCalendarMarkerColor>;

/** Array of ISO dates (`YYYY-MM-DD`) that are individually disabled. */
export type DsCalendarDisabledDates = string[];

const DAYS_IN_WEEK = 7;
const WEEKS_SHOWN = 6;

/* ── Date helpers (timezone-safe, calendar-local) ──────────────────────────── */

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Build an ISO `YYYY-MM-DD` string from calendar parts (month is 1-based). */
function toISO(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function dateToISO(d: Date): string {
  return toISO(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

function daysInMonth(year: number, month: number): number {
  // month is 1-based; day 0 of next month === last day of this month.
  return new Date(year, month, 0).getDate();
}

/** @tagname ds-calendar */
@customElement('ds-calendar')
export class DsCalendar extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    srOnlyStyles,
    css`
      :host {
        display: inline-block;
        vertical-align: top;
      }

      :host([is-disabled]) {
        pointer-events: none;
      }
      :host([is-disabled]) .calendar {
        opacity: 0.4;
      }

      .calendar {
        box-sizing: border-box;
        width: 324px;
        background: var(--ds-elevation-surface-overlay-default);
        border-radius: var(--ds-radius-semantic-radius-md);
        padding: var(--ds-spacing-spacing-05); /* 12px */
        box-shadow:
          inset 0 0 0 1px rgba(189, 189, 189, 0.12),
          0 8px 12px rgba(1, 4, 4, 0.36),
          0 0 1px rgba(1, 4, 4, 0.5);
        color: var(--ds-text-text-default);
      }

      /* ── Header (month / year navigation) ──────────────────────────────── */
      .header {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-04); /* 8px */
        width: 300px;
        padding-inline: var(--ds-spacing-spacing-04); /* 8px */
        padding-bottom: var(--ds-spacing-spacing-05);
      }

      .label-wrap {
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
      }

      .check-icon {
        width: var(--ds-spacing-spacing-06); /* 16px */
        height: var(--ds-spacing-spacing-06);
        display: block;
      }

      .label-btn {
        flex: 0 0 auto;
      }

      /* Focus rings — scoped selectors beat all: unset (higher specificity). */
      .picker-item:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 2px;
      }
      .day:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: -2px;
      }
      .day:focus:not(:focus-visible),
      .picker-item:focus:not(:focus-visible) {
        outline: none;
      }

      /* ── Weekday header row ─────────────────────────────────────────────── */
      .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        width: 300px;
        margin-bottom: var(--ds-spacing-spacing-01); /* 2px gap to day grid */
      }
      .weekday {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--ds-spacing-spacing-04) 0;
        color: var(--ds-text-text-subtle);
      }

      /* ── Day grid ───────────────────────────────────────────────────────── */
      .grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        width: 300px;
        row-gap: var(--ds-spacing-spacing-01); /* 2px vertical gap */
      }
      .day {
        all: unset;
        box-sizing: border-box;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: var(--ds-type-scale-y7); /* 40px */
        border-radius: var(--ds-radius-semantic-radius-sm);
        background: var(--ds-background-neutral-subtle-default);
        color: var(--ds-text-text-default);
        cursor: pointer;
        transition: background-color 120ms ease;
      }
      .day:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }
      .day:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }
      /* Days outside the displayed month. */
      .day.is-outside {
        color: var(--ds-text-text-disabled);
      }
      /* Today — blue ring, transparent fill (matches main component). */
      .day.is-today {
        box-shadow: inset 0 0 0 2px var(--ds-border-border-selected);
      }
      /* Selected — filled navy, no stroke. Blue stroke is today only. */
      .day.is-selected {
        background: var(--ds-background-selected-bold-default);
        color: var(--ds-text-text-default);
      }
      .day.is-selected:hover {
        background: var(--ds-background-selected-bold-hovered);
      }
      .day.is-selected:active {
        background: var(--ds-background-selected-bold-pressed);
      }
      /* Disabled / out of range. */
      .day:disabled,
      .day.is-day-disabled {
        color: var(--ds-text-text-disabled);
        cursor: not-allowed;
        background: var(--ds-background-neutral-subtle-default);
        box-shadow: none;
      }

      /* Event marker under the number. */
      .marker {
        position: absolute;
        bottom: 3px;
        left: 50%;
        transform: translateX(-50%);
        width: var(--ds-spacing-spacing-06); /* 16px */
        height: 2px;
        border-radius: var(--ds-radius-semantic-radius-pill);
      }
      .marker.red {
        background: var(--ds-background-danger-default);
      }
      .marker.yellow {
        background: var(--ds-background-warning-default);
      }
      .marker.blue {
        background: var(--ds-background-brand-default);
      }
      .marker.white {
        background: var(--ds-color-default-neutral-white);
      }

      /* ── Today footer (wraps a ghost <ds-button>) ───────────────────────── */
      .footer {
        display: flex;
        justify-content: center;
        padding-top: var(--ds-spacing-spacing-04);
      }

      /* ── Year / Month picker ────────────────────────────────────────────── */
      .picker {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding-top: var(--ds-spacing-spacing-04);
        overflow: hidden;
      }
      .picker-col {
        display: flex;
        flex-direction: column;
        min-width: 0;
        overflow: hidden;
      }
      .picker-col + .picker-col {
        border-left: 1px solid var(--ds-border-border-default);
      }
      .picker-list {
        display: flex;
        flex-direction: column;
        max-height: 280px;
        overflow-y: auto;
        scrollbar-width: thin;
        padding: var(--ds-spacing-spacing-02) 0;
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-btn,
        .day,
        .picker-item {
          transition: none;
        }
      }
    `,
  ];

  // ── Public API ─────────────────────────────────────────────────────────────

  /** Displayed/focused year. Defaults to the current year. */
  @property({ type: Number, reflect: true })
  year = new Date().getFullYear();

  /** Displayed month, 1-based (1 = January). Defaults to the current month. */
  @property({ type: Number, reflect: true })
  month = new Date().getMonth() + 1;

  /** Focused day of the month (used for keyboard navigation). */
  @property({ type: Number, reflect: true })
  day = new Date().getDate();

  /** Selected date as an ISO string `YYYY-MM-DD`. Empty when nothing is selected. */
  @property({ type: String, reflect: true })
  value = '';

  /** Earliest selectable date (`YYYY-MM-DD`). */
  @property({ type: String })
  min = '';

  /** Latest selectable date (`YYYY-MM-DD`). Defaults to today. */
  @property({ type: String })
  max = dateToISO(new Date());

  /** Explicit list of disabled dates (`YYYY-MM-DD`). */
  @property({ attribute: false })
  disabledDates: string[] = [];

  /** Predicate that returns true for any date (`YYYY-MM-DD`) that should be disabled. */
  @property({ attribute: false })
  disabledDateFilter?: (iso: string) => boolean;

  /** Map of ISO date → marker color, drawn under the day number. */
  @property({ attribute: false })
  markers: DsCalendarMarkers = {};

  /** First day of the week: 0 = Sunday … 6 = Saturday. */
  @property({ type: Number, reflect: true, attribute: 'week-start-day' })
  weekStartDay = 0;

  /** BCP-47 locale used to format weekday/month names. */
  @property({ type: String, reflect: true })
  locale = 'en-US';

  /** ISO date treated as "today". Defaults to the real current date. */
  @property({ type: String })
  today = '';

  /** Disable the whole calendar. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** Show the "Today" shortcut button in the footer. */
  @property({ type: Boolean, reflect: true, attribute: 'show-today-button' })
  showTodayButton = true;

  // ── A11y labels ──────────────────────────────────────────────────────────
  @property({ type: String, attribute: 'previous-month-label' })
  previousMonthLabel = 'Previous month';
  @property({ type: String, attribute: 'next-month-label' })
  nextMonthLabel = 'Next month';
  @property({ type: String, attribute: 'previous-year-label' })
  previousYearLabel = 'Previous year';
  @property({ type: String, attribute: 'next-year-label' })
  nextYearLabel = 'Next year';
  @property({ type: String, attribute: 'today-label' })
  todayLabel = 'Today';

  // ── Internal state ─────────────────────────────────────────────────────────
  @state() private _pickerOpen = false;
  @state() private _pickerYearMin = 0;
  @state() private _pickerYearMax = 0;
  // null = no month highlighted yet after a year change
  @state() private _pickerPendingMonth: number | null = null;
  private _pendingFocus = false;
  private _pendingPickerScroll = false;
  private _suppressYearScroll = false;
  private _extendingYears = false;

  // ── Derived helpers ──────────────────────────────────────────────────────

  private _todayDate(): Date {
    if (this.today) {
      const [y, m, d] = this.today.split('-').map(Number);
      if (y && m && d) return new Date(y, m - 1, d);
    }
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  private _isOutOfRange(iso: string): boolean {
    if (this.min && iso < this.min) return true;
    if (this.max && iso > this.max) return true;
    return false;
  }

  private _isDisabledDate(iso: string): boolean {
    if (this._isOutOfRange(iso)) return true;
    if (this.disabledDates.includes(iso)) return true;
    if (this.disabledDateFilter?.(iso)) return true;
    return false;
  }

  /** Localized weekday short names, ordered by `weekStartDay`. */
  private _weekdayLabels(): string[] {
    const fmt = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });
    // 2023-01-01 is a Sunday — a stable anchor for weekday index 0.
    const names: string[] = [];
    for (let i = 0; i < 7; i++) {
      names.push(fmt.format(new Date(2023, 0, 1 + i)));
    }
    const ordered: string[] = [];
    for (let i = 0; i < 7; i++) {
      ordered.push(names[(this.weekStartDay + i) % 7]);
    }
    return ordered;
  }

  private _monthLabel(): string {
    return new Intl.DateTimeFormat(this.locale, {
      month: 'long',
      year: 'numeric',
    }).format(new Date(this.year, this.month - 1, 1));
  }

  private _monthNames(): string[] {
    const fmt = new Intl.DateTimeFormat(this.locale, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2023, i, 1)));
  }

  /** The 42 cells (6 weeks × 7 days) covering the displayed month. */
  private _gridDates(): Date[] {
    const firstWeekday = new Date(this.year, this.month - 1, 1).getDay();
    const offset = (firstWeekday - this.weekStartDay + 7) % 7;
    const start = new Date(this.year, this.month - 1, 1 - offset);
    const cells: Date[] = [];
    for (let i = 0; i < DAYS_IN_WEEK * WEEKS_SHOWN; i++) {
      cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
    }
    return cells;
  }

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  protected willUpdate(changed: PropertyValues): void {
    // Clamp the focused day to the displayed month so navigation never lands
    // on an impossible date (e.g. Jan 31 → Feb).
    if (changed.has('month') || changed.has('year')) {
      const max = daysInMonth(this.year, this.month);
      if (this.day > max) this.day = max;
      if (this.day < 1) this.day = 1;
    }
  }

  protected updated(): void {
    if (this._pendingFocus) {
      this._pendingFocus = false;
      const focused = this.renderRoot.querySelector<HTMLElement>('.day[tabindex="0"]');
      focused?.focus();
    }
    if (this._extendingYears) {
      this._extendingYears = false;
    }
    // When picker first opens, center both selected year and selected month.
    if (this._pendingPickerScroll) {
      this._pendingPickerScroll = false;
      this._suppressYearScroll = true;
      requestAnimationFrame(() => {
        this._alignPickerLists();
        // Release the suppression after the scroll events from centering settle.
        requestAnimationFrame(() => { this._suppressYearScroll = false; });
      });
    }
  }

  private _alignPickerLists(): void {
    const yearList = this.renderRoot.querySelector<HTMLElement>('.picker-year-list');
    const yearItem = this.renderRoot.querySelector<HTMLElement>('.picker-year-list ds-single-select-menu-item[selected]');
    const monthList = this.renderRoot.querySelector<HTMLElement>('.picker-month-list');
    const monthItem = this.renderRoot.querySelector<HTMLElement>('.picker-month-list ds-single-select-menu-item[selected]');

    if (!yearList || !monthList) return;

    if (monthItem) {
      // Set month scroll first — it may be constrained (e.g. January can't center).
      const idealMonth = monthItem.offsetTop - monthList.clientHeight / 2 + monthItem.offsetHeight / 2;
      monthList.scrollTop = Math.max(0, Math.min(idealMonth, monthList.scrollHeight - monthList.clientHeight));
    }

    if (yearItem) {
      if (monthItem) {
        // Find the actual visual center of the month item after its clamped scroll,
        // then scroll the year list so the year item lands at that same visual position.
        const monthItemVisualCenter = monthItem.offsetTop + monthItem.offsetHeight / 2 - monthList.scrollTop;
        const yearScroll = yearItem.offsetTop + yearItem.offsetHeight / 2 - monthItemVisualCenter;
        yearList.scrollTop = Math.max(0, Math.min(yearScroll, yearList.scrollHeight - yearList.clientHeight));
      } else {
        // No month selected — just center the year.
        const idealYear = yearItem.offsetTop - yearList.clientHeight / 2 + yearItem.offsetHeight / 2;
        yearList.scrollTop = Math.max(0, Math.min(idealYear, yearList.scrollHeight - yearList.clientHeight));
      }
    }
  }

  // ── Navigation ───────────────────────────────────────────────────────────

  private _shiftMonth(delta: number, focusAfter = false): void {
    const d = new Date(this.year, this.month - 1 + delta, 1);
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    if (focusAfter) this._pendingFocus = true;
    this._dispatchNavigate();
  }

  private _shiftYear(delta: number, focusAfter = false): void {
    this.year += delta;
    if (focusAfter) this._pendingFocus = true;
    this._dispatchNavigate();
  }

  private _goToToday(): void {
    const t = this._todayDate();
    this.year = t.getFullYear();
    this.month = t.getMonth() + 1;
    this.day = t.getDate();
    this._pendingFocus = true;
    this._dispatchNavigate();
  }

  private _setFocusedDate(d: Date): void {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    const monthChanged = y !== this.year || m !== this.month;
    this.year = y;
    this.month = m;
    this.day = day;
    this._pendingFocus = true;
    if (monthChanged) this._dispatchNavigate();
    else this.requestUpdate();
  }

  private _dispatchNavigate(): void {
    dispatch(this, 'ds-navigate', {
      day: this.day,
      month: this.month,
      year: this.year,
      iso: toISO(this.year, this.month, this.day),
    });
  }

  // ── Selection ──────────────────────────────────────────────────────────────

  private _selectDate(d: Date, originalEvent?: Event): void {
    const iso = dateToISO(d);
    if (this._isDisabledDate(iso) || this.isDisabled) return;
    this.value = iso;
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    this.day = d.getDate();
    dispatch(this, 'ds-select', {
      value: iso,
      day: this.day,
      month: this.month,
      year: this.year,
      date: new Date(d),
      ...(originalEvent ? { originalEvent } : {}),
    });
  }

  // ── Keyboard navigation (roving focus over the grid) ───────────────────────

  private _onGridKeydown = (e: KeyboardEvent): void => {
    const focused = new Date(this.year, this.month - 1, this.day);
    let handled = true;
    switch (e.key) {
      case 'ArrowLeft':
        focused.setDate(focused.getDate() - 1);
        this._setFocusedDate(focused);
        break;
      case 'ArrowRight':
        focused.setDate(focused.getDate() + 1);
        this._setFocusedDate(focused);
        break;
      case 'ArrowUp':
        focused.setDate(focused.getDate() - DAYS_IN_WEEK);
        this._setFocusedDate(focused);
        break;
      case 'ArrowDown':
        focused.setDate(focused.getDate() + DAYS_IN_WEEK);
        this._setFocusedDate(focused);
        break;
      case 'Home':
        focused.setDate(focused.getDate() - ((focused.getDay() - this.weekStartDay + 7) % 7));
        this._setFocusedDate(focused);
        break;
      case 'End':
        focused.setDate(focused.getDate() + (6 - ((focused.getDay() - this.weekStartDay + 7) % 7)));
        this._setFocusedDate(focused);
        break;
      case 'PageUp':
        this._shiftMonth(e.shiftKey ? -12 : -1, true);
        break;
      case 'PageDown':
        this._shiftMonth(e.shiftKey ? 12 : 1, true);
        break;
      case 'Enter':
      case ' ':
        this._selectDate(focused, e);
        break;
      default:
        handled = false;
    }
    if (handled) e.preventDefault();
  };

  // ── Renderers ──────────────────────────────────────────────────────────────

  private _renderHeader() {
    const label = this._monthLabel();
    return html`
      <div class="header">
        <ds-icon-button
          variant="ghost"
          size="sm"
          aria-label=${this.previousYearLabel}
          ?is-disabled=${this._pickerOpen}
          @ds-click=${() => this._shiftYear(-1)}
        >${chevronsLeft}</ds-icon-button>
        <ds-icon-button
          variant="ghost"
          size="sm"
          aria-label=${this.previousMonthLabel}
          ?is-disabled=${this._pickerOpen}
          @ds-click=${() => this._shiftMonth(-1)}
        >${chevronLeft}</ds-icon-button>
        <div class="label-wrap">
          <ds-button
            class="label-btn"
            variant="ghost"
            size="sm"
            ?is-selected=${this._pickerOpen}
            @ds-click=${this._onLabelClick}
          >
            ${label}
          </ds-button>
        </div>
        <ds-icon-button
          variant="ghost"
          size="sm"
          aria-label=${this.nextMonthLabel}
          ?is-disabled=${this._pickerOpen}
          @ds-click=${() => this._shiftMonth(1)}
        >${chevronRight}</ds-icon-button>
        <ds-icon-button
          variant="ghost"
          size="sm"
          aria-label=${this.nextYearLabel}
          ?is-disabled=${this._pickerOpen}
          @ds-click=${() => this._shiftYear(1)}
        >${chevronsRight}</ds-icon-button>
      </div>
    `;
  }

  private _renderGrid() {
    const labels = this._weekdayLabels();
    const todayIso = dateToISO(this._todayDate());
    const cells = this._gridDates();
    const focusedIso = toISO(this.year, this.month, this.day);

    return html`
      <div class="weekdays" role="row">
        ${labels.map(
          (name) => html`<span class="weekday text-heading-xxs" role="columnheader">${name}</span>`,
        )}
      </div>
      <div
        class="grid"
        role="grid"
        aria-label=${this._monthLabel()}
        @keydown=${this._onGridKeydown}
      >
        ${cells.map((d) => {
          const iso = dateToISO(d);
          const inMonth = d.getMonth() + 1 === this.month && d.getFullYear() === this.year;
          const isToday = iso === todayIso;
          const isSelected = iso === this.value;
          const isDisabledDay = this._isDisabledDate(iso);
          const isFocusTarget = iso === focusedIso;
          const marker = this.markers[iso];
          const classes = {
            day: true,
            'text-regular-body-md': true,
            'is-outside': !inMonth,
            'is-today': isToday,
            'is-selected': isSelected,
            'is-day-disabled': isDisabledDay,
          };
          return html`
            <button
              class=${classMap(classes)}
              type="button"
              role="gridcell"
              tabindex=${isFocusTarget ? 0 : -1}
              ?disabled=${isDisabledDay}
              aria-current=${isToday ? 'date' : nothing}
              aria-selected=${isSelected ? 'true' : 'false'}
              aria-label=${new Intl.DateTimeFormat(this.locale, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(d)}
              @click=${(e: MouseEvent) => this._selectDate(d, e)}
            >
              ${d.getDate()}
              ${marker
                ? html`<span class="marker ${marker}" aria-hidden="true"></span>`
                : nothing}
            </button>
          `;
        })}
      </div>
      ${this.showTodayButton
        ? html`<div class="footer">
            <ds-button variant="ghost" size="sm" @ds-click=${this._onTodayClick}>
              ${this.todayLabel}
            </ds-button>
          </div>`
        : nothing}
    `;
  }

  private _renderPicker() {
    // Years in ascending order (oldest at top). The list grows dynamically as
    // the user scrolls — _onYearListScroll extends _pickerYearMin / _pickerYearMax.
    const years: number[] = [];
    for (let y = this._pickerYearMin; y <= this._pickerYearMax; y++) {
      years.push(y);
    }
    const months = this._monthNames();

    return html`
      <div class="picker">
        <div class="picker-col">
          <ds-menu-category>Year</ds-menu-category>
          <div
            class="picker-list picker-year-list"
            role="listbox"
            aria-label="Year"
            @scroll=${this._onYearListScroll}
          >
            ${years.map((y) => {
              const selected = y === this.year;
              return html`<ds-single-select-menu-item
                value=${String(y)}
                ?selected=${selected}
                @ds-menu-select=${(e: Event) => { e.stopPropagation(); this._selectPickerYear(y); }}
              >${y}</ds-single-select-menu-item>`;
            })}
          </div>
        </div>
        <div class="picker-col">
          <ds-menu-category>Month</ds-menu-category>
          <div class="picker-list picker-month-list" role="listbox" aria-label="Month">
            ${months.map((name, i) => {
              const selected = this._pickerPendingMonth === i + 1;
              return html`<ds-single-select-menu-item
                value=${String(i + 1)}
                ?selected=${selected}
                @ds-menu-select=${(e: Event) => { e.stopPropagation(); this._selectPickerMonth(i + 1); }}
              >${name}</ds-single-select-menu-item>`;
            })}
          </div>
        </div>
      </div>
    `;
  }

  // ── ds-button click handlers ───────────────────────────────────────────────
  // The inner <ds-button> dispatches a composed `ds-click`; stop it at the
  // boundary so it doesn't leak past <ds-calendar> to consumers.

  private _onLabelClick = (e: Event): void => {
    e.stopPropagation();
    this._togglePicker();
  };

  private _onTodayClick = (e: Event): void => {
    e.stopPropagation();
    this._goToToday();
  };

  // ── Picker handlers ──────────────────────────────────────────────────────

  private _togglePicker = (): void => {
    this._pickerOpen = !this._pickerOpen;
    if (this._pickerOpen) {
      this._pickerYearMin = this.year - 10;
      this._pickerYearMax = this.year + 10;
      this._pickerPendingMonth = this.month;
      this._pendingPickerScroll = true;
    }
  };

  private _onYearListScroll = (e: Event): void => {
    if (this._extendingYears || this._suppressYearScroll) return;
    const el = e.target as HTMLElement;
    if (el.scrollTop < 100) {
      // Near the top — prepend older years; preserve scroll position after re-render.
      this._extendingYears = true;
      const prevScrollTop = el.scrollTop;
      const prevScrollHeight = el.scrollHeight;
      this._pickerYearMin -= 20;
      // After Lit re-renders the new items, compensate for the added height above.
      this.updateComplete.then(() => {
        el.scrollTop = prevScrollTop + (el.scrollHeight - prevScrollHeight);
        this._extendingYears = false;
      });
    } else if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      // Near the bottom — append newer years; no scroll compensation needed.
      this._extendingYears = true;
      this._pickerYearMax += 20;
    }
  };

  private _selectPickerYear(y: number): void {
    this.year = y;
    this._pickerPendingMonth = null;
    this._dispatchNavigate();
  }

  private _selectPickerMonth(m: number): void {
    this.month = m;
    this._pickerPendingMonth = m;
    this._pickerOpen = false;
    this._dispatchNavigate();
  }

  render() {
    return html`
      <div class="calendar" part="calendar">
        ${this._renderHeader()}
        ${this._pickerOpen ? this._renderPicker() : this._renderGrid()}
      </div>
    `;
  }
}

/* ── Inline icons (16×16, stroke = currentColor) ───────────────────────────── */

const chevronLeft = html`<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4 6 8l4 4" /></svg>`;
const chevronRight = html`<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4" /></svg>`;
const chevronsLeft = html`<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4 4 8l4 4M13 4 9 8l4 4" /></svg>`;
const chevronsRight = html`<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4l4 4-4 4M8 4l4 4-4 4" /></svg>`;

declare global {
  interface HTMLElementTagNameMap {
    'ds-calendar': DsCalendar;
  }
}
