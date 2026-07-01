import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|mdx)',
    '../src/**/*.mdx',
  ],

  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },

  features: {},

  async viteFinal(config) {
    config.plugins ??= [];
    config.plugins.push({
      name: 'resolve-file-url-imports',
      resolveId(id) {
        if (id.startsWith('file://')) return id.slice('file://'.length);
      },
    });
    return config;
  },
};

export default config;
