import { LitElement } from 'lit';
export type DsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type DsButtonSize = 'sm' | 'md' | 'lg';
export type DsButtonType = 'button' | 'submit' | 'reset';
export declare class DsButton extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: DsButtonVariant;
    size: DsButtonSize;
    isDisabled: boolean;
    isLoading: boolean;
    isSelected: boolean;
    type: DsButtonType;
    ariaLabel: string | null;
    static formAssociated: boolean;
    private _internals;
    constructor();
    private _hasIconBefore;
    private _hasIconAfter;
    private _onBeforeSlotChange;
    private _onAfterSlotChange;
    private _handleClick;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-button': DsButton;
    }
}
//# sourceMappingURL=ds-button.d.ts.map