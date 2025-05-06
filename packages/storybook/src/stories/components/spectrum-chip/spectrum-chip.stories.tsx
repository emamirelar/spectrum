import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumChipArgs {
  variant: 'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion';
  selected: boolean;
  disabled: boolean;
  outline: boolean;
  ripple: boolean;
  label: string;
  leadingIcon: string;
  trailingIcon: string;
  showTrailingIcon: boolean;
  debug: boolean;
  action: string;
}

const meta = {
  title: 'Components/SpectrumChip',
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    label: 'Chip',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
    action: 'custom'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'assist', 'filter', 'input', 'suggestion'],
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
    },
    outline: {
      control: 'boolean',
      description: 'Whether the chip is outlined',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click',
    },
    label: {
      control: 'text',
      description: 'The label text of the chip',
    },
    leadingIcon: {
      control: 'text',
      description: 'Optional leading icon',
    },
    trailingIcon: {
      control: 'text',
      description: 'Optional trailing icon (usually for removal)',
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Whether to show the trailing icon',
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
    },
    action: {
      control: 'text',
      description: 'Optional action to emit with the chip click',
    }
  }
} satisfies Meta<SpectrumChipArgs>;

export default meta;
type Story = StoryObj<SpectrumChipArgs>;

// Default Chip
export const Default: Story = {
  render: (args) => html`
    <spectrum-chip
      variant=${args.variant}
      ?selected=${args.selected}
      ?disabled=${args.disabled}
      ?outline=${args.outline}
      ?ripple=${args.ripple}
      label=${args.label}
      leading-icon=${args.leadingIcon}
      trailing-icon=${args.trailingIcon}
      ?show-trailing-icon=${args.showTrailingIcon}
      ?debug=${args.debug}
      action=${args.action}
      @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
    ></spectrum-chip>
  `
};

// Primary Chip
export const Primary: Story = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    label: 'Primary',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
  },
};

// Secondary Chip
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    label: 'Secondary',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
  },
};

// With Icons
export const WithIcons: Story = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    label: 'With Icons',
    leadingIcon: 'add',
    trailingIcon: 'close',
    showTrailingIcon: true,
    debug: false,
  },
};

// Selected
export const Selected: Story = {
  args: {
    variant: 'primary',
    selected: true,
    disabled: false,
    outline: false,
    ripple: false,
    label: 'Selected',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: true,
    outline: false,
    ripple: false,
    label: 'Disabled',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
  },
};

// Outline
export const Outline: Story = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: true,
    ripple: false,
    label: 'Outline',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
  },
};

// With Ripple
export const WithRipple: Story = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: true,
    label: 'With Ripple',
    leadingIcon: '',
    trailingIcon: '',
    showTrailingIcon: false,
    debug: false,
  },
}; 