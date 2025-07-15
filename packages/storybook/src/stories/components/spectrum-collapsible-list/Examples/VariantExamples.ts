import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// File System Variants
// ==============================================

export const fileSystemStructure = [
  {
    label: 'src',
    icon: 'folder',
    id: 'src-root',
    expanded: true,
    children: [
      {
        label: 'components',
        icon: 'folder',
        id: 'components-folder',
        children: [
          {
            label: 'Button.tsx',
            icon: 'code',
            action: 'edit',
            id: 'button-component'
          },
          {
            label: 'Input.tsx',
            icon: 'code',
            action: 'edit',
            id: 'input-component'
          },
          {
            label: 'Modal.tsx',
            icon: 'code',
            action: 'edit',
            id: 'modal-component'
          }
        ]
      },
      {
        label: 'pages',
        icon: 'folder',
        id: 'pages-folder',
        children: [
          {
            label: 'Home.tsx',
            icon: 'web',
            action: 'edit',
            id: 'home-page'
          },
          {
            label: 'About.tsx',
            icon: 'web',
            action: 'edit',
            id: 'about-page'
          }
        ]
      },
      {
        label: 'utils',
        icon: 'folder',
        id: 'utils-folder',
        children: [
          {
            label: 'helpers.ts',
            icon: 'functions',
            action: 'edit',
            id: 'helpers-util'
          },
          {
            label: 'constants.ts',
            icon: 'settings',
            action: 'edit',
            id: 'constants-util'
          }
        ]
      }
    ]
  },
  {
    label: 'public',
    icon: 'folder',
    id: 'public-root',
    children: [
      {
        label: 'index.html',
        icon: 'html',
        action: 'edit',
        id: 'index-html'
      },
      {
        label: 'favicon.ico',
        icon: 'image',
        action: 'view',
        id: 'favicon'
      }
    ]
  },
  {
    label: 'package.json',
    icon: 'settings',
    action: 'edit',
    id: 'package-json'
  }
];

export const fileSystemContextActions = [
  {
    label: 'Open',
    icon: 'open_in_new',
    action: 'open',
    id: 'open-action'
  },
  {
    label: 'Edit',
    icon: 'edit',
    action: 'edit',
    id: 'edit-action'
  },
  {
    label: 'Copy Path',
    icon: 'content_copy',
    action: 'copy-path',
    id: 'copy-path-action'
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
// Navigation Menu Variants
// ==============================================

export const navigationStructure = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    id: 'dashboard',
    children: [
      {
        label: 'Analytics',
        icon: 'analytics',
        action: 'navigate',
        id: 'analytics'
      },
      {
        label: 'Reports',
        icon: 'assessment',
        action: 'navigate',
        id: 'reports'
      },
      {
        label: 'Metrics',
        icon: 'bar_chart',
        action: 'navigate',
        id: 'metrics'
      }
    ]
  },
  {
    label: 'Users',
    icon: 'people',
    id: 'users',
    children: [
      {
        label: 'All Users',
        icon: 'group',
        action: 'navigate',
        id: 'all-users'
      },
      {
        label: 'Roles',
        icon: 'admin_panel_settings',
        action: 'navigate',
        id: 'roles'
      },
      {
        label: 'Permissions',
        icon: 'security',
        action: 'navigate',
        id: 'permissions'
      }
    ]
  },
  {
    label: 'Content',
    icon: 'article',
    id: 'content',
    children: [
      {
        label: 'Articles',
        icon: 'description',
        action: 'navigate',
        id: 'articles'
      },
      {
        label: 'Media',
        icon: 'perm_media',
        action: 'navigate',
        id: 'media'
      },
      {
        label: 'Categories',
        icon: 'category',
        action: 'navigate',
        id: 'categories'
      }
    ]
  },
  {
    label: 'Settings',
    icon: 'settings',
    id: 'settings',
    children: [
      {
        label: 'General',
        icon: 'tune',
        action: 'navigate',
        id: 'general-settings'
      },
      {
        label: 'Security',
        icon: 'shield',
        action: 'navigate',
        id: 'security-settings'
      },
      {
        label: 'Integrations',
        icon: 'extension',
        action: 'navigate',
        id: 'integrations'
      }
    ]
  }
];

