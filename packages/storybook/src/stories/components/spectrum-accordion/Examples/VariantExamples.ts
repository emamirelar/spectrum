import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Advanced content for variant demonstrations
export const advancedExplorations = [
  { label: 'Artificial Intelligence', value: 'ai', icon: 'psychology' },
  { label: 'Machine Learning', value: 'ml', icon: 'model_training' },
  { label: 'Data Science', value: 'data-science', icon: 'analytics' },
  { label: 'Cloud Computing', value: 'cloud', icon: 'cloud' },
  { label: 'Cybersecurity', value: 'security', icon: 'security' },
  { label: 'DevOps', value: 'devops', icon: 'integration_instructions' }
];

export const comprehensiveFAQSections = [
  {
    id: 'account',
    title: 'Account Management',
    content: '<p>Learn how to manage your account settings, update your profile information, and control privacy settings.</p>'
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    content: '<p>Information about billing cycles, payment methods, invoices, and subscription management.</p>'
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    content: '<p>Understand our security measures, data protection policies, and how to keep your account secure.</p>'
  },
  {
    id: 'integrations',
    title: 'Third-party Integrations',
    content: '<p>Connect with your favorite tools and services through our extensive integration marketplace.</p>'
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    content: '<p>Common issues and their solutions, error codes, and when to contact support.</p>'
  }
];

export const productFeatureSections = [
  {
    id: 'dashboard',
    title: 'Interactive Dashboard',
    expanded: true,
    content: '<p>Real-time data visualization with customizable widgets and live updates.</p>'
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    content: '<p>Automate repetitive tasks with our visual workflow builder and smart triggers.</p>'
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    expanded: true,
    content: '<p>Share projects, leave comments, and work together in real-time with your team.</p>'
  },
  {
    id: 'reporting',
    title: 'Advanced Reporting',
    content: '<p>Generate detailed reports with custom metrics, filters, and automated scheduling.</p>'
  }
];

// ==============================================
// Chip Variant Showcase
// ==============================================

