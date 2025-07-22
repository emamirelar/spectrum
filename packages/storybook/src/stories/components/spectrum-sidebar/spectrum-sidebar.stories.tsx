import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumSidebar Component
 * 
 * The sidebar component provides...
 * 
 * ### Key Features
 * - Feature 1: Description
 * - Feature 2: Description
 * - Feature 3: Description
 * 
 * ### Usage Guidelines
 * - Use for: Primary use case
 * - Avoid when: Situations to avoid
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:

 */

// Component interfaces for TypeScript support
interface SpectrumSidebarElement extends HTMLElement {
  position: 'left' | 'right';
  sidebarWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  minSidebarWidth: string;
  maxSidebarWidth: string;
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive: boolean;
  breakpoint: 'sm' | 'md' | 'lg';
  collapseBelow: boolean;
  stackMobile: boolean;
  collapsible: boolean;
  collapsed: boolean;
  overlay: boolean;
  fullHeight: boolean;
  debug: boolean;
}

// Story arguments interface
interface SpectrumSidebarArgs extends SpectrumSidebarElement {}

const meta: Meta<SpectrumSidebarArgs> = {
  title: 'Spectrum/Layouts/SpectrumSidebar',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The sidebar component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    position: 'left',
    sidebarWidth: '',
    minSidebarWidth: '',
    maxSidebarWidth: '',
    gap: 'none',
    responsive: false,
    breakpoint: 'sm',
    collapseBelow: false,
    stackMobile: false,
    collapsible: false,
    collapsed: false,
    overlay: false,
    fullHeight: false,
    debug: false,
  },
  argTypes: {
    position: {
      control: 'select',
      description: 'The position property',
      table: {
        type: { summary: `'left' | 'right'` },
        defaultValue: { summary: 'left' }
      }
    },
    sidebarWidth: {
      control: 'select',
      description: 'The sidebarWidth property',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | string` },
        defaultValue: { summary: '' }
      }
    },
    minSidebarWidth: {
      control: 'text',
      description: 'The minSidebarWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    maxSidebarWidth: {
      control: 'text',
      description: 'The maxSidebarWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    gap: {
      control: 'select',
      description: 'The gap property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` },
        defaultValue: { summary: 'none' }
      }
    },
    responsive: {
      control: 'boolean',
      description: 'The responsive property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    breakpoint: {
      control: 'select',
      description: 'The breakpoint property',
      table: {
        type: { summary: `'sm' | 'md' | 'lg'` },
        defaultValue: { summary: 'sm' }
      }
    },
    collapseBelow: {
      control: 'boolean',
      description: 'The collapseBelow property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    stackMobile: {
      control: 'boolean',
      description: 'The stackMobile property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    collapsible: {
      control: 'boolean',
      description: 'The collapsible property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    collapsed: {
      control: 'boolean',
      description: 'The collapsed property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    overlay: {
      control: 'boolean',
      description: 'The overlay property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    fullHeight: {
      control: 'boolean',
      description: 'The fullHeight property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    debug: {
      control: 'boolean',
      description: 'The debug property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumSidebarArgs>;

// Interactive render function
const renderSpectrumSidebar = (args: SpectrumSidebarArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-sidebar
      .position=${args.position}
      .sidebarWidth=${args.sidebarWidth}
      .minSidebarWidth=${args.minSidebarWidth}
      .maxSidebarWidth=${args.maxSidebarWidth}
      .gap=${args.gap}
      .responsive=${args.responsive}
      .breakpoint=${args.breakpoint}
      .collapseBelow=${args.collapseBelow}
      .stackMobile=${args.stackMobile}
      .collapsible=${args.collapsible}
      .collapsed=${args.collapsed}
      .overlay=${args.overlay}
      .fullHeight=${args.fullHeight}
      .debug=${args.debug}

    ></spectrum-sidebar>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumSidebar,
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
  render: renderSpectrumSidebar,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-sidebar configuration for common use cases.
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
      <spectrum-sidebar></spectrum-sidebar>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-sidebar variants and configurations.
        `
      }
    }
  }
};