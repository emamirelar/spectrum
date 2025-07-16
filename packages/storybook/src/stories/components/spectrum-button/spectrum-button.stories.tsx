import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## Spectrum Button Component
 * 
 * A comprehensive, interactive button component that serves as the foundation for user interactions throughout
 * the Spectrum component system. The button provides extensive customization options, accessibility features,
 * and modern interaction capabilities including sound effects, haptic feedback, and visual animations.
 * 
 * ### Key Features
 * - **8 Visual Variants**: Primary, Secondary, Success, Warning, Danger, Ghost, Outline, FAB with semantic styling
 * - **3 Size Options**: Small (sm), Base (base), Large (lg) for different interface contexts
 * - **Interactive States**: Hover, Active, Focus, Disabled with smooth transitions and visual feedback
 * - **Accessibility**: Full keyboard navigation, ARIA support, screen reader compatibility, and focus management
 * - **Sound Effects**: Optional audio feedback with customizable sound files for enhanced UX
 * - **Haptic Feedback**: Tactile response on supported devices for improved interaction feel
 * - **Icon Support**: Material Design icons with flexible positioning (left, right, or icon-only)
 * - **Event System**: Component Events Rule compliant with structured action attributes
 * 
 * ### Usage Guidelines
 * - Use **Primary** for main actions, call-to-action buttons, and primary workflows
 * - Use **Secondary** for secondary actions, cancel buttons, and alternative options
 * - Use **Success** for confirmation actions, save operations, and positive outcomes
 * - Use **Warning** for caution actions, potentially destructive operations with confirmation
 * - Use **Danger** for destructive actions, delete operations, and critical warnings
 * - Use **Small** size for compact interfaces, table actions, and inline controls
 * - Use **Large** for prominent actions, hero sections, and primary page actions
 * - Enable **sound** and **haptic** feedback for enhanced user experience in appropriate contexts
 * - Provide **meaningful action values** that describe the specific operation being performed
 * 
 * ### Event System (Component Events Rule Compliant)
 * All button events follow the Component Events Rule with consistent action attributes:
 * - **buttonAction**: Primary button interaction - `{ action: string, label: string }`
 * 
 * ### Component Dependencies
 * 
 * ```mermaid
 * graph TD;
 *   spectrum-conversation-panel --> spectrum-button
 *   spectrum-image-gallery --> spectrum-button
 *   spectrum-rail --> spectrum-button
 *   spectrum-rail-item --> spectrum-button
 *   spectrum-search-input --> spectrum-button
 *   spectrum-select --> spectrum-button
 *   spectrum-hero --> spectrum-button
 *   spectrum-accordion --> spectrum-button
 *   style spectrum-button fill:#f9f,stroke:#333,stroke-width:4px
 *   style spectrum-conversation-panel fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
 *   style spectrum-image-gallery fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
 *   style spectrum-rail fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
 *   style spectrum-search-input fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
 *   style spectrum-select fill:#fce4ec,stroke:#c2185b,stroke-width:2px
 *   style spectrum-hero fill:#e0f2f1,stroke:#00695c,stroke-width:2px
 * ```
 * 
 * The button component is used extensively throughout the Spectrum ecosystem as the primary interactive element.
 * It provides consistent interaction patterns and visual feedback across all higher-level components.
 * 
 * ### Integration Patterns
 * - **Component Integration**: Used within complex components for user interactions and form submissions
 * - **Layout Systems**: Integrated with spacing and alignment utilities for consistent positioning
 * - **Event Propagation**: Events bubble up through component hierarchies for centralized handling
 * - **Theme Integration**: Responds to theme changes and supports dark/light mode variations
 */

// Component interfaces for TypeScript support
interface ButtonActionPayload {
  action?: string;
  label: string;
}

interface SpectrumButtonElement extends HTMLElement {
  buttonText: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab';
  size?: 'sm' | 'base' | 'lg';
  leftIcon?: string;
  showLeftIcon?: boolean;
  rightIcon?: string;
  showRightIcon?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  outline?: boolean;
  sound?: boolean;
  haptic?: boolean;
  action?: string;
  debug?: boolean;
  ripple?: boolean;
  showButtonText?: boolean;
}

