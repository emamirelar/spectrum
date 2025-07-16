# Spectrum Accordion

The comprehensive interactive accordion component of the Spectrum Design System. Provides two distinct variants for organizing and displaying expandable content with rich interactive features and accessibility support.

## Features

🎨 **Two Variants** - Chip variant for trigger-based expansion and Standard variant for multi-section organization
📏 **Flexible Expansion** - Single or multi-expand modes for different content consumption patterns
♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
🎯 **Interactive States** - Hover, focus, active, expanded, and disabled states with smooth transitions
🔊 **Audio Feedback** - Optional sound effects for enhanced user experience
📱 **Haptic Feedback** - Tactile response on supported devices for improved interaction feel
⚡ **High Performance** - Optimized for large content sets and frequent re-rendering
🎛️ **Customizable** - CSS custom properties for theming and design system integration
🌐 **Universal** - Works across all modern browsers and devices
🗂️ **Content Rich** - Support for HTML content, slotted components, and interactive elements

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Standard accordion for FAQs -->
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {
      "id": "faq1",
      "title": "How do I get started?",
      "content": "<p>Getting started is easy! Follow our quick start guide.</p>",
      "expanded": true
    },
    {
      "id": "faq2", 
      "title": "What are the system requirements?",
      "content": "<p>Works on all modern browsers and devices.</p>"
    }
  ]'>
</spectrum-accordion>

<!-- Chip accordion for additional options -->
<spectrum-accordion variant="chip" label="Explore Options">
  <spectrum-chip variant="secondary" label="Option 1" leading-icon="lightbulb"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 2" leading-icon="star"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 3" leading-icon="favorite"></spectrum-chip>
</spectrum-accordion>
```

## Advanced Usage

```html
<!-- Multi-expand accordion with sound feedback -->
<spectrum-accordion 
  variant="standard"
  expand-mode="multi"
  sound="true"
  sections='[
    {
      "id": "feature1",
      "title": "Advanced Analytics",
      "content": "<p>Comprehensive data insights and reporting.</p>",
      "expanded": true
    },
    {
      "id": "feature2",
      "title": "Real-time Collaboration", 
      "content": "<p>Work together with your team seamlessly.</p>",
      "expanded": true
    }
  ]'>
</spectrum-accordion>

<!-- Primary chip with haptic feedback -->
<spectrum-accordion 
  variant="chip"
  label="Important Actions"
  chip-variant="primary"
  outline="false"
  haptic="true"
  horizontal-scroll="false">
  <spectrum-chip variant="primary" label="High Priority" leading-icon="priority_high"></spectrum-chip>
  <spectrum-chip variant="primary" label="Featured" leading-icon="star"></spectrum-chip>
</spectrum-accordion>

<!-- Custom icons and vertical layout -->
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  collapsed-icon="add"
  expanded-icon="remove"
  sections='[
    {
      "id": "config1",
      "title": "Configuration Options",
      "content": "<p>Detailed settings and preferences.</p>"
    }
  ]'>
