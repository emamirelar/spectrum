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
 * - **4 Semantic Variants**: Assist, Filter, Input, Suggestion with role-specific styling and behavior
 * - **3 Size Options**: Small, Medium, Large for different interface density requirements
 * - **Interactive States**: Hover, Active, Focus, Selected, Disabled with smooth transitions
 * - **Accessibility**: Full keyboard navigation, ARIA support, screen reader compatibility
 * - **Sound Effects**: Optional audio feedback with customizable sound files
 * - **Haptic Feedback**: Tactile response on supported devices
 * - **Icon Support**: Material Design icons with flexible positioning
 * - **Removable Option**: Dismissible chips with remove functionality
 * - **Event System**: Component Events Rule compliant with structured action attributes
 * 
 * ### Usage Guidelines
 * - Use **Assist** for helpful suggestions and guidance
 * - Use **Filter** for filtering and categorization controls
 * - Use **Input** for user-generated content and tags
 * - Use **Suggestion** for system recommendations and autocomplete
 * - Enable **removable** for dismissible content and tags
 * - Provide **meaningful action values** for analytics and event handling
 * 
 * ### Event System (Component Events Rule Compliant)
 * All chip events follow the Component Events Rule with consistent action attributes:
 * - **chipAction**: Primary chip interaction - `{ action: string, label: string, variant?: string, selected?: boolean }`
 * - **chipRemove**: When chip is removed - `{ action: "remove", label: string, chipId?: string }`
 * - **soundTriggered**: When sound effect is triggered - `{ action: "soundTriggered", soundFile: string }`
 * - **hapticTriggered**: When haptic feedback occurs - `{ action: "hapticTriggered", intensity: string }`
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
 */

// Component interfaces for TypeScript support
interface ChipActionPayload {
  action: string;
  label: string;
  variant?: string;
  selected?: boolean;
  chipId?: string;
}

interface ChipRemovePayload {
  action: "remove";
  label: string;
  chipId?: string;
}

interface SoundTriggeredPayload {
  action: "soundTriggered";
  soundFile: string;
}

interface HapticTriggeredPayload {
  action: "hapticTriggered";
  intensity: string;
}

