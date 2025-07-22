import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Element } from '@stencil/core';

export interface AccordionSection {
  id: string;
  title: string;
  content?: string;
  expanded?: boolean;
}

@Component({
  tag: 'spectrum-accordion',
  styleUrl: 'spectrum-accordion.scss',
  shadow: false,
})
export class SpectrumAccordion {
  @Element() el: HTMLElement;

  /**
   * Whether the accordion is expanded (for chip variant)
   * Default: false
   */
  @Prop() expanded: boolean = false;

  /**
   * The label for the accordion trigger (for chip variant)
   * Default: 'Dive Deeper'
   */
  @Prop() label: string = 'Dive Deeper';

  /**
   * The icon to show when collapsed
   * Default: 'arrow_drop_down'
   */
  @Prop() collapsedIcon: string = 'arrow_drop_down';

  /**
   * The icon to show when expanded
   * Default: 'arrow_drop_up'
   */
  @Prop() expandedIcon: string = 'arrow_drop_up';

  /**
   * Whether to enable sound effects
   * Default: false
   */
  @Prop() sound: boolean = false;

  /**
   * Whether to enable haptic feedback
   * Default: false
   */
  @Prop() haptic: boolean = false;

  /**
   * Whether to show content in horizontal scroll container (for chip variant)
   * Default: true
   */
  @Prop() horizontalScroll: boolean = true;

  /**
   * Whether the accordion should be disabled
   * Default: false
   */
  @Prop() disabled: boolean = false;

  /**
   * The variant of the accordion
   * Default: 'standard'
   */
  @Prop() variant: 'chip' | 'standard' = 'standard';

  /**
   * The variant of the trigger chip (for chip variant)
   * Default: 'secondary'
   */
  @Prop() chipVariant: 'primary' | 'secondary' = 'secondary';

  /**
   * Whether the trigger chip should be outlined (for chip variant)
   * Default: true
   */
  @Prop() outline: boolean = true;

  /**
   * Expand behavior for standard variant
   * - 'single': Only one section can be expanded at a time
   * - 'multi': Multiple sections can be expanded simultaneously
   * Default: 'single'
   */
  @Prop() expandMode: 'single' | 'multi' = 'single';

  /**
   * Sections data for standard variant (JSON string or array)
   */
  @Prop() sections: string | AccordionSection[] = [];

