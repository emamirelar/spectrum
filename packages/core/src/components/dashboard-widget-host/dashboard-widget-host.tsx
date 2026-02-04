import { Component, h, Host, Prop, State, Watch, Element } from '@stencil/core';
import type {
  WidgetDefinition,
  DataSourceConfig,
  DataSourceResult,
} from '../spectrum-dashboard/types/dashboard.types';
import type { DataSourceManager } from '../spectrum-dashboard/services/data-source-manager';
import DashboardStore from '../spectrum-dashboard/store/dashboard.store';
import { WidgetRegistryManager } from '../spectrum-dashboard/registry/widget.registry';
import { DrillDownManager } from '../spectrum-dashboard/services/drill-down-manager';

@Component({
  tag: 'dashboard-widget-host',
  styleUrl: 'dashboard-widget-host.scss',
  shadow: false,
})
export class DashboardWidgetHost {
  @Element() element: HTMLElement;
  
  /**
   * Grid area name for CSS Grid positioning
   */
  @Prop() area!: string;
  
  /**
   * Widget configuration
   */
  @Prop() widgetConfig!: WidgetDefinition;
  
  /**
   * Data source manager instance
   */
  @Prop() dataSourceManager!: DataSourceManager;
  
  /**
   * Global context (userId, authToken, etc.)
   */
  @Prop() globalContext: Record<string, any> = {};
  
  /**
   * Available data sources from dashboard config
   */
  @Prop() dataSources: Record<string, DataSourceConfig> = {};
  
  /**
   * Debug mode
   */
  @Prop() debug: boolean = false;
  
  /**
   * Widget data state
   */
  @State() data: any = null;
  
  /**
   * Loading state
   */
  @State() loading: boolean = false;
  
  /**
   * Error state
   */
  @State() error: Error | null = null;
  
  /**
   * Current filter values
   */
  @State() currentFilters: Record<string, any> = {};
  
  /**
   * Unsubscribe functions
   */
  private unsubscribers: Array<() => void> = [];
  
  /**
   * Component lifecycle: Initialize widget
   */
  async componentWillLoad() {
    this.debugLog('Widget host initializing...', { 
      area: this.area, 
      component: this.widgetConfig.component,
      dataSourceId: this.widgetConfig.dataSourceId,
      widgetConfig: this.widgetConfig 
    });
    
    // Subscribe to filter changes
    this.subscribeToFilters();
    
    // Initial data fetch
    await this.fetchData();
    
    this.debugLog('Widget host initialized');
  }
  
  /**
   * Component lifecycle: DOM ready - attach drill-down event listeners
   */
  componentDidLoad() {
    // Only attach drill-down listeners if drillDown config exists
    if (!this.widgetConfig.drillDown) {
      return;
    }
    
    this.debugLog('Attaching drill-down event listeners');
    
    // Listen for chart element click events
    this.element.addEventListener('elementClick', (e: CustomEvent) => {
      this.handleDrillDown(e.detail);
    });
    
    // Listen for table row click events
    this.element.addEventListener('rowClick', (e: CustomEvent) => {
      this.handleDrillDown(e.detail);
    });
    
    // Listen for map marker click events
    this.element.addEventListener('markerClick', (e: CustomEvent) => {
      this.handleDrillDown(e.detail);
    });
    
    // Listen for map region click events
    this.element.addEventListener('regionClick', (e: CustomEvent) => {
      this.handleDrillDown(e.detail);
    });
  }
  
  /**
   * Component lifecycle: Cleanup
   */
  disconnectedCallback() {
    this.debugLog('Widget host disconnecting...');
    
    // Unsubscribe from all listeners
    this.unsubscribers.forEach(unsub => unsub());
    this.unsubscribers = [];
    
    this.debugLog('Widget host disconnected');
  }
  
  /**
   * Watch for widget config changes
   */
  @Watch('widgetConfig')
  async onWidgetConfigChange() {
    this.debugLog('Widget config changed, refreshing...');
    await this.fetchData();
  }
  
