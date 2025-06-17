import { newSpecPage } from '@stencil/core/testing';
import { SpectrumCluster } from '../spectrum-cluster';

describe('spectrum-cluster', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumCluster],
      html: `<spectrum-cluster></spectrum-cluster>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-cluster>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </spectrum-cluster>
    `);
  });
});
