# Spectrum Theme

The theme component provides...

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
<spectrum-theme>
  Content here
</spectrum-theme>

<!-- Advanced usage -->
<spectrum-theme 
  color="example-value"
  dark="true"
  showSwatches="true"
>
  Advanced content
</spectrum-theme>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | `string` | `` | The color property |
| `dark` | `boolean` | `false` | The dark property |
| `showSwatches` | `boolean` | `false` | The showSwatches property |
| `debug` | `boolean` | `false` | The debug property |
| `config` | `string` | `` | The config property |
| `autoLoadFonts` | `boolean` | `false` | The autoLoadFonts property |
| `fontLoadTimeout` | `number` | `0` | The fontLoadTimeout property |
| `preloadFonts` | `boolean` | `false` | The preloadFonts property |
| `waitForWallpaper` | `boolean` | `false` | The waitForWallpaper property |
| `coordinationTimeout` | `number` | `0` | The coordinationTimeout property |
| `hideContentUntilReady` | `boolean` | `false` | The hideContentUntilReady property |

### Events

| Event | Type | Description |
|-------|------|-------------|


### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--spectrum-sys-font-family` | `var(--spectrum-sys-*)` | Component styling property |
| `--spectrum-sys-font-size` | `var(--spectrum-sys-*)` | Component styling property |
| `--spectrum-sys-font-size-small` | `var(--spectrum-sys-*)` | Component styling property |
| `--spectrum-sys-font-size-large` | `var(--spectrum-sys-*)` | Component styling property |
| `--spectrum-sys-font-size-x-large` | `var(--spectrum-sys-*)` | Component styling property |

### Slots

| Slot | Description |
|------|-------------|
| Default | Main component content |

## Integration Patterns

### Basic Integration

```html
<spectrum-theme>
  <p>Component content</p>
</spectrum-theme>
```

### Advanced Integration

```typescript
// TypeScript integration example
import { spectrum-theme } from '@spectrum/core';

class MyComponent {
  render() {
    return (
      <spectrum-theme
        color={this.color}
        dark={this.dark}

      >
        Content
      </spectrum-theme>
    );
  }
}
```

## Accessibility

### Screen Reader Support

```html
<!-- Component with accessible attributes -->
<spectrum-theme aria-label="Accessible label">
  Content
</spectrum-theme>
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

See the [Storybook documentation](./spectrum-theme) for interactive examples and comprehensive usage patterns.

## Related Components



## Contributing

Please read our [Contributing Guide](../../../CONTRIBUTING.md) for information about reporting bugs, requesting features, and submitting pull requests.

## License

This component is part of the Spectrum Design System and is licensed under the [MIT License](../../../LICENSE).