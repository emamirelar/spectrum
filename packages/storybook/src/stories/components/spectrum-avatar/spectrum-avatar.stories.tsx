import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumAvatar Component
 * 
 * A versatile avatar component for displaying user profile images, initials, or icons with status indicators and interactive states.

**Variants**: Default, Outlined, Filled

**Dependencies**: None (pure atomic component)

**Accessibility**: Built-in keyboard navigation, screen reader support, and proper focus management.
 * 
 * ### Key Features
 * - **Multiple Content Types**: Images, initials, icons, or fallback person icon
 * - **Dynamic Initials Coloring**: Unique, consistent colors generated from initials using Spectrum design tokens
 * - **Size Variations**: xs, sm, base, lg, xl for various interface density requirements
 * - **Shape Options**: circle, square, rounded for different visual contexts
 * - **Status Indicators**: online, offline, busy, away with customizable visibility
 * - **Interactive States**: Clickable with hover, active, disabled states and smooth transitions
 * - **Auto-Generated Initials**: Intelligent initials generation from labels using first and last name
 * - **Flexible API**: Comprehensive property set enabling fine-grained control over appearance and behavior
 * 
 * ### Usage Guidelines
 * - **Use for**: User profiles, identity visualization, status indicators, team member displays
 * - **Avoid when**: Displaying non-user content, decorative images, or complex data structures
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **avatarAction**: Primary interaction event with action, label, and id context
 */

// Component interfaces for TypeScript support
interface SpectrumAvatarElement {
  debug: boolean;
  src: string;
  alt: string;
  initials: string;
  icon: string;
  label: string;
  avatarId: string;
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  shape: 'circle' | 'square' | 'rounded';
  variant: 'default' | 'outlined' | 'filled';
  status: 'none' | 'online' | 'offline' | 'busy' | 'away';
  showStatus: boolean;
  clickable: boolean;
  disabled: boolean;
  action: string;
  customStyle: any;
}

// Story arguments interface
interface SpectrumAvatarArgs extends SpectrumAvatarElement {}

