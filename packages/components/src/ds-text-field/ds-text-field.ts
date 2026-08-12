import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import {
  resetStyles,
  typographyBaseStyles,
  typographyStyles,
} from '../shared/styles.js';
import { dispatch } from '../shared/events.js';
import '../ds-field-input/ds-field-input.js';

export type DsTextFieldType = 'stacked' | 'inline';

/** @tagname ds-text-field */
@customElement('ds-text-field')
export class DsTextField extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
      }

      /* ── Trigger wrapper ──────────────────────────────────────────── */
      .trigger {
        display: flex;
        align-items: center;
        height: 32px;
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

      /* ── Input ────────────────────────────────────────────────────── */
      .input {
        flex: 1;
        min-width: 0;
        background: transparent;
        border: none;
        outline: none;
        padding: 0;
        color: var(--ds-text-text-default);
        font-family: var(--ds-typography-cozy-regular-body-md-font-family);
        font-size: var(--ds-typography-cozy-regular-body-md-font-size);
        font-weight: var(--ds-typography-cozy-regular-body-md-font-weight);
        line-height: var(--ds-typography-cozy-regular-body-md-line-height, 20px);
        letter-spacing: var(--ds-typography-cozy-regular-body-md-letter-spacing, 0.16px);
        font-feature-settings: 'cv05' 1, 'cv08' 1, 'zero' 1;
      }

      .input::placeholder {
        color: var(--ds-text-text-subtlest);
      }

      /* ── Focus: applied to .trigger when input inside is focused ─── */
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

      /* Focused overrides validation border only if not in error/success */
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

      :host([disabled]) .input {
        color: var(--ds-text-text-disabled);
      }

      :host([disabled]) .input::placeholder {
        color: var(--ds-text-text-disabled);
      }

      /* ── Readonly ─────────────────────────────────────────────────── */
      :host([readonly]) .trigger {
        border-bottom-color: var(--ds-border-border-default);
      }

      :host([readonly]) .input {
        cursor: default;
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
  type: DsTextFieldType = 'stacked';

  /** Current string value. */
  @property({ type: String, reflect: true })
  value = '';

  /** Placeholder text shown when no value is set. */
  @property({ type: String, reflect: true })
  placeholder = '';

  /** Helper text shown below the control. */
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

  /** Makes the input read-only. */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /** HTML input type — text, email, password, url, search, tel, etc. */
  @property({ type: String, reflect: true, attribute: 'input-type' })
  inputType = 'text';

  /** Maximum character length. */
  @property({ type: Number, reflect: true })
  maxlength: number | null = null;

  /** Minimum character length. */
  @property({ type: Number, reflect: true })
  minlength: number | null = null;

  /** Autocomplete hint for the browser. */
  @property({ type: String, reflect: true })
  autocomplete = '';

  private _onInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    dispatch(this, 'ds-input', { value: input.value, originalEvent: e });
  }

  private _onChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    dispatch(this, 'ds-change', { value: input.value });
  }

  private _onFocus(e: FocusEvent) {
    dispatch(this, 'ds-focus', { originalEvent: e });
  }

  private _onBlur(e: FocusEvent) {
    dispatch(this, 'ds-blur', { originalEvent: e });
  }

  render() {
    return html`
      <ds-field-input
        label=${this.label || nothing}
        ?is-required=${this.isRequired}
        type=${this.type}
        helper-text=${!this.invalid && !this.valid ? (this.helperText || nothing) : nothing}
        error-message=${this.errorMessage}
        success-message=${this.valid ? this.successMessage : nothing}
        ?invalid=${this.invalid}
        ?valid=${this.valid && !this.invalid}
        ?disabled=${this.disabled}
      >
        <div class="trigger" part="trigger">
          <input
            class="input text-regular-body-md"
            .type=${this.inputType}
            .value=${live(this.value)}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            maxlength=${this.maxlength !== null ? this.maxlength : nothing}
            minlength=${this.minlength !== null ? this.minlength : nothing}
            autocomplete=${this.autocomplete || nothing}
            aria-label=${this.label || 'Text field'}
            aria-invalid=${this.invalid ? 'true' : nothing}
            @input=${this._onInput}
            @change=${this._onChange}
            @focus=${this._onFocus}
            @blur=${this._onBlur}
          />
        </div>
      </ds-field-input>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-text-field': DsTextField;
  }
}
