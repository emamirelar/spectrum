import type { StorybookConfig } from "@storybook/web-components-vite";

import { join, dirname } from "path";

const { BASE_PATH } = process.env

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs")
  ],
  framework: {
    name: getAbsolutePath("@storybook/web-components-vite"),
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
      // Enable React JSX support
      esbuild: {
        jsx: 'automatic',
      },
      resolve: {
        alias: {
          // Ensure consistent React version resolution
          'react': require.resolve('react'),
          'react-dom': require.resolve('react-dom'),
        },
      },
      build: {
        chunkSizeWarningLimit: 2000,
        sourcemap: false, // Disable sourcemaps for faster builds
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Bundle node_modules separately to avoid dynamic import issues
              if (id.includes('node_modules')) {
                // Don't separate Mermaid into its own chunk for GitHub Pages compatibility
                // Instead, bundle it with the main vendor chunk to avoid initialization issues
                if (id.includes('mermaid')) {
                  return 'vendor';
                }
                if (id.includes('lit')) {
                  return 'lit';
                }
                // Keep React and ReactDOM together to avoid scheduler issues
                if (id.includes('react-dom') || id.includes('react/') || id.includes('scheduler')) {
                  return 'react';
                }
                return 'vendor';
              }
            },
          },
        },
      },
      // Define import.meta.url for proper asset resolution
      define: {
        'import.meta.url': JSON.stringify(config.base || '/'),
        // Ensure global React is available
        'global': 'globalThis',
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
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: false, // Disable type-checking for faster dev builds
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  }
};

// @ts-ignore
export default config;