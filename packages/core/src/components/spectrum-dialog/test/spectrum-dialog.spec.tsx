import { newSpecPage } from '@stencil/core/testing';
import { SpectrumDialog } from '../spectrum-dialog';

describe('spectrum-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumDialog],
      html: `<spectrum-dialog></spectrum-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-dialog>
    `);
  });
});
