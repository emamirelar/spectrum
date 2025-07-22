# spectrum-image-gallery



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute              | Description                                                                                                                                                                                                                                                               | Type                                                           | Default      |
| -------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------ |
| `allowDelete`        | `allow-delete`         |                                                                                                                                                                                                                                                                           | `boolean`                                                      | `true`       |
| `allowUpload`        | `allow-upload`         |                                                                                                                                                                                                                                                                           | `boolean`                                                      | `true`       |
| `allowUrlInput`      | `allow-url-input`      |                                                                                                                                                                                                                                                                           | `boolean`                                                      | `true`       |
| `background`         | `background`           |                                                                                                                                                                                                                                                                           | `"full-frost" \| "opaque" \| "partial-frost" \| "transparent"` | `'opaque'`   |
| `debug`              | `debug`                |                                                                                                                                                                                                                                                                           | `boolean`                                                      | `false`      |
| `frostControlBar`    | `frost-control-bar`    |                                                                                                                                                                                                                                                                           | `"full" \| "no" \| "partial"`                                  | `'no'`       |
| `galleryTitle`       | `gallery-title`        |                                                                                                                                                                                                                                                                           | `string`                                                       | `undefined`  |
| `images`             | `images`               |                                                                                                                                                                                                                                                                           | `ImageConfig[]`                                                | `[]`         |
| `previewMode`        | `preview-mode`         | Enable preview mode for image viewing.  When true: Hides control bar and selection UI for clean viewing experience. When false: Shows control bar, selection indicators, and management features. CRITICAL: Set to false when you need control bars and batch operations. | `boolean`                                                      | `false`      |
| `primaryActionIcon`  | `primary-action-icon`  |                                                                                                                                                                                                                                                                           | `string`                                                       | `''`         |
| `primaryActionText`  | `primary-action-text`  |                                                                                                                                                                                                                                                                           | `string`                                                       | `''`         |
| `primaryActionValue` | `primary-action-value` |                                                                                                                                                                                                                                                                           | `string`                                                       | `''`         |
| `scrollDirection`    | `scroll-direction`     |                                                                                                                                                                                                                                                                           | `"horizontal" \| "vertical"`                                   | `'vertical'` |
| `selectedImages`     | `selected-images`      |                                                                                                                                                                                                                                                                           | `string[]`                                                     | `[]`         |
| `selectionMode`      | `selection-mode`       |                                                                                                                                                                                                                                                                           | `"multi" \| "none" \| "single"`                                | `'single'`   |


## Events

| Event           | Description | Type                                                                                                    |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| `imageAdded`    |             | `CustomEvent<ImageAddedEvent>`                                                                          |
| `imageDeleted`  |             | `CustomEvent<ImageDeletedEvent>`                                                                        |
| `imageDeselect` |             | `CustomEvent<ImageConfig>`                                                                              |
| `imagePreview`  |             | `CustomEvent<ImageConfig>`                                                                              |
| `imageSelected` |             | `CustomEvent<ImageConfig>`                                                                              |
| `primaryAction` |             | `CustomEvent<{ action: string; selectedImages: ImageConfig[]; selectedIds: string[]; count: number; }>` |


## Dependencies

### Depends on

- [spectrum-badge](../spectrum-badge)
- [spectrum-button](../spectrum-button)
- [spectrum-panel](../spectrum-panel)

### Graph
```mermaid
graph TD;
  spectrum-image-gallery --> spectrum-badge
  spectrum-image-gallery --> spectrum-button
  spectrum-image-gallery --> spectrum-panel
  style spectrum-image-gallery fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


