/**
 * Base adapter interface for map providers
 * Abstracts Leaflet and MapLibre implementations behind a common API
 */

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
 * Map adapter interface
 * All map providers (Leaflet, MapLibre) must implement this interface
 */
export interface MapAdapter {
  /**
   * Initialize the map
   * @param container - HTML element to render the map into
   * @param config - Map configuration
   */
  initialize(container: HTMLElement, config: MapConfig): Promise<void>;

  /**
   * Set map center and zoom
   * @param center - [latitude, longitude]
   * @param zoom - Zoom level (optional)
   */
  setCenter(center: [number, number], zoom?: number): void;

  /**
   * Set zoom level
   * @param zoom - Zoom level
   */
  setZoom(zoom: number): void;

  /**
   * Add markers to the map
   * @param markers - Array of marker configurations
   */
  addMarkers(markers: MarkerConfig[]): void;

  /**
   * Remove all markers from the map
   */
  clearMarkers(): void;

  /**
   * Add regions/polygons to the map
   * @param regions - Array of region configurations
   */
  addRegions(regions: RegionConfig[]): void;

  /**
   * Remove all regions from the map
   */
  clearRegions(): void;

  /**
   * Add heatmap layer to the map
   * @param config - Heatmap configuration
   */
  addHeatmap(config: HeatmapConfig): void;

  /**
   * Remove heatmap layer from the map
   */
  clearHeatmap(): void;

  /**
   * Enable marker clustering
   * @param config - Clustering configuration
   */
  enableClustering(config: ClusterConfig): void;

  /**
   * Disable marker clustering
   */
  disableClustering(): void;

  /**
   * Add routes/polylines to the map
   * @param routes - Array of route configurations
   */
  addRoutes(routes: RouteConfig[]): void;

  /**
   * Remove all routes from the map
   */
  clearRoutes(): void;

  /**
   * Fit map bounds to show all markers/regions
   */
  fitBounds(): void;

  /**
   * Get current map bounds
   */
  getBounds(): {
    north: number;
    south: number;
    east: number;
    west: number;
  };

  /**
   * Get current map center
   */
  getCenter(): [number, number];

  /**
   * Get current zoom level
   */
  getZoom(): number;

  /**
   * Register event handler for marker clicks
   * @param handler - Event handler function
   */
  onMarkerClick(handler: (event: MapMarkerClickEvent) => void): void;

  /**
   * Register event handler for region clicks
   * @param handler - Event handler function
   */
  onRegionClick(handler: (event: MapRegionClickEvent) => void): void;

  /**
   * Register event handler for bounds changes
   * @param handler - Event handler function
   */
  onBoundsChange(handler: (event: MapBoundsChangeEvent) => void): void;

  /**
   * Resize the map (call after container size changes)
   */
  resize(): void;

  /**
   * Destroy the map and clean up resources
   */
  destroy(): void;
}



