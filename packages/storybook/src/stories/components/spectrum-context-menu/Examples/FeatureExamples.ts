import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Context Menu Feature Examples
// ==============================================

// Positioning Examples
export const PositioningDemo = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Position Variants</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; max-width: 800px;">
          
          <div style="position: relative;">
            <button 
              style="width: 100%; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Bottom Position
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'action1', label: 'First Action', icon: 'star' },
                { id: 'action2', label: 'Second Action', icon: 'favorite' },
                { id: 'action3', label: 'Third Action', icon: 'bookmark' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Bottom Menu')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div style="position: relative;">
            <button 
              style="width: 100%; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Top Position
            </button>
            <spectrum-context-menu
              position="top"
              .actions=${[
                { id: 'action1', label: 'First Action', icon: 'star' },
                { id: 'action2', label: 'Second Action', icon: 'favorite' },
                { id: 'action3', label: 'Third Action', icon: 'bookmark' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Top Menu')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div style="position: relative;">
            <button 
              style="width: 100%; padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Auto Position
            </button>
            <spectrum-context-menu
              position="auto"
              .actions=${[
                { id: 'action1', label: 'Auto positioned', icon: 'auto_fix_high' },
                { id: 'action2', label: 'Smart placement', icon: 'psychology' },
                { id: 'action3', label: 'Viewport aware', icon: 'fit_screen' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Auto Menu')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Edge Behavior Testing</h4>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; height: 300px; border: 2px dashed var(--spectrum-color-outline); border-radius: 8px; padding: 1rem; position: relative; overflow: hidden;">
          
          <!-- Top Edge -->
          <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%);">
            <button 
              style="padding: 0.5rem 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer; font-size: 0.9rem;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Top Edge
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'top1', label: 'Should appear below', icon: 'arrow_downward' },
                { id: 'top2', label: 'Due to top edge', icon: 'vertical_align_top' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Top Edge')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <!-- Left Edge -->
          <div style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%);">
            <button 
              style="padding: 0.5rem 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer; font-size: 0.9rem;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Left
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'left1', label: 'Adjusts position', icon: 'arrow_forward' },
                { id: 'left2', label: 'From left edge', icon: 'vertical_align_left' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Left Edge')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <!-- Right Edge -->
          <div style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);">
            <button 
              style="padding: 0.5rem 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer; font-size: 0.9rem;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Right
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'right1', label: 'Adjusts position', icon: 'arrow_back' },
                { id: 'right2', label: 'From right edge', icon: 'vertical_align_right' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Right Edge')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <!-- Bottom Edge -->
          <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);">
            <button 
              style="padding: 0.5rem 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer; font-size: 0.9rem;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Bottom Edge
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'bottom1', label: 'Should flip above', icon: 'arrow_upward' },
                { id: 'bottom2', label: 'Due to bottom edge', icon: 'vertical_align_bottom' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Bottom Edge')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Ripple and Visual Effects
export const RippleEffectsDemo = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Ripple Effects</h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem 2rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Ripple Enabled
            </button>
            <spectrum-context-menu
              position="bottom"
              ripple="true"
              .actions=${[
                { id: 'ripple1', label: 'Click for Ripple', icon: 'touch_app' },
                { id: 'ripple2', label: 'Visual Feedback', icon: 'feedback' },
                { id: 'ripple3', label: 'Enhanced UX', icon: 'auto_awesome' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Ripple Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem 2rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              No Ripple
            </button>
            <spectrum-context-menu
              position="bottom"
              ripple="false"
              .actions=${[
                { id: 'no-ripple1', label: 'Standard Click', icon: 'mouse' },
                { id: 'no-ripple2', label: 'No Animation', icon: 'block' },
                { id: 'no-ripple3', label: 'Simple Interaction', icon: 'check' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('No Ripple Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Custom Event Handling
export const CustomEventHandling = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Custom Event Handling</h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Custom Actions
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'custom-1', label: 'Navigate to Page', icon: 'launch' },
                { id: 'custom-2', label: 'Open Modal', icon: 'open_in_new' },
                { id: 'custom-3', label: 'Send Notification', icon: 'notifications' },
                { id: 'separator', label: '', icon: '', separator: true },
                { id: 'custom-4', label: 'Log Analytics', icon: 'analytics' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => {
                const { action, label } = e.detail;
                
                // Custom handling based on action
                switch (action) {
                  case 'custom-1':
                    action('Navigate Action')({ action, label, destination: '/dashboard' });
                    break;
                  case 'custom-2':
                    action('Modal Action')({ action, label, modalId: 'user-settings' });
                    break;
                  case 'custom-3':
                    action('Notification Action')({ action, label, message: 'Action completed successfully!' });
                    break;
                  case 'custom-4':
                    action('Analytics Action')({ action, label, event: 'context_menu_action', properties: { menu_type: 'custom' } });
                    break;
                  default:
                    action('Default Action')(e.detail);
                }
              }}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Dynamic Action Lists
export const DynamicActionLists = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Dynamic Actions</h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                
                // Dynamically update actions based on current state
                const isOnline = navigator.onLine;
                const hasPermissions = Math.random() > 0.5; // Simulate permission check
                
                const dynamicActions = [
                  { id: 'sync', label: isOnline ? 'Sync Data' : 'Offline Mode', icon: isOnline ? 'sync' : 'sync_disabled' },
                  ...(hasPermissions ? [
                    { id: 'admin', label: 'Admin Actions', icon: 'admin_panel_settings' },
                    { id: 'delete', label: 'Delete Item', icon: 'delete', destructive: true }
                  ] : []),
                  { id: 'separator', label: '', icon: '', separator: true },
                  { id: 'help', label: 'Help & Support', icon: 'help' }
                ];
                
                menu.actions = dynamicActions;
                menu.show();
              }}
            >
              Dynamic Menu
            </button>
            <spectrum-context-menu
              position="bottom"
              @contextMenuAction=${(e: CustomEvent) => action('Dynamic Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div style="position: relative;">
            <select 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer; margin-right: 1rem;"
              @change=${(e: Event) => {
                const select = e.target as HTMLSelectElement;
                const menu = select.parentElement?.querySelector('spectrum-context-menu') as any;
                
                // Update menu actions based on selection
                const userRole = select.value;
                let actions = [
                  { id: 'view', label: 'View Details', icon: 'visibility' }
                ];
                
                if (userRole === 'editor') {
                  actions.push(
                    { id: 'edit', label: 'Edit Content', icon: 'edit' },
                    { id: 'draft', label: 'Save as Draft', icon: 'draft' }
                  );
                } else if (userRole === 'admin') {
                  actions.push(
                    { id: 'edit', label: 'Edit Content', icon: 'edit' },
                    { id: 'publish', label: 'Publish', icon: 'publish' },
                    { id: 'separator', label: '', icon: '', separator: true },
                    { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
                  );
                }
                
                if (menu) {
                  menu.actions = actions;
                }
              }}
            >
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              Role-based Menu
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'view', label: 'View Details', icon: 'visibility' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Role-based Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Accessibility Features
export const AccessibilityFeatures = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Accessibility Features</h4>
        <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px; margin-bottom: 2rem;">
          <h5 style="margin: 0 0 0.5rem 0;">♿ Keyboard Navigation</h5>
          <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6;">
            <li><strong>Tab/Shift+Tab:</strong> Navigate between trigger elements</li>
            <li><strong>Enter/Space:</strong> Open context menu</li>
            <li><strong>Arrow Keys:</strong> Navigate menu items</li>
            <li><strong>Enter:</strong> Select menu item</li>
            <li><strong>Escape:</strong> Close menu</li>
          </ul>
        </div>
        
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              aria-label="File operations menu"
              aria-describedby="menu-help"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
              @keydown=${(e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const menu = (e.target as Element).nextElementSibling as any;
                  menu.show();
                }
              }}
            >
              Accessible Menu
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'open', label: 'Open File', icon: 'folder_open' },
                { id: 'edit', label: 'Edit File', icon: 'edit' },
                { id: 'share', label: 'Share File', icon: 'share' },
                { id: 'separator', label: '', icon: '', separator: true },
                { id: 'delete', label: 'Delete File', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Accessible Action')(e.detail)}
            ></spectrum-context-menu>
            <div id="menu-help" style="display: none;">
              Context menu with file operations. Use arrow keys to navigate when open.
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Performance Testing
export const PerformanceTest = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Performance Testing</h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const startTime = performance.now();
                const menu = (e.target as Element).nextElementSibling as any;
                
                // Generate large action list
                const largeActionList = Array.from({ length: 50 }, (_, i) => ({
                  id: `action-${i}`,
                  label: `Action Item ${i + 1}`,
                  icon: ['star', 'favorite', 'bookmark', 'label', 'flag'][i % 5]
                }));
                
                menu.actions = largeActionList;
                menu.show();
                
                const endTime = performance.now();
                action('Performance Test')({ 
                  renderTime: endTime - startTime, 
                  actionCount: largeActionList.length 
                });
              }}
            >
              Large Menu (50 items)
            </button>
            <spectrum-context-menu
              position="bottom"
              @contextMenuAction=${(e: CustomEvent) => action('Large Menu Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                
                // Rapid show/hide test
                let showCount = 0;
                const startTime = performance.now();
                
                const rapidTest = () => {
                  if (showCount < 10) {
                    menu.show();
                    setTimeout(() => {
                      menu.hide();
                      showCount++;
                      setTimeout(rapidTest, 50);
                    }, 50);
                  } else {
                    const endTime = performance.now();
                    action('Rapid Toggle Test')({ 
                      totalTime: endTime - startTime, 
                      cycles: showCount 
                    });
                  }
                };
                
                rapidTest();
              }}
            >
              Rapid Toggle Test
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'test1', label: 'Test Action 1', icon: 'speed' },
                { id: 'test2', label: 'Test Action 2', icon: 'flash_on' },
                { id: 'test3', label: 'Test Action 3', icon: 'rocket_launch' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Rapid Test Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// All Features Showcase
export const AllFeaturesShowcase = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4rem;">
      
      ${PositioningDemo.render()}
      ${RippleEffectsDemo.render()}
      ${CustomEventHandling.render()}
      ${DynamicActionLists.render()}
      ${AccessibilityFeatures.render()}
      ${PerformanceTest.render()}
      
    </div>
  `
}; 