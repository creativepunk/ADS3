// Side-effect CSS imports (e.g. @fontsource/inter weight files) carry no types.
// This ambient declaration lets `tsc` resolve `import '...css'` statements;
// the consumer's bundler handles the actual stylesheet.
declare module '*.css';

// Vite ?raw query — resolves SVG file content as a string at build time.
// Used by createMaterialSymbolsResolver in ds-icon.
declare module '*.svg?raw' {
  const content: string;
  export default content;
}