// Story arguments interface
interface SpectrumButtonArgs extends SpectrumButtonElement {}

const meta: Meta<SpectrumButtonArgs> = {
  title: 'Spectrum/Components/SpectrumButton',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Spectrum Button component provides comprehensive interactive button functionality with extensive customization 
options, accessibility features, and modern interaction capabilities. It follows the Component Events Rule with 
well-structured events that include action attributes for all interactions.

### Event System
All events include action attributes:
- buttonAction: Primary button interaction with action context

### Basic Usage
Use .buttonText property for button text and listen for buttonAction events with action attributes.
        `
      }
    }
  },
  args: {
    buttonText: 'Click me',
    variant: 'primary',
    size: 'base',
    leftIcon: 'star',
    showLeftIcon: false,
    rightIcon: 'arrow_forward',
    showRightIcon: false,
    iconOnly: false,
    disabled: false,
    outline: false,
    sound: false,
    haptic: false,
    action: 'button-click',
    debug: false,
    ripple: false,
    showButtonText: true
  },
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'The text content displayed on the button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Button'" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'outline', 'fab'],
      description: 'Visual style variant that determines the button appearance and semantic meaning',
      table: {
        type: { 
          summary: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab'",
          detail: `
            - primary: Main action buttons with prominent styling
            - secondary: Alternative actions with subtle styling  
            - success: Confirmation actions with green styling
            - warning: Caution actions with orange/yellow styling
            - danger: Destructive actions with red styling
            - ghost: Transparent background variant
            - outline: Outlined button variant
            - fab: Floating action button variant
          `
        },
        defaultValue: { summary: "'primary'" }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'Button size affecting padding, font size, and overall dimensions',
      table: {
        type: { 
          summary: "'sm' | 'base' | 'lg'",
          detail: `
            - sm: Compact size for dense interfaces and inline actions
            - base: Standard size for most common use cases
            - lg: Prominent size for important actions
          `
        },
        defaultValue: { summary: "'base'" }
      }
    },
    leftIcon: {
      control: 'text',
      description: 'Material Design icon name for left icon position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Whether to show the left icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    rightIcon: {
      control: 'text',
      description: 'Material Design icon name for right icon position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Whether to show the right icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether the button should display only an icon without text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled and non-interactive',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Whether to use outline styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Whether to enable sound feedback on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Whether to enable haptic feedback on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    action: {
      control: 'text',
      description: 'Action identifier emitted with events for tracking user interactions',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode for development purposes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to enable ripple animation effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showButtonText: {
      control: 'boolean',
      description: 'Whether to show the button text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumButtonArgs>;

// Interactive render function for playground
const renderButton = (args: SpectrumButtonArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-button
      .buttonText=${args.buttonText}
      .variant=${args.variant}
      .size=${args.size}
      .leftIcon=${args.leftIcon}
      .showLeftIcon=${args.showLeftIcon}
      .rightIcon=${args.rightIcon}
      .showRightIcon=${args.showRightIcon}
      .iconOnly=${args.iconOnly}
      .disabled=${args.disabled}
      .outline=${args.outline}
      .sound=${args.sound}
      .haptic=${args.haptic}
      .action=${args.action}
      .debug=${args.debug}
      .ripple=${args.ripple}
      .showButtonText=${args.showButtonText}
      @buttonAction=${(e: CustomEvent<ButtonActionPayload>) => action('buttonAction')(e.detail)}
    ></spectrum-button>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all button properties and event handling.
 * Use the controls panel to experiment with different configurations and see how events work.
 * 
 * **Event Testing**: Click the button to see buttonAction events. All events include action attributes 
 * following the Component Events Rule.
 */
export const Playground: Story = {
  render: renderButton,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all button properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.

**Try these interactions:**
- Click the button to trigger buttonAction events with custom action values
- Change variants to see different visual styles and semantic meanings
- Test different sizes for various interface contexts
- Enable sound/haptic feedback to test multimedia interactions
- Try icon configurations for different button styles
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic button variants showing the core visual styles.
 * Demonstrates the primary, secondary, and semantic button types.
 */
export const BasicVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-button 
        .buttonText=${"Primary"} 
        .variant=${"primary"} 
        .action=${"primary-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Secondary"} 
        .variant=${"secondary"} 
        .action=${"secondary-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Success"} 
        .variant=${"success"} 
        .action=${"success-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Warning"} 
        .variant=${"warning"} 
        .action=${"warning-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Danger"} 
        .variant=${"danger"} 
        .action=${"danger-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
The core button variants with semantic styling for different action types. Each variant has its own visual
styling and semantic meaning for consistent user interface patterns.

**Event Structure:**
- \`buttonAction\`: \`{ action: "primary-action", label: "Primary" }\`
- Each variant emits events with its specific action and styling context
        `
      },
      source: {
        code: `<spectrum-button
  buttonText="Primary"
  variant="primary"
  action="primary-action"
  @buttonAction=\${(e) => console.log('Primary clicked:', e.detail)}>
</spectrum-button>`
      }
    }
  }
};

