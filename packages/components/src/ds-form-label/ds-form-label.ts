import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';
import '../ds-icon/ds-icon.js';

export type DsFormLabelType = 'stacked' | 'inline';

/** @tagname ds-form-label */
@customElement('ds-form-label')
export class DsFormLabel extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      /* ── Stacked (default) ───────────────────────────────────────────────
         Top-left aligned, 8px bottom padding so the field sits below it. */
      :host {
        display: block;
        padding-bottom: var(--ds-spacing-spacing-04); /* 8px */
      }

      /* ── Inline ──────────────────────────────────────────────────────────
         Fixed 180px, center-left aligned.
         --ds-form-label-padding-top lets parent form components override
         the top padding to optically center against their field height:
           checkbox group  → 4px  (24px field, 16px text: (24-16)/2 = 4px)
           text field/select → 8px (32px field, 16px text: (32-16)/2 = 8px)
      */
      :host([type='inline']) {
        width: 180px;
        flex-shrink: 0;
        padding-bottom: 0;
        padding-top: var(--ds-form-label-padding-top, var(--ds-spacing-spacing-04)); /* default 8px */
        align-self: flex-start;
      }

      label {
        display: block;
        width: 100%;
        cursor: default;
      }

      /*
       * .label-text and .required-mark are plain inline spans so the * sits
       * exactly 2px after the last character — not the text box edge.
       * The block label container provides the width for text to wrap into.
       */
      .label-text {
        color: var(--ds-text-text-subtle);
      }

      .required-mark {
        margin-left: var(--ds-spacing-spacing-01); /* 2px — hugs text end */
        color: var(--ds-text-text-danger);
      }

      .info-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        margin-left: var(--ds-spacing-spacing-02); /* 4px gap after text+* */
        color: var(--ds-icon-icon-subtle);
      }
    `,
  ];

  /** Label text. Alternatively use the default slot. */
  @property({ type: String, reflect: true })
  label = '';

  /** Appends a red asterisk to mark the field as required. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** Shows a small info icon after the label text. */
  @property({ type: Boolean, reflect: true, attribute: 'has-info-tip' })
  hasInfoTip = false;

  /**
   * stacked — grows to fill the parent container (default).
   * inline  — fixed 180px width, for side-by-side form layouts.
   */
  @property({ type: String, reflect: true })
  type: DsFormLabelType = 'stacked';

  /** Associates this label with a form control via its id. */
  @property({ type: String, reflect: true })
  for = '';

  render() {
    const labelContent = this.label ? this.label : html`<slot></slot>`;

    return html`
      <label for=${this.for || nothing}>
        <span class="label-text text-regular-body-sm">${labelContent}</span>${this.isRequired
          ? html`<span class="required-mark text-medium-body-sm" aria-hidden="true">*</span>`
          : nothing}${this.hasInfoTip
          ? html`<span class="info-icon" aria-label="More information"><ds-icon name="info" size="sm"></ds-icon></span>`
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
