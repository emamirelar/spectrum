import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumToast Component
 * 
 * A versatile notification component that displays contextual messages at various screen positions. Built for user feedback, status updates, and action confirmations.
 * 
 * ### Key Features
 * - **Multiple Variants**: Six distinct notification styles for different semantic contexts and urgency levels
 * - **Flexible Positioning**: Eight screen positions including corners, edges, and centered placements
 * - **Smart Behavior**: Auto-dismiss, persistence, and manual dismissal options with configurable timing
 * - **Rich Content**: Structured content with titles, messages, icons, and action buttons
 * - **Accessibility**: Built-in screen reader support, keyboard navigation, and WCAG compliance
 * - **Event System**: Comprehensive event emission for user interactions and lifecycle management
 * 
 * ### Usage Guidelines
 * - **Use for**: User feedback, status updates, error reporting, information delivery, action confirmations
 * - **Avoid when**: Displaying complex data, permanent interface elements, or non-notification content
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **toastAction**: Action button interactions with full context and toast data
 * - **toastDismiss**: Toast dismissal events with action type and state information
 */

// Define local interfaces for better type safety
interface SpectrumToastArgs {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  visible: boolean;
  autoClose: boolean;
  duration: number;
  dismissible: boolean;
  persistent: boolean;
  toastTitle: string;
  message: string;
  showIcon: boolean;
  icon: string;
  showCloseButton: boolean;
  actionLabel: string;
  actionValue: string;
  debug: boolean;
}

