import { Config } from '@stencil/core';
import tailwind from 'stencil-tailwind-plugin';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'spectrum',
  plugins: [
    sass(),
    tailwind(),
  ],
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
      footer: '', // hide "Built with StencilJS"c
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: '**/*.html' }, { src: '**/*.css' }]
    },
    {
      type: 'www',
      dir: '../storybook/www',
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: '@unops-itg-npm/cpit-spectrum',
      outputType: 'component',
      directivesProxyFile: '../angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
    reactOutputTarget({
      outDir: '../react/lib/components/stencil-generated/'
    }),
    vueOutputTarget({
      componentCorePackage: '@unops-itg-npm/cpit-spectrum',
      proxiesFile: '../vue/lib/stencil-generated/components.ts',
    }),
  ],
  testing: {
    browserHeadless: "new",
  },
};
