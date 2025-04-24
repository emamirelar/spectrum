import { Component, Host, h, Fragment, Prop, State, Watch, Element } from '@stencil/core';

/**
 * Spectrum Button Component
 * A versatile button component with multiple variants, sizes, and states.
 * Supports icons, text, and various interactive states.
 */
@Component({
  tag: 'spectrum-button',
  styleUrl: 'spectrum-button.scss',
  shadow: true,
})
export class SpectrumButton {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Button Variants and Appearance
  @Prop() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' = 'primary';
  @Prop() size: 'sm' | 'base' | 'lg' = 'base';
  @Prop() outline: boolean = false;
  @Prop() iconOnly: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() ripple: boolean = false;

  // Button Content
  @Prop() showButtonText: boolean = true;
  @Prop() buttonText: string = '';
  @Prop() showLeftIcon: boolean = false;
  @Prop() leftIcon: string = '';
  @Prop() showRightIcon: boolean = false;
  @Prop() rightIcon: string = '';

  // Button State
  @Prop() state: 'default' | 'hover' | 'active' | 'disabled' = 'default';
  @State() currentState: string = 'default';
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;
  @State() ripples: { x: number; y: number; id: number }[] = [];
  private rippleId: number = 0;

  // ============== Debug Helpers ==============
  private log(message: string, data?: any) {
    if (this.debug) {
      console.log(`[SpectrumButton] ${message}`, data ? data : '');
    }
  }

  // ============== State Management ==============
  @Watch('state')
  handleStateChange(newValue: string) {
    this.log('State changed', { from: this.currentState, to: newValue });
    this.currentState = newValue;
  }

  // ============== Event Handlers ==============
  private handleMouseEnter = () => {
    if (this.currentState !== 'disabled') {
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
    if (this.currentState !== 'disabled') {
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
      const button = this.el.shadowRoot?.querySelector('button');
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = this.rippleId++;
      
      this.ripples = [...this.ripples, { x, y, id }];
      
      // Remove ripple after animation completes
      setTimeout(() => {
        this.ripples = this.ripples.filter(r => r.id !== id);
      }, 600);
    }
  };

  // ============== Style Helpers ==============
  private getButtonStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Apply cursor style for disabled state
    if (this.currentState === 'disabled') {
      styles.cursor = 'not-allowed';
    }

    this.log('Generated styles', { styles });
    return styles;
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.log('Component will load', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      iconOnly: this.iconOnly
    });
  }

  componentDidLoad() {
    this.log('Component did load');
  }

  // ============== Render Methods ==============
  render() {
    this.log('Rendering component', {
      currentState: this.currentState,
      isHovered: this.isHovered,
      isActive: this.isActive
    });

    const buttonClasses: { [key: string]: boolean } = {
      'spectrum-button': true,
      [`spectrum-button--${this.variant}`]: true,
      [`spectrum-button--${this.size}`]: true,
      'spectrum-button--disabled': this.disabled,
      'spectrum-button--outline': this.outline,
      'spectrum-button--icon-only': this.iconOnly,
      'spectrum-button--hover': this.isHovered,
      'spectrum-button--active': this.isActive,
    };

    return (
      <Host>
        <button
          class={buttonClasses}
          style={this.getButtonStyles()}
          disabled={this.disabled}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onClick={this.handleClick}
        >
          {this.ripple && this.ripples.map(ripple => (
            <span
              class="spectrum-button__ripple"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
              }}
            />
          ))}
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
          {this.iconOnly && this.showLeftIcon && (
            <span class="spectrum-button__icon">
              <span class="material-symbols-outlined">{this.leftIcon}</span>
            </span>
          )}
        </button>
      </Host>
    );
  }
}