const meta: Meta<SpectrumToastArgs> = {
  title: 'Spectrum/Components/SpectrumToast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The toast component provides contextual notifications and user feedback with comprehensive positioning and behavior options.

### Event System
All events include action attributes following the Component Events Rule for consistent integration patterns.

### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    variant: 'primary',
    position: 'top',
    visible: true,
    autoClose: false, // Disabled for Storybook demo
    duration: 4000,
    dismissible: true,
    persistent: false,
    toastTitle: 'Notification Title',
    message: 'This is a toast notification message that provides feedback to the user about an action or status.',
    showIcon: true,
    icon: '',
    showCloseButton: true,
    actionLabel: '',
    actionValue: '',
    debug: false
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'],
      description: 'Visual style variant indicating notification type and urgency',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Screen position for toast placement and visibility',
    },
    visible: {
      control: 'boolean',
      description: 'Whether the toast is currently visible on screen',
    },
    autoClose: {
      control: 'boolean',
      description: 'Enable automatic dismissal after specified duration',
    },
    duration: {
      control: 'number',
      description: 'Auto-close duration in milliseconds (default: 4000ms)',
    },
    dismissible: {
      control: 'boolean',
      description: 'Allow manual dismissal via close button or interaction',
    },
    persistent: {
      control: 'boolean',
      description: 'Prevent auto-close even when autoClose is enabled',
    },
    toastTitle: {
      control: 'text',
      description: 'Main title text displayed prominently in the toast',
    },
    message: {
      control: 'text',
      description: 'Detailed message text providing context and information',
    },
    showIcon: {
      control: 'boolean',
      description: 'Display variant-appropriate icon or custom icon',
    },
    icon: {
      control: 'text',
      description: 'Custom Material Design icon name (overrides variant default)',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Display close button for manual dismissal',
    },
    actionLabel: {
      control: 'text',
      description: 'Text label for optional action button',
    },
    actionValue: {
      control: 'text',
      description: 'Value emitted when action button is clicked',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging for development and troubleshooting',
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumToastArgs>;

// Interactive render function
const renderToast = (args: SpectrumToastArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-toast
      variant=${args.variant}
      position=${args.position}
      .visible=${args.visible}
      .autoClose=${args.autoClose}
      duration=${args.duration}
      .dismissible=${args.dismissible}
      .persistent=${args.persistent}
      toast-title=${args.toastTitle}
      message=${args.message}
      .showIcon=${args.showIcon}
      icon=${args.icon}
      .showCloseButton=${args.showCloseButton}
      action-label=${args.actionLabel}
      action-value=${args.actionValue}
      .debug=${args.debug}
      @toastAction=${(e: CustomEvent) => action('toastAction')(e.detail)}
      @toastDismiss=${(e: CustomEvent) => action('toastDismiss')(e.detail)}
    ></spectrum-toast>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderToast,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// VARIANTS
// =================================================================

/**
 * Different notification variants for various semantic contexts and urgency levels.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0 0 1rem 0; color: #333;">Notification Variants</h3>
      
      <spectrum-toast
        variant="success"
        position="top"
        .visible=${true}
        .autoClose=${false}
        toast-title="Success"
        message="Your action has been completed successfully."
        style="position: static; margin-bottom: 12px; display: block; z-index: auto;"
        @toastAction=${(e: CustomEvent) => action('successAction')(e.detail)}
      ></spectrum-toast>
      
      <spectrum-toast
        variant="warning"
        position="top"
        .visible=${true}
        .autoClose=${false}
        toast-title="Warning"
        message="Please review your input before proceeding."
        action-label="Review"
        action-value="review-input"
        style="position: static; margin-bottom: 12px; display: block; z-index: auto;"
        @toastAction=${(e: CustomEvent) => action('warningAction')(e.detail)}
      ></spectrum-toast>
      
      <spectrum-toast
        variant="danger"
        position="top"
        .visible=${true}
        .autoClose=${false}
        toast-title="Error"
        message="Unable to complete the operation. Please try again."
        action-label="Retry"
        action-value="retry-operation"
        style="position: static; margin-bottom: 12px; display: block; z-index: auto;"
        @toastAction=${(e: CustomEvent) => action('errorAction')(e.detail)}
      ></spectrum-toast>
      
      <spectrum-toast
        variant="primary"
        position="top"
        .visible=${true}
        .autoClose=${false}
        toast-title="Information"
        message="New features are now available in the latest update."
        action-label="Learn More"
        action-value="view-features"
        style="position: static; margin-bottom: 12px; display: block; z-index: auto;"
        @toastAction=${(e: CustomEvent) => action('infoAction')(e.detail)}
      ></spectrum-toast>
      
      <spectrum-toast
        variant="secondary"
        position="top"
        .visible=${true}
        .autoClose=${false}
        toast-title="Background Process"
        message="Your data sync is running in the background."
        style="position: static; margin-bottom: 12px; display: block; z-index: auto;"
        @toastAction=${(e: CustomEvent) => action('secondaryAction')(e.detail)}
      ></spectrum-toast>
      
      <spectrum-toast
        variant="ghost"
        position="top"
        .visible=${true}
        .autoClose=${false}
        toast-title="Subtle Notification"
        message="This is a minimal, unobtrusive notification."
        style="position: static; margin-bottom: 12px; display: block; z-index: auto;"
        @toastAction=${(e: CustomEvent) => action('ghostAction')(e.detail)}
      ></spectrum-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Showcase of all six notification variants with their semantic meanings and visual styles.

**Variant Guide:**
- **Success**: Green styling for positive feedback and completed actions
- **Warning**: Orange styling for cautions and alerts requiring attention  
- **Danger**: Red styling for errors, failures, and critical notifications
- **Primary**: Blue styling for general information and updates
- **Secondary**: Muted styling for less prominent notifications
- **Ghost**: Minimal styling for subtle, non-intrusive notifications
        `
      }
    }
  }
};

// =================================================================
// POSITIONS (INSTEAD OF SIZES)
// =================================================================

/**
 * Interactive demonstration of positioning options with live examples.
 */
export const Positions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h3 style="margin: 0 0 8px 0; color: #333;">Position Options</h3>
        <p style="margin: 0; color: #666;">Click any button to see toast positioning in action</p>
      </div>
      
      <!-- Position Control Grid -->
      <div style="
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        max-width: 400px;
        margin: 0 auto;
      ">
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'primary');
            toast.setAttribute('position', 'top-left');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Top Left');
            toast.setAttribute('message', 'Positioned at top-left corner');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'top-left' });
          }}
        >
          Top Left
        </button>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'success');
            toast.setAttribute('position', 'top');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Top Center');
            toast.setAttribute('message', 'Positioned at top center');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'top' });
          }}
        >
          Top Center
        </button>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'warning');
            toast.setAttribute('position', 'top-right');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Top Right');
            toast.setAttribute('message', 'Positioned at top-right corner');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'top-right' });
          }}
        >
          Top Right
        </button>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'secondary');
            toast.setAttribute('position', 'left');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Left Side');
            toast.setAttribute('message', 'Positioned at left edge');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'left' });
          }}
        >
          Left Side
        </button>
        
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 0.8rem;
          text-align: center;
        ">
          Interactive<br/>Demo
        </div>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'ghost');
            toast.setAttribute('position', 'right');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Right Side');
            toast.setAttribute('message', 'Positioned at right edge');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'right' });
          }}
        >
          Right Side
        </button>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'danger');
            toast.setAttribute('position', 'bottom-left');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Bottom Left');
            toast.setAttribute('message', 'Positioned at bottom-left corner');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'bottom-left' });
          }}
        >
          Bottom Left
        </button>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'primary');
            toast.setAttribute('position', 'bottom');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Bottom Center');
            toast.setAttribute('message', 'Positioned at bottom center');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'bottom' });
          }}
        >
          Bottom Center
        </button>
        
        <button
          style="
            padding: 12px 8px;
            border: 1px solid #ddd;
            background: #f8f9fa;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
          "
          @click=${() => {
            const toast = document.createElement('spectrum-toast');
            toast.setAttribute('variant', 'success');
            toast.setAttribute('position', 'bottom-right');
            toast.setAttribute('visible', 'true');
            toast.setAttribute('auto-close', 'true');
            toast.setAttribute('duration', '3000');
            toast.setAttribute('toast-title', 'Bottom Right');
            toast.setAttribute('message', 'Positioned at bottom-right corner');
            document.body.appendChild(toast);
            action('positionDemo')({ position: 'bottom-right' });
          }}
        >
          Bottom Right
        </button>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Interactive demonstration of all 8 positioning options with live examples.

