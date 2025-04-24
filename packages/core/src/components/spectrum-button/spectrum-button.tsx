import { Component, Host, h, Fragment, Prop, State, Watch, Element } from '@stencil/core';

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
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;

  @Watch('state')
  handleStateChange(newValue: string) {
    this.currentState = newValue;
  }

  private handleMouseEnter = () => {
    if (this.currentState !== 'disabled') {
      this.isHovered = true;
    }
  };

  private handleMouseLeave = () => {
    this.isHovered = false;
    this.isActive = false;
  };

  private handleMouseDown = () => {
    if (this.currentState !== 'disabled') {
      this.isActive = true;
    }
  };

  private handleMouseUp = () => {
    this.isActive = false;
  };

  private getButtonClasses(): string {
    const classes = ['spectrum-button'];
    
    // Add variant class
    classes.push(`spectrum-button--${this.variant}`);
    
    // Add size class
    if (this.size) {
      classes.push(`spectrum-button--${this.size}`);
    }
    
    // Add state class
    if (this.isActive) {
      classes.push('spectrum-button--active');
    } else if (this.isHovered) {
      classes.push('spectrum-button--hover');
    }
    if (this.currentState === 'disabled') {
      classes.push('spectrum-button--disabled');
    }
    
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
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {/* Show icon in icon-only mode */}
          {this.iconOnly && (
            <span class="spectrum-button__icon">
              <span class="material-symbols-outlined">{this.leftIcon}</span>
            </span>
          )}
          
          {/* Show left icon, text, and right icon in regular mode */}
          {!this.iconOnly && (
            <Fragment>
              {this.showLeftIcon && (
                <span class="spectrum-button__icon">
                  <span class="material-symbols-outlined">{this.leftIcon}</span>
                </span>
              )}
              {this.showButtonText && (
                <span class="spectrum-button__text">{this.buttonText}</span>
              )}
              {this.showRightIcon && (
                <span class="spectrum-button__icon">
                  <span class="material-symbols-outlined">{this.rightIcon}</span>
                </span>
              )}
            </Fragment>
          )}
        </button>
      </Host>
    );
  }
}
