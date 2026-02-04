/**
 * MapLibre GL JS adapter implementation
 * Wraps MapLibre GL JS library with the common MapAdapter interface
 */

import type { MapAdapter } from './map-adapter.interface';
import type {
  MapConfig,
  MarkerConfig,
  RegionConfig,
  HeatmapConfig,
  ClusterConfig,
  RouteConfig,
  MapMarkerClickEvent,
  MapRegionClickEvent,
  MapBoundsChangeEvent,
} from '../types/map.types';

/**
 * MapLibre adapter class
 * Implements MapAdapter interface using MapLibre GL JS library
 */
export class MapLibreAdapter implements MapAdapter {
  private maplibregl: any; // MapLibre library reference
  private map: any;
  private markers: any[] = [];
  private markerClickHandler: ((event: MapMarkerClickEvent) => void) | null = null;
  private regionClickHandler: ((event: MapRegionClickEvent) => void) | null = null;
  private boundsChangeHandler: ((event: MapBoundsChangeEvent) => void) | null = null;

  /**
   * Initialize the MapLibre GL JS map
   */
  async initialize(container: HTMLElement, config: MapConfig): Promise<void> {
    // Dynamic import of MapLibre GL JS - handle both ESM default and CommonJS exports
    const maplibreModule = await import('maplibre-gl');
    this.maplibregl = (maplibreModule as any).default || maplibreModule;
    
    // Note: MapLibre CSS should be loaded globally (e.g., in HTML head)

    // Create the map with 3D camera options
    this.map = new this.maplibregl.Map({
      container,
      style: this.getStyle(config.basemap || 'streets', config.buildings3d),
      center: config.center || [0, 0],
      zoom: config.zoom || 2,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      pitch: config.pitch || 0,
      bearing: config.bearing || 0,
    });

    // Add controls
    if (config.controls) {
      if (config.controls.zoom !== false) {
        this.map.addControl(new this.maplibregl.NavigationControl());
      }
      if (config.controls.scale) {
        this.map.addControl(new this.maplibregl.ScaleControl());
      }
      if (config.controls.fullscreen) {
        this.map.addControl(new this.maplibregl.FullscreenControl());
      }
    }

    // Register bounds change handler
    this.map.on('moveend', () => {
      if (this.boundsChangeHandler) {
        const bounds = this.map.getBounds();
        const center = this.map.getCenter();
        const zoom = this.map.getZoom();

        this.boundsChangeHandler({
          action: 'boundsChange',
          bounds: {
            north: bounds.getNorth(),
            south: bounds.getSouth(),
            east: bounds.getEast(),
            west: bounds.getWest(),
          },
          center: [center.lat, center.lng],
          zoom,
        });
      }
    });

    // Wait for map to load
    await new Promise((resolve) => {
      this.map.on('load', resolve);
    });
    
    // Handle style errors gracefully (e.g., missing source layers for 3D buildings)
    this.map.on('error', (e: any) => {
      if (e.error?.message?.includes('does not exist on source')) {
        console.warn('[MapLibreAdapter] 3D layer source not available, falling back to 2D:', e.error.message);
        // Remove the problematic layer if it exists
        if (this.map.getLayer('3d-buildings')) {
          try {
            this.map.removeLayer('3d-buildings');
          } catch {
            // Ignore removal errors
          }
        }
      } else {
        console.warn('[MapLibreAdapter] Map error:', e.error?.message || e);
      }
    });
    
    // Add 3D terrain after map loads
    if (config.terrain?.enabled) {
      this.addTerrain(config.terrain);
    }
  }

  /**
   * Get MapLibre style JSON
   * Uses raster tiles from OpenStreetMap as fallback for reliable display
   * Supports vector tile URLs for 3D buildings
   */
  private getStyle(basemap: string, buildings3d?: boolean): any {
    // If custom style URL provided, use it directly
    // Custom URLs should include 3D buildings support if needed
    if (basemap.startsWith('http://') || basemap.startsWith('https://')) {
      // If requesting 3D with a custom URL, assume the style supports it
      // Otherwise, we just return the custom style as-is
      return basemap;
    }

    // Build raster tile style inline for reliable display
    const tileUrls: { [key: string]: string } = {
      streets: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      voyager: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
      dark: 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      light: 'https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://tile.opentopomap.org/{z}/{x}/{y}.png',
    };

    const tileUrl = tileUrls[basemap] || tileUrls.streets;

    // Base style with raster source
    const style: any = {
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: [tileUrl],
          tileSize: 256,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      },
      layers: [
        {
          id: 'raster-layer',
          type: 'raster',
          source: 'raster-tiles',
          minzoom: 0,
          maxzoom: 19,
        },
      ],
    };
    