</spectrum-accordion>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'chip' \| 'standard'` | `'standard'` | The accordion variant determining layout and behavior |
| `expanded` | `boolean` | `false` | Whether the accordion starts expanded (chip variant only) |
| `label` | `string` | `'Dive Deeper'` | Text for the trigger button (chip variant only) |
| `collapsedIcon` | `string` | `'arrow_drop_down'` | Material Design icon name to show when collapsed |
| `expandedIcon` | `string` | `'arrow_drop_up'` | Material Design icon name to show when expanded |
| `sound` | `boolean` | `false` | Enable audio feedback on toggle |
| `haptic` | `boolean` | `false` | Enable haptic feedback on supported devices |
| `horizontalScroll` | `boolean` | `true` | Enable horizontal scrolling layout (chip variant only) |
| `disabled` | `boolean` | `false` | Whether the accordion is disabled |
| `chipVariant` | `'primary' \| 'secondary'` | `'secondary'` | Visual style of trigger chip (chip variant only) |
| `outline` | `boolean` | `true` | Show outline on trigger chip (chip variant only) |
| `expandMode` | `'single' \| 'multi'` | `'single'` | Expansion behavior (standard variant only) |
| `sections` | `string \| AccordionSection[]` | `[]` | Sections data for standard variant |
| `accordionId` | `string` | auto-generated | Unique identifier for the accordion |
| `debug` | `boolean` | `false` | Enable debug logging to console |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `accordionToggle` | `CustomEvent<AccordionTogglePayload>` | Emitted when accordion or section is toggled |
| `soundTriggered` | `CustomEvent<SoundTriggeredPayload>` | Emitted when sound effect is triggered |
| `hapticTriggered` | `CustomEvent<HapticTriggeredPayload>` | Emitted when haptic feedback occurs |

### Event Payloads

```typescript
interface AccordionTogglePayload {
  action: string;
  expanded: boolean;
  accordionId: string;
  sectionId?: string; // Standard variant only
  expandedSections?: string[]; // Standard variant only
}

interface SoundTriggeredPayload {
  action: "soundTriggered";
  accordionId: string;
}

interface HapticTriggeredPayload {
  action: "hapticTriggered"; 
  accordionId: string;
}
```

### AccordionSection Interface

```typescript
interface AccordionSection {
  id: string;          // Unique identifier for the section
  title: string;       // Display title for the section header
  content?: string;    // HTML content (optional if using slots)
  expanded?: boolean;  // Initial expanded state (default: false)
}
```

### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--accordion-primary` | `var(--spectrum-sys-color-primary)` | Primary accent color |
| `--accordion-surface` | `var(--spectrum-sys-color-surface)` | Background surface color |
| `--accordion-on-surface` | `var(--spectrum-sys-color-on-surface)` | Text color on surface |
| `--accordion-spacing` | `var(--spectrum-sys-spacing)` | Base spacing unit |
| `--accordion-border-radius` | `var(--spectrum-sys-shape-corner-medium)` | Border radius for sections |
| `--accordion-transition-duration` | `var(--spectrum-sys-animation-duration)` | Animation duration |
| `--accordion-section-padding` | `var(--accordion-spacing)` | Section content padding |
| `--accordion-header-height` | `3rem` | Header minimum height |

### Slots

| Slot | Description | Variant |
|------|-------------|---------|
| Default | Accordion content (chips, components, etc.) | Chip |
| `section-{sectionId}` | Named slots for specific sections | Standard |

## Styling

### Variant Styling

```css
/* Chip variant customization */
spectrum-accordion[variant="chip"] {
  --accordion-chip-background: var(--spectrum-sys-color-primary);
  --accordion-chip-color: var(--spectrum-sys-color-on-primary);
  --accordion-content-gap: var(--spectrum-sys-spacing-small);
}

/* Standard variant customization */
spectrum-accordion[variant="standard"] {
  --accordion-section-border: 1px solid var(--spectrum-sys-color-outline);
  --accordion-header-background: var(--spectrum-sys-color-surface-variant);
  --accordion-content-background: var(--spectrum-sys-color-surface);
}
```

### Responsive Design

```css
/* Mobile-first responsive accordion */
spectrum-accordion {
  --accordion-spacing: var(--spectrum-sys-spacing-small);
}

@media (min-width: 768px) {
  spectrum-accordion {
    --accordion-spacing: var(--spectrum-sys-spacing);
    --accordion-header-height: 3.5rem;
  }
}

@media (min-width: 1024px) {
  spectrum-accordion {
    --accordion-spacing: var(--spectrum-sys-spacing-large);
  }
}
```

### Custom Themes

