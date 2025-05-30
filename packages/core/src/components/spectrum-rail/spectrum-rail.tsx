import { Component, Event, EventEmitter, Host, h, Prop, Element, State, Watch, Method } from '@stencil/core';

/**
 * Spectrum Rail Component
 * A vertical navigation rail with two states: expanded and contracted
 */
@Component({
  tag: 'spectrum-rail',
  styleUrl: 'spectrum-rail.scss',
  shadow: true,
})
export class SpectrumRail {
  @Element() el!: HTMLElement;

  /** Application name to display in expanded menu */
  @Prop() appName: string = '';
  
  /** Expanded width for the rail (with units like px, rem, etc.) */
  @Prop() expandedWidth: number = 280;
  
  /** More section label (displayed in expanded state) */
  @Prop() moreLabel: string = 'More';

  /** Whether the rail should be initially expanded */
  @Prop() initialExpanded: boolean = false;

  /** Whether to show the add button in the rail */
  @Prop() showAddButton = true;
  
  /** Add button label (displayed in expanded state) */
  @Prop() addLabel: string = 'Add new';
  
  /** Current expanded state of the rail */
  @State() expanded: boolean = false;

  /** Current filter value from search input */
  @State() searchValue: string = '';

  /** Emits when the rail changes expanded state */
  @Event({
    eventName: 'expandedChange',
    composed: true,
    cancelable: true,
    bubbles: true
  }) expandedChange: EventEmitter<boolean>;

  /** Emits when the search value changes */
  @Event({
    eventName: 'searchChange',
    composed: true,
    cancelable: true,
    bubbles: true
  }) searchChange: EventEmitter<{ value: string }>;

