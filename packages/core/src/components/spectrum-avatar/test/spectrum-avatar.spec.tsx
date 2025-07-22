import { newSpecPage } from '@stencil/core/testing';
import { SpectrumAvatar } from '../spectrum-avatar';

describe('spectrum-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumAvatar],
      html: `<spectrum-avatar></spectrum-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-avatar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-avatar>
    `);
  });
});
