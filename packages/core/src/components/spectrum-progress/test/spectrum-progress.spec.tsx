import { newSpecPage } from '@stencil/core/testing';
import { SpectrumProgress } from '../spectrum-progress';

describe('spectrum-progress', () => {
  it('renders linear', async () => {
    const page = await newSpecPage({
      components: [SpectrumProgress],
      html: `<spectrum-progress value="50"></spectrum-progress>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders circular', async () => {
    const page = await newSpecPage({
      components: [SpectrumProgress],
      html: `<spectrum-progress variant="circular" value="75"></spectrum-progress>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders indeterminate', async () => {
    const page = await newSpecPage({
      components: [SpectrumProgress],
      html: `<spectrum-progress></spectrum-progress>`,
    });
    expect(page.root).toBeTruthy();
  });
});
