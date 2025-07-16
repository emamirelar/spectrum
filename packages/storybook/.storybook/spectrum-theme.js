import { create } from 'storybook/theming';

export default create({
  base: 'light',
  
  // Branding
  brandTitle: 'Spectrum Design System',
  brandUrl: 'https://unops.org',
  brandImage: '/spectrum.svg',
  brandTarget: '_self',
  brandImageHeight: '50px',
  
  // Color palette aligned with Spectrum Material Design 3
  colorPrimary: '#1976d2',
  colorSecondary: '#6366f1',
  
  // UI colors
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#212121',
  textInverseColor: '#ffffff',
  textMutedColor: '#757575',
  
  // Toolbar colors
  barTextColor: '#424242',
  barHoverColor: '#1976d2',
  barSelectedColor: '#1976d2',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e0e0e0',
  inputTextColor: '#212121',
  inputBorderRadius: 4,
  
  // Typography
  fontBase: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
});