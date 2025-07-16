import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## Spectrum Collapsible List Component
 * 
 * A sophisticated hierarchical list component that provides expandable/collapsible navigation structures with comprehensive
 * event handling, context menus, and accessibility support. The collapsible list is essential for building file explorers,
 * navigation systems, and any interface requiring hierarchical data presentation.
 * 
 * ### Key Features
 * - **5 Event Types**: childAction, expandAction, contractAction, contextAction, and itemRenamed with action attributes
 * - **Hierarchical Structure**: Unlimited nesting levels with parent/child relationships
 * - **Context Menu Integration**: Right-click actions with customizable menu items for leaf nodes
 * - **Real-time Filtering**: Built-in text search with preserved parent structure
 * - **Expansion Modes**: Mutually exclusive or independent expansion behaviors
 * - **Material Icons**: Support for 900+ Material Design icons on all items
 * - **Accessibility**: Full keyboard navigation, ARIA support, and screen reader compatibility
 * - **TypeScript Support**: Complete interface definitions and type safety
 * 
 * ### Usage Guidelines
 * - Use **File Explorers** for directory structures with folders and files
 * - Use **Navigation Menus** for application sections with grouped pages
 * - Use **Settings Interfaces** for categorized configuration options
 * - Enable **mutuallyExclusive** for accordion-style single-focus navigation
 * - Enable **contextActions** for item management (rename, delete, copy, move)
 * - Use **meaningful action values** that describe the specific operation performed
 * - Provide **unique IDs** for all items to enable proper event tracking
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **childAction**: When a leaf item is clicked - `{ action: string, label: string, id: string }`
 * - **expandAction**: When a parent is expanded - `{ action: "expand", label: string, id: string }`
 * - **contractAction**: When a parent is collapsed - `{ action: "contract", label: string, id: string }`
 * - **contextAction**: When context menu item is selected - `{ action: string, label: string, id: string }`
 * - **itemRenamed**: When an item is renamed - `{ action: "rename", id: string, oldName: string, newName: string }`
 * 
 * ### Component Dependencies
 * 
 * ```mermaid
 * graph TD;
 *   spectrum-rail --> spectrum-collapsible-list
 *   spectrum-collapsible-list --> spectrum-context-menu
 *   spectrum-context-menu -.-> ContextMenuAction[ContextMenuAction Interface]
 *   style spectrum-collapsible-list fill:#f9f,stroke:#333,stroke-width:4px
 *   style spectrum-context-menu fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
 *   style spectrum-rail fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
 * ```
 * 
 * The collapsible list imports the ContextMenuAction interface from spectrum-context-menu and is used by spectrum-rail
 * for navigation structures. It serves as a critical component in the Spectrum navigation ecosystem.
 * 
 * ### Integration Patterns
 * - **Rail Navigation**: Used within spectrum-rail components for sidebar navigation
 * - **Modal Dialogs**: File selection and folder browsing interfaces
 * - **Admin Interfaces**: Hierarchical settings and configuration panels
 * - **Content Management**: Document organization and media library structures
 */

// Component interfaces for TypeScript support
interface CollapsibleListItem {
  label: string;
  icon?: string;
  expanded?: boolean;
  action?: string;
  id: string;
  children?: CollapsibleListItem[];
}

interface ContextAction {
  label: string;
  icon: string;
  action: string;
  id: string;
}

interface SpectrumCollapsibleListElement extends HTMLElement {
  items: CollapsibleListItem[];
  contextActions?: ContextAction[];
  filter?: string;
  mutuallyExclusive?: boolean;
  debug?: boolean;
}

// Story arguments interface
interface SpectrumCollapsibleListArgs extends SpectrumCollapsibleListElement {}

