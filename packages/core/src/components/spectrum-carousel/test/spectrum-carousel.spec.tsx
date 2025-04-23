import { newSpecPage } from '@stencil/core/testing';
import { SpectrumCarousel } from '../spectrum-carousel';

describe('spectrum-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumCarousel],
      html: `<spectrum-carousel></spectrum-carousel>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-carousel>
    `);
  });
});
