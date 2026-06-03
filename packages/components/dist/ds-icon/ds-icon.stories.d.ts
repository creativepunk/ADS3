import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-icon.js';
import type { DsIconSize, DsIconStyle } from './ds-icon.js';
interface IconArgs {
    name: string;
    size: DsIconSize;
    iconStyle: DsIconStyle;
    fill: boolean;
}
declare const meta: Meta<IconArgs>;
export default meta;
type Story = StoryObj<IconArgs>;
export declare const Default: Story;
export declare const Filled: Story;
export declare const CustomSlot: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStyles: Story;
export declare const ShowcaseFill: Story;
export declare const ShowcaseSwatch: Story;
export declare const ShowcaseInContext: Story;
//# sourceMappingURL=ds-icon.stories.d.ts.map