import { newSpecPage } from '@stencil/core/testing';
import { SpectrumGrid } from '../spectrum-grid';

describe('spectrum-grid', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumGrid],
      html: `<spectrum-grid></spectrum-grid>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-grid>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-grid>
    `);
  });
});
