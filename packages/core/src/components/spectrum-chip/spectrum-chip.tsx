import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Watch } from '@stencil/core';

/**
 * Spectrum Chip Component
 * A versatile chip component that can be used for tags, filters, and selections.
 * Supports leading/trailing icons, selection states, and various interactive behaviors.
 */
@Component({
  tag: 'spectrum-chip',
  styleUrl: 'spectrum-chip.scss',
  shadow: true,
})
export class SpectrumChip {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Chip Variants and Appearance
  @Prop() variant: 'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion' = 'primary';
  @Prop() selected: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() outline: boolean = false;
  @Prop() ripple: boolean = false;
  @Prop() action: string = '';

  // Chip Content
  @Prop() label: string = '';
  @Prop() leadingIcon: string = '';
  @Prop() trailingIcon: string = 'close';
  @Prop() showTrailingIcon: boolean = false;

  // Chip State
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;
  @State() ripples: { x: number; y: number; id: number }[] = [];
  private rippleId: number = 0;

  // Events
  @Event() chipAction: EventEmitter<{ action?: string; label: string }>;

  // ============== Debug Helpers ==============
  private log(_message: string, _data?: any) {
    if (this.debug) {
      // Debug logging disabled
    }
  }

  // ============== State Management ==============
  @Watch('selected')
  handleSelectedChange(newValue: boolean) {
    this.log('Selected state changed', { from: this.selected, to: newValue });
  }

  // ============== Event Handlers ==============
  private handleMouseEnter = () => {
    if (!this.disabled) {
      this.log('Mouse entered');
      this.isHovered = true;
    }
  };

  private handleMouseLeave = () => {
    this.log('Mouse left');
    this.isHovered = false;
    this.isActive = false;
  };

  private handleMouseDown = () => {
    if (!this.disabled) {
      this.log('Mouse down');
      this.isActive = true;
    }
  };

  private handleMouseUp = () => {
    this.log('Mouse up');
    this.isActive = false;
  };

  private handleClick = (event: MouseEvent) => {
    if (this.ripple && !this.disabled) {
      const chip = this.el.shadowRoot?.querySelector('.spectrum-chip');
      if (!chip) return;

      const rect = chip.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = this.rippleId++;
      
      this.ripples = [...this.ripples, { x, y, id }];
      
      // Remove ripple after animation completes
      setTimeout(() => {
        this.ripples = this.ripples.filter(r => r.id !== id);
      }, 600);
    }

    if (!this.disabled && this.label) {
      this.chipAction.emit({
        action: this.action || undefined,
        label: this.label
      });
    }
  };

  private handleRemove = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.log('Chip remove clicked');
      this.chipAction.emit({
        action: 'remove',
        label: this.label
      });
    }
  };

  // ============== Style Helpers ==============
  private getChipClasses(): string {
    const classes = ['spectrum-chip'];
    
    // Add variant class
    classes.push(`spectrum-chip--${this.variant}`);
    
    // Add outline class if needed
    if (this.outline) {
      classes.push('spectrum-chip--outline');
    }
    
    // Add disabled class if needed
    if (this.disabled) {
      classes.push('spectrum-chip--disabled');
    }

    this.log('Generated classes', { classes });
    return classes.join(' ');
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.log('Component will load', {
      variant: this.variant,
      selected: this.selected,
      disabled: this.disabled,
      outline: this.outline,
      ripple: this.ripple
    });
  }

  componentDidLoad() {
    this.log('Component did load');
  }

  // ============== Render Methods ==============
  render() {
    this.log('Rendering component', {
      selected: this.selected,
      isHovered: this.isHovered,
      isActive: this.isActive
    });

    return (
      <Host>
        <div 
          class={this.getChipClasses()}
          role="button"
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {this.ripple && this.ripples.map(ripple => (
            <span
              class="spectrum-chip__ripple"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
              }}
            />
          ))}
          {this.leadingIcon && (
            <span class="spectrum-chip__icon spectrum-chip__icon--leading">
              <span class="material-symbols-outlined">{this.leadingIcon}</span>
            </span>
          )}
          
          <span class="spectrum-chip__label">{this.label}</span>
          
          {this.showTrailingIcon && (
            <span 
              class="spectrum-chip__icon spectrum-chip__icon--trailing"
              onClick={this.handleRemove}
            >
              <span class="material-symbols-outlined">{this.trailingIcon}</span>
            </span>
          )}
        </div>
      </Host>
    );
  }
} 