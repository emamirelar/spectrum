import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumRailItem Component
 * 
 * The rail item component provides individual navigation items designed to work within the spectrum-rail component. It automatically adapts between icon-only and expanded states, offering a clean and responsive navigation experience with integrated button functionality.
 * 
 * ### Key Features
 * - **Adaptive Display**: Automatically switches between icon-only and expanded modes
 * - **Button Integration**: Uses spectrum-button internally for consistent interaction
 * - **Icon Support**: Full Material Design icon support with accessibility
 * - **State Management**: Responds to rail expansion state changes
 * - **Action Handling**: Optional action identifiers for click handling
 * - **Accessibility**: Built-in ARIA labels and keyboard navigation support
 * 
 * ### Usage Guidelines
 * - **Use for**: Navigation items within spectrum-rail, sidebar menu items, toolbar buttons
 * - **Perfect for**: Application navigation, dashboard menus, feature toolbars
 * - **Avoid when**: Standalone buttons are needed, complex menu structures without rail context
 * 
 * ### Integration with Rail
 * - **Parent-Child Communication**: Rail component controls expansion state
 * - **Consistent Behavior**: All rail items respond to rail expansion together
 * - **Slot-based**: Designed to be used within rail component slots
 * - **Responsive Design**: Adapts to rail width and expansion state
 * 
 * ### Event System (Component Events Rule Compliant)
 * Rail items inherit button events from the internal spectrum-button component:
 * - **Button Events**: Click, focus, and interaction events from underlying button
 * - **Action Context**: Optional action property for identifying specific items
 */

// Component interfaces for TypeScript support
interface SpectrumRailItemElement extends HTMLElement {
  icon: string;
  label: string;
  action?: string;
  expanded: boolean;
}

// Story arguments interface
interface SpectrumRailItemArgs extends SpectrumRailItemElement {}

// Sample rail item data for different scenarios
const navigationItems = [
  { icon: 'dashboard', label: 'Dashboard', action: 'navigate-dashboard' },
  { icon: 'analytics', label: 'Analytics', action: 'navigate-analytics' },
  { icon: 'people', label: 'Users', action: 'navigate-users' },
  { icon: 'inventory_2', label: 'Products', action: 'navigate-products' },
  { icon: 'settings', label: 'Settings', action: 'navigate-settings' }
];

const toolbarItems = [
  { icon: 'edit', label: 'Edit', action: 'tool-edit' },
  { icon: 'content_copy', label: 'Copy', action: 'tool-copy' },
  { icon: 'delete', label: 'Delete', action: 'tool-delete' },
  { icon: 'share', label: 'Share', action: 'tool-share' },
  { icon: 'download', label: 'Download', action: 'tool-download' }
];

const mediaItems = [
  { icon: 'play_arrow', label: 'Play', action: 'media-play' },
  { icon: 'pause', label: 'Pause', action: 'media-pause' },
  { icon: 'stop', label: 'Stop', action: 'media-stop' },
  { icon: 'skip_previous', label: 'Previous', action: 'media-previous' },
  { icon: 'skip_next', label: 'Next', action: 'media-next' },
  { icon: 'volume_up', label: 'Volume', action: 'media-volume' }
];

const workflowItems = [
  { icon: 'inbox', label: 'Inbox', action: 'workflow-inbox' },
  { icon: 'task_alt', label: 'Tasks', action: 'workflow-tasks' },
  { icon: 'assignment', label: 'Projects', action: 'workflow-projects' },
  { icon: 'calendar_today', label: 'Calendar', action: 'workflow-calendar' },
  { icon: 'notifications', label: 'Notifications', action: 'workflow-notifications' },
  { icon: 'help', label: 'Help', action: 'workflow-help' }
];

