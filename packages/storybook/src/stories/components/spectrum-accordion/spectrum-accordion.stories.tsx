import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## Spectrum Accordion Component
 * 
 * A comprehensive, interactive accordion component that provides two distinct variants for organizing and 
 * displaying expandable content with rich interactive features. The accordion follows the Component Events Rule
 * with well-structured events that include action attributes for all interactions.
 * 
 * ### Key Features
 * - **2 Distinct Variants**: Chip variant for trigger-based expansion and Standard variant for multi-section organization
 * - **Flexible Expansion Modes**: Single or multi-expand behavior for standard variant
 * - **Rich Content Support**: HTML content, slotted components, and interactive elements
 * - **Interactive Feedback**: Optional sound effects and haptic feedback for enhanced UX
 * - **Accessibility**: Full keyboard navigation, ARIA support, screen reader compatibility, and focus management
 * - **Animation**: Smooth expand/collapse animations with motion preference support
 * - **Event System**: Component Events Rule compliant with structured action attributes
 * - **Customization**: Icon customization, styling variants, and layout options
 * 
 * ### Usage Guidelines
 * - Use **Chip Variant** for trigger-based expansion, optional content, and supplementary actions
 * - Use **Standard Variant** for FAQs, content organization, navigation menus, and feature lists
 * - Use **Single Expand Mode** for focused content consumption (FAQs, step-by-step guides)
 * - Use **Multi Expand Mode** for content comparison and simultaneous access needs
 * - Enable **sound** and **haptic** feedback for enhanced user experience in appropriate contexts
 * - Provide **meaningful action values** that describe the specific operation being performed
 * 
 * ### Event System (Component Events Rule Compliant)
 * All accordion events follow the Component Events Rule with consistent action attributes:
 * - **accordionToggle**: Primary accordion interaction - `{ action: string, expanded: boolean, accordionId: string, sectionId?: string, expandedSections?: string[] }`
 * - **soundTriggered**: When sound effect is triggered - `{ action: "soundTriggered", accordionId: string }`
 * - **hapticTriggered**: When haptic feedback occurs - `{ action: "hapticTriggered", accordionId: string }`
 * 
 * ### Component Dependencies
 * 
 * ```mermaid
 * graph TD;
 *   spectrum-accordion --> spectrum-chip
 *   spectrum-conversation-panel --> spectrum-accordion
 *   style spectrum-accordion fill:#f9f,stroke:#333,stroke-width:4px
 *   style spectrum-chip fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
 *   style spectrum-conversation-panel fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
 * ```
 * 
 * The accordion component uses spectrum-chip internally for the chip variant trigger and is used by
 * spectrum-conversation-panel for expandable content sections.
 * 
 * ### Integration Patterns
 * - **Content Organization**: Used for organizing complex content into manageable sections
 * - **Progressive Disclosure**: Reveals additional content on demand to reduce cognitive load
 * - **Navigation Systems**: Provides collapsible navigation and menu structures
 * - **FAQ Systems**: Traditional question/answer format with expandable sections
 * - **Feature Showcases**: Expandable feature descriptions and product information
 */

// Example data for accordion sections
const sampleFAQSections = [
  {
    id: 'getting-started',
    title: 'How do I get started?',
    content: '<p>Getting started is easy! Simply follow our comprehensive quick start guide to set up your account and begin using the platform.</p>',
    expanded: true
  },
  {
    id: 'account-management',
    title: 'How do I manage my account?',
    content: '<p>Manage your account settings, billing information, and security preferences from the account dashboard.</p>',
    expanded: false
  },
  {
    id: 'troubleshooting',
    title: 'Common troubleshooting steps',
    content: '<p>If you encounter issues, try clearing your browser cache, checking your internet connection, or contacting our support team.</p>',
    expanded: false
  },
  {
    id: 'billing',
    title: 'How does billing work?',
    content: '<p>We offer flexible billing options including monthly and annual plans with automatic renewal and easy cancellation.</p>',
    expanded: false
  }
];

const sampleFeatureSections = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    content: '<p>Get detailed insights with our comprehensive analytics dashboard featuring real-time data visualization and custom reporting.</p>',
    expanded: true
  },
  {
    id: 'collaboration',
    title: 'Real-time Collaboration',
    content: '<p>Work together with your team in real-time with shared workspaces, live editing, and instant notifications.</p>',
    expanded: false
  },
  {
    id: 'integrations',
    title: 'Third-party Integrations',
    content: '<p>Connect with popular tools and services through our extensive API and pre-built integrations marketplace.</p>',
    expanded: false
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    content: '<p>Bank-level security with end-to-end encryption, SSO support, and compliance with industry standards.</p>',
    expanded: true
  }
];

