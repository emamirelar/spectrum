# spectrum-sidebar

## Purpose

The `spectrum-sidebar` component creates sidebar + main content layouts with responsive behavior and flexible positioning. It's designed for applications that need a secondary navigation area or tool panel alongside the main content.

## Key Features

- **Flexible Positioning**: Left or right sidebar placement
- **Responsive Behavior**: Automatic stacking and collapsing on mobile
- **Variable Sizing**: Multiple width presets and custom width support
- **Collapsible Sidebar**: Optional collapse functionality
- **Overlay Mode**: Sidebar can overlay content instead of pushing it
- **Full Height Support**: Extends to full viewport height when needed

## When to Use

- **Application Navigation**: Secondary navigation alongside main content
- **Tool Panels**: Design tools, filters, or configuration panels
- **Content + Metadata**: Main article with related information sidebar
- **Dashboard Layouts**: Main dashboard with secondary information panel
- **Documentation Sites**: Table of contents alongside article content
- **E-commerce**: Product filters alongside product listings

## Basic Usage

```html
<!-- Basic left sidebar layout -->
<spectrum-sidebar>
  <!-- Sidebar content -->
  <nav slot="sidebar">
    <h3>Navigation</h3>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  
  <!-- Main content -->
  <main>
    <h1>Main Content</h1>
    <p>Your primary content goes here.</p>
  </main>
</spectrum-sidebar>

<!-- Right sidebar layout -->
<spectrum-sidebar position="right" sidebar-width="lg">
  <!-- Sidebar content -->
  <aside slot="sidebar">
    <h3>Related Links</h3>
    <ul>
      <li><a href="#link1">Related Article 1</a></li>
      <li><a href="#link2">Related Article 2</a></li>
    </ul>
  </aside>
  
  <!-- Main content -->
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</spectrum-sidebar>
```

## Layout Examples

### Application Navigation
```html
<spectrum-sidebar 
  sidebar-width="md"
  gap="lg"
  responsive="true"
  collapse-below="true">
  
  <!-- Navigation sidebar -->
  <nav slot="sidebar" class="app-nav">
    <div class="nav-section">
      <h3>Dashboard</h3>
      <a href="#overview" class="nav-item active">
        <span class="icon">📊</span>
        Overview
      </a>
      <a href="#analytics" class="nav-item">
        <span class="icon">📈</span>
        Analytics
      </a>
    </div>
    
    <div class="nav-section">
      <h3>Content</h3>
      <a href="#posts" class="nav-item">
        <span class="icon">📝</span>
        Posts
      </a>
      <a href="#pages" class="nav-item">
        <span class="icon">📄</span>
        Pages
      </a>
    </div>
  </nav>
  
  <!-- Main application content -->
  <main class="app-main">
    <header>
      <h1>Dashboard Overview</h1>
      <p>Welcome to your dashboard</p>
    </header>
    
    <div class="dashboard-content">
      <!-- Dashboard widgets and content -->
    </div>
  </main>
</spectrum-sidebar>
```

### Documentation Layout
```html
<spectrum-sidebar 
  position="left"
  sidebar-width="sm"
  full-height="true"
  responsive="true"
  stack-mobile="true">
  
  <!-- Table of contents -->
  <nav slot="sidebar" class="toc">
    <h3>Table of Contents</h3>
    <ul>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#getting-started">Getting Started</a></li>
      <li>
        <a href="#components">Components</a>
        <ul>
          <li><a href="#buttons">Buttons</a></li>
          <li><a href="#forms">Forms</a></li>
        </ul>
      </li>
      <li><a href="#examples">Examples</a></li>
    </ul>
  </nav>
  
  <!-- Documentation content -->
  <article class="documentation">
    <h1 id="introduction">Introduction</h1>
    <p>Welcome to our component library documentation...</p>
    
    <h2 id="getting-started">Getting Started</h2>
    <p>To get started with our components...</p>
    
    <!-- More documentation content -->
  </article>
</spectrum-sidebar>
```

