Technical Brief: Configurable Dashboard Component v1.0
Project: JSON-Driven Dashboard Engine with Shared Data Sources & Filtering
Technology: Stencil.js, TypeScript, CSS Grid
Role: Senior Front-End Engineer
Version: 1.0

1. Executive Summary
We are building a highly reusable, framework-agnostic Dashboard Engine using Stencil.js. The component must render a grid of widgets based entirely on a JSON configuration object.

The goal is to decouple the Layout (owned by App Admins via JSON) from the Implementation (owned by Developers). The dashboard must support "drill-down" navigation and inter-widget communication (e.g., filtering) without tightly coupling widgets to each other.

New in v2.0:

Centralized Data Source Management: Eliminates duplicate API requests when multiple widgets share the same data source.

Advanced Filtering System: Supports both client-side and server-side filtering with automatic mode detection.

Filter Subscription Model: Widgets opt-in to specific filters, preventing unnecessary re-renders.

Cache Invalidation Strategy: Smart caching based on data source configuration and filter state.

2. Architectural Principles
A. Layout Engine (CSS Grid Areas)
Approach: We are not using pixel coordinates. We are using CSS Grid Template Areas.

Why: This allows non-developers to define layouts visually in JSON (e.g., ["header header", "sidebar main"]) without calculating math.

Constraint: The dashboard container creates the Grid; the widget wrappers represent the grid areas.

B. Host-Driven Navigation (The "Dumb" Component)
Approach: The Dashboard component is stateless regarding "Pages" or "Routing."

Flow:

User clicks "Detail View" on a widget.

Component emits dashboardNav event.

Host Application catches event → Updates URL → Passes new Configuration JSON into the Dashboard.

Requirement: Do not manipulate window.history or window.location inside the component.

C. Data & State Management
Data Architecture (New):

Centralized DataSourceManager: A singleton service that manages all data fetching, caching, and deduplication.

Shared Data Sources: Multiple widgets reference the same dataSourceId to avoid duplicate requests.

Smart Caching: Cache keys include filter state for server-side filtering, ensuring correct data isolation.

Communication:

Use @stencil/store for a lightweight event bus.

Widget A updates the store (publishes filter changes).

Widget B (subscribed to store) receives notification and requests filtered data.

The DataSourceManager handles whether filtering happens client-side or server-side.

3. Core Component Specifications
1. <spectrum-dashboard> (The Orchestrator)
The entry point web component.

Props:

config: DashboardConfig - The JSON definition.

context: Record<string, any> - Global context like userId, authToken.

Logic:

Parses config.layout.template to generate the CSS grid-template-areas.

Initializes the @stencil/store for this instance.

Initializes the DataSourceManager singleton.

Pre-registers all dataSources from config with the manager.

Iterates through config.widgets to render children.

Events Emitted:

dashboardNav - When a widget requests navigation/drill-down.

2. <dashboard-widget-host> (The Wrapper)
A generic wrapper that surrounds every specific widget (Chart, Table, KPI).

Props:

widgetConfig: WidgetDefinition - The specific config for this widget.

area: string - The name of the grid area it belongs to (e.g., "main").

dataSourceManager: DataSourceManager - Reference to the centralized data manager.

globalContext: Record<string, any> - Global context for data hydration.

Responsibilities:

Layout: Applies style="grid-area: {area}".

Data Fetching: Requests data from DataSourceManager using dataSourceId.

Filter Subscription: Listens to store for filter changes matching its filtering.subscribe array.

Filter Application: Applies client-side filtering if configured or if server-side filtering is unavailable.

State Management: Manages loading/error states locally.

Error Handling: Provides fallback UI if the inner widget crashes or API fails.

Lifecycle:

componentWillLoad(): Subscribe to relevant filter changes, fetch initial data.

disconnectedCallback(): Unsubscribe from store to prevent memory leaks.

3. The DataSourceManager (New Core Service)
A centralized service that manages all data operations.

Responsibilities:

Request Deduplication: Prevents multiple concurrent requests to the same endpoint.

Caching: Stores fetched data with configurable TTL via refreshInterval.

Cache Key Generation: Creates unique keys based on dataSourceId + context + filters.

Filter Mode Detection: Automatically determines whether to apply filters client-side or server-side.

Batch Fetching: (Optional) Can be extended to batch multiple requests into one.

Key Methods:



async getDataSource(
  config: DataSourceConfig,
  context: Record<string, any>,
  filters?: Record<string, any>
): Promise<DataSourceResult>
invalidateCache(dataSourceId: string): void
refreshDataSource(dataSourceId: string): Promise<void>
4. The Widget Registry
A mapping service to avoid hard-coding component tags.

Concept: Map JSON string "chart-line" → HTML Tag <dash-chart-line>.

Goal: Allows us to easily add new widget types without rewriting the core engine.

Implementation:



export const widgetRegistry: Record<string, any> = {
  'kpi-card': 'dash-kpi-card',
  'line-chart': 'dash-line-chart',
  'bar-chart': 'dash-bar-chart',
  'data-table': 'dash-data-table',
  'filter-panel': 'dash-filter-panel',
};
4. The "Contract" (JSON Schema)
The implementation must strictly adhere to this TypeScript Interface structure:



export interface DashboardConfig {
  /** Unique identifier for this specific view/page */
  id: string;
  /** CSS Grid Layout Definition */
  layout: {
    /**
     * Visual grid definition.
     * Example: [
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
  };
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
export interface DataSourceConfig {
  /** Unique identifier for deduplication */
  id: string;
  /** API endpoint URL */
  endpoint: string;
  /** HTTP method (default: GET) */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** Static parameters always sent with request */
  params?: Record<string, any>;
  /** Cache duration in milliseconds (default: 5 minutes) */
  refreshInterval?: number;
  /** Does the API support server-side filtering? */
  supportsServerFiltering?: boolean;
  /** 
   * Maps filter keys to API parameter names.
   * Example: { "regionId": "region", "dateRange": "date_range" }
   */
  filterParamMap?: Record<string, string>;
  /** Transform response before caching (function name in registry) */
  transformResponse?: string;
}
export interface DataSourceResult<T = any> {
  data: T;
  loading: boolean;
  error: Error | null;
  lastFetched: number;
}
export interface WidgetDefinition {
  /** The type of widget to render (maps to WidgetRegistry) */
  component: string; // e.g., "kpi-card", "line-chart"
  /** Static UI configuration passed to the widget */
  uiConfig: Record<string, any>; // e.g., { title: "Q3 Revenue", color: "blue" }
  /**
   * Reference to a shared data source.
   * Preferred over inline 'data' config.
   */
  dataSourceId?: string;
  /**
   * Inline data source definition (legacy support).
   * Use dataSourceId instead for sharing.
   */
  data?: DataSourceConfig;
  /**
   * Filtering behavior configuration.
   */
  filtering?: FilterConfig;
  /**
   * State keys this widget publishes or subscribes to.
   * "publisher": Update the store on interaction.
   * "subscriber": Re-fetch/Re-render when these keys change.
   */
  bus?: {
    publish?: string[]; // e.g., ["dateRange"]
    subscribe?: string[]; // e.g., ["regionId"]
  };
  /**
   * Drill-down interaction configuration.
   * Defines how user interactions (clicks) trigger navigation or filtering.
   * Supports: cross-filter, hierarchical-nav, detail-panel, dashboard-nav
   * See Section 9 for detailed drill-down documentation.
   */
  drillDown?: DrillDownConfig;
}
export interface FilterConfig {
  /** Which filter keys should trigger data refresh? */
  subscribe?: string[];
  /** 
   * How should filters be applied?
   * - 'client': Always filter data on client side
   * - 'server': Always send filters to API
   * - 'auto': Use server if supported, fallback to client
   */
  mode?: 'client' | 'server' | 'auto';
  /** 
   * Custom client-side filter function name (from registry).
   * Only used when mode is 'client' or 'auto' without server support.
   */
  clientFilterFn?: string;
}
export interface FilterDefinition {
  /** Filter input type */
  type: 'select' | 'multiSelect' | 'dateRange' | 'text' | 'number' | 'checkbox';
  /** Display label */
  label: string;
  /** Default value */
  defaultValue?: any;
  /** Options for select/multiSelect types */
  options?: Array<{ label: string; value: any }>;
  /** Validation rules */
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
  };
}
export type DrillDownAction = 
  | 'cross-filter'      // Update filters in current dashboard
  | 'hierarchical-nav'  // Navigate to detail level with breadcrumbs
  | 'detail-panel'      // Show detail modal/panel
  | 'dashboard-nav';    // Navigate to different dashboard
export interface DrillDownConfig {
  /** Type of drill-down action */
  action: DrillDownAction;
  /** Target view ID (for navigation actions) */
  targetView?: string;
  /** 
   * Filter mappings for cross-filter action.
   * Maps event data fields to dashboard filter keys.
   * Example: { "label": "region", "value": "revenue" }
   */
  filterMappings?: {
    [sourceField: string]: string;
  };
  /** 
   * Context mapping for navigation actions.
   * Maps event data fields to context keys passed to target view.
   * Example: { "productId": "id", "productName": "name" }
   */
  contextMapping?: {
    [contextKey: string]: string;
  };
  /** Whether to preserve current filters (hierarchical-nav only) */
  preserveFilters?: boolean;
  /** 
   * Custom breadcrumb label template (hierarchical-nav only).
   * Supports placeholders from event data.
   * Example: "Product: {product}" or "Region: {region}"
   */
  breadcrumbLabel?: string;
  /** Detail panel configuration (detail-panel only) */
  detailPanel?: {
    title?: string;
    component?: string;
    width?: string;
  };
}
5. State Management Architecture
Store Structure


import { createStore } from '@stencil/store';
export interface DashboardState {
  /** Active filter values */
  filters: Record<string, any>;
  /** Global context (userId, authToken, etc.) */
  context: Record<string, any>;
  /** Navigation state for drill-down */
  navigation?: {
    viewId: string;
    context: Record<string, any>;
  };
}
export const dashboardStore = createStore<DashboardState>({
  filters: {},
  context: {},
  navigation: undefined,
});
Filter Update Flow
User Interaction: User selects a filter in a <dash-filter-panel> widget.

Publish: Filter widget updates dashboardStore.state.filters = { ...filters, regionId: 'US' }.

Notification: Store triggers onChange listeners.

Subscription Check: Each <dashboard-widget-host> checks if updated filter key is in its filtering.subscribe array.

Data Refresh: Matching widgets call dataSourceManager.getDataSource() with new filters.

Cache Lookup: DataSourceManager checks if data exists for this filter combination.

Fetch or Serve: Either returns cached data or fetches fresh data (with server filters if supported).

Render: Widget receives filtered data and re-renders.

6. Data Fetching & Filtering Strategy
A. Request Deduplication
Problem: Three widgets all need sales data. Without coordination, three identical API calls fire simultaneously.

Solution:

Each widget requests data via dataSourceManager.getDataSource('sales-data', context, filters).

DataSourceManager generates cache key: sales-data:${contextHash}:${filterHash}.

If cache is fresh (within refreshInterval), return cached data immediately.

If cache is stale, check pendingRequests map.

If a request is already in-flight for this key, return the existing Promise.

Otherwise, initiate new fetch, store Promise in pendingRequests, and cache result.

B. Client-Side vs Server-Side Filtering
Server-Side Filtering (Preferred):

Used when dataSource.supportsServerFiltering = true.

Filters are appended to API request as query parameters.

DataSourceManager uses filterParamMap to translate filter keys to API params.

Example: { regionId: 'US' } → /api/sales?region=US

Cache key includes filter values to separate filtered vs unfiltered data.

Client-Side Filtering (Fallback):

Used when server filtering is not supported or mode = 'client'.

DataSourceManager fetches unfiltered data.

<dashboard-widget-host> applies filtering via applyClientFiltering() method.

Default implementation: simple array filter matching filter keys to object properties.

Custom filters: Register a named function in clientFilterRegistry.

Auto Mode:

Check dataSource.supportsServerFiltering at runtime.

If true, use server-side filtering.

If false, fetch full dataset and filter client-side.

C. Cache Invalidation
Automatic:

Data older than refreshInterval is considered stale.

Next request triggers fresh fetch.

Manual:

Widgets can emit invalidateCache event with dataSourceId.

DataSourceManager clears cache entry.

Next request fetches fresh data.

Reactive:

When filter values change, cache key changes automatically.

New cache entry is created for new filter combination.

Old cache entries remain valid for other widgets using different filters.

7. Development Phases & Deliverables
Phase 1: The Foundation
Setup Stencil project with TypeScript strict mode.

Define all TypeScript interfaces (DashboardConfig, DataSourceConfig, etc.).

Implement basic <spectrum-dashboard> capable of rendering colored divs in a CSS Grid based on the JSON template.

Initialize @stencil/store with DashboardState interface.

Deliverable: Empty grid with correct CSS Grid areas based on config.

Phase 2: The DataSourceManager
Implement DataSourceManager class as a singleton.

Add request deduplication logic with pendingRequests map.

Add caching logic with cache map and TTL checks.

