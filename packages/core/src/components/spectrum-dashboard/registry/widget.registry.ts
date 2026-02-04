/**
 * Widget Registry
 * 
 * Maps widget component names from JSON configuration to actual HTML tag names.
 * Allows dynamic widget instantiation without hardcoding component types.
 */

import type { WidgetRegistry, TransformRegistry, ClientFilterRegistry } from '../types/dashboard.types';

/**
 * Widget component registry.
 * Maps JSON component names to HTML custom element tag names.
 */
export const widgetRegistry: WidgetRegistry = {
  // Filter components
  'filter-panel': 'spectrum-filter-panel',
  
  // KPI components
  'kpi-card': 'dash-kpi-card',
  'score-card': 'spectrum-score-card',
  
  // Chart components (using spectrum-chart)
  'line-chart': 'spectrum-chart',
  'bar-chart': 'spectrum-chart',
  'pie-chart': 'spectrum-chart',
  'doughnut-chart': 'spectrum-chart',
  'area-chart': 'spectrum-chart',
  'radar-chart': 'spectrum-chart',
  'polar-chart': 'spectrum-chart',
  'bubble-chart': 'spectrum-chart',
  'scatter-chart': 'spectrum-chart',
  
  // Data display components
  'data-table': 'spectrum-data-table',
  'data-grid': 'dash-data-grid',
  
  // Map components (using spectrum-map with different providers)
  'map': 'spectrum-map',
  'leaflet-map': 'spectrum-map',
  'maplibre-map': 'spectrum-map',
  
  // Navigation components
  'breadcrumb': 'spectrum-breadcrumb',
  
  // Content components
  'product-card': 'dash-product-card',
  'metric-card': 'dash-metric-card',
};

/**
 * Transform function registry.
 * Maps transform names to actual transformation functions.
 */
export const transformRegistry: TransformRegistry = {
  // Example transformations
  'normalize-sales-data': (data: any) => {
    if (!Array.isArray(data)) return data;
    return data.map(item => ({
      ...item,
      revenue: parseFloat(item.revenue || 0),
      units: parseInt(item.units || 0, 10),
    }));
  },
  
  'flatten-response': (data: any) => {
    return data?.data || data?.results || data;
  },
  
  'extract-metrics': (data: any) => {
    if (data?.metrics) return data.metrics;
    return data;
  },
};

/**
 * Client-side filter function registry.
 * Maps filter names to actual filter functions.
 */
export const clientFilterRegistry: ClientFilterRegistry = {
  /**
   * Default filter implementation.
   * Matches filter keys to object properties.
   */
  'default': (data: any[], filters: Record<string, any>): any[] => {
    if (!Array.isArray(data)) return data;
    if (Object.keys(filters).length === 0) return data;
    
    return data.filter(item => {
      for (const [key, value] of Object.entries(filters)) {
        // Skip undefined/null filters
        if (value === undefined || value === null) continue;
        
        // Array filters (for multiSelect)
        if (Array.isArray(value)) {
          if (value.length === 0) continue;
          if (!value.includes(item[key])) return false;
          continue;
        }
        
        // Date range filters
        if (typeof value === 'object' && value.start && value.end) {
          const itemDate = new Date(item[key]);
          const startDate = new Date(value.start);
          const endDate = new Date(value.end);
          
          if (itemDate < startDate || itemDate > endDate) return false;
          continue;
        }
        
        // Simple equality check
        if (item[key] !== value) return false;
      }
      
      return true;
    });
  },
  
  /**
   * Text search filter.
   * Performs case-insensitive text search across specified fields.
   */
  'text-search': (data: any[], filters: Record<string, any>): any[] => {
    if (!Array.isArray(data)) return data;
    
    const searchQuery = filters.search?.toLowerCase();
    if (!searchQuery) return data;
    
    return data.filter(item => {
      // Search across all string fields
      for (const value of Object.values(item)) {
        if (typeof value === 'string' && value.toLowerCase().includes(searchQuery)) {
          return true;
        }
      }
      return false;
    });
  },
  
  /**
   * Range filter for numeric values.
   */
  'numeric-range': (data: any[], filters: Record<string, any>): any[] => {
    if (!Array.isArray(data)) return data;
    
    return data.filter(item => {
      for (const [key, range] of Object.entries(filters)) {
        if (typeof range !== 'object' || !range.min || !range.max) continue;
        
        const value = parseFloat(item[key]);
        if (isNaN(value)) continue;
        
        if (value < range.min || value > range.max) return false;
      }
      return true;
    });
  },
};

/**
 * Widget Registry Manager
 * Provides methods for registering and retrieving widgets.
 */
export class WidgetRegistryManager {
  /**
   * Register a new widget component
   * 
   * @param name - Component name in JSON config
   * @param tagName - HTML custom element tag name
   */
  public static registerWidget(name: string, tagName: string): void {
    widgetRegistry[name] = tagName;
  }
  
  /**
   * Get widget tag name from component name
   * 
   * @param name - Component name from JSON config
   * @returns HTML tag name or undefined if not found
   */
  public static getWidget(name: string): string | undefined {
    return widgetRegistry[name];
  }
  
  /**
   * Check if widget is registered
   * 
   * @param name - Component name to check
   */
  public static hasWidget(name: string): boolean {
    return name in widgetRegistry;
  }
  
  /**
   * Get all registered widgets
   */
  public static getAllWidgets(): WidgetRegistry {
    return { ...widgetRegistry };
  }
  
  /**
   * Register a transform function
   * 
   * @param name - Transform function name
   * @param fn - Transform function
   */
  public static registerTransform(name: string, fn: (data: any) => any): void {
    transformRegistry[name] = fn;
  }
  
  /**
   * Get transform function
   * 
   * @param name - Transform function name
   */
  public static getTransform(name: string): ((data: any) => any) | undefined {
    return transformRegistry[name];
  }
  
  /**
   * Register a client filter function
   * 
   * @param name - Filter function name
   * @param fn - Filter function
   */
  public static registerFilter(
    name: string,
    fn: (data: any[], filters: Record<string, any>) => any[]
  ): void {
    clientFilterRegistry[name] = fn;
  }
  
  /**
   * Get client filter function
   * 
   * @param name - Filter function name
   * @returns Filter function or default filter
   */
  public static getFilter(name: string): (data: any[], filters: Record<string, any>) => any[] {
    return clientFilterRegistry[name] || clientFilterRegistry['default'];
  }
}

// Export registries
export default {
  widgetRegistry,
  transformRegistry,
  clientFilterRegistry,
  WidgetRegistryManager,
};

