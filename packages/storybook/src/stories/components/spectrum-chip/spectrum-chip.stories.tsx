import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumChip Component
 * 
 * A versatile chip component that can be used for tags, filters, and selections with support for leading/trailing icons, selection states, and various interactive behaviors.

**Variants**: Primary, Secondary, Assist, Filter, Input, Suggestion

**Dependencies**: Used by accordion and conversation-panel components for interactive elements

**Accessibility**: Built-in keyboard navigation, screen reader support, and proper selection state management.
 * 
 * ### Key Features
 * - **Multiple Variants**: Six distinct chip styles for different semantic contexts (primary, secondary, assist, filter, input, suggestion)
 * - **Size Options**: Four sizes from extra-small to large for various interface density requirements
 * - **Icon Support**: Leading and trailing icons with Material Design icon integration
 * - **Selection States**: Toggle-able selection states with visual feedback and accessibility support
 * - **Interactive Behaviors**: Ripple effects, haptic feedback, and sound effects for enhanced user experience
 * - **Flexible API**: Comprehensive property set enabling fine-grained control over appearance and behavior
 * - **Integration Ready**: Used throughout the Spectrum Design System by accordion and conversation-panel components
 * 
 * ### Usage Guidelines
 * - **Use for**: Tags, filters, selections, categories, quick actions, removable items
 * - **Avoid when**: Primary navigation, complex interactive elements, or displaying large amounts of text
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **chipAction**: Primary interaction event with action and label context for selection and removal
 */

// Component interfaces for TypeScript support
interface SpectrumChipElement extends HTMLElement {
  debug: boolean;
  variant: 'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion';
  size: 'small' | 'medium' | 'large' | 'extra-small';
  selected: boolean;
  disabled: boolean;
  outline: boolean;
  ripple: boolean;
  action: string;
  label: string;
  leadingIcon: string;
  trailingIcon: string;
  showTrailingIcon: boolean;
  sound: boolean;
  haptic: boolean;
}

// Story arguments interface
interface SpectrumChipArgs extends SpectrumChipElement {}

const meta: Meta<SpectrumChipArgs> = {
  title: 'Spectrum/Components/SpectrumChip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile chip component that can be used for tags, filters, and selections with support for leading/trailing icons, selection states, and various interactive behaviors.

### Event System
- chipAction: Primary interaction event with action and label context

### Basic Usage
Use standard property binding syntax for all component properties. The chip component displays text labels with optional icons and selection states.

### Integration Notes
This chip component is used throughout the Spectrum Design System by accordion and conversation-panel components for interactive tag and selection functionality.
        `
      }
    }
  },
  args: {
    debug: false,
    variant: 'primary',
    size: 'medium',
    selected: false,
    disabled: false,
    outline: false,
    ripple: true,
    action: 'select',
    label: 'Sample Chip',
    leadingIcon: 'star',
    trailingIcon: 'close',
    showTrailingIcon: false,
    sound: false,
    haptic: false,
  },
  argTypes: {
    debug: {
      control: 'boolean',
      description: 'Whether to enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'assist', 'filter', 'input', 'suggestion'],
      description: 'The chip variant/style for different use cases',
      table: {
        type: { summary: 'ChipVariant' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'The chip size',
      table: {
        type: { summary: 'ChipSize' },
        defaultValue: { summary: 'medium' }
      }
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show chip outline',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    action: {
      control: 'text',
      description: 'Action identifier for event handling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    label: {
      control: 'text',
      description: 'The text label displayed on the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    leadingIcon: {
      control: 'text',
      description: 'Material Design icon name for leading position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    trailingIcon: {
      control: 'text',
      description: 'Material Design icon name for trailing position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'close' }
      }
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Whether to show trailing icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Whether to enable sound effects',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Whether to enable haptic feedback',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumChipArgs>;

// Interactive render function
const renderSpectrumChip = (args: SpectrumChipArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-chip
      .debug=${args.debug}
      .variant=${args.variant}
      .size=${args.size}
      .selected=${args.selected}
      .disabled=${args.disabled}
      .outline=${args.outline}
      .ripple=${args.ripple}
      .action=${args.action}
      .label=${args.label}
      .leadingIcon=${args.leadingIcon}
      .trailingIcon=${args.trailingIcon}
      .showTrailingIcon=${args.showTrailingIcon}
      .sound=${args.sound}
      .haptic=${args.haptic}
      @chipAction=${action('chipAction')}
    >
    </spectrum-chip>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumChip,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted chipAction events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// VARIANT EXAMPLES
// =================================================================

/**
 * Chip variants showing different semantic styles and use cases.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="primary" label="Primary" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Main categories</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="secondary" label="Secondary" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Alternative tags</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="assist" label="Assist" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Helper actions</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="filter" label="Filter" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Filter options</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="input" label="Input" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Input tags</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="suggestion" label="Suggestion" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Suggestions</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different chip variants serve specific semantic purposes in the interface:
- **Primary**: Main categories, important tags, primary selections
- **Secondary**: Alternative tags, less prominent categories
- **Assist**: Helper actions, assistive functionality, suggested actions
- **Filter**: Filter options, toggleable selections, search refinements
- **Input**: Input tags, user-entered content, removable items with close button
- **Suggestion**: Suggestions, recommendations, optional selections
        `
      }
    }
  }
};

