import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumButton Component
 * 
 * A versatile button component with multiple variants, sizes, and states supporting icons, text, and various interactive states.

**Variants**: Primary, Secondary, Success, Warning, Danger, Ghost, Outline, FAB

**Dependencies**: Used by 7+ components including conversation-panel, hero, image-gallery, rail, search-input, and select

**Accessibility**: Built-in keyboard navigation, screen reader support, and proper focus management.
 * 
 * ### Key Features
 * - **Multiple Variants**: Eight distinct button styles for different semantic contexts and UI patterns
 * - **Size Options**: Small, medium (base), and large sizes for various interface density requirements
 * - **Icon Support**: Left icon, right icon, or icon-only configurations with Material Design icons
 * - **Interactive States**: Hover, active, disabled states with smooth animations and transitions
 * - **Haptic Feedback**: Optional haptic feedback for enhanced mobile user experience
 * - **Sound Effects**: Optional audio feedback for interactive experiences
 * - **Flexible API**: Comprehensive property set enabling fine-grained control over appearance and behavior
 * 
 * ### Usage Guidelines
 * - **Use for**: Primary actions, form submissions, navigation triggers, interactive elements
 * - **Avoid when**: Displaying static content, non-interactive elements, or complex data structures
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **buttonAction**: Primary interaction event with action and label context
 */

