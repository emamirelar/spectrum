/**
 * Dashboard Component Type Definitions
 * 
 * Comprehensive type system for the JSON-driven dashboard engine.
 * All types are strictly typed with no 'any' in public APIs.
 */

/**
 * Multi-view dashboard configuration.
 * Enables 100% JSON-configurable drill-down navigation without code.
 * 
 * @example
 * {
 *   "id": "store-analytics",
 *   "navigation": {
 *     "initialView": "overview",
 *     "enableBreadcrumbs": true
 *   },
 *   "views": {
 *     "overview": { layout: {...}, widgets: {...} },
 *     "detail": { layout: {...}, widgets: {...} }
 *   }
 * }
 */
export interface MultiViewDashboardConfig {
  /** Unique identifier for this dashboard */
  id: string;
  
  /** Navigation configuration */
  navigation: NavigationConfig;
  
  /** View definitions keyed by viewId */
  views: {
    [viewId: string]: ViewConfig;
  };
  
  /**
   * Shared data sources available to all views.
   * Views can also define their own data sources.
   */
  sharedDataSources?: {
    [id: string]: DataSourceConfig;
  };
}

/**
 * Navigation configuration for multi-view dashboards
 */
export interface NavigationConfig {
  /** Which view to show initially */
  initialView: string;
  
  /** Enable automatic breadcrumb management (default: true) */
  enableBreadcrumbs?: boolean;
  
  /** Breadcrumb configuration */
  breadcrumb?: {
    /** Show home link (default: false for multi-view) */
    showHome?: boolean;
    /** Home label if showHome is true */
    homeLabel?: string;
    /** Separator character */
    separator?: string;
  };
}

/**
 * Single view configuration within a multi-view dashboard
 */
export interface ViewConfig {
  /** CSS Grid Layout Definition */
  layout: LayoutConfig;
  
  /** Widgets for this view */
  widgets: {
    [gridAreaName: string]: WidgetDefinition;
  };
  
  /**
   * Data sources specific to this view.
   * Merged with sharedDataSources at runtime.
   */
  dataSources?: {
    [id: string]: DataSourceConfig;
  };
  
  /** Global filter definitions for this view */
  filters?: {
    [filterId: string]: FilterDefinition;
  };
  
  /**
   * Breadcrumb label for this view.
   * Supports template variables: {{context.fieldName}}
   * 
   * @example "{{context.storeName}}" -> "Manhattan Store"
   */
  breadcrumbLabel?: string;
}

/**
 * Main dashboard configuration interface.
 * Defines the complete structure for a dashboard view including layout,
 * data sources, widgets, and filters.
 */
export interface DashboardConfig {
  /** Unique identifier for this specific dashboard view/page */
  id: string;
  
  /** CSS Grid Layout Definition */
  layout: LayoutConfig;
  
  /**
   * Centralized data source definitions.
   * Multiple widgets can reference the same dataSourceId to share data.
   */
  dataSources?: {
    [id: string]: DataSourceConfig;
  };
  
  /** The widgets to populate the grid areas */
  widgets: {
    [gridAreaName: string]: WidgetDefinition;
  };
  
  /**
   * Global filter definitions (optional).
   * Defines the schema for filters that widgets can subscribe to.
   */
  filters?: {
    [filterId: string]: FilterDefinition;
  };
}

/**
 * CSS Grid layout configuration.
 * Uses grid template areas for declarative, visual layout definition.
 */
export interface LayoutConfig {
  /**
   * Visual grid definition using CSS Grid Template Areas.
   * Each string represents a row, each word represents a column.
   * 
   * @example
   * [
   *   "header header header",
   *   "menu   main   main",
   *   "menu   footer footer"
   * ]
   */
  template: string[];
  
  /** CSS Grid gap (default: "16px") */
  gap?: string;
  
  /** Column definitions (default: "1fr") */
  columns?: string;
  
  /** Row definitions (optional, default: auto) */
  rows?: string;
}

/**
 * Data source configuration for API endpoints.
 * Supports caching, filtering, and transformation.
 */
export interface DataSourceConfig {
  /** Unique identifier for deduplication and caching */
  id: string;
  
  /** API endpoint URL (supports template variables like ${productId}) */
  endpoint: string;
  
  /** HTTP method (default: GET) */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  
  /** Static parameters always sent with request */
  params?: Record<string, any>;
  
  /** 
   * Cache duration in milliseconds (default: 300000 = 5 minutes).
   * Set to 0 to disable caching.
   */
  refreshInterval?: number;
  
