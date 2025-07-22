import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

// Import component interfaces
interface CollapsibleListItem {
  id: string;
  label: string;
  expanded?: boolean;
  children?: CollapsibleListItem[];
}

interface ContextMenuAction {
  id: string;
  action: string;
  label: string;
  icon?: string;
}

/**
 * ## SpectrumCollapsibleList Component
 * 
 * The collapsible-list component provides...
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
 * - **childAction**: Component interaction event
 * - **expandAction**: Component interaction event
 * - **contractAction**: Component interaction event
 * - **contextAction**: Component interaction event
 * - **itemRenamed**: Component interaction event
 */

// Component interfaces for TypeScript support
interface SpectrumCollapsibleListElement extends HTMLElement {
  items: CollapsibleListItem[];
  filter: string;
  contextActions: ContextMenuAction[];
  mutuallyExclusive: boolean;
  debug: boolean;
}

// Story arguments interface
interface SpectrumCollapsibleListArgs extends SpectrumCollapsibleListElement {}

const meta: Meta<SpectrumCollapsibleListArgs> = {
  title: 'Spectrum/Components/SpectrumCollapsibleList',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The collapsible-list component provides...

### Event System
- childAction: Component interaction
- expandAction: Component interaction
- contractAction: Component interaction
- contextAction: Component interaction
- itemRenamed: Component interaction

### Basic Usage
Use standard property binding syntax for all component properties.
        `
      }
    }
  },
  args: {
    items: '[{"id":"1","label":"Parent Item 1","expanded":false,"children":[{"id":"1-1","label":"Child Item 1"},{"id":"1-2","label":"Child Item 2"}]},{"id":"2","label":"Parent Item 2","expanded":true,"children":[{"id":"2-1","label":"Child Item 3"},{"id":"2-2","label":"Child Item 4"}]}]',
    filter: '',
    contextActions: '[{"id":"rename","action":"rename","label":"Rename","icon":"edit"},{"id":"delete","action":"delete","label":"Delete","icon":"delete"}]',
    mutuallyExclusive: false,
    debug: false,
  },
  argTypes: {
    items: {
      control: 'text',
      description: 'The items property',
      table: {
        type: { summary: 'CollapsibleListItem[]' },
        defaultValue: { summary: '[]' }
      }
    },
    filter: {
      control: 'text',
      description: 'The filter property',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    contextActions: {
      control: 'text',
      description: 'The contextActions property',
      table: {
        type: { summary: 'ContextMenuAction[]' },
        defaultValue: { summary: '[]' }
      }
    },
    mutuallyExclusive: {
      control: 'boolean',
      description: 'The mutuallyExclusive property',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
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
type Story = StoryObj<SpectrumCollapsibleListArgs>;

// Interactive render function
const renderSpectrumCollapsibleList = (args: SpectrumCollapsibleListArgs) => html`
  <div style="padding: 2rem; display: flex; justify-content: center; align-items: center; min-height: 200px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <spectrum-collapsible-list
      .items=${args.items}
      .filter=${args.filter}
      .contextActions=${args.contextActions}
      .mutuallyExclusive=${args.mutuallyExclusive}
      .debug=${args.debug}
      @childAction=${(e: CustomEvent) => action('childAction')(e.detail)}
      @expandAction=${(e: CustomEvent) => action('expandAction')(e.detail)}
      @contractAction=${(e: CustomEvent) => action('contractAction')(e.detail)}
      @contextAction=${(e: CustomEvent) => action('contextAction')(e.detail)}
      @itemRenamed=${(e: CustomEvent) => action('itemRenamed')(e.detail)}
    >
      <!-- Add meaningful slot content here -->
      <div>
        <p>Component content goes here</p>
      </div>
    </spectrum-collapsible-list>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all component properties and event handling.
 */
export const Playground: Story = {
  render: renderSpectrumCollapsibleList,
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
  render: renderSpectrumCollapsibleList,
  args: {
    items: '[{"id":"1","label":"Parent Item 1","expanded":false,"children":[{"id":"1-1","label":"Child Item 1"},{"id":"1-2","label":"Child Item 2"}]},{"id":"2","label":"Parent Item 2","expanded":true,"children":[{"id":"2-1","label":"Child Item 3"},{"id":"2-2","label":"Child Item 4"}]}]',
    contextActions: '[{"id":"rename","action":"rename","label":"Rename","icon":"edit"},{"id":"delete","action":"delete","label":"Delete","icon":"delete"}]',
  },
  parameters: {
    docs: {
      description: {
        story: `
Basic spectrum-collapsible-list configuration for common use cases.
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
      <spectrum-collapsible-list></spectrum-collapsible-list>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-collapsible-list variants and configurations.
        `
      }
    }
  }
};