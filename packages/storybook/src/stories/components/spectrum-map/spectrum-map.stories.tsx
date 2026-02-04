import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Spectrum Map Component
 * 
 * A flexible, provider-agnostic map component that supports both Leaflet (lightweight, 40KB)
 * and MapLibre GL JS (modern, GPU-accelerated, 200KB) via dynamic imports.
 * 
 * ## Features
 * - **Dual Provider Support**: Choose between Leaflet or MapLibre
 * - **Dynamic Loading**: Only loads the selected map library
 * - **Common API**: Same props/events regardless of provider
 * - **Markers**: Display points of interest with custom icons
 * - **Regions**: Show polygons/territories with GeoJSON
 * - **Heatmaps**: Visualize data density
 * - **Clustering**: Group nearby markers automatically
 * - **Routes**: Draw polylines/paths
 * - **Drill-Down**: Full integration with dashboard drill-down system
 * 
 * ## Bundle Size
 * - Base component: ~5KB
 * - With Leaflet: +40KB (recommended for most use cases)
 * - With MapLibre: +200KB (use for advanced features like 3D, vector tiles)
 */

interface SpectrumMapArgs {
  mapProvider: 'leaflet' | 'maplibre';
  config: string;
  data: string;
  debug: boolean;
}

const meta: Meta<SpectrumMapArgs> = {
  title: 'Spectrum/Components/SpectrumMap',
  component: 'spectrum-map',
  tags: ['autodocs'],
  argTypes: {
    mapProvider: {
      control: { type: 'select' },
      options: ['leaflet', 'maplibre'],
      description: 'Map provider (leaflet: 40KB, maplibre: 200KB)',
      table: {
        defaultValue: { summary: 'leaflet' },
      },
    },
    config: {
      control: { type: 'object' },
      description: 'Map configuration (JSON or object)',
    },
    data: {
      control: { type: 'object' },
      description: 'Map data for markers, regions, etc.',
    },
    debug: {
      control: { type: 'boolean' },
      description: 'Enable debug logging',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A dual-provider map component with dynamic imports for optimal bundle size.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SpectrumMapArgs>;

/**
 * Basic Map with Markers
 * Simple Leaflet map showing store locations
 */
export const BasicMap: Story = {
  args: {
    mapProvider: 'leaflet',
    config: JSON.stringify({
      center: [40.7128, -74.0060],
      zoom: 10,
      height: '500px',
      markers: [
        {
          id: '1',
          position: [40.7128, -74.0060],
          label: 'Store 1',
          tooltip: 'Manhattan Flagship',
          color: '#3388ff',
        },
        {
          id: '2',
          position: [40.7589, -73.9851],
          label: 'Store 2',
          tooltip: 'Times Square',
          color: '#ff4444',
        },
        {
          id: '3',
          position: [40.7484, -73.9857],
          label: 'Store 3',
          tooltip: 'Empire State',
          color: '#44ff44',
        },
      ],
    }),
    debug: true,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
      <h2 style="margin: 0 0 1rem 0;">Basic Map - Leaflet Provider</h2>
      <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
        Lightweight map with markers. Click markers to see tooltips.
      </p>
      <spectrum-map
        map-provider=${args.mapProvider}
        config=${args.config}
        ?debug=${args.debug}
      ></spectrum-map>
    </div>
  `,
};

/**
 * Map with Clustering
 * Shows marker clustering for many points
 */
export const ClusteredMarkers: Story = {
  args: {
    mapProvider: 'leaflet',
    config: JSON.stringify({
      center: [40.7128, -74.0060],
      zoom: 11,
      height: '500px',
      clustering: {
        enabled: true,
        radius: 80,
        maxZoom: 15,
        showCount: true,
      },
      markers: Array.from({ length: 100 }, (_, i) => ({
        id: `store-${i}`,
        position: [
          40.7128 + (Math.random() - 0.5) * 0.2,
          -74.0060 + (Math.random() - 0.5) * 0.2,
        ],
        label: `Store ${i + 1}`,
        tooltip: `Store ${i + 1} - Revenue: $${(Math.random() * 5 + 1).toFixed(1)}M`,
        color: '#3388ff',
        data: {
          revenue: Math.random() * 5 + 1,
          employees: Math.floor(Math.random() * 50) + 10,
        },
      })),
    }),
    debug: false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
      <h2 style="margin: 0 0 1rem 0;">Clustered Markers - 100 Stores</h2>
      <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
        Automatic marker clustering for better performance. Zoom in to see individual markers.
      </p>
      <spectrum-map
        map-provider=${args.mapProvider}
        config=${args.config}
        ?debug=${args.debug}
      ></spectrum-map>
    </div>
  `,
};

/**
 * Regional Map with Polygons
 * Shows regions/territories with data
 */
export const RegionalMap: Story = {
  args: {
    mapProvider: 'leaflet',
    config: JSON.stringify({
      center: [39.8283, -98.5795],
      zoom: 4,
      height: '500px',
      regions: [
        {
          id: 'northeast',
          label: 'Northeast Region',
          fillColor: '#ff6b6b',
          fillOpacity: 0.3,
          borderColor: '#ff6b6b',
          borderWidth: 2,
          tooltip: 'Northeast - Sales: $45M',
          data: { sales: 45000000, stores: 23 },
          geoJson: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-80, 45],
                [-65, 45],
                [-65, 38],
                [-80, 38],
                [-80, 45],
              ]],
            },
          },
        },
        {
          id: 'midwest',
          label: 'Midwest Region',
          fillColor: '#4ecdc4',
          fillOpacity: 0.3,
          borderColor: '#4ecdc4',
          borderWidth: 2,
          tooltip: 'Midwest - Sales: $38M',
          data: { sales: 38000000, stores: 19 },
          geoJson: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-105, 49],
                [-80, 49],
                [-80, 35],
                [-105, 35],
                [-105, 49],
              ]],
            },
          },
        },
        {
          id: 'west',
          label: 'West Region',
          fillColor: '#95e1d3',
          fillOpacity: 0.3,
          borderColor: '#95e1d3',
          borderWidth: 2,
          tooltip: 'West - Sales: $62M',
          data: { sales: 62000000, stores: 31 },
          geoJson: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-125, 49],
                [-105, 49],
                [-105, 31],
                [-125, 31],
                [-125, 49],
              ]],
            },
          },
        },
      ],
    }),
    debug: false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
      <h2 style="margin: 0 0 1rem 0;">Regional Sales Map</h2>
      <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
        Polygons showing sales regions. Hover to see tooltips, click for drill-down.
      </p>
      <spectrum-map
        map-provider=${args.mapProvider}
        config=${args.config}
        ?debug=${args.debug}
      ></spectrum-map>
    </div>
  `,
};

/**
 * Heatmap Visualization
 * Shows data density with heatmap layer
 */
export const HeatmapVisualization: Story = {
  args: {
    mapProvider: 'leaflet',
    config: JSON.stringify({
      center: [40.7128, -74.0060],
      zoom: 11,
      height: '500px',
      heatmap: {
        points: Array.from({ length: 500 }, () => ({
          position: [
            40.7128 + (Math.random() - 0.5) * 0.2,
            -74.0060 + (Math.random() - 0.5) * 0.2,
          ],
          intensity: Math.random(),
        })),
        radius: 25,
        blur: 15,
        gradient: {
          '0.4': 'blue',
          '0.6': 'cyan',
          '0.7': 'lime',
          '0.8': 'yellow',
          '1.0': 'red',
        },
      },
    }),
    debug: false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
      <h2 style="margin: 0 0 1rem 0;">Sales Density Heatmap</h2>
      <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
        Heatmap showing transaction density across the city. Red = high density, blue = low.
      </p>
      <spectrum-map
        map-provider=${args.mapProvider}
        config=${args.config}
        ?debug=${args.debug}
      ></spectrum-map>
    </div>
  `,
};

