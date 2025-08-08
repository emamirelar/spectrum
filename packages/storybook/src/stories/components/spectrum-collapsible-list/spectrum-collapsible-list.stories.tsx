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
    items: [
      {
        "id": "1",
        "label": "Parent Item 1",
        "icon": "folder",
        "expanded": false,
        "children": [
          {"id": "1-1", "label": "Child Item 1", "icon": "description", "action": "open"},
          {"id": "1-2", "label": "Child Item 2", "icon": "description", "action": "open"}
        ]
      },
      {
        "id": "2", 
        "label": "Parent Item 2",
        "icon": "folder",
        "expanded": true,
        "children": [
          {"id": "2-1", "label": "Child Item 3", "icon": "description", "action": "open"},
          {"id": "2-2", "label": "Child Item 4", "icon": "description", "action": "open"}
        ]
      }
    ],
    filter: '',
    contextActions: [
      {"id": "rename", "action": "rename", "label": "Rename", "icon": "edit"},
      {"id": "delete", "action": "delete", "label": "Delete", "icon": "delete"}
    ],
    mutuallyExclusive: false,
    debug: false,
  },
  argTypes: {
    items: {
      control: 'object',
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
      control: 'object',
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
    items: [
      {
        "id": "1",
        "label": "Parent Item 1", 
        "icon": "folder",
        "expanded": false,
        "children": [
          {"id": "1-1", "label": "Child Item 1", "icon": "description", "action": "open"},
          {"id": "1-2", "label": "Child Item 2", "icon": "description", "action": "open"}
        ]
      },
      {
        "id": "2",
        "label": "Parent Item 2",
        "icon": "folder", 
        "expanded": true,
        "children": [
          {"id": "2-1", "label": "Child Item 3", "icon": "description", "action": "open"},
          {"id": "2-2", "label": "Child Item 4", "icon": "description", "action": "open"}
        ]
      }
    ],
    contextActions: [
      {"id": "rename", "action": "rename", "label": "Rename", "icon": "edit"},
      {"id": "delete", "action": "delete", "label": "Delete", "icon": "delete"}
    ],
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
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <!-- Basic List -->
      <div style="background: var(--spectrum-sys-color-surface); padding: 1rem; border-radius: 8px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Basic List</h3>
        <spectrum-collapsible-list
          .items=${[
            {id: "1", label: "Documents", icon: "folder", expanded: false, children: [
              {id: "1-1", label: "Report.pdf", icon: "description", action: "open"},
              {id: "1-2", label: "Notes.txt", icon: "description", action: "open"}
            ]},
            {id: "2", label: "Images", icon: "folder", expanded: false, children: [
              {id: "2-1", label: "Photo1.jpg", icon: "image", action: "open"},
              {id: "2-2", label: "Photo2.jpg", icon: "image", action: "open"}
            ]}
          ]}
          .contextActions=${[
            {id: "rename", action: "rename", label: "Rename", icon: "edit"},
            {id: "delete", action: "delete", label: "Delete", icon: "delete"}
          ]}
          @childAction=${(e: CustomEvent) => action('childAction')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('expandAction')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('contractAction')(e.detail)}
          @contextAction=${(e: CustomEvent) => action('contextAction')(e.detail)}
        ></spectrum-collapsible-list>
      </div>

      <!-- With Filter -->
      <div style="background: var(--spectrum-sys-color-surface); padding: 1rem; border-radius: 8px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Filtered List</h3>
        <spectrum-collapsible-list
          .items=${[
            {id: "1", label: "Projects", icon: "work", expanded: true, children: [
              {id: "1-1", label: "Website", icon: "web", action: "open"},
              {id: "1-2", label: "Mobile App", icon: "phone_android", action: "open"},
              {id: "1-3", label: "Desktop App", icon: "desktop_windows", action: "open"}
            ]},
            {id: "2", label: "Archive", icon: "archive", expanded: false, children: [
              {id: "2-1", label: "Old Website", icon: "web", action: "open"},
              {id: "2-2", label: "Legacy App", icon: "apps", action: "open"}
            ]}
          ]}
          .filter=${"App"}
          .contextActions=${[
            {id: "open", action: "open", label: "Open", icon: "open_in_new"},
            {id: "archive", action: "archive", label: "Archive", icon: "archive"}
          ]}
          @childAction=${(e: CustomEvent) => action('childAction')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('expandAction')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('contractAction')(e.detail)}
          @contextAction=${(e: CustomEvent) => action('contextAction')(e.detail)}
        ></spectrum-collapsible-list>
      </div>

      <!-- Mutually Exclusive -->
      <div style="background: var(--spectrum-sys-color-surface); padding: 1rem; border-radius: 8px;">
        <h3 style="margin-top: 0; color: var(--spectrum-sys-color-on-surface);">Mutually Exclusive</h3>
        <spectrum-collapsible-list
          .items=${[
            {id: "1", label: "Settings", icon: "settings", expanded: false, children: [
              {id: "1-1", label: "General", icon: "tune", action: "configure"},
              {id: "1-2", label: "Privacy", icon: "security", action: "configure"}
            ]},
            {id: "2", label: "Advanced", icon: "engineering", expanded: false, children: [
              {id: "2-1", label: "Developer", icon: "code", action: "configure"},
              {id: "2-2", label: "Debug", icon: "bug_report", action: "configure"}
            ]},
            {id: "3", label: "Help", icon: "help", expanded: false, children: [
              {id: "3-1", label: "FAQ", icon: "quiz", action: "view"},
              {id: "3-2", label: "Support", icon: "support", action: "contact"}
            ]}
          ]}
          .mutuallyExclusive=${true}
          .contextActions=${[
            {id: "configure", action: "configure", label: "Configure", icon: "settings"},
            {id: "reset", action: "reset", label: "Reset", icon: "refresh"}
          ]}
          @childAction=${(e: CustomEvent) => action('childAction')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('expandAction')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('contractAction')(e.detail)}
          @contextAction=${(e: CustomEvent) => action('contextAction')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different spectrum-collapsible-list variants and configurations:
- **Basic List**: Standard collapsible list with context actions
- **Filtered List**: Shows filtering functionality with search term "App"
- **Mutually Exclusive**: Only one parent can be expanded at a time
        `
      }
    }
  }
};