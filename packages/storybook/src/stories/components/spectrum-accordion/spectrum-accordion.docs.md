# Spectrum Accordion Component

The `spectrum-accordion` component provides collapsible content sections with smooth animations and configurable options. Perfect for "Dive Deeper" content, FAQ sections, and any collapsible content areas.

## Features

- **Configurable trigger**: Customizable label, icons, and styling
- **Sound support**: Optional audio feedback 
- **Scroll options**: Horizontal scrolling container or standard layout
- **Accessibility**: ARIA compliant with keyboard navigation
- **Theming**: Inherits from Spectrum design system
- **Events**: Emits toggle events for external state management

## Getting Started

Basic usage with horizontal scrolling content:

```html
<spectrum-accordion label="Dive Deeper">
  <spectrum-chip variant="secondary" label="Option 1" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 2" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 3" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

## Usage Scenarios

### 1. Default Horizontal Scroll
```html
<spectrum-accordion label="Explore Options" horizontalScroll="true">
  <spectrum-chip variant="secondary" label="Renewable Energy" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Solar Panels" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Wind Power" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

### 2. Vertical Stack Layout
```html
<spectrum-accordion label="Show All Options" horizontalScroll="false">
  <spectrum-chip variant="secondary" label="Option 1" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 2" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 3" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

### 3. Primary Variant
```html
<spectrum-accordion 
  label="Primary Action" 
  variant="primary" 
  outline="false">
  <spectrum-chip variant="primary" label="Important Option" leadingIcon="star"></spectrum-chip>
</spectrum-accordion>
```

### 4. Custom Icons
```html
<spectrum-accordion 
  label="Custom Configuration"
  collapsedIcon="add"
  expandedIcon="remove">
  <spectrum-chip variant="secondary" label="Configuration 1" leadingIcon="settings"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Configuration 2" leadingIcon="settings"></spectrum-chip>
</spectrum-accordion>
```

### 5. Expanded by Default
```html
<spectrum-accordion 
  label="Already Open"
  expanded="true">
  <spectrum-chip variant="secondary" label="Visible Option" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

### 6. With Sound Effects
```html
<spectrum-accordion 
  label="Sound Enabled"
  sound="true">
  <spectrum-chip variant="secondary" label="Audio Feedback" leadingIcon="volume_up" sound="true"></spectrum-chip>
</spectrum-accordion>
```

## Event Handling

The accordion emits an `accordionToggle` event when expanded or collapsed:

```javascript
document.querySelector('spectrum-accordion').addEventListener('accordionToggle', (event) => {
  const { expanded, accordionId } = event.detail;
  console.log(`Accordion ${accordionId} is now ${expanded ? 'expanded' : 'collapsed'}`);
});
```

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expanded` | boolean | `false` | Whether the accordion starts expanded |
| `label` | string | `'Dive Deeper'` | Text for the trigger button |
| `collapsedIcon` | string | `'arrow_drop_down'` | Icon to show when collapsed |
| `expandedIcon` | string | `'arrow_drop_up'` | Icon to show when expanded |
| `sound` | boolean | `false` | Enable sound effects |
| `horizontalScroll` | boolean | `true` | Enable horizontal scrolling layout |
| `disabled` | boolean | `false` | Disable user interaction |
| `variant` | `'primary'` \| `'secondary'` | `'secondary'` | Visual style variant |
| `outline` | boolean | `true` | Show outline on the trigger chip |
| `accordionId` | string | auto-generated | Unique identifier for events |
| `debug` | boolean | `false` | Enable debug logging |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `accordionToggle` | `{ expanded: boolean, accordionId: string }` | Fired when accordion is expanded or collapsed |

## CSS Custom Properties

The accordion component inherits from the Spectrum design system:

```css
/* Core colors */
--accordion-primary: var(--spectrum-color-primary, #0070d2);
--accordion-surface: var(--spectrum-color-surface, #f6f6f6);
--accordion-on-surface: var(--spectrum-color-on-surface, #333333);

/* Spacing */
--accordion-spacing: var(--spectrum-sys-spacing, 1em);
--accordion-spacing-small: var(--spectrum-sys-spacing-small, 0.5em);

/* Animation */
--accordion-transition-duration: var(--spectrum-sys-animation-duration, 300ms);
--accordion-transition-timing: var(--spectrum-sys-animation-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
```

## Accessibility Features

- **ARIA Compliance**: Proper ARIA attributes for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **High Contrast**: Supports high contrast mode

## Best Practices

### Content Organization
- **Horizontal Scroll**: Best for 3-7 short items (chips, tags)
- **Vertical Stack**: Better for longer lists or items with more text
- **Grouping**: Use clear, descriptive labels that indicate content type

### Visual Hierarchy
- **Primary Variant**: Use sparingly for the most important accordions
- **Secondary Variant**: Standard choice for most use cases
- **Custom Icons**: Choose icons that clearly indicate expand/collapse state

### Performance
- **Lazy Loading**: Consider lazy loading accordion content for better performance
- **Animation**: Disable animations on low-powered devices if needed
- **Sound**: Use sound effects judiciously to avoid overwhelming users

## Integration with Spectrum Components

The accordion works seamlessly with other Spectrum components:

### With Chips
```html
<spectrum-accordion label="Filter Options">
  <spectrum-chip variant="secondary" label="Category 1" leadingIcon="filter_list"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Category 2" leadingIcon="filter_list"></spectrum-chip>
</spectrum-accordion>
```

### With Buttons (in vertical mode)
```html
<spectrum-accordion label="Actions" horizontalScroll="false">
  <spectrum-button variant="ghost" buttonText="Action 1" showLeftIcon="true" leftIcon="play_arrow"></spectrum-button>
  <spectrum-button variant="ghost" buttonText="Action 2" showLeftIcon="true" leftIcon="download"></spectrum-button>
</spectrum-accordion>
```

## Troubleshooting

### Common Issues

**Accordion content not showing**
- Check that `expanded` property is set correctly
- Verify slot content is properly nested inside the accordion
- Enable `debug` mode to see state changes in console

**Animation not working**
- Check if `prefers-reduced-motion` is enabled
- Verify CSS custom properties are loaded
- Ensure no conflicting CSS animations

**Sound not playing**
- Check that `sound` property is `true`
- Verify audio files are accessible
- Check browser audio policies and user permissions 