const meta: Meta<SpectrumAvatarArgs> = {
  title: 'Spectrum/Components/SpectrumAvatar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A versatile avatar component for displaying user profile images, initials, or icons with status indicators and interactive states.

### Event System
- avatarAction: Primary interaction event with action, label, and id context

### Basic Usage
Use standard property binding syntax for all component properties. The avatar component supports multiple content types with automatic fallbacks.

### Content Priority
1. **Image** (if src is provided and loads successfully)
2. **Icon** (if icon is provided) 
3. **Initials** (if initials provided or auto-generated from label)
4. **Fallback** (person icon)

### Integration Notes
This avatar component is a Level 1 atomic component used throughout user interfaces for identity visualization and status indication.
        `
      }
    }
  },
  args: {
    debug: false,
    src: '',
    alt: '',
    initials: '',
    icon: '',
    label: 'John Doe',
    avatarId: '',
    size: 'base',
    shape: 'circle',
    variant: 'default',
    status: 'none',
    showStatus: false,
    clickable: false,
    disabled: false,
    action: 'click',
    customStyle: {},
  },
  argTypes: {
    debug: {
      control: 'boolean',
      description: 'Enable debug logging for development'
    },
    src: {
      control: 'text',
      description: 'Image source URL for the avatar'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image'
    },
    initials: {
      control: 'text',
      description: 'Initials to display (overrides auto-generation from label)'
    },
    icon: {
      control: 'text',
      description: 'Material icon name to display'
    },
    label: {
      control: 'text',
      description: 'Label for accessibility and auto-generating initials'
    },
    avatarId: {
      control: 'text',
      description: 'Unique identifier for the avatar'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      description: 'Size of the avatar'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the avatar'
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Visual variant of the avatar'
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator type'
    },
    showStatus: {
      control: 'boolean',
      description: 'Show status indicator'
    },
    clickable: {
      control: 'boolean',
      description: 'Makes the avatar clickable'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the avatar interactions'
    },
    action: {
      control: 'text',
      description: 'Action identifier for event emission'
    },
    customStyle: {
      control: 'object',
      description: 'Custom CSS styles object'
    }
  }
} satisfies Meta<SpectrumAvatarArgs>;

export default meta;
type Story = StoryObj<SpectrumAvatarArgs>;

// Template function for creating avatar elements
const createAvatar = (args: SpectrumAvatarArgs) => {
  return html`
    <spectrum-avatar
      .debug=${args.debug}
      .src=${args.src}
      .alt=${args.alt}
      .initials=${args.initials}
      .icon=${args.icon}
      .label=${args.label}
      .avatarId=${args.avatarId}
      .size=${args.size}
      .shape=${args.shape}
      .variant=${args.variant}
      .status=${args.status}
      .showStatus=${args.showStatus}
      .clickable=${args.clickable}
      .disabled=${args.disabled}
      .action=${args.action}
      .customStyle=${args.customStyle}
      @avatarAction=${action('avatarAction')}
    ></spectrum-avatar>
  `;
};

// Default story
export const Default: Story = {
  render: (args) => createAvatar(args),
};

// Avatar with Image
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile Picture',
    label: 'John Doe',
  },
  render: (args) => createAvatar(args),
};

// Avatar with Auto-Generated Initials
export const AutoGeneratedInitials: Story = {
  args: {
    label: 'Mary Jane Watson',
  },
  render: (args) => createAvatar(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar with auto-generated initials from first and last name. "Mary Jane Watson" generates "MW" (Mary + Watson) with a unique color based on the initials.',
      },
    },
  },
};

// Avatar with Icon
export const WithIcon: Story = {
  args: {
    icon: 'person',
    label: 'User Profile',
  },
  render: (args) => createAvatar(args),
};

// Size Variations
export const SizeVariations: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      ${createAvatar({ ...meta.args, size: 'xs', label: 'XS' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, size: 'sm', label: 'SM' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, size: 'base', label: 'Base' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, size: 'lg', label: 'LG' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, size: 'xl', label: 'XL' } as SpectrumAvatarArgs)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different size variations of the avatar component.',
      },
    },
  },
};

// Shape Variations
export const ShapeVariations: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      ${createAvatar({ ...meta.args, shape: 'circle', label: 'Circle' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, shape: 'square', label: 'Square' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, shape: 'rounded', label: 'Rounded' } as SpectrumAvatarArgs)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different shape variations of the avatar component.',
      },
    },
  },
};

// Variant Styles
export const VariantStyles: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      ${createAvatar({ ...meta.args, variant: 'default', label: 'Default' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, variant: 'outlined', label: 'Outlined' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, variant: 'filled', label: 'Filled' } as SpectrumAvatarArgs)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different visual variants of the avatar component.',
      },
    },
  },
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      ${createAvatar({ ...meta.args, showStatus: true, status: 'online', label: 'Online' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, showStatus: true, status: 'offline', label: 'Offline' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, showStatus: true, status: 'busy', label: 'Busy' } as SpectrumAvatarArgs)}
      ${createAvatar({ ...meta.args, showStatus: true, status: 'away', label: 'Away' } as SpectrumAvatarArgs)}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Avatar components with different status indicators.',
      },
    },
  },
};

// Clickable Avatar
export const ClickableAvatar: Story = {
  args: {
    label: 'John Doe',
    clickable: true,
    showStatus: true,
    status: 'online',
    action: 'profile-click',
  },
  render: (args) => createAvatar(args),
  parameters: {
    docs: {
      description: {
        story: 'A clickable avatar that emits events when clicked. Check the Actions panel to see events.',
      },
    },
  },
};

// Disabled State
export const DisabledState: Story = {
  args: {
    label: 'Disabled User',
    disabled: true,
    clickable: true,
    showStatus: true,
    status: 'offline',
  },
  render: (args) => createAvatar(args),
  parameters: {
    docs: {
      description: {
        story: 'Avatar in disabled state - reduced opacity and no interactions.',
      },
    },
  },
};

// Interactive Avatar with Hover States
export const InteractiveStates: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 2rem;">
      <div style="text-align: center;">
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Default</div>
        ${createAvatar({ ...meta.args, label: 'Default' } as SpectrumAvatarArgs)}
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Clickable</div>
        ${createAvatar({ ...meta.args, label: 'Clickable', clickable: true } as SpectrumAvatarArgs)}
      </div>
      <div style="text-align: center;">
        <div style="margin-bottom: 0.5rem; font-size: 0.875rem; font-weight: 500;">Disabled</div>
        ${createAvatar({ ...meta.args, label: 'Disabled', clickable: true, disabled: true } as SpectrumAvatarArgs)}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different interactive states of the avatar component. Hover over the clickable avatar to see the hover effect.',
      },
    },
  },
}; 