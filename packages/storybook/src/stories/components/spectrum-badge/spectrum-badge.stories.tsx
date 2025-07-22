import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

// Define component types locally for Storybook
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type BadgeSize = 'small' | 'medium' | 'large';

/**
 * ## SpectrumBadge Component
 * 
 * A versatile badge component for displaying status, counts, and notifications with support for multiple variants and sizes.

**Variants**: Primary, Secondary, Success, Warning, Danger

**Accessibility**: Built-in high contrast mode support and proper color contrast ratios.
 * 
 * ### Key Features
 * - **Multiple Variants**: Five distinct color schemes for different contexts and meanings
 * - **Size Options**: Small, medium, and large sizes for various UI density requirements
 * - **Circular Mode**: Optimized display for single characters, numbers, or icons
 * - **Flexible Content**: Support for text content with proper typography scaling
 * - **High Contrast**: Enhanced visibility in high contrast environments
 * 
 * ### Usage Guidelines
 * - **Use for**: Status indicators, notification counts, labels, tags, availability markers
 * - **Avoid when**: Large amounts of text, complex interactive elements, or primary navigation
 * 
 * ### Event System (Component Events Rule Compliant)
 * The badge component is primarily a display element and does not emit interactive events.
 */

// Component interfaces for TypeScript support
interface SpectrumBadgeElement extends HTMLElement {
  variant: BadgeVariant;
  size: BadgeSize;
  text: string;
  circular: boolean;
  debug: boolean;
}

// Story arguments interface
interface SpectrumBadgeArgs extends SpectrumBadgeElement {}

const meta: Meta<SpectrumBadgeArgs> = {
  title: 'Spectrum/Components/SpectrumBadge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile badge component for displaying status, counts, and notifications with support for multiple variants and sizes.

### Basic Usage
Use standard property binding syntax for all component properties.

### Design System Integration
The badge component integrates seamlessly with the Spectrum Design System, using consistent spacing, typography, and color tokens.
        `
      }
    }
  },
  args: {
    variant: 'primary',
    size: 'medium',
    text: 'Badge',
    circular: false,
    debug: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The variant/color of the badge',
      table: {
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'medium' }
      }
    },
    text: {
      control: 'text',
      description: 'The text content of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    circular: {
      control: 'boolean',
      description: 'Whether the badge should be circular (for single characters/icons)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Whether to enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumBadgeArgs>;

// Interactive render function
const renderSpectrumBadge = (args: SpectrumBadgeArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-badge
      .variant=${args.variant}
      .size=${args.size}
      .text=${args.text}
      .circular=${args.circular}
      .debug=${args.debug}
    >
    </spectrum-badge>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties.
 */
export const Playground: Story = {
  render: renderSpectrumBadge,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how different configurations affect the badge appearance and styling.
        `
      }
    }
  }
};

// =================================================================
// VARIANT EXAMPLES
// =================================================================

/**
 * Badge variants showing different color schemes for various use cases.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="primary" text="Primary" size="medium"></spectrum-badge>
        <small>Default state</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="secondary" text="Secondary" size="medium"></spectrum-badge>
        <small>Alternative</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="success" text="Success" size="medium"></spectrum-badge>
        <small>Positive action</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="warning" text="Warning" size="medium"></spectrum-badge>
        <small>Caution needed</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="danger" text="Error" size="medium"></spectrum-badge>
        <small>Critical issue</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different badge variants demonstrate the available color schemes. Each variant serves specific semantic purposes:
- **Primary**: Default state, general information
- **Secondary**: Alternative or less prominent information  
- **Success**: Positive actions, completed states
- **Warning**: Caution, attention needed
- **Danger**: Errors, critical issues
        `
      }
    }
  }
};

// =================================================================
// SIZE EXAMPLES
// =================================================================

/**
 * Badge sizes for different contexts and content density.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="primary" text="Small" size="small"></spectrum-badge>
        <small>Compact UI</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="primary" text="Medium" size="medium"></spectrum-badge>
        <small>Standard</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="primary" text="Large" size="large"></spectrum-badge>
        <small>Prominent</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Badge sizes from small to large accommodate different UI density requirements:
- **Small**: Compact interfaces, high-density layouts
- **Medium**: Standard size for most applications
- **Large**: Prominent display, accessibility considerations
        `
      }
    }
  }
};

// =================================================================
// CIRCULAR BADGES
// =================================================================

/**
 * Circular badges optimized for single characters, numbers, or icons.
 */
