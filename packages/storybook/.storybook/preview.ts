import './globals.css'
import '../src/components/mermaid-diagram.ts'
import type { Preview } from "@storybook/web-components";

// Initialize Spectrum components
async function initializeSpectrum() {
  try {
    // Try to import from the workspace package first
    const { defineCustomElements } = await import('../../core/loader/index.js');
    await defineCustomElements();
    console.log('✅ Spectrum components initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Spectrum components:', error);
    // Fallback: try to load from the built ESM files
    try {
      const { defineCustomElements } = await import('../../core/dist/esm/loader.js');
      await defineCustomElements();
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