const sampleNavigationSections = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    content: '<p>Your central hub for monitoring metrics, recent activity, and quick actions.</p>',
    expanded: false
  },
  {
    id: 'projects',
    title: 'Projects',
    content: '<p>Manage all your projects, view progress, and collaborate with team members.</p>',
    expanded: false
  },
  {
    id: 'settings',
    title: 'Settings',
    content: '<p>Configure your preferences, account settings, and system options.</p>',
    expanded: false
  }
];

// Component interfaces for TypeScript support
interface AccordionTogglePayload {
  action: string;
  expanded: boolean;
  accordionId: string;
  sectionId?: string;
  expandedSections?: string[];
}

interface SoundTriggeredPayload {
  action: "soundTriggered";
  accordionId: string;
}

interface HapticTriggeredPayload {
  action: "hapticTriggered";
  accordionId: string;
}

interface AccordionSection {
  id: string;
  title: string;
  content?: string;
  expanded?: boolean;
}

interface SpectrumAccordionElement extends HTMLElement {
  expanded: boolean;
  label: string;
  collapsedIcon: string;
  expandedIcon: string;
  sound: boolean;
  haptic: boolean;
  horizontalScroll: boolean;
  disabled: boolean;
  variant: 'chip' | 'standard';
  chipVariant: 'primary' | 'secondary';
  outline: boolean;
  expandMode: 'single' | 'multi';
  sections: string | AccordionSection[];
  accordionId: string;
  debug: boolean;
}

// Story arguments interface
interface SpectrumAccordionArgs extends SpectrumAccordionElement {}

