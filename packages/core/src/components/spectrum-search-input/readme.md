# spectrum-search-input



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                                     | Type      | Default             |
| ------------------ | -------------------- | --------------------------------------------------------------- | --------- | ------------------- |
| `enableVoiceInput` | `enable-voice-input` | Whether to enable voice input capabilities (speech recognition) | `boolean` | `true`              |
| `maxLines`         | `max-lines`          |                                                                 | `number`  | `4`                 |
| `placeholder`      | `placeholder`        | Placeholder text for the search input                           | `string`  | `'Ask anything...'` |


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


