import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
import './ds-radio.js';
import type { DsRadio } from './ds-radio.js';

export type DsRadioGroupOrientation = 'vertical' | 'horizontal';
export type DsRadioGroupType = 'stacked' | 'inline';

/** @tagname ds-radio-group */
@customElement('ds-radio-group')
export class DsRadioGroup extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      /* ── Inline layout: label sits to the left of the values group ───────── */
      :host([type='inline']) {
        flex-direction: row;
        align-items: flex-start;
        gap: var(--ds-spacing-spacing-04); /* 8px between label and values */
      }

      /* ── Values container ────────────────────────────────────────────────── */
      .values {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-04); /* 8px vertical gap between items */
      }

      :host([option-orientation='horizontal']) .values {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--ds-spacing-spacing-04);
      }

      :host([type='inline'][option-orientation='horizontal']) .values {
        gap: var(--ds-spacing-spacing-04);
      }

      :host([type='inline'][option-orientation='vertical']) .values {
        gap: var(--ds-spacing-spacing-04);
      }

      /* ── Inline value+message wrapper ───────────────────────────────────── */
      .value-message {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex: 1 0 0;
        min-width: 1px;
      }

      /* ── State pass-through via CSS ─────────────────────────────────────── */
      :host([is-disabled]) ::slotted(ds-radio) {
        pointer-events: none;
      }

      :host([is-read-only]) ::slotted(ds-radio) {
        pointer-events: none;
      }
    `,
  ];

  /** Text label for the whole group. */
  @property({ type: String, reflect: true })
  label = '';

  /** Appends a red asterisk to the group label. */
  @property({ type: Boolean, reflect: true, attribute: 'is-required' })
  isRequired = false;

  /** Shows info tip icon on the group label. */
  @property({ type: Boolean, reflect: true, attribute: 'has-info-tip' })
  hasInfoTip = false;

  /** Puts the entire group in an error state. */
  @property({ type: Boolean, reflect: true, attribute: 'has-error' })
  hasError = false;

  /** Disables all child radios. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** Makes all child radios read-only. */
  @property({ type: Boolean, reflect: true, attribute: 'is-read-only' })
  isReadOnly = false;

  /** Lays items out horizontally or vertically. */
  @property({ type: String, reflect: true })
  optionOrientation: DsRadioGroupOrientation = 'vertical';

  /** `default` = standard spacing; `inline` = label sits beside the group. */
  @property({ type: String, reflect: true })
  type: DsRadioGroupType = 'stacked';

  /** Helper text shown below the group when there is no error. */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = 'Optional helper text';

  /** Error text shown below the group when hasError is true. */
  @property({ type: String, reflect: true, attribute: 'error-text' })
  errorText = 'Field is required';

  /** Automatically checks the first radio if none are already checked. */
  @property({ type: Boolean, reflect: true, attribute: 'default-first-selected' })
  defaultFirstSelected = true;

  /** HTML form field name propagated to all child radios. */
  @property({ type: String, reflect: true })
  name = '';

  private _getRadios(): DsRadio[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName.toLowerCase() === 'ds-radio') as DsRadio[];
  }

  private _autoSelectedRadio: DsRadio | null = null;

  private _syncChildren() {
    const radios = this._getRadios();
    radios.forEach((el) => {
      el.toggleAttribute('has-error', this.hasError);
      el.toggleAttribute('is-disabled', this.isDisabled);
      el.toggleAttribute('is-read-only', this.isReadOnly);
      if (this.name) el.setAttribute('name', this.name);
    });
    if (this.defaultFirstSelected) {
      if (radios.length > 0 && !radios.some((el) => el.isChecked)) {
        radios[0].isChecked = true;
        this._autoSelectedRadio = radios[0];
      }
    } else {
      if (this._autoSelectedRadio) {
        this._autoSelectedRadio.isChecked = false;
        this._autoSelectedRadio = null;
      }
    }
  }

  override updated() {
    this._syncChildren();
  }

  private _onSlotChange = () => {
    this._syncChildren();
  };

  // Native radio mutual-exclusion doesn't cross shadow DOM boundaries,
  // so we enforce single-selection manually here.
  private _onRadioChange = (e: Event) => {
    const selected = e.target as DsRadio;
    this._getRadios().forEach((el) => {
      if (el !== selected) el.isChecked = false;
    });
  };

  render() {
    const messageType = this.hasError ? 'error' : 'helper';
    const isInline = this.type === 'inline';

    const label = this.label
      ? html`
          <ds-form-label
            label=${this.label}
            ?is-required=${this.isRequired}
            ?has-info-tip=${this.hasInfoTip}
            type=${isInline ? 'inline' : 'stacked'}
            style=${isInline ? '--ds-form-label-padding-top: var(--ds-spacing-spacing-02); min-height: 24px;' : nothing}
          ></ds-form-label>
        `
      : nothing;

    const values = html`
      <div
        class="values"
        role="radiogroup"
        aria-label=${this.label || nothing}
        aria-disabled=${this.isDisabled ? 'true' : nothing}
        aria-readonly=${this.isReadOnly ? 'true' : nothing}
        @ds-radio-change=${this._onRadioChange}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>
    `;

    const message = html`
      <ds-form-message
        type=${messageType}
        helper-text=${this.helperText}
        error-text=${this.errorText}
      ></ds-form-message>
    `;

    if (isInline) {
      return html`
        ${label}
        <div class="value-message">${values}${message}</div>
      `;
    }

    return html`${label}${values}${message}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-radio-group': DsRadioGroup;
  }
}
