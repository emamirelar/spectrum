import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumPanel Component
 * 
 * The panel component provides a versatile content container with optional background effects, customizable sizing, and title management. It serves as a foundation for building cards, modals, sidebars, and other content containers with consistent styling and behavior.
 * 
 * ### Key Features
 * - **Background Effects**: Opaque, frost effects (partial/full), and transparent options
 * - **Flexible Sizing**: Preset sizes (small, medium, large, full, auto) plus custom dimensions
 * - **Title Management**: Optional titles with editable functionality
 * - **Content Organization**: Structured content area with optional padding control
 * - **Styling Flexibility**: CSS custom properties for theme integration
 * - **Event System**: Title change events with action-based payload structure
 * 
 * ### Usage Guidelines
 * - **Use for**: Content containers, cards, modals, sidebars, dashboards, forms, galleries
 * - **Perfect for**: Building consistent UI layouts with optional background effects
 * - **Avoid when**: Simple divs without styling would suffice, or when maximum customization is needed
 * 
 * ### Background Levels
 * - **Opaque**: Solid background for standard containers
 * - **Partial Frost**: Translucent with subtle blur for overlay effects
 * - **Full Frost**: Heavy blur and translucency for modal/popup backgrounds
 * - **Transparent**: No background for content-only containers
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **titleChanged**: Emitted when editable titles are modified with action and value
 */

// Component interfaces for TypeScript support
interface SpectrumPanelElement extends HTMLElement {
  background: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent';
  frost: boolean; // deprecated
  debug: boolean;
  size: 'small' | 'medium' | 'large' | 'full' | 'auto';
  width?: string;
  height?: string;
  noPadding: boolean;
  panelTitle?: string;
  titleEditable: boolean;
}

// Story arguments interface
interface SpectrumPanelArgs extends SpectrumPanelElement {
  content: string;
}

// Sample content for demonstrations
const sampleContent = {
  short: "This is a short content example to demonstrate the panel component.",
  medium: `This is a medium-length content example that shows how the panel component handles moderate amounts of text and content. It includes multiple sentences to demonstrate text flow and spacing within the panel container.`,
  long: `This is a longer content example that demonstrates how the panel component handles extensive amounts of text and content. It includes multiple paragraphs and various content types to show how the panel maintains readability and proper spacing.

This second paragraph shows how the panel handles multi-paragraph content with proper vertical spacing and text flow. The panel component is designed to be flexible and accommodate various content types while maintaining consistent styling.

Here's a third paragraph that further demonstrates the panel's content handling capabilities. The panel maintains proper typography and spacing regardless of content length, making it suitable for various use cases from simple cards to complex content containers.`,
  structured: `
<h3 style="margin-top: 0; color: var(--spectrum-sys-color-primary);">Featured Content</h3>
<p>This example shows how the panel handles structured HTML content with headings, paragraphs, and other elements.</p>
<ul style="margin: 1rem 0; padding-left: 1.5rem;">
  <li>✅ Flexible content support</li>
  <li>✅ Proper typography spacing</li>
  <li>✅ Theme-aware styling</li>
  <li>✅ Responsive behavior</li>
</ul>
<div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px; margin: 1rem 0;">
  <strong>Note:</strong> The panel component preserves the styling and structure of any content placed within it while providing consistent container behavior.
</div>
  `,
  dashboard: `
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
  <div style="text-align: center; padding: 1rem; background: var(--spectrum-sys-color-primary-container); border-radius: 8px;">
    <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-primary-container);">Users</h4>
    <span style="font-size: 1.5rem; font-weight: bold; color: var(--spectrum-sys-color-on-primary-container);">1,234</span>
  </div>
  <div style="text-align: center; padding: 1rem; background: var(--spectrum-sys-color-secondary-container); border-radius: 8px;">
    <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-secondary-container);">Revenue</h4>
    <span style="font-size: 1.5rem; font-weight: bold; color: var(--spectrum-sys-color-on-secondary-container);">$56.7K</span>
  </div>
  <div style="text-align: center; padding: 1rem; background: var(--spectrum-sys-color-tertiary-container); border-radius: 8px;">
    <h4 style="margin: 0 0 0.5rem 0; color: var(--spectrum-sys-color-on-tertiary-container);">Growth</h4>
    <span style="font-size: 1.5rem; font-weight: bold; color: var(--spectrum-sys-color-on-tertiary-container);">+12%</span>
  </div>
</div>
<p style="color: var(--spectrum-sys-color-on-surface-variant); margin: 0;">Dashboard content showing key metrics and performance indicators in a clean, organized layout.</p>
  `
};

