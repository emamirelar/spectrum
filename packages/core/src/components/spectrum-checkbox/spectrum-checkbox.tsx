import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'spectrum-checkbox',
  styleUrl: 'spectrum-checkbox.scss',
  shadow: true,
})
export class SpectrumCheckbox {
  @Element() el: HTMLElement;
  @Event() checkboxChange: EventEmitter<{ action: string; checked: boolean; indeterminate: boolean; value?: string }>;

  @Prop({ mutable: true }) checked: boolean = false;
  @Prop({ mutable: true }) indeterminate: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() variant: 'primary' | 'positive' | 'caution' | 'destructive' = 'primary';
  @Prop() size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large' = 'base';
  @Prop() value?: string;
  @Prop() name?: string;
  @Prop() label?: string;
  @Prop() accessibleLabel?: string;
  @Prop() accessibleDescribedBy?: string;

  @State() isPressed: boolean = false;
  @State() isFocused: boolean = false;

  private componentId = `spectrum-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  @Watch('checked')
  onCheckedChange(newValue: boolean) {
    if (newValue) this.indeterminate = false;
    this.announceStateChange();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.toggle();
  };

  private handleMouseDown = () => { if (!this.disabled) this.isPressed = true; };
  private handleMouseUp = () => { this.isPressed = false; };
  private handleFocus = () => { this.isFocused = true; };
  private handleBlur = () => { this.isFocused = false; this.isPressed = false; };

  private toggle() {
    if (this.disabled) return;
    this.indeterminate = false;
    this.checked = !this.checked;
    this.checkboxChange.emit({
      action: this.checked ? 'check' : 'uncheck',
      checked: this.checked,
      indeterminate: false,
      value: this.value,
    });
  }

  private announceStateChange() {
    const state = this.indeterminate ? 'mixed' : this.checked ? 'checked' : 'unchecked';
    const label = this.accessibleLabel || this.label || 'Checkbox';
    const el = document.createElement('div');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    el.textContent = `${label} ${state}`;
    document.body.appendChild(el);
    setTimeout(() => document.body.removeChild(el), 1000);
  }

  private getMappedSize(): string {
    switch (this.size) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      case 'medium': return 'base';
      default: return this.size;
    }
  }

  private getIcon(): string {
    if (this.indeterminate) return 'remove';
    return this.checked ? 'check' : '';
  }

  render() {
    const classes: { [key: string]: boolean } = {
      'spectrum-checkbox': true,
      [`spectrum-checkbox--${this.variant}`]: true,
      [`spectrum-checkbox--${this.getMappedSize()}`]: true,
      'spectrum-checkbox--checked': this.checked,
      'spectrum-checkbox--indeterminate': this.indeterminate,
      'spectrum-checkbox--disabled': this.disabled,
      'spectrum-checkbox--pressed': this.isPressed,
      'spectrum-checkbox--focused': this.isFocused,
    };

    return (
      <Host>
        <div class="spectrum-checkbox-wrapper">
          <button
            id={this.componentId}
            class={classes}
            role="checkbox"
            type="button"
            tabindex={this.disabled ? '-1' : '0'}
            aria-checked={this.indeterminate ? 'mixed' : this.checked.toString()}
            aria-label={this.accessibleLabel || this.label || 'Checkbox'}
            aria-describedby={this.accessibleDescribedBy}
            aria-disabled={this.disabled ? 'true' : undefined}
            disabled={this.disabled}
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <span class="spectrum-checkbox__box">
              {(this.checked || this.indeterminate) && (
                <span class="spectrum-checkbox__icon" aria-hidden="true">
                  <span class="material-symbols-outlined">{this.getIcon()}</span>
                </span>
              )}
            </span>
          </button>
          {this.label && (
            <label htmlFor={this.componentId} class="spectrum-checkbox__label">
              {this.label}
            </label>
          )}
          {this.name && (
            <input type="hidden" name={this.name} value={this.checked ? (this.value || 'on') : ''} />
          )}
        </div>
      </Host>
    );
  }
}
