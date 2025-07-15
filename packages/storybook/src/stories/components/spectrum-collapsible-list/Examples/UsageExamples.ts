import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// File Manager Application
// ==============================================

export const fileManagerStructure = [
  {
    label: 'Documents',
    icon: 'folder',
    id: 'documents',
    expanded: true,
    children: [
      {
        label: 'Contracts',
        icon: 'folder',
        id: 'contracts',
        children: [
          {
            label: 'Service Agreement 2024.pdf',
            icon: 'picture_as_pdf',
            action: 'open',
            id: 'service-agreement'
          },
          {
            label: 'NDA Template.docx',
            icon: 'description',
            action: 'open',
            id: 'nda-template'
          }
        ]
      },
      {
        label: 'Reports',
        icon: 'folder',
        id: 'reports',
        children: [
          {
            label: 'Q1 Financial Report.xlsx',
            icon: 'table_chart',
            action: 'open',
            id: 'q1-report'
          },
          {
            label: 'User Analytics.pdf',
            icon: 'analytics',
            action: 'open',
            id: 'user-analytics'
          },
          {
            label: 'Performance Metrics.pptx',
            icon: 'slideshow',
            action: 'open',
            id: 'performance-metrics'
          }
        ]
      }
    ]
  },
  {
    label: 'Media',
    icon: 'folder',
    id: 'media',
    children: [
      {
        label: 'Images',
        icon: 'folder',
        id: 'images',
        children: [
          {
            label: 'logo-light.svg',
            icon: 'image',
            action: 'preview',
            id: 'logo-light'
          },
          {
            label: 'logo-dark.svg',
            icon: 'image',
            action: 'preview',
            id: 'logo-dark'
          },
          {
            label: 'hero-banner.jpg',
            icon: 'image',
            action: 'preview',
            id: 'hero-banner'
          }
        ]
      },
      {
        label: 'Videos',
        icon: 'folder',
        id: 'videos',
        children: [
          {
            label: 'product-demo.mp4',
            icon: 'movie',
            action: 'play',
            id: 'product-demo'
          },
          {
            label: 'tutorial-intro.mp4',
            icon: 'movie',
            action: 'play',
            id: 'tutorial-intro'
          }
        ]
      }
    ]
  },
  {
    label: 'Archive',
    icon: 'folder',
    id: 'archive',
    children: [
      {
        label: '2023-backup.zip',
        icon: 'archive',
        action: 'download',
        id: 'backup-2023'
      },
      {
        label: 'old-project-files.tar.gz',
        icon: 'archive',
        action: 'download',
        id: 'old-project'
      }
    ]
  }
];

export const fileManagerActions = [
  {
    label: 'Open',
    icon: 'open_in_new',
    action: 'open',
    id: 'open-action'
  },
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
    label: 'Move to Trash',
    icon: 'delete',
    action: 'trash',
    id: 'trash-action'
  }
];

