import { Component, Host, h, Prop, Event, EventEmitter, State, Watch, Element, Listen } from '@stencil/core';
import type {
  DashboardConfig,
  DashboardNavEvent,
  DataRefreshEvent,
  MultiViewDashboardConfig,
  ViewConfig,
  BreadcrumbItem,
} from './types/dashboard.types';
import { DataSourceManager } from './services/data-source-manager';
import DashboardStore from './store/dashboard.store';
import { WidgetRegistryManager } from './registry/widget.registry';

@Component({
  tag: 'spectrum-dashboard',
  styleUrl: 'spectrum-dashboard.scss',
  shadow: false,
})
export class SpectrumDashboard {
  @Element() element: HTMLElement;
  
  /**
   * Dashboard configuration (JSON-driven)
   * Can be a JSON string or object
   * Supports both single-view (DashboardConfig) and multi-view (MultiViewDashboardConfig)
   */
  @Prop() config!: DashboardConfig | MultiViewDashboardConfig | string;
  
  /**
   * Global context for all widgets (userId, authToken, etc.)
   */
  @Prop() context: Record<string, any> = {};
  
  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;
  
  /**
   * Parsed configuration object (single-view mode)
   */
  @State() parsedConfig: DashboardConfig | null = null;
  
  /**
   * Multi-view configuration (multi-view mode)
   */
  @State() multiViewConfig: MultiViewDashboardConfig | null = null;
  
  /**
   * Whether dashboard is in multi-view mode
   */
  @State() isMultiView: boolean = false;
  
  /**
   * Current view ID (multi-view mode)
   */
  @State() currentViewId: string = '';
  
  /**
   * Current navigation context (multi-view mode)
   */
  @State() currentContext: Record<string, any> = {};
  
  /**
   * Navigation history for breadcrumbs (multi-view mode)
   */
  @State() navigationHistory: Array<{ viewId: string; context: Record<string, any>; label: string }> = [];
  
  /**
   * Data source manager instance
   */
  private dataSourceManager: DataSourceManager;
  
  /**
   * Unsubscribe functions for store listeners
   */
  private unsubscribers: Array<() => void> = [];
  
  /**
   * Event emitted when navigation/drill-down is requested
   */
  @Event({
    eventName: 'dashboardNav',
    bubbles: true,
    composed: true,
    cancelable: true
  }) dashboardNav: EventEmitter<DashboardNavEvent>;
  
  /**
   * Event emitted when data refresh is requested
   */
  @Event({
    eventName: 'dataRefresh',
    bubbles: true,
    composed: true,
    cancelable: false
  }) dataRefresh: EventEmitter<DataRefreshEvent>;
  
  /**
   * Watch for config changes
   */
  @Watch('config')
  onConfigChange() {
    this.parseConfig();
  }
  
  /**
   * Watch for context changes
   */
  @Watch('context')
  onContextChange() {
    DashboardStore.updateContext(this.context);
    // Merge external context with internal context in multi-view mode
    if (this.isMultiView) {
      this.currentContext = { ...this.currentContext, ...this.context };
    }
  }
  
  /**
   * Listen for dashboardNav events from child widgets (multi-view mode)
   * This enables automatic navigation without external event handlers
   */
  @Listen('dashboardNav')
  handleDashboardNav(event: CustomEvent<DashboardNavEvent>) {
    if (!this.isMultiView) {
      // In single-view mode, let the event bubble up for external handling
      return;
    }
    
    // Prevent the event from bubbling further - we're handling it internally
    event.stopPropagation();
    
    const { viewId, context } = event.detail;
    this.debugLog('Internal navigation:', { viewId, context });
    
    this.navigateToView(viewId, context);
  }
  
  /**
   * Listen for breadcrumbClick events (multi-view mode)
   */
  @Listen('breadcrumbClick')
  handleBreadcrumbClick(event: CustomEvent<{ viewId: string; context?: Record<string, any>; index: number }>) {
    if (!this.isMultiView) {
      return;
    }
    
    event.stopPropagation();
    
    const { viewId, index } = event.detail;
    this.debugLog('Breadcrumb click:', { viewId, index });
    
    // Navigate back to the clicked breadcrumb level
    this.navigateBack(viewId, index);
  }
  
