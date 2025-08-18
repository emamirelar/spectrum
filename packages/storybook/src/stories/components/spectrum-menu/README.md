# Spectrum Menu

A responsive and accessible navigation menu component with flexible layout options, mobile support, and brand integration capabilities.

## Features

🎨 **Flexible Navigation Layout** - Separate left/right navigation sections with centered logo slot
📱 **Mobile Touch-Friendly** - Always-visible submenus on mobile (no hover required)
♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard and screen reader support  
🎯 **Smart Positioning** - Intelligent edge clipping prevention for submenus
🌐 **Megamenu Support** - Rich content dropdowns with descriptions and icons
⚡ **High Performance** - Optimized for frequent re-rendering and minimal memory usage

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Basic horizontal menu -->
<spectrum-menu
  orientation="horizontal"
  items='[
    {"label": "Home", "href": "/", "icon": "home"},
    {"label": "About", "href": "/about", "icon": "info"},
    {"label": "Contact", "href": "/contact", "icon": "contact_mail"}
  ]'
></spectrum-menu>

<!-- Navigation with Logo Layout -->
<spectrum-menu
  orientation="horizontal"
  left-items='[
    {"label": "Home", "href": "/", "icon": "home"},
    {"label": "About", "href": "/about", "icon": "info"}
  ]'
  right-items='[
    {"label": "Login", "href": "/login", "icon": "login"},
    {"label": "Account", "href": "/account", "icon": "account_circle"}
  ]'
  mobile-menu-title="Main Navigation"
  mobile-icon-color="#ffffff"
>
  <!-- Desktop logo (full size) -->
  <img slot="logo" src="./logo.svg" alt="Company Logo" style="height: 40px;" />
  
  <!-- Mobile logo (compact version, optional) -->
  <img slot="mobile-nav-logo" src="./logo-mobile.svg" alt="Company" style="height: 32px;" />
</spectrum-menu>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Menu layout orientation |
| `variant` | `'default' \| 'megamenu'` | `'default'` | Menu variant affecting dropdown style |
| `items` | `Array<MenuItem> \| string` | `[]` | Standard menu items configuration |
| `leftItems` | `Array<MenuItem> \| string` | `[]` | Left navigation items for logo layout |
| `rightItems` | `Array<MenuItem> \| string` | `[]` | Right navigation items for logo layout |
| `mobileBreakpoint` | `number` | `768` | Screen width for mobile menu activation |
| `mobileMenuTitle` | `string` | `'Menu'` | Title displayed in mobile menu header |
| `directNavigation` | `boolean` | `false` | Enable direct browser navigation on item click |
| `navigationColor` | `string` | `undefined` | Override default menu text color |
| `mobileIconColor` | `string` | `'#000000'` | Color for mobile menu icons |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `itemClick` | `CustomEvent<{label: string, href?: string}>` | Emitted when menu item is clicked |

### Slots

| Slot | Description | Usage |
|------|-------------|-------|
| `logo` | **Desktop Logo** - Logo content for desktop navigation layout. Only displayed when `leftItems` or `rightItems` are provided. Centers between left and right navigation sections. | `<img slot="logo" src="./logo.svg" alt="Logo" style="height: 40px;" />` |
| `mobile-nav-logo` | **Mobile Logo** - Logo content specifically for mobile navigation bar. Shows when menu is closed (transparent background) and expanded (header). Falls back to `logo` slot if not provided. | `<img slot="mobile-nav-logo" src="./mobile-logo.svg" alt="Logo" style="height: 32px;" />` |

## Slot Usage Patterns

### Logo Integration

The menu component supports flexible logo integration with separate slots for desktop and mobile views:

#### Basic Logo Usage
```html
<!-- Single logo for both desktop and mobile -->
<spectrum-menu left-items='[...]' right-items='[...]'>
  <img slot="logo" src="./logo.svg" alt="Company Logo" style="height: 40px;" />
</spectrum-menu>
```

#### Responsive Logo Usage
```html
<!-- Different logos for desktop vs mobile -->
<spectrum-menu left-items='[...]' right-items='[...]'>
  <!-- Desktop: Full company logo -->
  <img slot="logo" src="./company-logo-full.svg" alt="Company Name" style="height: 40px;" />
  
  <!-- Mobile: Compact logo mark -->
  <img slot="mobile-nav-logo" src="./company-mark.svg" alt="Company" style="height: 32px;" />
</spectrum-menu>
```

#### Custom Logo Content
```html
<!-- Text-based or complex logos -->
<spectrum-menu left-items='[...]' right-items='[...]'>
  <!-- Desktop: Full branding -->
  <div slot="logo" style="display: flex; align-items: center; gap: 0.5rem;">
    <img src="./icon.svg" alt="" style="height: 32px;" />
    <span style="font-weight: bold; font-size: 1.2rem;">Company</span>
  </div>
  
  <!-- Mobile: Icon only -->
  <img slot="mobile-nav-logo" src="./icon.svg" alt="Company" style="height: 28px;" />
</spectrum-menu>
```

### Mobile Logo Behavior

- **When menu is closed:** `mobile-nav-logo` appears centered in transparent navigation bar
- **When menu is expanded:** `mobile-nav-logo` appears in the colored header alongside menu title
- **Fallback:** If `mobile-nav-logo` is not provided, the `logo` slot content is used
- **Centering:** Logo is automatically centered between hamburger button and invisible spacer

### Best Practices

- **Desktop Logo:** Use full company logo/wordmark (height: 32-48px recommended)
- **Mobile Logo:** Use compact logo mark or icon (height: 28-36px recommended)
- **Alt Text:** Always provide descriptive alt text for accessibility
- **Sizing:** Use CSS to constrain logo dimensions and prevent overflow
- **Responsive:** Consider different logo variants for different screen sizes

