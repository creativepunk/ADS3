import * as React from 'react';
import { DsIcon as LitDsIcon, type DsIconSize, type DsIconStyle } from '@my-ds/components/src/ds-icon/ds-icon.js';
export type { DsIconSize, DsIconStyle };
export type DsIconElement = LitDsIcon;
export interface DsIconProps {
    name?: string;
    size?: DsIconSize;
    /** Maps to the `icon-style` HTML attribute. */
    iconStyle?: DsIconStyle;
    fill?: boolean;
    className?: string;
    children?: React.ReactNode;
}
export declare const DsIcon: import("@lit/react").ReactWebComponent<LitDsIcon, {}>;
//# sourceMappingURL=ds-icon.d.ts.map