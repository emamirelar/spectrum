import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumChip } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-chip/spectrum-chip";

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
  size: 'small' | 'medium' | 'large' | 'extra-small';
  sound: boolean;
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
    action: 'custom',
    size: 'medium',
    sound: false
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'assist', 'filter', 'input', 'suggestion'],
      description: 'The visual style variant of the chip'
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled'
    },
    outline: {
      control: 'boolean',
      description: 'Whether the chip is outlined'
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect on click'
    },
    label: {
      control: 'text',
      description: 'The label text of the chip'
    },
    leadingIcon: {
      control: 'text',
      description: 'Optional leading icon'
    },
    trailingIcon: {
      control: 'text',
      description: 'Optional trailing icon (usually for removal)'
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Whether to show the trailing icon'
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging'
    },
    action: {
      control: 'text',
      description: 'Optional action to emit with the chip click'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'extra-small'],
      description: 'The size of the chip'
    },
    sound: {
      control: 'boolean',
      description: 'Whether the chip emits sound'
    }
  }
} satisfies Meta<SpectrumChip>;

export default meta;

const renderChip = (args: SpectrumChipArgs) => html`
  <spectrum-chip
    variant=${args.variant}
    size=${args.size}
    ?selected=${args.selected}
    ?disabled=${args.disabled}
    ?outline=${args.outline}
    ?ripple=${args.ripple}
    ?sound=${args.sound}
    label=${args.label}
    leading-icon=${args.leadingIcon}
    trailing-icon=${args.trailingIcon}
    ?show-trailing-icon=${args.showTrailingIcon}
    ?debug=${args.debug}
    action=${args.action}
    @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
  ></spectrum-chip>
`;

export const Default: StoryObj<SpectrumChipArgs> = {
  render: renderChip
};

export const Primary: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const Secondary: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const WithIcons: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const Selected: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const Disabled: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const Outline: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const WithRipple: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: renderChip
};

export const WithSound: StoryObj<SpectrumChipArgs> = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: true,
    label: 'Sound Enabled',
    leadingIcon: 'volume_up',
    trailingIcon: 'close',
    showTrailingIcon: true,
    debug: true,
    size: 'medium',
    sound: true,
  },
  render: (args) => html`
    <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px;">
      <h3 style="margin: 0 0 1rem 0; color: #495057;">Sound Demo</h3>
      <p style="margin: 0 0 1rem 0; color: #6c757d; font-size: 0.875rem;">
        Click the chip below to hear the sound effect. The chip will play a subtle high-pitched beep.
      </p>
      <div style="display: flex; gap: 1rem; align-items: center;">
        ${renderChip(args)}
        <div style="font-size: 0.75rem; color: #6c757d;">
          ${args.sound ? '🔊 Sound ON' : '🔇 Sound OFF'}
        </div>
      </div>
      <div style="margin-top: 1rem; padding: 0.75rem; background: #e3f2fd; border-radius: 4px; font-size: 0.75rem; color: #1565c0;">
        <strong>Note:</strong> Sound will play on click and remove actions. 
        Debug mode is enabled to show audio logs in the console.
      </div>
    </div>
  `
};

export const SizeVariants: StoryObj<SpectrumChipArgs> = {
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
    size: 'medium',
    sound: false,
  },
  render: (args) => html`
    <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px;">
      <h3 style="margin: 0 0 1rem 0; color: #495057;">Size Variants</h3>
      <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
        <spectrum-chip
          variant=${args.variant}
          size="extra-small"
          ?selected=${args.selected}
          ?disabled=${args.disabled}
          ?outline=${args.outline}
          ?ripple=${args.ripple}
          ?sound=${args.sound}
          label="Extra Small"
          leading-icon=${args.leadingIcon}
          trailing-icon=${args.trailingIcon}
          ?show-trailing-icon=${args.showTrailingIcon}
          ?debug=${args.debug}
          action=${args.action}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
        ></spectrum-chip>
        <spectrum-chip
          variant=${args.variant}
          size="small"
          ?selected=${args.selected}
          ?disabled=${args.disabled}
          ?outline=${args.outline}
          ?ripple=${args.ripple}
          ?sound=${args.sound}
          label="Small"
          leading-icon=${args.leadingIcon}
          trailing-icon=${args.trailingIcon}
          ?show-trailing-icon=${args.showTrailingIcon}
          ?debug=${args.debug}
          action=${args.action}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
        ></spectrum-chip>
        <spectrum-chip
          variant=${args.variant}
          size="medium"
          ?selected=${args.selected}
          ?disabled=${args.disabled}
          ?outline=${args.outline}
          ?ripple=${args.ripple}
          ?sound=${args.sound}
          label="Medium"
          leading-icon=${args.leadingIcon}
          trailing-icon=${args.trailingIcon}
          ?show-trailing-icon=${args.showTrailingIcon}
          ?debug=${args.debug}
          action=${args.action}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
        ></spectrum-chip>
        <spectrum-chip
          variant=${args.variant}
          size="large"
          ?selected=${args.selected}
          ?disabled=${args.disabled}
          ?outline=${args.outline}
          ?ripple=${args.ripple}
          ?sound=${args.sound}
          label="Large"
          leading-icon=${args.leadingIcon}
          trailing-icon=${args.trailingIcon}
          ?show-trailing-icon=${args.showTrailingIcon}
          ?debug=${args.debug}
          action=${args.action}
          @chipAction=${(e: CustomEvent) => action('chipAction')(e.detail)}
        ></spectrum-chip>
      </div>
    </div>
  `
}; 