// =================================================================
// SIZE EXAMPLES
// =================================================================

/**
 * Chip sizes for different contexts and interface density.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="primary" size="extra-small" label="Extra Small" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Very compact</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="primary" size="small" label="Small" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Compact</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="primary" size="medium" label="Medium" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Standard</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-chip variant="primary" size="large" label="Large" @chipAction=${action('chipAction')}></spectrum-chip>
        <small>Prominent</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Chip sizes accommodate different interface contexts and accessibility requirements:
- **Extra Small**: Very compact interfaces, high-density layouts, micro-interactions
- **Small**: Compact interfaces, toolbars, dense content areas
- **Medium**: Standard size for most interfaces, optimal balance of visibility and space
- **Large**: Prominent display, accessibility considerations, mobile-first interfaces
        `
      }
    }
  }
};

// =================================================================
// SELECTION & ICON EXAMPLES
// =================================================================

/**
 * Chip selection states and icon configurations.
 */
export const SelectionAndIcons: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      
      <!-- Selection States -->
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0; margin-bottom: 1rem;">Selection States</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Unselected" selected="false" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Default state</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Selected" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Active filter</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Disabled" disabled="true" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Unavailable</small>
          </div>
        </div>
      </div>

      <!-- Icon Configurations -->
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0; margin-bottom: 1rem;">Icon Configurations</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="primary" label="With Leading" leading-icon="star" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Leading icon</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="input" label="With Trailing" show-trailing-icon="true" trailing-icon="close" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Removable</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="secondary" label="Both Icons" leading-icon="local_offer" show-trailing-icon="true" trailing-icon="expand_more" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Both icons</small>
          </div>
        </div>
      </div>

      <!-- Outline Variants -->
      <div>
        <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0; margin-bottom: 1rem;">Outline Variants</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="primary" label="Solid" outline="false" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Filled style</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="primary" label="Outline" outline="true" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Border style</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Selected Outline" outline="true" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Active outline</small>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Chip configurations for different interaction patterns:

**Selection States**: Toggleable selection for filters and multi-select scenarios
**Icon Configurations**: Leading icons for categorization, trailing icons for actions (close, expand)
**Outline Variants**: Border-only styles for subtle emphasis and high-contrast needs