export const ChipVariantPrimary = {
  args: {
    variant: 'chip',
    chipVariant: 'primary',
    outline: false,
    label: 'Tech Innovations',
    expanded: false,
    collapsedIcon: 'expand_more',
    expandedIcon: 'expand_less',
    accordionId: 'chip-primary'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .label=${args.label}
      .expanded=${args.expanded}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Primary Chip Toggled')(e.detail)}
    >
      ${advancedExplorations.slice(0, 4).map(exploration => html`
        <spectrum-chip
          variant="primary"
          label=${exploration.label}
          leadingIcon=${exploration.icon}
          @click=${() => action('Tech Exploration Clicked')(exploration)}
        ></spectrum-chip>
      `)}
    </spectrum-accordion>
  `
};

export const ChipVariantSecondary = {
  args: {
    variant: 'chip',
    chipVariant: 'secondary',
    outline: true,
    label: 'Explore More',
    expanded: false,
    collapsedIcon: 'keyboard_arrow_down',
    expandedIcon: 'keyboard_arrow_up',
    accordionId: 'chip-secondary'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .label=${args.label}
      .expanded=${args.expanded}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Secondary Chip Toggled')(e.detail)}
    >
      ${advancedExplorations.slice(2, 6).map(exploration => html`
        <spectrum-chip
          variant="secondary"
          label=${exploration.label}
          leadingIcon=${exploration.icon}
          @click=${() => action('Secondary Exploration Clicked')(exploration)}
        ></spectrum-chip>
      `)}
    </spectrum-accordion>
  `
};

export const ChipVariantOutlined = {
  args: {
    variant: 'chip',
    chipVariant: 'primary',
    outline: true,
    label: 'Show Options',
    expanded: false,
    accordionId: 'chip-outlined'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .label=${args.label}
      .expanded=${args.expanded}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Outlined Chip Toggled')(e.detail)}
    >
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <spectrum-button variant="secondary" size="sm">Quick Action</spectrum-button>
        <spectrum-button variant="secondary" size="sm">Another Option</spectrum-button>
        <spectrum-button variant="secondary" size="sm">More Tools</spectrum-button>
      </div>
    </spectrum-accordion>
  `
};

export const ChipVariantFilled = {
  args: {
    variant: 'chip',
    chipVariant: 'primary',
    outline: false,
    label: 'Premium Features',
    expanded: false,
    accordionId: 'chip-filled'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .label=${args.label}
      .expanded=${args.expanded}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Filled Chip Toggled')(e.detail)}
    >
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <spectrum-badge variant="success" label="AI Assistant"></spectrum-badge>
        <spectrum-badge variant="primary" label="Analytics Pro"></spectrum-badge>
        <spectrum-badge variant="warning" label="Beta Features"></spectrum-badge>
      </div>
    </spectrum-accordion>
  `
};

// ==============================================
// Standard Variant Showcase
// ==============================================

export const StandardVariantSingleExpand = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify(comprehensiveFAQSections),
    collapsedIcon: 'add',
    expandedIcon: 'remove',
    accordionId: 'standard-single-expand'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Single Mode Toggled')(e.detail)}
    >
    </spectrum-accordion>
  `
};

export const StandardVariantMultiExpand = {
  args: {
    variant: 'standard',
    expandMode: 'multi',
    sections: JSON.stringify(productFeatureSections),
    collapsedIcon: 'chevron_right',
    expandedIcon: 'expand_more',
    accordionId: 'standard-multi-expand'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Multi Mode Toggled')(e.detail)}
    >
    </spectrum-accordion>
  `
};

export const StandardVariantCustomIcons = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify([
      {
        id: 'settings',
        title: 'Settings & Configuration',
        content: '<p>Customize your application settings and preferences.</p>'
      },
      {
        id: 'notifications',
        title: 'Notifications & Alerts',
        content: '<p>Manage how and when you receive notifications.</p>'
      },
      {
        id: 'privacy',
        title: 'Privacy & Data Control',
        content: '<p>Control your data privacy settings and permissions.</p>'
      }
    ]),
    collapsedIcon: 'play_arrow',
    expandedIcon: 'pause',
    accordionId: 'standard-custom-icons'
  },
  render: StandardVariantSingleExpand.render
};

// ==============================================
// Comparison Examples
// ==============================================