const meta: Meta<SpectrumPanelArgs> = {
  title: 'Spectrum/Components/SpectrumPanel', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-panel\` component provides a versatile content container with flexible styling and optional effects.

### Panel Structure

#### Basic Usage
\`\`\`html
<spectrum-panel 
  background="opaque"
  size="medium"
  panel-title="My Panel">
  <!-- Your content here -->
</spectrum-panel>
\`\`\`

### Background Effects

#### Opaque (Default)
- **Solid background**: Standard container with full opacity
- **Best for**: Primary content areas, cards, standard containers
- **Use case**: Most general-purpose containers

#### Frost Effects
- **Partial Frost**: Subtle translucency with light blur
- **Full Frost**: Heavy translucency with strong blur effect
- **Best for**: Overlays, modal backgrounds, floating elements
- **Use case**: Elements that need to sit over other content

#### Transparent
- **No background**: Content-only container
- **Best for**: Structural layout without visual container
- **Use case**: When you only need content organization

### Size Presets

#### Preset Sizes
- **Small**: Compact containers for minimal content
- **Medium**: Balanced size for moderate content
- **Large**: Spacious containers for extensive content
- **Full**: Occupies all available space (default)
- **Auto**: Sizes to content dimensions

#### Custom Dimensions
- **Width**: Any CSS width value (\`300px\`, \`50%\`, \`20rem\`)
- **Height**: Any CSS height value (\`200px\`, \`100vh\`, \`auto\`)
- **Override**: Custom dimensions override preset sizes

### Title Management

#### Static Titles
- **Display**: Simple title display at panel top
- **Styling**: Consistent typography and spacing
- **Optional**: Can be omitted for title-less panels

#### Editable Titles
- **Interactive**: Click to edit title text
- **Events**: Emits \`titleChanged\` event on modification
- **Keyboard**: Enter key saves, Escape cancels
- **Integration**: Perfect for dashboard widgets and user content

### Content Organization

#### Padding Control
- **Default Padding**: Standard spacing around content
- **No Padding**: Remove padding for edge-to-edge content
- **Use Cases**: Image galleries, full-width content, custom layouts

#### Content Flexibility
- **HTML Support**: Full HTML content support
- **Responsive**: Adapts to various screen sizes
- **Typography**: Inherits theme typography settings

### Integration Examples

#### Component Dependencies
Used by: \`spectrum-conversation-panel\`, \`spectrum-image-gallery\`

#### Common Patterns
- **Dashboard Cards**: Small/medium panels with metrics
- **Content Areas**: Large/full panels for main content
- **Modal Overlays**: Frost panels for popup content
- **Sidebar Panels**: Custom width panels for navigation

### Accessibility Features
- **Semantic Structure**: Proper heading hierarchy for titles
- **Keyboard Support**: Full keyboard navigation for editable titles
- **Screen Readers**: Appropriate ARIA labels and structure
- **Focus Management**: Clear focus indicators for interactive elements

### Basic Usage Examples
\`\`\`html
<!-- Simple content panel -->
<spectrum-panel background="opaque" size="medium">
  <p>Your content here</p>
</spectrum-panel>

<!-- Dashboard card with editable title -->
<spectrum-panel 
  background="opaque" 
  size="small"
  panel-title="Widget Title"
  title-editable="true"
  @titleChanged=\${handleTitleChange}>
  <div>Dashboard content</div>
</spectrum-panel>

<!-- Modal overlay with frost effect -->
<spectrum-panel 
  background="full-frost" 
  width="400px" 
  height="300px">
  <div>Modal content</div>
</spectrum-panel>
\`\`\`
        `
      }
    }
  },
  args: {
    background: 'opaque',
    frost: false,
    debug: false,
    size: 'medium',
    width: undefined,
    height: undefined,
    noPadding: false,
    panelTitle: undefined,
    titleEditable: false,
    content: sampleContent.medium
  },
  argTypes: {
    background: {
      control: 'select',
      options: ['opaque', 'partial-frost', 'full-frost', 'transparent'],
      description: 'Background level and visual effect for the panel container',
      table: {
        type: { summary: "'opaque' | 'partial-frost' | 'full-frost' | 'transparent'" },
        defaultValue: { summary: 'opaque' }
      }
    },
    frost: {
      control: 'boolean',
      description: '⚠️ DEPRECATED: Use background property instead. Legacy frost effect toggle.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Deprecated'
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging to console for development and troubleshooting',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full', 'auto'],
      description: 'Size preset controlling panel dimensions (overridden by custom width/height)',
      table: {
        type: { summary: "'small' | 'medium' | 'large' | 'full' | 'auto'" },
        defaultValue: { summary: 'full' }
      }
    },
    width: {
      control: 'text',
      description: 'Custom width (CSS value: 300px, 50%, 20rem) - overrides size preset',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    height: {
      control: 'text',
      description: 'Custom height (CSS value: 200px, 100vh, auto) - overrides size preset',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove default padding for edge-to-edge content (useful for images, galleries)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    panelTitle: {
      control: 'text',
      description: 'Title text displayed at the top of the panel (optional)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    titleEditable: {
      control: 'boolean',
      description: 'Enable click-to-edit functionality for the panel title',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    content: {
      control: 'select',
      options: ['short', 'medium', 'long', 'structured', 'dashboard'],
      mapping: sampleContent,
      description: 'Content type for demonstration purposes (story control only)',
      table: {
        type: { summary: 'string' },
        category: 'Story Controls'
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumPanelArgs>;

// Interactive render function
const renderPanel = (args: SpectrumPanelArgs) => {
  return html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; min-height: 400px;">
      <spectrum-panel
        background=${args.background}
        .frost=${args.frost}
        .debug=${args.debug}
        size=${args.size}
        width=${args.width || ''}
        height=${args.height || ''}
        .noPadding=${args.noPadding}
        panel-title=${args.panelTitle || ''}
        .titleEditable=${args.titleEditable}
        @titleChanged=${(e: CustomEvent) => action('titleChanged')(e.detail)}
      >
        ${typeof args.content === 'string' ? html`<div .innerHTML=${args.content}></div>` : args.content}
      </spectrum-panel>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all panel component features and configurations.
 * Experiment with background effects, sizing options, titles, and content types.
 */
export const Playground: Story = {
  render: renderPanel
};

/**
 * Basic panel configurations showing common use cases with different background effects.
 * Demonstrates opaque, frost, and transparent backgrounds with standard content.
 */
export const BackgroundVariants: Story = {
  render: () => html`
    <div style="padding: 2rem; background: linear-gradient(135deg, var(--spectrum-sys-color-primary-container) 0%, var(--spectrum-sys-color-secondary-container) 100%); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Background Effect Variants</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
        <!-- Opaque Background -->
        <spectrum-panel background="opaque" size="auto" panel-title="Opaque Background">
          <p style="margin: 0;">Solid background with full opacity. Perfect for standard content containers and primary interface elements.</p>
        </spectrum-panel>
        
        <!-- Partial Frost -->
        <spectrum-panel background="partial-frost" size="auto" panel-title="Partial Frost">
          <p style="margin: 0;">Subtle translucency with light blur effect. Ideal for overlays and floating elements that need to maintain readability.</p>
        </spectrum-panel>
        
        <!-- Full Frost -->
        <spectrum-panel background="full-frost" size="auto" panel-title="Full Frost">
          <p style="margin: 0;">Heavy blur and translucency effect. Best for modal backgrounds and prominent overlay elements.</p>
        </spectrum-panel>
        
        <!-- Transparent -->
        <spectrum-panel background="transparent" size="auto" panel-title="Transparent">
          <p style="margin: 0;">No background styling. Used when you need content organization without visual container effects.</p>
        </spectrum-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Background effect comparison showing all available options:
- **Opaque**: Standard solid background for general use
- **Partial Frost**: Light translucency for subtle overlay effects
- **Full Frost**: Heavy blur for prominent modal/popup backgrounds  
- **Transparent**: No background for content-only organization

Each effect serves different design purposes and visual hierarchies.
        `
      }
    }
  }
};

/**
 * Size preset demonstration showing small, medium, large, full, and auto sizing options.
 * Illustrates how panels adapt to different content amounts and layout requirements.
 */
export const SizeVariants: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Size Preset Variants</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
        <!-- Small -->
        <spectrum-panel background="opaque" size="small" panel-title="Small Panel">
          <p style="margin: 0; font-size: 0.9rem;">Compact size for minimal content like status indicators or small widgets.</p>
        </spectrum-panel>
        
        <!-- Medium -->
        <spectrum-panel background="opaque" size="medium" panel-title="Medium Panel">
          <p style="margin: 0;">Balanced size for moderate content like cards, forms, or informational sections.</p>
        </spectrum-panel>
        
        <!-- Large -->
        <spectrum-panel background="opaque" size="large" panel-title="Large Panel">
          <p style="margin: 0;">Spacious container for extensive content, detailed information, or complex interface elements.</p>
        </spectrum-panel>
      </div>
      
      <div style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <!-- Auto -->
        <spectrum-panel background="opaque" size="auto" panel-title="Auto Size Panel">
          <p style="margin: 0;">Auto-sizing adapts to content dimensions. This panel will size to fit its content exactly.</p>
        </spectrum-panel>
        
        <!-- Full -->
        <spectrum-panel background="opaque" size="full" panel-title="Full Size Panel">
          <p style="margin: 0;">Full size occupies all available space in its container. Default size for most use cases.</p>
        </spectrum-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Size preset comparison showing all available options:
- **Small**: Compact containers for minimal content (status, widgets)
- **Medium**: Balanced size for moderate content (cards, forms)
- **Large**: Spacious containers for extensive content (details, complex UI)
- **Auto**: Adapts to content dimensions automatically
- **Full**: Occupies all available space (default behavior)

Size presets provide consistent dimensions across your application while allowing content-appropriate sizing.
        `
      }
    }
  }
};

/**
 * Custom dimensions showcase demonstrating width and height overrides with various CSS units.
 * Shows how custom dimensions override size presets for precise control.
 */
export const CustomDimensions: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Custom Dimensions</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
        <!-- Fixed Pixel Dimensions -->
        <spectrum-panel background="opaque" width="280px" height="200px" panel-title="Fixed Size (280×200px)">
          <p style="margin: 0;">Fixed pixel dimensions provide precise control for specific layout requirements and consistent sizing.</p>
        </spectrum-panel>
        
        <!-- Percentage Width -->
        <spectrum-panel background="opaque" width="100%" height="150px" panel-title="Responsive Width (100%)">
          <p style="margin: 0;">Percentage width adapts to container while maintaining fixed height for responsive layouts.</p>
        </spectrum-panel>
        
        <!-- Relative Units -->
        <spectrum-panel background="opaque" width="20rem" height="12rem" panel-title="Relative Size (20×12rem)">
          <p style="margin: 0;">Relative units (rem, em) scale with typography for consistent proportional sizing.</p>
        </spectrum-panel>
        
        <!-- Auto Height -->
        <spectrum-panel background="opaque" width="300px" height="auto" panel-title="Auto Height (300px width)">
          <p style="margin: 0;">Auto height adapts to content while maintaining fixed width for flexible content layouts.</p>
          <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
            <li>Content-based sizing</li>
            <li>Flexible height adaptation</li>
            <li>Consistent width control</li>
          </ul>
        </spectrum-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Custom dimension examples showing flexible sizing options:
- **Fixed Pixels**: Precise control with px units (280px × 200px)
- **Percentage**: Responsive width with % units (100% width)
- **Relative Units**: Typography-based sizing with rem/em units
- **Auto Height**: Content-adaptive height with fixed width

Custom dimensions override size presets and accept any valid CSS values for maximum layout flexibility.
        `
      }
    }
  }
};

