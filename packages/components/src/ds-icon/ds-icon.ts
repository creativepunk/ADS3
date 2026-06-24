import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { resetStyles } from '../shared/styles.js';

export type DsIconSize = 'sm' | 'md' | 'lg';
export type DsIconStyle = 'outlined' | 'rounded' | 'sharp';

// A resolver receives the resolved icon name (fill suffix already applied) and
// the icon style, and returns the raw SVG string. Register one at app startup
// via setIconResolver() before any <ds-icon> elements render.
export type DsIconResolver = (name: string, iconStyle: DsIconStyle) => Promise<string>;

let _resolver: DsIconResolver | null = null;
const _cache = new Map<string, string>();

export function setIconResolver(resolver: DsIconResolver): void {
  _resolver = resolver;
}

// Convenience factory for Vite consumers using @material-symbols/svg-400.
// Call once at app / Storybook preview startup:
//   setIconResolver(createMaterialSymbolsResolver())
//
// Uses fetch() rather than dynamic import() because dynamic bare specifiers
// (e.g. `@scope/pkg/${name}.svg`) are not rewritten by Vite — the browser
// receives them as-is and throws a "Failed to resolve module specifier" error.
// fetch() constructs the URL from import.meta.url, which Vite resolves
// to the correct dev-server origin, so node_modules files are served directly.
const _moduleUrl = import.meta.url;

export function createMaterialSymbolsResolver(
  iconStyle: DsIconStyle = 'outlined',
): DsIconResolver {
  return async (name: string): Promise<string> => {
    const url = new URL(
      `../../node_modules/@material-symbols/svg-400/${iconStyle}/${name}.svg`,
      _moduleUrl,
    ).href;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`@material-symbols/svg-400: icon "${name}" not found (${resp.status})`);
    return resp.text();
  };
}

// Material Symbols ships at 48px native size (viewBox "0 -960 960 960").
// Google's minimum supported optical size is 20px, so we reset the SVG's
// intrinsic dimensions to 20 — the smallest size the paths are designed for.
// CSS then scales from this 20px base: sm (16px) is a 0.8× step down,
// md (20px) is 1:1, lg (24px) is a 1.2× step up.
function normalizeSvg(raw: string): string {
  return raw
    .replace(/ width="\d+"/, ' width="20"')
    .replace(/ height="\d+"/, ' height="20"');
}

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
        width: var(--ds-type-scale-y3);   /* 20px — md default */
        height: var(--ds-type-scale-y3);
        color: inherit;
        flex-shrink: 0;
      }

      :host([size='sm']) {
        width: var(--ds-spacing-spacing-06);  /* 16px */
        height: var(--ds-spacing-spacing-06);
      }
      :host([size='md']),
      :host(:not([size])) {
        width: var(--ds-type-scale-y3);       /* 20px */
        height: var(--ds-type-scale-y3);
      }
      :host([size='lg']) {
        width: var(--ds-type-scale-y4);       /* 24px */
        height: var(--ds-type-scale-y4);
      }

      /* Loaded Material Symbol SVG */
      .icon-svg {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      .icon-svg svg {
        width: 100%;
        height: 100%;
        display: block;
        fill: currentColor;
      }

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

  // Attribute is icon-style to avoid colliding with the built-in style attr.
  @property({ type: String, attribute: 'icon-style' })
  iconStyle: DsIconStyle = 'outlined';

  // When true, loads the -fill variant (e.g. add-fill.svg).
  @property({ type: Boolean, reflect: true })
  fill = false;

  @state() private _svg = '';

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('name') || changed.has('iconStyle') || changed.has('fill')) {
      void this._load();
    }
  }

  private async _load(): Promise<void> {
    if (!this.name || !_resolver) {
      this._svg = '';
      return;
    }
    const iconName = this.fill ? `${this.name}-fill` : this.name;
    const cacheKey = `${this.iconStyle}:${iconName}`;
    if (_cache.has(cacheKey)) {
      this._svg = _cache.get(cacheKey)!;
      return;
    }
    try {
      const raw = await _resolver(iconName, this.iconStyle);
      const normalized = normalizeSvg(raw);
      _cache.set(cacheKey, normalized);
      this._svg = normalized;
    } catch (err) {
      console.error(`[ds-icon] failed to load "${iconName}":`, err);
      this._svg = '';
    }
  }

  render() {
    if (this.name && this._svg) {
      return html`<span class="icon-svg" aria-hidden="true">${unsafeHTML(this._svg)}</span>`;
    }
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ds-icon': DsIcon;
  }
}
