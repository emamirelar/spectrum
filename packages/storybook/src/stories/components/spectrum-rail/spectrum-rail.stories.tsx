import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumRail Component
 * 
 * The rail component provides a sophisticated vertical navigation rail with expandable/collapsible states, integrated search functionality, and slot-based composition. It serves as the primary navigation hub for applications, supporting rail items, collapsible lists, search input, and context menu integration.
 * 
 * ### Key Features
 * - **Dual States**: Expandable and collapsible modes with smooth transitions
 * - **Search Integration**: Built-in search functionality with spectrum-search-input
 * - **Component Composition**: Slot-based integration with rail items and collapsible lists
 * - **Context Menu Support**: Configurable context actions for the "more" button
 * - **Flexible Sizing**: Customizable width and positioning options
 * - **Add Button**: Optional add functionality with custom icons and labels
 * - **State Management**: Programmatic control over expansion and component visibility
 * 
 * ### Component Dependencies
 * - **spectrum-button**: Internal button components for menu, search, add actions
 * - **spectrum-search-input**: Integrated search functionality (via slots)
 * - **spectrum-rail-item**: Individual navigation items (via slots)
 * - **spectrum-collapsible-list**: Hierarchical navigation lists (via slots)
 * - **spectrum-context-menu**: Context menu for "more" button actions
 * 
 * ### Usage Guidelines
 * - **Use for**: Primary application navigation, sidebar menus, dashboard navigation
 * - **Perfect for**: Admin panels, multi-section apps, feature-rich interfaces
 * - **Avoid when**: Simple navigation needs, mobile-first designs, minimal interfaces
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **expandedChange**: Rail expansion state changes with action context
 * - **searchChange**: Search input value changes with filter context
 * - **railAction**: General rail actions (menu, add, more) with identifiers
 * - **addAction**: Add button clicks with action context
 * - **moreContextAction**: Context menu actions with label and ID context
 */

// Import context menu action interface
interface ContextMenuAction {
  label: string;
  action: string;
  icon?: string;
  disabled?: boolean;
}

// Component interfaces for TypeScript support
interface SpectrumRailElement extends HTMLElement {
  appName: string;
  expandedWidth: number;
  moreLabel: string;
  moreIcon: string;
  initialExpanded: boolean;
  showAddButton: boolean;
  addLabel: string;
  addIcon: string;
  collapsedOffset: string;
  moreContextActions: ContextMenuAction[];
  debug: boolean;
}

// Story arguments interface
interface SpectrumRailArgs extends SpectrumRailElement {
  navigationItems: any[];
  searchEnabled: boolean;
  collapsibleListData: any[];
}

// Sample navigation data for different scenarios
const basicNavItems = [
  { icon: 'dashboard', label: 'Dashboard', action: 'navigate-dashboard' },
  { icon: 'analytics', label: 'Analytics', action: 'navigate-analytics' },
  { icon: 'people', label: 'Users', action: 'navigate-users' },
  { icon: 'inventory_2', label: 'Products', action: 'navigate-products' },
  { icon: 'settings', label: 'Settings', action: 'navigate-settings' }
];

const adminNavItems = [
  { icon: 'admin_panel_settings', label: 'Admin Panel', action: 'navigate-admin' },
  { icon: 'security', label: 'Security', action: 'navigate-security' },
  { icon: 'group', label: 'User Management', action: 'navigate-user-mgmt' },
  { icon: 'policy', label: 'Policies', action: 'navigate-policies' },
  { icon: 'monitoring', label: 'Monitoring', action: 'navigate-monitoring' }
];

const workspaceNavItems = [
  { icon: 'work', label: 'Projects', action: 'navigate-projects' },
  { icon: 'assignment', label: 'Tasks', action: 'navigate-tasks' },
  { icon: 'team_dashboard', label: 'Team', action: 'navigate-team' },
  { icon: 'schedule', label: 'Calendar', action: 'navigate-calendar' },
  { icon: 'folder_shared', label: 'Files', action: 'navigate-files' }
];

