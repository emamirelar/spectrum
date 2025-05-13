import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumButton } from "@stencil-storybook-boilerplate/core/src/components/spectrum-button/spectrum-button";

interface SpectrumButtonArgs {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'fab';
  size: 'sm' | 'base' | 'lg';
  state: 'default' | 'hover' | 'active' | 'disabled';
  outline: boolean;
  iconOnly: boolean;
  showButtonText: boolean;
  buttonText: string;
  showLeftIcon: boolean;
  leftIcon: string;
  showRightIcon: boolean;
  rightIcon: string;
  debug: boolean;
  ripple: boolean;
  action: string;
  disabled: boolean;
}

const meta = {
  title: 'Components/SpectrumButton',
  tags: ['autodocs'],
  args: {
    buttonText: 'Click me',
    variant: 'primary',
    size: 'base',
    outline: false,
    iconOnly: false,
    disabled: false,
    ripple: true,
    showButtonText: true,
    showLeftIcon: false,
    leftIcon: '',
    showRightIcon: false,
    rightIcon: '',
    debug: false,
    action: 'custom'
  },
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'The text to display on the button',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'outline'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'base', 'lg'],
      description: 'The size of the button',
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show an outline style',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Whether to show only the icon',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on click',
    },
    showButtonText: {
      control: 'boolean',
      description: 'Whether to show the button text',
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Whether to show the left icon',
    },
    leftIcon: {
      control: 'text',
      description: 'The name of the left icon to display',
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Whether to show the right icon',
    },
    rightIcon: {
      control: 'text',
      description: 'The name of the right icon to display',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show component boundaries',
    },
    action: {
      control: 'text',
      description: 'Optional action to emit with the button click',
    }
  }
} satisfies Meta<SpectrumButton>;

export default meta;

const renderButton = (args: SpectrumButtonArgs) => html`
  <spectrum-button
    button-text=${args.buttonText}
    variant=${args.variant}
    size=${args.size}
    ?outline=${args.outline}
    ?icon-only=${args.iconOnly}
    ?disabled=${args.disabled}
    ?ripple=${args.ripple}
    ?show-button-text=${args.showButtonText}
    ?show-left-icon=${args.showLeftIcon}
    left-icon=${args.leftIcon}
    ?show-right-icon=${args.showRightIcon}
    right-icon=${args.rightIcon}
    ?debug=${args.debug}
    action=${args.action}
    @buttonAction=${(e: CustomEvent) => action('buttonAction')(e.detail)}
  ></spectrum-button>
`;

export const Default: StoryObj<SpectrumButtonArgs> = {
  render: renderButton
};

// Outline Button
export const Outline: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    outline: true,
    buttonText: 'Outline Button',
    showButtonText: true,
    debug: false,
  },
  render: renderButton
};

// With Icons
export const WithIcons: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Button with Icons',
    showButtonText: true,
    showLeftIcon: true,
    leftIcon: 'add',
    showRightIcon: true,
    rightIcon: 'arrow_forward',
    debug: false,
  },
  render: renderButton
};

// Icon Only
export const IconOnly: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
    debug: false,
  },
  render: renderButton
};

// FAB (Floating Action Button)
export const FAB: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'lg',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'add',
    debug: false,
  },
  render: renderButton
};

// Ghost Button
export const Ghost: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'ghost',
    size: 'base',
    buttonText: 'Ghost Button',
    showButtonText: true,
    debug: false,
  },
  render: renderButton
};

// Ghost Icon Only
export const GhostIconOnly: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'ghost',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
    debug: false,
  },
  render: renderButton
};

// Debug Mode
export const DebugMode: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Debug Button',
    showButtonText: true,
    debug: true,
  },
  render: renderButton,
  parameters: {
    docs: {
      description: {
        story: 'A button with debug mode enabled. Check the browser console to see debug logs for state changes and interactions.',
      },
    },
  },
};

// Ripple Effect
export const WithRipple: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Click for Ripple',
    showButtonText: true,
    ripple: true,
    debug: false,
  },
  render: renderButton,
  parameters: {
    docs: {
      description: {
        story: 'A button with ripple effect enabled. Click the button to see the ripple animation.',
      },
    },
  },
};

// Ripple with Icons
export const RippleWithIcons: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Ripple with Icons',
    showButtonText: true,
    showLeftIcon: true,
    leftIcon: 'add',
    showRightIcon: true,
    rightIcon: 'arrow_forward',
    ripple: true,
    debug: false,
  },
  render: renderButton
};

// Action Button
export const WithAction: StoryObj<SpectrumButtonArgs> = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Action Button',
    showButtonText: true,
    action: 'custom-action',
    debug: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A button that emits an action value when clicked.',
      },
    },
  },
};
