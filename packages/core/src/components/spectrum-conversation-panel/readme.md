# spectrum-conversation-panel



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute           | Description                                                      | Type      | Default               |
| ------------------- | ------------------- | ---------------------------------------------------------------- | --------- | --------------------- |
| `actions`           | `actions`           | The actions to display in the messages Default: null             | `string`  | `''`                  |
| `conversationtitle` | `conversationtitle` | The title to display in the conversation panel Default: null     | `string`  | `'No title provided'` |
| `debug`             | `debug`             | Whether to enable debug logging                                  | `boolean` | `false`               |
| `loading`           | `loading`           | Whether to show the loading indicator Default: false             | `boolean` | `false`               |
| `messages`          | `messages`          | The messsages to display in the conversation panel Default: null | `string`  | `''`                  |
| `sources`           | `sources`           | The sources to display in the messages Default: null             | `string`  | `''`                  |


## Events

| Event                 | Description | Type                                                                                 |
| --------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `action`              |             | `CustomEvent<{ action: string; type: string; value: string; messageId?: string; }>`  |
| `explorationSelected` |             | `CustomEvent<{ action: string; exploration: string; }>`                              |
| `explore`             |             | `CustomEvent<{ action: string; value: string; }>`                                    |
| `sourceClick`         |             | `CustomEvent<{ action: string; label: string; value: string; messageId?: string; }>` |
| `titleChanged`        |             | `CustomEvent<{ action: string; value: string; }>`                                    |


## Methods

### `scrollToLatest() => Promise<void>`

Scrolls the conversation panel to the latest message

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [spectrum-chip](../spectrum-chip)
- [spectrum-button](../spectrum-button)

### Graph
```mermaid
graph TD;
  spectrum-conversation-panel --> spectrum-chip
  spectrum-conversation-panel --> spectrum-button
  style spectrum-conversation-panel fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


