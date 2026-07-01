import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';

export type DsFieldInputLayoutType = 'default' | 'inline';

/** @tagname ds-field-input */
@customElement('ds-field-input')
export class DsFieldInput extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      /* ── Inline layout ─────────────────────────────────────────── */
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

      /* ── Field wrapper ─────────────────────────────────────────── */
      .field {
        display: flex;
        flex-direction: column;
      }
    `,
  ];

  /** Label text above / beside the control. */
  @property({ type: String, reflect: true })
  label = '';

  /** Appends a red asterisk to the label. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** `default` — stacked label above; `inline` — 180px label to the left. */
  @property({ type: String, reflect: true })
  type: DsFieldInputLayoutType = 'default';

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

  /** Passed through to aria-disabled on the wrapper (no visual effect here). */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Passed through for aria-readonly on the wrapper. */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  private _messageType() {
    if (this.invalid) return 'error' as const;
    if (this.valid) return 'success' as const;
    return 'helper' as const;
  }

  private _messageText() {
    if (this.invalid) return this.errorMessage;
    if (this.valid) return this.successMessage;
    return this.helperText;
  }

  render() {
    const isInline = this.type === 'inline';
    const hasMessage = this.helperText || this.invalid || this.valid;
    const msgType = this._messageType();
    const msgText = this._messageText();

    const labelEl = this.label
      ? html`
          <ds-form-label
            label=${this.label}
            ?is-required=${this.isRequired}
            type=${isInline ? 'inline' : 'stacked'}
            style=${isInline
              ? '--ds-form-label-padding-top: var(--ds-spacing-spacing-04);'
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

    return html`
      ${labelEl}
      <div class="field">
        <slot></slot>
        ${messageEl}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-field-input': DsFieldInput;
  }
}