// Sample collapsible list data
const projectsListData = [
  {
    id: 'projects',
    label: 'Projects',
    icon: 'work',
    expanded: true,
    children: [
      { id: 'project-alpha', label: 'Project Alpha', icon: 'folder' },
      { id: 'project-beta', label: 'Project Beta', icon: 'folder' },
      { id: 'project-gamma', label: 'Project Gamma', icon: 'folder' }
    ]
  },
  {
    id: 'teams',
    label: 'Teams',
    icon: 'group',
    expanded: false,
    children: [
      { id: 'team-design', label: 'Design Team', icon: 'design_services' },
      { id: 'team-dev', label: 'Development Team', icon: 'code' },
      { id: 'team-qa', label: 'QA Team', icon: 'bug_report' }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: 'library_books',
    expanded: false,
    children: [
      { id: 'docs', label: 'Documentation', icon: 'description' },
      { id: 'templates', label: 'Templates', icon: 'content_copy' },
      { id: 'guidelines', label: 'Guidelines', icon: 'rule' }
    ]
  }
];

const contentListData = [
  {
    id: 'content',
    label: 'Content',
    icon: 'article',
    expanded: true,
    children: [
      { id: 'blog-posts', label: 'Blog Posts', icon: 'post_add' },
      { id: 'pages', label: 'Pages', icon: 'web' },
      { id: 'media', label: 'Media', icon: 'photo_library' }
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'analytics',
    expanded: false,
    children: [
      { id: 'traffic', label: 'Traffic', icon: 'traffic' },
      { id: 'conversions', label: 'Conversions', icon: 'trending_up' },
      { id: 'revenue', label: 'Revenue', icon: 'monetization_on' }
    ]
  }
];

// Sample context menu actions
const basicContextActions: ContextMenuAction[] = [
  { label: 'Preferences', action: 'preferences', icon: 'tune' },
  { label: 'Help & Support', action: 'help', icon: 'help' },
  { label: 'Keyboard Shortcuts', action: 'shortcuts', icon: 'keyboard' },
  { label: 'About', action: 'about', icon: 'info' }
];

const adminContextActions: ContextMenuAction[] = [
  { label: 'System Settings', action: 'system-settings', icon: 'settings' },
  { label: 'User Permissions', action: 'permissions', icon: 'security' },
  { label: 'Backup & Restore', action: 'backup', icon: 'backup' },
  { label: 'System Logs', action: 'logs', icon: 'description' },
  { label: 'API Documentation', action: 'api-docs', icon: 'code' }
];

const workspaceContextActions: ContextMenuAction[] = [
  { label: 'Workspace Settings', action: 'workspace-settings', icon: 'settings' },
  { label: 'Invite Members', action: 'invite', icon: 'person_add' },
  { label: 'Export Data', action: 'export', icon: 'download' },
  { label: 'Integrations', action: 'integrations', icon: 'extension' }
];

const meta: Meta<SpectrumRailArgs> = {
  title: 'Spectrum/Components/SpectrumRail', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-rail\` component provides a comprehensive vertical navigation solution with expandable states and component integration.

### Rail Architecture

#### Component Composition
The rail uses slot-based composition to integrate various navigation components:
\`\`\`html
<spectrum-rail app-name="My App" expanded-width="280">
  <!-- Search integration -->
  <spectrum-search-input slot="search" placeholder="Search..."></spectrum-search-input>
  
  <!-- Navigation items -->
  <spectrum-rail-item slot="items" icon="dashboard" label="Dashboard"></spectrum-rail-item>
  <spectrum-rail-item slot="items" icon="analytics" label="Analytics"></spectrum-rail-item>
  
  <!-- Hierarchical navigation -->
  <spectrum-collapsible-list slot="items" items='[...]'></spectrum-collapsible-list>
</spectrum-rail>
\`\`\`

### Expansion States

#### Collapsed State
- **Compact Width**: Minimal space usage with icon-only display
- **Icon Navigation**: Quick visual recognition with tooltips
- **Hidden Elements**: Search and labels hidden for space efficiency
- **Responsive**: Perfect for mobile and constrained layouts

#### Expanded State
- **Full Width**: Configurable expanded width (default 280px)
- **Complete Labels**: All text and search functionality visible
- **Rich Navigation**: Full hierarchical navigation display
- **Desktop Optimized**: Enhanced usability for larger screens

### Search Integration

#### Built-in Search
- **Spectrum Search Input**: Integrated search component via slots
- **Auto-expand**: Search click automatically expands rail
- **Live Filtering**: Real-time filtering of collapsible list items
- **Focus Management**: Automatic focus on search input when activated

### Component Integration

#### Rail Items
- **spectrum-rail-item**: Individual navigation buttons with adaptive display
- **State Synchronization**: Items automatically respond to rail expansion
- **Event Forwarding**: Click events bubble up through rail

#### Collapsible Lists
- **spectrum-collapsible-list**: Hierarchical navigation structures
- **Filter Integration**: Search automatically filters list items
- **Expansion Control**: Independent expand/collapse for each section

#### Context Menu
- **More Button**: Configurable context menu for additional actions
- **Custom Actions**: Define custom context menu items
- **Smart Positioning**: Automatic positioning to prevent clipping

### Event System

#### Expansion Events
- **expandedChange**: Emitted when rail state changes
- **Action Context**: Includes action type (menu, search, more)
- **State Information**: Current expansion state in event payload

#### Search Events
- **searchChange**: Emitted when search value changes
- **Real-time**: Live updates as user types
- **Filter Context**: Includes current search value

#### Action Events
- **railAction**: General rail actions (menu, add, more)
- **addAction**: Specific add button events
- **moreContextAction**: Context menu action events

### Customization Options

#### Visual Customization
- **App Name**: Brand the rail with application name
- **Custom Icons**: Configurable icons for add and more buttons
- **Custom Labels**: Localized labels for all text elements
- **Width Control**: Adjustable expanded width and positioning

#### Functional Customization
- **Add Button**: Optional add functionality with custom handling
- **Context Actions**: Configurable context menu items
- **Initial State**: Control initial expanded/collapsed state
- **Debug Mode**: Built-in debugging for development

### Accessibility Features

#### Navigation Support
- **Keyboard Navigation**: Full keyboard support for all elements
- **Focus Management**: Logical focus flow and trapping
- **Screen Reader**: Proper ARIA labels and semantic structure
- **State Announcements**: Screen reader feedback for state changes

#### Mobile Accessibility
- **Touch Targets**: Appropriately sized interactive elements
- **Gesture Support**: Touch-friendly expansion and navigation
- **Responsive Behavior**: Adapts to different screen sizes

### Integration Patterns

#### Dashboard Applications
- **Admin Panels**: Multi-section admin interfaces
- **Analytics Dashboards**: Data-driven navigation structures
- **Content Management**: Hierarchical content organization

#### Productivity Applications
- **Project Management**: Team and project navigation
- **Collaboration Tools**: Workspace and channel organization
- **File Management**: Folder and document structures

### Basic Usage
\`\`\`html
<!-- Simple rail with navigation items -->
<spectrum-rail app-name="Dashboard" expanded-width="260">
  <spectrum-rail-item slot="items" icon="home" label="Home"></spectrum-rail-item>
  <spectrum-rail-item slot="items" icon="analytics" label="Analytics"></spectrum-rail-item>
</spectrum-rail>

<!-- Rail with search and collapsible lists -->
<spectrum-rail app-name="Workspace" show-add-button="true">
  <spectrum-search-input slot="search" placeholder="Search projects..."></spectrum-search-input>
  <spectrum-collapsible-list slot="items" items='[...]'></spectrum-collapsible-list>
</spectrum-rail>

<!-- Rail with context menu -->
<spectrum-rail 
  app-name="Admin" 
  more-label="System"
  .moreContextActions=\${contextActions}>
  <!-- Navigation content -->
</spectrum-rail>
\`\`\`
        `
      }
    }
  },
  args: {
    appName: 'Dashboard',
    expandedWidth: 280,
    moreLabel: 'More',
    moreIcon: 'settings',
    initialExpanded: false,
    showAddButton: true,
    addLabel: 'Add new',
    addIcon: 'add',
    collapsedOffset: '0px',
    moreContextActions: basicContextActions,
    debug: false,
    navigationItems: basicNavItems,
    searchEnabled: true,
    collapsibleListData: projectsListData
  },
  argTypes: {
    appName: {
      control: 'text',
      description: 'Application name displayed in expanded rail header',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' }
      }
    },
    expandedWidth: {
      control: { type: 'number', min: 200, max: 400, step: 10 },
      description: 'Width of rail when expanded (in pixels)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '280' }
      }
    },
    moreLabel: {
      control: 'text',
      description: 'Label for the "more" section (visible when expanded)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'More' }
      }
    },
    moreIcon: {
      control: 'text',
      description: 'Material Design icon for the "more" button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'settings' }
      }
    },
    initialExpanded: {
      control: 'boolean',
      description: 'Whether the rail should start in expanded state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    showAddButton: {
      control: 'boolean',
      description: 'Whether to show the add button in the rail',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    addLabel: {
      control: 'text',
      description: 'Label for the add button (visible when expanded)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Add new' }
      }
    },
    addIcon: {
      control: 'text',
      description: 'Material Design icon for the add button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'add' }
      }
    },
    collapsedOffset: {
      control: 'text',
      description: 'CSS offset from left when collapsed (e.g., "20px", "1rem")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '0px' }
      }
    },
    moreContextActions: {
      control: { type: 'object' },
      description: 'Context menu actions for the "more" button',
      table: {
        type: { summary: 'ContextMenuAction[]' },
        defaultValue: { summary: '[]' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging for development and troubleshooting',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    navigationItems: {
      control: { type: 'object' },
      description: 'Navigation items for rail item demonstration (story control only)',
      table: {
        type: { summary: 'object[]' },
        category: 'Story Controls'
      }
    },
    searchEnabled: {
      control: 'boolean',
      description: 'Whether to include search functionality (story control only)',
      table: {
        type: { summary: 'boolean' },
        category: 'Story Controls'
      }
    },
    collapsibleListData: {
      control: { type: 'object' },
      description: 'Collapsible list data for demonstration (story control only)',
      table: {
        type: { summary: 'object[]' },
        category: 'Story Controls'
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumRailArgs>;

// Interactive render function
const renderRail = (args: SpectrumRailArgs) => {
  return html`
    <div style="display: flex; height: 600px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; background: var(--spectrum-sys-color-surface-variant);">
      <!-- Rail Component -->
      <spectrum-rail
        app-name=${args.appName}
        expanded-width=${args.expandedWidth}
        more-label=${args.moreLabel}
        more-icon=${args.moreIcon}
        .initialExpanded=${args.initialExpanded}
        .showAddButton=${args.showAddButton}
        add-label=${args.addLabel}
        add-icon=${args.addIcon}
        collapsed-offset=${args.collapsedOffset}
        .moreContextActions=${args.moreContextActions}
        .debug=${args.debug}
        @expandedChange=${(e: CustomEvent) => action('expandedChange')(e.detail)}
        @searchChange=${(e: CustomEvent) => action('searchChange')(e.detail)}
        @railAction=${(e: CustomEvent) => action('railAction')(e.detail)}
        @addAction=${(e: CustomEvent) => action('addAction')(e.detail)}
        @moreContextAction=${(e: CustomEvent) => action('moreContextAction')(e.detail)}
      >
        <!-- Search Integration -->
        ${args.searchEnabled ? html`
          <spectrum-search-input
            slot="search"
            placeholder="Search..."
            size="small"
            @searchValue=${(e: CustomEvent) => console.log('Search value:', e.detail)}
          ></spectrum-search-input>
        ` : ''}
        
        <!-- Navigation Items -->
        ${args.navigationItems.map(item => html`
          <spectrum-rail-item
            slot="items"
            icon=${item.icon}
            label=${item.label}
            action=${item.action}
            @click=${(e: Event) => action('rail-item-click')({ action: item.action, label: item.label })}
          ></spectrum-rail-item>
        `)}
        
        <!-- Collapsible List Integration -->
        <spectrum-collapsible-list
          slot="items"
          .items=${args.collapsibleListData}
          @childAction=${(e: CustomEvent) => action('collapsible-list-action')(e.detail)}
        ></spectrum-collapsible-list>
      </spectrum-rail>
      
      <!-- Content Area Simulation -->
      <div style="flex: 1; padding: 2rem; background: var(--spectrum-sys-color-surface); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Main Content Area</h3>
        <p style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface-variant); max-width: 400px;">
          Interact with the rail navigation to see events in the Actions panel. Try expanding/collapsing, searching, and using the context menu.
        </p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; max-width: 400px;">
          ${[
            { label: 'Try Menu', icon: 'menu', desc: 'Toggle expansion' },
            { label: 'Try Search', icon: 'search', desc: 'Auto-expand & filter' },
            { label: 'Try Add', icon: 'add', desc: 'Add button action' },
            { label: 'Try More', icon: 'more_vert', desc: 'Context menu' }
          ].map(tip => html`
            <div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; text-align: center;">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${tip.icon === 'menu' ? '☰' : tip.icon === 'search' ? '🔍' : tip.icon === 'add' ? '➕' : '⋮'}</div>
              <div style="font-weight: bold; font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--spectrum-sys-color-on-surface);">${tip.label}</div>
              <div style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant);">${tip.desc}</div>
            </div>
          `)}
        </div>
      </div>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all rail component features and configurations.
 * Experiment with different settings, navigation items, and component integrations.
 */
export const Playground: Story = {
  render: renderRail
};

/**
 * Expansion state comparison showing both collapsed and expanded rail modes.
 * Demonstrates responsive behavior and component adaptation to different states.
 */
export const ExpansionStates: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Rail Expansion States</h3>
      
      <div style="display: grid; grid-template-columns: auto auto 1fr; gap: 2rem; margin-top: 2rem; height: 500px;">
        <!-- Collapsed State -->
        <div style="text-align: center;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Collapsed State</h4>
          <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; height: 400px; display: flex;">
            <spectrum-rail
              app-name="Compact App"
              .initialExpanded=${false}
              more-icon="settings"
              add-icon="add"
              .debug=${false}
              @expandedChange=${(e: CustomEvent) => action('collapsed-expandedChange')(e.detail)}
              @railAction=${(e: CustomEvent) => action('collapsed-railAction')(e.detail)}
            >
              ${basicNavItems.slice(0, 4).map(item => html`
                <spectrum-rail-item
                  slot="items"
                  icon=${item.icon}
                  label=${item.label}
                  action=${item.action}
                ></spectrum-rail-item>
              `)}
            </spectrum-rail>
            <div style="flex: 1; background: var(--spectrum-sys-color-surface); display: flex; align-items: center; justify-content: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem; text-align: center; padding: 1rem;">
              Content Area<br/><small>Compact Layout</small>
            </div>
          </div>
          <p style="margin-top: 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            Icon-only navigation with tooltips
          </p>
        </div>
        
        <!-- Expanded State -->
        <div style="text-align: center;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Expanded State</h4>
          <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; height: 400px; display: flex;">
            <spectrum-rail
              app-name="Expanded App"
              .initialExpanded=${true}
              more-icon="settings"
              add-icon="add"
              .debug=${false}
              @expandedChange=${(e: CustomEvent) => action('expanded-expandedChange')(e.detail)}
              @railAction=${(e: CustomEvent) => action('expanded-railAction')(e.detail)}
            >
              <spectrum-search-input
                slot="search"
                placeholder="Search..."
                size="small"
              ></spectrum-search-input>
              ${basicNavItems.slice(0, 4).map(item => html`
                <spectrum-rail-item
                  slot="items"
                  icon=${item.icon}
                  label=${item.label}
                  action=${item.action}
                ></spectrum-rail-item>
              `)}
            </spectrum-rail>
            <div style="flex: 1; background: var(--spectrum-sys-color-surface); display: flex; align-items: center; justify-content: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem; text-align: center; padding: 1rem;">
              Content Area<br/><small>Full Layout</small>
            </div>
          </div>
          <p style="margin-top: 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            Full navigation with search and labels
          </p>
        </div>
        
        <!-- Interactive Transition -->
        <div style="text-align: center;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Interactive Transition</h4>
          <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; height: 400px; display: flex;">
            <spectrum-rail
              app-name="Interactive Demo"
              .initialExpanded=${false}
              more-icon="settings"
              add-icon="add"
              .debug=${false}
              @expandedChange=${(e: CustomEvent) => {
                action('interactive-expandedChange')(e.detail);
                const rail = e.target as any;
                const container = rail.closest('div[style*="display: flex"]');
                const status = container?.nextElementSibling;
                if (status) {
                  status.textContent = e.detail.expanded ? 'State: Expanded ✅' : 'State: Collapsed 📱';
                }
              }}
              @railAction=${(e: CustomEvent) => action('interactive-railAction')(e.detail)}
            >
              <spectrum-search-input
                slot="search"
                placeholder="Search..."
                size="small"
              ></spectrum-search-input>
              ${basicNavItems.slice(0, 4).map(item => html`
                <spectrum-rail-item
                  slot="items"
                  icon=${item.icon}
                  label=${item.label}
                  action=${item.action}
                ></spectrum-rail-item>
              `)}
            </spectrum-rail>
            <div style="flex: 1; background: var(--spectrum-sys-color-surface); display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem; text-align: center; padding: 1rem;">
              <div>Content Area</div>
              <small>Click menu button to toggle</small>
              <div style="margin-top: 1rem; padding: 0.5rem; background: var(--spectrum-sys-color-primary-container); border-radius: 4px; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.8rem;">
                💡 Try the hamburger menu!
              </div>
            </div>
          </div>
          <p id="interactive-status" style="margin-top: 0.5rem; color: var(--spectrum-sys-color-primary); font-size: 0.9rem; font-weight: bold;">
            State: Collapsed 📱
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Rail expansion state comparison demonstrating responsive behavior:

### Collapsed State (Mobile/Compact)
- **Icon-only Navigation**: Minimal space usage with tooltip labels
- **Hidden Search**: Search functionality hidden to save space
- **Compact Layout**: Perfect for mobile and constrained interfaces
- **Quick Access**: Essential navigation items remain accessible

### Expanded State (Desktop/Full)
- **Full Navigation**: Complete labels, search, and all features visible
- **Enhanced Usability**: Easier navigation with clear text labels
- **Search Integration**: Search input prominently displayed
- **Rich Interface**: Full application navigation experience

### Interactive Transition
- **Smooth Animation**: CSS transitions between states
- **State Persistence**: Rail remembers expansion preference
- **Auto-expand**: Search button automatically expands rail
- **Event Feedback**: Real-time state change notifications

### Use Cases
- **Responsive Design**: Adapt to different screen sizes
- **User Preference**: Allow users to choose their preferred mode
- **Context Switching**: Expand for complex tasks, collapse for focus
- **Progressive Enhancement**: Start collapsed, expand as needed

The rail component intelligently adapts its layout and functionality based on the expansion state, providing optimal user experience across different contexts and screen sizes.
        `
      }
    }
  }
};

