# Spectrum Context Menu

The Context Menu component provides a popup menu of actions that can be triggered from any UI element.

## Features

- Displays a list of actions with icons and labels
- Positions itself relative to a trigger element 
- Supports multiple positioning options (left, right, top, bottom)
- Automatically adjusts to stay within the viewport
- Provides hover and active states for menu items
- Built with Material Icons support
- Can be used standalone or with other components like the Collapsible List

## Usage

The Context Menu component is designed to be triggered by another element and display a list of actions. It's commonly used for contextual operations on UI elements.

Basic example:

```tsx
<spectrum-context-menu
  actions={[
    { label: 'Edit', icon: 'edit', value: 'edit' },
    { label: 'Delete', icon: 'delete', value: 'delete' }
  ]}
  targetKey="item-1"
  position="right"
></spectrum-context-menu>
```

### Programmatic Control

The component provides methods to control it programmatically:

```js
// Get a reference to the menu
const menu = document.querySelector('spectrum-context-menu');

// Set the trigger element
const trigger = document.querySelector('#trigger-button');
await menu.setTriggerRef(trigger);

// Open the menu
await menu.open();

// Position at specific coordinates
await menu.positionAtCoordinates(x, y);

// Close the menu
await menu.close();
```

## API Reference

### Properties

| Property    | Attribute    | Description                                    | Type                                   | Default   |
| ----------- | ------------ | ---------------------------------------------- | -------------------------------------- | --------- |
| `actions`   | `actions`    | Array of action items to display in the menu   | `ContextMenuAction[]`                  | `[]`      |
| `targetKey` | `target-key` | Identifier for the target that triggered menu  | `string`                               | `''`      |
| `isOpen`    | `is-open`    | Whether the menu is currently open             | `boolean`                              | `false`   |
| `position`  | `position`   | Position relative to the trigger element       | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |

### Events

| Event          | Description                                | Type                                     |
| -------------- | ------------------------------------------ | ---------------------------------------- |
| `action-click` | Emitted when an action item is clicked     | `CustomEvent<{value: string, targetKey: string}>` |
| `menu-close`   | Emitted when the menu is closed            | `CustomEvent<void>`                      |

### Methods

| Method                  | Description                                  | Parameters                           |
| ----------------------- | -------------------------------------------- | ------------------------------------ |
| `setTriggerRef`         | Sets the reference to the trigger element    | `element: HTMLElement`               |
| `open`                  | Opens the menu                               | -                                    |
| `close`                 | Closes the menu                              | -                                    |
| `positionAtCoordinates` | Positions the menu at specific coordinates   | `x: number, y: number`              |

## Integration with Collapsible List

The Context Menu integrates seamlessly with the Collapsible List component:

```tsx
<spectrum-collapsible-list
  items={listItems}
  contextActions={[
    { label: 'Edit', icon: 'edit', value: 'edit' },
    { label: 'Delete', icon: 'delete', value: 'delete' }
  ]}
></spectrum-collapsible-list>
```

## Accessibility

- The menu has proper role attributes for screen readers
- Focus management for keyboard navigation
- Closes when clicking outside or pressing Escape
- Proper contrast for visibility

## Customizing Appearance

The component uses CSS custom properties that can be customized:

```css
spectrum-context-menu {
  --context-menu-background: #ffffff;
  --context-menu-color: #333333;
  --context-menu-border-radius: 4px;
  --context-menu-item-hover-background: rgba(0, 0, 0, 0.03);
}
``` 