  /** Does the API support server-side filtering? */
  supportsServerFiltering?: boolean;
  
  /**
   * Data transformation configuration using JSONata
   * Applied to response data before caching
   */
  transform?: {
    /** JSONata expression or simple field mapping */
    expression?: string;
    /** JSONPath to extract data from nested response */
    path?: string;
    /** Simple field mapping (alternative to expression) */
    mapping?: Record<string, string>;
  };
  
  /** 
   * Maps filter keys to API parameter names.
   * Used for server-side filtering.
   * 
   * @example
   * { "regionId": "region", "dateRange": "date_range" }
   */
  filterParamMap?: Record<string, string>;
  
  /** 
   * Transform response before caching (function name in registry).
   * Allows for data normalization and preprocessing.
   */
  transformResponse?: string;
  
  /** Request headers (supports template variables from context) */
  headers?: Record<string, string>;
}

/**
 * Result object returned by data source requests.
 * Includes data, loading state, error state, and metadata.
 */
export interface DataSourceResult<T = any> {
  /** The fetched data (type-safe generic) */
  data: T;
  
  /** Whether data is currently being fetched */
  loading: boolean;
  
  /** Error object if request failed */
  error: Error | null;
  
  /** Timestamp of when data was last fetched */
  lastFetched: number;
  
  /** Whether data is from cache */
  fromCache?: boolean;
}

/**
 * Widget definition in the dashboard configuration.
 * Defines widget type, data sources, filtering behavior, and UI configuration.
 */
export interface WidgetDefinition {
  /** The type of widget to render (maps to WidgetRegistry) */
  component: string; // e.g., "kpi-card", "line-chart", "data-table"
  
  /** Static UI configuration passed to the widget */
  uiConfig: Record<string, any>; // e.g., { title: "Q3 Revenue", color: "blue" }
  
  /**
   * Reference to a shared data source.
   * Preferred over inline 'data' config for sharing and deduplication.
   */
  dataSourceId?: string;
  
  /**
   * Inline data source definition (legacy support).
   * Use dataSourceId instead for better performance and sharing.
   */
  data?: DataSourceConfig;
  
  /** Filtering behavior configuration */
  filtering?: FilterConfig;
  
  /**
   * State keys this widget publishes or subscribes to.
   * Enables inter-widget communication via the event bus.
   */
  bus?: {
    /** Keys this widget publishes (e.g., ["dateRange"]) */
    publish?: string[];
    
    /** Keys this widget subscribes to (e.g., ["regionId"]) */
    subscribe?: string[];
  };
  
  /**
   * Drill-down interaction configuration.
   * Defines how user interactions (clicks) trigger navigation or filtering.
   */
  drillDown?: DrillDownConfig;
}

/**
 * Filter configuration for widgets.
 * Defines how widgets respond to filter changes.
 */
export interface FilterConfig {
  /** Which filter keys should trigger data refresh? */
  subscribe?: string[];
  
  /** 
   * How should filters be applied?
   * - 'client': Always filter data on client side
   * - 'server': Always send filters to API
   * - 'auto': Use server if supported, fallback to client (default)
   */
  mode?: 'client' | 'server' | 'auto';
  
  /** 
   * Custom client-side filter function name (from registry).
   * Only used when mode is 'client' or 'auto' without server support.
   */
  clientFilterFn?: string;
}

/**
 * Filter definition for the filter panel.
 * Defines filter input types, options, and validation.
 */
export interface FilterDefinition {
  /** Filter input type */
  type: 'select' | 'multiSelect' | 'dateRange' | 'text' | 'number' | 'checkbox' | 'date';
  
  /** Display label */
  label: string;
  
  /** Default value */
  defaultValue?: any;
  
  /** Options for select/multiSelect types */
  options?: Array<FilterOption>;
  
  /** Validation rules */
  validation?: FilterValidation;
  
  /** Placeholder text for input fields */
  placeholder?: string;
}

/**
 * Option for select-based filters
 */
export interface FilterOption {
  /** Display label */
  label: string;
  
  /** Option value */
  value: any;
  
  /** Whether option is disabled */
  disabled?: boolean;
}

/**
 * Validation rules for filters
 */
export interface FilterValidation {
  /** Whether filter is required */
  required?: boolean;
  
  /** Minimum value (for number/date types) */
  min?: number;
  
  /** Maximum value (for number/date types) */
  max?: number;
  
  /** Regular expression pattern (for text types) */
  pattern?: string;
  
  /** Custom validation error message */
  message?: string;
}

/**
 * Drill-down action types.
 * Defines the different types of interactions available for drill-down functionality.
 */
