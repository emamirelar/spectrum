import './globals.css'
import '../src/components/mermaid-diagram.ts'
import type { Preview } from "@storybook/web-components";

// Initialize Spectrum components
async function initializeSpectrum() {
  try {
    const { defineCustomElements } = await import('@unops-itg-npm/cpit-spectrum/loader');
    await defineCustomElements();
    console.log('✅ Spectrum components initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Spectrum components:', error);
    // Fallback: try to load from the built files directly
    try {
      await import('/www/build/spectrum.esm.js');
      console.log('✅ Spectrum components loaded via fallback');
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
    }
  }
}

// Initialize on load
initializeSpectrum();

const preview: Preview = {
  parameters: {
    viewMode: 'docs',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
