import { LitElement } from 'lit';
export type DsIconSize = 'sm' | 'md' | 'lg';
export type DsIconStyle = 'outlined' | 'rounded' | 'sharp';
export type DsIconResolver = (name: string, iconStyle: DsIconStyle) => Promise<string>;
export declare function setIconResolver(resolver: DsIconResolver): void;
export declare function createMaterialSymbolsResolver(iconStyle?: DsIconStyle): DsIconResolver;
export declare class DsIcon extends LitElement {
    static styles: import("lit").CSSResult[];
    name: string;
    size: DsIconSize;
    iconStyle: DsIconStyle;
    fill: boolean;
    private _svg;
    updated(changed: Map<string, unknown>): void;
    private _load;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-icon': DsIcon;
    }
}
//# sourceMappingURL=ds-icon.d.ts.map