/**
 * Button size variations for different interface contexts.
 * Shows how buttons scale for different use cases and layouts.
 */
export const SizeVariations: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; align-items: center; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-button 
        .buttonText=${"Small Button"} 
        .size=${"sm"}
        .variant=${"primary"}
        .action=${"small-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Base Button"} 
        .size=${"base"}
        .variant=${"primary"}
        .action=${"base-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Large Button"} 
        .size=${"lg"}
        .variant=${"primary"}
        .action=${"large-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Three distinct button sizes to accommodate different interface requirements and visual hierarchies.
Size affects padding, font size, and overall button dimensions.

**Use Cases:**
- **Small (sm)**: Compact interfaces, table actions, inline controls
- **Base**: Default size for most common use cases  
- **Large (lg)**: Prominent actions, hero sections, primary CTAs
        `
      }
    }
  }
};

/**
 * Different button states including disabled and loading states.
 * Shows visual feedback for various interaction states.
 */
export const ButtonStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-button 
        .buttonText=${"Normal"} 
        .variant=${"primary"}
        .action=${"normal-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Disabled"} 
        .disabled=${true}
        .action=${"disabled-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Outlined"} 
        .outline=${true}
        .variant=${"primary"}
        .action=${"outlined-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Various button states for different interaction scenarios. States provide visual feedback about the 
button's current condition and availability.

**States Available:**
- **Normal**: Default interactive state
- **Disabled**: Non-interactive state with visual indication
- **Outlined**: Alternative styling with border emphasis
        `
      }
    }
  }
};

/**
 * Buttons with icons in different positions and configurations.
 * Demonstrates icon integration and positioning options.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-button 
        .buttonText=${"Save"} 
        .leftIcon=${"save"}
        .showLeftIcon=${true}
        .variant=${"primary"}
        .action=${"save-action"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Next"} 
        .rightIcon=${"arrow_forward"}
        .showRightIcon=${true}
        .variant=${"secondary"}
        .action=${"next-step"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .leftIcon=${"settings"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .variant=${"secondary"}
        .action=${"open-settings"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .leftIcon=${"delete"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .variant=${"danger"}
        .action=${"delete-item"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Icon integration with Material Design icons for enhanced visual communication. Icons can be positioned
on the left, right, or used as icon-only buttons.

**Icon Options:**
- **Left Icon**: Icon positioned before text content
- **Right Icon**: Icon positioned after text content  
- **Icon Only**: Button displays only the icon without text
        `
      }
    }
  }
};

/**
 * Interactive buttons with sound and haptic feedback.
 * Demonstrates multimedia interaction capabilities.
 */
