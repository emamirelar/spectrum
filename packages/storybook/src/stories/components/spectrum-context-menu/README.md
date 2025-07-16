# Spectrum Context Menu

A flexible, accessible context menu component for contextual actions and dropdown menus. Part of the Spectrum Design System.

## Features

✨ **Smart Positioning** - Automatic positioning with viewport edge detection and collision avoidance
🎯 **Rich Actions** - Icons, labels, keyboard shortcuts, and nested submenus
🎨 **Multiple Variants** - Context menu, dropdown, and action menu styles
📏 **Flexible Sizing** - Responsive width and height with overflow handling
♿ **Accessibility First** - Full keyboard navigation, focus management, and screen reader support
🔄 **Dynamic Content** - Programmatic menu updates and conditional item visibility

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Simple context menu -->
<spectrum-context-menu>
  <spectrum-context-menu-item label="Copy" icon="content_copy" action="copy"></spectrum-context-menu-item>
  <spectrum-context-menu-item label="Paste" icon="content_paste" action="paste"></spectrum-context-menu-item>
  <spectrum-context-menu-item type="separator"></spectrum-context-menu-item>
  <spectrum-context-menu-item label="Delete" icon="delete" action="delete"></spectrum-context-menu-item>
</spectrum-context-menu>

<!-- Context menu with keyboard shortcuts -->
<spectrum-context-menu>
  <spectrum-context-menu-item label="Cut" icon="content_cut" action="cut" shortcut="Ctrl+X"></spectrum-context-menu-item>
  <spectrum-context-menu-item label="Copy" icon="content_copy" action="copy" shortcut="Ctrl+C"></spectrum-context-menu-item>
  <spectrum-context-menu-item label="Paste" icon="content_paste" action="paste" shortcut="Ctrl+V"></spectrum-context-menu-item>
</spectrum-context-menu>

<!-- Dropdown menu with nested items -->
<spectrum-context-menu variant="dropdown" trigger="click">
  <spectrum-context-menu-item label="File" expandable="true">
    <spectrum-context-menu-item label="New" icon="add" action="new"></spectrum-context-menu-item>
    <spectrum-context-menu-item label="Open" icon="folder_open" action="open"></spectrum-context-menu-item>
    <spectrum-context-menu-item label="Save" icon="save" action="save"></spectrum-context-menu-item>
  </spectrum-context-menu-item>
  <spectrum-context-menu-item label="Edit" expandable="true">
    <spectrum-context-menu-item label="Undo" icon="undo" action="undo"></spectrum-context-menu-item>
    <spectrum-context-menu-item label="Redo" icon="redo" action="redo"></spectrum-context-menu-item>
  </spectrum-context-menu-item>
</spectrum-context-menu>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'context' \| 'dropdown' \| 'action'` | `'context'` | Menu style variant |
| `trigger` | `'contextmenu' \| 'click' \| 'hover'` | `'contextmenu'` | How menu is triggered |
| `position` | `'auto' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'auto'` | Menu positioning |
| `offset` | `number` | `8` | Distance from trigger element (px) |
| `closeOnSelect` | `boolean` | `true` | Close menu when item is selected |
| `closeOnClickOutside` | `boolean` | `true` | Close menu when clicking outside |
| `maxWidth` | `number` | `320` | Maximum menu width (px) |
| `maxHeight` | `number` | `400` | Maximum menu height (px) |
| `disabled` | `boolean` | `false` | Whether menu is disabled |
| `target` | `string \| HTMLElement` | `''` | Target element for positioning |

### Menu Item Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Display text for the item |
| `icon` | `string` | `''` | Leading icon (Material Design) |
| `action` | `string` | `''` | Action identifier |
| `shortcut` | `string` | `''` | Keyboard shortcut display |
| `type` | `'item' \| 'separator' \| 'header'` | `'item'` | Item type |
| `expandable` | `boolean` | `false` | Whether item has submenu |
| `disabled` | `boolean` | `false` | Whether item is disabled |
| `selected` | `boolean` | `false` | Whether item is selected |
| `danger` | `boolean` | `false` | Whether item represents destructive action |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `menuAction` | `CustomEvent<{action: string, label: string, id: string}>` | Fired when menu item is clicked |
| `menuOpen` | `CustomEvent<{}>` | Fired when menu opens |
| `menuClose` | `CustomEvent<{}>` | Fired when menu closes |
| `itemHover` | `CustomEvent<{action: string, label: string}>` | Fired when item is hovered |
| `submenuOpen` | `CustomEvent<{action: string, label: string}>` | Fired when submenu opens |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `show(x?: number, y?: number)` | `x?, y?` | `void` | Show menu at coordinates |
| `hide()` | - | `void` | Hide menu |
| `addItem(item: ContextMenuAction)` | `item` | `void` | Add menu item |
| `removeItem(action: string)` | `action` | `void` | Remove menu item by action |
| `updateItem(action: string, updates: Partial<ContextMenuAction>)` | `action, updates` | `void` | Update menu item |
| `getItems()` | - | `ContextMenuAction[]` | Get all menu items |

## TypeScript Interface

```typescript
export interface ContextMenuAction {
  label: string;
  action: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
  submenu?: ContextMenuAction[];
}
```

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--menu-background` | `var(--spectrum-sys-color-surface)` | Menu background color |
| `--menu-border` | `1px solid var(--spectrum-sys-color-outline)` | Menu border |
| `--menu-border-radius` | `var(--spectrum-sys-shape-corner-medium)` | Menu border radius |
| `--menu-shadow` | `var(--spectrum-sys-elevation-2)` | Menu shadow |
| `--item-padding` | `var(--spectrum-sys-spacing-small) var(--spectrum-sys-spacing)` | Item padding |
| `--item-gap` | `var(--spectrum-sys-spacing-small)` | Gap between icon and text |
| `--item-hover-background` | `var(--spectrum-sys-color-surface-hover)` | Item hover state |
| `--item-selected-background` | `var(--spectrum-sys-color-primary-container)` | Selected item background |
| `--item-disabled-opacity` | `0.5` | Disabled item opacity |
| `--item-danger-color` | `var(--spectrum-sys-color-error)` | Danger item color |