export const CircularBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="primary" text="1" circular="true" size="small"></spectrum-badge>
        <small>Notification count</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="warning" text="9" circular="true" size="medium"></spectrum-badge>
        <small>Unread messages</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="danger" text="99+" circular="true" size="large"></spectrum-badge>
        <small>High count</small>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <spectrum-badge variant="success" text="✓" circular="true" size="medium"></spectrum-badge>
        <small>Status indicator</small>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Circular badges are perfect for displaying counts, single characters, or icons. Common use cases include:
- **Notification counts**: Message or alert indicators  
- **Status symbols**: Check marks, exclamation points
- **Single characters**: Initials, shorthand labels
- **Small numbers**: Counts under 100
        `
      }
    }
  }
};

// =================================================================
// REAL-WORLD EXAMPLES
// =================================================================

/**
 * Real-world usage scenarios showing badges in practical contexts.
 */
export const UsageScenarios: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      
      <!-- Status Dashboard -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">System Status Dashboard</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>API Status:</span>
            <spectrum-badge variant="success" text="Online" size="small"></spectrum-badge>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Database:</span>
            <spectrum-badge variant="warning" text="Slow" size="small"></spectrum-badge>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Cache:</span>
            <spectrum-badge variant="danger" text="Down" size="small"></spectrum-badge>
          </div>
        </div>
      </div>

      <!-- Notification Center -->
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Notification Center</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Messages</span>
            <spectrum-badge variant="primary" text="12" circular="true" size="small"></spectrum-badge>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Alerts</span>
            <spectrum-badge variant="danger" text="3" circular="true" size="small"></spectrum-badge>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>Updates</span>
            <spectrum-badge variant="success" text="New" size="small"></spectrum-badge>
          </div>
        </div>
      </div>

      <!-- User Profile -->
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">User Profile Tags</h3>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-badge variant="primary" text="Admin" size="medium"></spectrum-badge>
          <spectrum-badge variant="secondary" text="Verified" size="medium"></spectrum-badge>
          <spectrum-badge variant="success" text="Premium" size="medium"></spectrum-badge>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world usage scenarios demonstrate how badges enhance user interfaces:

**System Status**: Quickly communicate service health and availability
**Notifications**: Show counts and alert users to new content
**User Tags**: Display roles, verification status, and account types

These examples show how badges provide at-a-glance information without cluttering the interface.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Accessibility-focused examples showing proper contrast and usage.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0;">High Contrast Support</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
          <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Light Background</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-badge variant="primary" text="Primary" size="medium"></spectrum-badge>
            <spectrum-badge variant="success" text="Success" size="medium"></spectrum-badge>
            <spectrum-badge variant="danger" text="Error" size="medium"></spectrum-badge>
          </div>
        </div>
        
        <div style="padding: 1rem; background: var(--spectrum-sys-color-inverse-surface); border-radius: 4px;">
          <h4 style="margin-top: 0; color: var(--spectrum-sys-color-inverse-on-surface);">Dark Background</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-badge variant="primary" text="Primary" size="medium"></spectrum-badge>
            <spectrum-badge variant="success" text="Success" size="medium"></spectrum-badge>
            <spectrum-badge variant="danger" text="Error" size="medium"></spectrum-badge>
          </div>
        </div>
      </div>

      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
        <h4 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Screen Reader Friendly</h4>
        <p style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">
          Badges use semantic colors and text that convey meaning even without visual context.
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-badge variant="success" text="Complete" size="medium"></spectrum-badge>
          <spectrum-badge variant="warning" text="Pending" size="medium"></spectrum-badge>
          <spectrum-badge variant="danger" text="Failed" size="medium"></spectrum-badge>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Accessibility features built into the badge component:

**High Contrast**: Badges maintain proper contrast ratios in all themes and environments
**Semantic Colors**: Color choices convey meaning that works with screen readers
**Readable Text**: Font sizes and weights ensure legibility across all size variants
**Theme Support**: Badges adapt to both light and dark themes automatically

The badge component follows WCAG guidelines for color contrast and semantic meaning.
        `
      }
    }
  }
};