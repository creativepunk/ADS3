import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|mdx)',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      // Dark-only DS — backgrounds toggle would add a useless light option.
      options: { backgrounds: false },
    },
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
};

export default config;
