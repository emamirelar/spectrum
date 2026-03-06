import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

interface AccordionSection {
  id: string;
  title: string;
  content?: string;
  expanded?: boolean;
}

interface SpectrumAccordionArgs {
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

const sampleSections: AccordionSection[] = [
  { id: '1', title: 'Getting Started', content: 'Learn the basics of the component and how to integrate it into your application.', expanded: false },
  { id: '2', title: 'Advanced Usage', content: 'Explore advanced patterns including custom events, dynamic sections, and nested content.', expanded: false },
  { id: '3', title: 'API Reference', content: 'Complete property, event, and method documentation for the accordion component.', expanded: false },
];

const renderAccordion = (args: SpectrumAccordionArgs) => html`
  <spectrum-accordion
    .expanded=${args.expanded}
    .label=${args.label}
    .collapsedIcon=${args.collapsedIcon}
    .expandedIcon=${args.expandedIcon}
    .sound=${args.sound}
    .haptic=${args.haptic}
    .horizontalScroll=${args.horizontalScroll}
    .disabled=${args.disabled}
    .variant=${args.variant}
    .chipVariant=${args.chipVariant}
    .outline=${args.outline}
    .expandMode=${args.expandMode}
    .sections=${args.sections}
    .accordionId=${args.accordionId}
    .debug=${args.debug}
    @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
  >
    <div slot="default">
      <p style="margin: 0 0 0.5rem;">Accordion content goes here. This is displayed when expanded.</p>
      <ul style="margin: 0; padding-left: 1.25rem;">
        <li>Sample list item one</li>
        <li>Sample list item two</li>
        <li>Sample list item three</li>
      </ul>
    </div>
  </spectrum-accordion>
`;

const meta = {
  title: 'Spectrum/Components/SpectrumAccordion',
  component: 'spectrum-accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Expandable content container with chip and standard trigger variants, single/multi expand modes, and section support.

### Quick Start
\`\`\`html
<spectrum-accordion label="Details" variant="standard">
  <div slot="default">Content here</div>
</spectrum-accordion>
\`\`\`

### Event System
- **accordionToggle**: Emitted when expanded/collapsed with \`{ action, expanded }\` payload

### Dependencies
- Uses **spectrum-chip** internally for the chip variant trigger
- Used by **spectrum-conversation-panel**
        `
      }
    }
  },
  args: {
    expanded: false,
    label: 'Dive Deeper',
    variant: 'standard',
    chipVariant: 'secondary',
    outline: true,
    expandMode: 'single',
    sections: sampleSections,
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    horizontalScroll: true,
    disabled: false,
    sound: false,
    haptic: false,
    accordionId: '',
    debug: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['chip', 'standard'],
      description: 'Trigger style — chip (compact) or standard (full-width header)',
      table: { category: 'Appearance', defaultValue: { summary: 'standard' } },
    },
    chipVariant: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
      description: 'Color variant when using chip trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'secondary' } },
      if: { arg: 'variant', eq: 'chip' },
    },
    outline: {
      control: 'boolean',
      description: 'Show outline style on trigger',
      table: { category: 'Appearance', defaultValue: { summary: 'true' } },
    },
    expanded: {
      control: 'boolean',
      description: 'Start in expanded state',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevent interaction',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Trigger label text',
      table: { category: 'Content', defaultValue: { summary: 'Dive Deeper' } },
    },
    collapsedIcon: {
      control: 'text',
      description: 'Icon shown when collapsed',
      table: { category: 'Content', defaultValue: { summary: 'arrow_drop_down' } },
    },
    expandedIcon: {
      control: 'text',
      description: 'Icon shown when expanded',
      table: { category: 'Content', defaultValue: { summary: 'arrow_drop_up' } },
    },
    expandMode: {
      control: 'inline-radio',
      options: ['single', 'multi'],
      description: 'Allow one or many sections open at once',
      table: { category: 'Behavior', defaultValue: { summary: 'single' } },
    },
    horizontalScroll: {
      control: 'boolean',
      description: 'Enable horizontal scroll for overflowing content',
      table: { category: 'Behavior', defaultValue: { summary: 'true' } },
    },
    sections: {
      control: 'object',
      description: 'Array of section objects (or JSON string)',
      table: { category: 'Data', defaultValue: { summary: '[]' } },
    },
    sound: {
      control: 'boolean',
      description: 'Enable sound on toggle',
      table: { category: 'Feedback', defaultValue: { summary: 'false' } },
    },
    haptic: {
      control: 'boolean',
      description: 'Enable haptic on toggle',
      table: { category: 'Feedback', defaultValue: { summary: 'false' } },
    },
    accordionId: {
      control: 'text',
      description: 'Custom ID for targeting',
      table: { category: 'Advanced', defaultValue: { summary: 'auto-generated' } },
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: { category: 'Advanced', defaultValue: { summary: 'false' } },
    },
  },
  render: renderAccordion,
} satisfies Meta<SpectrumAccordionArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

// =================================================================
// PLAYGROUND
// =================================================================

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive — use **Controls** to adjust every property. Click the trigger to toggle, and watch the **Actions** panel for events.'
      }
    }
  }
};

// =================================================================
// VARIANTS
// =================================================================

export const StandardVariant: Story = {
  args: { variant: 'standard', label: 'Standard Accordion', expanded: false },
  parameters: {
    docs: { description: { story: 'Full-width header trigger, ideal for content sections and documentation.' } }
  }
};

export const ChipVariant: Story = {
  args: { variant: 'chip', label: 'Chip Accordion', chipVariant: 'secondary', outline: true },
  parameters: {
    docs: { description: { story: 'Compact chip-based trigger, great for inline expandable details.' } }
  }
};

