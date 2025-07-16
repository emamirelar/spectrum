# Spectrum Button

The foundational interactive button component of the Spectrum Design System. Provides consistent, accessible, and highly performant button interactions across all applications.

## Features

🎨 **Visual Variants** - Primary, secondary, tertiary, and destructive styling options
📏 **Flexible Sizing** - Small, medium, and large sizes with responsive design
♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard and screen reader support
🎯 **Interaction States** - Hover, focus, active, and disabled states with smooth transitions
🔊 **Audio Feedback** - Optional click sounds for enhanced user experience
⚡ **High Performance** - Optimized for frequent re-rendering and minimal memory usage
🎛️ **Customizable** - CSS custom properties for theming and design system integration
🌐 **Universal** - Works across all modern browsers and devices

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Primary action button -->
<spectrum-button variant="primary" size="medium">
  Save Changes
</spectrum-button>

<!-- Secondary action button -->
<spectrum-button variant="secondary" size="medium">
  Cancel
</spectrum-button>

<!-- Tertiary/minimal button -->
<spectrum-button variant="tertiary" size="small">
  Learn More
</spectrum-button>

<!-- Destructive action -->
<spectrum-button variant="destructive" size="medium">
  Delete Item
</spectrum-button>

<!-- Disabled state -->
<spectrum-button variant="primary" disabled>
  Processing...
</spectrum-button>
```

## Advanced Usage

```html
<!-- Button with icon content -->
<spectrum-button variant="primary" size="medium">
  <spectrum-icon name="download"></spectrum-icon>
  Download File
</spectrum-button>

<!-- Icon-only button -->
<spectrum-button variant="tertiary" size="small" aria-label="Close dialog">
  <spectrum-icon name="close"></spectrum-icon>
</spectrum-button>

<!-- Button with click handler -->
<spectrum-button 
  variant="primary" 
  size="large"
  onclick="handleSubmit()"
>
  Submit Form
</spectrum-button>

<!-- Loading state -->
<spectrum-button variant="primary" disabled>
  <spectrum-spinner size="small"></spectrum-spinner>
  Saving...
</spectrum-button>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'destructive'` | `'primary'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type for forms |
| `ariaLabel` | `string` | - | Accessible label for screen readers |
| `tabIndex` | `number` | `0` | Tab order for keyboard navigation |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `buttonAction` | `CustomEvent<{ action?: string; label: string }>` | Emitted when button is clicked |

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--button-background` | `var(--spectrum-sys-color-primary)` | Button background color |
| `--button-color` | `var(--spectrum-sys-color-on-primary)` | Button text color |
| `--button-border-radius` | `var(--spectrum-sys-shape-corner-medium)` | Button border radius |
| `--button-padding` | `var(--spectrum-sys-spacing)` | Button internal padding |
| `--button-font-family` | `var(--spectrum-sys-font-family)` | Button font family |
| `--button-font-size` | `var(--spectrum-sys-font-size)` | Button font size |
| `--button-min-height` | `44px` | Minimum touch target height |
| `--button-transition` | `all 0.2s ease-in-out` | Animation transitions |

### Slots

| Slot | Description |
|------|-------------|
| Default | Button content (text, icons, etc.) |

## Styling

### Size Variants

```css
/* Small buttons for compact interfaces */
spectrum-button[size="small"] {
  --button-padding: var(--spectrum-sys-spacing-small);
  --button-font-size: var(--spectrum-sys-typescale-body-small-size);
  --button-min-height: 32px;
}

/* Large buttons for primary actions */
spectrum-button[size="large"] {
  --button-padding: var(--spectrum-sys-spacing-large);
  --button-font-size: var(--spectrum-sys-typescale-body-large-size);
  --button-min-height: 56px;
}
```

### Visual Variants

```css
/* Primary buttons for main actions */
spectrum-button[variant="primary"] {
  --button-background: var(--spectrum-sys-color-primary);
  --button-color: var(--spectrum-sys-color-on-primary);
}

/* Secondary buttons for alternative actions */
spectrum-button[variant="secondary"] {
  --button-background: var(--spectrum-sys-color-secondary);
  --button-color: var(--spectrum-sys-color-on-secondary);
}

/* Tertiary buttons for minimal emphasis */
spectrum-button[variant="tertiary"] {
  --button-background: transparent;
  --button-color: var(--spectrum-sys-color-primary);
  border: 1px solid var(--spectrum-sys-color-outline);
}

