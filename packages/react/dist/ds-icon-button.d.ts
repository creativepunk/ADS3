import * as React from 'react';
import { type EventName } from '@lit/react';
import { DsIconButton as LitDsIconButton, type DsIconButtonVariant, type DsIconButtonSize, type DsIconButtonShape, type DsTooltipAlign } from '@my-ds/components/src/ds-icon-button/ds-icon-button.js';
import type { DsClickEvent } from '@my-ds/components/src/shared/events.js';
export type { DsIconButtonVariant, DsIconButtonSize, DsIconButtonShape, DsTooltipAlign };
export type DsIconButtonElement = LitDsIconButton;
export interface DsIconButtonProps {
    variant?: 'primary' | 'tertiary' | 'ghost';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    shape?: 'default' | 'circle';
    isDisabled?: boolean;
    isSelected?: boolean;
    ariaLabel?: string;
    /** Tooltip label text. The tooltip only renders when this is set and isTooltipDisabled is false. */
    tooltip?: string;
    /** Hides the built-in tooltip. Defaults to true — opt in by setting this to false. */
    isTooltipDisabled?: boolean;
    /** Alignment of the built-in tooltip. Defaults to 'bottom'. */
    tooltipAlign?: DsTooltipAlign;
    className?: string;
    children?: React.ReactNode;
    onDsClick?: (event: DsClickEvent) => void;
}
export declare const DsIconButton: import("@lit/react").ReactWebComponent<LitDsIconButton, {
    onDsClick: EventName<DsClickEvent>;
}>;
//# sourceMappingURL=ds-icon-button.d.ts.map