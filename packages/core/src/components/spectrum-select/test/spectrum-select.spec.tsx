import { newSpecPage } from '@stencil/core/testing';
import { SpectrumSelect } from '../spectrum-select';

describe('spectrum-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumSelect],
      html: `<spectrum-select></spectrum-select>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-select>
    `);
  });
});
