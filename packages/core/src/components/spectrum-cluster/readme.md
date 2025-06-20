# spectrum-cluster

## Purpose

The `spectrum-cluster` component is designed for clustering items together with consistent spacing, natural wrapping behavior, and flexible alignment options. It's perfect for layouts where you need to group related elements that should flow naturally and wrap responsively.

## Key Features

- **Natural Wrapping**: Items wrap automatically when space runs out
- **Consistent Spacing**: Uniform gaps between all items
- **Flexible Alignment**: Control both horizontal and vertical alignment
- **Direction Control**: Horizontal or vertical primary flow
- **Responsive Behavior**: Adapt layout based on screen size
- **Custom Spacing**: Support for both preset and custom spacing values

## When to Use

- **Tag Lists**: Displaying collections of tags, chips, or labels
- **Button Groups**: Arranging multiple related buttons
- **Card Collections**: Small card layouts that should wrap naturally
- **Icon Collections**: Groups of icons or small interactive elements
- **Badge/Chip Layouts**: Status indicators, categories, or filters
- **Responsive Toolbars**: Tool collections that adapt to container width

## Basic Usage

```html
<!-- Simple tag cluster -->
<spectrum-cluster spacing="sm" align="center">
  <spectrum-chip>React</spectrum-chip>
  <spectrum-chip>JavaScript</spectrum-chip>
  <spectrum-chip>TypeScript</spectrum-chip>
  <spectrum-chip>CSS</spectrum-chip>
</spectrum-cluster>

<!-- Button group -->
<spectrum-cluster spacing="md" justify="center">
  <spectrum-button variant="primary">Save</spectrum-button>
  <spectrum-button variant="secondary">Cancel</spectrum-button>
  <spectrum-button variant="tertiary">Reset</spectrum-button>
</spectrum-cluster>
```

## Layout Examples

### Responsive Tag Cloud
```html
<spectrum-cluster 
  responsive="true"
  breakpoint="md"
  stack-below="true"
  spacing="sm"
  justify="center">
  <span class="tag">Design</span>
  <span class="tag">Development</span>
  <span class="tag">Marketing</span>
  <span class="tag">Sales</span>
</spectrum-cluster>
```

### Icon Toolbar
```html
<spectrum-cluster 
  direction="horizontal"
  align="center"
  spacing="lg"
  no-wrap="true">
  <button class="icon-btn">📁</button>
  <button class="icon-btn">📊</button>
  <button class="icon-btn">⚙️</button>
  <button class="icon-btn">👤</button>
</spectrum-cluster>
```

### Centered Content Group
```html
<spectrum-cluster 
  full-width="true" 
  center-container="true"
  justify="space-between"
  align="center"
  spacing="xl">
  <div class="info-block">Block 1</div>
  <div class="info-block">Block 2</div>
  <div class="info-block">Block 3</div>
</spectrum-cluster>
```

## Properties

| Property          | Attribute          | Description | Type                                                                | Default        |
| ----------------- | ------------------ | ----------- | ------------------------------------------------------------------- | -------------- |
| `align`           | `align`            |             | `"center" \| "end" \| "start"`                                      | `'start'`      |
| `breakpoint`      | `breakpoint`       |             | `"lg" \| "md" \| "sm"`                                              | `'md'`         |
| `centerContainer` | `center-container` |             | `boolean`                                                           | `false`        |
| `debug`           | `debug`            |             | `boolean`                                                           | `false`        |
| `direction`       | `direction`        |             | `"horizontal" \| "vertical"`                                        | `'horizontal'` |
| `fullWidth`       | `full-width`       |             | `boolean`                                                           | `false`        |
| `justify`         | `justify`          |             | `"center" \| "end" \| "space-around" \| "space-between" \| "start"` | `'start'`      |
| `noWrap`          | `no-wrap`          |             | `boolean`                                                           | `false`        |
| `responsive`      | `responsive`       |             | `boolean`                                                           | `false`        |
| `spacing`         | `spacing`          |             | `string`                                                            | `'md'`         |
| `stackBelow`      | `stack-below`      |             | `boolean`                                                           | `false`        |
| `wrap`            | `wrap`             |             | `boolean`                                                           | `true`         |


----------------------------------------------


