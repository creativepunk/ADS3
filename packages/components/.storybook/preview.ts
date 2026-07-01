import type { Preview } from '@storybook/web-components-vite';
// Material Symbols variable font — provides wght 100–700, opsz 20–48, FILL 0/1.
// ds-icon renders ligature spans with font-variation-settings per size.
import 'material-symbols/outlined.css';
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
