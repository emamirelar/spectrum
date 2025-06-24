import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../../components/mermaid-diagram';

// Local interface definition for the component props
interface SpectrumPanel extends HTMLElement {
  frost: boolean;
  debug: boolean;
  size: 'small' | 'medium' | 'large' | 'full' | 'auto';
  width?: string;
  height?: string;
}

const meta = {
  title: 'Spectrum/Components/SpectrumPanel',
  component: 'spectrum-panel',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Spectrum Panel

The Panel component provides a flexible, beautiful container with optional frost effect that accepts any content through slots.

## Features

- **Slot-based Content**: Accepts any HTML content through a single default slot
- **Flexible Sizing**: Size presets (small, medium, large, full, auto) and custom dimensions
- **Full Size by Default**: Occupies all available width and height in parent container by default
- **Frost Effect**: Optional glassmorphism effect for modern aesthetics  
- **Responsive Design**: Adapts to different screen sizes with proper spacing
- **Typography Inheritance**: Automatically styles common HTML elements
- **Debug Support**: Built-in debug logging for development
- **Consistent Spacing**: Proper spacing for headings, paragraphs, lists, and other elements

## Slot Usage Guide

The Panel component uses a single **default slot** that accepts any HTML content. This provides maximum flexibility for different use cases.

### Slot Behavior

- **Single Default Slot**: All content between opening and closing tags is rendered inside the panel
- **Content Inheritance**: Slotted content inherits the panel's color, font-family, and spacing automatically
- **Responsive**: Content adapts to the panel's responsive behavior
- **No Slot Restrictions**: You can place any HTML elements or other web components inside

### Usage Examples

#### Basic Text Content
\`\`\`html
<spectrum-panel>
  <h3>Welcome</h3>
  <p>This is basic content inside a panel.</p>
</spectrum-panel>
\`\`\`

#### With Frost Effect
\`\`\`html
<spectrum-panel frost>
  <h3>Frosted Panel</h3>
  <p>This panel has a beautiful glassmorphism effect.</p>
</spectrum-panel>
\`\`\`

#### Form Content
\`\`\`html
<spectrum-panel>
  <h3>Contact Form</h3>
  <form>
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email">
    </div>
    <button type="submit">Submit</button>
  </form>
</spectrum-panel>
\`\`\`

#### Interactive Elements
\`\`\`html
<spectrum-panel>
  <h3>Actions</h3>
  <p>Panels can contain buttons and other interactive elements:</p>
  <div style="display: flex; gap: 1rem;">
    <button>Primary Action</button>
    <button>Secondary Action</button>
  </div>
</spectrum-panel>
\`\`\`

#### Lists and Structured Content
\`\`\`html
<spectrum-panel>
  <h3>Features</h3>
  <ul>
    <li>Responsive design</li>
    <li>Frost effect support</li>
    <li>Flexible content slots</li>
  </ul>
  
  <h4>Steps</h4>
  <ol>
    <li>Create the panel</li>
    <li>Add your content</li>
    <li>Apply frost effect if desired</li>
  </ol>
</spectrum-panel>
\`\`\`

#### Complex Layouts
\`\`\`html
<spectrum-panel frost>
  <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
    <div>
      <h4>Sidebar</h4>
      <ul>
        <li>Navigation item 1</li>
        <li>Navigation item 2</li>
      </ul>
    </div>
    <div>
      <h4>Main Content</h4>
      <p>This demonstrates complex layouts using CSS Grid or Flexbox.</p>
    </div>
  </div>
</spectrum-panel>
\`\`\`

## Sizing Options

The panel component provides flexible sizing options to fit different layout needs.

### Size Presets

\`\`\`html
<!-- Small: 300px width -->
<spectrum-panel size="small">
  <h3>Small Panel</h3>
  <p>Fixed 300px width</p>
</spectrum-panel>

<!-- Medium: 500px width -->
<spectrum-panel size="medium">
  <h3>Medium Panel</h3>
  <p>Fixed 500px width</p>
</spectrum-panel>

<!-- Large: 800px width -->
<spectrum-panel size="large">
  <h3>Large Panel</h3>
  <p>Fixed 800px width</p>
</spectrum-panel>

<!-- Full: 100% width & height (default) -->
<spectrum-panel size="full">
  <h3>Full Size Panel</h3>
  <p>Occupies all available width and height</p>
</spectrum-panel>

<!-- Auto: Fits content -->
<spectrum-panel size="auto">
  <h3>Auto-sized Panel</h3>
  <p>Fits content exactly</p>
</spectrum-panel>
\`\`\`

### Custom Dimensions

\`\`\`html
<!-- Custom width only -->
<spectrum-panel width="350px">
  <h3>Custom Width</h3>
  <p>Exactly 350px wide</p>
</spectrum-panel>

<!-- Custom width and height -->
<spectrum-panel width="60%" height="200px">
  <h3>Custom Dimensions</h3>
  <p>60% width, 200px height</p>
</spectrum-panel>

<!-- Using different units -->
<spectrum-panel width="25rem" height="15vh">
  <h3>Different Units</h3>
  <p>25rem width, 15vh height</p>
</spectrum-panel>
\`\`\`

## API Reference

### Properties

| Property | Attribute | Description                           | Type      | Default |
| -------- | --------- | ------------------------------------- | --------- | ------- |
| \`frost\`  | \`frost\`   | Whether to apply the frost effect     | \`boolean\` | \`false\` |
| \`debug\`  | \`debug\`   | Whether to enable debug logging       | \`boolean\` | \`false\` |
| \`size\`   | \`size\`    | Size preset for the panel             | \`'small' \| 'medium' \| 'large' \| 'full' \| 'auto'\` | \`'full'\` |
| \`width\`  | \`width\`   | Custom width (overrides size preset)  | \`string\`  | \`undefined\` |
| \`height\` | \`height\`  | Custom height                         | \`string\`  | \`undefined\` |

### Slots

| Slot      | Description                                    |
| --------- | ---------------------------------------------- |
| (default) | Main content slot - accepts any HTML content  |

## Best Practices

### Content Structure
1. **Use Semantic HTML**: Use proper heading hierarchy (h1, h2, h3, etc.)
2. **Maintain Accessibility**: Include proper labels, alt text, and ARIA attributes
3. **Consistent Spacing**: Let the panel handle spacing - avoid adding extra margins
4. **Responsive Design**: Consider how your content will adapt on different screen sizes

### When to Use Frost Effect
- **Overlay Content**: When the panel appears over other content
- **Modern Aesthetics**: For contemporary, glassmorphism designs
- **Visual Hierarchy**: To make certain panels stand out
- **Background Images**: When placed over images or complex backgrounds

## Integration with Other Components

The Panel component works seamlessly with other Spectrum components:

\`\`\`html
<!-- With Buttons -->
<spectrum-panel>
  <h3>Actions</h3>
  <spectrum-button variant="primary">Primary Button</spectrum-button>
  <spectrum-button variant="secondary">Secondary Button</spectrum-button>
</spectrum-panel>

<!-- With Search Input -->
<spectrum-panel frost>
  <h3>Search</h3>
  <spectrum-search-input placeholder="Enter search terms"></spectrum-search-input>
</spectrum-panel>

<!-- With Lists -->
<spectrum-panel>
  <h3>Navigation</h3>
  <spectrum-collapsible-list items='[...]'></spectrum-collapsible-list>
</spectrum-panel>
\`\`\`

## Development and Debugging

### Debug Mode
Enable debug mode during development to see component behavior:
\`\`\`html
<spectrum-panel debug frost>
  <h3>Debug Panel</h3>
  <p>Check the browser console for debug information.</p>
</spectrum-panel>
\`\`\`

Debug mode provides:
- Component initialization logs
- Property change notifications
- Render cycle information
- Error tracking and reporting
        `
      }
    }
  },
  argTypes: {
    frost: {
      control: 'boolean',
      description: 'Apply frost effect (blur background)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full', 'auto'],
      description: 'Size preset for the panel',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'full' }
      }
    },
    width: {
      control: 'text',
      description: 'Custom width (overrides size preset)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    height: {
      control: 'text',
      description: 'Custom height',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  args: {
    frost: false,
    debug: false,
    size: 'full',
    width: undefined,
    height: undefined
  }
} satisfies Meta<SpectrumPanel>;

