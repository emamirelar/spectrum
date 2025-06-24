import { newSpecPage } from '@stencil/core/testing';
import { SpectrumPanel } from '../spectrum-panel';

describe('spectrum-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumPanel],
      html: `<spectrum-panel></spectrum-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-panel>
    `);
  });
});
