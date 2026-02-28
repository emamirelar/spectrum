import { newSpecPage } from '@stencil/core/testing';
import { SpectrumTooltip } from '../spectrum-tooltip';

describe('spectrum-tooltip', () => {
  it('renders plain', async () => {
    const page = await newSpecPage({
      components: [SpectrumTooltip],
      html: `<spectrum-tooltip text="Hello"><button>Hover me</button></spectrum-tooltip>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders rich', async () => {
    const page = await newSpecPage({
      components: [SpectrumTooltip],
      html: `<spectrum-tooltip variant="rich"><button>Hover me</button></spectrum-tooltip>`,
    });
    expect(page.root).toBeTruthy();
  });
});
