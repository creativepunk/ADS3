import type { Meta, StoryObj } from '@storybook/web-components';
import './ds-button.js';
import type { DsButtonSize, DsButtonType, DsButtonVariant } from './ds-button.js';
interface ButtonArgs {
    variant: DsButtonVariant;
    size: DsButtonSize;
    type: DsButtonType;
    isDisabled: boolean;
    isLoading: boolean;
    isSelected: boolean;
    ariaLabel?: string;
    label: string;
    showIconBefore: boolean;
    showIconAfter: boolean;
}
declare const meta: Meta<ButtonArgs>;
export default meta;
type Story = StoryObj<ButtonArgs>;
export declare const Default: Story;
export declare const Secondary: Story;
export declare const Tertiary: Story;
export declare const Ghost: Story;
export declare const Danger: Story;
export declare const Disabled: Story;
export declare const Loading: Story;
export declare const Selected: Story;
export declare const FormExample: Story;
export declare const ShowcaseVariants: Story;
export declare const ShowcaseSizes: Story;
export declare const ShowcaseStates: Story;
export declare const ShowcaseLoading: Story;
export declare const ShowcaseSelected: Story;
export declare const ShowcaseWithIcons: Story;
export declare const ShowcaseMatrix: Story;
//# sourceMappingURL=ds-button.stories.d.ts.map