import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Context Menu Variant Examples
// ==============================================

// File Manager Actions
export const FileManagerActions = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">File Operations</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              📁 Documents Folder
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'open', label: 'Open', icon: 'folder_open' },
                { id: 'rename', label: 'Rename', icon: 'edit' },
                { id: 'copy', label: 'Copy', icon: 'content_copy' },
                { id: 'move', label: 'Move to...', icon: 'drive_file_move' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'compress', label: 'Compress', icon: 'compress' },
                { id: 'properties', label: 'Properties', icon: 'info' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('File Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              📄 Report.pdf
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'open', label: 'Open', icon: 'open_in_new' },
                { id: 'preview', label: 'Quick Look', icon: 'visibility' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'download', label: 'Download', icon: 'download' },
                { id: 'share', label: 'Share...', icon: 'share' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'rename', label: 'Rename', icon: 'edit' },
                { id: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'move-trash', label: 'Move to Trash', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('PDF Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Content Creation Actions
export const ContentCreationActions = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Create New Content</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          
          <div style="position: relative;">
            <button 
              style="padding: 1rem; border: 2px dashed var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface-variant); cursor: pointer; min-width: 200px;"
              @click=${(e: Event) => {
                const menu = (e.target as Element).nextElementSibling as any;
                menu.show();
              }}
            >
              ➕ Create New
            </button>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'document', label: 'Document', icon: 'description' },
                { id: 'spreadsheet', label: 'Spreadsheet', icon: 'table_chart' },
                { id: 'presentation', label: 'Presentation', icon: 'slideshow' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'folder', label: 'Folder', icon: 'create_new_folder' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'image', label: 'Image', icon: 'image' },
                { id: 'video', label: 'Video', icon: 'videocam' },
                { id: 'audio', label: 'Audio', icon: 'mic' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'form', label: 'Form', icon: 'ballot' },
                { id: 'survey', label: 'Survey', icon: 'poll' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Create Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Text Editor Actions
export const TextEditorActions = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Text Selection Context</h4>
        <div style="position: relative; display: inline-block;">
          <div 
            style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); min-width: 300px; line-height: 1.6;"
            @mouseup=${(e: Event) => {
              const selection = window.getSelection();
              if (selection && selection.toString().length > 0) {
                const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
                if (menu) menu.show();
              }
            }}
          >
            Select this text to see the context menu with formatting options. You can select any portion of this text.
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'cut', label: 'Cut', icon: 'content_cut' },
                { id: 'copy', label: 'Copy', icon: 'content_copy' },
                { id: 'paste', label: 'Paste', icon: 'content_paste' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'bold', label: 'Bold', icon: 'format_bold' },
                { id: 'italic', label: 'Italic', icon: 'format_italic' },
                { id: 'underline', label: 'Underline', icon: 'format_underlined' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'link', label: 'Add Link', icon: 'link' },
                { id: 'comment', label: 'Add Comment', icon: 'comment' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'search', label: 'Search Web', icon: 'search' },
                { id: 'translate', label: 'Translate', icon: 'translate' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Text Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
        </div>
      </div>
      
    </div>
  `
};

// Data Table Actions
export const DataTableActions = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Table Row Actions</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px 8px 0 0; font-weight: 600;">
            <span>Name</span>
            <span>Status</span>
            <span>Date</span>
            <span>Actions</span>
          </div>
          
          <div 
            style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); border-radius: 0; cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <span>Project Alpha</span>
            <span style="color: var(--spectrum-color-success);">Active</span>
            <span>2024-01-15</span>
            <span>Right-click for options</span>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'view', label: 'View Details', icon: 'visibility' },
                { id: 'edit', label: 'Edit', icon: 'edit' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
                { id: 'export', label: 'Export', icon: 'download' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'archive', label: 'Archive', icon: 'archive' },
                { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Table Row Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; padding: 1rem; background: var(--spectrum-color-surface); border-radius: 0; cursor: pointer; position: relative;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).closest('div')?.querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <span>Project Beta</span>
            <span style="color: var(--spectrum-color-warning);">Pending</span>
            <span>2024-01-20</span>
            <span>Right-click for options</span>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'approve', label: 'Approve', icon: 'check_circle' },
                { id: 'review', label: 'Review', icon: 'rate_review' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'edit', label: 'Edit', icon: 'edit' },
                { id: 'comment', label: 'Add Comment', icon: 'comment' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'reject', label: 'Reject', icon: 'cancel', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Pending Row Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Media Gallery Actions
export const MediaGalleryActions = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Media Item Actions</h4>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; max-width: 600px;">
          
          <div 
            style="position: relative; aspect-ratio: 1; background: linear-gradient(45deg, #e3f2fd, #bbdefb); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 2rem;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            🖼️
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'view', label: 'View Full Size', icon: 'zoom_in' },
                { id: 'download', label: 'Download', icon: 'download' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'edit', label: 'Edit Image', icon: 'edit' },
                { id: 'crop', label: 'Crop', icon: 'crop' },
                { id: 'filters', label: 'Apply Filters', icon: 'tune' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'share', label: 'Share', icon: 'share' },
                { id: 'copy-link', label: 'Copy Link', icon: 'link' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'move', label: 'Move to Album', icon: 'drive_file_move' },
                { id: 'remove', label: 'Remove', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Image Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="position: relative; aspect-ratio: 1; background: linear-gradient(45deg, #f3e5f5, #e1bee7); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 2rem;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            🎥
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'play', label: 'Play Video', icon: 'play_arrow' },
                { id: 'download', label: 'Download', icon: 'download' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'trim', label: 'Trim Video', icon: 'content_cut' },
                { id: 'extract', label: 'Extract Audio', icon: 'audiotrack' },
                { id: 'subtitle', label: 'Add Subtitles', icon: 'subtitles' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'share', label: 'Share', icon: 'share' },
                { id: 'embed', label: 'Get Embed Code', icon: 'code' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'properties', label: 'Video Info', icon: 'info' },
                { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Video Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="position: relative; aspect-ratio: 1; background: linear-gradient(45deg, #e8f5e8, #c8e6c9); border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 2rem;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            🎵
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'play', label: 'Play Audio', icon: 'play_arrow' },
                { id: 'download', label: 'Download', icon: 'download' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'trim', label: 'Trim Audio', icon: 'content_cut' },
                { id: 'normalize', label: 'Normalize Volume', icon: 'volume_up' },
                { id: 'effects', label: 'Audio Effects', icon: 'graphic_eq' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'playlist', label: 'Add to Playlist', icon: 'playlist_add' },
                { id: 'share', label: 'Share', icon: 'share' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'metadata', label: 'Edit Metadata', icon: 'edit_note' },
                { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Audio Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// Dashboard Widget Actions
export const DashboardWidgetActions = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">Dashboard Widgets</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 800px;">
          
          <div 
            style="position: relative; padding: 1.5rem; border: 1px solid var(--spectrum-color-outline); border-radius: 12px; background: var(--spectrum-color-surface); cursor: pointer;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <h3 style="margin: 0 0 1rem 0;">📊 Sales Chart</h3>
            <div style="height: 100px; background: linear-gradient(45deg, #2196f3, #21cbf3); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">
              Chart Visualization
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'refresh', label: 'Refresh Data', icon: 'refresh' },
                { id: 'settings', label: 'Widget Settings', icon: 'settings' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'export-data', label: 'Export Data', icon: 'download' },
                { id: 'export-image', label: 'Export as Image', icon: 'image' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'resize', label: 'Resize Widget', icon: 'open_in_full' },
                { id: 'move', label: 'Move Widget', icon: 'drag_indicator' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'duplicate', label: 'Duplicate', icon: 'content_copy' },
                { id: 'remove', label: 'Remove Widget', icon: 'close', destructive: true }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('Chart Widget Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
          <div 
            style="position: relative; padding: 1.5rem; border: 1px solid var(--spectrum-color-outline); border-radius: 12px; background: var(--spectrum-color-surface); cursor: pointer;"
            @contextmenu=${(e: Event) => {
              e.preventDefault();
              const menu = (e.target as Element).querySelector('spectrum-context-menu') as any;
              if (menu) menu.show();
            }}
          >
            <h3 style="margin: 0 0 1rem 0;">📈 KPI Metrics</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div style="text-align: center; padding: 1rem; background: var(--spectrum-color-success-container); border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: bold;">+12%</div>
                <div style="font-size: 0.9rem;">Growth</div>
              </div>
              <div style="text-align: center; padding: 1rem; background: var(--spectrum-color-primary-container); border-radius: 8px;">
                <div style="font-size: 1.5rem; font-weight: bold;">$45K</div>
                <div style="font-size: 0.9rem;">Revenue</div>
              </div>
            </div>
            <spectrum-context-menu
              position="bottom"
              .actions=${[
                { id: 'refresh', label: 'Refresh Metrics', icon: 'refresh' },
                { id: 'drill-down', label: 'Drill Down', icon: 'zoom_in' },
                { id: 'separator1', label: '', icon: '', separator: true },
                { id: 'alert', label: 'Set Alert', icon: 'notification_add' },
                { id: 'history', label: 'View History', icon: 'history' },
                { id: 'separator2', label: '', icon: '', separator: true },
                { id: 'configure', label: 'Configure KPIs', icon: 'tune' },
                { id: 'share', label: 'Share Widget', icon: 'share' },
                { id: 'separator3', label: '', icon: '', separator: true },
                { id: 'hide', label: 'Hide Widget', icon: 'visibility_off' }
              ]}
              @contextMenuAction=${(e: CustomEvent) => action('KPI Widget Action')(e.detail)}
            ></spectrum-context-menu>
          </div>
          
        </div>
      </div>
      
    </div>
  `
};

// All Variants Showcase
export const AllVariantsShowcase = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      
      ${FileManagerActions.render()}
      ${ContentCreationActions.render()}
      ${TextEditorActions.render()}
      ${DataTableActions.render()}
      ${MediaGalleryActions.render()}
      ${DashboardWidgetActions.render()}
      
    </div>
  `
}; 