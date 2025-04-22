import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

interface SpectrumButtonArgs {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
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
    ></spectrum-button>
  `,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'base', 'lg'],
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'disabled'],
    },
  },
} satisfies Meta<SpectrumButtonArgs>;

export default meta;
type Story = StoryObj<SpectrumButtonArgs>;

// Base Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Primary Button',
    showButtonText: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'base',
    buttonText: 'Secondary Button',
    showButtonText: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'base',
    buttonText: 'Success Button',
    showButtonText: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    size: 'base',
    buttonText: 'Warning Button',
    showButtonText: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'base',
    buttonText: 'Danger Button',
    showButtonText: true,
  },
};

// Outline Variants
export const PrimaryOutline: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    outline: true,
    buttonText: 'Primary Outline',
    showButtonText: true,
  },
};

export const SecondaryOutline: Story = {
  args: {
    variant: 'secondary',
    size: 'base',
    outline: true,
    buttonText: 'Secondary Outline',
    showButtonText: true,
  },
};

export const SuccessOutline: Story = {
  args: {
    variant: 'success',
    size: 'base',
    outline: true,
    buttonText: 'Success Outline',
    showButtonText: true,
  },
};

export const WarningOutline: Story = {
  args: {
    variant: 'warning',
    size: 'base',
    outline: true,
    buttonText: 'Warning Outline',
    showButtonText: true,
  },
};

export const DangerOutline: Story = {
  args: {
    variant: 'danger',
    size: 'base',
    outline: true,
    buttonText: 'Danger Outline',
    showButtonText: true,
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Button with Left Icon',
    showButtonText: true,
    showLeftIcon: true,
    leftIcon: 'add',
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Button with Right Icon',
    showButtonText: true,
    showRightIcon: true,
    rightIcon: 'arrow_forward',
  },
};

// Icon Only Variants
export const IconOnlyPrimary: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
  },
};

export const IconOnlySecondary: Story = {
  args: {
    variant: 'secondary',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
  },
};

export const IconOnlySuccess: Story = {
  args: {
    variant: 'success',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'check',
  },
};

export const IconOnlyWarning: Story = {
  args: {
    variant: 'warning',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'warning',
  },
};

export const IconOnlyDanger: Story = {
  args: {
    variant: 'danger',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'error',
  },
};

// Ghost Variants
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'base',
    buttonText: 'Ghost Button',
    showButtonText: true,
  },
};

export const GhostIconOnly: Story = {
  args: {
    variant: 'ghost',
    size: 'base',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
  },
};
