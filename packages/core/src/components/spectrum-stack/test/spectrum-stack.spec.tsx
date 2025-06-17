import { newSpecPage } from '@stencil/core/testing';
import { SpectrumStack } from '../spectrum-stack';

describe('spectrum-stack', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumStack],
      html: `<spectrum-stack></spectrum-stack>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-stack>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-stack>
    `);
  });
});