Implement cache key generation including filter state.

Write unit tests for caching, deduplication, and TTL expiration.

Deliverable: Standalone service that can be tested independently.

Phase 3: The Widget Host
Build <dashboard-widget-host> component.

Implement data fetching via DataSourceManager.

Add filter subscription logic (listen to store changes).

Implement client-side filtering fallback.

Add loading/error state management.

Deliverable: Generic wrapper that can host any widget type.

Phase 4: The Filter System
Create <dash-filter-panel> example widget.

Implement filter value publishing to store.

Demonstrate multiple widgets reacting to same filter.

Test both server-side and client-side filtering modes.

Deliverable: Working filter UI that controls multiple widgets.

Phase 5: Example Widgets
Create dummy widgets: <dash-kpi-card>, <dash-line-chart>, <dash-data-table>.

Implement pure presentational components (no data fetching).

Accept data and config props only.

Emit interaction events for drill-down.

Deliverable: Widget library demonstrating the pattern.

Phase 6: Drill Down & Navigation
Implement comprehensive drill-down system with four interaction patterns:

Cross-Widget Filtering: Click to filter other widgets in same dashboard

Hierarchical Navigation: Drill through data levels with breadcrumb trails

Detail Panel: Show modal/panel for quick detail views

Dashboard Navigation: Navigate between different dashboard views

Implement dashboardNav event emitter in dashboard component.

Create DrillDownManager service to coordinate drill-down actions.

Integrate drill-down event handling in dashboard-widget-host.

Add click event emitters to chart and table widgets.

Demonstrate all four patterns with example configurations.

Deliverable: Multi-pattern drill-down dashboard with full navigation support.

See Section 9 for comprehensive drill-down documentation and examples.

Phase 7: Performance Optimization
Implement virtual scrolling for large datasets (if needed).

Add memo/caching to expensive render functions.

Optimize re-render triggers (check for actual data changes, not just filter changes).

Add performance monitoring hooks.

Deliverable: Dashboard handles 1000+ data points smoothly.

8. Success Criteria
Functional Requirements
✅ Type Safety: The JSON config is strictly typed with no any types in public APIs.
✅ Zero Layout CSS in JS: Layout relies purely on Grid Areas, not manual width/height calculations.
✅ Encapsulation: The internal state does not leak to global window object.
✅ Data Deduplication: Shared data sources result in only one API call per unique data + filter combination.
✅ Filter Isolation: Widgets only re-fetch when subscribed filter keys change.
✅ Dual Filtering: Both client-side and server-side filtering work correctly.
✅ Error Boundaries: Widget crashes don't break the entire dashboard.
✅ Navigation: Drill-down emits events correctly without manipulating browser history.
✅ Drill-Down Patterns: All four drill-down actions (cross-filter, hierarchical-nav, detail-panel, dashboard-nav) work correctly.
✅ Breadcrumb Navigation: Hierarchical navigation maintains accurate breadcrumb trail with context.
✅ Filter Preservation: preserveFilters flag correctly maintains or clears filter state during navigation.

Performance Requirements
✅ Initial Load: Dashboard with 10 widgets renders in < 2 seconds.
✅ Filter Response: Widgets respond to filter changes in < 500ms.
✅ Memory Leaks: No memory leaks after mounting/unmounting 100 times.
✅ Cache Hit Rate: > 80% cache hit rate for shared data sources.

Code Quality Requirements
✅ Test Coverage: > 85% coverage for core components.
✅ Documentation: All public APIs documented with JSDoc comments.
✅ Linting: Zero ESLint errors in strict mode.
✅ Bundle Size: Core component < 50KB gzipped.

9. Example Configuration
Basic Dashboard with Shared Data Source


{
  "id": "sales-dashboard-q4",
  "layout": {
    "template": [
      "filters filters filters",
      "kpi1 kpi2 kpi3",
      "chart chart table"
    ],
    "gap": "16px",
    "columns": "1fr 1fr 1fr",
    "rows": "auto auto 1fr"
  },
  "dataSources": {
    "sales-data": {
      "id": "sales-data",
      "endpoint": "/api/sales",
      "method": "GET",
      "refreshInterval": 300000,
      "supportsServerFiltering": true,
      "filterParamMap": {
        "regionId": "region",
        "dateRange": "date_range",
        "productCategory": "category"
      }
    },
    "inventory-data": {
      "id": "inventory-data",
      "endpoint": "/api/inventory",
      "refreshInterval": 60000,
      "supportsServerFiltering": false
    }
  },
  "filters": {
    "regionId": {
      "type": "select",
      "label": "Region",
      "options": [
        { "label": "North America", "value": "NA" },
        { "label": "Europe", "value": "EU" },
        { "label": "Asia Pacific", "value": "APAC" }
      ]
    },
    "dateRange": {
      "type": "dateRange",
      "label": "Date Range",
      "defaultValue": { "start": "2024-10-01", "end": "2024-12-31" }
    },
    "productCategory": {
      "type": "multiSelect",
      "label": "Product Category",
      "options": [
        { "label": "Electronics", "value": "electronics" },
        { "label": "Clothing", "value": "clothing" },
        { "label": "Home & Garden", "value": "home" }
      ]
    }
  },
  "widgets": {
    "filters": {
      "component": "filter-panel",
      "uiConfig": {
        "layout": "horizontal"
      },
      "bus": {
        "publish": ["regionId", "dateRange", "productCategory"]
      }
    },
    "kpi1": {
      "component": "kpi-card",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["regionId", "dateRange"],
        "mode": "server"
      },
      "uiConfig": {
        "title": "Total Revenue",
        "metric": "totalRevenue",
        "format": "currency",
        "icon": "dollar-sign"
      }
    },
    "kpi2": {
      "component": "kpi-card",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["regionId", "dateRange"],
        "mode": "server"
      },
      "uiConfig": {
        "title": "Units Sold",
        "metric": "totalUnits",
        "format": "number"
      }
    },
    "kpi3": {
      "component": "kpi-card",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["regionId", "dateRange", "productCategory"],
        "mode": "server"
      },
      "uiConfig": {
        "title": "Avg Order Value",
        "metric": "averageOrderValue",
        "format": "currency"
      }
    },
    "chart": {
      "component": "line-chart",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["regionId", "productCategory"],
        "mode": "client"
      },
      "uiConfig": {
        "title": "Revenue Trend",
        "xAxis": "date",
        "yAxis": "revenue",
        "showLegend": true
      },
      "bus": {
        "publish": ["selectedDateRange"]
      }
    },
    "table": {
      "component": "data-table",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["regionId", "dateRange", "productCategory"],
        "mode": "auto"
      },
      "uiConfig": {
        "title": "Top Products",
        "columns": [
          { "key": "productName", "label": "Product" },
          { "key": "revenue", "label": "Revenue", "format": "currency" },
          { "key": "units", "label": "Units Sold" }
        ],
        "sortable": true,
        "pageSize": 10
      }
    }
  }
}
Advanced: Comprehensive Drill-Down System