  /**
   * Navigate to a view in multi-view mode
   */
  private navigateToView(viewId: string, context: Record<string, any>) {
    if (!this.multiViewConfig?.views[viewId]) {
      console.warn(`[spectrum-dashboard] View not found: ${viewId}`);
      return;
    }
    
    const initialViewId = this.multiViewConfig.navigation.initialView;
    
    // Store current view in history before navigating
    // Skip adding to history if it's the initial view (it's always shown explicitly in breadcrumbs)
    if (this.currentViewId && this.currentViewId !== viewId && this.currentViewId !== initialViewId) {
      const currentView = this.multiViewConfig.views[this.currentViewId];
      const label = this.interpolateTemplate(
        currentView?.breadcrumbLabel || this.currentViewId,
        this.currentContext
      );
      
      this.navigationHistory = [
        ...this.navigationHistory,
        { viewId: this.currentViewId, context: { ...this.currentContext }, label }
      ];
    }
    
    // Update state
    this.currentViewId = viewId;
    this.currentContext = { ...this.currentContext, ...context };
    
    this.debugLog('Navigated to view:', { viewId, context: this.currentContext, history: this.navigationHistory });
  }
  
  /**
   * Navigate back to a previous view
   */
  private navigateBack(targetViewId: string, _historyIndex: number) {
    // Find the target in history
    const targetIndex = this.navigationHistory.findIndex(h => h.viewId === targetViewId);
    
    if (targetIndex === -1) {
      // If it's the initial view, reset everything
      if (targetViewId === this.multiViewConfig?.navigation.initialView) {
        this.currentViewId = targetViewId;
        this.currentContext = { ...this.context };
        this.navigationHistory = [];
        return;
      }
      return;
    }
    
    // Restore context from history
    const historyEntry = this.navigationHistory[targetIndex];
    this.currentViewId = targetViewId;
    this.currentContext = { ...historyEntry.context };
    
    // Truncate history to this point
    this.navigationHistory = this.navigationHistory.slice(0, targetIndex);
    
    this.debugLog('Navigated back:', { viewId: targetViewId, context: this.currentContext });
  }
  
  /**
   * Component lifecycle: Initialize dashboard
   */
  componentWillLoad() {
    this.debugLog('Dashboard initializing...');
    
    // Get singleton data source manager
    this.dataSourceManager = DataSourceManager.getInstance();
    this.dataSourceManager.setDebug(this.debug);
    
    // Parse configuration
    this.parseConfig();
    
    // Initialize store with context
    DashboardStore.updateContext(this.context);
    
    // Subscribe to navigation events from the store
    this.unsubscribers.push(
      DashboardStore.onNavigationChange((nav) => {
        if (!nav) return;
        
        if (this.isMultiView) {
          // In multi-view mode, handle navigation internally
          this.debugLog('Store navigation event (multi-view):', nav);
          this.navigateToView(nav.viewId, nav.context);
        } else {
          // In single-view mode, emit event for external handling
          this.debugLog('Navigation event (external):', nav);
          this.dashboardNav.emit({
            action: 'navigate',
            viewId: nav.viewId,
            context: nav.context,
          });
        }
      })
    );
    
    this.debugLog('Dashboard initialized', {
      config: this.parsedConfig?.id || this.multiViewConfig?.id,
      isMultiView: this.isMultiView,
      context: this.context,
    });
  }
  
  /**
   * Component lifecycle: Cleanup
   */
  disconnectedCallback() {
    this.debugLog('Dashboard disconnecting...');
    
    // Unsubscribe from all store listeners
    this.unsubscribers.forEach(unsub => unsub());
    this.unsubscribers = [];
    
    this.debugLog('Dashboard disconnected');
  }
  
