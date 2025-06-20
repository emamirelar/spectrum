# spectrum-stack

## Purpose

The `spectrum-stack` component provides vertical or horizontal stacking of child elements with consistent spacing and alignment options. It's the simplest layout component, perfect for linear arrangements of content with uniform spacing.

## Key Features

- **Direction Control**: Vertical or horizontal stacking
- **Consistent Spacing**: Uniform gaps between all items
- **Alignment Options**: Control alignment along both axes
- **Wrap Support**: Items can wrap to new lines when needed
- **Reverse Order**: Option to reverse the order of items
- **Responsive Behavior**: Different behavior on different screen sizes
- **Auto Spacing**: Automatic spacing distribution option

## When to Use

- **Simple Lists**: Vertical lists of items with consistent spacing
- **Button Groups**: Horizontal or vertical button arrangements
- **Form Sections**: Stacking form fields with consistent spacing
- **Content Sections**: Stacking content blocks vertically
- **Navigation Items**: Simple navigation menus
- **Card Stacks**: Vertical arrangements of cards or panels
- **Any Linear Layout**: When you need simple, consistent item spacing

## Basic Usage

```html
<!-- Vertical stack (default) -->
<spectrum-stack spacing="md">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</spectrum-stack>

<!-- Horizontal stack -->
<spectrum-stack direction="horizontal" spacing="lg" align="center">
  <spectrum-button variant="primary">Save</spectrum-button>
  <spectrum-button variant="secondary">Cancel</spectrum-button>
  <spectrum-button variant="tertiary">Reset</spectrum-button>
</spectrum-stack>
```

## Layout Examples

### Vertical Content Stack
```html
<spectrum-stack spacing="xl" align="stretch">
  <!-- Page header -->
  <header class="page-header">
    <h1>Welcome to Our Platform</h1>
    <p>Discover amazing features and capabilities</p>
  </header>
  
  <!-- Hero section -->
  <section class="hero-section">
    <img src="/hero-image.jpg" alt="Hero" />
    <div class="hero-content">
      <h2>Get Started Today</h2>
      <spectrum-button variant="primary">Sign Up</spectrum-button>
    </div>
  </section>
  
  <!-- Features section -->
  <section class="features">
    <h2>Features</h2>
    <div class="feature-grid">
      <!-- Feature items -->
    </div>
  </section>
  
  <!-- Footer -->
  <footer class="page-footer">
    <p>&copy; 2024 Your Company</p>
  </footer>
</spectrum-stack>
```

### Form Field Stack
```html
<spectrum-stack spacing="lg" align="stretch">
  <h2>Contact Form</h2>
  
  <div class="field-group">
    <label for="name">Full Name</label>
    <input type="text" id="name" placeholder="Enter your name" />
  </div>
  
  <div class="field-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" placeholder="Enter your email" />
  </div>
  
  <div class="field-group">
    <label for="message">Message</label>
    <textarea id="message" rows="4" placeholder="Your message"></textarea>
  </div>
  
  <spectrum-stack direction="horizontal" justify="flex-end" spacing="md">
    <spectrum-button variant="secondary">Clear</spectrum-button>
    <spectrum-button variant="primary">Send Message</spectrum-button>
  </spectrum-stack>
</spectrum-stack>
```

### Navigation Menu
```html
<spectrum-stack direction="horizontal" spacing="lg" align="center" wrap="true">
  <a href="#home" class="nav-link active">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#services" class="nav-link">Services</a>
  <a href="#portfolio" class="nav-link">Portfolio</a>
  <a href="#contact" class="nav-link">Contact</a>
</spectrum-stack>
```

### Card Stack
```html
<spectrum-stack spacing="lg" align="center">
  <div class="card">
    <h3>Feature 1</h3>
    <p>Description of the first feature...</p>
    <spectrum-button variant="secondary">Learn More</spectrum-button>
  </div>
  
  <div class="card">
    <h3>Feature 2</h3>
    <p>Description of the second feature...</p>
    <spectrum-button variant="secondary">Learn More</spectrum-button>
  </div>
  
  <div class="card">
    <h3>Feature 3</h3>
    <p>Description of the third feature...</p>
    <spectrum-button variant="secondary">Learn More</spectrum-button>
  </div>
</spectrum-stack>
```

