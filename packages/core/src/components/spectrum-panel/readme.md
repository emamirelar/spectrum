# spectrum-panel

A versatile, customizable panel component that provides a flexible container for content with various styling options including frost effects, size variations, and theming support.

## Features

- **Flexible Content**: Accepts any content via slots
- **Frost Effect**: Optional translucent background with blur effect
- **Size Variations**: Small, medium, and large sizes
- **Visual Variants**: Surface, primary, and secondary color schemes
- **Interactive States**: Optional hover and focus effects
- **Background Support**: Images, colors, or gradients
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Mobile-first responsive layout
- **Theming**: Full Spectrum design system integration

## Usage

### Basic Usage

```html
<spectrum-panel>
  <h2>Panel Title</h2>
  <p>This is the panel content.</p>
</spectrum-panel>
```

### With Frost Effect

```html
<spectrum-panel frost background="url('background-image.jpg')">
  <h2>Frosted Panel</h2>
  <p>Content with translucent frost background effect.</p>
</spectrum-panel>
```

### Size Variations

```html
<!-- Small panel -->
<spectrum-panel size="small">
  <p>Compact content</p>
</spectrum-panel>

<!-- Medium panel (default) -->
<spectrum-panel size="medium">
  <p>Standard content</p>
</spectrum-panel>

<!-- Large panel -->
<spectrum-panel size="large">
  <h1>Large Panel Title</h1>
  <p>Spacious content with larger padding and font sizes.</p>
</spectrum-panel>
```

### Visual Variants

```html
<!-- Surface variant (default) -->
<spectrum-panel variant="surface">
  <p>Default surface styling</p>
</spectrum-panel>

<!-- Primary variant -->
<spectrum-panel variant="primary">
  <p>Primary color scheme</p>
</spectrum-panel>

<!-- Secondary variant -->
<spectrum-panel variant="secondary">
  <p>Secondary color scheme</p>
</spectrum-panel>
```

### Interactive Panel

```html
<spectrum-panel interactive>
  <h3>Clickable Panel</h3>
  <p>This panel has hover effects and appears interactive.</p>
</spectrum-panel>
```

### Background Customization

```html
<!-- Image background -->
<spectrum-panel background="url('image.jpg')">
  <p>Content over image background</p>
</spectrum-panel>

<!-- Color background -->
<spectrum-panel background="#f0f0f0">
  <p>Content over color background</p>
</spectrum-panel>

<!-- Gradient background -->
<spectrum-panel background="linear-gradient(45deg, #ff6b6b, #4ecdc4)">
  <p>Content over gradient background</p>
</spectrum-panel>
```

### Custom Styling

```html
<spectrum-panel 
  padding="2rem" 
  border-radius="1rem"
  background="#ffffff"
  elevated>
  <p>Custom styled panel with specific padding and border radius</p>
</spectrum-panel>
```

### Complex Example

```html
<spectrum-panel 
  size="large"
  variant="primary"
  frost
  interactive
  elevated
  background="url('hero-bg.jpg')"
  debug>
  <h1>Welcome to Our Platform</h1>
  <p>This is a complex panel with multiple features enabled.</p>
  <spectrum-button variant="secondary">Learn More</spectrum-button>
</spectrum-panel>
```

## Properties

| Property | Attribute | Description | Type | Default |
|----------|-----------|-------------|------|---------|
| `background` | `background` | Background color, image, or gradient | `string` | `''` |
| `borderRadius` | `border-radius` | Custom border radius override | `string` | `''` |
| `debug` | `debug` | Enable debug logging | `boolean` | `false` |
| `elevated` | `elevated` | Apply shadow elevation | `boolean` | `true` |
| `frost` | `frost` | Apply frost effect (blur background) | `boolean` | `false` |
| `interactive` | `interactive` | Enable interactive hover effects | `boolean` | `false` |
| `padding` | `padding` | Custom padding override | `string` | `''` |
| `size` | `size` | Size variant | `"small" \| "medium" \| "large"` | `"medium"` |
| `variant` | `variant` | Visual variant | `"surface" \| "primary" \| "secondary"` | `"surface"` |