const meta: Meta<SpectrumCollapsibleListArgs> = {
  title: 'Spectrum/Components/SpectrumCollapsibleList',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Spectrum Collapsible List component provides a hierarchical list structure with expandable/collapsible 
functionality, context menus, and comprehensive event handling. It follows the Component Events Rule with 
well-structured events that include action attributes for all interactions.

### Event System
All events include action attributes:
- childAction: When a leaf item is clicked  
- expandAction: When a parent is expanded
- contractAction: When a parent is collapsed
- contextAction: When context menu item is selected

### Basic Usage
Use .items property to provide hierarchical data and listen for events with action attributes.
        `
      }
    }
  },
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
        id: 'documents',
        children: [
          {
            label: 'Report.pdf',
            icon: 'description',
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
        label: 'Images',
        icon: 'folder',
        id: 'images',
        children: [
          {
            label: 'Photo1.jpg',
            icon: 'image',
            action: 'view',
            id: 'photo1-jpg'
          },
          {
            label: 'Photo2.png',
            icon: 'image',
            action: 'view',
            id: 'photo2-png'
          }
        ]
      }
    ],
    contextActions: [
      {
        label: 'Rename',
        icon: 'edit',
        action: 'rename',
        id: 'rename-action'
      },
      {
        label: 'Delete',
        icon: 'delete',
        action: 'delete',
        id: 'delete-action'
      }
    ],
    filter: '',
    mutuallyExclusive: true,
    debug: false
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'The hierarchical data structure for the list. Each item can have children for nested structures.',
      table: {
        type: { 
          summary: 'CollapsibleListItem[]',
          detail: `
            interface CollapsibleListItem {
  label: string;          // Display text for the item
  icon?: string;          // Material Design icon name
  expanded?: boolean;     // Whether parent item starts expanded
  action?: string;        // Action to emit when leaf item is clicked
  id: string;            // Unique identifier for the item
  children?: CollapsibleListItem[]; // Nested child items
            }
          `
        }
      }
    },
    contextActions: {
      control: 'object',
      description: 'Context menu actions available for all leaf nodes. Actions appear on right-click.',
      table: {
        type: { 
          summary: 'ContextAction[]',
          detail: `
            interface ContextAction {
  label: string;    // Display text for context menu item
  icon: string;     // Material Design icon name
  action: string;   // Action value to emit in contextAction event
  id: string;       // Unique identifier for the action
            }
          `
        }
      }
    },
    filter: {
      control: 'text',
      description: 'Filter string to search through list items by label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    mutuallyExclusive: {
      control: 'boolean',
      description: 'When true, expanding one parent collapses other parents at the same level',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show console logs for component interactions',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
} satisfies Meta<SpectrumCollapsibleListArgs>;

export default meta;
type Story = StoryObj<SpectrumCollapsibleListArgs>;

// Interactive render function for playground
const renderCollapsibleList = (args: SpectrumCollapsibleListArgs) => html`
  <div style="width: 400px; height: 500px; margin: 2rem auto; background: var(--spectrum-sys-color-surface); border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <spectrum-collapsible-list
      .items=${args.items}
      .contextActions=${args.contextActions}
      .filter=${args.filter}
      ?mutually-exclusive=${args.mutuallyExclusive}
      ?debug=${args.debug}
      @childAction=${(e: CustomEvent) => action('childAction')(e.detail)}
      @expandAction=${(e: CustomEvent) => action('expandAction')(e.detail)}
      @contractAction=${(e: CustomEvent) => action('contractAction')(e.detail)}
      @contextAction=${(e: CustomEvent) => action('contextAction')(e.detail)}
      @itemRenamed=${(e: CustomEvent) => action('itemRenamed')(e.detail)}
    ></spectrum-collapsible-list>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all collapsible list properties and event handling.
 * Use the controls panel to experiment with different configurations and see how events work.
 * 
 * **Event Testing**: Click items to see childAction events, expand/collapse to see structure events,
 * right-click leaf items to test context actions. All events include action attributes following 
 * the Component Events Rule.
 */
export const Playground: Story = {
  render: renderCollapsibleList,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all list properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.

**Try these interactions:**
- Click leaf items (files) to trigger childAction events with custom actions
- Expand/collapse folders to see expandAction and contractAction events  
- Right-click on files to open context menus and test contextAction events
- Use the filter control to test text filtering
- Toggle mutuallyExclusive to see different expansion behaviors
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic hierarchical list with files and folders structure.
 * Demonstrates the core collapsible functionality with proper event emission.
 */
export const BasicHierarchy: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
        id: 'documents',
        children: [
          {
            label: 'Report.pdf',
            icon: 'description',
            action: 'open',
            id: 'report-pdf'
          },
          {
            label: 'Spreadsheet.xlsx',
            icon: 'table_chart',
            action: 'open',
            id: 'spreadsheet-xlsx'
          }
        ]
      },
      {
        label: 'Images',
        icon: 'folder',
        id: 'images',
        children: [
          {
            label: 'Photo1.jpg',
            icon: 'image',
            action: 'view',
            id: 'photo1-jpg'
          },
          {
            label: 'Photo2.png',
            icon: 'image',
            action: 'view',
            id: 'photo2-png'
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
A basic file explorer structure showing the core collapsible list functionality. 
Parent items (folders) can be expanded/collapsed, and leaf items (files) emit childAction events when clicked.

**Event Structure:**
- \`childAction\`: \`{ action: "open", label: "Report.pdf", id: "report-pdf" }\`
- \`expandAction\`: \`{ action: "expand", label: "Documents", id: "documents" }\`
- \`contractAction\`: \`{ action: "contract", label: "Documents", id: "documents" }\`
        `
      },
      source: {
        code: `<spectrum-collapsible-list
  .items=\${hierarchicalItems}
  @childAction=\${(e) => console.log('File clicked:', e.detail)}
  @expandAction=\${(e) => console.log('Folder expanded:', e.detail)}>
</spectrum-collapsible-list>`
      }
    }
  }
};

