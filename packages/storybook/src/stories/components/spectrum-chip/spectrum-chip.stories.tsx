import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Import organized examples
import {
  ChipDefault,
  ChipWithIcon,
  ChipRemovable,
  ChipSelected,
  ChipDisabled,
  ChipSizes,
  ChipStates,
  ChipInteractive,
  SimpleTag,
  SimpleFilter,
  SimpleAction
} from './Examples/BasicExamples';

import {
  ChipVariantPrimary,
  ChipVariantSecondary,
  ChipVariantAssist,
  ChipVariantFilter,
  ChipVariantInput,
  ChipVariantSuggestion,
  ChipOutlineVariants,
  AllVariantsShowcase,
  VariantSizeComparison
} from './Examples/VariantExamples';

import {
  ChipWithSound,
  ChipWithHaptic,
  ChipWithBothFeedbacks,
  ChipWithRipple,
  ChipRippleAndFeedback,
  ChipIconVariations,
  ChipSelectionDemo,
  ChipDebugMode,
  ChipCustomActions,
  ChipSizeFeaturesCombo,
  ChipDisabledStates
} from './Examples/FeatureExamples';

import {
  TaggingSystem,
  SkillsPortfolio,
  ProductFilters,
  ShoppingCart,
  ContactManagement,
  SocialMediaTags,
  TaskManagement,
  SearchInterface
} from './Examples/UsageExamples';

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
  haptic: boolean;
}

const meta: Meta<SpectrumChipArgs> = {
  title: 'Spectrum/Components/SpectrumChip',
  component: 'spectrum-chip',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Spectrum Chip

A versatile chip component that can be used for tags, filters, selections, and interactive actions. Supports multiple variants, sizes, interactive feedback, and extensive customization options.

## Key Features

- **Six Variants**: Primary, Secondary, Assist, Filter, Input, and Suggestion chips for different use cases
- **Multiple Sizes**: Extra-small, Small, Medium, and Large sizing options
- **Interactive Feedback**: Optional sound, haptic feedback, and ripple effects
- **Rich Icons**: Leading and trailing icon support with Material Design icons
- **Selection States**: Toggle selection and removable chip functionality
- **Accessibility**: Full keyboard navigation and screen reader support

## Dependencies

This component is used by:
- **spectrum-accordion**: Uses chips as triggers for expandable content
- **spectrum-conversation-panel**: Uses chips for tags and interactive elements

## Mermaid Dependency Diagram

\`\`\`mermaid
graph TD;
  spectrum-accordion --> spectrum-chip
  spectrum-conversation-panel --> spectrum-chip
  style spectrum-chip fill:#f9f,stroke:#333,stroke-width:4px
\`\`\`

## Variants

### Primary & Secondary
Core chip variants for general purpose usage and emphasis.

### Assist
Action-oriented chips that help users perform quick actions or access tools.

### Filter
Specialized chips for filtering and search functionality with toggle states.

### Input
Form-integrated chips for removable items like tags, recipients, or selections.

### Suggestion
Smart suggestion chips for AI-powered recommendations and content discovery.
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'assist', 'filter', 'input', 'suggestion'],
      description: 'The visual style variant of the chip',
      table: {
        type: { summary: "'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion'" },
        defaultValue: { summary: 'primary' }
      }
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is in selected state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show outline styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on click',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'The text content of the chip',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    leadingIcon: {
      control: 'text',
      description: 'Material Design icon name for leading icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    trailingIcon: {
      control: 'text',
      description: 'Material Design icon name for trailing icon',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'close' }
      }
    },
    showTrailingIcon: {
      control: 'boolean',
      description: 'Whether to show the trailing icon (typically for removal)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging to console',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    action: {
      control: 'text',
      description: 'Custom action identifier for event payload',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['extra-small', 'small', 'medium', 'large'],
      description: 'The size of the chip',
      table: {
        type: { summary: "'extra-small' | 'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Whether to play sound on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Whether to provide haptic feedback on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumChipArgs>;

// ==============================================
// Playground Story
// ==============================================

export const SpectrumPlayground: Story = {
  args: {
    variant: 'primary',
    selected: false,
    disabled: false,
    outline: false,
    ripple: false,
    label: 'Interactive Chip',
    leadingIcon: '',
    trailingIcon: 'close',
    showTrailingIcon: false,
    debug: false,
    action: '',
    size: 'medium',
    sound: false,
    haptic: false
  },
  render: (args) => html`
    <spectrum-chip
      .variant=${args.variant}
      .selected=${args.selected}
      .disabled=${args.disabled}
      .outline=${args.outline}
      .ripple=${args.ripple}
      .label=${args.label}
      .leadingIcon=${args.leadingIcon}
      .trailingIcon=${args.trailingIcon}
      .showTrailingIcon=${args.showTrailingIcon}
      .debug=${args.debug}
      .action=${args.action}
      .size=${args.size}
      .sound=${args.sound}
      .haptic=${args.haptic}
      @chipAction=${(e: CustomEvent) => action('Chip Action')(e.detail)}
    ></spectrum-chip>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing chip configurations. Experiment with different variants, sizes, icons, and interactive features to see how they work together.'
      }
    }
  }
};

