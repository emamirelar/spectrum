# Complete Dashboard Configuration

This directory contains the JSON configuration for the Complete Dashboard example shown in Storybook.

## Configuration File

**File:** `complete-dashboard-config.json`

This is a comprehensive dashboard configuration demonstrating:
- Filter panel with region, category, and date range filters
- Line chart showing revenue trends over time
- Pie chart showing sales distribution by region
- Data table with sortable, paginated sales data
- Automatic filter-to-widget communication

## Usage

### In a Web Application

```html
<spectrum-dashboard
  config="./complete-dashboard-config.json"
  debug="false">
</spectrum-dashboard>
```

### Programmatically

```typescript
import dashboardConfig from './complete-dashboard-config.json';

const dashboard = document.querySelector('spectrum-dashboard');
dashboard.config = dashboardConfig;
```

### With React

```tsx
import { SpectrumDashboard } from '@unops-itg-npm/cpit-spectrum-react';
import dashboardConfig from './complete-dashboard-config.json';

function App() {
  return (
    <SpectrumDashboard 
      config={dashboardConfig}
      debug={false}
    />
  );
}
```

## Configuration Structure

### Data Sources

```json
{
  "dataSources": {
    "salesData": {
      "url": "/api/sales",
      "method": "GET",
      "refreshInterval": 60000,
      "data": [/* embedded data or fetched from URL */]
    }
  }
}
```

### Filters

```json
{
  "filters": [
    {
      "id": "region",
      "type": "select",
      "label": "Region",
      "options": [
        { "label": "All Regions", "value": "" },
        { "label": "North America", "value": "NA" }
      ]
    }
  ]
}
```

### Layout

```json
{
  "layout": {
    "type": "grid",
    "columns": "1fr",
    "rows": "auto auto auto",
    "gap": "1.5rem",
    "areas": [
      ["filters"],
      ["charts"],
      ["table"]
    ]
  }
}
```

### Widgets

Each widget in the configuration includes:

```json
{
  "id": "widget-id",
  "area": "charts",
  "component": "line-chart",
  "title": "Widget Title",
  "dataSource": "salesData",
  "config": {
    /* Component-specific configuration */
  },
  "filterMapping": {
    "filterId": "dataField"
  }
}
```

## Widget Types

### Filter Panel
- **Component:** `filter-panel`
- **Purpose:** Provides filtering UI for dashboard data
- **Config Options:**
  - `layout`: "horizontal" | "vertical"
  - `immediate`: Enable live filtering (no Apply button)
  - `showButtons`: Show Apply/Reset buttons

### Charts
- **Components:** `line-chart`, `bar-chart`, `pie-chart`, `doughnut-chart`, `radar-chart`, `polarArea-chart`
- **Purpose:** Visual data representation
- **Config Options:**
  - `title`: Chart title
  - `xAxisLabel`, `yAxisLabel`: Axis labels
  - `showLegend`: Display legend
  - `legendPosition`: "top" | "right" | "bottom" | "left"
  - `valueFormat`: "number" | "currency" | "percentage"

### Data Table
- **Component:** `data-table`
- **Purpose:** Tabular data display
- **Config Options:**
  - `columns`: Column definitions
  - `sortable`: Enable sorting
  - `pageable`: Enable pagination
  - `pageSize`: Rows per page
  - `selectable`: Enable row selection
  - `striped`, `hoverable`, `bordered`: Visual styles

## Data Transformation

The dashboard supports automatic data transformation:

```json
{
  "dataTransform": {
    "type": "aggregate",
    "groupBy": "date",
    "aggregate": {
      "revenue": "sum",
      "units": "count"
    },
    "labelMapping": {
      "NA": "North America",
      "EU": "Europe"
    }
  }
}
```

## Filter Mapping

Connect filters to widget data fields:

```json
{
  "filterMapping": {
    "region": "region",
    "category": "category",
    "dateRange": "date"
  }
}
```

When a filter changes:
1. Dashboard store updates with new filter values
2. All widgets with `filterMapping` automatically refresh
3. Data is filtered before rendering

## Responsive Design

Configure responsive layouts for different screen sizes:

```json
{
  "responsive": {
    "breakpoints": {
      "mobile": "768px",
      "tablet": "1024px"
    },
    "mobileLayout": {
      "columns": "1fr",
      "areas": [
        ["filters"],
        ["chart1"],
        ["chart2"],
        ["table"]
      ]
    }
  }
}
```

## Theme Configuration

Customize dashboard appearance:

```json
{
  "theme": {
    "colorScheme": "light",
    "primaryColor": "#1976d2",
    "borderRadius": "8px",
    "spacing": "1.5rem"
  }
}
```

## Live Example

Visit the Storybook to see this configuration in action:
- **URL:** http://localhost:6006/?path=/story/spectrum-components-spectrumdashboard--complete-dashboard
- **Features:**
  - Live filtering (immediate mode)
  - Dynamic chart updates
  - Paginated table with record count
  - Responsive layout

## API Integration

Replace embedded data with API calls:

```json
{
  "dataSources": {
    "salesData": {
      "url": "https://api.example.com/sales",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer ${TOKEN}"
      },
      "refreshInterval": 60000,
      "cache": true,
      "transform": {
        "path": "data.results"
      }
    }
  }
}
```

The dashboard will:
1. Fetch data from the URL
2. Apply any transformations
3. Cache the result
4. Refresh on the specified interval
5. Apply filters automatically

## Advanced Features

### Client-Side Filtering

```json
{
  "filtering": {
    "mode": "client",
    "strategy": "immediate"
  }
}
```

### Server-Side Filtering

```json
{
  "filtering": {
    "mode": "server",
    "apiEndpoint": "/api/filter",
    "debounce": 300
  }
}
```

### Custom Data Formatters

```json
{
  "formatters": {
    "customCurrency": {
      "type": "currency",
      "currency": "EUR",
      "locale": "de-DE"
    }
  }
}
```

## Notes

- The Storybook example uses embedded data for demonstration
- In production, replace `data` with `url` in dataSources
- All configuration is reactive - changes update the dashboard immediately
- Filter mappings are case-sensitive
- Date ranges use ISO 8601 format (YYYY-MM-DD)

## Related Examples

- **score-card-dashboard.json** - Dashboard with KPI score cards
- **drill-down-complete-config.json** - Dashboard with drill-down navigation
- **README.md** - General drill-down system documentation



