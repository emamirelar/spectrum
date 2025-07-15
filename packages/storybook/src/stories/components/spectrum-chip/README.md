# Spectrum Chip

A versatile, interactive chip component for tags, filters, selections, and actions. Part of the Spectrum Design System.

## Features

✨ **Six Distinct Variants** - Primary, Secondary, Assist, Filter, Input, and Suggestion chips for different use cases
📏 **Multiple Sizes** - Extra-small, Small, Medium, and Large sizing options
🎵 **Interactive Feedback** - Optional sound, haptic feedback, and ripple effects
🎨 **Rich Icons** - Leading and trailing icon support with Material Design icons
🔄 **Selection States** - Toggle selection and removable chip functionality
♿ **Accessibility First** - Full keyboard navigation and screen reader support

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Simple chip -->
<spectrum-chip label="Basic Chip"></spectrum-chip>

<!-- Chip with icon -->
<spectrum-chip 
  variant="primary" 
  label="Featured" 
  leadingIcon="star"
></spectrum-chip>

<!-- Removable chip -->
<spectrum-chip 
  variant="input" 
  label="Removable Tag" 
  showTrailingIcon="true"
></spectrum-chip>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'assist' \| 'filter' \| 'input' \| 'suggestion'` | `'primary'` | Visual style variant |
| `label` | `string` | `''` | Text content of the chip |
| `selected` | `boolean` | `false` | Whether the chip is selected |
| `disabled` | `boolean` | `false` | Whether the chip is disabled |
| `outline` | `boolean` | `false` | Whether to show outline styling |
| `ripple` | `boolean` | `false` | Whether to show ripple effect on click |
| `size` | `'extra-small' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Size of the chip |
| `leadingIcon` | `string` | `''` | Material Design icon name for leading icon |
| `trailingIcon` | `string` | `'close'` | Material Design icon name for trailing icon |
| `showTrailingIcon` | `boolean` | `false` | Whether to show the trailing icon |
| `action` | `string` | `''` | Custom action identifier for event payload |
| `sound` | `boolean` | `false` | Whether to play sound on interaction |
| `haptic` | `boolean` | `false` | Whether to provide haptic feedback |
| `debug` | `boolean` | `false` | Enable debug logging to console |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `chipAction` | `ChipActionDetail` | Emitted when chip is clicked or interacted with |

#### ChipActionDetail Interface

```typescript
interface ChipActionDetail {
  action: string;           // Action type (click, remove, toggle, etc.)
  label: string;           // Chip label
  variant: string;         // Chip variant
  selected: boolean;       // Selection state
  customAction?: string;   // Custom action identifier
}
```

## Variants Guide

### Primary
Primary emphasis chips for main actions and important tags.

```html
<spectrum-chip variant="primary" label="Important"></spectrum-chip>
```

### Secondary
Secondary emphasis chips for supporting information and general tags.

```html
<spectrum-chip variant="secondary" label="General Tag"></spectrum-chip>
```

### Assist
Action-oriented chips that help users perform quick actions or access tools.

```html
<spectrum-chip variant="assist" label="Quick Action" leadingIcon="build"></spectrum-chip>
```

### Filter
Specialized chips for filtering and search functionality with toggle states.

```html
<spectrum-chip variant="filter" label="Active Filter" selected="true"></spectrum-chip>
```

### Input
Form-integrated chips for removable items like tags, recipients, or selections.

```html
<spectrum-chip variant="input" label="Email Tag" showTrailingIcon="true"></spectrum-chip>
```

### Suggestion
Smart suggestion chips for AI-powered recommendations and content discovery.

```html
<spectrum-chip variant="suggestion" label="Suggested Topic" leadingIcon="auto_awesome"></spectrum-chip>
```

## Size Options

```html
<!-- Size variations -->
<spectrum-chip size="extra-small" label="XS Chip"></spectrum-chip>
<spectrum-chip size="small" label="Small Chip"></spectrum-chip>
<spectrum-chip size="medium" label="Medium Chip"></spectrum-chip>
<spectrum-chip size="large" label="Large Chip"></spectrum-chip>
```

## Interactive Features

