# Coordinated Theme & Wallpaper Loading

This system eliminates both **Font FOUC** (Flash of Unstyled Content) and **Color FOUC** by coordinating the loading of fonts and wallpaper color extraction, ensuring content is only shown when everything is ready.

## The Problem

1. **Font FOUC**: Material Icons show as text before the font loads
2. **Color FOUC**: Default theme colors briefly appear before wallpaper colors are extracted
3. **Jarring transitions**: Users see multiple visual changes during loading

## The Solution

Event-based coordination between `spectrum-theme` and `spectrum-wallpaper` components that:
- ✅ Hides content until both fonts and colors are ready
- ✅ Provides smooth loading transitions
- ✅ Maintains component separation and modularity
- ✅ Includes timeout protection and fallbacks
- ✅ Works independently when only one component is used

## Basic Usage

### Coordinated Loading (Recommended)
```html
<spectrum-theme 
  color="#0070d2"
  wait-for-wallpaper="true"
  hide-content-until-ready="true">
  
  <spectrum-wallpaper 
    background="url(/path/to/image.jpg)"
    preload-colors="true"
    signal-ready="true">
    
    <your-app-content></your-app-content>
  </spectrum-wallpaper>
</spectrum-theme>
```

### Independent Loading (Existing Behavior)
```html
<!-- Theme only -->
<spectrum-theme color="#0070d2">
  <your-app></your-app>
</spectrum-theme>

<!-- Or wallpaper only -->
<spectrum-wallpaper background="url(/image.jpg)">
  <your-app></your-app>
</spectrum-wallpaper>
```

## Configuration Properties

### Theme Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `wait-for-wallpaper` | boolean | `false` | Wait for wallpaper colors before showing content |
| `coordination-timeout` | number | `2000` | Timeout for wallpaper coordination (ms) |
| `hide-content-until-ready` | boolean | `true` | Hide content during loading |
| `auto-load-fonts` | boolean | `true` | Enable automatic font loading |
| `font-load-timeout` | number | `3000` | Font loading timeout (ms) |

### Wallpaper Component

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `preload-colors` | boolean | `false` | Extract colors before applying them |
| `signal-ready` | boolean | `false` | Emit coordination events |
| `debug` | boolean | `false` | Enable debug logging |

## Loading States & CSS Classes

The system applies CSS classes to document.documentElement for styling:

```css
/* Applied during loading */
html.theme-loading .app-content {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

/* Applied when everything is ready */
html.theme-ready .app-content {
  opacity: 1;
}

/* Font loading states */
html.fonts-loading .material-symbols-outlined {
  opacity: 0;
}

html.fonts-loaded .material-symbols-outlined {
  opacity: 1;
}

/* Wallpaper loading states */
html.wallpaper-loading { /* Wallpaper is extracting colors */ }
html.wallpaper-ready { /* Colors extracted successfully */ }
html.wallpaper-failed { /* Color extraction failed */ }
```

## Events

### Theme Events
```javascript
// Theme is fully ready (fonts + wallpaper)
document.addEventListener('themeready', (event) => {
  console.log('Theme ready:', event.detail);
  // { fonts: true, wallpaper: true, theme: 'spectrum' }
});

// Font loading events
document.addEventListener('themefontsloaded', (event) => {
  console.log('Fonts loaded');
});

// Wallpaper coordination events  
document.addEventListener('themewallpaperready', (event) => {
  console.log('Wallpaper coordinated');
});
```

### Wallpaper Events
```javascript
// Color extraction completed
document.addEventListener('wallpaper-colors-ready', (event) => {
  console.log('Colors extracted:', event.detail.colors);
});

// Color extraction failed
document.addEventListener('wallpaper-colors-failed', (event) => {
  console.log('Extraction failed:', event.detail.error);
});
```

## Loading Strategies

### 1. Coordinated Loading
Wait for both fonts and wallpaper colors before showing content:

```html
<spectrum-theme 
  wait-for-wallpaper="true"
  hide-content-until-ready="true">
  <spectrum-wallpaper preload-colors="true" signal-ready="true">
    <main class="app-content">
      <!-- Content shown only when everything is ready -->
    </main>
  </spectrum-wallpaper>
</spectrum-theme>
```

