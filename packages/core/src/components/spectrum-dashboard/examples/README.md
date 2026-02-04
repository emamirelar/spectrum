# Dashboard JSON Configuration Examples

This directory contains complete, production-ready JSON configuration examples for the Spectrum Dashboard Engine.

## Overview

The Spectrum Dashboard is **100% JSON-configurable**. Every aspect of the dashboard—including drill-down interactions—can be defined through JSON without writing any code.

## Example Configurations

### 1. Complete Drill-Down Configuration
**File:** `drill-down-complete-config.json`

Comprehensive example demonstrating all four drill-down patterns in a single dashboard:
- Cross-filter with pie charts
- Hierarchical navigation with product tables
- Detail panel with customer data
- Dashboard navigation with KPI cards

### 2. Score Card Dashboard
**File:** `score-card-dashboard.json`

Analytics dashboard featuring the new `spectrum-score-card` component:
- 8 score cards showing different metrics
- Various formats (currency, percentage, number, decimal)
- Trend indicators and comparisons
- Progress bars with target values
- Color variants (success, warning, error, info)
- Drill-down integration
- Filter-responsive metrics

## Drill-Down Patterns

All drill-down interactions are configured via the `drillDown` property on widget definitions:

```json
{
  "widgets": {
    "my-widget": {
      "component": "chart-type",
      "dataSourceId": "data-source",
      "drillDown": {
        "action": "drill-down-type",
        // ... pattern-specific configuration
      }
    }
  }
}
```

### 1. Cross-Filter Pattern

**Use Case:** Click chart segment to filter other widgets

**JSON Configuration:**
```json
{
  "regional-chart": {
    "component": "pie-chart",
    "dataSourceId": "sales-data",
    "drillDown": {
      "action": "cross-filter",
      "filterMappings": {
        "label": "region",
        "value": "revenue"
      }
    }
  }
}
```

**How It Works:**
1. User clicks pie chart segment labeled "North America"
2. `filterMappings` maps chart's `label` field → dashboard's `region` filter
3. Dashboard store updates: `{ region: "North America" }`
4. All widgets subscribed to `region` filter automatically refresh

**Required Properties:**
- `action`: `"cross-filter"`
- `filterMappings`: Maps event data fields to filter keys

---

### 2. Hierarchical Navigation Pattern

**Use Case:** Drill through data levels with breadcrumb trail

**JSON Configuration:**
```json
{
  "product-table": {
    "component": "data-table",
    "dataSourceId": "product-data",
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
```

**How It Works:**
1. User clicks table row for "Laptop Pro"
2. Dashboard navigates to `product-detail-view`
3. Breadcrumb shows: "Overview > Product: Laptop Pro"
4. Context passed to detail view: `{ productId: "123", productName: "Laptop Pro", ... }`
5. Filters preserved if `preserveFilters: true`

**Required Properties:**
- `action`: `"hierarchical-nav"`
- `targetView`: ID of the dashboard view to navigate to

**Optional Properties:**
- `breadcrumbLabel`: Template with placeholders (e.g., `"Product: {product}"`)
- `preserveFilters`: Boolean - maintain filter state (default: false)
- `contextMapping`: Maps clicked data to context passed to target view

---

### 3. Detail Panel Pattern

**Use Case:** Show modal/panel without full navigation

**JSON Configuration:**
```json
{
  "customer-table": {
    "component": "data-table",
    "dataSourceId": "customer-data",
    "drillDown": {
      "action": "detail-panel",
      "detailPanel": {
        "title": "Customer Details",
        "component": "customer-detail-card",
        "width": "600px"
      },
      "contextMapping": {
        "customerId": "id",
        "customerName": "customerName",
        "customerEmail": "email"
      }
    }
  }
}
```

**How It Works:**
1. User clicks customer row
2. Context updated with: `{ detailPanel: { visible: true, data: {...} } }`
3. Host application renders detail panel component
4. No URL change or navigation
5. User closes panel to return to table

**Required Properties:**
- `action`: `"detail-panel"`

**Optional Properties:**
- `detailPanel`: Panel configuration (title, component, width)
- `contextMapping`: Maps clicked data to panel data

---

### 4. Dashboard Navigation Pattern

**Use Case:** Navigate between different dashboard views

**JSON Configuration:**
```json
{
  "revenue-kpi": {
    "component": "kpi-card",
    "dataSourceId": "sales-data",
    "drillDown": {
      "action": "dashboard-nav",
      "targetView": "revenue-analytics-dashboard",
      "contextMapping": {
        "metric": "metric",
        "period": "period"
      }
    }
  }
}
```

**How It Works:**
1. User clicks KPI card
2. Dashboard emits `dashboardNav` event
3. Host application loads new dashboard config for `revenue-analytics-dashboard`
4. Context passed: `{ metric: "revenue", period: "Q4-2024" }`
5. Clean navigation (no breadcrumb trail)