## Overview
The dashboard supports four distinct drill-down patterns, each optimized for different user interaction scenarios. All patterns are JSON-configurable and work through a centralized `DrillDownManager` service that coordinates with the `DashboardStore`.

## Drill-Down Action Types

### 1. Cross-Widget Filtering (`cross-filter`)
**Use Case**: User clicks a chart segment or data point to filter other widgets in the same dashboard.

**Behavior**:
- Updates global filter state in `DashboardStore`
- All widgets subscribed to the changed filter automatically refresh
- No navigation occurs - data updates in place

**Configuration**:
```json
{
  "widgets": {
    "regional-chart": {
      "component": "pie-chart",
      "area": "chart",
      "dataSourceId": "sales-data",
      "drillDown": {
        "action": "cross-filter",
        "filterMappings": {
          "label": "region",
          "value": "revenue"
        }
      }
    },
    "sales-table": {
      "component": "data-table",
      "area": "table",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["region"],
        "mode": "auto"
      }
    }
  }
}
```

**Event Flow**:
1. User clicks pie chart segment "North America"
2. Chart emits `elementClick` event: `{ label: "North America", value: 250000 }`
3. `DrillDownManager.handleCrossFilter()` maps `label` → `region` filter
4. `DashboardStore.updateFilters({ region: "North America" })`
5. Table widget subscribed to `region` filter automatically refreshes with filtered data

### 2. Hierarchical Navigation (`hierarchical-nav`)
**Use Case**: User navigates through levels of detail with breadcrumb trail (e.g., Regions → Countries → Cities).

**Behavior**:
- Navigates to a new dashboard configuration
- Maintains breadcrumb trail for backward navigation
- Optionally preserves current filter state
- Passes context data to the target view

**Configuration**:
```json
{
  "widgets": {
    "sales-table": {
      "component": "data-table",
      "area": "main",
      "dataSourceId": "sales-data",
      "drillDown": {
        "action": "hierarchical-nav",
        "targetView": "product-detail-view",
        "breadcrumbLabel": "Product: {product}",
        "preserveFilters": true,
        "contextMapping": {
          "productId": "id",
          "productName": "product",
          "selectedRegion": "region"
        }
      }
    }
  }
}
```

**Event Flow**:
1. User clicks table row for "Product ABC"
2. Table emits `rowClick` event with row data
3. `DrillDownManager.handleHierarchicalNav()` builds context and breadcrumb
4. `DashboardStore.navigate(targetView, context, breadcrumb)`
5. Dashboard emits `dashboardNav` event to host application
6. Host loads new dashboard config with product detail view
7. Breadcrumb shows: "Sales Dashboard > Product: Product ABC"

**Breadcrumb Structure**:
```typescript
{
  viewId: "product-detail-view",
  context: {
    productId: "123",
    productName: "Product ABC",
    selectedRegion: "North America",
    filters: { region: "North America", dateRange: {...} }
  },
  breadcrumb: [
    { label: "Sales Dashboard", viewId: "sales-dashboard", context: {...} },
    { label: "Product: Product ABC", viewId: "product-detail-view", context: {...} }
  ]
}
```

### 3. Detail Panel (`detail-panel`)
**Use Case**: User clicks element to view details in a modal or side panel without full navigation.

**Behavior**:
- Updates context with detail data
- No navigation or URL change
- UI can render modal/panel based on context change
- Lightweight drill-down for quick views

**Configuration**:
```json
{
  "widgets": {
    "customer-table": {
      "component": "data-table",
      "area": "main",
      "drillDown": {
        "action": "detail-panel",
        "detailPanel": {
          "title": "Customer Details",
          "component": "customer-detail-card",
          "width": "600px"
        },
        "contextMapping": {
          "customerId": "id",
          "customerName": "name",
          "customerEmail": "email"
        }
      }
    }
  }
}
```

**Event Flow**:
1. User clicks customer row
2. `DrillDownManager.handleDetailPanel()` updates context
3. `DashboardStore.updateContext({ detailPanel: { visible: true, data: {...} } })`
4. Host application listens to context changes
5. Host renders detail panel component with customer data

### 4. Dashboard Navigation (`dashboard-nav`)
**Use Case**: User navigates to a completely different dashboard (e.g., from Overview to Detailed Analytics).

**Behavior**:
- Full dashboard navigation
- Passes context to target dashboard
- No breadcrumb trail maintained
- Clean navigation between major dashboard sections

**Configuration**:
```json
{
  "widgets": {
    "kpi-card": {
      "component": "kpi-card",
      "area": "kpi1",
      "drillDown": {
        "action": "dashboard-nav",
        "targetView": "revenue-analytics-dashboard",
        "contextMapping": {
          "selectedMetric": "metric",
          "dateRange": "period"
        }
      }
    }
  }
}
```

## TypeScript Interfaces

### DrillDownConfig
```typescript
export type DrillDownAction = 
  | 'cross-filter'      // Update filters in current dashboard
  | 'hierarchical-nav'  // Navigate to detail level with breadcrumbs
  | 'detail-panel'      // Show detail modal/panel
  | 'dashboard-nav';    // Navigate to different dashboard

export interface DrillDownConfig {
  /** Type of drill-down action */
  action: DrillDownAction;
  
  /** Target view ID (for navigation actions) */
  targetView?: string;
  
  /** Filter mappings for cross-filter action */
  filterMappings?: {
    [sourceField: string]: string; // Map clicked field to filter key
  };
  
  /** Context to pass to target view */
  contextMapping?: {
    [contextKey: string]: string; // Map clicked data to context keys
  };
  
  /** Whether to preserve current filters (hierarchical-nav) */
  preserveFilters?: boolean;
  
  /** Custom breadcrumb label template (hierarchical-nav) */
  breadcrumbLabel?: string; // e.g., "Region: {label}"
  
  /** Detail panel configuration (detail-panel) */
  detailPanel?: {
    title?: string;
    component?: string;
    width?: string;
  };
}
```

