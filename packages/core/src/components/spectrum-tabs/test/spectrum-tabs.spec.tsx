import { newSpecPage } from '@stencil/core/testing';
import { SpectrumTabs } from '../spectrum-tabs';

describe('spectrum-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumTabs],
      html: `<spectrum-tabs></spectrum-tabs>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with items', async () => {
    const page = await newSpecPage({
      components: [SpectrumTabs],
      html: `<spectrum-tabs items='[{"label":"Tab 1"},{"label":"Tab 2"}]'></spectrum-tabs>`,
    });
    expect(page.root).toBeTruthy();
  });
});
