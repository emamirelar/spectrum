import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumContextMenu Component
 * 
 * The `spectrum-context-menu` component provides a dynamic contextual actions menu that can be programmatically positioned and displayed with custom action lists. It's designed for integration with other components to provide context-sensitive user actions.
 * 
 * ### Key Features
 * - **Dynamic Action Lists**: Display custom actions with icons and labels
 * - **Intelligent Positioning**: Automatic positioning with 'left', 'right', 'top', 'bottom' options
 * - **Programmatic Control**: Show/hide via JavaScript methods with coordinate positioning
 * - **Event Integration**: Emits actionClick and menuClose events with action attributes
 * - **Contextual Targeting**: Associates actions with specific target keys for multi-component integration
 * - **Enhanced Positioning**: Supports 'bottom' alignment to prevent viewport clipping
 * 
 * ### Usage Guidelines
 * - **Use for**: Context-sensitive actions, right-click menus, dropdown action lists, toolbar overflow menus
 * - **Avoid when**: Simple dropdowns, primary navigation, always-visible action buttons
 * 
 * ### Integration Pattern
 * Used by `spectrum-collapsible-list` and `spectrum-rail` for providing contextual actions on list items and navigation elements.
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **actionClick**: `{ action: string, targetKey: string }` - Emitted when user clicks a menu action
 * - **menuClose**: `{ action: string }` - Emitted when menu is closed or hidden
 */

// Component interfaces for TypeScript support
export interface ContextMenuAction {
  label: string;
  icon: string;
  action: string;
  id: string;
  ripple?: boolean;
}

interface SpectrumContextMenuElement extends HTMLElement {
  position: 'left' | 'right' | 'top' | 'bottom';
  show(actions: ContextMenuAction[], x: number, y: number, targetKey: string): Promise<void>;
  hide(): Promise<void>;
  isMenuOpen(): Promise<boolean>;
  positionAtCoordinates(x: number, y: number): Promise<boolean>;
}

// Story arguments interface
interface SpectrumContextMenuArgs {
  position: 'left' | 'right' | 'top' | 'bottom';
  sampleActions: ContextMenuAction[];
}

