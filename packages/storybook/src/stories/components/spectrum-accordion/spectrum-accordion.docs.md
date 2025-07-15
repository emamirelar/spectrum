# Spectrum Accordion Component

The `spectrum-accordion` component provides two distinct variants for organizing and displaying expandable content with smooth animations and configurable options.

## Variants Overview

### Chip Variant
A trigger-based accordion using a chip button for expansion. Perfect for "Dive Deeper" content, additional actions, and optional information that doesn't need to be immediately visible.

### Standard Variant (Default)
A traditional multi-section accordion with configurable expand behavior. Ideal for FAQ sections, content organization, navigation menus, and any scenario requiring multiple collapsible sections.

## Features

- **Two distinct variants**: Chip-based trigger and traditional multi-section
- **Flexible expand modes**: Single or multi-expand for standard variant
- **Rich content support**: HTML content and slotted components
- **Sound support**: Optional audio feedback
- **Accessibility**: ARIA compliant with keyboard navigation
- **Theming**: Inherits from Spectrum design system
- **Event system**: Comprehensive event handling for both variants

## Getting Started

### Chip Variant
Basic usage with horizontal scrolling content:

```html
<spectrum-accordion variant="chip" label="Dive Deeper">
  <spectrum-chip variant="secondary" label="Option 1" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 2" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 3" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

### Standard Variant
Basic FAQ-style accordion:

```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {
      "id": "faq1",
      "title": "How do I get started?",
      "content": "<p>Getting started is easy! Simply follow our quick start guide.</p>"
    },
    {
      "id": "faq2",
      "title": "What are the system requirements?",
      "content": "<p>Our platform works on all modern browsers and devices.</p>"
    }
  ]'>
</spectrum-accordion>
```

## Chip Variant Usage

### 1. Default Horizontal Scroll
```html
<spectrum-accordion variant="chip" label="Explore Options" horizontal-scroll="true">
  <spectrum-chip variant="secondary" label="Renewable Energy" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Solar Panels" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Wind Power" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

### 2. Vertical Stack Layout
```html
<spectrum-accordion variant="chip" label="Show All Options" horizontal-scroll="false">
  <spectrum-chip variant="secondary" label="Option 1" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 2" leadingIcon="prompt_suggestion"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 3" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

### 3. Primary Chip Variant
```html
<spectrum-accordion 
  variant="chip"
  label="Primary Action" 
  chip-variant="primary" 
  outline="false">
  <spectrum-chip variant="primary" label="Important Option" leadingIcon="star"></spectrum-chip>
</spectrum-accordion>
```

### 4. Expanded by Default
```html
<spectrum-accordion 
  variant="chip"
  label="Already Open"
  expanded="true">
  <spectrum-chip variant="secondary" label="Visible Option" leadingIcon="prompt_suggestion"></spectrum-chip>
</spectrum-accordion>
```

## Standard Variant Usage

### 1. Single Expand Mode (FAQ Style)
```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {
      "id": "getting-started",
      "title": "How do I get started?",
      "content": "<p>Getting started is easy! Simply follow our comprehensive quick start guide.</p>"
    },
    {
      "id": "support",
      "title": "How do I contact support?",
      "content": "<p>You can reach our support team via email or live chat 24/7.</p>"
    },
    {
      "id": "pricing",
      "title": "What are your pricing plans?",
      "content": "<p>We offer flexible pricing plans starting from $10/month.</p>"
    }
  ]'>
</spectrum-accordion>
```

### 2. Multi Expand Mode (Features List)
```html
<spectrum-accordion 
  variant="standard"
  expand-mode="multi"
  sections='[
    {
      "id": "analytics",
      "title": "Advanced Analytics",
      "expanded": true,
      "content": "<p>Get detailed insights with our analytics dashboard.</p>"
    },
    {
      "id": "collaboration",
      "title": "Real-time Collaboration",
      "content": "<p>Work together with your team in real-time.</p>"
    },
    {
      "id": "api",
      "title": "API Integration",
      "expanded": true,
      "content": "<p>Connect with third-party services via our REST API.</p>"
    }
  ]'>
</spectrum-accordion>
```

### 3. Using Named Slots for Custom Content
```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  sections='[
    {
      "id": "custom1",
      "title": "Custom Components Section"
    },
    {
      "id": "custom2",
      "title": "Interactive Elements"
    }
  ]'>
  
  <!-- Named slots for specific sections -->
  <div slot="section-custom1">
    <spectrum-button variant="primary">Custom Action</spectrum-button>
    <p>This content uses a named slot and can contain any components.</p>
  </div>
  
  <div slot="section-custom2">
    <spectrum-chip variant="primary" label="Interactive"></spectrum-chip>
    <spectrum-chip variant="secondary" label="Components"></spectrum-chip>
    <p>Mix of interactive components in accordion sections.</p>
  </div>
</spectrum-accordion>
```

### 4. Custom Icons and Styling
```html
<spectrum-accordion 
  variant="standard"
  expand-mode="single"
  collapsed-icon="add"
  expanded-icon="remove"
  sections='[
    {
      "id": "config1",
      "title": "Configuration Option 1",
      "content": "<p>First configuration option details.</p>"
    },
    {
      "id": "config2",
      "title": "Configuration Option 2",
      "content": "<p>Second configuration option details.</p>"
    }
  ]'>
