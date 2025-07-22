import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

// Import component interfaces
interface AccordionSection {
  id: string;
  title: string;
  content?: string;
  expanded?: boolean;
}

/**
 * ## SpectrumAccordion Component
 * 
 * The accordion component provides...

**Variants**: Variants, Standard Variant (Default), Chip Variant (Original Implementation), Standard Variant (New Implementation), Multi Expand Mode

**Accessibility**: Built-in keyboard navigation, screen reader support, and ARIA compliance.
 * 
 * ### Key Features
 * - **Accessibility Features**: - **Keyboard Navigation**: Use Tab, Enter, and Space keys
- **Screen Reader Support**: Proper ARIA labels and roles
- **High Contrast Mode**: Enhanced visibility in high contrast environments
- **Reduced Motion**: Respects user's motion preferences
 * - **Keyboard Navigation**: Use Tab, Enter, and Space keys
 * - **Screen Reader Support**: Proper ARIA labels and roles
 * - **High Contrast Mode**: Enhanced visibility in high contrast environments
 * - **Reduced Motion**: Respects user's motion preferences
 * 
 * ### Usage Guidelines
 * - **Use for**: Primary use case
 * - **Avoid when**: Situations to avoid
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **accordionToggle**: Component interaction event
 */

// Component interfaces for TypeScript support
interface SpectrumAccordionElement extends HTMLElement {
  expanded: boolean;
  label: string;
  collapsedIcon: string;
  expandedIcon: string;
  sound: boolean;
  haptic: boolean;
  horizontalScroll: boolean;
  disabled: boolean;
  variant: 'chip' | 'standard';
  chipVariant: 'primary' | 'secondary';
  outline: boolean;
  expandMode: 'single' | 'multi';
  sections: string | AccordionSection[];
  accordionId: string;
  debug: boolean;
}

// Story arguments interface
interface SpectrumAccordionArgs extends SpectrumAccordionElement {}

const meta: Meta<SpectrumAccordionArgs> = {
  title: 'Spectrum/Components/SpectrumAccordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The accordion component provides...

### Event System
- accordionToggle: Component interaction

### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    expanded: false,
    label: 'Dive Deeper',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    sound: false,
    haptic: false,
    horizontalScroll: true,
    disabled: false,
    variant: 'standard',
    chipVariant: 'secondary',
    outline: true,
    expandMode: 'single',
    sections: [{"id":"1","title":"Section One","content":"Content for section one","expanded":false},{"id":"2","title":"Section Two","content":"Content for section two","expanded":false}],
    accordionId: '',
    debug: false,
  },
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'The expanded property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'The label property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Dive Deeper' }
      }
    },
    collapsedIcon: {
      control: 'text',
      description: 'The collapsedIcon property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'arrow_drop_down' }
      }
    },
    expandedIcon: {
      control: 'text',
      description: 'The expandedIcon property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'arrow_drop_up' }
      }
    },
    sound: {
      control: 'boolean',
      description: 'The sound property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'The haptic property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    horizontalScroll: {
      control: 'boolean',
      description: 'The horizontalScroll property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'The disabled property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    variant: {
      control: 'select',
      options: ['chip', 'standard'],
      description: 'The variant property',
      table: {
        type: { summary: `'chip' | 'standard'` },
        defaultValue: { summary: 'standard' }
      }
    },
    chipVariant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'The chipVariant property',
      table: {
        type: { summary: `'primary' | 'secondary'` },
        defaultValue: { summary: 'secondary' }
      }
    },
    outline: {
      control: 'boolean',
      description: 'The outline property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    expandMode: {
      control: 'select',
      options: ['single', 'multi'],
      description: 'The expandMode property',
      table: {
        type: { summary: `'single' | 'multi'` },
        defaultValue: { summary: 'single' }
      }
    },
    sections: {
      control: 'select',
      options: ['string', 'AccordionSection[]'],
      description: 'The sections property',
      table: {
        type: { summary: 'string | AccordionSection[]' },
        defaultValue: { summary: '[]' }
      }
    },
    accordionId: {
      control: 'text',
      description: 'The accordionId property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '`accordion-${Math.random().toString(36).substr(2, 9)}`' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'The debug property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumAccordionArgs>;

// Interactive render function
const renderSpectrumAccordion = (args: SpectrumAccordionArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-accordion
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .haptic=${args.haptic}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .variant=${args.variant}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
    >
      <div slot="default">
        <p>Accordion content goes here. This is displayed when expanded.</p>
        <ul>
          <li>Sample list item one</li>
          <li>Sample list item two</li>
          <li>Sample list item three</li>
        </ul>
      </div>
    </spectrum-accordion>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumAccordion,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all component properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic component configuration showing default usage.
 */
export const BasicExample: Story = {
  render: renderSpectrumAccordion,
  args: {
    expanded: false,
    label: 'Dive Deeper',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    variant: 'standard',
    chipVariant: 'secondary',
    outline: true,
    expandMode: 'single',
    horizontalScroll: true,
    sections: [{"id":"1","title":"Section One","content":"Content for section one","expanded":false},{"id":"2","title":"Section Two","content":"Content for section two","expanded":false}],
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-accordion configuration for common use cases.
        `
      }
    }
  }
};

/**
 * Component variants and configurations.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-wrap: wrap; justify-content: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <!-- Add variant examples -->
      <spectrum-accordion></spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-accordion variants and configurations.
        `
      }
    }
  }
};