/**
 * Complete dashboard navigation demonstrating real-world application patterns.
 * Features admin sections, search functionality, and hierarchical organization.
 */
export const DashboardNavigation: Story = {
  args: {
    appName: 'Admin Dashboard',
    expandedWidth: 300,
    moreLabel: 'System',
    moreIcon: 'admin_panel_settings',
    initialExpanded: true,
    showAddButton: true,
    addLabel: 'Add Resource',
    addIcon: 'add_circle',
    navigationItems: adminNavItems,
    moreContextActions: adminContextActions,
    collapsibleListData: [
      {
        id: 'users',
        label: 'User Management',
        icon: 'group',
        expanded: true,
        children: [
          { id: 'all-users', label: 'All Users', icon: 'people' },
          { id: 'admins', label: 'Administrators', icon: 'admin_panel_settings' },
          { id: 'roles', label: 'Roles & Permissions', icon: 'security' },
          { id: 'groups', label: 'User Groups', icon: 'group_work' }
        ]
      },
      {
        id: 'system',
        label: 'System Settings',
        icon: 'settings',
        expanded: false,
        children: [
          { id: 'general', label: 'General Settings', icon: 'tune' },
          { id: 'security-settings', label: 'Security', icon: 'lock' },
          { id: 'backup', label: 'Backup & Restore', icon: 'backup' },
          { id: 'integrations', label: 'Integrations', icon: 'extension' }
        ]
      },
      {
        id: 'monitoring',
        label: 'Monitoring',
        icon: 'monitoring',
        expanded: false,
        children: [
          { id: 'system-health', label: 'System Health', icon: 'health_and_safety' },
          { id: 'performance', label: 'Performance', icon: 'speed' },
          { id: 'logs', label: 'System Logs', icon: 'description' },
          { id: 'alerts', label: 'Alerts', icon: 'notifications' }
        ]
      }
    ]
  },
  render: renderRail,
  parameters: {
    docs: {
      description: {
        story: `
Complete admin dashboard navigation showcasing enterprise application patterns:

### Admin Navigation Structure
- **Security Management**: Admin panel, security settings, user management
- **User Administration**: Complete user lifecycle management
- **System Monitoring**: Health, performance, and logging capabilities
- **Policy Management**: Security policies and compliance tools

### Hierarchical Organization
- **User Management Section**: Users, admins, roles, and groups
- **System Settings**: General config, security, backup, integrations  
- **Monitoring Dashboard**: Health metrics, performance data, logs, alerts
- **Expandable Sections**: Click to reveal detailed sub-navigation

### Advanced Features
- **Context Menu**: System-specific actions via "more" button
- **Add Functionality**: Quick resource creation with custom icon
- **Search Integration**: Filter across all navigation items
- **Real-time Events**: All interactions logged in Actions panel

### Admin-Specific Context Actions
- **System Settings**: Deep system configuration access
- **User Permissions**: Advanced user management tools
- **Backup & Restore**: Data protection and recovery options
- **System Logs**: Comprehensive audit and debug information
- **API Documentation**: Developer resources and integration guides

### Use Cases
- **Enterprise Admin Panels**: Complex system management interfaces
- **Multi-tenant Applications**: Tenant and user administration
- **System Administration**: Server and application management
- **Compliance Dashboards**: Audit and regulatory compliance tools

Perfect for building comprehensive administrative interfaces with hierarchical navigation and advanced system management capabilities.
        `
      }
    }
  }
};