export const ChipPrimary: Story = {
  args: { variant: 'chip', label: 'Primary Chip', chipVariant: 'primary', outline: false },
};

export const BothVariants: Story = {
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 500px;">
      <div>
        <h4 style="margin: 0 0 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem; text-transform: uppercase;">Standard</h4>
        <spectrum-accordion
          variant="standard"
          label="Standard trigger"
          .sections=${args.sections}
          .expandMode=${args.expandMode}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
        >
          <div slot="default"><p style="margin: 0;">Standard variant content</p></div>
        </spectrum-accordion>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem; text-transform: uppercase;">Chip (Secondary)</h4>
        <spectrum-accordion
          variant="chip"
          chip-variant="secondary"
          outline="true"
          label="Chip trigger"
          .sections=${args.sections}
          .expandMode=${args.expandMode}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
        >
          <div slot="default"><p style="margin: 0;">Chip variant content</p></div>
        </spectrum-accordion>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.8rem; text-transform: uppercase;">Chip (Primary)</h4>
        <spectrum-accordion
          variant="chip"
          chip-variant="primary"
          label="Primary chip"
          .sections=${args.sections}
          .expandMode=${args.expandMode}
          @accordionToggle=${(e: CustomEvent) => action('accordionToggle')(e.detail)}
        >
          <div slot="default"><p style="margin: 0;">Primary chip variant content</p></div>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all trigger variants. Adjust **expandMode** and **sections** in Controls.'
      }
    }
  }
};

// =================================================================
// EXPAND MODES
// =================================================================

export const SingleExpand: Story = {
  args: { expandMode: 'single', label: 'Single Expand', expanded: true },
  parameters: {
    docs: { description: { story: 'Only one section can be open at a time (default behavior).' } }
  }
};

export const MultiExpand: Story = {
  args: { expandMode: 'multi', label: 'Multi Expand' },
  parameters: {
    docs: { description: { story: 'Multiple sections can be open simultaneously.' } }
  }
};

// =================================================================
// STATES
// =================================================================

export const Expanded: Story = {
  args: { expanded: true, label: 'Pre-expanded' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Disabled Accordion' },
};

// =================================================================
// REAL-WORLD SCENARIOS
// =================================================================

export const FAQ: Story = {
  render: () => html`
    <div style="max-width: 600px; display: flex; flex-direction: column; gap: 0.5rem;">
      ${[
        { q: 'How do I get started?', a: 'Install the package, import the component, and add it to your HTML. See the Quick Start section above.' },
        { q: 'Can I nest accordions?', a: 'Yes, accordion components can be nested inside each other for hierarchical content structures.' },
        { q: 'Does it support keyboard navigation?', a: 'Fully. Use Tab to focus, Enter/Space to toggle, and arrow keys for section navigation.' },
      ].map((faq, i) => html`
        <spectrum-accordion
          variant="standard"
          label=${faq.q}
          .sections=${[{ id: String(i), title: faq.q, content: faq.a, expanded: false }]}
          @accordionToggle=${(e: CustomEvent) => action('faqToggle')(e.detail)}
        >
          <div slot="default"><p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">${faq.a}</p></div>
        </spectrum-accordion>
      `)}
    </div>
  `,
  parameters: {
    docs: { description: { story: 'FAQ pattern — each question is an independent accordion.' } }
  }
};

export const SettingsPanel: Story = {
  render: () => html`
    <div style="max-width: 500px; display: flex; flex-direction: column; gap: 0.75rem;">
      <spectrum-accordion variant="chip" chip-variant="secondary" outline="true" label="Appearance" collapsed-icon="palette" expanded-icon="palette"
        @accordionToggle=${(e: CustomEvent) => action('settingsToggle')(e.detail)}>
        <div slot="default"><p style="margin: 0;">Theme, colors, and font settings.</p></div>
      </spectrum-accordion>
      <spectrum-accordion variant="chip" chip-variant="secondary" outline="true" label="Privacy" collapsed-icon="lock" expanded-icon="lock"
        @accordionToggle=${(e: CustomEvent) => action('settingsToggle')(e.detail)}>
        <div slot="default"><p style="margin: 0;">Data sharing, cookies, and tracking preferences.</p></div>
      </spectrum-accordion>
      <spectrum-accordion variant="chip" chip-variant="secondary" outline="true" label="Notifications" collapsed-icon="notifications" expanded-icon="notifications"
        @accordionToggle=${(e: CustomEvent) => action('settingsToggle')(e.detail)}>
        <div slot="default"><p style="margin: 0;">Email, push, and in-app notification settings.</p></div>
      </spectrum-accordion>
    </div>
  `,
  parameters: {
    docs: { description: { story: 'Settings panel with chip-style triggers and custom icons for each category.' } }
  }
};

// =================================================================
// ACCESSIBILITY
// =================================================================

export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="max-width: 500px;">
      <p style="color: var(--spectrum-sys-color-on-surface-variant); margin: 0 0 1rem; font-size: 0.875rem;">
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Tab</kbd> to focus the trigger,
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Enter</kbd> /
        <kbd style="background: var(--spectrum-sys-color-surface); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--spectrum-sys-color-outline);">Space</kbd> to expand/collapse.
      </p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <spectrum-accordion variant="standard" label="Focusable Section" @accordionToggle=${(e: CustomEvent) => action('a11yToggle')(e.detail)}>
          <div slot="default"><p style="margin: 0;">Expanded content is accessible via keyboard.</p></div>
        </spectrum-accordion>
        <spectrum-accordion variant="standard" label="Disabled Section" disabled="true">
          <div slot="default"><p style="margin: 0;">This section cannot be toggled.</p></div>
        </spectrum-accordion>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Verify keyboard focus, toggle behavior, and that disabled accordions are properly skipped.'
      }
    }
  }
};
