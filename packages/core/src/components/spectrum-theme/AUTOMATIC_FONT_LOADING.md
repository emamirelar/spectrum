# Spectrum Theme - Automatic Font Loading

The `spectrum-theme` component now includes automatic font loading and FOUC (Flash of Unstyled Content) prevention, eliminating the need for applications to manually handle Material Icons font loading.

## Features

✅ **Automatic font preloading** - No manual setup required  
✅ **FOUC prevention** - Smooth icon loading without text flash  
✅ **Graceful fallbacks** - System fonts when loading fails  
✅ **Loading states** - Visual feedback during font loading  
✅ **Event system** - Track font loading status  
✅ **Zero configuration** - Works out of the box  
✅ **Configurable** - Fine-tune behavior as needed  

## Basic Usage

Simply wrap your application with the `spectrum-theme` component:

```html
<spectrum-theme color="#0070d2">
  <your-app></your-app>
</spectrum-theme>
```

That's it! The theme component will automatically:
- Preload Material Symbols fonts
- Apply loading states to prevent FOUC
- Handle font loading errors gracefully
- Set up proper fallback fonts

## Configuration Properties

### Font Loading Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `auto-load-fonts` | boolean | `true` | Enable/disable automatic font loading |
| `preload-fonts` | boolean | `true` | Preload fonts via HTML link elements |
| `font-load-timeout` | number | `3000` | Font loading timeout in milliseconds |

### Existing Theme Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `color` | string | `"#0070d2"` | Primary theme color |
| `dark` | boolean | `false` | Enable dark mode |
| `debug` | boolean | `false` | Show debug info and loading indicator |
| `show-swatches` | boolean | `false` | Display color swatches |
| `config` | string | `"{}"` | JSON configuration object |

## Advanced Configuration

### Custom Font Fallbacks

Configure fallback fonts via the config property:

```html
<spectrum-theme 
  color="#0070d2"
  config='{"fontFallbacks": ["Segoe UI Symbol", "Apple Color Emoji", "sans-serif"]}'>
  <your-app></your-app>
</spectrum-theme>
```

### Disable Automatic Font Loading

```html
<spectrum-theme 
  color="#0070d2" 
  auto-load-fonts="false">
  <your-app></your-app>
</spectrum-theme>
```

### Development Mode with Debug Info

```html
<spectrum-theme 
  color="#0070d2" 
  debug="true"
  show-swatches="true">
  <your-app></your-app>
</spectrum-theme>
```

## Events

The theme component emits custom events for font loading status:

### Theme-Specific Events

```javascript
// Font loading succeeded
document.addEventListener('themefontsloaded', (event) => {
  console.log('Theme fonts loaded:', event.detail);
});

// Font loading failed
document.addEventListener('themefontsfailed', (event) => {
  console.log('Theme fonts failed:', event.detail);
});
```

### Global Font Events

```javascript
// Global font loading completed
document.addEventListener('fontsloaded', () => {
  console.log('All fonts loaded successfully');
});

// Global font loading failed
document.addEventListener('fontsfailed', () => {
  console.log('Font loading failed, using fallbacks');
});
```

## CSS Classes

The theme component automatically applies CSS classes to the document:

```css
/* Applied during font loading */
html.fonts-loading .material-symbols-outlined {
  opacity: 0;
}

/* Applied when fonts load successfully */
html.fonts-loaded .material-symbols-outlined {
  opacity: 1;
}

/* Applied when font loading fails */
html.fonts-failed .material-symbols-outlined {
  font-family: 'Segoe UI Symbol', Arial, sans-serif;
}
```

## Migration Guide

### From Manual Font Loading

**Before (manual setup):**
```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
</head>
<body>
  <script>
    import { FontLoader } from '@spectrum/core/utils/font-loading';
    FontLoader.initialize();
  </script>
</body>
```

**After (automatic):**
```html
<spectrum-theme color="#0070d2">
  <your-app></your-app>
</spectrum-theme>
```

### Existing Applications

1. **Remove manual font loading code** - Delete FontLoader imports and initialization
2. **Remove font link elements** - Theme component handles preloading
3. **Wrap your app** - Add `<spectrum-theme>` as the root component
4. **Test with debug mode** - Use `debug="true"` to verify font loading

## Performance Benefits

- **Faster perceived loading** - Icons appear smoothly without text flash
- **Reduced layout shift** - Consistent icon sizing prevents reflow
- **Better caching** - Centralized font loading improves cache efficiency
- **Automatic optimization** - Built-in best practices for font loading

## Browser Support

- **Modern browsers** - Full CSS Font Loading API support
- **Legacy browsers** - Graceful fallback with font detection
- **Mobile devices** - Optimized for touch interfaces
- **Slow connections** - Timeout handling with fallback fonts

## Troubleshooting

### Icons not appearing
1. Check that `auto-load-fonts="true"` (default)
2. Verify network connectivity to Google Fonts
3. Enable `debug="true"` to see loading status
4. Check browser console for error messages

### Font loading timeout
1. Increase `font-load-timeout` value
2. Check network speed and stability
3. Consider self-hosting fonts for better performance

### Custom fonts not loading
1. Ensure proper font URLs in configuration
2. Verify CORS headers for external fonts
3. Check font file formats and browser support

## Best Practices

### Production Deployment
```html
<spectrum-theme 
  color="#0070d2"
  auto-load-fonts="true"
  preload-fonts="true"
  font-load-timeout="3000">
  <your-app></your-app>
</spectrum-theme>
```

### Development
```html
<spectrum-theme 
  color="#0070d2"
  debug="true"
  show-swatches="true"
  font-load-timeout="5000">
  <your-app></your-app>
</spectrum-theme>
```

### Self-Hosted Fonts
```html
<spectrum-theme 
  color="#0070d2"
  preload-fonts="false"
  config='{"fontFallbacks": ["MaterialSymbols", "Arial"]}'>
  <your-app></your-app>
</spectrum-theme>
```

## Technical Implementation

The theme component:
1. **Preloads fonts** via HTML link elements on component load
2. **Initializes FontLoader** with configured options
3. **Applies CSS classes** based on loading state
4. **Emits events** for application integration
5. **Handles errors** with graceful fallbacks
6. **Manages lifecycle** with proper cleanup

This automatic font loading system provides a seamless developer experience while ensuring optimal performance and user experience. 