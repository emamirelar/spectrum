import { newSpecPage } from '@stencil/core/testing';
import { SpectrumSearchResults } from '../spectrum-search-results';

describe('spectrum-search-results', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumSearchResults],
      html: `<spectrum-search-results></spectrum-search-results>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-search-results>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-search-results>
    `);
  });
});
