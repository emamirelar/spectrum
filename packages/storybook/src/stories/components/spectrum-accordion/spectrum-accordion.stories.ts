import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import docs from './spectrum-accordion.docs.md?raw';

interface SpectrumAccordionArgs {
  expanded: boolean;
  label: string;
  collapsedIcon: string;
  expandedIcon: string;
  sound: boolean;
  horizontalScroll: boolean;
  disabled: boolean;
  variant: 'primary' | 'secondary';
  outline: boolean;
  accordionId: string;
  debug: boolean;
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
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion is initially expanded',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Label text for the accordion trigger',
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
      description: 'Enable horizontal scrolling container',
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
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Visual variant of the trigger chip',
      table: {
        type: { summary: "'primary' | 'secondary'" },
        defaultValue: { summary: 'secondary' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Show outline on the trigger chip',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
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

// Sample exploration content
const sampleExplorations = [
  { label: 'Renewable Energy Sources', value: 'renewable-energy' },
  { label: 'Solar Panel Efficiency', value: 'solar-efficiency' },
  { label: 'Wind Power Generation', value: 'wind-power' },
  { label: 'Hydroelectric Systems', value: 'hydro-systems' },
  { label: 'Energy Storage Solutions', value: 'energy-storage' }
];

export const Default: Story = {
  args: {
    expanded: false,
    label: 'Dive Deeper',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    sound: false,
    horizontalScroll: true,
    disabled: false,
    variant: 'secondary',
    outline: true,
    accordionId: 'default-accordion',
    debug: false
  },
  render: (args) => html`
    <spectrum-accordion
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .variant=${args.variant}
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
        story: 'Basic accordion with horizontal scrolling content. Click the trigger to expand/collapse.'
      }
    }
  }
};

export const ExpandedByDefault: Story = {
  args: {
    ...Default.args,
    expanded: true,
    accordionId: 'expanded-accordion'
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Accordion that starts in the expanded state.'
      }
    }
  }
};

export const VerticalLayout: Story = {
  args: {
    ...Default.args,
    horizontalScroll: false,
    label: 'Show Options',
    accordionId: 'vertical-accordion'
  },
  render: (args) => html`
    <spectrum-accordion
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .variant=${args.variant}
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
        story: 'Accordion with vertical content layout instead of horizontal scrolling. Better for longer lists or items with more text.'
      }
    }
  }
};

export const CustomIcons: Story = {
  args: {
    ...Default.args,
    label: 'More Details',
    collapsedIcon: 'expand_more',
    expandedIcon: 'expand_less',
    accordionId: 'custom-icons-accordion'
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Accordion with custom expand/collapse icons and label.'
      }
    }
  }
};

export const DisabledState: Story = {
  args: {
    ...Default.args,
    disabled: true,
    accordionId: 'disabled-accordion'
  },
  render: Default.render,
  parameters: {
    docs: {
      description: {
        story: 'Accordion in disabled state - cannot be interacted with.'
      }
    }
  }
};

export const PrimaryVariant: Story = {
  args: {
    ...Default.args,
    variant: 'primary',
    outline: false,
    label: 'Explore More',
    accordionId: 'primary-accordion'
  },
  render: (args) => html`
    <spectrum-accordion
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .variant=${args.variant}
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
        story: 'Accordion using primary chip variant without outline for emphasis.'
      }
    }
  }
};

export const SoundEnabled: Story = {
  args: {
    ...Default.args,
    sound: true,
    accordionId: 'sound-accordion'
  },
  render: (args) => html`
    <spectrum-accordion
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .variant=${args.variant}
      .outline=${args.outline}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Accordion Toggled')(e.detail)}
    >
      ${sampleExplorations.slice(0, 3).map(exploration => html`
        <spectrum-chip
          variant="secondary"
          label=${exploration.label}
          leadingIcon="prompt_suggestion"
          sound=${args.sound}
          @click=${() => action('Exploration Clicked')(exploration)}
        ></spectrum-chip>
      `)}
    </spectrum-accordion>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Accordion with sound effects enabled. Make sure your volume is on to hear the audio feedback!'
      }
    }
  }
};

export const MultipleAccordions: Story = {
  args: {
    ...Default.args
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <spectrum-accordion
        label="Energy Sources"
        accordionId="energy-accordion"
        @accordionToggle=${(e: CustomEvent) => action('Energy Accordion Toggled')(e.detail)}
      >
        ${sampleExplorations.slice(0, 3).map(exploration => html`
          <spectrum-chip
            variant="secondary"
            label=${exploration.label}
            leadingIcon="prompt_suggestion"
            @click=${() => action('Energy Exploration Clicked')(exploration)}
          ></spectrum-chip>
        `)}
      </spectrum-accordion>
      
      <spectrum-accordion
        label="Technology Solutions"
        accordionId="tech-accordion"
        @accordionToggle=${(e: CustomEvent) => action('Tech Accordion Toggled')(e.detail)}
      >
        ${sampleExplorations.slice(3).map(exploration => html`
          <spectrum-chip
            variant="secondary"
            label=${exploration.label}
            leadingIcon="prompt_suggestion"
            @click=${() => action('Tech Exploration Clicked')(exploration)}
          ></spectrum-chip>
        `)}
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiple independent accordions working together. Each accordion maintains its own state.'
      }
    }
  }
}; 