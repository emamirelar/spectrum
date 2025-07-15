import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Sample Data for Feature Demonstrations
// ==============================================

export const sampleItems = [
  {
    label: 'Frontend Development',
    icon: 'web',
    id: 'frontend',
    children: [
      {
        label: 'React Components',
        icon: 'view_module',
        action: 'navigate',
        id: 'react-components'
      },
      {
        label: 'Vue.js Templates',
        icon: 'view_module',
        action: 'navigate',
        id: 'vue-templates'
      },
      {
        label: 'JavaScript Utilities',
        icon: 'functions',
        action: 'navigate',
        id: 'js-utils'
      },
      {
        label: 'CSS Stylesheets',
        icon: 'css',
        action: 'navigate',
        id: 'css-styles'
      }
    ]
  },
  {
    label: 'Backend Development',
    icon: 'dns',
    id: 'backend',
    children: [
      {
        label: 'API Routes',
        icon: 'api',
        action: 'navigate',
        id: 'api-routes'
      },
      {
        label: 'Database Models',
        icon: 'storage',
        action: 'navigate',
        id: 'db-models'
      },
      {
        label: 'Authentication',
        icon: 'lock',
        action: 'navigate',
        id: 'auth'
      },
      {
        label: 'Middleware',
        icon: 'layers',
        action: 'navigate',
        id: 'middleware'
      }
    ]
  },
  {
    label: 'DevOps & Deployment',
    icon: 'cloud',
    id: 'devops',
    children: [
      {
        label: 'Docker Configuration',
        icon: 'developer_board',
        action: 'configure',
        id: 'docker-config'
      },
      {
        label: 'CI/CD Pipeline',
        icon: 'build',
        action: 'configure',
        id: 'cicd-pipeline'
      },
      {
        label: 'Monitoring Setup',
        icon: 'monitoring',
        action: 'configure',
        id: 'monitoring'
      }
    ]
  },
  {
    label: 'Documentation',
    icon: 'article',
    id: 'docs',
    children: [
      {
        label: 'API Documentation',
        icon: 'description',
        action: 'view',
        id: 'api-docs'
      },
      {
        label: 'User Guides',
        icon: 'help',
        action: 'view',
        id: 'user-guides'
      },
      {
        label: 'README Files',
        icon: 'info',
        action: 'view',
        id: 'readme-files'
      }
    ]
  }
];

export const standardContextActions = [
  {
    label: 'Edit',
    icon: 'edit',
    action: 'edit',
    id: 'edit-action'
  },
  {
    label: 'Copy',
    icon: 'content_copy',
    action: 'copy',
    id: 'copy-action'
  },
  {
    label: 'Share',
    icon: 'share',
    action: 'share',
    id: 'share-action'
  },
  {
    label: 'Rename',
    icon: 'drive_file_rename_outline',
    action: 'rename',
    id: 'rename-action'
  },
  {
    label: 'Delete',
    icon: 'delete',
    action: 'delete',
    id: 'delete-action'
  }
];

// ==============================================
// Filtering Features
// ==============================================

