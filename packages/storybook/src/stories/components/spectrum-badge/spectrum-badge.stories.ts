import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Import example components
import { 
  basicPrimaryBadge, 
  basicSecondaryBadge, 
  basicCircularBadge,
  basicSizeExamples,
  basicSlottedContent
} from './Examples/BasicExamples';
import { 
  allVariants, 
  circularVariants,
  statusVariants,
  notificationVariants,
  variantSizeComparison
} from './Examples/VariantExamples';
import { 
  circularFeature,
  slottedContentFeatures,
  sizeFeatures,
  notificationCountProgression,
  statusIndicatorPatterns,
  debugFeature
} from './Examples/FeatureExamples';
import { 
  navigationUsage,
  cardStatusUsage,
  userRoleUsage,
  ecommerceUsage,
  dashboardMetricsUsage,
  mobileNotificationUsage,
  accessibilityUsage
} from './Examples/UsageExamples';

// TypeScript interface for the component
interface SpectrumBadgeElement extends HTMLElement {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size: 'small' | 'medium' | 'large';
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
The Spectrum Badge component provides a flexible display element for status indicators, notifications, counts, and labels. It supports multiple variants, sizes, and configurations to fit various design contexts.

### Basic Usage

\`\`\`html
<spectrum-badge 
  text="New" 
  variant="primary">
</spectrum-badge>
\`\`\`

### Circular Badges

\`\`\`html
<spectrum-badge 
  text="5" 
  variant="danger" 
  circular>
</spectrum-badge>
\`\`\`

### Slotted Content

\`\`\`html
<spectrum-badge variant="success">
  <span>✓ Verified</span>
</spectrum-badge>
\`\`\`
        `
      }
    }
  },
  args: {
    text: 'Badge',
    variant: 'primary',
    size: 'medium',
    circular: false,
    debug: false
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content displayed in the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The visual style variant of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'primary'" }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'medium'" }
      }
    },
    circular: {
      control: 'boolean',
      description: 'Whether the badge should be circular (ideal for single characters or icons)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging in browser console',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumBadgeArgs>;

/**
 * Interactive playground for exploring badge properties and configurations.
 */
export const SpectrumPlayground: Story = {
  render: (args) => html`
    <spectrum-badge 
      text=${args.text}
      variant=${args.variant}
      size=${args.size}
      ?circular=${args.circular}
      ?debug=${args.debug}>
    </spectrum-badge>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to experiment with different badge configurations and see real-time changes.'
      }
    }
  }
};

/**
 * Basic badge examples demonstrating core functionality.
 */
export const SpectrumBasicExamples: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Primary Badge</h3>
        ${basicPrimaryBadge()}
      </div>
      
      <div>
        <h3>Secondary Badge</h3>
        ${basicSecondaryBadge()}
      </div>
      
      <div>
        <h3>Circular Badge</h3>
        ${basicCircularBadge()}
      </div>
      
      <div>
        <h3>Size Examples</h3>
        ${basicSizeExamples()}
      </div>
      
      <div>
        <h3>Slotted Content</h3>
        ${basicSlottedContent()}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Fundamental badge configurations showing primary usage patterns and core features.'
      },
      source: {
        code: `<spectrum-badge text="New" variant="primary"></spectrum-badge>
<spectrum-badge text="5" variant="danger" circular></spectrum-badge>
<spectrum-badge variant="success">
  <span>✓ Complete</span>
</spectrum-badge>`
      }
    }
  }
};

/**
 * Comprehensive showcase of all badge variants.
 */
export const SpectrumAllVariants: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>All Variants</h3>
        ${allVariants()}
      </div>
      
      <div>
        <h3>Circular Variants</h3>
        ${circularVariants()}
      </div>
      
      <div>
        <h3>Status Variants</h3>
        ${statusVariants()}
      </div>
      
      <div>
        <h3>Notification Counts</h3>
        ${notificationVariants()}
      </div>
      
      <div>
        <h3>Size Comparison</h3>
        ${variantSizeComparison()}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Complete overview of all available badge variants, sizes, and styling options.'
      },
      source: {
        code: `<!-- All variants -->
<spectrum-badge text="Primary" variant="primary"></spectrum-badge>
<spectrum-badge text="Secondary" variant="secondary"></spectrum-badge>
<spectrum-badge text="Success" variant="success"></spectrum-badge>
<spectrum-badge text="Warning" variant="warning"></spectrum-badge>
<spectrum-badge text="Danger" variant="danger"></spectrum-badge>

<!-- Circular variants -->
<spectrum-badge text="1" variant="primary" circular></spectrum-badge>
<spectrum-badge text="99+" variant="danger" circular></spectrum-badge>`
      }
    }
  }
};

/**
 * Interactive feature demonstrations.
 */
export const SpectrumFeatureDemonstrations: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Circular Feature</h3>
        ${circularFeature()}
      </div>
      
      <div>
        <h3>Slotted Content Features</h3>
        ${slottedContentFeatures()}
      </div>
      
      <div>
        <h3>Size Features</h3>
        ${sizeFeatures()}
      </div>
      
      <div>
        <h3>Notification Count Progression</h3>
        ${notificationCountProgression()}
      </div>
      
      <div>
        <h3>Status Indicator Patterns</h3>
        ${statusIndicatorPatterns()}
      </div>
      
      <div>
        <h3>Debug Feature</h3>
        ${debugFeature()}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Detailed demonstrations of specific badge features including circular mode, slotted content, sizing, and debug capabilities.'
      },
      source: {
        code: `<!-- Circular feature -->
<spectrum-badge text="New" variant="primary"></spectrum-badge>
<spectrum-badge text="5" variant="primary" circular></spectrum-badge>

<!-- Slotted content -->
<spectrum-badge variant="primary">
  <span>✓ Verified</span>
</spectrum-badge>

<!-- Debug mode -->
<spectrum-badge text="Debug" variant="primary" debug></spectrum-badge>`
      }
    }
  }
};

/**
 * Real-world usage examples and patterns.
 */
export const SpectrumUsageExamples: Story = {
  render: () => html`
    <div style="max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 3rem;">
      <div>
        <h3>Navigation with Notifications</h3>
        ${navigationUsage()}
      </div>
      
      <div>
        <h3>Project Status Cards</h3>
        ${cardStatusUsage()}
      </div>
      
      <div>
        <h3>User Role Management</h3>
        ${userRoleUsage()}
      </div>
      
      <div>
        <h3>E-commerce Product Badges</h3>
        ${ecommerceUsage()}
      </div>
      
      <div>
        <h3>Dashboard Metrics</h3>
        ${dashboardMetricsUsage()}
      </div>
      
      <div>
        <h3>Mobile Notifications</h3>
        ${mobileNotificationUsage()}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Practical examples showing how badges integrate into real-world applications and user interfaces.'
      },
      source: {
        code: `<!-- Navigation notification -->
<span>Messages</span>
<spectrum-badge text="5" variant="danger" circular size="small"></spectrum-badge>

<!-- Status card -->
<h3>Project Alpha</h3>
<spectrum-badge text="Active" variant="success"></spectrum-badge>

<!-- User role -->
<div>John Doe</div>
<spectrum-badge text="Admin" variant="danger"></spectrum-badge>`
      }
    }
  }
};

/**
 * Accessibility-focused badge examples.
 */
export const SpectrumAccessibilityExamples: Story = {
  render: () => html`
    <div style="max-width: 800px; margin: 0 auto;">
      ${accessibilityUsage()}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Examples demonstrating accessibility best practices including high contrast, appropriate sizing, and meaningful content.'
      },
      source: {
        code: `<!-- Accessible badges with meaningful text -->
<spectrum-badge text="✓ Approved" variant="success"></spectrum-badge>
<spectrum-badge text="⚠ Review Required" variant="warning"></spectrum-badge>
<spectrum-badge text="✗ Rejected" variant="danger"></spectrum-badge>

<!-- Large badges for better visibility -->
<spectrum-badge text="Easy to Read" variant="primary" size="large"></spectrum-badge>`
      }
    }
  }
}; 