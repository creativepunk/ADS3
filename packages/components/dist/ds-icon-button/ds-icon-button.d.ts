import { LitElement } from 'lit';
import '../ds-tooltip/ds-tooltip.js';
import type { DsTooltipAlign } from '../ds-tooltip/ds-tooltip.js';
export type DsIconButtonVariant = 'primary' | 'tertiary' | 'ghost';
export type DsIconButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type DsIconButtonShape = 'default' | 'circle';
export type { DsTooltipAlign };
export declare class DsIconButton extends LitElement {
    static styles: import("lit").CSSResult[];
    variant: DsIconButtonVariant;
    size: DsIconButtonSize;
    shape: DsIconButtonShape;
    isDisabled: boolean;
    isSelected: boolean;
    ariaLabel: string | null;
    /** Label text for the built-in tooltip. The tooltip only renders when this is set AND isTooltipDisabled is false. */
    tooltip: string;
    /** Hides the built-in tooltip. Defaults to true — opt in by setting this to false. */
    isTooltipDisabled: boolean;
    /** Alignment of the built-in tooltip relative to the button. Defaults to 'bottom'. */
    tooltipAlign: DsTooltipAlign;
    private _handleClick;
    private _button;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'ds-icon-button': DsIconButton;
    }
}
//# sourceMappingURL=ds-icon-button.d.ts.map