export type DrillDownAction = 
  | 'cross-filter'      // Update filters in current dashboard
  | 'hierarchical-nav'  // Navigate to detail level with breadcrumbs
  | 'detail-panel'      // Show detail modal/panel
  | 'dashboard-nav';    // Navigate to different dashboard

/**
 * Drill-down configuration for widget interactions.
 * Defines how user clicks on widgets trigger navigation or filtering.
 */
export interface DrillDownConfig {
  /** Type of drill-down action to perform */
  action: DrillDownAction;
  
  /** 
   * Target view ID (for navigation actions).
   * Required for: hierarchical-nav, dashboard-nav
   */
  targetView?: string;
  
  /** 
   * Filter mappings for cross-filter action.
   * Maps event data fields to dashboard filter keys.
   * Required for: cross-filter
   * 
   * @example
   * { "label": "region", "value": "revenue" }
   */
  filterMappings?: {
    [sourceField: string]: string;
  };
  
  /** 
   * Context mapping for navigation actions.
   * Maps event data fields to context keys passed to target view.
   * Optional for: hierarchical-nav, dashboard-nav, detail-panel
   * 
   * @example
   * { "productId": "id", "productName": "name" }
   */
  contextMapping?: {
    [contextKey: string]: string;
  };
  
  /** 
   * Whether to preserve current filters during navigation.
   * Only applies to: hierarchical-nav
   */
  preserveFilters?: boolean;
  
  /** 
   * Custom breadcrumb label template.
   * Supports placeholders from event data (e.g., "Product: {product}").
   * Only applies to: hierarchical-nav
   */
  breadcrumbLabel?: string;
  
  /** 
   * Detail panel configuration.
   * Only applies to: detail-panel
   */
  detailPanel?: {
    /** Panel title */
    title?: string;
    /** Component to render in panel */
    component?: string;
    /** Panel width (CSS value) */
    width?: string;
  };
}

/**
 * Dashboard state managed by @stencil/store.
 * Shared across all widgets in a dashboard instance.
 */
export interface DashboardState {
  /** Active filter values */
  filters: Record<string, any>;
  
  /** Global context (userId, authToken, etc.) */
  context: Record<string, any>;
  
  /** Navigation state for drill-down */
  navigation?: NavigationState;
  
  /** Loading states for data sources */
  loadingStates?: Record<string, boolean>;
}

/**
 * Navigation state for drill-down functionality
 */
export interface NavigationState {
  /** Target view ID to navigate to */
  viewId: string;
  
  /** Context data to pass to next view */
  context: Record<string, any>;
  
  /** Breadcrumb trail */
  breadcrumb?: BreadcrumbItem[];
}

/**
 * Breadcrumb item for navigation
 */
export interface BreadcrumbItem {
  /** Display label */
  label: string;
  
  /** View ID to navigate to */
  viewId: string;
  
  /** Context for this view */
  context?: Record<string, any>;
}

/**
 * Event payload for dashboard navigation
 */
export interface DashboardNavEvent {
  /** Action identifier */
  action: 'navigate';
  
  /** Target view ID */
  viewId: string;
  
  /** Context to pass to next view */
  context: Record<string, any>;
  
  /** Source widget that triggered navigation */
  sourceWidget?: string;
}

/**
 * Event payload for filter changes
 */
export interface FilterChangeEvent {
  /** Action identifier */
  action: 'filterChange';
  
  /** Filter key that changed */
  filterKey: string;
  
  /** New filter value */
  value: any;
  
  /** All current filter values */
  filters: Record<string, any>;
}

/**
 * Event payload for data refresh requests
 */
export interface DataRefreshEvent {
  /** Action identifier */
  action: 'refresh';
  
  /** Data source ID to refresh */
  dataSourceId: string;
  
  /** Whether to force refresh (bypass cache) */
  force?: boolean;
}

/**
 * Cache entry for data source manager
 */
export interface CacheEntry<T = any> {
  /** Cached data */
  data: T;
  
  /** Timestamp of when data was cached */
  timestamp: number;
  
  /** Cache key used for this entry */
  key: string;
  
  /** Whether this is currently being fetched */
  pending?: boolean;
}

/**
 * Widget registry type
 */
export type WidgetRegistry = Record<string, string>;

/**
 * Transform function registry type
 */
export type TransformRegistry = Record<string, (data: any) => any>;

/**
 * Client filter function registry type
 */
export type ClientFilterRegistry = Record<string, (data: any[], filters: Record<string, any>) => any[]>;

