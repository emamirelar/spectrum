import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumFlex Component
 * 
 * The flex component provides...
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
interface SpectrumFlexElement extends HTMLElement {
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  rowGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  columnGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  inline: boolean;
  fullHeight: boolean;
  fullWidth: boolean;
  responsive: boolean;
  breakpoint: 'sm' | 'md' | 'lg';
  mobileDirection: 'row' | 'column';
  debug: boolean;
}

// Story arguments interface
interface SpectrumFlexArgs extends SpectrumFlexElement {}

const meta: Meta<SpectrumFlexArgs> = {
  title: 'Spectrum/Layouts/SpectrumFlex',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The flex component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'flex-start',
    align: 'flex-start',
    alignContent: 'flex-start',
    gap: '',
    rowGap: '',
    columnGap: '',
    inline: false,
    fullHeight: false,
    fullWidth: false,
    responsive: false,
    breakpoint: 'sm',
    mobileDirection: 'row',
    debug: false,
  },
  argTypes: {
    direction: {
      control: 'select',
      description: 'The direction property',
      table: {
        type: { summary: `'row' | 'row-reverse' | 'column' | 'column-reverse'` },
        defaultValue: { summary: 'row' }
      }
    },
    wrap: {
      control: 'select',
      description: 'The wrap property',
      table: {
        type: { summary: `'nowrap' | 'wrap' | 'wrap-reverse'` },
        defaultValue: { summary: 'nowrap' }
      }
    },
    justify: {
      control: 'select',
      description: 'The justify property',
      table: {
        type: { summary: `'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'` },
        defaultValue: { summary: 'flex-start' }
      }
    },
    align: {
      control: 'select',
      description: 'The align property',
      table: {
        type: { summary: `'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'` },
        defaultValue: { summary: 'flex-start' }
      }
    },
    alignContent: {
      control: 'select',
      description: 'The alignContent property',
      table: {
        type: { summary: `'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'` },
        defaultValue: { summary: 'flex-start' }
      }
    },
    gap: {
      control: 'select',
      description: 'The gap property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string` },
        defaultValue: { summary: '' }
      }
    },
    rowGap: {
      control: 'select',
      description: 'The rowGap property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string` },
        defaultValue: { summary: '' }
      }
    },
    columnGap: {
      control: 'select',
      description: 'The columnGap property',
      table: {
        type: { summary: `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string` },
        defaultValue: { summary: '' }
      }
    },
    inline: {
      control: 'boolean',
      description: 'The inline property',
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
    fullWidth: {
      control: 'boolean',
      description: 'The fullWidth property',
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
    mobileDirection: {
      control: 'select',
      description: 'The mobileDirection property',
      table: {
        type: { summary: `'row' | 'column'` },
        defaultValue: { summary: 'row' }
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
type Story = StoryObj<SpectrumFlexArgs>;

// Interactive render function
const renderSpectrumFlex = (args: SpectrumFlexArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-flex
      .direction=${args.direction}
      .wrap=${args.wrap}
      .justify=${args.justify}
      .align=${args.align}
      .alignContent=${args.alignContent}
      .gap=${args.gap}
      .rowGap=${args.rowGap}
      .columnGap=${args.columnGap}
      .inline=${args.inline}
      .fullHeight=${args.fullHeight}
      .fullWidth=${args.fullWidth}
      .responsive=${args.responsive}
      .breakpoint=${args.breakpoint}
      .mobileDirection=${args.mobileDirection}
      .debug=${args.debug}

    ></spectrum-flex>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumFlex,
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
  render: renderSpectrumFlex,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-flex configuration for common use cases.
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
      <spectrum-flex></spectrum-flex>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-flex variants and configurations.
        `
      }
    }
  }
};