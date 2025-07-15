import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Import organized examples
import {
  ContextMenuBasic,
  ContextMenuStandard,
  ContextMenuExtended,
  PositionExamples,
  InteractiveDemo,
  EmptyMenuDemo
} from './Examples/BasicExamples';

import {
  FileManagerActions,
  ContentCreationActions,
  TextEditorActions,
  DataTableActions,
  MediaGalleryActions,
  DashboardWidgetActions,
  AllVariantsShowcase
} from './Examples/VariantExamples';

import {
  PositioningDemo,
  RippleEffectsDemo,
  CustomEventHandling,
  DynamicActionLists,
  AccessibilityFeatures,
  PerformanceTest,
  AllFeaturesShowcase
} from './Examples/FeatureExamples';

import {
  FileSystemManager,
  EmailApplication,
  CodeEditorInterface,
  EcommerceProductGrid,
  SocialMediaFeed,
  DashboardAnalytics,
  AllUsageExamples
} from './Examples/UsageExamples';

interface SpectrumContextMenuArgs {
  position: 'auto' | 'top' | 'bottom';
  ripple: boolean;
  actions: Array<{
    id: string;
    label: string;
    icon: string;
    separator?: boolean;
    destructive?: boolean;
  }>;
}

const meta: Meta<SpectrumContextMenuArgs> = {
  title: 'Spectrum/Components/SpectrumContextMenu',
  component: 'spectrum-context-menu',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Spectrum Context Menu

A flexible context menu component for displaying contextual actions and options. Provides intelligent positioning, rich interaction patterns, and comprehensive accessibility support.

## Key Features

- **Smart Positioning**: Auto-adjusts to viewport boundaries with 'auto', 'top', and 'bottom' positioning
- **Rich Actions**: Support for icons, separators, and destructive action styling  
- **Ripple Effects**: Optional visual feedback with configurable ripple animations
- **Event System**: Comprehensive event handling with detailed action information
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized rendering for large action lists and frequent updates

## Integration

This component is used by:
- **spectrum-collapsible-list**: Context actions for list items and hierarchy management
- **spectrum-rail**: "More" button context menu with navigation actions

## Mermaid Dependency Diagram

\`\`\`mermaid
graph TD;
  spectrum-collapsible-list --> spectrum-context-menu
  spectrum-rail --> spectrum-context-menu
  
  style spectrum-context-menu fill:#e1f5fe,stroke:#0277bd,stroke-width:3px
  style spectrum-collapsible-list fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
  style spectrum-rail fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

  classDef features fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
  
  menu-positioning[Smart Positioning<br/>Auto • Top • Bottom<br/>Viewport Aware]
  menu-actions[Action Types<br/>Standard • Destructive<br/>Separators • Icons]
  menu-interactions[Interactions<br/>Click • Keyboard<br/>Ripple Effects]
  
  spectrum-context-menu --> menu-positioning
  spectrum-context-menu --> menu-actions  
  spectrum-context-menu --> menu-interactions
  
  class menu-positioning features
  class menu-actions features
  class menu-interactions features
\`\`\`

## Positioning System

### Auto Positioning (Recommended)
Automatically chooses the best position based on available viewport space.

### Manual Positioning  
- **Top**: Forces menu to appear above the trigger
- **Bottom**: Forces menu to appear below the trigger

## Action Structure

Actions support comprehensive metadata for flexible menu construction:

\`\`\`typescript
interface ContextMenuAction {
  id: string;           // Unique action identifier
  label: string;        // Display text
  icon: string;         // Material Design icon name
  separator?: boolean;  // Renders as visual separator
  destructive?: boolean;// Applies destructive styling (red)
}
\`\`\`

## Use Cases

- **File Management**: Right-click context menus for files and folders
- **Content Creation**: Text editing and formatting actions
- **Data Tables**: Row-level operations and bulk actions
- **Media Libraries**: Asset management and manipulation
- **Dashboard Widgets**: Configuration and management options
- **Code Editors**: Development tools and refactoring actions
        `
      }
    }
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['auto', 'top', 'bottom'],
      description: 'Menu positioning relative to trigger element',
      table: {
        type: { summary: "'auto' | 'top' | 'bottom'" },
        defaultValue: { summary: 'auto' }
      }
    },
    ripple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on action click',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    actions: {
      control: 'object',
      description: 'Array of menu actions with icons and metadata',
      table: {
        type: { summary: 'ContextMenuAction[]' },
        defaultValue: { summary: '[]' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumContextMenuArgs>;

// ==============================================
// Playground Story
// ==============================================

export const SpectrumPlayground: Story = {
  args: {
    position: 'auto',
    ripple: false,
    actions: [
      { id: 'edit', label: 'Edit Item', icon: 'edit' },
      { id: 'copy', label: 'Copy', icon: 'content_copy' },
      { id: 'share', label: 'Share', icon: 'share' },
      { id: 'separator1', label: '', icon: '', separator: true },
      { id: 'archive', label: 'Archive', icon: 'archive' },
      { id: 'delete', label: 'Delete', icon: 'delete', destructive: true }
    ]
  },
  render: (args) => html`
    <div style="display: flex; align-items: center; justify-content: center; min-height: 200px;">
      <div style="position: relative;">
        <button 
          style="padding: 1rem 2rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer; font-size: 1rem;"
          @click=${(e: Event) => {
            const menu = (e.target as Element).nextElementSibling as any;
            menu.show();
          }}
        >
          Click for Context Menu
        </button>
        <spectrum-context-menu
          .position=${args.position}
          .ripple=${args.ripple}
          .actions=${args.actions}
          @contextMenuAction=${(e: CustomEvent) => action('Context Menu Action')(e.detail)}
        ></spectrum-context-menu>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing context menu configurations. Experiment with different positions, ripple effects, and action lists to see how they work together.'
      }
    }
  }
};

// ==============================================
// Basic Examples
// ==============================================

export const SpectrumBasicExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Core Context Menu Types</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Basic Actions</h4>
            ${ContextMenuBasic.render(ContextMenuBasic.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Standard Actions</h4>
            ${ContextMenuStandard.render(ContextMenuStandard.args)}
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Extended Actions</h4>
            ${ContextMenuExtended.render(ContextMenuExtended.args)}
          </div>
          
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Position Examples</h3>
        ${PositionExamples.render()}
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Interactive Features</h3>
        ${InteractiveDemo.render(InteractiveDemo.args)}
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic context menu configurations demonstrating core functionality, positioning options, and interaction patterns. These examples show the foundation of context menu usage.'
      }
    }
  }
};

// ==============================================
// Variant Showcase
// ==============================================

export const SpectrumAllVariants: Story = {
  render: AllVariantsShowcase.render,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive showcase of context menu variants for different application domains including file management, content creation, data tables, media galleries, and dashboard widgets.'
      }
    }
  }
};

// ==============================================
// Feature Demonstrations
// ==============================================

export const SpectrumFeatureDemonstrations: Story = {
  render: AllFeaturesShowcase.render,
  parameters: {
    docs: {
      description: {
        story: 'Advanced context menu features including smart positioning, ripple effects, custom event handling, dynamic action lists, accessibility features, and performance optimizations.'
      }
    }
  }
};

// ==============================================
// Real-World Usage Examples
// ==============================================

export const SpectrumUsageExamples: Story = {
  render: AllUsageExamples.render,
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage patterns showing context menus in file systems, email applications, code editors, e-commerce platforms, social media, and analytics dashboards.'
      }
    }
  }
};

export const SpectrumAccessibilityExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      
      <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">♿ Accessibility Features</h3>
        <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: var(--spectrum-color-on-surface-variant);">
          <li><strong>Keyboard Navigation:</strong> Tab to trigger, Enter/Space to open, arrow keys to navigate</li>
          <li><strong>Screen Reader Support:</strong> Proper ARIA labels, roles, and state announcements</li>
          <li><strong>Focus Management:</strong> Visible focus indicators and logical focus flow</li>
          <li><strong>High Contrast:</strong> Enhanced visibility in high contrast mode</li>
          <li><strong>Reduced Motion:</strong> Respects user's motion preferences for animations</li>
          <li><strong>Touch Accessibility:</strong> Appropriate touch targets for mobile devices</li>
        </ul>
      </div>
      
      <div>
        <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Accessible Context Menu</h4>
        <div style="position: relative; display: inline-block;">
          <button 
            style="padding: 1rem; border: 1px solid var(--spectrum-color-outline); border-radius: 8px; background: var(--spectrum-color-surface); cursor: pointer;"
            aria-label="Document options menu"
            aria-describedby="menu-help-text"
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
            📄 Document Options
          </button>
          <spectrum-context-menu
            position="bottom"
            .actions=${[
              { id: 'open', label: 'Open Document', icon: 'open_in_new' },
              { id: 'edit', label: 'Edit Document', icon: 'edit' },
              { id: 'print', label: 'Print Document', icon: 'print' },
              { id: 'separator1', label: '', icon: '', separator: true },
              { id: 'share', label: 'Share with Others', icon: 'share' },
              { id: 'export', label: 'Export as PDF', icon: 'picture_as_pdf' },
              { id: 'separator2', label: '', icon: '', separator: true },
              { id: 'properties', label: 'Document Properties', icon: 'info' },
              { id: 'separator3', label: '', icon: '', separator: true },
              { id: 'delete', label: 'Delete Document', icon: 'delete', destructive: true }
            ]}
            @contextMenuAction=${(e: CustomEvent) => action('Accessible Action')(e.detail)}
          ></spectrum-context-menu>
          <div id="menu-help-text" style="display: none;">
            Context menu with document operations. Use arrow keys to navigate menu items when open.
          </div>
        </div>
        <p style="margin-top: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          ℹ️ This menu demonstrates full keyboard accessibility with proper ARIA labeling and focus management.
        </p>
      </div>
      
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features and best practices for context menu components, including keyboard navigation, screen reader support, and inclusive design considerations.'
      }
    }
  }
};

// Legacy alias for backward compatibility
export const Default = SpectrumPlayground;