const meta: Meta<SpectrumContextMenuArgs> = {
  title: 'Spectrum/Components/SpectrumContextMenu',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-context-menu\` component provides dynamic contextual actions with intelligent positioning. It's designed for programmatic control and integration with other components.

### ContextMenuAction Interface
\`\`\`typescript
interface ContextMenuAction {
  label: string;    // Display text
  icon: string;     // Material Symbols icon name
  action: string;   // Action identifier
  id: string;       // Unique identifier
  ripple?: boolean; // Optional ripple effect
}
\`\`\`

### Methods
- \`show(actions, x, y, targetKey)\` - Display menu with actions at coordinates
- \`hide()\` - Close the menu
- \`isMenuOpen()\` - Check if menu is currently open
- \`positionAtCoordinates(x, y)\` - Position menu at specific coordinates

### Event System
- \`actionClick\`: Emitted when action is selected with action and targetKey
- \`menuClose\`: Emitted when menu is closed with close action

### Basic Usage
Use JavaScript to programmatically show the context menu:

\`\`\`javascript
const contextMenu = document.querySelector('spectrum-context-menu');
const actions = [
  { id: 'edit', action: 'edit', label: 'Edit', icon: 'edit' },
  { id: 'delete', action: 'delete', label: 'Delete', icon: 'delete' }
];
contextMenu.show(actions, 100, 200, 'item-1');
\`\`\`
        `
      }
    }
  },
  args: {
    position: 'right',
    sampleActions: [
      { id: 'edit', action: 'edit', label: 'Edit', icon: 'edit' },
      { id: 'copy', action: 'copy', label: 'Copy', icon: 'content_copy' },
      { id: 'delete', action: 'delete', label: 'Delete', icon: 'delete' }
    ]
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Preferred positioning relative to trigger point',
      table: {
        type: { summary: "'left' | 'right' | 'top' | 'bottom'" },
        defaultValue: { summary: 'right' }
      }
    },
    sampleActions: {
      control: 'object',
      description: 'Sample actions for demonstration (not a real prop)',
      table: {
        type: { summary: 'ContextMenuAction[]' },
        defaultValue: { summary: '[]' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumContextMenuArgs>;

// Interactive render function with demo trigger
const renderContextMenuDemo = (args: SpectrumContextMenuArgs) => html`
  <div style="padding: 4rem; display: flex; flex-direction: column; align-items: center; gap: 2rem; min-height: 400px; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 2rem;">
      <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Context Menu Demo</h3>
      <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Right-click the buttons below to see the context menu in action</p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; width: 100%; max-width: 600px;">
      <div style="text-align: center;">
        <button 
          id="demo-button-1"
          style="padding: 1rem 2rem; background: var(--spectrum-sys-color-primary); color: var(--spectrum-sys-color-on-primary); border: none; border-radius: 8px; cursor: pointer; min-width: 150px;"
          @contextmenu=${(e: MouseEvent) => {
            e.preventDefault();
            const menu = (e.target as HTMLElement)?.closest('div')?.querySelector('spectrum-context-menu') as SpectrumContextMenuElement;
            if (menu) {
              menu.show(args.sampleActions, e.clientX, e.clientY, 'demo-item-1');
            }
          }}
        >
          Right-click me
        </button>
        <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">Basic Actions</p>
      </div>
      
      <div style="text-align: center;">
        <button 
          id="demo-button-2"
          style="padding: 1rem 2rem; background: var(--spectrum-sys-color-secondary); color: var(--spectrum-sys-color-on-secondary); border: none; border-radius: 8px; cursor: pointer; min-width: 150px;"
          @contextmenu=${(e: MouseEvent) => {
            e.preventDefault();
            const menu = (e.target as HTMLElement)?.closest('div')?.querySelector('spectrum-context-menu') as SpectrumContextMenuElement;
            const advancedActions = [
              { id: 'share', action: 'share', label: 'Share', icon: 'share' },
              { id: 'download', action: 'download', label: 'Download', icon: 'download' },
              { id: 'info', action: 'info', label: 'Get Info', icon: 'info' },
              { id: 'archive', action: 'archive', label: 'Archive', icon: 'archive' }
            ];
            if (menu) {
              menu.show(advancedActions, e.clientX, e.clientY, 'demo-item-2');
            }
          }}
        >
          Right-click me
        </button>
        <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">Extended Actions</p>
      </div>
    </div>
    
    <spectrum-context-menu
      .position=${args.position}
      @actionClick=${(e: CustomEvent) => {
        action('actionClick')(e.detail);
        console.log('Action clicked:', e.detail);
      }}
      @menuClose=${(e: CustomEvent) => {
        action('menuClose')(e.detail);
        console.log('Menu closed:', e.detail);
      }}
    ></spectrum-context-menu>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test the context menu with different positions and actions.
 * Right-click the demo buttons to see the context menu in action.
 */
export const Playground: Story = {
  render: renderContextMenuDemo,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel to change the menu position, then right-click the demo buttons to see how the context menu appears in different positions. 
The Actions panel will show all emitted events with their action attributes and target keys.

### Testing Tips
- Try different position values to see how the menu adapts
- Right-click near screen edges to see intelligent positioning
- Check the Actions panel for event details
- Modify the sample actions to test different configurations
        `
      }
    }
  }
};

// =================================================================
// POSITIONING EXAMPLES
// =================================================================

/**
 * Demonstrates all four positioning options for the context menu.
 */
export const PositioningOptions: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Context Menu Positioning</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Right-click each button to see different positioning behaviors</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 800px; margin: 0 auto;">
        ${['left', 'right', 'top', 'bottom'].map(position => html`
          <div style="text-align: center; padding: 1rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px;">
            <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); text-transform: capitalize;">${position} Position</h4>
            <button 
              style="padding: 1rem 2rem; background: var(--spectrum-sys-color-primary); color: var(--spectrum-sys-color-on-primary); border: none; border-radius: 8px; cursor: pointer;"
              @contextmenu=${(e: MouseEvent) => {
                e.preventDefault();
                const menu = document.getElementById(`menu-${position}`) as SpectrumContextMenuElement;
                const actions = [
                  { id: 'action1', action: 'edit', label: 'Edit Item', icon: 'edit' },
                  { id: 'action2', action: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
                  { id: 'action3', action: 'delete', label: 'Delete', icon: 'delete' }
                ];
                menu.show(actions, e.clientX, e.clientY, `target-${position}`);
              }}
            >
              Right-click (${position})
            </button>
            <p style="margin-top: 0.5rem; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">Menu appears ${position}</p>
            
            <spectrum-context-menu
              id="menu-${position}"
              .position=${position as any}
              @actionClick=${(e: CustomEvent) => action('actionClick')(`[${position}] ${JSON.stringify(e.detail)}`)}
              @menuClose=${(e: CustomEvent) => action('menuClose')(`[${position}] ${JSON.stringify(e.detail)}`)}
            ></spectrum-context-menu>
          </div>
        `)}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Test all four positioning options to see how the context menu adapts its position relative to the trigger point:

- **Left**: Menu appears to the left of the trigger point
- **Right**: Menu appears to the right of the trigger point (default)
- **Top**: Menu appears above the trigger point
- **Bottom**: Menu appears below the trigger point

The menu includes intelligent positioning to prevent viewport clipping at screen edges.
        `
      }
    }
  }
};

// =================================================================
// ACTION TYPES EXAMPLES
// =================================================================

/**
 * Demonstrates different types of actions commonly used in context menus.
 */
export const ActionTypes: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Context Menu Action Types</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Right-click each item to see different action configurations</p>
      </div>
      
      <div style="display: grid; gap: 1.5rem; max-width: 600px; margin: 0 auto;">
        <div style="padding: 1.5rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; cursor: context-menu;"
             @contextmenu=${(e: MouseEvent) => {
               e.preventDefault();
               const menu = document.getElementById('file-menu') as SpectrumContextMenuElement;
               const fileActions = [
                 { id: 'open', action: 'open', label: 'Open', icon: 'folder_open' },
                 { id: 'edit', action: 'edit', label: 'Edit', icon: 'edit' },
                 { id: 'rename', action: 'rename', label: 'Rename', icon: 'drive_file_rename_outline' },
                 { id: 'duplicate', action: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
                 { id: 'move', action: 'move', label: 'Move to...', icon: 'drive_file_move' },
                 { id: 'delete', action: 'delete', label: 'Delete', icon: 'delete' }
               ];
               menu.show(fileActions, e.clientX, e.clientY, 'file-item');
             }}>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">description</span>
            <div>
              <h4 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">Document.pdf</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">File Management Actions</p>
            </div>
          </div>
        </div>
        
        <div style="padding: 1.5rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; cursor: context-menu;"
             @contextmenu=${(e: MouseEvent) => {
               e.preventDefault();
               const menu = document.getElementById('user-menu') as SpectrumContextMenuElement;
               const userActions = [
                 { id: 'profile', action: 'view-profile', label: 'View Profile', icon: 'person' },
                 { id: 'message', action: 'send-message', label: 'Send Message', icon: 'message' },
                 { id: 'call', action: 'start-call', label: 'Start Call', icon: 'call' },
                 { id: 'block', action: 'block-user', label: 'Block User', icon: 'block' }
               ];
               menu.show(userActions, e.clientX, e.clientY, 'user-john');
             }}>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">account_circle</span>
            <div>
              <h4 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">John Smith</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">User Management Actions</p>
            </div>
          </div>
        </div>
        
        <div style="padding: 1.5rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; cursor: context-menu;"
             @contextmenu=${(e: MouseEvent) => {
               e.preventDefault();
               const menu = document.getElementById('data-menu') as SpectrumContextMenuElement;
               const dataActions = [
                 { id: 'export', action: 'export-data', label: 'Export Data', icon: 'file_download' },
                 { id: 'share', action: 'share-link', label: 'Share Link', icon: 'share' },
                 { id: 'favorite', action: 'add-favorite', label: 'Add to Favorites', icon: 'star' },
                 { id: 'bookmark', action: 'bookmark', label: 'Bookmark', icon: 'bookmark' },
                 { id: 'print', action: 'print', label: 'Print', icon: 'print' }
               ];
               menu.show(dataActions, e.clientX, e.clientY, 'data-table');
             }}>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-tertiary);">table_chart</span>
            <div>
              <h4 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">Sales Report Q4</h4>
              <p style="margin: 0; font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">Data & Sharing Actions</p>
            </div>
          </div>
        </div>
      </div>
      
      <spectrum-context-menu id="file-menu" @actionClick=${(e: CustomEvent) => action('actionClick')(`[File] ${JSON.stringify(e.detail)}`)} @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}></spectrum-context-menu>
      <spectrum-context-menu id="user-menu" @actionClick=${(e: CustomEvent) => action('actionClick')(`[User] ${JSON.stringify(e.detail)}`)} @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}></spectrum-context-menu>
      <spectrum-context-menu id="data-menu" @actionClick=${(e: CustomEvent) => action('actionClick')(`[Data] ${JSON.stringify(e.detail)}`)} @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}></spectrum-context-menu>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Examples of different action types commonly used in context menus across various use cases:

### File Management
Right-click the document to see file operations like open, edit, rename, duplicate, move, and delete.

### User Management  
Right-click the user profile to see social actions like view profile, send message, start call, and block user.

### Data & Sharing
Right-click the data table to see export, sharing, and utility actions like export data, share link, add to favorites, bookmark, and print.

Each context demonstrates different icon usage and action groupings appropriate for the content type.
        `
      }
    }
  }
};

