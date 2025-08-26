# spectrum-button

## Size Options

The button component supports the following size options:

- `sm` - Small size button
- `medium` - Medium size button (recommended for new implementations)
- `base` - Legacy medium size button (maintained for backward compatibility)
- `lg` - Large size button

**Note:** Both `medium` and `base` render the same visual size. The `medium` option is the preferred way to specify medium-sized buttons going forward, while `base` is maintained for backward compatibility with existing implementations.

<!-- Auto Generated Below -->


## Overview

Spectrum Button Component
A versatile button component with multiple variants, sizes, and states.
Supports icons, text, and various interactive states.

## Properties

| Property           | Attribute           | Description | Type                                                                                              | Default     |
| ------------------ | ------------------- | ----------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `action`           | `action`            |             | `string`                                                                                          | `''`        |
| `buttonText`       | `button-text`       |             | `string`                                                                                          | `''`        |
| `customStyle`      | `custom-style`      |             | `{ [key: string]: string; }`                                                                      | `{}`        |
| `debug`            | `debug`             |             | `boolean`                                                                                         | `false`     |
| `disabled`         | `disabled`          |             | `boolean`                                                                                         | `false`     |
| `haptic`           | `haptic`            |             | `boolean`                                                                                         | `false`     |
| `href`             | `href`              |             | `string`                                                                                          | `undefined` |
| `iconOnly`         | `icon-only`         |             | `boolean`                                                                                         | `false`     |
| `leftIcon`         | `left-icon`         |             | `string`                                                                                          | `''`        |
| `minimalAnimation` | `minimal-animation` |             | `boolean`                                                                                         | `false`     |
| `outline`          | `outline`           |             | `boolean`                                                                                         | `false`     |
| `rel`              | `rel`               |             | `string`                                                                                          | `undefined` |
| `rightIcon`        | `right-icon`        |             | `string`                                                                                          | `''`        |
| `ripple`           | `ripple`            |             | `boolean`                                                                                         | `false`     |
| `showButtonText`   | `show-button-text`  |             | `boolean`                                                                                         | `true`      |
| `showLeftIcon`     | `show-left-icon`    |             | `boolean`                                                                                         | `false`     |
| `showRightIcon`    | `show-right-icon`   |             | `boolean`                                                                                         | `false`     |
| `size`             | `size`              |             | `"base" \| "lg" \| "medium" \| "sm"`                                                              | `'base'`    |
| `sound`            | `sound`             |             | `boolean`                                                                                         | `false`     |
| `state`            | `state`             |             | `"active" \| "default" \| "disabled" \| "hover"`                                                  | `'default'` |
| `target`           | `target`            |             | `string`                                                                                          | `undefined` |
| `variant`          | `variant`           |             | `"danger" \| "fab" \| "ghost" \| "outline" \| "primary" \| "secondary" \| "success" \| "warning"` | `'primary'` |


## Events

| Event          | Description | Type                                               |
| -------------- | ----------- | -------------------------------------------------- |
| `buttonAction` |             | `CustomEvent<{ action?: string; label: string; }>` |


## Dependencies

### Used by

 - [spectrum-conversation-panel](../spectrum-conversation-panel)
 - [spectrum-cookie-compliance](../spectrum-cookie-compliance)
 - [spectrum-dialog](../spectrum-dialog)
 - [spectrum-hero](../spectrum-hero)
 - [spectrum-image-gallery](../spectrum-image-gallery)
 - [spectrum-rail](../spectrum-rail)
 - [spectrum-rail-item](../spectrum-rail-item)
 - [spectrum-search-input](../spectrum-search-input)
 - [spectrum-search-results](../spectrum-search-results)
 - [spectrum-select](../spectrum-select)
 - [spectrum-toast](../spectrum-toast)

### Graph
```mermaid
graph TD;
  spectrum-conversation-panel --> spectrum-button
  spectrum-cookie-compliance --> spectrum-button
  spectrum-dialog --> spectrum-button
  spectrum-hero --> spectrum-button
  spectrum-image-gallery --> spectrum-button
  spectrum-rail --> spectrum-button
  spectrum-rail-item --> spectrum-button
  spectrum-search-input --> spectrum-button
  spectrum-search-results --> spectrum-button
  spectrum-select --> spectrum-button
  spectrum-toast --> spectrum-button
  style spectrum-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