**Required Properties:**
- `action`: `"dashboard-nav"`
- `targetView`: ID of the target dashboard

**Optional Properties:**
- `contextMapping`: Maps clicked data to context for target dashboard

---

## JSON Property Reference

### DrillDownConfig Interface

```typescript
{
  "action": "cross-filter" | "hierarchical-nav" | "detail-panel" | "dashboard-nav",
  "targetView"?: string,          // Required for: hierarchical-nav, dashboard-nav
  "filterMappings"?: {            // Required for: cross-filter
    "[eventField]": "filterKey"
  },
  "contextMapping"?: {            // Optional for all navigation types
    "[contextKey]": "eventField"
  },
  "preserveFilters"?: boolean,    // Only for: hierarchical-nav
  "breadcrumbLabel"?: string,     // Only for: hierarchical-nav
  "detailPanel"?: {               // Only for: detail-panel
    "title"?: string,
    "component"?: string,
    "width"?: string
  }
}
```

### Context Mapping

Maps fields from widget event data to context/filter keys:

**Event Data (from chart/table click):**
```json
{
  "id": "product-123",
  "product": "Laptop Pro",
  "category": "Electronics",
  "revenue": 58499.55
}
```

**Context Mapping:**
```json
{
  "contextMapping": {
    "productId": "id",
    "productName": "product",
    "selectedCategory": "category"
  }
}
```

**Resulting Context:**
```json
{
  "productId": "product-123",
  "productName": "Laptop Pro",
  "selectedCategory": "Electronics"
}
```

### Filter Mapping

Maps event data to filter keys for cross-filtering:

**Event Data (from pie chart click):**
```json
{
  "label": "North America",
  "value": 250000
}
```

**Filter Mapping:**
```json
{
  "filterMappings": {
    "label": "region",
    "value": "revenue"
  }
}
```

**Resulting Filter Update:**
```json
{
  "region": "North America",
  "revenue": 250000
}
```

## Usage in Host Application

### 1. Load Dashboard Config

```typescript
const dashboardConfig = await fetch('/configs/sales-dashboard.json')
  .then(res => res.json());

const dashboardEl = document.querySelector('spectrum-dashboard');
dashboardEl.config = dashboardConfig;
```

### 2. Listen for Navigation Events

```typescript
dashboardEl.addEventListener('dashboardNav', (event) => {
  const { viewId, context } = event.detail;
  
  // Update URL (optional)
  history.pushState({ viewId, context }, '', `/dashboard/${viewId}`);
  
  // Load new dashboard config
  const newConfig = await fetch(`/configs/${viewId}.json`).then(res => res.json());
  
  // Update dashboard
  dashboardEl.config = newConfig;
  dashboardEl.context = context;
});
```

### 3. Listen for Context Changes (Detail Panel)

```typescript
// Subscribe to dashboard store for context changes
import DashboardStore from '@spectrum/core/dashboard/store';

DashboardStore.onChange('context', (context) => {
  if (context.detailPanel?.visible) {
    // Render detail panel
    renderDetailPanel(context.detailPanel);
  }
});
```

## Best Practices

### 1. Choose the Right Pattern

- **Cross-Filter**: Data exploration within same dataset
- **Hierarchical Nav**: Natural hierarchies (Region → Country → City)
- **Detail Panel**: Quick views without losing context
- **Dashboard Nav**: Jumping between major analytical views

### 2. Context Mapping

- Map only essential data (not entire row objects)
- Use semantic names (`productId` not `id`)
- Keep context serializable (no functions)

### 3. Filter Preservation

- Set `preserveFilters: true` when drill-down maintains analytical context
- Set `preserveFilters: false` for fresh analysis at detail level

### 4. Breadcrumb Labels

- Use templates with placeholders: `"Product: {product}"`
- Keep trail to 4-5 levels maximum
- Include enough context for navigation

### 5. Performance

- Drill-down actions are synchronous (no loading states)
- Data fetching happens after navigation via DataSourceManager
- Shared data sources cached automatically

## Complete Working Examples

### Drill-Down Dashboard
See `drill-down-complete-config.json` for a production-ready dashboard featuring:

- 4 KPI cards with dashboard navigation
- Pie chart with cross-filter functionality
- Product table with hierarchical navigation
- Customer table with detail panel
- Full filter integration
- Proper data source sharing

### Score Card Dashboard
See `score-card-dashboard.json` for an analytics dashboard featuring:

- 8 score cards with various metric types
- Trend indicators (up, down, neutral)
- Comparison values
- Progress bars with targets
- Multiple format types (currency, percentage, number, decimal)
- Color variants (success, warning, error, info)
- Drill-down integration (dashboard-nav, hierarchical-nav, detail-panel)
- Filter-responsive metrics

These examples can be loaded directly into the dashboard:

```html
<!-- Drill-Down Dashboard -->
<spectrum-dashboard
  config='./examples/drill-down-complete-config.json'
  context='{"userId":"123","authToken":"abc"}'
></spectrum-dashboard>

<!-- Score Card Dashboard -->
<spectrum-dashboard
  config='./examples/score-card-dashboard.json'
  context='{"userId":"123","authToken":"abc"}'
></spectrum-dashboard>
```

---

## Score Card Component Reference

The `spectrum-score-card` component is a flexible metric display widget with the following features:

### Basic Usage

```json
{
  "widgets": {
    "revenue-card": {
      "component": "score-card",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["dateRange", "region"],
        "mode": "server"
      },
      "uiConfig": {
        "label": "Total Revenue",
        "subtitle": "Last 30 days",
        "format": "currency",
        "icon": "account_balance_wallet",
        "variant": "success",
        "size": "medium"
      }
    }
  }
}
```

### Configuration Properties

#### Display Properties
- `label` (string): Main label text
- `subtitle` (string): Optional subtitle text
- `icon` (string): Material icon name
- `iconPosition` ('start' | 'end'): Icon placement

#### Value Formatting
- `format` ('number' | 'currency' | 'percentage' | 'decimal'): Value format type
- `prefix` (string): Text before value (e.g., "$")
- `suffix` (string): Text after value (e.g., "%", "pts")

#### Visual Variants
- `variant` ('default' | 'success' | 'warning' | 'error' | 'info'): Color theme
- `size` ('small' | 'medium' | 'large'): Card size

#### Trend Indicator
```json
{
  "trend": {
    "direction": "up",
    "value": "+12.5%",
    "label": "vs last month",
    "isPositive": true
  }
}
```

#### Comparison Data
```json
{
  "comparison": {
    "value": "$40,543",
    "label": "previous period"
  }
}
```

#### Progress Bar
```json
{
  "target": 100000,
  "showProgress": true
}
```

### Full Example
```json
{
  "widgets": {
    "complete-score-card": {
      "component": "score-card",
      "dataSourceId": "metrics-data",
      "filtering": {
        "subscribe": ["dateRange"],
        "mode": "server"
      },
      "uiConfig": {
        "label": "Monthly Revenue",
        "subtitle": "Target progress",
        "format": "currency",
        "icon": "trending_up",
        "iconPosition": "start",
        "variant": "success",
        "size": "medium",
        "target": 100000,
        "showProgress": true,
        "trend": {
          "direction": "up",
          "value": "+12.5%",
          "label": "vs last month"
        },
        "comparison": {
          "value": "$68,200",
          "label": "last month"
        }
      },
      "drillDown": {
        "action": "dashboard-nav",
        "targetView": "revenue-details",
        "contextMapping": {
          "metric": "revenue",
          "period": "monthly"
        }
      }
    }
  }
}
```

### Format Types

| Format | Example | Use Case |
|--------|---------|----------|
| `number` | 24,583 | Counts, quantities |
| `currency` | $24,583.50 | Money values |
| `percentage` | 68.5% | Rates, ratios |
| `decimal` | 3.14 | Precise values |

### Trend Directions

| Direction | Icon | Color (when positive) |
|-----------|------|---------------------|
| `up` | ↗ | Green (success) |
| `down` | ↘ | Red (error) |
| `neutral` | → | Gray (neutral) |

**Note:** Set `isPositive: false` to invert the color logic (e.g., for error counts where "down" is good).

### Drill-Down Integration

Score cards support all four drill-down patterns:

**Dashboard Navigation:**
```json
{
  "drillDown": {
    "action": "dashboard-nav",
    "targetView": "detailed-analytics",
    "contextMapping": {
      "metric": "value"
    }
  }
}
```

**Hierarchical Navigation:**
```json
{
  "drillDown": {
    "action": "hierarchical-nav",
    "targetView": "metric-details",
    "breadcrumbLabel": "Metric: {label}",
    "preserveFilters": true,
    "contextMapping": {
      "metricId": "id",
      "metricName": "label"
    }
  }
}
```

**Detail Panel:**
```json
{
  "drillDown": {
    "action": "detail-panel",
    "detailPanel": {
      "title": "Metric Details",
      "component": "metric-detail-card",
      "width": "600px"
    },
    "contextMapping": {
      "metricValue": "value",
      "metricLabel": "label"
    }
  }
}
```

## Testing Drill-Down

See the Storybook examples for interactive demos of all patterns:

- `DrillDownCrossFilter` - Cross-widget filtering
- `DrillDownHierarchicalNav` - Breadcrumb navigation
- `DrillDownDetailPanel` - Modal details
- `DrillDownDashboardNav` - Full navigation

Run Storybook:
```bash
npm run storybook
```

Navigate to: **Spectrum/Components/SpectrumDashboard**

