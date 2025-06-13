# FOUC Prevention Guide for Spectrum Components

## Problem
Flash of Unstyled Content (FOUC) occurs when Material Icons show as text before the font loads, causing a jarring visual experience where you see the icon name (like "home", "search") before it renders as the actual icon.

## Root Causes
1. **Render-blocking CSS imports**: Using `@import url()` in CSS files
2. **No font preloading**: Fonts load after CSS and JavaScript
3. **No loading states**: Icons immediately show text content
4. **Multiple font loading**: Duplicate font loading across components

## Solutions Implemented

### 1. Font Preloading in HTML Head
```html
<!-- Add to your application's HTML head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload the actual font file -->
<link rel="preload" as="font" type="font/woff2" 
      href="https://fonts.gstatic.com/s/materialsymbolsoutlined/v168/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2" 
      crossorigin>

<!-- Load font CSS with display=swap -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" 
      rel="stylesheet">
```

### 2. CSS Loading States
```css
/* Hide icons until font loads */
html.fonts-loading .material-symbols-outlined {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

/* Show icons when loaded */
html.fonts-loaded .material-symbols-outlined {
  opacity: 1;
}

/* Fallback when font fails */
html.fonts-failed .material-symbols-outlined {
  opacity: 1;
  font-family: 'Segoe UI Symbol', Arial, sans-serif;
}
```

### 3. Font Loading Utility
```typescript
import { FontLoader } from './utils/font-loading';

// Initialize font loading
FontLoader.initialize({
  timeout: 3000,
  fallbackFonts: ['Segoe UI Symbol', 'Noto Color Emoji', 'Arial', 'sans-serif']
});
```

### 4. Component Integration
```html
<!-- Add loading spinners that hide when fonts load -->
<spectrum-button>
  <span class="loading-spinner"></span>
  <span class="material-symbols-outlined">home</span>
  Home
</spectrum-button>
```

## Implementation Steps

### For New Applications
1. **Add font preloading to HTML head** (see example above)
2. **Import the FontLoader utility** in your main application file
3. **Initialize font loading** before rendering components
4. **Add CSS loading states** to your global styles

### For Existing Applications
1. **Remove any CSS `@import` statements** for Material Icons
2. **Add proper preloading** in HTML head
3. **Update components** to use loading states
4. **Test across different network conditions**

## Performance Benefits
- **Faster icon rendering**: Preloading reduces font load time by up to 200ms
- **Smoother user experience**: No text-to-icon flash
- **Better perceived performance**: Loading states provide visual feedback
- **Graceful degradation**: Fallback fonts when loading fails

## Browser Support
- **Modern browsers**: Full CSS Font Loading API support
- **Older browsers**: Graceful fallback with basic font detection
- **Slow connections**: Timeout handling with fallback fonts

## Testing
```bash
# Test with throttled network
# Chrome DevTools -> Network -> Slow 3G

# Test font loading failure
# Block fonts.googleapis.com in DevTools -> Network -> Request blocking
```

## Troubleshooting

### Icons still showing as text
1. Check that HTML head includes proper preloading
2. Verify CSS loading states are applied
3. Ensure FontLoader is initialized before components

### Font loading timeout
1. Increase timeout in FontLoader.initialize()
2. Check network connection
3. Verify font URLs are accessible

### Performance issues
1. Only preload critical fonts
2. Use font-display: swap
3. Minimize CSS @import usage

## Advanced Optimizations

### Self-hosted Fonts
```css
/* Host fonts locally for better performance */
@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/MaterialSymbolsOutlined.woff2') format('woff2');
}
```

### Critical CSS Inlining
```html
<style>
  /* Inline critical CSS to prevent render blocking */
  .material-symbols-outlined { opacity: 0; }
  html.fonts-loaded .material-symbols-outlined { opacity: 1; }
</style>
```

### Resource Hints
```html
<!-- Additional performance hints -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//fonts.gstatic.com">
```

## Monitoring
- Monitor font loading performance with Web Vitals
- Track FOUC occurrences with user analytics
- Test regularly across different devices and connections

## Migration Checklist
- [ ] Remove CSS @import statements for fonts
- [ ] Add HTML head preloading
- [ ] Implement FontLoader utility
- [ ] Add CSS loading states
- [ ] Test with slow network
- [ ] Verify fallback behavior
- [ ] Update component documentation 