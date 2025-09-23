import { newSpecPage } from '@stencil/core/testing';
import { SpectrumWizard } from '../spectrum-wizard';

describe('spectrum-wizard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumWizard],
      html: `<spectrum-wizard></spectrum-wizard>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-wizard>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-wizard>
    `);
  });
});