```css
/* Dark theme accordion */
.dark-theme spectrum-accordion {
  --accordion-surface: var(--spectrum-sys-color-surface-dark);
  --accordion-on-surface: var(--spectrum-sys-color-on-surface-dark);
  --accordion-primary: var(--spectrum-sys-color-primary-dark);
}

/* High contrast theme */
@media (prefers-contrast: high) {
  spectrum-accordion {
    --accordion-section-border: 2px solid;
    --accordion-outline-width: 3px;
  }
}
```

## Integration Patterns

### FAQ System Integration

```html
<div class="faq-container">
  <h2>Frequently Asked Questions</h2>
  <spectrum-accordion 
    variant="standard"
    expand-mode="single"
    sections='[
      {
        "id": "faq1",
        "title": "How do I reset my password?",
        "content": "<p>Click the \"Forgot Password\" link on the login page...</p>",
        "expanded": true
      }
    ]'>
  </spectrum-accordion>
</div>
```

### Navigation Menu Integration

```html
<nav class="sidebar-navigation">
  <spectrum-accordion variant="chip" label="Quick Actions">
    <spectrum-chip variant="secondary" label="Dashboard" leading-icon="dashboard"></spectrum-chip>
    <spectrum-chip variant="secondary" label="Settings" leading-icon="settings"></spectrum-chip>
  </spectrum-accordion>
</nav>
```

### Content Organization

```html
<article class="documentation">
  <spectrum-accordion 
    variant="standard"
    expand-mode="multi"
    sections='[
      {
        "id": "overview",
        "title": "Overview", 
        "content": "<p>System overview and architecture...</p>",
        "expanded": true
      },
      {
        "id": "setup",
        "title": "Setup Guide",
        "content": "<p>Step-by-step installation...</p>"
      }
    ]'>
  </spectrum-accordion>
</article>
```

### Loading States

```typescript
// Accordion with dynamic content loading
class MyComponent {
  @State() loading = false;
  @State() sections = [];

  async loadSections() {
    this.loading = true;
    try {
      this.sections = await this.fetchSections();
    } finally {
      this.loading = false;
    }
  }

  render() {
    return (
      <spectrum-accordion 
        variant="standard"
        sections={JSON.stringify(this.sections)}
        disabled={this.loading}
      >
      </spectrum-accordion>
    );
  }
}
```

## Accessibility

### Screen Reader Support

```html
<!-- Accordion with accessible labels -->
<spectrum-accordion 
  variant="standard"
  accordion-id="help-sections"
  sections='[
    {
      "id": "keyboard-nav",
      "title": "Keyboard Navigation Help",
      "content": "<p>Use Tab to navigate, Enter to expand sections.</p>"
    }
  ]'>
</spectrum-accordion>
```

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate between accordion headers
- **Enter/Space**: Toggle accordion sections
- **Arrow Keys**: Navigate within expanded content
- **Escape**: Close accordion (chip variant)

### Focus Management

```css
/* Custom focus styles */
spectrum-accordion::part(header):focus-visible {
  outline: 2px solid var(--spectrum-sys-color-primary);
  outline-offset: 2px;
}

spectrum-accordion::part(trigger):focus-visible {
  outline: 2px solid var(--spectrum-sys-color-primary);
  outline-offset: 2px;
}
```

## Performance

### Bundle Impact
- **Core component**: 8.5KB gzipped
- **With chip dependency**: 12.1KB gzipped
- **CSS custom properties**: 2.3KB gzipped

### Runtime Performance
- **Initialization**: <3ms average
- **Toggle response**: <16ms (sub-frame)
- **Re-render cost**: <2ms for state changes
- **Memory usage**: ~800 bytes per section

### Optimization Tips

```typescript
// Efficient section data management
const memoizedSections = useMemo(() => 
  sections.map(section => ({
    ...section,
    content: section.content || '' // Avoid undefined
  })), [sections]);

// Lazy loading for large content
const LazyAccordion = lazy(() => import('./LargeAccordion'));

// Virtualization for many sections
const VirtualizedAccordion = () => (
  <FixedSizeList
    height={600}
    itemCount={sections.length}
    itemSize={60}
    itemData={sections}
  >
    {AccordionSection}
  </FixedSizeList>
);
```

## Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full support |
| Firefox | 85+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 88+ | ✅ Full support |
| iOS Safari | 14+ | ✅ Full support |
| Android Chrome | 88+ | ✅ Full support |

## Migration Guide

### From v1.x to v2.x

```typescript
// v1.x (deprecated)
<spectrum-accordion 
  type="expandable"
  mode="single"
  data={sections}>
</spectrum-accordion>

// v2.x (current)
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections={JSON.stringify(sections)}>
</spectrum-accordion>
```

### Breaking Changes
- `type` prop renamed to `variant`
- `mode` prop renamed to `expandMode`
- `data` prop renamed to `sections`
- Event payload structure updated with action attributes
- CSS class names updated to follow BEM convention

## Best Practices

### Choosing the Right Variant

#### Use Chip Variant When:
- Showing optional actions or exploration options
- Content is supplementary and doesn't need immediate visibility
- You have 3-7 related items to display
- Space is limited and you need a compact trigger
- Building secondary navigation or action menus

#### Use Standard Variant When:
- Creating FAQ sections or help documentation
- Organizing content into logical sections
- Users need to compare information across sections (multi-expand)
- Building traditional content hierarchies
- Displaying structured information that benefits from progressive disclosure

### Content Organization

#### Chip Variant Best Practices:
- **Horizontal Scroll**: Best for 3-7 short items (chips, tags)
- **Vertical Stack**: Better for longer lists or items with more text
- **Clear Labels**: Use descriptive labels that indicate content type
- **Icon Usage**: Include relevant icons for better recognition

#### Standard Variant Best Practices:
- **Single Expand**: Good for FAQs where focus on one answer is desired
- **Multi Expand**: Better for feature comparisons or related content sections
- **Section Titles**: Use clear, scannable titles that indicate content
- **Content Length**: Keep individual sections concise but comprehensive

### Performance Considerations

- **Large Section Lists**: Consider pagination or virtual scrolling for 20+ sections
- **Rich Content**: Use slots for complex components instead of HTML strings
- **Animation**: Disable animations on low-powered devices if needed
- **Lazy Loading**: Consider lazy loading accordion content for better performance
- **Memory Management**: Clean up event listeners and references when unmounting

## Troubleshooting

### Common Issues

**Accordion sections not rendering**
- Verify `sections` prop contains valid JSON
- Check that section IDs are unique
- Ensure section titles are provided
- Enable `debug` mode to see state changes

**Chip content not showing**
- Check that `variant="chip"` is set
- Verify slotted content is properly structured
- Ensure chip components are valid

**Events not firing**
- Check event listener is attached correctly
- Verify event name: `accordionToggle`
- Enable debug mode to see internal state changes
- Check that accordion is not disabled

**Animation issues**
- Check if `prefers-reduced-motion` is enabled
- Verify CSS custom properties are loaded
- Ensure no conflicting CSS animations
- Test with minimal CSS to isolate issues

**Accessibility problems**
- Verify proper ARIA attributes are present
- Test with keyboard navigation only
- Check with screen reader software
- Ensure focus indicators are visible

## Examples

See the [Storybook documentation](./spectrum-accordion) for interactive examples and comprehensive usage patterns.

## Related Components

- [spectrum-chip](../spectrum-chip/README.md) - Used internally by chip variant
- [spectrum-button](../spectrum-button/README.md) - Alternative for simple triggers
- [spectrum-panel](../spectrum-panel/README.md) - Container component for content sections

## Contributing

Please read our [Contributing Guide](../../../CONTRIBUTING.md) for information about reporting bugs, requesting features, and submitting pull requests.

## License

This component is part of the Spectrum Design System and is licensed under the [MIT License](../../../LICENSE). 