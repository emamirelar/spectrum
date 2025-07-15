# Spectrum Accordion

A flexible accordion component that provides two distinct variants for organizing and displaying expandable content with rich interactive features.

## Features

- **Two Variants**: Chip variant for trigger-based expansion and Standard variant for multi-section organization
- **Flexible Expansion**: Single or multi-expand modes for standard variant
- **Interactive Feedback**: Optional sound and haptic feedback
- **Custom Content**: Support for slotted content and HTML content
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Horizontal and vertical layout options

## Installation

```bash
npm install @spectrum/core
```

## Usage

### Basic Implementation

#### Chip Variant
Perfect for collapsing/expanding additional actions or content with a single trigger button.

```html
<spectrum-accordion variant="chip" label="Show More Options">
  <spectrum-button variant="secondary">Action 1</spectrum-button>
  <spectrum-button variant="secondary">Action 2</spectrum-button>
  <spectrum-button variant="secondary">Action 3</spectrum-button>
</spectrum-accordion>
```

#### Standard Variant
Traditional multi-section accordion ideal for FAQs, navigation, and content organization.

```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {
      "id": "faq1",
      "title": "How do I get started?",
      "content": "<p>Getting started is easy! Follow our quick start guide.</p>"
    },
    {
      "id": "faq2",
      "title": "What are the system requirements?",
      "content": "<p>Our platform works on all modern browsers and devices.</p>"
    }
  ]'>
</spectrum-accordion>
```

## API Reference

### Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `variant` | `variant` | `'chip' \| 'standard'` | `'standard'` | The variant of the accordion |
| `expanded` | `expanded` | `boolean` | `false` | Whether the accordion is initially expanded (chip variant only) |
| `label` | `label` | `string` | `'Dive Deeper'` | Label text for the accordion trigger (chip variant only) |
| `collapsedIcon` | `collapsed-icon` | `string` | `'arrow_drop_down'` | Icon to show when collapsed |
| `expandedIcon` | `expanded-icon` | `string` | `'arrow_drop_up'` | Icon to show when expanded |
| `sound` | `sound` | `boolean` | `false` | Enable sound effects on interaction |
| `haptic` | `haptic` | `boolean` | `false` | Enable haptic feedback on interaction |
| `horizontalScroll` | `horizontal-scroll` | `boolean` | `true` | Enable horizontal scrolling container (chip variant only) |
| `disabled` | `disabled` | `boolean` | `false` | Disable the accordion |
| `chipVariant` | `chip-variant` | `'primary' \| 'secondary'` | `'secondary'` | Visual variant of the trigger chip (chip variant only) |
| `outline` | `outline` | `boolean` | `true` | Show outline on the trigger chip (chip variant only) |
| `expandMode` | `expand-mode` | `'single' \| 'multi'` | `'single'` | Expand behavior for standard variant |
| `sections` | `sections` | `string \| AccordionSection[]` | `[]` | Sections data for standard variant |
| `accordionId` | `accordion-id` | `string` | auto-generated | Unique identifier for the accordion |
| `debug` | `debug` | `boolean` | `false` | Enable debug logging to console |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `accordionToggle` | `CustomEvent<AccordionToggleDetail>` | Emitted when the accordion is toggled |

#### AccordionToggleDetail Interface

```typescript
interface AccordionToggleDetail {
  expanded: boolean;
  accordionId: string;
  sectionId?: string;         // Only for standard variant
  expandedSections?: string[]; // Only for standard variant
}
```

### AccordionSection Interface

```typescript
interface AccordionSection {
  id: string;
  title: string;
  content?: string;
  expanded?: boolean;
}
```

## Advanced Usage

### Interactive Feedback

Add sound and haptic feedback for enhanced user experience:

```html
<spectrum-accordion 
  variant="chip"
  label="Interactive Demo"
  sound="true"
  haptic="true">
  <!-- Content -->
</spectrum-accordion>
```

### Custom Content with Slots

Use named slots for complex content in standard variant:

