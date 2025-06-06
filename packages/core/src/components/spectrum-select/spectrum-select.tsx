import { Component, Host, h, Prop, State, Watch, Element, Event, EventEmitter, Listen } from '@stencil/core';

export interface SpectrumSelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
}

/**
 * Spectrum Select Component
 * A styled wrapper around HTML select element with support for icons, text, and custom options.
 * Based on the Spectrum design system and inspired by spectrum-button component patterns.
 */
@Component({
  tag: 'spectrum-select',
  styleUrl: 'spectrum-select.scss',
  shadow: true,
})
export class SpectrumSelect {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;
  @Event() selectChange: EventEmitter<{ 
    value: string; 
    label: string; 
    option: SpectrumSelectOption | null;
    selectedValues?: string[];
    selectedOptions?: SpectrumSelectOption[];
  }>;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Select Variants and Appearance
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Prop() size: 'sm' | 'base' | 'lg' = 'base';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() invalid: boolean = false;
  @Prop() action: string = '';
  @Prop() customStyle: { [key: string]: string } = {};

  // Select Content
  @Prop() placeholder: string = 'Select an option';
  @Prop() selectedValue: string = '';
  @Prop() selectedValues: string[] = [];
  @Prop() multiple: boolean = false;
  @Prop() selectionsLabel: string = 'selections';
  @Prop() options: SpectrumSelectOption[] = [];
  @Prop() showIcon: boolean = true;
  @Prop() showDropdownIcon: boolean = true;
  @Prop() dropdownIcon: string = 'expand_more';

  // Select State
  @Prop() state: 'default' | 'hover' | 'focus' | 'disabled' = 'default';
  @State() currentState: string = 'default';
  @State() isOpen: boolean = false;
  @State() isHovered: boolean = false;
  @State() isFocused: boolean = false;
  @State() isActive: boolean = false;
  @State() selectedOption: SpectrumSelectOption | null = null;
  @State() selectedOptions: SpectrumSelectOption[] = [];
  @State() focusedOptionIndex: number = -1;

  private selectRef!: HTMLSelectElement;

  @Watch('selectedValue')
  handleSelectedValueChange(newValue: string) {
    if (!this.multiple) {
      this.updateSelectedOption(newValue);
    }
  }

  @Watch('selectedValues')
  handleSelectedValuesChange(newValues: string[]) {
    if (this.multiple) {
      this.updateSelectedOptions(newValues);
    }
  }

  @Watch('options')
  handleOptionsChange() {
    this.updateSelectedOption(this.selectedValue);
  }

