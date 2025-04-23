import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'spectrum-chip',
  styleUrl: 'spectrum-chip.scss',
  shadow: true,
})
export class SpectrumChip {
  /**
   * The variant of the chip
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  /**
   * Whether the chip is selected
   */
  @Prop() selected: boolean = false;

  /**
   * Whether the chip is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * The label text of the chip
   */
  @Prop() label: string = '';

  /**
   * Optional leading icon
   */
  @Prop() leadingIcon: string = '';

  /**
   * Optional trailing icon (usually for removal)
   */
  @Prop() trailingIcon: string = 'close';

  /**
   * Whether to show the trailing icon
   */
  @Prop() showTrailingIcon: boolean = false;

  /**
   * Whether the chip is outlined
   */
  @Prop() outline: boolean = false;

  /**
   * Emitted when the chip is selected/deselected
   */
  @Event() chipSelect: EventEmitter<boolean>;

  /**
   * Emitted when the chip is removed (clicked on trailing icon)
   */
  @Event() chipRemove: EventEmitter<void>;

  private handleClick = () => {
    if (!this.disabled) {
      this.chipSelect.emit(!this.selected);
    }
  };

  private handleRemove = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.chipRemove.emit();
    }
  };

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

    return classes.join(' ');
  }

  render() {
    return (
      <Host>
        <div 
          class={this.getChipClasses()}
          role="button"
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
        >
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