import type { Preview } from '@storybook/web-components-vite';
import { setIconResolver, createMaterialSymbolsResolver } from '../src/ds-icon/ds-icon.js';

// Register the Material Symbols resolver once so any <ds-icon name="...">
// in stories and docs can lazy-load from @material-symbols/svg-400.
setIconResolver(createMaterialSymbolsResolver());
// Self-hosted Inter — loaded at document level so it reaches every component's
// shadow DOM. Tokens reference `Inter` (no generic fallback), so without this
// the canvas falls back to the browser default serif. Weights match the
// typography tokens: 300 / 400 / 500 / 600.
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
// Full token bundle (base + semantic + typography) in one import. Importing the
// individual sub-bundles is error-prone: a missing one (e.g. typography) makes
// every var() referencing it resolve to undefined with no fallback, so text
// silently inherits browser defaults (16px, serif) instead of the DS scale.
import '@my-ds/tokens/css';
import './preview.css';
import { dsDarkTheme } from './theme';

const preview: Preview = {
  parameters: {
    docs: {
      theme: dsDarkTheme,
      canvas: {
        sourceState: 'shown',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }],
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Introduction', 'Components', ['*', ['Overview', '*']]],
        locales: 'en-US',
      },
    },
  },
};

export default preview;
