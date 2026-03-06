import './globals.css'
import '../src/components/mermaid-diagram.ts'
import type { Preview } from "@storybook/web-components-vite";
import { html } from 'lit';

async function initializeSpectrum() {
  try {
    const { defineCustomElements } = await import('../../core/loader/index.js');
    await defineCustomElements();
    console.log('✅ Spectrum components initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Spectrum components:', error);
    try {
      const { defineCustomElements } = await import('../../core/dist/esm/loader.js');
      await defineCustomElements();
      console.log('✅ Spectrum components loaded via fallback');
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
    }
  }
}

initializeSpectrum();

const preview: Preview = {
  parameters: {
    viewMode: 'story',
    controls: {
      expanded: true,
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'spectrum-surface', value: '#fafafa' },
        { name: 'dark', value: '#121212' },
        { name: 'primary', value: '#1976d2' },
      ],
    },
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
  decorators: [
    (story) => html`
      <div class="spectrum-story-container" style="padding: 1.5rem;">
        ${story()}
      </div>
    `,
  ],
};

export default preview;
