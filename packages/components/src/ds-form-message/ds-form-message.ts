import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import '../ds-icon/ds-icon.js';

export type DsFormMessageType = 'helper' | 'error' | 'success';

/** @tagname ds-form-message */
@customElement('ds-form-message')
export class DsFormMessage extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-04);
        padding-top: var(--ds-spacing-spacing-04);
      }

      /* Helper has no gap (no icon) */
      :host([type='helper']) {
        gap: 0;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      :host([type='error']) .icon {
        color: var(--ds-icon-icon-danger);
      }

      :host([type='success']) .icon {
        color: var(--ds-icon-icon-success);
      }

      /* Hide icon slot in helper mode */
      :host([type='helper']) .icon {
        display: none;
      }

      .text {
        flex: 1 0 0;
        min-width: 1px;
        font-feature-settings: 'cv06' 1, 'zero' 1, 'cv05' 1;
        word-break: break-word;
      }

      :host([type='error']) .text,
      :host(:not([type])) .text {
        color: var(--ds-text-text-danger);
      }

      :host([type='success']) .text {
        color: var(--ds-text-text-success);
      }

      :host([type='helper']) .text {
        color: var(--ds-text-text-subtlest);
      }
    `,
  ];

  /** Visual and semantic type — controls which text prop is displayed. */
  @property({ type: String, reflect: true })
  type: DsFormMessageType = 'error';

  /** Text shown when type="helper". */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = '';

  /** Text shown when type="error". */
  @property({ type: String, reflect: true, attribute: 'error-text' })
  errorText = '';

  /** Text shown when type="success". */
  @property({ type: String, reflect: true, attribute: 'success-text' })
  successText = '';

  private get _resolvedText() {
    if (this.type === 'helper') return this.helperText;
    if (this.type === 'success') return this.successText;
    return this.errorText;
  }

  render() {
    const showIcon = this.type === 'error' || this.type === 'success';
    const iconName = this.type === 'error' ? 'error' : 'check_circle';
    const ariaLive = this.type === 'helper' ? nothing : 'polite';
    const text = this._resolvedText;

    return html`
      ${showIcon
        ? html`
            <span class="icon" aria-hidden="true">
              <ds-icon name=${iconName} size="sm"></ds-icon>
            </span>
          `
        : nothing}
      <span class="text text-helper-helper-regular" role="status" aria-live=${ariaLive}>
        ${text ? text : html`<slot></slot>`}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-form-message': DsFormMessage;
  }
}
