import { Component, Host, h, Prop, State, Watch, Element } from '@stencil/core';

@Component({
  tag: 'spectrum-button',
  styleUrl: 'spectrum-button.scss',
  shadow: true,
})
export class SpectrumButton {
  @Element() el: HTMLElement;

  @Prop() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'fab' = 'primary';
  @Prop() size: 'sm' | 'base' | 'lg' = 'base';
  @Prop() state: 'default' | 'hover' | 'active' | 'disabled' = 'default';
  @Prop() outline: boolean = false;
  @Prop() iconOnly: boolean = false;
  @Prop() showButtonText: boolean = true;
  @Prop() buttonText: string = '';
  @Prop() showLeftIcon: boolean = false;
  @Prop() leftIcon: string = '';
  @Prop() showRightIcon: boolean = false;
  @Prop() rightIcon: string = '';

  @State() currentState: string = 'default';

  @Watch('state')
  handleStateChange(newValue: string) {
    this.currentState = newValue;
  }

  private getButtonClasses(): string {
    const classes = ['spectrum-button'];
    
    // Add variant class
    classes.push(`spectrum-button--${this.variant}`);
    
    // Add size class - ensure size is not empty
    if (this.size) {
      classes.push(`spectrum-button--${this.size}`);
    }
    
    // Add state class
    classes.push(`spectrum-button--${this.currentState}`);
    
    // Add outline class if needed
    if (this.outline) {
      classes.push('spectrum-button--outline');
    }
    
    // Add icon-only class if needed
    if (this.iconOnly) {
      classes.push('spectrum-button--icon-only');
    }

    return classes.join(' ');
  }

  private getButtonStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Apply cursor style for disabled state
    if (this.currentState === 'disabled') {
      styles.cursor = 'not-allowed';
    }

    return styles;
  }

  render() {
    return (
      <Host>
        <button
          class={this.getButtonClasses()}
          style={this.getButtonStyles()}
          disabled={this.currentState === 'disabled'}
        >
          {this.showLeftIcon && !this.iconOnly && (
            <span class="spectrum-button__icon spectrum-button__icon--left">
              <span class="material-symbols-outlined">{this.leftIcon}</span>
            </span>
          )}
          {this.showButtonText && !this.iconOnly && (
            <span class="spectrum-button__text">{this.buttonText}</span>
          )}
          {this.showRightIcon && !this.iconOnly && (
            <span class="spectrum-button__icon spectrum-button__icon--right">
              <span class="material-symbols-outlined">{this.rightIcon}</span>
            </span>
          )}
          {this.iconOnly && (
            <span class="spectrum-button__icon">
              <span class="material-symbols-outlined">{this.leftIcon || this.rightIcon}</span>
            </span>
          )}
        </button>
      </Host>
    );
  }
}
