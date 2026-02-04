/**
 * Drill-Down Manager Service
 * 
 * Centralized service for processing drill-down actions from widget events.
 * Coordinates with DashboardStore to update filters, navigation, and context.
 */

import DashboardStore from '../store/dashboard.store';
import type { DrillDownConfig } from '../types/dashboard.types';

/**
 * DrillDownManager - Static service for processing drill-down actions.
 * 
 * This service acts as the central coordinator for all drill-down interactions.
 * It receives events from widgets, processes them according to configuration,
 * and updates the appropriate state in the DashboardStore.
 */
export class DrillDownManager {
  private static debug: boolean = false;
  
  /**
   * Enable or disable debug logging
   */
  public static setDebug(enabled: boolean): void {
    this.debug = enabled;
  }
  
  private static debugLog(message: string, ...args: any[]): void {
    if (this.debug) {
      console.log(`[DrillDownManager] ${message}`, ...args);
    }
  }
  
  /**
   * Main entry point - processes drill-down action from widget event.
   * 
   * @param config - Drill-down configuration from widget definition
   * @param eventData - Event payload from widget (chart click, row click, etc.)
   * @param sourceWidget - ID of the widget that triggered the drill-down
   */
  public static processDrillDown(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void {
    if (!config || !config.action) {
      console.warn('[DrillDownManager] Invalid drill-down config:', config);
      return;
    }
    
    // Route to appropriate handler based on action type
    switch (config.action) {
      case 'cross-filter':
        this.handleCrossFilter(config, eventData, sourceWidget);
        break;
      
      case 'hierarchical-nav':
        this.handleHierarchicalNav(config, eventData, sourceWidget);
        break;
      
      case 'detail-panel':
        this.handleDetailPanel(config, eventData, sourceWidget);
        break;
      
      case 'dashboard-nav':
        this.handleDashboardNav(config, eventData, sourceWidget);
        break;
      
      default:
        console.warn('[DrillDownManager] Unknown drill-down action:', config.action);
    }
  }
  
  /**
   * Handle cross-widget filtering.
   * Updates global filter state to filter other widgets in the same dashboard.
   * 
   * @param config - Drill-down configuration
   * @param eventData - Event payload from widget
   * @param sourceWidget - Source widget ID
   */
  private static handleCrossFilter(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void {
    if (!config.filterMappings) {
      console.warn('[DrillDownManager] Cross-filter action requires filterMappings');
      return;
    }
    
    const filters: Record<string, any> = {};
    
    // Map event data to filters
    Object.entries(config.filterMappings).forEach(([sourceField, filterKey]) => {
      if (eventData[sourceField] !== undefined) {
        filters[filterKey] = eventData[sourceField];
      }
    });
    
    if (Object.keys(filters).length > 0) {
      this.debugLog('Cross-filter:', { filters, sourceWidget });
      DashboardStore.updateFilters(filters);
    }
  }
  
  /**
   * Handle hierarchical navigation with breadcrumbs.
   * Navigates to a detail view while maintaining breadcrumb trail for back navigation.
   * 
   * @param config - Drill-down configuration
   * @param eventData - Event payload from widget
   * @param sourceWidget - Source widget ID
   */
  private static handleHierarchicalNav(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void {
    if (!config.targetView) {
      console.warn('[DrillDownManager] Hierarchical navigation requires targetView');
      return;
    }
    
    // Build context from mapping
    const context = this.buildContext(config.contextMapping, eventData);
    
    // Preserve current filters if configured
    if (config.preserveFilters) {
      context.filters = DashboardStore.getFilters();
    }
    
    // Build breadcrumb trail
    const breadcrumb = this.buildBreadcrumb(config, eventData);
    
    this.debugLog('Hierarchical navigation:', {
      targetView: config.targetView,
      context,
      breadcrumb,
      sourceWidget
    });
    
    // Navigate with breadcrumb trail
    DashboardStore.navigate(config.targetView, context, breadcrumb);
  }
  
  /**
   * Handle detail panel display.
   * Updates context to trigger detail panel rendering without navigation.
   * 
   * @param config - Drill-down configuration
   * @param eventData - Event payload from widget
   * @param sourceWidget - Source widget ID
   */
  private static handleDetailPanel(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void {
    // Build context from mapping
    const mappedContext = this.buildContext(config.contextMapping, eventData);
    
    this.debugLog('Detail panel:', {
      data: mappedContext,
      panelConfig: config.detailPanel,
      sourceWidget
    });
    
    // Update context with detail panel data
    DashboardStore.updateContext({
      detailPanel: {
        visible: true,
        data: mappedContext,
        config: config.detailPanel,
        sourceWidget: sourceWidget,
      }
    });
  }
  
  /**
   * Handle dashboard navigation.
   * Navigates to a completely different dashboard view.
   * 
   * @param config - Drill-down configuration
   * @param eventData - Event payload from widget
   * @param sourceWidget - Source widget ID
   */
  private static handleDashboardNav(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void {
    if (!config.targetView) {
      console.warn('[DrillDownManager] Dashboard navigation requires targetView');
      return;
    }
    
    // Build context from mapping
    const context = this.buildContext(config.contextMapping, eventData);
    
    this.debugLog('Dashboard navigation:', {
      targetView: config.targetView,
      context,
      sourceWidget
    });
    
    // Navigate without breadcrumb (clean navigation)
    DashboardStore.navigate(config.targetView, context);
  }
  
  /**
   * Build context object from mapping and event data.
   * Maps fields from event data to context keys.
   * 
   * @param mapping - Context mapping configuration
   * @param eventData - Event payload from widget
   * @returns Context object for target view
   */
  private static buildContext(
    mapping: Record<string, string> | undefined,
    eventData: any
  ): Record<string, any> {
    // If no mapping provided, include all event data
    if (!mapping) {
      return { sourceData: eventData };
    }
    
    const context: Record<string, any> = {};
    
    // Determine the data source for field mapping:
    // - For table rows: eventData.row contains the actual data
    // - For chart elements: eventData.data or eventData directly
    // - For map markers: eventData.data or eventData directly (already flattened)
    const dataSource = eventData.row || eventData.data || eventData;
    
    // Map each field from data source to context
    Object.entries(mapping).forEach(([contextKey, sourceField]) => {
      if (dataSource[sourceField] !== undefined) {
        context[contextKey] = dataSource[sourceField];
      } else if (eventData[sourceField] !== undefined) {
        // Fallback to direct event data lookup
        context[contextKey] = eventData[sourceField];
      } else {
        console.warn(`[DrillDownManager] Source field "${sourceField}" not found in event data:`, { eventData, dataSource });
      }
    });
    
    return context;
  }
  
  /**
   * Build breadcrumb trail for hierarchical navigation.
   * Appends current navigation to existing breadcrumb.
   * 
   * @param config - Drill-down configuration
   * @param eventData - Event payload from widget
   * @returns Array of breadcrumb items
   */
  private static buildBreadcrumb(
    config: DrillDownConfig,
    eventData: any
  ): Array<{ label: string; viewId: string; context?: Record<string, any> }> {
    // Get current navigation state
    const currentNav = DashboardStore.getNavigation();
    const existingCrumbs = currentNav?.breadcrumb || [];
    
    // Create label from template or event data
    let label = config.breadcrumbLabel || eventData.label || 'Detail';
    
    // Replace placeholders in label with event data
    Object.keys(eventData).forEach(key => {
      const placeholder = `{${key}}`;
      if (label.includes(placeholder)) {
        label = label.replace(placeholder, String(eventData[key]));
      }
    });
    
    // Build context for this breadcrumb item
    const context = this.buildContext(config.contextMapping, eventData);
    
    // Add current view to breadcrumb trail
    return [
      ...existingCrumbs,
      {
        label: label,
        viewId: config.targetView!,
        context: context
      }
    ];
  }
}

export default DrillDownManager;

