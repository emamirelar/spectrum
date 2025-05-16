import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumRailArgs {
  appName: string;
  expandedWidth: string;
  moreLabel: string;
  initialExpanded?: boolean;
  showAddButton?: boolean;
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
    showAddButton: true
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
          - \`railAction\`: Emitted when rail actions are triggered
          - \`searchChange\`: Emitted when the search text changes
          - \`expandedChange\`: Emitted when the rail changes expanded state
          - \`addAction\`: Emitted when the add button is clicked
          
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

// Sample data for the collapsible list with Pinned items
const pinnedItems = [
  {
    label: 'Pinned',
    icon: 'push_pin',
    expanded: false,
    children: [
      { label: 'UX Design Framework', action: 'open-ux-framework' },
      { label: 'Budget Planning', action: 'open-budget-planning' },
      { label: 'Product Roadmap', action: 'open-product-roadmap' },
      { label: 'User Research', action: 'open-user-research' },
      { label: 'Marketing Campaign', action: 'open-marketing-campaign' },
      { label: 'Development Sprint', action: 'open-development-sprint' },
      { label: 'Competitive Analysis', action: 'open-competitive-analysis' },
      { label: 'Design System', action: 'open-design-system' },
      { label: 'Content Strategy', action: 'open-content-strategy' },
      { label: 'Customer Feedback', action: 'open-customer-feedback' },
      { label: 'Team Resources', action: 'open-team-resources' },
      { label: 'Brand Guidelines', action: 'open-brand-guidelines' },
      { label: 'Platform Architecture', action: 'open-platform-architecture' },
      { label: 'Security Protocols', action: 'open-security-protocols' },
      { label: 'API Documentation', action: 'open-api-documentation' },
      { label: 'Data Analytics', action: 'open-data-analytics' },
      { label: 'Performance Metrics', action: 'open-performance-metrics' },
      { label: 'User Journey Maps', action: 'open-user-journey-maps' },
      { label: 'Accessibility Guidelines', action: 'open-accessibility-guidelines' },
      { label: 'Strategic Initiatives', action: 'open-strategic-initiatives' }
    ]
  }
];

// Sample data for the collapsible list with Recent items
const recentItems = [
  {
    label: 'Recent',
    icon: 'schedule',
    expanded: false,
    children: [
      { label: 'Q4 Financial Report', action: 'open-q4-financial' },
      { label: 'Product Launch Plan', action: 'open-product-launch' },
      { label: 'Team Onboarding', action: 'open-team-onboarding' },
      { label: 'Vendor Contracts', action: 'open-vendor-contracts' },
      { label: 'Client Presentation', action: 'open-client-presentation' },
      { label: 'Project Timeline', action: 'open-project-timeline' },
      { label: 'User Testing Results', action: 'open-user-testing' },
      { label: 'System Requirements', action: 'open-system-requirements' },
      { label: 'Weekly Status Update', action: 'open-weekly-status' },
      { label: 'Mobile App Wireframes', action: 'open-mobile-wireframes' },
      { label: 'Social Media Strategy', action: 'open-social-media-strategy' },
      { label: 'Technical Documentation', action: 'open-technical-documentation' },
      { label: 'Support Ticket Analysis', action: 'open-support-ticket-analysis' },
      { label: 'Resource Allocation', action: 'open-resource-allocation' },
      { label: 'Feature Prioritization', action: 'open-feature-prioritization' },
      { label: 'Usability Test Plan', action: 'open-usability-test' },
      { label: 'Infrastructure Migration', action: 'open-infrastructure-migration' },
      { label: 'Stakeholder Feedback', action: 'open-stakeholder-feedback' },
      { label: 'Customer Journey Map', action: 'open-customer-journey' },
      { label: 'OKR Review Document', action: 'open-okr-review' }
    ]
  }
];

// Context actions for Pinned items
const pinnedContextActions = [
  { label: 'Unpin', icon: 'push_pin', value: 'unpin' },
  { label: 'Rename', icon: 'edit', value: 'rename' },
  { label: 'Delete', icon: 'delete', value: 'delete' }
];

// Context actions for Recent items
const recentContextActions = [
  { label: 'Pin', icon: 'push_pin', value: 'pin' },
  { label: 'Rename', icon: 'edit', value: 'rename' },
  { label: 'Delete', icon: 'delete', value: 'delete' }
];

// Sample data combining both types for the default view, now with per-parent contextActions
const sampleItems = [
  {
    ...pinnedItems[0],
    contextActions: pinnedContextActions
  },
  {
    ...recentItems[0],
    contextActions: recentContextActions
  }
];

// Function to handle child action events
const handleChildAction = (e: CustomEvent) => {
  const { action, label } = e.detail;
  action('Item Clicked')({ 
    action, 
    label, 
    timestamp: new Date().toISOString() 
  });
  
  // In a real app, you would navigate or perform an action here
  console.log(`Action triggered: ${action} for item: ${label}`);
};

// Function to handle expand/contract events
const handleExpandAction = (e: CustomEvent) => {
  action('Folder Expanded')({ 
    label: e.detail.label,
    timestamp: new Date().toISOString()
  });
};

const handleContractAction = (e: CustomEvent) => {
  action('Folder Collapsed')({ 
    label: e.detail.label,
    timestamp: new Date().toISOString()
  });
};

// Function to handle context menu actions
const handleContextAction = (e: CustomEvent) => {
  const { value, label } = e.detail;
  action('Context Action')({ 
    action: value, 
    item: label,
    timestamp: new Date().toISOString()
  });
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
      window.addEventListener('action-click', (e) => {
        action('Context Menu Action')((e as CustomEvent).detail);
      });
    }, 500);
    return html`
      <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
        <spectrum-rail
          appName="${args.appName}"
          expandedWidth="${args.expandedWidth}"
          moreLabel="${args.moreLabel}"
          initialExpanded="${args.initialExpanded}"
          @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
          @searchChange=${(e: CustomEvent) => {
            action('Search Changed')({ value: e.detail.value });
            // Update filter on the collapsible list
            const list = document.querySelector('spectrum-collapsible-list');
            if (list) {
              list.setAttribute('filter', e.detail.value);
            }
          }}
          @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ expanded: e.detail })}
          @addAction=${() => action('Add Button Clicked')()}
        >
          <spectrum-collapsible-list 
            slot="items"
            .items=${sampleItems}
            @child-action=${handleChildAction}
            @expand-action=${handleExpandAction}
            @contract-action=${handleContractAction}
            @context-action=${handleContextAction}
          ></spectrum-collapsible-list>
        </spectrum-rail>
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background-color: #f8f9fa; border-radius: 4px;">
        <p><strong>Instructions:</strong></p>
        <ul style="margin: 0; padding-left: 1.5rem;">
          <li>Click on the rail items to expand/collapse the rail</li>
          <li>Click on the Pinned or Recent folders to expand/collapse them</li>
          <li>Click on any of the 20 items in each category to trigger their actions (visible in Actions panel)</li>
          <li>Right-click on items to see context menu actions:
            <ul>
              <li><strong>Pinned items</strong>: Unpin, Rename, Delete</li>
              <li><strong>Recent items</strong>: Pin, Rename, Delete</li>
            </ul>
          </li>
          <li>Use search to filter through the 40 total items across both categories</li>
          <li>Try searching for terms like "design", "report", or "documentation" to see how filtering works</li>
          <li>Scroll through the expanded list to see all items in each category</li>
          <li>Click the add button to trigger the add action</li>
        </ul>
      </div>
    `;
  },
};

// Pinned items with their specific context actions 
export const PinnedItems: Story = {
  args: {
    initialExpanded: true,
  },
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-rail
        appName="${args.appName}"
        expandedWidth="${args.expandedWidth}"
        moreLabel="${args.moreLabel}"
        initialExpanded="${args.initialExpanded}"
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          action('Search Changed')({ value: e.detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', e.detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ expanded: e.detail })}
        @addAction=${() => action('Add Button Clicked')()}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${pinnedItems}
          .contextActions=${pinnedContextActions}
          @child-action=${handleChildAction}
          @expand-action=${handleExpandAction}
          @contract-action=${handleContractAction}
          @context-action=${handleContextAction}
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
        appName="${args.appName}"
        expandedWidth="${args.expandedWidth}"
        moreLabel="${args.moreLabel}"
        initialExpanded="${args.initialExpanded}"
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          action('Search Changed')({ value: e.detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', e.detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ expanded: e.detail })}
        @addAction=${() => action('Add Button Clicked')()}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${recentItems}
          .contextActions=${recentContextActions}
          @child-action=${handleChildAction}
          @expand-action=${handleExpandAction}
          @contract-action=${handleContractAction}
          @context-action=${handleContextAction}
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
        appName="${args.appName}"
        expandedWidth="${args.expandedWidth}"
        moreLabel="${args.moreLabel}"
        initialExpanded="${args.initialExpanded}"
        showAddButton="false"
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          action('Search Changed')({ value: e.detail.value });
          // Update filter on collapsible list
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', e.detail.value);
            console.log('Storybook: Setting filter attribute on collapsible list:', e.detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ expanded: e.detail })}
        @addAction=${() => action('Add Button Clicked')()}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${sampleItems}
          @child-action=${handleChildAction}
          @expand-action=${handleExpandAction}
          @contract-action=${handleContractAction}
          @context-action=${handleContextAction}
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
        .appName="${args.appName}"
        .expandedWidth="${args.expandedWidth}"
        .moreLabel="${args.moreLabel}"
        .initialExpanded="${args.initialExpanded}"
        .showAddButton="${args.showAddButton}"
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => action('Search Changed')({ value: e.detail.value })}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ expanded: e.detail })}
        @addAction=${() => action('Add Button Clicked')()}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${sampleItems}
          @child-action=${handleChildAction}
          @expand-action=${handleExpandAction}
          @contract-action=${handleContractAction}
          @context-action=${handleContextAction}
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
            console.log('Toggled rail to:', isExpanded ? 'expanded' : 'collapsed');
          });
        }
      }, 100);
    </script>
  `,
}; 