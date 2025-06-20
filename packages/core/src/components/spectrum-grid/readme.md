# spectrum-grid

## Purpose

The `spectrum-grid` component provides comprehensive CSS Grid layout capabilities with support for grid templates, areas, responsive behavior, and auto-sizing. It's designed for complex two-dimensional layouts that require precise control over both rows and columns.

## Key Features

- **Complete CSS Grid Control**: Full access to grid template properties
- **Grid Areas**: Named grid areas for semantic layout definitions
- **Auto-Sizing**: Auto-fit and auto-fill with minimum sizes
- **Responsive Grids**: Different grid configurations for different screen sizes
- **Custom Gap Control**: Independent row and column gap control
- **Alignment Control**: Precise alignment for both items and content
- **Template Flexibility**: Support for custom grid templates and areas

## When to Use

- **Complex Layouts**: Multi-dimensional layouts with precise positioning
- **Card Grids**: Responsive card layouts with consistent sizing
- **Dashboard Layouts**: Widget arrangements with specific grid positioning
- **Magazine Layouts**: Complex article layouts with varying content sizes
- **Photo Galleries**: Image grids with aspect ratio control
- **Form Grids**: Complex form layouts with aligned fields
- **Any CSS Grid Layout**: When you need more control than flexbox provides

## Basic Usage

```html
<!-- Simple 3-column grid -->
<spectrum-grid columns="1fr 1fr 1fr" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</spectrum-grid>

<!-- Auto-fit responsive grid -->
<spectrum-grid 
  auto-fit="true" 
  min-column-width="250px" 
  gap="lg">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</spectrum-grid>
```

## Grid Template Examples

### Responsive Card Grid
```html
<spectrum-grid 
  auto-fit="true"
  min-column-width="300px"
  gap="xl"
  align-items="stretch">
  <div class="product-card">Product 1</div>
  <div class="product-card">Product 2</div>
  <div class="product-card">Product 3</div>
  <div class="product-card">Product 4</div>
</spectrum-grid>
```

### Dashboard Layout with Areas
```html
<spectrum-grid 
  columns="200px 1fr 200px"
  rows="60px 1fr 40px"
  areas="'sidebar header actions'
         'sidebar main aside'
         'sidebar footer aside'"
  gap="md"
  full-height="true">
  
  <nav style="grid-area: sidebar;">Sidebar Navigation</nav>
  <header style="grid-area: header;">Page Header</header>
  <div style="grid-area: actions;">Action Buttons</div>
  <main style="grid-area: main;">Main Content</main>
  <aside style="grid-area: aside;">Secondary Content</aside>
  <footer style="grid-area: footer;">Footer</footer>
</spectrum-grid>
```

### Photo Gallery Grid
```html
<spectrum-grid 
  auto-fill="true"
  min-column-width="200px"
  auto-rows="200px"
  gap="sm"
  align-items="center"
  justify-items="center">
  <img src="/photo1.jpg" alt="Photo 1" />
  <img src="/photo2.jpg" alt="Photo 2" />
  <img src="/photo3.jpg" alt="Photo 3" />
  <img src="/photo4.jpg" alt="Photo 4" />
</spectrum-grid>
```

### Complex Form Layout
```html
<spectrum-grid 
  columns="1fr 1fr"
  rows="auto auto auto auto"
  column-gap="lg"
  row-gap="md">
  
  <!-- Form title spans both columns -->
  <h2 style="grid-column: 1 / -1;">Contact Information</h2>
  
  <!-- Two-column form fields -->
  <div class="field">
    <label>First Name</label>
    <input type="text" />
  </div>
  
  <div class="field">
    <label>Last Name</label>
    <input type="text" />
  </div>
  
  <!-- Full-width field -->
  <div class="field" style="grid-column: 1 / -1;">
    <label>Email Address</label>
    <input type="email" />
  </div>
  
  <!-- Action buttons -->
  <div style="grid-column: 1 / -1; justify-self: end;">
    <spectrum-button variant="secondary">Cancel</spectrum-button>
    <spectrum-button variant="primary">Submit</spectrum-button>
  </div>
</spectrum-grid>
```

