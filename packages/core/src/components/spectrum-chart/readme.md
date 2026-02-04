# spectrum-chart



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                 | Type                                                                                        | Default                        |
| ------------ | ------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------ |
| `chartTitle` | `chart-title` | Chart title                                                                                                 | `string`                                                                                    | `undefined`                    |
| `config`     | `config`      | Chart configuration (simplified API or Chart.js config) Can be a JSON string or object                      | `SpectrumChartConfig \| string`                                                             | `{}`                           |
| `context`    | `context`     | Context from dashboard (optional)                                                                           | `{ [x: string]: any; }`                                                                     | `{}`                           |
| `data`       | `data`        | Chart data Can be a JSON string or object                                                                   | `SpectrumChartData \| any[] \| string`                                                      | `{ labels: [], datasets: [] }` |
| `debug`      | `debug`       | Whether to enable debug logging                                                                             | `boolean`                                                                                   | `false`                        |
| `height`     | `height`      | Chart height (CSS value)                                                                                    | `string`                                                                                    | `'400px'`                      |
| `loading`    | `loading`     | Loading state (for dashboard widget integration)                                                            | `boolean`                                                                                   | `false`                        |
| `type`       | `type`        | Chart type (line, bar, pie, doughnut, radar, polarArea, bubble, scatter) Overrides config.type if specified | `"bar" \| "bubble" \| "doughnut" \| "line" \| "pie" \| "polarArea" \| "radar" \| "scatter"` | `'line'`                       |
| `width`      | `width`       | Chart width (CSS value)                                                                                     | `string`                                                                                    | `undefined`                    |


## Events

| Event          | Description                                                         | Type                                  |
| -------------- | ------------------------------------------------------------------- | ------------------------------------- |
| `elementClick` | Event emitted when a chart element (bar, point, segment) is clicked | `CustomEvent<ChartElementClickEvent>` |
| `legendClick`  | Event emitted when a legend item is clicked                         | `CustomEvent<ChartLegendClickEvent>`  |


----------------------------------------------