/**
 * Workspace collaboration navigation for team productivity applications.
 * Features project management, team organization, and file sharing.
 */
export const WorkspaceNavigation: Story = {
  args: {
    appName: 'Team Workspace',
    expandedWidth: 280,
    moreLabel: 'Workspace',
    moreIcon: 'workspaces',
    initialExpanded: true,
    showAddButton: true,
    addLabel: 'New Project',
    addIcon: 'create_new_folder',
    navigationItems: workspaceNavItems,
    moreContextActions: workspaceContextActions,
    collapsibleListData: [
      {
        id: 'active-projects',
        label: 'Active Projects',
        icon: 'work',
        expanded: true,
        children: [
          { id: 'proj-website', label: 'Website Redesign', icon: 'web' },
          { id: 'proj-mobile', label: 'Mobile App v2.0', icon: 'phone_android' },
          { id: 'proj-api', label: 'API Integration', icon: 'api' },
          { id: 'proj-design', label: 'Design System', icon: 'design_services' }
        ]
      },
      {
        id: 'teams',
        label: 'Teams & Departments',
        icon: 'groups',
        expanded: false,
        children: [
          { id: 'team-engineering', label: 'Engineering', icon: 'engineering' },
          { id: 'team-design', label: 'Design', icon: 'brush' },
          { id: 'team-product', label: 'Product', icon: 'lightbulb' },
          { id: 'team-marketing', label: 'Marketing', icon: 'campaign' }
        ]
      },
      {
        id: 'resources',
        label: 'Shared Resources',
        icon: 'folder_shared',
        expanded: false,
        children: [
          { id: 'templates', label: 'Project Templates', icon: 'content_copy' },
          { id: 'assets', label: 'Brand Assets', icon: 'image' },
          { id: 'documents', label: 'Documentation', icon: 'description' },
          { id: 'tools', label: 'Team Tools', icon: 'build' }
        ]
      }
    ]
  },
  render: renderRail,
  parameters: {
    docs: {
      description: {
        story: `
Team workspace navigation for collaborative productivity applications:

### Workspace Structure
- **Project Management**: Active project tracking and organization
- **Team Collaboration**: Cross-functional team coordination
- **Resource Sharing**: Centralized asset and template management
- **Communication Tools**: Calendar, files, and team tools

### Collaborative Features
- **Active Projects**: Real-time project status and access
- **Team Organization**: Department and role-based navigation
- **Shared Resources**: Common templates, assets, and documentation
- **Workspace Settings**: Team configuration and member management

### Productivity Integration
- **Project Templates**: Quick project creation from templates
- **Brand Assets**: Centralized design and marketing materials
- **Team Tools**: Integrated productivity and communication tools
- **Documentation Hub**: Knowledge base and process documentation

### Workspace Context Actions
- **Workspace Settings**: Team configuration and preferences
- **Invite Members**: Team member onboarding and access management
- **Export Data**: Project and team data portability
- **Integrations**: Third-party tool connections

### Use Cases
- **Project Management**: Asana, Monday, Trello-style interfaces
- **Team Collaboration**: Slack, Microsoft Teams workspace navigation
- **Development Teams**: GitHub, GitLab project organization
- **Creative Agencies**: Design and creative project management

### Navigation Patterns
- **Project-centric**: Focus on active project access
- **Team-oriented**: Department and role-based organization
- **Resource-focused**: Easy access to shared materials
- **Communication-enabled**: Integrated messaging and scheduling

Perfect for building team-oriented productivity applications with project management and collaboration features.
        `
      }
    }
  }
};