### Updated WidgetDefinition
```typescript
export interface WidgetDefinition {
  /** The type of widget to render (maps to WidgetRegistry) */
  component: string;
  
  /** Static UI configuration passed to the widget */
  uiConfig: Record<string, any>;
  
  /** Reference to a shared data source */
  dataSourceId?: string;
  
  /** Inline data source definition (legacy support) */
  data?: DataSourceConfig;
  
  /** Filtering behavior configuration */
  filtering?: FilterConfig;
  
  /** State keys this widget publishes or subscribes to */
  bus?: {
    publish?: string[];
    subscribe?: string[];
  };
  
  /** Drill-down configuration (NEW) */
  drillDown?: DrillDownConfig;
}
```

### Widget Event Interfaces
```typescript
// Chart click event
export interface ChartElementClickEvent {
  action: 'elementClick';
  chartType: string;
  datasetLabel?: string;
  label: any;
  value: any;
  datasetIndex: number;
  elementIndex: number;
  rawData?: any;
}

// Table row click event
export interface TableRowClickEvent {
  action: 'rowClick';
  row: any;
  rowIndex: number;
  currentPage: number;
  globalIndex: number;
  allData: any[];
}
```

## DrillDownManager Service

The `DrillDownManager` is a static service that processes drill-down actions from widget events and coordinates with the `DashboardStore`.

### Key Methods

```typescript
export class DrillDownManager {
  /**
   * Main entry point - processes drill-down action from widget event
   */
  public static processDrillDown(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void;
  
  /**
   * Handle cross-widget filtering
   */
  private static handleCrossFilter(
    config: DrillDownConfig, 
    eventData: any
  ): void;
  
  /**
   * Handle hierarchical navigation with breadcrumbs
   */
  private static handleHierarchicalNav(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void;
  
  /**
   * Handle detail panel display
   */
  private static handleDetailPanel(
    config: DrillDownConfig, 
    eventData: any
  ): void;
  
  /**
   * Handle dashboard navigation
   */
  private static handleDashboardNav(
    config: DrillDownConfig,
    eventData: any,
    sourceWidget: string
  ): void;
}
```

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interaction                      │
└────────────────────┬───────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  Widget (Chart/Table)                        │
│  • Emits elementClick / rowClick event                      │
│  • Includes full event data (label, value, row, etc.)      │
└────────────────────┬───────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              dashboard-widget-host                           │
│  • Listens for widget events                                │
│  • Reads drillDown config from widget definition            │
│  • Calls DrillDownManager.processDrillDown()                │
└────────────────────┬───────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   DrillDownManager                           │
│  • Routes to appropriate handler based on action type       │
│  • Maps event data to filters/context                       │
│  • Updates DashboardStore state                             │
└────────────────────┬───────────────────────────────────────┘
                     │
       ┌─────────────┴─────────────┬─────────────────┐
       ▼                           ▼                 ▼
┌──────────────┐         ┌──────────────┐    ┌──────────────┐
│ Update       │         │ Navigate     │    │ Update       │
│ Filters      │         │ (emit event) │    │ Context      │
└──────┬───────┘         └──────┬───────┘    └──────┬───────┘
       │                        │                    │
       ▼                        ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      DashboardStore                          │
│  • state.filters                                            │
│  • state.navigation                                         │
│  • state.context                                            │
└────────────────────┬───────────────────────────────────────┘
                     │
       ┌─────────────┴─────────────┬───────────────┐
       ▼                           ▼               ▼
