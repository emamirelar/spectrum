# Spectrum Badge Component

A flexible and versatile badge component for displaying status indicators, notifications, counts, and labels throughout your application.

## Overview

The `spectrum-badge` component provides a consistent way to display supplementary information such as status indicators, notification counts, labels, and selection markers. It supports multiple variants, sizes, and configurations to fit various design contexts while maintaining accessibility and visual consistency.

## Features

- **5 Visual Variants**: Primary, Secondary, Success, Warning, Danger
- **3 Size Options**: Small, Medium, Large
- **Circular Mode**: Perfect for counts and status dots
- **Flexible Content**: Supports both text props and slotted content
- **Spectrum Design System**: Uses proper design tokens and theming
- **Accessibility**: High contrast support and screen reader friendly
- **Debug Mode**: Console logging for development

## Installation

```bash
npm install @unops-itg-npm/cpit-spectrum
```

## Basic Usage

### Simple Text Badge

```html
<spectrum-badge text="New" variant="primary"></spectrum-badge>
```

### Circular Notification Badge

```html
<spectrum-badge text="5" variant="danger" circular></spectrum-badge>
```

### Slotted Content Badge

```html
<spectrum-badge variant="success">
  <span>✓ Verified</span>
</spectrum-badge>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | `''` | The text content displayed in the badge |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | The visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | The size of the badge |
| `circular` | `boolean` | `false` | Whether the badge should be circular |
| `debug` | `boolean` | `false` | Enable debug logging in console |

### Slots

| Slot | Description |
|------|-------------|
| `(default)` | Content to display inside the badge (alternative to text prop) |

## Variants

### Primary
Default variant for general use and primary actions.

```html
<spectrum-badge text="Primary" variant="primary"></spectrum-badge>
```

### Secondary  
Subdued variant for secondary information and inactive states.

```html
<spectrum-badge text="Secondary" variant="secondary"></spectrum-badge>
```

### Success
Positive feedback, confirmations, and successful states.

```html
<spectrum-badge text="Success" variant="success"></spectrum-badge>
```

### Warning
Cautionary information and warning states.

```html
<spectrum-badge text="Warning" variant="warning"></spectrum-badge>
```

### Danger
Error states, urgent notifications, and destructive actions.

```html
<spectrum-badge text="Danger" variant="danger"></spectrum-badge>
```

## Sizes

### Small
Compact badges for dense interfaces and subtle indicators.

```html
<spectrum-badge text="Small" variant="primary" size="small"></spectrum-badge>
```

### Medium (Default)
Standard size for most use cases.

```html
<spectrum-badge text="Medium" variant="primary" size="medium"></spectrum-badge>
```

### Large
Prominent badges for emphasis and better mobile accessibility.

```html
<spectrum-badge text="Large" variant="primary" size="large"></spectrum-badge>
```

## Circular Mode

Circular badges are ideal for counts, status dots, and icon containers.

### Notification Counts

```html
<spectrum-badge text="3" variant="danger" circular></spectrum-badge>
<spectrum-badge text="99+" variant="danger" circular></spectrum-badge>
```

### Status Indicators

```html
<spectrum-badge text="●" variant="success" circular size="small"></spectrum-badge>
<spectrum-badge text="●" variant="warning" circular size="small"></spectrum-badge>
<spectrum-badge text="●" variant="secondary" circular size="small"></spectrum-badge>
```

## Common Use Cases

### Navigation Notifications

```html
<nav>
  <a href="/messages">
    Messages
    <spectrum-badge text="5" variant="danger" circular size="small"></spectrum-badge>
  </a>
</nav>
```

### Status Cards

```html
<div class="project-card">
  <h3>Project Alpha</h3>
  <spectrum-badge text="Active" variant="success"></spectrum-badge>
</div>
```

### User Roles

```html
<div class="user-profile">
  <span>John Doe</span>
  <spectrum-badge text="Admin" variant="danger"></spectrum-badge>
</div>
```

### E-commerce Labels

```html
<div class="product-card">
  <spectrum-badge text="Sale" variant="danger"></spectrum-badge>
  <spectrum-badge text="Free Shipping" variant="success" size="small"></spectrum-badge>
</div>
```

## Positioning and Layout

### Overlay Positioning

```css
.notification-container {
  position: relative;
  display: inline-block;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
}
```

```html
<div class="notification-container">
  <button>Messages</button>
  <spectrum-badge text="3" variant="danger" circular class="notification-badge"></spectrum-badge>
</div>
```

### Inline Layout

```html
<div style="display: flex; align-items: center; gap: 0.5rem;">
  <span>Server Status:</span>
  <spectrum-badge text="Online" variant="success"></spectrum-badge>
</div>
```

## Accessibility

### Screen Reader Support

Use descriptive text that conveys meaning beyond color:

```html
<!-- Good: Descriptive text -->
<spectrum-badge text="3 unread messages" variant="danger"></spectrum-badge>
<spectrum-badge text="✓ Approved" variant="success"></spectrum-badge>

<!-- Avoid: Color-only meaning -->
<spectrum-badge text="●" variant="danger"></spectrum-badge>
```

### High Contrast

The badge component automatically adapts to high contrast modes and ensures proper color contrast ratios across all variants.

### Touch Targets

For interactive badges on mobile devices, use larger sizes:

```html
<spectrum-badge text="Filter" variant="primary" size="large"></spectrum-badge>
```

## Theming

The badge component uses Spectrum design tokens and automatically adapts to theme changes. Custom theming can be applied through CSS custom properties:

```css
spectrum-badge {
  --badge-border-radius: 8px;
  --badge-font-weight: 600;
}
```

## Best Practices

### Do's ✅

- Use consistent badge placement across similar interface elements
- Choose appropriate variants that match the semantic meaning
- Use circular badges for counts and numerical indicators
- Provide descriptive text for accessibility
- Use appropriate sizing for the context (mobile vs desktop)

### Don'ts ❌

- Don't use too many badges in a single interface area
- Don't rely solely on color to convey meaning
- Don't use badges for interactive elements without proper accessibility
- Don't use overly long text in badges
- Don't mix different badge styles within the same feature

## Browser Support

The spectrum-badge component supports all modern browsers and follows web standards for accessibility and performance.

## Related Components

- **spectrum-button**: For interactive elements with badge-like styling
- **spectrum-chip**: For removable tags and filters
- **spectrum-image-gallery**: Uses badges for selection indicators

## Troubleshooting

### Badge not displaying correctly

1. Ensure the component is properly imported
2. Check that all required properties are provided
3. Verify CSS is not overriding badge styles
4. Enable debug mode to see console output

### Accessibility issues

1. Provide meaningful text content
2. Ensure sufficient color contrast
3. Test with screen readers
4. Use appropriate ARIA labels for complex scenarios

## Examples Repository

For more examples and advanced usage patterns, see:
- Storybook Documentation
- Dependencies Documentation
- Use Cases Documentation

## Contributing

When contributing to the badge component:

1. Follow the established patterns for variants and sizing
2. Ensure accessibility compliance
3. Add appropriate tests for new features
4. Update documentation for any API changes

---

For detailed examples and interactive documentation, visit the Storybook documentation. 