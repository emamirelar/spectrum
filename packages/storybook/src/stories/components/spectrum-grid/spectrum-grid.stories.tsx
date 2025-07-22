import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumGrid Component
 * 
 * The grid component provides...
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
interface SpectrumGridElement extends HTMLElement {
  columns: string;
  minColumnWidth: string;
  autoColumns: string;
  rows: string;
  minRowHeight: string;
  autoRows: string;
  areas: string;
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  rowGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  columnGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  alignItems: 'start' | 'end' | 'center' | 'stretch';
  justifyItems: 'start' | 'end' | 'center' | 'stretch';
  alignContent: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
  justifyContent: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
  autoFit: boolean;
  autoFill: boolean;
  responsive: boolean;
  breakpoint: 'sm' | 'md' | 'lg';
  mobileColumns: string;
  fullHeight: boolean;
  fullWidth: boolean;
  inline: boolean;
  debug: boolean;
}

// Story arguments interface
interface SpectrumGridArgs extends SpectrumGridElement {}

const meta: Meta<SpectrumGridArgs> = {
  title: 'Spectrum/Layouts/SpectrumGrid',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The grid component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    columns: '',
    minColumnWidth: '',
    autoColumns: '',
    rows: '',
    minRowHeight: '',
    autoRows: '',
    areas: '',
    gap: '',
    rowGap: '',
    columnGap: '',
    alignItems: 'start',
    justifyItems: 'start',
    alignContent: 'start',
    justifyContent: 'start',
    autoFit: false,
    autoFill: false,
    responsive: false,
    breakpoint: 'sm',
    mobileColumns: '',
    fullHeight: false,
    fullWidth: false,
    inline: false,
    debug: false,
  },
  argTypes: {
    columns: {
      control: 'text',
      description: 'The columns property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    minColumnWidth: {
      control: 'text',
      description: 'The minColumnWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    autoColumns: {
      control: 'text',
      description: 'The autoColumns property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    rows: {
      control: 'text',
      description: 'The rows property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    minRowHeight: {
      control: 'text',
      description: 'The minRowHeight property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    autoRows: {
      control: 'text',
      description: 'The autoRows property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    areas: {
      control: 'text',
      description: 'The areas property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
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
    alignItems: {
      control: 'select',
      description: 'The alignItems property',
      table: {
        type: { summary: `'start' | 'end' | 'center' | 'stretch'` },
        defaultValue: { summary: 'start' }
      }
    },
    justifyItems: {
      control: 'select',
      description: 'The justifyItems property',
      table: {
        type: { summary: `'start' | 'end' | 'center' | 'stretch'` },
        defaultValue: { summary: 'start' }
      }
    },
    alignContent: {
      control: 'select',
      description: 'The alignContent property',
      table: {
        type: { summary: `'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'` },
        defaultValue: { summary: 'start' }
      }
    },
    justifyContent: {
      control: 'select',
      description: 'The justifyContent property',
      table: {
        type: { summary: `'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'` },
        defaultValue: { summary: 'start' }
      }
    },
    autoFit: {
      control: 'boolean',
      description: 'The autoFit property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    autoFill: {
      control: 'boolean',
      description: 'The autoFill property',
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
    mobileColumns: {
      control: 'text',
      description: 'The mobileColumns property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
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
    inline: {
      control: 'boolean',
      description: 'The inline property',
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
type Story = StoryObj<SpectrumGridArgs>;

// Interactive render function
const renderSpectrumGrid = (args: SpectrumGridArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-grid
      .columns=${args.columns}
      .minColumnWidth=${args.minColumnWidth}
      .autoColumns=${args.autoColumns}
      .rows=${args.rows}
      .minRowHeight=${args.minRowHeight}
      .autoRows=${args.autoRows}
      .areas=${args.areas}
      .gap=${args.gap}
      .rowGap=${args.rowGap}
      .columnGap=${args.columnGap}
      .alignItems=${args.alignItems}
      .justifyItems=${args.justifyItems}
      .alignContent=${args.alignContent}
      .justifyContent=${args.justifyContent}
      .autoFit=${args.autoFit}
      .autoFill=${args.autoFill}
      .responsive=${args.responsive}
      .breakpoint=${args.breakpoint}
      .mobileColumns=${args.mobileColumns}
      .fullHeight=${args.fullHeight}
      .fullWidth=${args.fullWidth}
      .inline=${args.inline}
      .debug=${args.debug}

    ></spectrum-grid>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumGrid,
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
  render: renderSpectrumGrid,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-grid configuration for common use cases.
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
      <spectrum-grid></spectrum-grid>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-grid variants and configurations.
        `
      }
    }
  }
};