```html
<spectrum-accordion 
  variant="standard"
  sections='[
    {"id": "custom1", "title": "Custom Content Section"},
    {"id": "custom2", "title": "Interactive Components"}
  ]'>
  
  <div slot="section-custom1">
    <spectrum-button variant="primary">Custom Action</spectrum-button>
    <p>This content uses a named slot.</p>
  </div>
  
  <div slot="section-custom2">
    <spectrum-image-gallery></spectrum-image-gallery>
  </div>
</spectrum-accordion>
```

### Multi-Expand Mode

Allow multiple sections to be expanded simultaneously:

```html
<spectrum-accordion 
  variant="standard"
  expand-mode="multi"
  sections='[
    {
      "id": "feature1",
      "title": "Advanced Analytics",
      "expanded": true,
      "content": "<p>Real-time analytics dashboard.</p>"
    },
    {
      "id": "feature2",
      "title": "Team Collaboration",
      "content": "<p>Work together in real-time.</p>"
    }
  ]'>
</spectrum-accordion>
```

### Programmatic Control

Control the accordion programmatically:

```javascript
// Get reference to accordion
const accordion = document.querySelector('spectrum-accordion');

// For chip variant
accordion.expanded = true;

// For standard variant - update sections
accordion.sections = [
  {
    id: 'dynamic1',
    title: 'Dynamically Added Section',
    content: '<p>This section was added programmatically.</p>',
    expanded: true
  }
];
```

### Event Handling

Listen for accordion events:

```javascript
document.addEventListener('accordionToggle', (event) => {
  const { 
    expanded, 
    accordionId, 
    sectionId, 
    expandedSections 
  } = event.detail;
  
  if (sectionId) {
    // Standard variant section toggle
    console.log(`Section ${sectionId} is now ${expanded ? 'expanded' : 'collapsed'}`);
    console.log('All expanded sections:', expandedSections);
  } else {
    // Chip variant toggle
    console.log(`Chip accordion ${accordionId} is now ${expanded ? 'expanded' : 'collapsed'}`);
  }
});
```

## Styling

### CSS Custom Properties

Customize the accordion appearance using CSS custom properties:

```css
spectrum-accordion {
  --accordion-background: var(--spectrum-color-surface);
  --accordion-color: var(--spectrum-color-on-surface);
  --accordion-border: var(--spectrum-color-outline);
  --accordion-transition: var(--spectrum-motion-duration-medium);
  --accordion-spacing: var(--spectrum-spacing-medium);
  
  /* Chip variant specific */
  --accordion-chip-background: var(--spectrum-color-primary);
  --accordion-chip-color: var(--spectrum-color-on-primary);
  
  /* Content spacing */
  --accordion-content-padding: 1rem;
  --accordion-section-gap: 0.5rem;
}
```

### Responsive Design

The accordion automatically adapts to different screen sizes:

```html
<!-- Horizontal scroll on desktop, vertical on mobile -->
<spectrum-accordion 
  variant="chip"
  horizontal-scroll="true"
  label="Responsive Content">
  <!-- Content will scroll horizontally on wide screens -->
</spectrum-accordion>

<!-- Force vertical layout for mobile-optimized interfaces -->
<spectrum-accordion 
  variant="chip"
  horizontal-scroll="false"
  label="Mobile Optimized">
  <!-- Content will stack vertically -->
</spectrum-accordion>
```

## Accessibility

### Keyboard Navigation

- **Tab**: Navigate to accordion headers and interactive elements
- **Enter/Space**: Toggle accordion sections
- **Arrow Keys**: Move between accordion headers (standard variant)

### Screen Reader Support

The accordion provides comprehensive screen reader support:

- Proper ARIA labels and roles
- State announcements (expanded/collapsed)
- Section content association
- Focus management

### High Contrast Mode

The accordion automatically adapts to high contrast mode with enhanced borders and improved text visibility.

### Reduced Motion

Respects user's motion preferences by reducing or eliminating animations when requested.

## Common Use Cases

### FAQ Section

```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {
      "id": "account",
      "title": "How do I create an account?",
      "content": "<p>Click Sign Up and follow the steps...</p>"
    },
    {
      "id": "billing",
      "title": "What payment methods do you accept?",
      "content": "<p>We accept all major credit cards...</p>"
    }
  ]'>
</spectrum-accordion>
```