const meta: Meta<SpectrumRailItemArgs> = {
  title: 'Spectrum/Components/SpectrumRailItem', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-rail-item\` component provides individual navigation items designed for use within the \`spectrum-rail\` component.

### Rail Item Structure

#### Basic Rail Item
\`\`\`typescript
interface RailItem {
  icon: string;      // Material Design icon name (required)
  label: string;     // Display text (required)
  action?: string;   // Optional action identifier
  expanded: boolean; // Current expansion state
}
\`\`\`

### Component Integration

#### Within Rail Component
\`\`\`html
<spectrum-rail>
  <spectrum-rail-item 
    slot="items"
    icon="dashboard" 
    label="Dashboard"
    action="navigate-dashboard">
  </spectrum-rail-item>
  <!-- More items... -->
</spectrum-rail>
\`\`\`

#### Standalone Usage
\`\`\`html
<spectrum-rail-item 
  icon="analytics" 
  label="Analytics"
  expanded="true"
  action="view-analytics">
</spectrum-rail-item>
\`\`\`

### State Management

#### Expansion States
- **Collapsed**: Shows icon only with tooltip
- **Expanded**: Shows icon and label together
- **Auto-responsive**: Adapts to parent rail state

#### State Control
- **Parent-controlled**: Rail component manages expansion state
- **Method-based**: \`onRailExpandedChange()\` for state updates
- **Responsive**: Automatic adaptation to rail width changes

### Icon Guidelines

#### Material Design Icons
All Material Design icons are supported:
\`\`\`html
<!-- Navigation icons -->
<spectrum-rail-item icon="home" label="Home" />
<spectrum-rail-item icon="search" label="Search" />

<!-- Action icons -->
<spectrum-rail-item icon="edit" label="Edit" />
<spectrum-rail-item icon="delete" label="Delete" />

<!-- Status icons -->
<spectrum-rail-item icon="notifications" label="Notifications" />
<spectrum-rail-item icon="settings" label="Settings" />
\`\`\`

### Button Integration

#### Internal Button Component
- **Spectrum Button**: Uses internal \`spectrum-button\` with \`ghost\` variant
- **Icon-only Mode**: Button configured for icon-only display
- **Accessibility**: Inherits button accessibility features
- **Interactions**: All button events and states available

#### Event Handling
\`\`\`html
<spectrum-rail-item 
  icon="dashboard" 
  label="Dashboard"
  @click=\${handleNavigation}>
</spectrum-rail-item>
\`\`\`

### Accessibility Features

#### Built-in Support
- **ARIA Labels**: Automatic labeling from label property
- **Keyboard Navigation**: Full tab and enter support
- **Screen Readers**: Proper semantic structure
- **Tooltips**: Label displayed as tooltip in collapsed state

#### Best Practices
- **Descriptive Labels**: Use clear, concise labels
- **Consistent Icons**: Use recognizable Material Design icons
- **Logical Order**: Organize items in intuitive navigation order

### Common Use Cases

#### Application Navigation
- **Dashboard Navigation**: Main app section links
- **Feature Access**: Quick access to key features
- **Settings Navigation**: Configuration and admin access

#### Toolbar Items
- **Action Buttons**: Edit, copy, delete, share operations
- **Tool Selection**: Different tool modes or options
- **Quick Actions**: Frequently used functionality

#### Media Controls
- **Playback Controls**: Play, pause, stop, skip
- **Volume Control**: Audio level management
- **Media Navigation**: Track or content selection

### Design Integration

#### Theme Compatibility
- **Color System**: Inherits from Spectrum color tokens
- **Typography**: Consistent with button typography
- **Spacing**: Harmonious with rail component spacing
- **Focus States**: Clear focus indicators for accessibility

#### Responsive Behavior
- **Mobile Friendly**: Touch-friendly interaction targets
- **Flexible Sizing**: Adapts to different rail widths
- **Smooth Transitions**: Animated state changes

### Basic Usage
\`\`\`html
<!-- Simple navigation item -->
<spectrum-rail-item 
  icon="dashboard" 
  label="Dashboard">
</spectrum-rail-item>

<!-- With action identifier -->
<spectrum-rail-item 
  icon="analytics" 
  label="Analytics"
  action="view-analytics">
</spectrum-rail-item>

<!-- Expanded state -->
<spectrum-rail-item 
  icon="settings" 
  label="Settings"
  expanded="true">
</spectrum-rail-item>
\`\`\`
        `
      }
    }
  },
  args: {
    icon: 'dashboard',
    label: 'Dashboard',
    action: 'navigate-dashboard',
    expanded: false
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'Material Design icon name for the rail item (required)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    label: {
      control: 'text',
      description: 'Display text for the rail item (required)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    action: {
      control: 'text',
      description: 'Optional action identifier for click event handling',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    expanded: {
      control: 'boolean',
      description: 'Current expansion state (typically controlled by parent rail)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumRailItemArgs>;

// Interactive render function
const renderRailItem = (args: SpectrumRailItemArgs) => {
  return html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; display: flex; justify-content: center; align-items: center; min-height: 150px;">
      <spectrum-rail-item
        icon=${args.icon}
        label=${args.label}
        action=${args.action || ''}
        .expanded=${args.expanded}
        @click=${(e: Event) => {
          action('rail-item-click')({ 
            action: args.action || 'click',
            label: args.label,
            icon: args.icon,
            expanded: args.expanded
          });
          console.log('Rail item clicked:', { label: args.label, action: args.action });
        }}
      ></spectrum-rail-item>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all rail item features and configurations.
 * Experiment with different icons, labels, expansion states, and actions.
 */
export const Playground: Story = {
  render: renderRailItem
};

/**
 * Expansion state comparison showing both collapsed (icon-only) and expanded (icon + label) modes.
 * Demonstrates how rail items adapt their display based on available space.
 */
export const ExpansionStates: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Expansion State Comparison</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 2rem; align-items: center;">
        <!-- Collapsed State -->
        <div style="text-align: center;">
          <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1.5rem;">Collapsed (Icon Only)</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center; padding: 1.5rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
            ${navigationItems.slice(0, 3).map(item => html`
              <spectrum-rail-item
                icon=${item.icon}
                label=${item.label}
                action=${item.action}
                .expanded=${false}
                @click=${(e: Event) => action('collapsed-item-click')({ action: item.action, label: item.label })}
              ></spectrum-rail-item>
            `)}
          </div>
          <p style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            Compact mode showing icons with tooltips
          </p>
        </div>
        
        <!-- Expanded State -->
        <div style="text-align: center;">
          <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1.5rem;">Expanded (Icon + Label)</h4>
          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: stretch; padding: 1.5rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline); width: 200px; margin: 0 auto;">
            ${navigationItems.slice(0, 3).map(item => html`
              <spectrum-rail-item
                icon=${item.icon}
                label=${item.label}
                action=${item.action}
                .expanded=${true}
                @click=${(e: Event) => action('expanded-item-click')({ action: item.action, label: item.label })}
              ></spectrum-rail-item>
            `)}
          </div>
          <p style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
            Full display with icons and labels
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Expansion state comparison demonstrating the adaptive nature of rail items:

### Collapsed State (Icon Only)
- **Compact Design**: Minimal space usage for narrow rails
- **Tooltip Labels**: Hover reveals full label text
- **Icon Focus**: Clear visual icons for quick recognition
- **Space Efficient**: Perfect for mobile or constrained layouts

### Expanded State (Icon + Label)
- **Full Display**: Both icon and label visible
- **Enhanced Readability**: Clear text labels for all items
- **Wider Layout**: Requires more horizontal space
- **Desktop Optimal**: Best for desktop and tablet interfaces

### Adaptive Behavior
Rail items automatically switch between these states based on the parent rail component's expansion setting, providing a seamless responsive navigation experience.
        `
      }
    }
  }
};

/**
 * Navigation menu demonstration showing common application navigation patterns.
 * Features dashboard, analytics, user management, and settings sections.
 */
export const NavigationMenu: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Application Navigation Menu</h3>
      
      <div style="display: grid; grid-template-columns: auto 1fr; gap: 2rem; margin-top: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        <!-- Navigation Rail Simulation -->
        <div style="background: var(--spectrum-sys-color-surface); border-radius: 8px; padding: 1rem; border: 1px solid var(--spectrum-sys-color-outline); width: 220px;">
          <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface); font-size: 1rem;">Main Navigation</h4>
          <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${navigationItems.map((item, index) => html`
              <spectrum-rail-item
                icon=${item.icon}
                label=${item.label}
                action=${item.action}
                .expanded=${true}
                @click=${(e: Event) => {
                  action('navigation-click')({ action: item.action, label: item.label });
                  // Highlight selected item
                  const railItems = e.target?.parentElement?.querySelectorAll('spectrum-rail-item');
                  railItems?.forEach((item: any) => {
                    item.style.background = '';
                  });
                  (e.target as any).style.background = 'var(--spectrum-sys-color-primary-container)';
                }}
                style=${index === 0 ? 'background: var(--spectrum-sys-color-primary-container); border-radius: 4px;' : ''}
              ></spectrum-rail-item>
            `)}
          </nav>
        </div>
        
        <!-- Content Area Simulation -->
        <div style="background: var(--spectrum-sys-color-surface); border-radius: 8px; padding: 2rem; border: 1px solid var(--spectrum-sys-color-outline); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <div style="color: var(--spectrum-sys-color-on-surface-variant);">
            <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Content Area</h4>
            <p style="margin: 0; font-size: 0.9rem;">Click navigation items to see events in the Actions panel</p>
            <div style="margin-top: 1.5rem; padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
              <p style="margin: 0; font-size: 0.8rem; color: var(--spectrum-sys-color-on-surface-variant);">
                💡 <strong>Interactive Demo:</strong> Click any navigation item to see the event handling and visual feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Application navigation menu demonstrating real-world usage:

### Navigation Structure
- **Dashboard**: Overview and key metrics
- **Analytics**: Data analysis and reporting
- **Users**: User management and profiles
- **Products**: Inventory and catalog management
- **Settings**: Configuration and preferences

### Interactive Features
- **Click Handling**: Each item emits events with action identifiers
- **Visual Feedback**: Selected item highlighting
- **Event Logging**: Actions panel shows all interactions
- **Realistic Layout**: Simulated rail and content area structure

### Use Cases
- **Admin Dashboards**: Main navigation for admin interfaces
- **Application Menus**: Primary navigation for web applications
- **Feature Access**: Quick access to major application sections
- **Mobile Navigation**: Adaptable for responsive designs

Perfect for building consistent navigation experiences across applications.
        `
      }
    }
  }
};

