import { newSpecPage } from '@stencil/core/testing';
import { SpectrumAccordion } from '../spectrum-accordion';

describe('spectrum-accordion', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumAccordion],
      html: `<spectrum-accordion></spectrum-accordion>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-accordion>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-accordion>
    `);
  });
});
