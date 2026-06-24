import { create } from 'storybook/theming/create';

/**
 * Storybook theme keyed to the design system's dark tokens. The DS is
 * dark-only today, so we override every surface that defaults to white.
 *
 * Values mirror the --ds-* tokens; hex literals are required because the
 * theme is consumed by Storybook's manager iframe, which doesn't have
 * access to our CSS custom properties.
 */
export const dsDarkTheme = create({
  base: 'dark',
  brandTitle: 'My Design System',
  brandTarget: '_self',

  // App chrome
  appBg: '#161616', // --ds-color-elevation-default
  appContentBg: '#161616',
  appPreviewBg: '#161616',
  appBorderColor: 'rgba(255, 255, 255, 0.12)', // --ds-color-border-bold
  appBorderRadius: 6,

  // Text
  textColor: '#ebebeb', // --ds-color-text-default
  textMutedColor: '#acacac', // --ds-color-text-subtle
  textInverseColor: '#161616',

  // Toolbar / tab bar
  barBg: '#202020', // --ds-color-elevation-surface-raised-default
  barTextColor: '#acacac',
  barHoverColor: '#ebebeb',
  barSelectedColor: '#7cb4fe', // --ds-color-blue-40

  // Form inputs
  inputBg: '#202020',
  inputBorder: 'rgba(255, 255, 255, 0.12)',
  inputTextColor: '#ebebeb',
  inputBorderRadius: 4,

  // Accent colors
  colorPrimary: '#7cb4fe',
  colorSecondary: '#0168de', // --ds-color-blue-60

  // Typography
  fontBase: 'Inter, system-ui, sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, monospace',
});