// ==============================================
// Basic Examples
// ==============================================

export const SpectrumBasicExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Core Chip Types</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Default Chip</h4>
            ${ChipDefault.render(ChipDefault.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">With Icon</h4>
            ${ChipWithIcon.render(ChipWithIcon.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Removable</h4>
            ${ChipRemovable.render(ChipRemovable.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Selected State</h4>
            ${ChipSelected.render(ChipSelected.args)}
          </div>
          
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Size Variations</h3>
        ${ChipSizes.render()}
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Interactive States</h3>
        ${ChipStates.render()}
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic chip configurations demonstrating core functionality, sizing options, and essential states. These examples show the foundation of chip usage patterns.'
      }
    }
  }
};

// ==============================================
// Variant Showcase
// ==============================================

export const SpectrumAllVariants: Story = {
  render: AllVariantsShowcase.render,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of all chip variants including Primary, Secondary, Assist, Filter, Input, and Suggestion variants with their different states and styling options.'
      }
    }
  }
};

export const SpectrumVariantComparison: Story = {
  render: VariantSizeComparison.render,
  parameters: {
    docs: {
      description: {
        story: 'Size comparison across different chip variants showing how variants adapt to different sizes while maintaining their distinct characteristics.'
      }
    }
  }
};

// ==============================================
// Feature Demonstrations
// ==============================================

export const SpectrumFeatureDemonstrations: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Interactive Feedback</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Sound Feedback</h4>
            ${ChipWithSound.render(ChipWithSound.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Haptic Feedback</h4>
            ${ChipWithHaptic.render(ChipWithHaptic.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Combined Feedback</h4>
            ${ChipWithBothFeedbacks.render(ChipWithBothFeedbacks.args)}
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Visual Effects</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Ripple Effect</h4>
            ${ChipWithRipple.render(ChipWithRipple.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">All Effects Combined</h4>
            ${ChipRippleAndFeedback.render(ChipRippleAndFeedback.args)}
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Icon Features</h3>
        ${ChipIconVariations.render()}
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Custom Actions</h3>
        ${ChipCustomActions.render()}
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Advanced chip features including sound/haptic feedback, ripple effects, icon variations, selection states, and custom action handling.'
      }
    }
  }
};

// ==============================================
// Real-World Usage Examples
// ==============================================

export const SpectrumUsageExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4rem;">
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Content & Tagging</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>${TaggingSystem.render()}</div>
          <div>${SkillsPortfolio.render()}</div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">E-commerce Applications</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>${ProductFilters.render()}</div>
          <div>${ShoppingCart.render()}</div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Communication & Social</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>${ContactManagement.render()}</div>
          <div>${SocialMediaTags.render()}</div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Productivity & Search</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>${TaskManagement.render()}</div>
          <div>${SearchInterface.render()}</div>
        </div>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage patterns including content tagging, e-commerce filters, contact management, social media, task management, and search interfaces.'
      }
    }
  }
};

export const SpectrumAccessibilityExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">♿ Accessibility Features</h3>
        <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: var(--spectrum-color-on-surface-variant);">
          <li><strong>Keyboard Navigation:</strong> Use Tab to navigate, Enter/Space to activate chips</li>
          <li><strong>Screen Reader Support:</strong> Proper ARIA labels and role announcements</li>
          <li><strong>Focus Management:</strong> Visible focus indicators and logical tab order</li>
          <li><strong>High Contrast:</strong> Enhanced visibility in high contrast mode</li>
          <li><strong>Reduced Motion:</strong> Respects user's motion preferences for animations</li>
          <li><strong>Touch Targets:</strong> Minimum 44px touch targets for mobile accessibility</li>
        </ul>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Accessible Filter Chips</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip
            variant="filter"
            label="All Items (23)"
            selected="true"
            @chipAction=${(e: CustomEvent) => action('Accessible All Items')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Active Tasks (12)"
            @chipAction=${(e: CustomEvent) => action('Accessible Active')(e.detail)}
          ></spectrum-chip>
          
          <spectrum-chip
            variant="filter"
            label="Completed (11)"
            @chipAction=${(e: CustomEvent) => action('Accessible Completed')(e.detail)}
          ></spectrum-chip>
        </div>
        <p style="margin-top: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          ℹ️ Numbers in labels help screen reader users understand content quantities. Selected state is properly announced.
        </p>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features and best practices for chip components, including keyboard navigation, screen reader support, and inclusive design considerations.'
      }
    }
  }
};

// Legacy alias for backward compatibility
export const Default = SpectrumPlayground; 