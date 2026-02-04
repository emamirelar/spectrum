# spectrum-score-card

A presentational widget for displaying key metrics with trends, comparisons, and visual indicators. Perfect for dashboards and analytics interfaces.

## Features

- **Multiple Format Types**: number, currency, percentage, decimal
- **Trend Indicators**: Up/down/neutral with customizable colors
- **Comparison Values**: Show vs previous period
- **Progress Bars**: Visual progress towards target values
- **Size Variants**: small, medium, large
- **Color Variants**: default, success, warning, error, info
- **Loading States**: Skeleton animations while data loads
- **Icons**: Material Icons support with flexible positioning
- **Responsive**: Mobile-first design with responsive breakpoints
- **Accessible**: WCAG 2.1 AA compliant
- **Dashboard Integration**: Works seamlessly with the dashboard engine

## Basic Usage

### HTML

```html
<spectrum-score-card
  value="24583"
  label="Total Revenue"
  format="currency"
  icon="account_balance_wallet"
></spectrum-score-card>
```

### JavaScript

```javascript
const scoreCard = document.querySelector('spectrum-score-card');
scoreCard.value = 24583;
scoreCard.label = 'Total Revenue';
scoreCard.format = 'currency';
scoreCard.trend = {
  direction: 'up',
  value: '+12.5%',
  label: 'vs last month'
};
```

### JSON Configuration (Dashboard)

```json
{
  "widgets": {
    "revenue-card": {
      "component": "score-card",
      "dataSourceId": "sales-data",
      "uiConfig": {
        "label": "Total Revenue",
        "format": "currency",
        "icon": "account_balance_wallet",
        "trend": {
          "direction": "up",
          "value": "+12.5%"
        }
      }
    }
  }
}
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | `number \| string` | `-` | Main metric value |
| `label` | `string` | - | Metric label/title |
| `subtitle` | `string` | - | Optional subtitle |
| `format` | `'number' \| 'currency' \| 'percentage' \| 'decimal'` | `'number'` | Value format type |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Visual variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Card size |
| `icon` | `string` | - | Material icon name |
| `iconPosition` | `'start' \| 'end'` | `'start'` | Icon placement |
| `loading` | `boolean` | `false` | Loading state |
| `prefix` | `string` | - | Text before value |
| `suffix` | `string` | - | Text after value |
| `trend` | `TrendIndicator \| string` | - | Trend indicator config |
| `comparison` | `ComparisonData \| string` | - | Comparison data |
| `target` | `number` | - | Target for progress bar |
| `showProgress` | `boolean` | `false` | Show progress bar |
| `debug` | `boolean` | `false` | Enable debug logging |

## Trend Indicator

```typescript
interface TrendIndicator {
  direction: 'up' | 'down' | 'neutral';
  value?: number | string;
  label?: string;
  isPositive?: boolean; // default: true
}
```

### Example

```html
<spectrum-score-card
  value="892"
  label="Active Users"
  trend='{"direction":"up","value":"+23","label":"vs last week"}'
></spectrum-score-card>
```

## Comparison Data

```typescript
interface ComparisonData {
  value: number | string;
  label?: string;
  isFavorable?: boolean;
  period?: 'previous' | 'last-week' | 'last-month' | 'last-quarter' | 'last-year' | 'custom';
}
```

### Example

```html
<spectrum-score-card
  value="892"
  label="Active Users"
  comparison='{"value":"735","label":"yesterday"}'
></spectrum-score-card>
```

## Value Formats

### Number
```html
<spectrum-score-card value="24583" format="number"></spectrum-score-card>
<!-- Displays: 24,583 -->
```

### Currency
```html
<spectrum-score-card value="24583.50" format="currency"></spectrum-score-card>
<!-- Displays: $24,583.50 -->
```

### Percentage
```html
<spectrum-score-card value="68.5" format="percentage"></spectrum-score-card>
<!-- Displays: 68.5% -->
```

### Decimal
```html
<spectrum-score-card value="3.14159" format="decimal"></spectrum-score-card>
<!-- Displays: 3.14 -->
```

## Variants

### Default
```html
<spectrum-score-card variant="default" value="24583" label="Revenue"></spectrum-score-card>
```

### Success (Green)
```html
<spectrum-score-card variant="success" value="95.2" label="Uptime" format="percentage"></spectrum-score-card>
```

### Warning (Orange)
```html
<spectrum-score-card variant="warning" value="68" label="Capacity" format="percentage"></spectrum-score-card>
```

### Error (Red)
```html
<spectrum-score-card variant="error" value="3" label="Failed Jobs"></spectrum-score-card>
```

### Info (Blue)
```html
<spectrum-score-card variant="info" value="125" label="Notifications"></spectrum-score-card>
```

## Progress Bar

Show progress towards a target:

```html
<spectrum-score-card
  value="68500"
  label="Monthly Goal"
  format="currency"
  target="100000"
  show-progress
  trend='{"direction":"up","value":"68.5%","label":"completed"}'
></spectrum-score-card>
```

## Size Variants

### Small
```html
<spectrum-score-card size="small" value="12450" label="Small Card" format="currency"></spectrum-score-card>
```

### Medium (Default)
```html
<spectrum-score-card size="medium" value="12450" label="Medium Card" format="currency"></spectrum-score-card>
```

### Large
```html
<spectrum-score-card size="large" value="12450" label="Large Card" format="currency"></spectrum-score-card>
```

## Loading State

```html
<spectrum-score-card
  label="Total Revenue"
  subtitle="Loading data..."
  loading
