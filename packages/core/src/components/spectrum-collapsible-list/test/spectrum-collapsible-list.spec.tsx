import { newSpecPage } from '@stencil/core/testing';
import { SpectrumCollapsibleList } from '../spectrum-collapsible-list';

describe('spectrum-collapsible-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumCollapsibleList],
      html: `<spectrum-collapsible-list></spectrum-collapsible-list>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-collapsible-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-collapsible-list>
    `);
  });
});
