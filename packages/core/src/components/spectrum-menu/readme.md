# Spectrum Menu

A responsive and accessible menu component that can be displayed horizontally or vertically, with mobile support and megamenu variant.

## Features

- Horizontal and vertical orientation
- **Megamenu variant** with full-width dropdowns and rich content
- Responsive design with mobile hamburger menu
- Accessible keyboard navigation
- Support for Material icons (see below)
- Nested submenus with descriptions (megamenu variant)
- Disabled state support
- Customizable styling through CSS variables

## Usage

> **Note:** You must include the [Material Icons font](https://fonts.googleapis.com/icon?family=Material+Icons) in your app or Storybook for icons to display:
>
> ```html
> <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
> ```

### Default Menu
```html
<spectrum-menu
  orientation="horizontal"
  variant="default"
  mobile-breakpoint="768"
  items='[
    {
      "label": "Home",
      "href": "/",
      "icon": "home"
    },
    {
      "label": "Products",
      "href": "/products",
      "icon": "inventory_2",
      "children": [
        {
          "label": "Category 1",
          "href": "/products/category-1",
          "icon": "category"
        },
        {
          "label": "Category 2",
          "href": "/products/category-2",
          "icon": "category"
        }
      ]
    },
    {
      "label": "About",
      "href": "/about",
      "icon": "info"
    },
    {
      "label": "Disabled Item",
      "href": "/disabled",
      "icon": "block",
      "disabled": true
    }
  ]'
></spectrum-menu>
```

### Megamenu Variant
```html
<spectrum-menu
  orientation="horizontal"
  variant="megamenu"
  mobile-breakpoint="768"
  items='[
    {
      "label": "Products",
      "href": "/products",
      "icon": "inventory_2",
      "children": [
        {
          "label": "Electronics",
          "href": "/products/electronics",
          "icon": "devices",
          "description": "Latest gadgets and electronic devices",
          "children": [
            {
              "label": "Smartphones",
              "href": "/products/electronics/phones",
              "icon": "smartphone",
              "description": "Latest mobile phones and accessories"
            },
            {
              "label": "Laptops",
              "href": "/products/electronics/laptops",
              "icon": "laptop",
              "description": "High-performance laptops and notebooks"
            }
          ]
        }
      ]
    }
  ]'
></spectrum-menu>
```

### Direct Navigation
```html
<!-- Default behavior: Only emits events when items are clicked -->
<spectrum-menu
  orientation="horizontal"
  directNavigation="false"
  items='[
    {
      "label": "Home",
      "href": "/home",
      "icon": "home"
    },
    {
      "label": "About",
      "href": "/about",
      "icon": "info"
    }
  ]'
></spectrum-menu>

<!-- Direct navigation enabled: Automatically navigates to href URLs -->
<spectrum-menu
  orientation="horizontal"
  directNavigation="true"
  items='[
    {
      "label": "Google",
      "href": "https://www.google.com",
      "icon": "search"
    },
    {
      "label": "GitHub",
      "href": "https://www.github.com",
      "icon": "code"
    }
  ]'
></spectrum-menu>
```

## Properties

| Property | Attribute | Description | Type | Default |
|----------|-----------|-------------|------|---------|
| `orientation` | `orientation` | The orientation of the menu | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `items` | `items` | The menu items configuration. Can be provided as a JSON string or array of objects. Use the `icon` property for a Material icon name (e.g. "home", "info"). | `string \| Array<{ label: string; href?: string; icon?: string; disabled?: boolean; children?: Array<{ label: string; href?: string; icon?: string; disabled?: boolean; }>; }>` | `[]` |
| `mobileBreakpoint` | `mobile-breakpoint` | The breakpoint at which the menu switches to mobile view | `number` | `768` |
| `directNavigation` | `direct-navigation` | Whether to enable direct browser navigation when menu items are clicked. When true, clicking a menu item will navigate to its href in the current tab. When false, only the itemClick event will be emitted. | `boolean` | `false` |

## Events

| Event | Description | Type |
|-------|-------------|------|
| `itemClick` | Emitted when a menu item is clicked | `CustomEvent<{ label: string; href?: string; }>` |

## Methods

| Method | Description |
|--------|-------------|
| `close()` | Closes the mobile menu |

## CSS Custom Properties

| Property | Description | Default |
|----------|-------------|---------|
| `--spectrum-menu-item-padding` | Padding for menu items | `0.75rem 1rem` |
| `--spectrum-menu-item-color` | Color for menu items | `var(--spectrum-global-color-gray-700)` |
| `--spectrum-menu-item-hover-color` | Color for menu items on hover | `var(--spectrum-global-color-gray-900)` |
| `--spectrum-menu-item-active-color` | Color for active menu items | `var(--spectrum-global-color-blue-600)` |
| `--spectrum-menu-item-disabled-color` | Color for disabled menu items | `var(--spectrum-global-color-gray-400)` |
| `--spectrum-menu-background` | Background color for the menu | `var(--spectrum-global-color-gray-50)` |
| `--spectrum-menu-border-color` | Border color for the menu | `var(--spectrum-global-color-gray-200)` |
| `--spectrum-menu-shadow` | Box shadow for the menu | `0 2px 4px rgba(0, 0, 0, 0.1)` |

## Accessibility

The menu component follows WAI-ARIA best practices:

- Uses semantic HTML elements (`nav`, `a`)
- Implements proper ARIA roles (`navigation`, `menuitem`)
- Supports keyboard navigation
- Provides focus indicators
- Includes screen reader support
- Handles disabled states appropriately

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- [Material Icons font](https://fonts.googleapis.com/icon?family=Material+Icons) - for icon rendering



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description                                                                                                                                                                                                                                  | Type                                                                                                                                                                                                                                                                                                                       | Default        |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `directNavigation` | `direct-navigation` | Whether to enable direct browser navigation when menu items are clicked When true, clicking a menu item will navigate to its href in the current tab When false, only the itemClick event will be emitted                                    | `boolean`                                                                                                                                                                                                                                                                                                                  | `false`        |
| `items`            | `items`             | The menu items configuration Can be provided as a JSON string or array of objects icon: Material icon name (e.g. 'home', 'info', 'shopping_cart') For megamenu variant, children can have additional properties like description and columns | `string \| { label: string; href?: string; icon?: string; disabled?: boolean; description?: string; children?: { label: string; href?: string; icon?: string; disabled?: boolean; description?: string; children?: { label: string; href?: string; icon?: string; disabled?: boolean; description?: string; }[]; }[]; }[]` | `[]`           |
| `mobileBreakpoint` | `mobile-breakpoint` | The breakpoint at which the menu switches to mobile view                                                                                                                                                                                     | `number`                                                                                                                                                                                                                                                                                                                   | `768`          |
| `mobileMenuTitle`  | `mobile-menu-title` | The title displayed in the mobile menu header                                                                                                                                                                                                | `string`                                                                                                                                                                                                                                                                                                                   | `'Menu'`       |
| `navigationColor`  | `navigation-color`  | Navigation color for the menu text When provided, this will override the default theme color                                                                                                                                                 | `string`                                                                                                                                                                                                                                                                                                                   | `undefined`    |
| `orientation`      | `orientation`       | The orientation of the menu                                                                                                                                                                                                                  | `"horizontal" \| "vertical"`                                                                                                                                                                                                                                                                                               | `'horizontal'` |
| `variant`          | `variant`           | The variant of the menu                                                                                                                                                                                                                      | `"default" \| "megamenu"`                                                                                                                                                                                                                                                                                                  | `'default'`    |


## Events

| Event       | Description                               | Type                                             |
| ----------- | ----------------------------------------- | ------------------------------------------------ |
| `itemClick` | Event emitted when a menu item is clicked | `CustomEvent<{ label: string; href?: string; }>` |


## Methods

### `close() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------