/**
 * Content management navigation for publishing and content creation platforms.
 * Features content organization, analytics integration, and publishing workflow.
 */
export const ContentManagement: Story = {
  args: {
    appName: 'Content Studio',
    expandedWidth: 300,
    moreLabel: 'Publishing',
    moreIcon: 'publish',
    initialExpanded: false,
    showAddButton: true,
    addLabel: 'Create Content',
    addIcon: 'add_box',
    navigationItems: [
      { icon: 'dashboard', label: 'Overview', action: 'navigate-overview' },
      { icon: 'create', label: 'Editor', action: 'navigate-editor' },
      { icon: 'photo_library', label: 'Media Library', action: 'navigate-media' },
      { icon: 'analytics', label: 'Analytics', action: 'navigate-analytics' },
      { icon: 'people', label: 'Authors', action: 'navigate-authors' }
    ],
    moreContextActions: [
      { label: 'Site Settings', action: 'site-settings', icon: 'settings' },
      { label: 'SEO Tools', action: 'seo-tools', icon: 'search' },
      { label: 'Publication Settings', action: 'pub-settings', icon: 'publish' },
      { label: 'Import/Export', action: 'import-export', icon: 'import_export' },
      { label: 'API Keys', action: 'api-keys', icon: 'key' }
    ],
    collapsibleListData: contentListData
  },
  render: (args) => html`
    <div style="display: flex; height: 600px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; background: var(--spectrum-sys-color-surface-variant);">
      <spectrum-rail
        app-name=${args.appName}
        expanded-width=${args.expandedWidth}
        more-label=${args.moreLabel}
        more-icon=${args.moreIcon}
        .initialExpanded=${args.initialExpanded}
        .showAddButton=${args.showAddButton}
        add-label=${args.addLabel}
        add-icon=${args.addIcon}
        .moreContextActions=${args.moreContextActions}
        @expandedChange=${(e: CustomEvent) => action('cms-expandedChange')(e.detail)}
        @searchChange=${(e: CustomEvent) => action('cms-searchChange')(e.detail)}
        @railAction=${(e: CustomEvent) => action('cms-railAction')(e.detail)}
        @addAction=${(e: CustomEvent) => action('cms-addAction')(e.detail)}
        @moreContextAction=${(e: CustomEvent) => action('cms-moreContextAction')(e.detail)}
      >
        <spectrum-search-input
          slot="search"
          placeholder="Search content..."
          size="small"
        ></spectrum-search-input>
        
        ${args.navigationItems.map(item => html`
          <spectrum-rail-item
            slot="items"
            icon=${item.icon}
            label=${item.label}
            action=${item.action}
          ></spectrum-rail-item>
        `)}
        
        <spectrum-collapsible-list
          slot="items"
          .items=${args.collapsibleListData}
          @childAction=${(e: CustomEvent) => action('cms-collapsible-action')(e.detail)}
        ></spectrum-collapsible-list>
      </spectrum-rail>
      
      <!-- Content Management Interface Simulation -->
      <div style="flex: 1; background: var(--spectrum-sys-color-surface); display: flex; flex-direction: column;">
        <!-- Header Bar -->
        <div style="padding: 1rem 2rem; border-bottom: 1px solid var(--spectrum-sys-color-outline); background: var(--spectrum-sys-color-surface-container); display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">Content Dashboard</h3>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">Last updated: 2 min ago</span>
            <div style="padding: 0.25rem 0.75rem; background: var(--spectrum-sys-color-primary-container); border-radius: 12px; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.8rem; font-weight: bold;">
              Live
            </div>
          </div>
        </div>
        
        <!-- Content Grid -->
        <div style="flex: 1; padding: 2rem; overflow-y: auto;">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
            <!-- Content Statistics -->
            ${[
              { title: 'Published Articles', count: '247', change: '+12 this week', color: 'primary' },
              { title: 'Draft Content', count: '18', change: '5 pending review', color: 'secondary' },
              { title: 'Media Files', count: '1,432', change: '+89 this month', color: 'tertiary' },
              { title: 'Page Views', count: '52.3K', change: '+8.2% vs last month', color: 'success' }
            ].map(stat => html`
              <div style="padding: 1.5rem; background: var(--spectrum-sys-color-${stat.color}-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
                <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-${stat.color}-container); font-size: 0.9rem;">${stat.title}</h4>
                <div style="font-size: 2rem; font-weight: bold; color: var(--spectrum-sys-color-on-${stat.color}-container); margin-bottom: 0.5rem;">${stat.count}</div>
                <div style="color: var(--spectrum-sys-color-on-${stat.color}-container); font-size: 0.8rem; opacity: 0.8;">${stat.change}</div>
              </div>
            `)}
            
            <!-- Recent Activity -->
            <div style="grid-column: 1 / -1; padding: 1.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
              <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Recent Activity</h4>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${[
                  { action: 'Published', item: '"Getting Started with Design Systems"', time: '2 hours ago', author: 'Sarah Johnson' },
                  { action: 'Edited', item: '"Mobile App Best Practices"', time: '4 hours ago', author: 'Mike Chen' },
                  { action: 'Created', item: '"Q4 Product Roadmap"', time: '1 day ago', author: 'Emily Davis' }
                ].map(activity => html`
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: var(--spectrum-sys-color-surface); border-radius: 4px;">
                    <div>
                      <strong style="color: var(--spectrum-sys-color-primary);">${activity.action}</strong>
                      <span style="color: var(--spectrum-sys-color-on-surface);">${activity.item}</span>
                      <div style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem;">by ${activity.author}</div>
                    </div>
                    <span style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem; white-space: nowrap;">${activity.time}</span>
                  </div>
                `)}
              </div>
            </div>
          </div>
          
          <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px; text-align: center;">
            <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.9rem;">
              📝 <strong>Content Management Demo:</strong> Use the rail navigation to explore content sections, search functionality, and publishing tools. The "Create Content" button starts new content workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Content management navigation for publishing and editorial platforms:

### Publishing Workflow
- **Content Overview**: Dashboard with statistics and recent activity
- **Content Editor**: Rich text and media editing capabilities
- **Media Library**: Asset management and organization
- **Analytics Integration**: Performance tracking and insights
- **Author Management**: User roles and content attribution

### Content Organization
- **Content Types**: Blog posts, pages, media categorization
- **Analytics Sections**: Traffic, conversions, revenue tracking
- **Publishing Tools**: SEO optimization, scheduling, distribution
- **Editorial Workflow**: Draft, review, publish process

### Publishing Context Actions
- **Site Settings**: Global site configuration and preferences
- **SEO Tools**: Search optimization and metadata management
- **Publication Settings**: Distribution and syndication options
- **Import/Export**: Content migration and backup tools
- **API Keys**: Third-party integration and automation

### Content Management Features
- **Real-time Statistics**: Live content performance metrics
- **Activity Feed**: Recent changes and editorial activity
- **Search & Filter**: Comprehensive content discovery
- **Media Management**: Centralized asset organization

### Use Cases
- **Publishing Platforms**: WordPress, Ghost, Medium-style interfaces
- **Documentation Sites**: GitBook, Notion documentation systems
- **E-learning Platforms**: Course content and lesson management
- **Corporate Blogs**: Company content and marketing material
- **News & Media**: Editorial workflow and publication management

### Editorial Workflow
- **Content Creation**: Streamlined content authoring experience
- **Review Process**: Editorial review and approval workflow
- **Publishing Schedule**: Content calendar and automated publishing
- **Performance Tracking**: Analytics integration and performance monitoring

Perfect for building comprehensive content management systems with editorial workflows and publishing capabilities.
        `
      }
    }
  }
};

