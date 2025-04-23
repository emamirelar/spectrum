import { newSpecPage } from '@stencil/core/testing';
import { SpectrumMegamenu } from '../spectrum-megamenu';

describe('spectrum-megamenu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumMegamenu],
      html: `<spectrum-megamenu></spectrum-megamenu>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-megamenu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-megamenu>
    `);
  });
});