/**
 * Single-level list without nested structure.
 * Shows how the component works with flat data structures.
 */
export const SingleLevel: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        action: 'navigate',
        id: 'dashboard'
      },
      {
        label: 'Users',
        icon: 'people',
        action: 'navigate',
        id: 'users'
      },
      {
        label: 'Settings',
        icon: 'settings',
        action: 'navigate',
        id: 'settings'
      },
      {
        label: 'Reports',
        icon: 'assessment',
        action: 'navigate',
        id: 'reports'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
A flat navigation menu without nested items. All items are clickable and emit childAction events.
This pattern is useful for main navigation menus or simple option lists.

**Event Example:** Clicking "Dashboard" emits \`{ action: "navigate", label: "Dashboard", id: "dashboard" }\`
        `
      },
      source: {
        code: `<spectrum-collapsible-list
  .items=\${flatItems}
  @childAction=\${(e) => router.navigate(e.detail.id)}>
</spectrum-collapsible-list>`
      }
    }
  }
};

/**
 * Deep nested structure with multiple levels of hierarchy.
 * Demonstrates complex tree structures and navigation.
 */
export const DeepNesting: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Project Root',
        icon: 'folder',
        expanded: true,
        id: 'project-root',
        children: [
          {
            label: 'src',
            icon: 'folder',
            expanded: true,
            id: 'src',
            children: [
              {
                label: 'components',
                icon: 'folder',
                id: 'components',
                children: [
                  {
                    label: 'Button.tsx',
                    icon: 'code',
                    action: 'open',
                    id: 'button-tsx'
                  },
                  {
                    label: 'List.tsx',
                    icon: 'code',
                    action: 'open',
                    id: 'list-tsx'
              }
            ]
          },
          {
                label: 'utils',
                icon: 'folder',
                id: 'utils',
                children: [
                  {
                    label: 'helpers.ts',
                    icon: 'code',
                    action: 'open',
                    id: 'helpers-ts'
          }
        ]
      }
    ]
  },
          {
            label: 'package.json',
            icon: 'code',
            action: 'open',
            id: 'package-json'
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
A project file structure showing deep nesting capabilities. This demonstrates how the component 
handles complex hierarchies while maintaining clear event structure at each level.

**Multi-level Events:** Each level emits properly structured events with the appropriate action context.
        `
      }
    }
  }
};

// =================================================================
// FEATURE EXAMPLES
// =================================================================

/**
 * Collapsible list with context menu actions for item management.
 * Right-click on leaf items to see context actions in action.
 */
export const WithContextMenu: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'My Files',
        icon: 'folder',
        expanded: true,
        id: 'my-files',
        children: [
          {
            label: 'Document.pdf',
            icon: 'description',
            action: 'open',
            id: 'document-pdf'
          },
          {
            label: 'Presentation.pptx',
            icon: 'slideshow',
            action: 'open',
            id: 'presentation-pptx'
          },
          {
            label: 'Spreadsheet.xlsx',
            icon: 'table_chart',
            action: 'open',
            id: 'spreadsheet-xlsx'
          }
        ]
      }
    ],
    contextActions: [
      {
        label: 'Open',
        icon: 'open_in_new',
        action: 'open',
        id: 'open-action'
      },
      {
        label: 'Rename',
        icon: 'edit',
        action: 'rename',
        id: 'rename-action'
      },
      {
        label: 'Copy',
        icon: 'content_copy',
        action: 'copy',
        id: 'copy-action'
      },
      {
        label: 'Delete',
        icon: 'delete',
        action: 'delete',
        id: 'delete-action'
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
Right-click on any file to open the context menu with management actions. Context actions emit 
\`contextAction\` events with the selected action and target item information.

**Context Event Example:** Right-clicking "Document.pdf" and selecting "Delete" emits:
\`{ action: "delete", label: "Document.pdf", id: "document-pdf" }\`

**Try This:** Right-click on files to see context menu positioning and action handling.
        `
      }
    }
  }
};

