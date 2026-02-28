import { newSpecPage } from '@stencil/core/testing';
import { SpectrumCheckbox } from '../spectrum-checkbox';

describe('spectrum-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumCheckbox],
      html: `<spectrum-checkbox></spectrum-checkbox>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with label', async () => {
    const page = await newSpecPage({
      components: [SpectrumCheckbox],
      html: `<spectrum-checkbox label="Accept terms"></spectrum-checkbox>`,
    });
    expect(page.root).toBeTruthy();
  });
});
