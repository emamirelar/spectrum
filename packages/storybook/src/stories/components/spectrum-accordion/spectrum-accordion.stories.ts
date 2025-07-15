import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Import organized examples
import {
  ChipBasic,
  ChipExpanded,
  ChipVertical,
  StandardSingle,
  StandardMulti,
  StandardWithInitialExpanded,
  SimpleChip,
  SimpleStandard,
  sampleExplorations,
  basicFAQSections,
  basicFeatureSections
} from './Examples/BasicExamples';

import {
  ChipVariantPrimary,
  ChipVariantSecondary,
  ChipVariantOutlined,
  ChipVariantFilled,
  StandardVariantSingleExpand,
  StandardVariantMultiExpand,
  StandardVariantCustomIcons,
  ChipVsStandardComparison,
  AllVariantsShowcase
} from './Examples/VariantExamples';

import {
  AccordionWithSound,
  AccordionWithHaptic,
  AccordionWithBothFeedbacks,
  AccordionCustomIcons,
  AccordionAnimatedContent,
  AccordionWithInteractiveContent,
  AccordionWithSlottedContent,
  AccordionWithDebug,
  AccordionDisabledState,
  AccordionHorizontalScroll,
  AccordionVerticalLayout
} from './Examples/FeatureExamples';

import {
  FAQAccordion,
  ProductFeaturesAccordion,
  NavigationAccordion,
  DocumentationAccordion,
  ActionToolsAccordion,
  ExplorationChipsAccordion,
  ProductCategoriesAccordion
} from './Examples/UsageExamples';

interface SpectrumAccordionArgs {
  // Common props
  expanded: boolean;
  collapsedIcon: string;
  expandedIcon: string;
  sound: boolean;
  haptic: boolean;
  disabled: boolean;
  accordionId: string;
  debug: boolean;
  variant: 'chip' | 'standard';
  
  // Chip variant props
  label: string;
  horizontalScroll: boolean;
  chipVariant: 'primary' | 'secondary';
  outline: boolean;
  
  // Standard variant props
  expandMode: 'single' | 'multi';
  sections: string;
}

