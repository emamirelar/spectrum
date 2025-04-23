# spectrum-chip



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                                  | Type                       | Default     |
| ------------------ | -------------------- | -------------------------------------------- | -------------------------- | ----------- |
| `disabled`         | `disabled`           | Whether the chip is disabled                 | `boolean`                  | `false`     |
| `label`            | `label`              | The label text of the chip                   | `string`                   | `''`        |
| `leadingIcon`      | `leading-icon`       | Optional leading icon                        | `string`                   | `''`        |
| `outline`          | `outline`            | Whether the chip is outlined                 | `boolean`                  | `false`     |
| `selected`         | `selected`           | Whether the chip is selected                 | `boolean`                  | `false`     |
| `showTrailingIcon` | `show-trailing-icon` | Whether to show the trailing icon            | `boolean`                  | `false`     |
| `trailingIcon`     | `trailing-icon`      | Optional trailing icon (usually for removal) | `string`                   | `'close'`   |
| `variant`          | `variant`            | The variant of the chip                      | `"primary" \| "secondary"` | `'primary'` |


## Events

| Event        | Description                                                 | Type                   |
| ------------ | ----------------------------------------------------------- | ---------------------- |
| `chipRemove` | Emitted when the chip is removed (clicked on trailing icon) | `CustomEvent<void>`    |
| `chipSelect` | Emitted when the chip is selected/deselected                | `CustomEvent<boolean>` |


----------------------------------------------


