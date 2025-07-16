# Spectrum Collapsible List

A hierarchical, interactive list component with expandable/collapsible nodes and context menu integration. Part of the Spectrum Design System.

## Features

✨ **Hierarchical Structure** - Nested list items with unlimited depth support
🖱️ **Context Menu Integration** - Right-click context menus for item actions
📏 **Flexible Sizing** - Responsive design with configurable item heights
🎯 **Selection States** - Single and multi-select capabilities with visual feedback
🔄 **Dynamic Content** - Add, remove, and modify list items programmatically
♿ **Accessibility First** - Full keyboard navigation and screen reader support

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Simple collapsible list -->
<spectrum-collapsible-list>
  <spectrum-collapsible-list-item label="Root Item" expandable="true">
    <spectrum-collapsible-list-item label="Child Item 1"></spectrum-collapsible-list-item>
    <spectrum-collapsible-list-item label="Child Item 2"></spectrum-collapsible-list-item>
  </spectrum-collapsible-list-item>
</spectrum-collapsible-list>

<!-- List with context menu -->
<spectrum-collapsible-list enableContextMenu="true">
  <spectrum-collapsible-list-item label="File Manager" expandable="true">
    <spectrum-collapsible-list-item label="Documents" icon="folder"></spectrum-collapsible-list-item>
    <spectrum-collapsible-list-item label="Images" icon="folder"></spectrum-collapsible-list-item>
  </spectrum-collapsible-list-item>
</spectrum-collapsible-list>

<!-- Navigation list -->
<spectrum-collapsible-list variant="navigation">
  <spectrum-collapsible-list-item label="Dashboard" icon="dashboard"></spectrum-collapsible-list-item>
  <spectrum-collapsible-list-item label="Settings" icon="settings" expandable="true">
    <spectrum-collapsible-list-item label="Profile" icon="person"></spectrum-collapsible-list-item>
    <spectrum-collapsible-list-item label="Security" icon="security"></spectrum-collapsible-list-item>
  </spectrum-collapsible-list-item>
</spectrum-collapsible-list>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'navigation' \| 'file-tree' \| 'menu'` | `'default'` | Visual style variant |
| `enableContextMenu` | `boolean` | `false` | Enable right-click context menus |
| `selectable` | `boolean` | `false` | Allow item selection |
| `multiSelect` | `boolean` | `false` | Allow multiple item selection |
| `expandIcon` | `string` | `'expand_more'` | Icon for expandable items |
| `collapseIcon` | `string` | `'expand_less'` | Icon for collapsible items |
| `indent` | `number` | `24` | Indentation per nesting level (px) |
| `itemHeight` | `number` | `48` | Height of list items (px) |
| `density` | `'compact' \| 'comfortable' \| 'spacious'` | `'comfortable'` | List density |

### List Item Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | `string` | `''` | Display text for the item |
| `icon` | `string` | `''` | Leading icon (Material Design) |
| `expandable` | `boolean` | `false` | Whether item can expand/collapse |
| `expanded` | `boolean` | `false` | Current expansion state |
| `selected` | `boolean` | `false` | Current selection state |
| `disabled` | `boolean` | `false` | Whether item is disabled |
| `level` | `number` | `0` | Nesting depth level |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `itemAction` | `CustomEvent<{action: string, label: string, id: string}>` | Fired when item is clicked or activated |
| `itemExpanded` | `CustomEvent<{action: 'expand', label: string, id: string}>` | Fired when item is expanded |
| `itemCollapsed` | `CustomEvent<{action: 'collapse', label: string, id: string}>` | Fired when item is collapsed |
| `itemSelected` | `CustomEvent<{action: 'select', label: string, id: string, selected: boolean}>` | Fired when item selection changes |
| `contextMenuAction` | `CustomEvent<{action: string, label: string, id: string}>` | Fired when context menu item is clicked |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `expandItem(id: string)` | `id: string` | `void` | Expand specific item |
| `collapseItem(id: string)` | `id: string` | `void` | Collapse specific item |
| `selectItem(id: string)` | `id: string` | `void` | Select specific item |
| `deselectItem(id: string)` | `id: string` | `void` | Deselect specific item |
| `getSelectedItems()` | - | `string[]` | Get array of selected item IDs |
| `expandAll()` | - | `void` | Expand all expandable items |
| `collapseAll()` | - | `void` | Collapse all expanded items |

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--list-background` | `var(--spectrum-sys-color-surface)` | List background color |
| `--list-border-radius` | `var(--spectrum-sys-shape-corner-medium)` | List border radius |
| `--item-padding` | `var(--spectrum-sys-spacing-small)` | Item padding |
| `--item-gap` | `var(--spectrum-sys-spacing-x-small)` | Gap between icon and text |
| `--item-hover-background` | `var(--spectrum-sys-color-surface-hover)` | Item hover state |
| `--item-selected-background` | `var(--spectrum-sys-color-primary-container)` | Selected item background |
| `--item-text-color` | `var(--spectrum-sys-color-on-surface)` | Item text color |
| `--item-icon-color` | `var(--spectrum-sys-color-on-surface-variant)` | Item icon color |