// =================================================================
// INTEGRATION EXAMPLES
// =================================================================

/**
 * Shows how context menus integrate with lists and navigation components.
 */
export const IntegrationExamples: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Component Integration Examples</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">How context menus work with lists and navigation</p>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1000px; margin: 0 auto;">
        <!-- File Explorer Simulation -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container);">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined">folder</span>
              File Explorer
            </h4>
          </div>
          <div style="padding: 0;">
            ${[
              { name: 'Documents', icon: 'folder', type: 'folder' },
              { name: 'presentation.pptx', icon: 'slideshow', type: 'file' },
              { name: 'report.pdf', icon: 'picture_as_pdf', type: 'file' },
              { name: 'image.jpg', icon: 'image', type: 'file' }
            ].map((item, index) => html`
              <div 
                style="padding: 0.75rem 1rem; border-bottom: 1px solid var(--spectrum-sys-color-outline-variant); cursor: context-menu; display: flex; align-items: center; gap: 0.75rem; transition: background-color 0.2s;"
                @mouseover=${(e: Event) => (e.target as HTMLElement).style.backgroundColor = 'var(--spectrum-sys-color-surface-hover)'}
                @mouseout=${(e: Event) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                @contextmenu=${(e: MouseEvent) => {
                  e.preventDefault();
                  const menu = document.getElementById('file-explorer-menu') as SpectrumContextMenuElement;
                  const actions = item.type === 'folder' ? [
                    { id: 'open', action: 'open-folder', label: 'Open', icon: 'folder_open' },
                    { id: 'rename', action: 'rename', label: 'Rename', icon: 'edit' },
                    { id: 'delete', action: 'delete', label: 'Delete', icon: 'delete' }
                  ] : [
                    { id: 'open', action: 'open-file', label: 'Open', icon: 'open_in_new' },
                    { id: 'download', action: 'download', label: 'Download', icon: 'download' },
                    { id: 'share', action: 'share', label: 'Share', icon: 'share' },
                    { id: 'rename', action: 'rename', label: 'Rename', icon: 'edit' },
                    { id: 'delete', action: 'delete', label: 'Delete', icon: 'delete' }
                  ];
                  menu.show(actions, e.clientX, e.clientY, `file-${index}`);
                }}
              >
                <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">${item.icon}</span>
                <span style="color: var(--spectrum-sys-color-on-surface);">${item.name}</span>
              </div>
            `)}
          </div>
        </div>
        
        <!-- Navigation Menu Simulation -->
        <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden;">
          <div style="padding: 1rem; background: var(--spectrum-sys-color-secondary-container); color: var(--spectrum-sys-color-on-secondary-container);">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <span class="material-symbols-outlined">menu</span>
              Navigation Menu
            </h4>
          </div>
          <div style="padding: 0;">
            ${[
              { name: 'Dashboard', icon: 'dashboard', badge: null },
              { name: 'Projects', icon: 'work', badge: '3' },
              { name: 'Messages', icon: 'mail', badge: '12' },
              { name: 'Settings', icon: 'settings', badge: null }
            ].map((item, index) => html`
              <div 
                style="padding: 1rem; border-bottom: 1px solid var(--spectrum-sys-color-outline-variant); cursor: context-menu; display: flex; align-items: center; gap: 0.75rem; justify-content: space-between; transition: background-color 0.2s;"
                @mouseover=${(e: Event) => (e.target as HTMLElement).style.backgroundColor = 'var(--spectrum-sys-color-surface-hover)'}
                @mouseout=${(e: Event) => (e.target as HTMLElement).style.backgroundColor = 'transparent'}
                @contextmenu=${(e: MouseEvent) => {
                  e.preventDefault();
                  const menu = document.getElementById('nav-menu') as SpectrumContextMenuElement;
                  const actions = [
                    { id: 'open', action: 'open-tab', label: 'Open in New Tab', icon: 'open_in_new' },
                    { id: 'pin', action: 'pin', label: 'Pin to Top', icon: 'push_pin' },
                    { id: 'hide', action: 'hide', label: 'Hide from Menu', icon: 'visibility_off' },
                    { id: 'settings', action: 'configure', label: 'Configure', icon: 'tune' }
                  ];
                  menu.show(actions, e.clientX, e.clientY, `nav-${index}`);
                }}
              >
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                  <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">${item.icon}</span>
                  <span style="color: var(--spectrum-sys-color-on-surface);">${item.name}</span>
                </div>
                ${item.badge ? html`
                  <span style="background: var(--spectrum-sys-color-error); color: var(--spectrum-sys-color-on-error); padding: 0.125rem 0.5rem; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">
                    ${item.badge}
                  </span>
                ` : ''}
              </div>
            `)}
          </div>
        </div>
      </div>
      
      <spectrum-context-menu id="file-explorer-menu" position="right" @actionClick=${(e: CustomEvent) => action('actionClick')(`[Explorer] ${JSON.stringify(e.detail)}`)} @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}></spectrum-context-menu>
      <spectrum-context-menu id="nav-menu" position="right" @actionClick=${(e: CustomEvent) => action('actionClick')(`[Navigation] ${JSON.stringify(e.detail)}`)} @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}></spectrum-context-menu>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world integration examples showing how context menus work with different types of content:

### File Explorer Integration
Right-click files and folders to see contextual actions. Folders show different actions than files, demonstrating dynamic action lists based on content type.

### Navigation Menu Integration
Right-click navigation items to see menu management actions like opening in new tab, pinning, hiding, and configuration.

### Integration Features
- **Dynamic Actions**: Different actions based on item type
- **Target Identification**: Each item has a unique target key
- **Event Propagation**: Actions include both action type and target information
- **Visual Feedback**: Hover states and proper cursor indicators

This demonstrates the pattern used by \`spectrum-collapsible-list\` and \`spectrum-rail\` components.
        `
      }
    }
  }
};

// =================================================================
// PROGRAMMATIC CONTROL
// =================================================================

/**
 * Demonstrates programmatic control of the context menu via JavaScript.
 */
export const ProgrammaticControl: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Programmatic Control</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Control the context menu via JavaScript methods</p>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; max-width: 800px; margin: 0 auto 2rem auto;">
        <button 
          style="padding: 1rem; background: var(--spectrum-sys-color-primary); color: var(--spectrum-sys-color-on-primary); border: none; border-radius: 8px; cursor: pointer;"
          @click=${() => {
            const menu = document.getElementById('programmatic-menu') as SpectrumContextMenuElement;
            const actions = [
              { id: 'action1', action: 'quick-action', label: 'Quick Action', icon: 'flash_on' },
              { id: 'action2', action: 'settings', label: 'Settings', icon: 'settings' }
            ];
            // Show at center of button
            const rect = (event?.target as HTMLElement)?.getBoundingClientRect();
            if (rect) {
              menu.show(actions, rect.left + rect.width / 2, rect.top + rect.height / 2, 'programmatic-trigger');
            }
          }}
        >
          Show Menu (Center)
        </button>
        
        <button 
          style="padding: 1rem; background: var(--spectrum-sys-color-secondary); color: var(--spectrum-sys-color-on-secondary); border: none; border-radius: 8px; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const menu = document.getElementById('programmatic-menu') as SpectrumContextMenuElement;
            const actions = [
              { id: 'action1', action: 'edit', label: 'Edit Item', icon: 'edit' },
              { id: 'action2', action: 'copy', label: 'Copy Link', icon: 'link' },
              { id: 'action3', action: 'delete', label: 'Delete', icon: 'delete' }
            ];
            // Show at mouse position
            menu.show(actions, e.clientX, e.clientY, 'mouse-trigger');
          }}
        >
          Show at Mouse
        </button>
        
        <button 
          style="padding: 1rem; background: var(--spectrum-sys-color-tertiary); color: var(--spectrum-sys-color-on-tertiary); border: none; border-radius: 8px; cursor: pointer;"
          @click=${async () => {
            const menu = document.getElementById('programmatic-menu') as SpectrumContextMenuElement;
            const isOpen = await menu.isMenuOpen();
            if (isOpen) {
              await menu.hide();
            } else {
              const actions = [
                { id: 'action1', action: 'toggle-action', label: 'Toggle Action', icon: 'toggle_on' }
              ];
              menu.show(actions, 300, 200, 'toggle-trigger');
            }
          }}
        >
          Toggle Menu
        </button>
        
        <button 
          style="padding: 1rem; background: var(--spectrum-sys-color-error); color: var(--spectrum-sys-color-on-error); border: none; border-radius: 8px; cursor: pointer;"
          @click=${async () => {
            const menu = document.getElementById('programmatic-menu') as SpectrumContextMenuElement;
            await menu.hide();
          }}
        >
          Hide Menu
        </button>
      </div>
      
      <div style="background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px; font-family: monospace; font-size: 0.875rem; border: 1px solid var(--spectrum-sys-color-outline);">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); font-family: inherit;">Code Examples:</h4>
        <div style="color: var(--spectrum-sys-color-on-surface-variant);">
          <div style="margin-bottom: 0.5rem;"><strong>Show Menu:</strong> menu.show(actions, x, y, targetKey)</div>
          <div style="margin-bottom: 0.5rem;"><strong>Hide Menu:</strong> menu.hide()</div>
          <div style="margin-bottom: 0.5rem;"><strong>Check Status:</strong> await menu.isMenuOpen()</div>
          <div><strong>Position:</strong> menu.positionAtCoordinates(x, y)</div>
        </div>
      </div>
      
      <spectrum-context-menu 
        id="programmatic-menu"
        @actionClick=${(e: CustomEvent) => action('actionClick')(`[Programmatic] ${JSON.stringify(e.detail)}`)}
        @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}
      ></spectrum-context-menu>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates programmatic control of the context menu using its JavaScript API:

### Available Methods
- \`show(actions, x, y, targetKey)\` - Display menu with actions at specific coordinates
- \`hide()\` - Close the menu programmatically
- \`isMenuOpen()\` - Check if the menu is currently open (returns Promise<boolean>)
- \`positionAtCoordinates(x, y)\` - Reposition an open menu

### Usage Patterns
- **Event-based Positioning**: Show menu at mouse event coordinates
- **Element-based Positioning**: Show menu relative to specific UI elements
- **Toggle Behavior**: Check state before showing/hiding
- **Programmatic Cleanup**: Hide menu when changing context

All methods return Promises for reliable async control in complex UI interactions.
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLE
// =================================================================

/**
 * Demonstrates accessibility features and keyboard navigation for the context menu.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Accessibility Features</h3>
        <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Context menu with full keyboard and screen reader support</p>
      </div>
      
      <div style="display: grid; gap: 1.5rem; max-width: 600px; margin: 0 auto;">
        <div style="background: var(--spectrum-sys-color-surface); padding: 1.5rem; border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Keyboard Navigation Test</h4>
          <p style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface-variant);">Use Tab to focus, Enter/Space to activate, or right-click for context menu</p>
          
          <div style="display: grid; gap: 0.5rem;">
            ${[
              { id: 'accessible-item-1', label: 'Project Alpha', description: 'Development project' },
              { id: 'accessible-item-2', label: 'Project Beta', description: 'Research initiative' },
              { id: 'accessible-item-3', label: 'Project Gamma', description: 'Marketing campaign' }
            ].map((item, index) => html`
              <div 
                tabindex="0"
                role="button"
                aria-label="Project ${item.label} - ${item.description}. Press Enter for options or right-click for context menu"
                style="padding: 1rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 6px; cursor: pointer; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center;"
                @focus=${(e: Event) => {
                  (e.target as HTMLElement).style.outline = '2px solid var(--spectrum-sys-color-primary)';
                  (e.target as HTMLElement).style.backgroundColor = 'var(--spectrum-sys-color-primary-container)';
                }}
                @blur=${(e: Event) => {
                  (e.target as HTMLElement).style.outline = 'none';
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }}
                @keydown=${(e: KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const menu = document.getElementById('accessible-menu') as SpectrumContextMenuElement;
                    const rect = (e.target as HTMLElement).getBoundingClientRect();
                    const actions = [
                      { id: 'view', action: 'view-project', label: 'View Project', icon: 'visibility' },
                      { id: 'edit', action: 'edit-project', label: 'Edit Project', icon: 'edit' },
                      { id: 'share', action: 'share-project', label: 'Share Project', icon: 'share' },
                      { id: 'archive', action: 'archive-project', label: 'Archive Project', icon: 'archive' }
                    ];
                    menu.show(actions, rect.left + rect.width / 2, rect.bottom + 5, item.id);
                  }
                }}
                @contextmenu=${(e: MouseEvent) => {
                  e.preventDefault();
                  const menu = document.getElementById('accessible-menu') as SpectrumContextMenuElement;
                  const actions = [
                    { id: 'view', action: 'view-project', label: 'View Project', icon: 'visibility' },
                    { id: 'edit', action: 'edit-project', label: 'Edit Project', icon: 'edit' },
                    { id: 'share', action: 'share-project', label: 'Share Project', icon: 'share' },
                    { id: 'archive', action: 'archive-project', label: 'Archive Project', icon: 'archive' }
                  ];
                  menu.show(actions, e.clientX, e.clientY, item.id);
                }}
              >
                <div>
                  <div style="font-weight: 500; color: var(--spectrum-sys-color-on-surface);">${item.label}</div>
                  <div style="font-size: 0.875rem; color: var(--spectrum-sys-color-on-surface-variant);">${item.description}</div>
                </div>
                <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 1.25rem;">more_vert</span>
              </div>
            `)}
          </div>
        </div>
        
        <div style="background: var(--spectrum-sys-color-primary-container); color: var(--spectrum-sys-color-on-primary-container); padding: 1.5rem; border-radius: 8px;">
          <h4 style="margin: 0 0 1rem 0;">Accessibility Features</h4>
          <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
            <li><strong>Keyboard Navigation:</strong> Tab to focus items, Enter/Space to activate</li>
            <li><strong>Screen Reader Support:</strong> Proper ARIA labels and role attributes</li>
            <li><strong>Focus Management:</strong> Clear focus indicators and logical tab order</li>
            <li><strong>High Contrast:</strong> Respects system high contrast preferences</li>
            <li><strong>Reduced Motion:</strong> Respects user motion preferences</li>
            <li><strong>Context Keys:</strong> Menu key and Shift+F10 support</li>
          </ul>
        </div>
      </div>
      
      <spectrum-context-menu 
        id="accessible-menu"
        @actionClick=${(e: CustomEvent) => action('actionClick')(`[Accessible] ${JSON.stringify(e.detail)}`)}
        @menuClose=${(e: CustomEvent) => action('menuClose')(e.detail)}
      ></spectrum-context-menu>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive accessibility example demonstrating all accessibility features:

### Keyboard Support
- **Tab Navigation**: Use Tab to move between focusable items
- **Activation**: Press Enter or Space to show context menu
- **Context Menu Key**: Menu key or Shift+F10 also triggers context menu
- **Escape**: Close menu with Escape key

### Screen Reader Support
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Role Attributes**: Proper semantic roles for buttons and menus
- **State Announcements**: Menu open/close states announced
- **Action Descriptions**: Clear action descriptions in menu items

### Visual Accessibility
- **Focus Indicators**: High-contrast focus outlines
- **High Contrast Mode**: Enhanced visibility in high contrast
- **Color Independence**: Information not conveyed by color alone
- **Text Scaling**: Supports browser text zoom up to 200%

### Motor Accessibility
- **Large Click Targets**: Minimum 44px touch targets
- **Hover Tolerance**: Generous hover areas for imprecise pointing
- **Reduced Motion**: Respects prefers-reduced-motion settings
- **Multiple Activation Methods**: Both click and keyboard activation

Test with keyboard navigation and screen readers to experience full accessibility.
        `
      }
    }
  }
};