import type { StorybookConfig } from "@storybook/web-components-vite";

const { BASE_PATH } = process.env

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {}
  },
  previewHead: (head) => `${head}
    <script type="module" src="${BASE_PATH ? BASE_PATH : '/'}www/build/spectrum.esm.js"></script>
    <script nomodule src="${BASE_PATH ? BASE_PATH : '/'}www/build/spectrum.js"></script>
  `,
  staticDirs: ['../public', { from: '../www', to: '/www' }],
  async viteFinal(config) {
    config.base = BASE_PATH || config.base

    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      esbuild: {
        jsx: 'automatic',
      },
      build: {
        chunkSizeWarningLimit: 2000,
        sourcemap: false,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                if (id.includes('mermaid')) {
                  return 'vendor';
                }
                if (id.includes('lit')) {
                  return 'lit';
                }
                if (id.includes('react-dom') || id.includes('react/') || id.includes('scheduler')) {
                  return 'react';
                }
                return 'vendor';
              }
            },
          },
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'react/jsx-runtime', 'mermaid'],
        force: false,
      },
      server: {
        fs: {
          allow: ['../..'],
        },
        watch: {
          ignored: ['**/node_modules/**', '**/dist/**', '**/www/**', '**/storybook-static/**'],
        },
      },
    });
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  }
};

export default config;
