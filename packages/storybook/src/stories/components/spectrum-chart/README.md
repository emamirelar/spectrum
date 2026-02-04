# Spectrum Chart Component

A flexible, production-ready chart component powered by Chart.js. Works standalone or as a dashboard widget with full TypeScript support.

## Overview

The `spectrum-chart` component provides powerful data visualization capabilities with support for 8 chart types, smart data parsing, value formatting, and comprehensive configuration options.

## Features

- **8 Chart Types**: Line, Bar, Pie, Doughnut, Radar, Polar Area, Bubble, Scatter
- **Dual Usage**: Standalone component or dashboard widget
- **Smart Parsing**: Accepts JSON strings, objects, or simple arrays
- **Value Formatting**: Currency, percent, decimal, number
- **Responsive Design**: Adapts to container size automatically
- **Accessible**: WCAG 2.1 AA compliant
- **Themeable**: Spectrum design token integration
- **Type-Safe**: Full TypeScript support

## Quick Start

### Standalone Usage

```html
<spectrum-chart
  type="line"
  title="Revenue Trend"
  data='{"labels":["Jan","Feb","Mar"],"datasets":[{"label":"Revenue","data":[1000,1500,1200]}]}'
></spectrum-chart>
```

### Dashboard Widget

```json
{
  "widgets": {
    "sales-chart": {
      "component": "line-chart",
      "dataSourceId": "sales-data",
      "uiConfig": {
        "type": "line",
        "title": "Sales Trend",
        "valueFormat": "currency"
      }
    }
  }
}
```

## Chart Types

### Line Chart
**Best for**: Trends over time, continuous data
```html
<spectrum-chart type="line" ...></spectrum-chart>
```

### Bar Chart
**Best for**: Category comparisons, discrete data
```html
<spectrum-chart type="bar" ...></spectrum-chart>
```

### Pie Chart
**Best for**: Part-to-whole relationships, percentages
```html
<spectrum-chart type="pie" ...></spectrum-chart>
```

### Doughnut Chart
**Best for**: Like pie, but with center space for labels
```html
<spectrum-chart type="doughnut" ...></spectrum-chart>
```

### Radar Chart
**Best for**: Multi-dimensional comparisons
```html
<spectrum-chart type="radar" ...></spectrum-chart>
```

### Polar Area Chart
**Best for**: Circular category comparison with area
```html
<spectrum-chart type="polarArea" ...></spectrum-chart>
```

### Bubble Chart
**Best for**: Three-dimensional data (x, y, size)
```html
<spectrum-chart type="bubble" ...></spectrum-chart>
```

### Scatter Chart
**Best for**: Correlation between two variables
```html
<spectrum-chart type="scatter" ...></spectrum-chart>
```

## Configuration

### Basic Configuration

```typescript
interface SpectrumChartConfig {
  // Chart type
  type?: ChartType;
  
  // Display options
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  
  // Axis options
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  minValue?: number;
  maxValue?: number;
  
  // Formatting
  valueFormat?: 'currency' | 'percent' | 'number' | 'decimal';
  currencySymbol?: string;
  decimalPlaces?: number;
  
  // Styling
  colors?: string[];
  animated?: boolean;
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  aspectRatio?: number;
  
  // Advanced
  stacked?: boolean;
  showDataLabels?: boolean;
  advancedOptions?: ChartOptions; // Full Chart.js options
}
```

### Data Format

```typescript
interface SpectrumChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }>;
}
```

## Examples

### Line Chart with Multiple Datasets

```html
<spectrum-chart
  type="line"
  config='{"title":"Revenue vs Expenses","showLegend":true,"valueFormat":"currency"}'
  data='{
    "labels":["Jan","Feb","Mar","Apr","May","Jun"],
    "datasets":[
      {"label":"Revenue","data":[5000,5500,6000,6200,6500,7000]},
      {"label":"Expenses","data":[3000,3200,3400,3600,3800,4000]}
    ]
  }'
  height="500px"
></spectrum-chart>
```

### Stacked Bar Chart

```html
<spectrum-chart
  type="bar"
  config='{"title":"Sales by Category","stacked":true,"showLegend":true}'
  data='{
    "labels":["Q1","Q2","Q3","Q4"],
    "datasets":[
      {"label":"Electronics","data":[15,18,16,20]},
      {"label":"Clothing","data":[8,9,8,10]},
      {"label":"Home","data":[5,6,5,7]}
    ]
  }'
></spectrum-chart>
```

### Pie Chart with Custom Colors

```html
<spectrum-chart
  type="pie"
  config='{"title":"Market Share","colors":["#0078d4","#00b294","#f7630c"],"showLegend":true}'
  data='{
    "labels":["Product A","Product B","Product C"],
    "datasets":[{"label":"Share","data":[40,35,25]}]
  }'
></spectrum-chart>
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `SpectrumChartConfig \| string` | `{}` | Chart configuration |
| `data` | `SpectrumChartData \| any[] \| string` | `{labels:[],datasets:[]}` | Chart data |
| `type` | `ChartType` | `'line'` | Chart type |
| `title` | `string` | - | Chart title |
| `width` | `string` | - | Chart width (CSS value) |
| `height` | `string` | `'400px'` | Chart height (CSS value) |
| `loading` | `boolean` | `false` | Show loading state |
| `context` | `Record<string, any>` | `{}` | Dashboard context |
| `debug` | `boolean` | `false` | Enable debug logging |

## Dashboard Integration

### Register Widget Types

```typescript
import { widgetRegistry } from './registry/widget.registry';

widgetRegistry['line-chart'] = 'spectrum-chart';
widgetRegistry['bar-chart'] = 'spectrum-chart';
widgetRegistry['pie-chart'] = 'spectrum-chart';
```

### Dashboard Configuration

```json
{
  "id": "analytics-dashboard",
  "widgets": {
    "revenue-chart": {
      "component": "line-chart",
      "dataSourceId": "sales-data",
      "filtering": {
        "subscribe": ["dateRange", "region"],
        "mode": "server"
      },
      "uiConfig": {
        "type": "line",
        "title": "Revenue Trend",
        "valueFormat": "currency",
        "xAxisLabel": "Date",
        "yAxisLabel": "Revenue"
      }
    }
  }
}
```

## Styling

### CSS Custom Properties

```css
spectrum-chart {
  --chart-background: #ffffff;
  --chart-color: #000000;
  --chart-border-radius: 0.5rem;
  --chart-padding: 1rem;
  --chart-font-family: 'Noto Sans', sans-serif;
  --chart-loading-color: #0078d4;
}
```

### Dark Mode Support

The component automatically adapts to dark mode using Spectrum design tokens.

## Accessibility

- ✅ Keyboard navigation support
- ✅ Screen reader compatible
- ✅ ARIA labels and descriptions
- ✅ High contrast mode support
- ✅ Reduced motion support
- ✅ Focus indicators

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2017+ support required
- Responsive design works on all screen sizes

## Related Components

- `spectrum-dashboard` - Dashboard container
- `dashboard-widget-host` - Widget wrapper
- `spectrum-panel` - Content container

---

*Part of the Spectrum Design System*



