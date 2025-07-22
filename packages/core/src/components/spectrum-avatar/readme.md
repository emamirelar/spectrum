# spectrum-avatar



<!-- Auto Generated Below -->


## Overview

Spectrum Avatar Component
A versatile avatar component for displaying user profile images, initials, or icons.
Supports multiple sizes, shapes, status indicators, and interactive states.

## Properties

| Property      | Attribute      | Description | Type                                                  | Default     |
| ------------- | -------------- | ----------- | ----------------------------------------------------- | ----------- |
| `action`      | `action`       |             | `string`                                              | `''`        |
| `alt`         | `alt`          |             | `string`                                              | `''`        |
| `avatarId`    | `avatar-id`    |             | `string`                                              | `''`        |
| `clickable`   | `clickable`    |             | `boolean`                                             | `false`     |
| `customStyle` | `custom-style` |             | `{ [key: string]: string; }`                          | `{}`        |
| `debug`       | `debug`        |             | `boolean`                                             | `false`     |
| `disabled`    | `disabled`     |             | `boolean`                                             | `false`     |
| `icon`        | `icon`         |             | `string`                                              | `''`        |
| `initials`    | `initials`     |             | `string`                                              | `''`        |
| `label`       | `label`        |             | `string`                                              | `''`        |
| `shape`       | `shape`        |             | `"circle" \| "rounded" \| "square"`                   | `'circle'`  |
| `showStatus`  | `show-status`  |             | `boolean`                                             | `false`     |
| `size`        | `size`         |             | `"base" \| "lg" \| "sm" \| "xl" \| "xs"`              | `'base'`    |
| `src`         | `src`          |             | `string`                                              | `''`        |
| `status`      | `status`       |             | `"away" \| "busy" \| "none" \| "offline" \| "online"` | `'none'`    |
| `variant`     | `variant`      |             | `"default" \| "filled" \| "outlined"`                 | `'default'` |


## Events

| Event          | Description | Type                                                             |
| -------------- | ----------- | ---------------------------------------------------------------- |
| `avatarAction` |             | `CustomEvent<{ action?: string; label?: string; id?: string; }>` |


----------------------------------------------


