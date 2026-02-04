/**
 * Leaflet adapter implementation
 * Wraps Leaflet library with the common MapAdapter interface
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
 * Leaflet adapter class
 * Implements MapAdapter interface using Leaflet library
 */
export class LeafletAdapter implements MapAdapter {
  private leaflet: any; // Leaflet library reference
  private map: any;
  private markerLayer: any;
  private regionLayer: any;
  private heatmapLayer: any;
  private clusterGroup: any;
  private routeLayer: any;
  private markerClickHandler: ((event: MapMarkerClickEvent) => void) | null = null;
  private regionClickHandler: ((event: MapRegionClickEvent) => void) | null = null;
  private boundsChangeHandler: ((event: MapBoundsChangeEvent) => void) | null = null;

  /**
   * Initialize the Leaflet map
   */
  async initialize(container: HTMLElement, config: MapConfig): Promise<void> {
    // Dynamic import of Leaflet - handle both ESM default and CommonJS exports
    const leafletModule = await import('leaflet');
    this.leaflet = (leafletModule as any).default || leafletModule;
    
    // Note: Leaflet CSS should be loaded globally (e.g., in HTML head)
    // Dynamic CSS imports don't work reliably with all bundlers

    // Fix Leaflet's default icon paths for bundlers
    // @ts-ignore - Leaflet icon configuration
    delete this.leaflet.Icon.Default.prototype._getIconUrl;
    this.leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    // Create the map
    this.map = this.leaflet.map(container, {
      center: config.center || [0, 0],
      zoom: config.zoom || 2,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      zoomControl: true, // Always show zoom control
    });

    // Add base tile layer
    const basemapUrl = this.getBasemapUrl(config.basemap || 'streets');
    const basemapType: string = config.basemap || 'streets';
    
    const tileLayerOptions: any = {
      attribution: this.getAttribution(basemapType, config.controls?.attributionText),
      maxZoom: 19,
      minZoom: 0,
    };
    
    // Only add subdomains for tile servers that use them (not Esri)
    if (basemapType !== 'satellite') {
      tileLayerOptions.subdomains = ['a', 'b', 'c'];
    }
    
    this.leaflet.tileLayer(basemapUrl, tileLayerOptions).addTo(this.map);

    // Add controls
    if (config.controls) {
      if (config.controls.zoom === false) {
        this.map.zoomControl.remove();
      }
      if (config.controls.scale) {
        this.leaflet.control.scale().addTo(this.map);
      }
    }

    // Initialize layers
    this.markerLayer = this.leaflet.layerGroup().addTo(this.map);
    this.regionLayer = this.leaflet.layerGroup().addTo(this.map);
    this.routeLayer = this.leaflet.layerGroup().addTo(this.map);

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

    // Call invalidateSize after layout settles
    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize(true);
      }
    }, 100);
  }

  /**
   * Get attribution text for basemap
   */
  private getAttribution(basemapType: string, customAttribution?: string): string {
    if (customAttribution) {
      return customAttribution;
    }
    
    const attributions: { [key: string]: string } = {
      streets: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      voyager: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      dark: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      light: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      terrain: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
      satellite: 'Tiles &copy; Esri',
    };
    
    return attributions[basemapType] || attributions.streets;
  }

  /**
   * Get basemap tile URL
   */
  private getBasemapUrl(basemap: string): string {
    // If custom URL provided, use it directly
    if (basemap.startsWith('http://') || basemap.startsWith('https://')) {
      return basemap;
    }
    
    const basemaps: { [key: string]: string } = {
      streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      voyager: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    };
    
    return basemaps[basemap] || basemaps.streets;
  }

  /**
   * Set map center
   */
  setCenter(center: [number, number], zoom?: number): void {
    if (zoom !== undefined) {
      this.map.setView(center, zoom);
    } else {
      this.map.setView(center);
    }
  }

  /**
   * Set zoom level
   */
  setZoom(zoom: number): void {
    this.map.setZoom(zoom);
  }

  /**
   * Add markers to the map
   * If clustering is enabled, adds to cluster group; otherwise adds to marker layer
   */
  async addMarkers(markers: MarkerConfig[]): Promise<void> {
    // Determine target layer - cluster group if enabled, otherwise marker layer
    const targetLayer = this.clusterGroup || this.markerLayer;

    markers.forEach((markerConfig) => {
      const marker = this.leaflet.marker(markerConfig.position);

      if (markerConfig.tooltip) {
        marker.bindTooltip(markerConfig.tooltip);
      }

      if (markerConfig.popup) {
        marker.bindPopup(markerConfig.popup);
      }

      marker.on('click', () => {
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

      marker.addTo(targetLayer);
    });
  }

  /**
   * Clear all markers
   */
  clearMarkers(): void {
    if (this.markerLayer) {
      this.markerLayer.clearLayers();
    }
    if (this.clusterGroup) {
      this.clusterGroup.clearLayers();
    }
  }

  /**
   * Add regions/polygons to the map
   */
  async addRegions(regions: RegionConfig[]): Promise<void> {
    regions.forEach((regionConfig) => {
      const layer = this.leaflet.geoJSON(regionConfig.geoJson, {
        style: {
          fillColor: regionConfig.fillColor || '#3388ff',
          fillOpacity: regionConfig.fillOpacity || 0.2,
          color: regionConfig.borderColor || '#3388ff',
          weight: regionConfig.borderWidth || 2,
        },
      });

      if (regionConfig.tooltip) {
        layer.bindTooltip(regionConfig.tooltip);
      }

      layer.on('click', () => {
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

      layer.addTo(this.regionLayer);
    });
  }

  /**
   * Clear all regions
   */
  clearRegions(): void {
    if (this.regionLayer) {
      this.regionLayer.clearLayers();
    }
  }

  /**
   * Add heatmap layer
   */
  async addHeatmap(config: HeatmapConfig): Promise<void> {
    try {
      // @ts-ignore
      await import('leaflet.heat');

      if (this.heatmapLayer) {
        this.map.removeLayer(this.heatmapLayer);
      }

      const points = config.points.map((p) => [p.position[0], p.position[1], p.intensity || 1]);
      
      // @ts-ignore - heatLayer is added by leaflet.heat plugin
      this.heatmapLayer = this.leaflet.heatLayer(points, {
        radius: config.radius || 25,
        blur: config.blur || 15,
        maxZoom: 17,
        gradient: config.gradient || { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' },
      }).addTo(this.map);
    } catch (error) {
      console.warn('[LeafletAdapter] Heatmap plugin not available. Install leaflet.heat for heatmap support.');
    }
  }

  /**
   * Clear heatmap layer
   */
  clearHeatmap(): void {
    if (this.heatmapLayer) {
      this.map.removeLayer(this.heatmapLayer);
      this.heatmapLayer = null;
    }
  }

  /**
   * Enable marker clustering
   */
  async enableClustering(config: ClusterConfig): Promise<void> {
    try {
      // Import the markercluster plugin - it extends the existing Leaflet object
      // @ts-ignore
      await import('leaflet.markercluster');
      // Note: CSS is loaded globally in preview-head.html

      if (this.clusterGroup) {
        this.map.removeLayer(this.clusterGroup);
      }

      // The plugin attaches markerClusterGroup to the Leaflet instance we already have
      // @ts-ignore - markerClusterGroup is added by leaflet.markercluster plugin
      if (!this.leaflet.markerClusterGroup) {
        console.warn('[LeafletAdapter] markerClusterGroup not found on Leaflet instance');
        return;
      }

      // @ts-ignore - markerClusterGroup is added by leaflet.markercluster plugin
      this.clusterGroup = this.leaflet.markerClusterGroup({
        maxClusterRadius: config.radius || 80,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
      });

      this.map.addLayer(this.clusterGroup);
    } catch (error) {
      // Marker cluster plugin not available - clustering will be disabled
    }
  }

  /**
   * Disable marker clustering
   */
  disableClustering(): void {
    if (this.clusterGroup) {
      this.map.removeLayer(this.clusterGroup);
      this.clusterGroup = null;
    }
  }

  /**
   * Add routes/polylines to the map
   */
  async addRoutes(routes: RouteConfig[]): Promise<void> {
    routes.forEach((routeConfig) => {
      const polyline = this.leaflet.polyline(routeConfig.coordinates, {
        color: routeConfig.color || '#3388ff',
        weight: routeConfig.width || 3,
        opacity: routeConfig.opacity || 0.8,
        dashArray: routeConfig.style === 'dashed' ? '10, 5' : routeConfig.style === 'dotted' ? '2, 5' : undefined,
      });

      if (routeConfig.label) {
        polyline.bindTooltip(routeConfig.label);
      }

      polyline.addTo(this.routeLayer);
    });
  }

  /**
   * Clear all routes
   */
  clearRoutes(): void {
    if (this.routeLayer) {
      this.routeLayer.clearLayers();
    }
  }

  /**
   * Fit map bounds to show all features
   */
  async fitBounds(): Promise<void> {
    const group = this.leaflet.featureGroup([this.markerLayer, this.regionLayer, this.routeLayer]);
    if (group.getBounds().isValid()) {
      this.map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
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
   * Resize the map (call after container size changes)
   */
  resize(): void {
    if (this.map) {
      this.map.invalidateSize();
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