/**
 * Context menu integration showcase demonstrating advanced rail functionality.
 * Features different context action sets for various application types.
 */
export const ContextMenuIntegration: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Context Menu Integration</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 2rem;">
        <!-- Basic Context Menu -->
        <div style="text-align: center;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Basic Context Menu</h4>
          <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; height: 400px; display: flex;">
            <spectrum-rail
              app-name="Basic App"
              .initialExpanded=${true}
              more-label="Options"
              more-icon="more_vert"
              .moreContextActions=${basicContextActions}
              @moreContextAction=${(e: CustomEvent) => action('basic-context-action')(e.detail)}
            >
              ${basicNavItems.slice(0, 3).map(item => html`
                <spectrum-rail-item
                  slot="items"
                  icon=${item.icon}
                  label=${item.label}
                  action=${item.action}
                ></spectrum-rail-item>
              `)}
            </spectrum-rail>
            <div style="flex: 1; background: var(--spectrum-sys-color-surface); padding: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); text-align: center; font-size: 0.9rem;">
                Click the "Options" button to see basic context actions
              </p>
              <div style="margin-top: 1rem; padding: 0.75rem; background: var(--spectrum-sys-color-surface-container); border-radius: 4px; font-size: 0.8rem; color: var(--spectrum-sys-color-on-surface-variant);">
                • Preferences<br/>
                • Help & Support<br/>
                • Keyboard Shortcuts<br/>
                • About
              </div>
            </div>
          </div>
        </div>
        
        <!-- Admin Context Menu -->
        <div style="text-align: center;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Admin Context Menu</h4>
          <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; height: 400px; display: flex;">
            <spectrum-rail
              app-name="Admin Panel"
              .initialExpanded=${true}
              more-label="System"
              more-icon="admin_panel_settings"
              .moreContextActions=${adminContextActions}
              @moreContextAction=${(e: CustomEvent) => action('admin-context-action')(e.detail)}
            >
              ${adminNavItems.slice(0, 3).map(item => html`
                <spectrum-rail-item
                  slot="items"
                  icon=${item.icon}
                  label=${item.label}
                  action=${item.action}
                ></spectrum-rail-item>
              `)}
            </spectrum-rail>
            <div style="flex: 1; background: var(--spectrum-sys-color-surface); padding: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); text-align: center; font-size: 0.9rem;">
                Click the "System" button for admin-specific actions
              </p>
              <div style="margin-top: 1rem; padding: 0.75rem; background: var(--spectrum-sys-color-error-container); border-radius: 4px; font-size: 0.8rem; color: var(--spectrum-sys-color-on-error-container);">
                🔐 Admin Actions:<br/>
                • System Settings<br/>
                • User Permissions<br/>
                • Backup & Restore<br/>
                • System Logs<br/>
                • API Documentation
              </div>
            </div>
          </div>
        </div>
        
        <!-- Workspace Context Menu -->
        <div style="text-align: center;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Workspace Context Menu</h4>
          <div style="border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; height: 400px; display: flex;">
            <spectrum-rail
              app-name="Team Workspace"
              .initialExpanded=${true}
              more-label="Workspace"
              more-icon="workspaces"
              .moreContextActions=${workspaceContextActions}
              @moreContextAction=${(e: CustomEvent) => action('workspace-context-action')(e.detail)}
            >
              ${workspaceNavItems.slice(0, 3).map(item => html`
                <spectrum-rail-item
                  slot="items"
                  icon=${item.icon}
                  label=${item.label}
                  action=${item.action}
                ></spectrum-rail-item>
              `)}
            </spectrum-rail>
            <div style="flex: 1; background: var(--spectrum-sys-color-surface); padding: 1rem; display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); text-align: center; font-size: 0.9rem;">
                Click the "Workspace" button for team actions
              </p>
              <div style="margin-top: 1rem; padding: 0.75rem; background: var(--spectrum-sys-color-tertiary-container); border-radius: 4px; font-size: 0.8rem; color: var(--spectrum-sys-color-on-tertiary-container);">
                👥 Team Actions:<br/>
                • Workspace Settings<br/>
                • Invite Members<br/>
                • Export Data<br/>
                • Integrations
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Context Menu Behavior Information -->
      <div style="margin-top: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Context Menu Behavior</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          <div>
            <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-primary);">🎯 Positioning</h5>
            <ul style="margin: 0; padding-left: 1.25rem; color: var(--spectrum-sys-color-on-surface); font-size: 0.9rem;">
              <li>Smart positioning to prevent clipping</li>
              <li>Automatic 'bottom' position for rail buttons</li>
              <li>Adaptive placement based on screen space</li>
            </ul>
          </div>
          <div>
            <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-secondary);">⚡ Interaction</h5>
            <ul style="margin: 0; padding-left: 1.25rem; color: var(--spectrum-sys-color-on-surface); font-size: 0.9rem;">
              <li>Click more button to open/close menu</li>
              <li>Click outside to close menu</li>
              <li>Actions emit detailed event information</li>
            </ul>
          </div>
          <div>
            <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-tertiary);">🔧 Customization</h5>
            <ul style="margin: 0; padding-left: 1.25rem; color: var(--spectrum-sys-color-on-surface); font-size: 0.9rem;">
              <li>Custom icons and labels for actions</li>
              <li>Role-based action visibility</li>
              <li>Context-specific action sets</li>
            </ul>
          </div>
        </div>
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px;">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.9rem;">
            <strong>💡 Try It:</strong> Click any of the "more" buttons above to see different context menu configurations. Check the Actions panel to see the event details for each action.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Context menu integration demonstrating advanced rail functionality:

### Context Menu Types

#### Basic Context Menu
- **User Preferences**: Application settings and personalization
- **Help & Support**: Documentation and assistance access
- **Keyboard Shortcuts**: Quick reference for power users
- **About Information**: Version and application details

#### Admin Context Menu
- **System Settings**: Deep system configuration access
- **User Permissions**: Advanced user and role management
- **Backup & Restore**: Data protection and recovery tools
- **System Logs**: Comprehensive audit and debugging information
- **API Documentation**: Developer resources and integration guides

#### Workspace Context Menu
- **Workspace Settings**: Team and project configuration
- **Invite Members**: Team member onboarding and access management
- **Export Data**: Data portability and backup options
- **Integrations**: Third-party service connections

### Context Menu Features

#### Smart Positioning
- **Automatic Placement**: Prevents menu clipping at screen edges
- **Bottom Positioning**: Optimized for rail button placement
- **Responsive Behavior**: Adapts to different screen sizes and orientations

#### Interactive Behavior
- **Toggle Functionality**: Click to open/close menu
- **Outside Click**: Automatic menu closure when clicking elsewhere
- **Event Emission**: Detailed action events with context information

#### Customization Options
- **Role-based Actions**: Different action sets for different user types
- **Custom Icons**: Material Design icons for visual clarity
- **Action Categories**: Grouped actions for logical organization
- **Dynamic Content**: Context-sensitive action availability

### Event System
Each context action emits detailed event information:
- **Action Identifier**: Unique action name for handling
- **Label Context**: Human-readable action description
- **Target Information**: Source button and context details

### Use Cases
- **Application Settings**: User preferences and configuration
- **Administrative Tools**: System management and maintenance
- **Team Collaboration**: Workspace and member management
- **Developer Tools**: API access and integration resources

### Integration Patterns
- **Conditional Actions**: Show/hide based on user permissions
- **Dynamic Menus**: Update actions based on application state
- **Nested Menus**: Hierarchical action organization for complex workflows
- **Custom Styling**: Theme-aware appearance and behavior

