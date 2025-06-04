# Debug Logging in Spectrum Components

This document provides detailed information about the debug logging feature available in Spectrum components.

## Overview

Debug logging is a development feature that helps developers understand what's happening inside Spectrum components. When enabled, components will output detailed information about their internal operations to the browser console.

## Components with Debug Support

### spectrum-wallpaper

**Purpose**: Dynamic background theming with color extraction from images

**Debug Output**:
- Image loading progress and status
- Color extraction algorithms and results
- Theme generation from extracted colors
- CSS custom property applications
- Fallback color detection for known image types

**Example Usage**:
```html
<spectrum-wallpaper debug background="url('ocean.jpg')">
  <p>Content with dynamic theme</p>
</spectrum-wallpaper>
```

**Sample Debug Output**:
```
[spectrum-wallpaper] Image loaded successfully: https://example.com/ocean.jpg
[spectrum-wallpaper] Extracted color from image: #1976d2
[spectrum-wallpaper] Updating theme with color: #1976d2
[spectrum-wallpaper] Theme successfully applied with scheme: {...}
[spectrum-wallpaper] Applying theme with custom properties: 24 properties
[spectrum-wallpaper] Set --spectrum-color-primary: #1976d2
```

### spectrum-theme

**Purpose**: Material Design 3 theme generation from source colors

**Debug Output**:
- Theme configuration parsing errors
- Invalid JSON configuration warnings

**Example Usage**:
```html
<spectrum-theme debug color="#ff5722" config='{"spacing": {"base": "1.5em"}}'>
  <div>Themed content</div>
</spectrum-theme>
```

**Sample Debug Output**:
```
[spectrum-theme] Invalid theme configuration: SyntaxError: Unexpected token in JSON
```

### spectrum-collapsible-list

**Purpose**: Hierarchical navigation with expandable/collapsible items

**Debug Output**:
- Context menu interaction issues
- DOM element availability warnings
- Item lookup failures during context actions
- Missing required elements for user interactions

**Example Usage**:
```html
<spectrum-collapsible-list 
  debug 
  items='[{"label": "Parent", "id": "p1", "children": [{"label": "Child", "id": "c1"}]}]'
  contextActions='[{"label": "Edit", "action": "edit"}]'>
</spectrum-collapsible-list>
```

**Sample Debug Output**:
```
[spectrum-collapsible-list] Missing icon element for item: {id: "item1", label: "Parent Item"}
[spectrum-collapsible-list] Global context menu exists but hide method is not available
[spectrum-collapsible-list] Could not find node for target key: unknown-key
```

### spectrum-conversation-panel

**Purpose**: Chat/conversation interface with message display

**Debug Output**:
- Message parsing and validation errors
- Action button configuration issues
- URL validation warnings for sources
- JSON parsing errors for complex data structures

**Example Usage**:
```html
<spectrum-conversation-panel 
  debug
  messages='[{"sender": "request", "message": "Hello"}]'
  actions='[{"icon": "copy", "action": "copy", "type": "button"}]'>
</spectrum-conversation-panel>
```

**Sample Debug Output**:
```
[spectrum-conversation-panel] Failed to parse messages: SyntaxError: Unexpected end of JSON input
[spectrum-conversation-panel] Error parsing actions: SyntaxError: Unexpected token
[spectrum-conversation-panel] Invalid URL: not-a-valid-url
```

## Debug Logging Levels

Components use appropriate console methods based on the severity of the information:

- `console.log()`: General information and successful operations
- `console.warn()`: Non-critical issues that might need attention
- `console.error()`: Critical errors that should be addressed (Note: errors are always logged regardless of debug flag)

## Important: Storybook vs Component Logging

**⚠️ Common Confusion**: If you're testing in Storybook and seeing console logs even when debug is `false`, these are likely coming from Storybook stories themselves, not the components.

### Storybook Event Handlers
Storybook stories often include event handlers that log to console regardless of component debug settings:

```javascript
// These logs appear regardless of component debug flags
onSearchInput={(e) => console.log('Search input:', e.detail)}
onContextAction={(e) => console.log('Context action:', e.detail)}
```

### How to Distinguish Component Debug Logs

**Component debug logs** always have this format:
```
[spectrum-component-name] Debug message here
```

**Storybook story logs** typically look like:
```
Search input: {value: "test"}
Context action event received: {action: "edit"}
```

### Testing Component Debug Logging Separately

To test component debug logging without Storybook interference:

1. **Use the debug test file**: `packages/core/debug-test.html`
2. **Create a minimal HTML page**:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <script type="module" src="./dist/spectrum/spectrum.esm.js"></script>
   </head>
   <body>
       <!-- No debug logs should appear -->
       <spectrum-wallpaper background="#ff5722">
           <p>Debug disabled</p>
       </spectrum-wallpaper>
       
       <!-- Debug logs should appear -->
       <spectrum-wallpaper debug background="#2196f3">
           <p>Debug enabled</p>
       </spectrum-wallpaper>
   </body>
   </html>
   ```

3. **Check only for component-specific prefixes**:
   - Look for: `[spectrum-wallpaper]`, `[spectrum-theme]`, etc.
   - Ignore: Any logs without component prefixes

## Best Practices

### Development

1. **Enable debug during development** to understand component behavior:
   ```html
   <spectrum-wallpaper debug background="url('image.jpg')">
   ```

2. **Use debug to troubleshoot configuration issues**:
   - Invalid JSON strings in props
   - Missing required data structures
   - CORS issues with image loading

3. **Monitor console for warnings** that might indicate configuration problems

### Production

1. **Always remove debug attributes** before deploying to production:
   ```html
   <!-- Development -->
   <spectrum-wallpaper debug background="url('image.jpg')">
   
   <!-- Production -->
   <spectrum-wallpaper background="url('image.jpg')">
   ```

2. **Use build tools** to automatically strip debug attributes:
   ```javascript
   // Example webpack plugin configuration
   new HtmlWebpackPlugin({
     minify: {
       removeAttributeQuotes: true,
       removeEmptyAttributes: true,
       // Custom function to remove debug attributes
       customAttrSurround: [
         [/debug/, /=\"\"/]
       ]
     }
   })
   ```

### Development Tools

You can filter debug logs in browser developer tools:

1. **Chrome DevTools**:
   - Filter by `[spectrum-` to see all Spectrum debug logs
   - Filter by `[spectrum-wallpaper]` to see only wallpaper logs

2. **Firefox Developer Tools**:
   - Use the search box to filter by component name
   - Set console preferences to show different log levels

## Performance Considerations

- Debug logging has minimal performance impact when disabled (default state)
- When enabled, there's a small overhead from string formatting and console operations
- Components check the debug flag before performing any logging operations
- No debug logging code is executed in production when the flag is false

## Integration with Development Workflow

### With Storybook

Enable debug logging in Storybook stories to test component behavior:

```javascript
export const WithDebug = {
  args: {
    debug: true,
    background: 'url("https://example.com/image.jpg")'
  }
};
```

### With Unit Tests

Mock console methods to test debug output:

```javascript
describe('SpectrumWallpaper Debug', () => {
  let consoleSpy;
  
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  it('should log debug information when debug is enabled', () => {
    const component = new SpectrumWallpaper();
    component.debug = true;
    // ... test component behavior
    expect(consoleSpy).toHaveBeenCalledWith('[spectrum-wallpaper] ...');
  });
});
```

## Troubleshooting Common Issues

### Spectrum-Wallpaper Debug Not Working

If you're not seeing debug output from the wallpaper component, try these steps:

1. **Verify the debug attribute is set correctly**:
   ```html
   <!-- Correct ways to enable debug -->
   <spectrum-wallpaper debug background="url('image.jpg')">
   <spectrum-wallpaper debug="true" background="#ff5722">
   <spectrum-wallpaper debug background="linear-gradient(45deg, #ff0000, #0000ff)">
   ```

2. **Check if the component is actually loading**:
   - Open browser DevTools (F12)
   - Look for the initial debug message: `[spectrum-wallpaper] Debug mode enabled - component initializing`
   - If you don't see this, the debug flag isn't being set properly

3. **Test with a simple background first**:
   ```html
   <spectrum-wallpaper debug background="#ff5722">
     <p>Test content</p>
   </spectrum-wallpaper>
   ```
   Expected output:
   ```
   [spectrum-wallpaper] Debug mode enabled - component initializing
   [spectrum-wallpaper] Extracting color from background string: #ff5722
   [spectrum-wallpaper] Updating theme with color: #ff5722
   [spectrum-wallpaper] Theme successfully applied with scheme: {...}
   [spectrum-wallpaper] Applying theme with custom properties: 24 properties
   ```

4. **Test with an image URL**:
   ```html
   <spectrum-wallpaper debug background="url('https://via.placeholder.com/800x600/1976d2/ffffff')">
     <p>Test content</p>
   </spectrum-wallpaper>
   ```

5. **Check console log levels**:
   - Make sure your browser console is showing `Info` level logs
   - In Chrome DevTools: Console → Log levels → ensure "Info" is checked
   - In Firefox: Console → Settings gear → ensure "Logs" is checked

6. **Framework-specific issues**:
   
   **React/Angular/Vue**:
   ```javascript
   // Make sure you're passing a boolean, not a string
   <spectrum-wallpaper debug={true} background="..." />
   // NOT: debug="true" (this passes a string)
   ```
   
   **Storybook**:
   ```javascript
   // In your story args
   export const WithDebug = {
     args: {
       debug: true,  // boolean, not string
       background: 'url("https://example.com/image.jpg")'
     }
   };
   ```

### No Debug Output

1. **Check the debug attribute is set**:
   ```html
   <spectrum-wallpaper debug background="...">
   ```

2. **Verify console is open** and appropriate log levels are enabled

3. **Check component documentation** to ensure the component supports debug logging

### Too Much Debug Output

1. **Use browser console filtering** to focus on specific components
2. **Enable debug only for problematic components** during development
3. **Consider using different debug flags** for different parts of your application

### Debug in Production

If you accidentally deploy with debug enabled:

1. **Update the component attributes** to remove debug
2. **Use browser extension** to temporarily disable console logging
3. **Implement a production check** in your build process to prevent this

## Contributing Debug Features

When adding debug logging to new components:

1. **Add a debug prop** with default value `false`
2. **Create debug utility methods** (debugLog, debugWarn, debugError)
3. **Use component-specific prefixes** in log messages: `[spectrum-component-name]`
4. **Document what gets logged** in the component's README
5. **Choose appropriate log levels** based on message severity
6. **Test debug output** in different scenarios

Example implementation:

```typescript
export class SpectrumNewComponent {
  @Prop() debug: boolean = false;

  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-new-component] ${message}`, ...args);
    }
  }

  private debugWarn(message: string, ...args: any[]) {
    if (this.debug) {
      console.warn(`[spectrum-new-component] ${message}`, ...args);
    }
  }
}
``` 