export const ChipVsStandardComparison = {
  args: {
    variant: 'chip' // This will be overridden in render
  },
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px;">
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface); font-size: 1.2rem;">Chip Variant</h3>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Trigger-based accordion ideal for collapsing/expanding additional actions or content
        </p>
        <spectrum-accordion
          variant="chip"
          label="Show Advanced Options"
          chip-variant="primary"
          outline="false"
          accordionId="comparison-chip"
          @accordionToggle=${(e: CustomEvent) => action('Chip Comparison Toggled')(e.detail)}
        >
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <spectrum-button variant="secondary" size="sm">Export Data</spectrum-button>
            <spectrum-button variant="secondary" size="sm">Import Settings</spectrum-button>
            <spectrum-button variant="secondary" size="sm">Advanced Filters</spectrum-button>
            <spectrum-button variant="secondary" size="sm">Custom Reports</spectrum-button>
          </div>
        </spectrum-accordion>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface); font-size: 1.2rem;">Standard Variant</h3>
        <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant); font-size: 0.9rem;">
          Traditional multi-section accordion perfect for organizing content and navigation
        </p>
        <spectrum-accordion
          variant="standard"
          expand-mode="single"
          sections=${JSON.stringify([
            {
              id: 'overview',
              title: 'System Overview',
              content: '<p>View comprehensive system statistics and health metrics.</p>'
            },
            {
              id: 'performance',
              title: 'Performance Analytics',
              content: '<p>Monitor performance metrics and optimization recommendations.</p>'
            },
            {
              id: 'logs',
              title: 'System Logs',
              content: '<p>Access detailed system logs and error tracking information.</p>'
            }
          ])}
          accordionId="comparison-standard"
          @accordionToggle=${(e: CustomEvent) => action('Standard Comparison Toggled')(e.detail)}
        >
        </spectrum-accordion>
      </div>
    </div>
  `
};

export const AllVariantsShowcase = {
  args: {
    variant: 'chip' // This will be overridden in render
  },
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <!-- Chip Variants Section -->
      <div>
        <h2 style="margin-bottom: 1.5rem; color: var(--spectrum-color-on-surface);">Chip Variant Configurations</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Primary Filled</h4>
            <spectrum-accordion
              variant="chip"
              chip-variant="primary"
              outline="false"
              label="Primary Actions"
              accordionId="showcase-primary-filled"
              @accordionToggle=${(e: CustomEvent) => action('Primary Filled Toggled')(e.detail)}
            >
              <spectrum-chip variant="primary" label="Create New"></spectrum-chip>
              <spectrum-chip variant="primary" label="Quick Start"></spectrum-chip>
            </spectrum-accordion>
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Primary Outlined</h4>
            <spectrum-accordion
              variant="chip"
              chip-variant="primary"
              outline="true"
              label="Primary Options"
              accordionId="showcase-primary-outlined"
              @accordionToggle=${(e: CustomEvent) => action('Primary Outlined Toggled')(e.detail)}
            >
              <spectrum-chip variant="secondary" label="Configure"></spectrum-chip>
              <spectrum-chip variant="secondary" label="Customize"></spectrum-chip>
            </spectrum-accordion>
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Secondary Filled</h4>
            <spectrum-accordion
              variant="chip"
              chip-variant="secondary"
              outline="false"
              label="Secondary Actions"
              accordionId="showcase-secondary-filled"
              @accordionToggle=${(e: CustomEvent) => action('Secondary Filled Toggled')(e.detail)}
            >
              <spectrum-chip variant="secondary" label="Edit"></spectrum-chip>
              <spectrum-chip variant="secondary" label="Copy"></spectrum-chip>
            </spectrum-accordion>
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Secondary Outlined</h4>
            <spectrum-accordion
              variant="chip"
              chip-variant="secondary"
              outline="true"
              label="More Options"
              accordionId="showcase-secondary-outlined"
              @accordionToggle=${(e: CustomEvent) => action('Secondary Outlined Toggled')(e.detail)}
            >
              <spectrum-chip variant="secondary" label="Settings"></spectrum-chip>
              <spectrum-chip variant="secondary" label="Help"></spectrum-chip>
            </spectrum-accordion>
          </div>
          
        </div>
      </div>
      
      <!-- Standard Variants Section -->
      <div>
        <h2 style="margin-bottom: 1.5rem; color: var(--spectrum-color-on-surface);">Standard Variant Configurations</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Single Expand Mode</h4>
            <spectrum-accordion
              variant="standard"
              expand-mode="single"
              sections=${JSON.stringify([
                { id: 'single1', title: 'First Section', content: '<p>Only one section can be open at a time.</p>' },
                { id: 'single2', title: 'Second Section', content: '<p>Opening this closes the previous section.</p>' },
                { id: 'single3', title: 'Third Section', content: '<p>Perfect for step-by-step processes.</p>' }
              ])}
              accordionId="showcase-single"
              @accordionToggle=${(e: CustomEvent) => action('Single Mode Showcase Toggled')(e.detail)}
            >
            </spectrum-accordion>
          </div>
          
          <div>
            <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface-variant);">Multi Expand Mode</h4>
            <spectrum-accordion
              variant="standard"
              expand-mode="multi"
              sections=${JSON.stringify([
                { id: 'multi1', title: 'First Section', expanded: true, content: '<p>Multiple sections can be open simultaneously.</p>' },
                { id: 'multi2', title: 'Second Section', content: '<p>Each section operates independently.</p>' },
                { id: 'multi3', title: 'Third Section', expanded: true, content: '<p>Great for feature comparisons.</p>' }
              ])}
              accordionId="showcase-multi"
              @accordionToggle=${(e: CustomEvent) => action('Multi Mode Showcase Toggled')(e.detail)}
            >
            </spectrum-accordion>
          </div>
          
        </div>
      </div>
    </div>
  `
}; 