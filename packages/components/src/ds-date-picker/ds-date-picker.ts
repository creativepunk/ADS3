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

export type DsDatePickerLayoutType = 'stacked' | 'inline';

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
 * Single-date picker: typed input + calendar flyout.
 * @tagname ds-date-picker
 */
@customElement('ds-date-picker')
export class DsDatePicker extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
        min-width: 172px;
        width: 172px;
      }

      :host([type='inline']) {
        min-width: 360px;
        width: 360px;
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

      :host([disabled]) .input,
      :host([disabled]) .icon {
        color: var(--ds-text-text-disabled);
      }

      .trigger:focus-within {
        outline: 2px solid var(--ds-focus-focus);
        outline-offset: -2px;
      }

      .input-wrap {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;
        align-self: stretch;
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

  /** Selected date as ISO `YYYY-MM-DD`. */
  @property({ type: String, reflect: true })
  value = '';

  /** Placeholder shown when empty and not focused. */
  @property({ type: String, reflect: true })
  placeholder = 'Pick a date';

  /** Date format for mask display. */
  @property({ type: String, reflect: true })
  format: DateFormat = 'MM/DD/YYYY';

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  @property({ type: String, reflect: true })
  type: DsDatePickerLayoutType = 'stacked';

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

  /** Shows a clear (×) button when a value is set. */
  @property({ type: Boolean, reflect: true, attribute: 'is-clearable' })
  isClearable = false;

  @state() private _mask: MaskState = { ...EMPTY_MASK };
  @state() private _focused = false;
  @state() private _selectAll = false;
  private _justFocused = false;
  @state() private _open = false;
  @state() private _calYear = new Date().getFullYear();
  @state() private _calMonth = new Date().getMonth() + 1;

  willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value')) {
      if (!this._focused) {
        this._mask = this.value && isValidIso(this.value) ? isoToMask(this.value) : { ...EMPTY_MASK };
      }
      if (this.value && isValidIso(this.value)) {
        const [y, m] = this.value.split('-').map(Number);
        this._calYear = y;
        this._calMonth = m;
      }
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

  private _toggleFlyout(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this._open = !this._open;
  }

  private _handleCalendarSelect(e: Event) {
    const ce = e as CustomEvent;
    const iso: string = ce.detail?.value ?? '';
    if (!iso) return;
    this.value = iso;
    this._mask = isoToMask(iso);
    this._focused = false;
    this._open = false;
    dispatch(this, 'ds-change', { value: iso, originalEvent: e });
  }

  private _getInput(): HTMLInputElement | null {
    return this.renderRoot.querySelector<HTMLInputElement>('.input');
  }

  private _setCursor(pos: number) {
    requestAnimationFrame(() => {
      const el = this._getInput();
      if (el) el.setSelectionRange(pos, pos);
    });
  }

  private _handleFocus(e: FocusEvent) {
    this._focused = true;
    this._justFocused = true;
    if (!this.value || !isValidIso(this.value)) {
      this._mask = { ...EMPTY_MASK };
    } else {
      this._mask = { ...this._mask, segment: 'month' };
    }
    this._setCursor(getMaskCursorPos(this._mask));
    if (!this.disabled && !this.readonly) this._open = true;
    dispatch(this, 'ds-focus', { originalEvent: e });
  }

  private _handleBlur(e: FocusEvent) {
    // Defer so a calendar day click's ds-select fires before we close
    setTimeout(() => {
      const active = this.shadowRoot?.activeElement ?? document.activeElement;
      // If focus returned to something inside this host, stay open
      if (active && this.shadowRoot?.contains(active)) return;
      this._focused = false;
      this._selectAll = false;
      this._open = false;
      if (!isMaskComplete(this._mask)) {
        this._mask = this.value && isValidIso(this.value) ? isoToMask(this.value) : { ...EMPTY_MASK };
      }
      dispatch(this, 'ds-blur', { originalEvent: e });
    }, 0);
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.readonly) return;
    if (e.key === 'Escape') { this._open = false; return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target === this.renderRoot.querySelector('.icon')) {
      e.preventDefault();
      if (!this.disabled && !this.readonly) this._open = !this._open;
      return;
    }
    if (e.target !== this._getInput()) return;
    if (e.key === 'Tab') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      this._open = false;
      this._getInput()?.blur();
      return;
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
      e.preventDefault();
      this._selectAll = true;
      return;
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      if (this._selectAll) {
        this._selectAll = false;
        this._mask = { ...EMPTY_MASK };
        this._setCursor(getMaskCursorPos(this._mask));
        this._emitIfComplete(this._mask, e);
        return;
      }
      const next = applyMaskBackspace(this._mask);
      this._mask = next;
      this._setCursor(getMaskCursorPos(next));
      this._emitIfComplete(next, e);
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      this._selectAll = false;
      const segments: Array<'month' | 'day' | 'year'> = ['month', 'day', 'year'];
      const idx = segments.indexOf(this._mask.segment);
      const next = e.key === 'ArrowLeft' ? Math.max(0, idx - 1) : Math.min(2, idx + 1);
      this._mask = { ...this._mask, segment: segments[next] };
      this._setCursor(getMaskCursorPos(this._mask));
      return;
    }

    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      if (this._selectAll) {
        this._selectAll = false;
        this._mask = { ...EMPTY_MASK };
      }
      const next = applyMaskDigit(this._mask, e.key);
      this._mask = next;
      this._setCursor(getMaskCursorPos(next));
      this._emitIfComplete(next, e);
      return;
    }

    if (e.key.length === 1) e.preventDefault();
  }

  private _handleClick(e: MouseEvent) {
    e.stopPropagation();
    this._selectAll = false;
    if (this._justFocused) {
      this._justFocused = false;
      if (!this.disabled && !this.readonly) this._open = true;
      return;
    }
    const el = this._getInput();
    if (!el) return;
    const pos = el.selectionStart ?? 0;
    const seg = getMaskSegmentFromCursorPos(pos);
    this._mask = { ...this._mask, segment: seg };
    this._setCursor(getMaskCursorPos({ ...this._mask, segment: seg }));
    if (!this.disabled && !this.readonly) this._open = true;
  }

  private _emitIfComplete(mask: MaskState, originalEvent: Event) {
    const iso = maskToIso(mask);
    if (iso !== this.value) {
      if (iso && isValidIso(iso)) {
        this.value = iso;
        const [y, m] = iso.split('-').map(Number);
        this._calYear = y;
        this._calMonth = m;
        dispatch(this, 'ds-change', { value: iso, originalEvent });
      } else if (!iso && this.value) {
        this.value = '';
        dispatch(this, 'ds-change', { value: '', originalEvent });
      }
    }
  }

  private _handleClear(e: MouseEvent) {
    e.stopPropagation();
    this.value = '';
    this._mask = { ...EMPTY_MASK };
    this._focused = false;
    this._open = false;
    dispatch(this, 'ds-change', { value: '', originalEvent: e });
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

    const hasValue = Boolean(this.value && isValidIso(this.value));
    const showFriendly = !this._focused && hasValue;
    const showMask = this._focused;
    const displayValue = this._focused ? buildMaskDisplay(this._mask) : (showFriendly ? ' ' : '');
    const placeholder = this._focused ? this.format : this.placeholder;
    const showClear = this.isClearable && hasValue && !this.disabled && !this.readonly;

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
            <div class="input-wrap">
              <input
                class="input text-regular-body-md"
                part="input"
                type="text"
                inputmode="none"
                placeholder=${placeholder}
                .value=${live(displayValue)}
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                aria-label=${this.label || this.placeholder}
                aria-invalid=${this.invalid ? 'true' : 'false'}
                aria-haspopup="dialog"
                aria-expanded=${this._open ? 'true' : 'false'}
                @focus=${this._handleFocus}
                @blur=${this._handleBlur}
                @click=${(e: MouseEvent) => this._handleClick(e)}
                @input=${(e: InputEvent) => { e.preventDefault(); (e.target as HTMLInputElement).value = buildMaskDisplay(this._mask); }}
                @paste=${(e: Event) => e.preventDefault()}
                @drop=${(e: Event) => e.preventDefault()}
              />
              ${showMask ? this._renderMask(this._mask, this._selectAll) : nothing}
              ${showFriendly ? html`<div class="mask-overlay" aria-hidden="true"><span class="t">${isoToFriendly(this.value)}</span></div>` : nothing}
            </div>
            ${showClear ? html`
              <ds-icon-button
                variant="ghost"
                size="xs"
                shape="circle"
                aria-label="Clear date"
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
            aria-label="Date picker"
            aria-modal="true"
            ?hidden=${!this._open}
          >
            <ds-calendar
              .value=${this.value}
              .year=${this._calYear}
              .month=${this._calMonth}
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
    'ds-date-picker': DsDatePicker;
  }
}