const meta: Meta<SpectrumAccordionArgs> = {
  title: 'Spectrum/Components/SpectrumAccordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The Spectrum Accordion component provides comprehensive collapsible content functionality with two distinct 
variants and extensive customization options. It follows the Component Events Rule with well-structured 
events that include action attributes for all interactions.

### Event System
All events include action attributes:
- accordionToggle: Primary accordion interaction with action context
- soundTriggered: When audio feedback is triggered
- hapticTriggered: When tactile feedback occurs

### Basic Usage
Configure variant and provide sections data for standard variant or slotted content for chip variant.
        `
      }
    }
  },
  args: {
    expanded: false,
    label: 'Dive Deeper',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    sound: false,
    haptic: false,
    horizontalScroll: true,
    disabled: false,
    variant: 'standard',
    chipVariant: 'secondary',
    outline: true,
    expandMode: 'single',
    sections: JSON.stringify(sampleFAQSections),
    accordionId: 'accordion-demo',
    debug: false
  },
  argTypes: {
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion starts expanded (chip variant only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Text for the trigger button (chip variant only)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Dive Deeper'" }
      }
    },
    collapsedIcon: {
      control: 'text',
      description: 'Material Design icon name to show when collapsed',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'arrow_drop_down'" }
      }
    },
    expandedIcon: {
      control: 'text',
      description: 'Material Design icon name to show when expanded',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'arrow_drop_up'" }
      }
    },
    sound: {
      control: 'boolean',
      description: 'Enables audio feedback when accordion is toggled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    haptic: {
      control: 'boolean',
      description: 'Enables haptic feedback on supported devices when accordion is toggled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    horizontalScroll: {
      control: 'boolean',
      description: 'Enable horizontal scrolling layout for content (chip variant only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the accordion, preventing interactions and applying disabled styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    variant: {
      control: 'select',
      options: ['chip', 'standard'],
      description: 'The accordion variant determining layout and behavior',
      table: {
        type: { 
          summary: "'chip' | 'standard'",
          detail: `
            - chip: Trigger-based expansion with single content area
            - standard: Multi-section accordion with traditional layout
          `
        },
        defaultValue: { summary: "'standard'" }
      }
    },
    chipVariant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual style variant of the trigger chip (chip variant only)',
      table: {
        type: { 
          summary: "'primary' | 'secondary'",
          detail: `
            - primary: Prominent styling for important triggers
            - secondary: Subtle styling for optional content
          `
        },
        defaultValue: { summary: "'secondary'" }
      }
    },
    outline: {
      control: 'boolean',
      description: 'Whether the trigger chip should show an outline (chip variant only)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    expandMode: {
      control: 'select',
      options: ['single', 'multi'],
      description: 'Expansion behavior for sections (standard variant only)',
      table: {
        type: { 
          summary: "'single' | 'multi'",
          detail: `
            - single: Only one section can be expanded at a time
            - multi: Multiple sections can be expanded simultaneously
          `
        },
        defaultValue: { summary: "'single'" }
      }
    },
    sections: {
      control: 'text',
      description: 'JSON string of sections data for standard variant',
      table: {
        type: { summary: 'string | AccordionSection[]' },
        defaultValue: { summary: '[]' }
      }
    },
    accordionId: {
      control: 'text',
      description: 'Unique identifier for the accordion instance',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'auto-generated' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to show console logs for accordion interactions',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
} satisfies Meta<SpectrumAccordionArgs>;

export default meta;
type Story = StoryObj<SpectrumAccordionArgs>;

// Interactive render function for playground
const renderAccordion = (args: SpectrumAccordionArgs) => html`
  <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; min-height: 300px;">
    <spectrum-accordion
      ?expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      ?sound=${args.sound}
      ?haptic=${args.haptic}
      ?horizontal-scroll=${args.horizontalScroll}
      ?disabled=${args.disabled}
      .variant=${args.variant}
      .chipVariant=${args.chipVariant}
      ?outline=${args.outline}
      .expandMode=${args.expandMode}
      .sections=${typeof args.sections === 'string' ? args.sections : JSON.stringify(args.sections)}
      .accordionId=${args.accordionId}
      ?debug=${args.debug}
      @accordionToggle=${(e: CustomEvent<AccordionTogglePayload>) => action('accordionToggle')(e.detail)}
      @soundTriggered=${(e: CustomEvent<SoundTriggeredPayload>) => action('soundTriggered')(e.detail)}
      @hapticTriggered=${(e: CustomEvent<HapticTriggeredPayload>) => action('hapticTriggered')(e.detail)}
    >
      ${args.variant === 'chip' ? html`
        <spectrum-chip variant="secondary" label="Option 1" leadingIcon="lightbulb"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Option 2" leadingIcon="star"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Option 3" leadingIcon="favorite"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Option 4" leadingIcon="bookmark"></spectrum-chip>
      ` : ''}
    </spectrum-accordion>
  </div>
`;

// =================================================================
// INTERACTIVE PLAYGROUND
// =================================================================

/**
 * Interactive playground to test all accordion properties and event handling.
 * Use the controls panel to experiment with different configurations and see how events work.
 * 
 * **Event Testing**: Toggle the accordion to see accordionToggle events, enable sound/haptic to test
 * feedback events. All events include action attributes following the Component Events Rule.
 */
export const Playground: Story = {
  render: renderAccordion,
  parameters: {
    docs: {
      description: {
        story: `
Use the controls panel below to experiment with all accordion properties and see how events work in real-time.
The Actions panel will show all emitted events with their action attributes.

**Try these interactions:**
- Switch between chip and standard variants to see different behaviors
- Toggle sections to trigger accordionToggle events with action context
- Test different expand modes (single vs multi) for standard variant
- Enable sound/haptic feedback to test multimedia interactions
- Try different chip variants and styling options
        `
      }
    }
  }
};

// =================================================================
// BASIC EXAMPLES
// =================================================================

/**
 * Basic accordion variants showing the core functionality.
 * Demonstrates both chip and standard variants with default configurations.
 */
export const BasicVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Chip Variant</h4>
        <spectrum-accordion 
          variant="chip"
          label="Explore Options"
          accordionId="basic-chip"
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
          <spectrum-chip variant="secondary" label="Option 1" leadingIcon="lightbulb"></spectrum-chip>
          <spectrum-chip variant="secondary" label="Option 2" leadingIcon="star"></spectrum-chip>
          <spectrum-chip variant="secondary" label="Option 3" leadingIcon="favorite"></spectrum-chip>
        </spectrum-accordion>
      </div>
      
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Standard Variant</h4>
        <spectrum-accordion 
          variant="standard"
          expandMode="single"
          accordionId="basic-standard"
          .sections=${JSON.stringify(sampleFAQSections.slice(0, 3))}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
The core accordion variants with their default behaviors. The chip variant provides trigger-based expansion
for optional content, while the standard variant offers traditional multi-section organization.

**Event Structure:**
- **Chip**: \`{ action: "chip-toggle", expanded: true, accordionId: "basic-chip" }\`
- **Standard**: \`{ action: "section-toggle", expanded: true, accordionId: "basic-standard", sectionId: "getting-started", expandedSections: ["getting-started"] }\`
        `
      },
      source: {
        code: `<!-- Chip Variant -->
<spectrum-accordion variant="chip" label="Explore Options">
  <spectrum-chip variant="secondary" label="Option 1"></spectrum-chip>
  <spectrum-chip variant="secondary" label="Option 2"></spectrum-chip>
</spectrum-accordion>

<!-- Standard Variant -->
<spectrum-accordion 
  variant="standard"
  expandMode="single"
  sections='[{"id": "faq1", "title": "How do I get started?", "content": "..."}]'>
</spectrum-accordion>`
      }
    }
  }
};

