import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Basic Action Sets
// ==============================================

export const basicActions = [
  { label: 'Edit', icon: 'edit', action: 'edit', id: 'edit-action' },
  { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action' }
];

export const standardActions = [
  { label: 'Edit', icon: 'edit', action: 'edit', id: 'edit-action' },
  { label: 'Copy', icon: 'content_copy', action: 'copy', id: 'copy-action' },
  { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action' }
];

export const extendedActions = [
  { label: 'View', icon: 'visibility', action: 'view', id: 'view-action' },
  { label: 'Edit', icon: 'edit', action: 'edit', id: 'edit-action' },
  { label: 'Copy', icon: 'content_copy', action: 'copy', id: 'copy-action' },
  { label: 'Share', icon: 'share', action: 'share', id: 'share-action' },
  { label: 'Rename', icon: 'drive_file_rename_outline', action: 'rename', id: 'rename-action' },
  { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete-action' }
];

// ==============================================
// Basic Context Menu Examples
// ==============================================

export const ContextMenuBasic = {
  args: {
    actions: basicActions,
    targetKey: 'basic-item',
    position: 'right'
  },
  render: (args: any) => html`
    <div style="padding: 2rem;">
      <button
        style="padding: 0.75rem 1.5rem; background: var(--spectrum-color-primary); color: var(--spectrum-color-on-primary); border: none; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;"
        @click=${(e: MouseEvent) => {
          e.preventDefault();
          const button = e.currentTarget as HTMLElement;
          const rect = button.getBoundingClientRect();
          
          // Create or get the global context menu
          let menu = document.querySelector('spectrum-context-menu') as any;
          if (!menu) {
            menu = document.createElement('spectrum-context-menu');
            document.body.appendChild(menu);
          }
          
          // Show the menu
          menu.show(args.actions, rect.right + 10, rect.top + rect.height / 2, args.targetKey);
        }}
        @contextAction=${(e: CustomEvent) => action('Basic Context Action')(e.detail)}
      >
        <span class="material-symbols-outlined">more_vert</span>
        Right Click for Menu
      </button>
      <p style="margin-top: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Click the button to show a basic context menu with edit and delete actions.
      </p>
    </div>
  `
};

export const ContextMenuStandard = {
  args: {
    actions: standardActions,
    targetKey: 'standard-item',
    position: 'right'
  },
  render: (args: any) => html`
    <div style="padding: 2rem;">
      <div 
        style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; border: 2px dashed var(--spectrum-color-outline);"
        @click=${(e: MouseEvent) => {
          e.preventDefault();
          const element = e.currentTarget as HTMLElement;
          const rect = element.getBoundingClientRect();
          
          let menu = document.querySelector('spectrum-context-menu') as any;
          if (!menu) {
            menu = document.createElement('spectrum-context-menu');
            document.body.appendChild(menu);
          }
          
          menu.show(args.actions, rect.right + 10, rect.top + rect.height / 2, args.targetKey);
        }}
      >
        <div>
          <h4 style="margin: 0; color: var(--spectrum-color-on-surface);">Document Item</h4>
          <p style="margin: 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Click to show context menu</p>
        </div>
        <span class="material-symbols-outlined" style="color: var(--spectrum-color-on-surface-variant);">more_vert</span>
      </div>
    </div>
  `
};

export const ContextMenuExtended = {
  args: {
    actions: extendedActions,
    targetKey: 'extended-item',
    position: 'right'
  },
  render: (args: any) => html`
    <div style="padding: 2rem;">
      <div 
        style="padding: 1.5rem; background: var(--spectrum-color-surface); border: 1px solid var(--spectrum-color-outline); border-radius: 8px; cursor: pointer; max-width: 400px;"
        @click=${(e: MouseEvent) => {
          e.preventDefault();
          const element = e.currentTarget as HTMLElement;
          const rect = element.getBoundingClientRect();
          
          let menu = document.querySelector('spectrum-context-menu') as any;
          if (!menu) {
            menu = document.createElement('spectrum-context-menu');
            document.body.appendChild(menu);
          }
          
          menu.show(args.actions, rect.right + 10, rect.top + rect.height / 2, args.targetKey);
        }}
      >
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span class="material-symbols-outlined" style="font-size: 2rem; color: var(--spectrum-color-primary);">description</span>
          <div style="flex: 1;">
            <h4 style="margin: 0; color: var(--spectrum-color-on-surface);">Project Document</h4>
            <p style="margin: 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Click for full context menu options</p>
          </div>
          <span class="material-symbols-outlined" style="color: var(--spectrum-color-on-surface-variant);">more_vert</span>
        </div>
      </div>
    </div>
  `
};

// ==============================================
// Position Examples
// ==============================================

export const PositionExamples = {
  args: {
    actions: standardActions,
    targetKey: 'position-demo'
  },
  render: () => html`
    <div style="padding: 3rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Right Position (Default)</h4>
        <button
          style="padding: 0.75rem 1rem; background: var(--spectrum-color-secondary); color: var(--spectrum-color-on-secondary); border: none; border-radius: 4px; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const button = e.currentTarget as HTMLElement;
            const rect = button.getBoundingClientRect();
            
            let menu = document.querySelector('spectrum-context-menu') as any;
            if (!menu) {
              menu = document.createElement('spectrum-context-menu');
              document.body.appendChild(menu);
            }
            
            menu.position = 'right';
            menu.show(standardActions, rect.right + 10, rect.top + rect.height / 2, 'right-demo');
          }}
        >
          Show Right Menu
        </button>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Left Position</h4>
        <button
          style="padding: 0.75rem 1rem; background: var(--spectrum-color-secondary); color: var(--spectrum-color-on-secondary); border: none; border-radius: 4px; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const button = e.currentTarget as HTMLElement;
            const rect = button.getBoundingClientRect();
            
            let menu = document.querySelector('spectrum-context-menu') as any;
            if (!menu) {
              menu = document.createElement('spectrum-context-menu');
              document.body.appendChild(menu);
            }
            
            menu.position = 'left';
            menu.show(standardActions, rect.left - 10, rect.top + rect.height / 2, 'left-demo');
          }}
        >
          Show Left Menu
        </button>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Top Position</h4>
        <button
          style="padding: 0.75rem 1rem; background: var(--spectrum-color-secondary); color: var(--spectrum-color-on-secondary); border: none; border-radius: 4px; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const button = e.currentTarget as HTMLElement;
            const rect = button.getBoundingClientRect();
            
            let menu = document.querySelector('spectrum-context-menu') as any;
            if (!menu) {
              menu = document.createElement('spectrum-context-menu');
              document.body.appendChild(menu);
            }
            
            menu.position = 'top';
            menu.show(standardActions, rect.left + rect.width / 2, rect.top - 10, 'top-demo');
          }}
        >
          Show Top Menu
        </button>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Bottom Position</h4>
        <button
          style="padding: 0.75rem 1rem; background: var(--spectrum-color-secondary); color: var(--spectrum-color-on-secondary); border: none; border-radius: 4px; cursor: pointer;"
          @click=${(e: MouseEvent) => {
            const button = e.currentTarget as HTMLElement;
            const rect = button.getBoundingClientRect();
            
            let menu = document.querySelector('spectrum-context-menu') as any;
            if (!menu) {
              menu = document.createElement('spectrum-context-menu');
              document.body.appendChild(menu);
            }
            
            menu.position = 'bottom';
            menu.show(standardActions, rect.left + rect.width / 2, rect.bottom + 10, 'bottom-demo');
          }}
        >
          Show Bottom Menu
        </button>
      </div>
      
    </div>
  `
};

// ==============================================
// Interactive Examples
// ==============================================

export const InteractiveDemo = {
  args: {
    actions: [
      { label: 'Edit Item', icon: 'edit', action: 'edit', id: 'edit-action', ripple: true },
      { label: 'Copy to Clipboard', icon: 'content_copy', action: 'copy', id: 'copy-action', ripple: true },
      { label: 'Share Item', icon: 'share', action: 'share', id: 'share-action', ripple: true },
      { label: 'Move to Trash', icon: 'delete', action: 'delete', id: 'delete-action', ripple: true }
    ],
    targetKey: 'interactive-demo'
  },
  render: (args: any) => html`
    <div style="padding: 2rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        
        ${Array.from({ length: 6 }, (_, i) => html`
          <div 
            style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px; cursor: pointer; border: 1px solid var(--spectrum-color-outline); transition: all 0.2s;"
            @click=${(e: MouseEvent) => {
              const element = e.currentTarget as HTMLElement;
              const rect = element.getBoundingClientRect();
              
              let menu = document.querySelector('spectrum-context-menu') as any;
              if (!menu) {
                menu = document.createElement('spectrum-context-menu');
                document.body.appendChild(menu);
                
                // Listen for action clicks
                menu.addEventListener('actionClick', (event: CustomEvent) => {
                  action('Interactive Action')(event.detail);
                  
                  // Show a notification
                  const notification = document.createElement('div');
                  notification.textContent = `✓ ${event.detail.action} action performed on item ${i + 1}`;
                  notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--spectrum-color-success-container);
                    color: var(--spectrum-color-on-success-container);
                    padding: 0.75rem 1rem;
                    border-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    z-index: 10000;
                  `;
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 3000);
                });
              }
              
              menu.show(args.actions, rect.right + 10, rect.top + rect.height / 2, `${args.targetKey}-${i + 1}`);
            }}
            @mouseenter=${(e: MouseEvent) => {
              const element = e.currentTarget as HTMLElement;
              element.style.transform = 'translateY(-2px)';
              element.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            @mouseleave=${(e: MouseEvent) => {
              const element = e.currentTarget as HTMLElement;
              element.style.transform = 'translateY(0)';
              element.style.boxShadow = 'none';
            }}
          >
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <h4 style="margin: 0; color: var(--spectrum-color-on-surface);">Item ${i + 1}</h4>
                <p style="margin: 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Click for context menu</p>
              </div>
              <span class="material-symbols-outlined" style="color: var(--spectrum-color-on-surface-variant);">more_vert</span>
            </div>
          </div>
        `)}
        
      </div>
      
      <p style="margin-top: 2rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem; text-align: center;">
        Click any item to show its context menu. Actions will show notifications when performed.
      </p>
    </div>
  `
};

// ==============================================
// Empty State Example
// ==============================================

export const EmptyMenuDemo = {
  args: {
    actions: [],
    targetKey: 'empty-demo'
  },
  render: (args: any) => html`
    <div style="padding: 2rem;">
      <button
        style="padding: 0.75rem 1rem; background: var(--spectrum-color-surface-variant); color: var(--spectrum-color-on-surface); border: 1px solid var(--spectrum-color-outline); border-radius: 4px; cursor: pointer;"
        @click=${(e: MouseEvent) => {
          const button = e.currentTarget as HTMLElement;
          const rect = button.getBoundingClientRect();
          
          let menu = document.querySelector('spectrum-context-menu') as any;
          if (!menu) {
            menu = document.createElement('spectrum-context-menu');
            document.body.appendChild(menu);
          }
          
          menu.show(args.actions, rect.right + 10, rect.top + rect.height / 2, args.targetKey);
        }}
      >
        Show Empty Menu
      </button>
      <p style="margin-top: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        This demonstrates how the context menu handles an empty actions array (menu won't show).
      </p>
    </div>
  `
}; 