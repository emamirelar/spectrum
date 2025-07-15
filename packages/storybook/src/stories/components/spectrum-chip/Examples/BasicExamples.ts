import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Basic Chip Examples
// ==============================================

export const ChipDefault = {
  args: {
    variant: 'primary',
    label: 'Default Chip',
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    sound: false,
    haptic: false,
    size: 'medium',
    leadingIcon: '',
    trailingIcon: 'close',
    showTrailingIcon: false,
    action: '',
    debug: false
  },
  render: (args: any) => html`
    <spectrum-chip
      .variant=${args.variant}
      .label=${args.label}
      .selected=${args.selected}
      .disabled=${args.disabled}
      .outline=${args.outline}
      .ripple=${args.ripple}
      .sound=${args.sound}
      .haptic=${args.haptic}
      .size=${args.size}
      .leadingIcon=${args.leadingIcon}
      .trailingIcon=${args.trailingIcon}
      .showTrailingIcon=${args.showTrailingIcon}
      .action=${args.action}
      .debug=${args.debug}
      @chipAction=${(e: CustomEvent) => action('Chip Action')(e.detail)}
    ></spectrum-chip>
  `
};

export const ChipWithIcon = {
  args: {
    ...ChipDefault.args,
    label: 'Tagged Content',
    leadingIcon: 'label',
    variant: 'secondary'
  },
  render: ChipDefault.render
};

export const ChipRemovable = {
  args: {
    ...ChipDefault.args,
    label: 'Removable Chip',
    showTrailingIcon: true,
    variant: 'secondary'
  },
  render: ChipDefault.render
};

export const ChipSelected = {
  args: {
    ...ChipDefault.args,
    label: 'Selected Chip',
    selected: true,
    variant: 'primary'
  },
  render: ChipDefault.render
};

export const ChipDisabled = {
  args: {
    ...ChipDefault.args,
    label: 'Disabled Chip',
    disabled: true,
    variant: 'secondary'
  },
  render: ChipDefault.render
};

// ==============================================
// Size Examples
// ==============================================

export const ChipSizes = {
  args: ChipDefault.args,
  render: () => html`
    <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        variant="primary"
        label="Extra Small"
        size="extra-small"
        @chipAction=${(e: CustomEvent) => action('XS Chip Action')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="primary"
        label="Small"
        size="small"
        @chipAction=${(e: CustomEvent) => action('Small Chip Action')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="primary"
        label="Medium (Default)"
        size="medium"
        @chipAction=${(e: CustomEvent) => action('Medium Chip Action')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="primary"
        label="Large"
        size="large"
        @chipAction=${(e: CustomEvent) => action('Large Chip Action')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// State Examples
// ==============================================

export const ChipStates = {
  args: ChipDefault.args,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        variant="secondary"
        label="Default State"
        @chipAction=${(e: CustomEvent) => action('Default State')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="secondary"
        label="Selected State"
        selected="true"
        @chipAction=${(e: CustomEvent) => action('Selected State')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="secondary"
        label="Disabled State"
        disabled="true"
        @chipAction=${(e: CustomEvent) => action('Disabled State')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="secondary"
        label="With Icon"
        leadingIcon="star"
        @chipAction=${(e: CustomEvent) => action('With Icon')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        variant="secondary"
        label="Removable"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Removable Action')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// Interactive Examples
// ==============================================

export const ChipInteractive = {
  args: {
    ...ChipDefault.args,
    label: 'Interactive Chip',
    ripple: true,
    variant: 'primary'
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="With Ripple"
        ripple="true"
        @chipAction=${(e: CustomEvent) => action('Ripple Chip')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="With Sound"
        sound="true"
        @chipAction=${(e: CustomEvent) => action('Sound Chip')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="With Haptic"
        haptic="true"
        @chipAction=${(e: CustomEvent) => action('Haptic Chip')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="All Effects"
        ripple="true"
        sound="true"
        haptic="true"
        @chipAction=${(e: CustomEvent) => action('All Effects Chip')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// Simple Usage Examples
// ==============================================

export const SimpleTag = {
  args: {
    variant: 'secondary',
    label: 'JavaScript',
    leadingIcon: 'code'
  },
  render: (args: any) => html`
    <spectrum-chip
      .variant=${args.variant}
      .label=${args.label}
      .leadingIcon=${args.leadingIcon}
      @chipAction=${(e: CustomEvent) => action('Tag Clicked')(e.detail)}
    ></spectrum-chip>
  `
};

export const SimpleFilter = {
  args: {
    variant: 'filter',
    label: 'Active Projects',
    selected: true
  },
  render: (args: any) => html`
    <spectrum-chip
      .variant=${args.variant}
      .label=${args.label}
      .selected=${args.selected}
      @chipAction=${(e: CustomEvent) => action('Filter Toggled')(e.detail)}
    ></spectrum-chip>
  `
};

export const SimpleAction = {
  args: {
    variant: 'assist',
    label: 'Add to Favorites',
    leadingIcon: 'favorite'
  },
  render: (args: any) => html`
    <spectrum-chip
      .variant=${args.variant}
      .label=${args.label}
      .leadingIcon=${args.leadingIcon}
      @chipAction=${(e: CustomEvent) => action('Action Executed')(e.detail)}
    ></spectrum-chip>
  `
}; 