/* Destructive buttons for dangerous actions */
spectrum-button[variant="destructive"] {
  --button-background: var(--spectrum-sys-color-error);
  --button-color: var(--spectrum-sys-color-on-error);
}
```

### Custom Styling

```css
/* Custom branded button */
.my-app spectrum-button {
  --button-border-radius: 12px;
  --button-font-family: 'Custom Font', sans-serif;
  --button-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* High contrast theme */
@media (prefers-contrast: high) {
  spectrum-button {
    --button-border: 2px solid currentColor;
  }
}
```

## Integration Patterns

### Form Integration

```html
<form>
  <spectrum-input label="Email" type="email" required></spectrum-input>
  <spectrum-input label="Password" type="password" required></spectrum-input>
  
  <div class="form-actions">
    <spectrum-button type="submit" variant="primary" size="medium">
      Sign In
    </spectrum-button>
    
    <spectrum-button type="button" variant="tertiary" size="medium">
      Forgot Password?
    </spectrum-button>
  </div>
</form>
```

### Modal Dialog Integration

```html
<spectrum-dialog>
  <h2>Confirm Deletion</h2>
  <p>Are you sure you want to delete this item?</p>
  
  <div class="dialog-actions">
    <spectrum-button variant="destructive" size="medium">
      Delete
    </spectrum-button>
    
    <spectrum-button variant="secondary" size="medium">
      Cancel
    </spectrum-button>
  </div>
</spectrum-dialog>
```

### Loading States

```typescript
// Button with loading state management
class MyComponent {
  @State() loading = false;

  async handleSubmit() {
    this.loading = true;
    try {
      await this.submitData();
    } finally {
      this.loading = false;
    }
  }

  render() {
    return (
      <spectrum-button 
        variant="primary" 
        disabled={this.loading}
        onClick={this.handleSubmit}
      >
        {this.loading ? 'Saving...' : 'Save Changes'}
      </spectrum-button>
    );
  }
}
```

## Accessibility

### Screen Reader Support

```html
<!-- Button with accessible label -->
<spectrum-button aria-label="Close dialog" variant="tertiary">
  <spectrum-icon name="close"></spectrum-icon>
</spectrum-button>

<!-- Button with description -->
<spectrum-button aria-describedby="help-text" variant="primary">
  Submit
</spectrum-button>
<div id="help-text">This will save your changes permanently</div>
```

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between buttons
- **Enter/Space**: Activate button
- **Escape**: Cancel action (when appropriate)

### Focus Management

```css
/* Custom focus styles */
spectrum-button:focus-visible {
  outline: 2px solid var(--spectrum-sys-color-primary);
  outline-offset: 2px;
}
```

## Performance

### Bundle Impact
- **Core component**: 3.2KB gzipped
- **With all variants**: 4.1KB gzipped
- **CSS custom properties**: 1.8KB gzipped

### Runtime Performance
- **Initialization**: <2ms average
- **Click response**: <16ms (sub-frame)
- **Re-render cost**: <1ms for property changes
- **Memory usage**: ~500 bytes per instance

### Optimization Tips

```typescript
// Efficient event handling
const handleClick = useCallback(() => {
  // Event handler logic
}, [dependencies]);

// Avoid frequent prop changes
const memoizedButton = useMemo(() => (
  <spectrum-button variant="primary" size="medium">
    {content}
  </spectrum-button>
), [content]);
```

## Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full support |
| Firefox | 85+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 88+ | ✅ Full support |
| iOS Safari | 14+ | ✅ Full support |
| Android Chrome | 88+ | ✅ Full support |

## Migration Guide

### From v1.x to v2.x

```typescript
// v1.x (deprecated)
<spectrum-button theme="primary" scale="large">
  Submit
</spectrum-button>

// v2.x (current)
<spectrum-button variant="primary" size="large">
  Submit
</spectrum-button>
```

### Breaking Changes
- `theme` prop renamed to `variant`
- `scale` prop renamed to `size`
- `click` event renamed to `buttonAction`
- CSS class names updated to follow BEM convention

## Examples

See the [Storybook documentation](./spectrum-button) for interactive examples and comprehensive usage patterns.

## Related Components

- [spectrum-icon](../spectrum-icon/README.md) - Icons for button content
- [spectrum-spinner](../spectrum-spinner/README.md) - Loading states
- [spectrum-tooltip](../spectrum-tooltip/README.md) - Button descriptions

## Contributing

Please read our [Contributing Guide](../../../CONTRIBUTING.md) for information about reporting bugs, requesting features, and submitting pull requests.

## License

This component is part of the Spectrum Design System and is licensed under the [MIT License](../../../LICENSE). 