### Magazine Layout
```html
<spectrum-grid 
  columns="1fr 1fr 1fr 1fr"
  rows="200px 150px 100px"
  areas="'featured featured sidebar sidebar'
         'article1 article2 sidebar sidebar'
         'article3 article3 ads ads'"
  gap="lg">
  
  <article style="grid-area: featured;" class="featured-article">
    <h1>Featured Story</h1>
    <p>Main featured content...</p>
  </article>
  
  <aside style="grid-area: sidebar;" class="sidebar">
    <h3>Related Articles</h3>
    <!-- Sidebar content -->
  </aside>
  
  <article style="grid-area: article1;" class="article">
    <h2>Article 1</h2>
    <p>Article content...</p>
  </article>
  
  <article style="grid-area: article2;" class="article">
    <h2>Article 2</h2>
    <p>Article content...</p>
  </article>
  
  <article style="grid-area: article3;" class="article">
    <h2>Article 3</h2>
    <p>Article content...</p>
  </article>
  
  <div style="grid-area: ads;" class="advertisements">
    <p>Advertisement Space</p>
  </div>
</spectrum-grid>
```

## Advanced Usage

### Responsive Grid Behavior
```html
<spectrum-grid 
  columns="repeat(auto-fit, minmax(250px, 1fr))"
  mobile-columns="1fr"
  responsive="true"
  breakpoint="md"
  gap="lg">
  <!-- Responsive items -->
</spectrum-grid>
```

### Custom Grid Templates
```html
<spectrum-grid 
  columns="minmax(200px, 1fr) 3fr minmax(150px, 1fr)"
  rows="auto 1fr auto"
  min-row-height="100px"
  gap="xl">
  <!-- Complex grid items -->
</spectrum-grid>
```

## Properties

| Property         | Attribute          | Description | Type                                                                                               | Default     |
| ---------------- | ------------------ | ----------- | -------------------------------------------------------------------------------------------------- | ----------- |
| `alignContent`   | `align-content`    |             | `"center" \| "end" \| "space-around" \| "space-between" \| "space-evenly" \| "start" \| "stretch"` | `'stretch'` |
| `alignItems`     | `align-items`      |             | `"center" \| "end" \| "start" \| "stretch"`                                                        | `'stretch'` |
| `areas`          | `areas`            |             | `string`                                                                                           | `''`        |
| `autoColumns`    | `auto-columns`     |             | `string`                                                                                           | `''`        |
| `autoFill`       | `auto-fill`        |             | `boolean`                                                                                          | `false`     |
| `autoFit`        | `auto-fit`         |             | `boolean`                                                                                          | `false`     |
| `autoRows`       | `auto-rows`        |             | `string`                                                                                           | `''`        |
| `breakpoint`     | `breakpoint`       |             | `"lg" \| "md" \| "sm"`                                                                             | `'md'`      |
| `columnGap`      | `column-gap`       |             | `string`                                                                                           | `''`        |
| `columns`        | `columns`          |             | `string`                                                                                           | `'1fr'`     |
| `debug`          | `debug`            |             | `boolean`                                                                                          | `false`     |
| `fullHeight`     | `full-height`      |             | `boolean`                                                                                          | `false`     |
| `fullWidth`      | `full-width`       |             | `boolean`                                                                                          | `false`     |
| `gap`            | `gap`              |             | `string`                                                                                           | `'md'`      |
| `inline`         | `inline`           |             | `boolean`                                                                                          | `false`     |
| `justifyContent` | `justify-content`  |             | `"center" \| "end" \| "space-around" \| "space-between" \| "space-evenly" \| "start" \| "stretch"` | `'stretch'` |
| `justifyItems`   | `justify-items`    |             | `"center" \| "end" \| "start" \| "stretch"`                                                        | `'stretch'` |
| `minColumnWidth` | `min-column-width` |             | `string`                                                                                           | `''`        |
| `minRowHeight`   | `min-row-height`   |             | `string`                                                                                           | `''`        |
| `mobileColumns`  | `mobile-columns`   |             | `string`                                                                                           | `'1fr'`     |
| `responsive`     | `responsive`       |             | `boolean`                                                                                          | `false`     |
| `rowGap`         | `row-gap`          |             | `string`                                                                                           | `''`        |
| `rows`           | `rows`             |             | `string`                                                                                           | `''`        |


----------------------------------------------