/**
 * Routes and Paths
 * Shows delivery routes with polylines
 */
export const RoutesAndPaths: Story = {
  args: {
    mapProvider: 'leaflet',
    config: JSON.stringify({
      center: [40.7128, -74.0060],
      zoom: 12,
      height: '500px',
      markers: [
        {
          id: 'warehouse',
          position: [40.7128, -74.0060],
          label: 'Warehouse',
          tooltip: 'Central Warehouse',
          color: '#ff4444',
        },
        {
          id: 'store1',
          position: [40.7589, -73.9851],
          label: 'Store 1',
          tooltip: 'Delivery Stop 1',
          color: '#4444ff',
        },
        {
          id: 'store2',
          position: [40.7484, -73.9857],
          label: 'Store 2',
          tooltip: 'Delivery Stop 2',
          color: '#4444ff',
        },
      ],
      routes: [
        {
          id: 'route1',
          label: 'Delivery Route 1',
          coordinates: [
            [40.7128, -74.0060],
            [40.7589, -73.9851],
          ],
          color: '#3388ff',
          width: 3,
          style: 'solid',
        },
        {
          id: 'route2',
          label: 'Delivery Route 2',
          coordinates: [
            [40.7128, -74.0060],
            [40.7484, -73.9857],
          ],
          color: '#ff8800',
          width: 3,
          style: 'dashed',
        },
      ],
    }),
    debug: false,
  },
  render: (args) => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
      <h2 style="margin: 0 0 1rem 0;">Delivery Routes</h2>
      <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
        Warehouse to store delivery routes. Blue = Route 1 (solid), Orange = Route 2 (dashed).
      </p>
      <spectrum-map
        map-provider=${args.mapProvider}
        config=${args.config}
        ?debug=${args.debug}
      ></spectrum-map>
    </div>
  `,
};

/**
 * Leaflet vs MapLibre Comparison
 * Side-by-side comparison of both providers
 */
export const ProviderComparison: Story = {
  render: () => {
    const config = {
      center: [40.7128, -74.0060],
      zoom: 12,
      height: '400px',
      markers: [
        {
          id: '1',
          position: [40.7128, -74.0060],
          label: 'Store 1',
          tooltip: 'Manhattan',
        },
        {
          id: '2',
          position: [40.7589, -73.9851],
          label: 'Store 2',
          tooltip: 'Times Square',
        },
      ],
    };

    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
        <h2 style="margin: 0 0 1rem 0;">Provider Comparison</h2>
        <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
          Same configuration, different providers. Leaflet (left) is lighter, MapLibre (right) has modern features.
        </p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <h3 style="margin: 0 0 0.5rem 0;">Leaflet (~40KB)</h3>
            <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">
              Lightweight, proven, great for most use cases
            </p>
            <spectrum-map
              map-provider="leaflet"
              config=${JSON.stringify(config)}
            ></spectrum-map>
          </div>
          <div>
            <h3 style="margin: 0 0 0.5rem 0;">MapLibre (~200KB)</h3>
            <p style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">
              Modern, GPU-accelerated, vector tiles, 3D
            </p>
            <spectrum-map
              map-provider="maplibre"
              config=${JSON.stringify(config)}
            ></spectrum-map>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Dashboard Integration
 * Map with drill-down to table
 */
export const DashboardIntegration: Story = {
  render: () => {
    const storeData = [
      { id: '1', name: 'Manhattan Flagship', region: 'Northeast', lat: 40.7128, lng: -74.0060, revenue: 5200000, employees: 45 },
      { id: '2', name: 'Times Square', region: 'Northeast', lat: 40.7589, lng: -73.9851, revenue: 4800000, employees: 38 },
      { id: '3', name: 'Empire State', region: 'Northeast', lat: 40.7484, lng: -73.9857, revenue: 3900000, employees: 32 },
    ];

    const mapConfig = {
      center: [40.7128, -74.0060],
      zoom: 12,
      height: '400px',
      markers: storeData.map(store => ({
        id: store.id,
        position: [store.lat, store.lng],
        label: store.name,
        tooltip: `${store.name} - Revenue: $${(store.revenue / 1000000).toFixed(1)}M`,
        data: store,
      })),
    };

    return html`
      <div style="padding: 2rem; background: var(--spectrum-sys-color-surface); max-width: 1200px; margin: 0 auto;">
        <h2 style="margin: 0 0 1rem 0;">Dashboard Integration with Drill-Down</h2>
        <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant);">
          Click a marker on the map to filter the table below. Full drill-down integration.
        </p>
        
        <spectrum-map
          map-provider="leaflet"
          config=${JSON.stringify(mapConfig)}
          @markerClick=${(e: CustomEvent) => {
            console.log('Marker clicked:', e.detail);
            alert(`Store: ${e.detail.label}\nRevenue: $${(e.detail.data.revenue / 1000000).toFixed(1)}M`);
          }}
        ></spectrum-map>
        
        <div style="margin-top: 2rem;">
          <h3 style="margin: 0 0 1rem 0;">Store Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: var(--spectrum-sys-color-surface-variant);">
                <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--spectrum-sys-color-outline);">Store Name</th>
                <th style="padding: 0.75rem; text-align: left; border: 1px solid var(--spectrum-sys-color-outline);">Region</th>
                <th style="padding: 0.75rem; text-align: right; border: 1px solid var(--spectrum-sys-color-outline);">Revenue</th>
                <th style="padding: 0.75rem; text-align: right; border: 1px solid var(--spectrum-sys-color-outline);">Employees</th>
              </tr>
            </thead>
            <tbody>
              ${storeData.map(store => html`
                <tr>
                  <td style="padding: 0.75rem; border: 1px solid var(--spectrum-sys-color-outline);">${store.name}</td>
                  <td style="padding: 0.75rem; border: 1px solid var(--spectrum-sys-color-outline);">${store.region}</td>
                  <td style="padding: 0.75rem; text-align: right; border: 1px solid var(--spectrum-sys-color-outline);">$${(store.revenue / 1000000).toFixed(1)}M</td>
                  <td style="padding: 0.75rem; text-align: right; border: 1px solid var(--spectrum-sys-color-outline);">${store.employees}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },
};

