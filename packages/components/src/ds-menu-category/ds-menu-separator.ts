import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';

/** @tagname ds-menu-separator */
@customElement('ds-menu-separator')
export class DsMenuSeparator extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        padding: var(--ds-spacing-spacing-02) 0;
      }

      .line {
        width: 100%;
        height: 1px;
        background: var(--ds-border-border-default);
      }
    `,
  ];

  render() {
    return html`<div class="line" role="separator"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-menu-separator': DsMenuSeparator;
  }
}