/**
 * Expansion mode variations for the standard variant.
 * Shows the difference between single and multi-expand behaviors.
 */
export const ExpansionModes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Single Expand Mode</h4>
        <spectrum-accordion 
          variant="standard"
          expandMode="single"
          accordionId="single-expand"
          .sections=${JSON.stringify(sampleFAQSections)}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
      
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Multi Expand Mode</h4>
        <spectrum-accordion 
          variant="standard"
          expandMode="multi"
          accordionId="multi-expand"
          .sections=${JSON.stringify(sampleFeatureSections)}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different expansion behaviors for the standard variant. Single mode allows only one section to be
expanded at a time (ideal for FAQs), while multi mode allows multiple sections to be open simultaneously
(ideal for feature comparisons).

**Expand Mode Benefits:**
- Single: Focused content consumption, reduced cognitive load
- Multi: Content comparison, simultaneous access to related information
        `
      }
    }
  }
};

/**
 * Chip variant styling options and configurations.
 * Shows different chip variants, outlined styles, and layout options.
 */
export const ChipVariantOptions: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; flex-direction: column;">
      <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 300px;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Primary Chip</h4>
          <spectrum-accordion 
            variant="chip"
            label="Important Actions"
            chipVariant="primary"
            outline="false"
            accordionId="primary-chip"
            @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
            <spectrum-chip variant="primary" label="High Priority" leadingIcon="priority_high"></spectrum-chip>
            <spectrum-chip variant="primary" label="Featured" leadingIcon="star"></spectrum-chip>
          </spectrum-accordion>
        </div>
        
        <div style="flex: 1; min-width: 300px;">
          <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Secondary Outlined</h4>
          <spectrum-accordion 
            variant="chip"
            label="Additional Options"
            chipVariant="secondary"
            outline="true"
            accordionId="secondary-outlined"
            @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
            <spectrum-chip variant="secondary" label="Option A" leadingIcon="circle"></spectrum-chip>
            <spectrum-chip variant="secondary" label="Option B" leadingIcon="square"></spectrum-chip>
          </spectrum-accordion>
        </div>
      </div>
      
      <div>
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Vertical Layout (No Horizontal Scroll)</h4>
        <spectrum-accordion 
          variant="chip"
          label="Vertical Stack"
          horizontalScroll="false"
          accordionId="vertical-chip"
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
          <spectrum-chip variant="secondary" label="First Item" leadingIcon="looks_one"></spectrum-chip>
          <spectrum-chip variant="secondary" label="Second Item" leadingIcon="looks_two"></spectrum-chip>
          <spectrum-chip variant="secondary" label="Third Item" leadingIcon="looks_3"></spectrum-chip>
          <spectrum-chip variant="secondary" label="Fourth Item" leadingIcon="looks_4"></spectrum-chip>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Different styling and layout options for the chip variant. Primary chips provide prominent triggers
for important actions, while secondary chips offer subtle options. Layout can be horizontal scrolling
or vertical stacking based on content needs.

**Chip Styling Options:**
- Primary: Bold, prominent styling for important triggers
- Secondary: Subtle styling for optional or supplementary content
- Outlined: Border styling for better visual definition
- Layout: Horizontal scroll for compact display, vertical for comprehensive view
        `
      }
    }
  }
};