These configurations enable flexible usage patterns across different interface contexts.
        `
      }
    }
  }
};

// =================================================================
// REAL-WORLD EXAMPLES
// =================================================================

/**
 * Real-world usage scenarios showing chips in practical interface contexts.
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      
      <!-- Tag Cloud -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Article Tags</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip variant="primary" size="small" label="JavaScript" leading-icon="code" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="primary" size="small" label="React" leading-icon="web" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="secondary" size="small" label="Tutorial" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="secondary" size="small" label="Beginner" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="assist" size="small" label="Popular" leading-icon="trending_up" @chipAction=${action('chipAction')}></spectrum-chip>
        </div>
      </div>

      <!-- Filter Interface -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Search Filters</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <spectrum-chip variant="filter" label="Electronics" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="filter" label="In Stock" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="filter" label="Free Shipping" selected="false" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="filter" label="Brand: Apple" selected="false" @chipAction=${action('chipAction')}></spectrum-chip>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip variant="suggestion" size="small" label="Under $100" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="suggestion" size="small" label="New Arrivals" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="suggestion" size="small" label="Bestsellers" @chipAction=${action('chipAction')}></spectrum-chip>
        </div>
      </div>

      <!-- Input Tags -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Skills Input</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip variant="input" label="TypeScript" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="input" label="Node.js" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="input" label="MongoDB" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="input" label="AWS" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        </div>
      </div>

      <!-- Status Indicators -->
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Project Status</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Priority:</span>
            <spectrum-chip variant="primary" size="small" label="High" leading-icon="priority_high" @chipAction=${action('chipAction')}></spectrum-chip>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Status:</span>
            <spectrum-chip variant="assist" size="small" label="In Progress" leading-icon="schedule" @chipAction=${action('chipAction')}></spectrum-chip>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Team:</span>
            <spectrum-chip variant="secondary" size="small" label="Frontend" @chipAction=${action('chipAction')}></spectrum-chip>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world usage scenarios demonstrate chip versatility in common interface patterns:

**Article Tags**: Categorization with semantic variants and leading icons for visual hierarchy
**Search Filters**: Toggleable filter options with suggestions for enhanced discovery
**Input Tags**: User-entered content with removal capability for dynamic tagging systems
**Status Indicators**: Contextual information display with icons and semantic color coding

These patterns showcase how chips enhance user interfaces with clear, interactive categorization and selection capabilities.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Accessibility-focused examples showing proper contrast and interaction patterns.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0;">Accessibility Features</h3>
      
      <!-- Selection Feedback -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Clear Selection States</h4>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Selection states provide clear visual and semantic feedback for screen readers.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Available" outline="true" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Unselected</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Active" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
            <small>Selected</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-chip variant="filter" label="Unavailable" disabled="true"></spectrum-chip>
            <small>Disabled</small>
          </div>
        </div>
      </div>

      <!-- Keyboard Navigation -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Keyboard Navigation</h4>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Use Tab to navigate, Enter or Space to select/deselect, Delete to remove input chips.
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip variant="filter" label="Filter 1" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="filter" label="Filter 2" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="input" label="Removable" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        </div>
      </div>

      <!-- High Contrast Support -->
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">High Contrast Support</h4>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Outline variants and semantic colors ensure visibility in high contrast environments.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <spectrum-chip variant="primary" label="Primary" outline="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="filter" label="Filter" outline="true" selected="true" @chipAction=${action('chipAction')}></spectrum-chip>
          <spectrum-chip variant="input" label="Input" outline="true" show-trailing-icon="true" @chipAction=${action('chipAction')}></spectrum-chip>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Accessibility features built into the chip component:

**Selection States**: Clear visual distinction between unselected, selected, and disabled states
**Keyboard Navigation**: Full keyboard support with proper focus management and interaction patterns
**High Contrast**: Outline variants maintain visibility with sufficient contrast ratios
**Screen Reader**: Semantic element structure with proper ARIA states for selection feedback

The chip component follows WCAG guidelines for interactive elements and provides accessible multi-selection patterns.
        `
      }
    }
  }
};