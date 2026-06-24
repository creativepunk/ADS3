import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import '../ds-icon/ds-icon.js';

/** @tagname ds-form-label */
@customElement('ds-form-label')
export class DsFormLabel extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-01);
        padding-bottom: var(--ds-spacing-spacing-04); /* 8px → 16px row + 8px = 24px total */
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-01);
      }

      .text-group {
        display: inline-flex;
        align-items: center;
        gap: var(--ds-spacing-spacing-01);
      }

      .label-text {
        font-feature-settings: 'cv08' 1, 'cv05' 1, 'zero' 1;
        color: var(--ds-text-text-subtle);
      }

      .required-mark {
        font-feature-settings: 'cv08' 1, 'zero' 1, 'cv05' 1;
        color: var(--ds-text-text-danger);
      }

      .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: var(--ds-icon-icon-subtle);
      }
    `,
  ];

  /** Text content for the label. Alternatively use the default slot. */
  @property({ type: String, reflect: true })
  label = '';

  /** Appends a red asterisk to mark the field as required. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** Shows a small info icon after the label text. */
  @property({ type: Boolean, reflect: true, attribute: 'has-info-tip' })
  hasInfoTip = false;

  /** Associates this label with a form control via its id. Maps to the `for` attribute on an inner <label>. */
  @property({ type: String, reflect: true })
  for = '';

  render() {
    const labelContent = this.label
      ? this.label
      : html`<slot></slot>`;

    return html`
      <label for=${this.for || nothing}>
        <span class="text-group">
          <span class="label-text text-regular-body-sm">${labelContent}</span>
          ${this.isRequired
            ? html`<span class="required-mark text-medium-body-sm" aria-hidden="true">*</span>`
            : nothing}
        </span>
        ${this.hasInfoTip
          ? html`
              <span class="info-icon" aria-label="More information">
                <ds-icon name="info" size="sm"></ds-icon>
              </span>
            `
          : nothing}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-form-label': DsFormLabel;
  }
}
