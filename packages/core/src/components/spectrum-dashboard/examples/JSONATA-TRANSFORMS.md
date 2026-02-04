# JSONata Data Transformations

The dashboard now uses **JSONata** - a powerful query and transformation language - for all data transformations. This replaces the previous "home brew" solution with an industry-standard approach.

## Why JSONata?

- **Industry Standard**: Used by IBM Node-RED, enterprise systems
- **Powerful**: Complex queries, aggregations, filtering, sorting
- **Declarative**: Configuration-driven transformations
- **Flexible**: Users write custom transformations without code changes
- **Well-Documented**: Extensive documentation at https://jsonata.org/

## Basic Usage

### Simple Field Mapping

Extract specific fields from data:

```json
{
  "dataSources": {
    "salesData": {
      "endpoint": "/api/sales",
      "transform": {
        "expression": "$.{ 'label': product, 'value': revenue }"
      }
    }
  }
}
```

### Extract from Nested Response

Many APIs return data nested in a response object:

```json
{
  "transform": {
    "path": "data.results"
  }
}
```

This extracts: `response.data.results` from:
```json
{
  "success": true,
  "data": {
    "results": [...]
  }
}
```

## Advanced JSONata Examples

### Filtering Data

```json
{
  "expression": "$[category='Electronics']"
}
```

### Grouping and Aggregation

Group by region and sum revenue:
```json
{
  "expression": "$ ~> | $ | { 'region': region }, { 'revenue': $sum(revenue) } |"
}
```

### Sorting

```json
{
  "expression": "$^(>revenue)"
}
```

### Complex Transformations

Convert to Chart.js format with filtering and sorting:
```json
{
  "expression": "{ 'labels': $[category='Electronics']^(>revenue).product, 'datasets': [{ 'label': 'Revenue', 'data': $[category='Electronics']^(>revenue).revenue }] }"
}
```

## Chart-Specific Transformations

For charts, use simple field mapping in the widget config:

```json
{
  "widgets": {
    "revenue-chart": {
      "component": "line-chart",
      "dataSourceId": "salesData",
      "uiConfig": {
        "labelField": "product",
        "valueField": "revenue",
        "datasetLabel": "Revenue ($)"
      }
    }
  }
}
```

The chart automatically transforms array data using these fields.

## Alternative: Simple Mapping

For basic field renaming without JSONata expressions:

```json
{
  "transform": {
    "mapping": {
      "label": "product",
      "value": "revenue"
    }
  }
}
```

## Data Source vs Widget Transforms

### Data Source Level
Applied once when data is fetched (cached):
```json
{
  "dataSources": {
    "salesData": {
      "endpoint": "/api/sales",
      "transform": {
        "path": "data",
        "expression": "$[inStock=true]"
      }
    }
  }
}
```

### Widget Level
Applied to data before rendering (chart-specific):
```json
{
  "widgets": {
    "chart": {
      "uiConfig": {
        "labelField": "product",
        "valueField": "revenue"
      }
    }
  }
}
```

## Common Patterns

### Pattern 1: API Returns Nested Data
```json
{
  "transform": {
    "path": "data.items"
  }
}
```

### Pattern 2: Filter and Extract Fields
```json
{
  "transform": {
    "expression": "$[status='active'].{ label: name, value: count }"
  }
}
```

### Pattern 3: Aggregate by Category
```json
{
  "transform": {
    "expression": "($ ~> $each(function($v, $k) { { 'category': $k, 'total': $sum($v.amount) } }) ~> $sift(function($v) { $v.category }))"
  }
}
```

### Pattern 4: Top N Results
```json
{
  "transform": {
    "expression": "$^(>revenue)[0..9]"
  }
}
```

## JSONata Operators Reference

| Operator | Description | Example |
|----------|-------------|---------|
| `$` | Current context | `$.name` |
| `[]` | Array filter | `$[price > 100]` |
| `.` | Object access | `data.results` |
| `^` | Sort | `$^(>price)` |
| `~>` | Chain | `$ ~> $filter(...) ~> $map(...)` |
| `$sum()` | Sum array | `$sum(prices)` |
| `$count()` | Count array | `$count(items)` |
| `$map()` | Transform array | `$map(items, function($v) { $v.name })` |
| `$filter()` | Filter array | `$filter(items, function($v) { $v.active })` |

## Complete Example

```json
{
  "dataSources": {
    "salesData": {
      "endpoint": "https://api.example.com/sales",
      "method": "GET",
      "refreshInterval": 60000,
      "transform": {
        "path": "data",
        "expression": "$[date >= '2024-01-01']^(>revenue)"
      }
    }
  },
  "widgets": {
    "top-products": {
      "component": "line-chart",
      "dataSourceId": "salesData",
      "uiConfig": {
        "title": "Top 10 Products by Revenue",
        "labelField": "product",
        "valueField": "revenue",
        "datasetLabel": "Revenue ($)"
      }
    }
  }
}
```

## Testing JSONata Expressions

Use the JSONata Exerciser at https://try.jsonata.org/ to test expressions before using them in the dashboard.

## Performance Considerations

1. **Simple transforms are faster**: Prefer simple field mapping over complex expressions
2. **Cache transformed data**: Transforms at data source level are cached
3. **Widget-level transforms**: Re-applied on every render (less efficient)
4. **Complex aggregations**: May impact performance on large datasets

## Error Handling

If a transform fails:
- Check the browser console for detailed error messages
- Verify the JSONata expression syntax at https://jsonata.org/
- Test with sample data at https://try.jsonata.org/
- Ensure the data structure matches your expression

## Migration from Simple Field Mapping

**Before (Home Brew):**
```json
{
  "labelField": "product",
  "valueField": "revenue"
}
```

**After (JSONata):**
```json
{
  "transform": {
    "expression": "$.{ 'label': product, 'value': revenue }"
  }
}
```

Or keep using field mapping (still supported):
```json
{
  "uiConfig": {
    "labelField": "product",
    "valueField": "revenue"
  }
}
```

## Resources

- **JSONata Documentation**: https://jsonata.org/
- **JSONata Exerciser**: https://try.jsonata.org/
- **Tutorial**: https://docs.jsonata.org/simple
- **Function Library**: https://docs.jsonata.org/functions



