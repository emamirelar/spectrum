import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'spectrum-accordion',
  styleUrl: 'spectrum-accordion.scss',
  shadow: false,
})
export class SpectrumAccordion {
  /**
   * Whether the accordion is expanded
   * Default: false
   */
  @Prop() expanded: boolean = false;

  /**
   * The label for the accordion trigger
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
   * Whether to show content in horizontal scroll container
   * Default: true
   */
  @Prop() horizontalScroll: boolean = true;

  /**
   * Whether the accordion should be disabled
   * Default: false
   */
  @Prop() disabled: boolean = false;

  /**
   * The variant of the trigger chip
   * Default: 'secondary'
   */
  @Prop() variant: 'primary' | 'secondary' = 'secondary';

  /**
   * Whether the trigger chip should be outlined
   * Default: true
   */
  @Prop() outline: boolean = true;

  /**
   * Unique identifier for the accordion
   */
  @Prop() accordionId: string = `accordion-${Math.random().toString(36).substr(2, 9)}`;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  @State() isExpanded: boolean = false;

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
  }>;

  @Watch('expanded')
  expandedChanged(newValue: boolean) {
    this.debugLog('expandedChanged', { newValue, currentIsExpanded: this.isExpanded });
    this.isExpanded = newValue;
  }

  componentWillLoad() {
    this.debugLog('componentWillLoad', { expanded: this.expanded });
    // Ensure initial state is properly set
    this.isExpanded = this.expanded;
  }

  componentDidLoad() {
    this.debugLog('componentDidLoad', { expanded: this.expanded, isExpanded: this.isExpanded });
  }

  private debugLog(message: string, data?: any) {
    if (this.debug) {
      console.log(`[spectrum-accordion ${this.accordionId}] ${message}`, data);
    }
  }

  private handleToggle = () => {
    if (this.disabled) return;
    
    const newExpanded = !this.isExpanded;
    this.debugLog('handleToggle', { 
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

  render() {
    this.debugLog('render', { 
      isExpanded: this.isExpanded, 
      expandedProp: this.expanded,
      shouldShowContent: this.isExpanded 
    });

    return (
      <Host class="spectrum-accordion">
        <div class="spectrum-accordion__trigger">
          <spectrum-chip 
            variant={this.variant}
            outline={this.outline}
            label={this.label}
            sound={this.sound}
            haptic={this.haptic}
            leadingIcon={this.isExpanded ? this.expandedIcon : this.collapsedIcon}
            onClick={this.handleToggle}
            selected={this.isExpanded}
            disabled={this.disabled}
          />
        </div>
        
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
      </Host>
    );
  }
}