/**
 * Toolbar items demonstration showing action-oriented rail items for editing and content management.
 * Features common toolbar actions like edit, copy, delete, share, and download.
 */
export const ToolbarActions: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Toolbar Action Items</h3>
      
      <!-- Horizontal Toolbar -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">Horizontal Toolbar</h4>
        <div style="display: flex; gap: 0.5rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline); justify-content: center; flex-wrap: wrap;">
          ${toolbarItems.map(item => html`
            <spectrum-rail-item
              icon=${item.icon}
              label=${item.label}
              action=${item.action}
              .expanded=${false}
              @click=${(e: Event) => action('toolbar-action')({ action: item.action, label: item.label })}
              style="flex: 0 0 auto;"
            ></spectrum-rail-item>
          `)}
        </div>
        <p style="margin-top: 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem; text-align: center;">
          Collapsed rail items perfect for horizontal toolbars
        </p>
      </div>
      
      <!-- Vertical Toolbar -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">Vertical Action Panel</h4>
        <div style="display: flex; gap: 2rem; justify-content: center; align-items: flex-start;">
          <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
            ${toolbarItems.slice(0, 4).map(item => html`
              <spectrum-rail-item
                icon=${item.icon}
                label=${item.label}
                action=${item.action}
                .expanded=${true}
                @click=${(e: Event) => action('vertical-toolbar-action')({ action: item.action, label: item.label })}
              ></spectrum-rail-item>
            `)}
          </div>
          
          <!-- Context Simulation -->
          <div style="flex: 1; max-width: 300px; background: var(--spectrum-sys-color-surface); border-radius: 8px; padding: 2rem; border: 1px solid var(--spectrum-sys-color-outline); text-align: center;">
            <div style="height: 120px; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: var(--spectrum-sys-color-on-surface-variant); margin-bottom: 1rem;">
              Content Area
            </div>
            <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
              Use toolbar actions to interact with content
            </p>
          </div>
        </div>
        <p style="margin-top: 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem; text-align: center;">
          Expanded rail items for vertical action panels
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Toolbar action items for content editing and management:

### Horizontal Toolbar
- **Icon-only Display**: Compact layout for space-constrained toolbars
- **Quick Actions**: Edit, copy, delete, share, download functionality
- **Responsive Layout**: Flexbox wrapping for different screen sizes
- **Tooltip Labels**: Hover to see action descriptions

### Vertical Action Panel
- **Expanded Display**: Full icon and label visibility
- **Sidebar Layout**: Perfect for side panel toolbars
- **Content Context**: Positioned alongside main content area
- **Clear Actions**: Descriptive labels for all operations

### Common Toolbar Actions
- **Edit**: Modify content and settings
- **Copy**: Duplicate items or copy to clipboard
- **Delete**: Remove items with confirmation
- **Share**: Social sharing and collaboration
- **Download**: Export and save functionality

### Use Cases
- **Content Editors**: Rich text and media editing tools
- **File Managers**: File operation toolbars
- **Image Editors**: Photo and graphic editing tools
- **Document Viewers**: Document manipulation actions

Perfect for building feature-rich editing interfaces and content management tools.
        `
      }
    }
  }
};

/**
 * Media control demonstration showing rail items for audio/video playback controls.
 * Features play, pause, stop, skip, and volume controls with media-specific icons.
 */
export const MediaControls: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Media Player Controls</h3>
      
      <!-- Media Player Simulation -->
      <div style="margin-top: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
        <!-- Player Display -->
        <div style="background: var(--spectrum-sys-color-surface); border-radius: 8px; padding: 2rem; border: 1px solid var(--spectrum-sys-color-outline); text-align: center; margin-bottom: 1rem;">
          <div style="width: 80px; height: 80px; background: linear-gradient(135deg, var(--spectrum-sys-color-primary), var(--spectrum-sys-color-secondary)); border-radius: 50%; margin: 0 auto 1rem auto; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem;">
            🎵
          </div>
          <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Now Playing</h4>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Sample Audio Track</p>
          
          <!-- Progress Bar Simulation -->
          <div style="margin: 1.5rem 0; background: var(--spectrum-sys-color-surface-container); height: 4px; border-radius: 2px; position: relative;">
            <div style="background: var(--spectrum-sys-color-primary); height: 100%; width: 35%; border-radius: 2px;"></div>
          </div>
          
          <div style="display: flex; justify-content: space-between; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem;">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>
        
        <!-- Media Controls -->
        <div style="display: flex; gap: 0.5rem; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline); justify-content: center; align-items: center;">
          ${mediaItems.map(item => html`
            <spectrum-rail-item
              icon=${item.icon}
              label=${item.label}
              action=${item.action}
              .expanded=${false}
              @click=${(e: Event) => {
                action('media-control')({ action: item.action, label: item.label });
                // Visual feedback for media controls
                const button = e.target as any;
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  button.style.transform = 'scale(1)';
                }, 150);
              }}
              style="flex: 0 0 auto;"
            ></spectrum-rail-item>
          `)}
        </div>
      </div>
      
      <!-- Expanded Media Controls -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem; text-align: center;">Extended Media Panel</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; max-width: 600px; margin: 0 auto;">
          ${mediaItems.map(item => html`
            <spectrum-rail-item
              icon=${item.icon}
              label=${item.label}
              action=${item.action}
              .expanded=${true}
              @click=${(e: Event) => action('extended-media-control')({ action: item.action, label: item.label })}
              style="justify-self: center;"
            ></spectrum-rail-item>
          `)}
        </div>
        <p style="margin-top: 1rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem; text-align: center;">
          Expanded controls with full labels for detailed media interfaces
        </p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Media player controls demonstrating entertainment and audio/video applications:

### Compact Player Controls
- **Essential Controls**: Play, pause, stop, skip navigation
- **Volume Control**: Audio level management
- **Icon-only Layout**: Space-efficient horizontal arrangement
- **Visual Feedback**: Scale animation on interaction

### Extended Media Panel
- **Full Label Display**: Clear action descriptions
- **Grid Layout**: Organized control arrangement
- **Accessibility**: Enhanced readability for all users
- **Detailed Interface**: Perfect for desktop media applications

### Media Control Actions
- **Play/Pause**: Primary playback control
- **Stop**: Full playback termination
- **Skip Previous/Next**: Track navigation
- **Volume**: Audio level adjustment

### Use Cases
- **Audio Players**: Music streaming and podcast applications
- **Video Players**: Movie and video streaming interfaces
- **Media Editors**: Timeline and playback control
- **Presentation Tools**: Slideshow and media presentation controls

### Integration Features
- **Event Handling**: All controls emit specific action events
- **Visual States**: Interactive feedback for user actions
- **Responsive Layout**: Adapts to different screen sizes
- **Consistent Styling**: Harmonious with media player aesthetics

Perfect for building comprehensive media playback interfaces and entertainment applications.
        `
      }
    }
  }
};

