# spectrum-container

## Purpose

The `spectrum-container` component provides content containment with max-width constraints, responsive padding, and centering capabilities. It's the foundation for creating consistent, readable layouts with proper content boundaries and spacing.

## Key Features

- **Max-Width Control**: Prevents content from becoming too wide on large screens
- **Responsive Padding**: Automatic padding adjustment based on screen size
- **Centering Options**: Both container and content centering capabilities
- **Size Variations**: Multiple preset sizes (xs, sm, md, lg, xl) plus custom options
- **Mobile Optimization**: Special handling for mobile devices
- **Flexible Padding**: Independent control of horizontal and vertical padding

## When to Use

- **Content Sections**: Wrapping main content areas with consistent boundaries
- **Reading Content**: Articles, blog posts, documentation where readability matters
- **Form Layouts**: Containing forms with appropriate width constraints
- **Card Content**: Interior content of cards or panels
- **Page Sections**: Different sections of a page that need consistent width
- **Responsive Design**: Any content that needs to adapt gracefully to screen sizes

## Basic Usage

```html
<!-- Basic content container -->
<spectrum-container>
  <h1>Welcome to Our Platform</h1>
  <p>Your content here with optimal reading width and spacing.</p>
</spectrum-container>

<!-- Large container with extra padding -->
<spectrum-container size="xl" padding="lg">
  <div class="hero-content">
    <h1>Hero Section</h1>
    <p>Large hero content with generous spacing.</p>
  </div>
</spectrum-container>
```

## Size Examples

### Different Container Sizes
```html
<!-- Small container for focused content -->
<spectrum-container size="sm">
  <form class="login-form">
    <h2>Sign In</h2>
    <!-- Form fields -->
  </form>
</spectrum-container>

<!-- Medium container (default) -->
<spectrum-container size="md">
  <article>
    <h1>Article Title</h1>
    <p>Article content with comfortable reading width.</p>
  </article>
</spectrum-container>

<!-- Large container for dashboards -->
<spectrum-container size="lg">
  <div class="dashboard">
    <h1>Dashboard</h1>
    <!-- Dashboard widgets -->
  </div>
</spectrum-container>

<!-- Full width container -->
<spectrum-container size="full">
  <div class="full-width-content">
    <p>Content that uses full available width.</p>
  </div>
</spectrum-container>
```

### Custom Width and Padding
```html
<!-- Custom max-width -->
<spectrum-container max-width="900px" padding="xl">
  <div class="custom-content">
    <h2>Custom Container</h2>
    <p>Content with custom width constraints.</p>
  </div>
</spectrum-container>

<!-- Different horizontal and vertical padding -->
<spectrum-container padding-x="lg" padding-y="sm">
  <div class="asymmetric-padding">
    <h3>Asymmetric Spacing</h3>
    <p>More horizontal padding, less vertical padding.</p>
  </div>
</spectrum-container>
```

### Responsive Behavior
```html
<!-- Responsive container with mobile optimization -->
<spectrum-container 
  responsive="true" 
  full-width-mobile="true"
  padding="lg">
  <div class="responsive-content">
    <h1>Responsive Content</h1>
    <p>Full width on mobile, constrained on desktop.</p>
  </div>
</spectrum-container>

<!-- Centered content within container -->
<spectrum-container 
  size="md" 
  center-content="true"
  padding="xl">
  <div class="centered-content">
    <h2>Centered Content</h2>
    <p>Both container and content are centered.</p>
  </div>
</spectrum-container>
```

## Properties

| Property          | Attribute           | Description | Type                                                        | Default |
| ----------------- | ------------------- | ----------- | ----------------------------------------------------------- | ------- |
| `centerContent`   | `center-content`    |             | `boolean`                                                   | `false` |
| `centered`        | `centered`          |             | `boolean`                                                   | `true`  |
| `debug`           | `debug`             |             | `boolean`                                                   | `false` |
| `fullWidthMobile` | `full-width-mobile` |             | `boolean`                                                   | `true`  |
| `maxWidth`        | `max-width`         |             | `string`                                                    | `''`    |
| `padding`         | `padding`           |             | `"lg" \| "md" \| "none" \| "sm" \| "xl" \| "xs"`            | `'md'`  |
| `paddingX`        | `padding-x`         |             | `"" \| "lg" \| "md" \| "none" \| "sm" \| "xl" \| "xs"`      | `''`    |
| `paddingY`        | `padding-y`         |             | `"" \| "lg" \| "md" \| "none" \| "sm" \| "xl" \| "xs"`      | `''`    |
| `responsive`      | `responsive`        |             | `boolean`                                                   | `true`  |
| `size`            | `size`              |             | `"fluid" \| "full" \| "lg" \| "md" \| "sm" \| "xl" \| "xs"` | `'lg'`  |


----------------------------------------------


