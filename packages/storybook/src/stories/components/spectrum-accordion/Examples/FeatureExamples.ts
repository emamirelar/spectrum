import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// ==============================================
// Sound and Haptic Feedback Features
// ==============================================

export const AccordionWithSound = {
  args: {
    variant: 'chip',
    sound: true,
    haptic: false,
    label: 'Audio Feedback',
    chipVariant: 'primary',
    expanded: false,
    accordionId: 'sound-enabled'
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        This accordion plays sound when toggled. Click to hear the audio feedback.
      </p>
      <spectrum-accordion
        .variant=${args.variant}
        .sound=${args.sound}
        .haptic=${args.haptic}
        .label=${args.label}
        .chipVariant=${args.chipVariant}
        .expanded=${args.expanded}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Sound Accordion Toggled')(e.detail)}
      >
        <div style="padding: 1rem; text-align: center;">
          <spectrum-chip variant="primary" label="🔊 Sound Enabled" leadingIcon="volume_up"></spectrum-chip>
          <p style="margin-top: 0.5rem; color: var(--spectrum-color-on-surface-variant);">
            Audio feedback enhances user interaction
          </p>
        </div>
      </spectrum-accordion>
    </div>
  `
};

export const AccordionWithHaptic = {
  args: {
    variant: 'chip',
    sound: false,
    haptic: true,
    label: 'Haptic Feedback',
    chipVariant: 'secondary',
    expanded: false,
    accordionId: 'haptic-enabled'
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        This accordion provides haptic feedback on supported devices when toggled.
      </p>
      <spectrum-accordion
        .variant=${args.variant}
        .sound=${args.sound}
        .haptic=${args.haptic}
        .label=${args.label}
        .chipVariant=${args.chipVariant}
        .expanded=${args.expanded}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Haptic Accordion Toggled')(e.detail)}
      >
        <div style="padding: 1rem; text-align: center;">
          <spectrum-chip variant="secondary" label="📱 Haptic Enabled" leadingIcon="vibration"></spectrum-chip>
          <p style="margin-top: 0.5rem; color: var(--spectrum-color-on-surface-variant);">
            Feel the tactile response on mobile devices
          </p>
        </div>
      </spectrum-accordion>
    </div>
  `
};

export const AccordionWithBothFeedbacks = {
  args: {
    variant: 'chip',
    sound: true,
    haptic: true,
    label: 'Full Feedback Experience',
    chipVariant: 'primary',
    outline: false,
    expanded: false,
    accordionId: 'full-feedback'
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Experience both audio and haptic feedback for enhanced interaction.
      </p>
      <spectrum-accordion
        .variant=${args.variant}
        .sound=${args.sound}
        .haptic=${args.haptic}
        .label=${args.label}
        .chipVariant=${args.chipVariant}
        .outline=${args.outline}
        .expanded=${args.expanded}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Full Feedback Accordion Toggled')(e.detail)}
      >
        <div style="padding: 1rem; text-align: center;">
          <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;">
            <spectrum-chip variant="primary" label="🔊 Audio" leadingIcon="volume_up"></spectrum-chip>
            <spectrum-chip variant="primary" label="📱 Haptic" leadingIcon="vibration"></spectrum-chip>
          </div>
          <p style="color: var(--spectrum-color-on-surface-variant);">
            Complete sensory feedback experience
          </p>
        </div>
      </spectrum-accordion>
    </div>
  `
};

// ==============================================
// Custom Icons and Animations
// ==============================================

export const AccordionCustomIcons = {
  args: {
    variant: 'chip',
    label: 'Custom Icons',
    collapsedIcon: 'play_circle',
    expandedIcon: 'pause_circle',
    chipVariant: 'primary',
    accordionId: 'custom-icons'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .label=${args.label}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .chipVariant=${args.chipVariant}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Custom Icons Toggled')(e.detail)}
    >
      <div style="padding: 1rem;">
        <h4 style="margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface);">Media Controls</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-button variant="secondary" size="sm">▶️ Play</spectrum-button>
          <spectrum-button variant="secondary" size="sm">⏸️ Pause</spectrum-button>
          <spectrum-button variant="secondary" size="sm">⏹️ Stop</spectrum-button>
          <spectrum-button variant="secondary" size="sm">⏭️ Next</spectrum-button>
        </div>
      </div>
    </spectrum-accordion>
  `
};

export const AccordionAnimatedContent = {
  args: {
    variant: 'standard',
    expandMode: 'single',
    sections: JSON.stringify([
      {
        id: 'animation1',
        title: '🎭 Animation Showcase',
        content: '<div style="text-align: center; padding: 1rem;"><h4>Smooth Transitions</h4><p>Watch the content smoothly expand and collapse with CSS animations.</p></div>'
      },
      {
        id: 'animation2',
        title: '🎨 Visual Effects',
        content: '<div style="background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); color: white; padding: 1rem; border-radius: 8px; text-align: center;"><h4>Gradient Background</h4><p>Beautiful visual styling with smooth animations.</p></div>'
      },
      {
        id: 'animation3',
        title: '⚡ Performance',
        content: '<div style="padding: 1rem;"><h4>Optimized Animations</h4><p>Hardware-accelerated CSS transitions for smooth performance across devices.</p></div>'
      }
    ]),
    collapsedIcon: 'play_arrow',
    expandedIcon: 'expand_more',
    accordionId: 'animated-content'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .collapsedIcon=${args.collapsedIcon}
      .expandedIcon=${args.expandedIcon}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Animated Content Toggled')(e.detail)}
    >
    </spectrum-accordion>
  `
};

// ==============================================
// Complex Content Features
// ==============================================

export const AccordionWithInteractiveContent = {
  args: {
    variant: 'chip',
    label: 'Interactive Dashboard',
    horizontalScroll: false,
    expanded: false,
    accordionId: 'interactive-content'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .label=${args.label}
      .horizontalScroll=${args.horizontalScroll}
      .expanded=${args.expanded}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Interactive Dashboard Toggled')(e.detail)}
    >
      <div style="padding: 1rem; background: var(--spectrum-color-surface-variant); border-radius: 8px;">
        <h4 style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface);">Dashboard Controls</h4>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          <div style="padding: 1rem; background: var(--spectrum-color-surface); border-radius: 6px;">
            <spectrum-badge variant="success" label="✅ System Online"></spectrum-badge>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--spectrum-color-on-surface-variant);">All systems operational</p>
          </div>
          
          <div style="padding: 1rem; background: var(--spectrum-color-surface); border-radius: 6px;">
            <spectrum-badge variant="warning" label="⚠️ Maintenance"></spectrum-badge>
            <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--spectrum-color-on-surface-variant);">Scheduled maintenance in 2 hours</p>
          </div>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-button variant="primary" size="sm">Refresh Data</spectrum-button>
          <spectrum-button variant="secondary" size="sm">Export Report</spectrum-button>
          <spectrum-button variant="secondary" size="sm">Settings</spectrum-button>
        </div>
      </div>
    </spectrum-accordion>
  `
};

export const AccordionWithSlottedContent = {
  args: {
    variant: 'standard',
    expandMode: 'multi',
    sections: JSON.stringify([
      { id: 'form-section', title: '📝 Interactive Form' },
      { id: 'gallery-section', title: '🖼️ Image Gallery' },
      { id: 'tools-section', title: '🛠️ Tool Collection' }
    ]),
    accordionId: 'slotted-content'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .expandMode=${args.expandMode}
      .sections=${args.sections}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Slotted Content Toggled')(e.detail)}
    >
      <!-- Form Section Content -->
      <div slot="section-form-section" style="padding: 1rem;">
        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface);">Name:</label>
            <input type="text" placeholder="Enter your name" style="width: 100%; padding: 0.5rem; border: 1px solid var(--spectrum-color-outline); border-radius: 4px;">
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; color: var(--spectrum-color-on-surface);">Email:</label>
            <input type="email" placeholder="Enter your email" style="width: 100%; padding: 0.5rem; border: 1px solid var(--spectrum-color-outline); border-radius: 4px;">
          </div>
          <spectrum-button variant="primary" size="sm">Submit Form</spectrum-button>
        </div>
      </div>
      
      <!-- Gallery Section Content -->
      <div slot="section-gallery-section" style="padding: 1rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap: 0.5rem;">
          ${Array.from({length: 6}, (_, i) => html`
            <div style="aspect-ratio: 1; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
              ${i + 1}
            </div>
          `)}
        </div>
        <spectrum-button variant="secondary" size="sm" style="margin-top: 1rem;">View All Images</spectrum-button>
      </div>
      
      <!-- Tools Section Content -->
      <div slot="section-tools-section" style="padding: 1rem;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <spectrum-chip variant="secondary" label="🔧 Debug Tool" leadingIcon="bug_report"></spectrum-chip>
          <spectrum-chip variant="secondary" label="📊 Analytics" leadingIcon="analytics"></spectrum-chip>
          <spectrum-chip variant="secondary" label="🔍 Search" leadingIcon="search"></spectrum-chip>
          <spectrum-chip variant="secondary" label="⚙️ Settings" leadingIcon="settings"></spectrum-chip>
        </div>
      </div>
    </spectrum-accordion>
  `
};

// ==============================================
// Debug and Development Features
// ==============================================

export const AccordionWithDebug = {
  args: {
    variant: 'standard',
    expandMode: 'multi',
    debug: true,
    sections: JSON.stringify([
      {
        id: 'debug1',
        title: 'Debug Information',
        expanded: true,
        content: '<p>Open the browser console to see debug logs for this accordion.</p>'
      },
      {
        id: 'debug2',
        title: 'State Tracking',
        content: '<p>All state changes and events are logged to the console for development purposes.</p>'
      }
    ]),
    accordionId: 'debug-accordion'
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; padding: 0.5rem; background: var(--spectrum-color-warning-container); color: var(--spectrum-color-on-warning-container); border-radius: 4px; font-size: 0.9rem;">
        📝 Debug mode enabled - check the browser console for detailed logs
      </p>
      <spectrum-accordion
        .variant=${args.variant}
        .expandMode=${args.expandMode}
        .debug=${args.debug}
        .sections=${args.sections}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Debug Accordion Toggled')(e.detail)}
      >
      </spectrum-accordion>
    </div>
  `
};

export const AccordionDisabledState = {
  args: {
    variant: 'chip',
    label: 'Disabled Accordion',
    disabled: true,
    chipVariant: 'secondary',
    accordionId: 'disabled-accordion'
  },
  render: (args: any) => html`
    <div>
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        This accordion is disabled and cannot be toggled.
      </p>
      <spectrum-accordion
        .variant=${args.variant}
        .label=${args.label}
        .disabled=${args.disabled}
        .chipVariant=${args.chipVariant}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Disabled Accordion Attempted Toggle')(e.detail)}
      >
        <div style="padding: 1rem; opacity: 0.6;">
          <p>This content is not accessible when the accordion is disabled.</p>
          <spectrum-button variant="secondary" disabled>Disabled Button</spectrum-button>
        </div>
      </spectrum-accordion>
    </div>
  `
};

// ==============================================
// Layout and Scrolling Features
// ==============================================

export const AccordionHorizontalScroll = {
  args: {
    variant: 'chip',
    label: 'Horizontal Scroll Demo',
    horizontalScroll: true,
    chipVariant: 'primary',
    accordionId: 'horizontal-scroll'
  },
  render: (args: any) => html`
    <div style="max-width: 600px;">
      <p style="margin-bottom: 1rem; color: var(--spectrum-color-on-surface-variant);">
        Content scrolls horizontally when it exceeds the container width.
      </p>
      <spectrum-accordion
        .variant=${args.variant}
        .label=${args.label}
        .horizontalScroll=${args.horizontalScroll}
        .chipVariant=${args.chipVariant}
        .accordionId=${args.accordionId}
        @accordionToggle=${(e: CustomEvent) => action('Horizontal Scroll Toggled')(e.detail)}
      >
        <div style="display: flex; gap: 0.5rem; min-width: 800px;">
          ${Array.from({length: 8}, (_, i) => html`
            <spectrum-chip 
              variant="secondary" 
              label="Item ${i + 1}" 
              leadingIcon="circle"
              @click=${() => action('Scroll Item Clicked')(`Item ${i + 1}`)}
            ></spectrum-chip>
          `)}
        </div>
      </spectrum-accordion>
    </div>
  `
};

export const AccordionVerticalLayout = {
  args: {
    variant: 'chip',
    label: 'Vertical Layout Demo',
    horizontalScroll: false,
    chipVariant: 'secondary',
    accordionId: 'vertical-layout'
  },
  render: (args: any) => html`
    <spectrum-accordion
      .variant=${args.variant}
      .label=${args.label}
      .horizontalScroll=${args.horizontalScroll}
      .chipVariant=${args.chipVariant}
      .accordionId=${args.accordionId}
      @accordionToggle=${(e: CustomEvent) => action('Vertical Layout Toggled')(e.detail)}
    >
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 300px;">
        ${Array.from({length: 5}, (_, i) => html`
          <div style="padding: 0.5rem; background: var(--spectrum-color-surface-variant); border-radius: 4px; display: flex; align-items: center; gap: 0.5rem;">
            <span style="color: var(--spectrum-color-primary);">•</span>
            <span style="color: var(--spectrum-color-on-surface);">Vertical Item ${i + 1}</span>
          </div>
        `)}
      </div>
    </spectrum-accordion>
  `
}; 