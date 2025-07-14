import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

// Local interface definition since components are loaded globally
interface SpectrumBadge extends HTMLElement {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size: 'small' | 'medium' | 'large';
  text: string;
  circular: boolean;
  debug: boolean;
}

interface SpectrumBadgeArgs {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size: 'small' | 'medium' | 'large';
  text: string;
  circular: boolean;
  debug: boolean;
}

const meta: Meta<SpectrumBadge> = {
  title: 'Spectrum/Components/SpectrumBadge',
  component: 'spectrum-badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Badge Component

The \`spectrum-badge\` component is a flexible badge for displaying status, counts, or other short information.

## Features

- **Multiple Variants**: Primary, Secondary, Success, Warning, Danger
- **Three Sizes**: Small, Medium, Large
- **Circular Option**: Perfect for icons or single characters
- **Spectrum Design System**: Uses proper Spectrum color tokens and spacing
- **Accessible**: Proper contrast ratios and responsive design

## Usage

### Basic Badge
\`\`\`html
<spectrum-badge text="New" variant="primary"></spectrum-badge>
\`\`\`

### Circular Badge
\`\`\`html
<spectrum-badge text="5" circular="true" variant="danger"></spectrum-badge>
\`\`\`

### With Custom Content
\`\`\`html
<spectrum-badge circular="true" variant="success">
  <span>✓</span>
</spectrum-badge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The color variant of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'The text content of the badge',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    circular: {
      control: { type: 'boolean' },
      description: 'Whether the badge should be circular',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    debug: {
      control: { type: 'boolean' },
      description: 'Enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    text: 'Badge',
    circular: false,
    debug: false,
  },
};

export default meta;
type Story = StoryObj<SpectrumBadgeArgs>;

// Documentation story
export const Docs: Story = {
  render: () => html`
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">
      <h2>Badge Component Overview</h2>
      <p>The <code>spectrum-badge</code> component is a flexible badge for displaying status, counts, or other short information.</p>
      
      <h3>Variants</h3>
      <div style="display: flex; gap: 1rem; margin: 1rem 0; flex-wrap: wrap;">
        <spectrum-badge text="Primary" variant="primary"></spectrum-badge>
        <spectrum-badge text="Secondary" variant="secondary"></spectrum-badge>
        <spectrum-badge text="Success" variant="success"></spectrum-badge>
        <spectrum-badge text="Warning" variant="warning"></spectrum-badge>
        <spectrum-badge text="Danger" variant="danger"></spectrum-badge>
      </div>

      <h3>Sizes</h3>
      <div style="display: flex; gap: 1rem; margin: 1rem 0; align-items: center;">
        <spectrum-badge text="Small" variant="primary" size="small"></spectrum-badge>
        <spectrum-badge text="Medium" variant="primary" size="medium"></spectrum-badge>
        <spectrum-badge text="Large" variant="primary" size="large"></spectrum-badge>
      </div>

      <h3>Circular Badges</h3>
      <div style="display: flex; gap: 1rem; margin: 1rem 0; align-items: center;">
        <spectrum-badge text="1" variant="primary" circular="true" size="small"></spectrum-badge>
        <spectrum-badge text="5" variant="danger" circular="true" size="medium"></spectrum-badge>
        <spectrum-badge text="99" variant="warning" circular="true" size="large"></spectrum-badge>
      </div>

      <h3>Icon Badges</h3>
      <div style="display: flex; gap: 1rem; margin: 1rem 0; align-items: center;">
        <spectrum-badge variant="success" circular="true" size="small">
          <span style="font-size: 10px;">✓</span>
        </spectrum-badge>
        <spectrum-badge variant="danger" circular="true" size="medium">
          <span style="font-size: 12px;">✕</span>
        </spectrum-badge>
        <spectrum-badge variant="warning" circular="true" size="large">
          <span style="font-size: 14px;">!</span>
        </spectrum-badge>
      </div>

      <h3>Usage Examples</h3>
      
      <h4>Basic Badge</h4>
      <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>&lt;spectrum-badge text="New" variant="primary"&gt;&lt;/spectrum-badge&gt;</code></pre>
      
      <h4>Circular Badge</h4>
      <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>&lt;spectrum-badge text="5" circular="true" variant="danger"&gt;&lt;/spectrum-badge&gt;</code></pre>
      
      <h4>Icon Badge</h4>
      <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;"><code>&lt;spectrum-badge circular="true" variant="success"&gt;
  &lt;span&gt;✓&lt;/span&gt;
&lt;/spectrum-badge&gt;</code></pre>

      <h3>Properties</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
        <thead>
          <tr style="background: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 0.75rem; text-align: left;">Property</th>
            <th style="border: 1px solid #ddd; padding: 0.75rem; text-align: left;">Type</th>
            <th style="border: 1px solid #ddd; padding: 0.75rem; text-align: left;">Default</th>
            <th style="border: 1px solid #ddd; padding: 0.75rem; text-align: left;">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 0.75rem;"><code>variant</code></td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">string</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">'primary'</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">Color variant: primary, secondary, success, warning, danger</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 0.75rem;"><code>size</code></td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">string</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">'medium'</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">Size: small, medium, large</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 0.75rem;"><code>text</code></td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">string</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">''</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">Text content of the badge</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 0.75rem;"><code>circular</code></td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">boolean</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">false</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">Whether the badge should be circular</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 0.75rem;"><code>debug</code></td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">boolean</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">false</td>
            <td style="border: 1px solid #ddd; padding: 0.75rem;">Enable debug logging</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive overview of the Spectrum Badge component featuring all variants, sizes, and usage examples.',
      },
    },
  },
};

