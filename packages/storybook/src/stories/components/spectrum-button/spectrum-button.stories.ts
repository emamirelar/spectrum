import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

interface SpectrumButtonArgs {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
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
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
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
    buttonText: 'Primary Button',
    showButtonText: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    buttonText: 'Secondary Button',
    showButtonText: true,
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    buttonText: 'Success Button',
    showButtonText: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    buttonText: 'Warning Button',
    showButtonText: true,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    buttonText: 'Danger Button',
    showButtonText: true,
  },
};

// Outline Variants
export const PrimaryOutline: Story = {
  args: {
    variant: 'primary',
    outline: true,
    buttonText: 'Primary Outline',
    showButtonText: true,
  },
};

export const SecondaryOutline: Story = {
  args: {
    variant: 'secondary',
    outline: true,
    buttonText: 'Secondary Outline',
    showButtonText: true,
  },
};

export const SuccessOutline: Story = {
  args: {
    variant: 'success',
    outline: true,
    buttonText: 'Success Outline',
    showButtonText: true,
  },
};

export const WarningOutline: Story = {
  args: {
    variant: 'warning',
    outline: true,
    buttonText: 'Warning Outline',
    showButtonText: true,
  },
};

export const DangerOutline: Story = {
  args: {
    variant: 'danger',
    outline: true,
    buttonText: 'Danger Outline',
    showButtonText: true,
  },
};

// With Icons
export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    buttonText: 'Button with Left Icon',
    showButtonText: true,
    showLeftIcon: true,
    leftIcon: 'add',
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'primary',
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
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
  },
};

export const IconOnlySecondary: Story = {
  args: {
    variant: 'secondary',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'settings',
  },
};

export const IconOnlySuccess: Story = {
  args: {
    variant: 'success',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'check',
  },
};

export const IconOnlyWarning: Story = {
  args: {
    variant: 'warning',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'warning',
  },
};

export const IconOnlyDanger: Story = {
  args: {
    variant: 'danger',
    iconOnly: true,
    showLeftIcon: true,
    leftIcon: 'error',
  },
};
