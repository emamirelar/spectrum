import { addons } from '@storybook/manager-api';
// import spectrumTheme from './spectrum-theme';
import spectrumTheme from './spectrum-theme-minimal'; // Minimal fallback if needed

addons.setConfig({
  theme: spectrumTheme,
});