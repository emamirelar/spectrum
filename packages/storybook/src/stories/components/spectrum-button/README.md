# Spectrum Button Stories

This directory contains comprehensive Storybook stories for the `spectrum-button` component, showcasing all its variants, features, and real-world usage patterns.

## Structure

```
spectrum-button/
├── spectrum-button.stories.ts  # Main story file
├── README.md                   # This file
└── Examples/                   # Organized example components
    ├── BasicExamples.ts        # Basic button examples
    ├── VariantExamples.ts      # All variant showcases
    ├── FeatureExamples.ts      # Interactive features
    └── UsageExamples.ts        # Real-world patterns
```

## Story Categories

### Interactive Playground
- **Playground**: Interactive controls to test all button properties

### Basic Examples
- **SpectrumPrimary**: Primary button for main actions
- **SpectrumSecondary**: Secondary button for less prominent actions
- **SpectrumDisabled**: Disabled button state
- **SpectrumIconOnly**: Icon-only button configuration
- **SpectrumFAB**: Floating Action Button

### Variant Showcase
- **SpectrumAllVariants**: All button variants (primary, secondary, success, warning, danger, ghost)
- **SpectrumOutlineVariants**: All variants with outline styling
- **SpectrumFABVariants**: FAB variations and sizes

### Feature Demonstrations
- **SpectrumFeedbackFeatures**: Sound, haptic, and ripple effects
- **SpectrumIconExamples**: Different icon configurations
- **SpectrumSizes**: Size variations (sm, base, lg)
- **SpectrumAnimations**: Animation options
- **SpectrumStates**: Button states and actions

### Real-World Usage Examples
- **SpectrumFormButtons**: Common form button patterns
- **SpectrumNavigationButtons**: Navigation patterns
- **SpectrumMediaControls**: Media control patterns
- **SpectrumToolbarActions**: Toolbar action patterns
- **SpectrumCTAButtons**: Call-to-action patterns
- **SpectrumSocialActions**: Social interaction patterns
- **SpectrumLoadingStates**: Loading state patterns
- **SpectrumAccessibilityExamples**: Accessibility-focused examples

## Component Properties

### Basic Properties
- `buttonText`: Text to display on the button
- `variant`: Visual style variant (primary, secondary, success, warning, danger, ghost, outline, fab)
- `size`: Button size (sm, base, lg)
- `disabled`: Whether the button is disabled

### Icon Properties
- `showLeftIcon`: Whether to show the left icon
- `leftIcon`: Material Icon name for the left icon
- `showRightIcon`: Whether to show the right icon
- `rightIcon`: Material Icon name for the right icon
- `iconOnly`: Whether to show only the icon

### Interactive Features
- `sound`: Enable sound effect on click
- `haptic`: Enable haptic feedback on click (mobile)
- `ripple`: Enable visual ripple animation
- `minimalAnimation`: Disable transform animations

### Advanced Properties
- `action`: Custom action value for event handling
- `debug`: Enable debug mode with console logging
- `outline`: Use outline styling instead of filled
- `state`: Current button state (default, hover, active, disabled)

## Usage Guidelines

### Semantic Variants
- **Primary**: Use for main actions (Save, Submit, Continue)
- **Secondary**: Use for secondary actions (Cancel, Back)
- **Success**: Use for positive confirmations (Approve, Complete)
- **Warning**: Use for caution actions (Proceed with Warning)
- **Danger**: Use for destructive actions (Delete, Remove)
- **Ghost**: Use for subtle actions or toolbar buttons
- **FAB**: Use for floating action buttons in interfaces

### Size Guidelines
- **Small (sm)**: Use in compact spaces, toolbars, or dense interfaces
- **Base**: Default size for most use cases
- **Large (lg)**: Use for prominent actions or call-to-action buttons

### Icon Guidelines
- Use clear, recognizable Material Icons
- Left icons typically represent the action (save, delete, add)
- Right icons typically indicate direction or external links (arrow_forward, open_in_new)
- Icon-only buttons should have clear context or tooltips

### Accessibility Considerations
- Use meaningful button text for screen readers
- Provide custom actions for event identification
- Ensure adequate color contrast in all variants
- Support keyboard navigation and focus management

## Event Handling

The button emits a `buttonAction` event with the following payload:
```typescript
{
  action?: string;  // Custom action value
  label: string;    // Button text for identification
}
```

Example event handler:
```typescript
const handleButtonAction = (event: CustomEvent) => {
  const { action, label } = event.detail;
  console.log(`Button clicked: ${label}`, action);
};
```

## Code Examples

### Basic Usage
```html
<spectrum-button 
  button-text="Click me" 
  variant="primary">
</spectrum-button>
```

### With Icon
```html
<spectrum-button 
  button-text="Save" 
  variant="primary"
  show-left-icon
  left-icon="save">
</spectrum-button>
```

### Interactive Features
```html
<spectrum-button 
  button-text="Interactive" 
  variant="primary"
  sound
  haptic
  ripple>
</spectrum-button>
```

### Form Pattern
```html
<div class="form-actions">
  <spectrum-button 
    button-text="Save" 
    variant="primary" 
    show-left-icon 
    left-icon="save">
  </spectrum-button>
  <spectrum-button 
    button-text="Cancel" 
    variant="secondary">
  </spectrum-button>
</div>
```

## Component Dependencies

The button component is used by multiple other Spectrum components:
- spectrum-conversation-panel
- spectrum-hero
- spectrum-image-gallery
- spectrum-rail
- spectrum-rail-item
- spectrum-search-input
- spectrum-select

## Development Notes

- All examples are modular and reusable across stories
- Each story includes comprehensive documentation and code samples
- Interactive features work across different devices and browsers
- The component follows Material Design principles and accessibility standards 