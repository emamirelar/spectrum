import { newSpecPage } from '@stencil/core/testing';
import { SpectrumSidebar } from '../spectrum-sidebar';

describe('spectrum-sidebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumSidebar],
      html: `<spectrum-sidebar></spectrum-sidebar>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-sidebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-sidebar>
    `);
  });
});