### CSS Custom Properties

| Property | Description |
|----------|-------------|
| `--menu-background` | Background color for the menu |
| `--menu-color` | Text color for menu items |
| `--menu-item-hover-background` | Background color for menu items on hover |
| `--menu-item-active-background` | Background color for active menu items |
| `--menu-border-radius` | Border radius for menu elements |
| `--menu-spacing` | Internal spacing unit |
| `--mobile-icon-color` | Color for mobile menu icons |

## Integration Patterns

### React Integration

```tsx
import React from 'react';

function NavigationHeader() {
  const leftNavItems = [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'About', href: '/about', icon: 'info' }
  ];
  
  const rightNavItems = [
    { label: 'Login', href: '/login', icon: 'login' },
    { label: 'Account', href: '/account', icon: 'account_circle' }
  ];

  return (
    <spectrum-menu
      orientation="horizontal"
      leftItems={leftNavItems}
      rightItems={rightNavItems}
      mobileMenuTitle="Main Navigation"
      mobileIconColor="#ffffff"
      onItemClick={(e) => console.log('Clicked:', e.detail)}
    >
      {/* Desktop logo */}
      <img slot="logo" src="/logo.svg" alt="Company Logo" style={{height: '40px'}} />
      
      {/* Mobile logo (optional) */}
      <img slot="mobile-nav-logo" src="/logo-mobile.svg" alt="Company" style={{height: '32px'}} />
    </spectrum-menu>
  );
}
```

### Vue Integration

```vue
<template>
  <spectrum-menu
    orientation="horizontal"
    :left-items="leftNavItems"
    :right-items="rightNavItems"
    mobile-menu-title="Main Navigation"
    mobile-icon-color="#ffffff"
    @itemClick="handleItemClick"
  >
    <!-- Desktop logo -->
    <img slot="logo" src="/logo.svg" alt="Company Logo" style="height: 40px;" />
    
    <!-- Mobile logo (optional) -->
    <img slot="mobile-nav-logo" src="/logo-mobile.svg" alt="Company" style="height: 32px;" />
  </spectrum-menu>
</template>

<script>
export default {
  data() {
    return {
      leftNavItems: [
        { label: 'Home', href: '/', icon: 'home' },
        { label: 'About', href: '/about', icon: 'info' }
      ],
      rightNavItems: [
        { label: 'Login', href: '/login', icon: 'login' }
      ]
    };
  },
  methods: {
    handleItemClick(event) {
      console.log('Clicked:', event.detail);
    }
  }
};
</script>
```

## Accessibility

The menu component follows WAI-ARIA best practices and provides comprehensive accessibility support:

### Screen Reader Support

- Semantic HTML elements (`nav`, `a`)
- Proper ARIA roles (`navigation`, `menuitem`, `menubar`)
- Screen reader-friendly labels and descriptions
- Clear focus indicators

```html
<!-- Accessible menu with ARIA labels -->
<spectrum-menu
  left-items='[{"label": "Home", "href": "/"}]'
  mobile-menu-title="Main Navigation"
  aria-label="Primary navigation"
>
  <img slot="logo" src="/logo.svg" alt="Company Logo" />
</spectrum-menu>
```

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between menu items
- **Enter/Space**: Activate menu items
- **Arrow Keys**: Navigate within menu levels
- **Escape**: Close mobile menu or submenus
- **Arrow Right**: Open submenus (desktop)
- **Arrow Left**: Close submenus and return to parent

### Mobile Accessibility Features

- **Touch-Friendly**: All submenu items are always visible (no hover required)
- **Proper Sizing**: Touch targets meet minimum 44px requirement
- **No Hover Dependencies**: All functionality accessible without hover
- **Logo Visibility**: Brand identity maintained in mobile header

## Performance

### Bundle Impact
- **Core component**: Lightweight and optimized
- **Runtime performance**: Fast initialization and smooth interactions
- **Memory usage**: Efficient memory management with minimal footprint
- **Mobile optimized**: Touch-friendly interactions with no hover dependencies

### Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | Latest | ✅ Full support |
| Firefox | Latest | ✅ Full support |
| Safari | Latest | ✅ Full support |
| Edge | Latest | ✅ Full support |

## Examples

See the [Storybook documentation](https://your-storybook-url.com/?path=/story/spectrum-components-spectrummenu) for interactive examples including:

- **Navigation with Logo**: Complete header layout with brand integration
- **Megamenu Demo**: Rich content dropdowns with descriptions
- **Mobile Responsive**: Touch-friendly mobile navigation
- **Edge Clipping Prevention**: Smart submenu positioning
- **Accessibility Demo**: Keyboard navigation and screen reader support

## Key Features Demonstrated

- ✅ **Flexible Layout**: Left items + Logo + Right items
- ✅ **Mobile Touch-Friendly**: Always-visible submenus  
- ✅ **Smart Positioning**: Edge clipping prevention
- ✅ **Brand Integration**: Logo slot for any content
- ✅ **Accessibility**: Full keyboard and screen reader support

## Related Components

- `spectrum-button` - Used for mobile hamburger toggle
- `spectrum-context-menu` - For contextual menu overlays  
- `spectrum-rail` - For sidebar navigation layouts

## Contributing

Please read our [Contributing Guide](../../../CONTRIBUTING.md) for information about reporting bugs, requesting features, and submitting pull requests.

## License

This component is part of the Spectrum Design System and is licensed under the [MIT License](../../../LICENSE).