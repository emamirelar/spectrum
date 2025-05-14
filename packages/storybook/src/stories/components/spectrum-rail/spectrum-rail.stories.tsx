import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

interface SpectrumRailArgs {
  appName: string;
  expandedWidth: string;
  moreLabel: string;
  initialExpanded?: boolean;
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
    expandedWidth: '288px',
    moreLabel: 'Explore more',
    initialExpanded: false
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
        defaultValue: { summary: '288px' }
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
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A vertical navigation rail component with expanded and contracted states.
          The rail has four main sections arranged vertically:
          
          1. Menu: Toggles the expanded/contracted state
          2. Search: Provides search functionality
          3. Items: Displays navigation items (using a collapsible list)
          4. More: Provides additional options
          
          ## Features
          - Two states: expanded and contracted (default)
          - Menu button that toggles expanded state and shows app name in expanded mode
          - Search input that sets a rail-level filter
          - Collapsible list integration with filtering
          - Animated transitions between states
          
          ## Slots
          - \`items\`: For the main navigation items (typically a collapsible list)
          
          ## Events
          - \`railAction\`: Emitted when rail actions are triggered
          - \`searchChange\`: Emitted when the search text changes
          - \`expandedChange\`: Emitted when the rail changes expanded state
          
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

// Sample data for the collapsible list
const sampleItems = [
  {
    label: 'Projects',
    icon: 'folder',
    expanded: true,
    children: [
      {
        label: 'Web Design',
        icon: 'web',
        action: 'open-web-design'
      },
      {
        label: 'Mobile App',
        icon: 'smartphone',
        action: 'open-mobile-app'
      },
      {
        label: 'Backend',
        icon: 'dns',
        action: 'open-backend'
      }
    ]
  },
  {
    label: 'Reports',
    icon: 'description',
    children: [
      {
        label: 'Analytics',
        icon: 'analytics',
        action: 'view-analytics'
      },
      {
        label: 'Finance',
        icon: 'paid',
        action: 'view-finance'
      },
      {
        label: 'Performance',
        icon: 'speed',
        action: 'view-performance'
      }
    ]
  },
  {
    label: 'Team',
    icon: 'people',
    children: [
      {
        label: 'Members',
        icon: 'person',
        action: 'show-members'
      },
      {
        label: 'Groups',
        icon: 'group',
        action: 'show-groups'
      }
    ]
  }
];

// Context actions for items
const contextActions = [
  { label: 'Edit', icon: 'edit', value: 'edit' },
  { label: 'Delete', icon: 'delete', value: 'delete' },
  { label: 'Share', icon: 'share', value: 'share' }
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
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-rail
        .appName="${args.appName}"
        .expandedWidth="${args.expandedWidth}"
        .moreLabel="${args.moreLabel}"
        .initialExpanded="${args.initialExpanded}"
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
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${sampleItems}
          .contextActions=${contextActions}
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
        <li>Click on parent items to expand/collapse them</li>
        <li>Click on child items to trigger their actions (visible in Actions panel)</li>
        <li>Right-click on items to see context menu actions</li>
        <li>Use search to filter the list</li>
      </ul>
    </div>
  `
};

// Demo Rail showing all features in expanded state
export const Expanded: Story = {
  args: {
    initialExpanded: true
  },
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-rail
        .appName="${args.appName}"
        .expandedWidth="${args.expandedWidth}"
        .moreLabel="${args.moreLabel}"
        .initialExpanded="${args.initialExpanded}"
        @railAction=${(e: CustomEvent) => action('Rail Action')(e.detail)}
        @searchChange=${(e: CustomEvent) => {
          action('Search Changed')({ value: e.detail.value });
          const list = document.querySelector('spectrum-collapsible-list');
          if (list) {
            list.setAttribute('filter', e.detail.value);
          }
        }}
        @expandedChange=${(e: CustomEvent) => action('Rail Expanded State Changed')({ expanded: e.detail })}
      >
        <spectrum-collapsible-list 
          slot="items"
          .items=${sampleItems}
          .contextActions=${contextActions}
          @child-action=${handleChildAction}
          @expand-action=${handleExpandAction}
          @contract-action=${handleContractAction}
          @context-action=${handleContextAction}
        ></spectrum-collapsible-list>
      </spectrum-rail>
    </div>
  `
}; 