interface SpectrumChipElement extends HTMLElement {
  label: string;
  variant?: 'assist' | 'filter' | 'input' | 'suggestion';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
  removable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  sound?: boolean;
  soundFile?: string;
  haptic?: boolean;
  hapticIntensity?: 'light' | 'medium' | 'heavy';
  action?: string;
  chipId?: string;
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
- chipRemove: When removable chips are dismissed
- soundTriggered: When audio feedback is triggered
- hapticTriggered: When tactile feedback occurs

### Basic Usage
Use .label property for chip text and listen for chipAction events with action attributes.
        `
      }
    }
  },
  args: {
    label: 'Sample Chip',
    variant: 'assist',
    size: 'medium',
    icon: '',
    iconPosition: 'left',
    removable: false,
    selected: false,
    disabled: false,
    outlined: false,
    sound: false,
    soundFile: '/chip.mp3',
    haptic: false,
    hapticIntensity: 'medium',
    action: 'chip-click',
    chipId: '',
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
      options: ['assist', 'filter', 'input', 'suggestion'],
      description: 'Semantic variant that determines the chip appearance and usage context',
      table: {
        type: { 
          summary: "'assist' | 'filter' | 'input' | 'suggestion'",
          detail: `
            - assist: Helper suggestions and guidance
            - filter: Filtering and categorization controls
            - input: User-generated content and tags
            - suggestion: System recommendations and autocomplete
          `
        },
        defaultValue: { summary: "'assist'" }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Chip size affecting padding, font size, and overall dimensions',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: "'medium'" }
      }
    },
    icon: {
      control: 'text',
      description: 'Material Design icon name to display alongside text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the chip text',
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: "'left'" }
      }
    },
    removable: {
      control: 'boolean',
      description: 'Shows remove button and enables dismissal functionality',
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
    outlined: {
      control: 'boolean',
      description: 'Applies outlined styling with transparent background and border',
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
    soundFile: {
      control: 'text',
      description: 'Path to audio file for sound feedback',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'/chip.mp3'" }
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
    hapticIntensity: {
      control: 'select',
      options: ['light', 'medium', 'heavy'],
      description: 'Intensity level for haptic feedback',
      table: {
        type: { summary: "'light' | 'medium' | 'heavy'" },
        defaultValue: { summary: "'medium'" }
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
    chipId: {
      control: 'text',
      description: 'Unique identifier for the chip, included in events',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
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
      .icon=${args.icon}
      .iconPosition=${args.iconPosition}
      ?removable=${args.removable}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      ?outlined=${args.outlined}
      ?sound=${args.sound}
      .soundFile=${args.soundFile}
      ?haptic=${args.haptic}
      .hapticIntensity=${args.hapticIntensity}
      .action=${args.action}
      .chipId=${args.chipId}
      ?debug=${args.debug}
      @chipAction=${(e: CustomEvent<ChipActionPayload>) => action('chipAction')(e.detail)}
      @chipRemove=${(e: CustomEvent<ChipRemovePayload>) => action('chipRemove')(e.detail)}
      @soundTriggered=${(e: CustomEvent<SoundTriggeredPayload>) => action('soundTriggered')(e.detail)}
      @hapticTriggered=${(e: CustomEvent<HapticTriggeredPayload>) => action('hapticTriggered')(e.detail)}
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
 * **Event Testing**: Click the chip to see chipAction events, enable removable to test chipRemove events.
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
- Enable removable to test chipRemove events
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
 * Demonstrates the assist, filter, input, and suggestion chip types.
 */
export const BasicVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-chip 
        label="Assist Chip" 
        variant="assist" 
        action="assist-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Filter Chip" 
        variant="filter" 
        action="filter-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Input Chip" 
        variant="input" 
        action="input-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Suggestion Chip" 
        variant="suggestion" 
        action="suggestion-action"
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
- \`chipAction\`: \`{ action: "assist-action", label: "Assist Chip", variant: "assist" }\`
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
        label="Small" 
        size="small" 
        action="small-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Medium" 
        size="medium" 
        action="medium-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Large" 
        size="large" 
        action="large-action"
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
        label="Normal" 
        action="normal-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Selected" 
        selected
        action="selected-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Disabled" 
        disabled
        action="disabled-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Removable" 
        removable
        action="removable-action"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
        @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
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
- Removable: Shows remove button and enables dismissal
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
        label="Save Document" 
        icon="save"
        icon-position="left"
        variant="assist"
        action="save-document"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Next Step" 
        icon="arrow_forward"
        icon-position="right"
        variant="suggestion"
        action="next-step"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="JavaScript" 
        icon="code"
        variant="input"
        removable
        action="remove-tag"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
        @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
      </spectrum-chip>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Icons enhance chip functionality by providing visual context and improved recognition. Icons can be
positioned before or after text for different visual effects.

**Icon Patterns:**
- Left icons: Most common for category identification
- Right icons: Good for directional actions or status
- With removable: Common for tag-style chips
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
          label="React" 
          variant="input"
          removable
          chip-id="react-tag"
          action="remove-skill"
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
          @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
        </spectrum-chip>
        <spectrum-chip 
          label="TypeScript" 
          variant="input"
          removable
          chip-id="typescript-tag"
          action="remove-skill"
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
          @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
        </spectrum-chip>
        <spectrum-chip 
          label="Stencil" 
          variant="input"
          removable
          chip-id="stencil-tag"
          action="remove-skill"
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
          @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
        </spectrum-chip>
      </div>
      <p style="text-align: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.875rem; margin: 1rem 0 0 0;">
        Click the × button to remove chips and see chipRemove events with chip IDs
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Removable chips for tag-style interfaces where users can dismiss items. Each chip has a unique ID
that is included in removal events for proper state management.

**Removal Events:**
- \`chipRemove\`: \`{ action: "remove", label: "React", chipId: "react-tag" }\`
- Events include chip ID for state management
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
        label="Outlined Assist" 
        variant="assist"
        outlined
        action="assist-outlined"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Outlined Filter" 
        variant="filter"
        outlined
        action="filter-outlined"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Outlined Input" 
        variant="input"
        outlined
        action="input-outlined"
        @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
      </spectrum-chip>
      <spectrum-chip 
        label="Outlined Suggestion" 
        variant="suggestion"
        outlined
        action="suggestion-outlined"
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
            label="JavaScript" 
            variant="input"
            removable
            chip-id="js-skill"
            action="remove-skill"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
            @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="React" 
            variant="input"
            removable
            chip-id="react-skill"
            action="remove-skill"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
            @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Node.js" 
            variant="input"
            removable
            chip-id="node-skill"
            action="remove-skill"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
            @chipRemove=${(e: CustomEvent) => action('chipRemove')(e.detail)}>
          </spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Suggested Skills</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip 
            label="TypeScript" 
            variant="suggestion"
            action="add-skill"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Python" 
            variant="suggestion"
            action="add-skill"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Docker" 
            variant="suggestion"
            action="add-skill"
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
            label="All Products" 
            variant="filter"
            selected
            action="filter-all"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Electronics" 
            variant="filter"
            action="filter-electronics"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Clothing" 
            variant="filter"
            action="filter-clothing"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Books" 
            variant="filter"
            action="filter-books"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Price Range</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip 
            label="Under $25" 
            variant="filter"
            action="filter-price-low"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="$25 - $100" 
            variant="filter"
            selected
            action="filter-price-medium"
            @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}>
          </spectrum-chip>
          <spectrum-chip 
            label="Over $100" 
            variant="filter"
            action="filter-price-high"
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