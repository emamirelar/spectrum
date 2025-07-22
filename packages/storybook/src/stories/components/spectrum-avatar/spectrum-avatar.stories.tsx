import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Local interface definition since components are loaded globally
interface SpectrumAvatar extends HTMLElement {
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
  debug: boolean;
}

interface SpectrumAvatarArgs {
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
  debug: boolean;
}

const meta = {
  title: 'Spectrum/Components/SpectrumAvatar',
  tags: ['autodocs'],
  args: {
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
    action: 'avatar-click',
    debug: false
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'Image source URL for the avatar',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the avatar image',
    },
    initials: {
      control: 'text',
      description: 'Initials to display (overrides auto-generation from label)',
    },
    icon: {
      control: 'text',
      description: 'Material icon name to display',
    },
    label: {
      control: 'text',
      description: 'Label for accessibility and auto-generating initials',
    },
    avatarId: {
      control: 'text',
      description: 'Unique identifier for the avatar',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square', 'rounded'],
      description: 'Shape of the avatar',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Visual variant of the avatar',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy', 'away'],
      description: 'Status indicator type',
    },
    showStatus: {
      control: 'boolean',
      description: 'Show status indicator',
    },
    clickable: {
      control: 'boolean',
      description: 'Makes the avatar clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the avatar interactions',
    },
    action: {
      control: 'text',
      description: 'Action identifier for event emission',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Avatar

A versatile avatar component for displaying user profile images, initials, or icons. Supports multiple sizes, shapes, status indicators, and interactive states.

 ## Features
 
 - **Multiple Content Types**: Images, initials, icons, or fallback
 - **Dynamic Initials Coloring**: Unique, consistent colors generated from initials
 - **Size Variations**: xs, sm, base, lg, xl  
 - **Shape Options**: circle, square, rounded
 - **Status Indicators**: online, offline, busy, away
 - **Interactive States**: clickable with hover and focus states
 - **Accessibility**: Full keyboard navigation and screen reader support

## Content Priority

1. **Image** (if src is provided and loads successfully)
2. **Icon** (if icon is provided) 
3. **Initials** (if initials provided or auto-generated from label)
4. **Fallback** (person icon)

 ## Auto-Generated Initials
 
 When no explicit initials are provided, the component automatically generates them from the label using first and last name:
 - "John Doe" → "JD"
 - "Mary Jane Watson" → "MW" (Mary + Watson)
 - "SingleName" → "S"
        `,
      },
    },
  },
} satisfies Meta<SpectrumAvatarArgs>;

export default meta;
type Story = StoryObj<SpectrumAvatarArgs>;

// Template function for creating avatar stories
const createAvatar = (args: SpectrumAvatarArgs) => {
  const avatarElement = document.createElement('spectrum-avatar') as SpectrumAvatar;
  
  // Set all properties
  if (args.src) avatarElement.src = args.src;
  if (args.alt) avatarElement.alt = args.alt;
  if (args.initials) avatarElement.initials = args.initials;
  if (args.icon) avatarElement.icon = args.icon;
  if (args.label) avatarElement.label = args.label;
  if (args.avatarId) avatarElement.avatarId = args.avatarId;
  avatarElement.size = args.size;
  avatarElement.shape = args.shape;
  avatarElement.variant = args.variant;
  avatarElement.status = args.status;
  avatarElement.showStatus = args.showStatus;
  avatarElement.clickable = args.clickable;
  avatarElement.disabled = args.disabled;
  if (args.action) avatarElement.action = args.action;
  avatarElement.debug = args.debug;

  // Add event listener for clicks
  avatarElement.addEventListener('avatarAction', action('avatarAction'));

  return avatarElement;
};

// Default story
export const Default: Story = {
  render: (args) => html`${createAvatar(args)}`,
};

// Avatar with Image
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Profile Picture',
    label: 'John Doe',
    size: 'base',
    shape: 'circle',
  },
  render: (args) => html`${createAvatar(args)}`,
};

// Avatar with Initials
export const WithInitials: Story = {
  args: {
    initials: 'JD',
    label: 'John Doe',
    size: 'base',
    shape: 'circle',
  },
  render: (args) => html`${createAvatar(args)}`,
};

// Avatar with Auto-Generated Initials
export const AutoGeneratedInitials: Story = {
  args: {
    label: 'Mary Jane Watson',
    size: 'base',
    shape: 'circle',
  },
  render: (args) => html`${createAvatar(args)}`,
  parameters: {
    docs: {
      description: {
        story: 'Avatar with auto-generated initials from first and last name. "Mary Jane Watson" generates "MW" (Mary + Watson) with a unique color based on the initials.',
      },
    },
  },
};

// Colored Initials Examples
export const ColoredInitials: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      ${createAvatar({ ...meta.args, label: 'Alice Johnson', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Bob Smith', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Charlie Brown', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Diana Prince', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Emma Stone', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Frank Miller', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Grace Kelly', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Henry Ford', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Ivy Chen', size: 'base' })}
      ${createAvatar({ ...meta.args, label: 'Jack Wilson', size: 'base' })}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Each avatar gets a unique, consistent color based on its initials. Same initials will always get the same color, creating a recognizable visual identity.',
      },
    },
  },
};

// Avatar with Icon
export const WithIcon: Story = {
  args: {
    icon: 'person',
    label: 'User Profile',
    size: 'base',
    shape: 'circle',
  },
  render: (args) => html`${createAvatar(args)}`,
};

// Size Variations
export const SizeVariations: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem;">
      ${createAvatar({ ...meta.args, size: 'xs', label: 'XS' })}
      ${createAvatar({ ...meta.args, size: 'sm', label: 'SM' })}
      ${createAvatar({ ...meta.args, size: 'base', label: 'Base' })}
      ${createAvatar({ ...meta.args, size: 'lg', label: 'LG' })}
      ${createAvatar({ ...meta.args, size: 'xl', label: 'XL' })}
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
      ${createAvatar({ ...meta.args, shape: 'circle', label: 'Circle' })}
      ${createAvatar({ ...meta.args, shape: 'square', label: 'Square' })}
      ${createAvatar({ ...meta.args, shape: 'rounded', label: 'Rounded' })}
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
      ${createAvatar({ ...meta.args, variant: 'default', label: 'Default' })}
      ${createAvatar({ ...meta.args, variant: 'outlined', label: 'Outlined' })}
      ${createAvatar({ ...meta.args, variant: 'filled', label: 'Filled' })}
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
      ${createAvatar({ ...meta.args, showStatus: true, status: 'online', label: 'Online' })}
      ${createAvatar({ ...meta.args, showStatus: true, status: 'offline', label: 'Offline' })}
      ${createAvatar({ ...meta.args, showStatus: true, status: 'busy', label: 'Busy' })}
      ${createAvatar({ ...meta.args, showStatus: true, status: 'away', label: 'Away' })}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Avatar components with different status indicators. Status indicators are positioned with a subtle overlap at the bottom-right corner, extending slightly beyond the avatar boundary.',
      },
    },
  },
};

// Status Indicators with Different Sizes
export const StatusIndicatorsAllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 1rem; font-size: 0.875rem; font-weight: 500;">Extra Small (xs)</h4>
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${createAvatar({ ...meta.args, size: 'xs', showStatus: true, status: 'online', label: 'Alice' })}
          ${createAvatar({ ...meta.args, size: 'xs', showStatus: true, status: 'offline', label: 'Bob' })}
          ${createAvatar({ ...meta.args, size: 'xs', showStatus: true, status: 'busy', label: 'Charlie' })}
          ${createAvatar({ ...meta.args, size: 'xs', showStatus: true, status: 'away', label: 'Diana' })}
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 1rem; font-size: 0.875rem; font-weight: 500;">Small (sm)</h4>
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${createAvatar({ ...meta.args, size: 'sm', showStatus: true, status: 'online', label: 'Alice' })}
          ${createAvatar({ ...meta.args, size: 'sm', showStatus: true, status: 'offline', label: 'Bob' })}
          ${createAvatar({ ...meta.args, size: 'sm', showStatus: true, status: 'busy', label: 'Charlie' })}
          ${createAvatar({ ...meta.args, size: 'sm', showStatus: true, status: 'away', label: 'Diana' })}
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 1rem; font-size: 0.875rem; font-weight: 500;">Base</h4>
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${createAvatar({ ...meta.args, size: 'base', showStatus: true, status: 'online', label: 'Alice' })}
          ${createAvatar({ ...meta.args, size: 'base', showStatus: true, status: 'offline', label: 'Bob' })}
          ${createAvatar({ ...meta.args, size: 'base', showStatus: true, status: 'busy', label: 'Charlie' })}
          ${createAvatar({ ...meta.args, size: 'base', showStatus: true, status: 'away', label: 'Diana' })}
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 1rem; font-size: 0.875rem; font-weight: 500;">Large (lg)</h4>
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${createAvatar({ ...meta.args, size: 'lg', showStatus: true, status: 'online', label: 'Alice' })}
          ${createAvatar({ ...meta.args, size: 'lg', showStatus: true, status: 'offline', label: 'Bob' })}
          ${createAvatar({ ...meta.args, size: 'lg', showStatus: true, status: 'busy', label: 'Charlie' })}
          ${createAvatar({ ...meta.args, size: 'lg', showStatus: true, status: 'away', label: 'Diana' })}
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 1rem; font-size: 0.875rem; font-weight: 500;">Extra Large (xl)</h4>
        <div style="display: flex; align-items: center; gap: 1rem;">
          ${createAvatar({ ...meta.args, size: 'xl', showStatus: true, status: 'online', label: 'Alice' })}
          ${createAvatar({ ...meta.args, size: 'xl', showStatus: true, status: 'offline', label: 'Bob' })}
          ${createAvatar({ ...meta.args, size: 'xl', showStatus: true, status: 'busy', label: 'Charlie' })}
          ${createAvatar({ ...meta.args, size: 'xl', showStatus: true, status: 'away', label: 'Diana' })}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Status indicators across all avatar sizes. Status indicators are consistently positioned with a subtle overlap effect, extending slightly beyond the avatar boundary for optimal visibility.',
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
  render: (args) => html`${createAvatar(args)}`,
  parameters: {
    docs: {
      description: {
        story: 'A clickable avatar that emits events when clicked. Check the Actions panel to see events.',
      },
    },
  },
};

// User Profile List Example
export const UserProfileList: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
      <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 0.5rem; background: #f5f5f5;">
        ${createAvatar({ 
          ...meta.args, 
          src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          label: 'Alice Johnson', 
          size: 'sm', 
          showStatus: true, 
          status: 'online', 
          clickable: true,
          action: 'view-profile'
        })}
        <div>
          <div style="font-weight: 500;">Alice Johnson</div>
          <div style="font-size: 0.875rem; color: #666;">Product Manager</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 0.5rem; background: #f5f5f5;">
        ${createAvatar({ 
          ...meta.args, 
          label: 'Bob Smith', 
          size: 'sm', 
          showStatus: true, 
          status: 'away', 
          clickable: true,
          action: 'view-profile'
        })}
        <div>
          <div style="font-weight: 500;">Bob Smith</div>
          <div style="font-size: 0.875rem; color: #666;">Developer</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 0.5rem; background: #f5f5f5;">
        ${createAvatar({ 
          ...meta.args, 
          label: 'Clara Wilson', 
          size: 'sm', 
          showStatus: true, 
          status: 'online', 
          clickable: true,
          action: 'view-profile'
        })}
        <div>
          <div style="font-weight: 500;">Clara Wilson</div>
          <div style="font-size: 0.875rem; color: #666;">Designer</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 0.5rem; background: #f5f5f5;">
        ${createAvatar({ 
          ...meta.args, 
          icon: 'admin_panel_settings',
          label: 'Administrator', 
          size: 'sm', 
          variant: 'filled',
          clickable: true,
          action: 'admin-profile'
        })}
        <div>
          <div style="font-weight: 500;">Administrator</div>
          <div style="font-size: 0.875rem; color: #666;">System Admin</div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of avatar components used in a user profile list interface. Notice how each user gets a unique color based on their initials, creating visual distinction.',
      },
    },
  },
};

// Profile Header Example
export const ProfileHeader: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 1rem;">
      ${createAvatar({ 
        ...meta.args, 
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        alt: 'Profile Picture',
        label: 'John Doe', 
        size: 'xl', 
        showStatus: true, 
        status: 'online',
        clickable: true,
        action: 'edit-profile'
      })}
      <div style="text-align: center;">
        <h2 style="margin: 0; font-size: 1.5rem;">John Doe</h2>
        <p style="margin: 0.25rem 0 0; opacity: 0.9;">Senior Software Engineer</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of an avatar component used in a profile header section.',
      },
    },
  },
};

// Icon Variations
export const IconVariations: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      ${createAvatar({ ...meta.args, icon: 'person', label: 'Person' })}
      ${createAvatar({ ...meta.args, icon: 'admin_panel_settings', label: 'Admin', variant: 'filled' })}
      ${createAvatar({ ...meta.args, icon: 'support_agent', label: 'Support', variant: 'outlined' })}
      ${createAvatar({ ...meta.args, icon: 'engineering', label: 'Engineer' })}
      ${createAvatar({ ...meta.args, icon: 'business', label: 'Business', variant: 'filled' })}
      ${createAvatar({ ...meta.args, icon: 'groups', label: 'Team', variant: 'outlined' })}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different icon variations for role-based or functional avatars.',
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
  render: (args) => html`${createAvatar(args)}`,
  parameters: {
    docs: {
      description: {
        story: 'Avatar in disabled state - reduced opacity and no interactions.',
      },
    },
  },
};

// Debug Mode
export const DebugMode: Story = {
  args: {
    label: 'Debug User',
    debug: true,
    clickable: true,
    showStatus: true,
    status: 'online',
  },
  render: (args) => html`${createAvatar(args)}`,
  parameters: {
    docs: {
      description: {
        story: 'Avatar with debug mode enabled. Check the browser console for debug logs.',
      },
    },
  },
}; 