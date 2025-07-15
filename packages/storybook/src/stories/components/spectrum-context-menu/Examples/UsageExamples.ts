import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Context Menu Usage Examples
// ==============================================

// File System Manager
export const FileSystemManager = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">File System Operations</h4>
        <div style="border: 1px solid var(--spectrum-color-outline); border-radius: 8px; overflow: hidden;">
          
          <!-- File Manager Header -->
          <div style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface-variant); font-weight: 600; border-bottom: 1px solid var(--spectrum-color-outline);">
            <span>Name</span>
            <span>Type</span>
            <span>Size</span>
            <span>Modified</span>
          </div>
          
          <!-- Folders -->
          <div 
            style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); border-bottom: 1px solid var(--spectrum-color-surface-variant); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <span style="display: flex; align-items: center; gap: 0.5rem;">
              📁 <strong>Documents</strong>
            </span>
            <span>Folder</span>
            <span>--</span>
            <span>Today</span>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'open', label: 'Open', icon: 'folder_open' },
                { id: 'new-window', label: 'Open in New Window', icon: 'open_in_new' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'cut', label: 'Cut', icon: 'content_cut' },
                { id: 'copy', label: 'Copy', icon: 'content_copy' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'rename', label: 'Rename', icon: 'edit' },
                { id: 'compress', label: 'Compress "Documents"', icon: 'compress' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'properties', label: 'Get Info', icon: 'info' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'move-trash', label: 'Move to Trash', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Folder Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <!-- Files -->
          <div 
            style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); border-bottom: 1px solid var(--spectrum-color-surface-variant); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <span style="display: flex; align-items: center; gap: 0.5rem;">
              📄 presentation.pptx
            </span>
            <span>PowerPoint</span>
            <span>2.4 MB</span>
            <span>Yesterday</span>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'open', label: 'Open', icon: 'open_in_new' },
                { id: 'open-with', label: 'Open With...', icon: 'apps' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'cut', label: 'Cut', icon: 'content_cut' },
                { id: 'copy', label: 'Copy', icon: 'content_copy' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'rename', label: 'Rename', icon: 'edit' },
                { id: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'share', label: 'Share...', icon: 'share' },
                { id: 'quick-look', label: 'Quick Look', icon: 'visibility' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'properties', label: 'Get Info', icon: 'info' },
                { id: 'separator5', label: '', icon: '', separator: true },
                { id: 'move-trash', label: 'Move to Trash', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('File Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="display: grid; grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <span style="display: flex; align-items: center; gap: 0.5rem;">
              🖼️ vacation-photo.jpg
            </span>
            <span>JPEG</span>
            <span>4.2 MB</span>
            <span>Last week</span>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'open', label: 'Open', icon: 'open_in_new' },
                { id: 'preview', label: 'Preview', icon: 'visibility' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'edit', label: 'Edit Image', icon: 'edit' },
                { id: 'rotate', label: 'Rotate Left', icon: 'rotate_left' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'copy', label: 'Copy', icon: 'content_copy' },
                { id: 'duplicate', label: 'Duplicate', icon: 'file_copy' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'share', label: 'Share...', icon: 'share' },
                { id: 'slideshow', label: 'Slideshow', icon: 'slideshow' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'properties', label: 'Get Info', icon: 'info' },
                { id: 'separator5', label: '', icon: '', separator: true },
                { id: 'delete', label: 'Move to Trash', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Image Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Email Application
export const EmailApplication = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Email Management</h4>
        <div style="border: 1px solid var(--spectrum-color-outline); border-radius: 8px; overflow: hidden;">
          
          <!-- Email List -->
          <div 
            style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); border-bottom: 1px solid var(--spectrum-color-surface-variant); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <div style="width: 40px; height: 40px; background: var(--spectrum-color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">JD</div>
            <div style="flex: 1;">
              <div style="font-weight: 600;">John Doe</div>
              <div style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Meeting Agenda for Tomorrow</div>
              <div style="color: var(--spectrum-color-on-surface-variant); font-size: 0.8rem; margin-top: 0.25rem;">Please review the attached agenda items for our quarterly meeting...</div>
            </div>
            <div style="text-align: right; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
              <div>9:30 AM</div>
              <div style="margin-top: 0.25rem;">📎</div>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'reply', label: 'Reply', icon: 'reply' },
                { id: 'reply-all', label: 'Reply All', icon: 'reply_all' },
                { id: 'forward', label: 'Forward', icon: 'forward' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'mark-read', label: 'Mark as Read', icon: 'mark_email_read' },
                { id: 'mark-important', label: 'Mark as Important', icon: 'star' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'move', label: 'Move to Folder', icon: 'drive_file_move' },
                { id: 'label', label: 'Add Label', icon: 'label' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'archive', label: 'Archive', icon: 'archive' },
                { id: 'delete', label: 'Delete', icon: 'delete', destructive: true },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'print', label: 'Print', icon: 'print' },
                { id: 'show-original', label: 'Show Original', icon: 'code' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Email Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); border-bottom: 1px solid var(--spectrum-color-surface-variant); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <div style="width: 40px; height: 40px; background: var(--spectrum-color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">SM</div>
            <div style="flex: 1;">
              <div style="font-weight: 600; color: var(--spectrum-color-on-surface-variant);">Sarah Miller</div>
              <div style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Project Update - Q1 Results</div>
              <div style="color: var(--spectrum-color-on-surface-variant); font-size: 0.8rem; margin-top: 0.25rem;">Here's the latest update on our Q1 performance metrics...</div>
            </div>
            <div style="text-align: right; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
              <div>Yesterday</div>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'mark-unread', label: 'Mark as Unread', icon: 'mark_email_unread' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'reply', label: 'Reply', icon: 'reply' },
                { id: 'reply-all', label: 'Reply All', icon: 'reply_all' },
                { id: 'forward', label: 'Forward', icon: 'forward' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'unstar', label: 'Remove Star', icon: 'star_border' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'move', label: 'Move to Folder', icon: 'drive_file_move' },
                { id: 'label', label: 'Add Label', icon: 'label' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'archive', label: 'Archive', icon: 'archive' },
                { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Read Email Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Code Editor Interface
export const CodeEditorInterface = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Code Editor Context Menus</h4>
        
        <!-- File Explorer -->
        <div style="display: grid; grid-template-columns: 250px 1fr; gap: 1rem; height: 400px; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; overflow: hidden;">
          
          <!-- Sidebar -->
          <div style="background: var(--spectrum-color-surface-variant); padding: 1rem; border-right: 1px solid var(--spectrum-color-outline);">
            <h5 style="margin: 0 0 1rem 0; font-size: 0.9rem; font-weight: 600;">EXPLORER</h5>
            
            <div 
              style="padding: 0.5rem; border-radius: 4px; cursor: pointer; margin-bottom: 0.25rem; position: relative; display: flex; align-items: center; gap: 0.5rem;"
              @contextmenu=${(e: Event) => {
                e.preventDefault();
                const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
                if (menu) menu.show();
              }}
            >
              📁 <span style="font-size: 0.9rem;">src</span>
              <spectrum-context-menu
                position="bottom"
                .actions=${[
                  { id: 'new-file', label: 'New File', icon: 'note_add' },
                  { id: 'new-folder', label: 'New Folder', icon: 'create_new_folder' },
                  { id: 'separator1', label: '', icon: '', separator: true },
                  { id: 'copy-path', label: 'Copy Path', icon: 'content_copy' },
                  { id: 'copy-relative', label: 'Copy Relative Path', icon: 'content_copy' },
                  { id: 'separator2', label: '', icon: '', separator: true },
                  { id: 'reveal', label: 'Reveal in Explorer', icon: 'folder_open' },
                  { id: 'terminal', label: 'Open in Terminal', icon: 'terminal' },
                  { id: 'separator3', label: '', icon: '', separator: true },
                  { id: 'rename', label: 'Rename', icon: 'edit' },
                  { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
                ]}
                @contextMenuAction=${(e: CustomEvent) => action('Folder Explorer')(e.detail)}
              ></spectrum-context-menu>
            </div>
            
            <div 
              style="padding: 0.5rem; padding-left: 1.5rem; border-radius: 4px; cursor: pointer; margin-bottom: 0.25rem; position: relative; display: flex; align-items: center; gap: 0.5rem;"
              @contextmenu=${(e: Event) => {
                e.preventDefault();
                const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
                if (menu) menu.show();
              }}
            >
              📄 <span style="font-size: 0.9rem;">index.ts</span>
              <spectrum-context-menu
                position="bottom"
                .actions=${[
                  { id: 'open', label: 'Open', icon: 'open_in_new' },
                  { id: 'open-beside', label: 'Open to the Side', icon: 'open_in_new' },
                  { id: 'separator1', label: '', icon: '', separator: true },
                  { id: 'copy', label: 'Copy', icon: 'content_copy' },
                  { id: 'cut', label: 'Cut', icon: 'content_cut' },
                  { id: 'separator2', label: '', icon: '', separator: true },
                  { id: 'copy-path', label: 'Copy Path', icon: 'content_copy' },
                  { id: 'copy-relative', label: 'Copy Relative Path', icon: 'content_copy' },
                  { id: 'separator3', label: '', icon: '', separator: true },
                  { id: 'rename', label: 'Rename', icon: 'edit' },
                  { id: 'duplicate', label: 'Duplicate', icon: 'file_copy' },
                  { id: 'separator4', label: '', icon: '', separator: true },
                  { id: 'reveal', label: 'Reveal in Explorer', icon: 'folder_open' },
                  { id: 'separator5', label: '', icon: '', separator: true },
                  { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
                ]}
                @contextMenuAction=${(e: CustomEvent) => action('File Explorer')(e.detail)}
              ></spectrum-context-menu>
            </div>
            
          </div>
          
          <!-- Editor Area -->
          <div style="background: var(--spectrum-color-surface); padding: 1rem; font-family: 'Courier New', monospace; font-size: 0.9rem; position: relative;">
            <div 
              style="line-height: 1.6; cursor: text;"
              @contextmenu=${(e: Event) => {
                e.preventDefault();
                const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
                if (menu) menu.show();
              }}
            >
              <div><span style="color: var(--spectrum-color-primary);">import</span> { Component } <span style="color: var(--spectrum-color-primary);">from</span> <span style="color: var(--spectrum-color-success);">'@stencil/core'</span>;</div>
              <div></div>
              <div><span style="color: var(--spectrum-color-warning);">@Component</span>({</div>
              <div>&nbsp;&nbsp;tag: <span style="color: var(--spectrum-color-success);">'my-component'</span>,</div>
              <div>&nbsp;&nbsp;styleUrl: <span style="color: var(--spectrum-color-success);">'my-component.css'</span>,</div>
              <div>&nbsp;&nbsp;shadow: <span style="color: var(--spectrum-color-primary);">true</span></div>
              <div>})</div>
              <div><span style="color: var(--spectrum-color-primary);">export class</span> MyComponent {</div>
              <div>&nbsp;&nbsp;<span style="color: var(--spectrum-color-secondary);">// Component logic here</span></div>
              <div>}</div>
              
              <spectrum-context-menu
                position="bottom"
                .actions=${[
                  { id: 'cut', label: 'Cut', icon: 'content_cut' },
                  { id: 'copy', label: 'Copy', icon: 'content_copy' },
                  { id: 'paste', label: 'Paste', icon: 'content_paste' },
                  { id: 'separator1', label: '', icon: '', separator: true },
                  { id: 'select-all', label: 'Select All', icon: 'select_all' },
                  { id: 'separator2', label: '', icon: '', separator: true },
                  { id: 'find', label: 'Find', icon: 'search' },
                  { id: 'replace', label: 'Replace', icon: 'find_replace' },
                  { id: 'separator3', label: '', icon: '', separator: true },
                  { id: 'format', label: 'Format Document', icon: 'code' },
                  { id: 'organize', label: 'Organize Imports', icon: 'sort' },
                  { id: 'separator4', label: '', icon: '', separator: true },
                  { id: 'goto-definition', label: 'Go to Definition', icon: 'launch' },
                  { id: 'find-references', label: 'Find All References', icon: 'search' },
                  { id: 'separator5', label: '', icon: '', separator: true },
                  { id: 'refactor', label: 'Refactor...', icon: 'build' },
                  { id: 'extract', label: 'Extract Method', icon: 'call_split' }
                ]}
                @contextMenuAction=${(e: CustomEvent) => action('Editor Context')(e.detail)}
              ></spectrum-context-menu>
            </div>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// E-commerce Product Grid
export const EcommerceProductGrid = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Product Management</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          
          <div 
            style="border: 1px solid var(--spectrum-color-outline); border-radius: 8px; overflow: hidden; cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; font-size: 3rem;">📱</div>
            <div style="padding: 1rem;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Smartphone Pro</h3>
              <p style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Latest flagship model with advanced features</p>
              <div style="font-size: 1.2rem; font-weight: bold; color: var(--spectrum-color-primary);">$999</div>
              <div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--spectrum-color-success);">In Stock (23)</div>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'view', label: 'View Details', icon: 'visibility' },
                { id: 'edit', label: 'Edit Product', icon: 'edit' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'duplicate', label: 'Duplicate Product', icon: 'content_copy' },
                { id: 'variant', label: 'Create Variant', icon: 'call_split' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'inventory', label: 'Manage Inventory', icon: 'inventory' },
                { id: 'pricing', label: 'Update Pricing', icon: 'attach_money' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'promote', label: 'Add to Promotion', icon: 'local_offer' },
                { id: 'feature', label: 'Feature Product', icon: 'star' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'analytics', label: 'View Analytics', icon: 'analytics' },
                { id: 'reviews', label: 'Manage Reviews', icon: 'rate_review' },
                { id: 'separator5', label: '', icon: '', separator: true },
                { id: 'hide', label: 'Hide Product', icon: 'visibility_off' },
                { id: 'delete', label: 'Delete Product', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Product Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="border: 1px solid var(--spectrum-color-outline); border-radius: 8px; overflow: hidden; cursor: pointer; position: relative; opacity: 0.7;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #ffe0e0, #ffcccc); display: flex; align-items: center; justify-content: center; font-size: 3rem;">💻</div>
            <div style="padding: 1rem;">
              <h3 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Laptop Ultra</h3>
              <p style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">High-performance laptop for professionals</p>
              <div style="font-size: 1.2rem; font-weight: bold; color: var(--spectrum-color-primary);">$1,499</div>
              <div style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--spectrum-color-error);">Out of Stock</div>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'view', label: 'View Details', icon: 'visibility' },
                { id: 'edit', label: 'Edit Product', icon: 'edit' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'restock', label: 'Restock Item', icon: 'inventory_2' },
                { id: 'preorder', label: 'Enable Pre-orders', icon: 'schedule' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'notify', label: 'Notify When Available', icon: 'notifications' },
                { id: 'waitlist', label: 'Manage Waitlist', icon: 'list' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'alternative', label: 'Suggest Alternatives', icon: 'recommend' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'hide', label: 'Hide Product', icon: 'visibility_off' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Out of Stock Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Social Media Feed
export const SocialMediaFeed = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Social Media Posts</h4>
        <div style="max-width: 600px;">
          
          <!-- Post 1 -->
          <div 
            style="border: 1px solid var(--spectrum-color-outline); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: var(--spectrum-color-surface); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="width: 40px; height: 40px; background: var(--spectrum-color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">JD</div>
              <div>
                <div style="font-weight: 600;">John Designer</div>
                <div style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">2 hours ago</div>
              </div>
            </div>
            <p style="margin: 0 0 1rem 0; line-height: 1.6;">Just finished working on a new design system component! Really excited about how it turned out. What do you think? 🎨✨</p>
            <div style="aspect-ratio: 16/9; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; margin-bottom: 1rem;">Design Preview</div>
            <div style="display: flex; gap: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
              <span>❤️ 24</span>
              <span>💬 8</span>
              <span>🔄 3</span>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'like', label: 'Like Post', icon: 'favorite' },
                { id: 'comment', label: 'Add Comment', icon: 'comment' },
                { id: 'share', label: 'Share Post', icon: 'share' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'save', label: 'Save Post', icon: 'bookmark' },
                { id: 'copy-link', label: 'Copy Link', icon: 'link' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'follow', label: 'Follow John Designer', icon: 'person_add' },
                { id: 'mute', label: 'Mute Posts', icon: 'volume_off' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'report', label: 'Report Post', icon: 'flag', destructive: true },
                { id: 'hide', label: 'Hide Post', icon: 'visibility_off' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Social Post Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <!-- Post 2 -->
          <div 
            style="border: 1px solid var(--spectrum-color-outline); border-radius: 8px; padding: 1rem; background: var(--spectrum-color-surface); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
              <div style="width: 40px; height: 40px; background: var(--spectrum-color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">TC</div>
              <div>
                <div style="font-weight: 600;">Tech Company</div>
                <div style="color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">5 hours ago • Sponsored</div>
              </div>
            </div>
            <p style="margin: 0 0 1rem 0; line-height: 1.6;">🚀 Announcing our new product launch! Revolutionary technology that will change how you work. Limited time offer - 50% off for early adopters!</p>
            <div style="display: flex; gap: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
              <span>❤️ 156</span>
              <span>💬 42</span>
              <span>🔄 28</span>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'like', label: 'Like Post', icon: 'favorite' },
                { id: 'comment', label: 'Add Comment', icon: 'comment' },
                { id: 'share', label: 'Share Post', icon: 'share' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'save', label: 'Save Post', icon: 'bookmark' },
                { id: 'copy-link', label: 'Copy Link', icon: 'link' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'why-ad', label: 'Why am I seeing this ad?', icon: 'info' },
                { id: 'hide-ads', label: 'Hide ads from Tech Company', icon: 'block' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'report', label: 'Report Ad', icon: 'flag', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Sponsored Post Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Dashboard Analytics
export const DashboardAnalytics = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Analytics Dashboard</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
          
          <!-- Chart Widget -->
          <div 
            style="border: 1px solid var(--spectrum-color-outline); border-radius: 12px; padding: 1.5rem; background: var(--spectrum-color-surface); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <h3 style="margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
              📊 Revenue Trends
              <span style="margin-left: auto; color: var(--spectrum-color-success); font-size: 0.9rem;">+12.5%</span>
            </h3>
            <div style="height: 200px; background: linear-gradient(45deg, #4CAF50, #81C784); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem;">Chart Visualization</div>
            <div style="margin-top: 1rem; display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--spectrum-color-on-surface-variant);">
              <span>Last updated: 2 min ago</span>
              <span>View: 30 days</span>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'refresh', label: 'Refresh Data', icon: 'refresh' },
                { id: 'export', label: 'Export Chart', icon: 'download' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'timeframe', label: 'Change Timeframe', icon: 'date_range' },
                { id: 'metrics', label: 'Configure Metrics', icon: 'tune' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'fullscreen', label: 'View Fullscreen', icon: 'fullscreen' },
                { id: 'share', label: 'Share Chart', icon: 'share' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'alerts', label: 'Set Up Alerts', icon: 'notification_add' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'remove', label: 'Remove Widget', icon: 'close', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Chart Widget Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <!-- KPI Widget -->
          <div 
            style="border: 1px solid var(--spectrum-color-outline); border-radius: 12px; padding: 1.5rem; background: var(--spectrum-color-surface); cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <h3 style="margin: 0 0 1rem 0;">📈 Key Metrics</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div style="text-align: center; padding: 1rem; background: var(--spectrum-color-primary-container); border-radius: 8px;">
                <div style="font-size: 1.8rem; font-weight: bold;">1,247</div>
                <div style="font-size: 0.9rem; margin-top: 0.25rem;">New Users</div>
                <div style="font-size: 0.8rem; color: var(--spectrum-color-success); margin-top: 0.25rem;">+8.2%</div>
              </div>
              <div style="text-align: center; padding: 1rem; background: var(--spectrum-color-success-container); border-radius: 8px;">
                <div style="font-size: 1.8rem; font-weight: bold;">94.3%</div>
                <div style="font-size: 0.9rem; margin-top: 0.25rem;">Uptime</div>
                <div style="font-size: 0.8rem; color: var(--spectrum-color-success); margin-top: 0.25rem;">+0.5%</div>
              </div>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'refresh', label: 'Refresh Metrics', icon: 'refresh' },
                { id: 'drill-down', label: 'Drill Down', icon: 'zoom_in' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'customize', label: 'Customize KPIs', icon: 'tune' },
                { id: 'targets', label: 'Set Targets', icon: 'flag' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'history', label: 'View Historical Data', icon: 'history' },
                { id: 'export', label: 'Export Data', icon: 'download' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'alerts', label: 'Configure Alerts', icon: 'notifications' },
                { id: 'separator4', label: '', icon: '', separator: true },
                { id: 'resize', label: 'Resize Widget', icon: 'aspect_ratio' },
                { id: 'remove', label: 'Remove Widget', icon: 'close', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('KPI Widget Context')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// All Usage Examples Showcase
export const AllUsageExamples = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 4rem;">
      
      ${FileSystemManager.render()}
      ${EmailApplication.render()}
      ${CodeEditorInterface.render()}
      ${EcommerceProductGrid.render()}
      ${SocialMediaFeed.render()}
      ${DashboardAnalytics.render()}
      
    </div>
  `
}; 