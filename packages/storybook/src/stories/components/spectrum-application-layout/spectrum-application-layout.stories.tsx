import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumApplicationLayout Component
 * 
 * The application-layout component provides...
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
interface SpectrumApplicationLayoutElement extends HTMLElement {
  showHeaderAppId: boolean;
  showHeaderMiddle: boolean;
  showHeaderUtility: boolean;
  showContentNavigation: boolean;
  showContentSidebar: boolean;
  showFooterLeft: boolean;
  showFooterCenter: boolean;
  showFooterRight: boolean;
  debug: boolean;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
}

// Story arguments interface
interface SpectrumApplicationLayoutArgs extends SpectrumApplicationLayoutElement {}

const meta: Meta<SpectrumApplicationLayoutArgs> = {
  title: 'Spectrum/Layouts/SpectrumApplicationLayout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The application-layout component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    showHeaderAppId: false,
    showHeaderMiddle: false,
    showHeaderUtility: false,
    showContentNavigation: false,
    showContentSidebar: false,
    showFooterLeft: false,
    showFooterCenter: false,
    showFooterRight: false,
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
  },
  argTypes: {
    showHeaderAppId: {
      control: 'boolean',
      description: 'The showHeaderAppId property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showHeaderMiddle: {
      control: 'boolean',
      description: 'The showHeaderMiddle property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showHeaderUtility: {
      control: 'boolean',
      description: 'The showHeaderUtility property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showContentNavigation: {
      control: 'boolean',
      description: 'The showContentNavigation property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showContentSidebar: {
      control: 'boolean',
      description: 'The showContentSidebar property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showFooterLeft: {
      control: 'boolean',
      description: 'The showFooterLeft property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showFooterCenter: {
      control: 'boolean',
      description: 'The showFooterCenter property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showFooterRight: {
      control: 'boolean',
      description: 'The showFooterRight property',
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
    leftCollapsed: {
      control: 'boolean',
      description: 'The leftCollapsed property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    rightCollapsed: {
      control: 'boolean',
      description: 'The rightCollapsed property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumApplicationLayoutArgs>;

// Interactive render function
const renderSpectrumApplicationLayout = (args: SpectrumApplicationLayoutArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-application-layout
      .showHeaderAppId=${args.showHeaderAppId}
      .showHeaderMiddle=${args.showHeaderMiddle}
      .showHeaderUtility=${args.showHeaderUtility}
      .showContentNavigation=${args.showContentNavigation}
      .showContentSidebar=${args.showContentSidebar}
      .showFooterLeft=${args.showFooterLeft}
      .showFooterCenter=${args.showFooterCenter}
      .showFooterRight=${args.showFooterRight}
      .debug=${args.debug}
      .leftCollapsed=${args.leftCollapsed}
      .rightCollapsed=${args.rightCollapsed}

    ></spectrum-application-layout>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumApplicationLayout,
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
  render: renderSpectrumApplicationLayout,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-application-layout configuration for common use cases.
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
      <spectrum-application-layout></spectrum-application-layout>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-application-layout variants and configurations.
        `
      }
    }
  }
};