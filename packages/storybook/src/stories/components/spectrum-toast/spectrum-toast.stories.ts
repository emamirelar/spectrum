import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumToast } from "@stencil-storybook-boilerplate/core/src/components/spectrum-toast/spectrum-toast";

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

const meta = {
  title: 'Components/SpectrumToast',
  tags: ['autodocs'],
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
      description: 'The visual style variant of the toast',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'The screen edge position of the toast',
    },
    visible: {
      control: 'boolean',
      description: 'Whether the toast is visible',
    },
    autoClose: {
      control: 'boolean',
      description: 'Whether the toast automatically closes after duration',
    },
    duration: {
      control: 'number',
      description: 'Auto-close duration in milliseconds',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the toast can be manually dismissed',
    },
    persistent: {
      control: 'boolean',
      description: 'Whether the toast persists and never auto-closes',
    },
    toastTitle: {
      control: 'text',
      description: 'The title text of the toast',
    },
    message: {
      control: 'text',
      description: 'The message text of the toast',
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show the icon',
    },
    icon: {
      control: 'text',
      description: 'Custom icon name (overrides variant default)',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    actionLabel: {
      control: 'text',
      description: 'Label for the action button',
    },
    actionValue: {
      control: 'text',
      description: 'Value to emit when action button is clicked',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
    }
  }
} satisfies Meta<SpectrumToast>;

export default meta;

const renderToast = (args: SpectrumToastArgs) => html`
  <spectrum-toast
    variant=${args.variant}
    position=${args.position}
    ?visible=${args.visible}
    ?auto-close=${args.autoClose}
    duration=${args.duration}
    ?dismissible=${args.dismissible}
    ?persistent=${args.persistent}
    toast-title=${args.toastTitle}
    message=${args.message}
    ?show-icon=${args.showIcon}
    icon=${args.icon}
    ?show-close-button=${args.showCloseButton}
    action-label=${args.actionLabel}
    action-value=${args.actionValue}
    ?debug=${args.debug}
    @toastAction=${(e: CustomEvent) => action('toastAction')(e.detail)}
    @toastDismiss=${(e: CustomEvent) => action('toastDismiss')(e.detail)}
  ></spectrum-toast>
`;

export const Default: StoryObj<SpectrumToastArgs> = {
  render: renderToast
};

// Success Toast
export const Success: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'success',
    toastTitle: 'Success!',
    message: 'Your action has been completed successfully.',
  },
  render: renderToast
};

// Warning Toast
export const Warning: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'warning',
    toastTitle: 'Warning',
    message: 'Please review your input before proceeding.',
  },
  render: renderToast
};

// Error Toast
export const Error: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'danger',
    toastTitle: 'Error',
    message: 'Something went wrong. Please try again.',
  },
  render: renderToast
};

// Ghost Variant
export const Ghost: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'ghost',
    toastTitle: 'Information',
    message: 'This is a subtle notification message.',
  },
  render: renderToast
};

// With Action Button
export const WithAction: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'primary',
    toastTitle: 'File uploaded',
    message: 'Your file has been uploaded successfully.',
    actionLabel: 'View File',
    actionValue: 'view-file',
  },
  render: renderToast
};

// Without Close Button
export const NonDismissible: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'warning',
    toastTitle: 'System Maintenance',
    message: 'The system will be under maintenance from 2:00 AM to 4:00 AM.',
    dismissible: false,
    showCloseButton: false,
  },
  render: renderToast
};

// Custom Icon
export const CustomIcon: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'primary',
    toastTitle: 'Download Complete',
    message: 'Your download has finished.',
    icon: 'download_done',
  },
  render: renderToast
};

// Position Variants - Top
export const PositionTop: StoryObj<SpectrumToastArgs> = {
  args: {
    position: 'top',
    toastTitle: 'Top Position',
    message: 'This toast appears at the top center of the screen.',
  },
  render: renderToast
};

