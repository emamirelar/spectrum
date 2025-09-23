import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Listen } from '@stencil/core';

/**
 * Spectrum Switch Component
 * A toggle switch component with multiple variants and accessibility support.
 * Supports Material Icons and follows spectrum design system.
 */
@Component({
  tag: 'spectrum-switch',
  styleUrl: 'spectrum-switch.scss',
  shadow: true,
})
export class SpectrumSwitch {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;
  @Event() switchChange: EventEmitter<{ action: string; checked: boolean; value?: string }>;

  // Core Properties
  @Prop({ mutable: true }) checked: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() variant: 'primary' | 'positive' | 'caution' | 'destructive' = 'primary';
  @Prop() size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large' = 'base';
  @Prop() value?: string;
  @Prop() name?: string;
  @Prop() label?: string;
  @Prop() showIcons: boolean = true;

  // Accessibility Properties
  @Prop() accessibleLabel?: string;
  @Prop() accessibleDescribedBy?: string;
  @Prop() accessibleLabelledBy?: string;

  // Visual Properties
  @Prop() loading: boolean = false;

  // Internal State
  @State() isPressed: boolean = false;
  @State() isFocused: boolean = false;

  // Component ID for accessibility
  private componentId = `spectrum-switch-${Math.random().toString(36).substr(2, 9)}`;

  // ============== Watchers ==============
  @Watch('checked')
  onCheckedChange(newValue: boolean) {
    this.announceStateChange(newValue);
  }

  @Watch('loading')
  onLoadingChange(newValue: boolean) {
    if (newValue) {
      this.announceToScreenReader('Loading...');
    }
  }

  // ============== Event Handlers ==============
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled || this.loading) return;

    switch (event.key) {
      case 'Enter':
      case ' ': // Space key
        event.preventDefault();
        this.toggle();
        break;
      case 'ArrowLeft':
        if (this.checked) {
          event.preventDefault();
          this.toggle();
        }
        break;
      case 'ArrowRight':
        if (!this.checked) {
          event.preventDefault();
          this.toggle();
        }
        break;
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    this.toggle();
  };

  private handleMouseDown = () => {
    if (!this.disabled && !this.loading) {
      this.isPressed = true;
    }
  };

  private handleMouseUp = () => {
    this.isPressed = false;
  };

  private handleFocus = () => {
    this.isFocused = true;
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.isPressed = false;
  };

  // ============== Methods ==============
  private toggle() {
    if (this.disabled || this.loading) return;

    this.checked = !this.checked;
    this.switchChange.emit({
      action: this.checked ? 'check' : 'uncheck',
      checked: this.checked,
      value: this.value
    });
  }

  private announceStateChange(checked: boolean) {
    const state = checked ? 'checked' : 'unchecked';
    const label = this.accessibleLabel || this.label || 'Switch';
    this.announceToScreenReader(`${label} ${state}`);
  }

  private announceToScreenReader(message: string) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }

  // ============== Helper Methods ==============
  private getMappedSize(): string {
    // Map friendly aliases to internal CSS class names
    switch (this.size) {
      case 'small':
        return 'sm';
      case 'large':
        return 'lg';
      case 'medium':
        return 'base';
      default:
        return this.size;
    }
  }

  private getAriaLabel(): string {
    return this.accessibleLabel || this.label || 'Toggle switch';
  }

  // ============== Render Methods ==============
  render() {
    const switchClasses: { [key: string]: boolean } = {
      'spectrum-switch': true,
      [`spectrum-switch--${this.variant}`]: true,
      [`spectrum-switch--${this.getMappedSize()}`]: true,
      'spectrum-switch--checked': this.checked,
      'spectrum-switch--disabled': this.disabled,
      'spectrum-switch--loading': this.loading,
      'spectrum-switch--pressed': this.isPressed,
      'spectrum-switch--focused': this.isFocused,
    };

    return (
      <Host>
        <div class="spectrum-switch-wrapper">
          {this.label && (
            <label 
              htmlFor={this.componentId}
              class="spectrum-switch__label"
            >
              {this.label}
            </label>
          )}
          <button
            id={this.componentId}
            class={switchClasses}
            role="switch"
            type="button"
            tabindex={this.disabled ? '-1' : '0'}
            aria-checked={this.checked.toString()}
            aria-label={this.getAriaLabel()}
            aria-describedby={this.accessibleDescribedBy}
            aria-labelledby={this.accessibleLabelledBy}
            aria-disabled={this.disabled ? 'true' : undefined}
            aria-busy={this.loading ? 'true' : undefined}
            disabled={this.disabled}
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <span class="spectrum-switch__track">
              <span class="spectrum-switch__thumb">
                {this.loading ? (
                  <span class="spectrum-switch__loading" aria-hidden="true">
                    <span class="material-symbols-outlined">refresh</span>
                  </span>
                ) : this.showIcons ? (
                  <span class="spectrum-switch__icon" aria-hidden="true">
                    <span class="material-symbols-outlined">
                      {this.checked ? 'check' : 'close'}
                    </span>
                  </span>
                ) : null}
              </span>
            </span>
          </button>
          {this.name && (
            <input
              type="hidden"
              name={this.name}
              value={this.checked ? (this.value || 'on') : ''}
            />
          )}
        </div>
      </Host>
    );
  }
}
