# spectrum-data-table



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                        | Type                      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ----------- |
| `columns`     | `columns`      | Column definitions (can be JSON string or array)                                                                                                                   | `TableColumn[] \| string` | `[]`        |
| `config`      | `config`       | Table configuration (can be JSON string or object)                                                                                                                 | `TableConfig \| string`   | `{}`        |
| `context`     | `context`      | Dashboard context (optional)                                                                                                                                       | `{ [x: string]: any; }`   | `{}`        |
| `data`        | `data`         | Table data (array of objects or JSON string)                                                                                                                       | `any[] \| string`         | `[]`        |
| `debug`       | `debug`        | Debug mode                                                                                                                                                         | `boolean`                 | `false`     |
| `defaultSort` | `default-sort` | Default sort configuration (column key and direction) Can be JSON string: '{"column": "name", "direction": "asc"}' Or object: { column: 'name', direction: 'asc' } | `DefaultSort \| string`   | `undefined` |
| `loading`     | `loading`      | Loading state                                                                                                                                                      | `boolean`                 | `false`     |
| `maxHeight`   | `max-height`   | Maximum height of the table (enables vertical scrolling) Can be any valid CSS value: '400px', '50vh', 'calc(100vh - 200px)'                                        | `string`                  | `undefined` |
| `pageSize`    | `page-size`    | Number of rows per page                                                                                                                                            | `number`                  | `10`        |
| `pageable`    | `pageable`     | Whether table has pagination                                                                                                                                       | `boolean`                 | `true`      |
| `selectable`  | `selectable`   | Whether rows are selectable                                                                                                                                        | `boolean`                 | `false`     |
| `sortable`    | `sortable`     | Whether table is sortable                                                                                                                                          | `boolean`                 | `true`      |


## Events

| Event          | Description                    | Type                                                           |
| -------------- | ------------------------------ | -------------------------------------------------------------- |
| `pageChange`   | Emitted when page changes      | `CustomEvent<{ page: number; pageSize: number; }>`             |
| `rowClick`     | Emitted when row is clicked    | `CustomEvent<any>`                                             |
| `rowsSelected` | Emitted when rows are selected | `CustomEvent<any[]>`                                           |
| `sortChange`   | Emitted when sort changes      | `CustomEvent<{ column: string; direction: "desc" \| "asc"; }>` |


## Methods

### `refresh() => Promise<boolean>`

Public method to manually refresh/re-parse data

#### Returns

Type: `Promise<boolean>`




## Slots

| Slot        | Description                           |
| ----------- | ------------------------------------- |
| `"empty"`   | Content to show when table is empty   |
| `"loading"` | Content to show when table is loading |


----------------------------------------------