export const WithFeedback: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-direction: column; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <spectrum-button 
          .buttonText=${"Sound Feedback"} 
          .sound=${true}
          .variant=${"success"}
          .action=${"sound-test"}
          @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
        </spectrum-button>
        <spectrum-button 
          .buttonText=${"Haptic Feedback"} 
          .haptic=${true}
          .variant=${"success"}
          .action=${"haptic-test"}
          @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
        </spectrum-button>
        <spectrum-button 
          .buttonText=${"Both Feedbacks"} 
          .sound=${true}
          .haptic=${true}
          .variant=${"primary"}
          .action=${"both-feedback"}
          @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
        </spectrum-button>
      </div>
      <p style="text-align: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.875rem; margin: 1rem 0 0 0; max-width: 500px;">
        <strong>Enhanced User Experience:</strong><br>
        Sound and haptic feedback provide additional sensory confirmation of user interactions,
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
- **Sound**: Audio feedback on button interaction
- **Haptic**: Tactile vibration feedback on supported devices
- **Combined**: Both audio and haptic feedback for maximum confirmation
        `
      }
    }
  }
};

/**
 * Outlined button styling variations.
 * Shows outlined styling option across different variants.
 */
export const OutlinedVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <spectrum-button 
        .buttonText=${"Primary Outlined"} 
        .variant=${"primary"}
        .outline=${true}
        .action=${"primary-outlined"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Success Outlined"} 
        .variant=${"success"}
        .outline=${true}
        .action=${"success-outlined"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Warning Outlined"} 
        .variant=${"warning"}
        .outline=${true}
        .action=${"warning-outlined"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .buttonText=${"Danger Outlined"} 
        .variant=${"danger"}
        .outline=${true}
        .action=${"danger-outlined"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Outlined button styling provides a subtle alternative to filled buttons. Useful for secondary actions
or when you need visual hierarchy without heavy visual weight.

**Benefits:**
- Less visual prominence than filled buttons
- Maintains semantic color coding
- Better for secondary action hierarchies
        `
      }
    }
  }
};

/**
 * Toolbar button configurations for application toolbars and action bars.
 */
export const ToolbarExample: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; align-items: center;">
      <spectrum-button 
        .leftIcon=${"save"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"save"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .leftIcon=${"undo"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"undo"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .leftIcon=${"redo"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"redo"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <div style="width: 1px; height: 24px; background: var(--spectrum-sys-color-outline); margin: 0 0.5rem;"></div>
      <spectrum-button 
        .leftIcon=${"format_bold"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"bold"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .leftIcon=${"format_italic"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"italic"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <spectrum-button 
        .leftIcon=${"format_underlined"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"underline"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <div style="width: 1px; height: 24px; background: var(--spectrum-sys-color-outline); margin: 0 0.5rem;"></div>
      <spectrum-button 
        .leftIcon=${"more_vert"}
        .showLeftIcon=${true}
        .iconOnly=${true}
        .size=${"sm"}
        .variant=${"secondary"}
        .action=${"more-options"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Compact icon-only buttons designed for application toolbars and action bars. Grouped with visual 
separators for logical organization of related actions.

**Toolbar Design Principles:**
- Small, consistent sizing for dense interfaces
- Icon-only format to maximize space efficiency
- Visual grouping with separators for related actions
- Secondary variant for subtle, non-intrusive styling
        `
      }
    }
  }
};

/**
 * Call-to-action button example with enhanced styling.
 */
export const CallToActionExample: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 3rem; flex-direction: column; align-items: center; background: linear-gradient(135deg, var(--spectrum-sys-color-primary-container), var(--spectrum-sys-color-secondary-container)); border-radius: 12px;">
      <spectrum-button 
        .buttonText=${"Get Started Today"} 
        .leftIcon=${"rocket_launch"}
        .showLeftIcon=${true}
        .variant=${"primary"}
        .size=${"lg"}
        .action=${"get-started"}
        @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
      </spectrum-button>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
        <spectrum-button 
          .buttonText=${"Learn More"} 
          .variant=${"secondary"}
          .size=${"lg"}
          .outline=${true}
          .action=${"learn-more"}
          @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
        </spectrum-button>
        <spectrum-button 
          .buttonText=${"Contact Sales"} 
          .leftIcon=${"phone"}
          .showLeftIcon=${true}
          .variant=${"success"}
          .size=${"lg"}
          .action=${"contact-sales"}
          @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}>
        </spectrum-button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Hero section call-to-action configuration with primary action emphasis and supporting secondary actions.
Designed for landing pages and conversion-focused interfaces.

**CTA Best Practices:**
- Primary action uses largest size and prominent styling
- Secondary actions use outlined or alternative variants
- Clear visual hierarchy guides user attention
- Descriptive action values for analytics tracking
        `
      }
    }
  }
}; 