  /** Emits when a rail action is triggered */
  @Event({
    eventName: 'railAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) railAction: EventEmitter<{ action: string; id: string }>;

  /** Emits when the add button is clicked */
  @Event({
    eventName: 'addAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) addAction: EventEmitter<void>;

  private searchInputRef?: HTMLElement;

  /** Handle menu button click - toggle expanded state */
  private handleMenuClick() {
    this.toggleExpanded();
    this.railAction.emit({
      action: 'menu',
      id: ''
    });
  }

  /** Toggle the expanded state */
  private toggleExpanded() {
    this.expanded = !this.expanded;
    this.expandedChange.emit(this.expanded);
    this.notifySlottedComponents(this.expanded);
  }

  /** Handle search button click */
  private handleSearchClick() {
    if (!this.expanded) {
      this.expanded = true;
      this.expandedChange.emit(true);
      this.notifySlottedComponents(true);
      
      // Focus the search input after a small delay to ensure it's rendered
      setTimeout(() => {
        if (this.searchInputRef && typeof (this.searchInputRef as any).setFocus === 'function') {
          (this.searchInputRef as any).setFocus();
        }
      }, 300);
    }
  }

  /** Handle add button click */
  private handleAddClick() {
    this.addAction.emit();
    this.railAction.emit({
      action: 'add',
      id: ''
    });
  }

  /** Handle search input value change */
  private handleSearchChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.searchValue = input.value;
    this.searchChange.emit({ value: this.searchValue });
  }

  /** Handle more button click */
  private handleMoreClick() {
    if (!this.expanded) {
      this.expanded = true;
      this.expandedChange.emit(true);
      this.notifySlottedComponents(true);
    }
    
    this.railAction.emit({
      action: 'more',
      id: ''
    });
  }

  /** Update the filter prop of the collapsible list when the filter state changes */
  @Watch('searchValue')
  filterChanged(newValue: string) {
    // Get the collapsible list from the slot
    const slotElement = this.el.shadowRoot?.querySelector('slot[name="items"]') as HTMLSlotElement;
    if (slotElement) {
      const elements = slotElement.assignedElements();
      const collapsibleList = elements[0] as HTMLElement;
      if (collapsibleList && collapsibleList.tagName.toLowerCase() === 'spectrum-collapsible-list') {
        collapsibleList.setAttribute('filter', newValue);
      }
    }
  }

  /**
   * Notify slotted components about the rail's expanded state
   * This allows them to adapt their rendering if they implement the optional interface
   */
  private notifySlottedComponents(expanded: boolean) {
    // Get all slotted elements
    const slots = ['items'];
    
    slots.forEach(slotName => {
      const slotElement = this.el.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement;
      if (slotElement) {
        const elements = slotElement.assignedElements();
        
        elements.forEach(element => {
          // Check if element has an onRailExpandedChange method
          if (element && typeof (element as any).onRailExpandedChange === 'function') {
            (element as any).onRailExpandedChange(expanded);
          }
        });
      }
    });
  }

  /**
   * Method that can be called by parent components to programmatically 
   * control the expanded state
   */
  @Method()
  async setExpanded(expanded: boolean) {
    this.expanded = expanded;
    this.expandedChange.emit(expanded);
    this.notifySlottedComponents(expanded);
    return expanded;
  }
  
  /**
   * Method to programmatically control the add button visibility
   */
  @Method()
  async setShowAddButton(show: boolean) {
    this.showAddButton = show;
    return this.showAddButton;
  }

  componentWillLoad() {
    if (this.initialExpanded) {
      this.expanded = true;
      this.notifySlottedComponents(true);
    }
  }

  componentDidLoad() {
    // Set custom properties from props
    if (this.expandedWidth) {
      this.el.style.setProperty('--rail-expanded-width', this.expandedWidth.toString());
    }

    // Set initial expanded state if specified
    if (this.initialExpanded) {
      this.expanded = true;
      this.expandedChange.emit(true);
      this.notifySlottedComponents(true);
    }
  }

  @Watch('appName')
  @Watch('moreLabel')
  @Watch('addLabel')
  @Watch('showAddButton')
  propChanged() {
    // Property changed handler
  }

  render() {
    // Default icon, ideally would be dynamically pulled from first item
    const firstIconInList = 'folder';
    
    // Create text spans directly to ensure text rendering
    const menuText = <span>{this.appName}</span>;
    const moreText = <span>{this.moreLabel}</span>;
    const addText = <span>{this.addLabel}</span>;

    return (
      <Host>
        <div 
          class={{ 
            'rail': true,
            'rail--expanded': this.expanded
          }}
          style={{
            '--rail-expanded-width': this.expandedWidth.toString()
          }}
        >
          {/* Menu Section */}
          <div class="rail-section menu">
            {!this.expanded ? (
              <spectrum-button
                class="rail-icon-only"
                variant="ghost"
                size="base"
                iconOnly={true}
                showLeftIcon={true}
                leftIcon="menu"
                onClick={() => this.handleMenuClick()}
                title="Menu"
                aria-label="Menu"
                state="active"
              />
            ) : (
              <div class="menu-expanded">
                <spectrum-button
                  class="menu-button"
                  variant="ghost"
                  size="base"
                  iconOnly={false}
                  showLeftIcon={true}
                  leftIcon="menu"
                  buttonText={this.appName || 'Menu'}
                  showButtonText={true}
                  onClick={() => this.handleMenuClick()}
                  aria-label="Menu"
                >
                  {menuText}
                </spectrum-button>
              </div>
            )}
          </div>

          {/* Search Section */}
          <div class="rail-section search">
            {!this.expanded ? (
              <spectrum-button
                class="rail-icon-only"
                variant="ghost"
                size="base"
                iconOnly={true}
                showLeftIcon={true}
                leftIcon="search"
                title="Search"
                aria-label="Search"
                onClick={() => this.handleSearchClick()}
              />
            ) : (
              <div class="search-expanded">
                <spectrum-search-input 
                  ref={(el) => this.searchInputRef = el as HTMLElement}
                  maxLines={1}
                  enableVoiceInput={false}
                  placeholder="Search conversations"
                  onSearchSubmit={(e: CustomEvent) => this.handleSearchChange(e)}
                  onSearchInput={(e: CustomEvent) => this.handleSearchChange(e)}
                  class="search-input-expanded"
                />
              </div>
            )}
          </div>

          {/* Add Section */}
          {this.showAddButton && (
            <div class="rail-section add">
              {!this.expanded ? (
                <spectrum-button
                  class="rail-icon-only"
                  variant="fab"
                  size="sm"
                  iconOnly={true}
                  showLeftIcon={true}
                  leftIcon="add"
                  onClick={() => this.handleAddClick()}
                  title={this.addLabel}
                  aria-label={this.addLabel}
                />
              ) : (
                <spectrum-button
                  class="add-button"
                  variant="fab"
                  size="sm"
                  showLeftIcon={true}
                  leftIcon="add"
                  buttonText={this.addLabel}
                  showButtonText={true}
                  onClick={() => this.handleAddClick()}
                >
                  {addText}
                </spectrum-button>
              )}
            </div>
          )}

          {/* Items Section */}
          <div class="rail-section items">
            {!this.expanded ? (
              <spectrum-button
                class="rail-icon-only"
                variant="ghost"
                size="base"
                iconOnly={true}
                showLeftIcon={true}
                leftIcon={firstIconInList}
                onClick={() => this.toggleExpanded()}
                title="Items"
                aria-label="Items"
                state="active"
              />
            ) : (
              <slot name="items"></slot>
            )}
          </div>

          {/* More Section */}
          <div class="rail-section more">
            {!this.expanded ? (
              <spectrum-button
                class="rail-icon-only"
                variant="ghost"
                size="base"
                iconOnly={true}
                showLeftIcon={true}
                leftIcon="settings"
                onClick={() => this.handleMoreClick()}
                title={this.moreLabel}
                aria-label={this.moreLabel}
              />
            ) : (
              <div class="more-expanded">
                <spectrum-button
                  class="more-button"
                  variant="ghost"
                  size="base"
                  showLeftIcon={true}
                  leftIcon="settings"
                  buttonText={this.moreLabel || 'Explore more'}
                  showButtonText={true}
                  showRightIcon={true}
                  rightIcon="chevron_right"
                  onClick={() => this.handleMoreClick()}
                >
                  {moreText}
                </spectrum-button>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