### Dashboard Tools

```html
<spectrum-accordion variant="chip" label="Quick Tools">
  <spectrum-button variant="secondary" size="sm">Export Data</spectrum-button>
  <spectrum-button variant="secondary" size="sm">Generate Report</spectrum-button>
  <spectrum-button variant="secondary" size="sm">System Settings</spectrum-button>
</spectrum-accordion>
```

### Navigation Menu

```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {"id": "dashboard", "title": "Dashboard"},
    {"id": "projects", "title": "Projects"},
    {"id": "settings", "title": "Settings"}
  ]'>
  
  <div slot="section-dashboard">
    <a href="/analytics">Analytics</a>
    <a href="/reports">Reports</a>
  </div>
  
  <div slot="section-projects">
    <a href="/projects/new">New Project</a>
    <a href="/projects/all">All Projects</a>
  </div>
</spectrum-accordion>
```

## Best Practices

### Content Organization

- **Use descriptive section titles** that clearly communicate content
- **Group related content** logically within sections
- **Keep content scannable** with bullet points and clear headings
- **Provide context** for actions and options

### Interaction Design

- **Choose appropriate variant** based on content type and user needs
- **Use sound/haptic feedback** sparingly for important interactions
- **Consider expand mode** carefully (single for focused reading, multi for comparison)
- **Test across devices** to ensure touch targets are appropriately sized

### Performance

- **Lazy load heavy content** within accordion sections
- **Debounce rapid toggles** if needed to prevent excessive API calls
- **Use efficient content rendering** for large datasets
- **Monitor accordion usage** to optimize default states

### Accessibility

- **Provide clear section titles** for screen readers
- **Test keyboard navigation** thoroughly
- **Ensure sufficient color contrast** in all states
- **Test with screen readers** to verify proper announcements

## Migration

### From Basic Accordions

```javascript
// Before: Basic accordion
<basic-accordion title="Section">
  Content
</basic-accordion>

// After: Spectrum accordion
<spectrum-accordion 
  variant="standard"
  sections='[{"id": "section", "title": "Section", "content": "Content"}]'>
</spectrum-accordion>
```

### Framework Integration

#### React

```jsx
import { SpectrumAccordion } from '@spectrum/react';

function App() {
  const handleToggle = (event) => {
    console.log('Toggled:', event.detail);
  };

  return (
    <SpectrumAccordion
      variant="chip"
      label="React Example"
      onAccordionToggle={handleToggle}
    >
      <button>Action 1</button>
      <button>Action 2</button>
    </SpectrumAccordion>
  );
}
```

#### Vue

```vue
<template>
  <spectrum-accordion
    variant="standard"
    :sections="sections"
    @accordionToggle="handleToggle"
  />
</template>

<script>
export default {
  data() {
    return {
      sections: [
        { id: 'item1', title: 'Item 1', content: 'Content 1' },
        { id: 'item2', title: 'Item 2', content: 'Content 2' }
      ]
    };
  },
  methods: {
    handleToggle(event) {
      console.log('Toggled:', event.detail);
    }
  }
};
</script>
```

#### Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
    <spectrum-accordion
      variant="chip"
      label="Angular Example"
      (accordionToggle)="handleToggle($event)">
      <button>Action 1</button>
      <button>Action 2</button>
    </spectrum-accordion>
  `
})
export class AccordionComponent {
  handleToggle(event: CustomEvent) {
    console.log('Toggled:', event.detail);
  }
}
```

## Dependencies

### Internal Dependencies

- **spectrum-chip**: Used internally by the chip variant for triggers

### Optional Content Dependencies

- **spectrum-button**: Commonly used within accordion content
- **spectrum-badge**: For status indicators and labels
- **spectrum-image-gallery**: For rich media content

### Used By

- **spectrum-conversation-panel**: Uses accordion for expandable content sections

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+
- Android Chrome 80+

## Contributing

See the main [Contributing Guide](../../../../../../CONTRIBUTING.md) for development setup and guidelines.

## License

MIT License - see [LICENSE](../../../../../../LICENSE.txt) for details. 