/**
 * Workflow and productivity demonstration showing rail items for task management and collaboration.
 * Features inbox, tasks, projects, calendar, notifications, and help sections.
 */
export const WorkflowItems: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Productivity & Workflow Navigation</h3>
      
      <!-- Workflow Dashboard Simulation -->
      <div style="margin-top: 2rem; display: grid; grid-template-columns: 240px 1fr; gap: 2rem; max-width: 800px; margin-left: auto; margin-right: auto;">
        <!-- Workflow Sidebar -->
        <div style="background: var(--spectrum-sys-color-surface); border-radius: 8px; padding: 1.5rem; border: 1px solid var(--spectrum-sys-color-outline);">
          <h4 style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface); font-size: 1rem;">Workspace</h4>
          <nav style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${workflowItems.map((item, index) => {
              // Add badge counts for some items
              const badges = {
                'workflow-inbox': '12',
                'workflow-tasks': '5',
                'workflow-notifications': '3'
              };
              const badge = badges[item.action as keyof typeof badges];
              
              return html`
                <div style="position: relative;">
                  <spectrum-rail-item
                    icon=${item.icon}
                    label=${item.label}
                    action=${item.action}
                    .expanded=${true}
                    @click=${(e: Event) => {
                      action('workflow-navigation')({ action: item.action, label: item.label });
                      // Update selection state
                      const container = e.target?.closest('nav');
                      container?.querySelectorAll('spectrum-rail-item').forEach((item: any) => {
                        item.style.background = '';
                      });
                      (e.target as any).style.background = 'var(--spectrum-sys-color-primary-container)';
                      (e.target as any).style.borderRadius = '4px';
                    }}
                    style=${index === 0 ? 'background: var(--spectrum-sys-color-primary-container); border-radius: 4px;' : ''}
                  ></spectrum-rail-item>
                  ${badge ? html`
                    <div style="position: absolute; top: -4px; right: -4px; background: var(--spectrum-sys-color-error); color: var(--spectrum-sys-color-on-error); border-radius: 10px; padding: 2px 6px; font-size: 0.7rem; font-weight: bold; min-width: 16px; text-align: center;">
                      ${badge}
                    </div>
                  ` : ''}
                </div>
              `;
            })}
          </nav>
        </div>
        
        <!-- Workflow Content Area -->
        <div style="background: var(--spectrum-sys-color-surface); border-radius: 8px; padding: 2rem; border: 1px solid var(--spectrum-sys-color-outline);">
          <div style="text-align: center; margin-bottom: 2rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-surface);">Inbox</h4>
            <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
              12 new messages and notifications
            </p>
          </div>
          
          <!-- Mock Inbox Items -->
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${[
              { title: 'Project Update: Design System v2.0', time: '2 hours ago', priority: 'high' },
              { title: 'Team Meeting: Sprint Planning', time: '4 hours ago', priority: 'medium' },
              { title: 'Code Review: Feature Branch', time: '1 day ago', priority: 'low' }
            ].map(item => html`
              <div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; border-left: 4px solid ${item.priority === 'high' ? 'var(--spectrum-sys-color-error)' : item.priority === 'medium' ? 'var(--spectrum-sys-color-secondary)' : 'var(--spectrum-sys-color-surface-variant)'};">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem;">
                  <h5 style="margin: 0; color: var(--spectrum-sys-color-on-surface); font-size: 0.9rem;">${item.title}</h5>
                  <span style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem; white-space: nowrap; margin-left: 1rem;">${item.time}</span>
                </div>
                <span style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem; text-transform: uppercase;">${item.priority} priority</span>
              </div>
            `)}
          </div>
          
          <div style="margin-top: 2rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px; text-align: center;">
            <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.9rem;">
              💼 <strong>Productivity Tip:</strong> Click different workflow items to navigate between sections and see the badge notifications.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Workflow Summary -->
      <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; max-width: 600px; margin-left: auto; margin-right: auto;">
        ${workflowItems.slice(0, 4).map(item => html`
          <div style="text-align: center; padding: 1.5rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
            <spectrum-rail-item
              icon=${item.icon}
              label=${item.label}
              action=${item.action}
              .expanded=${false}
              @click=${(e: Event) => action('workflow-summary-click')({ action: item.action, label: item.label })}
              style="margin-bottom: 0.5rem;"
            ></spectrum-rail-item>
            <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem;">
              ${item.label} overview
            </p>
          </div>
        `)}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Productivity and workflow navigation for team collaboration applications:

### Workflow Sidebar Navigation
- **Inbox Management**: Message and notification center with badge counts
- **Task Tracking**: Personal and team task management
- **Project Organization**: Project overview and collaboration
- **Calendar Integration**: Schedule and meeting management
- **Notification Center**: Alert and update management
- **Help & Support**: Documentation and assistance

### Interactive Features
- **Badge Notifications**: Visual indicators for unread items and updates
- **Selection States**: Active item highlighting for navigation clarity
- **Real-time Updates**: Dynamic content area updates based on selection
- **Priority Indicators**: Visual priority levels for inbox items

### Content Integration
- **Dynamic Content**: Realistic inbox and workflow content examples
- **Priority System**: High, medium, low priority visual indicators
- **Time Stamps**: Contextual timing information for items
- **Status Updates**: Project and task progress indicators

### Use Cases
- **Team Collaboration**: Slack, Microsoft Teams style interfaces
- **Project Management**: Asana, Trello dashboard navigation
- **Email Applications**: Gmail, Outlook sidebar navigation
- **Productivity Suites**: Notion, Airtable workspace organization

### Design Patterns
- **Consistent Iconography**: Clear, recognizable Material Design icons
- **Visual Hierarchy**: Proper spacing and typography organization
- **Responsive Layout**: Adaptable to different screen sizes
- **Interactive Feedback**: Clear selection and hover states

