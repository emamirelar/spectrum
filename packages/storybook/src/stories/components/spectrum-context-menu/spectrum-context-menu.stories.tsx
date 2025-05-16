import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

// Define the type for context menu actions
interface ContextMenuAction {
  label: string;
  icon: string;
  value: string;
  ripple?: boolean;
}

// Define the type for our component meta
interface SpectrumContextMenuArgs {
  actions: any[];
  targetKey: string;
  isOpen: boolean;
  position?: string;
}

// Define story meta
const meta = {
  title: 'Components/SpectrumContextMenu',
  tags: ['autodocs'],
  args: {
    actions: [
      { label: 'Edit', icon: 'edit', value: 'edit' },
      { label: 'Delete', icon: 'delete', value: 'delete' },
      { label: 'Share', icon: 'share', value: 'share' }
    ],
    targetKey: 'item-1',
    isOpen: true,
    position: 'right'
  },
  argTypes: {
    actions: {
      control: 'object',
      description: 'Array of action items to display in the menu'
    },
    targetKey: {
      control: 'text',
      description: 'Key of the item that triggered the menu'
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the menu is currently open'
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the menu relative to the trigger'
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<SpectrumContextMenuArgs>;

// Setup event listeners for the component
const setupEventListeners = (menuId: string) => {
  setTimeout(() => {
    const menu = document.getElementById(menuId);
    if (!menu) return;
    
    // Log when the component is found
    console.log('Setting up event listeners for menu:', menuId);
    
    // Action click event
    menu.addEventListener('action-click', (e: Event) => {
      const detail = (e as CustomEvent).detail;
      action('action-click')(detail);
      console.log('action-click event captured:', detail);
    });
    
    // Menu close event
    menu.addEventListener('menu-close', () => {
      action('menu-close')();
      console.log('menu-close event captured');
    });
  }, 100);
};

// Basic story with trigger
export const Default: Story = {
  render: (args) => {
    setTimeout(() => {
      const menu = document.querySelector('spectrum-context-menu');
      if (menu) {
        menu.addEventListener('action-click', ((e: Event) => {
          action('Action Clicked')((e as CustomEvent).detail);
        }) as EventListener);
        menu.addEventListener('menu-close', (() => {
          action('Menu Closed')();
        }) as EventListener);
      }
    }, 100);

    return html`
      <div style="padding: 2rem; background-color: #f0f0f0;">
        <spectrum-context-menu
          .actions=${args.actions}
          .targetKey=${args.targetKey}
          ?isOpen=${args.isOpen}
          position=${ifDefined(args.position)}
          @action-click=${(e: CustomEvent) => action('Action Clicked')(e.detail)}
          @menu-close=${() => action('Menu Closed')()}
        ></spectrum-context-menu>
      </div>
    `;
  }
};

// Fixed open menu story for visual testing
export const PreviewOpen: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    // Force position in preview mode
    setTimeout(() => {
      const menu = document.getElementById('preview-menu');
      if (menu) {
        (menu as any).positionAtCoordinates(100, 100);
      }
    }, 100);
    
    // Setup event listeners
    setTimeout(() => setupEventListeners('preview-menu'), 100);
    
    return html`
      <div style="padding: 100px; position: relative; min-height: 300px;">
        <spectrum-context-menu
          id="preview-menu"
          .actions=${args.actions}
          .targetKey=${args.targetKey}
          ?isOpen=${args.isOpen}
          position=${ifDefined(args.position)}
        ></spectrum-context-menu>
      </div>
    `;
  }
};

// Demonstration of usage with collapsible list
export const WithCollapsibleList: Story = {
  args: {},
  render: (args) => {
    const listItems = [
      {
        label: 'Inbox',
        icon: 'inbox',
        expanded: true,
        children: [
          { label: 'Work', icon: 'work', action: 'inbox-work' },
          { label: 'Personal', icon: 'person', action: 'inbox-personal' },
          { label: 'Travel', icon: 'flight', action: 'inbox-travel' },
        ],
      },
      {
        label: 'Drafts',
        icon: 'draft',
        children: [
          { label: 'Blog post', icon: 'article', action: 'draft-blog' },
          { label: 'Project proposal', icon: 'assignment', action: 'draft-proposal' },
        ],
      }
    ];
    
    const handleContextAction = (e: CustomEvent) => {
      const { value, label } = e.detail;
      action('Context Action')({ action: value, item: label });
    };
    
    return html`
      <div style="padding: 20px; max-width: 300px; border: 1px solid #eee; border-radius: 8px;">
        <h4>Example with Collapsible List</h4>
        <spectrum-collapsible-list
          .items=${listItems}
          .contextActions=${args.actions}
          @context-action=${handleContextAction}
        ></spectrum-collapsible-list>
      </div>
    `;
  }
};

// Variations of context menu with different actions
export const CustomActions: Story = {
  args: {
    actions: [
      { label: 'View Details', icon: 'visibility', value: 'view' },
      { label: 'Download', icon: 'download', value: 'download' },
      { label: 'Mark as Important', icon: 'star', value: 'mark-important' },
      { label: 'Report Issue', icon: 'flag', value: 'report' },
    ],
    isOpen: true,
  },
  render: (args) => {
    setTimeout(() => {
      const menu = document.getElementById('custom-menu');
      if (menu) {
        (menu as any).positionAtCoordinates(100, 100);
      }
    }, 100);
    
    // Setup event listeners
    setTimeout(() => setupEventListeners('custom-menu'), 100);
    
    return html`
      <div style="padding: 100px; position: relative; min-height: 300px;">
        <spectrum-context-menu
          id="custom-menu"
          .actions=${args.actions}
          .targetKey=${args.targetKey}
          ?isOpen=${args.isOpen}
          position=${ifDefined(args.position)}
        ></spectrum-context-menu>
      </div>
    `;
  }
};