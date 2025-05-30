import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { ifDefined } from 'lit/directives/if-defined.js';

// Define the type for context menu actions
interface ContextMenuAction {
  label: string;
  icon: string;
  action: string;
  id: string;
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
      { label: 'Edit', icon: 'edit', action: 'edit', id: 'edit-action', ripple: true },
      { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action' },
      { label: 'Duplicate', icon: 'content_copy', action: 'duplicate', id: 'duplicate-action' },
      { label: 'Share', icon: 'share', action: 'share', id: 'share-action' },
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
      { label: 'View Details', icon: 'visibility', action: 'view', id: 'view-action' },
      { label: 'Download', icon: 'download', action: 'download', id: 'download-action' },
      { label: 'Mark as Important', icon: 'star', action: 'mark-important', id: 'mark-important-action' },
      { label: 'Report Issue', icon: 'flag', action: 'report', id: 'report-action' },
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