export const navigationContextActions = [
  {
    label: 'Add to Favorites',
    icon: 'favorite',
    action: 'favorite',
    id: 'favorite-action'
  },
  {
    label: 'Quick Access',
    icon: 'flash_on',
    action: 'quick-access',
    id: 'quick-access-action'
  },
  {
    label: 'Configure',
    icon: 'settings',
    action: 'configure',
    id: 'configure-action'
  }
];

// ==============================================
// Project Organization Variants
// ==============================================

export const projectStructure = [
  {
    label: 'Active Projects',
    icon: 'work',
    id: 'active-projects',
    expanded: true,
    children: [
      {
        label: 'Website Redesign',
        icon: 'web',
        action: 'open-project',
        id: 'website-redesign'
      },
      {
        label: 'Mobile App',
        icon: 'phone_android',
        action: 'open-project',
        id: 'mobile-app'
      },
      {
        label: 'API Development',
        icon: 'api',
        action: 'open-project',
        id: 'api-development'
      }
    ]
  },
  {
    label: 'On Hold',
    icon: 'pause_circle',
    id: 'on-hold-projects',
    children: [
      {
        label: 'Legacy Migration',
        icon: 'cloud_sync',
        action: 'open-project',
        id: 'legacy-migration'
      },
      {
        label: 'Data Analytics',
        icon: 'analytics',
        action: 'open-project',
        id: 'data-analytics'
      }
    ]
  },
  {
    label: 'Completed',
    icon: 'check_circle',
    id: 'completed-projects',
    children: [
      {
        label: 'User Authentication',
        icon: 'lock',
        action: 'view-project',
        id: 'user-auth'
      },
      {
        label: 'Payment System',
        icon: 'payment',
        action: 'view-project',
        id: 'payment-system'
      },
      {
        label: 'Email Templates',
        icon: 'email',
        action: 'view-project',
        id: 'email-templates'
      }
    ]
  }
];

export const projectContextActions = [
  {
    label: 'View Details',
    icon: 'info',
    action: 'view-details',
    id: 'view-details-action'
  },
  {
    label: 'Edit Project',
    icon: 'edit',
    action: 'edit-project',
    id: 'edit-project-action'
  },
  {
    label: 'Clone Project',
    icon: 'content_copy',
    action: 'clone-project',
    id: 'clone-project-action'
  },
  {
    label: 'Archive',
    icon: 'archive',
    action: 'archive-project',
    id: 'archive-project-action'
  },
  {
    label: 'Delete',
    icon: 'delete',
    action: 'delete-project',
    id: 'delete-project-action'
  }
];

// ==============================================
// Variant Examples
// ==============================================

