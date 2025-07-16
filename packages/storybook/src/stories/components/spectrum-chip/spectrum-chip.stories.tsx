import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## Spectrum Chip Component
 * 
 * A comprehensive, interactive chip component that provides compact, actionable elements for tags, filters,
 * selections, and content organization. The chip component offers extensive customization options, accessibility
 * features, and modern interaction capabilities including sound effects, haptic feedback, and visual animations.
 * 
 * ### Key Features
 * - **6 Semantic Variants**: Primary, Secondary, Assist, Filter, Input, Suggestion with role-specific styling and behavior
 * - **4 Size Options**: Extra Small, Small, Medium, Large for different interface density requirements
 * - **Interactive States**: Hover, Active, Focus, Selected, Disabled with smooth transitions
 * - **Accessibility**: Full keyboard navigation, ARIA support, screen reader compatibility
 * - **Sound Effects**: Optional audio feedback with customizable sound files
 * - **Haptic Feedback**: Tactile response on supported devices
 * - **Icon Support**: Material Design icons with leading/trailing positioning
 * - **Removable Option**: Dismissible chips with trailing icon functionality
 * - **Event System**: Component Events Rule compliant with structured action attributes
 * 
 * ### Usage Guidelines
 * - Use **Primary** for main chip elements and primary selections
 * - Use **Secondary** for alternative and secondary chip elements
 * - Use **Assist** for helpful suggestions and guidance
 * - Use **Filter** for filtering and categorization controls
 * - Use **Input** for user-generated content and tags
 * - Use **Suggestion** for system recommendations and autocomplete
 * - Enable **showTrailingIcon** for dismissible content and tags
 * - Provide **meaningful action values** for analytics and event handling
 * 
 * ### Event System (Component Events Rule Compliant)
 * All chip events follow the Component Events Rule with consistent action attributes:
 * - **chipAction**: Primary chip interaction - `{ action?: string, label: string }`
 * 
 * ### Component Dependencies
 * 
 * ```mermaid
 * graph TD;
 *   spectrum-accordion --> spectrum-chip
 *   spectrum-conversation-panel --> spectrum-chip
 *   style spectrum-chip fill:#f9f,stroke:#333,stroke-width:4px
 *   style spectrum-accordion fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
 *   style spectrum-conversation-panel fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
 * ```
 * 
 * The chip component is used by accordion and conversation panel components for interactive elements and tags.
 * 
 * ### Integration Patterns
 * - **Component Integration**: Used within complex components for tags, labels, and interactive micro-elements
 * - **Form Systems**: Integrated with form controls for tag input and selection systems
 * - **Event Propagation**: Events bubble up through component hierarchies for centralized handling
 * - **Theme Integration**: Responds to theme changes and supports dark/light mode variations
 */

// Component interfaces for TypeScript support
interface ChipActionPayload {
  action?: string;
  label: string;
}