  /**
   * Subscribe to relevant filter changes
   */
  private subscribeToFilters() {
    const subscribeKeys = this.widgetConfig.filtering?.subscribe || [];
    
    if (subscribeKeys.length === 0) {
      this.debugLog('Widget not subscribed to any filters');
      return;
    }
    
    this.debugLog('Subscribing to filters:', subscribeKeys);
    
    // Subscribe to filter changes
    this.unsubscribers.push(
      DashboardStore.onFilterChange(async (filters) => {
        // Check if any subscribed filter changed
        const relevantChange = subscribeKeys.some(key => {
          const oldValue = this.currentFilters[key];
          const newValue = filters[key];
          return JSON.stringify(oldValue) !== JSON.stringify(newValue);
        });
        
        if (relevantChange) {
          this.debugLog('Relevant filter changed, refreshing data...', filters);
          this.currentFilters = { ...filters };
          await this.fetchData();
        }
      })
    );
    
    // Set initial filter values
    this.currentFilters = DashboardStore.getFilters();
  }
  
  /**
   * Fetch data for this widget
   */
  private async fetchData() {
    // Get data source config
    const dataSourceConfig = this.getDataSourceConfig();
    
    if (!dataSourceConfig) {
      this.debugLog('No data source configured for widget');
      return;
    }
    
    try {
      this.loading = true;
      this.error = null;
      
      // Determine which filters to apply
      const filters = this.getRelevantFilters();
      
      this.debugLog('Fetching data...', {
        dataSource: dataSourceConfig.id,
        filters,
        mode: this.widgetConfig.filtering?.mode || 'auto',
      });
      
      // Fetch from data source manager
      const result: DataSourceResult = await this.dataSourceManager.getDataSource(
        dataSourceConfig,
        this.globalContext,
        filters
      );
      
      if (result.error) {
        throw result.error;
      }
      
      // Apply client-side filtering if needed
      let finalData = result.data;
      
      if (this.shouldApplyClientFiltering()) {
        finalData = this.applyClientFiltering(result.data, filters);
      }
      
      this.data = finalData;
      this.loading = false;
      
      this.debugLog('Data fetched successfully', {
        dataSource: dataSourceConfig.id,
        fromCache: result.fromCache,
        recordCount: Array.isArray(finalData) ? finalData.length : 'N/A',
      });
    } catch (err) {
      this.error = err as Error;
      this.loading = false;
      console.error('[dashboard-widget-host] Error fetching data:', err);
      
      this.debugLog('Data fetch failed', err);
    }
  }
  
  /**
   * Handle drill-down action from widget event.
   * Delegates to DrillDownManager for processing.
   * 
   * @param eventData - Event payload from widget (chart click, row click, etc.)
   */
  private handleDrillDown(eventData: any) {
    if (!this.widgetConfig.drillDown) {
      return;
    }
    
    this.debugLog('Processing drill-down...', {
      action: this.widgetConfig.drillDown.action,
      eventData,
    });
    
    try {
      // Get widget ID from area or generate one
      const widgetId = this.widgetConfig.component || this.area;
      
      // Delegate to DrillDownManager
      DrillDownManager.processDrillDown(
        this.widgetConfig.drillDown,
        eventData,
        widgetId
      );
      
      this.debugLog('Drill-down processed successfully');
    } catch (error) {
      console.error('[dashboard-widget-host] Error processing drill-down:', error);
      this.debugLog('Drill-down processing failed', error);
    }
  }
  
  /**
   * Get data source configuration for this widget
   */
  private getDataSourceConfig(): DataSourceConfig | null {
    // Check for dataSourceId reference
    if (this.widgetConfig.dataSourceId) {
      const config = this.dataSources[this.widgetConfig.dataSourceId];
      if (!config) {
        console.warn(`[dashboard-widget-host] Data source not found: ${this.widgetConfig.dataSourceId}`);
        return null;
      }
      return config;
    }
    
    // Check for inline data config (legacy)
    if (this.widgetConfig.data) {
      return this.widgetConfig.data;
    }
    
    return null;
  }
  
  /**
   * Get relevant filters for this widget
   */
  private getRelevantFilters(): Record<string, any> {
    const subscribeKeys = this.widgetConfig.filtering?.subscribe || [];
    
    if (subscribeKeys.length === 0) {
      return {};
    }
    
    const allFilters = DashboardStore.getFilters();
    const relevantFilters: Record<string, any> = {};
    
    for (const key of subscribeKeys) {
      if (allFilters[key] !== undefined) {
        relevantFilters[key] = allFilters[key];
      }
    }
    
    return relevantFilters;
  }
  
