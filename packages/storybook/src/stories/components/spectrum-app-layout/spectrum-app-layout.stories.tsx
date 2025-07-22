import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumAppLayout Component
 * 
 * The app-layout component provides...
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
 * - **sidebarToggle**: Component interaction event
 * - **profileAction**: Component interaction event
 * - **rightBarToggle**: Component interaction event
 */

// Component interfaces for TypeScript support
interface SpectrumAppLayoutElement extends HTMLElement {
  headerHeight: string;
  footerHeight: string;
  sidebarExpandedWidth: string;
  sidebarCollapsedWidth: string;
  sidebarExpanded: boolean;
  sidebarCollapsible: boolean;
  sidebarPosition: 'left' | 'right';
  showRightBar: boolean;
  rightBarWidth: string;
  rightBarCollapsible: boolean;
  rightBarExpanded: boolean;
  showHeader: boolean;
  headerTitle: string;
  showLogo: boolean;
  logoSrc: string;
  logoAlt: string;
  showProfile: boolean;
  profileText: string;
  showFooter: boolean;
  responsive: boolean;
  breakpoint: 'sm' | 'md' | 'lg';
  collapseMobile: boolean;
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  debug: boolean;
}

// Story arguments interface
interface SpectrumAppLayoutArgs extends SpectrumAppLayoutElement {}

const meta: Meta<SpectrumAppLayoutArgs> = {
  title: 'Spectrum/Layouts/SpectrumAppLayout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The app-layout component provides...

### Event System
- sidebarToggle: Component interaction
- profileAction: Component interaction
- rightBarToggle: Component interaction

### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    headerHeight: '',
    footerHeight: '',
    sidebarExpandedWidth: '',
    sidebarCollapsedWidth: '',
    sidebarExpanded: false,
    sidebarCollapsible: false,
    sidebarPosition: 'left',
    showRightBar: false,
    rightBarWidth: '',
    rightBarCollapsible: false,
    rightBarExpanded: false,
    showHeader: false,
    headerTitle: '',
    showLogo: false,
    logoSrc: '',
    logoAlt: '',
    showProfile: false,
    profileText: '',
    showFooter: false,
    responsive: false,
    breakpoint: 'sm',
    collapseMobile: false,
    gap: 'none',
    debug: false,
  },
  argTypes: {
    headerHeight: {
      control: 'text',
      description: 'The headerHeight property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    footerHeight: {
      control: 'text',
      description: 'The footerHeight property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    sidebarExpandedWidth: {
      control: 'text',
      description: 'The sidebarExpandedWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    sidebarCollapsedWidth: {
      control: 'text',
      description: 'The sidebarCollapsedWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    sidebarExpanded: {
      control: 'boolean',
      description: 'The sidebarExpanded property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    sidebarCollapsible: {
      control: 'boolean',
      description: 'The sidebarCollapsible property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    sidebarPosition: {
      control: 'select',
      description: 'The sidebarPosition property',
      table: {
        type: { summary: `'left' | 'right'` },
        defaultValue: { summary: 'left' }
      }
    },
    showRightBar: {
      control: 'boolean',
      description: 'The showRightBar property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    rightBarWidth: {
      control: 'text',
      description: 'The rightBarWidth property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    rightBarCollapsible: {
      control: 'boolean',
      description: 'The rightBarCollapsible property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    rightBarExpanded: {
      control: 'boolean',
      description: 'The rightBarExpanded property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    showHeader: {
      control: 'boolean',
      description: 'The showHeader property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    headerTitle: {
      control: 'text',
      description: 'The headerTitle property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showLogo: {
      control: 'boolean',
      description: 'The showLogo property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    logoSrc: {
      control: 'text',
      description: 'The logoSrc property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    logoAlt: {
      control: 'text',
      description: 'The logoAlt property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showProfile: {
      control: 'boolean',
      description: 'The showProfile property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
      }
    },
    profileText: {
      control: 'text',
      description: 'The profileText property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showFooter: {
      control: 'boolean',
      description: 'The showFooter property',
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
    collapseMobile: {
      control: 'boolean',
      description: 'The collapseMobile property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false }
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
type Story = StoryObj<SpectrumAppLayoutArgs>;

// Interactive render function
const renderSpectrumAppLayout = (args: SpectrumAppLayoutArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-app-layout
      .headerHeight=${args.headerHeight}
      .footerHeight=${args.footerHeight}
      .sidebarExpandedWidth=${args.sidebarExpandedWidth}
      .sidebarCollapsedWidth=${args.sidebarCollapsedWidth}
      .sidebarExpanded=${args.sidebarExpanded}
      .sidebarCollapsible=${args.sidebarCollapsible}
      .sidebarPosition=${args.sidebarPosition}
      .showRightBar=${args.showRightBar}
      .rightBarWidth=${args.rightBarWidth}
      .rightBarCollapsible=${args.rightBarCollapsible}
      .rightBarExpanded=${args.rightBarExpanded}
      .showHeader=${args.showHeader}
      .headerTitle=${args.headerTitle}
      .showLogo=${args.showLogo}
      .logoSrc=${args.logoSrc}
      .logoAlt=${args.logoAlt}
      .showProfile=${args.showProfile}
      .profileText=${args.profileText}
      .showFooter=${args.showFooter}
      .responsive=${args.responsive}
      .breakpoint=${args.breakpoint}
      .collapseMobile=${args.collapseMobile}
      .gap=${args.gap}
      .debug=${args.debug}
      @sidebarToggle=${(e: CustomEvent) => action('sidebarToggle')(e.detail)}
      @profileAction=${(e: CustomEvent) => action('profileAction')(e.detail)}
      @rightBarToggle=${(e: CustomEvent) => action('rightBarToggle')(e.detail)}
    ></spectrum-app-layout>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumAppLayout,
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
  render: renderSpectrumAppLayout,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-app-layout configuration for common use cases.
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
      <spectrum-app-layout></spectrum-app-layout>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-app-layout variants and configurations.
        `
      }
    }
  }
};