interface SpectrumChipElement extends HTMLElement {
  variant?: 'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion';
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  selected?: boolean;
  disabled?: boolean;
  outline?: boolean;
  ripple?: boolean;
  action?: string;
  label: string;
  leadingIcon?: string;
  trailingIcon?: string;
  showTrailingIcon?: boolean;
  sound?: boolean;
  haptic?: boolean;
  debug?: boolean;
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
The Spectrum Chip component provides compact, interactive elements for content organization, filtering, and user
selections. It follows the Component Events Rule with well-structured events that include action attributes for
all interactions.

### Event System
All events include action attributes:
- chipAction: Primary chip interactions with action context

### Basic Usage
Use .label property for chip text and listen for chipAction events with action attributes.
        `
      }
    }
  },
  args: {
    label: 'Sample Chip',
    variant: 'primary',
    size: 'medium',
    leadingIcon: '',
    trailingIcon: 'close',
    showTrailingIcon: false,
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    sound: false,
    haptic: false,
    action: 'chip-click',
    debug: false
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content displayed on the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Chip'" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'assist', 'filter', 'input', 'suggestion'],
      description: 'Semantic variant that determines the chip appearance and usage context',
      table: {
        type: { 
          summary: "'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion'",
          detail: `
            - primary: Main chip elements and primary selections
            - secondary: Alternative and secondary chip elements
            - assist: Helper suggestions and guidance
            - filter: Filtering and categorization controls
            - input: User-generated content and tags
            - suggestion: System recommendations and autocomplete
          `
        },
        defaultValue: { summary: "'primary'" }
      }
    },
    size: {
      control: 'select',
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'Chip size affecting padding, font size, and overall dimensions',
      table: {
        type: { summary: "'extra-small' | 'small' | 'medium' | 'large'" },
        defaultValue: { summary: "'medium'" }
      }
    },
    leadingIcon: {
      control: 'text',
      description: 'Material Design icon name to display at the start of the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    trailingIcon: {
      control: 'text',
      description: 'Material Design icon name to display at the end of the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'close'" }
      }
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Shows trailing icon and enables dismissal functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    selected: {
      control: 'boolean',
      description: 'Indicates whether the chip is in selected state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the chip, preventing interactions and applying disabled styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Applies outlined styling with transparent background and border',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Enables ripple animation effect on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Enables audio feedback when chip is clicked',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Enables haptic feedback on supported devices',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    action: {
      control: 'text',
      description: 'Action value included in chipAction events',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'chip-click'" }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show console logs for chip interactions',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
} satisfies Meta<SpectrumChipArgs>;

export default meta;
type Story = StoryObj<SpectrumChipArgs>;

// Interactive render function for playground
const renderChip = (args: SpectrumChipArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-chip
      .label=${args.label}
      .variant=${args.variant}
      .size=${args.size}
      .leadingIcon=${args.leadingIcon}
      .trailingIcon=${args.trailingIcon}
      ?showTrailingIcon=${args.showTrailingIcon}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      ?outline=${args.outline}
      ?ripple=${args.ripple}
      ?sound=${args.sound}
      ?haptic=${args.haptic}
      .action=${args.action}
      ?debug=${args.debug}
      @chipAction=${(e: CustomEvent<ChipActionPayload>) => action('chipAction')(e.detail)}
    ></spectrum-chip>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all chip properties and event handling.
 * Use the controls panel to experiment with different configurations and see how events work.
 * 
 * **Event Testing**: Click the chip to see chipAction events, enable showTrailingIcon to test removal functionality.
 * All events include action attributes following the Component Events Rule.
 */
export const Playground: Story = {
  render: renderChip,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all chip properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.

**Try these interactions:**
- Click the chip to trigger chipAction events with custom action values
- Change variants to see different semantic styles and meanings
- Test different sizes for various interface contexts
- Enable showTrailingIcon to test removal functionality
- Enable sound/haptic feedback to test multimedia interactions
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic chip variants showing the core semantic styles.
 * Demonstrates the primary, secondary, assist, filter, input, and suggestion chip types.
 */
export const BasicVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-chip 
        .label=${"Primary Chip"} 
        .variant=${"primary"} 
        .action=${"primary-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Secondary Chip"} 
        .variant=${"secondary"} 
        .action=${"secondary-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Assist Chip"} 
        .variant=${"assist"} 
        .action=${"assist-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Filter Chip"} 
        .variant=${"filter"} 
        .action=${"filter-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Input Chip"} 
        .variant=${"input"} 
        .action=${"input-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Suggestion Chip"} 
        .variant=${"suggestion"} 
        .action=${"suggestion-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
The core chip variants with semantic styling for different use cases. Each variant has its own visual
styling and semantic meaning for consistent user interface patterns.

**Event Structure:**
- \`chipAction\`: \`{ action: "primary-action", label: "Primary Chip" }\`
- Each variant emits events with its specific action and styling context
        `
      }
    }
  }
};

/**
 * Chip size variations for different interface contexts.
 * Shows how chips scale for different use cases and layouts.
 */
