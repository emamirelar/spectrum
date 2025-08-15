import { newSpecPage } from '@stencil/core/testing';
import { SpectrumCookieCompliance } from '../spectrum-cookie-compliance';

describe('spectrum-cookie-compliance', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumCookieCompliance],
      html: `<spectrum-cookie-compliance></spectrum-cookie-compliance>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-cookie-compliance>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-cookie-compliance>
    `);
  });
});
