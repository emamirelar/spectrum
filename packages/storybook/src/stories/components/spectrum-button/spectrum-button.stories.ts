import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

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
}

const meta = {
  title: 'Components/SpectrumButton',
  tags: ['autodocs'],
  render: (args) => html`
    <spectrum-button
      variant=${args.variant}
      size=${args.size}
      state=${args.state}
      ?outline=${args.outline}
      ?icon-only=${args.iconOnly}
      ?show-button-text=${args.showButtonText}
      button-text=${args.buttonText}
      ?show-left-icon=${args.showLeftIcon}
      left-icon=${args.leftIcon}
      ?show-right-icon=${args.showRightIcon}
      right-icon=${args.rightIcon}
      ?debug=${args.debug}
      ?ripple=${args.ripple}
    ></spectrum-button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost', 'fab'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging in the console',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
    },
  },
} satisfies Meta<SpectrumButtonArgs>;

export default meta;
type Story = StoryObj<SpectrumButtonArgs>;

// Base Button
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Button',
    showButtonText: true,
    debug: false,
  },
};

// Outline Button
export const Outline: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    outline: true,
    buttonText: 'Outline Button',
    showButtonText: true,
    debug: false,
  },
};

// With Icons
export const WithIcons: Story = {
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
};

// Icon Only
export const IconOnly: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
    debug: false,
  },
};

// FAB (Floating Action Button)
export const FAB: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'add',
    debug: false,
  },
};

// Ghost Button
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'base',
    buttonText: 'Ghost Button',
    showButtonText: true,
    debug: false,
  },
};

// Ghost Icon Only
export const GhostIconOnly: Story = {
  args: {
    variant: 'ghost',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
    debug: false,
  },
};

// Debug Mode
export const DebugMode: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Debug Button',
    showButtonText: true,
    debug: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A button with debug mode enabled. Check the browser console to see debug logs for state changes and interactions.',
      },
    },
  },
};

// Ripple Effect
export const WithRipple: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Click for Ripple',
    showButtonText: true,
    ripple: true,
    debug: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A button with ripple effect enabled. Click the button to see the ripple animation.',
      },
    },
  },
};

// Ripple with Icons
export const RippleWithIcons: Story = {
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
  parameters: {
    docs: {
      description: {
        story: 'A button with ripple effect and icons. The ripple effect works with all button variants and sizes.',
      },
    },
  },
};
