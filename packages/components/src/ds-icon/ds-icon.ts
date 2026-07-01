import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { resetStyles } from '../shared/styles.js';

export type DsIconSize = 'sm' | 'md' | 'lg';
export type DsIconStyle = 'outlined' | 'rounded' | 'sharp';

// Kept for backwards compatibility — no longer used internally.
export type DsIconResolver = (name: string, iconStyle: DsIconStyle) => Promise<string>;

/** @deprecated No longer needed — ds-icon uses the variable font directly. */
export function setIconResolver(_resolver: DsIconResolver): void {}

/** @deprecated No longer needed — ds-icon uses the variable font directly. */
export function createMaterialSymbolsResolver(
  _iconStyle?: DsIconStyle,
): DsIconResolver {
  return async () => '';
}

// opsz axis value per display size:
//   sm (16px) → 20  (Google minimum optical size)
//   md (20px) → 24
//   lg (24px) → 48
const OPSZ: Record<DsIconSize, number> = { sm: 20, md: 24, lg: 48 };
const PX: Record<DsIconSize, string> = {
  sm: 'var(--ds-spacing-spacing-06)',   /* 16px */
  md: 'var(--ds-type-scale-y3)',        /* 20px */
  lg: 'var(--ds-type-scale-y4)',        /* 24px */
};

/** @tagname ds-icon */
@customElement('ds-icon')
export class DsIcon extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--ds-type-scale-y3);
        height: var(--ds-type-scale-y3);
        color: inherit;
        flex-shrink: 0;
      }

      :host([size='sm']) { width: var(--ds-spacing-spacing-06); height: var(--ds-spacing-spacing-06); }
      :host([size='md']), :host(:not([size])) { width: var(--ds-type-scale-y3); height: var(--ds-type-scale-y3); }
      :host([size='lg']) { width: var(--ds-type-scale-y4); height: var(--ds-type-scale-y4); }

      .icon-font {
        font-family: 'Material Symbols Outlined';
        font-weight: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        font-feature-settings: 'liga';
        /* font-size drives ligature glyph dimensions — match the host size */
        font-size: inherit;
        /* filled via CSS property so fill toggling doesn't need JS */
        color: inherit;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        user-select: none;
      }

      :host([icon-style='rounded']) .icon-font { font-family: 'Material Symbols Rounded'; }
      :host([icon-style='sharp']) .icon-font   { font-family: 'Material Symbols Sharp'; }

      /* Custom icon via default slot */
      ::slotted(svg),
      ::slotted(img) {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ];

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, reflect: true })
  size: DsIconSize = 'md';

  @property({ type: String, attribute: 'icon-style', reflect: true })
  iconStyle: DsIconStyle = 'outlined';

  @property({ type: Boolean, reflect: true })
  fill = false;

  render() {
    if (!this.name) {
      return html`<slot></slot>`;
    }

    const opsz = OPSZ[this.size] ?? 24;
    const px = PX[this.size] ?? PX.md;
    const fillVal = this.fill ? 1 : 0;
    const variationSettings = `'FILL' ${fillVal}, 'wght' 400, 'GRAD' 0, 'opsz' ${opsz}`;

    return html`
      <span
        class="icon-font"
        aria-hidden="true"
        style="font-variation-settings: ${variationSettings}; font-size: ${px};"
      >${this.name}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-icon': DsIcon;
  }
}