## Advanced Usage

### Dynamic Menu Creation

```javascript
// Create context menu programmatically
const menu = document.createElement('spectrum-context-menu');

// Add items dynamically
menu.addItem({
  label: 'New Action',
  action: 'new-action',
  icon: 'add',
  shortcut: 'Ctrl+N'
});

// Listen for actions
menu.addEventListener('menuAction', (e) => {
  const { action, label } = e.detail;
  console.log(`Action: ${action}, Label: ${label}`);
});

// Show at specific coordinates
menu.show(100, 200);
```

### Integration with Other Components

```javascript
// Attach to any element
const targetElement = document.querySelector('.my-element');
const menu = document.querySelector('spectrum-context-menu');

targetElement.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  menu.show(e.clientX, e.clientY);
});
```

### Conditional Menu Items

```javascript
// Update menu based on context
function updateContextMenu(selectedItems) {
  const menu = document.querySelector('spectrum-context-menu');
  
  if (selectedItems.length > 1) {
    menu.addItem({
      label: 'Bulk Actions',
      action: 'bulk',
      icon: 'select_all'
    });
  } else {
    menu.removeItem('bulk');
  }
}
```

## Variants

### Context Menu
Traditional right-click context menu with smart positioning.

### Dropdown Menu
Click-triggered dropdown menu attached to buttons or inputs.

### Action Menu
Compact action menu for toolbars and limited space areas.

## Positioning

The component automatically handles positioning with:
- **Viewport Detection**: Prevents menu from appearing outside viewport
- **Collision Avoidance**: Adjusts position when near edges
- **Smart Fallbacks**: Uses alternative positions when primary position is blocked
- **Responsive Behavior**: Adapts to different screen sizes

## Accessibility

### Keyboard Navigation
- **Arrow Keys**: Navigate between items
- **Enter/Space**: Activate selected item
- **Escape**: Close menu
- **Tab**: Move to next focusable element outside menu
- **Right Arrow**: Open submenu (if available)
- **Left Arrow**: Close submenu and return to parent

### Screen Reader Support
- Proper ARIA roles and labels
- Announces menu state changes
- Indicates item states (disabled, selected)
- Communicates keyboard shortcuts

### Focus Management
- Focus trapped within open menu
- Focus returns to trigger element on close
- Visual focus indicators
- Logical focus order

## Related Components

- **spectrum-collapsible-list**: Uses context menu for item actions
- **spectrum-rail**: Integrates context menu for navigation actions

## Migration Notes

### From Other Menu Components
When migrating from other menu systems:
1. Update event handlers to use new event structure with `action` attribute
2. Replace menu item structure with new properties
3. Update CSS custom properties for styling
4. Test keyboard navigation and accessibility

### Performance Considerations
- Lazy load submenu content for large menus
- Use virtual scrolling for menus with >100 items
- Debounce hover events for better performance
- Cache menu positioning calculations

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Examples

See the **Examples** section in Storybook for comprehensive usage patterns including:
- Basic context menus
- Dropdown implementations
- Nested menu structures
- Dynamic menu management
- Integration patterns

---

**Part of Spectrum Design System** • [View Source](../../packages/core/src/components/spectrum-context-menu/) • [Report Issues](../../issues) 