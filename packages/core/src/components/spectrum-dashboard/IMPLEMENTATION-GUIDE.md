# Spectrum Dashboard Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Core Concepts](#core-concepts)
4. [Configuration Reference](#configuration-reference)
5. [Layout System](#layout-system)
6. [Data Sources](#data-sources)
7. [Widgets](#widgets)
8. [Filtering System](#filtering-system)
9. [Drill-Down Patterns](#drill-down-patterns)
10. [Multi-View Configuration (100% JSON-Only)](#multi-view-configuration-100-json-only)
11. [Advanced Features](#advanced-features)
12. [Best Practices](#best-practices)
13. [Common Patterns](#common-patterns)
14. [Troubleshooting](#troubleshooting)

---

## Overview

The Spectrum Dashboard is a **JSON-driven, framework-agnostic web component** that enables you to build complex, interactive dashboards with:

- ✅ **Zero JavaScript**: Configure entirely via JSON
- ✅ **CSS Grid Layout**: Responsive, flexible grid-based layouts
- ✅ **Centralized Data**: Shared data sources with automatic deduplication
- ✅ **Advanced Filtering**: Client-side and server-side filtering
- ✅ **Drill-Down Support**: Four drill-down patterns out of the box
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Framework Agnostic**: Works with React, Vue, Angular, vanilla JS

---

## Quick Start

### Minimal Dashboard

```html
<spectrum-dashboard id="my-dashboard"></spectrum-dashboard>

<script>
  const dashboard = document.querySelector('#my-dashboard');
  
  dashboard.config = {
    id: 'simple-dashboard',
    title: 'Sales Dashboard',
    dataSources: {
      sales: {
        endpoint: '/api/sales',
        method: 'GET'
      }
    },
    layout: {
      template: ['chart'],
      columns: '1fr',
      gap: '1rem'
    },
    widgets: {
      chart: {
        component: 'line-chart',
        dataSourceId: 'sales',
        uiConfig: {
          chartType: 'line',
          title: 'Sales Trend'
        }
      }
    }
  };
</script>
```

---

## Core Concepts

### 1. Dashboard Configuration Object

Every dashboard is defined by a single JSON configuration object with four main sections:

```typescript
interface DashboardConfig {
  id: string;                                    // Unique dashboard identifier
  title?: string;                                // Dashboard title
  description?: string;                          // Dashboard description
  dataSources: Record<string, DataSourceConfig>; // Shared data sources
  layout: LayoutConfig;                          // Grid layout definition
  widgets: Record<string, WidgetDefinition>;     // Widget definitions
  filters?: FilterConfig[];                      // Global filters
}
```

### 2. Data Flow

```
┌─────────────────┐
│  Data Sources   │  ← Fetch data once, share everywhere
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  Dashboard      │  ← Orchestrates everything
│  Store          │
└────────┬────────┘
         │
         ├──────→  Widget 1 (subscribes to data)
         ├──────→  Widget 2 (subscribes to data)
         └──────→  Widget 3 (subscribes to data)
```

### 3. Widget System

Widgets are **web components** mapped through a registry:

```typescript
// JSON config uses generic names
{ component: 'line-chart' }

// Registry maps to actual web component tags
'line-chart' → 'spectrum-chart'
'data-table' → 'spectrum-data-table'
'filter-panel' → 'spectrum-filter-panel'
```

---

## Configuration Reference

### Dashboard Root

```typescript
{
  id: string;              // REQUIRED: Unique identifier
  title?: string;          // Dashboard title (display)
  description?: string;    // Dashboard description
  
  dataSources: {           // REQUIRED: Data source definitions
    [key: string]: DataSourceConfig
  },
  
  layout: {                // REQUIRED: Layout configuration
    template: string[];    // Grid template areas
    columns?: string;      // Column definitions
    rows?: string;         // Row definitions
    gap?: string;          // Grid gap
  },
  
  widgets: {               // REQUIRED: Widget definitions
    [areaName: string]: WidgetDefinition
  },
  
  filters?: FilterConfig[]; // Optional global filters
}
```

### Data Source Configuration

```typescript
interface DataSourceConfig {
  // REQUIRED
  endpoint: string;          // API endpoint URL
  
  // OPTIONAL
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';  // HTTP method (default: GET)
  params?: Record<string, any>;                          // Query parameters
  refreshInterval?: number;                              // Auto-refresh interval (ms)
  supportsServerFiltering?: boolean;                     // Server-side filtering support
  
  // Data transformation
  transform?: {
    expression?: string;     // JSONata expression
    path?: string;           // Extract from nested path (e.g., "data.items")
    mapping?: Record<string, string>;  // Simple field mapping
  };
}
```

### Layout Configuration

```typescript
interface LayoutConfig {
  // REQUIRED
  template: string[];        // Grid template areas (visual layout)
  
  // OPTIONAL
  columns?: string;          // CSS grid-template-columns (default: 'repeat(auto-fit, minmax(200px, 1fr))')
  rows?: string;             // CSS grid-template-rows (default: 'auto')
  gap?: string;              // Grid gap (default: '16px')
}
```

### Widget Configuration

```typescript
interface WidgetDefinition {
  // REQUIRED
  component: string;         // Widget type (from registry)
  uiConfig: Record<string, any>;  // Widget-specific configuration
  
  // OPTIONAL
  dataSourceId?: string;     // Reference to shared data source
  drillDown?: DrillDownConfig;  // Drill-down configuration
}
```

---

## Layout System

### How Grid Template Areas Work

The `template` array defines your layout visually:

```json
{
  "layout": {
    "template": [
      "header header header",
      "sidebar main main",
      "footer footer footer"
    ],
    "columns": "200px 1fr 1fr",
    "rows": "60px 1fr 40px",
    "gap": "1rem"
  }
}
```

**Result:**
```
┌──────────────────────────────────┐
│      HEADER (spans 3 cols)       │  60px
├─────────┬────────────────────────┤
│ SIDEBAR │     MAIN (spans 2)     │  1fr (fills space)
├─────────┴────────────────────────┤
│      FOOTER (spans 3 cols)       │  40px
└──────────────────────────────────┘
  200px      1fr          1fr
```

### Common Layout Patterns

#### **Two-Column Dashboard**
```json
{
  "template": [
    "filters filters",
    "chart1 chart2",
    "table table"
  ],
  "columns": "repeat(2, 1fr)",
  "rows": "auto 300px 1fr"
}
```

#### **Four KPI Cards + Chart**
```json
{
  "template": [
    "kpi1 kpi2 kpi3 kpi4",
    "chart chart chart chart",
    "table table table table"
  ],
  "columns": "repeat(4, 1fr)",
  "rows": "auto 350px 1fr"
}
```

#### **Sidebar Navigation**
```json
{
  "template": [
    "nav content content",
    "nav content content"
  ],
  "columns": "250px 1fr 1fr",
  "rows": "auto 1fr"
}
```

#### **Complex Multi-Section**
```json
{
  "template": [
    "header header header header",
    "kpi1 kpi2 kpi3 kpi4",
    "chart1 chart1 chart2 chart2",
    "table table table table",
    "footer footer footer footer"
  ],
  "columns": "repeat(4, 1fr)",
  "rows": "60px auto 300px 1fr 40px"
}
```

### Responsive Layouts

**Strategy 1: Different Configs for Different Screens**
```typescript
const layoutConfig = window.innerWidth < 768 
  ? mobileLayout 
  : desktopLayout;

dashboard.config = { ...config, layout: layoutConfig };
```

**Strategy 2: Responsive Grid Values**
```json
{
  "columns": "repeat(auto-fit, minmax(300px, 1fr))",
  "rows": "auto"
}
```

---

## Data Sources

### Basic Data Source

```json
{
  "dataSources": {
    "sales": {
      "endpoint": "/api/sales",
      "method": "GET"
    }
  }
}
```

### Data Source with Parameters

```json
{
  "dataSources": {
    "userSales": {
      "endpoint": "/api/sales",
      "method": "GET",
      "params": {
        "userId": "123",
        "startDate": "2024-01-01"
      }
    }
  }
}
```

### Data Source with Auto-Refresh

```json
{
  "dataSources": {
    "liveMetrics": {
      "endpoint": "/api/metrics",
      "refreshInterval": 30000  // Refresh every 30 seconds
    }
  }
}
```

### Data Transformation

#### **Extract from Nested Path**
```json
{
  "dataSources": {
    "products": {
      "endpoint": "/api/response",
      "transform": {
        "path": "data.products"  // Extract response.data.products
      }
    }
  }
}
```

**API Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      { "id": 1, "name": "Product A" }
    ]
  }
}
```

**Extracted Data:**
```json
[
  { "id": 1, "name": "Product A" }
]
```

#### **JSONata Expression**
```json
{
  "dataSources": {
    "salesSummary": {
      "endpoint": "/api/sales",
      "transform": {
        "expression": "$sum(items.revenue)"
      }
    }
  }
}
```

#### **Simple Field Mapping**
```json
{
  "dataSources": {
    "mappedData": {
      "endpoint": "/api/legacy",
      "transform": {
        "mapping": {
          "name": "fullName",
          "value": "totalAmount"
        }
      }
    }
  }
}
```

### Server-Side Filtering

```json
{
  "dataSources": {
    "filteredSales": {
      "endpoint": "/api/sales",
      "supportsServerFiltering": true,
      "params": {
        "region": "NA"
      }
    }
  }
}
```

When filters change, the dashboard automatically:
1. Updates the `params` with filter values
2. Re-fetches data from the server
3. Updates all widgets using this data source

---

## Widgets

### Available Widget Types

| Widget Type | Component Tag | Purpose |
|------------|---------------|---------|
| `filter-panel` | `spectrum-filter-panel` | Filter controls |
| `line-chart` | `spectrum-chart` | Line charts |
| `bar-chart` | `spectrum-chart` | Bar charts |
| `pie-chart` | `spectrum-chart` | Pie charts |
| `doughnut-chart` | `spectrum-chart` | Doughnut charts |
| `data-table` | `spectrum-data-table` | Data tables |
| `score-card` | `spectrum-score-card` | KPI cards |
| `map` | `spectrum-map` | Interactive maps (Leaflet) |
| `leaflet-map` | `spectrum-map` | Leaflet maps (40KB) |
| `maplibre-map` | `spectrum-map` | MapLibre maps (200KB) |

### Widget Configuration Structure

```json
{
  "widgets": {
    "[grid-area-name]": {
      "component": "[widget-type]",
      "dataSourceId": "[data-source-key]",
      "uiConfig": {
        // Widget-specific configuration
      },
      "drillDown": {
        // Optional drill-down configuration
      }
    }
  }
}
```

### Chart Widget

```json
{
  "revenue-chart": {
    "component": "line-chart",
    "dataSourceId": "salesData",
    "uiConfig": {
      "chartType": "line",
      "title": "Revenue Trend",
      "xAxisLabel": "Date",
      "yAxisLabel": "Revenue ($)",
      "valueFormat": "currency",
      "showLegend": true,
      "height": "300px",
      "labelField": "date",      // Field from data for x-axis
      "valueField": "revenue",   // Field from data for y-axis
      "datasetLabel": "Revenue"  // Legend label
    }
  }
}
```

**Data Format:**
```json
[
  { "date": "2024-01-01", "revenue": 12500 },
  { "date": "2024-01-02", "revenue": 15000 }
]
```

### Data Table Widget

```json
{
  "sales-table": {
    "component": "data-table",
    "dataSourceId": "salesData",
    "uiConfig": {
      "columns": [
        { "key": "product", "label": "Product", "sortable": true },
        { "key": "revenue", "label": "Revenue", "format": "currency", "align": "right" },
        { "key": "units", "label": "Units", "format": "number", "align": "right" }
      ],
      "sortable": true,
      "pageable": true,
      "pageSize": 10,
      "striped": true,
      "hoverable": true
    }
  }
}
```

### Filter Panel Widget

```json
{
  "filters": {
    "component": "filter-panel",
    "uiConfig": {
      "layout": "horizontal",
      "immediate": true,
      "showButtons": false,
      "filters": [
        {
          "id": "region",
          "type": "select",
          "label": "Region",
          "options": [
            { "label": "All Regions", "value": "" },
            { "label": "North America", "value": "NA" },
            { "label": "Europe", "value": "EU" }
          ]
        },
        {
          "id": "dateRange",
          "type": "dateRange",
          "label": "Date Range",
          "defaultValue": {
            "start": "2024-01-01",
            "end": "2024-12-31"
          }
        }
      ]
    }
  }
}
```

### Score Card Widget

```json
{
  "revenue-kpi": {
    "component": "score-card",
    "dataSourceId": "kpiData",
    "uiConfig": {
      "value": 125000,
      "label": "Total Revenue",
      "format": "currency",
      "icon": "account_balance_wallet",
      "variant": "success",
      "trend": {
        "direction": "up",
        "value": "+12.5%",
        "label": "vs last month"
      },
      "size": "medium"
    }
  }
}
```

### Map Widget

The map widget supports both Leaflet (lightweight, 40KB) and MapLibre GL JS (modern, 200KB) providers via dynamic imports. Choose the provider based on your needs.

#### **Basic Map Configuration**

```json
{
  "store-map": {
    "component": "map",
    "dataSourceId": "storeLocations",
    "uiConfig": {
      "mapProvider": "leaflet",
      "center": [40.7128, -74.0060],
      "zoom": 10,
      "height": "500px",
      "basemap": "streets",
      "controls": {
        "zoom": true,
        "scale": true
      }
    }
  }
}
```

#### **Map with Markers**

```json
{
  "uiConfig": {
    "mapProvider": "leaflet",
    "center": [40.7128, -74.0060],
    "zoom": 12,
    "markers": [
      {
        "id": "store1",
        "position": [40.7128, -74.0060],
        "label": "Manhattan Store",
        "tooltip": "Revenue: $5.2M",
        "color": "#3388ff",
        "data": {
          "revenue": 5200000,
          "employees": 45
        }
      }
    ]
  }
}
```

#### **Map with Clustering**

For maps with many markers, enable clustering:

```json
{
  "uiConfig": {
    "mapProvider": "leaflet",
    "center": [40.7128, -74.0060],
    "zoom": 10,
    "clustering": {
      "enabled": true,
      "radius": 80,
      "maxZoom": 15,
      "showCount": true
    }
  }
}
```

#### **Regional/Polygon Map**

Show regions with GeoJSON polygons:

```json
{
  "uiConfig": {
    "mapProvider": "leaflet",
    "center": [39.8283, -98.5795],
    "zoom": 4,
    "regions": [
      {
        "id": "northeast",
        "label": "Northeast Region",
        "fillColor": "#ff6b6b",
        "fillOpacity": 0.3,
        "borderColor": "#ff6b6b",
        "borderWidth": 2,
        "tooltip": "Sales: $45M",
        "data": { "sales": 45000000 },
        "geoJson": {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates": [[
              [-80, 45], [-65, 45], [-65, 38], [-80, 38], [-80, 45]
            ]]
          }
        }
      }
    ]
  }
}
```

#### **Heatmap Visualization**

Visualize data density with heatmaps:

```json
{
  "uiConfig": {
    "mapProvider": "leaflet",
    "center": [40.7128, -74.0060],
    "zoom": 11,
    "heatmap": {
      "points": [
        { "position": [40.7128, -74.0060], "intensity": 0.8 },
        { "position": [40.7589, -73.9851], "intensity": 0.6 }
      ],
      "radius": 25,
      "blur": 15
    }
  }
}
```

#### **Routes/Paths**

Display delivery routes or paths:

```json
{
  "uiConfig": {
    "mapProvider": "leaflet",
    "routes": [
      {
        "id": "route1",
        "label": "Delivery Route 1",
        "coordinates": [
          [40.7128, -74.0060],
          [40.7589, -73.9851],
          [40.7484, -73.9857]
        ],
        "color": "#3388ff",
        "width": 3,
        "style": "solid"
      }
    ]
  }
}
```

#### **Map with Drill-Down**

Maps support all drill-down patterns:

**Cross-Filter:**
```json
{
  "drillDown": {
    "action": "cross-filter",
    "filterMappings": {
      "id": "storeId",
      "data.region": "region"
    }
  }
}
```

**Hierarchical Navigation:**
```json
{
  "drillDown": {
    "action": "hierarchical-nav",
    "targetView": "store-detail",
    "contextMapping": {
      "storeId": "id",
      "storeName": "label"
    },
    "breadcrumbLabel": "{{label}}"
  }
}
```

#### **Provider Selection**

Choose the right map provider for your use case:

| Provider | Bundle Size | Best For | Features |
|----------|-------------|----------|----------|
| **Leaflet** (default) | +40KB | Most use cases | Markers, clusters, heatmaps, routes, polygons |
| **MapLibre** | +200KB | Advanced features | Vector tiles, 3D, GPU acceleration, modern styling |

**When to use Leaflet:**
- ✅ Standard marker maps
- ✅ Bundle size matters
- ✅ Simple visualizations
- ✅ Raster tiles (OpenStreetMap)

**When to use MapLibre:**
- ✅ Vector tiles
- ✅ 3D terrain/buildings
- ✅ GPU-accelerated rendering
- ✅ Modern map styling

---

## Filtering System

### Filter Types

#### **Select Filter**
```json
{
  "id": "category",
  "type": "select",
  "label": "Category",
  "options": [
    { "label": "All", "value": "" },
    { "label": "Electronics", "value": "electronics" }
  ],
  "defaultValue": ""
}
```

#### **Multi-Select Filter**
```json
{
  "id": "regions",
  "type": "multiSelect",
  "label": "Regions",
  "options": [
    { "label": "North America", "value": "NA" },
    { "label": "Europe", "value": "EU" }
  ],
  "defaultValue": []
}
```

#### **Date Range Filter**
```json
{
  "id": "dateRange",
  "type": "dateRange",
  "label": "Date Range",
  "defaultValue": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  }
}
```

#### **Text Search Filter**
```json
{
  "id": "search",
  "type": "text",
  "label": "Search",
  "placeholder": "Search products...",
  "defaultValue": ""
}
```

### Filter Modes

#### **Immediate Mode** (auto-apply on change)
```json
{
  "uiConfig": {
    "immediate": true,
    "showButtons": false
  }
}
```

#### **Manual Mode** (apply button required)
```json
{
  "uiConfig": {
    "immediate": false,
    "showButtons": true
  }
}
```

### Client-Side vs Server-Side Filtering

#### **Client-Side Filtering**
- Filters data in the browser
- Fast, no network latency
- Best for small-medium datasets (<10,000 rows)

```json
{
  "dataSources": {
    "sales": {
      "endpoint": "/api/sales"
      // No supportsServerFiltering flag
    }
  }
}
```

#### **Server-Side Filtering**
- Sends filter values to server as query params
- Efficient for large datasets
- Reduces data transfer

```json
{
  "dataSources": {
    "sales": {
      "endpoint": "/api/sales",
      "supportsServerFiltering": true
    }
  }
}
```

**Generated Request:**
```
GET /api/sales?region=NA&category=Electronics&startDate=2024-01-01&endDate=2024-12-31
```

---

## Drill-Down Patterns

The dashboard supports four drill-down patterns for interactive navigation:

### 1. Cross-Filter (Update Filters)

Click a chart element to filter other widgets in the same dashboard.

```json
{
  "product-chart": {
    "component": "pie-chart",
    "dataSourceId": "salesData",
    "uiConfig": { ... },
    "drillDown": {
      "action": "cross-filter",
      "filterMappings": {
        "label": "product",     // Chart label → product filter
        "value": "revenue"      // Chart value → revenue filter
      }
    }
  }
}
```

**User Flow:**
1. User clicks "Laptop" slice in pie chart
2. Dashboard updates filters: `{ product: "Laptop" }`
3. All widgets re-filter to show only Laptop data

### 2. Hierarchical Navigation (Breadcrumbs)

Navigate through data hierarchies with breadcrumb trail.

```json
{
  "region-chart": {
    "component": "bar-chart",
    "dataSourceId": "salesData",
    "uiConfig": { ... },
    "drillDown": {
      "action": "hierarchical-nav",
      "targetView": "city-details",
      "contextMapping": {
        "regionId": "label",
        "regionName": "label"
      },
      "breadcrumbLabel": "Region: {label}",
      "preserveFilters": true
    }
  }
}
```

**User Flow:**
1. User clicks "North America" bar
2. Dashboard navigates to city-details view
3. Breadcrumb shows: `Overview > Region: North America`
4. Current filters are preserved

### 3. Detail Panel (Modal/Sidebar)

Open a detail panel without leaving the dashboard.

```json
{
  "users-table": {
    "component": "data-table",
    "dataSourceId": "users",
    "uiConfig": { ... },
    "drillDown": {
      "action": "detail-panel",
      "contextMapping": {
        "userId": "id",
        "userName": "name"
      },
      "detailPanel": {
        "title": "User Details",
        "component": "user-detail-view",
        "width": "400px"
      }
    }
  }
}
```

**User Flow:**
1. User clicks a table row
2. Side panel opens showing user details
3. Dashboard remains visible
4. Close panel to return

### 4. Dashboard Navigation (Full Transition)

Navigate to a completely different dashboard.

```json
{
  "revenue-kpi": {
    "component": "score-card",
    "dataSourceId": "kpiData",
    "uiConfig": { ... },
    "drillDown": {
      "action": "dashboard-nav",
      "targetView": "revenue-analytics",
      "contextMapping": {
        "dateRange": "period",
        "region": "region"
      }
    }
  }
}
```

**User Flow:**
1. User clicks "Total Revenue" KPI card
2. Dashboard navigates to revenue-analytics dashboard
3. Context (dateRange, region) is passed to new dashboard

### 5. Map-Based Drill-Down

Navigate through geographic data using interactive maps with markers.

#### **Leaflet Map with Drill-Down**

```json
{
  "store-map": {
    "component": "map",
    "dataSourceId": "stores",
    "uiConfig": {
      "mapProvider": "leaflet",
      "center": [40.7128, -74.0060],
      "zoom": 3,
      "height": "600px",
      "basemap": "streets",
      "clustering": {
        "enabled": true,
        "radius": 80,
        "maxZoom": 12
      },
      "controls": {
        "zoom": true,
        "scale": true,
        "attribution": true
      },
      "labelField": "name",
      "valueField": "revenue",
      "markerConfig": {
        "idField": "id",
        "positionField": "position",
        "tooltipField": "tooltip",
        "dataFields": ["id", "name", "region", "revenue"]
      }
    },
    "drillDown": {
      "action": "dashboard-nav",
      "targetView": "store-detail",
      "contextMapping": {
        "storeId": "id",
        "storeName": "name"
      }
    }
  }
}
```

#### **MapLibre with 3D Features**

```json
{
  "store-map-3d": {
    "component": "map",
    "dataSourceId": "stores",
    "uiConfig": {
      "mapProvider": "maplibre",
      "center": [40.7128, -74.0060],
      "zoom": 3,
      "pitch": 45,
      "bearing": 0,
      "height": "600px",
      "basemap": "streets",
      "buildings3d": true,
      "terrain": {
        "enabled": true,
        "exaggeration": 1.5
      },
      "controls": {
        "zoom": true,
        "scale": true
      },
      "labelField": "name",
      "valueField": "revenue",
      "markerConfig": {
        "idField": "id",
        "positionField": "position",
        "tooltipField": "tooltip",
        "dataFields": ["id", "name", "region", "revenue"]
      }
    },
    "drillDown": {
      "action": "dashboard-nav",
      "targetView": "store-detail",
      "contextMapping": {
        "storeId": "id",
        "storeName": "name"
      }
    }
  }
}
```

**Map Data Format:**

```json
[
  {
    "id": "store-001",
    "name": "Manhattan Flagship",
    "position": [40.7589, -73.9851],
    "region": "North America",
    "revenue": 2850000,
    "units": 15420,
    "tooltip": "Manhattan Flagship - $2.85M revenue"
  }
]
```

**User Flow:**
1. User sees map with clustered store markers
2. User hovers over marker to see tooltip
3. User clicks marker to drill down to store detail dashboard
4. Store detail dashboard shows score cards and transaction table
5. User clicks transaction row to drill down to transaction details
6. Breadcrumb navigation allows returning to any level

**Map Features:**
- **Marker Clustering**: Automatically clusters markers at lower zoom levels
- **Hover Tooltips**: Show summary information on marker hover
- **Click Drill-Down**: Navigate to detail dashboards on marker click
- **3D Perspective** (MapLibre): Camera pitch, terrain, and buildings
- **Responsive**: Maps adapt to container size

**Complete 3-Level Example:**

See the `MapDrillDownLeaflet` and `MapDrillDownMapLibre3D` stories in Storybook for complete working examples with:
- Level 1: Map with store markers
- Level 2: Store detail with score cards + transaction table
- Level 3: Transaction detail with score cards + line items table

---

## Multi-View Configuration (100% JSON-Only)

For the ultimate in JSON-driven dashboards, use the **Multi-View Configuration** pattern. This enables drill-down navigation **without any JavaScript event handlers**.

### Overview

Multi-view configuration defines multiple dashboard views in a single JSON file:
- All views are defined upfront
- Navigation between views is automatic
- Breadcrumbs are auto-generated
- Context is passed through the navigation chain

### Multi-View Configuration Structure

```typescript
interface MultiViewDashboardConfig {
  id: string;
  navigation: {
    initialView: string;           // Starting view
    enableBreadcrumbs?: boolean;   // Auto-generate breadcrumbs (default: true)
    breadcrumb?: {
      showHome?: boolean;          // Show home link
      homeLabel?: string;          // Home link label
      separator?: string;          // Separator character
    };
  };
  sharedDataSources?: {            // Data sources available to all views
    [id: string]: DataSourceConfig;
  };
  views: {
    [viewId: string]: ViewConfig;  // Individual view configurations
  };
}

interface ViewConfig {
  breadcrumbLabel?: string;        // Supports {{context.field}} templates
  layout: LayoutConfig;
  widgets: Record<string, WidgetDefinition>;
  dataSources?: Record<string, DataSourceConfig>; // View-specific data sources
  filters?: Record<string, FilterDefinition>;
}
```

### Complete Multi-View Example

```json
{
  "id": "store-analytics",
  "navigation": {
    "initialView": "overview",
    "enableBreadcrumbs": true
  },
  "sharedDataSources": {
    "stores": {
      "id": "stores",
      "endpoint": "/api/stores",
      "method": "GET"
    },
    "transactions": {
      "id": "transactions",
      "endpoint": "/api/transactions",
      "method": "GET"
    }
  },
  "views": {
    "overview": {
      "breadcrumbLabel": "Store Map",
      "layout": {
        "template": ["map map map map"],
        "columns": "1fr 1fr 1fr 1fr",
        "rows": "1fr"
      },
      "widgets": {
        "map": {
          "component": "map",
          "dataSourceId": "stores",
          "uiConfig": {
            "mapProvider": "leaflet",
            "markerConfig": {
              "positionField": "position",
              "idField": "id",
              "labelField": "name"
            }
          },
          "drillDown": {
            "action": "dashboard-nav",
            "targetView": "store-detail",
            "contextMapping": {
              "storeId": "id",
              "storeName": "name"
            }
          }
        }
      }
    },
    "store-detail": {
      "breadcrumbLabel": "{{context.storeName}}",
      "layout": {
        "template": [
          "breadcrumb breadcrumb breadcrumb breadcrumb",
          "revenue units avgorder conversion",
          "transactions transactions transactions transactions"
        ],
        "columns": "1fr 1fr 1fr 1fr",
        "rows": "auto auto 1fr"
      },
      "widgets": {
        "breadcrumb": {
          "component": "breadcrumb",
          "uiConfig": {}
        },
        "revenue": {
          "component": "score-card",
          "dataSourceId": "transactions",
          "uiConfig": {
            "label": "Revenue",
            "icon": "payments",
            "transform": "sum(amount)"
          }
        },
        "transactions": {
          "component": "data-table",
          "dataSourceId": "transactions",
          "uiConfig": {
            "columns": [
              {"key": "date", "label": "Date"},
              {"key": "amount", "label": "Amount", "format": "currency"}
            ]
          },
          "drillDown": {
            "action": "dashboard-nav",
            "targetView": "transaction-detail",
            "contextMapping": {
              "transactionId": "id"
            }
          }
        }
      }
    },
    "transaction-detail": {
      "breadcrumbLabel": "Transaction #{{context.transactionId}}",
      "layout": {
        "template": [
          "breadcrumb breadcrumb",
          "items items"
        ],
        "columns": "1fr 1fr",
        "rows": "auto 1fr"
      },
      "widgets": {
        "breadcrumb": {
          "component": "breadcrumb",
          "uiConfig": {}
        },
        "items": {
          "component": "data-table",
          "dataSourceId": "items",
          "uiConfig": {
            "columns": [
              {"key": "product", "label": "Product"},
              {"key": "quantity", "label": "Qty"},
              {"key": "price", "label": "Price", "format": "currency"}
            ]
          }
        }
      }
    }
  }
}
```

### Template Variables

Use `{{context.fieldName}}` in breadcrumb labels to display dynamic values:

| Template | Result |
|----------|--------|
| `{{context.storeName}}` | "Manhattan Flagship" |
| `{{context.transactionId}}` | "TXN-12345" |
| `Store: {{context.storeName}}` | "Store: Manhattan Flagship" |

### How Navigation Works

1. **User clicks map marker** → `dashboardNav` event fires with context
2. **Dashboard intercepts event** → Updates `currentViewId` and `currentContext`
3. **View re-renders** → Shows `store-detail` view
4. **Breadcrumb auto-updates** → Shows "Store Map / Manhattan Flagship"
5. **Click table row** → Same process for `transaction-detail`
6. **Click breadcrumb** → Navigates back, restores previous context

### Storybook Examples

See these stories for complete working examples:
- `JsonOnlyMultiViewLeaflet` - Leaflet map with 3-level drill-down
- `JsonOnlyMultiViewMapLibre` - MapLibre map with 3D perspective

### Comparison: Single-View vs Multi-View

| Feature | Single-View | Multi-View |
|---------|-------------|------------|
| Event handlers | Required | Not needed |
| State management | External | Internal |
| Breadcrumbs | Manual | Automatic |
| Configuration | Per-view | All-in-one |
| Use case | Custom logic | Standard patterns |

---

## Advanced Features

### Data Transformation with JSONata

JSONata is a powerful query and transformation language for JSON.

#### **Basic Transformation**
```json
{
  "transform": {
    "expression": "items[category='Electronics']"
  }
}
```

#### **Aggregation**
```json
{
  "transform": {
    "expression": "{\"total\": $sum(items.revenue), \"count\": $count(items)}"
  }
}
```

#### **Grouping**
```json
{
  "transform": {
    "expression": "items{ category: $sum(revenue) }"
  }
}
```

See `JSONATA-TRANSFORMS.md` for complete documentation.

### Dynamic Context

Pass context data to dashboards:

```typescript
dashboard.context = {
  userId: '123',
  region: 'NA',
  dateRange: { start: '2024-01-01', end: '2024-12-31' }
};
```

Context is available in:
- Data source params (interpolation)
- Drill-down navigation
- Widget configuration

### Custom Widgets

Register your own widget types:

```typescript
import { WidgetRegistryManager } from '@spectrum/core';

WidgetRegistryManager.registerWidget('my-custom-widget', 'custom-widget-tag');
```

Use in configuration:
```json
{
  "my-widget": {
    "component": "my-custom-widget",
    "uiConfig": { ... }
  }
}
```

---

## Best Practices

### 1. Data Source Design

**✅ DO: Share data sources**
```json
{
  "dataSources": {
    "sales": { "endpoint": "/api/sales" }
  },
  "widgets": {
    "chart1": { "dataSourceId": "sales", ... },
    "chart2": { "dataSourceId": "sales", ... },
    "table": { "dataSourceId": "sales", ... }
  }
}
```

**❌ DON'T: Duplicate data sources**
```json
{
  "widgets": {
    "chart1": { "dataSource": { "endpoint": "/api/sales" }, ... },
    "chart2": { "dataSource": { "endpoint": "/api/sales" }, ... }
  }
}
```

### 2. Layout Design

**✅ DO: Use semantic area names**
```json
{
  "template": [
    "header header",
    "sidebar content",
    "footer footer"
  ]
}
```

**❌ DON'T: Use generic names**
```json
{
  "template": [
    "area1 area2",
    "area3 area4"
  ]
}
```

### 3. Widget Configuration

**✅ DO: Keep uiConfig flat and simple**
```json
{
  "uiConfig": {
    "title": "Sales Chart",
    "showLegend": true,
    "height": "300px"
  }
}
```

**❌ DON'T: Nest deeply**
```json
{
  "uiConfig": {
    "display": {
      "title": {
        "text": "Sales Chart",
        "visible": true
      }
    }
  }
}
```

### 4. Performance

- Use server-side filtering for large datasets (>10k rows)
- Set reasonable `refreshInterval` values (>10 seconds)
- Limit initial data fetch size
- Use pagination for tables

### 5. Error Handling

Always provide fallback values:
```json
{
  "dataSources": {
    "sales": {
      "endpoint": "/api/sales",
      "params": {
        "limit": 100,
        "fallback": []
      }
    }
  }
}
```

---

## Common Patterns

### Pattern 1: Filtered Dashboard

```json
{
  "id": "sales-dashboard",
  "dataSources": {
    "sales": { "endpoint": "/api/sales" }
  },
  "layout": {
    "template": ["filters", "chart", "table"],
    "columns": "1fr",
    "rows": "auto 300px 1fr"
  },
  "widgets": {
    "filters": {
      "component": "filter-panel",
      "uiConfig": { "immediate": true, "filters": [...] }
    },
    "chart": {
      "component": "line-chart",
      "dataSourceId": "sales",
      "uiConfig": { ... }
    },
    "table": {
      "component": "data-table",
      "dataSourceId": "sales",
      "uiConfig": { ... }
    }
  }
}
```

### Pattern 2: KPI Dashboard

```json
{
  "layout": {
    "template": [
      "kpi1 kpi2 kpi3 kpi4",
      "chart chart chart chart"
    ],
    "columns": "repeat(4, 1fr)"
  },
  "widgets": {
    "kpi1": { "component": "score-card", ... },
    "kpi2": { "component": "score-card", ... },
    "kpi3": { "component": "score-card", ... },
    "kpi4": { "component": "score-card", ... },
    "chart": { "component": "line-chart", ... }
  }
}
```

### Pattern 3: Master-Detail

```json
{
  "layout": {
    "template": [
      "list list",
      "detail detail"
    ]
  },
  "widgets": {
    "list": {
      "component": "data-table",
      "drillDown": {
        "action": "detail-panel",
        "contextMapping": { "id": "id" }
      }
    },
    "detail": {
      "component": "detail-view",
      "dataSourceId": "detailData"
    }
  }
}
```

---

## Troubleshooting

### Issue: Widgets Not Rendering

**Symptoms:** Empty dashboard, no widgets appear

**Causes:**
1. Widget area name doesn't match `template`
2. Widget component not registered
3. Invalid JSON configuration

**Solutions:**
```typescript
// 1. Check area names match
"template": ["chart1", "chart2"]
"widgets": {
  "chart1": { ... },  // ✅ Matches
  "chart2": { ... }   // ✅ Matches
}

// 2. Check widget is registered
console.log(WidgetRegistryManager.hasWidget('line-chart')); // Should be true

// 3. Validate JSON
try {
  JSON.parse(configString);
} catch (e) {
  console.error('Invalid JSON:', e);
}
```

### Issue: Data Not Loading

**Symptoms:** Widgets show "No data" or loading state

**Causes:**
1. Incorrect `dataSourceId`
2. API endpoint not accessible
3. CORS issues
4. Invalid data transformation

**Solutions:**
```typescript
// 1. Check dataSourceId exists
"dataSources": { "sales": { ... } }
"widgets": { "chart": { "dataSourceId": "sales" } }  // ✅ Matches

// 2. Test endpoint manually
fetch('/api/sales')
  .then(r => r.json())
  .then(data => console.log('Data:', data));

// 3. Check browser console for CORS errors

// 4. Enable debug mode
dashboard.debug = true;
```

### Issue: Filters Not Working

**Symptoms:** Changing filters doesn't update widgets

**Causes:**
1. Filter `id` doesn't match data field
2. Data transformation issue
3. Server-side filtering misconfigured

**Solutions:**
```json
// 1. Match filter IDs to data fields
{
  "filters": [
    { "id": "region", ... }  // Must match data field "region"
  ]
}

// 2. Check data structure
console.log(dashboard.getState().data);

// 3. For server-side, ensure:
{
  "dataSources": {
    "sales": {
      "supportsServerFiltering": true  // ✅ Required
    }
  }
}
```

### Issue: Layout Not Displaying Correctly

**Symptoms:** Widgets overlap or don't fill space

**Causes:**
1. Invalid grid template
2. Missing area definitions
3. Wrong column/row values

**Solutions:**
```json
// 1. Ensure all areas in template have widgets
"template": ["chart1", "chart2"],  // ✅ Both have widgets
"widgets": {
  "chart1": { ... },
  "chart2": { ... }
}

// 2. Use proper CSS grid values
"columns": "repeat(2, 1fr)",  // ✅ Valid
"rows": "300px 1fr",          // ✅ Valid
"gap": "1rem"                 // ✅ Valid
```

### Issue: Drill-Down Not Working

**Symptoms:** Clicking widgets doesn't trigger navigation

**Causes:**
1. Missing drill-down configuration
2. Invalid action type
3. Event not propagating

**Solutions:**
```json
// 1. Ensure drillDown is configured
{
  "drillDown": {
    "action": "cross-filter",  // ✅ Valid action
    "filterMappings": { ... }  // ✅ Required for cross-filter
  }
}

// 2. Check valid actions
// - "cross-filter"
// - "hierarchical-nav"
// - "detail-panel"
// - "dashboard-nav"

// 3. Enable debug mode
dashboard.debug = true;
```

### Debug Mode

Enable comprehensive logging:

```typescript
dashboard.debug = true;
```

This logs:
- Configuration parsing
- Data source requests/responses
- Filter changes
- Widget rendering
- Drill-down events
- State updates

---

## Complete Example

Here's a production-ready dashboard configuration:

```json
{
  "id": "sales-analytics",
  "title": "Sales Analytics Dashboard",
  "description": "Comprehensive sales performance tracking",
  
  "dataSources": {
    "salesData": {
      "endpoint": "/api/sales",
      "method": "GET",
      "refreshInterval": 60000,
      "transform": {
        "path": "data"
      }
    },
    "kpiData": {
      "endpoint": "/api/kpis",
      "method": "GET",
      "refreshInterval": 30000
    }
  },
  
  "layout": {
    "template": [
      "filters filters filters filters",
      "kpi1 kpi2 kpi3 kpi4",
      "revenue-chart revenue-chart region-chart region-chart",
      "table table table table"
    ],
    "columns": "repeat(4, 1fr)",
    "rows": "auto auto 350px 1fr",
    "gap": "1.5rem"
  },
  
  "widgets": {
    "filters": {
      "component": "filter-panel",
      "uiConfig": {
        "layout": "horizontal",
        "immediate": true,
        "showButtons": false,
        "filters": [
          {
            "id": "region",
            "type": "select",
            "label": "Region",
            "options": [
              { "label": "All Regions", "value": "" },
              { "label": "North America", "value": "NA" },
              { "label": "Europe", "value": "EU" }
            ]
          },
          {
            "id": "dateRange",
            "type": "dateRange",
            "label": "Date Range",
            "defaultValue": {
              "start": "2024-01-01",
              "end": "2024-12-31"
            }
          }
        ]
      }
    },
    
    "kpi1": {
      "component": "score-card",
      "dataSourceId": "kpiData",
      "uiConfig": {
        "value": 1200000,
        "label": "Total Revenue",
        "format": "currency",
        "icon": "account_balance_wallet",
        "variant": "success",
        "trend": {
          "direction": "up",
          "value": "+12.5%",
          "label": "vs last month"
        }
      }
    },
    
    "kpi2": {
      "component": "score-card",
      "dataSourceId": "kpiData",
      "uiConfig": {
        "value": 8534,
        "label": "Total Orders",
        "format": "number",
        "icon": "shopping_cart"
      }
    },
    
    "kpi3": {
      "component": "score-card",
      "dataSourceId": "kpiData",
      "uiConfig": {
        "value": 2145,
        "label": "New Customers",
        "format": "number",
        "icon": "person_add"
      }
    },
    
    "kpi4": {
      "component": "score-card",
      "dataSourceId": "kpiData",
      "uiConfig": {
        "value": 3.2,
        "label": "Conversion Rate",
        "format": "percentage",
        "icon": "trending_up"
      }
    },
    
    "revenue-chart": {
      "component": "line-chart",
      "dataSourceId": "salesData",
      "uiConfig": {
        "chartType": "line",
        "title": "Revenue Trend",
        "xAxisLabel": "Date",
        "yAxisLabel": "Revenue ($)",
        "showLegend": true,
        "height": "350px",
        "labelField": "date",
        "valueField": "revenue",
        "datasetLabel": "Revenue"
      },
      "drillDown": {
        "action": "hierarchical-nav",
        "targetView": "daily-revenue",
        "breadcrumbLabel": "Revenue Details"
      }
    },
    
    "region-chart": {
      "component": "pie-chart",
      "dataSourceId": "salesData",
      "uiConfig": {
        "chartType": "pie",
        "title": "Sales by Region",
        "showLegend": true,
        "legendPosition": "right",
        "height": "350px",
        "labelField": "region",
        "valueField": "revenue",
        "datasetLabel": "Revenue"
      },
      "drillDown": {
        "action": "cross-filter",
        "filterMappings": {
          "label": "region"
        }
      }
    },
    
    "table": {
      "component": "data-table",
      "dataSourceId": "salesData",
      "uiConfig": {
        "columns": [
          { "key": "product", "label": "Product", "sortable": true },
          { "key": "region", "label": "Region", "sortable": true },
          { "key": "revenue", "label": "Revenue", "format": "currency", "sortable": true, "align": "right" },
          { "key": "units", "label": "Units", "format": "number", "sortable": true, "align": "right" }
        ],
        "sortable": true,
        "pageable": true,
        "pageSize": 10,
        "striped": true,
        "hoverable": true,
        "bordered": true
      },
      "drillDown": {
        "action": "detail-panel",
        "contextMapping": {
          "productId": "id",
          "productName": "product"
        },
        "detailPanel": {
          "title": "Product Details",
          "width": "500px"
        }
      }
    }
  }
}
```

---

## Next Steps

- **Review Examples**: Check `/examples` directory for more configurations
- **Explore Components**: See individual widget documentation
- **Read Spec**: Review `spec.md` for technical details
- **Try Storybook**: Interactive examples at http://localhost:6006

---

## Support & Resources

- **Documentation**: See `README.md` and `spec.md`
- **Examples**: `/examples` directory
- **Type Definitions**: `types/dashboard.types.ts`
- **Storybook**: Interactive component playground

---

**Version**: 0.0.1-alpha  
**Last Updated**: January 2026