  /**
   * Determine if client-side filtering should be applied
   */
  private shouldApplyClientFiltering(): boolean {
    const mode = this.widgetConfig.filtering?.mode || 'auto';
    const dataSourceConfig = this.getDataSourceConfig();
    
    if (!dataSourceConfig) return false;
    
    // Client mode: always apply client filtering
    if (mode === 'client') return true;
    
    // Server mode: never apply client filtering
    if (mode === 'server') return false;
    
    // Auto mode: apply client filtering if server filtering not supported
    if (mode === 'auto') {
      return !dataSourceConfig.supportsServerFiltering;
    }
    
    return false;
  }
  
  /**
   * Apply client-side filtering to data
   */
  private applyClientFiltering(data: any, filters: Record<string, any>): any {
    if (!Array.isArray(data)) {
      this.debugLog('Data is not an array, skipping client filtering');
      return data;
    }
    
    if (Object.keys(filters).length === 0) {
      return data;
    }
    
    // Get filter function
    const filterFnName = this.widgetConfig.filtering?.clientFilterFn || 'default';
    const filterFn = WidgetRegistryManager.getFilter(filterFnName);
    
    this.debugLog('Applying client-side filter:', filterFnName);
    
    try {
      return filterFn(data, filters);
    } catch (err) {
      console.error('[dashboard-widget-host] Client filtering error:', err);
      return data;
    }
  }
  
  /**
   * Render loading state
   */
  private renderLoading() {
    return (
      <div 
        class="widget-host__state widget-host__state--loading"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div class="widget-host__spinner" aria-hidden="true"></div>
        <p class="widget-host__message">Loading widget...</p>
      </div>
    );
  }
  
  /**
   * Render error state
   */
  private renderError() {
    const widgetName = this.widgetConfig?.component || 'widget';
    
    return (
      <div 
        class="widget-host__state widget-host__state--error"
        role="alert"
        aria-live="assertive"
      >
        <span class="widget-host__icon widget-host__icon--error material-symbols-outlined" aria-hidden="true">error</span>
        <h4 class="widget-host__error-title">Error Loading Widget</h4>
        <p class="widget-host__error-message">{this.error?.message || 'Unknown error'}</p>
        <button
          class="widget-host__retry"
          onClick={() => this.fetchData()}
          aria-label={`Retry loading ${widgetName}`}
        >
          Retry
        </button>
      </div>
    );
  }
  
  /**
   * Render the actual widget component
   */
  private renderWidget() {
    const tagName = WidgetRegistryManager.getWidget(this.widgetConfig.component);
    
    if (!tagName) {
      return (
        <div class="widget-host__state widget-host__state--error">
          <p class="widget-host__error-message">
            Unknown widget type: {this.widgetConfig.component}
          </p>
        </div>
      );
    }
    
    // Create element dynamically
    const WidgetElement = tagName as any;
    
    // Special handling for map components - extract mapProvider from uiConfig
    const isMapWidget = tagName === 'spectrum-map';
    const mapProvider = isMapWidget && this.widgetConfig.uiConfig?.mapProvider 
      ? this.widgetConfig.uiConfig.mapProvider 
      : undefined;
    
    return (
      <WidgetElement
        data={this.data}
        config={this.widgetConfig.uiConfig}
        map-provider={mapProvider}
        loading={this.loading}
        context={this.globalContext}
        debug={this.debug}
      />
    );
  }
  
  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[dashboard-widget-host:${this.area}] ${message}`, ...args);
    }
  }
  
  render() {
    // Grid area style applied to Host for CSS Grid positioning
    const hostStyle = {
      gridArea: this.area,
      display: 'block',
    };
    
    return (
      <Host style={hostStyle}>
        <div class="dashboard-widget-host">
          {this.loading && this.renderLoading()}
          {this.error && !this.loading && this.renderError()}
          {!this.loading && !this.error && this.renderWidget()}
        </div>
      </Host>
    );
  }
}

