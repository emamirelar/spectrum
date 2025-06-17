import { newSpecPage } from '@stencil/core/testing';
import { SpectrumContainer } from '../spectrum-container';

describe('spectrum-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumContainer],
      html: `<spectrum-container></spectrum-container>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-container>
    `);
  });
});
