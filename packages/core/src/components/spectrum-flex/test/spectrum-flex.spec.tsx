import { newSpecPage } from '@stencil/core/testing';
import { SpectrumFlex } from '../spectrum-flex';

describe('spectrum-flex', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumFlex],
      html: `<spectrum-flex></spectrum-flex>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-flex>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-flex>
    `);
  });
});
