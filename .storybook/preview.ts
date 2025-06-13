import './globals.css'
import '../src/components/mermaid-diagram.ts'
import type { Preview } from "@storybook/web-components";

// Stencil components are loaded via previewHead script tags in main.ts
// No additional initialization needed here

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