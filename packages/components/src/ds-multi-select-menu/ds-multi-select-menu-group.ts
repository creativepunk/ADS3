import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';
import '../ds-menu-category/ds-menu-category.js';
import '../ds-menu-category/ds-menu-separator.js';

/**
 * Logical grouping of items inside a <ds-multi-select-menu>.
 *
 * - title — optional section label rendered above the items.
 * - has-separator — automatically set by the parent menu on every group
 *   except the first.
 */
/** @tagname ds-multi-select-menu-group */
@customElement('ds-multi-select-menu-group')
export class DsMultiSelectMenuGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      [role="group"] {
        display: flex;
        flex-direction: column;
      }

      :host([selection-feedback="top"]) ::slotted(ds-multi-select-menu-item[selected]) {
        order: -1;
      }

      :host([selection-feedback="top"]) ::slotted(ds-multi-select-menu-item[data-pinned]),
      :host([selection-feedback="top-after-reopen"]) ::slotted(ds-multi-select-menu-item[data-pinned]) {
        order: -1;
      }
    `,
  ];

  @property({ type: String }) title = '';

  /** Automatically set by <ds-multi-select-menu>. True for every group except the first. */
  @property({ type: Boolean, attribute: 'has-separator' }) hasSeparator = false;

  /** Automatically set by <ds-multi-select-menu> to match its own selectionFeedback. */
  @property({ type: String, attribute: 'selection-feedback' })
  selectionFeedback: 'top' | 'fixed' | 'top-after-reopen' = 'top-after-reopen';

  render() {
    return html`
      ${this.hasSeparator ? html`<ds-menu-separator></ds-menu-separator>` : nothing}
      ${this.title ? html`<ds-menu-category>${this.title}</ds-menu-category>` : nothing}
      <div role="group" aria-label=${this.title || nothing}>
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-multi-select-menu-group': DsMultiSelectMenuGroup;
  }
}
