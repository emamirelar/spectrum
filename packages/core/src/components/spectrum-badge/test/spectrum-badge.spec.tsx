import { newSpecPage } from '@stencil/core/testing';
import { SpectrumBadge } from '../spectrum-badge';

describe('spectrum-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumBadge],
      html: `<spectrum-badge></spectrum-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-badge>
    `);
  });
});
