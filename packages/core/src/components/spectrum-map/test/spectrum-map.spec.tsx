import { newSpecPage } from '@stencil/core/testing';
import { SpectrumMap } from '../spectrum-map';

describe('spectrum-map', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumMap],
      html: `<spectrum-map></spectrum-map>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-map>
        <mock:shadow-root>
          <div class="spectrum-map" style="height: 400px;">
            <div class="spectrum-map__container"></div>
          </div>
        </mock:shadow-root>
      </spectrum-map>
    `);
  });

  it('renders with config', async () => {
    const config = {
      center: [40.7128, -74.0060],
      zoom: 10,
    };
    
    const page = await newSpecPage({
      components: [SpectrumMap],
      html: `<spectrum-map config='${JSON.stringify(config)}'></spectrum-map>`,
    });
    
    expect(page.rootInstance.parsedConfig.center).toEqual([40.7128, -74.0060]);
    expect(page.rootInstance.parsedConfig.zoom).toEqual(10);
  });

  it('defaults to leaflet provider', async () => {
    const page = await newSpecPage({
      components: [SpectrumMap],
      html: `<spectrum-map></spectrum-map>`,
    });
    
    expect(page.rootInstance.mapProvider).toEqual('leaflet');
  });

  it('accepts maplibre provider', async () => {
    const page = await newSpecPage({
      components: [SpectrumMap],
      html: `<spectrum-map map-provider="maplibre"></spectrum-map>`,
    });
    
    expect(page.rootInstance.mapProvider).toEqual('maplibre');
  });
});



