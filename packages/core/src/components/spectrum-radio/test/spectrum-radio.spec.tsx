import { newSpecPage } from '@stencil/core/testing';
import { SpectrumRadio } from '../spectrum-radio';

describe('spectrum-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumRadio],
      html: `<spectrum-radio></spectrum-radio>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [SpectrumRadio],
      html: `<spectrum-radio label="Option A"></spectrum-radio>`,
    });
    expect(page.root).toBeTruthy();
  });
});