</spectrum-accordion>
```

## Event Handling

Both variants emit `accordionToggle` events with different payload structures:

### Chip Variant Events
```javascript
document.querySelector('spectrum-accordion').addEventListener('accordionToggle', (event) => {
  const { expanded, accordionId } = event.detail;
  console.log(`Chip accordion ${accordionId} is now ${expanded ? 'expanded' : 'collapsed'}`);
});
```

### Standard Variant Events
```javascript
document.querySelector('spectrum-accordion').addEventListener('accordionToggle', (event) => {
  const { expanded, accordionId, sectionId, expandedSections } = event.detail;
  console.log(`Section ${sectionId} is now ${expanded ? 'expanded' : 'collapsed'}`);
  console.log('All expanded sections:', expandedSections);
});
```

## Properties

### Common Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'chip'` \| `'standard'` | `'standard'` | The variant of the accordion |
| `collapsedIcon` | string | `'arrow_drop_down'` | Icon to show when collapsed |
| `expandedIcon` | string | `'arrow_drop_up'` | Icon to show when expanded |
| `sound` | boolean | `false` | Enable sound effects |
| `disabled` | boolean | `false` | Disable user interaction |
| `accordionId` | string | auto-generated | Unique identifier for events |
| `debug` | boolean | `false` | Enable debug logging |

### Chip Variant Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expanded` | boolean | `false` | Whether the accordion starts expanded |
| `label` | string | `'Dive Deeper'` | Text for the trigger button |
| `horizontalScroll` | boolean | `true` | Enable horizontal scrolling layout |
| `chipVariant` | `'primary'` \| `'secondary'` | `'secondary'` | Visual style of trigger chip |
| `outline` | boolean | `true` | Show outline on the trigger chip |

### Standard Variant Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `expandMode` | `'single'` \| `'multi'` | `'single'` | Expand behavior mode |
| `sections` | string \| AccordionSection[] | `[]` | JSON string or array of sections |

## AccordionSection Interface

```typescript
interface AccordionSection {
  id: string;          // Unique identifier for the section
  title: string;       // Display title for the section header
  content?: string;    // HTML content (optional if using slots)
  expanded?: boolean;  // Initial expanded state
}
```

## Events

### Chip Variant Events
| Event | Payload | Description |
|-------|---------|-------------|
| `accordionToggle` | `{ expanded: boolean, accordionId: string }` | Fired when chip accordion is toggled |

### Standard Variant Events
| Event | Payload | Description |
|-------|---------|-------------|
| `accordionToggle` | `{ expanded: boolean, accordionId: string, sectionId: string, expandedSections: string[] }` | Fired when a section is toggled |

## CSS Custom Properties

The accordion component inherits from the Spectrum design system:

```css
/* Core colors */
--accordion-primary: var(--spectrum-color-primary, #0070d2);
--accordion-surface: var(--spectrum-color-surface, #f6f6f6);
--accordion-on-surface: var(--spectrum-color-on-surface, #333333);

/* Spacing */
--accordion-spacing: var(--spectrum-sys-spacing, 1em);
--accordion-section-padding: var(--accordion-spacing);
--accordion-content-padding: var(--accordion-spacing);

/* Standard variant specific */
--accordion-section-border: 1px solid var(--accordion-outline-variant);
--accordion-header-height: 3rem;

/* Animation */
--accordion-transition-duration: var(--spectrum-sys-animation-duration, 300ms);
--accordion-transition-timing: var(--spectrum-sys-animation-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
```

## Accessibility Features

- **ARIA Compliance**: Proper ARIA attributes and roles for screen readers
- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space)
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Descriptive labels and state announcements
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **High Contrast**: Enhanced visibility in high contrast mode

## Best Practices

### Choosing the Right Variant

**Use Chip Variant When:**
- Showing optional actions or exploration options
- Content is supplementary and doesn't need immediate visibility
- You have 3-7 related items to display
- Space is limited and you need a compact trigger

**Use Standard Variant When:**
- Creating FAQ sections or help documentation
- Organizing content into logical sections
- Users need to compare information across sections (multi-expand)
- Building navigation or content hierarchies

### Content Organization

**Chip Variant:**
- **Horizontal Scroll**: Best for 3-7 short items (chips, tags)
- **Vertical Stack**: Better for longer lists or items with more text
- **Grouping**: Use clear, descriptive labels that indicate content type

**Standard Variant:**
- **Single Expand**: Good for FAQs where focus on one answer is desired
- **Multi Expand**: Better for feature comparisons or related content sections
- **Section Titles**: Use clear, scannable titles that indicate content

### Performance Considerations

- **Large Section Lists**: Consider pagination or virtual scrolling for 20+ sections
- **Rich Content**: Use slots for complex components instead of HTML strings
- **Animation**: Disable animations on low-powered devices if needed
- **Lazy Loading**: Consider lazy loading accordion content for better performance

## Migration from Previous Version

If updating from the previous implementation:

```html
<!-- Old version -->
<spectrum-accordion 
  variant="primary"
  label="My Accordion">
  Content here
</spectrum-accordion>

<!-- New version -->
<spectrum-accordion 
  variant="chip"
  chip-variant="primary" 
  label="My Accordion">
  Content here
</spectrum-accordion>
```

## Troubleshooting

### Common Issues

**Accordion content not showing**
- Check that `variant` is set correctly
- For chip variant: verify `expanded` property
- For standard variant: check `sections` JSON format
- Enable `debug` mode to see state changes in console

**Standard variant sections not rendering**
- Verify `sections` prop contains valid JSON
- Check that section IDs are unique
- Ensure section titles are provided

**Named slots not working**
- Check slot name format: `slot="section-{sectionId}"`
- Verify section ID matches exactly
- Ensure section exists in sections array

**Animation not working**
- Check if `prefers-reduced-motion` is enabled
- Verify CSS custom properties are loaded
- Ensure no conflicting CSS animations

**Events not firing**
- Check event listener is attached correctly
- Verify event name: `accordionToggle`
- Enable debug mode to see internal state changes 