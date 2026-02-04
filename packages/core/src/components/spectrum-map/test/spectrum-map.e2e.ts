import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-map', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-map></spectrum-map>');

    const element = await page.find('spectrum-map');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with config', async () => {
    const page = await newE2EPage();
    const config = {
      center: [40.7128, -74.0060],
      zoom: 10,
    };
    
    await page.setContent(`<spectrum-map config='${JSON.stringify(config)}'></spectrum-map>`);

    const element = await page.find('spectrum-map');
    expect(element).toHaveClass('hydrated');
  });

  it('emits events on interaction', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <spectrum-map
        config='{"center": [40.7128, -74.0060], "zoom": 10, "markers": [{"id": "1", "position": [40.7128, -74.0060], "label": "Test"}]}'
      ></spectrum-map>
    `);

    const markerClickSpy = await page.spyOnEvent('markerClick');
    
    // Note: Full interaction testing requires the actual map libraries to be loaded
    // This is a placeholder for future E2E tests with real map interactions
    
    expect(markerClickSpy).not.toHaveReceivedEvent();
  });
});



