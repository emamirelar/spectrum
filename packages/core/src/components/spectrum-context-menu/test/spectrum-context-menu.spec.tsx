import { newSpecPage } from '@stencil/core/testing';
import { SpectrumContextMenu } from '../spectrum-context-menu';

describe('spectrum-context-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumContextMenu],
      html: `<spectrum-context-menu></spectrum-context-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-context-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-context-menu>
    `);
  });
});