/**
 * Demonstrates filtering functionality to search through list items.
 * Type in the filter control to see real-time filtering.
 */
export const WithFiltering: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Development',
        icon: 'folder',
        expanded: true,
        id: 'development',
        children: [
          {
            label: 'React Component.tsx',
            icon: 'code',
            action: 'open',
            id: 'react-component'
          },
          {
            label: 'Vue Component.vue',
            icon: 'code',
            action: 'open',
            id: 'vue-component'
          },
          {
            label: 'Angular Service.ts',
            icon: 'code',
            action: 'open',
            id: 'angular-service'
          }
        ]
      },
      {
        label: 'Documentation',
        icon: 'folder',
        id: 'documentation',
        children: [
          {
            label: 'React Guide.md',
            icon: 'description',
            action: 'open',
            id: 'react-guide'
          },
          {
            label: 'Vue Tutorial.md',
            icon: 'description',
            action: 'open',
            id: 'vue-tutorial'
          },
          {
            label: 'Angular Docs.md',
            icon: 'description',
            action: 'open',
            id: 'angular-docs'
          }
        ]
      }
    ],
    filter: 'React'
  },
  parameters: {
    docs: {
      description: {
        story: `
The filter functionality allows real-time searching through list items. Try changing the filter 
value in the controls to see how it affects the displayed items.

**Filter Behavior:** Only items matching the filter text remain visible, with their parent structure preserved.
        `
      }
    }
  }
};

/**
 * Shows mutually exclusive expansion behavior where only one parent can be expanded at a time.
 * Compare with non-exclusive behavior by toggling the control.
 */
export const MutuallyExclusive: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Section A',
        icon: 'folder',
        expanded: true,
        id: 'section-a',
        children: [
          { label: 'Item A1', icon: 'description', action: 'select', id: 'item-a1' },
          { label: 'Item A2', icon: 'description', action: 'select', id: 'item-a2' }
        ]
      },
          {
        label: 'Section B',
            icon: 'folder',
        id: 'section-b',
        children: [
          { label: 'Item B1', icon: 'description', action: 'select', id: 'item-b1' },
          { label: 'Item B2', icon: 'description', action: 'select', id: 'item-b2' }
        ]
      },
      {
        label: 'Section C',
        icon: 'folder',
        id: 'section-c',
        children: [
          { label: 'Item C1', icon: 'description', action: 'select', id: 'item-c1' },
          { label: 'Item C2', icon: 'description', action: 'select', id: 'item-c2' }
        ]
      }
    ],
    mutuallyExclusive: true
  },
  parameters: {
    docs: {
      description: {
        story: `
With mutually exclusive mode enabled, expanding one section automatically collapses others. 
This creates a focused navigation experience where only one section is open at a time.

**Try This:** 
1. Click "Section B" - notice "Section A" closes automatically
2. Toggle the "mutuallyExclusive" control to false and try again
3. Observe how multiple sections can stay open simultaneously
        `
      }
    }
  }
};

// =================================================================
// VARIANT EXAMPLES  
// =================================================================

/**
 * File management variants showing different icon types and actions.
 * Demonstrates how the component adapts to different content types.
 */