**Pros**: Smoothest experience, no FOUC  
**Cons**: Slightly longer perceived loading time

### 2. Progressive Loading
Show content with default colors while wallpaper loads:

```html
<spectrum-theme 
  wait-for-wallpaper="false"
  hide-content-until-ready="true">
  <spectrum-wallpaper preload-colors="false">
    <main class="app-content">
      <!-- Content shown when fonts ready, colors transition later -->
    </main>
  </spectrum-wallpaper>
</spectrum-theme>
```

**Pros**: Faster perceived performance  
**Cons**: Color transition may be visible

### 3. Independent Loading
Components work independently (existing behavior):

```html
<spectrum-theme>
  <spectrum-wallpaper>
    <!-- No coordination, existing behavior -->
  </spectrum-wallpaper>
</spectrum-theme>
```

## Implementation Examples

### With Loading Screen
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .loading-screen {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: #0070d2;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      z-index: 9999;
      transition: opacity 0.5s ease;
    }
    
    .loading-screen.hidden {
      opacity: 0;
      visibility: hidden;
    }
  </style>
</head>
<body>
  <div id="loading" class="loading-screen">
    Loading...
  </div>

  <spectrum-theme wait-for-wallpaper="true">
    <spectrum-wallpaper preload-colors="true" signal-ready="true">
      <main>Your app content</main>
    </spectrum-wallpaper>
  </spectrum-theme>

  <script>
    document.addEventListener('themeready', () => {
      document.getElementById('loading').classList.add('hidden');
    });
  </script>
</body>
</html>
```

### With Progressive Enhancement
```html
<!-- Works without JavaScript -->
<noscript>
  <style>
    .app-content { opacity: 1 !important; }
  </style>
</noscript>

<spectrum-theme wait-for-wallpaper="true">
  <spectrum-wallpaper preload-colors="true" signal-ready="true">
    <main class="app-content">
      <!-- Content with fallback styling -->
    </main>
  </spectrum-wallpaper>
</spectrum-theme>
```

## Performance Optimization

### Preload Critical Images
```html
<head>
  <link rel="preload" as="image" href="/critical-wallpaper.jpg">
</head>
```

### Optimize Coordination Timeout
```html
<!-- Fast network -->
<spectrum-theme coordination-timeout="1000">

<!-- Slow network -->  
<spectrum-theme coordination-timeout="5000">
```

### Cache Color Results
The system can be extended to cache extracted colors:

```javascript
// Store extracted colors
localStorage.setItem('wallpaper-colors', JSON.stringify(colors));

// Apply cached colors immediately on next load
const cachedColors = localStorage.getItem('wallpaper-colors');
if (cachedColors) {
  // Apply cached colors while re-extracting
}
```

## Browser Support

- **Modern browsers**: Full coordination with CSS Font Loading API
- **Legacy browsers**: Graceful fallback with timeout-based coordination
- **No JavaScript**: Progressive enhancement with CSS-only fallbacks

## Migration Guide

### From Separate Components
```html
<!-- Before: Separate components with FOUC -->
<spectrum-theme color="#0070d2">
  <spectrum-wallpaper background="url(...)">
    <main>Content</main>
  </spectrum-wallpaper>
</spectrum-theme>

<!-- After: Coordinated loading -->
<spectrum-theme 
  color="#0070d2" 
  wait-for-wallpaper="true">
  <spectrum-wallpaper 
    background="url(...)"
    preload-colors="true" 
    signal-ready="true">
    <main>Content</main>
  </spectrum-wallpaper>
</spectrum-theme>
```

### Testing Coordination
```javascript
// Test with slow network
// Chrome DevTools -> Network -> Slow 3G

// Test timeout behavior
<spectrum-theme coordination-timeout="100">

// Test fallback behavior  
<spectrum-wallpaper background="invalid-url">
```

## Best Practices

1. **Use coordination for critical paths** where smooth loading is essential
2. **Set appropriate timeouts** based on your network conditions
3. **Provide loading indicators** for better UX
4. **Test with slow networks** to verify fallback behavior
5. **Cache colors when possible** for returning users
6. **Monitor loading performance** with Web Vitals

This coordinated loading system ensures a smooth, professional user experience by eliminating both font and color FOUC while maintaining the modular architecture of separate components. 