### Sound & Haptic Feedback

```html
<spectrum-chip 
  label="Interactive Chip" 
  sound="true" 
  haptic="true"
></spectrum-chip>
```

### Ripple Effects

```html
<spectrum-chip 
  label="Ripple Chip" 
  ripple="true"
></spectrum-chip>
```

### Combined Effects

```html
<spectrum-chip 
  label="Full Experience" 
  sound="true" 
  haptic="true" 
  ripple="true"
></spectrum-chip>
```

## Event Handling

### JavaScript

```javascript
const chip = document.querySelector('spectrum-chip');

chip.addEventListener('chipAction', (event) => {
  const { action, label, selected } = event.detail;
  
  switch (action) {
    case 'click':
      console.log(`Chip "${label}" was clicked`);
      break;
    case 'remove':
      console.log(`Chip "${label}" was removed`);
      chip.remove();
      break;
    case 'toggle':
      console.log(`Chip "${label}" selection: ${selected}`);
      break;
  }
});
```

### Stencil/Lit Framework

```typescript
@Listen('chipAction')
handleChipAction(event: CustomEvent<ChipActionDetail>) {
  const { action, label, selected } = event.detail;
  
  if (action === 'remove') {
    this.removeTag(label);
  } else if (action === 'toggle') {
    this.updateFilter(label, selected);
  }
}
```

## Styling

### CSS Custom Properties

```css
spectrum-chip {
  /* Core styling */
  --chip-background: var(--spectrum-color-surface);
  --chip-color: var(--spectrum-color-on-surface);
  --chip-border-radius: var(--spectrum-shape-corner-medium);
  
  /* Interactive states */
  --chip-hover-background: var(--spectrum-color-surface-hover);
  --chip-active-background: var(--spectrum-color-surface-active);
  --chip-selected-background: var(--spectrum-color-primary);
  
  /* Sizing */
  --chip-padding: var(--spectrum-spacing);
  --chip-font-size: var(--spectrum-font-size-medium);
  
  /* Animation */
  --chip-transition: all 0.2s ease-in-out;
}
```

### Theme Integration

```css
/* Dark theme override */
[data-theme="dark"] spectrum-chip {
  --chip-background: var(--spectrum-color-surface-dark);
  --chip-color: var(--spectrum-color-on-surface-dark);
}

/* High contrast mode */
@media (prefers-contrast: high) {
  spectrum-chip {
    --chip-border: 2px solid var(--spectrum-color-outline);
  }
}
```

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate between chips
- **Enter/Space**: Activate chip
- **Delete/Backspace**: Remove chip (when removable)
- **Arrow Keys**: Navigate in chip groups

### Screen Reader Support
```html
<!-- Descriptive labels -->
<spectrum-chip 
  label="JavaScript (5 results)" 
  variant="filter"
  aria-pressed="true"
  aria-describedby="filter-description"
></spectrum-chip>

<div id="filter-description" class="sr-only">
  This filter is currently active and shows 5 matching results
</div>
```

### Focus Management
```css
spectrum-chip:focus-visible {
  outline: 2px solid var(--spectrum-color-primary);
  outline-offset: 2px;
}
```

## Common Patterns

### Tag Input System

```html
<div class="tag-input-system">
  <div class="active-tags">
    <spectrum-chip variant="input" label="React" showTrailingIcon="true"></spectrum-chip>
    <spectrum-chip variant="input" label="TypeScript" showTrailingIcon="true"></spectrum-chip>
  </div>
  
  <input type="text" placeholder="Add tag..." />
  
  <div class="suggested-tags">
    <spectrum-chip variant="suggestion" label="JavaScript" leadingIcon="add"></spectrum-chip>
    <spectrum-chip variant="suggestion" label="Frontend" leadingIcon="add"></spectrum-chip>
  </div>
</div>
```

### Filter System

