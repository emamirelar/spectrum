# spectrum-search-input



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute   | Description | Type     | Default |
| ---------- | ----------- | ----------- | -------- | ------- |
| `maxLines` | `max-lines` |             | `number` | `4`     |


## Events

| Event          | Description                                             | Type                  |
| -------------- | ------------------------------------------------------- | --------------------- |
| `searchInput`  | Emits when input value changes, for real-time filtering | `CustomEvent<string>` |
| `searchSubmit` |                                                         | `CustomEvent<string>` |


## Methods

### `setFocus() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [spectrum-rail](../spectrum-rail)

### Depends on

- [spectrum-button](../spectrum-button)

### Graph
```mermaid
graph TD;
  spectrum-search-input --> spectrum-button
  spectrum-rail --> spectrum-search-input
  style spectrum-search-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


