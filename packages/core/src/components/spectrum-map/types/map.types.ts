/**
 * Type definitions for the Spectrum Map component
 * Supports both Leaflet and MapLibre GL JS providers
 */

/**
 * Map configuration interface
 */
export interface MapConfig {
  /** Map center coordinates [latitude, longitude] */
  center: [number, number];
  
  /** Initial zoom level */
  zoom: number;
  
  /** Minimum zoom level */
  minZoom?: number;
  
  /** Maximum zoom level */
  maxZoom?: number;
  
  /** Marker configuration */
  markers?: MarkerConfig[];
  
  /** Region/polygon configuration */
  regions?: RegionConfig[];
  
  /** Heatmap configuration */
  heatmap?: HeatmapConfig;
  
  /** Clustering configuration */
  clustering?: ClusterConfig;
  
  /** Route/polyline configuration */
  routes?: RouteConfig[];
  
  /** Basemap style (can also be a full style URL for vector tiles) */
  basemap?: 'streets' | 'satellite' | 'terrain' | 'dark' | 'light' | 'voyager' | string;
  
  /** Map controls configuration */
  controls?: MapControlsConfig;
  
  /** Custom height (default: 400px) */
  height?: string;
  
  /** Camera pitch angle in degrees (0-85, MapLibre only) */
  pitch?: number;
  
  /** Camera bearing/rotation in degrees (0-360, MapLibre only) */
  bearing?: number;
  
  /** 3D terrain configuration (MapLibre only) */
  terrain?: TerrainConfig;
  
  /** Enable 3D buildings (MapLibre only) */
  buildings3d?: boolean;
  
  /** Marker field mapping for converting raw data to markers */
  markerConfig?: MarkerFieldConfig;
}

/**
 * Configuration for mapping raw data fields to marker properties
 * Used when dashboard passes raw data arrays instead of MarkerConfig arrays
 */
export interface MarkerFieldConfig {
  /** Field name for marker ID */
  idField?: string;
  
  /** Field name for marker position (expects [lat, lng] array or {lat, lng} object) */
  positionField?: string;
  
  /** Field name for marker label */
  labelField?: string;
  
  /** Field name for tooltip/popup content */
  tooltipField?: string;
  
  /** Field name for marker color */
  colorField?: string;
  
  /** Field name for marker icon */
  iconField?: string;
  
  /** List of fields to include in marker.data for drill-down */
  dataFields?: string[];
}

/**
 * Marker configuration
 */
export interface MarkerConfig {
  /** Unique marker ID */
  id: string;
  
  /** Marker position [latitude, longitude] */
  position: [number, number];
  
  /** Marker label/title */
  label?: string;
  
  /** Marker icon (Material Icons name or custom icon URL) */
  icon?: string;
  
  /** Marker color (hex, rgb, or named color) */
  color?: string;
  
  /** Custom data attached to marker */
  data?: any;
  
  /** Tooltip text */
  tooltip?: string;
  
  /** Popup HTML content */
  popup?: string;
}

/**
 * Region/polygon configuration
 */
export interface RegionConfig {
  /** Unique region ID */
  id: string;
  
  /** GeoJSON polygon data */
  geoJson: any;
  
  /** Fill color */
  fillColor?: string;
  
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  
  /** Border color */
  borderColor?: string;
  
  /** Border width */
  borderWidth?: number;
  
  /** Custom data attached to region */
  data?: any;
  
  /** Region label */
  label?: string;
  
  /** Tooltip text */
  tooltip?: string;
}

/**
 * Heatmap configuration
 */
export interface HeatmapConfig {
  /** Heatmap data points */
  points: HeatmapPoint[];
  
  /** Heatmap radius (default: 25) */
  radius?: number;
  
  /** Maximum intensity value */
  max?: number;
  
  /** Blur amount (default: 15) */
  blur?: number;
  
  /** Color gradient */
  gradient?: Record<number, string>;
}

/**
 * Heatmap point
 */
export interface HeatmapPoint {
  /** Point position [latitude, longitude] */
  position: [number, number];
  
  /** Intensity value */
  intensity?: number;
}

/**
 * Clustering configuration
 */
export interface ClusterConfig {
  /** Enable clustering */
  enabled: boolean;
  
  /** Maximum cluster radius in pixels */
  radius?: number;
  
  /** Maximum zoom level for clustering */
  maxZoom?: number;
  
  /** Minimum points to form a cluster */
  minPoints?: number;
  
  /** Custom cluster icon */
  icon?: string;
  
  /** Show count in cluster */
  showCount?: boolean;
}

/**
 * Route/polyline configuration
 */
export interface RouteConfig {
  /** Unique route ID */
  id: string;
  
  /** Route coordinates */
  coordinates: [number, number][];
  
  /** Line color */
  color?: string;
  
  /** Line width */
  width?: number;
  
  /** Line opacity (0-1) */
  opacity?: number;
  
  /** Line style */
  style?: 'solid' | 'dashed' | 'dotted';
  
  /** Custom data attached to route */
  data?: any;
  
  /** Route label */
  label?: string;
}

/**
 * Map controls configuration
 */
export interface MapControlsConfig {
  /** Show zoom controls */
  zoom?: boolean;
  
  /** Show scale control */
  scale?: boolean;
  
  /** Show fullscreen control */
  fullscreen?: boolean;
  
  /** Show attribution */
  attribution?: boolean;
  
  /** Custom attribution text */
  attributionText?: string;
}

/**
 * 3D terrain configuration (MapLibre only)
 */
export interface TerrainConfig {
  /** Enable 3D terrain */
  enabled: boolean;
  
  /** Terrain exaggeration factor (default: 1.0) */
  exaggeration?: number;
  
  /** Terrain source URL (optional, uses default if not provided) */
  source?: string;
}

/**
 * Marker click event payload
 */
export interface MapMarkerClickEvent {
  /** Event action type */
  action: 'markerClick';
  
  /** Clicked marker configuration */
  marker: MarkerConfig;
  
  /** Marker custom data */
  data: any;
  
  /** Marker ID */
  id: string;
  
  /** Marker position */
  position: [number, number];
  
  /** Marker label */
  label?: string;
}

/**
 * Region click event payload
 */
export interface MapRegionClickEvent {
  /** Event action type */
  action: 'regionClick';
  
  /** Clicked region configuration */
  region: RegionConfig;
  
  /** Region custom data */
  data: any;
  
  /** Region ID */
  id: string;
  
  /** Region label */
  label?: string;
}

/**
 * Map bounds changed event payload
 */
export interface MapBoundsChangeEvent {
  /** Event action type */
  action: 'boundsChange';
  
  /** New map bounds */
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  
  /** New center coordinates */
  center: [number, number];
  
  /** New zoom level */
  zoom: number;
}

/**
 * Map provider type
 */
export type MapProvider = 'leaflet' | 'maplibre';

/**
 * Map data - raw data that can be transformed into map features
 */
export interface MapData {
  /** Marker data */
  markers?: any[];
  
  /** Region data */
  regions?: any[];
  
  /** Heatmap data */
  heatmap?: any[];
  
  /** Route data */
  routes?: any[];
}

