import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Sample exploration content for chip variant demonstrations
export const sampleExplorations = [
  { label: 'Climate Solutions', value: 'climate-solutions', icon: 'eco' },
  { label: 'Renewable Energy', value: 'renewable-energy', icon: 'solar_power' },
  { label: 'Sustainability Practices', value: 'sustainability', icon: 'recycling' },
  { label: 'Green Technology', value: 'green-tech', icon: 'energy_savings_leaf' },
  { label: 'Carbon Footprint', value: 'carbon-footprint', icon: 'co2' }
];

// Sample sections for standard variant demonstrations
export const basicFAQSections = [
  {
    id: 'getting-started',
    title: 'How do I get started?',
    content: '<p>Getting started is easy! Simply follow our comprehensive quick start guide that walks you through the initial setup process.</p>'
  },
  {
    id: 'system-requirements',
    title: 'What are the system requirements?',
    content: '<p>Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. We also support mobile devices running iOS 12+ and Android 8+.</p>'
  },
  {
    id: 'support',
    title: 'How do I contact support?',
    content: '<p>You can reach our support team via email at support@example.com or through our live chat feature available 24/7.</p>'
  }
];

export const basicFeatureSections = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    content: '<p>Get detailed insights with our comprehensive analytics dashboard featuring real-time data visualization.</p>'
  },
  {
    id: 'collaboration',
    title: 'Real-time Collaboration',
    content: '<p>Work together with your team in real-time with live editing, commenting, and notification systems.</p>'
  },
  {
    id: 'api-integration',
    title: 'API Integration',
    content: '<p>Connect with third-party services via our robust REST API with comprehensive documentation.</p>'
  }
];

// ==============================================
// Chip Variant Basic Examples
// ==============================================

export const ChipBasic = {
  args: {
    variant: 'chip',
    expanded: false,
    label: 'Explore Topics',
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    sound: false,
    horizontalScroll: true,
    disabled: false,
    chipVariant: 'secondary',
    outline: true,
    accordionId: 'chip-basic',
    debug: false
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Accordion Toggled')(e.detail)}
    >
      ${sampleExplorations.slice(0, 3).map(exploration => html`
        <spectrum-chip
          variant="secondary"
          label=${exploration.label}
          leadingIcon=${exploration.icon}
          @click=${() => action('Exploration Clicked')(exploration)}
        ></spectrum-chip>
      `)}
    </spectrum-accordion>
  `
};

export const ChipExpanded = {
  args: {
    ...ChipBasic.args,
    expanded: true,
    label: 'Hide Topics',
    accordionId: 'chip-expanded'
  },
  render: ChipBasic.render
};

export const ChipVertical = {
  args: {
    ...ChipBasic.args,
    horizontalScroll: false,
    label: 'Show Options',
    accordionId: 'chip-vertical'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expanded=${args.expanded}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .sound=${args.sound}
      .horizontalScroll=${args.horizontalScroll}
      .disabled=${args.disabled}
      .chipVariant=${args.chipVariant}
      .outline=${args.outline}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Accordion Toggled')(e.detail)}
    >
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        ${sampleExplorations.slice(0, 4).map(exploration => html`
          <spectrum-chip
            variant="secondary"
            label=${exploration.label}
            leadingIcon=${exploration.icon}
            @click=${() => action('Exploration Clicked')(exploration)}
          ></spectrum-chip>
        `)}
      </div>
    </spectrum-accordion>
  `
};

// ==============================================
// Standard Variant Basic Examples
// ==============================================

export const StandardSingle = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify(basicFAQSections),
    collapsedIcon: 'arrow_drop_down',
    expandedIcon: 'arrow_drop_up',
    disabled: false,
    accordionId: 'standard-single',
    debug: false
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .disabled=${args.disabled}
      .accordionId=${args.accordionId}
      .debug=${args.debug}
      @accordionToggle=${(e: CustomEvent) => action('Section Toggled')(e.detail)}
    >
    </spectrum-accordion>
  `
};

export const StandardMulti = {
  args: {
    ...StandardSingle.args,
    expandMode: 'multi',
    sections: JSON.stringify(basicFeatureSections),
    accordionId: 'standard-multi'
  },
  render: StandardSingle.render
};

export const StandardWithInitialExpanded = {
  args: {
    ...StandardSingle.args,
    expandMode: 'multi',
    sections: JSON.stringify([
      {
        id: 'welcome',
        title: 'Welcome Information',
        expanded: true,
        content: '<p>This section starts expanded to highlight important information.</p>'
      },
      ...basicFeatureSections.slice(1)
    ]),
    accordionId: 'standard-initial-expanded'
  },
  render: StandardSingle.render
};

// ==============================================
// Simple Usage Examples
// ==============================================

export const SimpleChip = {
  args: {
    variant: 'chip',
    label: 'More Options',
    accordionId: 'simple-chip'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .label=${args.label}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Simple Accordion Toggled')(e.detail)}
    >
      <spectrum-button variant="secondary">Option 1</spectrum-button>
      <spectrum-button variant="secondary">Option 2</spectrum-button>
      <spectrum-button variant="secondary">Option 3</spectrum-button>
    </spectrum-accordion>
  `
};

export const SimpleStandard = {
  args: {
    variant: 'standard',
    sections: JSON.stringify([
      {
        id: 'item1',
        title: 'First Item',
        content: '<p>Content for the first item.</p>'
      },
      {
        id: 'item2',
        title: 'Second Item',
        content: '<p>Content for the second item.</p>'
      }
    ]),
    accordionId: 'simple-standard'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .sections=${args.sections}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Simple Standard Toggled')(e.detail)}
    >
    </spectrum-accordion>
  `
}; 