export const SizeVariations: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; align-items: center; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-chip 
        .label=${"Extra Small"} 
        .size=${"extra-small"} 
        .action=${"extra-small-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Small"} 
        .size=${"small"} 
        .action=${"small-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Medium"} 
        .size=${"medium"} 
        .action=${"medium-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Large"} 
        .size=${"large"} 
        .action=${"large-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different chip sizes for various interface contexts. Size affects padding, font size, and overall dimensions
while maintaining consistent proportions and visual hierarchy.

**Size Usage:**
- Extra Small: Most compact interfaces, micro-interactions, minimal space
- Small: Dense interfaces, compact tag lists, inline elements
- Medium: Standard interface elements, most common use case
- Large: Prominent elements, primary selection interfaces
        `
      }
    }
  }
};

/**
 * Chip states showing interactive and selected states.
 * Demonstrates how chips appear in different states.
 */
export const ChipStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-chip 
        .label=${"Normal"} 
        .action=${"normal-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Selected"} 
        ?selected=${true}
        .action=${"selected-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Disabled"} 
        ?disabled=${true}
        .action=${"disabled-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Removable"} 
        ?showTrailingIcon=${true}
        .action=${"removable-action"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different chip states for various interaction scenarios. States provide visual feedback and control
user interactions appropriately.

**State Behaviors:**
- Normal: Standard interactive state with hover/focus effects
- Selected: Indicates active/chosen state with enhanced styling
- Disabled: Non-interactive state with reduced opacity
- Removable: Shows trailing icon and enables dismissal
        `
      }
    }
  }
};

// =================================================================
// FEATURE EXAMPLES
// =================================================================

/**
 * Chips with icons in different positions and configurations.
 * Shows how to combine text and icons for enhanced visual communication.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-chip 
        .label=${"Save Document"} 
        .leadingIcon=${"save"}
        .variant=${"assist"}
        .action=${"save-document"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"JavaScript"} 
        .leadingIcon=${"code"}
        .variant=${"input"}
        ?showTrailingIcon=${true}
        .action=${"remove-tag"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Filter Active"} 
        .leadingIcon=${"filter_list"}
        .variant=${"filter"}
        ?selected=${true}
        .action=${"toggle-filter"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Icons enhance chip functionality by providing visual context and improved recognition. Icons can be
positioned at the leading edge for category identification.

**Icon Patterns:**
- Leading icons: Most common for category identification and visual context
- Trailing icons: Used for actions like removal or expansion
- Combined: Leading icon with trailing action for full functionality
        `
      }
    }
  }
};

/**
 * Removable chips with different removal patterns.
 * Demonstrates chip dismissal functionality and events.
 */
export const RemovableChips: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-direction: column; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <spectrum-chip 
          .label=${"React"} 
          .variant=${"input"}
          ?showTrailingIcon=${true}
          .action=${"remove-skill"}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
        </spectrum-chip>
        <spectrum-chip 
          .label=${"TypeScript"} 
          .variant=${"input"}
          ?showTrailingIcon=${true}
          .action=${"remove-skill"}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
        </spectrum-chip>
        <spectrum-chip 
          .label=${"Stencil"} 
          .variant=${"input"}
          ?showTrailingIcon=${true}
          .action=${"remove-skill"}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
        </spectrum-chip>
      </div>
      <p style="text-align: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.875rem; margin: 1rem 0 0 0;">
        Click the × button to remove chips and see chipAction events with remove action
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Removable chips for tag-style interfaces where users can dismiss items. Each chip emits chipAction
events when the trailing icon is clicked for proper state management.

**Removal Events:**
- \`chipAction\`: \`{ action: "remove", label: "React" }\`
- Events include removal context for state management
        `
      }
    }
  }
};

/**
 * Outlined chip variants for subtle styling.
 * Shows outlined styling option across different variants.
 */