  /**
   * Parse configuration from string or object
   * Detects multi-view vs single-view configuration automatically
   */
  private parseConfig() {
    try {
      let rawConfig: any;
      
      if (typeof this.config === 'string') {
        rawConfig = JSON.parse(this.config);
      } else {
        rawConfig = this.config;
      }
      
      // Detect multi-view configuration by checking for 'views' and 'navigation' properties
      if (rawConfig.views && rawConfig.navigation) {
        this.debugLog('Detected multi-view configuration');
        this.isMultiView = true;
        this.multiViewConfig = rawConfig as MultiViewDashboardConfig;
        this.parsedConfig = null;
        
        // Initialize to initial view
        this.currentViewId = this.multiViewConfig.navigation.initialView;
        this.currentContext = { ...this.context };
        this.navigationHistory = [];
        
        // Register shared data sources
        if (this.multiViewConfig.sharedDataSources) {
          for (const [id] of Object.entries(this.multiViewConfig.sharedDataSources)) {
            this.debugLog(`Registered shared data source: ${id}`);
          }
        }
        
        this.debugLog('Multi-view config parsed successfully', {
          id: this.multiViewConfig.id,
          views: Object.keys(this.multiViewConfig.views),
          initialView: this.currentViewId,
        });
      } else {
        // Single-view configuration
        this.debugLog('Detected single-view configuration');
        this.isMultiView = false;
        this.multiViewConfig = null;
        this.parsedConfig = rawConfig as DashboardConfig;
        
        // Pre-register data sources with DataSourceManager
        if (this.parsedConfig?.dataSources) {
          for (const [id] of Object.entries(this.parsedConfig.dataSources)) {
            this.debugLog(`Registered data source: ${id}`);
          }
        }
        
        // Initialize filters with default values
        if (this.parsedConfig?.filters) {
          const defaultFilters: Record<string, any> = {};
          for (const [key, filter] of Object.entries(this.parsedConfig.filters)) {
            if (filter.defaultValue !== undefined) {
              defaultFilters[key] = filter.defaultValue;
            }
          }
          if (Object.keys(defaultFilters).length > 0) {
            DashboardStore.updateFilters(defaultFilters);
          }
        }
        
        this.debugLog('Single-view config parsed successfully', this.parsedConfig);
      }
    } catch (error) {
      console.error('[spectrum-dashboard] Failed to parse config:', error);
      this.parsedConfig = null;
      this.multiViewConfig = null;
    }
  }
  
