import { newSpecPage } from '@stencil/core/testing';
import { SpectrumSegmentedButton } from '../spectrum-segmented-button';

describe('spectrum-segmented-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumSegmentedButton],
      html: `<spectrum-segmented-button></spectrum-segmented-button>`,
    });
    expect(page.root).toBeTruthy();
  });

  it('renders with items as JSON string', async () => {
    const page = await newSpecPage({
      components: [SpectrumSegmentedButton],
      html: `<spectrum-segmented-button items='[{"label":"Day","value":"day"},{"label":"Week","value":"week"},{"label":"Month","value":"month"}]'></spectrum-segmented-button>`,
    });
    const segments = page.root.shadowRoot.querySelectorAll('.spectrum-segmented-button__segment');
    expect(segments.length).toBe(3);
  });

  it('renders with items as JS array', async () => {
    const page = await newSpecPage({
      components: [SpectrumSegmentedButton],
      html: `<spectrum-segmented-button></spectrum-segmented-button>`,
    });
    page.rootInstance.items = [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
    ];
    await page.waitForChanges();
    const segments = page.root.shadowRoot.querySelectorAll('.spectrum-segmented-button__segment');
    expect(segments.length).toBe(2);
  });

  it('handles invalid JSON gracefully', async () => {
    const page = await newSpecPage({
      components: [SpectrumSegmentedButton],
      html: `<spectrum-segmented-button items='not-valid-json'></spectrum-segmented-button>`,
    });
    const segments = page.root.shadowRoot.querySelectorAll('.spectrum-segmented-button__segment');
    expect(segments.length).toBe(0);
  });
});