## Advanced Usage

### Dynamic List Management

```javascript
// Get the list component
const list = document.querySelector('spectrum-collapsible-list');

// Listen for item actions
list.addEventListener('itemAction', (e) => {
  const { action, label, id } = e.detail;
  console.log(`Item ${label} performed action: ${action}`);
});

// Programmatically expand/collapse
list.expandItem('item-1');
list.collapseItem('item-2');

// Handle selections
list.addEventListener('itemSelected', (e) => {
  const selectedItems = list.getSelectedItems();
  console.log('Currently selected:', selectedItems);
});
```

### Context Menu Integration

```javascript
// Configure context menu actions
const list = document.querySelector('spectrum-collapsible-list');
list.enableContextMenu = true;

list.addEventListener('contextMenuAction', (e) => {
  const { action, label, id } = e.detail;
  
  switch (action) {
    case 'rename':
      // Handle rename action
      break;
    case 'delete':
      // Handle delete action
      break;
    case 'copy':
      // Handle copy action
      break;
  }
});
```

## Variants

### Default
Standard list appearance with minimal styling.

### Navigation
Optimized for navigation menus with enhanced visual hierarchy.

### File Tree
File explorer style with appropriate icons and spacing.

### Menu
Dropdown menu style with compact spacing and menu-specific interactions.

## Accessibility

### Keyboard Navigation
- **Arrow Keys**: Navigate between items
- **Enter/Space**: Activate selected item
- **Right Arrow**: Expand item (if expandable)
- **Left Arrow**: Collapse item (if expanded)
- **Tab**: Move to next focusable element
- **Shift+Tab**: Move to previous focusable element

### Screen Reader Support
- Items have proper ARIA labels and roles
- Expansion state is announced
- Selection state is communicated
- Context menu availability is indicated

### Focus Management
- Clear focus indicators
- Logical tab order
- Focus remains on keyboard-activated items
- Focus restoration after context menu actions

## Related Components

- **spectrum-context-menu**: Provides context menu functionality
- **spectrum-rail**: Uses collapsible list for navigation structure

## Migration Notes

### From Other List Components
When migrating from standard list components:
1. Wrap items in `spectrum-collapsible-list-item` components
2. Add `expandable="true"` for items with children
3. Configure context menus if needed
4. Update event handlers to use new event structure

### Performance Considerations
- Virtual scrolling for large lists (>1000 items)
- Lazy loading for deep hierarchies
- Debounced search and filtering
- Minimal re-rendering on state changes

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Examples

See the **Examples** section in Storybook for comprehensive usage patterns including:
- Basic hierarchical lists
- File management systems
- Navigation menus
- Content organization
- Integration patterns

---

**Part of Spectrum Design System** • [View Source](../../packages/core/src/components/spectrum-collapsible-list/) • [Report Issues](../../issues) 