// Position Variants - Bottom
export const PositionBottom: StoryObj<SpectrumToastArgs> = {
  args: {
    position: 'bottom',
    toastTitle: 'Bottom Position',
    message: 'This toast appears at the bottom center of the screen.',
  },
  render: renderToast
};

// Position Variants - Top Right
export const PositionTopRight: StoryObj<SpectrumToastArgs> = {
  args: {
    position: 'top-right',
    toastTitle: 'Top Right',
    message: 'This toast appears at the top right corner.',
  },
  render: renderToast
};

// Position Variants - Bottom Left
export const PositionBottomLeft: StoryObj<SpectrumToastArgs> = {
  args: {
    position: 'bottom-left',
    toastTitle: 'Bottom Left',
    message: 'This toast appears at the bottom left corner.',
  },
  render: renderToast
};

// Auto-close Demo
export const AutoClose: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'success',
    toastTitle: 'Auto-closing Toast',
    message: 'This toast will automatically close after 3 seconds.',
    autoClose: true,
    duration: 3000,
  },
  render: renderToast,
  parameters: {
    docs: {
      description: {
        story: 'This toast demonstrates auto-close functionality. It will disappear after the specified duration.',
      },
    },
  },
};

// All Variants Showcase
export const AllVariants: StoryObj<SpectrumToastArgs> = {
  render: () => html`
    <div style="position: relative; height: 400px; padding: 20px;">
      <spectrum-toast
        variant="primary"
        position="top-left"
        visible="true"
        toast-title="Primary"
        message="Primary variant toast"
        style="position: static; margin-bottom: 10px; display: block; z-index: auto;"
      ></spectrum-toast>
      
      <spectrum-toast
        variant="secondary"
        position="top-left"
        visible="true"
        toast-title="Secondary"
        message="Secondary variant toast"
        style="position: static; margin-bottom: 10px; display: block; z-index: auto;"
      ></spectrum-toast>
      
      <spectrum-toast
        variant="success"
        position="top-left"
        visible="true"
        toast-title="Success"
        message="Success variant toast"
        style="position: static; margin-bottom: 10px; display: block; z-index: auto;"
      ></spectrum-toast>
      
      <spectrum-toast
        variant="warning"
        position="top-left"
        visible="true"
        toast-title="Warning"
        message="Warning variant toast"
        style="position: static; margin-bottom: 10px; display: block; z-index: auto;"
      ></spectrum-toast>
      
      <spectrum-toast
        variant="danger"
        position="top-left"
        visible="true"
        toast-title="Danger"
        message="Danger variant toast"
        style="position: static; margin-bottom: 10px; display: block; z-index: auto;"
      ></spectrum-toast>
      
      <spectrum-toast
        variant="ghost"
        position="top-left"
        visible="true"
        toast-title="Ghost"
        message="Ghost variant toast"
        style="position: static; margin-bottom: 10px; display: block; z-index: auto;"
      ></spectrum-toast>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all available toast variants in a static layout for easy comparison.',
      },
    },
  },
};

// Minimal Toast
export const Minimal: StoryObj<SpectrumToastArgs> = {
  args: {
    variant: 'primary',
    toastTitle: '',
    message: 'Simple message without title',
    showIcon: false,
    showCloseButton: false,
  },
  render: renderToast
};

// Rich Content with Slot
export const WithSlot: StoryObj<SpectrumToastArgs> = {
  render: () => html`
    <spectrum-toast
      variant="primary"
      position="top"
      visible="true"
      toast-title="Rich Content"
      dismissible="true"
    >
      <div style="margin-top: 8px;">
        <p style="margin: 0 0 8px 0; opacity: 0.9;">This toast contains custom HTML content via slots.</p>
        <div style="display: flex; gap: 8px; align-items: center;">
          <span style="font-size: 12px; opacity: 0.7;">Status:</span>
          <span style="background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; font-size: 12px;">Active</span>
        </div>
      </div>
    </spectrum-toast>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Toast with custom HTML content using the default slot.',
      },
    },
  },
}; 