/**
 * Title management demonstration showing static titles and editable title functionality.
 * Includes event handling for title changes and different title presentation styles.
 */
export const TitleManagement: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Title Management</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
        <!-- No Title -->
        <spectrum-panel background="opaque" size="auto">
          <p style="margin: 0;"><strong>No Title Panel</strong></p>
          <p style="margin: 0.5rem 0 0 0; color: var(--spectrum-sys-color-on-surface-variant);">Clean container without title header for simple content organization.</p>
        </spectrum-panel>
        
        <!-- Static Title -->
        <spectrum-panel background="opaque" size="auto" panel-title="Static Panel Title">
          <p style="margin: 0;">Panel with read-only title display. Perfect for labeled sections and organized content areas.</p>
        </spectrum-panel>
        
        <!-- Editable Title -->
        <spectrum-panel 
          background="opaque" 
          size="auto" 
          panel-title="Click to Edit This Title" 
          title-editable="true"
          @titleChanged=${(e: CustomEvent) => {
            action('titleChanged')(e.detail);
            // Update the title in real-time for demo
            const panel = e.target as any;
            panel.panelTitle = e.detail.value;
          }}
        >
          <p style="margin: 0;">Interactive title that can be edited by clicking. Press Enter to save or click outside to apply changes.</p>
          <div style="margin-top: 1rem; padding: 0.75rem; background: var(--spectrum-sys-color-surface-container); border-radius: 4px; font-size: 0.9rem;">
            <strong>💡 Try it:</strong> Click the title above to edit it. Check the Actions panel for events.
          </div>
        </spectrum-panel>
      </div>
      
      <!-- Dashboard Example -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">Dashboard Widget Example</h4>
        <spectrum-panel 
          background="opaque" 
          size="auto" 
          panel-title="Sales Dashboard" 
          title-editable="true"
          @titleChanged=${(e: CustomEvent) => action('dashboard-titleChanged')(e.detail)}
        >
          ${sampleContent.dashboard.indexOf('<div') > -1 ? html`<div .innerHTML=${sampleContent.dashboard}></div>` : sampleContent.dashboard}
          <div style="margin-top: 1rem; padding: 0.75rem; background: var(--spectrum-sys-color-primary-container); border-radius: 4px; border-left: 4px solid var(--spectrum-sys-color-primary);">
            <strong style="color: var(--spectrum-sys-color-on-primary-container);">💼 Dashboard Use Case:</strong>
            <p style="margin: 0.25rem 0 0 0; color: var(--spectrum-sys-color-on-primary-container); font-size: 0.9rem;">Editable titles allow users to customize dashboard widgets and panels for personalized workflows.</p>
          </div>
        </spectrum-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Title management options for different use cases:
