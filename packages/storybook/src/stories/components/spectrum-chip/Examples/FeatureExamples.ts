import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Sound and Haptic Features
// ==============================================

export const ChipWithSound = {
  args: {
    variant: 'primary',
    label: 'Sound Chip',
    sound: true,
    haptic: false
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Click this chip to hear audio feedback (enable sound in browser if needed).
      </p>
      <spectrum-chip
        .variant=${args.variant}
        .label=${args.label}
        .sound=${args.sound}
        .haptic=${args.haptic}
        @chipAction=${(e: CustomEvent) => action('Sound Chip Action')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipWithHaptic = {
  args: {
    variant: 'secondary',
    label: 'Haptic Chip',
    sound: false,
    haptic: true
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Click this chip to feel haptic feedback on supported mobile devices.
      </p>
      <spectrum-chip
        .variant=${args.variant}
        .label=${args.label}
        .sound=${args.sound}
        .haptic=${args.haptic}
        @chipAction=${(e: CustomEvent) => action('Haptic Chip Action')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipWithBothFeedbacks = {
  args: {
    variant: 'primary',
    label: 'Full Feedback',
    sound: true,
    haptic: true
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Experience both audio and haptic feedback for enhanced interaction.
      </p>
      <spectrum-chip
        .variant=${args.variant}
        .label=${args.label}
        .sound=${args.sound}
        .haptic=${args.haptic}
        leadingIcon="feedback"
        @chipAction=${(e: CustomEvent) => action('Full Feedback Chip')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// Ripple Effects
// ==============================================

export const ChipWithRipple = {
  args: {
    variant: 'primary',
    label: 'Ripple Effect',
    ripple: true
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Click anywhere on this chip to see the ripple animation effect.
      </p>
      <spectrum-chip
        .variant=${args.variant}
        .label=${args.label}
        .ripple=${args.ripple}
        @chipAction=${(e: CustomEvent) => action('Ripple Chip Action')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipRippleAndFeedback = {
  args: {
    variant: 'secondary',
    label: 'All Effects',
    ripple: true,
    sound: true,
    haptic: true
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Complete interaction experience with ripple, sound, and haptic feedback.
      </p>
      <spectrum-chip
        .variant=${args.variant}
        .label=${args.label}
        .ripple=${args.ripple}
        .sound=${args.sound}
        .haptic=${args.haptic}
        leadingIcon="auto_awesome"
        @chipAction=${(e: CustomEvent) => action('All Effects Chip')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// Icon Features
// ==============================================

export const ChipIconVariations = {
  args: {
    variant: 'secondary'
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Leading Icons</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="secondary"
            label="Star Rating"
            leadingIcon="star"
            @chipAction=${(e: CustomEvent) => action('Star Icon')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Location"
            leadingIcon="location_on"
            @chipAction=${(e: CustomEvent) => action('Location Icon')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Time"
            leadingIcon="schedule"
            @chipAction=${(e: CustomEvent) => action('Time Icon')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="User"
            leadingIcon="person"
            @chipAction=${(e: CustomEvent) => action('User Icon')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Trailing Icons (Removable)</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="input"
            label="Remove Me"
            showTrailingIcon="true"
            trailingIcon="close"
            @chipAction=${(e: CustomEvent) => action('Removable Default')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="input"
            label="Delete Item"
            showTrailingIcon="true"
            trailingIcon="delete"
            @chipAction=${(e: CustomEvent) => action('Removable Delete')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="input"
            label="Clear Filter"
            showTrailingIcon="true"
            trailingIcon="clear"
            @chipAction=${(e: CustomEvent) => action('Removable Clear')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Both Leading and Trailing Icons</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="input"
            label="user@example.com"
            leadingIcon="email"
            showTrailingIcon="true"
            @chipAction=${(e: CustomEvent) => action('Email with Remove')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="input"
            label="Design Team"
            leadingIcon="group"
            showTrailingIcon="true"
            @chipAction=${(e: CustomEvent) => action('Team with Remove')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="input"
            label="High Priority"
            leadingIcon="priority_high"
            showTrailingIcon="true"
            @chipAction=${(e: CustomEvent) => action('Priority with Remove')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
    </div>
  `
};

// ==============================================
// Selection States
// ==============================================

export const ChipSelectionDemo = {
  args: {
    variant: 'filter'
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Filter Chips (Toggle Selection)</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="filter"
            label="All Items"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('All Items Filter')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Active"
            @chipAction=${(e: CustomEvent) => action('Active Filter')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Completed"
            @chipAction=${(e: CustomEvent) => action('Completed Filter')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Archived"
            @chipAction=${(e: CustomEvent) => action('Archived Filter')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Category Selection</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="secondary"
            label="Technology"
            leadingIcon="computer"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Technology Category')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Design"
            leadingIcon="design_services"
            @chipAction=${(e: CustomEvent) => action('Design Category')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Marketing"
            leadingIcon="campaign"
            @chipAction=${(e: CustomEvent) => action('Marketing Category')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Business"
            leadingIcon="business"
            @chipAction=${(e: CustomEvent) => action('Business Category')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
    </div>
  `
};

// ==============================================
// Debug Mode
// ==============================================

export const ChipDebugMode = {
  args: {
    variant: 'primary',
    label: 'Debug Chip',
    debug: true,
    ripple: true,
    sound: true
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; padding: 0.5rem; background: var(--spectrum-color-warning-container); color: var(--spectrum-color-on-warning-container); border-radius: 4px; font-size: 0.9rem;">
        📝 Debug mode enabled - check the browser console for detailed logs of chip interactions
      </p>
      <spectrum-chip
        .variant=${args.variant}
        .label=${args.label}
        .debug=${args.debug}
        .ripple=${args.ripple}
        .sound=${args.sound}
        leadingIcon="bug_report"
        @chipAction=${(e: CustomEvent) => action('Debug Chip Action')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// Custom Actions
// ==============================================

export const ChipCustomActions = {
  args: {
    variant: 'assist'
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Action Chips with Custom Actions</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="assist"
            label="Save Document"
            leadingIcon="save"
            action="save"
            @chipAction=${(e: CustomEvent) => action('Save Action')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="assist"
            label="Share Link"
            leadingIcon="share"
            action="share"
            @chipAction=${(e: CustomEvent) => action('Share Action')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="assist"
            label="Print Page"
            leadingIcon="print"
            action="print"
            @chipAction=${(e: CustomEvent) => action('Print Action')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="assist"
            label="Copy URL"
            leadingIcon="content_copy"
            action="copy"
            @chipAction=${(e: CustomEvent) => action('Copy Action')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Quick Actions</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="primary"
            label="Add to Cart"
            leadingIcon="shopping_cart"
            action="add-to-cart"
            ripple="true"
            @chipAction=${(e: CustomEvent) => action('Add to Cart')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Add to Wishlist"
            leadingIcon="favorite"
            action="add-to-wishlist"
            @chipAction=${(e: CustomEvent) => action('Add to Wishlist')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="assist"
            label="Quick Preview"
            leadingIcon="visibility"
            action="preview"
            @chipAction=${(e: CustomEvent) => action('Quick Preview')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
    </div>
  `
};

// ==============================================
// Size and Feature Combinations
// ==============================================

export const ChipSizeFeaturesCombo = {
  args: {},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      ${['small', 'medium', 'large'].map(size => html`
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface); text-transform: capitalize;">
            ${size} Size with Features
          </h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <spectrum-chip
              variant="primary"
              label="Ripple + Sound"
              size=${size}
              ripple="true"
              sound="true"
              @chipAction=${(e: CustomEvent) => action(`${size} Ripple Sound`)(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="Icon + Selected"
              size=${size}
              leadingIcon="star"
              selected="true"
              @chipAction=${(e: CustomEvent) => action(`${size} Icon Selected`)(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="input"
              label="Removable + Icon"
              size=${size}
              leadingIcon="label"
              showTrailingIcon="true"
              @chipAction=${(e: CustomEvent) => action(`${size} Removable Icon`)(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="assist"
              label="All Features"
              size=${size}
              leadingIcon="auto_awesome"
              ripple="true"
              sound="true"
              haptic="true"
              @chipAction=${(e: CustomEvent) => action(`${size} All Features`)(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
      `)}
      
    </div>
  `
};

// ==============================================
// Disabled States
// ==============================================

export const ChipDisabledStates = {
  args: {},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Disabled Chips (Various Variants)</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="primary"
            label="Primary Disabled"
            disabled="true"
            @chipAction=${(e: CustomEvent) => action('Primary Disabled - Should Not Fire')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Secondary Disabled"
            leadingIcon="star"
            disabled="true"
            @chipAction=${(e: CustomEvent) => action('Secondary Disabled - Should Not Fire')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Filter Disabled"
            selected="true"
            disabled="true"
            @chipAction=${(e: CustomEvent) => action('Filter Disabled - Should Not Fire')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="input"
            label="Input Disabled"
            showTrailingIcon="true"
            disabled="true"
            @chipAction=${(e: CustomEvent) => action('Input Disabled - Should Not Fire')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <p style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          ℹ️ Disabled chips do not respond to clicks and do not emit events or trigger feedback effects.
        </p>
      </div>
      
    </div>
  `
}; 