# Spectrum Dashboard Quick Reference

## Configuration Structure

```json
{
  "id": "dashboard-id",
  "dataSources": { },
  "layout": { },
  "widgets": { }
}
```

## Layout Template

```json
{
  "layout": {
    "template": [
      "area1 area2",
      "area3 area3"
    ],
    "columns": "repeat(2, 1fr)",
    "rows": "auto 1fr",
    "gap": "1rem"
  }
}
```

## Data Source

```json
{
  "dataSources": {
    "myData": {
      "endpoint": "/api/data",
      "method": "GET",
      "refreshInterval": 30000,
      "transform": {
        "path": "data.items"
      }
    }
  }
}
```

## Widget Definition

```json
{
  "widgets": {
    "area-name": {
      "component": "widget-type",
      "dataSourceId": "data-source-id",
      "uiConfig": { }
    }
  }
}
```

## Available Widgets

| Type | Component |
|------|-----------|
| Charts | `line-chart`, `bar-chart`, `pie-chart`, `doughnut-chart` |
| Data | `data-table`, `filter-panel` |
| KPIs | `score-card` |
| Maps | `map`, `leaflet-map`, `maplibre-map` |

## Chart Widget

```json
{
  "component": "line-chart",
  "dataSourceId": "sales",
  "uiConfig": {
    "chartType": "line",
    "title": "Sales Trend",
    "labelField": "date",
    "valueField": "revenue",
    "datasetLabel": "Revenue",
    "height": "300px"
  }
}
```

## Table Widget

```json
{
  "component": "data-table",
  "dataSourceId": "sales",
  "uiConfig": {
    "columns": [
      { "key": "name", "label": "Name", "sortable": true },
      { "key": "value", "label": "Value", "format": "currency" }
    ],
    "pageable": true,
    "pageSize": 10
  }
}
```

## Filter Widget

```json
{
  "component": "filter-panel",
  "uiConfig": {
    "immediate": true,
    "filters": [
      {
        "id": "region",
        "type": "select",
        "label": "Region",
        "options": [
          { "label": "All", "value": "" },
          { "label": "North America", "value": "NA" }
        ]
      }
    ]
  }
}
```

## Map Widget

### Basic Map (Leaflet - 40KB)
```json
{
  "component": "map",
  "dataSourceId": "locations",
  "uiConfig": {
    "mapProvider": "leaflet",
    "center": [40.7128, -74.0060],
    "zoom": 10,
    "height": "500px"
  }
}
```

### Map with Markers
```json
{
  "component": "map",
  "uiConfig": {
    "mapProvider": "leaflet",
    "markers": [
      {
        "id": "1",
        "position": [40.7128, -74.0060],
        "label": "Store 1",
        "tooltip": "Revenue: $5M"
      }
    ]
  }
}
```

### Map with Clustering
```json
{
  "component": "map",
  "uiConfig": {
    "mapProvider": "leaflet",
    "clustering": {
      "enabled": true,
      "radius": 80
    }
  }
}
```

### Advanced Map (MapLibre - 200KB)
```json
{
  "component": "maplibre-map",
  "uiConfig": {
    "mapProvider": "maplibre",
    "center": [40.7128, -74.0060],
    "zoom": 12,
    "basemap": "dark"
  }
}
```

## Drill-Down Actions

### Cross-Filter
```json
{
  "drillDown": {
    "action": "cross-filter",
    "filterMappings": {
      "label": "region"
    }
  }
}
```

### Hierarchical Navigation
```json
{
  "drillDown": {
    "action": "hierarchical-nav",
    "targetView": "detail-view",
    "breadcrumbLabel": "Details"
  }
}
```

### Detail Panel
```json
{
  "drillDown": {
    "action": "detail-panel",
    "detailPanel": {
      "title": "Details",
      "width": "400px"
    }
  }
}
```

### Dashboard Navigation
```json
{
  "drillDown": {
    "action": "dashboard-nav",
    "targetView": "other-dashboard"
  }
}
```

## Common Layouts

### Two Column
```json
["left right"]
"columns": "repeat(2, 1fr)"
```

### Sidebar
```json
["sidebar content content"]
"columns": "250px 1fr 1fr"
```

### Four Grid
```json
[
  "a b",
  "c d"
]
"columns": "repeat(2, 1fr)"
```

### Header + Content
```json
[
  "header header",
  "main main"
]
```

## Filter Types

- `select` - Single selection dropdown
- `multiSelect` - Multiple selection
- `text` - Text input
- `dateRange` - Date range picker
- `number` - Number input

## Format Types

- `number` - 1,234
- `currency` - $1,234.00
- `percentage` - 12.5%
- `decimal` - 1234.56
- `boolean` - Yes/No

## Debug Mode

```typescript
dashboard.debug = true;
```

## Access State

```typescript
const state = dashboard.getState();
console.log(state.data);
console.log(state.filters);
```

## Update Context

```typescript
dashboard.context = {
  userId: '123',
  region: 'NA'
};
```

## Minimal Example

```html
<spectrum-dashboard id="dash"></spectrum-dashboard>

<script>
  document.querySelector('#dash').config = {
    id: 'simple',
    dataSources: {
      data: { endpoint: '/api/data' }
    },
    layout: {
      template: ['chart'],
      columns: '1fr'
    },
    widgets: {
      chart: {
        component: 'line-chart',
        dataSourceId: 'data',
        uiConfig: {
          chartType: 'line',
          labelField: 'x',
          valueField: 'y'
        }
      }
    }
  };
</script>
```

---

## Multi-View Configuration (100% JSON-Only)

For drill-down dashboards without JavaScript event handlers:

```javascript
dashboard.config = {
  id: 'multi-view-dashboard',
  navigation: {
    initialView: 'overview',
    enableBreadcrumbs: true
  },
  sharedDataSources: {
    stores: { endpoint: '/api/stores' }
  },
  views: {
    overview: {
      breadcrumbLabel: 'Store Map',
      layout: { template: ['map'], columns: '1fr' },
      widgets: {
        map: {
          component: 'map',
          dataSourceId: 'stores',
          drillDown: {
            action: 'dashboard-nav',
            targetView: 'detail',
            contextMapping: { storeId: 'id', storeName: 'name' }
          }
        }
      }
    },
    detail: {
      breadcrumbLabel: '{{context.storeName}}',  // Template variable!
      layout: { template: ['breadcrumb', 'content'], columns: '1fr', rows: 'auto 1fr' },
      widgets: {
        breadcrumb: { component: 'breadcrumb', uiConfig: {} },
        content: { component: 'data-table', dataSourceId: 'stores' }
      }
    }
  }
};
```

### Key Features
- `navigation.initialView` - Starting view
- `views[id].breadcrumbLabel` - Supports `{{context.field}}` templates
- Breadcrumbs auto-generated and updated
- No event handlers needed - dashboard handles navigation internally

