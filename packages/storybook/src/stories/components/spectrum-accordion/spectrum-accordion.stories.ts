import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import docs from './spectrum-accordion.docs.md?raw';

interface SpectrumAccordionArgs {
  // Common props
  expanded: boolean;
  collapsedIcon: string;
  expandedIcon: string;
  sound: boolean;
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
        component: docs
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

// Sample exploration content for chip variant
const sampleExplorations = [
  { label: 'Renewable Energy Sources', value: 'renewable-energy' },
  { label: 'Solar Panel Efficiency', value: 'solar-efficiency' },
  { label: 'Wind Power Generation', value: 'wind-power' },
  { label: 'Hydroelectric Systems', value: 'hydro-systems' },
  { label: 'Energy Storage Solutions', value: 'energy-storage' }
];

// Sample sections for standard variant
const faqSections = [
  {
    id: 'getting-started',
    title: 'How do I get started?',
    content: '<p>Getting started is easy! Simply follow our comprehensive quick start guide that walks you through the initial setup process.</p>'
  },
  {
    id: 'system-requirements',
    title: 'What are the system requirements?',
    content: '<p>Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. We also support mobile devices running iOS 12+ and Android 8+.</p>'
  },
  {
    id: 'support',
    title: 'How do I contact support?',
    content: '<p>You can reach our support team via email at support@example.com or through our live chat feature available 24/7.</p>'
  },
  {
    id: 'pricing',
    title: 'What are your pricing plans?',
    content: '<p>We offer flexible pricing plans starting from $10/month for basic usage up to enterprise solutions. Contact our sales team for custom pricing.</p>'
  }
];

const featureSections = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    expanded: true,
    content: '<p>Get detailed insights with our comprehensive analytics dashboard featuring real-time data visualization and custom reporting.</p>'
  },
  {
    id: 'collaboration',
    title: 'Real-time Collaboration',
    content: '<p>Work together with your team in real-time with live editing, commenting, and notification systems.</p>'
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    expanded: true,
    content: '<p>Connect with third-party services via our robust REST API with comprehensive documentation and SDKs.</p>'
  }
];

// ==============================================
// Chip Variant Stories
// ==============================================

export const ChipVariantDefault: Story = {
  args: {
    variant: 'chip',
    expanded: false,
    label: 'Dive Deeper',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    sound: false,
    horizontalScroll: true,
    disabled: false,
    chipVariant: 'secondary',
    outline: true,
    accordionId: 'chip-default-accordion',
    debug: false,
    expandMode: 'single',
    sections: ''
  },
  render: (args) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Accordion Toggled')(e.detail)}
    >
      ${sampleExplorations.map(exploration => html`
        <spectrum-chip
          variant="secondary"
          label=${exploration.label}
          leadingIcon="prompt_suggestion"
          @click=${() => action('Exploration Clicked')(exploration)}
        ></spectrum-chip>
      `)}
    </spectrum-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Default chip variant accordion with horizontal scrolling content. This is the original implementation - perfect for showing additional actions or exploration options.'
      }
    }
  }
};

export const ChipVariantExpanded: Story = {
  args: {
    ...ChipVariantDefault.args,
    expanded: true,
    accordionId: 'chip-expanded-accordion'
  },
  render: ChipVariantDefault.render,
  parameters: {
    docs: {
      description: {
        story: 'Chip variant accordion that starts in the expanded state.'
      }
    }
  }
};

export const ChipVariantVertical: Story = {
  args: {
    ...ChipVariantDefault.args,
    horizontalScroll: false,
    label: 'Show Options',
    accordionId: 'chip-vertical-accordion'
  },
  render: ChipVariantDefault.render,
  parameters: {
    docs: {
      description: {
        story: 'Chip variant with vertical content layout instead of horizontal scrolling. Better for longer lists or items with more text.'
      }
    }
  }
};

export const ChipVariantPrimary: Story = {
  args: {
    ...ChipVariantDefault.args,
    chipVariant: 'primary',
    outline: false,
    label: 'Explore More',
    accordionId: 'chip-primary-accordion'
  },
  render: (args) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Accordion Toggled')(e.detail)}
    >
      ${sampleExplorations.slice(0, 3).map(exploration => html`
        <spectrum-chip
          variant="primary"
          label=${exploration.label}
          leadingIcon="prompt_suggestion"
          @click=${() => action('Exploration Clicked')(exploration)}
        ></spectrum-chip>
      `)}
    </spectrum-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Chip variant using primary styling without outline for emphasis.'
      }
    }
  }
};

// ==============================================
// Standard Variant Stories
// ==============================================