export const OutlinedVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-chip 
        .label=${"Outlined Primary"} 
        .variant=${"primary"}
        ?outline=${true}
        .action=${"primary-outlined"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Outlined Assist"} 
        .variant=${"assist"}
        ?outline=${true}
        .action=${"assist-outlined"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Outlined Filter"} 
        .variant=${"filter"}
        ?outline=${true}
        .action=${"filter-outlined"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        .label=${"Outlined Input"} 
        .variant=${"input"}
        ?outline=${true}
        .action=${"input-outlined"}
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Outlined chip styling provides a subtle alternative to filled chips. Useful for secondary elements
or when you need visual hierarchy without heavy visual weight.

**Outlined Benefits:**
- Less visual weight than filled chips
- Good for secondary chip groups
- Maintains semantic color meaning
- Better for light backgrounds
        `
      }
    }
  }
};

/**
 * Interactive chips with sound and haptic feedback.
 * Demonstrates multimedia interaction capabilities.
 */
export const WithFeedback: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-direction: column; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <spectrum-chip 
          .label=${"Sound Feedback"} 
          ?sound=${true}
          .variant=${"assist"}
          .action=${"sound-test"}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
        </spectrum-chip>
        <spectrum-chip 
          .label=${"Haptic Feedback"} 
          ?haptic=${true}
          .variant=${"assist"}
          .action=${"haptic-test"}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
        </spectrum-chip>
        <spectrum-chip 
          .label=${"Both Feedbacks"} 
          ?sound=${true}
          ?haptic=${true}
          .variant=${"primary"}
          .action=${"both-feedback"}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
        </spectrum-chip>
      </div>
      <p style="text-align: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.875rem; margin: 1rem 0 0 0; max-width: 500px;">
        <strong>Enhanced User Experience:</strong><br>
        Sound and haptic feedback provide additional sensory confirmation of chip interactions,
        improving accessibility and user confidence in their actions.
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Enhanced interaction experience with audio and tactile feedback. These features improve accessibility
and provide confirmation of user actions across different sensory channels.

**Feedback Types:**
- **Sound**: Audio feedback on chip interaction (higher pitch than buttons)
- **Haptic**: Tactile vibration feedback on supported devices (lighter than buttons)
- **Combined**: Both audio and haptic feedback for maximum confirmation
        `
      }
    }
  }
};

// =================================================================
// USAGE EXAMPLES
// =================================================================

/**
 * Tag management interface showing practical chip usage.
 * Demonstrates real-world tag selection and management patterns.
 */
export const TagManagement: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div>
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Skills</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip 
            .label=${"JavaScript"} 
            .variant=${"input"}
            ?showTrailingIcon=${true}
            .action=${"remove-skill"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"React"} 
            .variant=${"input"}
            ?showTrailingIcon=${true}
            .action=${"remove-skill"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Node.js"} 
            .variant=${"input"}
            ?showTrailingIcon=${true}
            .action=${"remove-skill"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Suggested Skills</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip 
            .label=${"TypeScript"} 
            .variant=${"suggestion"}
            .action=${"add-skill"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Python"} 
            .variant=${"suggestion"}
            .action=${"add-skill"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Docker"} 
            .variant=${"suggestion"}
            .action=${"add-skill"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Tag management interface showing practical chip usage for skills, categories, or any taggable content.
Uses input chips for existing tags and suggestion chips for recommendations.

**Pattern Usage:**
- Input chips: User-created or assigned tags (removable)
- Suggestion chips: System recommendations (addable)
- Clear visual hierarchy between existing and suggested content
        `
      }
    }
  }
};

/**
 * Filter interface showing chip-based filtering controls.
 * Demonstrates how chips work as interactive filter controls.
 */
export const FilterInterface: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div>
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Categories</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip 
            .label=${"All Products"} 
            .variant=${"filter"}
            ?selected=${true}
            .action=${"filter-all"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Electronics"} 
            .variant=${"filter"}
            .action=${"filter-electronics"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Clothing"} 
            .variant=${"filter"}
            .action=${"filter-clothing"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Books"} 
            .variant=${"filter"}
            .action=${"filter-books"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Price Range</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip 
            .label=${"Under $25"} 
            .variant=${"filter"}
            .action=${"filter-price-low"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"$25 - $100"} 
            .variant=${"filter"}
            ?selected=${true}
            .action=${"filter-price-medium"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            .label=${"Over $100"} 
            .variant=${"filter"}
            .action=${"filter-price-high"}
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Filter interface using chips as interactive filter controls. Selected chips indicate active filters
with distinct visual styling.

**Filter Patterns:**
- Single selection: Categories with one active filter
- Multiple selection: Price ranges with multiple possible selections
- Clear visual indication of selected/active filters
        `
      }
    }
  }
}; 