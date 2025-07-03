import { newSpecPage } from '@stencil/core/testing';
import { SpectrumApplicationLayout } from '../spectrum-application-layout';

describe('spectrum-application-layout', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumApplicationLayout],
      html: `<spectrum-application-layout></spectrum-application-layout>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-application-layout>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-application-layout>
    `);
  });
});
