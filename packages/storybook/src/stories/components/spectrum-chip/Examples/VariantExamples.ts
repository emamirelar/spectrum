import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// All Chip Variants
// ==============================================

export const ChipVariantPrimary = {
  args: {
    variant: 'primary',
    label: 'Primary Chip',
    outline: false
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="Primary Default"
        @chipAction=${(e: CustomEvent) => action('Primary Default')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Primary Selected"
        selected="true"
        @chipAction=${(e: CustomEvent) => action('Primary Selected')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Primary with Icon"
        leadingIcon="star"
        @chipAction=${(e: CustomEvent) => action('Primary with Icon')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Primary Removable"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Primary Removable')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipVariantSecondary = {
  args: {
    variant: 'secondary',
    label: 'Secondary Chip'
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="Secondary Default"
        @chipAction=${(e: CustomEvent) => action('Secondary Default')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Secondary Selected"
        selected="true"
        @chipAction=${(e: CustomEvent) => action('Secondary Selected')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Secondary with Icon"
        leadingIcon="label"
        @chipAction=${(e: CustomEvent) => action('Secondary with Icon')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Secondary Removable"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Secondary Removable')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipVariantAssist = {
  args: {
    variant: 'assist',
    label: 'Assist Chip'
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="Quick Action"
        leadingIcon="add"
        @chipAction=${(e: CustomEvent) => action('Quick Action')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Bookmark"
        leadingIcon="bookmark"
        @chipAction=${(e: CustomEvent) => action('Bookmark')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Share"
        leadingIcon="share"
        @chipAction=${(e: CustomEvent) => action('Share')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Download"
        leadingIcon="download"
        @chipAction=${(e: CustomEvent) => action('Download')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipVariantFilter = {
  args: {
    variant: 'filter',
    label: 'Filter Chip'
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="All Items"
        selected="true"
        @chipAction=${(e: CustomEvent) => action('All Items')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Active"
        @chipAction=${(e: CustomEvent) => action('Active Filter')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Completed"
        @chipAction=${(e: CustomEvent) => action('Completed Filter')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Priority"
        leadingIcon="priority_high"
        @chipAction=${(e: CustomEvent) => action('Priority Filter')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipVariantInput = {
  args: {
    variant: 'input',
    label: 'Input Chip'
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="john@example.com"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Email Chip')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Design Team"
        leadingIcon="group"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Team Chip')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="JavaScript"
        leadingIcon="code"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Tag Chip')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="High Priority"
        leadingIcon="flag"
        showTrailingIcon="true"
        @chipAction=${(e: CustomEvent) => action('Priority Chip')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

export const ChipVariantSuggestion = {
  args: {
    variant: 'suggestion',
    label: 'Suggestion Chip'
  },
  render: (args: any) => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <spectrum-chip
        .variant=${args.variant}
        label="Machine Learning"
        leadingIcon="auto_awesome"
        @chipAction=${(e: CustomEvent) => action('ML Suggestion')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Data Analysis"
        leadingIcon="analytics"
        @chipAction=${(e: CustomEvent) => action('Data Suggestion')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Cloud Computing"
        leadingIcon="cloud"
        @chipAction=${(e: CustomEvent) => action('Cloud Suggestion')(e.detail)}
      ></spectrum-chip>
      
      <spectrum-chip
        .variant=${args.variant}
        label="Best Practices"
        leadingIcon="tips_and_updates"
        @chipAction=${(e: CustomEvent) => action('Tips Suggestion')(e.detail)}
      ></spectrum-chip>
    </div>
  `
};

// ==============================================
// Outline Variants
// ==============================================

export const ChipOutlineVariants = {
  args: {
    outline: true
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Primary Outline</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="primary"
            outline="true"
            label="Outline Default"
            @chipAction=${(e: CustomEvent) => action('Primary Outline Default')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="primary"
            outline="true"
            label="Outline Selected"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Primary Outline Selected')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="primary"
            outline="true"
            label="Outline with Icon"
            leadingIcon="verified"
            @chipAction=${(e: CustomEvent) => action('Primary Outline Icon')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Secondary Outline</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="secondary"
            outline="true"
            label="Outline Default"
            @chipAction=${(e: CustomEvent) => action('Secondary Outline Default')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            outline="true"
            label="Outline Selected"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Secondary Outline Selected')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            outline="true"
            label="Outline with Icon"
            leadingIcon="shield"
            @chipAction=${(e: CustomEvent) => action('Secondary Outline Icon')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
    </div>
  `
};

// ==============================================
// All Variants Showcase
// ==============================================

export const AllVariantsShowcase = {
  args: {},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Primary Variants</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="primary"
            label="Primary"
            @chipAction=${(e: CustomEvent) => action('Primary Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="primary"
            label="Primary Selected"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Primary Selected Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="primary"
            label="Primary Outline"
            outline="true"
            @chipAction=${(e: CustomEvent) => action('Primary Outline Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="primary"
            label="Primary Disabled"
            disabled="true"
            @chipAction=${(e: CustomEvent) => action('Primary Disabled Showcase')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Secondary Variants</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="secondary"
            label="Secondary"
            @chipAction=${(e: CustomEvent) => action('Secondary Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Secondary Selected"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Secondary Selected Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Secondary Outline"
            outline="true"
            @chipAction=${(e: CustomEvent) => action('Secondary Outline Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="secondary"
            label="Secondary Disabled"
            disabled="true"
            @chipAction=${(e: CustomEvent) => action('Secondary Disabled Showcase')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Specialized Variants</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="assist"
            label="Assist"
            leadingIcon="help"
            @chipAction=${(e: CustomEvent) => action('Assist Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Filter"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Filter Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="input"
            label="Input"
            showTrailingIcon="true"
            @chipAction=${(e: CustomEvent) => action('Input Showcase')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="suggestion"
            label="Suggestion"
            leadingIcon="lightbulb"
            @chipAction=${(e: CustomEvent) => action('Suggestion Showcase')(e.detail)}
          ></spectrum-chip>
        </div>
      </div>
      
    </div>
  `
};

// ==============================================
// Size Comparison Across Variants
// ==============================================

export const VariantSizeComparison = {
  args: {},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      ${['extra-small', 'small', 'medium', 'large'].map(size => html`
        <div>
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface); text-transform: capitalize;">
            ${size === 'extra-small' ? 'Extra Small' : size} Size
          </h4>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <spectrum-chip
              variant="primary"
              label="Primary"
              size=${size}
              @chipAction=${(e: CustomEvent) => action(`Primary ${size}`)(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="secondary"
              label="Secondary"
              size=${size}
              @chipAction=${(e: CustomEvent) => action(`Secondary ${size}`)(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="assist"
              label="Assist"
              leadingIcon="add"
              size=${size}
              @chipAction=${(e: CustomEvent) => action(`Assist ${size}`)(e.detail)}
            ></spectrum-chip>
            
            <spectrum-chip
              variant="filter"
              label="Filter"
              selected="true"
              size=${size}
              @chipAction=${(e: CustomEvent) => action(`Filter ${size}`)(e.detail)}
            ></spectrum-chip>
          </div>
        </div>
      `)}
      
    </div>
  `
}; 