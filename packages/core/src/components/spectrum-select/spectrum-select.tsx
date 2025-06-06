import { Component, Host, h, Prop, State, Watch, Element, Event, EventEmitter, Listen } from '@stencil/core';

export interface SpectrumSelectOption {
  value: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
  group?: string;
  description?: string;
}

export interface SpectrumSelectGroup {
  label: string;
  options: SpectrumSelectOption[];
}

/**
 * Spectrum Select Component
 * A comprehensive select component with advanced features including search, loading states,
 * enhanced animations, mobile optimization, and accessibility improvements.
 * Based on the Spectrum design system and Material Design 3 patterns.
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
  @Event() searchChange: EventEmitter<string>;
  @Event() dropdownOpen: EventEmitter<void>;
  @Event() dropdownClose: EventEmitter<void>;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Select Variants and Appearance
  @Prop() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
  @Prop() size: 'sm' | 'base' | 'lg' = 'base';
  @Prop() disabled: boolean = false;
  @Prop() required: boolean = false;
  @Prop() invalid: boolean = false;
  @Prop() loading: boolean = false;
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

  // Advanced Features
  @Prop() searchable: boolean = false;
  @Prop() searchTitle: string = '';
  @Prop() searchPlaceholder: string = 'Search options...';
  @Prop() maxHeight: string = '200px';
  @Prop() showSelectAll: boolean = false;
  @Prop() selectAllText: string = 'Select All';
  @Prop() noResultsText: string = 'No results found';
  @Prop() loadingText: string = 'Loading...';
  @Prop() errorText: string = '';
  @Prop() virtualScrolling: boolean = false;
  @Prop() itemHeight: number = 40;

  // Mobile Optimization
  @Prop() touchOptimized: boolean = true;
  @Prop() mobileFullscreen: boolean = false;

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
  @State() searchQuery: string = '';
  @State() filteredOptions: SpectrumSelectOption[] = [];
  @State() isSearching: boolean = false;
  @State() rippleActive: boolean = false;
  @State() isMobile: boolean = false;

  private selectRef!: HTMLSelectElement;
  private searchInputRef!: HTMLInputElement;
  private dropdownRef!: HTMLDivElement;
  private rippleTimeout: number;
  private searchTimeout: number;

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
    this.updateFilteredOptions();
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
      this.focusedOptionIndex = this.filteredOptions.findIndex(option => option.value === this.selectedValue);
      if (this.focusedOptionIndex === -1) {
        this.focusedOptionIndex = 0;
      }
      this.dropdownOpen.emit();
      if (this.searchable) {
        setTimeout(() => {
          this.searchInputRef?.focus();
        }, 100);
      }
    } else {
      this.focusedOptionIndex = -1;
      this.searchQuery = '';
      this.isSearching = false;
      this.updateFilteredOptions();
      
      // Ensure search input is cleared in DOM
      if (this.searchInputRef) {
        this.searchInputRef.value = '';
      }
      
      this.dropdownClose.emit();
    }
  }

  @Watch('searchQuery')
  handleSearchChange(newQuery: string) {
    this.isSearching = newQuery.length > 0;
    this.updateFilteredOptions();
    this.searchChange.emit(newQuery);
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
        } else if (this.focusedOptionIndex >= 0 && !this.isSearching) {
          event.preventDefault();
          this.selectOption(this.filteredOptions[this.focusedOptionIndex]);
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
        } else if (!this.isSearching) {
          this.focusedOptionIndex = Math.min(
            this.focusedOptionIndex + 1,
            this.filteredOptions.length - 1
          );
          this.scrollToFocusedOption();
        }
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (!this.isOpen) {
          this.isOpen = true;
        } else if (!this.isSearching) {
          this.focusedOptionIndex = Math.max(this.focusedOptionIndex - 1, 0);
          this.scrollToFocusedOption();
        }
        break;
      
      case 'Home':
        if (this.isOpen && !this.isSearching) {
          event.preventDefault();
          this.focusedOptionIndex = 0;
          this.scrollToFocusedOption();
        }
        break;
      
      case 'End':
        if (this.isOpen && !this.isSearching) {
          event.preventDefault();
          this.focusedOptionIndex = this.filteredOptions.length - 1;
          this.scrollToFocusedOption();
        }
        break;
    }
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.detectMobile();
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

  private updateFilteredOptions() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.filteredOptions = [...this.options];
    } else {
      const query = this.searchQuery.toLowerCase().trim();
      this.filteredOptions = this.options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query) ||
        (option.description && option.description.toLowerCase().includes(query))
      );
    }
    this.log('Filtered options updated', { query: this.searchQuery, count: this.filteredOptions.length });
  }

  private detectMobile() {
    this.isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
  }

  private scrollToFocusedOption() {
    if (this.dropdownRef && this.focusedOptionIndex >= 0) {
      const focusedElement = this.dropdownRef.querySelector(
        `.spectrum-select__option:nth-child(${this.focusedOptionIndex + 1})`
      ) as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ 
          block: 'nearest', 
          behavior: 'smooth' 
        });
      }
    }
  }

  private selectAll() {
    if (!this.multiple) return;
    
    const allValues = this.filteredOptions
      .filter(option => !option.disabled)
      .map(option => option.value);
    
    this.selectedValues = allValues;
    this.updateSelectedOptions(allValues);
    
    if (this.selectRef) {
      Array.from(this.selectRef.options).forEach(option => {
        option.selected = allValues.includes(option.value);
      });
    }
    
    this.selectChange.emit({
      value: allValues.join(','),
      label: this.getMultipleDisplayText(),
      option: null,
      selectedValues: allValues,
      selectedOptions: this.selectedOptions
    });

    this.log('All options selected', { count: allValues.length });
  }

  private triggerRipple(event: MouseEvent | TouchEvent) {
    if (!this.touchOptimized) return;
    
    this.rippleActive = true;
    
    if (this.rippleTimeout) {
      clearTimeout(this.rippleTimeout);
    }
    
    const triggerElement = this.el.querySelector('.spectrum-select__trigger') as HTMLElement;
    if (triggerElement && event) {
      const rect = triggerElement.getBoundingClientRect();
      let clientX: number, clientY: number;
      
      if (event.type === 'touchstart') {
        const touchEvent = event as TouchEvent;
        clientX = touchEvent.touches[0].clientX;
        clientY = touchEvent.touches[0].clientY;
      } else {
        const mouseEvent = event as MouseEvent;
        clientX = mouseEvent.clientX;
        clientY = mouseEvent.clientY;
      }
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      triggerElement.style.setProperty('--ripple-x', `${x}px`);
      triggerElement.style.setProperty('--ripple-y', `${y}px`);
      
      this.log('Ripple triggered', { x, y, type: event.type });
    }
    
    this.rippleTimeout = window.setTimeout(() => {
      this.rippleActive = false;
    }, 300);
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

  private handleMouseDown = (event: MouseEvent) => {
    if (this.currentState !== 'disabled') {
      this.log('Mouse down');
      this.isActive = true;
      this.triggerRipple(event);
    }
  };

  private handleMouseUp = () => {
    this.log('Mouse up');
    this.isActive = false;
  };

  private handleTouchStart = (event: TouchEvent) => {
    if (this.currentState !== 'disabled' && this.touchOptimized) {
      this.isActive = true;
      this.triggerRipple(event);
    }
  };

  private handleTouchEnd = () => {
    if (this.touchOptimized) {
      this.isActive = false;
    }
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

  private handleSearchInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    
    this.searchTimeout = window.setTimeout(() => {
      this.searchQuery = input.value;
    }, 150);
  };

  private handleSearchKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        this.isSearching = false;
        if (this.filteredOptions.length > 0) {
          this.focusedOptionIndex = event.key === 'ArrowDown' ? 0 : this.filteredOptions.length - 1;
          this.scrollToFocusedOption();
        }
        break;
      
      case 'Escape':
        this.isOpen = false;
        break;
    }
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
      currentValues.splice(valueIndex, 1);
    } else {
      currentValues.push(value);
    }
    
    this.selectedValues = currentValues;
    this.updateSelectedOptions(currentValues);
    
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

  private handleDropdownMouseLeave = () => {
    this.focusedOptionIndex = -1;
  };

  // ============== Style Helpers ==============
  private getSelectStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    if (this.currentState === 'disabled') {
      styles.cursor = 'not-allowed';
    }

    if (this.isMobile && this.mobileFullscreen && this.isOpen) {
      styles.position = 'fixed';
      styles.top = '0';
      styles.left = '0';
      styles.right = '0';
      styles.bottom = '0';
      styles.zIndex = '9999';
    }

    return { ...styles, ...this.customStyle };
  }

  private getDisplayText(): string {
    if (this.multiple) {
      if (this.selectedOptions.length === 1) {
        return this.selectedOptions[0].label;
      } else if (this.selectedOptions.length > 1) {
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
        return this.selectedOptions[0].icon || null;
      }
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
    
    if (this.multiple) {
      this.updateSelectedOptions(this.selectedValues);
    } else {
      this.updateSelectedOption(this.selectedValue);
    }

    this.updateFilteredOptions();
    
    this.detectMobile();
  }

  componentDidLoad() {
    this.log('Component did load');
  }

  disconnectedCallback() {
    if (this.rippleTimeout) {
      clearTimeout(this.rippleTimeout);
    }
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  // ============== Render Methods ==============
  render() {
    this.log('Rendering component', {
      currentState: this.currentState,
      isHovered: this.isHovered,
      isFocused: this.isFocused,
      isOpen: this.isOpen,
      selectedOption: this.selectedOption,
      filteredOptionsCount: this.filteredOptions.length
    });

    const selectClasses: { [key: string]: boolean } = {
      'spectrum-select': true,
      [`spectrum-select--${this.variant}`]: true,
      [`spectrum-select--${this.size}`]: true,
      'spectrum-select--disabled': this.disabled,
      'spectrum-select--invalid': this.invalid,
      'spectrum-select--loading': this.loading,
      'spectrum-select--hover': this.isHovered,
      'spectrum-select--active': this.isActive,
      'spectrum-select--focus': this.isFocused,
      'spectrum-select--open': this.isOpen,
      'spectrum-select--has-value': !!this.selectedOption,
      'spectrum-select--searchable': this.searchable,
      'spectrum-select--mobile': this.isMobile,
      'spectrum-select--touch-optimized': this.touchOptimized,
      'spectrum-select--ripple-active': this.rippleActive,
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
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
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

          <div 
            class="spectrum-select__trigger"
            tabindex={this.disabled ? -1 : 0}
            role="combobox"
            aria-expanded={this.isOpen.toString()}
            aria-haspopup="listbox"
            aria-label={this.placeholder}
            aria-invalid={this.invalid.toString()}
            aria-required={this.required.toString()}
            onClick={this.toggleDropdown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            {this.rippleActive && (
              <div class="spectrum-select__ripple"></div>
            )}

            <div class="spectrum-select__content">
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
                {this.loading ? this.loadingText : displayText}
              </span>
            </div>

            {this.loading ? (
              <span class="spectrum-select__icon spectrum-select__icon--loading">
                <span class="spectrum-select__spinner"></span>
              </span>
            ) : (
              this.showDropdownIcon && (
                <span class="spectrum-select__icon spectrum-select__icon--dropdown">
                  <span class="material-symbols-outlined">{this.dropdownIcon}</span>
                </span>
              )
            )}
          </div>

          {this.errorText && (
            <div class="spectrum-select__error" role="alert">
              <span class="material-symbols-outlined">error</span>
              <span class="spectrum-select__error-text">{this.errorText}</span>
            </div>
          )}

          {this.isOpen && (
            <div 
              ref={el => this.dropdownRef = el as HTMLDivElement}
              class="spectrum-select__dropdown"
              role="listbox"
              aria-label={this.placeholder}
              aria-multiselectable={this.multiple.toString()}
              onMouseLeave={this.handleDropdownMouseLeave}
              style={{ 
                maxHeight: this.maxHeight,
                ...(this.isMobile && this.mobileFullscreen ? {
                  position: 'fixed',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  maxHeight: '100vh',
                  borderRadius: '0',
                } : {})
              }}
            >
              {this.searchable && (
                <div class="spectrum-select__search">
                  {this.searchTitle && (
                    <div class="spectrum-select__search-title">
                      {this.searchTitle}
                    </div>
                  )}
                  <div class="spectrum-select__search-input-container">
                    <span class="spectrum-select__search-icon">
                      <span class="material-symbols-outlined">search</span>
                    </span>
                    <input
                      ref={el => this.searchInputRef = el as HTMLInputElement}
                      type="text"
                      class="spectrum-select__search-input"
                      placeholder={this.searchPlaceholder}
                      value={this.searchQuery}
                      onInput={this.handleSearchInput}
                      onKeyDown={this.handleSearchKeyDown}
                    />
                  </div>
                </div>
              )}

              <div class="spectrum-select__options-container">
                {this.multiple && this.showSelectAll && this.filteredOptions.length > 1 && (
                  <div
                    class="spectrum-select__option spectrum-select__option--select-all"
                    onClick={() => this.selectAll()}
                  >
                    <span class="spectrum-select__option-icon">
                      <span class="material-symbols-outlined">select_all</span>
                    </span>
                    <span class="spectrum-select__option-text">{this.selectAllText}</span>
                  </div>
                )}

                {this.filteredOptions.length > 0 ? (
                  this.filteredOptions.map((option, index) => (
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
                      <div class="spectrum-select__option-content">
                        <span class="spectrum-select__option-text">{option.label}</span>
                        {option.description && (
                          <span class="spectrum-select__option-description">{option.description}</span>
                        )}
                      </div>
                      {this.multiple ? (
                        <span class="spectrum-select__option-checkbox">
                          <span class="material-symbols-outlined">
                            {this.selectedValues.includes(option.value) ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                        </span>
                      ) : (
                        <span class="spectrum-select__option-checkbox">
                          <span class="material-symbols-outlined">
                            {option.value === this.selectedValue ? 'check_box' : 'check_box_outline_blank'}
                          </span>
                        </span>
                      )}
                    </div>
                  ))
                ) : (
                  <div class="spectrum-select__no-results">
                    <span class="material-symbols-outlined">search_off</span>
                    <span class="spectrum-select__no-results-text">{this.noResultsText}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
