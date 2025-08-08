import './globals.css'
import '../src/components/mermaid-diagram.ts'
import type { Preview } from "@storybook/web-components-vite";

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
    viewMode: 'story', // Change default to story for faster loading
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Custom backgrounds for testing components
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'spectrum-surface',
          value: '#fafafa',
        },
        {
          name: 'dark',
          value: '#121212',
        },
        {
          name: 'primary',
          value: '#1976d2',
        },
      ],
    },
    // Enhanced viewport options
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1200px', height: '800px' },
          type: 'desktop',
        },
        large: {
          name: 'Large Desktop',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
    },
  },
};

export default preview;