export default meta;
type Story = StoryObj<SpectrumPanel>;

// Basic panel with simple content
export const Default: Story = {
  args: {},
  render: (args) => html`
    <spectrum-panel 
      .frost=${args.frost}
      .debug=${args.debug}
      .size=${args.size}
      .width=${args.width}
      .height=${args.height}>
      <h3>Panel Title</h3>
      <p>This is a basic panel with clean styling based on the conversation panel design.</p>
      <p>It provides a beautiful container for any content you want to display.</p>
    </spectrum-panel>
  `
};

// Frost effect panel with background
export const FrostEffect: Story = {
  args: {
    frost: true
  },
  render: (args) => html`
    <div style="width: 500px; height: 400px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 1rem; display: flex; align-items: center; justify-content: center;">
      <spectrum-panel 
        .frost=${args.frost}
        .debug=${args.debug}
        .size=${args.size}
        .width=${args.width}
        .height=${args.height}>
        <h2>Frosted Glass Panel</h2>
        <p>This panel demonstrates the frost effect with a translucent background and blur filter.</p>
        <p>Perfect for overlay content or modern glassmorphism designs, just like the conversation panel.</p>
      </spectrum-panel>
    </div>
  `
};

// Size variations demonstration
export const SizeVariations: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; width: 100%; max-width: 1200px;">
      
      <!-- Size presets demonstration -->
      <div>
        <h4 style="margin-bottom: 1rem; color: #333;">Size Presets</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
          
          <spectrum-panel size="small">
            <h4>Small Panel</h4>
            <p>300px width</p>
          </spectrum-panel>
          
          <spectrum-panel size="medium">
            <h4>Medium Panel</h4>
            <p>500px width</p>
          </spectrum-panel>
          
          <spectrum-panel size="large">
            <h4>Large Panel</h4>
            <p>800px width</p>
          </spectrum-panel>
          
        </div>
      </div>
      
      <!-- Full size demonstration -->
      <div style="height: 300px; border: 2px dashed #ccc; border-radius: 8px; position: relative;">
        <h4 style="position: absolute; top: -1.5rem; left: 0; margin: 0; color: #333; background: white; padding: 0 0.5rem;">Full Size (Default)</h4>
        <spectrum-panel size="full" frost>
          <h3>Full Size Panel</h3>
          <p>This panel occupies all available width AND height in its container (default behavior).</p>
          <p>Perfect for main content areas and layout components that need to fill their container completely.</p>
        </spectrum-panel>
      </div>
      
      <!-- Auto size demonstration -->
      <div>
        <h4 style="margin-bottom: 1rem; color: #333;">Auto Size</h4>
        <div style="display: flex; justify-content: center;">
          <spectrum-panel size="auto">
            <h4>Auto-sized Panel</h4>
            <p>Fits content exactly</p>
          </spectrum-panel>
        </div>
      </div>
      
      <!-- Custom dimensions demonstration -->
      <div>
        <h4 style="margin-bottom: 1rem; color: #333;">Custom Dimensions</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
          
          <spectrum-panel width="250px" height="150px" frost>
            <h5>Custom Size</h5>
            <p>250px × 150px</p>
          </spectrum-panel>
          
          <spectrum-panel width="60%" height="200px">
            <h5>Percentage Width</h5>
            <p>60% width, 200px height</p>
          </spectrum-panel>
          
          <spectrum-panel width="20rem">
            <h5>Rem Units</h5>
            <p>20rem width</p>
          </spectrum-panel>
          
        </div>
      </div>
      
    </div>
  `
};

// Different content examples
export const DifferentContent: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; max-width: 1000px;">
      <spectrum-panel size="auto">
        <h3>Simple Text</h3>
        <p>A panel with just text content.</p>
      </spectrum-panel>
      
      <spectrum-panel frost size="auto">
        <h3>With Frost Effect</h3>
        <p>This panel has the frost effect enabled.</p>
        <button style="padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; background: var(--spectrum-color-primary); color: white; cursor: pointer;">
          Action Button
        </button>
      </spectrum-panel>
      
      <spectrum-panel size="auto">
        <h3>Mixed Content</h3>
        <ul>
          <li>List item one</li>
          <li>List item two</li>
          <li>List item three</li>
        </ul>
        <p>Mixed content with lists and paragraphs.</p>
      </spectrum-panel>
    </div>
  `
};



