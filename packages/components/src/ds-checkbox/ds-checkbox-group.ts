import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles } from '../shared/styles.js';
import '../ds-form-label/ds-form-label.js';
import '../ds-form-message/ds-form-message.js';
import './ds-checkbox.js';

export type DsCheckboxGroupOrientation = 'vertical' | 'horizontal';
export type DsCheckboxGroupType = 'default' | 'inline';

/** @tagname ds-checkbox-group */
@customElement('ds-checkbox-group')
export class DsCheckboxGroup extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      /* ── Values container ────────────────────────────────────────────────── */
      .values {
        display: flex;
        flex-direction: column;
        gap: var(--ds-spacing-spacing-04); /* 8px vertical gap between items */
      }

      :host([orientation='horizontal']) .values {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--ds-spacing-spacing-04);
      }

      /* inline type: items have no extra gap beyond the natural inline gap */
      :host([type='inline'][orientation='horizontal']) .values {
        gap: var(--ds-spacing-spacing-04);
      }

      :host([type='inline'][orientation='vertical']) .values {
        gap: var(--ds-spacing-spacing-04);
      }

      /* ── State pass-through via CSS — reacts to property changes instantly ── */
      :host([is-disabled]) ::slotted(ds-checkbox) {
        pointer-events: none;
      }

      :host([is-read-only]) ::slotted(ds-checkbox) {
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

  /** Disables all child checkboxes. */
  @property({ type: Boolean, reflect: true, attribute: 'is-disabled' })
  isDisabled = false;

  /** Makes all child checkboxes read-only. */
  @property({ type: Boolean, reflect: true, attribute: 'is-read-only' })
  isReadOnly = false;

  /** Lays items out horizontally or vertically. */
  @property({ type: String, reflect: true })
  orientation: DsCheckboxGroupOrientation = 'vertical';

  /** `default` = standard spacing; `inline` = compact, same layout rules. */
  @property({ type: String, reflect: true })
  type: DsCheckboxGroupType = 'default';

  /** Helper text shown below the group when there is no error. */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText = 'Optional helper text';

  /** Error text shown below the group when hasError is true. */
  @property({ type: String, reflect: true, attribute: 'error-text' })
  errorText = 'Field is required';

  /** HTML form field name propagated to all child checkboxes. */
  @property({ type: String, reflect: true })
  name = '';

  private _getCheckboxes(): Element[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) return [];
    return slot
      .assignedElements({ flatten: true })
      .filter((el) => el.tagName.toLowerCase() === 'ds-checkbox');
  }

  private _syncChildren() {
    this._getCheckboxes().forEach((el) => {
      el.toggleAttribute('has-error', this.hasError);
      el.toggleAttribute('is-disabled', this.isDisabled);
      el.toggleAttribute('is-read-only', this.isReadOnly);
      if (this.name) el.setAttribute('name', this.name);
    });
  }

  override updated() {
    this._syncChildren();
  }

  private _onSlotChange = () => {
    this._syncChildren();
  };

  render() {
    const messageType = this.hasError ? 'error' : 'helper';

    return html`
      ${this.label
        ? html`
            <ds-form-label
              label=${this.label}
              ?is-required=${this.isRequired}
              ?has-info-tip=${this.hasInfoTip}
            ></ds-form-label>
          `
        : nothing}

      <div
        class="values"
        role="group"
        aria-label=${this.label || nothing}
        aria-disabled=${this.isDisabled ? 'true' : nothing}
        aria-readonly=${this.isReadOnly ? 'true' : nothing}
      >
        <slot @slotchange=${this._onSlotChange}></slot>
      </div>

      <ds-form-message
        type=${messageType}
        helper-text=${this.helperText}
        error-text=${this.errorText}
      ></ds-form-message>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-checkbox-group': DsCheckboxGroup;
  }
}