Perfect for building feature-rich navigation systems with context-sensitive actions and role-based functionality.
        `
      }
    }
  }
};

/**
 * Search integration showcase demonstrating filtering and navigation enhancement.
 * Shows how search automatically expands rail and filters collapsible list content.
 */
export const SearchIntegration: Story = {
  args: {
    appName: 'Search Demo',
    expandedWidth: 320,
    moreLabel: 'Search Tools',
    moreIcon: 'search',
    initialExpanded: false,
    showAddButton: true,
    addLabel: 'Add Item',
    addIcon: 'add',
    navigationItems: [
      { icon: 'search', label: 'Global Search', action: 'search-global' },
      { icon: 'history', label: 'Recent Searches', action: 'search-recent' },
      { icon: 'bookmark', label: 'Saved Searches', action: 'search-saved' },
      { icon: 'tune', label: 'Search Filters', action: 'search-filters' }
    ],
    moreContextActions: [
      { label: 'Search Settings', action: 'search-settings', icon: 'settings' },
      { label: 'Search Analytics', action: 'search-analytics', icon: 'analytics' },
      { label: 'Export Results', action: 'search-export', icon: 'download' },
      { label: 'Search Help', action: 'search-help', icon: 'help' }
    ],
    collapsibleListData: [
      {
        id: 'documents',
        label: 'Documents',
        icon: 'description',
        expanded: true,
        children: [
          { id: 'doc-reports', label: 'Annual Reports', icon: 'assessment' },
          { id: 'doc-policies', label: 'Company Policies', icon: 'policy' },
          { id: 'doc-guides', label: 'User Guides', icon: 'menu_book' },
          { id: 'doc-specs', label: 'Technical Specifications', icon: 'code' },
          { id: 'doc-contracts', label: 'Legal Contracts', icon: 'gavel' }
        ]
      },
      {
        id: 'projects',
        label: 'Projects',
        icon: 'work',
        expanded: true,
        children: [
          { id: 'proj-frontend', label: 'Frontend Development', icon: 'web' },
          { id: 'proj-backend', label: 'Backend Services', icon: 'dns' },
          { id: 'proj-mobile', label: 'Mobile Applications', icon: 'phone_android' },
          { id: 'proj-design', label: 'Design System', icon: 'design_services' },
          { id: 'proj-testing', label: 'Quality Assurance', icon: 'bug_report' }
        ]
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: 'library_books',
        expanded: false,
        children: [
          { id: 'res-tutorials', label: 'Video Tutorials', icon: 'play_circle' },
          { id: 'res-templates', label: 'Document Templates', icon: 'content_copy' },
          { id: 'res-tools', label: 'Development Tools', icon: 'build' },
          { id: 'res-apis', label: 'API Documentation', icon: 'api' },
          { id: 'res-libraries', label: 'Code Libraries', icon: 'code' }
        ]
      },
      {
        id: 'teams',
        label: 'Teams & People',
        icon: 'group',
        expanded: false,
        children: [
          { id: 'team-engineering', label: 'Engineering Team', icon: 'engineering' },
          { id: 'team-product', label: 'Product Management', icon: 'lightbulb' },
          { id: 'team-design', label: 'Design Team', icon: 'brush' },
          { id: 'team-marketing', label: 'Marketing Team', icon: 'campaign' },
          { id: 'team-sales', label: 'Sales Team', icon: 'handshake' }
        ]
      }
    ]
  },
  render: (args) => html`
    <div style="display: flex; height: 600px; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 8px; overflow: hidden; background: var(--spectrum-sys-color-surface-variant);">
      <spectrum-rail
        app-name=${args.appName}
        expanded-width=${args.expandedWidth}
        more-label=${args.moreLabel}
        more-icon=${args.moreIcon}
        .initialExpanded=${args.initialExpanded}
        .showAddButton=${args.showAddButton}
        add-label=${args.addLabel}
        add-icon=${args.addIcon}
        .moreContextActions=${args.moreContextActions}
        @expandedChange=${(e: CustomEvent) => {
          action('search-expandedChange')(e.detail);
          const contentArea = document.querySelector('#search-demo-content');
          if (contentArea) {
            contentArea.innerHTML = `
              <div style="padding: 2rem; text-align: center;">
                <h3 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Rail ${e.detail.expanded ? 'Expanded' : 'Collapsed'}</h3>
                <p style="color: var(--spectrum-sys-color-on-surface-variant);">
                  ${e.detail.expanded 
                    ? 'Search is now visible and ready for filtering' 
                    : 'Search is hidden in compact mode'}
                </p>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--spectrum-sys-color-${e.detail.expanded ? 'success' : 'warning'}-container); border-radius: 6px;">
                  <strong>Action: ${e.detail.action}</strong><br/>
                  <small>Expansion triggered by: ${e.detail.action} button</small>
                </div>
              </div>
            `;
          }
        }}
        @searchChange=${(e: CustomEvent) => {
          action('search-searchChange')(e.detail);
          const contentArea = document.querySelector('#search-demo-content');
          if (contentArea) {
            const searchValue = e.detail.value;
            contentArea.innerHTML = `
              <div style="padding: 2rem; text-align: center;">
                <h3 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Search Active</h3>
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px;">
                  <strong>Current Search:</strong> "${searchValue}"<br/>
                  <small>Filtering collapsible list items in real-time</small>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
                  ${['Documents', 'Projects', 'Resources', 'Teams'].map(category => `
                    <div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
                      <div style="font-weight: bold; margin-bottom: 0.5rem;">${category}</div>
                      <div style="font-size: 0.8rem; color: var(--spectrum-sys-color-on-surface-variant);">
                        ${searchValue ? `Filtering for "${searchValue}"` : 'All items visible'}
                      </div>
                    </div>
                  `).join('')}
                </div>
                <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-sys-color-secondary-container); border-radius: 6px;">
                  <p style="margin: 0; color: var(--spectrum-sys-color-on-secondary-container); font-size: 0.9rem;">
                    🔍 <strong>Search Features:</strong> Try typing in the search box to see real-time filtering. 
                    The search automatically expands the rail and filters all collapsible list items.
                  </p>
                </div>
              </div>
            `;
          }
        }}
        @railAction=${(e: CustomEvent) => action('search-railAction')(e.detail)}
        @addAction=${(e: CustomEvent) => action('search-addAction')(e.detail)}
        @moreContextAction=${(e: CustomEvent) => action('search-moreContextAction')(e.detail)}
      >
        <spectrum-search-input
          slot="search"
          placeholder="Search documents, projects, resources..."
          size="small"
        ></spectrum-search-input>
        
        ${args.navigationItems.map(item => html`
          <spectrum-rail-item
            slot="items"
            icon=${item.icon}
            label=${item.label}
            action=${item.action}
          ></spectrum-rail-item>
        `)}
        
        <spectrum-collapsible-list
          slot="items"
          .items=${args.collapsibleListData}
          @childAction=${(e: CustomEvent) => action('search-collapsible-action')(e.detail)}
        ></spectrum-collapsible-list>
      </spectrum-rail>
      
      <!-- Dynamic Content Area -->
      <div id="search-demo-content" style="flex: 1; background: var(--spectrum-sys-color-surface); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Search Integration Demo</h3>
        <p style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface-variant); max-width: 400px;">
          Click the search button or menu to expand the rail, then try typing in the search box to see real-time filtering in action.
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; max-width: 300px;">
          ${[
            { action: 'Click Search Button', icon: '🔍', desc: 'Auto-expands rail' },
            { action: 'Type in Search Box', icon: '⌨️', desc: 'Filters content' },
            { action: 'Expand Sections', icon: '📂', desc: 'Browse categories' },
            { action: 'Clear Search', icon: '✨', desc: 'Show all items' }
          ].map(tip => html`
            <div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; text-align: center;">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${tip.icon}</div>
              <div style="font-weight: bold; font-size: 0.9rem; margin-bottom: 0.25rem; color: var(--spectrum-sys-color-on-surface);">${tip.action}</div>
              <div style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant);">${tip.desc}</div>
            </div>
          `)}
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Search integration demonstration showing filtering and navigation enhancement:

### Search Functionality

#### Auto-expansion Behavior
- **Search Button Click**: Automatically expands rail when search is activated
- **Focus Management**: Automatic focus on search input after expansion
- **State Synchronization**: Rail expansion state updates across all components

#### Real-time Filtering
- **Live Filter**: Search value immediately filters collapsible list items
- **Filter Scope**: Searches across all navigation categories and items
- **Responsive Results**: Instant feedback as user types
- **Clear Functionality**: Easy search reset and filter clearing

### Integration Features

#### Search Input Integration
- **Spectrum Search Input**: Uses built-in spectrum-search-input component
- **Slot-based**: Positioned via search slot for flexible placement
- **Size Optimization**: Small size variant optimized for rail layout
- **Placeholder Text**: Descriptive placeholder for user guidance

#### Collapsible List Filtering
- **Automatic Filter**: Search value automatically passed to collapsible list
- **Hierarchical Search**: Filters both parent and child items
- **Match Highlighting**: Visual indication of search matches
- **Category Preservation**: Maintains hierarchical structure during filtering

### Search Categories
- **Documents**: Annual reports, policies, guides, specifications, contracts
- **Projects**: Frontend, backend, mobile, design, testing initiatives
- **Resources**: Tutorials, templates, tools, APIs, code libraries
- **Teams**: Engineering, product, design, marketing, sales teams

### Search Features

#### Smart Expansion
- **Context Awareness**: Search button knows when rail needs expansion
- **Smooth Transitions**: Animated expansion with focus management
- **State Persistence**: Maintains expansion state during search session

#### Real-time Feedback
- **Dynamic Content**: Content area updates based on search activity
- **Visual Indicators**: Shows current search term and filter status
- **Search Statistics**: Displays filtered results and category counts

#### Search Context Actions
- **Search Settings**: Configure search behavior and preferences
- **Search Analytics**: Track search usage and popular terms
- **Export Results**: Save search results for external use
- **Search Help**: Documentation and search tips

### Event System
- **searchChange**: Emitted when search value changes
- **expandedChange**: Triggered by search button interaction
- **Filter Integration**: Automatic filter application to dependent components

### Use Cases
- **Document Management**: Corporate document and file organization
- **Project Navigation**: Development project and resource discovery
- **Knowledge Base**: Information and resource discovery systems
- **Team Directory**: People and organizational unit finding

### Search Optimization
- **Performance**: Efficient real-time filtering with minimal lag
- **Relevance**: Smart matching across labels and metadata
- **Accessibility**: Full keyboard navigation and screen reader support
- **Mobile-friendly**: Touch-optimized search interface

Perfect for building comprehensive search-enabled navigation systems with real-time filtering and intelligent content discovery.
        `
      }
    }
  }
}; 