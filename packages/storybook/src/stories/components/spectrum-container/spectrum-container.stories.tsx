import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumContainer Component
 * 
 * The container component provides...
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
interface SpectrumContainerElement extends HTMLElement {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid';
  maxWidth: string;
  padding: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  paddingX: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '';
  paddingY: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '';
  centered: boolean;
  centerContent: boolean;
  responsive: boolean;
  fullWidthMobile: boolean;
  debug: boolean;
}

// Story arguments interface
interface SpectrumContainerArgs extends SpectrumContainerElement {}

const meta: Meta<SpectrumContainerArgs> = {
  title: 'Spectrum/Layouts/SpectrumContainer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The container component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    size: 'xs',
    maxWidth: '',
    padding: 'none',
    paddingX: 'none',
    paddingY: 'none',
    centered: false,
    centerContent: false,
    responsive: false,
    fullWidthMobile: false,
    debug: false,
  },
  argTypes: {
    size: {
      control: 'select',
      description: 'The size property',
      table: {
        type: { summary: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid'` },
        defaultValue: { summary: 'xs' }
      }
    },
    maxWidth: {
      control: 'text',
      description: 'The maxWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    padding: {
      control: 'select',
      description: 'The padding property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` },
        defaultValue: { summary: 'none' }
      }
    },
    paddingX: {
      control: 'select',
      description: 'The paddingX property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | ''` },
        defaultValue: { summary: 'none' }
      }
    },
    paddingY: {
      control: 'select',
      description: 'The paddingY property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | ''` },
        defaultValue: { summary: 'none' }
      }
    },
    centered: {
      control: 'boolean',
      description: 'The centered property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    centerContent: {
      control: 'boolean',
      description: 'The centerContent property',
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
    fullWidthMobile: {
      control: 'boolean',
      description: 'The fullWidthMobile property',
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
type Story = StoryObj<SpectrumContainerArgs>;

// Interactive render function
const renderSpectrumContainer = (args: SpectrumContainerArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-container
      .size=${args.size}
      .maxWidth=${args.maxWidth}
      .padding=${args.padding}
      .paddingX=${args.paddingX}
      .paddingY=${args.paddingY}
      .centered=${args.centered}
      .centerContent=${args.centerContent}
      .responsive=${args.responsive}
      .fullWidthMobile=${args.fullWidthMobile}
      .debug=${args.debug}

    ></spectrum-container>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumContainer,
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
  render: renderSpectrumContainer,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-container configuration for common use cases.
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
      <spectrum-container></spectrum-container>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-container variants and configurations.
        `
      }
    }
  }
};