export const FileManagementVariants: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
        id: 'documents',
        children: [
          { label: 'Contract.pdf', icon: 'picture_as_pdf', action: 'open', id: 'contract-pdf' },
          { label: 'Invoice.docx', icon: 'description', action: 'open', id: 'invoice-docx' },
          { label: 'Budget.xlsx', icon: 'table_chart', action: 'open', id: 'budget-xlsx' }
        ]
      },
      {
        label: 'Media',
        icon: 'folder',
        id: 'media',
        children: [
          { label: 'Logo.svg', icon: 'image', action: 'view', id: 'logo-svg' },
          { label: 'Video.mp4', icon: 'movie', action: 'play', id: 'video-mp4' },
          { label: 'Audio.mp3', icon: 'audiotrack', action: 'play', id: 'audio-mp3' }
        ]
      },
      {
        label: 'Code',
        icon: 'folder',
        id: 'code',
        children: [
          { label: 'App.tsx', icon: 'code', action: 'edit', id: 'app-tsx' },
          { label: 'Styles.css', icon: 'css', action: 'edit', id: 'styles-css' },
          { label: 'Config.json', icon: 'data_object', action: 'edit', id: 'config-json' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Different file types with appropriate icons and actions. Shows how the component handles varied content types with semantic icons and meaningful action values.'
      }
    }
  }
};

/**
 * Navigation menu variants for different application sections.
 * Shows consistent navigation patterns with grouped functionality.
 */
export const NavigationVariants: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Analytics',
        icon: 'analytics',
        expanded: true,
        id: 'analytics',
        children: [
          { label: 'Dashboard', icon: 'dashboard', action: 'navigate', id: 'analytics-dashboard' },
          { label: 'Reports', icon: 'assessment', action: 'navigate', id: 'analytics-reports' },
          { label: 'Real-time', icon: 'timeline', action: 'navigate', id: 'analytics-realtime' }
        ]
      },
      {
        label: 'E-commerce',
        icon: 'shopping_cart',
        id: 'ecommerce',
        children: [
          { label: 'Products', icon: 'inventory_2', action: 'navigate', id: 'ecommerce-products' },
          { label: 'Orders', icon: 'receipt_long', action: 'navigate', id: 'ecommerce-orders' },
          { label: 'Customers', icon: 'people', action: 'navigate', id: 'ecommerce-customers' }
        ]
      },
      {
        label: 'Marketing',
        icon: 'campaign',
        id: 'marketing',
        children: [
          { label: 'Campaigns', icon: 'email', action: 'navigate', id: 'marketing-campaigns' },
          { label: 'Social Media', icon: 'share', action: 'navigate', id: 'marketing-social' },
          { label: 'SEO Tools', icon: 'search', action: 'navigate', id: 'marketing-seo' }
        ]
      }
    ],
    mutuallyExclusive: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Application navigation with business domain groupings. Uses mutually exclusive expansion for focused navigation experience.'
      }
    }
  }
};

/**
 * Administrative interface variants with different permission levels.
 * Demonstrates role-based navigation structures.
 */
