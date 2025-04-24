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

// Base Button
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'base',
    buttonText: 'Button',
    showButtonText: true,
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
  },
};

// Ghost Button
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'base',
    buttonText: 'Ghost Button',
    showButtonText: true,
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
  },
};
