import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import {
  type MaskState,
  type DateFormat,
  EMPTY_MASK,
  buildMaskDisplay,
  getMaskCursorPos,
  isMaskComplete,
  maskToIso,
  isoToMask,
  isoToFriendly,
  applyMaskDigit,
  applyMaskBackspace,
  getMaskSegmentFromCursorPos,
} from '../shared/date-mask.js';
import '../ds-field-input/ds-field-input.js';
import '../ds-calendar/ds-calendar.js';
import '../ds-icon-button/ds-icon-button.js';
import '../ds-icon/ds-icon.js';

export type DsDateRangePickerLayoutType = 'stacked' | 'inline';

function isValidIso(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

const CALENDAR_SVG = html`<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
>
  <path
    d="M6.5 2.5V5M13.5 2.5V5M3.5 7.5H16.5M4.5 3.5H15.5C16.0523 3.5 16.5 3.94772 16.5 4.5V16.5C16.5 17.0523 16.0523 17.5 15.5 17.5H4.5C3.94772 17.5 3.5 17.0523 3.5 16.5V4.5C3.5 3.94772 3.94772 3.5 4.5 3.5Z"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

/**
 * Date range picker: two typed inputs (start / end) with a shared calendar flyout.
 * @tagname ds-date-range-picker
 */
@customElement('ds-date-range-picker')
export class DsDateRangePicker extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
        min-width: 300px;
        width: 300px;
      }

      :host([type='inline']) {
        min-width: 488px;
        width: 488px;
      }

      ds-field-input {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }

      .trigger-wrap {
        position: relative;
        width: 100%;
      }

      .trigger {
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-03);
        height: 32px;
        padding: var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-04);
        background: var(--ds-background-input-default);
        border: none;
        border-bottom: 1px solid var(--ds-border-border-bold);
        width: 100%;
        box-sizing: border-box;
        transition: background 80ms ease;
        cursor: pointer;
      }

      .trigger:hover {
        background: var(--ds-background-input-hovered);
        border-bottom-color: var(--ds-border-border-bolder);
      }

      :host([invalid]) .trigger {
        border-bottom-color: var(--ds-border-border-danger);
      }

      :host([valid]) .trigger {
        border-bottom-color: var(--ds-border-border-success);
      }

      :host([disabled]) .trigger {
        pointer-events: none;
        cursor: not-allowed;
        background: var(--ds-background-input-default);
        border-bottom-color: var(--ds-border-border-bold);
      }

      :host([disabled]) .icon,
      :host([disabled]) .separator {
        color: var(--ds-text-text-disabled);
      }

      .trigger:focus-within {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: -2px;
      }

      .input-group {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-02);
      }

      .input-wrap {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;
        align-self: stretch;
        /* prevent zero-width collapse */
        min-width: 80px;
      }

      .input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        color: transparent;
        caret-color: transparent;
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
        cursor: text;
        width: 100%;
      }

      .input::placeholder {
        color: var(--ds-text-text-subtlest);
      }


      .mask-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        display: flex;
        align-items: center;
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
        white-space: nowrap;
        overflow: hidden;
      }

      .t { color: var(--ds-text-text-default); }
      .p { color: var(--ds-text-text-subtlest); }

      :host([disabled]) .t,
      :host([disabled]) .p {
        color: var(--ds-text-text-disabled);
      }

      .seg {
        display: inline-flex;
        align-items: center;
        border-radius: 2px;
        padding: 0 1px;
      }
      .seg.active {
        background: var(--ds-background-selected-bolder-default);
        color: var(--ds-color-default-neutral-white, #fff);
      }
      .seg.active .t,
      .seg.active .p {
        color: var(--ds-color-default-neutral-white, #fff);
      }

      .separator {
        flex-shrink: 0;
        color: var(--ds-text-text-subtlest);
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        user-select: none;
      }

      .icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ds-icon-icon-subtle);
        cursor: pointer;
        background: none;
        border: none;
        padding: 0;
      }

      .icon:focus-visible {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: 2px;
        border-radius: var(--ds-radius-semantic-radius-sm);
      }

      .icon:focus:not(:focus-visible) { outline: none; }

      .flyout {
        position: absolute;
        top: calc(100% + var(--ds-spacing-spacing-02, 4px));
        left: 0;
        z-index: 100;
      }

      .flyout[hidden] { display: none; }
    `,
  ];

  /** Start date as ISO `YYYY-MM-DD`. */
  @property({ type: String, reflect: true, attribute: 'start-date' })
  startDate = '';

  /** End date as ISO `YYYY-MM-DD`. */
  @property({ type: String, reflect: true, attribute: 'end-date' })
  endDate = '';

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  @property({ type: String, reflect: true })
  type: DsDateRangePickerLayoutType = 'stacked';

  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = '';

  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage = 'Error message';

  @property({ type: String, reflect: true, attribute: 'success-message' })
  successMessage = 'Success message';

  @property({ type: Boolean, reflect: true })
  invalid = false;

  @property({ type: Boolean, reflect: true })
  valid = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: String, reflect: true })
  min = '';

  @property({ type: String, reflect: true })
  max = '';

  /** Date format for mask display. */
  @property({ type: String, reflect: true })
  format: DateFormat = 'MM/DD/YYYY';

  /** Shows a clear (×) button when any value is set. */
  @property({ type: Boolean, reflect: true, attribute: 'is-clearable' })
  isClearable = false;

  @state() private _startMask: MaskState = { ...EMPTY_MASK };
  @state() private _endMask: MaskState = { ...EMPTY_MASK };
  @state() private _startFocused = false;
  @state() private _endFocused = false;
  @state() private _selectAll = false;
  private _justFocused = false;
  @state() private _open = false;
  @state() private _activeInput: 'start' | 'end' = 'start';
  @state() private _calYear = new Date().getFullYear();
  @state() private _calMonth = new Date().getMonth() + 1;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('startDate') && !this._startFocused) {
      this._startMask = this.startDate && isValidIso(this.startDate) ? isoToMask(this.startDate) : { ...EMPTY_MASK };
    }
    if (changed.has('endDate') && !this._endFocused) {
      this._endMask = this.endDate && isValidIso(this.endDate) ? isoToMask(this.endDate) : { ...EMPTY_MASK };
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _handleOutsideClick(e: MouseEvent) {
    if (!this._open) return;
    const path = e.composedPath();
    if (!path.includes(this)) this._open = false;
  }

  private _openWithFocus(focus: 'start' | 'end', e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this._activeInput = focus;
    if (!this._open) {
      const iso = focus === 'start' ? this.startDate : this.endDate;
      if (iso && isValidIso(iso)) {
        const [y, m] = iso.split('-').map(Number);
        this._calYear = y;
        this._calMonth = m;
      }
    }
    this._open = true;
  }

  private _toggleFlyout(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this._open = !this._open;
  }

  private _handleCalendarSelect(e: Event) {
    const ce = e as CustomEvent;
    const iso: string = ce.detail?.value ?? '';
    if (!iso) return;

    if (this._activeInput === 'start') {
      this.startDate = iso;
      this._startMask = isoToMask(iso);
      this._startFocused = false;
      if (this.endDate && this.endDate < iso) {
        this.endDate = '';
        this._endMask = { ...EMPTY_MASK };
      }
      this._activeInput = 'end';
      // Move focus to end input so user can type or continue picking
      this.updateComplete.then(() => {
        this._getEndInput()?.focus();
      });
    } else {
      if (iso < this.startDate) {
        this.endDate = this.startDate;
        this._endMask = isoToMask(this.endDate);
        this.startDate = iso;
        this._startMask = isoToMask(iso);
      } else {
        this.endDate = iso;
        this._endMask = isoToMask(iso);
      }
      this._endFocused = false;
      this._open = false;
    }

    dispatch(this, 'ds-date-range-change', {
      startDate: this.startDate,
      endDate: this.endDate,
      originalEvent: e,
    });
  }

  private _getStartInput(): HTMLInputElement | null {
    return this.renderRoot.querySelector<HTMLInputElement>('[part="start-input"]');
  }

  private _getEndInput(): HTMLInputElement | null {
    return this.renderRoot.querySelector<HTMLInputElement>('[part="end-input"]');
  }

  private _setCursor(el: HTMLInputElement | null, pos: number) {
    requestAnimationFrame(() => {
      if (el) el.setSelectionRange(pos, pos);
    });
  }

  private _handleStartFocus(e: FocusEvent) {
    this._startFocused = true;
    this._justFocused = true;
    this._activeInput = 'start';
    if (!this.startDate || !isValidIso(this.startDate)) {
      this._startMask = { ...EMPTY_MASK };
    } else {
      this._startMask = { ...this._startMask, segment: 'month' };
    }
    this._setCursor(this._getStartInput(), getMaskCursorPos(this._startMask));
    dispatch(this, 'ds-focus', { originalEvent: e });
  }

  private _handleStartBlur(e: FocusEvent) {
    this._startFocused = false;
    this._selectAll = false;
    if (!isMaskComplete(this._startMask)) {
      this._startMask = this.startDate && isValidIso(this.startDate) ? isoToMask(this.startDate) : { ...EMPTY_MASK };
    }
    dispatch(this, 'ds-blur', { originalEvent: e });
  }

  private _handleEndFocus(e: FocusEvent) {
    this._endFocused = true;
    this._justFocused = true;
    this._activeInput = 'end';
    if (!this.endDate || !isValidIso(this.endDate)) {
      this._endMask = { ...EMPTY_MASK };
    } else {
      this._endMask = { ...this._endMask, segment: 'month' };
    }
    this._setCursor(this._getEndInput(), getMaskCursorPos(this._endMask));
    dispatch(this, 'ds-focus', { originalEvent: e });
  }

  private _handleEndBlur(e: FocusEvent) {
    this._endFocused = false;
    this._selectAll = false;
    if (!isMaskComplete(this._endMask)) {
      this._endMask = this.endDate && isValidIso(this.endDate) ? isoToMask(this.endDate) : { ...EMPTY_MASK };
    }
    dispatch(this, 'ds-blur', { originalEvent: e });
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.readonly) return;
    if (e.key === 'Escape') { this._open = false; return; }

    const isStart = e.target === this._getStartInput();
    const isEnd = e.target === this._getEndInput();
    if (!isStart && !isEnd) return;
    if (e.key === 'Tab') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      this._open = false;
      (e.target as HTMLInputElement).blur();
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.preventDefault();
      this._selectAll = true;
      return;
    }

    const mask = isStart ? this._startMask : this._endMask;
    const setMask = (m: MaskState) => {
      if (isStart) this._startMask = m;
      else this._endMask = m;
    };
    const el = isStart ? this._getStartInput() : this._getEndInput();

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      if (this._selectAll) {
        this._selectAll = false;
        setMask({ ...EMPTY_MASK });
        this._setCursor(el, getMaskCursorPos(EMPTY_MASK));
        this._emitRange(e);
        return;
      }
      const next = applyMaskBackspace(mask);
      setMask(next);
      this._setCursor(el, getMaskCursorPos(next));
      this._emitRange(e);
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      this._selectAll = false;
      const segments: Array<'month' | 'day' | 'year'> = ['month', 'day', 'year'];
      const idx = segments.indexOf(mask.segment);
      const next = e.key === 'ArrowLeft' ? Math.max(0, idx - 1) : Math.min(2, idx + 1);
      setMask({ ...mask, segment: segments[next] });
      this._setCursor(el, getMaskCursorPos({ ...mask, segment: segments[next] }));
      return;
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      if (this._selectAll) {
        this._selectAll = false;
        setMask({ ...EMPTY_MASK });
      }
      const next = applyMaskDigit(isStart ? this._startMask : this._endMask, e.key);
      setMask(next);
      this._setCursor(el, getMaskCursorPos(next));
      this._emitRange(e);
      if (isMaskComplete(next)) {
        const iso = maskToIso(next);
        const [y, m] = iso.split('-').map(Number);
        if (isStart) {
          this._calYear = y;
          this._calMonth = m;
          this.updateComplete.then(() => this._getEndInput()?.focus());
        } else {
          this._calYear = y;
          this._calMonth = m;
        }
      }
      return;
    }

    if (e.key.length === 1) e.preventDefault();
  }

  private _handleStartClick() {
    this._selectAll = false;
    if (this._justFocused) {
      this._justFocused = false;
      return;
    }
    const el = this._getStartInput();
    if (!el) return;
    const pos = el.selectionStart ?? 0;
    const seg = getMaskSegmentFromCursorPos(pos);
    this._startMask = { ...this._startMask, segment: seg };
    this._setCursor(el, getMaskCursorPos(this._startMask));
  }

  private _handleEndClick() {
    this._selectAll = false;
    if (this._justFocused) {
      this._justFocused = false;
      return;
    }
    const el = this._getEndInput();
    if (!el) return;
    const pos = el.selectionStart ?? 0;
    const seg = getMaskSegmentFromCursorPos(pos);
    this._endMask = { ...this._endMask, segment: seg };
    this._setCursor(el, getMaskCursorPos(this._endMask));
  }

  private _emitRange(originalEvent: Event) {
    const startIso = maskToIso(this._startMask);
    const endIso = maskToIso(this._endMask);
    const startChanged = startIso !== this.startDate;
    const endChanged = endIso !== this.endDate;
    if (!startChanged && !endChanged) return;
    if (startIso) this.startDate = startIso;
    if (endIso) this.endDate = endIso;
    dispatch(this, 'ds-date-range-change', {
      startDate: this.startDate,
      endDate: this.endDate,
      originalEvent,
    });
  }

  private get _calendarValue(): string {
    return this._activeInput === 'start' ? this.startDate : (this.endDate || this.startDate);
  }

  private _handleClear(e: MouseEvent) {
    e.stopPropagation();
    this.startDate = '';
    this.endDate = '';
    this._startMask = { ...EMPTY_MASK };
    this._endMask = { ...EMPTY_MASK };
    this._startFocused = false;
    this._endFocused = false;
    this._open = false;
    dispatch(this, 'ds-date-range-change', { startDate: '', endDate: '', originalEvent: e });
  }

  private _renderMask(mask: MaskState, selectAll = false) {
    const { month, day, year, segment } = mask;
    const mPh = month.length > 0 ? '0'.repeat(2 - month.length) : 'mm';
    const dPh = day.length > 0 ? '0'.repeat(2 - day.length) : 'dd';
    const yPh = year.length > 0 ? '0'.repeat(4 - year.length) : 'yyyy';
    const a = (seg: string) => selectAll || segment === seg ? 'active' : '';
    // prettier-ignore
    return html`<div class="mask-overlay" aria-hidden="true"><span class="seg ${a('month')}"><span class="p">${mPh}</span><span class="t">${month}</span></span><span class="p">/</span><span class="seg ${a('day')}"><span class="p">${dPh}</span><span class="t">${day}</span></span><span class="p">/</span><span class="seg ${a('year')}"><span class="p">${yPh}</span><span class="t">${year}</span></span></div>`;
  }

  render() {
    const msgType = this.invalid ? 'error' : this.valid ? 'success' : 'helper';
    const msgText = this.invalid
      ? this.errorMessage
      : this.valid
        ? this.successMessage
        : this.helperText;

    const hasStart = Boolean(this.startDate && isValidIso(this.startDate));
    const hasEnd = Boolean(this.endDate && isValidIso(this.endDate));
    const showStartFriendly = !this._startFocused && hasStart;
    const showEndFriendly = !this._endFocused && hasEnd;
    const showStartMask = this._startFocused;
    const showEndMask = this._endFocused;
    const startDisplay = this._startFocused ? buildMaskDisplay(this._startMask) : (showStartFriendly ? ' ' : '');
    const endDisplay = this._endFocused ? buildMaskDisplay(this._endMask) : (showEndFriendly ? ' ' : '');
    const showClear = this.isClearable && (hasStart || hasEnd) && !this.disabled && !this.readonly;
    const startPlaceholder = this._startFocused ? this.format : 'Start date';
    const endPlaceholder = this._endFocused ? this.format : 'End date';

    return html`
      <ds-field-input
        label=${this.label || nothing}
        ?is-required=${this.isRequired}
        type=${this.type}
        helper-text=${msgType === 'helper' ? msgText : ''}
        error-message=${msgType === 'error' ? msgText : ''}
        success-message=${msgType === 'success' ? msgText : ''}
        ?invalid=${this.invalid}
        ?valid=${this.valid}
        ?disabled=${this.disabled}
      >
        <div class="trigger-wrap">
        <div class="trigger" part="trigger" @keydown=${this._handleKeydown}>
          <div class="input-group">
            <div class="input-wrap">
              <input
                class="input text-regular-body-md"
                part="start-input"
                type="text"
                inputmode="none"
                placeholder=${startPlaceholder}
                .value=${live(startDisplay)}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                aria-label="Start date"
                aria-invalid=${this.invalid ? 'true' : 'false'}
                @focus=${this._handleStartFocus}
                @blur=${this._handleStartBlur}
                @click=${(e: MouseEvent) => { this._openWithFocus('start', e); this._handleStartClick(); }}
                @input=${(e: InputEvent) => { e.preventDefault(); (e.target as HTMLInputElement).value = buildMaskDisplay(this._startMask); }}
                @paste=${(e: Event) => e.preventDefault()}
                @drop=${(e: Event) => e.preventDefault()}
              />
              ${showStartMask ? this._renderMask(this._startMask, this._selectAll && this._activeInput === 'start') : nothing}
              ${showStartFriendly ? html`<div class="mask-overlay" aria-hidden="true"><span class="t">${isoToFriendly(this.startDate)}</span></div>` : nothing}
            </div>
            <span class="separator" aria-hidden="true">–</span>
            <div class="input-wrap">
              <input
                class="input text-regular-body-md"
                part="end-input"
                type="text"
                inputmode="none"
                placeholder=${endPlaceholder}
                .value=${live(endDisplay)}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                aria-label="End date"
                aria-invalid=${this.invalid ? 'true' : 'false'}
                @focus=${this._handleEndFocus}
                @blur=${this._handleEndBlur}
                @click=${(e: MouseEvent) => { this._openWithFocus('end', e); this._handleEndClick(); }}
                @input=${(e: InputEvent) => { e.preventDefault(); (e.target as HTMLInputElement).value = buildMaskDisplay(this._endMask); }}
                @paste=${(e: Event) => e.preventDefault()}
                @drop=${(e: Event) => e.preventDefault()}
              />
              ${showEndMask ? this._renderMask(this._endMask, this._selectAll && this._activeInput === 'end') : nothing}
              ${showEndFriendly ? html`<div class="mask-overlay" aria-hidden="true"><span class="t">${isoToFriendly(this.endDate)}</span></div>` : nothing}
            </div>
          </div>
          ${showClear ? html`
            <ds-icon-button
              variant="ghost"
              size="xs"
              shape="circle"
              aria-label="Clear dates"
              @click=${this._handleClear}
            >
              <ds-icon name="close" size="sm"></ds-icon>
            </ds-icon-button>
          ` : nothing}
          <button
            class="icon"
            type="button"
            tabindex=${this.disabled ? '-1' : '0'}
            aria-label="Open calendar"
            aria-haspopup="dialog"
            aria-expanded=${this._open ? 'true' : 'false'}
            ?disabled=${this.disabled}
            @click=${this._toggleFlyout}
          >
            ${CALENDAR_SVG}
          </button>
        </div>
        <div
          class="flyout"
          role="dialog"
          aria-label="Date range picker"
          aria-modal="true"
          ?hidden=${!this._open}
        >
          <ds-calendar
            .value=${this._calendarValue}
            .year=${this._calYear}
            .month=${this._calMonth}
            range-start=${this.startDate || nothing}
            range-end=${this.endDate || nothing}
            min=${this.min || nothing}
            max=${this.max || nothing}
            @ds-select=${this._handleCalendarSelect}
          ></ds-calendar>
        </div>
        </div>
      </ds-field-input>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-date-range-picker': DsDateRangePicker;
  }
}