┌──────────────┐         ┌──────────────┐   ┌──────────────┐
│ Subscribed   │         │ Dashboard    │   │ Host         │
│ Widgets      │         │ Emits        │   │ Application  │
│ Auto-Refresh │         │ dashboardNav │   │ Renders      │
│              │         │ Event        │   │ Detail Panel │
└──────────────┘         └──────────────┘   └──────────────┘
```

## Complete Example: Multi-Pattern Dashboard

This example demonstrates all four drill-down patterns working together:

```json
{
  "id": "sales-overview-dashboard",
  "layout": {
    "template": [
      "filters filters filters filters",
      "kpi1 kpi2 kpi3 kpi4",
      "regional-chart regional-chart product-table product-table",
      "trend-chart trend-chart product-table product-table"
    ],
    "gap": "16px",
    "columns": "repeat(4, 1fr)",
    "rows": "auto auto 1fr"
  },
  "dataSources": {
    "sales-data": {
      "id": "sales-data",
      "endpoint": "/api/sales",
      "refreshInterval": 300000,
      "supportsServerFiltering": true,
      "filterParamMap": {
        "region": "region",
        "dateRange": "date_range",
        "category": "category"
      }
    }
  },
  "filters": {
    "region": {
      "type": "select",
      "label": "Region",
      "options": [
        { "label": "All Regions", "value": "all" },
        { "label": "North America", "value": "NA" },
        { "label": "Europe", "value": "EU" },
        { "label": "Asia Pacific", "value": "APAC" }
      ]
    },
    "dateRange": {
      "type": "dateRange",
      "label": "Date Range",
      "defaultValue": { "start": "2024-01-01", "end": "2024-12-31" }
    },
    "category": {
      "type": "multiSelect",
      "label": "Category",
      "options": [
        { "label": "Electronics", "value": "electronics" },
        { "label": "Clothing", "value": "clothing" },
        { "label": "Home", "value": "home" }
      ]
    }
  },
  "widgets": {
    "filters": {
      "component": "filter-panel",
      "area": "filters",
      "uiConfig": {
        "layout": "horizontal"
      },
      "bus": {
        "publish": ["region", "dateRange", "category"]
      }
    },
    "kpi1": {
      "component": "kpi-card",
      "area": "kpi1",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["region", "dateRange", "category"],
        "mode": "server"
      },
      "uiConfig": {
        "title": "Total Revenue",
        "metric": "totalRevenue",
        "format": "currency"
      },
      "drillDown": {
        "action": "dashboard-nav",
        "targetView": "revenue-analytics-dashboard",
        "contextMapping": {
          "metric": "metric",
          "currentFilters": "filters"
        }
      }
    },
    "regional-chart": {
      "component": "pie-chart",
      "area": "regional-chart",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["dateRange", "category"],
        "mode": "auto"
      },
      "uiConfig": {
        "title": "Revenue by Region",
        "dataKey": "revenue",
        "labelKey": "region"
      },
      "drillDown": {
        "action": "cross-filter",
        "filterMappings": {
          "label": "region"
        }
      }
    },
    "trend-chart": {
      "component": "line-chart",
      "area": "trend-chart",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["region", "category"],
        "mode": "auto"
      },
      "uiConfig": {
        "title": "Revenue Trend",
        "xAxis": "date",
        "yAxis": "revenue"
      }
    },
    "product-table": {
      "component": "data-table",
      "area": "product-table",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["region", "dateRange", "category"],
        "mode": "auto"
      },
      "uiConfig": {
        "title": "Products",
        "columns": [
          { "key": "product", "label": "Product Name" },
          { "key": "revenue", "label": "Revenue", "format": "currency" },
          { "key": "units", "label": "Units Sold" }
        ],
        "sortable": true,
        "pageSize": 10
      },
      "drillDown": {
        "action": "hierarchical-nav",
        "targetView": "product-detail-view",
        "breadcrumbLabel": "Product: {product}",
        "preserveFilters": true,
        "contextMapping": {
          "productId": "id",
          "productName": "product",
          "selectedCategory": "category"
        }
      }
    }
  }
}
```

## Product Detail View (Hierarchical Navigation Target)

```json
{
  "id": "product-detail-view",
  "layout": {
    "template": [
      "breadcrumb breadcrumb breadcrumb",
      "details details metrics",
      "chart chart table"
    ],
    "gap": "24px",
    "columns": "2fr 2fr 1fr",
    "rows": "auto 200px 1fr"
  },
  "dataSources": {
    "product-details": {
      "id": "product-details",
      "endpoint": "/api/products/${productId}",
      "refreshInterval": 600000
    },
    "product-sales": {
      "id": "product-sales",
      "endpoint": "/api/sales/by-product/${productId}",
      "refreshInterval": 300000,
      "supportsServerFiltering": true,
      "filterParamMap": {
        "dateRange": "date_range"
      }
    },
    "customer-data": {
      "id": "customer-data",
      "endpoint": "/api/customers/by-product/${productId}",
      "refreshInterval": 300000
    }
  },
  "widgets": {
    "breadcrumb": {
      "component": "breadcrumb",
      "area": "breadcrumb",
      "uiConfig": {
        "showBackButton": true
      }
    },
    "details": {
      "component": "product-card",
      "area": "details",
      "dataSourceId": "product-details",
      "uiConfig": {
        "showImage": true,
        "showDescription": true,
        "showInventory": true
      }
    },
    "metrics": {
      "component": "kpi-card",
      "area": "metrics",
      "dataSourceId": "product-sales",
      "filtering": {
        "subscribe": ["dateRange"],
        "mode": "server"
      },
      "uiConfig": {
        "title": "Product Revenue",
        "metric": "totalRevenue",
        "format": "currency"
      }
    },
    "chart": {
      "component": "line-chart",
      "area": "chart",
      "dataSourceId": "product-sales",
      "filtering": {
        "subscribe": ["dateRange"],
        "mode": "server"
      },
      "uiConfig": {
        "title": "Sales Over Time",
        "xAxis": "date",
        "yAxis": "revenue"
      }
    },
    "table": {
      "component": "data-table",
      "area": "table",
      "dataSourceId": "customer-data",
      "uiConfig": {
        "title": "Top Customers",
        "columns": [
          { "key": "customerName", "label": "Customer" },
          { "key": "purchases", "label": "Purchases" },
          { "key": "revenue", "label": "Revenue", "format": "currency" }
        ],
        "pageSize": 5
      },
      "drillDown": {
        "action": "detail-panel",
        "detailPanel": {
          "title": "Customer Details",
          "component": "customer-detail-card",
          "width": "600px"
        },
        "contextMapping": {
          "customerId": "id",
          "customerName": "customerName"
        }
      }
    }
  }
}
```

## Implementation Flow

### Phase 1: Widget Events
**Components**: `spectrum-chart`, `spectrum-data-table`

Charts and tables emit standardized click events with comprehensive data:
- Charts: `elementClick` event with chart type, label, value, indices
- Tables: `rowClick` event with row data, index, pagination context

### Phase 2: Widget Host Integration
**Component**: `dashboard-widget-host`

The widget host listens for widget events and processes drill-down:
```typescript
componentDidLoad() {
  // Listen for chart click events
  this.element.addEventListener('elementClick', (e: CustomEvent) => {
    if (this.widgetConfig.drillDown) {
      DrillDownManager.processDrillDown(
        this.widgetConfig.drillDown,
        e.detail,
        this.widgetConfig.id
      );
    }
  });
  
  // Listen for table row click events
  this.element.addEventListener('rowClick', (e: CustomEvent) => {
    if (this.widgetConfig.drillDown) {
      DrillDownManager.processDrillDown(
        this.widgetConfig.drillDown,
        e.detail,
        this.widgetConfig.id
      );
    }
  });
}
```

### Phase 3: DrillDownManager Processing
**Service**: `DrillDownManager`

Routes to appropriate handler based on action type:
```typescript
public static processDrillDown(
  config: DrillDownConfig,
  eventData: any,
  sourceWidget: string
): void {
  switch (config.action) {
    case 'cross-filter':
      this.handleCrossFilter(config, eventData);
      break;
    case 'hierarchical-nav':
      this.handleHierarchicalNav(config, eventData, sourceWidget);
      break;
    case 'detail-panel':
      this.handleDetailPanel(config, eventData);
      break;
    case 'dashboard-nav':
      this.handleDashboardNav(config, eventData, sourceWidget);
      break;
  }
}
```

### Phase 4: State Updates
**Service**: `DashboardStore`

Updates appropriate state based on drill-down action:
- `cross-filter`: Updates `state.filters`
- `hierarchical-nav` / `dashboard-nav`: Updates `state.navigation`
- `detail-panel`: Updates `state.context`

### Phase 5: Host Application Response
**External**: Host Application

Listens for dashboard events and responds:
```typescript
dashboard.addEventListener('dashboardNav', (event) => {
  const { viewId, context, breadcrumb } = event.detail;
  
  // Update URL (optional)
  history.pushState({ viewId, context }, '', `/dashboard/${viewId}`);
  
  // Load new dashboard configuration
  const newConfig = await loadDashboardConfig(viewId, context);
  
  // Update dashboard
  dashboard.config = newConfig;
  dashboard.context = context;
});
```

## Best Practices

### 1. Choose the Right Pattern
- **Cross-Filter**: When users explore relationships within the same dataset
- **Hierarchical Nav**: When drilling through natural hierarchies (Region → Country → City)
- **Detail Panel**: For quick views of additional info without losing context
- **Dashboard Nav**: For jumping between completely different analytical views

### 2. Breadcrumb Design
- Use dynamic labels with placeholders: `"Product: {product}"`
- Keep breadcrumb trail to max 4-5 levels
- Include context in each breadcrumb for accurate back navigation

### 3. Filter Preservation
- Set `preserveFilters: true` when drill-down maintains analytical context
- Set `preserveFilters: false` when starting fresh analysis at detail level

### 4. Context Mapping
- Map only essential data - avoid passing entire row objects
- Use semantic names in contextMapping: `productId` not `id`
- Keep context serializable (no functions or circular references)

### 5. Performance
- Drill-down actions are synchronous - no loading states needed
- Data fetching happens after navigation via normal DataSourceManager flow
- Breadcrumb navigation reuses cached configurations when possible

## Testing Drill-Down

### Unit Tests
```typescript
describe('DrillDownManager', () => {
  it('should map event data to filters for cross-filter action', () => {
    const config: DrillDownConfig = {
      action: 'cross-filter',
      filterMappings: { label: 'region', value: 'revenue' }
    };
    const eventData = { label: 'North America', value: 250000 };
    
    DrillDownManager.processDrillDown(config, eventData, 'chart1');
    
    expect(DashboardStore.getFilter('region')).toBe('North America');
  });
});
```

### Integration Tests
```typescript
describe('Dashboard Drill-Down', () => {
  it('should update table when pie chart segment is clicked', async () => {
    const dashboard = await setupDashboard(crossFilterConfig);
    const chart = dashboard.querySelector('spectrum-chart');
    const table = dashboard.querySelector('spectrum-data-table');
    
    // Click chart segment
    chart.dispatchEvent(new CustomEvent('elementClick', {
      detail: { label: 'Electronics', value: 500000 }
    }));
    
    // Wait for table to refresh
    await waitFor(() => {
      expect(table.data.every(row => row.category === 'Electronics')).toBe(true);
    });
  });
});
```
10. Implementation Guidelines for AI Assistants (Cursor/Claude)
System Role
You are a Senior Front-End Architect specializing in Stencil.js and Design Systems. You are strict about type safety, separation of concerns, and performance optimization.

Objective
Build a configurable, JSON-driven Dashboard Component in Stencil.js with advanced data sharing and filtering capabilities. It must use CSS Grid Template Areas for layout and a centralized DataSourceManager for efficient data fetching.

Tech Stack
Stencil.js (Latest)

TypeScript (Strict mode)

CSS Grid (Native, no libraries)

@stencil/store (Inter-widget state management)

Architectural Requirements (Strict Adherence)
1. JSON Schema Compliance
The dashboard MUST be driven by the DashboardConfig interface defined in Section 4. Do not deviate from this schema without explicit approval.

2. Layout Engine Rules
NEVER use pixel coordinates for widget placement.

ALWAYS use CSS grid-template-areas on the container.

Assign grid-area: [areaName] to widget wrappers dynamically.

Support responsive layouts via media queries if needed.

3. Data Source Management Rules
NEVER fetch data directly in individual widgets.

ALWAYS go through the DataSourceManager singleton.

Cache all data with TTL based on refreshInterval.

Deduplicate concurrent requests to the same endpoint.

Generate cache keys that include filter state for server-side filtering.

4. Filtering Rules
Widgets opt-in to filters via filtering.subscribe array.

Never re-fetch if the changed filter is not in the subscription list.

Prefer server-side filtering when supportsServerFiltering = true.

Fallback to client-side filtering if server filtering is unavailable.

Auto mode checks server support and chooses automatically.

5. Navigation Rules
The component is "dumb" regarding routing.

On drill-down, emit a custom event dashboardNav.

NEVER touch window.history or window.location directly.

Let the host application manage routing and pass new config.

6. State Management Rules
Use @stencil/store for cross-widget communication.

Store structure MUST match the DashboardState interface.

Widgets that publish filters update dashboardStore.state.filters.

Widgets that subscribe to filters listen to dashboardStore.onChange('filters', ...).

7. Error Handling Rules
Every <dashboard-widget-host> MUST have error boundaries.

Widget crashes MUST NOT break the entire dashboard.

Display user-friendly error messages with retry options.

Log errors to console for developer debugging.

Implementation Tasks
Task 1: Core Interfaces
Output the complete TypeScript interfaces for:

DashboardConfig

DataSourceConfig

WidgetDefinition

FilterConfig

DataSourceResult

DashboardState

Ensure all types are exported and fully documented with JSDoc comments.

Task 2: DataSourceManager Service
Implement the DataSourceManager class with:

Constructor (singleton pattern)

getDataSource() method with caching and deduplication

invalidateCache() method

generateCacheKey() private method

isCacheFresh() private method

fetchData() private method that handles both server and client filtering

Include proper error handling and TypeScript generics for type-safe data.

Task 3: Dashboard Store
Create the @stencil/store instance with:

filters state

context state

Helper functions to update filters

Type-safe state mutations

Task 4: Main Dashboard Component
Write the <spectrum-dashboard> component with:

Props: config, context

Events: dashboardNav

Lifecycle: Initialize DataSourceManager, parse layout, render grid

Render logic: Map config.widgets to <dashboard-widget-host> instances

Use h() from @stencil/core for rendering. Ensure CSS Grid is applied correctly via inline styles or scoped CSS.

Task 5: Widget Host Component
Write the <dashboard-widget-host> component with:

Props: widgetConfig, area, dataSourceManager, globalContext

State: data, loading, error

Lifecycle: Subscribe to filters, fetch data, unsubscribe on unmount

Methods: refreshData(), applyClientFiltering(), handleWidgetInteraction()

Render: Loading state, error state, or child widget with data

Task 6: Widget Registry
Create a simple registry object that maps component names to HTML tags:



export const widgetRegistry: Record<string, string> = {
  'kpi-card': 'dash-kpi-card',
  'line-chart': 'dash-line-chart',
  // ...
};
Task 7: Example Widgets
Create three example widgets demonstrating the pattern:

<dash-filter-panel> - Publishes filter changes to store

<dash-kpi-card> - Displays a single metric from data

<dash-line-chart> - Renders a simple chart (can use mock SVG)

All widgets MUST be purely presentational (no data fetching).

Code Quality Requirements
TypeScript strict mode: No implicit any, all types explicit

JSDoc comments: All public APIs documented

Error handling: Try-catch around all async operations

Memory management: Unsubscribe from store listeners in disconnectedCallback()

Performance: Avoid unnecessary re-renders (check if data actually changed)

Testing Approach
For each component, consider:

Unit tests for isolated logic (cache key generation, filter matching)

Integration tests for component interaction (filter → widget refresh)

Edge cases (empty config, network errors, slow APIs)

Constraints
Do NOT use Shadow DOM for the grid container (use scoped: true instead) to ensure CSS Grid behavior is predictable.

Do NOT import external charting libraries unless explicitly requested.

Do NOT use class-based components; prefer functional components where possible.

Do NOT hardcode widget types; always use the registry.

Success Validation
Before considering the implementation complete, verify:

✅ Multiple widgets sharing the same dataSourceId result in only ONE API call.

✅ Changing a filter only triggers refresh in widgets subscribed to that filter.

✅ Server-side filtering appends correct query parameters to API requests.

✅ Client-side filtering works when server filtering is disabled.

✅ Widget errors don't crash the dashboard.

✅ Layout changes correctly based on different template configurations.

✅ Drill-down emits dashboardNav event with correct payload.

✅ Cross-filter action updates filters and triggers subscribed widget refreshes.

✅ Hierarchical navigation builds and maintains accurate breadcrumb trail.

✅ Detail panel action updates context without triggering navigation.

✅ Dashboard navigation passes context correctly to target view.

✅ Chart click events include all necessary data (label, value, indices).

✅ Table row click events include row data and pagination context.

✅ Filter preservation works correctly when preserveFilters is true/false.

11. Additional Resources
Relevant Documentation
Stencil.js: Stencil - A Compiler for Web Components | Stencil 

Stencil Store: Store | Stencil 

CSS Grid: CSS Grid Layout Guide | CSS-Tricks 

TypeScript Generics: Documentation - Generics 

Video Resources
Stencil State Management: [Link from original document]

CSS Grid Template Areas: 

 

Advanced TypeScript Patterns: 

https://www.youtube.com/watch?v=VDx7RaYXR6k

Design Patterns Used
Singleton Pattern: DataSourceManager (one instance per dashboard)

Observer Pattern: Stencil Store (pub/sub for filters)

Strategy Pattern: Client vs Server filtering modes

Registry Pattern: Widget type resolution

Wrapper/Decorator Pattern: dashboard-widget-host

12. Migration Path (v1 to v2)
If you have an existing v1 implementation, follow this migration guide:

Step 1: Add DataSourceManager
Create the DataSourceManager class

Initialize in <spectrum-dashboard> component

Pass reference to all <dashboard-widget-host> instances

Step 2: Centralize Data Sources
Extract all data configs from widgets

Add to top-level dataSources object with unique IDs

Replace widget data with dataSourceId references

Step 3: Add Filtering Config
Add filtering property to widget definitions

Define subscribe arrays for each widget

Choose mode (auto, client, or server) per widget

Step 4: Update Widget Host
Add filter subscription logic to componentWillLoad()

Implement applyClientFiltering() method

Update refreshData() to pass filters to DataSourceManager

Step 5: Test & Validate
Verify only one API call per shared data source

Test filter changes trigger correct widget refreshes

Validate both client and server filtering modes

Check cache invalidation works correctly

Backward Compatibility
Old configs with inline data still work (but aren't optimized)

Widgets without filtering config still function (never filter)

Existing widgets don't need changes (host handles everything)

Appendix A: Troubleshooting Guide
Issue: Multiple API Calls for Same Data
Symptom: Network tab shows duplicate requests to same endpoint.

Check:

Are widgets using the same dataSourceId?

Is DataSourceManager instantiated only once?

Are filters included in cache key generation?

Fix: Ensure all widgets reference the shared data source by ID, not inline config.

Issue: Widgets Not Updating on Filter Change
Symptom: Filters change but widgets show old data.

Check:

Is widget subscribed to the changed filter? (Check filtering.subscribe)

Is store update happening? (Add console.log in onChange listener)

Is cache key changing? (Log cache keys in DataSourceManager)

Fix: Add the filter key to widget's filtering.subscribe array.

Issue: Server Filters Not Working
Symptom: API calls don't include filter parameters.

Check:

Is supportsServerFiltering = true in data source config?

Is filterParamMap defined correctly?

Is filtering.mode set to 'server' or 'auto'?

Fix: Verify filter key mapping matches API expectations.

Issue: Layout Breaks on Mobile
Symptom: Widgets overlap or grid collapses.

Check:

Are grid-template-areas valid for all screen sizes?

Are column definitions responsive? (Consider using repeat(auto-fit, minmax(...)))

Fix: Add media queries to adjust template and columns for smaller screens.

Issue: Drill-Down Not Working
Symptom: Clicking chart or table does nothing.

Check:

Is drillDown config defined in widget definition?

Is the widget emitting elementClick or rowClick events?

Is dashboard-widget-host listening for these events?

Is DrillDownManager.processDrillDown() being called?

Fix: Add debug logging to trace event flow from widget to DrillDownManager.

Issue: Cross-Filter Not Updating Widgets
Symptom: Clicking chart doesn't filter table.

Check:

Are filterMappings defined correctly in drillDown config?

Is the table subscribed to the filter key? (Check filtering.subscribe)

Is DashboardStore.filters actually updating? (Use browser DevTools)

Fix: Ensure filter key in filterMappings matches filter key in table's filtering.subscribe.

Issue: Hierarchical Navigation Missing Breadcrumbs
Symptom: Navigation works but breadcrumb doesn't appear.

Check:

Is breadcrumb component in target view layout?

Is navigation state in DashboardStore populated?

Is breadcrumbLabel defined in drillDown config?

Fix: Ensure breadcrumb widget reads from DashboardStore.getNavigation().breadcrumb.

Issue: Detail Panel Not Showing
Symptom: Row click doesn't open detail panel.

Check:

Is drillDown.action set to 'detail-panel'?

Is detailPanel config defined?

Is host application listening to context changes?

Is context.detailPanel.visible being set to true?

Fix: Add context change listener in host app to render detail panel when context updates.

Issue: Navigation Loses Filter Context
Symptom: After drill-down, filters are reset.

Check:

Is preserveFilters set to true in drillDown config?

Is contextMapping including filter state?

Is target view reading filters from context?

Fix: Set preserveFilters: true or explicitly map filters in contextMapping.

Appendix B: Performance Benchmarks
Target performance metrics for a typical dashboard (10 widgets, 1000 data points):

Metric

Target

Measurement Method

Metric

Target

Measurement Method

Initial Render

< 2s

Performance API (navigationStart to loadComplete)

Filter Response

< 500ms

Time from filter change to widget re-render

Memory Usage

< 50MB

Chrome DevTools Memory Profiler

Cache Hit Rate

> 80%

DataSourceManager metrics

Bundle Size

< 50KB (gzipped)

Webpack Bundle Analyzer

Appendix C: Security Considerations
API Security
Always include authentication tokens in data source requests via context.

Never expose API keys in JSON configuration.

Sanitize all user inputs before sending to API (especially filter values).

XSS Prevention
Escape all dynamic content rendered in widgets.

Use Stencil's built-in sanitization for HTML content.

Validate all JSON configurations before parsing.

Data Privacy
Don't cache sensitive data longer than necessary.

Clear cache on logout or session expiration.

Implement row-level security via backend filters.