### Responsive Button Group
```html
<spectrum-stack 
  direction="horizontal"
  spacing="md"
  justify="center"
  responsive="true"
  breakpoint="sm"
  wrap="true">
  <spectrum-button variant="primary">Primary Action</spectrum-button>
  <spectrum-button variant="secondary">Secondary</spectrum-button>
  <spectrum-button variant="tertiary">Tertiary</spectrum-button>
  <spectrum-button variant="outline">Outline</spectrum-button>
</spectrum-stack>
```

### Article Content Stack
```html
<spectrum-stack spacing="lg" align="start">
  <!-- Article header -->
  <header class="article-header">
    <h1>Article Title</h1>
    <div class="article-meta">
      <span>By John Doe</span>
      <span>•</span>
      <span>March 15, 2024</span>
      <span>•</span>
      <span>5 min read</span>
    </div>
  </header>
  
  <!-- Article image -->
  <img src="/article-image.jpg" alt="Article" class="article-image" />
  
  <!-- Article content -->
  <div class="article-content">
    <p>Article introduction paragraph...</p>
    <p>Article body content...</p>
    <blockquote>
      "Important quote from the article..."
    </blockquote>
    <p>More article content...</p>
  </div>
  
  <!-- Article footer -->
  <footer class="article-footer">
    <div class="tags">
      <spectrum-chip>React</spectrum-chip>
      <spectrum-chip>JavaScript</spectrum-chip>
      <spectrum-chip>Web Development</spectrum-chip>
    </div>
    
    <div class="share-buttons">
      <spectrum-button variant="tertiary" size="small">Share</spectrum-button>
      <spectrum-button variant="tertiary" size="small">Like</spectrum-button>
    </div>
  </footer>
</spectrum-stack>
```

## Advanced Usage

### Reverse Order Stack
```html
<spectrum-stack direction="vertical" reverse="true" spacing="md">
  <div>This will appear last</div>
  <div>This will appear second</div>
  <div>This will appear first</div>
</spectrum-stack>
```

### Auto-Spaced Stack
```html
<spectrum-stack 
  direction="horizontal" 
  spacing="auto" 
  justify="space-between"
  align="center">
  <div>Left item</div>
  <div>Center item</div>
  <div>Right item</div>
</spectrum-stack>
```

### Responsive Stack Direction
```html
<spectrum-stack 
  direction="horizontal"
  responsive="true"
  breakpoint="md"
  spacing="lg"
  wrap="false">
  <!-- Stack becomes vertical on mobile -->
  <div class="stack-item">Item 1</div>
  <div class="stack-item">Item 2</div>
  <div class="stack-item">Item 3</div>
</spectrum-stack>
```

## Properties

| Property     | Attribute    | Description | Type                                                                                  | Default      |
| ------------ | ------------ | ----------- | ------------------------------------------------------------------------------------- | ------------ |
| `align`      | `align`      |             | `"center" \| "end" \| "start" \| "stretch"`                                           | `'stretch'`  |
| `breakpoint` | `breakpoint` |             | `"lg" \| "md" \| "sm"`                                                                | `'md'`       |
| `debug`      | `debug`      |             | `boolean`                                                                             | `false`      |
| `direction`  | `direction`  |             | `"column" \| "horizontal" \| "row" \| "vertical"`                                     | `'vertical'` |
| `justify`    | `justify`    |             | `"center" \| "end" \| "space-around" \| "space-between" \| "space-evenly" \| "start"` | `'start'`    |
| `responsive` | `responsive` |             | `boolean`                                                                             | `false`      |
| `reverse`    | `reverse`    |             | `boolean`                                                                             | `false`      |
| `spacing`    | `spacing`    |             | `"auto" \| "lg" \| "md" \| "none" \| "sm" \| "xl" \| "xs"`                            | `'md'`       |
| `wrap`       | `wrap`       |             | `boolean`                                                                             | `false`      |


----------------------------------------------


