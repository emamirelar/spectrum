import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumSwitch Component
 * 
 * The switch component provides...
 * 
 * ### Key Features
 * - **Feature 1**: Description
 * - **Feature 2**: Description
 * - **Feature 3**: Description
 * 
 * ### Usage Guidelines
 * - **Use for**: Primary use case
 * - **Avoid when**: Situations to avoid
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:

 */

// Component interfaces for TypeScript support
interface SpectrumSwitchElement extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  variant: 'primary' | 'positive' | 'caution' | 'destructive';
  size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large';
  value: string;
  name: string;
  label: string;
  showIcons: boolean;
  accessibleLabel: string;
  accessibleDescribedBy: string;
  accessibleLabelledBy: string;
  loading: boolean;
}

// Story arguments interface
interface SpectrumSwitchArgs extends SpectrumSwitchElement {}

const meta: Meta<SpectrumSwitchArgs> = {
  title: 'Spectrum/Components/SpectrumSwitch',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The switch component provides...

### Event System


### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    checked: false,
    disabled: false,
    variant: 'primary',
    size: 'sm',
    value: '',
    name: '',
    label: '',
    showIcons: false,
    accessibleLabel: '',
    accessibleDescribedBy: '',
    accessibleLabelledBy: '',
    loading: false,
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The checked property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
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
      options: ['primary', 'positive', 'caution', 'destructive'],
      description: 'The variant property',
      table: {
        type: { summary: `'primary' | 'positive' | 'caution' | 'destructive'` },
        defaultValue: { summary: 'primary' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'small', 'base', 'medium', 'lg', 'large'],
      description: 'The size property',
      table: {
        type: { summary: `'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large'` },
        defaultValue: { summary: 'base' }
      }
    },
    value: {
      control: 'text',
      description: 'The value property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    name: {
      control: 'text',
      description: 'The name property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    label: {
      control: 'text',
      description: 'The label property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    showIcons: {
      control: 'boolean',
      description: 'The showIcons property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    accessibleLabel: {
      control: 'text',
      description: 'The accessibleLabel property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    accessibleDescribedBy: {
      control: 'text',
      description: 'The accessibleDescribedBy property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    accessibleLabelledBy: {
      control: 'text',
      description: 'The accessibleLabelledBy property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'The loading property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumSwitchArgs>;

// Interactive render function
const renderSpectrumSwitch = (args: SpectrumSwitchArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-switch
      .checked=${args.checked}
      .disabled=${args.disabled}
      .variant=${args.variant}
      .size=${args.size}
      .value=${args.value}
      .name=${args.name}
      .label=${args.label}
      .showIcons=${args.showIcons}
      .accessibleLabel=${args.accessibleLabel}
      .accessibleDescribedBy=${args.accessibleDescribedBy}
      .accessibleLabelledBy=${args.accessibleLabelledBy}
      .loading=${args.loading}

    >
      <!-- Add meaningful slot content here -->
      <div>
        <p>Component content goes here</p>
      </div>
    </spectrum-switch>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumSwitch,
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
  render: renderSpectrumSwitch,
  args: {
    // Add specific args for basic example
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-switch configuration for common use cases.
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
      <spectrum-switch></spectrum-switch>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-switch variants and configurations.
        `
      }
    }
  }
};