- **No Title**: Clean containers without header labels
- **Static Title**: Read-only title display for labeled sections
- **Editable Title**: Interactive titles that users can modify
- **Dashboard Widget**: Real-world example with metrics and editable title

### Editable Title Features:
- **Click to Edit**: Single click activates edit mode
- **Keyboard Support**: Enter saves, Escape cancels
- **Event Emission**: Emits \`titleChanged\` event with action and value
- **Real-time Updates**: Immediate visual feedback

Perfect for dashboard widgets, user-customizable content, and dynamic interfaces.
        `
      }
    }
  }
};

/**
 * Content organization showcase demonstrating padding control and various content types.
 * Shows how panels handle different content structures and spacing requirements.
 */
export const ContentOrganization: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Content Organization</h3>
      
      <!-- Padding Comparison -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
        <spectrum-panel background="opaque" size="auto" panel-title="Default Padding" no-padding="false">
          <div style="background: var(--spectrum-sys-color-primary-container); border-radius: 4px; padding: 0.5rem; text-align: center; color: var(--spectrum-sys-color-on-primary-container);">
            Content with standard panel padding
          </div>
        </spectrum-panel>
        
        <spectrum-panel background="opaque" size="auto" panel-title="No Padding" no-padding="true">
          <div style="background: var(--spectrum-sys-color-secondary-container); border-radius: 0; padding: 1rem; text-align: center; color: var(--spectrum-sys-color-on-secondary-container);">
            Edge-to-edge content without padding
          </div>
        </spectrum-panel>
      </div>
      
      <!-- Structured Content -->
      <div style="margin-top: 2rem;">
        <spectrum-panel background="opaque" size="auto" panel-title="Structured Content">
          ${sampleContent.structured.indexOf('<h3') > -1 ? html`<div .innerHTML=${sampleContent.structured}></div>` : sampleContent.structured}
        </spectrum-panel>
      </div>
      
      <!-- Gallery Example -->
      <div style="margin-top: 2rem;">
        <spectrum-panel background="opaque" size="auto" panel-title="Image Gallery (No Padding)" no-padding="true">
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 0;">
            ${Array.from({length: 6}, (_, i) => html`
              <div style="aspect-ratio: 1; background: linear-gradient(135deg, var(--spectrum-sys-color-primary) 0%, var(--spectrum-sys-color-secondary) 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                ${i + 1}
              </div>
            `)}
          </div>
          <div style="padding: 1rem; background: var(--spectrum-sys-color-surface-container);">
            <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">
              <strong>Gallery Layout:</strong> No padding allows images to extend to panel edges while maintaining inner content padding.
            </p>
          </div>
        </spectrum-panel>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Content organization features for different layout needs:

### Padding Control
- **Default Padding**: Standard spacing around content for readability
- **No Padding**: Remove padding for edge-to-edge content (galleries, images)
- **Mixed Layout**: Combine no-padding areas with padded content sections

### Content Types
- **Structured HTML**: Full support for headings, lists, styled elements
- **Interactive Content**: Buttons, forms, and interactive elements
- **Gallery Layout**: Image grids and media content with optimal spacing
- **Mixed Content**: Combine different content types within single panel

### Use Cases
- **Image Galleries**: No padding for seamless image grids
- **Form Containers**: Standard padding for form elements and labels
- **Dashboard Cards**: Structured content with metrics and descriptions
- **Article Content**: Typography-focused content with proper spacing

Perfect for any content type while maintaining consistent container behavior.
        `
      }
    }
  }
};

/**
 * Real-world application examples showing panels in common UI patterns.
 * Demonstrates dashboard cards, modal overlays, sidebar panels, and content areas.
 */
export const RealWorldExamples: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-top: 0; text-align: center; color: var(--spectrum-sys-color-on-surface);">Real-World Application Examples</h3>
      
      <!-- Dashboard Layout -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">📊 Dashboard Layout</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <spectrum-panel background="opaque" size="small" panel-title="Active Users" title-editable="true">
            <div style="text-align: center; padding: 1rem 0;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--spectrum-sys-color-primary);">1,247</div>
              <div style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">↑ 12% from last week</div>
            </div>
          </spectrum-panel>
          
          <spectrum-panel background="opaque" size="small" panel-title="Revenue" title-editable="true">
            <div style="text-align: center; padding: 1rem 0;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--spectrum-sys-color-secondary);">$34.5K</div>
              <div style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">↑ 8% from last week</div>
            </div>
          </spectrum-panel>
          
          <spectrum-panel background="opaque" size="small" panel-title="Conversion" title-editable="true">
            <div style="text-align: center; padding: 1rem 0;">
              <div style="font-size: 2rem; font-weight: bold; color: var(--spectrum-sys-color-tertiary);">3.2%</div>
              <div style="color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.9rem;">↓ 2% from last week</div>
            </div>
          </spectrum-panel>
        </div>
      </div>
      
      <!-- Modal Overlay Example -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">🪟 Modal Overlay</h4>
        <div style="position: relative; height: 200px; background: linear-gradient(45deg, var(--spectrum-sys-color-primary-container), var(--spectrum-sys-color-secondary-container)); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <spectrum-panel background="full-frost" width="300px" height="auto" panel-title="Confirmation Dialog">
            <div style="text-align: center;">
              <p style="margin: 0 0 1.5rem 0;">Are you sure you want to delete this item? This action cannot be undone.</p>
              <div style="display: flex; gap: 1rem; justify-content: center;">
                <button style="padding: 0.5rem 1rem; border: 1px solid var(--spectrum-sys-color-outline); background: var(--spectrum-sys-color-surface); color: var(--spectrum-sys-color-on-surface); border-radius: 4px; cursor: pointer;">Cancel</button>
                <button style="padding: 0.5rem 1rem; border: none; background: var(--spectrum-sys-color-error); color: var(--spectrum-sys-color-on-error); border-radius: 4px; cursor: pointer;">Delete</button>
              </div>
            </div>
          </spectrum-panel>
        </div>
      </div>
      
      <!-- Sidebar and Content Layout -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">📋 Application Layout</h4>
        <div style="display: flex; gap: 1rem; height: 300px;">
          <!-- Sidebar -->
          <spectrum-panel background="opaque" width="200px" height="100%" panel-title="Navigation">
            <nav style="padding: 0;">
              <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: var(--spectrum-sys-color-primary-container); border-radius: 4px; color: var(--spectrum-sys-color-on-primary-container);">Dashboard</div>
              <div style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer;">Analytics</div>
              <div style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer;">Users</div>
              <div style="margin-bottom: 0.5rem; padding: 0.5rem; cursor: pointer;">Settings</div>
            </nav>
          </spectrum-panel>
          
          <!-- Main Content -->
          <spectrum-panel background="opaque" size="full" panel-title="Main Content Area" title-editable="true">
            <div style="height: 100%; display: flex; flex-direction: column;">
              <p style="margin: 0 0 1rem 0;">This is the main content area where your application content would be displayed. The panel provides consistent styling and structure.</p>
              <div style="flex: 1; background: var(--spectrum-sys-color-surface-container); border-radius: 4px; padding: 1rem; display: flex; align-items: center; justify-content: center; color: var(--spectrum-sys-color-on-surface-variant);">
                Content Area
              </div>
            </div>
          </spectrum-panel>
        </div>
      </div>
      
      <!-- Card Grid -->
      <div style="margin-top: 2rem;">
        <h4 style="color: var(--spectrum-sys-color-on-surface); margin-bottom: 1rem;">🎴 Content Cards</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
          <spectrum-panel background="opaque" size="auto" panel-title="Project Alpha">
            <div style="margin-bottom: 1rem;">
              <div style="height: 100px; background: linear-gradient(45deg, var(--spectrum-sys-color-primary), var(--spectrum-sys-color-secondary)); border-radius: 4px; margin-bottom: 0.5rem;"></div>
              <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Advanced analytics dashboard with real-time reporting capabilities.</p>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--spectrum-sys-color-on-surface-variant);">
              <span>Progress: 75%</span>
              <span>Due: Mar 15</span>
            </div>
          </spectrum-panel>
          
          <spectrum-panel background="opaque" size="auto" panel-title="Project Beta">
            <div style="margin-bottom: 1rem;">
              <div style="height: 100px; background: linear-gradient(45deg, var(--spectrum-sys-color-secondary), var(--spectrum-sys-color-tertiary)); border-radius: 4px; margin-bottom: 0.5rem;"></div>
              <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">Mobile application redesign with enhanced user experience features.</p>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--spectrum-sys-color-on-surface-variant);">
              <span>Progress: 45%</span>
              <span>Due: Apr 2</span>
            </div>
          </spectrum-panel>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Real-world application examples demonstrating practical panel usage:

### 📊 Dashboard Layout
- **Metric Cards**: Small panels with key performance indicators
- **Editable Titles**: Allow users to customize widget names
- **Grid Layout**: Responsive card arrangement for various screen sizes

### 🪟 Modal Overlay
- **Full Frost Background**: Creates modal effect over background content
- **Custom Dimensions**: Fixed size for dialog consistency
- **Interactive Content**: Buttons and form elements within modal

### 📋 Application Layout
- **Sidebar Navigation**: Fixed-width panel for app navigation
- **Main Content**: Full-size panel for primary application content
- **Structured Layout**: Consistent spacing and organization

### 🎴 Content Cards
- **Auto-sizing**: Panels adapt to content requirements
- **Rich Content**: Images, text, and metadata in organized layout
- **Responsive Grid**: Cards flow naturally across different screen sizes

These examples show how panels integrate into complete application interfaces while maintaining design consistency and usability.
        `
      }
    }
  }
}; 