  @Watch('disabled')
  handleDisabledChange(newValue: boolean) {
    if (newValue) {
      this.currentState = 'disabled';
      this.isOpen = false;
    } else {
      this.currentState = 'default';
    }
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      this.focusedOptionIndex = this.options.findIndex(option => option.value === this.selectedValue);
      if (this.focusedOptionIndex === -1) {
        this.focusedOptionIndex = 0;
      }
    } else {
      this.focusedOptionIndex = -1;
    }
  }

  // ============== Event Listeners ==============
  @Listen('click', { target: 'document' })
  handleDocumentClick(event: Event) {
    if (!this.el.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!this.isOpen) {
          event.preventDefault();
          this.toggleDropdown();
        } else if (this.focusedOptionIndex >= 0) {
          event.preventDefault();
          this.selectOption(this.options[this.focusedOptionIndex]);
        }
        break;
      
      case 'Escape':
        if (this.isOpen) {
          event.preventDefault();
          this.isOpen = false;
        }
        break;
      
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else {
          this.focusedOptionIndex = Math.min(
            this.focusedOptionIndex + 1,
            this.options.length - 1
          );
        }
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else {
          this.focusedOptionIndex = Math.max(this.focusedOptionIndex - 1, 0);
        }
        break;
      
      case 'Home':
        if (this.isOpen) {
          event.preventDefault();
          this.focusedOptionIndex = 0;
        }
        break;
      
      case 'End':
        if (this.isOpen) {
          event.preventDefault();
          this.focusedOptionIndex = this.options.length - 1;
        }
        break;
    }
  }

  // ============== Debug Helpers ==============
  private log(message: string, data?: any) {
    if (this.debug) {
      console.log(`[SpectrumSelect] ${message}`, data);
    }
  }

  // ============== State Management ==============
  @Watch('state')
  handleStateChange(newValue: string) {
    this.log('State changed', { from: this.currentState, to: newValue });
    this.currentState = newValue;
  }

  private updateSelectedOption(value: string) {
    this.selectedOption = this.options.find(option => option.value === value) || null;
    this.log('Selected option updated', this.selectedOption);
  }

  private updateSelectedOptions(values: string[]) {
    this.selectedOptions = this.options.filter(option => values.includes(option.value));
    this.log('Selected options updated', this.selectedOptions);
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

  private handleFocus = () => {
    if (this.currentState !== 'disabled') {
      this.log('Select focused');
      this.isFocused = true;
    }
  };

  private handleBlur = () => {
    this.log('Select blurred');
    this.isFocused = false;
  };

  private handleNativeChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value;
    this.updateSelection(selectedValue);
  };

  private toggleDropdown = () => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    this.log('Dropdown toggled', { isOpen: this.isOpen });
  };

  private selectOption = (option: SpectrumSelectOption) => {
    if (option.disabled) return;
    
    if (this.multiple) {
      this.toggleMultipleSelection(option.value);
    } else {
      this.updateSelection(option.value);
      this.isOpen = false;
    }
  };

  private toggleMultipleSelection = (value: string) => {
    const currentValues = [...this.selectedValues];
    const valueIndex = currentValues.indexOf(value);
    
    if (valueIndex > -1) {
      // Remove from selection
      currentValues.splice(valueIndex, 1);
    } else {
      // Add to selection
      currentValues.push(value);
    }
    
    this.selectedValues = currentValues;
    this.updateSelectedOptions(currentValues);
    
    // Update the native select values for form integration
    if (this.selectRef) {
      Array.from(this.selectRef.options).forEach(option => {
        option.selected = currentValues.includes(option.value);
      });
    }
    
    this.selectChange.emit({
      value: currentValues.join(','),
      label: this.getMultipleDisplayText(),
      option: null,
      selectedValues: currentValues,
      selectedOptions: this.selectedOptions
    });

    this.log('Multiple selection changed', {
      values: currentValues,
      options: this.selectedOptions
    });
  };

  private updateSelection = (value: string) => {
    const selectedOption = this.options.find(option => option.value === value);

    if (selectedOption) {
      this.selectedValue = value;
      this.selectedOption = selectedOption;
      
      // Update the native select value
      if (this.selectRef) {
        this.selectRef.value = value;
      }
      
      this.selectChange.emit({
        value: value,
        label: selectedOption.label,
        option: selectedOption,
        selectedValues: [value],
        selectedOptions: [selectedOption]
      });

      this.log('Selection changed', {
        value: value,
        option: selectedOption
      });
    }
  };

  private handleOptionMouseEnter = (index: number) => {
    this.focusedOptionIndex = index;
  };

  // ============== Style Helpers ==============
  private getSelectStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Apply cursor style for disabled state
    if (this.currentState === 'disabled') {
      styles.cursor = 'not-allowed';
    }

    // Merge custom styles with default styles
    return { ...styles, ...this.customStyle };
  }

  private getDisplayText(): string {
    if (this.multiple) {
      if (this.selectedOptions.length === 1) {
        // Show the actual item name when only one is selected, like single select
        return this.selectedOptions[0].label;
      } else if (this.selectedOptions.length > 1) {
        // Show count + label when multiple items are selected
        return `${this.selectionsLabel}`;
      }
      return this.placeholder;
    } else {
      if (this.selectedOption) {
        return this.selectedOption.label;
      }
      return this.placeholder;
    }
  }

  private getDisplayIcon(): string | null {
    if (this.multiple) {
      if (this.selectedOptions.length === 1) {
        // Show the icon when only one is selected, like single select
        return this.selectedOptions[0].icon || null;
      }
      // For multiple selections, don't show icon - count will replace it
      return null;
    } else {
      if (this.selectedOption && this.selectedOption.icon) {
        return this.selectedOption.icon;
      }
      return null;
    }
  }

  private getDisplayCount(): string | null {
    if (this.multiple && this.selectedOptions.length > 1) {
      return this.selectedOptions.length.toString();
    }
    return null;
  }

  private getMultipleDisplayText(): string {
    if (this.selectedOptions.length > 0) {
      return this.selectedOptions.map(option => option.label).join(', ');
    }
    return this.placeholder;
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.log('Component will load', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      multiple: this.multiple,
      options: this.options
    });
    
    // Initialize selected option(s)
    if (this.multiple) {
      this.updateSelectedOptions(this.selectedValues);
    } else {
      this.updateSelectedOption(this.selectedValue);
    }
  }

  componentDidLoad() {
    this.log('Component did load');
  }

  // ============== Render Methods ==============
  render() {
    this.log('Rendering component', {
      currentState: this.currentState,
      isHovered: this.isHovered,
      isFocused: this.isFocused,
      isOpen: this.isOpen,
      selectedOption: this.selectedOption
    });

    const selectClasses: { [key: string]: boolean } = {
      'spectrum-select': true,
      [`spectrum-select--${this.variant}`]: true,
      [`spectrum-select--${this.size}`]: true,
      'spectrum-select--disabled': this.disabled,
      'spectrum-select--invalid': this.invalid,
      'spectrum-select--hover': this.isHovered,
      'spectrum-select--active': this.isActive,
      'spectrum-select--focus': this.isFocused,
      'spectrum-select--open': this.isOpen,
      'spectrum-select--has-value': !!this.selectedOption,
    };

    const displayIcon = this.getDisplayIcon();
    const displayText = this.getDisplayText();
    const displayCount = this.getDisplayCount();

    return (
      <Host>
        <div
          class={selectClasses}
          style={this.getSelectStyles()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {/* Hidden native select for accessibility and form integration */}
          <select
            ref={el => this.selectRef = el as HTMLSelectElement}
            class="spectrum-select__native"
            disabled={this.disabled}
            required={this.required}
            multiple={this.multiple}
            tabindex="-1"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleNativeChange}
          >
            {!this.multiple && !this.selectedValue && (
              <option value="" disabled>
                {this.placeholder}
              </option>
            )}
            {this.options.map(option => (
              <option
                value={option.value}
                disabled={option.disabled}
                selected={this.multiple ? 
                  this.selectedValues.includes(option.value) : 
                  (option.selected || option.value === this.selectedValue)
                }
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom styled trigger */}
          <div 
            class="spectrum-select__trigger"
            tabindex={this.disabled ? -1 : 0}
            role="combobox"
            aria-expanded={this.isOpen.toString()}
            aria-haspopup="listbox"
            aria-label={this.placeholder}
            onClick={this.toggleDropdown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <div class="spectrum-select__content">
              {/* Show count for multiple mode, icon for single mode */}
              {displayCount ? (
                <span class="spectrum-select__count">
                  {displayCount}
                </span>
              ) : (
                this.showIcon && displayIcon && (
                  <span class="spectrum-select__icon spectrum-select__icon--leading">
                    <span class="material-symbols-outlined">{displayIcon}</span>
                  </span>
                )
              )}
              <span class={`spectrum-select__text ${
                (this.multiple ? this.selectedOptions.length === 0 : !this.selectedOption) ? 
                'spectrum-select__text--placeholder' : ''
              }`}>
                {displayText}
              </span>
            </div>
            {this.showDropdownIcon && (
              <span class="spectrum-select__icon spectrum-select__icon--dropdown">
                <span class="material-symbols-outlined">{this.dropdownIcon}</span>
              </span>
            )}
          </div>

          {/* Custom dropdown with icons */}
          {this.isOpen && (
            <div 
              class="spectrum-select__dropdown"
              role="listbox"
              aria-label={this.placeholder}
              aria-multiselectable={this.multiple.toString()}
            >
              {this.options.map((option, index) => (
                <div
                  class={{
                    'spectrum-select__option': true,
                    'spectrum-select__option--disabled': option.disabled,
                    'spectrum-select__option--selected': this.multiple ? 
                      this.selectedValues.includes(option.value) : 
                      option.value === this.selectedValue,
                    'spectrum-select__option--focused': index === this.focusedOptionIndex,
                  }}
                  role="option"
                  aria-selected={this.multiple ? 
                    this.selectedValues.includes(option.value).toString() : 
                    (option.value === this.selectedValue).toString()
                  }
                  aria-disabled={option.disabled ? 'true' : 'false'}
                  onClick={() => this.selectOption(option)}
                  onMouseEnter={() => this.handleOptionMouseEnter(index)}
                >
                  {option.icon && (
                    <span class="spectrum-select__option-icon">
                      <span class="material-symbols-outlined">{option.icon}</span>
                    </span>
                  )}
                  <span class="spectrum-select__option-text">{option.label}</span>
                  {/* Show checkbox for multiple mode, checkmark for single mode */}
                  {this.multiple ? (
                    <span class="spectrum-select__option-checkbox">
                      <span class="material-symbols-outlined">
                        {this.selectedValues.includes(option.value) ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </span>
                  ) : (
                    option.value === this.selectedValue && (
                      <span class="spectrum-select__option-check">
                        <span class="material-symbols-outlined">check</span>
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
