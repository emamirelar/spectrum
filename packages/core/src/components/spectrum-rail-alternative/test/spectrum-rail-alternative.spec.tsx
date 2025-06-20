import { newSpecPage } from '@stencil/core/testing';
import { SpectrumRailAlternative } from '../spectrum-rail-alternative';

describe('spectrum-rail-alternative', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumRailAlternative],
      html: `<spectrum-rail-alternative></spectrum-rail-alternative>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-rail-alternative>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-rail-alternative>
    `);
  });
});