// Full size demonstration
export const FullSizeDemo: Story = {
  args: {
    frost: true
  },
  render: (args) => html`
    <div style="width: 100%; height: 400px; border: 3px dashed #0070d2; border-radius: 12px; position: relative; background: linear-gradient(135deg, rgba(0,112,210,0.1) 0%, rgba(118,75,162,0.1) 100%);">
      <div style="position: absolute; top: -12px; left: 16px; background: white; padding: 0 8px; color: #0070d2; font-weight: 600; font-size: 14px;">
        Container (400px height)
      </div>
      <spectrum-panel 
        .frost=${args.frost}
        .debug=${args.debug}
        .size=${args.size}
        .width=${args.width}
        .height=${args.height}>
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center;">
          <h2 style="margin: 0 0 1rem 0; color: #0070d2;">Full Size Panel</h2>
          <p style="margin: 0 0 0.5rem 0; opacity: 0.8;">Width: 100% of container</p>
          <p style="margin: 0 0 1rem 0; opacity: 0.8;">Height: 100% of container</p>
          <div style="padding: 1rem; background: rgba(255,255,255,0.2); border-radius: 8px; backdrop-filter: blur(10px);">
            <strong>Default Behavior:</strong> Panel occupies all available space
          </div>
        </div>
      </spectrum-panel>
    </div>
  `
};

// Debug mode example
export const DebugMode: Story = {
  args: {
    debug: true,
    frost: true
  },
  render: (args) => html`
    <spectrum-panel 
      .debug=${args.debug}
      .frost=${args.frost}
      .size=${args.size}
      .width=${args.width}
      .height=${args.height}>
      <h3>Debug Mode Panel</h3>
      <p>This panel has debug mode enabled. Check the browser console to see debug logs.</p>
      <p>Debug mode helps with development and troubleshooting component behavior.</p>
    </spectrum-panel>
  `
}; 