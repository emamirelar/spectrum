import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import type SpectrumChip from '../../../../core/src/components/spectrum-chip/spectrum-chip.tsx';

const meta: Meta<SpectrumChip> = {
  title: 'Components/SpectrumChip',
  component: 'spectrum-chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'The variant of the chip',
    },
    outline: {
      control: 'boolean',
      description: 'Whether the chip is outlined',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
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
  },
  render: (args) => html`
    <spectrum-chip
      variant=${args.variant}
      ?outline=${args.outline}
      ?disabled=${args.disabled}
      label=${args.label}
      leading-icon=${args.leadingIcon}
      trailing-icon=${args.trailingIcon}
      ?show-trailing-icon=${args.showTrailingIcon}
    ></spectrum-chip>
  `,
};

export default meta;
type Story = StoryObj<SpectrumChip>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary Chip',
  },
};

export const PrimaryOutline: Story = {
  args: {
    variant: 'primary',
    outline: true,
    label: 'Primary Outline',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    label: 'Secondary Chip',
  },
};

export const SecondaryOutline: Story = {
  args: {
    variant: 'secondary',
    outline: true,
    label: 'Secondary Outline',
  },
};

export const WithIcons: Story = {
  args: {
    variant: 'primary',
    label: 'With Icons',
    leadingIcon: 'favorite',
    trailingIcon: 'close',
    showTrailingIcon: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    label: 'Disabled Chip',
    disabled: true,
  },
};

export const DisabledOutline: Story = {
  args: {
    variant: 'primary',
    outline: true,
    label: 'Disabled Outline',
    disabled: true,
  },
}; 