// =================================================================
// FEATURE EXAMPLES
// =================================================================

/**
 * Interactive feedback features including sound and haptic feedback.
 * Demonstrates enhanced user experience with multimedia feedback.
 */
export const InteractiveFeedback: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; padding: 2rem; flex-direction: column; align-items: center; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;">
        <div style="min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-sys-color-on-surface);">Sound Feedback</h4>
          <spectrum-accordion 
            variant="chip"
            label="Sound Demo"
            sound="true"
            accordionId="sound-demo"
            @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
            @soundTriggered=${(e: CustomEvent) => action('soundTriggered')(e.detail)}>
            <spectrum-chip variant="secondary" label="Audio Option" leadingIcon="volume_up"></spectrum-chip>
          </spectrum-accordion>
        </div>
        
        <div style="min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-sys-color-on-surface);">Haptic Feedback</h4>
          <spectrum-accordion 
            variant="chip"
            label="Haptic Demo"
            haptic="true"
            accordionId="haptic-demo"
            @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
            @hapticTriggered=${(e: CustomEvent) => action('hapticTriggered')(e.detail)}>
            <spectrum-chip variant="secondary" label="Tactile Option" leadingIcon="vibration"></spectrum-chip>
          </spectrum-accordion>
        </div>
        
        <div style="min-width: 250px;">
          <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-sys-color-on-surface);">Both Feedbacks</h4>
          <spectrum-accordion 
            variant="chip"
            label="Full Feedback"
            sound="true"
            haptic="true"
            accordionId="full-feedback"
            @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
            @soundTriggered=${(e: CustomEvent) => action('soundTriggered')(e.detail)}
            @hapticTriggered=${(e: CustomEvent) => action('hapticTriggered')(e.detail)}>
            <spectrum-chip variant="secondary" label="Enhanced UX" leadingIcon="touch_app"></spectrum-chip>
          </spectrum-accordion>
        </div>
      </div>
      <p style="text-align: center; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.875rem; margin: 1rem 0 0 0;">
        Toggle accordions to experience audio and haptic feedback (haptic requires supported device)
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Enhanced user experience with audio and haptic feedback. These features provide additional sensory
confirmation of user interactions, improving accessibility and engagement.

**Feedback Events:**
- \`soundTriggered\`: \`{ action: "soundTriggered", accordionId: "sound-demo" }\`
- \`hapticTriggered\`: \`{ action: "hapticTriggered", accordionId: "haptic-demo" }\`

**Note:** Haptic feedback requires supported devices and user permissions.
        `
      }
    }
  }
};

/**
 * Custom icon configurations for different use cases.
 * Shows how to customize collapse/expand icons for visual context.
 */
export const CustomIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Plus/Minus Icons</h4>
        <spectrum-accordion 
          variant="standard"
          expandMode="single"
          collapsedIcon="add"
          expandedIcon="remove"
          accordionId="plus-minus"
          .sections=${JSON.stringify([
            { id: 'item1', title: 'Add New Item', content: 'Click to expand this section and see more options.' },
            { id: 'item2', title: 'Configuration Options', content: 'Detailed configuration settings and preferences.' }
          ])}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
      
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Chevron Icons</h4>
        <spectrum-accordion 
          variant="standard"
          expandMode="single"
          collapsedIcon="chevron_right"
          expandedIcon="expand_more"
          accordionId="chevron"
          .sections=${JSON.stringify([
            { id: 'nav1', title: 'Navigation Section', content: 'Navigate through different areas of the application.' },
            { id: 'nav2', title: 'Settings Menu', content: 'Access and modify system settings and preferences.' }
          ])}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Custom icon configurations for different visual contexts. Icons help communicate the expand/collapse
behavior and can match the specific use case or brand guidelines.

