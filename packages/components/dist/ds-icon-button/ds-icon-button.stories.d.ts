import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-icon-button.js';
import type { DsIconButtonVariant, DsIconButtonSize, DsIconButtonShape, DsTooltipAlign } from './ds-icon-button.js';
interface IconButtonArgs {
    variant: DsIconButtonVariant;
    size: DsIconButtonSize;
    shape: DsIconButtonShape;
    isDisabled: boolean;
    isSelected: boolean;
    ariaLabel: string;
    tooltip: string;
    isTooltipDisabled: boolean;
    tooltipAlign: DsTooltipAlign;
}
declare const meta: Meta<IconButtonArgs>;
export default meta;
type Story = StoryObj<IconButtonArgs>;
export declare const Default: Story;
export declare const Tertiary: Story;
export declare const Ghost: Story;
export declare const Circle: Story;
export declare const Disabled: Story;
export declare const Selected: Story;
export declare const WithTooltip: Story;
export declare const OverrideTooltipProps: Story;
export declare const ShowcaseVariants: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseShapes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-icon-button.stories.d.ts.map