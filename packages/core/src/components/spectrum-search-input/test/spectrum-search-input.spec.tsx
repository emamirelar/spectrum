import { newSpecPage } from '@stencil/core/testing';
import { SpectrumSearchInput } from '../spectrum-search-input';

describe('spectrum-search-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumSearchInput],
      html: `<spectrum-search-input></spectrum-search-input>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-search-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-search-input>
    `);
  });
});
