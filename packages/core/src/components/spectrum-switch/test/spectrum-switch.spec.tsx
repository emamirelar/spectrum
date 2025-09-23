import { newSpecPage } from '@stencil/core/testing';
import { SpectrumSwitch } from '../spectrum-switch';

describe('spectrum-switch', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumSwitch],
      html: `<spectrum-switch></spectrum-switch>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-switch>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-switch>
    `);
  });
});
