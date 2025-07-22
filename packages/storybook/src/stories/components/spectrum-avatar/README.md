# Spectrum Avatar

The avatar component provides versatile user profile visualization with support for images, initials, icons, and status indicators across multiple sizes and shapes.

## Features

🖼️ **Multiple Content Types** - Images, auto-generated initials, icons, or fallback person icon
🎨 **Dynamic Initials Coloring** - Unique, consistent colors generated from initials using Spectrum design tokens
📏 **Size Variations** - xs, sm, base, lg, xl for various interface density requirements  
🔷 **Shape Options** - circle, square, rounded for different visual contexts
🟢 **Status Indicators** - online, offline, busy, away with customizable visibility
♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard and screen reader support
🎯 **Interactive States** - Clickable with hover, active, disabled states and smooth transitions
⚡ **High Performance** - Optimized for frequent re-rendering and minimal memory usage

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Basic avatar with auto-generated initials -->
<spectrum-avatar label="John Doe"></spectrum-avatar>

<!-- Avatar with image -->
<spectrum-avatar
  src="https://example.com/profile.jpg"
  alt="Profile Picture"
  label="John Doe"
></spectrum-avatar>

<!-- Avatar with status indicator -->
<spectrum-avatar
  label="John Doe"
  show-status="true"
  status="online"
></spectrum-avatar>

<!-- Clickable avatar -->
<spectrum-avatar
  label="John Doe"
  clickable="true"
  action="profile-click"
></spectrum-avatar>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `debug` | `boolean` | `false` | Enable debug logging for development |
| `src` | `string` | `""` | Image source URL for the avatar |
| `alt` | `string` | `""` | Alt text for the avatar image |
| `initials` | `string` | `""` | Initials to display (overrides auto-generation) |
| `icon` | `string` | `""` | Material icon name to display |
| `label` | `string` | `""` | Label for accessibility and auto-generating initials |
| `avatarId` | `string` | `""` | Unique identifier for the avatar |
| `size` | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` | Size of the avatar |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'circle'` | Shape of the avatar |
| `variant` | `'default' \| 'outlined' \| 'filled'` | `'default'` | Visual variant of the avatar |
| `status` | `'none' \| 'online' \| 'offline' \| 'busy' \| 'away'` | `'none'` | Status indicator type |
| `showStatus` | `boolean` | `false` | Show status indicator |
| `clickable` | `boolean` | `false` | Makes the avatar clickable |
| `disabled` | `boolean` | `false` | Disable the avatar interactions |
| `action` | `string` | `""` | Action identifier for event emission |
| `customStyle` | `object` | `{}` | Custom CSS styles object |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `avatarAction` | `CustomEvent<{action?: string; label?: string; id?: string}>` | Emitted when clickable avatar is clicked |

### Content Priority

The avatar displays content in this priority order:

1. **Image** (if `src` is provided and loads successfully)
2. **Icon** (if `icon` is provided)
3. **Initials** (if `initials` provided or auto-generated from `label`)
4. **Fallback** (person icon)

### Auto-Generated Initials

When no explicit `initials` are provided, the component automatically generates them from the `label`:

- "John Doe" → "JD"
- "Mary Jane Watson" → "MW" (Mary + Watson)
- "SingleName" → "S"

Each set of initials gets a unique, consistent color based on a hash function, ensuring the same initials always have the same color.

## Examples

### Size Variations

```html
<spectrum-avatar size="xs" label="XS"></spectrum-avatar>
<spectrum-avatar size="sm" label="SM"></spectrum-avatar>
<spectrum-avatar size="base" label="Base"></spectrum-avatar>
<spectrum-avatar size="lg" label="LG"></spectrum-avatar>
<spectrum-avatar size="xl" label="XL"></spectrum-avatar>
```

### Shape Variations

```html
<spectrum-avatar shape="circle" label="Circle"></spectrum-avatar>
<spectrum-avatar shape="square" label="Square"></spectrum-avatar>
<spectrum-avatar shape="rounded" label="Rounded"></spectrum-avatar>
```

### Status Indicators

```html
<spectrum-avatar label="User" show-status="true" status="online"></spectrum-avatar>
<spectrum-avatar label="User" show-status="true" status="offline"></spectrum-avatar>
<spectrum-avatar label="User" show-status="true" status="busy"></spectrum-avatar>
<spectrum-avatar label="User" show-status="true" status="away"></spectrum-avatar>
```

### Interactive States

```html
<!-- Clickable avatar -->
<spectrum-avatar
  label="John Doe"
  clickable="true"
  action="profile-click"
></spectrum-avatar>

<!-- Disabled avatar -->
<spectrum-avatar
  label="John Doe"
  clickable="true"
  disabled="true"
></spectrum-avatar>
```

## Accessibility

The avatar component follows WCAG 2.1 AA guidelines:

- **Keyboard Navigation**: Clickable avatars are focusable and respond to Enter/Space keys
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **Color Contrast**: All text and status indicators meet contrast requirements
- **Focus Management**: Clear focus indicators and logical tab order

## Best Practices

### Do ✅

- Use meaningful labels for accessibility
- Provide alt text when using images
- Use appropriate sizes for your interface density
- Implement status indicators for real-time user presence
- Use consistent shapes across your application

### Don't ❌

- Don't use avatars for non-user content
- Don't rely solely on color for status indication
- Don't make non-clickable avatars appear interactive
- Don't use extremely small sizes for important user identification
- Don't forget to handle image loading failures

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Images are preloaded and cached appropriately
- Initials colors are generated once and cached
- Component handles image loading states gracefully
- Minimal DOM manipulation for optimal performance 