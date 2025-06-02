import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumRailArgs {
  appName: string;
  expandedWidth: string;
  moreLabel: string;
  initialExpanded?: boolean;
  showAddButton?: boolean;
  collapsedOffset?: string;
  addLabel?: string;
  addIcon?: string;
}

// Define interface for the rail element to help TypeScript understand the setExpanded method
interface SpectrumRailElement extends HTMLElement {
  setExpanded(expanded: boolean): Promise<boolean>;
}

const meta = {
  title: 'Components/SpectrumRail',
  tags: ['autodocs'],
  args: {
    appName: 'PleaseAI',
    expandedWidth: '340px',
    moreLabel: 'Explore more',
    initialExpanded: false,
    showAddButton: true,
    collapsedOffset: '0px',
    addLabel: 'Add new',
    addIcon: 'add'
  },
  argTypes: {
    appName: { 
      control: 'text',
      description: 'Application name to display in expanded menu',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    expandedWidth: { 
      control: 'text',
      description: 'Width of the rail when expanded',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '340px' }
      }
    },
    moreLabel: { 
      control: 'text',
      description: 'Label for the more section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Explore more' }
      }
    },
    initialExpanded: {
      control: 'boolean',
      description: 'Whether the rail should be initially expanded',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showAddButton: {
      control: 'boolean',
      description: 'Whether to show the add button in the expanded search section',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    collapsedOffset: {
      control: 'text',
      description: 'Offset from the left when rail is collapsed (e.g. "20px", "1rem")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0px' }
      }
    },
    addLabel: {
      control: 'text',
      description: 'Label for the add button (displayed in expanded state)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Add new' }
      }
    },
    addIcon: {
      control: 'text',
      description: 'Icon for the add button (displayed in both states)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'add' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A vertical navigation rail component with expanded and contracted states.
          The rail has four main sections arranged vertically:
          
          1. Menu: Toggles the expanded/contracted state
          2. Search: Provides search functionality (with optional add button)
          3. Items: Displays navigation items (using a collapsible list)
          4. More: Provides additional options
          
          ## Features
          - Two states: expanded and contracted (default)
          - Menu button that toggles expanded state and shows app name in expanded mode
          - Search input that sets a rail-level filter
          - Optional add button in the search section
          - Collapsible list integration with filtering
          - Animated transitions between states
          
          ## Demo Content
          This demo includes a simplified navigation structure with two main categories, each containing 20 items:
          - **Pinned**: Items marked as important (using the pin icon)
            - Context actions: Unpin, Rename, Delete
          - **Recent**: Recently accessed items (using the clock/schedule icon)
            - Context actions: Pin, Rename, Delete

          The demo illustrates how the rail handles a large number of items within a small number of categories,
          showing how effective filtering and scrolling work in this component. It also demonstrates different
          context menu actions based on the item type.
          
          ## Slots
          - \`items\`: For the main navigation items (typically a collapsible list)
          
          ## Events
          All events now include an action attribute to identify the type of action performed:
          
          - **railAction**: Emitted when rail actions are triggered
            - Payload: \`{ action: string, id: string }\`
            - Action values: \`'menu', 'add', 'more'\`
          - **searchChange**: Emitted when the search text changes
            - Payload: \`{ action: string, value: string }\`
            - Action values: \`'search'\`
          - **expandedChange**: Emitted when the rail changes expanded state
            - Payload: \`{ action: string, expanded: boolean }\`
            - Action values: \`'menu', 'search', 'more'\`
          - **addAction**: Emitted when the add button is clicked
            - Payload: \`{ action: string }\`
            - Action values: \`'add'\`
          
          ## Collapsible List Actions
          The rail works seamlessly with the spectrum-collapsible-list component to provide navigation:
          
          - Clicking on parent items in the list expands/collapses them, emitting \`expand-action\` or \`contract-action\` events
          - Clicking on child items triggers their associated actions, emitting \`child-action\` events with the action and label
          - Context menu actions can be added to items, emitting \`context-action\` events when selected
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<SpectrumRailArgs>;

// Sample data for the collapsible list with Recent items
const recentItems = [
  {
    label: 'Recent',
    icon: 'schedule',
    expanded: false,
    id: 'recent',
    children: [
      { label: 'Q4 Financial Report', action: 'open-q4-financial', id: 'q4-financial' },
      { label: 'Product Launch Plan', action: 'open-product-launch', id: 'product-launch' },
      { label: 'Team Onboarding', action: 'open-team-onboarding', id: 'team-onboarding' },
      { label: 'Vendor Contracts', action: 'open-vendor-contracts', id: 'vendor-contracts' },
      { label: 'Client Presentation', action: 'open-client-presentation', id: 'client-presentation' },
      { label: 'Project Timeline', action: 'open-project-timeline', id: 'project-timeline' },
      { label: 'User Testing Results', action: 'open-user-testing', id: 'user-testing' },
      { label: 'System Requirements', action: 'open-system-requirements', id: 'system-requirements' },
      { label: 'Weekly Status Update', action: 'open-weekly-status', id: 'weekly-status' },
      { label: 'Mobile App Wireframes', action: 'open-mobile-wireframes', id: 'mobile-wireframes' },
      { label: 'Social Media Strategy', action: 'open-social-media-strategy', id: 'social-media-strategy' },
      { label: 'Technical Documentation', action: 'open-technical-documentation', id: 'technical-documentation' },
      { label: 'Support Ticket Analysis', action: 'open-support-ticket-analysis', id: 'support-ticket-analysis' },
      { label: 'Resource Allocation', action: 'open-resource-allocation', id: 'resource-allocation' },
      { label: 'Feature Prioritization', action: 'open-feature-prioritization', id: 'feature-prioritization' },
      { label: 'Usability Test Plan', action: 'open-usability-test', id: 'usability-test' },
      { label: 'Infrastructure Migration', action: 'open-infrastructure-migration', id: 'infrastructure-migration' },
      { label: 'Stakeholder Feedback', action: 'open-stakeholder-feedback', id: 'stakeholder-feedback' },
      { label: 'Customer Journey Map', action: 'open-customer-journey', id: 'customer-journey' },
      { label: 'OKR Review Document', action: 'open-okr-review', id: 'okr-review' }
    ]
  }
];

// Context actions for Pinned items
const pinnedContextActions = [
  { label: 'Unpin', icon: 'push_pin', action: 'unpin', id: 'unpin-action' },
  { label: 'Rename', icon: 'edit', action: 'rename', id: 'rename-action' },
  { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action' }
];

// Sample data for the collapsible list with Pinned items
const pinnedItems = [
  {
    label: 'Pinned',
    icon: 'push_pin',
    expanded: true,
    id: 'pinned',
    children: [
      { label: 'UX Design Framework', action: 'open-ux-framework', id: 'ux-framework' },
      { label: 'Project Roadmap', action: 'open-roadmap', id: 'project-roadmap' },
      { label: 'Team Calendar', action: 'open-calendar', id: 'team-calendar' }
    ]
  }
];

// Sample data for the collapsible list with Favorites items
const favoritesItems = [
  {
    label: 'Favorites',
    icon: 'star',
    expanded: true,
    id: 'favorites',
    children: [
      { label: 'Project Dashboard', action: 'open-dashboard', id: 'project-dashboard' },
      { label: 'Team Chat', action: 'open-chat', id: 'team-chat' },
      { label: 'Document Library', action: 'open-library', id: 'document-library' }
    ]
  }
];

// Sample data for the collapsible list with Settings items
const settingsItems = [
  {
    label: 'Settings',
    icon: 'settings',
    expanded: false,
    id: 'settings',
    children: [
      { label: 'Account', action: 'open-account', id: 'account' },
      { label: 'Preferences', action: 'open-preferences', id: 'preferences' },
      { label: 'Help & Support', action: 'open-help', id: 'help' }
    ]
  }
];

// Combine all items
const sampleItems = [
  ...pinnedItems,
  ...favoritesItems,
  ...recentItems,
  ...settingsItems
];

// Event handlers
const handleChildAction = (e: CustomEvent) => {
  action('Child Action')(e.detail);
};

const handleExpandAction = (e: CustomEvent) => {
  action('Expand Action')(e.detail);
};

const handleContractAction = (e: CustomEvent) => {
  action('Contract Action')(e.detail);
};

const handleContextAction = (e: CustomEvent) => {
  action('Context Action')(e.detail);
};

// Demo Rail showing all features in collapsed state (default)
export const Default: Story = {
  render: (args) => {
    setTimeout(() => {
      // Listen for context menu open
      const list = document.querySelector('spectrum-collapsible-list');
      if (list) {
        list.addEventListener('context-menu-open', (e) => {
          action('Context Menu Open')((e as CustomEvent).detail);
        });
      }
      // Listen for context menu action globally
      window.addEventListener('actionClick', (e) => {
        action('Context Menu Action')((e as CustomEvent).detail);
      });
    }, 500);
    return html`
      <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
        <spectrum-rail
          .appName=${args.appName}
          .expandedWidth=${args.expandedWidth}
          .moreLabel=${args.moreLabel}
          .initialExpanded=${args.initialExpanded}
          .collapsedOffset=${args.collapsedOffset}
          .addLabel=${args.addLabel}
          .addIcon=${args.addIcon}
          @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
          @searchChange=${(e: CustomEvent) => {
            const detail = e.detail;
            action('Search Changed')({ action: detail.action, value: detail.value });
            // Update the list component's filter
            const list = document.querySelector('spectrum-collapsible-list');
            if (list) {
              list.setAttribute('filter', detail.value);
            }
          }}
          @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ action: e.detail.action, expanded: e.detail.expanded })}
          @addAction=${(e: CustomEvent) => action('Add Action')({ action: e.detail.action })}
        >
          <spectrum-collapsible-list 
            slot="items"
            .items=${sampleItems}
            @childAction=${handleChildAction}
            @expandAction=${handleExpandAction}
            @contractAction=${handleContractAction}
            @contextAction=${handleContextAction}
          ></spectrum-collapsible-list>
        </spectrum-rail>
      </div>
    `;
  }
};

// Add a new story to demonstrate custom add label
export const CustomAddLabel: Story = {
  args: {
    addLabel: 'Create New Item',
    initialExpanded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the rail with a custom label for the add button.'
      }
    }
  },
  render: Default.render
};

// Add a new story to demonstrate the collapsedOffset
export const WithOffset: Story = {
  args: {
    collapsedOffset: '20px',
    initialExpanded: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the rail with a 20px offset from the left when collapsed. The offset will be removed when expanded.'
      }
    }
  },
  render: Default.render
};

// Pinned items with their specific context actions 
export const PinnedItems: Story = {
  args: {
    initialExpanded: true,
    collapsedOffset: '0px'
  },
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-rail
        .appName=${args.appName}
        .expandedWidth=${args.expandedWidth}
        .moreLabel=${args.moreLabel}
        .initialExpanded=${args.initialExpanded}
        .collapsedOffset=${args.collapsedOffset}
        .addIcon=${args.addIcon}
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          const detail = e.detail;
          action('Search Changed')({ action: detail.action, value: detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ action: e.detail.action, expanded: e.detail.expanded })}
        @addAction=${(e: CustomEvent) => action('Add Action')({ action: e.detail.action })}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${pinnedItems}
          @childAction=${handleChildAction}
          @expandAction=${handleExpandAction}
          @contractAction=${handleContractAction}
          @contextAction=${handleContextAction}
        ></spectrum-collapsible-list>
      </spectrum-rail>
    </div>
    <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 4px;">
      <p><strong>Pinned Items with Unpin Actions</strong></p>
      <p>This demo shows the rail with only Pinned items. Context menu actions are: Unpin, Rename, Delete.</p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows the rail with only Pinned items and their specific context menu actions (Unpin, Rename, Delete).'
      }
    }
  }
};

// Recent items with their specific context actions
export const RecentItems: Story = {
  args: {
    initialExpanded: true,
  },
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-rail
        .appName=${args.appName}
        .expandedWidth=${args.expandedWidth}
        .moreLabel=${args.moreLabel}
        .initialExpanded=${args.initialExpanded}
        .addIcon=${args.addIcon}
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          const detail = e.detail;
          action('Search Changed')({ action: detail.action, value: detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ action: e.detail.action, expanded: e.detail.expanded })}
        @addAction=${(e: CustomEvent) => action('Add Action')({ action: e.detail.action })}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${recentItems}
          @childAction=${handleChildAction}
          @expandAction=${handleExpandAction}
          @contractAction=${handleContractAction}
          @contextAction=${handleContextAction}
        ></spectrum-collapsible-list>
      </spectrum-rail>
    </div>
    <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 4px;">
      <p><strong>Recent Items with Pin Actions</strong></p>
      <p>This demo shows the rail with only Recent items. Context menu actions are: Pin, Rename, Delete.</p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows the rail with only Recent items and their specific context menu actions (Pin, Rename, Delete).'
      }
    }
  }
};

// Story with rail in expanded state initially
export const InitiallyExpanded: Story = {
  args: {
    initialExpanded: true,
  },
  render: Default.render,
};

// Story with no add button
export const WithoutAddButton: Story = {
  args: {
    showAddButton: false,
    initialExpanded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'The rail without the add button in the search section.'
      }
    }
  },
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-rail
        .appName=${args.appName}
        .expandedWidth=${args.expandedWidth}
        .moreLabel=${args.moreLabel}
        .initialExpanded=${args.initialExpanded}
        .showAddButton=${args.showAddButton}
        .addIcon=${args.addIcon}
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          const detail = e.detail;
          action('Search Changed')({ action: detail.action, value: detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ action: e.detail.action, expanded: e.detail.expanded })}
        @addAction=${(e: CustomEvent) => action('Add Action')({ action: e.detail.action })}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${sampleItems}
          @childAction=${handleChildAction}
          @expandAction=${handleExpandAction}
          @contractAction=${handleContractAction}
          @contextAction=${handleContextAction}
        ></spectrum-collapsible-list>
      </spectrum-rail>
    </div>
  `,
};

