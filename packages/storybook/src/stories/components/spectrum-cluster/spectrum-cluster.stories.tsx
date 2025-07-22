import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumCluster Component
 * 
 * The cluster component provides...
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
interface SpectrumClusterElement extends HTMLElement {
  spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  align: 'start' | 'center' | 'end';
  justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
  wrap: boolean;
  noWrap: boolean;
  direction: 'horizontal' | 'vertical';
  responsive: boolean;
  breakpoint: 'sm' | 'md' | 'lg';
  stackBelow: boolean;
  fullWidth: boolean;
  centerContainer: boolean;
  debug: boolean;
}

// Story arguments interface
interface SpectrumClusterArgs extends SpectrumClusterElement {}

const meta: Meta<SpectrumClusterArgs> = {
  title: 'Spectrum/Layouts/SpectrumCluster',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The cluster component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    spacing: '',
    align: 'start',
    justify: 'start',
    wrap: false,
    noWrap: false,
    direction: 'horizontal',
    responsive: false,
    breakpoint: 'sm',
    stackBelow: false,
    fullWidth: false,
    centerContainer: false,
    debug: false,
  },
  argTypes: {
    spacing: {
      control: 'select',
      description: 'The spacing property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string` },
        defaultValue: { summary: '' }
      }
    },
    align: {
      control: 'select',
      description: 'The align property',
      table: {
        type: { summary: `'start' | 'center' | 'end'` },
        defaultValue: { summary: 'start' }
      }
    },
    justify: {
      control: 'select',
      description: 'The justify property',
      table: {
        type: { summary: `'start' | 'center' | 'end' | 'space-between' | 'space-around'` },
        defaultValue: { summary: 'start' }
      }
    },
    wrap: {
      control: 'boolean',
      description: 'The wrap property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    noWrap: {
      control: 'boolean',
      description: 'The noWrap property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    direction: {
      control: 'select',
      description: 'The direction property',
      table: {
        type: { summary: `'horizontal' | 'vertical'` },
        defaultValue: { summary: 'horizontal' }
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
    stackBelow: {
      control: 'boolean',
      description: 'The stackBelow property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    fullWidth: {
      control: 'boolean',
      description: 'The fullWidth property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    centerContainer: {
      control: 'boolean',
      description: 'The centerContainer property',
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
type Story = StoryObj<SpectrumClusterArgs>;

// Interactive render function
const renderSpectrumCluster = (args: SpectrumClusterArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-cluster
      .spacing=${args.spacing}
      .align=${args.align}
      .justify=${args.justify}
      .wrap=${args.wrap}
      .noWrap=${args.noWrap}
      .direction=${args.direction}
      .responsive=${args.responsive}
      .breakpoint=${args.breakpoint}
      .stackBelow=${args.stackBelow}
      .fullWidth=${args.fullWidth}
      .centerContainer=${args.centerContainer}
      .debug=${args.debug}

    ></spectrum-cluster>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumCluster,
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
  render: renderSpectrumCluster,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-cluster configuration for common use cases.
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
      <spectrum-cluster></spectrum-cluster>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-cluster variants and configurations.
        `
      }
    }
  }
};