```html
<div class="filter-system">
  <div class="filter-group">
    <h4>Categories</h4>
    <spectrum-chip variant="filter" label="All Items" selected="true"></spectrum-chip>
    <spectrum-chip variant="filter" label="Electronics"></spectrum-chip>
    <spectrum-chip variant="filter" label="Clothing"></spectrum-chip>
  </div>
  
  <div class="active-filters">
    <span>Active Filters:</span>
    <spectrum-chip variant="input" label="Under $50" showTrailingIcon="true"></spectrum-chip>
    <spectrum-chip variant="input" label="Free Shipping" showTrailingIcon="true"></spectrum-chip>
  </div>
</div>
```

### Action Menu

```html
<div class="action-menu">
  <spectrum-chip variant="assist" label="Share" leadingIcon="share"></spectrum-chip>
  <spectrum-chip variant="assist" label="Download" leadingIcon="download"></spectrum-chip>
  <spectrum-chip variant="assist" label="Print" leadingIcon="print"></spectrum-chip>
</div>
```

## Performance Tips

### Large Lists
For large numbers of chips, consider virtualization:

```javascript
// Virtual chip list for performance
const VirtualChipList = ({ chips, visibleCount = 50 }) => {
  const [visibleChips, setVisibleChips] = useState(chips.slice(0, visibleCount));
  
  return html`
    <div class="chip-container">
      ${visibleChips.map(chip => html`
        <spectrum-chip
          variant=${chip.variant}
          label=${chip.label}
          .selected=${chip.selected}
        ></spectrum-chip>
      `)}
      
      ${chips.length > visibleCount && html`
        <spectrum-chip
          variant="secondary"
          label="Load More (${chips.length - visibleCount})"
          @chipAction=${() => loadMoreChips()}
        ></spectrum-chip>
      `}
    </div>
  `;
};
```

### Event Delegation
For chip lists, use event delegation for better performance:

```javascript
// Efficient event handling
const chipContainer = document.querySelector('.chip-container');

chipContainer.addEventListener('chipAction', (event) => {
  if (event.target.tagName === 'SPECTRUM-CHIP') {
    handleChipAction(event.detail);
  }
});
```

## Framework Integration

### React

```jsx
import { SpectrumChip } from '@spectrum/react';

function TagList({ tags, onTagRemove }) {
  return (
    <div className="tag-list">
      {tags.map(tag => (
        <SpectrumChip
          key={tag.id}
          variant="input"
          label={tag.label}
          showTrailingIcon={true}
          onChipAction={(detail) => {
            if (detail.action === 'remove') {
              onTagRemove(tag.id);
            }
          }}
        />
      ))}
    </div>
  );
}
```

### Vue

```vue
<template>
  <div class="chip-filters">
    <spectrum-chip
      v-for="filter in filters"
      :key="filter.id"
      variant="filter"
      :label="filter.label"
      :selected="filter.selected"
      @chipAction="handleFilterChange"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleFilterChange(event) {
      const { action, label } = event.detail;
      this.$emit('filter-change', { action, label });
    }
  }
}
</script>
```

### Angular

```typescript
// Component
@Component({
  template: `
    <div class="skill-chips">
      <spectrum-chip
        *ngFor="let skill of skills"
        variant="secondary"
        [label]="skill.name"
        [leadingIcon]="skill.icon"
        (chipAction)="onSkillAction($event)"
      ></spectrum-chip>
    </div>
  `
})
export class SkillListComponent {
  @Input() skills: Skill[] = [];
  @Output() skillAction = new EventEmitter<ChipActionDetail>();
  
  onSkillAction(event: CustomEvent<ChipActionDetail>) {
    this.skillAction.emit(event.detail);
  }
}
```

## Migration Guide

### From v1.x to v2.x

**Breaking Changes:**
- `type` property renamed to `variant`
- `removable` property replaced with `showTrailingIcon`
- Event payload structure updated

**Migration:**
```html
<!-- Before (v1.x) -->
<spectrum-chip type="primary" removable="true"></spectrum-chip>

<!-- After (v2.x) -->
<spectrum-chip variant="primary" showTrailingIcon="true"></spectrum-chip>
```

## Browser Support

- Chrome 60+
- Firefox 63+
- Safari 11+
- Edge 79+

## Contributing

See the [Contributing Guide](../../CONTRIBUTING.md) for development setup and guidelines.

## License

MIT License - see [LICENSE](../../LICENSE) for details. 