## Slots

| Slot | Description |
|------|-------------|
| Default | Content to be displayed within the panel |

## CSS Custom Properties

The component uses CSS custom properties for theming and can be customized by overriding these variables:

### Core Properties
- `--panel-background`: Background color
- `--panel-color`: Text color
- `--panel-border-radius`: Border radius
- `--panel-padding`: Internal padding
- `--panel-font-family`: Font family
- `--panel-font-size`: Font size

### Border Properties
- `--panel-border-color`: Border color
- `--panel-border-width`: Border width
- `--panel-border-style`: Border style

### Interactive States
- `--panel-hover-background`: Hover background color
- `--panel-active-background`: Active background color
- `--panel-focus-outline`: Focus outline color

### Animation
- `--panel-transition`: Transition property
- `--panel-transition-duration`: Transition duration
- `--panel-transition-timing`: Transition timing function

### Frost Effect
- `--panel-frost-backdrop-blur`: Blur amount for frost effect
- `--panel-frost-background`: Frost background color
- `--panel-frost-border`: Frost border color

### Shadows
- `--panel-shadow`: Default shadow
- `--panel-shadow-hover`: Hover shadow

## Examples

### Card Layout
```html
<spectrum-panel size="medium" elevated>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
  <spectrum-button>Action</spectrum-button>
</spectrum-panel>
```

### Hero Section
```html
<spectrum-panel 
  size="large"
  frost
  background="url('hero-image.jpg')"
  style="min-height: 400px;">
  <h1>Hero Title</h1>
  <p>Hero description text.</p>
  <spectrum-button variant="primary">Get Started</spectrum-button>
</spectrum-panel>
```

### Form Container
```html
<spectrum-panel variant="surface" padding="2rem">
  <form>
    <h2>Contact Form</h2>
    <spectrum-input label="Name" required></spectrum-input>
    <spectrum-input label="Email" type="email" required></spectrum-input>
    <spectrum-button type="submit" variant="primary">Submit</spectrum-button>
  </form>
</spectrum-panel>
```

### Notification Panel
```html
<spectrum-panel 
  variant="primary" 
  size="small" 
  interactive
  style="position: fixed; top: 1rem; right: 1rem;">
  <p>Notification message</p>
  <spectrum-button size="small">Dismiss</spectrum-button>
</spectrum-panel>
```

## Accessibility

The component follows WAI-ARIA guidelines and includes:

- Proper focus management
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

The frost effect requires `backdrop-filter` support. A fallback is provided for browsers without this feature.

## Dependencies

- Spectrum Design System tokens
- Stencil.js framework

## Related Components

- `spectrum-button`: For interactive elements within panels
- `spectrum-conversation-panel`: For chat/messaging interfaces
- `spectrum-theme`: For theme customization

---

*Built with Stencil.js and the Spectrum Design System*



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                         | Type                                                 | Default     |
| -------- | --------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------- |
| `debug`  | `debug`   | Whether to enable debug logging                                                                                     | `boolean`                                            | `false`     |
| `frost`  | `frost`   | Whether to apply frost effect (translucent background with blur) Default: false                                     | `boolean`                                            | `false`     |
| `height` | `height`  | Custom height for the panel Can be any valid CSS height value (e.g., '200px', '100vh', 'auto')                      | `string`                                             | `undefined` |
| `size`   | `size`    | Size preset for the panel Default: 'full' (occupies all available space)                                            | `"auto" \| "full" \| "large" \| "medium" \| "small"` | `'full'`    |
| `width`  | `width`   | Custom width for the panel (overrides size preset) Can be any valid CSS width value (e.g., '300px', '50%', '20rem') | `string`                                             | `undefined` |


----------------------------------------------