**Position Guide:**
- **Corners**: top-left, top-right, bottom-left, bottom-right for minimal interference
- **Edges**: top, bottom, left, right for centered positioning
- **Strategy**: Choose based on content priority and user workflow patterns

Click any position button to see a live toast demonstration that auto-closes after 3 seconds.
        `
      }
    }
  }
};

// =================================================================
// USAGE SCENARIOS
// =================================================================

/**
 * Real-world notification scenarios organized by type and purpose.
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0; color: #333;">Real-World Usage Scenarios</h3>
      
      <!-- Success Scenarios -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #16a34a;">✅ Success Notifications</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <spectrum-toast
            variant="success"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="File Uploaded"
            message="Your document has been uploaded successfully."
            action-label="View File"
            action-value="view-file"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('fileUploadAction')(e.detail)}
          ></spectrum-toast>
          
          <spectrum-toast
            variant="success"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Settings Saved"
            message="Your preferences have been updated."
            action-label="Close"
            action-value="close"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('settingsSaveAction')(e.detail)}
          ></spectrum-toast>
        </div>
      </div>
      
      <!-- Warning Scenarios -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #ea580c;">⚠️ Warning Alerts</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <spectrum-toast
            variant="warning"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Storage Almost Full"
            message="You have used 90% of your storage space."
            action-label="Upgrade"
            action-value="upgrade-storage"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('storageWarningAction')(e.detail)}
          ></spectrum-toast>
          
          <spectrum-toast
            variant="warning"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Session Expiring"
            message="Your session will expire in 5 minutes."
            action-label="Extend"
            action-value="extend-session"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('sessionWarningAction')(e.detail)}
          ></spectrum-toast>
        </div>
      </div>
      
      <!-- Error Scenarios -->
      <div>
        <h4 style="margin: 0 0 1rem 0; color: #dc2626;">🚨 Error Notifications</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          <spectrum-toast
            variant="danger"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Action Failed"
            message="Unable to complete the requested action."
            action-label="Retry"
            action-value="retry-action"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('actionFailedAction')(e.detail)}
          ></spectrum-toast>
          
          <spectrum-toast
            variant="danger"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Connection Lost"
            message="Network connection has been lost."
            action-label="Reconnect"
            action-value="reconnect"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('connectionErrorAction')(e.detail)}
          ></spectrum-toast>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Collection of real-world notification scenarios organized by type and business purpose.

**Success Notifications:** File operations, settings updates, task completions
**Warning Alerts:** Resource limitations, session alerts, data preservation
**Error Notifications:** Operation failures, connectivity issues, system errors

Each scenario includes contextually appropriate action buttons and follows UX best practices.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Comprehensive accessibility features demonstration.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin: 0 0 1.5rem 0;">♿ Accessibility Features Demo</h3>
      <p style="color: #666; margin: 0 0 2rem 0; line-height: 1.5;">
        This example demonstrates accessibility features including keyboard navigation, screen reader support, and ARIA attributes.
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">Screen Reader Optimized</h4>
          <spectrum-toast
            variant="success"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Screen Reader Friendly"
            message="This toast includes proper ARIA attributes and semantic markup."
            action-label="Continue"
            action-value="continue-action"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('accessibleAction')(e.detail)}
          ></spectrum-toast>
        </div>
        
        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">Keyboard Navigation</h4>
          <spectrum-toast
            variant="warning"
            position="top"
            .visible=${true}
            .autoClose=${false}
            toast-title="Keyboard Accessible"
            message="Action buttons and close controls are keyboard accessible."
            action-label="Test Focus"
            action-value="focus-test"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('keyboardAction')(e.detail)}
          ></spectrum-toast>
        </div>
        
        <div>
          <h4 style="margin: 0 0 0.5rem 0; color: #1e40af;">High Contrast Support</h4>
          <spectrum-toast
            variant="primary"
            position="top"
            .visible=${true}
            .persistent=${true}
            toast-title="Accessible Timing"
            message="Important notifications use persistent mode for adequate reading time."
            action-label="Acknowledge"
            action-value="timing-ack"
            style="position: static; display: block; z-index: auto;"
            @toastAction=${(e: CustomEvent) => action('timingAction')(e.detail)}
          ></spectrum-toast>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 2rem;">
        <h4 style="margin: 0 0 0.75rem 0; color: #333;">Accessibility Checklist</h4>
        <ul style="margin: 0; color: #666; line-height: 1.6;">
          <li>✅ ARIA labels and roles for screen reader support</li>
          <li>✅ Keyboard navigation for all interactive elements</li>
          <li>✅ Sufficient color contrast ratios (WCAG AA compliant)</li>
          <li>✅ Proper focus management and visual indicators</li>
          <li>✅ Appropriate timing for auto-dismiss functionality</li>
          <li>✅ Semantic HTML structure for assistive technologies</li>
        </ul>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive accessibility features ensuring the toast component works for all users.

**Accessibility Features:**
- Screen reader support with proper ARIA attributes
- Keyboard navigation for all interactive elements
- WCAG AA compliant color contrast ratios
- Configurable timing for different user needs
- Semantic markup for assistive technologies

This component meets WCAG 2.1 AA standards and provides an inclusive experience.
        `
      }
    }
  }
};