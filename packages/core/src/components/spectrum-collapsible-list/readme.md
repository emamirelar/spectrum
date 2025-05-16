# spectrum-collapsible-list



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                                                    | Type                    | Default |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------- | ------- |
| `contextActions`    | --                   | Context actions for all leaf nodes                                                                                             | `ContextMenuAction[]`   | `[]`    |
| `filter`            | `filter`             | Filter value to filter list items                                                                                              | `string`                | `''`    |
| `items`             | --                   | The nested data structure for the list                                                                                         | `CollapsibleListItem[]` | `[]`    |
| `mutuallyExclusive` | `mutually-exclusive` | Controls whether expanding one parent collapses other parents at the same level Default is true (mutually exclusive expansion) | `boolean`               | `true`  |


## Events

| Event             | Description                                    | Type                                              |
| ----------------- | ---------------------------------------------- | ------------------------------------------------- |
| `child-action`    | Event emitted when a child node is clicked     | `CustomEvent<{ action: string; label: string; }>` |
| `context-action`  | Event emitted when a context action is clicked | `CustomEvent<{ value: string; label: string; }>`  |
| `contract-action` | Event emitted when a parent node is contracted | `CustomEvent<{ label: string; }>`                 |
| `expand-action`   | Event emitted when a parent node is expanded   | `CustomEvent<{ label: string; }>`                 |


## Dependencies

### Depends on

- [spectrum-context-menu](../spectrum-context-menu)

### Graph
```mermaid
graph TD;
  spectrum-collapsible-list --> spectrum-context-menu
  style spectrum-collapsible-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