  /**
   * Interpolate template variables in a string
   * Supports: {{context.fieldName}}, {{fieldName}}
   * 
   * @example
   * interpolateTemplate("Store: {{context.storeName}}", { storeName: "Manhattan" })
   * // Returns: "Store: Manhattan"
   */
  private interpolateTemplate(template: string, context: Record<string, any>): string {
    if (!template) return template;
    
    return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      const trimmedPath = path.trim();
      
      // Handle context.fieldName format
      if (trimmedPath.startsWith('context.')) {
        const fieldName = trimmedPath.substring(8);
        return context[fieldName] !== undefined ? String(context[fieldName]) : match;
      }
      
      // Handle direct fieldName format
      return context[trimmedPath] !== undefined ? String(context[trimmedPath]) : match;
    });
  }
  
  /**
   * Get the effective configuration for the current view (multi-view mode)
   */
  private getCurrentViewConfig(): ViewConfig | null {
    if (!this.isMultiView || !this.multiViewConfig) {
      return null;
    }
    
    return this.multiViewConfig.views[this.currentViewId] || null;
  }
  
  /**
   * Get merged data sources (shared + view-specific)
   */
  private getMergedDataSources(): Record<string, any> {
    if (!this.isMultiView || !this.multiViewConfig) {
      return this.parsedConfig?.dataSources || {};
    }
    
    const currentView = this.getCurrentViewConfig();
    return {
      ...this.multiViewConfig.sharedDataSources,
      ...currentView?.dataSources,
    };
  }
  
  /**
   * Generate breadcrumb items for current navigation state
   */
  private generateBreadcrumbs(): BreadcrumbItem[] {
    if (!this.isMultiView || !this.multiViewConfig) {
      return [];
    }
    
    const navConfig = this.multiViewConfig.navigation;
    if (navConfig.enableBreadcrumbs === false) {
      return [];
    }
    
    const breadcrumbs: BreadcrumbItem[] = [];
    
    // Add initial view
    const initialView = this.multiViewConfig.views[navConfig.initialView];
    const initialLabel = this.interpolateTemplate(
      initialView?.breadcrumbLabel || navConfig.initialView,
      {}
    );
    breadcrumbs.push({
      label: initialLabel,
      viewId: navConfig.initialView,
    });
    
    // Add history items
    for (const historyItem of this.navigationHistory) {
      breadcrumbs.push({
        label: historyItem.label,
        viewId: historyItem.viewId,
        context: historyItem.context,
      });
    }
    
    // Add current view (if different from initial and not in history)
    if (this.currentViewId !== navConfig.initialView) {
      const currentView = this.getCurrentViewConfig();
      const currentLabel = this.interpolateTemplate(
        currentView?.breadcrumbLabel || this.currentViewId,
        this.currentContext
      );
      breadcrumbs.push({
        label: currentLabel,
        viewId: this.currentViewId,
        context: this.currentContext,
      });
    }
    
    return breadcrumbs;
  }
  
  /**
   * Generate CSS Grid styles from layout configuration
   */
  private getGridStyles(): Record<string, string> {
    let layout;
    
    if (this.isMultiView) {
      const currentView = this.getCurrentViewConfig();
      layout = currentView?.layout;
    } else {
      layout = this.parsedConfig?.layout;
    }
    
    if (!layout) return {};
    
    return {
      display: 'grid',
      'grid-template-areas': layout.template.map(row => `"${row}"`).join(' '),
      'grid-template-columns': layout.columns || 'repeat(auto-fit, minmax(200px, 1fr))',
      'grid-template-rows': layout.rows || 'auto',
      gap: layout.gap || '16px',
    };
  }
  
  /**
   * Render grid areas with widget hosts
   */
  private renderWidgets() {
    let widgetDefs: Record<string, any>;
    let dataSources: Record<string, any>;
    let effectiveContext: Record<string, any>;
    
    if (this.isMultiView) {
      const currentView = this.getCurrentViewConfig();
      if (!currentView?.widgets) return null;
      
      widgetDefs = currentView.widgets;
      dataSources = this.getMergedDataSources();
      effectiveContext = { ...this.context, ...this.currentContext };
    } else {
      if (!this.parsedConfig?.widgets) return null;
      
      widgetDefs = this.parsedConfig.widgets;
      dataSources = this.parsedConfig.dataSources || {};
      effectiveContext = this.context;
    }
    
    const widgets = [];
    
    for (const [areaName, widgetDef] of Object.entries(widgetDefs)) {
      const tagName = WidgetRegistryManager.getWidget(widgetDef.component);
      
      if (!tagName) {
        console.warn(`[spectrum-dashboard] Widget type not found in registry: ${widgetDef.component}`);
        continue;
      }
      
      // For breadcrumb widgets in multi-view mode, inject generated items
      let enhancedWidgetDef = widgetDef;
      if (this.isMultiView && widgetDef.component === 'breadcrumb') {
        const generatedBreadcrumbs = this.generateBreadcrumbs();
        enhancedWidgetDef = {
          ...widgetDef,
          uiConfig: {
            ...widgetDef.uiConfig,
            items: generatedBreadcrumbs,
            showHome: this.multiViewConfig?.navigation?.breadcrumb?.showHome || false,
          },
        };
      }
      
      // Render widget host wrapper
      widgets.push(
        <dashboard-widget-host
          key={areaName + '-' + this.currentViewId}
          area={areaName}
          widgetConfig={enhancedWidgetDef}
          dataSourceManager={this.dataSourceManager}
          globalContext={effectiveContext}
          dataSources={dataSources}
          debug={this.debug}
        />
      );
    }
    
    return widgets;
  }
  
  /**
   * Render error state
   */
  private renderError() {
    return (
      <div class="spectrum-dashboard spectrum-dashboard--error">
        <div class="dashboard__error">
          <h3 class="dashboard__error-title">Configuration Error</h3>
          <p class="dashboard__error-message">
            Failed to parse dashboard configuration. Please check the config format.
          </p>
        </div>
      </div>
    );
  }
  
  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-dashboard] ${message}`, ...args);
    }
  }
  
  render() {
    this.debugLog('Rendering dashboard', { 
      isMultiView: this.isMultiView, 
      currentViewId: this.currentViewId 
    });
    
    // Error state - check both config types
    if (!this.parsedConfig && !this.multiViewConfig) {
      return this.renderError();
    }
    
    // Multi-view: check current view exists
    if (this.isMultiView) {
      const currentView = this.getCurrentViewConfig();
      if (!currentView) {
        return (
          <Host class="dashboard-host">
            <div class="spectrum-dashboard spectrum-dashboard--error">
              <div class="dashboard__error">
                <h3 class="dashboard__error-title">View Not Found</h3>
                <p class="dashboard__error-message">
                  View "{this.currentViewId}" does not exist in configuration.
                </p>
              </div>
            </div>
          </Host>
        );
      }
    }
    
    // Get grid styles
    const gridStyles = this.getGridStyles();
    
    return (
      <Host class="dashboard-host">
        <div class="spectrum-dashboard" style={gridStyles}>
          {this.renderWidgets()}
        </div>
      </Host>
    );
  }
}