></spectrum-score-card>
```

## Complete Example

```html
<spectrum-score-card
  value="45682"
  label="Total Revenue"
  subtitle="Last 30 days"
  format="currency"
  variant="success"
  size="medium"
  icon="account_balance_wallet"
  icon-position="start"
  target="60000"
  show-progress
  trend='{"direction":"up","value":"+12.5%","label":"vs last month"}'
  comparison='{"value":"$40,543","label":"previous period"}'
></spectrum-score-card>
```

## CSS Custom Properties

Customize the appearance using CSS variables:

```css
spectrum-score-card {
  --score-card-background: #ffffff;
  --score-card-color: #000000;
  --score-card-border-radius: 12px;
  --score-card-padding: 24px;
  --score-card-value-size: 32px;
  --score-card-trend-positive: #4caf50;
  --score-card-trend-negative: #f44336;
  --score-card-progress-color: #1976d2;
}
```

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Fully keyboard accessible
- **Color Contrast**: WCAG 2.1 AA compliant
- **High Contrast Mode**: Enhanced visibility in high contrast
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Responsive**: Mobile-friendly design

## Dashboard Integration

The score-card works seamlessly with the dashboard engine:

```json
{
  "id": "analytics-dashboard",
  "layout": {
    "template": ["score1 score2 score3 score4"],
    "columns": "repeat(4, 1fr)"
  },
  "dataSources": {
    "metrics": {
      "endpoint": "/api/metrics",
      "refreshInterval": 300000
    }
  },
  "widgets": {
    "score1": {
      "component": "score-card",
      "dataSourceId": "metrics",
      "filtering": {
        "subscribe": ["dateRange"],
        "mode": "server"
      },
      "uiConfig": {
        "label": "Total Revenue",
        "format": "currency",
        "icon": "account_balance_wallet",
        "variant": "success",
        "trend": {
          "direction": "up",
          "value": "+12.5%"
        }
      },
      "drillDown": {
        "action": "dashboard-nav",
        "targetView": "revenue-details",
        "contextMapping": {
          "metric": "revenue"
        }
      }
    }
  }
}
```

## Examples

See the Storybook stories for interactive examples:
- Default card
- With trend indicator
- With comparison
- With progress bar
- Size variants
- Color variants
- Format types
- Loading state
- Dashboard grid

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

<!-- Auto Generated Below -->


## Overview

Score Card Component

A presentational widget for displaying key metrics with trends, comparisons,
and visual indicators. Designed for use in dashboards and analytics interfaces.

## Properties

| Property       | Attribute       | Description                                                                                        | Type                                                              | Default                 |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------- |
| `comparison`   | `comparison`    | Comparison data (JSON string or object)                                                            | `ComparisonData \| string`                                        | `undefined`             |
| `config`       | `config`        | Score card configuration (JSON string or object)                                                   | `ScoreCardConfig \| string`                                       | `{} as ScoreCardConfig` |
| `data`         | `data`          | Data array for aggregation (when used with transform) Receives raw data from dashboard-widget-host | `any[] \| string`                                                 | `undefined`             |
| `debug`        | `debug`         | Debug mode                                                                                         | `boolean`                                                         | `false`                 |
| `format`       | `format`        | Value format type                                                                                  | `"currency" \| "custom" \| "decimal" \| "number" \| "percentage"` | `'number'`              |
| `icon`         | `icon`          | Icon name (Material Icons)                                                                         | `string`                                                          | `undefined`             |
| `iconPosition` | `icon-position` | Icon position                                                                                      | `"end" \| "start"`                                                | `'start'`               |
| `label`        | `label`         | Metric label/title                                                                                 | `string`                                                          | `undefined`             |
| `loading`      | `loading`       | Loading state                                                                                      | `boolean`                                                         | `false`                 |
| `showProgress` | `show-progress` | Show progress bar                                                                                  | `boolean`                                                         | `false`                 |
| `size`         | `size`          | Size variant                                                                                       | `"large" \| "medium" \| "small"`                                  | `'medium'`              |
| `subtitle`     | `subtitle`      | Optional subtitle                                                                                  | `string`                                                          | `undefined`             |
| `target`       | `target`        | Target value for progress indicator                                                                | `number`                                                          | `undefined`             |
| `trend`        | `trend`         | Trend indicator (JSON string or object)                                                            | `TrendIndicator \| string`                                        | `undefined`             |
| `value`        | `value`         | Main metric value                                                                                  | `number \| string`                                                | `undefined`             |
| `valuePrefix`  | `value-prefix`  | Prefix text (e.g., "$")                                                                            | `string`                                                          | `undefined`             |
| `valueSuffix`  | `value-suffix`  | Suffix text (e.g., "%")                                                                            | `string`                                                          | `undefined`             |
| `variant`      | `variant`       | Visual variant                                                                                     | `"default" \| "error" \| "info" \| "success" \| "warning"`        | `'default'`             |


## Slots

| Slot | Description                     |
| ---- | ------------------------------- |
|      | Default slot for custom content |


## Shadow Parts

| Part          | Description                          |
| ------------- | ------------------------------------ |
| `"body"`      | Body section with value              |
| `"container"` | Main container element               |
| `"footer"`    | Footer section with trend/comparison |
| `"header"`    | Header section                       |


----------------------------------------------