### E-commerce with Filters
```html
<spectrum-sidebar 
  position="left"
  sidebar-width="xs"
  gap="xl"
  responsive="true"
  collapse-below="true">
  
  <!-- Filter sidebar -->
  <aside slot="sidebar" class="filters">
    <h3>Filters</h3>
    
    <div class="filter-group">
      <h4>Category</h4>
      <label><input type="checkbox"> Electronics</label>
      <label><input type="checkbox"> Clothing</label>
      <label><input type="checkbox"> Books</label>
    </div>
    
    <div class="filter-group">
      <h4>Price Range</h4>
      <input type="range" min="0" max="1000" />
      <div class="price-display">$0 - $1000</div>
    </div>
    
    <div class="filter-group">
      <h4>Brand</h4>
      <label><input type="checkbox"> Brand A</label>
      <label><input type="checkbox"> Brand B</label>
      <label><input type="checkbox"> Brand C</label>
    </div>
  </aside>
  
  <!-- Product listings -->
  <main class="products">
    <header class="products-header">
      <h1>Products</h1>
      <div class="sort-controls">
        <select>
          <option>Sort by Price</option>
          <option>Sort by Name</option>
          <option>Sort by Rating</option>
        </select>
      </div>
    </header>
    
    <div class="product-grid">
      <!-- Product cards -->
    </div>
  </main>
</spectrum-sidebar>
```

### Collapsible Tool Panel
```html
<spectrum-sidebar 
  position="right"
  collapsible="true"
  collapsed="false"
  sidebar-width="lg"
  overlay="false">
  
  <!-- Tool panel -->
  <aside slot="sidebar" class="tool-panel">
    <header class="panel-header">
      <h3>Design Tools</h3>
      <button class="collapse-btn">←</button>
    </header>
    
    <div class="tool-section">
      <h4>Colors</h4>
      <div class="color-picker">
        <!-- Color picker component -->
      </div>
    </div>
    
    <div class="tool-section">
      <h4>Typography</h4>
      <select>
        <option>Helvetica</option>
        <option>Arial</option>
      </select>
    </div>
    
    <div class="tool-section">
      <h4>Effects</h4>
      <label>
        <input type="range" />
        Shadow Blur
      </label>
    </div>
  </aside>
  
  <!-- Design canvas -->
  <main class="design-canvas">
    <div class="canvas-area">
      <!-- Design elements -->
    </div>
  </main>
</spectrum-sidebar>
```

## Advanced Usage

### Custom Width Control
```html
<spectrum-sidebar 
  sidebar-width="300px"
  min-sidebar-width="200px"
  max-sidebar-width="400px">
  <!-- Custom sized sidebar -->
</spectrum-sidebar>
```

### Mobile-First Responsive
```html
<spectrum-sidebar 
  responsive="true"
  breakpoint="lg"
  stack-mobile="true"
  collapse-below="true"
  overlay="true">
  <!-- Responsive behavior configuration -->
</spectrum-sidebar>
```

## Properties

| Property          | Attribute           | Description | Type                                             | Default  |
| ----------------- | ------------------- | ----------- | ------------------------------------------------ | -------- |
| `breakpoint`      | `breakpoint`        |             | `"lg" \| "md" \| "sm"`                           | `'md'`   |
| `collapseBelow`   | `collapse-below`    |             | `boolean`                                        | `true`   |
| `collapsed`       | `collapsed`         |             | `boolean`                                        | `false`  |
| `collapsible`     | `collapsible`       |             | `boolean`                                        | `false`  |
| `debug`           | `debug`             |             | `boolean`                                        | `false`  |
| `fullHeight`      | `full-height`       |             | `boolean`                                        | `false`  |
| `gap`             | `gap`               |             | `"lg" \| "md" \| "none" \| "sm" \| "xl" \| "xs"` | `'md'`   |
| `maxSidebarWidth` | `max-sidebar-width` |             | `string`                                         | `''`     |
| `minSidebarWidth` | `min-sidebar-width` |             | `string`                                         | `''`     |
| `overlay`         | `overlay`           |             | `boolean`                                        | `false`  |
| `position`        | `position`          |             | `"left" \| "right"`                              | `'left'` |
| `responsive`      | `responsive`        |             | `boolean`                                        | `true`   |
| `sidebarWidth`    | `sidebar-width`     |             | `string`                                         | `'md'`   |
| `stackMobile`     | `stack-mobile`      |             | `boolean`                                        | `true`   |


----------------------------------------------