export const FileSystemVariant = {
  args: {
    items: fileSystemStructure,
    contextActions: fileSystemContextActions,
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 400px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">File System Explorer</h4>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Hierarchical file and folder structure with context actions for file operations.
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('File System - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('File System - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('File System - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('File System - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('File System - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

export const NavigationVariant = {
  args: {
    items: navigationStructure,
    contextActions: navigationContextActions,
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 350px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Admin Navigation</h4>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Multi-level navigation menu for admin dashboard with contextual actions.
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Navigation - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Navigation - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Navigation - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Navigation - Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

export const ProjectVariant = {
  args: {
    items: projectStructure,
    contextActions: projectContextActions,
    mutuallyExclusive: false
  },
  render: (args: any) => html`
    <div style="max-width: 450px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Project Management</h4>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Project organization by status with comprehensive management actions. Multiple sections can be expanded.
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Project - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Project - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Project - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Project - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('Project - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Deep Hierarchy Variant
// ==============================================

export const deepHierarchyStructure = [
  {
    label: 'Level 1',
    icon: 'folder',
    id: 'level-1',
    children: [
      {
        label: 'Level 2A',
        icon: 'folder',
        id: 'level-2a',
        children: [
          {
            label: 'Level 3A',
            icon: 'folder',
            id: 'level-3a',
            children: [
              {
                label: 'Deep Item 1',
                icon: 'description',
                action: 'open',
                id: 'deep-item-1'
              },
              {
                label: 'Deep Item 2',
                icon: 'description',
                action: 'open',
                id: 'deep-item-2'
              }
            ]
          },
          {
            label: 'Level 3B',
            icon: 'folder',
            id: 'level-3b',
            children: [
              {
                label: 'Deep Item 3',
                icon: 'description',
                action: 'open',
                id: 'deep-item-3'
              }
            ]
          }
        ]
      },
      {
        label: 'Level 2B',
        icon: 'folder',
        id: 'level-2b',
        children: [
          {
            label: 'Another Deep Item',
            icon: 'description',
            action: 'open',
            id: 'another-deep-item'
          }
        ]
      }
    ]
  }
];

export const DeepHierarchyVariant = {
  args: {
    items: deepHierarchyStructure,
    contextActions: [
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
    ],
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 350px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Deep Hierarchy</h4>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Multi-level nested structure demonstrating deep hierarchical navigation.
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Deep - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Deep - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Deep - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Deep - Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Mixed Content Variant
// ==============================================

export const mixedContentStructure = [
  {
    label: 'Documents',
    icon: 'folder',
    id: 'docs-folder',
    children: [
      {
        label: 'Report.pdf',
        icon: 'picture_as_pdf',
        action: 'open',
        id: 'report-pdf'
      },
      {
        label: 'Presentation.pptx',
        icon: 'slideshow',
        action: 'open',
        id: 'presentation-pptx'
      }
    ]
  },
  {
    label: 'Media',
    icon: 'folder',
    id: 'media-folder',
    children: [
      {
        label: 'logo.svg',
        icon: 'image',
        action: 'preview',
        id: 'logo-svg'
      },
      {
        label: 'video.mp4',
        icon: 'movie',
        action: 'play',
        id: 'video-mp4'
      },
      {
        label: 'audio.mp3',
        icon: 'audiotrack',
        action: 'play',
        id: 'audio-mp3'
      }
    ]
  },
  {
    label: 'Code',
    icon: 'folder',
    id: 'code-folder',
    children: [
      {
        label: 'main.js',
        icon: 'code',
        action: 'edit',
        id: 'main-js'
      },
      {
        label: 'styles.css',
        icon: 'css',
        action: 'edit',
        id: 'styles-css'
      },
      {
        label: 'config.json',
        icon: 'data_object',
        action: 'edit',
        id: 'config-json'
      }
    ]
  }
];

export const MixedContentVariant = {
  args: {
    items: mixedContentStructure,
    contextActions: [
      {
        label: 'Open',
        icon: 'open_in_new',
        action: 'open',
        id: 'open-action'
      },
      {
        label: 'Share',
        icon: 'share',
        action: 'share',
        id: 'share-action'
      },
      {
        label: 'Download',
        icon: 'download',
        action: 'download',
        id: 'download-action'
      },
      {
        label: 'Rename',
        icon: 'drive_file_rename_outline',
        action: 'rename',
        id: 'rename-action'
      }
    ],
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 400px;">
      <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Mixed Content Types</h4>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
        Various file types with appropriate icons and actions for different content.
      </p>
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Mixed - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Mixed - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Mixed - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Mixed - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('Mixed - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// All Variants Showcase
// ==============================================

export const AllVariantsShowcase = {
  args: {},
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
      
      <div>
        ${FileSystemVariant.render(FileSystemVariant.args)}
      </div>
      
      <div>
        ${NavigationVariant.render(NavigationVariant.args)}
      </div>
      
      <div>
        ${ProjectVariant.render(ProjectVariant.args)}
      </div>
      
      <div>
        ${MixedContentVariant.render(MixedContentVariant.args)}
      </div>
      
    </div>
  `
}; 