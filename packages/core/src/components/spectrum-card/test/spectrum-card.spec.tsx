import { newSpecPage } from '@stencil/core/testing';
import { SpectrumCard } from '../spectrum-card';

describe('spectrum-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumCard],
      html: `<spectrum-card></spectrum-card>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-card>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-card>
    `);
  });
});