export const FileManagerApp = {
  args: {
    items: fileManagerStructure,
    contextActions: fileManagerActions,
    mutuallyExclusive: false
  },
  render: (args: any) => html`
    <div style="max-width: 600px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <span class="material-symbols-outlined" style="font-size: 1.5rem; color: var(--spectrum-color-primary);">folder_open</span>
        <div>
          <h3 style="margin: 0; color: var(--spectrum-color-on-surface);">File Manager</h3>
          <p style="margin: 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Organize and manage your files efficiently</p>
        </div>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('File Manager - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('File Manager - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('File Manager - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('File Manager - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('File Manager - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Project Management Dashboard
// ==============================================

export const projectDashboardStructure = [
  {
    label: 'Active Projects',
    icon: 'work_outline',
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
        label: 'Mobile App Development',
        icon: 'phone_android',
        action: 'open-project',
        id: 'mobile-app'
      },
      {
        label: 'API Integration',
        icon: 'api',
        action: 'open-project',
        id: 'api-integration'
      },
      {
        label: 'Database Migration',
        icon: 'storage',
        action: 'open-project',
        id: 'db-migration'
      }
    ]
  },
  {
    label: 'In Review',
    icon: 'rate_review',
    id: 'in-review',
    children: [
      {
        label: 'Security Audit',
        icon: 'security',
        action: 'review-project',
        id: 'security-audit'
      },
      {
        label: 'Performance Testing',
        icon: 'speed',
        action: 'review-project',
        id: 'performance-testing'
      }
    ]
  },
  {
    label: 'On Hold',
    icon: 'pause_circle_outline',
    id: 'on-hold',
    children: [
      {
        label: 'Legacy System Update',
        icon: 'system_update',
        action: 'view-project',
        id: 'legacy-update'
      },
      {
        label: 'Third-party Integration',
        icon: 'extension',
        action: 'view-project',
        id: 'third-party'
      }
    ]
  },
  {
    label: 'Completed',
    icon: 'task_alt',
    id: 'completed',
    children: [
      {
        label: 'User Authentication System',
        icon: 'lock',
        action: 'view-completed',
        id: 'auth-system'
      },
      {
        label: 'Payment Gateway',
        icon: 'payment',
        action: 'view-completed',
        id: 'payment-gateway'
      },
      {
        label: 'Email Notification Service',
        icon: 'email',
        action: 'view-completed',
        id: 'email-service'
      },
      {
        label: 'Analytics Dashboard',
        icon: 'analytics',
        action: 'view-completed',
        id: 'analytics-dashboard'
      }
    ]
  }
];

export const projectManagementActions = [
  {
    label: 'View Project',
    icon: 'visibility',
    action: 'view-project',
    id: 'view-project-action'
  },
  {
    label: 'Edit Details',
    icon: 'edit',
    action: 'edit-project',
    id: 'edit-project-action'
  },
  {
    label: 'Change Status',
    icon: 'swap_horiz',
    action: 'change-status',
    id: 'change-status-action'
  },
  {
    label: 'Assign Team',
    icon: 'group_add',
    action: 'assign-team',
    id: 'assign-team-action'
  },
  {
    label: 'Duplicate Project',
    icon: 'content_copy',
    action: 'duplicate-project',
    id: 'duplicate-project-action'
  },
  {
    label: 'Archive',
    icon: 'archive',
    action: 'archive-project',
    id: 'archive-project-action'
  }
];

export const ProjectDashboard = {
  args: {
    items: projectDashboardStructure,
    contextActions: projectManagementActions,
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 700px;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, var(--spectrum-color-primary-container) 0%, var(--spectrum-color-secondary-container) 100%); border-radius: 12px;">
        <span class="material-symbols-outlined" style="font-size: 2rem; color: var(--spectrum-color-on-primary-container);">dashboard</span>
        <div>
          <h3 style="margin: 0; color: var(--spectrum-color-on-primary-container);">Project Management Dashboard</h3>
          <p style="margin: 0; color: var(--spectrum-color-on-primary-container); opacity: 0.8; font-size: 0.9rem;">Track and manage all your projects by status</p>
        </div>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Project Dashboard - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Project Dashboard - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Project Dashboard - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Project Dashboard - Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Knowledge Base / Documentation
// ==============================================

export const knowledgeBaseStructure = [
  {
    label: 'Getting Started',
    icon: 'rocket_launch',
    id: 'getting-started',
    expanded: true,
    children: [
      {
        label: 'Quick Start Guide',
        icon: 'flash_on',
        action: 'view-article',
        id: 'quick-start'
      },
      {
        label: 'Installation Instructions',
        icon: 'download',
        action: 'view-article',
        id: 'installation'
      },
      {
        label: 'Basic Configuration',
        icon: 'settings',
        action: 'view-article',
        id: 'basic-config'
      },
      {
        label: 'First Steps Tutorial',
        icon: 'school',
        action: 'view-article',
        id: 'first-steps'
      }
    ]
  },
  {
    label: 'User Guides',
    icon: 'menu_book',
    id: 'user-guides',
    children: [
      {
        label: 'Dashboard Overview',
        icon: 'dashboard',
        action: 'view-article',
        id: 'dashboard-overview'
      },
      {
        label: 'Creating Projects',
        icon: 'add_box',
        action: 'view-article',
        id: 'creating-projects'
      },
      {
        label: 'Team Management',
        icon: 'groups',
        action: 'view-article',
        id: 'team-management'
      },
      {
        label: 'Reporting Features',
        icon: 'assessment',
        action: 'view-article',
        id: 'reporting'
      },
      {
        label: 'Advanced Settings',
        icon: 'tune',
        action: 'view-article',
        id: 'advanced-settings'
      }
    ]
  },
  {
    label: 'API Documentation',
    icon: 'code',
    id: 'api-docs',
    children: [
      {
        label: 'Authentication',
        icon: 'verified_user',
        action: 'view-api-doc',
        id: 'api-auth'
      },
      {
        label: 'REST Endpoints',
        icon: 'api',
        action: 'view-api-doc',
        id: 'rest-endpoints'
      },
      {
        label: 'WebSocket Events',
        icon: 'wifi',
        action: 'view-api-doc',
        id: 'websocket-events'
      },
      {
        label: 'Rate Limiting',
        icon: 'speed',
        action: 'view-api-doc',
        id: 'rate-limiting'
      },
      {
        label: 'Error Codes',
        icon: 'error',
        action: 'view-api-doc',
        id: 'error-codes'
      }
    ]
  },
  {
    label: 'Troubleshooting',
    icon: 'build',
    id: 'troubleshooting',
    children: [
      {
        label: 'Common Issues',
        icon: 'help',
        action: 'view-article',
        id: 'common-issues'
      },
      {
        label: 'Connection Problems',
        icon: 'wifi_off',
        action: 'view-article',
        id: 'connection-problems'
      },
      {
        label: 'Performance Issues',
        icon: 'trending_down',
        action: 'view-article',
        id: 'performance-issues'
      },
      {
        label: 'Security Concerns',
        icon: 'shield',
        action: 'view-article',
        id: 'security-concerns'
      }
    ]
  },
  {
    label: 'FAQ',
    icon: 'quiz',
    id: 'faq',
    children: [
      {
        label: 'Billing Questions',
        icon: 'receipt',
        action: 'view-faq',
        id: 'billing-faq'
      },
      {
        label: 'Account Management',
        icon: 'account_circle',
        action: 'view-faq',
        id: 'account-faq'
      },
      {
        label: 'Feature Requests',
        icon: 'lightbulb',
        action: 'view-faq',
        id: 'feature-requests'
      }
    ]
  }
];

export const knowledgeBaseActions = [
  {
    label: 'Read Article',
    icon: 'article',
    action: 'read',
    id: 'read-action'
  },
  {
    label: 'Bookmark',
    icon: 'bookmark_add',
    action: 'bookmark',
    id: 'bookmark-action'
  },
  {
    label: 'Share Link',
    icon: 'share',
    action: 'share-link',
    id: 'share-link-action'
  },
  {
    label: 'Print',
    icon: 'print',
    action: 'print',
    id: 'print-action'
  },
  {
    label: 'Report Issue',
    icon: 'bug_report',
    action: 'report-issue',
    id: 'report-issue-action'
  }
];

export const KnowledgeBase = {
  args: {
    items: knowledgeBaseStructure,
    contextActions: knowledgeBaseActions,
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 600px;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1.5rem; background: var(--spectrum-color-surface-variant); border-radius: 8px; border-left: 4px solid var(--spectrum-color-primary);">
        <span class="material-symbols-outlined" style="font-size: 1.8rem; color: var(--spectrum-color-primary);">library_books</span>
        <div>
          <h3 style="margin: 0; color: var(--spectrum-color-on-surface);">Knowledge Base</h3>
          <p style="margin: 0; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">Find answers, guides, and documentation</p>
        </div>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Knowledge Base - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Knowledge Base - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Knowledge Base - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Knowledge Base - Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// E-commerce Category Navigation
// ==============================================

export const ecommerceStructure = [
  {
    label: 'Electronics',
    icon: 'devices',
    id: 'electronics',
    children: [
      {
        label: 'Smartphones',
        icon: 'smartphone',
        action: 'browse-category',
        id: 'smartphones'
      },
      {
        label: 'Laptops',
        icon: 'laptop',
        action: 'browse-category',
        id: 'laptops'
      },
      {
        label: 'Tablets',
        icon: 'tablet',
        action: 'browse-category',
        id: 'tablets'
      },
      {
        label: 'Smart Watches',
        icon: 'watch',
        action: 'browse-category',
        id: 'smart-watches'
      },
      {
        label: 'Headphones',
        icon: 'headphones',
        action: 'browse-category',
        id: 'headphones'
      }
    ]
  },
  {
    label: 'Clothing & Fashion',
    icon: 'checkroom',
    id: 'clothing',
    children: [
      {
        label: "Men's Clothing",
        icon: 'man',
        action: 'browse-category',
        id: 'mens-clothing'
      },
      {
        label: "Women's Clothing",
        icon: 'woman',
        action: 'browse-category',
        id: 'womens-clothing'
      },
      {
        label: 'Shoes',
        icon: 'shoes',
        action: 'browse-category',
        id: 'shoes'
      },
      {
        label: 'Accessories',
        icon: 'diamond',
        action: 'browse-category',
        id: 'accessories'
      }
    ]
  },
  {
    label: 'Home & Garden',
    icon: 'home',
    id: 'home-garden',
    children: [
      {
        label: 'Furniture',
        icon: 'chair',
        action: 'browse-category',
        id: 'furniture'
      },
      {
        label: 'Kitchen Appliances',
        icon: 'kitchen',
        action: 'browse-category',
        id: 'kitchen'
      },
      {
        label: 'Garden Tools',
        icon: 'yard',
        action: 'browse-category',
        id: 'garden-tools'
      },
      {
        label: 'Home Decor',
        icon: 'palette',
        action: 'browse-category',
        id: 'home-decor'
      }
    ]
  },
  {
    label: 'Sports & Outdoors',
    icon: 'sports_soccer',
    id: 'sports',
    children: [
      {
        label: 'Fitness Equipment',
        icon: 'fitness_center',
        action: 'browse-category',
        id: 'fitness'
      },
      {
        label: 'Outdoor Gear',
        icon: 'hiking',
        action: 'browse-category',
        id: 'outdoor-gear'
      },
      {
        label: 'Sports Apparel',
        icon: 'sports',
        action: 'browse-category',
        id: 'sports-apparel'
      }
    ]
  },
  {
    label: 'Books & Media',
    icon: 'menu_book',
    id: 'books-media',
    children: [
      {
        label: 'Books',
        icon: 'book',
        action: 'browse-category',
        id: 'books'
      },
      {
        label: 'Movies & TV',
        icon: 'movie',
        action: 'browse-category',
        id: 'movies-tv'
      },
      {
        label: 'Music',
        icon: 'music_note',
        action: 'browse-category',
        id: 'music'
      },
      {
        label: 'Games',
        icon: 'sports_esports',
        action: 'browse-category',
        id: 'games'
      }
    ]
  }
];

export const ecommerceActions = [
  {
    label: 'View Category',
    icon: 'visibility',
    action: 'view-category',
    id: 'view-category-action'
  },
  {
    label: 'Add to Wishlist',
    icon: 'favorite_border',
    action: 'add-wishlist',
    id: 'add-wishlist-action'
  },
  {
    label: 'Compare Products',
    icon: 'compare',
    action: 'compare',
    id: 'compare-action'
  },
  {
    label: 'Set Alert',
    icon: 'notifications',
    action: 'set-alert',
    id: 'set-alert-action'
  }
];

export const EcommerceNavigation = {
  args: {
    items: ecommerceStructure,
    contextActions: ecommerceActions,
    mutuallyExclusive: true
  },
  render: (args: any) => html`
    <div style="max-width: 500px;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
        <span class="material-symbols-outlined" style="font-size: 1.8rem;">storefront</span>
        <div>
          <h3 style="margin: 0;">Product Categories</h3>
          <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Browse our extensive product catalog</p>
        </div>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('E-commerce - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('E-commerce - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('E-commerce - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('E-commerce - Context Action')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
};

// ==============================================
// Code Repository Browser
// ==============================================

export const repositoryStructure = [
  {
    label: 'src',
    icon: 'folder',
    id: 'src',
    expanded: true,
    children: [
      {
        label: 'components',
        icon: 'folder',
        id: 'components',
        children: [
          {
            label: 'Header.tsx',
            icon: 'code',
            action: 'edit-file',
            id: 'header-tsx'
          },
          {
            label: 'Navigation.tsx',
            icon: 'code',
            action: 'edit-file',
            id: 'navigation-tsx'
          },
          {
            label: 'Footer.tsx',
            icon: 'code',
            action: 'edit-file',
            id: 'footer-tsx'
          },
          {
            label: 'Button.tsx',
            icon: 'code',
            action: 'edit-file',
            id: 'button-tsx'
          }
        ]
      },
      {
        label: 'pages',
        icon: 'folder',
        id: 'pages',
        children: [
          {
            label: 'Home.tsx',
            icon: 'web',
            action: 'edit-file',
            id: 'home-tsx'
          },
          {
            label: 'About.tsx',
            icon: 'web',
            action: 'edit-file',
            id: 'about-tsx'
          },
          {
            label: 'Contact.tsx',
            icon: 'web',
            action: 'edit-file',
            id: 'contact-tsx'
          }
        ]
      },
      {
        label: 'utils',
        icon: 'folder',
        id: 'utils',
        children: [
          {
            label: 'api.ts',
            icon: 'functions',
            action: 'edit-file',
            id: 'api-ts'
          },
          {
            label: 'helpers.ts',
            icon: 'functions',
            action: 'edit-file',
            id: 'helpers-ts'
          },
          {
            label: 'constants.ts',
            icon: 'settings',
            action: 'edit-file',
            id: 'constants-ts'
          }
        ]
      },
      {
        label: 'styles',
        icon: 'folder',
        id: 'styles',
        children: [
          {
            label: 'globals.css',
            icon: 'css',
            action: 'edit-file',
            id: 'globals-css'
          },
          {
            label: 'variables.css',
            icon: 'css',
            action: 'edit-file',
            id: 'variables-css'
          }
        ]
      }
    ]
  },
  {
    label: 'tests',
    icon: 'folder',
    id: 'tests',
    children: [
      {
        label: 'components.test.tsx',
        icon: 'bug_report',
        action: 'run-test',
        id: 'components-test'
      },
      {
        label: 'utils.test.ts',
        icon: 'bug_report',
        action: 'run-test',
        id: 'utils-test'
      }
    ]
  },
  {
    label: 'docs',
    icon: 'folder',
    id: 'docs',
    children: [
      {
        label: 'README.md',
        icon: 'description',
        action: 'view-file',
        id: 'readme-md'
      },
      {
        label: 'API.md',
        icon: 'description',
        action: 'view-file',
        id: 'api-md'
      },
      {
        label: 'CONTRIBUTING.md',
        icon: 'description',
        action: 'view-file',
        id: 'contributing-md'
      }
    ]
  }
];

export const repositoryActions = [
  {
    label: 'Open File',
    icon: 'open_in_new',
    action: 'open-file',
    id: 'open-file-action'
  },
  {
    label: 'Edit',
    icon: 'edit',
    action: 'edit',
    id: 'edit-action'
  },
  {
    label: 'View History',
    icon: 'history',
    action: 'view-history',
    id: 'view-history-action'
  },
  {
    label: 'Blame',
    icon: 'person',
    action: 'blame',
    id: 'blame-action'
  },
  {
    label: 'Raw',
    icon: 'code',
    action: 'view-raw',
    id: 'view-raw-action'
  },
  {
    label: 'Download',
    icon: 'download',
    action: 'download',
    id: 'download-action'
  }
];

export const CodeRepository = {
  args: {
    items: repositoryStructure,
    contextActions: repositoryActions,
    mutuallyExclusive: false
  },
  render: (args: any) => html`
    <div style="max-width: 600px;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding: 1.5rem; background: #24292e; color: white; border-radius: 8px;">
        <span class="material-symbols-outlined" style="font-size: 1.8rem;">folder_open</span>
        <div>
          <h3 style="margin: 0;">Repository Browser</h3>
          <p style="margin: 0; opacity: 0.8; font-size: 0.9rem;">my-awesome-project / main</p>
        </div>
        <div style="margin-left: auto; display: flex; gap: 0.5rem;">
          <span style="background: #28a745; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">✓ 127 commits</span>
          <span style="background: #17a2b8; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">★ 23</span>
        </div>
      </div>
      
      <spectrum-collapsible-list
        .items=${args.items}
        .contextActions=${args.contextActions}
        .mutuallyExclusive=${args.mutuallyExclusive}
        @childAction=${(e: CustomEvent) => action('Repository - Child Action')(e.detail)}
        @expandAction=${(e: CustomEvent) => action('Repository - Expand')(e.detail)}
        @contractAction=${(e: CustomEvent) => action('Repository - Contract')(e.detail)}
        @contextAction=${(e: CustomEvent) => action('Repository - Context Action')(e.detail)}
        @itemRenamed=${(e: CustomEvent) => action('Repository - Item Renamed')(e.detail)}
      ></spectrum-collapsible-list>
    </div>
  `
}; 