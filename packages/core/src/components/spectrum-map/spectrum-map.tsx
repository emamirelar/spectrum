import { Component, Prop, Element, Event, EventEmitter, Watch, h, Host, Method } from '@stencil/core';
import type { MapAdapter } from './adapters/map-adapter.interface';
import type {
  MapConfig,
  MapData,
  MapProvider,
  MapMarkerClickEvent,
  MapRegionClickEvent,
  MapBoundsChangeEvent,
} from './types/map.types';

/**
 * Spectrum Map Component
 * 
 * A flexible map component that supports multiple providers (Leaflet, MapLibre GL JS)
 * via dynamic imports and a common adapter interface.
 * 
 * @example
 * <spectrum-map
 *   map-provider="leaflet"
 *   config='{"center": [40.7128, -74.0060], "zoom": 10}'
 *   data='[{"position": [40.7128, -74.0060], "label": "New York"}]'>
 * </spectrum-map>
 */
@Component({
  tag: 'spectrum-map',
  styleUrl: 'spectrum-map.scss',
  shadow: false,
  scoped: true,
})
export class SpectrumMap {
  @Element() element: HTMLElement;

  /**
   * Map provider to use ('leaflet' or 'maplibre')
   * Default: 'leaflet' (lightweight, 40KB)
   * 
   * Choose 'maplibre' for modern GPU-accelerated vector tiles and 3D support (200KB)
   */
  @Prop() mapProvider: MapProvider = 'leaflet';

  /**
   * Map configuration (JSON-driven)
   * Can be a JSON string or object
   */
  @Prop() config: MapConfig | string;

  /**
   * Map data for markers, regions, heatmap, routes
   * Can be a JSON string or object
   */
  @Prop() data: MapData | string;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Event emitted when a marker is clicked
   */
  @Event({
    eventName: 'markerClick',
    bubbles: true,
    composed: true,
    cancelable: true
  }) markerClick: EventEmitter<MapMarkerClickEvent>;

  /**
   * Event emitted when a region is clicked
   */
  @Event({
    eventName: 'regionClick',
    bubbles: true,
    composed: true,
    cancelable: true
  }) regionClick: EventEmitter<MapRegionClickEvent>;

  /**
   * Event emitted when map bounds change
   */
  @Event({
    eventName: 'boundsChange',
    bubbles: true,
    composed: true,
    cancelable: true
  }) boundsChange: EventEmitter<MapBoundsChangeEvent>;

  /**
   * Internal state
   */
  private adapter: MapAdapter;
  private mapContainer: HTMLDivElement;
  private parsedConfig: MapConfig;
  private parsedData: MapData;
  private isInitialized: boolean = false;
  private resizeObserver: ResizeObserver;

  /**
   * Lifecycle: Component will load
   */
  async componentWillLoad() {
    this.debugLog('Component will load', { provider: this.mapProvider });
    this.parseConfig();
    this.parseData();
  }

