import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumStack Component
 * 
 * The stack component provides...
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
interface SpectrumStackElement extends HTMLElement {
  direction: 'vertical' | 'horizontal' | 'column' | 'row';
  spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto';
  align: 'start' | 'center' | 'end' | 'stretch';
  justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  wrap: boolean;
  reverse: boolean;
  responsive: boolean;
  breakpoint: 'sm' | 'md' | 'lg';
  debug: boolean;
}

// Story arguments interface
interface SpectrumStackArgs extends SpectrumStackElement {}

const meta: Meta<SpectrumStackArgs> = {
  title: 'Spectrum/Layouts/SpectrumStack',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The stack component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    direction: 'vertical',
    spacing: 'none',
    align: 'start',
    justify: 'start',
    wrap: false,
    reverse: false,
    responsive: false,
    breakpoint: 'sm',
    debug: false,
  },
  argTypes: {
    direction: {
      control: 'select',
      description: 'The direction property',
      table: {
        type: { summary: `'vertical' | 'horizontal' | 'column' | 'row'` },
        defaultValue: { summary: 'vertical' }
      }
    },
    spacing: {
      control: 'select',
      description: 'The spacing property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto'` },
        defaultValue: { summary: 'none' }
      }
    },
    align: {
      control: 'select',
      description: 'The align property',
      table: {
        type: { summary: `'start' | 'center' | 'end' | 'stretch'` },
        defaultValue: { summary: 'start' }
      }
    },
    justify: {
      control: 'select',
      description: 'The justify property',
      table: {
        type: { summary: `'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'` },
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
    reverse: {
      control: 'boolean',
      description: 'The reverse property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
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
type Story = StoryObj<SpectrumStackArgs>;

// Interactive render function
const renderSpectrumStack = (args: SpectrumStackArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-stack
      .direction=${args.direction}
      .spacing=${args.spacing}
      .align=${args.align}
      .justify=${args.justify}
      .wrap=${args.wrap}
      .reverse=${args.reverse}
      .responsive=${args.responsive}
      .breakpoint=${args.breakpoint}
      .debug=${args.debug}

    ></spectrum-stack>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumStack,
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
  render: renderSpectrumStack,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-stack configuration for common use cases.
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
      <spectrum-stack></spectrum-stack>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-stack variants and configurations.
        `
      }
    }
  }
};