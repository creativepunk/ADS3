var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { resetStyles, typographyBaseStyles, srOnlyStyles, } from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
// Register <ds-button> — used for the month-label and Today controls.
import '../ds-button/ds-button.js';
const DAYS_IN_WEEK = 7;
const WEEKS_SHOWN = 6;
/* ── Date helpers (timezone-safe, calendar-local) ──────────────────────────── */
function pad2(n) {
    return n < 10 ? `0${n}` : `${n}`;
}
/** Build an ISO `YYYY-MM-DD` string from calendar parts (month is 1-based). */
function toISO(year, month, day) {
    return `${year}-${pad2(month)}-${pad2(day)}`;
}
function dateToISO(d) {
    return toISO(d.getFullYear(), d.getMonth() + 1, d.getDate());
}
function daysInMonth(year, month) {
    // month is 1-based; day 0 of next month === last day of this month.
    return new Date(year, month, 0).getDate();
}
let DsCalendar = class DsCalendar extends LitElement {
    constructor() {
        super(...arguments);
        // ── Public API ─────────────────────────────────────────────────────────────
        /** Displayed/focused year. Defaults to the current year. */
        this.year = new Date().getFullYear();
        /** Displayed month, 1-based (1 = January). Defaults to the current month. */
        this.month = new Date().getMonth() + 1;
        /** Focused day of the month (used for keyboard navigation). */
        this.day = new Date().getDate();
        /** Selected date as an ISO string `YYYY-MM-DD`. Empty when nothing is selected. */
        this.value = '';
        /** Earliest selectable date (`YYYY-MM-DD`). */
        this.min = '';
        /** Latest selectable date (`YYYY-MM-DD`). Defaults to today. */
        this.max = dateToISO(new Date());
        /** Explicit list of disabled dates (`YYYY-MM-DD`). */
        this.disabledDates = [];
        /** Map of ISO date → marker color, drawn under the day number. */
        this.markers = {};
        /** First day of the week: 0 = Sunday … 6 = Saturday. */
        this.weekStartDay = 0;
        /** BCP-47 locale used to format weekday/month names. */
        this.locale = 'en-US';
        /** ISO date treated as "today". Defaults to the real current date. */
        this.today = '';
        /** Disable the whole calendar. */
        this.isDisabled = false;
        /** Show the "Today" shortcut button in the footer. */
        this.showTodayButton = true;
        // ── A11y labels ──────────────────────────────────────────────────────────
        this.previousMonthLabel = 'Previous month';
        this.nextMonthLabel = 'Next month';
        this.previousYearLabel = 'Previous year';
        this.nextYearLabel = 'Next year';
        this.todayLabel = 'Today';
        // ── Internal state ─────────────────────────────────────────────────────────
        this._pickerOpen = false;
        this._pickerYearMin = 0;
        this._pickerYearMax = 0;
        this._pendingFocus = false;
        this._pendingPickerScroll = false;
        // Scroll-position restoration when years are prepended (extended upward).
        this._prepScrollTop = -1;
        this._prepScrollHeight = -1;
        this._extendingYears = false;
        // ── Keyboard navigation (roving focus over the grid) ───────────────────────
        this._onGridKeydown = (e) => {
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
            if (handled)
                e.preventDefault();
        };
        // ── ds-button click handlers ───────────────────────────────────────────────
        // The inner <ds-button> dispatches a composed `ds-click`; stop it at the
        // boundary so it doesn't leak past <ds-calendar> to consumers.
        this._onLabelClick = (e) => {
            e.stopPropagation();
            this._togglePicker();
        };
        this._onTodayClick = (e) => {
            e.stopPropagation();
            this._goToToday();
        };
        // ── Picker handlers ──────────────────────────────────────────────────────
        this._togglePicker = () => {
            this._pickerOpen = !this._pickerOpen;
            if (this._pickerOpen) {
                this._pickerYearMin = this.year - 10;
                this._pickerYearMax = this.year + 10;
                this._pendingPickerScroll = true;
            }
        };
        this._onYearListScroll = (e) => {
            if (this._extendingYears)
                return;
            const el = e.target;
            if (el.scrollTop < 100) {
                // Near the top — prepend newer years above the current range.
                this._extendingYears = true;
                this._prepScrollTop = el.scrollTop;
                this._prepScrollHeight = el.scrollHeight;
                this._pickerYearMax += 20;
            }
            else if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
                // Near the bottom — append older years below the current range.
                this._extendingYears = true;
                this._pickerYearMin -= 20;
            }
        };
    }
    // ── Derived helpers ──────────────────────────────────────────────────────
    _todayDate() {
        if (this.today) {
            const [y, m, d] = this.today.split('-').map(Number);
            if (y && m && d)
                return new Date(y, m - 1, d);
        }
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    _isOutOfRange(iso) {
        if (this.min && iso < this.min)
            return true;
        if (this.max && iso > this.max)
            return true;
        return false;
    }
    _isDisabledDate(iso) {
        if (this._isOutOfRange(iso))
            return true;
        if (this.disabledDates.includes(iso))
            return true;
        if (this.disabledDateFilter?.(iso))
            return true;
        return false;
    }
    /** Localized weekday short names, ordered by `weekStartDay`. */
    _weekdayLabels() {
        const fmt = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });
        // 2023-01-01 is a Sunday — a stable anchor for weekday index 0.
        const names = [];
        for (let i = 0; i < 7; i++) {
            names.push(fmt.format(new Date(2023, 0, 1 + i)));
        }
        const ordered = [];
        for (let i = 0; i < 7; i++) {
            ordered.push(names[(this.weekStartDay + i) % 7]);
        }
        return ordered;
    }
    _monthLabel() {
        return new Intl.DateTimeFormat(this.locale, {
            month: 'long',
            year: 'numeric',
        }).format(new Date(this.year, this.month - 1, 1));
    }
    _monthNames() {
        const fmt = new Intl.DateTimeFormat(this.locale, { month: 'long' });
        return Array.from({ length: 12 }, (_, i) => fmt.format(new Date(2023, i, 1)));
    }
    /** The 42 cells (6 weeks × 7 days) covering the displayed month. */
    _gridDates() {
        const firstWeekday = new Date(this.year, this.month - 1, 1).getDay();
        const offset = (firstWeekday - this.weekStartDay + 7) % 7;
        const start = new Date(this.year, this.month - 1, 1 - offset);
        const cells = [];
        for (let i = 0; i < DAYS_IN_WEEK * WEEKS_SHOWN; i++) {
            cells.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
        }
        return cells;
    }
    // ── Lifecycle ──────────────────────────────────────────────────────────────
    willUpdate(changed) {
        // Clamp the focused day to the displayed month so navigation never lands
        // on an impossible date (e.g. Jan 31 → Feb).
        if (changed.has('month') || changed.has('year')) {
            const max = daysInMonth(this.year, this.month);
            if (this.day > max)
                this.day = max;
            if (this.day < 1)
                this.day = 1;
        }
    }
    updated() {
        if (this._pendingFocus) {
            this._pendingFocus = false;
            const focused = this.renderRoot.querySelector('.day[tabindex="0"]');
            focused?.focus();
        }
        // After prepending years at the top, restore scroll position so the
        // viewport doesn't jump — new scroll = old scroll + height added above.
        if (this._prepScrollTop >= 0) {
            const list = this.renderRoot.querySelector('.picker-year-list');
            if (list) {
                list.scrollTop = this._prepScrollTop + (list.scrollHeight - this._prepScrollHeight);
            }
            this._prepScrollTop = -1;
            this._prepScrollHeight = -1;
            this._extendingYears = false;
        }
        // When picker first opens, bring the selected year into view.
        if (this._pendingPickerScroll) {
            this._pendingPickerScroll = false;
            this._extendingYears = false;
            const sel = this.renderRoot.querySelector('.picker-year-list [aria-selected="true"]');
            sel?.scrollIntoView({ block: 'center' });
        }
    }
    // ── Navigation ───────────────────────────────────────────────────────────
    _shiftMonth(delta, focusAfter = false) {
        const d = new Date(this.year, this.month - 1 + delta, 1);
        this.year = d.getFullYear();
        this.month = d.getMonth() + 1;
        if (focusAfter)
            this._pendingFocus = true;
        this._dispatchNavigate();
    }
    _shiftYear(delta, focusAfter = false) {
        this.year += delta;
        if (focusAfter)
            this._pendingFocus = true;
        this._dispatchNavigate();
    }
    _goToToday() {
        const t = this._todayDate();
        this.year = t.getFullYear();
        this.month = t.getMonth() + 1;
        this.day = t.getDate();
        this._pendingFocus = true;
        this._dispatchNavigate();
    }
    _setFocusedDate(d) {
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const day = d.getDate();
        const monthChanged = y !== this.year || m !== this.month;
        this.year = y;
        this.month = m;
        this.day = day;
        this._pendingFocus = true;
        if (monthChanged)
            this._dispatchNavigate();
        else
            this.requestUpdate();
    }
    _dispatchNavigate() {
        dispatch(this, 'ds-navigate', {
            day: this.day,
            month: this.month,
            year: this.year,
            iso: toISO(this.year, this.month, this.day),
        });
    }
    // ── Selection ──────────────────────────────────────────────────────────────
    _selectDate(d, originalEvent) {
        const iso = dateToISO(d);
        if (this._isDisabledDate(iso) || this.isDisabled)
            return;
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
    // ── Renderers ──────────────────────────────────────────────────────────────
    _renderHeader() {
        const label = this._monthLabel();
        return html `
      <div class="header">
        <button
          class="nav-btn"
          type="button"
          aria-label=${this.previousYearLabel}
          @click=${() => { if (!this._pickerOpen)
            this._shiftYear(-1); }}
        >
          ${chevronsLeft}
        </button>
        <button
          class="nav-btn"
          type="button"
          aria-label=${this.previousMonthLabel}
          @click=${() => { if (!this._pickerOpen)
            this._shiftMonth(-1); }}
        >
          ${chevronLeft}
        </button>
        <ds-button
          class="label-btn"
          variant="ghost"
          size="md"
          ?is-selected=${this._pickerOpen}
          @ds-click=${this._onLabelClick}
        >
          ${label}
        </ds-button>
        <button
          class="nav-btn"
          type="button"
          aria-label=${this.nextMonthLabel}
          @click=${() => { if (!this._pickerOpen)
            this._shiftMonth(1); }}
        >
          ${chevronRight}
        </button>
        <button
          class="nav-btn"
          type="button"
          aria-label=${this.nextYearLabel}
          @click=${() => { if (!this._pickerOpen)
            this._shiftYear(1); }}
        >
          ${chevronsRight}
        </button>
      </div>
    `;
    }
    _renderGrid() {
        const labels = this._weekdayLabels();
        const todayIso = dateToISO(this._todayDate());
        const cells = this._gridDates();
        const focusedIso = toISO(this.year, this.month, this.day);
        return html `
      <div class="weekdays" role="row">
        ${labels.map((name) => html `<span class="weekday" role="columnheader">${name}</span>`)}
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
                'is-outside': !inMonth,
                'is-today': isToday,
                'is-selected': isSelected,
                'is-day-disabled': isDisabledDay,
            };
            return html `
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
              @click=${(e) => this._selectDate(d, e)}
            >
              ${d.getDate()}
              ${marker
                ? html `<span class="marker ${marker}" aria-hidden="true"></span>`
                : nothing}
            </button>
          `;
        })}
      </div>
      ${this.showTodayButton
            ? html `<div class="footer">
            <ds-button variant="ghost" size="sm" @ds-click=${this._onTodayClick}>
              ${this.todayLabel}
            </ds-button>
          </div>`
            : nothing}
    `;
    }
    _renderPicker() {
        // Years in descending order (newest at top). The list grows dynamically as
        // the user scrolls — _onYearListScroll extends _pickerYearMax / _pickerYearMin.
        const years = [];
        for (let y = this._pickerYearMax; y >= this._pickerYearMin; y--) {
            years.push(y);
        }
        const months = this._monthNames();
        return html `
      <div class="picker">
        <div class="picker-col">
          <span class="picker-col-label" id="cal-year-label">Year</span>
          <div
            class="picker-list picker-year-list"
            role="listbox"
            aria-labelledby="cal-year-label"
            @scroll=${this._onYearListScroll}
          >
            ${years.map((y) => {
            const selected = y === this.year;
            return html `<button
                class="picker-item"
                type="button"
                role="option"
                aria-selected=${selected ? 'true' : 'false'}
                @click=${() => this._selectPickerYear(y)}
              >
                <span>${y}</span>
                ${selected ? html `<span class="check-icon">${checkIcon}</span>` : nothing}
              </button>`;
        })}
          </div>
        </div>
        <div class="picker-col">
          <span class="picker-col-label" id="cal-month-label">Month</span>
          <div class="picker-list" role="listbox" aria-labelledby="cal-month-label">
            ${months.map((name, i) => {
            const selected = i + 1 === this.month;
            return html `<button
                class="picker-item"
                type="button"
                role="option"
                aria-selected=${selected ? 'true' : 'false'}
                @click=${() => this._selectPickerMonth(i + 1)}
              >
                <span>${name}</span>
                ${selected ? html `<span class="check-icon">${checkIcon}</span>` : nothing}
              </button>`;
        })}
          </div>
        </div>
      </div>
    `;
    }
    _selectPickerYear(y) {
        this.year = y;
        this._dispatchNavigate();
    }
    _selectPickerMonth(m) {
        this.month = m;
        this._pickerOpen = false;
        this._dispatchNavigate();
    }
    render() {
        return html `
      <div class="calendar" part="calendar">
        ${this._renderHeader()}
        ${this._pickerOpen ? this._renderPicker() : this._renderGrid()}
      </div>
    `;
    }
};
DsCalendar.styles = [
    resetStyles,
    typographyBaseStyles,
    srOnlyStyles,
    css `
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
        gap: var(--ds-spacing-spacing-00); /* 0px */
        width: 300px;
        padding-inline: var(--ds-spacing-spacing-04); /* 8px */
        padding-bottom: var(--ds-spacing-spacing-05);
      }

      /* Native nav arrows (icon-only). To be replaced by <ds-icon-button>
         once that component exists. */
      .nav-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--ds-type-scale-y6); /* 32px square */
        height: var(--ds-type-scale-y6);
        flex: 0 0 auto;
        border-radius: var(--ds-radius-semantic-radius-sm);
        background: var(--ds-background-neutral-subtle-default);
        color: var(--ds-icon-icon-default);
        cursor: pointer;
        position: relative;
        transition: background-color 120ms ease;
      }
      .nav-btn:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }
      .nav-btn:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }
      .nav-btn svg,
      .check-icon {
        width: var(--ds-spacing-spacing-06); /* 16px */
        height: var(--ds-spacing-spacing-06);
        display: block;
      }

      /* Month-label control — the shared <ds-button> (ghost). It flexes to
         fill the space between the arrows and its inner button stretches so
         the hover/selected background spans the full width. */
      .label-btn {
        flex: 1 1 auto;
      }
      .label-btn::part(button) {
        width: 100%;
      }

      /* Shared focus ring rendered as a pseudo element so corner radius
         of the control itself is never mutated. */
      .nav-btn::after,
      .day::after,
      .picker-item::after {
        content: '';
        position: absolute;
        inset: -2px;
        border: 2px solid transparent;
        border-radius: var(--ds-radius-semantic-radius-focus-sm);
        pointer-events: none;
      }
      .nav-btn:focus-visible::after,
      .day:focus-visible::after,
      .picker-item:focus-visible::after {
        border-color: var(--ds-focus-focus);
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
        /* Figma text style: Heading/xxs */
        font-family: var(--ds-typography-cozy-heading-xxs-font-family);
        font-size: var(--ds-typography-cozy-heading-xxs-font-size);
        font-weight: var(--ds-typography-cozy-heading-xxs-font-weight);
        line-height: var(--ds-typography-cozy-heading-xxs-line-height);
        letter-spacing: var(--ds-typography-cozy-heading-xxs-letter-spacing);
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
        /* Figma text style: Body/md */
        font-family: var(--ds-typography-cozy-body-md-font-family);
        font-size: var(--ds-typography-cozy-body-md-font-size);
        font-weight: var(--ds-typography-cozy-body-md-font-weight);
        line-height: var(--ds-typography-cozy-body-md-line-height);
        letter-spacing: var(--ds-typography-cozy-body-md-letter-spacing);
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
        gap: var(--ds-spacing-spacing-04);
        padding-top: var(--ds-spacing-spacing-04);
      }
      .picker-col {
        display: flex;
        flex-direction: column;
        min-width: 0;
      }
      .picker-col-label {
        padding: var(--ds-spacing-spacing-04) var(--ds-spacing-spacing-05);
        /* Figma text style: Utility/Helper */
        font-family: var(--ds-typography-cozy-helper-font-family);
        font-size: var(--ds-typography-cozy-helper-font-size);
        font-weight: var(--ds-typography-cozy-helper-font-weight);
        line-height: var(--ds-typography-cozy-helper-line-height);
        letter-spacing: var(--ds-typography-cozy-helper-letter-spacing);
        color: var(--ds-text-text-subtlest);
      }
      .picker-list {
        display: flex;
        flex-direction: column;
        max-height: 280px;
        overflow-y: auto;
        scrollbar-width: thin;
      }
      .picker-item {
        all: unset;
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--ds-spacing-spacing-04);
        height: var(--ds-type-scale-y7); /* 40px */
        padding: 0 var(--ds-spacing-spacing-05);
        border-radius: var(--ds-radius-semantic-radius-sm);
        background: var(--ds-background-neutral-subtle-default);
        color: var(--ds-text-text-default);
        /* Figma text style: Body/md */
        font-family: var(--ds-typography-cozy-body-md-font-family);
        font-size: var(--ds-typography-cozy-body-md-font-size);
        font-weight: var(--ds-typography-cozy-body-md-font-weight);
        line-height: var(--ds-typography-cozy-body-md-line-height);
        letter-spacing: var(--ds-typography-cozy-body-md-letter-spacing);
        cursor: pointer;
        transition: background-color 120ms ease;
      }
      .picker-item:hover {
        background: var(--ds-background-neutral-subtle-hovered);
      }
      .picker-item:active {
        background: var(--ds-background-neutral-subtle-pressed);
      }
      .picker-item[aria-selected='true'] {
        background: var(--ds-background-neutral-default);
      }
      .picker-item:disabled {
        color: var(--ds-text-text-disabled);
        cursor: not-allowed;
        background: var(--ds-background-neutral-subtle-default);
      }
      .check-icon {
        color: var(--ds-icon-icon-default);
        flex: 0 0 auto;
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
__decorate([
    property({ type: Number, reflect: true })
], DsCalendar.prototype, "year", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsCalendar.prototype, "month", void 0);
__decorate([
    property({ type: Number, reflect: true })
], DsCalendar.prototype, "day", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsCalendar.prototype, "value", void 0);
__decorate([
    property({ type: String })
], DsCalendar.prototype, "min", void 0);
__decorate([
    property({ type: String })
], DsCalendar.prototype, "max", void 0);
__decorate([
    property({ attribute: false })
], DsCalendar.prototype, "disabledDates", void 0);
__decorate([
    property({ attribute: false })
], DsCalendar.prototype, "disabledDateFilter", void 0);
__decorate([
    property({ attribute: false })
], DsCalendar.prototype, "markers", void 0);
__decorate([
    property({ type: Number, reflect: true, attribute: 'week-start-day' })
], DsCalendar.prototype, "weekStartDay", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsCalendar.prototype, "locale", void 0);
__decorate([
    property({ type: String })
], DsCalendar.prototype, "today", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
], DsCalendar.prototype, "isDisabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'show-today-button' })
], DsCalendar.prototype, "showTodayButton", void 0);
__decorate([
    property({ type: String, attribute: 'previous-month-label' })
], DsCalendar.prototype, "previousMonthLabel", void 0);
__decorate([
    property({ type: String, attribute: 'next-month-label' })
], DsCalendar.prototype, "nextMonthLabel", void 0);
__decorate([
    property({ type: String, attribute: 'previous-year-label' })
], DsCalendar.prototype, "previousYearLabel", void 0);
__decorate([
    property({ type: String, attribute: 'next-year-label' })
], DsCalendar.prototype, "nextYearLabel", void 0);
__decorate([
    property({ type: String, attribute: 'today-label' })
], DsCalendar.prototype, "todayLabel", void 0);
__decorate([
    state()
], DsCalendar.prototype, "_pickerOpen", void 0);
__decorate([
    state()
], DsCalendar.prototype, "_pickerYearMin", void 0);
__decorate([
    state()
], DsCalendar.prototype, "_pickerYearMax", void 0);
DsCalendar = __decorate([
    customElement('ds-calendar')
], DsCalendar);
export { DsCalendar };
/* ── Inline icons (16×16, stroke = currentColor) ───────────────────────────── */
const chevronLeft = html `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 4 6 8l4 4" /></svg>`;
const chevronRight = html `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 4l4 4-4 4" /></svg>`;
const chevronsLeft = html `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4 4 8l4 4M13 4 9 8l4 4" /></svg>`;
const chevronsRight = html `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4l4 4-4 4M8 4l4 4-4 4" /></svg>`;
const checkIcon = html `<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" /></svg>`;
//# sourceMappingURL=ds-calendar.js.map