  /**
   * Lifecycle: Component did load
   */
  async componentDidLoad() {
    // Use getBoundingClientRect for more accurate dimension reading
    const getContainerDimensions = () => {
      if (!this.mapContainer) return { width: 0, height: 0 };
      const rect = this.mapContainer.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };
    
    this.debugLog('componentDidLoad', { 
      hasContainer: !!this.mapContainer,
      dimensions: getContainerDimensions()
    });
    
    // Set up ResizeObserver - wait for dimensions before initializing
    if (this.mapContainer) {
      this.resizeObserver = new ResizeObserver(async (entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          
          if (width > 0 && height > 0) {
            if (!this.isInitialized && !this.adapter) {
              // First time we have dimensions - initialize the map
              this.debugLog('Container has dimensions, initializing map');
              await this.initializeMap();
            } else if (this.adapter) {
              // Already initialized, just resize
              this.adapter.resize();
            }
          }
        }
      });
      
      this.resizeObserver.observe(this.mapContainer);
    } else {
      console.error('[spectrum-map] mapContainer is null in componentDidLoad!');
    }
  }

  /**
   * Lifecycle: Component will unload
   */
  disconnectedCallback() {
    this.debugLog('Component disconnecting');
    
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    
    // Clean up adapter
    if (this.adapter) {
      this.adapter.destroy();
    }
  }

  /**
   * Watch for config changes
   */
  @Watch('config')
  onConfigChange() {
    this.debugLog('Config changed');
    this.parseConfig();
    if (this.isInitialized) {
      this.updateMap();
    }
  }

  /**
   * Watch for data changes
   */
  @Watch('data')
  onDataChange() {
    this.debugLog('Data changed');
    this.parseData();
    if (this.isInitialized) {
      this.updateMapData();
    }
  }

  /**
   * Watch for provider changes
   */
  @Watch('mapProvider')
  async onProviderChange() {
    this.debugLog('Provider changed', { newProvider: this.mapProvider });
    // Reinitialize with new provider
    if (this.isInitialized && this.adapter) {
      this.adapter.destroy();
      await this.initializeMap();
    }
  }

  /**
   * Public method: Set map center
   */
  @Method()
  async setCenter(lat: number, lng: number, zoom?: number) {
    if (this.adapter) {
      this.adapter.setCenter([lat, lng], zoom);
    }
  }

  /**
   * Public method: Set zoom level
   */
  @Method()
  async setZoom(zoom: number) {
    if (this.adapter) {
      this.adapter.setZoom(zoom);
    }
  }

  /**
   * Public method: Fit bounds to show all features
   */
  @Method()
  async fitBounds() {
    if (this.adapter) {
      this.adapter.fitBounds();
    }
  }

  /**
   * Public method: Get current bounds
   */
  @Method()
  async getBounds() {
    if (this.adapter) {
      return this.adapter.getBounds();
    }
    return null;
  }

  /**
   * Public method: Resize map (call after container size changes)
   */
  @Method()
  async resize() {
    if (this.adapter) {
      this.adapter.resize();
    }
  }

  /**
   * Parse config prop
   */
  private parseConfig() {
    try {
      if (typeof this.config === 'string') {
        this.parsedConfig = JSON.parse(this.config);
      } else if (this.config && typeof this.config === 'object') {
        this.parsedConfig = this.config;
      } else {
        // Default config
        this.parsedConfig = {
          center: [0, 0],
          zoom: 2,
        };
      }
      this.debugLog('Config parsed', this.parsedConfig);
    } catch (error) {
      console.error('[spectrum-map] Failed to parse config:', error);
      this.parsedConfig = {
        center: [0, 0],
        zoom: 2,
      };
    }
  }

  /**
   * Parse data prop
   * Handles both MapData objects and raw arrays with markerConfig conversion
   */
  private parseData() {
    try {
      let rawData: any;
      
      if (typeof this.data === 'string') {
        rawData = JSON.parse(this.data);
      } else if (this.data && typeof this.data === 'object') {
        rawData = this.data;
      } else {
        rawData = {};
      }
      
      // Check if data is a raw array that needs conversion via markerConfig
      if (Array.isArray(rawData) && this.parsedConfig?.markerConfig) {
        this.parsedData = this.convertRawDataToMapData(rawData);
      } else if (rawData && typeof rawData === 'object' && !Array.isArray(rawData)) {
        // Data is already a MapData object
        this.parsedData = rawData;
      } else {
        this.parsedData = {};
      }
      
      this.debugLog('Data parsed', { 
        rawDataType: Array.isArray(rawData) ? 'array' : typeof rawData,
        rawDataLength: Array.isArray(rawData) ? rawData.length : 'N/A',
        markersCount: this.parsedData.markers?.length || 0,
        parsedData: this.parsedData 
      });
    } catch (error) {
      console.error('[spectrum-map] Failed to parse data:', error);
      this.parsedData = {};
    }
  }
  
  /**
   * Convert raw data array to MapData using markerConfig
   * This allows dashboard widgets to pass raw data and have it converted to markers
   */
  private convertRawDataToMapData(rawData: any[]): MapData {
    const markerConfig = this.parsedConfig.markerConfig;
    if (!markerConfig) {
      return {};
    }
    
    const {
      idField = 'id',
      positionField = 'position',
      labelField = 'label',
      tooltipField = 'tooltip',
      colorField = 'color',
      iconField = 'icon',
      dataFields = [],
    } = markerConfig;
    
    const markers = rawData.map((item, index) => {
      // Extract position - handle both [lat, lng] and {lat, lng} formats
      let position: [number, number] | null = null;
      const posValue = item[positionField];
      
      if (Array.isArray(posValue) && posValue.length >= 2) {
        position = [posValue[0], posValue[1]];
      } else if (posValue && typeof posValue === 'object' && 'lat' in posValue && 'lng' in posValue) {
        position = [posValue.lat, posValue.lng];
      }
      
      if (!position) {
        this.debugLog(`Skipping item ${index} - no valid position`, item);
        return null;
      }
      
      // Build popup/tooltip HTML
      let popup = item[tooltipField] || item[labelField] || item[idField] || `Item ${index}`;
      
      // Extract data fields for drill-down
      const data: Record<string, any> = {};
      if (dataFields.length > 0) {
        dataFields.forEach((field: string) => {
          if (item[field] !== undefined) {
            data[field] = item[field];
          }
        });
      } else {
        // Include all fields if no specific fields specified
        Object.assign(data, item);
      }
      
      return {
        id: String(item[idField] || `marker-${index}`),
        position,
        label: item[labelField] || item.name || item[idField],
        popup: typeof popup === 'string' ? popup : String(popup),
        color: item[colorField],
        icon: item[iconField],
        data,
      };
    }).filter(Boolean); // Remove null entries
    
    this.debugLog(`Converted ${rawData.length} raw items to ${markers.length} markers`);
    
    return { markers };
  }

  /**
   * Initialize the map with the selected provider
   */
  private async initializeMap() {
    if (!this.mapContainer) {
      console.error('[spectrum-map] Map container not found');
      return;
    }

    // Check if already initialized OR already initializing
    if (this.isInitialized || this.adapter) {
      this.debugLog('Map already initialized or initializing, skipping');
      return;
    }
    
    // Set flag to prevent concurrent initialization
    this.isInitialized = true;

    const width = this.mapContainer.offsetWidth;
    const height = this.mapContainer.offsetHeight;
    
    this.debugLog('Initializing map', { 
      provider: this.mapProvider,
      containerWidth: width,
      containerHeight: height
    });

    try {

      // Dynamically import the appropriate adapter
      if (this.mapProvider === 'leaflet') {
        const { LeafletAdapter } = await import('./adapters/leaflet-adapter');
        this.adapter = new LeafletAdapter();
      } else if (this.mapProvider === 'maplibre') {
        const { MapLibreAdapter } = await import('./adapters/maplibre-adapter');
        this.adapter = new MapLibreAdapter();
      } else {
        throw new Error(`Unknown map provider: ${this.mapProvider}`);
      }

      // Initialize the adapter
      await this.adapter.initialize(this.mapContainer, this.parsedConfig);

      // Register event handlers
      this.adapter.onMarkerClick((event) => {
        this.debugLog('Marker clicked', event);
        this.markerClick.emit(event);
      });

      this.adapter.onRegionClick((event) => {
        this.debugLog('Region clicked', event);
        this.regionClick.emit(event);
      });

      this.adapter.onBoundsChange((event) => {
        this.debugLog('Bounds changed', event);
        this.boundsChange.emit(event);
      });

      // Add initial data
      this.updateMapData();

      this.debugLog('Map initialized successfully');
    } catch (error) {
      console.error('[spectrum-map] Failed to initialize map:', error);
      this.isInitialized = false; // Reset on failure so retry is possible
    }
  }


  /**
   * Update map configuration
   */
  private updateMap() {
    if (!this.adapter || !this.parsedConfig) return;

    this.debugLog('Updating map configuration');

    // Update center and zoom
    if (this.parsedConfig.center) {
      this.adapter.setCenter(this.parsedConfig.center, this.parsedConfig.zoom);
    }

    // Re-add data with new config
    this.updateMapData();
  }

  /**
   * Update map data (markers, regions, heatmap, routes)
   */
  private async updateMapData() {
    if (!this.adapter) return;

    this.debugLog('Updating map data');

    // Clear existing data
    this.adapter.clearMarkers();
    this.adapter.clearRegions();
    this.adapter.clearHeatmap();
    this.adapter.clearRoutes();

    // Enable clustering BEFORE adding markers (must await so cluster group exists)
    if (this.parsedConfig.clustering?.enabled) {
      await this.adapter.enableClustering(this.parsedConfig.clustering);
    }

    // Add markers (will be added to cluster group if clustering is enabled)
    if (this.parsedConfig.markers || this.parsedData.markers) {
      const markers = this.parsedConfig.markers || this.parsedData.markers || [];
      await this.adapter.addMarkers(markers);
    }

    // Add regions
    if (this.parsedConfig.regions || this.parsedData.regions) {
      const regions = this.parsedConfig.regions || this.parsedData.regions || [];
      await this.adapter.addRegions(regions);
    }

    // Add heatmap
    if (this.parsedConfig.heatmap || this.parsedData.heatmap) {
      const heatmap = this.parsedConfig.heatmap || this.parsedData.heatmap;
      if (heatmap && !Array.isArray(heatmap)) {
        await this.adapter.addHeatmap(heatmap);
      }
    }

    // Add routes
    if (this.parsedConfig.routes || this.parsedData.routes) {
      const routes = this.parsedConfig.routes || this.parsedData.routes || [];
      await this.adapter.addRoutes(routes);
    }
  }

  /**
   * Debug logging
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-map:${this.mapProvider}] ${message}`, ...args);
    }
  }

  /**
   * Render the component
   */
  render() {
    // If height is explicitly set in config, use it
    // Otherwise, use 100% height (requires parent to have height) with min-height fallback
    const explicitHeight = this.parsedConfig?.height;
    const style = { 
      width: '100%', 
      height: explicitHeight || '100%',
      minHeight: '400px' // Fallback minimum height
    };

    // SIMPLIFIED: Single container with explicit dimensions
    // Leaflet needs explicit width/height on the container
    return (
      <Host style={{ display: 'block', width: '100%', height: '100%', minHeight: '400px' }}>
        <div
          class="spectrum-map"
          style={style}
          ref={(el) => (this.mapContainer = el as HTMLDivElement)}
        ></div>
      </Host>
    );
  }
}

