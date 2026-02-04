import { Component, Host, h, Prop, Event, EventEmitter, State, Element } from '@stencil/core';

/**
 * Text Input Component
 * 
 * A versatile text input component supporting various input types,
 * validation states, and Spectrum theming.
 * 
 * @slot prefix - Content to display before the input
 * @slot suffix - Content to display after the input
 */
@Component({
  tag: 'spectrum-text-input',
  styleUrl: 'spectrum-text-input.scss',
  shadow: false,
})
export class SpectrumTextInput {
  @Element() el: HTMLElement;

  /**
   * Input type
   */
  @Prop() type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' = 'text';

  /**
   * Input value
   */
  @Prop({ mutable: true }) value: string = '';

  /**
   * Input name attribute
   */
  @Prop() name: string;

  /**
   * Placeholder text
   */
  @Prop() placeholder: string = '';

  /**
   * Label text
   */
  @Prop() label: string;

  /**
   * Helper text shown below the input
   */
  @Prop() helperText: string;

  /**
   * Error message (shows error state when set)
   */
  @Prop() errorMessage: string;

  /**
   * Whether the input is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the input is readonly
   */
  @Prop() readonly: boolean = false;

  /**
   * Whether the input is required
   */
  @Prop() required: boolean = false;

  /**
   * Size variant
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Minimum value (for number/date types)
   */
  @Prop() min: number | string;

  /**
   * Maximum value (for number/date types)
   */
  @Prop() max: number | string;

  /**
   * Step value (for number type)
   */
  @Prop() step: number | string;

  /**
   * Minimum length
   */
  @Prop() minlength: number;

  /**
   * Maximum length
   */
  @Prop() maxlength: number;

  /**
   * Pattern for validation
   */
  @Prop() pattern: string;

  /**
   * Autocomplete attribute
   */
  @Prop() autocomplete: string;

  /**
   * Leading icon (Material Symbols name)
   */
  @Prop() leadingIcon: string;

  /**
   * Trailing icon (Material Symbols name)
   */
  @Prop() trailingIcon: string;

  /**
   * Whether to show clear button
   */
  @Prop() clearable: boolean = false;

  /**
   * Unique ID for the input
   */
  @Prop() inputId: string;

  /**
   * Emitted when input value changes
   */
  @Event() inputChange: EventEmitter<string>;

  /**
   * Emitted on input event (every keystroke)
   */
  @Event() inputInput: EventEmitter<string>;

  /**
   * Emitted when input receives focus
   */
  @Event() inputFocus: EventEmitter<void>;

  /**
   * Emitted when input loses focus
   */
  @Event() inputBlur: EventEmitter<void>;

  /**
   * Emitted when clear button is clicked
   */
  @Event() inputClear: EventEmitter<void>;

  /**
   * Emitted when trailing icon is clicked
   */
  @Event() trailingIconClick: EventEmitter<void>;

  @State() isFocused: boolean = false;

  private inputElement: HTMLInputElement;
  private generatedId: string = `spectrum-input-${Math.random().toString(36).substr(2, 9)}`;

  private get uniqueId(): string {
    return this.inputId || this.generatedId;
  }

  private get hasError(): boolean {
    return !!this.errorMessage;
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.inputInput.emit(this.value);
  };

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.inputChange.emit(this.value);
  };

  private handleFocus = () => {
    this.isFocused = true;
    this.inputFocus.emit();
  };

  private handleBlur = () => {
    this.isFocused = false;
    this.inputBlur.emit();
  };

  private handleClear = () => {
    this.value = '';
    this.inputChange.emit('');
    this.inputClear.emit();
    this.inputElement?.focus();
  };

  private handleTrailingIconClick = () => {
    this.trailingIconClick.emit();
  };

  render() {
    const showClearButton = this.clearable && this.value && !this.disabled && !this.readonly;

    return (
      <Host
        class={{
          'spectrum-text-input': true,
          [`spectrum-text-input--${this.size}`]: true,
          'spectrum-text-input--disabled': this.disabled,
          'spectrum-text-input--readonly': this.readonly,
          'spectrum-text-input--error': this.hasError,
          'spectrum-text-input--focused': this.isFocused,
          'spectrum-text-input--has-leading-icon': !!this.leadingIcon,
          'spectrum-text-input--has-trailing-icon': !!this.trailingIcon || showClearButton,
        }}
      >
        {this.label && (
          <label class="spectrum-text-input__label" htmlFor={this.uniqueId}>
            {this.label}
            {this.required && <span class="spectrum-text-input__required">*</span>}
          </label>
        )}

        <div class="spectrum-text-input__wrapper">
          <slot name="prefix" />

          {this.leadingIcon && (
            <span class="spectrum-text-input__icon spectrum-text-input__icon--leading material-symbols-outlined">
              {this.leadingIcon}
            </span>
          )}

          <input
            ref={el => (this.inputElement = el)}
            id={this.uniqueId}
            class="spectrum-text-input__input"
            type={this.type}
            name={this.name}
            value={this.value}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readOnly={this.readonly}
            required={this.required}
            min={this.min}
            max={this.max}
            step={this.step}
            minLength={this.minlength}
            maxLength={this.maxlength}
            pattern={this.pattern}
            autoComplete={this.autocomplete}
            aria-invalid={this.hasError ? 'true' : undefined}
            aria-describedby={
              this.hasError ? `${this.uniqueId}-error` : 
              this.helperText ? `${this.uniqueId}-helper` : undefined
            }
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          {showClearButton && (
            <button
              type="button"
              class="spectrum-text-input__clear"
              onClick={this.handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <span class="material-symbols-outlined">close</span>
            </button>
          )}

          {this.trailingIcon && !showClearButton && (
            <span
              class="spectrum-text-input__icon spectrum-text-input__icon--trailing material-symbols-outlined"
              onClick={this.handleTrailingIconClick}
              role={this.trailingIconClick ? 'button' : undefined}
            >
              {this.trailingIcon}
            </span>
          )}

          <slot name="suffix" />
        </div>

        {this.hasError && (
          <div id={`${this.uniqueId}-error`} class="spectrum-text-input__error" role="alert">
            <span class="material-symbols-outlined">error</span>
            {this.errorMessage}
          </div>
        )}

        {!this.hasError && this.helperText && (
          <div id={`${this.uniqueId}-helper`} class="spectrum-text-input__helper">
            {this.helperText}
          </div>
        )}
      </Host>
    );
  }
}


