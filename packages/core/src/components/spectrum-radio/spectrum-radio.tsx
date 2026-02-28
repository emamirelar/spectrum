import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Listen } from '@stencil/core';

@Component({
  tag: 'spectrum-radio',
  styleUrl: 'spectrum-radio.scss',
  shadow: true,
})
export class SpectrumRadio {
  @Element() el: HTMLElement;
  @Event() radioChange: EventEmitter<{ action: string; checked: boolean; value?: string; name?: string }>;

  @Prop({ mutable: true }) checked: boolean = false;
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

  private componentId = `spectrum-radio-${Math.random().toString(36).substr(2, 9)}`;

  @Watch('checked')
  onCheckedChange() {
    this.announceStateChange();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.select();
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) { event.preventDefault(); return; }
    this.select();
  };

  private handleMouseDown = () => { if (!this.disabled) this.isPressed = true; };
  private handleMouseUp = () => { this.isPressed = false; };
  private handleFocus = () => { this.isFocused = true; };
  private handleBlur = () => { this.isFocused = false; this.isPressed = false; };

  private select() {
    if (this.disabled || this.checked) return;
    this.checked = true;
    this.radioChange.emit({
      action: 'select',
      checked: true,
      value: this.value,
      name: this.name,
    });
  }

  private announceStateChange() {
    const state = this.checked ? 'selected' : 'unselected';
    const label = this.accessibleLabel || this.label || 'Radio';
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

  render() {
    const classes: { [key: string]: boolean } = {
      'spectrum-radio': true,
      [`spectrum-radio--${this.variant}`]: true,
      [`spectrum-radio--${this.getMappedSize()}`]: true,
      'spectrum-radio--checked': this.checked,
      'spectrum-radio--disabled': this.disabled,
      'spectrum-radio--pressed': this.isPressed,
      'spectrum-radio--focused': this.isFocused,
    };

    return (
      <Host>
        <div class="spectrum-radio-wrapper">
          <button
            id={this.componentId}
            class={classes}
            role="radio"
            type="button"
            tabindex={this.disabled ? '-1' : '0'}
            aria-checked={this.checked.toString()}
            aria-label={this.accessibleLabel || this.label || 'Radio option'}
            aria-describedby={this.accessibleDescribedBy}
            aria-disabled={this.disabled ? 'true' : undefined}
            disabled={this.disabled}
            onClick={this.handleClick}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <span class="spectrum-radio__circle">
              {this.checked && <span class="spectrum-radio__dot" />}
            </span>
          </button>
          {this.label && (
            <label htmlFor={this.componentId} class="spectrum-radio__label">
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
