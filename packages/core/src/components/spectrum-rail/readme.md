# spectrum-rail



<!-- Auto Generated Below -->


## Overview

Spectrum Rail Component
A vertical navigation rail with two states: expanded and contracted

## Properties

| Property          | Attribute          | Description                                                 | Type      | Default          |
| ----------------- | ------------------ | ----------------------------------------------------------- | --------- | ---------------- |
| `appName`         | `app-name`         | Application name to display in expanded menu                | `string`  | `''`             |
| `expandedWidth`   | `expanded-width`   | Expanded width for the rail (with units like px, rem, etc.) | `string`  | `'288px'`        |
| `initialExpanded` | `initial-expanded` | Whether the rail should be initially expanded               | `boolean` | `false`          |
| `moreLabel`       | `more-label`       | More section label (displayed in expanded state)            | `string`  | `'Explore more'` |


## Events

| Event            | Description                                | Type                                              |
| ---------------- | ------------------------------------------ | ------------------------------------------------- |
| `expandedChange` | Emits when the rail changes expanded state | `CustomEvent<boolean>`                            |
| `railAction`     | Emits when a rail action is triggered      | `CustomEvent<{ action: string; label: string; }>` |
| `searchChange`   | Emits when the search value changes        | `CustomEvent<{ value: string; }>`                 |


## Methods

### `setExpanded(expanded: boolean) => Promise<boolean>`

Method that can be called by parent components to programmatically 
control the expanded state

#### Parameters

| Name       | Type      | Description |
| ---------- | --------- | ----------- |
| `expanded` | `boolean` |             |

#### Returns

Type: `Promise<boolean>`




## Dependencies

### Depends on

- [spectrum-button](../spectrum-button)
- [spectrum-search-input](../spectrum-search-input)

### Graph
```mermaid
graph TD;
  spectrum-rail --> spectrum-button
  spectrum-rail --> spectrum-search-input
  spectrum-search-input --> spectrum-button
  style spectrum-rail fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


