import { newSpecPage } from '@stencil/core/testing';
import { SpectrumButton } from '../spectrum-button';

describe('spectrum-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumButton],
      html: `<spectrum-button></spectrum-button>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-button>
    `);
  });
});