// Custom rail with button to programmatically expand/collapse
export const ProgrammaticControl: Story = {
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <div style="margin-bottom: 1rem;">
        <button id="toggle-rail" style="padding: 8px 16px; border-radius: 4px; background-color: #0070d2; color: white; border: none; cursor: pointer;">
          Toggle Rail State
        </button>
      </div>
      
      <spectrum-rail
        id="controlled-rail"
        .appName=${args.appName}
        .expandedWidth=${args.expandedWidth}
        .moreLabel=${args.moreLabel}
        .initialExpanded=${args.initialExpanded}
        .showAddButton=${args.showAddButton}
        .addIcon=${args.addIcon}
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          const detail = e.detail;
          action('Search Changed')({ action: detail.action, value: detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ action: e.detail.action, expanded: e.detail.expanded })}
        @addAction=${(e: CustomEvent) => action('Add Action')({ action: e.detail.action })}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${sampleItems}
          @childAction=${handleChildAction}
          @expandAction=${handleExpandAction}
          @contractAction=${handleContractAction}
          @contextAction=${handleContextAction}
        ></spectrum-collapsible-list>
      </spectrum-rail>
    </div>
    
    <script>
      // Add click handler after a small delay to ensure components are defined
      setTimeout(() => {
        const button = document.getElementById('toggle-rail');
        const rail = document.getElementById('controlled-rail');
        let isExpanded = ${args.initialExpanded};
        
        if (button && rail) {
          button.addEventListener('click', () => {
            isExpanded = !isExpanded;
            rail.setExpanded(isExpanded);
          });
        }
      }, 100);
    </script>
  `,
};

export const WithCollapsibleListActions = {
  args: {},
  render: () => html`
    <div style="height: 600px; padding: 2rem; background: #f0f0f0;">
      <spectrum-rail appName="Demo App" expandedWidth="320" initialExpanded="true" moreLabel="More">
        <spectrum-collapsible-list
          slot="items"
          .items=${[
            {
              label: 'Project',
              icon: 'folder',
              expanded: true,
              id: 'project',
              children: [
                {
                  label: 'Report.pdf',
                  icon: 'picture_as_pdf',
                  action: 'open-pdf',
                  id: 'report-pdf',
                  ripple: true
                },
                {
                  label: 'Notes.txt',
                  icon: 'description',
                  action: 'open-txt',
                  id: 'notes-txt',
                  ripple: true
                },
                {
                  label: 'Presentation.pptx',
                  icon: 'slideshow',
                  action: 'open-pptx',
                  id: 'presentation-pptx',
                  ripple: true
                }
              ]
            },
            {
              label: 'Archive',
              icon: 'folder',
              id: 'archive',
              children: [
                {
                  label: 'Old Data.csv',
                  icon: 'table_chart',
                  action: 'open-csv',
                  id: 'old-data-csv',
                  ripple: true
                }
              ]
            }
          ]}
          .contextActions=${[
            { label: 'Download', icon: 'download', action: 'download', id: 'download-action', ripple: true },
            { label: 'Share', icon: 'share', action: 'share', id: 'share-action', ripple: true },
            { label: 'Rename', icon: 'edit', action: 'rename', id: 'rename-action', ripple: true },
            { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action', ripple: true }
          ]}
          @childAction=${(e: CustomEvent) => action('Child Action')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('Expand Action')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('Contract Action')(e.detail)}
          @contextAction=${(e: CustomEvent) => {
            action('Context Action')(e.detail);
            console.log('Context action event received:', e.detail);
          }}
          @itemRenamed=${(e: CustomEvent) => {
            action('Item Renamed')(e.detail);
            console.log('Item renamed event received:', e.detail);
          }}
        ></spectrum-collapsible-list>
      </spectrum-rail>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `This story demonstrates a rail with a collapsible list containing context actions for its items. Right-click or use the context menu on a leaf item to trigger actions like Download, Share, Rename, or Delete.`
      }
    }
  }
};

// Add a new story to demonstrate custom add icon
export const CustomAddIcon: Story = {
  args: {
    addIcon: 'create_new_folder',
    addLabel: 'New Folder',
    initialExpanded: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the rail with a custom icon for the add button.'
      }
    }
  },
  render: Default.render
}; 