**Icon Selection Guidelines:**
- Plus/Minus: Good for adding/removing items or showing more/less content
- Chevron: Excellent for navigation and directional content flow
- Arrow: Traditional and universally understood expand/collapse indicators
        `
      }
    }
  }
};

/**
 * Disabled state demonstration showing non-interactive accordion.
 * Shows how disabled accordions appear and behave.
 */
export const DisabledState: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Disabled Chip Variant</h4>
        <spectrum-accordion 
          variant="chip"
          label="Disabled Options"
          disabled="true"
          accordionId="disabled-chip"
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
          <spectrum-chip variant="secondary" label="Unavailable" leadingIcon="block"></spectrum-chip>
        </spectrum-accordion>
      </div>
      
      <div style="flex: 1; min-width: 300px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">Disabled Standard Variant</h4>
        <spectrum-accordion 
          variant="standard"
          expandMode="single"
          disabled="true"
          accordionId="disabled-standard"
          .sections=${JSON.stringify([
            { id: 'locked1', title: 'Locked Content', content: 'This content is currently unavailable.' },
            { id: 'locked2', title: 'Premium Feature', content: 'Upgrade to access this feature.' }
          ])}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Disabled state prevents user interaction and provides visual feedback that content is unavailable.
Useful for premium features, locked content, or temporarily unavailable functionality.

**Disabled State Features:**
- Reduced opacity for visual indication
- Pointer events disabled to prevent interaction
- Maintains layout structure while clearly showing unavailability
        `
      }
    }
  }
};

// =================================================================
// REAL-WORLD EXAMPLES
// =================================================================

/**
 * FAQ section using standard accordion with single expand mode.
 * Common pattern for help documentation and customer support.
 */
export const FAQSection: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface); text-align: center;">Frequently Asked Questions</h3>
      <spectrum-accordion 
        variant="standard"
        expandMode="single"
        accordionId="faq-section"
        .sections=${JSON.stringify([
          {
            id: 'what-is-spectrum',
            title: 'What is the Spectrum Design System?',
            content: '<p>Spectrum is a comprehensive design system that provides guidelines, components, and tools for creating consistent and accessible user interfaces across all Adobe products.</p>',
            expanded: true
          },
          {
            id: 'how-to-get-started',
            title: 'How do I get started with Spectrum components?',
            content: '<p>Getting started is easy! Install the component library, import the components you need, and follow our comprehensive documentation and examples.</p>'
          },
          {
            id: 'browser-support',
            title: 'What browsers are supported?',
            content: '<p>Spectrum components support all modern browsers including Chrome 88+, Firefox 85+, Safari 14+, and Edge 88+. We ensure cross-browser compatibility and performance.</p>'
          },
          {
            id: 'accessibility',
            title: 'Are Spectrum components accessible?',
            content: '<p>Yes! All Spectrum components are built with accessibility in mind, following WCAG 2.1 AA guidelines and providing full keyboard navigation and screen reader support.</p>'
          },
          {
            id: 'customization',
            title: 'Can I customize the component styling?',
            content: '<p>Absolutely! Spectrum components use CSS custom properties for theming and can be styled to match your brand while maintaining accessibility and usability standards.</p>'
          }
        ])}
        @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Classic FAQ section implementation using single expand mode. This pattern helps users focus on one
question at a time while maintaining a clean, scannable interface for quick information access.

**FAQ Best Practices:**
- Use clear, question-based titles that match user language
- Start with the most common or important question expanded
- Keep answers concise but comprehensive
- Use single expand mode to reduce cognitive load
        `
      }
    }
  }
};

/**
 * Product features showcase using multi-expand mode.
 * Allows users to compare features and explore multiple areas simultaneously.
 */
export const ProductFeatures: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface); text-align: center;">Platform Features</h3>
      <spectrum-accordion 
        variant="standard"
        expandMode="multi"
        accordionId="product-features"
        .sections=${JSON.stringify([
          {
            id: 'analytics-dashboard',
            title: '📊 Advanced Analytics Dashboard',
            content: '<p>Get comprehensive insights with real-time data visualization, custom reporting, and predictive analytics to drive informed business decisions.</p>',
            expanded: true
          },
          {
            id: 'team-collaboration',
            title: '👥 Real-time Team Collaboration',
            content: '<p>Work seamlessly with your team through shared workspaces, live editing, instant messaging, and project management tools.</p>',
            expanded: false
          },
          {
            id: 'api-integrations',
            title: '🔗 Extensive API Integrations',
            content: '<p>Connect with 100+ popular tools and services through our robust REST API, webhooks, and pre-built integrations marketplace.</p>',
            expanded: true
          },
          {
            id: 'enterprise-security',
            title: '🔒 Enterprise-Grade Security',
            content: '<p>Bank-level security with end-to-end encryption, SSO/SAML support, compliance certifications, and advanced audit logging.</p>',
            expanded: false
          },
          {
            id: 'mobile-apps',
            title: '📱 Native Mobile Applications',
            content: '<p>Access your workspace anywhere with our native iOS and Android apps featuring offline sync and push notifications.</p>',
            expanded: false
          }
        ])}
        @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Product features showcase using multi-expand mode allows users to open multiple sections
simultaneously for feature comparison and comprehensive exploration.

**Feature Showcase Benefits:**
- Multiple sections open for easy comparison
- Visual icons enhance scannability and recognition
- Detailed descriptions with benefits and capabilities
- Progressive disclosure maintains clean interface while providing depth
        `
      }
    }
  }
};

