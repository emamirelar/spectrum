import { newSpecPage } from '@stencil/core/testing';
import { SpectrumAppLayout } from '../spectrum-app-layout';

describe('spectrum-app-layout', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumAppLayout],
      html: `<spectrum-app-layout></spectrum-app-layout>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-app-layout>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-app-layout>
    `);
  });
});
