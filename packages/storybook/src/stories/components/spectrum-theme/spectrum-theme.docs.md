# Spectrum Theme Component

The `spectrum-theme` component provides theming capabilities for your application.
It generates a complete Material Design 3 color scheme from a single primary color,
and exposes CSS variables for colors, spacing, typography, and effects.

## Getting Started

First, wrap your application with the `spectrum-theme` component:

```html
<spectrum-theme>
  <your-app></your-app>
</spectrum-theme>
```

## Usage Scenarios

### 1. Basic Usage (Default Theme)
```html
<spectrum-theme>
  <your-app></your-app>
</spectrum-theme>
```

### 2. Custom Primary Color
```html
<spectrum-theme color="#0070d2">
  <your-app></your-app>
</spectrum-theme>
```

### 3. Dark Mode
```html
<spectrum-theme dark>
  <your-app></your-app>
</spectrum-theme>
```

### 4. Custom Theme Configuration
```html
<spectrum-theme config='{"colors":{"primary":"#ff0000"},"spacing":{"base":"16px"}}'>
  <your-app></your-app>
</spectrum-theme>
```

### 5. Dynamic Theme Changes
```js
// Change primary color
const theme = document.querySelector('spectrum-theme');
theme.color = '#ff0000';

// Toggle dark mode
theme.dark = !theme.dark;

// Update theme configuration
theme.config = JSON.stringify({
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00'
  },
  spacing: {
    base: '16px'
  }
});
```

## Using Theme Variables in Your Components

Access theme variables in your CSS:

```css
.my-component {
  /* Colors */
  background-color: var(--spectrum-color-surface);
  color: var(--spectrum-color-on-surface);

  /* Spacing */
  padding: var(--spectrum-sys-spacing);
  margin-bottom: var(--spectrum-sys-spacing-large);

  /* Typography */
  font-family: var(--spectrum-sys-font-family);
  font-size: var(--spectrum-sys-font-size);
  font-weight: var(--spectrum-sys-font-weight-bold);

  /* Effects */
  box-shadow: 0 2px 4px var(--spectrum-color-shadow);
  transition: all var(--spectrum-sys-animation-duration) var(--spectrum-sys-animation-timing-function);
}
```

## Theme Configuration Options

The `config` property accepts a JSON string with the following structure:

```json
{
  "colors": {
    "primary": "#ff0000",
    "secondary": "#00ff00",
    "surface": "#ffffff",
    "background": "#f5f5f5"
  },
  "spacing": {
    "base": "16px",
    "small": "8px",
    "large": "24px",
    "x-large": "32px"
  },
  "typography": {
    "font-family": "Arial, sans-serif",
    "font-size": "16px",
    "font-weight-bold": "700"
  },
  "effects": {
    "animation-duration": "200ms",
    "border-radius": "8px"
  }
}
```

## Available Theme Variables

### Colors
- `--spectrum-color-primary` - Primary brand color
- `--spectrum-color-on-primary` - Text/icons on primary color
- `--spectrum-color-secondary` - Secondary brand color
- `--spectrum-color-on-secondary` - Text/icons on secondary color
- `--spectrum-color-surface` - Surface color for cards, dialogs
- `--spectrum-color-on-surface` - Text/icons on surface color
- `--spectrum-color-background` - Page background color
- `--spectrum-color-on-background` - Text/icons on background color

### Spacing
- `--spectrum-sys-spacing-small` - Small spacing (8px)
- `--spectrum-sys-spacing` - Base spacing (16px)
- `--spectrum-sys-spacing-large` - Large spacing (24px)
- `--spectrum-sys-spacing-x-large` - Extra large spacing (32px)

### Typography
- `--spectrum-sys-font-family` - System font stack
- `--spectrum-sys-font-size` - Base font size (16px)
- `--spectrum-sys-font-size-small` - Small text (14px)
- `--spectrum-sys-font-size-large` - Large text (20px)
- `--spectrum-sys-font-size-x-large` - Extra large text (24px)
- `--spectrum-sys-font-weight-regular` - Regular font weight (400)
- `--spectrum-sys-font-weight-bold` - Bold font weight (700)

### Effects
- `--spectrum-color-shadow` - Shadow color
- `--spectrum-sys-animation-duration` - Default animation duration
- `--spectrum-sys-animation-timing-function` - Default easing function 