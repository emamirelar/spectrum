// Add a declare statement at the top of the file
// This is a TypeScript trick to make sure the DOM types are available
declare global {
  interface Window {
    document: Document;
  }
}

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
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
  actions: ContextMenuAction[];
  targetKey: string;
  isOpen: boolean;
  position: 'left' | 'right' | 'top' | 'bottom';
  showTrigger: boolean;
}

// Define story meta
const meta: Meta<SpectrumContextMenuArgs> = {
  title: 'Components/SpectrumContextMenu',
  argTypes: {
    actions: { control: 'object' },
    targetKey: { control: 'text' },
    isOpen: { control: 'boolean' },
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    showTrigger: { control: 'boolean' },
  },
  args: {
    actions: [
      { label: 'Edit', icon: 'edit', value: 'edit', ripple: true },
      { label: 'Delete', icon: 'delete', value: 'delete' },
      { label: 'Duplicate', icon: 'content_copy', value: 'duplicate' },
      { label: 'Share', icon: 'share', value: 'share' },
    ],
    targetKey: 'demo-item',
    isOpen: false,
    position: 'right',
    showTrigger: true,
  },
  parameters: {
    actions: {
      handles: ['action-click', 'menu-close', 'context-action'],
    },
  }
};

export default meta;
type Story = StoryObj<SpectrumContextMenuArgs>;

// Custom action logger that ensures proper display in Storybook Actions panel
const logAction = (eventName: string, detail?: any) => {
  console.log(`[${eventName}] captured:`, detail);
  action(eventName)(detail);
};

// Properly handle events with shadow DOM
const addShadowDomEventListener = () => {
  // Add event listener to document to catch all events that bubble up
  document.addEventListener('action-click', (e: Event) => {
    const customEvent = e as CustomEvent;
    logAction('action-click', customEvent.detail);
  }, true);

  document.addEventListener('menu-close', (e: Event) => {
    logAction('menu-close', {});
  }, true);

  document.addEventListener('context-action', (e: Event) => {
    const customEvent = e as CustomEvent;
    logAction('context-action', customEvent.detail);
  }, true);
};

// Call once when the stories load
addShadowDomEventListener();

// Setup event listeners for a specific component
const setupEventListeners = (menuId: string) => {
  setTimeout(() => {
    const menu = document.getElementById(menuId);
    if (!menu) {
      console.warn(`Menu with ID ${menuId} not found`);
      return;
    }
    
    console.log(`Setting up direct event listeners for menu: ${menuId}`);
  }, 100);
};

// Basic story with trigger
export const Default: Story = {
  render: (args) => {
    // This function handles showing the menu
    const showMenu = () => {
      // Get references to elements
      const button = document.getElementById('trigger-button');
      const menu = document.getElementById('context-menu');
      
      if (button && menu) {
        console.log('Trigger button clicked, opening menu');
        // Set the trigger reference
        (menu as any).setTriggerRef(button)
          .then(() => {
            // Open the menu
            return (menu as any).open();
          })
          .catch((err: any) => {
            console.error('Error opening menu:', err);
          });
      }
    };
    
    // Setup event listeners
    setTimeout(() => setupEventListeners('context-menu'), 100);
    
    return html`
      <div style="padding: 50px; position: relative; min-height: 200px;">
        ${args.showTrigger ? html`
          <spectrum-button 
            id="trigger-button"
            variant="primary"
            buttonText="Show Context Menu"
            @click=${showMenu}
          ></spectrum-button>
        ` : ''}
        
        <spectrum-context-menu
          id="context-menu"
          .actions=${args.actions}
          .targetKey=${args.targetKey}
          ?isOpen=${args.isOpen}
          position=${ifDefined(args.position)}
        ></spectrum-context-menu>
      </div>
    `;
  }
};

// Fixed open menu story for visual testing
export const PreviewOpen: Story = {
  args: {
    isOpen: true,
    showTrigger: false,
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
  args: {
    showTrigger: false,
  },
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
    
    return html`
      <div style="padding: 20px; max-width: 300px; border: 1px solid #eee; border-radius: 8px;">
        <h4>Example with Collapsible List</h4>
        <spectrum-collapsible-list
          .items=${listItems}
          .contextActions=${args.actions}
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
    showTrigger: false,
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