/**
 * Dashboard Store - Centralized State Management
 * 
 * Uses @stencil/store for lightweight, reactive state management.
 * Provides global state for filters, context, and navigation across all widgets.
 */

import { createStore } from '@stencil/store';
import type { DashboardState, FilterChangeEvent } from '../types/dashboard.types';

/**
 * Create the dashboard store with initial state
 */
const { state, onChange, reset, dispose } = createStore<DashboardState>({
  filters: {},
  context: {},
  navigation: undefined,
  loadingStates: {},
});

/**
 * Dashboard Store API
 * Provides methods for updating and subscribing to dashboard state.
 */
export class DashboardStore {
  /**
   * Get the current state
   */
  public static getState(): DashboardState {
    return { ...state };
  }
  
  /**
   * Update filter values.
   * Merges new filters with existing filters.
   * 
   * @param filterKey - The filter key to update
   * @param value - The new filter value
   */
  public static updateFilter(filterKey: string, value: any): void {
    state.filters = {
      ...state.filters,
      [filterKey]: value,
    };
  }
  
  /**
   * Update multiple filters at once
   * 
   * @param filters - Object containing multiple filter key-value pairs
   */
  public static updateFilters(filters: Record<string, any>): void {
    state.filters = {
      ...state.filters,
      ...filters,
    };
  }
  
  /**
   * Clear a specific filter
   * 
   * @param filterKey - The filter key to clear
   */
  public static clearFilter(filterKey: string): void {
    const newFilters = { ...state.filters };
    delete newFilters[filterKey];
    state.filters = newFilters;
  }
  
  /**
   * Clear all filters
   */
  public static clearAllFilters(): void {
    state.filters = {};
  }
  
  /**
   * Get current filter values
   */
  public static getFilters(): Record<string, any> {
    return { ...state.filters };
  }
  
  /**
   * Get a specific filter value
   * 
   * @param filterKey - The filter key to retrieve
   */
  public static getFilter(filterKey: string): any {
    return state.filters[filterKey];
  }
  
  /**
   * Update global context
   * 
   * @param context - Context object to merge with existing context
   */
  public static updateContext(context: Record<string, any>): void {
    state.context = {
      ...state.context,
      ...context,
    };
  }
  
  /**
   * Get global context
   */
  public static getContext(): Record<string, any> {
    return { ...state.context };
  }
  
  /**
   * Update navigation state (for drill-down)
   * 
   * @param viewId - Target view ID
   * @param context - Context to pass to next view
   * @param breadcrumb - Optional breadcrumb trail
   */
  public static navigate(
    viewId: string,
    context: Record<string, any>,
    breadcrumb?: Array<{ label: string; viewId: string; context?: Record<string, any> }>
  ): void {
    state.navigation = {
      viewId,
      context,
      breadcrumb,
    };
  }
  
  /**
   * Clear navigation state
   */
  public static clearNavigation(): void {
    state.navigation = undefined;
  }
  
  /**
   * Get navigation state
   */
  public static getNavigation() {
    return state.navigation ? { ...state.navigation } : undefined;
  }
  
  /**
   * Update loading state for a data source
   * 
   * @param dataSourceId - Data source ID
   * @param loading - Loading state
   */
  public static setLoading(dataSourceId: string, loading: boolean): void {
    state.loadingStates = {
      ...state.loadingStates,
      [dataSourceId]: loading,
    };
  }
  
  /**
   * Get loading state for a data source
   * 
   * @param dataSourceId - Data source ID
   */
  public static isLoading(dataSourceId: string): boolean {
    return state.loadingStates?.[dataSourceId] || false;
  }
  
  /**
   * Subscribe to filter changes
   * 
   * @param callback - Function to call when filters change
   * @returns Unsubscribe function
   */
  public static onFilterChange(
    callback: (filters: Record<string, any>) => void
  ): () => void {
    return onChange('filters', callback);
  }
  
  /**
   * Subscribe to specific filter key changes
   * 
   * @param filterKey - The filter key to watch
   * @param callback - Function to call when the filter changes
   * @returns Unsubscribe function
   */
  public static onFilterKeyChange(
    filterKey: string,
    callback: (value: any) => void
  ): () => void {
    return onChange('filters', (filters) => {
      if (filters[filterKey] !== undefined) {
        callback(filters[filterKey]);
      }
    });
  }
  
  /**
   * Subscribe to context changes
   * 
   * @param callback - Function to call when context changes
   * @returns Unsubscribe function
   */
  public static onContextChange(
    callback: (context: Record<string, any>) => void
  ): () => void {
    return onChange('context', callback);
  }
  
  /**
   * Subscribe to navigation changes
   * 
   * @param callback - Function to call when navigation changes
   * @returns Unsubscribe function
   */
  public static onNavigationChange(
    callback: (navigation: DashboardState['navigation']) => void
  ): () => void {
    return onChange('navigation', callback);
  }
  
  /**
   * Subscribe to any state change
   * 
   * @param callback - Function to call when any state changes
   * @returns Unsubscribe function
   */
  public static onStateChange(
    callback: (state: DashboardState) => void
  ): () => void {
    const unsubscribers = [
      onChange('filters', () => callback(DashboardStore.getState())),
      onChange('context', () => callback(DashboardStore.getState())),
      onChange('navigation', () => callback(DashboardStore.getState())),
    ];
    
    // Return combined unsubscribe function
    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }
  
  /**
   * Reset store to initial state
   */
  public static reset(): void {
    reset();
  }
  
  /**
   * Dispose of the store (cleanup)
   */
  public static dispose(): void {
    dispose();
  }
  
  /**
   * Create a filter change event payload
   * 
   * @param filterKey - Filter key that changed
   * @param value - New filter value
   */
  public static createFilterEvent(filterKey: string, value: any): FilterChangeEvent {
    return {
      action: 'filterChange',
      filterKey,
      value,
      filters: DashboardStore.getFilters(),
    };
  }
}

// Export the store instance for direct access if needed
export { state, onChange, reset, dispose };

// Export default store API
export default DashboardStore;