    // 3D buildings require vector tiles with building geometry
    // Free raster tiles (OSM, CartoDB, etc.) don't include building data
    // For 3D buildings, users should provide a vector tile style URL that includes:
    // - MapTiler (requires API key): https://api.maptiler.com/maps/basic-v2/style.json?key=YOUR_KEY
    // - Self-hosted OpenMapTiles
    // - Other vector tile providers with building data
    if (buildings3d) {
      console.warn(
        '[MapLibreAdapter] 3D buildings requested but using raster tiles.',
        'For 3D buildings, provide a vector tile style URL (e.g., MapTiler) with building data.',
        'Displaying 2D map instead.'
      );
      // We still enable the tilted/3D camera perspective, just without building extrusion
    }

    return style;
  }
  
  /**
   * Add 3D terrain to the map
   */
  private addTerrain(config: any): void {
    // Add terrain source
    const terrainSource = config.source || 'https://demotiles.maplibre.org/terrain-tiles/tiles.json';
    
    this.map.addSource('terrain', {
      type: 'raster-dem',
      url: terrainSource,
      tileSize: 256,
    });
    
    // Set terrain
    this.map.setTerrain({
      source: 'terrain',
      exaggeration: config.exaggeration || 1.0,
    });
  }

  /**
   * Set map center
   */
  setCenter(center: [number, number], zoom?: number): void {
    const options: any = { center };
    if (zoom !== undefined) {
      options.zoom = zoom;
    }
    this.map.flyTo(options);
  }

  /**
   * Set zoom level
   */
  setZoom(zoom: number): void {
    this.map.flyTo({ zoom });
  }

  /**
   * Add markers to the map
   */
  async addMarkers(markers: MarkerConfig[]): Promise<void> {
    markers.forEach((markerConfig) => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'spectrum-marker';
      el.style.backgroundColor = markerConfig.color || '#3388ff';
      el.style.width = '24px';
      el.style.height = '24px';
      el.style.borderRadius = '50% 50% 50% 0';
      el.style.transform = 'rotate(-45deg)';
      el.style.cursor = 'pointer';

      // Create marker with custom element option
      const marker = new this.maplibregl.Marker({ element: el })
        .setLngLat([markerConfig.position[1], markerConfig.position[0]]);

      // Add popup if configured
      if (markerConfig.popup) {
        const popup = new this.maplibregl.Popup({ offset: 25 })
          .setHTML(markerConfig.popup);
        marker.setPopup(popup);
      }

      // Add click handler to the element
      el.addEventListener('click', (event) => {
        // Stop propagation to prevent popup from also opening if we're drilling down
        event.stopPropagation();
        
        if (this.markerClickHandler) {
          // Flatten data into the event payload for easier context mapping
          this.markerClickHandler({
            action: 'markerClick',
            marker: markerConfig,
            id: markerConfig.id,
            position: markerConfig.position,
            label: markerConfig.label,
            // Spread the data object so fields like 'name', 'region', etc. are at top level
            ...(markerConfig.data || {}),
          });
        }
      });

      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  /**
   * Clear all markers
   */
  clearMarkers(): void {
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];
  }

  /**
   * Add regions/polygons to the map
   */
  addRegions(regions: RegionConfig[]): void {
    regions.forEach((regionConfig) => {
      const sourceId = `region-${regionConfig.id}`;
      const layerId = `region-layer-${regionConfig.id}`;

      // Add source
      this.map.addSource(sourceId, {
        type: 'geojson',
        data: regionConfig.geoJson,
      });

      // Add fill layer
      this.map.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': regionConfig.fillColor || '#3388ff',
          'fill-opacity': regionConfig.fillOpacity || 0.2,
        },
      });

      // Add border layer
      this.map.addLayer({
        id: `${layerId}-outline`,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': regionConfig.borderColor || '#3388ff',
          'line-width': regionConfig.borderWidth || 2,
        },
      });

      // Add click handler
      this.map.on('click', layerId, () => {
        if (this.regionClickHandler) {
          this.regionClickHandler({
            action: 'regionClick',
            region: regionConfig,
            data: regionConfig.data,
            id: regionConfig.id,
            label: regionConfig.label,
          });
        }
      });

      // Change cursor on hover
      this.map.on('mouseenter', layerId, () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });
      this.map.on('mouseleave', layerId, () => {
        this.map.getCanvas().style.cursor = '';
      });
    });
  }

  /**
   * Clear all regions
   */
  clearRegions(): void {
    const layers = this.map.getStyle().layers;
    layers.forEach((layer) => {
      if (layer.id.startsWith('region-layer-')) {
        this.map.removeLayer(layer.id);
        const sourceId = layer.id.replace('region-layer-', 'region-');
        if (this.map.getSource(sourceId)) {
          this.map.removeSource(sourceId);
        }
      }
    });
  }

  /**
   * Add heatmap layer
   */
  addHeatmap(config: HeatmapConfig): void {
    // Create GeoJSON from heatmap points
    const geojson = {
      type: 'FeatureCollection',
      features: config.points.map((point) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [point.position[1], point.position[0]],
        },
        properties: {
          intensity: point.intensity || 1,
        },
      })),
    };

    this.map.addSource('heatmap-source', {
      type: 'geojson',
      data: geojson,
    });

    this.map.addLayer({
      id: 'heatmap-layer',
      type: 'heatmap',
      source: 'heatmap-source',
      paint: {
        'heatmap-radius': config.radius || 25,
        'heatmap-weight': ['get', 'intensity'],
        'heatmap-intensity': 1,
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(0, 0, 255, 0)',
          0.1, 'blue',
          0.3, 'cyan',
          0.5, 'lime',
          0.7, 'yellow',
          1, 'red',
        ],
      },
    });
  }

  /**
   * Clear heatmap layer
   */
  clearHeatmap(): void {
    if (this.map.getLayer('heatmap-layer')) {
      this.map.removeLayer('heatmap-layer');
    }
    if (this.map.getSource('heatmap-source')) {
      this.map.removeSource('heatmap-source');
    }
  }

  /**
   * Enable marker clustering
   */
  enableClustering(_config: ClusterConfig): void {
    // MapLibre supports clustering natively through GeoJSON sources
  }

  /**
   * Disable marker clustering
   */
  disableClustering(): void {
  }

  /**
   * Add routes/polylines to the map
   */
  addRoutes(routes: RouteConfig[]): void {
    routes.forEach((routeConfig) => {
      const sourceId = `route-${routeConfig.id}`;
      const layerId = `route-layer-${routeConfig.id}`;

      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: routeConfig.coordinates.map((c) => [c[1], c[0]]),
        },
      };

      this.map.addSource(sourceId, {
        type: 'geojson',
        data: geojson,
      });

      this.map.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': routeConfig.color || '#3388ff',
          'line-width': routeConfig.width || 3,
          'line-opacity': routeConfig.opacity || 0.8,
        },
      });
    });
  }

  /**
   * Clear all routes
   */
  clearRoutes(): void {
    const layers = this.map.getStyle().layers;
    layers.forEach((layer) => {
      if (layer.id.startsWith('route-layer-')) {
        this.map.removeLayer(layer.id);
        const sourceId = layer.id.replace('route-layer-', 'route-');
        if (this.map.getSource(sourceId)) {
          this.map.removeSource(sourceId);
        }
      }
    });
  }

  /**
   * Fit map bounds to show all features
   */
  fitBounds(): void {
    // Implementation would calculate bounds from all features
  }

  /**
   * Get current map bounds
   */
  getBounds() {
    const bounds = this.map.getBounds();
    return {
      north: bounds.getNorth(),
      south: bounds.getSouth(),
      east: bounds.getEast(),
      west: bounds.getWest(),
    };
  }

  /**
   * Get current map center
   */
  getCenter(): [number, number] {
    const center = this.map.getCenter();
    return [center.lat, center.lng];
  }

  /**
   * Get current zoom level
   */
  getZoom(): number {
    return this.map.getZoom();
  }

  /**
   * Register marker click handler
   */
  onMarkerClick(handler: (event: MapMarkerClickEvent) => void): void {
    this.markerClickHandler = handler;
  }

  /**
   * Register region click handler
   */
  onRegionClick(handler: (event: MapRegionClickEvent) => void): void {
    this.regionClickHandler = handler;
  }

  /**
   * Register bounds change handler
   */
  onBoundsChange(handler: (event: MapBoundsChangeEvent) => void): void {
    this.boundsChangeHandler = handler;
  }

  /**
   * Resize the map
   */
  resize(): void {
    if (this.map) {
      this.map.resize();
    }
  }

  /**
   * Destroy the map and clean up
   */
  destroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }
}