// Component interfaces for TypeScript support
interface SpectrumButtonElement extends HTMLElement {
  debug: boolean;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab';
  size: 'sm' | 'base' | 'medium' | 'lg';
  outline: boolean;
  iconOnly: boolean;
  disabled: boolean;
  ripple: boolean;
  action: string;
  customStyle: any;
  minimalAnimation: boolean;
  showButtonText: boolean;
  buttonText: string;
  showLeftIcon: boolean;
  leftIcon: string;
  showRightIcon: boolean;
  rightIcon: string;
  sound: boolean;
  haptic: boolean;
  state: 'default' | 'hover' | 'active' | 'disabled';
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
A versatile button component with multiple variants, sizes, and states supporting icons, text, and various interactive states.

### Event System
- buttonAction: Primary interaction event with action and label context

### Basic Usage
Use standard property binding syntax for all component properties. The button component requires either \`buttonText\` or icon configuration.

### Integration Notes
This button component is used throughout the Spectrum Design System by conversation-panel, hero, image-gallery, rail, search-input, and select components.
        `
      }
    }
  },
  args: {
    debug: false,
    variant: 'primary',
    size: 'medium',
    outline: false,
    iconOnly: false,
    disabled: false,
    ripple: true,
    action: 'click',
    customStyle: '',
    minimalAnimation: false,
    showButtonText: true,
    buttonText: 'Click Me',
    showLeftIcon: false,
    leftIcon: 'favorite',
    showRightIcon: false,
    rightIcon: 'arrow_forward',
    sound: false,
    haptic: false,
    state: 'default',
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
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'outline', 'fab'],
      description: 'The button variant/style',
      table: {
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'medium', 'lg'],
      description: 'The button size',
      table: {
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'medium' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show button outline',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether to show only the icon (no text)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on click',
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
    minimalAnimation: {
      control: 'boolean',
      description: 'Whether to use minimal animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showButtonText: {
      control: 'boolean',
      description: 'Whether to show button text',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    buttonText: {
      control: 'text',
      description: 'The button text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Whether to show left icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    leftIcon: {
      control: 'text',
      description: 'Material Design icon name for left position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Whether to show right icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    rightIcon: {
      control: 'text',
      description: 'Material Design icon name for right position',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
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
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'disabled'],
      description: 'The button visual state',
      table: {
        type: { summary: 'ButtonState' },
        defaultValue: { summary: 'default' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumButtonArgs>;

// Interactive render function
const renderSpectrumButton = (args: SpectrumButtonArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-button
      .debug=${args.debug}
      .variant=${args.variant}
      .size=${args.size}
      .outline=${args.outline}
      .iconOnly=${args.iconOnly}
      .disabled=${args.disabled}
      .ripple=${args.ripple}
      .action=${args.action}
      .customStyle=${args.customStyle}
      .minimalAnimation=${args.minimalAnimation}
      .showButtonText=${args.showButtonText}
      .buttonText=${args.buttonText}
      .showLeftIcon=${args.showLeftIcon}
      .leftIcon=${args.leftIcon}
      .showRightIcon=${args.showRightIcon}
      .rightIcon=${args.rightIcon}
      .sound=${args.sound}
      .haptic=${args.haptic}
      .state=${args.state}
      @buttonAction=${action('buttonAction')}
    >
    </spectrum-button>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumButton,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted buttonAction events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// VARIANT EXAMPLES
// =================================================================

/**
 * Button variants showing different semantic styles and use cases.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="primary" button-text="Primary" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Main actions</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="secondary" button-text="Secondary" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Alternative actions</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="success" button-text="Success" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Positive actions</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="warning" button-text="Warning" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Caution required</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="danger" button-text="Danger" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Destructive actions</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="ghost" button-text="Ghost" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Subtle actions</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="outline" button-text="Outline" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Secondary emphasis</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="fab" button-text="FAB" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Floating action</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different button variants serve specific semantic purposes in the interface:
- **Primary**: Main actions, form submissions, primary navigation
- **Secondary**: Alternative actions, secondary navigation
- **Success**: Positive actions, confirmations, completed states
- **Warning**: Actions requiring caution, potentially risky operations
- **Danger**: Destructive actions, deletions, critical operations
- **Ghost**: Subtle actions, minimal visual impact, secondary functionality
- **Outline**: Secondary emphasis, alternative to ghost for better visibility
- **FAB**: Floating action buttons, primary actions in mobile interfaces
        `
      }
    }
  }
};

// =================================================================
// SIZE EXAMPLES
// =================================================================

/**
 * Button sizes for different contexts and interface density.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="primary" size="sm" button-text="Small" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Compact interfaces</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="primary" size="medium" button-text="Medium" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Standard size</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-button variant="primary" size="lg" button-text="Large" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        <small>Prominent actions</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Button sizes accommodate different interface contexts and accessibility requirements:
- **Small**: Compact interfaces, toolbars, dense layouts, secondary actions
- **Medium**: Standard size for most interfaces, optimal balance of visibility and space
- **Large**: Prominent actions, accessibility considerations, mobile-first interfaces

**Note**: The \`base\` size option is still supported for backward compatibility and renders the same as \`medium\`.
        `
      }
    }
  }
};

// =================================================================
// ICON EXAMPLES
// =================================================================

/**
 * Button icon configurations including left icons, right icons, and icon-only buttons.
 */
export const IconButtons: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      
      <!-- Icon Positions -->
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0; margin-bottom: 1rem;">Icon Positions</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" button-text="Save" show-button-text="true" show-left-icon="true" left-icon="save" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Left icon</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" button-text="Next" show-button-text="true" show-right-icon="true" right-icon="arrow_forward" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Right icon</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" button-text="Download" show-button-text="true" show-left-icon="true" left-icon="download" show-right-icon="true" right-icon="expand_more" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Both icons</small>
          </div>
        </div>
      </div>

      <!-- Icon-Only Buttons -->
      <div style="margin-bottom: 2rem;">
        <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0; margin-bottom: 1rem;">Icon-Only Buttons</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" icon-only="true" show-left-icon="true" left-icon="favorite" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Like</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="secondary" icon-only="true" show-left-icon="true" left-icon="share" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Share</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="outline" icon-only="true" show-left-icon="true" left-icon="edit" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Edit</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="danger" icon-only="true" show-left-icon="true" left-icon="delete" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Delete</small>
          </div>
        </div>
      </div>

      <!-- FAB Examples -->
      <div>
        <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0; margin-bottom: 1rem;">Floating Action Buttons</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="fab" size="medium" icon-only="true" show-left-icon="true" left-icon="add" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Add item</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="fab" size="lg" icon-only="true" show-left-icon="true" left-icon="chat" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Start chat</small>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Icon configurations enhance button functionality and visual communication:

**Icon Positions**: Left icons indicate action type, right icons suggest direction or expansion
**Icon-Only**: Compact buttons for toolbars and tight spaces, require clear iconography
**FAB Buttons**: Floating action buttons for primary actions, common in mobile interfaces

Use Material Design icon names for consistent iconography across the design system.
        `
      }
    }
  }
};

// =================================================================
// REAL-WORLD EXAMPLES
// =================================================================

/**
 * Real-world usage scenarios showing buttons in practical interface contexts.
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      
      <!-- Form Actions -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Form Actions</h3>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; align-items: center;">
          <spectrum-button variant="ghost" button-text="Cancel" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="secondary" button-text="Save Draft" show-button-text="true" show-left-icon="true" left-icon="save" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="primary" button-text="Submit" show-button-text="true" show-right-icon="true" right-icon="send" @buttonAction=${action('buttonAction')}></spectrum-button>
        </div>
      </div>

      <!-- Data Actions -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Data Management</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
          <spectrum-button variant="primary" size="sm" button-text="Create New" show-button-text="true" show-left-icon="true" left-icon="add" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="outline" size="sm" button-text="Import" show-button-text="true" show-left-icon="true" left-icon="upload" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="outline" size="sm" button-text="Export" show-button-text="true" show-left-icon="true" left-icon="download" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="ghost" size="sm" icon-only="true" show-left-icon="true" left-icon="refresh" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="ghost" size="sm" icon-only="true" show-left-icon="true" left-icon="filter_list" @buttonAction=${action('buttonAction')}></spectrum-button>
        </div>
      </div>

      <!-- Navigation Actions -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Navigation</h3>
        <div style="display: flex; gap: 1rem; justify-content: space-between; align-items: center;">
          <spectrum-button variant="outline" button-text="Previous" show-button-text="true" show-left-icon="true" left-icon="arrow_back" @buttonAction=${action('buttonAction')}></spectrum-button>
          <div style="display: flex; gap: 0.5rem;">
            <spectrum-button variant="ghost" size="sm" button-text="1" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
            <spectrum-button variant="primary" size="sm" button-text="2" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
            <spectrum-button variant="ghost" size="sm" button-text="3" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          </div>
          <spectrum-button variant="outline" button-text="Next" show-button-text="true" show-right-icon="true" right-icon="arrow_forward" @buttonAction=${action('buttonAction')}></spectrum-button>
        </div>
      </div>

      <!-- Alert Actions -->
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Alert Dialog</h3>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; align-items: center;">
          <spectrum-button variant="ghost" button-text="Cancel" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="danger" button-text="Delete" show-button-text="true" show-left-icon="true" left-icon="delete" @buttonAction=${action('buttonAction')}></spectrum-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world usage scenarios demonstrate button patterns in common interface contexts:

**Form Actions**: Primary-secondary-tertiary hierarchy with clear action progression
**Data Management**: Grouped actions with consistent iconography and appropriate emphasis
**Navigation**: Directional buttons with icons indicating movement and state
**Alert Dialogs**: High-contrast actions with clear destructive vs. safe choices

These patterns follow Material Design principles and provide consistent user experiences across applications.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Accessibility-focused examples showing proper focus management and interactive states.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0;">Accessibility Features</h3>
      
      <!-- Interactive States -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Interactive States</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" state="default" button-text="Default" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Default state</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" state="hover" button-text="Hover" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Hover state</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" state="active" button-text="Active" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
            <small>Active state</small>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <spectrum-button variant="primary" disabled="true" button-text="Disabled" show-button-text="true"></spectrum-button>
            <small>Disabled state</small>
          </div>
        </div>
      </div>

      <!-- High Contrast Support -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">High Contrast Support</h4>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Buttons maintain proper contrast ratios and clear visual hierarchy in all themes.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <spectrum-button variant="primary" outline="true" button-text="High Contrast" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="outline" button-text="Clear Borders" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="success" outline="true" button-text="Semantic Color" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        </div>
      </div>

      <!-- Keyboard Navigation -->
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Keyboard Navigation</h4>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Use Tab to navigate, Enter or Space to activate. Focus indicators are clearly visible.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <spectrum-button variant="primary" button-text="Tab Order 1" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="secondary" button-text="Tab Order 2" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="outline" button-text="Tab Order 3" show-button-text="true" @buttonAction=${action('buttonAction')}></spectrum-button>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Accessibility features built into the button component:

**Interactive States**: Clear visual feedback for all interaction states (default, hover, active, disabled)
**High Contrast**: Maintains proper contrast ratios with outline variants and semantic colors
**Keyboard Navigation**: Full keyboard support with visible focus indicators and proper tab order
**Screen Reader**: Semantic button elements with proper labeling and state communication

The button component follows WCAG guidelines for interactive elements and color contrast requirements.
        `
      }
    }
  }
};