  /**
   * Unique identifier for the accordion
   */
  @Prop() accordionId: string = `accordion-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  @State() isExpanded: boolean = false;
  @State() expandedSections: Set<string> = new Set();
  @State() parsedSections: AccordionSection[] = [];

  /**
   * Event emitted when the accordion is toggled
   */
  @Event({
    eventName: 'accordionToggle',
    bubbles: true,
    composed: true,
    cancelable: true
  }) accordionToggle: EventEmitter<{
    expanded: boolean;
    accordionId: string;
    sectionId?: string;
    expandedSections?: string[];
  }>;

  @Watch('expanded')
  expandedChanged(newValue: boolean) {
    this.debugLog('expandedChanged', { newValue, currentIsExpanded: this.isExpanded });
    this.isExpanded = newValue;
  }

  @Watch('sections')
  sectionsChanged(newValue: string | AccordionSection[]) {
    this.parseSections(newValue);
  }

  componentWillLoad() {
    this.debugLog('componentWillLoad', { expanded: this.expanded, variant: this.variant });
    // Ensure initial state is properly set
    this.isExpanded = this.expanded;
    this.parseSections(this.sections);
  }

  componentDidLoad() {
    this.debugLog('componentDidLoad', { 
      expanded: this.expanded, 
      isExpanded: this.isExpanded, 
      variant: this.variant,
      parsedSections: this.parsedSections 
    });
  }

  private parseSections(sections: string | AccordionSection[]) {
    if (typeof sections === 'string') {
      try {
        this.parsedSections = sections ? JSON.parse(sections) : [];
      } catch (error) {
        this.debugLog('Error parsing sections JSON', error);
        this.parsedSections = [];
      }
    } else {
      this.parsedSections = Array.isArray(sections) ? sections : [];
    }

    // Initialize expanded sections based on initial data
    const initialExpanded = new Set<string>();
    this.parsedSections.forEach(section => {
      if (section.expanded) {
        initialExpanded.add(section.id);
      }
    });
    this.expandedSections = initialExpanded;

    this.debugLog('parseSections', { 
      input: sections, 
      parsed: this.parsedSections,
      expandedSections: Array.from(this.expandedSections)
    });
  }

  private debugLog(message: string, data?: any) {
    if (this.debug) {
      console.log(`[spectrum-accordion ${this.accordionId}] ${message}`, data);
    }
  }

  private handleChipToggle = () => {
    if (this.disabled) return;
    
    const newExpanded = !this.isExpanded;
    this.debugLog('handleChipToggle', { 
      currentIsExpanded: this.isExpanded, 
      newExpanded,
      expandedProp: this.expanded 
    });
    
    this.isExpanded = newExpanded;
    
    this.accordionToggle.emit({
      expanded: newExpanded,
      accordionId: this.accordionId
    });
  }

  private handleSectionToggle = (sectionId: string) => {
    if (this.disabled) return;

    const newExpandedSections = new Set(this.expandedSections);
    const isCurrentlyExpanded = newExpandedSections.has(sectionId);

    if (this.expandMode === 'single') {
      // In single mode, close all other sections
      newExpandedSections.clear();
      if (!isCurrentlyExpanded) {
        newExpandedSections.add(sectionId);
      }
    } else {
      // In multi mode, toggle the clicked section
      if (isCurrentlyExpanded) {
        newExpandedSections.delete(sectionId);
      } else {
        newExpandedSections.add(sectionId);
      }
    }

    this.expandedSections = newExpandedSections;

    this.debugLog('handleSectionToggle', {
      sectionId,
      expandMode: this.expandMode,
      wasExpanded: isCurrentlyExpanded,
      expandedSections: Array.from(this.expandedSections)
    });

    this.accordionToggle.emit({
      expanded: !isCurrentlyExpanded,
      accordionId: this.accordionId,
      sectionId,
      expandedSections: Array.from(this.expandedSections)
    });
  }

  private renderChipVariant() {
    return [
      <div class="spectrum-accordion__trigger">
        <spectrum-chip 
          variant={this.chipVariant}
          outline={this.outline}
          label={this.label}
          sound={this.sound}
          haptic={this.haptic}
          leadingIcon={this.isExpanded ? this.expandedIcon : this.collapsedIcon}
          onClick={this.handleChipToggle}
          selected={this.isExpanded}
          disabled={this.disabled}
        />
      </div>,
      
      <div 
        class={`spectrum-accordion__content ${this.isExpanded ? 'spectrum-accordion__content--expanded' : 'spectrum-accordion__content--collapsed'}`}
        id={`accordion-content-${this.accordionId}`}
      >
        {this.horizontalScroll ? (
          <div class="spectrum-accordion__scroll-container">
            <slot></slot>
          </div>
        ) : (
          <div class="spectrum-accordion__content-container">
            <slot></slot>
          </div>
        )}
      </div>
    ];
  }

  private renderStandardVariant() {
    return (
      <div class="spectrum-accordion__standard">
        {this.parsedSections.map((section) => {
          const isExpanded = this.expandedSections.has(section.id);
          return (
            <div 
              key={section.id}
              class="spectrum-accordion__section"
            >
              <button
                class={`spectrum-accordion__section-header ${isExpanded ? 'spectrum-accordion__section-header--expanded' : ''}`}
                onClick={() => this.handleSectionToggle(section.id)}
                disabled={this.disabled}
                aria-expanded={isExpanded ? 'true' : 'false'}
                aria-controls={`section-content-${section.id}`}
              >
                <span class="spectrum-accordion__section-title">{section.title}</span>
                <span class="spectrum-accordion__section-icon material-symbols-outlined">
                  {isExpanded ? this.expandedIcon : this.collapsedIcon}
                </span>
              </button>
              
              <div 
                class={`spectrum-accordion__section-content ${isExpanded ? 'spectrum-accordion__section-content--expanded' : 'spectrum-accordion__section-content--collapsed'}`}
                id={`section-content-${section.id}`}
                role="region"
                aria-labelledby={`section-header-${section.id}`}
              >
                <div class="spectrum-accordion__section-content-inner">
                  {section.content ? (
                    <div innerHTML={section.content}></div>
                  ) : (
                    <slot name={`section-${section.id}`}></slot>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Fallback slot for sections not defined in sections prop */}
        <slot></slot>
      </div>
    );
  }

  render() {
    this.debugLog('render', { 
      variant: this.variant,
      isExpanded: this.isExpanded, 
      expandedProp: this.expanded,
      expandedSections: Array.from(this.expandedSections),
      parsedSections: this.parsedSections
    });

    return (
      <Host class={`spectrum-accordion spectrum-accordion--${this.variant}`}>
        {this.variant === 'chip' ? this.renderChipVariant() : this.renderStandardVariant()}
      </Host>
    );
  }
}