Perfect for building comprehensive productivity and collaboration interfaces with intuitive navigation patterns.
        `
      }
    }
  }
};

/**
 * Icon variety showcase demonstrating the extensive range of Material Design icons available.
 * Shows categories like navigation, actions, communication, content, and system icons.
 */
export const IconVariety: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Material Design Icon Variety</h3>
      
      <!-- Icon Categories -->
      ${[
        {
          title: 'Navigation Icons',
          description: 'Common navigation and directional icons',
          icons: [
            { icon: 'home', label: 'Home' },
            { icon: 'search', label: 'Search' },
            { icon: 'menu', label: 'Menu' },
            { icon: 'arrow_back', label: 'Back' },
            { icon: 'arrow_forward', label: 'Forward' },
            { icon: 'expand_more', label: 'Expand' }
          ]
        },
        {
          title: 'Action Icons',
          description: 'Interactive actions and operations',
          icons: [
            { icon: 'add', label: 'Add' },
            { icon: 'edit', label: 'Edit' },
            { icon: 'delete', label: 'Delete' },
            { icon: 'save', label: 'Save' },
            { icon: 'download', label: 'Download' },
            { icon: 'upload', label: 'Upload' }
          ]
        },
        {
          title: 'Communication Icons',
          description: 'Messaging and social interaction icons',
          icons: [
            { icon: 'email', label: 'Email' },
            { icon: 'chat', label: 'Chat' },
            { icon: 'call', label: 'Call' },
            { icon: 'video_call', label: 'Video Call' },
            { icon: 'share', label: 'Share' },
            { icon: 'notifications', label: 'Notifications' }
          ]
        },
        {
          title: 'Content Icons',
          description: 'Content types and media icons',
          icons: [
            { icon: 'article', label: 'Article' },
            { icon: 'image', label: 'Image' },
            { icon: 'video_library', label: 'Video' },
            { icon: 'library_music', label: 'Music' },
            { icon: 'description', label: 'Document' },
            { icon: 'folder', label: 'Folder' }
          ]
        },
        {
          title: 'System Icons',
          description: 'System and configuration icons',
          icons: [
            { icon: 'settings', label: 'Settings' },
            { icon: 'security', label: 'Security' },
            { icon: 'account_circle', label: 'Account' },
            { icon: 'info', label: 'Information' },
            { icon: 'help', label: 'Help' },
            { icon: 'bug_report', label: 'Bug Report' }
          ]
        }
      ].map(category => html`
        <div style="margin-top: 2rem;">
          <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 0.5rem;">${category.title}</h4>
          <p style="margin: 0 0 1.5rem 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">${category.description}</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
            ${category.icons.map(item => html`
              <div style="text-align: center; padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 6px; border: 1px solid var(--spectrum-sys-color-outline);">
                <spectrum-rail-item
                  icon=${item.icon}
                  label=${item.label}
                  action="demo-${item.icon}"
                  .expanded=${true}
                  @click=${(e: Event) => action('icon-demo-click')({ icon: item.icon, label: item.label })}
                  style="margin-bottom: 0.5rem;"
                ></spectrum-rail-item>
                <code style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-surface-variant); background: var(--spectrum-sys-color-surface-container); padding: 2px 4px; border-radius: 3px;">
                  ${item.icon}
                </code>
              </div>
            `)}
          </div>
        </div>
      `)}
      
      <!-- Icon Usage Guidelines -->
      <div style="margin-top: 3rem; padding: 2rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border: 1px solid var(--spectrum-sys-color-outline);">
        <h4 style="margin: 0 0 1rem 0; color: var(--spectrum-sys-color-on-surface);">Icon Usage Guidelines</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
          <div>
            <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-primary);">✅ Best Practices</h5>
            <ul style="margin: 0; padding-left: 1.25rem; color: var(--spectrum-sys-color-on-surface); font-size: 0.9rem;">
              <li>Use recognizable, standard icons</li>
              <li>Maintain consistent icon style</li>
              <li>Provide clear, descriptive labels</li>
              <li>Group related functionality</li>
            </ul>
          </div>
          <div>
            <h5 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-error);">❌ Avoid</h5>
            <ul style="margin: 0; padding-left: 1.25rem; color: var(--spectrum-sys-color-on-surface); font-size: 0.9rem;">
              <li>Ambiguous or unclear icons</li>
              <li>Too many icon variations</li>
              <li>Icons without proper labels</li>
              <li>Overloading with excessive icons</li>
            </ul>
          </div>
        </div>
        <div style="margin-top: 1.5rem; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px;">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.9rem;">
            <strong>💡 Icon Resources:</strong> Visit <a href="https://fonts.google.com/icons" target="_blank" style="color: var(--spectrum-sys-color-on-primary-container); text-decoration: underline;">Google Material Icons</a> for the complete icon library and names.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Comprehensive Material Design icon variety demonstration:

### Icon Categories

#### Navigation Icons
- **Directional**: Home, back, forward, expand navigation
- **Discovery**: Search, menu, and exploration tools
- **Orientation**: Clear directional and positional guidance

#### Action Icons
- **CRUD Operations**: Add, edit, delete, save functionality
- **File Operations**: Download, upload, file management
- **Interactive Elements**: Clear action-oriented icons

#### Communication Icons
- **Messaging**: Email, chat, and communication tools
- **Social Features**: Share, notifications, collaboration
- **Contact Methods**: Call, video call, messaging options

#### Content Icons
- **Media Types**: Article, image, video, music content
- **Organization**: Document, folder, library management
- **Content Creation**: Various content type representations

#### System Icons
- **Configuration**: Settings, security, account management
- **Information**: Help, info, documentation access
- **System Functions**: Bug reports, system status, admin tools

### Implementation Guidelines

#### Icon Selection
- **Semantic Clarity**: Choose icons that clearly represent their function
- **User Familiarity**: Use standard, recognizable Material Design icons
- **Consistent Style**: Maintain unified icon design language
- **Cultural Awareness**: Consider international icon recognition

#### Label Pairing
- **Descriptive Text**: Always pair icons with clear labels
- **Accessibility**: Support screen readers with proper labels
- **Internationalization**: Translatable label text
- **Contextual Clarity**: Labels that explain icon purpose

#### Visual Hierarchy
- **Grouping**: Organize related icons together
- **Priority**: Place important actions prominently
- **Spacing**: Maintain consistent spacing and alignment
- **Size Consistency**: Uniform icon sizing throughout interface

Perfect for building intuitive, accessible, and internationally-friendly navigation interfaces.
        `
      }
    }
  }
}; 