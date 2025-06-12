import { newSpecPage } from '@stencil/core/testing';
import { SpectrumHero } from '../spectrum-hero';

describe('spectrum-hero', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumHero],
      html: `<spectrum-hero></spectrum-hero>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-hero>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-hero>
    `);
  });
});