export const StandardVariantSingle: Story = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify(faqSections),
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    disabled: false,
    accordionId: 'standard-single-accordion',
    debug: false,
    // Chip variant props (not used but needed for interface)
    expanded: false,
    label: '',
    horizontalScroll: true,
    chipVariant: 'secondary',
    outline: true,
    sound: false
  },
  render: (args) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .disabled=${args.disabled}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Section Toggled')(e.detail)}
    >
    </spectrum-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Standard accordion variant with single expand mode. Only one section can be expanded at a time. Perfect for FAQs and content organization where you want users to focus on one item.'
      }
    }
  }
};

export const StandardVariantMulti: Story = {
  args: {
    ...StandardVariantSingle.args,
    expandMode: 'multi',
    sections: JSON.stringify(featureSections),
    accordionId: 'standard-multi-accordion'
  },
  render: StandardVariantSingle.render,
  parameters: {
    docs: {
      description: {
        story: 'Standard accordion variant with multi expand mode. Multiple sections can be expanded simultaneously. Some sections start expanded based on their initial state.'
      }
    }
  }
};

export const StandardVariantWithSlots: Story = {
  args: {
    ...StandardVariantSingle.args,
    expandMode: 'single',
    sections: JSON.stringify([
      { id: 'custom1', title: 'Custom Content Section' },
      { id: 'custom2', title: 'Interactive Components' },
      { id: 'fallback', title: 'Mixed Content' }
    ]),
    accordionId: 'standard-slots-accordion'
  },
  render: (args) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .disabled=${args.disabled}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Section Toggled')(e.detail)}
    >
      <!-- Named slots for specific sections -->
      <div slot="section-custom1">
        <spectrum-button variant="primary">Custom Action</spectrum-button>
        <p>This content uses a named slot and can contain any components.</p>
      </div>
      
      <div slot="section-custom2">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <spectrum-chip variant="primary" label="Interactive"></spectrum-chip>
          <spectrum-chip variant="secondary" label="Components"></spectrum-chip>
          <spectrum-button variant="secondary">Click Me</spectrum-button>
        </div>
        <p>This section demonstrates interactive components within accordion sections.</p>
      </div>
      
      <!-- Fallback content for sections without named slots -->
      <div>
        <p>This is fallback content that will be used for the "Mixed Content" section since it doesn't have a named slot.</p>
        <spectrum-chip variant="secondary" label="Fallback Content"></spectrum-chip>
      </div>
    </spectrum-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Standard accordion with custom slotted content. Shows how to use named slots for specific sections and fallback content for others.'
      }
    }
  }
};

export const StandardVariantDisabled: Story = {
  args: {
    ...StandardVariantSingle.args,
    disabled: true,
    accordionId: 'standard-disabled-accordion'
  },
  render: StandardVariantSingle.render,
  parameters: {
    docs: {
      description: {
        story: 'Standard accordion in disabled state - sections cannot be expanded or collapsed.'
      }
    }
  }
};

// ==============================================
// Comparison and Advanced Examples
// ==============================================

export const BothVariantsComparison: Story = {
  args: {
    ...ChipVariantDefault.args
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Chip Variant</h3>
        <spectrum-accordion
          variant="chip"
          label="Show Energy Sources"
          accordionId="comparison-chip"
          @accordionToggle=${(e: CustomEvent) => action('Chip Accordion Toggled')(e.detail)}
        >
          ${sampleExplorations.slice(0, 3).map(exploration => html`
            <spectrum-chip
              variant="secondary"
              label=${exploration.label}
              leadingIcon="prompt_suggestion"
              @click=${() => action('Chip Content Clicked')(exploration)}
            ></spectrum-chip>
          `)}
        </spectrum-accordion>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Standard Variant</h3>
        <spectrum-accordion
          variant="standard"
          expand-mode="single"
          sections=${JSON.stringify(faqSections.slice(0, 3))}
          accordionId="comparison-standard"
          @accordionToggle=${(e: CustomEvent) => action('Standard Accordion Toggled')(e.detail)}
        >
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of both accordion variants showing their different use cases and interaction patterns.'
      }
    }
  }
};

export const MultipleStandardAccordions: Story = {
  args: {
    ...StandardVariantSingle.args
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <spectrum-accordion
        variant="standard"
        expand-mode="single"
        sections=${JSON.stringify(faqSections.slice(0, 2))}
        accordionId="multiple-faq"
        @accordionToggle=${(e: CustomEvent) => action('FAQ Accordion Toggled')(e.detail)}
      >
      </spectrum-accordion>
      
      <spectrum-accordion
        variant="standard"
        expand-mode="multi"
        sections=${JSON.stringify(featureSections)}
        accordionId="multiple-features"
        @accordionToggle=${(e: CustomEvent) => action('Features Accordion Toggled')(e.detail)}
      >
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent standard accordions with different expand modes working together on the same page.'
      }
    }
  }
};

// Alias for backward compatibility
export const Default = ChipVariantDefault; 