export const AdminVariants: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'User Management',
        icon: 'admin_panel_settings',
        expanded: true,
        id: 'user-management',
        children: [
          { label: 'Users', icon: 'person', action: 'manage', id: 'users' },
          { label: 'Roles', icon: 'security', action: 'manage', id: 'roles' },
          { label: 'Permissions', icon: 'verified_user', action: 'manage', id: 'permissions' }
        ]
      },
      {
        label: 'System',
        icon: 'settings',
        id: 'system',
        children: [
          { label: 'Configuration', icon: 'tune', action: 'configure', id: 'configuration' },
          { label: 'Monitoring', icon: 'monitor_heart', action: 'view', id: 'monitoring' },
          { label: 'Logs', icon: 'bug_report', action: 'view', id: 'logs' }
        ]
      },
      {
        label: 'Content',
        icon: 'article',
        id: 'content',
        children: [
          { label: 'Pages', icon: 'web', action: 'edit', id: 'pages' },
          { label: 'Media Library', icon: 'perm_media', action: 'manage', id: 'media-library' },
          { label: 'Templates', icon: 'view_quilt', action: 'edit', id: 'templates' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: 'Administrative interface navigation with system management sections. Each section has specific management actions for different admin functions.'
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLES
// =================================================================

/**
 * Accessibility-focused example with proper ARIA labels and keyboard navigation.
 * Demonstrates best practices for screen reader support.
 */
export const AccessibilityExample: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Accessible Navigation',
        icon: 'accessibility',
        expanded: true,
        id: 'accessibility',
        children: [
          { label: 'Keyboard Navigation', icon: 'keyboard', action: 'demo', id: 'keyboard-nav' },
          { label: 'Screen Reader Support', icon: 'record_voice_over', action: 'demo', id: 'screen-reader' },
          { label: 'High Contrast Mode', icon: 'contrast', action: 'demo', id: 'high-contrast' }
        ]
      },
      {
        label: 'ARIA Best Practices',
        icon: 'help_outline',
        id: 'aria',
        children: [
          { label: 'Labels and Descriptions', icon: 'label', action: 'learn', id: 'aria-labels' },
          { label: 'Live Regions', icon: 'announcement', action: 'learn', id: 'aria-live' },
          { label: 'Focus Management', icon: 'center_focus_strong', action: 'learn', id: 'focus-mgmt' }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
**Accessibility Features Demonstrated:**

- **Keyboard Navigation**: Use Tab/Shift+Tab to navigate, Enter/Space to activate, Arrow keys for tree navigation
- **Screen Reader Support**: Proper ARIA roles, labels, and state announcements  
- **Focus Management**: Clear focus indicators and logical focus flow
- **High Contrast**: Component respects system accessibility preferences

**Testing Instructions:**
1. Use Tab key to navigate through the list
2. Use Enter or Space to expand/collapse folders
3. Use Arrow keys for tree-style navigation
4. Enable screen reader to test announcements
        `
      }
    }
  }
};

// =================================================================
// PERFORMANCE EXAMPLES
// =================================================================

/**
 * Large dataset example showing performance with many items.
 * Demonstrates component behavior with substantial hierarchical data.
 */
export const LargeDatasetExample: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Large Project Structure',
        icon: 'folder',
        expanded: true,
        id: 'large-project',
        children: Array.from({ length: 20 }, (_, i) => ({
          label: `Module ${i + 1}`,
          icon: 'folder',
          id: `module-${i + 1}`,
          children: Array.from({ length: 15 }, (_, j) => ({
            label: `File-${i + 1}-${j + 1}.ts`,
            icon: 'code',
            action: 'open',
            id: `file-${i + 1}-${j + 1}`
          }))
        }))
      },
      {
        label: 'Test Results',
        icon: 'folder',
        id: 'test-results',
        children: Array.from({ length: 50 }, (_, i) => ({
          label: `Test Suite ${i + 1}`,
          icon: 'check_circle',
          action: 'view',
          id: `test-${i + 1}`
        }))
      }
    ],
    filter: ''
  },
  parameters: {
    docs: {
      description: {
        story: `
**Performance Characteristics:**

- **300+ Total Items**: Large hierarchical dataset with nested structures
- **Efficient Rendering**: Component handles substantial data without performance degradation  
- **Filtering Performance**: Real-time search across all items maintains responsiveness
- **Memory Management**: Proper cleanup and efficient state management

**Performance Testing:**
- Expand "Large Project Structure" to see nested folder performance
- Use the filter to test search performance across all items
- Notice smooth interactions even with large datasets
        `
      }
    }
  }
};

// =================================================================
// USAGE EXAMPLES
// =================================================================

/**
 * File explorer interface showing practical usage for file management applications.
 */
export const FileExplorer: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Documents',
        icon: 'folder',
        expanded: true,
        id: 'documents',
        children: [
          { label: 'Annual Report 2024.pdf', icon: 'picture_as_pdf', action: 'open', id: 'annual-report' },
          { label: 'Budget Spreadsheet.xlsx', icon: 'table_chart', action: 'open', id: 'budget-spreadsheet' },
          { label: 'Meeting Notes.docx', icon: 'description', action: 'open', id: 'meeting-notes' }
        ]
      },
      {
        label: 'Images',
        icon: 'folder',
        id: 'images',
        children: [
          { label: 'Logo.png', icon: 'image', action: 'view', id: 'logo-png' },
          { label: 'Banner.jpg', icon: 'image', action: 'view', id: 'banner-jpg' },
          { label: 'Icon.svg', icon: 'image', action: 'view', id: 'icon-svg' }
        ]
      },
      {
        label: 'Videos',
        icon: 'folder',
        id: 'videos',
        children: [
          { label: 'Presentation.mp4', icon: 'movie', action: 'play', id: 'presentation-mp4' },
          { label: 'Tutorial.mov', icon: 'movie', action: 'play', id: 'tutorial-mov' }
        ]
      }
    ],
    contextActions: [
      { label: 'Open', icon: 'open_in_new', action: 'open', id: 'open' },
      { label: 'Rename', icon: 'edit', action: 'rename', id: 'rename' },
      { label: 'Copy', icon: 'content_copy', action: 'copy', id: 'copy' },
      { label: 'Move', icon: 'drive_file_move', action: 'move', id: 'move' },
      { label: 'Delete', icon: 'delete', action: 'delete', id: 'delete' }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: `
A complete file explorer interface with different file types, appropriate icons, and comprehensive 
context actions. This demonstrates real-world usage for file management applications.

**Features Demonstrated:**
- File type specific icons and actions
- Comprehensive context menu for file operations
- Hierarchical folder structure
- Meaningful action values (open, view, play)
        `
      }
    }
  }
};

/**
 * Application navigation menu with sections and pages.
 */
export const NavigationMenu: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        action: 'navigate',
        id: 'dashboard'
      },
      {
        label: 'User Management',
        icon: 'people',
        expanded: true,
        id: 'user-management',
        children: [
          { label: 'All Users', icon: 'person', action: 'navigate', id: 'all-users' },
          { label: 'User Roles', icon: 'admin_panel_settings', action: 'navigate', id: 'user-roles' },
          { label: 'Permissions', icon: 'security', action: 'navigate', id: 'permissions' }
        ]
      },
      {
        label: 'Content',
        icon: 'article',
        id: 'content',
        children: [
          { label: 'Pages', icon: 'web', action: 'navigate', id: 'pages' },
          { label: 'Blog Posts', icon: 'post_add', action: 'navigate', id: 'blog-posts' },
          { label: 'Media Library', icon: 'perm_media', action: 'navigate', id: 'media-library' }
        ]
      },
      {
        label: 'Reports',
        icon: 'assessment',
        id: 'reports',
        children: [
          { label: 'Analytics', icon: 'analytics', action: 'navigate', id: 'analytics' },
          { label: 'Performance', icon: 'speed', action: 'navigate', id: 'performance' },
          { label: 'Usage Stats', icon: 'bar_chart', action: 'navigate', id: 'usage-stats' }
        ]
      },
      {
        label: 'Settings',
        icon: 'settings',
        action: 'navigate',
        id: 'settings'
      }
    ],
    mutuallyExclusive: true
  },
  parameters: {
    docs: {
      description: {
        story: `
An application navigation menu showing how to structure admin interfaces. The mutually exclusive 
behavior ensures focused navigation with only one section open at a time.

**Navigation Pattern:**
- Single items navigate directly (Dashboard, Settings)  
- Grouped items organize related functionality
- All navigation emits consistent "navigate" actions
        `
      }
    }
  }
};

/**
 * Settings and configuration menu with grouped options.
 */
export const SettingsMenu: Story = {
  render: renderCollapsibleList,
  args: {
    items: [
      {
        label: 'Account',
        icon: 'account_circle',
        expanded: true,
        id: 'account',
        children: [
          { label: 'Profile', icon: 'person', action: 'configure', id: 'profile' },
          { label: 'Security', icon: 'security', action: 'configure', id: 'security' },
          { label: 'Billing', icon: 'payment', action: 'configure', id: 'billing' }
        ]
      },
      {
        label: 'Preferences',
        icon: 'tune',
        id: 'preferences',
        children: [
          { label: 'Appearance', icon: 'palette', action: 'configure', id: 'appearance' },
          { label: 'Notifications', icon: 'notifications', action: 'configure', id: 'notifications' },
          { label: 'Privacy', icon: 'privacy_tip', action: 'configure', id: 'privacy' }
        ]
      },
      {
        label: 'System',
        icon: 'computer',
        id: 'system',
        children: [
          { label: 'General', icon: 'settings', action: 'configure', id: 'general' },
          { label: 'Advanced', icon: 'engineering', action: 'configure', id: 'advanced' },
          { label: 'Backup', icon: 'backup', action: 'configure', id: 'backup' }
        ]
      }
    ],
    mutuallyExclusive: true
  },
  parameters: {
    docs: {
      description: {
        story: `
A settings configuration menu demonstrating how to organize complex preference structures. 
Each setting category groups related options together.

**Settings Pattern:**
- Logical grouping of related settings
- Consistent "configure" action for all settings
- Clear iconography for each setting type
        `
      }
    }
  }
}; 