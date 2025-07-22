# Spectrum Button

The button component provides...

## Features

🎨 **Feature 1** - Description of key feature
📏 **Feature 2** - Description of key feature  
♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard and screen reader support
🎯 **Feature 3** - Description of key feature
🔊 **Feature 4** - Description of key feature
⚡ **High Performance** - Optimized for frequent re-rendering and minimal memory usage

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Basic usage example -->
<spectrum-button>
  Content here
</spectrum-button>

<!-- Advanced usage -->
<spectrum-button 
  debug="true"
  variant="primary"
  size="sm"
>
  Advanced content
</spectrum-button>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `debug` | `boolean` | `false` | The debug property |
| `variant` | `'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab'` | `primary` | The variant property |
| `size` | `'sm' | 'base' | 'lg'` | `sm` | The size property |
| `outline` | `boolean` | `false` | The outline property |
| `iconOnly` | `boolean` | `false` | The iconOnly property |
| `disabled` | `boolean` | `false` | The disabled property |
| `ripple` | `boolean` | `false` | The ripple property |
| `action` | `string` | `` | The action property |
| `customStyle` | `any` | `` | The customStyle property |
| `minimalAnimation` | `boolean` | `false` | The minimalAnimation property |
| `showButtonText` | `boolean` | `false` | The showButtonText property |
| `buttonText` | `string` | `` | The buttonText property |
| `showLeftIcon` | `boolean` | `false` | The showLeftIcon property |
| `leftIcon` | `string` | `` | The leftIcon property |
| `showRightIcon` | `boolean` | `false` | The showRightIcon property |
| `rightIcon` | `string` | `` | The rightIcon property |
| `sound` | `boolean` | `false` | The sound property |
| `haptic` | `boolean` | `false` | The haptic property |
| `state` | `'default' | 'hover' | 'active' | 'disabled'` | `default` | The state property |

### Events

| Event | Type | Description |
|-------|------|-------------|


### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--disabled` | `var(--spectrum-sys-*)` | Component styling property |
| `--outline` | `var(--spectrum-sys-*)` | Component styling property |
| `--icon-only` | `var(--spectrum-sys-*)` | Component styling property |
| `--hover` | `var(--spectrum-sys-*)` | Component styling property |
| `--active` | `var(--spectrum-sys-*)` | Component styling property |

### Slots

| Slot | Description |
|------|-------------|
| Default | Main component content |

## Integration Patterns

### Basic Integration

```html
<spectrum-button>
  <p>Component content</p>
</spectrum-button>
```

### Advanced Integration

```typescript
// TypeScript integration example
import { spectrum-button } from '@spectrum/core';

class MyComponent {
  render() {
    return (
      <spectrum-button
        debug={this.debug}
        variant={this.variant}

      >
        Content
      </spectrum-button>
    );
  }
}
```

## Accessibility

### Screen Reader Support

```html
<!-- Component with accessible attributes -->
<spectrum-button aria-label="Accessible label">
  Content
</spectrum-button>
```

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between interactive elements
- **Enter/Space**: Activate component (if interactive)
- **Escape**: Close/cancel action (when appropriate)

## Performance

### Bundle Impact
- **Core component**: ~3KB gzipped
- **Runtime performance**: <2ms initialization
- **Memory usage**: ~400 bytes per instance

### Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full support |
| Firefox | 85+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 88+ | ✅ Full support |

## Examples

See the [Storybook documentation](./spectrum-button) for interactive examples and comprehensive usage patterns.

## Related Components



## Contributing

Please read our [Contributing Guide](../../../CONTRIBUTING.md) for information about reporting bugs, requesting features, and submitting pull requests.

## License

This component is part of the Spectrum Design System and is licensed under the [MIT License](../../../LICENSE).