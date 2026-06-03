var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { resetStyles } from '../shared/styles.js';
let _resolver = null;
const _cache = new Map();
export function setIconResolver(resolver) {
    _resolver = resolver;
}
// Convenience factory for Vite consumers using @material-symbols/svg-400.
// Call once at app / Storybook preview startup:
//   setIconResolver(createMaterialSymbolsResolver())
export function createMaterialSymbolsResolver(iconStyle = 'outlined') {
    return async (name, _iconStyle) => {
        const mod = await import(
        /* @vite-ignore */
        `@material-symbols/svg-400/${iconStyle}/${name}.svg?raw`);
        return mod.default;
    };
}
// Material Symbols ships at 48px native size (viewBox "0 -960 960 960").
// Google's minimum supported optical size is 20px, so we reset the SVG's
// intrinsic dimensions to 20 — the smallest size the paths are designed for.
// CSS then scales from this 20px base: sm (16px) is a 0.8× step down,
// md (20px) is 1:1, lg (24px) is a 1.2× step up.
function normalizeSvg(raw) {
    return raw
        .replace(/ width="\d+"/, ' width="20"')
        .replace(/ height="\d+"/, ' height="20"');
}
let DsIcon = class DsIcon extends LitElement {
    constructor() {
        super(...arguments);
        this.name = '';
        this.size = 'md';
        // Attribute is icon-style to avoid colliding with the built-in style attr.
        this.iconStyle = 'outlined';
        // When true, loads the -fill variant (e.g. add-fill.svg).
        this.fill = false;
        this._svg = '';
    }
    updated(changed) {
        if (changed.has('name') || changed.has('iconStyle') || changed.has('fill')) {
            void this._load();
        }
    }
    async _load() {
        if (!this.name || !_resolver) {
            this._svg = '';
            return;
        }
        const iconName = this.fill ? `${this.name}-fill` : this.name;
        const cacheKey = `${this.iconStyle}:${iconName}`;
        if (_cache.has(cacheKey)) {
            this._svg = _cache.get(cacheKey);
            return;
        }
        try {
            const raw = await _resolver(iconName, this.iconStyle);
            const normalized = normalizeSvg(raw);
            _cache.set(cacheKey, normalized);
            this._svg = normalized;
        }
        catch {
            this._svg = '';
        }
    }
    render() {
        if (this.name && this._svg) {
            return html `<span class="icon-svg" aria-hidden="true">${unsafeHTML(this._svg)}</span>`;
        }
        return html `<slot></slot>`;
    }
};
DsIcon.styles = [
    resetStyles,
    css `
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
__decorate([
    property({ type: String, reflect: true })
], DsIcon.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], DsIcon.prototype, "size", void 0);
__decorate([
    property({ type: String, attribute: 'icon-style' })
], DsIcon.prototype, "iconStyle", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], DsIcon.prototype, "fill", void 0);
__decorate([
    state()
], DsIcon.prototype, "_svg", void 0);
DsIcon = __decorate([
    customElement('ds-icon')
], DsIcon);
export { DsIcon };
//# sourceMappingURL=ds-icon.js.map