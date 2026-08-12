import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';

export type DsTextAreaType = 'stacked' | 'inline';
export type DsTextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/** @tagname ds-text-area */
@customElement('ds-text-area')
export class DsTextArea extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
      }

      /* ── Inline layout ────────────────────────────────────────────── */
      :host([type='inline']) {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        min-width: 420px;
      }

      :host([type='inline']) .field {
        flex: 1;
        min-width: 0;
      }

      /* ── Field wrapper ─────────────────────────────────────────────── */
      .field {
        display: flex;
        flex-direction: column;
      }

      /* ── Trigger wrapper ──────────────────────────────────────────── */
      .trigger {
        display: flex;
        align-items: flex-start;
        padding: var(--ds-spacing-spacing-02) var(--ds-spacing-spacing-04); /* 4px 8px */
        background: var(--ds-background-input-default);
        border: none;
        border-bottom: 1px solid var(--ds-border-border-bold);
        width: 100%;
        box-sizing: border-box;
        transition: background 80ms ease;
      }

      .trigger:hover {
        background: var(--ds-background-input-hovered);
        border-bottom-color: var(--ds-border-border-bolder);
      }

      /* ── Textarea ─────────────────────────────────────────────────── */
      .textarea {
        flex: 1;
        min-width: 0;
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        /* Default: no resize — grows via field-sizing */
        resize: none;
        overflow: auto;
        /* Grows with content between min and max */
        min-height: 56px;
        max-height: 192px;
        field-sizing: content;
        color: var(--ds-text-text-default);
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
      }

      .textarea::placeholder {
        color: var(--ds-text-text-subtlest);
      }

      /* ── Resize variants ──────────────────────────────────────────────
         Vertical: straightforward — the host stays block/width:100%,
         only the height axis moves.

         Horizontal / both: width:100% on the textarea (and flex:1) stops
         the browser from applying the horizontal drag delta. The fix is to
         make the host inline-block so it shrink-wraps, the field
         inline-flex so the footer tracks the trigger width, and the
         trigger width:auto so it follows the textarea. overflow:hidden
         (never visible) clips any accidental overflow instead of spilling
         content out of the component.
      ──────────────────────────────────────────────────────────────────── */

      /* Vertical ─────────────────────────────────────────────────────── */
      :host([resize='vertical']) .textarea {
        resize: vertical;
        max-height: none;
      }

      /* Horizontal ───────────────────────────────────────────────────── */
      :host([resize='horizontal']) {
        display: inline-block;
      }

      :host([resize='horizontal']) .field {
        display: inline-flex;
      }

      :host([resize='horizontal']) .trigger {
        width: auto;
        overflow: hidden;
      }

      :host([resize='horizontal']) .textarea {
        resize: horizontal;
        flex: none;
        width: 200px;
        min-width: 100px;
        min-height: 56px;
        max-height: 56px;
        field-sizing: fixed;
      }

      /* Both axes ────────────────────────────────────────────────────── */
      :host([resize='both']) {
        display: inline-block;
      }

      :host([resize='both']) .field {
        display: inline-flex;
      }

      :host([resize='both']) .trigger {
        width: auto;
        overflow: hidden;
      }

      :host([resize='both']) .textarea {
        resize: both;
        flex: none;
        width: 200px;
        min-width: 100px;
        max-height: none;
        field-sizing: fixed;
      }

      /* ── Focus: applied to .trigger when textarea inside is focused ─ */
      .trigger:focus-within {
        border-bottom-color: var(--ds-focus-focus);
        background: var(--ds-background-input-default);
        outline: none;
      }

      /* ── Validation states ────────────────────────────────────────── */
      :host([invalid]) .trigger {
        border-bottom-color: var(--ds-border-border-danger);
      }

      :host([valid]) .trigger {
        border-bottom-color: var(--ds-border-border-success);
      }

      /* Focused overrides validation border only when not in error/success */
      :host(:not([invalid]):not([valid])) .trigger:focus-within {
        border-bottom-color: var(--ds-focus-focus);
      }

      /* ── Disabled ─────────────────────────────────────────────────── */
      :host([disabled]) .trigger {
        background: var(--ds-background-input-disabled);
        border-bottom-color: var(--ds-border-border-disabled);
        pointer-events: none;
        cursor: not-allowed;
      }

      :host([disabled]) .textarea {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .textarea::placeholder {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .label-el {
        color: var(--ds-text-text-disabled);
      }

      /* ── Readonly ─────────────────────────────────────────────────── */
      :host([readonly]) .trigger {
        border-bottom-color: var(--ds-border-border-default);
      }

      :host([readonly]) .textarea {
        cursor: default;
        resize: none;
      }

      /* ── Footer: message + optional char count in same row ─────────── */
      .footer {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        width: 100%;
      }

      .footer ds-form-message {
        flex: 1 0 0;
        min-width: 1px;
      }

      .char-count {
        flex-shrink: 0;
        padding-top: var(--ds-spacing-spacing-04);
        padding-left: var(--ds-spacing-spacing-04);
        color: var(--ds-text-text-subtle);
        white-space: nowrap;
      }
    `,
  ];

  /** Label text above / beside the control. */
  @property({ type: String, reflect: true })
  label = '';

  /** Appends a red asterisk to the label. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** `stacked` — label above; `inline` — 180px label to the left. */
  @property({ type: String, reflect: true })
  type: DsTextAreaType = 'stacked';

  /** Current string value. */
  @property({ type: String, reflect: true })
  value = '';

  /** Placeholder text shown when no value is set. */
  @property({ type: String, reflect: true })
  placeholder = '';

  /** Helper text shown below the control in the default state. */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = '';

  /** Error message shown when invalid=true. */
  @property({ type: String, reflect: true, attribute: 'error-message' })
  errorMessage = 'Error message';

  /** Success message shown when valid=true. */
  @property({ type: String, reflect: true, attribute: 'success-message' })
  successMessage = 'Success message';

  /** Triggers error styling + shows error message. */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /** Triggers success styling + shows success message. */
  @property({ type: Boolean, reflect: true })
  valid = false;

  /** Disables the entire control. */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Makes the textarea read-only. */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** Maximum character length; also drives the `n/max` count display. */
  @property({ type: Number, reflect: true })
  maxlength: number | null = null;

  /** Shows a character count in the footer row alongside the message. */
  @property({ type: Boolean, reflect: true, attribute: 'has-count' })
  hasCount = false;

  /** Controls the resize handle. `none` disables it (default). */
  @property({ type: String, reflect: true })
  resize: DsTextAreaResize = 'none';

  @state() private _charCount = 0;

  private _onInput(e: InputEvent) {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    this._charCount = ta.value.length;
    dispatch(this, 'ds-input', { value: ta.value, originalEvent: e });
  }

  private _onChange(e: Event) {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    dispatch(this, 'ds-change', { value: ta.value });
  }

  private _onFocus(e: FocusEvent) {
    dispatch(this, 'ds-focus', { originalEvent: e });
  }

  private _onBlur(e: FocusEvent) {
    dispatch(this, 'ds-blur', { originalEvent: e });
  }

  private _countLabel() {
    return this.maxlength !== null
      ? `${this._charCount}/${this.maxlength}`
      : `${this._charCount}`;
  }

  render() {
    const isInline = this.type === 'inline';

    // Resolve message state
    let msgType: 'helper' | 'error' | 'success' = 'helper';
    let msgText = '';
    let hasMessage = false;

    if (this.invalid) {
      msgType = 'error';
      msgText = this.errorMessage;
      hasMessage = true;
    } else if (this.valid && !this.invalid) {
      msgType = 'success';
      msgText = this.successMessage;
      hasMessage = true;
    } else if (this.helperText) {
      msgType = 'helper';
      msgText = this.helperText;
      hasMessage = true;
    }

    const labelEl = this.label
      ? html`
          <ds-form-label
            class="label-el"
            label=${this.label}
            ?is-required=${this.isRequired}
            type=${isInline ? 'inline' : 'stacked'}
            style=${isInline
              ? '--ds-form-label-padding-top: var(--ds-spacing-spacing-02);'
              : nothing}
          ></ds-form-label>
        `
      : nothing;

    const messageEl = hasMessage
      ? html`
          <ds-form-message
            type=${msgType}
            helper-text=${msgType === 'helper' ? msgText : ''}
            error-text=${msgType === 'error' ? msgText : ''}
            success-text=${msgType === 'success' ? msgText : ''}
          ></ds-form-message>
        `
      : nothing;

    const countEl = this.hasCount
      ? html`<span class="char-count text-helper-helper-regular">${this._countLabel()}</span>`
      : nothing;

    const footerEl =
      hasMessage || this.hasCount
        ? html`<div class="footer">${messageEl}${countEl}</div>`
        : nothing;

    const fieldEl = html`
      <div class="field">
        <div class="trigger" part="trigger">
          <textarea
            class="textarea text-regular-body-md"
            .value=${live(this.value)}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            maxlength=${this.maxlength !== null ? this.maxlength : nothing}
            aria-label=${this.label || 'Text area'}
            aria-invalid=${this.invalid ? 'true' : nothing}
            aria-multiline="true"
            @input=${this._onInput}
            @change=${this._onChange}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          ></textarea>
        </div>
        ${footerEl}
      </div>
    `;

    return html`${labelEl}${fieldEl}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-text-area': DsTextArea;
  }
}