/**
 * Navigation menu using chip variant for quick access.
 * Compact navigation solution for supplementary menu items.
 */
export const NavigationMenu: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface);">Quick Navigation</h3>
      <spectrum-accordion 
        variant="chip"
        label="More Options"
        chipVariant="secondary"
        outline="true"
        accordionId="navigation-menu"
        @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        <spectrum-chip variant="secondary" label="Dashboard" leadingIcon="dashboard"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Projects" leadingIcon="folder"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Team" leadingIcon="group"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Settings" leadingIcon="settings"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Help Center" leadingIcon="help"></spectrum-chip>
        <spectrum-chip variant="secondary" label="Feedback" leadingIcon="feedback"></spectrum-chip>
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Chip variant navigation menu provides compact access to supplementary navigation options.
Perfect for secondary navigation that doesn't need to be immediately visible.

**Navigation Menu Benefits:**
- Space-efficient solution for secondary navigation
- Horizontal scroll accommodates many options
- Clear icons improve recognition and usability
- Collapsible design keeps primary interface clean
        `
      }
    }
  }
};

/**
 * Content organization with hierarchical information.
 * Standard variant for organizing complex content into digestible sections.
 */
export const ContentOrganization: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface);">Documentation Sections</h3>
      <spectrum-accordion 
        variant="standard"
        expandMode="single"
        accordionId="content-organization"
        .sections=${JSON.stringify([
          {
            id: 'getting-started-guide',
            title: '🚀 Getting Started Guide',
            content: '<p><strong>Quick Setup:</strong> Follow our step-by-step installation guide to get up and running in minutes.</p><ul><li>System requirements and compatibility</li><li>Installation instructions for different platforms</li><li>Initial configuration and setup</li><li>First project walkthrough</li></ul>',
            expanded: true
          },
          {
            id: 'user-interface',
            title: '🎨 User Interface Overview',
            content: '<p><strong>Interface Tour:</strong> Familiarize yourself with the main interface elements and navigation.</p><ul><li>Main dashboard and workspace layout</li><li>Navigation patterns and menu structure</li><li>Toolbar and action buttons</li><li>Customization options and preferences</li></ul>'
          },
          {
            id: 'advanced-features',
            title: '⚡ Advanced Features',
            content: '<p><strong>Power User Tools:</strong> Discover advanced functionality for experienced users.</p><ul><li>Automation and workflow setup</li><li>Advanced filtering and search</li><li>Custom integrations and extensions</li><li>Performance optimization tips</li></ul>'
          },
          {
            id: 'troubleshooting',
            title: '🔧 Troubleshooting & Support',
            content: '<p><strong>Help Resources:</strong> Find solutions to common issues and get additional support.</p><ul><li>Common problems and solutions</li><li>Error codes and their meanings</li><li>Contact support and community resources</li><li>System diagnostics and logs</li></ul>'
          }
        ])}
        @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Content organization using accordion for hierarchical information display. Perfect for documentation,
help content, and complex information that benefits from progressive disclosure.

**Content Organization Benefits:**
- Hierarchical information structure
- Progressive disclosure reduces cognitive overload
- Scannable section titles with clear categorization
- Rich content support with lists and formatting
        `
      }
    }
  }
};

// =================================================================
// ACCESSIBILITY EXAMPLES
// =================================================================

/**
 * Accessibility-focused example with proper ARIA labels and keyboard navigation.
 * Demonstrates best practices for screen reader support and keyboard accessibility.
 */
