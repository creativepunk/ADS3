import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { resetStyles, typographyBaseStyles, typographyStyles } from '../shared/styles.js';

/**
 * Section label for use inside <ds-action-menu>, <ds-single-select-menu>,
 * or <ds-multi-select-menu>.
 */
/** @tagname ds-menu-category */
@customElement('ds-menu-category')
export class DsMenuCategory extends LitElement {
  static styles = [
    resetStyles,
    typographyBaseStyles,
    typographyStyles,
    css`
      :host {
        display: block;
      }

      .label {
        display: block;
        padding: var(--ds-spacing-spacing-04) var(--ds-spacing-spacing-06)
          var(--ds-spacing-spacing-02);
        color: var(--ds-text-text-subtlest);
        font-feature-settings: 'cv06' 1;
        white-space: nowrap;
      }
    `,
  ];

  render() {
    return html`<span class="label text-helper-helper-regular"><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-menu-category': DsMenuCategory;
  }
}
