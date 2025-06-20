# spectrum-flex

## Purpose

The `spectrum-flex` component provides advanced flexbox layout capabilities with comprehensive control over flex properties, responsive behavior, and fine-grained alignment options. It's designed for complex layouts that require precise control over how items are arranged and distributed.

## Key Features

- **Complete Flexbox Control**: All flexbox properties (direction, wrap, justify, align)
- **Responsive Behavior**: Different layouts for different screen sizes
- **Custom Gap Control**: Both uniform and separate row/column gaps
- **Alignment Options**: Precise control over main and cross axis alignment
- **Container Sizing**: Full width, full height, and inline options
- **Mobile Optimization**: Special mobile direction handling

## When to Use

- **Complex Layouts**: Multi-column layouts with precise alignment needs
- **Navigation Bars**: Headers, toolbars, and navigation components
- **Card Layouts**: Flexible card arrangements with equal spacing
- **Form Layouts**: Complex form arrangements with aligned inputs
- **Dashboard Widgets**: Responsive widget arrangements
- **Media Objects**: Content with images and text that need alignment
- **Any Flexbox Layout**: When you need more control than basic stack/cluster

## Basic Usage

```html
<!-- Horizontal layout with center alignment -->
<spectrum-flex direction="row" justify="center" align="center" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</spectrum-flex>

<!-- Vertical stack with space between -->
<spectrum-flex direction="column" justify="space-between" gap="lg">
  <header>Header Content</header>
  <main>Main Content</main>
  <footer>Footer Content</footer>
</spectrum-flex>
```

## Layout Examples

### Navigation Header
```html
<spectrum-flex 
  direction="row" 
  justify="space-between" 
  align="center"
  full-width="true"
  gap="md">
  <!-- Logo -->
  <div class="logo">
    <img src="/logo.svg" alt="Logo" />
  </div>
  
  <!-- Navigation -->
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  
  <!-- Actions -->
  <div class="actions">
    <spectrum-button variant="primary">Sign In</spectrum-button>
  </div>
</spectrum-flex>
```

### Responsive Card Grid
```html
<spectrum-flex 
  wrap="wrap"
  justify="space-between"
  align="stretch"
  gap="xl"
  responsive="true"
  mobile-direction="column">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</spectrum-flex>
```

### Form Layout
```html
<spectrum-flex direction="column" gap="lg" full-width="true">
  <!-- Form header -->
  <spectrum-flex direction="row" justify="space-between" align="center">
    <h2>Contact Form</h2>
    <span class="required">* Required</span>
  </spectrum-flex>
  
  <!-- Form fields -->
  <spectrum-flex direction="row" gap="md" wrap="wrap">
    <div class="field">
      <label>First Name *</label>
      <input type="text" required />
    </div>
    <div class="field">
      <label>Last Name *</label>
      <input type="text" required />
    </div>
  </spectrum-flex>
  
  <!-- Form actions -->
  <spectrum-flex direction="row" justify="flex-end" gap="sm">
    <spectrum-button variant="secondary">Cancel</spectrum-button>
    <spectrum-button variant="primary">Submit</spectrum-button>
  </spectrum-flex>
</spectrum-flex>
```

### Media Object Pattern
```html
<spectrum-flex direction="row" align="flex-start" gap="md">
  <!-- Image/Avatar -->
  <div class="media-object">
    <img src="/avatar.jpg" alt="User" class="avatar" />
  </div>
  
  <!-- Content -->
  <spectrum-flex direction="column" gap="sm" style="flex: 1;">
    <h3>John Doe</h3>
    <p>This is a media object pattern with flexible content area...</p>
    <div class="meta">2 hours ago</div>
  </spectrum-flex>
</spectrum-flex>
```

### Dashboard Layout
```html
<spectrum-flex 
  direction="column" 
  full-height="true" 
  gap="lg">
  <!-- Dashboard header -->
  <spectrum-flex 
    direction="row" 
    justify="space-between" 
    align="center"
    wrap="wrap"
    gap="md">
    <h1>Dashboard</h1>
    <div class="dashboard-actions">
      <spectrum-button variant="secondary">Export</spectrum-button>
      <spectrum-button variant="primary">New Report</spectrum-button>
    </div>
  </spectrum-flex>
  
  <!-- Dashboard content -->
  <spectrum-flex 
    wrap="wrap"
    gap="xl"
    align="stretch"
    style="flex: 1;">
    <div class="widget">Widget 1</div>
    <div class="widget">Widget 2</div>
    <div class="widget">Widget 3</div>
    <div class="widget">Widget 4</div>
  </spectrum-flex>
</spectrum-flex>
```

## Advanced Usage

### Custom Gap Control
```html
<!-- Different row and column gaps -->
<spectrum-flex 
  wrap="wrap"
  row-gap="xl"
  column-gap="sm">
  <!-- Items with custom spacing -->
</spectrum-flex>

<!-- Custom gap values -->
<spectrum-flex 
  direction="row"
  gap="2rem"
  align="center">
  <!-- Items with 2rem spacing -->
</spectrum-flex>
```

## Properties

| Property          | Attribute          | Description | Type                                                                                            | Default        |
| ----------------- | ------------------ | ----------- | ----------------------------------------------------------------------------------------------- | -------------- |
| `align`           | `align`            |             | `"baseline" \| "center" \| "flex-end" \| "flex-start" \| "stretch"`                             | `'stretch'`    |
| `alignContent`    | `align-content`    |             | `"center" \| "flex-end" \| "flex-start" \| "space-around" \| "space-between" \| "stretch"`      | `'stretch'`    |
| `breakpoint`      | `breakpoint`       |             | `"lg" \| "md" \| "sm"`                                                                          | `'md'`         |
| `columnGap`       | `column-gap`       |             | `string`                                                                                        | `''`           |
| `debug`           | `debug`            |             | `boolean`                                                                                       | `false`        |
| `direction`       | `direction`        |             | `"column" \| "column-reverse" \| "row" \| "row-reverse"`                                        | `'row'`        |
| `fullHeight`      | `full-height`      |             | `boolean`                                                                                       | `false`        |
| `fullWidth`       | `full-width`       |             | `boolean`                                                                                       | `false`        |
| `gap`             | `gap`              |             | `string`                                                                                        | `'md'`         |
| `inline`          | `inline`           |             | `boolean`                                                                                       | `false`        |
| `justify`         | `justify`          |             | `"center" \| "flex-end" \| "flex-start" \| "space-around" \| "space-between" \| "space-evenly"` | `'flex-start'` |
| `mobileDirection` | `mobile-direction` |             | `"column" \| "row"`                                                                             | `'column'`     |
| `responsive`      | `responsive`       |             | `boolean`                                                                                       | `false`        |
| `rowGap`          | `row-gap`          |             | `string`                                                                                        | `''`           |
| `wrap`            | `wrap`             |             | `"nowrap" \| "wrap" \| "wrap-reverse"`                                                          | `'nowrap'`     |


----------------------------------------------


