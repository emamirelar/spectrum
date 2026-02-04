# Spectrum Dashboard Examples & Documentation Index

## 📖 Core Documentation

### [Implementation Guide](../IMPLEMENTATION-GUIDE.md)
**Your main resource for building dashboards.**

Comprehensive guide covering:
- Configuration reference
- Layout system deep-dive
- Data source management
- Widget configuration
- Filtering strategies
- Drill-down patterns
- Best practices
- Common patterns
- Troubleshooting

**Start here if you're new to the dashboard system.**

---

### [Quick Reference](../QUICK-REFERENCE.md)
**Fast lookup for common patterns.**

Quick snippets for:
- Configuration structure
- Layout templates
- Data sources
- Widget definitions
- Drill-down actions
- Filter types
- Minimal examples

**Use this when you need a quick reminder of syntax.**

---

### [Technical Specification](../spec.md)
**Deep technical documentation.**

Covers:
- Architecture overview
- Component structure
- State management
- Data flow
- Event system
- Type definitions
- Performance considerations

**For advanced users and contributors.**

---

## 📦 Working Examples

### [Complete Dashboard](./complete-dashboard-config.json)
**Full-featured production dashboard.**

Includes:
- External data source
- Multiple widget types
- Filter panel
- Charts (line, pie)
- Data table
- Responsive layout

[Documentation](./complete-dashboard-README.md)

---

### [Drill-Down Dashboard](./drill-down-complete-config.json)
**Demonstrates all four drill-down patterns.**

Includes:
- Cross-filter drill-down
- Hierarchical navigation
- Detail panel
- Dashboard navigation

See the drill-down section in the [Implementation Guide](../IMPLEMENTATION-GUIDE.md#drill-down-patterns)

---

### [Score Card Dashboard](./score-card-dashboard.json)
**KPI-focused dashboard.**

Includes:
- Multiple score cards
- Trend indicators
- Progress tracking
- Drill-down integration

---

## 🔧 Advanced Features

### [JSONata Transforms](./JSONATA-TRANSFORMS.md)
**Data transformation guide.**

Learn how to:
- Transform API responses
- Aggregate data
- Filter and sort
- Map field names
- Complex queries

---

### [Drill-Down Usage Guide](./README.md)
**Drill-down system documentation.**

Covers:
- Pattern descriptions
- Configuration examples
- Context mapping
- Host application integration
- Best practices

---

## 🎯 Quick Navigation by Use Case

### "I want to build a basic dashboard"
1. Start with [Quick Reference](../QUICK-REFERENCE.md) - Minimal Example
2. Review [Complete Dashboard Example](./complete-dashboard-config.json)
3. Refer to [Implementation Guide](../IMPLEMENTATION-GUIDE.md) - Quick Start

### "I need to add filtering"
1. [Implementation Guide](../IMPLEMENTATION-GUIDE.md#filtering-system)
2. [Complete Dashboard Example](./complete-dashboard-config.json) - Filter configuration
3. [Quick Reference](../QUICK-REFERENCE.md) - Filter types

### "I want interactive drill-down"
1. [Implementation Guide](../IMPLEMENTATION-GUIDE.md#drill-down-patterns)
2. [Drill-Down Complete Config](./drill-down-complete-config.json)
3. [Drill-Down Usage Guide](./README.md)

### "I need to transform API data"
1. [JSONata Transforms Guide](./JSONATA-TRANSFORMS.md)
2. [Implementation Guide](../IMPLEMENTATION-GUIDE.md#data-transformation)
3. [Complete Dashboard Example](./complete-dashboard-config.json) - Transform examples

### "I want to customize the layout"
1. [Implementation Guide](../IMPLEMENTATION-GUIDE.md#layout-system)
2. [Quick Reference](../QUICK-REFERENCE.md) - Common layouts
3. [Complete Dashboard Example](./complete-dashboard-config.json) - Real layout

### "Something's not working"
1. [Implementation Guide](../IMPLEMENTATION-GUIDE.md#troubleshooting)
2. Enable debug mode: `dashboard.debug = true`
3. Check browser console for errors

---

## 🚀 Storybook Examples

Live, interactive examples are available in Storybook:

```bash
npm run storybook
```

Navigate to: **Spectrum > Components > SpectrumDashboard**

Available stories:
- **Complete Dashboard** - Full-featured example
- **Drill-Down Cross-Filter** - Chart → Table filtering
- **Drill-Down Hierarchical Nav** - Breadcrumb navigation
- **Drill-Down Detail Panel** - Modal details
- **Drill-Down Dashboard Nav** - Full dashboard transitions

---

## 📝 Configuration Templates

### Minimal Dashboard
```json
{
  "id": "minimal",
  "dataSources": {
    "data": { "endpoint": "/api/data" }
  },
  "layout": {
    "template": ["widget"],
    "columns": "1fr"
  },
  "widgets": {
    "widget": {
      "component": "line-chart",
      "dataSourceId": "data",
      "uiConfig": {
        "chartType": "line",
        "labelField": "x",
        "valueField": "y"
      }
    }
  }
}
```

### Filtered Dashboard
```json
{
  "id": "filtered",
  "dataSources": {
    "data": { "endpoint": "/api/data" }
  },
  "layout": {
    "template": ["filters", "chart"],
    "columns": "1fr",
    "rows": "auto 1fr"
  },
  "widgets": {
    "filters": {
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
    },
    "chart": {
      "component": "line-chart",
      "dataSourceId": "data",
      "uiConfig": { ... }
    }
  }
}
```

### KPI Dashboard
```json
{
  "id": "kpi-dashboard",
  "dataSources": {
    "kpis": { "endpoint": "/api/kpis" }
  },
  "layout": {
    "template": [
      "kpi1 kpi2 kpi3 kpi4",
      "chart chart chart chart"
    ],
    "columns": "repeat(4, 1fr)",
    "rows": "auto 300px"
  },
  "widgets": {
    "kpi1": {
      "component": "score-card",
      "dataSourceId": "kpis",
      "uiConfig": {
        "value": 125000,
        "label": "Revenue",
        "format": "currency"
      }
    },
    // ... kpi2, kpi3, kpi4
    "chart": {
      "component": "line-chart",
      "dataSourceId": "kpis",
      "uiConfig": { ... }
    }
  }
}
```

---

## 🆘 Getting Help

1. **Check Documentation**: Most questions are answered in the [Implementation Guide](../IMPLEMENTATION-GUIDE.md)
2. **Review Examples**: See working examples in this directory
3. **Enable Debug Mode**: `dashboard.debug = true` for detailed logging
4. **Check Storybook**: Interactive examples with live editing
5. **Troubleshooting Guide**: [Implementation Guide - Troubleshooting](../IMPLEMENTATION-GUIDE.md#troubleshooting)

---

**Version**: 0.0.1-alpha  
**Last Updated**: January 2026



