import { newSpecPage } from '@stencil/core/testing';
import { SpectrumRail } from '../spectrum-rail';

describe('spectrum-rail', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumRail],
      html: `<spectrum-rail></spectrum-rail>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-rail>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-rail>
    `);
  });
});
