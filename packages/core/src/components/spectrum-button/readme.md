# spectrum-button



<!-- Auto Generated Below -->


## Overview

Spectrum Button Component
A versatile button component with multiple variants, sizes, and states.
Supports icons, text, and various interactive states.

## Properties

| Property         | Attribute          | Description | Type                                                                                              | Default     |
| ---------------- | ------------------ | ----------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `action`         | `action`           |             | `string`                                                                                          | `''`        |
| `buttonText`     | `button-text`      |             | `string`                                                                                          | `''`        |
| `debug`          | `debug`            |             | `boolean`                                                                                         | `false`     |
| `disabled`       | `disabled`         |             | `boolean`                                                                                         | `false`     |
| `iconOnly`       | `icon-only`        |             | `boolean`                                                                                         | `false`     |
| `leftIcon`       | `left-icon`        |             | `string`                                                                                          | `''`        |
| `outline`        | `outline`          |             | `boolean`                                                                                         | `false`     |
| `rightIcon`      | `right-icon`       |             | `string`                                                                                          | `''`        |
| `ripple`         | `ripple`           |             | `boolean`                                                                                         | `false`     |
| `showButtonText` | `show-button-text` |             | `boolean`                                                                                         | `true`      |
| `showLeftIcon`   | `show-left-icon`   |             | `boolean`                                                                                         | `false`     |
| `showRightIcon`  | `show-right-icon`  |             | `boolean`                                                                                         | `false`     |
| `size`           | `size`             |             | `"base" \| "lg" \| "sm"`                                                                          | `'base'`    |
| `state`          | `state`            |             | `"active" \| "default" \| "disabled" \| "hover"`                                                  | `'default'` |
| `variant`        | `variant`          |             | `"danger" \| "fab" \| "ghost" \| "outline" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event          | Description | Type                                               |
| -------------- | ----------- | -------------------------------------------------- |
| `buttonAction` |             | `CustomEvent<{ action?: string; label: string; }>` |


## Dependencies

### Used by

 - [spectrum-conversation-panel](../spectrum-conversation-panel)
 - [spectrum-rail](../spectrum-rail)
 - [spectrum-rail-item](../spectrum-rail-item)
 - [spectrum-search-input](../spectrum-search-input)

### Graph
```mermaid
graph TD;
  spectrum-conversation-panel --> spectrum-button
  spectrum-rail --> spectrum-button
  spectrum-rail-item --> spectrum-button
  spectrum-search-input --> spectrum-button
  style spectrum-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


