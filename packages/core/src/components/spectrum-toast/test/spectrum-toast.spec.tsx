import { newSpecPage } from '@stencil/core/testing';
import { SpectrumToast } from '../spectrum-toast';

describe('spectrum-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumToast],
      html: `<spectrum-toast></spectrum-toast>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-toast>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-toast>
    `);
  });
});