export const AccessibilityExample: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <div style="padding: 1rem; background: var(--spectrum-sys-color-surface); border-radius: 8px; border-left: 4px solid var(--spectrum-sys-color-primary);">
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-sys-color-on-surface);">♿ Accessibility Features</h3>
        <ul style="margin: 0; padding-left: 1.5rem; line-height: 1.8; color: var(--spectrum-sys-color-on-surface-variant);">
          <li><strong>Keyboard Navigation:</strong> Tab to navigate, Enter/Space to toggle sections</li>
          <li><strong>Screen Reader Support:</strong> Proper ARIA labels, roles, and state announcements</li>
          <li><strong>Focus Management:</strong> Visible focus indicators and logical tab order</li>
          <li><strong>High Contrast:</strong> Enhanced visibility in high contrast mode</li>
          <li><strong>Reduced Motion:</strong> Respects user's motion preferences</li>
        </ul>
      </div>
      
      <spectrum-accordion 
        variant="standard"
        expandMode="single"
        accordionId="accessibility-demo"
        .sections=${JSON.stringify([
          {
            id: 'keyboard-navigation',
            title: 'Keyboard Navigation Support',
            content: '<p>Use <strong>Tab</strong> to navigate between accordion headers, <strong>Enter</strong> or <strong>Space</strong> to toggle sections. Arrow keys can navigate within expanded content.</p>',
            expanded: true
          },
          {
            id: 'screen-reader-support',
            title: 'Screen Reader Compatibility',
            content: '<p>Each accordion section has proper ARIA labels and roles. Screen readers announce the current state (expanded/collapsed) and provide context about the content structure and relationships.</p>'
          },
          {
            id: 'visual-accessibility',
            title: 'Visual Accessibility Features',
            content: '<p>High contrast mode support, sufficient color contrast ratios, clear focus indicators, and respect for reduced motion preferences ensure the component works for users with various visual needs.</p>'
          },
          {
            id: 'assistive-technology',
            title: 'Assistive Technology Integration',
            content: '<p>Compatible with voice control software, switch navigation devices, and other assistive technologies through proper semantic markup and keyboard event handling.</p>'
          }
        ])}
        @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Accessibility Features Demonstrated:**

- **Keyboard Navigation**: Tab/Shift+Tab to navigate, Enter/Space to toggle sections
- **Screen Reader Support**: Proper ARIA roles, labels, and state announcements
- **Focus Management**: Clear focus indicators and logical focus flow
- **High Contrast**: Component respects system accessibility preferences
- **Semantic HTML**: Uses proper button and content elements with accessible markup

**Testing Instructions:**
1. Use Tab key to navigate between accordion headers
2. Use Enter or Space to expand/collapse sections
3. Enable screen reader to test announcements
4. Test with high contrast mode enabled
5. Verify with keyboard-only navigation
        `
      }
    }
  }
};

// =================================================================
// PERFORMANCE EXAMPLES
// =================================================================

/**
 * Performance example with many accordion sections to test rendering efficiency.
 * Demonstrates component behavior with substantial amounts of content.
 */
export const PerformanceExample: Story = {
  render: () => html`
    <div style="padding: 2rem; background: var(--spectrum-sys-color-surface-variant); border-radius: 8px;">
      <h3 style="margin-bottom: 2rem; color: var(--spectrum-sys-color-on-surface);">Performance Test - 20 Sections</h3>
      <div style="max-height: 600px; overflow-y: auto;">
        <spectrum-accordion 
          variant="standard"
          expandMode="multi"
          accordionId="performance-test"
          .sections=${JSON.stringify(Array.from({ length: 20 }, (_, i) => ({
            id: `section-${i + 1}`,
            title: `Section ${i + 1}: Performance Testing Item`,
            content: `<p>This is section ${i + 1} content for performance testing. The accordion should handle multiple sections efficiently with smooth animations and responsive interactions.</p><p>Additional content to test rendering performance with longer text blocks and multiple paragraphs in each section.</p>`,
            expanded: i < 3 // First 3 sections expanded by default
          })))}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
**Performance Characteristics:**

- **20 Sections**: Large number of collapsible sections with efficient rendering
- **Event Handling**: Each section maintains independent event handling without performance degradation
- **Memory Management**: Proper cleanup and efficient state management
- **Scroll Performance**: Smooth scrolling with many interactive elements
- **Animation Performance**: Consistent expand/collapse animations across all sections

**Performance Testing:**
- Scroll through the sections to test rendering performance
- Toggle multiple sections rapidly to test event handling efficiency
- Notice consistent interaction responsiveness across all sections
- Observe smooth animations even with many sections expanded
        `
      }
    }
  }
}; 