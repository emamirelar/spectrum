# spectrum-card



<!-- Auto Generated Below -->


## Overview

Spectrum Card Component
A versatile card component for displaying content with optional header, footer, and actions.
Supports media, interactive states, and follows Material Design 3 patterns.

## Properties

| Property            | Attribute             | Description                                           | Type                                                           | Default      |
| ------------------- | --------------------- | ----------------------------------------------------- | -------------------------------------------------------------- | ------------ |
| `action`            | `action`              | Action identifier for events                          | `string`                                                       | `''`         |
| `background`        | `background`          | Background level for the card                         | `"full-frost" \| "opaque" \| "partial-frost" \| "transparent"` | `'opaque'`   |
| `cardSubtitle`      | `card-subtitle`       | Card subtitle                                         | `string`                                                       | `undefined`  |
| `cardTitle`         | `card-title`          | Card title                                            | `string`                                                       | `undefined`  |
| `clickable`         | `clickable`           | Whether the card is clickable                         | `boolean`                                                      | `false`      |
| `debug`             | `debug`               | Whether to enable debug logging                       | `boolean`                                                      | `false`      |
| `disabled`          | `disabled`            | Whether the card is disabled                          | `boolean`                                                      | `false`      |
| `height`            | `height`              | Custom height for the card                            | `string`                                                       | `undefined`  |
| `href`              | `href`                | URL for navigation when card is used as a link        | `string`                                                       | `undefined`  |
| `imageAlt`          | `image-alt`           | Alt text for card image                               | `string`                                                       | `undefined`  |
| `imageUrl`          | `image-url`           | Image URL for card media                              | `string`                                                       | `undefined`  |
| `noPadding`         | `no-padding`          | Whether to remove default padding                     | `boolean`                                                      | `false`      |
| `rel`               | `rel`                 | Rel attribute for security when using target="_blank" | `string`                                                       | `undefined`  |
| `showFooterActions` | `show-footer-actions` | Whether to show footer actions slot                   | `boolean`                                                      | `false`      |
| `showHeaderActions` | `show-header-actions` | Whether to show header actions slot                   | `boolean`                                                      | `false`      |
| `size`              | `size`                | Size of the card                                      | `"auto" \| "large" \| "medium" \| "small"`                     | `'medium'`   |
| `target`            | `target`              | Target for navigation (e.g., '_blank' for new tab)    | `string`                                                       | `undefined`  |
| `textOverflow`      | `text-overflow`       | Text overflow behavior for title and subtitle         | `"ellipsis" \| "wrap"`                                         | `'ellipsis'` |
| `variant`           | `variant`             | Card variant/style                                    | `"default" \| "elevated" \| "filled" \| "outlined"`            | `'default'`  |
| `width`             | `width`               | Custom width for the card                             | `string`                                                       | `undefined`  |


## Events

| Event        | Description                        | Type                                                                |
| ------------ | ---------------------------------- | ------------------------------------------------------------------- |
| `cardAction` | Event emitted when card is clicked | `CustomEvent<{ action: string; cardId?: string; title?: string; }>` |


----------------------------------------------


