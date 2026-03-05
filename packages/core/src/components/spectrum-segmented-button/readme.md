# spectrum-segmented-button

A segmented button component that renders a group of buttons with shared border-radius for toggling between related options. Supports single and multi-select modes.

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                   | Type                      | Default     |
| --------------- | ---------------- | --------------------------------------------- | ------------------------- | ----------- |
| `ariaLabel`     | `aria-label`     | Accessible label for the group                | `string`                  | `undefined` |
| `disabled`      | `disabled`       | Disable entire segmented button               | `boolean`                 | `false`     |
| `items`         | `items`          | Segment items as array or JSON string         | `SegmentItem[] \| string` | `[]`        |
| `multiSelect`   | `multi-select`   | Allow multiple segment selection              | `boolean`                 | `false`     |
| `selectedIndex` | `selected-index` | Currently selected index (single-select mode) | `number`                  | `0`         |
| `size`          | `size`           | Size variant                                  | `"base" \| "lg" \| "sm"`  | `'base'`    |


## Events

| Event           | Description | Type                                                                                |
| --------------- | ----------- | ----------------------------------------------------------------------------------- |
| `segmentChange` |             | `CustomEvent<{ action: string; index: number; value: string; selected: boolean; }>` |


----------------------------------------------