// Default story
export const Default: Story = {
  args: {
    text: 'Badge',
    variant: 'primary',
    size: 'medium',
  },
  render: (args: SpectrumBadgeArgs) => html`
    <spectrum-badge
      variant="${args.variant}"
      size="${args.size}"
      text="${args.text}"
      ?circular="${args.circular}"
      ?debug="${args.debug}"
    ></spectrum-badge>
  `,
};

// Variant showcase
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <spectrum-badge text="Primary" variant="primary"></spectrum-badge>
      <spectrum-badge text="Secondary" variant="secondary"></spectrum-badge>
      <spectrum-badge text="Success" variant="success"></spectrum-badge>
      <spectrum-badge text="Warning" variant="warning"></spectrum-badge>
      <spectrum-badge text="Danger" variant="danger"></spectrum-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available color variants of the badge component.',
      },
    },
  },
};

// Size showcase
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <spectrum-badge text="Small" variant="primary" size="small"></spectrum-badge>
      <spectrum-badge text="Medium" variant="primary" size="medium"></spectrum-badge>
      <spectrum-badge text="Large" variant="primary" size="large"></spectrum-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Badge component in different sizes.',
      },
    },
  },
};

// Circular badges
export const Circular: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <spectrum-badge text="1" variant="primary" circular="true" size="small"></spectrum-badge>
      <spectrum-badge text="5" variant="danger" circular="true" size="medium"></spectrum-badge>
      <spectrum-badge text="99" variant="warning" circular="true" size="large"></spectrum-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Circular badges perfect for notifications, counts, or status indicators.',
      },
    },
  },
};

// Icon badges
export const IconBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <spectrum-badge variant="success" circular="true" size="small">
        <span style="font-size: 10px;">✓</span>
      </spectrum-badge>
      <spectrum-badge variant="danger" circular="true" size="medium">
        <span style="font-size: 12px;">✕</span>
      </spectrum-badge>
      <spectrum-badge variant="warning" circular="true" size="large">
        <span style="font-size: 14px;">!</span>
      </spectrum-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Circular badges with icon content using slot.',
      },
    },
  },
};

// Status badges
export const StatusBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <spectrum-badge text="New" variant="primary" size="small"></spectrum-badge>
      <spectrum-badge text="Active" variant="success" size="small"></spectrum-badge>
      <spectrum-badge text="Pending" variant="warning" size="small"></spectrum-badge>
      <spectrum-badge text="Inactive" variant="secondary" size="small"></spectrum-badge>
      <spectrum-badge text="Error" variant="danger" size="small"></spectrum-badge>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Common status badges for different states.',
      },
    },
  },
};

// Notification badges
export const NotificationBadges: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <div style="position: relative; display: inline-block;">
        <div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          📧
        </div>
        <spectrum-badge text="3" variant="danger" circular="true" size="small" 
                       style="position: absolute; top: -8px; right: -8px;"></spectrum-badge>
      </div>
      
      <div style="position: relative; display: inline-block;">
        <div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          🔔
        </div>
        <spectrum-badge text="99+" variant="danger" size="small" 
                       style="position: absolute; top: -8px; right: -12px;"></spectrum-badge>
      </div>
      
      <div style="position: relative; display: inline-block;">
        <div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          💬
        </div>
        <spectrum-badge variant="success" circular="true" size="small" 
                       style="position: absolute; top: -4px; right: -4px;">
          <span style="font-size: 8px;">✓</span>
        </spectrum-badge>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Notification badges positioned on icons or other elements.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    text: 'Interactive',
    variant: 'primary',
    size: 'medium',
    circular: false,
  },
  render: (args: SpectrumBadgeArgs) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <spectrum-badge
          variant="${args.variant}"
          size="${args.size}"
          text="${args.text}"
          ?circular="${args.circular}"
          ?debug="${args.debug}"
        ></spectrum-badge>
        <span style="font-size: 14px; color: #666;">
          ${args.variant} • ${args.size} • ${args.circular ? 'circular' : 'rectangular'}
        </span>
      </div>
      
      <div style="font-size: 12px; color: #888; background: #f8f9fa; padding: 1rem; border-radius: 4px;">
        <strong>Current Configuration:</strong><br>
        variant: "${args.variant}"<br>
        size: "${args.size}"<br>
        text: "${args.text}"<br>
        circular: ${args.circular}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive badge with controls to experiment with different properties.',
      },
    },
  },
};

// Usage in image gallery context
export const ImageGallerySelection: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <div style="position: relative; width: 120px; height: 120px; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="https://picsum.photos/120/120?random=1" alt="Sample image" style="width: 100%; height: 100%; object-fit: cover;">
        <spectrum-badge text="✓" variant="primary" circular="true" size="small" 
                       style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);"></spectrum-badge>
      </div>
      
      <div style="position: relative; width: 120px; height: 120px; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="https://picsum.photos/120/120?random=2" alt="Sample image" style="width: 100%; height: 100%; object-fit: cover;">
        <spectrum-badge text="✓" variant="primary" circular="true" size="small" 
                       style="position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%);"></spectrum-badge>
      </div>
      
      <div style="position: relative; width: 120px; height: 120px; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <img src="https://picsum.photos/120/120?random=3" alt="Sample image" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example usage of badges as selection indicators in image galleries.',
      },
    },
  },
}; 