export const FilteringDemo = {
  args: {
    items: sampleItems,
    contextActions: standardContextActions,
    filter: '',
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 500px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Live Filtering</h4>
      
      <div style="margin-bottom: 2rem;">
        <label style="display: block; margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">
          Filter items:
        </label>
        <input 
          type="text" 
          placeholder="Type to filter items..."
          style="width: 100%; padding: 0.5rem; border: 1px solid var(--spectrum-color-outline); border-radius: 4px;"
          value=${args.filter}
          @input=${(e: InputEvent) => {
            const target = e.target as HTMLInputElement;
            args.filter = target.value;
            // Force re-render by updating the component
            const list = document.querySelector('spectrum-collapsible-list');
            if (list) {
              (list as any).filter = target.value;
            }
          }}
        />
        <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--spectrum-color-on-surface-variant);">
          Try searching for: "React", "API", "Docker", "Documentation"
        </p>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .filter=${args.filter}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Filter - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Filter - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Filter - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Filter - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('Filter - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

export const FilteringExamples = {
  args: {},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">No Filter (All Items)</h4>
        <spectrum-collapsible-list
          .items=${sampleItems}
          .filter=""
          @childAction=${(e: CustomEvent) => action('No Filter - Child Action')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Filter: "React"</h4>
        <spectrum-collapsible-list
          .items=${sampleItems}
          .filter="React"
          @childAction=${(e: CustomEvent) => action('React Filter - Child Action')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Filter: "API"</h4>
        <spectrum-collapsible-list
          .items=${sampleItems}
          .filter="API"
          @childAction=${(e: CustomEvent) => action('API Filter - Child Action')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
    </div>
  `
};

// ==============================================
// Context Action Features
// ==============================================

export const contextActionsVariant1 = [
  {
    label: 'View',
    icon: 'visibility',
    action: 'view',
    id: 'view-action'
  },
  {
    label: 'Edit',
    icon: 'edit',
    action: 'edit',
    id: 'edit-action'
  }
];

export const contextActionsVariant2 = [
  {
    label: 'Download',
    icon: 'download',
    action: 'download',
    id: 'download-action'
  },
  {
    label: 'Share',
    icon: 'share',
    action: 'share',
    id: 'share-action'
  },
  {
    label: 'Bookmark',
    icon: 'bookmark',
    action: 'bookmark',
    id: 'bookmark-action'
  }
];

export const contextActionsVariant3 = [
  {
    label: 'Copy Link',
    icon: 'link',
    action: 'copy-link',
    id: 'copy-link-action'
  },
  {
    label: 'Add to Favorites',
    icon: 'favorite',
    action: 'favorite',
    id: 'favorite-action'
  },
  {
    label: 'Report Issue',
    icon: 'report',
    action: 'report',
    id: 'report-action'
  },
  {
    label: 'Get Help',
    icon: 'help',
    action: 'help',
    id: 'help-action'
  }
];

export const ContextActionsDemo = {
  args: {},
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Minimal Context Actions</h4>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Simple view and edit actions for basic item management.
        </p>
        <div style="max-width: 400px;">
          <spectrum-collapsible-list
            .items=${sampleItems}
            .contextActions=${contextActionsVariant1}
            @childAction=${(e: CustomEvent) => action('Minimal - Child Action')(e.detail)}
            @contextAction=${(e: CustomEvent) => action('Minimal - Context Action')(e.detail)}
          ></spectrum-collapsible-list>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Content Actions</h4>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Content-focused actions for downloading, sharing, and bookmarking.
        </p>
        <div style="max-width: 400px;">
          <spectrum-collapsible-list
            .items=${sampleItems}
            .contextActions=${contextActionsVariant2}
            @childAction=${(e: CustomEvent) => action('Content - Child Action')(e.detail)}
            @contextAction=${(e: CustomEvent) => action('Content - Context Action')(e.detail)}
          ></spectrum-collapsible-list>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Extended Actions</h4>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Comprehensive action set with social features and support options.
        </p>
        <div style="max-width: 400px;">
          <spectrum-collapsible-list
            .items=${sampleItems}
            .contextActions=${contextActionsVariant3}
            @childAction=${(e: CustomEvent) => action('Extended - Child Action')(e.detail)}
            @contextAction=${(e: CustomEvent) => action('Extended - Context Action')(e.detail)}
          ></spectrum-collapsible-list>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Full Action Set</h4>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Complete context menu with all standard actions including rename functionality.
        </p>
        <div style="max-width: 400px;">
          <spectrum-collapsible-list
            .items=${sampleItems}
            .contextActions=${standardContextActions}
            @childAction=${(e: CustomEvent) => action('Full - Child Action')(e.detail)}
            @contextAction=${(e: CustomEvent) => action('Full - Context Action')(e.detail)}
            @itemRenamed=${(e: CustomEvent) => action('Full - Item Renamed')(e.detail)}
          ></spectrum-collapsible-list>
        </div>
      </div>
      
    </div>
  `
};

// ==============================================
// Expansion Mode Features
// ==============================================

export const ExpansionModeDemo = {
  args: {},
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Mutually Exclusive (Default)</h4>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Opening one parent closes others at the same level. Good for focused navigation.
        </p>
        <spectrum-collapsible-list
          .items=${sampleItems}
          .mutuallyExclusive=${true}
          @childAction=${(e: CustomEvent) => action('Exclusive - Child Action')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('Exclusive - Expand')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('Exclusive - Contract')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Multi-Expansion Allowed</h4>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Multiple parents can be open simultaneously. Useful for comparing content.
        </p>
        <spectrum-collapsible-list
          .items=${sampleItems}
          .mutuallyExclusive=${false}
          @childAction=${(e: CustomEvent) => action('Multi - Child Action')(e.detail)}
          @expandAction=${(e: CustomEvent) => action('Multi - Expand')(e.detail)}
          @contractAction=${(e: CustomEvent) => action('Multi - Contract')(e.detail)}
        ></spectrum-collapsible-list>
      </div>
      
    </div>
  `
};

// ==============================================
// Rename Functionality
// ==============================================

export const renameItems = [
  {
    label: 'Editable Documents',
    icon: 'folder',
    id: 'editable-docs',
    children: [
      {
        label: 'Draft Document',
        icon: 'description',
        action: 'edit',
        id: 'draft-doc'
      },
      {
        label: 'Meeting Notes',
        icon: 'note',
        action: 'edit',
        id: 'meeting-notes'
      },
      {
        label: 'Project Plan',
        icon: 'assignment',
        action: 'edit',
        id: 'project-plan'
      }
    ]
  },
  {
    label: 'Templates',
    icon: 'folder',
    id: 'templates',
    children: [
      {
        label: 'Email Template',
        icon: 'email',
        action: 'edit',
        id: 'email-template'
      },
      {
        label: 'Report Template',
        icon: 'description',
        action: 'edit',
        id: 'report-template'
      }
    ]
  }
];

export const renameContextActions = [
  {
    label: 'Rename',
    icon: 'drive_file_rename_outline',
    action: 'rename',
    id: 'rename-action'
  },
  {
    label: 'Duplicate',
    icon: 'content_copy',
    action: 'duplicate',
    id: 'duplicate-action'
  },
  {
    label: 'Delete',
    icon: 'delete',
    action: 'delete',
    id: 'delete-action'
  }
];

export const RenameDemo = {
  args: {
    items: renameItems,
    contextActions: renameContextActions
  },
  render: (args: any) => html`
    <div style="max-width: 450px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Inline Rename Functionality</h4>
      <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-on-surface);">How to Rename Items:</h5>
        <ol style="margin: 0; padding-left: 1.5rem; line-height: 1.6; color: var(--spectrum-color-on-surface-variant);">
          <li>Click the <strong>more_vert</strong> icon next to any item</li>
          <li>Select <strong>"Rename"</strong> from the context menu</li>
          <li>Type the new name and press <strong>Enter</strong> to save</li>
          <li>Press <strong>Escape</strong> to cancel editing</li>
        </ol>
      </div>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        @childAction=${(e: CustomEvent) => action('Rename - Child Action')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Rename - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => {
          action('Rename - Item Renamed')(e.detail);
          // Show a notification about the rename
          const notification = document.createElement('div');
          notification.textContent = `✓ Renamed "${e.detail.oldName}" to "${e.detail.newName}"`;
          notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--spectrum-color-success-container);
            color: var(--spectrum-color-on-success-container);
            padding: 0.75rem 1rem;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 1000;
          `;
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
        }}
        @expandAction=${(e: CustomEvent) => action('Rename - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Rename - Contract')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Per-Parent Context Actions
// ==============================================

export const perParentItems = [
  {
    label: 'Source Code',
    icon: 'code',
    id: 'source-code',
    contextActions: [
      {
        label: 'Build',
        icon: 'build',
        action: 'build',
        id: 'build-action'
      },
      {
        label: 'Test',
        icon: 'bug_report',
        action: 'test',
        id: 'test-action'
      },
      {
        label: 'Deploy',
        icon: 'rocket_launch',
        action: 'deploy',
        id: 'deploy-action'
      }
    ],
    children: [
      {
        label: 'main.js',
        icon: 'javascript',
        action: 'edit',
        id: 'main-js'
      },
      {
        label: 'utils.js',
        icon: 'javascript',
        action: 'edit',
        id: 'utils-js'
      }
    ]
  },
  {
    label: 'Assets',
    icon: 'folder',
    id: 'assets',
    contextActions: [
      {
        label: 'Optimize',
        icon: 'tune',
        action: 'optimize',
        id: 'optimize-action'
      },
      {
        label: 'Compress',
        icon: 'compress',
        action: 'compress',
        id: 'compress-action'
      }
    ],
    children: [
      {
        label: 'logo.png',
        icon: 'image',
        action: 'preview',
        id: 'logo-png'
      },
      {
        label: 'banner.jpg',
        icon: 'image',
        action: 'preview',
        id: 'banner-jpg'
      }
    ]
  },
  {
    label: 'Documentation',
    icon: 'article',
    id: 'documentation',
    contextActions: [
      {
        label: 'Generate',
        icon: 'auto_awesome',
        action: 'generate',
        id: 'generate-action'
      },
      {
        label: 'Publish',
        icon: 'publish',
        action: 'publish',
        id: 'publish-action'
      }
    ],
    children: [
      {
        label: 'README.md',
        icon: 'description',
        action: 'edit',
        id: 'readme-md'
      },
      {
        label: 'API.md',
        icon: 'description',
        action: 'edit',
        id: 'api-md'
      }
    ]
  }
];

export const PerParentContextDemo = {
  args: {
    items: perParentItems,
    contextActions: [] // Global actions are empty, per-parent actions are used
  },
  render: (args: any) => html`
    <div style="max-width: 450px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Per-Parent Context Actions</h4>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Each parent folder defines its own set of context actions for its children, providing specialized functionality based on content type.
      </p>
      <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-on-surface);">Context Actions by Folder:</h5>
        <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          <li><strong>Source Code:</strong> Build, Test, Deploy</li>
          <li><strong>Assets:</strong> Optimize, Compress</li>
          <li><strong>Documentation:</strong> Generate, Publish</li>
        </ul>
      </div>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        @childAction=${(e: CustomEvent) => action('Per-Parent - Child Action')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Per-Parent - Context Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Per-Parent - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Per-Parent - Contract')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Advanced Event Handling
// ==============================================

export const EventHandlingDemo = {
  args: {
    items: sampleItems,
    contextActions: standardContextActions,
    debug: true
  },
  render: (args: any) => html`
    <div style="max-width: 500px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Event Handling & Debug Mode</h4>
      <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-color-warning-container); color: var(--spectrum-color-on-warning-container); border-radius: 8px;">
        <h5 style="margin: 0 0 0.5rem 0;">📝 Debug Mode Active</h5>
        <p style="margin: 0; font-size: 0.9rem;">Check the browser console to see detailed logs of all component interactions and event flow.</p>
      </div>
      
      <div style="margin-bottom: 2rem; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-color-on-surface);">Available Events:</h5>
        <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.6; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          <li><strong>childAction:</strong> Emitted when leaf items are clicked</li>
          <li><strong>expandAction:</strong> Emitted when parent items are expanded</li>
          <li><strong>contractAction:</strong> Emitted when parent items are collapsed</li>
          <li><strong>contextAction:</strong> Emitted when context menu actions are selected</li>
          <li><strong>itemRenamed:</strong> Emitted when items are renamed through context menu</li>
        </ul>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .debug=${args.debug}
        @childAction=${(e: CustomEvent) => {
          action('Event - Child Action')(e.detail);
          console.log('🎯 Child Action:', e.detail);
        }}
        @expandAction=${(e: CustomEvent) => {
          action('Event - Expand Action')(e.detail);
          console.log('📂 Expand Action:', e.detail);
        }}
        @contractAction=${(e: CustomEvent) => {
          action('Event - Contract Action')(e.detail);
          console.log('📁 Contract Action:', e.detail);
        }}
        @contextAction=${(e: CustomEvent) => {
          action('Event - Context Action')(e.detail);
          console.log('⚡ Context Action:', e.detail);
        }}
        @itemRenamed=${(e: CustomEvent) => {
          action('Event - Item Renamed')(e.detail);
          console.log('✏️ Item Renamed:', e.detail);
        }}
      ></spectrum-collapsible-list>
    </div>
  `
}; 