const meta: Meta<SpectrumAccordionArgs> = {
  title: 'Spectrum/Components/SpectrumAccordion',
  component: 'spectrum-accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Spectrum Accordion

The Spectrum Accordion component provides two distinct variants for organizing and displaying expandable content with rich interactive features.

## Key Features

- **Two Variants**: Chip variant for trigger-based expansion and Standard variant for multi-section organization
- **Flexible Expansion**: Single or multi-expand modes for standard variant
- **Interactive Feedback**: Optional sound and haptic feedback
- **Custom Content**: Support for slotted content and HTML content
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Horizontal and vertical layout options

## Dependencies

This component depends on:
- **spectrum-chip**: Used internally by the chip variant for triggers

## Usage in Other Components

- **spectrum-conversation-panel**: Uses accordion for expandable content sections

## Mermaid Dependency Diagram

\`\`\`mermaid
graph TD;
  spectrum-accordion --> spectrum-chip
  spectrum-conversation-panel --> spectrum-accordion
  style spectrum-accordion fill:#f9f,stroke:#333,stroke-width:4px
\`\`\`

## Variants

### Chip Variant
Perfect for collapsing/expanding additional actions or content with a single trigger button.

### Standard Variant  
Traditional multi-section accordion ideal for FAQs, navigation, and content organization.
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['chip', 'standard'],
      description: 'The variant of the accordion',
      table: {
        type: { summary: "'chip' | 'standard'" },
        defaultValue: { summary: 'standard' }
      }
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion is initially expanded (chip variant only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Label text for the accordion trigger (chip variant only)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Dive Deeper' }
      }
    },
    collapsedIcon: {
      control: 'text',
      description: 'Icon to show when collapsed',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'arrow_drop_down' }
      }
    },
    expandedIcon: {
      control: 'text',
      description: 'Icon to show when expanded',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'arrow_drop_up' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Enable sound effects on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Enable haptic feedback on interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    horizontalScroll: {
      control: 'boolean',
      description: 'Enable horizontal scrolling container (chip variant only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the accordion',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    chipVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Visual variant of the trigger chip (chip variant only)',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'secondary' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Show outline on the trigger chip (chip variant only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    expandMode: {
      control: { type: 'select' },
      options: ['single', 'multi'],
      description: 'Expand behavior for standard variant',
      table: {
        type: { summary: "'single' | 'multi'" },
        defaultValue: { summary: 'single' }
      }
    },
    sections: {
      control: 'text',
      description: 'JSON string of sections for standard variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '[]' }
      }
    },
    accordionId: {
      control: 'text',
      description: 'Unique identifier for the accordion',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto-generated' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging to console',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumAccordionArgs>;

// ==============================================
// Playground Story
// ==============================================

export const SpectrumPlayground: Story = {
  args: {
    variant: 'chip',
    expanded: false,
    label: 'Explore Topics',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    sound: false,
    haptic: false,
    horizontalScroll: true,
    disabled: false,
    chipVariant: 'secondary',
    outline: true,
    expandMode: 'single',
    sections: JSON.stringify(basicFAQSections),
    accordionId: 'playground-accordion',
    debug: false
  },
  render: (args) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .haptic=${args.haptic}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Accordion Toggled')(e.detail)}
    >
      ${args.variant === 'chip' ? html`
        ${sampleExplorations.slice(0, 4).map(exploration => html`
          <spectrum-chip
            variant="secondary"
            label=${exploration.label}
            leadingIcon=${exploration.icon}
            @click=${() => action('Exploration Clicked')(exploration)}
          ></spectrum-chip>
        `)}
      ` : ''}
    </spectrum-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing accordion configurations. Switch between chip and standard variants to explore different features and behaviors.'
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
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Chip Variant Examples</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Basic Chip</h4>
            ${ChipBasic.render(ChipBasic.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Pre-expanded</h4>
            ${ChipExpanded.render(ChipExpanded.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Vertical Layout</h4>
            ${ChipVertical.render(ChipVertical.args)}
          </div>
          
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Standard Variant Examples</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Single Expand Mode</h4>
            ${StandardSingle.render(StandardSingle.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Multi Expand Mode</h4>
            ${StandardMulti.render(StandardMulti.args)}
          </div>
          
        </div>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion configurations demonstrating both chip and standard variants with their core functionality.'
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
        story: 'Comprehensive showcase of all accordion variants and their different styling options. Compare chip variants (primary/secondary, filled/outlined) and standard variants (single/multi expand modes).'
      }
    }
  }
};

export const SpectrumVariantComparison: Story = {
  render: ChipVsStandardComparison.render,
  parameters: {
    docs: {
      description: {
        story: 'Direct comparison between chip and standard variants, highlighting their different use cases and interaction patterns.'
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
            ${AccordionWithSound.render(AccordionWithSound.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Haptic Feedback</h4>
            ${AccordionWithHaptic.render(AccordionWithHaptic.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Combined Feedback</h4>
            ${AccordionWithBothFeedbacks.render(AccordionWithBothFeedbacks.args)}
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Custom Content & Layout</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Interactive Content</h4>
            ${AccordionWithInteractiveContent.render(AccordionWithInteractiveContent.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Horizontal Scroll</h4>
            ${AccordionHorizontalScroll.render(AccordionHorizontalScroll.args)}
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Advanced Features</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Slotted Content</h4>
            ${AccordionWithSlottedContent.render(AccordionWithSlottedContent.args)}
          </div>
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Debug Mode</h4>
            ${AccordionWithDebug.render(AccordionWithDebug.args)}
          </div>
        </div>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Advanced accordion features including sound/haptic feedback, interactive content, custom layouts, and development tools.'
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
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">FAQ & Documentation</h3>
        ${FAQAccordion.render(FAQAccordion.args)}
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Product Features & Pricing</h3>
        ${ProductFeaturesAccordion.render(ProductFeaturesAccordion.args)}
      </div>
      
      <div style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: start;">
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Navigation Menu</h3>
          ${NavigationAccordion.render(NavigationAccordion.args)}
        </div>
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Action Tools</h3>
          ${ActionToolsAccordion.render(ActionToolsAccordion.args)}
          <br><br>
          ${ExplorationChipsAccordion.render(ExplorationChipsAccordion.args)}
        </div>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage patterns including FAQs, product features, navigation menus, documentation, and e-commerce applications.'
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
          <li><strong>Keyboard Navigation:</strong> Use Tab, Enter, and Space keys to navigate and toggle sections</li>
          <li><strong>Screen Reader Support:</strong> Proper ARIA labels, roles, and state announcements</li>
          <li><strong>Focus Management:</strong> Visible focus indicators and logical tab order</li>
          <li><strong>High Contrast:</strong> Enhanced visibility in high contrast mode</li>
          <li><strong>Reduced Motion:</strong> Respects user's motion preferences</li>
        </ul>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Accessible FAQ Example</h4>
        <spectrum-accordion
          variant="standard"
          expand-mode="single"
          sections=${JSON.stringify([
            {
              id: 'a11y-keyboard',
              title: 'How do I navigate with keyboard?',
              content: '<p>Use <strong>Tab</strong> to navigate between accordion headers, <strong>Enter</strong> or <strong>Space</strong> to toggle sections, and <strong>Arrow keys</strong> to move between headers within the accordion.</p>'
            },
            {
              id: 'a11y-screen-reader',
              title: 'How does this work with screen readers?',
              content: '<p>Each accordion section has proper ARIA labels and roles. The screen reader announces the current state (expanded/collapsed) and provides context about the content structure.</p>'
            },
            {
              id: 'a11y-contrast',
              title: 'What about high contrast mode?',
              content: '<p>The accordion automatically adapts to high contrast mode with enhanced borders and improved text visibility for users with visual impairments.</p>'
            }
          ])}
          accordionId="accessibility-demo"
          @accordionToggle=${(e: CustomEvent) => action('Accessible Accordion Toggled')(e.detail)}
        >
        </spectrum-accordion>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features and best practices for accordion components, including keyboard navigation, screen reader support, and visual accessibility enhancements.'
      }
    }
  }
};

// Legacy alias for backward compatibility
export const Default = SpectrumPlayground; 