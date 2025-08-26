import { Component, Event, EventEmitter, Host, h, Prop, Element, State, Watch, Method } from '@stencil/core';
import { ContextMenuAction } from '../spectrum-context-menu/spectrum-context-menu';

/**
 * Spectrum Rail Component
 * A vertical navigation rail with two states: expanded and contracted
 * 
 * Features:
 * - Customizable more section with configurable icon and label
 * - Expandable/collapsible states with smooth transitions
 * - Integrated search functionality
 * - Configurable add button with custom icon and label
 * - Flexible width and positioning options
 * - Context menu support for the "more" button
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

  /** More section icon (displayed in both states) */
  @Prop() moreIcon: string = 'settings';

  /** Whether the rail should be initially expanded */
  @Prop() initialExpanded: boolean = false;

  /** Whether to show the add button in the rail */
  @Prop() showAddButton = true;
  
  /** Add button label (displayed in expanded state) */
  @Prop() addLabel: string = 'Add new';
  
  /** Add button icon (displayed in both states) */
  @Prop() addIcon: string = 'add';
  
  /** Offset from the left when rail is collapsed (e.g. '20px', '1rem', etc.) */
  @Prop() collapsedOffset: string = '0px';

  /** Context menu actions for the "more" button */
  @Prop() moreContextActions: ContextMenuAction[] = [];

  /** Whether to enable debug logging */
  @Prop() debug: boolean = false;
  
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
  }) expandedChange: EventEmitter<{ action: string; expanded: boolean }>;

  /** Emits when the search value changes */
  @Event({
    eventName: 'searchChange',
    composed: true,
    cancelable: true,
    bubbles: true
  }) searchChange: EventEmitter<{ action: string; value: string }>;

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
  }) addAction: EventEmitter<{ action: string }>;

  /** Emits when a context menu action is triggered */
  @Event({
    eventName: 'moreContextAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) moreContextAction: EventEmitter<{ action: string; label: string; id: string }>;

  private searchInputRef?: HTMLElement;

  /** Debug logging utility */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-rail] ${message}`, ...args);
    }
  }

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
    this.expandedChange.emit({
      action: 'menu',
      expanded: this.expanded
    });
    this.notifySlottedComponents(this.expanded);
  }

  /** Handle search button click */
  private handleSearchClick() {
    if (!this.expanded) {
      this.expanded = true;
      this.expandedChange.emit({
        action: 'search',
        expanded: true
      });
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
    this.addAction.emit({ action: 'add' });
    this.railAction.emit({
      action: 'add',
      id: ''
    });
  }

  /** Handle search input value change */
  private handleSearchChange = (e: Event | CustomEvent) => {
    let value = '';
    
    // Handle CustomEvent from spectrum-search-input
    if ('detail' in e && typeof e.detail === 'string') {
      // spectrum-search-input emits CustomEvent<string>
      value = e.detail;
    } else if ('detail' in e && e.detail && typeof e.detail === 'object') {
      // Other custom event types
      value = e.detail.value || '';
    } else if (e.target) {
      // Standard input event
      const input = e.target as HTMLInputElement;
      value = input.value;
    }
    
    this.searchValue = value;
    this.searchChange.emit({
      action: 'search',
      value: this.searchValue
    });
  }

  /** Handle more button click */
  private handleMoreClick(event?: MouseEvent) {
    // If there are context actions defined, show the context menu
    if (this.moreContextActions && this.moreContextActions.length > 0 && event) {
      event.stopPropagation();
      event.preventDefault();
      this.showContextMenu(event);
      return;
    }

    // Default behavior: expand if not already expanded
    if (!this.expanded) {
      this.expanded = true;
      this.expandedChange.emit({
        action: 'more',
        expanded: true
      });
      this.notifySlottedComponents(true);
    }
    
    this.railAction.emit({
      action: 'more',
      id: ''
    });
  }

  /** Show context menu for the more button */
  private async showContextMenu(event: MouseEvent) {
    const buttonElement = event.currentTarget as HTMLElement;
    if (!buttonElement) {
      this.debugLog('Missing button element for context menu');
      return;
    }

    // Create or get the global context menu
    let menu = document.querySelector('spectrum-context-menu') as any;
    if (!menu) {
      menu = document.createElement('spectrum-context-menu');
      document.body.appendChild(menu);
      this.debugLog('Created global context menu');
    }

    // Check if the menu is already open
    let isOpen = false;
    if (typeof menu['isMenuOpen'] === 'function') {
      isOpen = await menu['isMenuOpen']();
    }

    if (isOpen) {
      // If menu is open, hide it
      if (typeof menu['hide'] === 'function') {
        menu['hide']();
        this.debugLog('Context menu hidden');
      }
    } else {
      // If menu is closed, show it
      const buttonRect = buttonElement.getBoundingClientRect();
      if (typeof menu['show'] === 'function') {
        // Set position to bottom so the menu appears above the button
        menu.position = 'bottom';
        
        // Show the menu positioned so its bottom aligns with the button's top
        menu['show'](this.moreContextActions, buttonRect.right, buttonRect.top, 'more-button');
        this.debugLog('Context menu shown with actions:', this.moreContextActions);
      }
    }
  }

  /** Handle context menu action clicks */
  private handleContextMenuAction = (event: CustomEvent<{ action: string; targetKey: string }>) => {
    if (event.detail.targetKey === 'more-button') {
      this.debugLog('Context menu action triggered:', event.detail.action);
      this.moreContextAction.emit({
        action: event.detail.action,
        label: this.moreLabel,
        id: 'more-button'
      });
    }
  };

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
    this.expandedChange.emit({
      action: 'menu',
      expanded: expanded
    });
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
      this.el.style.setProperty('--rail-expanded-width', `${this.expandedWidth}px`);
    }

    // Set collapsed offset
    this.el.style.setProperty('--rail-collapsed-offset', this.collapsedOffset);

    // Set initial expanded state if specified
    if (this.initialExpanded) {
      this.expanded = true;
      this.expandedChange.emit({
        action: 'menu',
        expanded: true
      });
      this.notifySlottedComponents(true);
    }

    // Add event listener for context menu actions
    document.addEventListener('actionClick', this.handleContextMenuAction);
  }

  disconnectedCallback() {
    // Remove event listener
    document.removeEventListener('actionClick', this.handleContextMenuAction);
  }

  @Watch('appName')
  @Watch('moreLabel')
  @Watch('moreIcon')
  @Watch('addLabel')
  @Watch('showAddButton')
  @Watch('collapsedOffset')
  @Watch('expandedWidth')
  propChanged() {
    // Property changed handler
    if (this.collapsedOffset !== undefined) {
      this.el.style.setProperty('--rail-collapsed-offset', this.collapsedOffset);
    }
    if (this.expandedWidth !== undefined) {
      this.el.style.setProperty('--rail-expanded-width', `${this.expandedWidth}px`);
    }
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
            'spectrum-rail': true,
            'spectrum-rail--expanded': this.expanded
          }}
          style={{
            '--rail-expanded-width': `${this.expandedWidth}px`,
            '--rail-collapsed-offset': this.collapsedOffset
          }}
        >
          {/* Menu Section */}
          <div class="spectrum-rail__section menu">
            {!this.expanded ? (
              <spectrum-button
                variant="ghost"
                size="medium"
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
                  size="medium"
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
          <div class="spectrum-rail__section search">
            {!this.expanded ? (
              <spectrum-button
                variant="ghost"
                size="medium"
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
                  ref={(el) => this.searchInputRef = el}
                  placeholder="Search..."
                  enableVoiceInput={false}
                  enableEnterSubmit={true}
                  searchIconPosition="left"
                  searchButtonVariant="ghost"
                  onSearchInput={(e) => this.handleSearchChange(e)}
                  onSearchSubmit={(e) => this.handleSearchChange(e)}
                />
              </div>
            )}
          </div>

          {/* Add Section */}
          {this.showAddButton && (
            <div class="spectrum-rail__section add">
              {!this.expanded ? (
                <spectrum-button
                  variant="fab"
                  size="sm"
                  iconOnly={true}
                  showLeftIcon={true}
                  leftIcon={this.addIcon}
                  onClick={() => this.handleAddClick()}
                  title={this.addLabel}
                  aria-label={this.addLabel}
                />
              ) : (
                <spectrum-button
                  variant="fab"
                  size="medium"
                  showLeftIcon={true}
                  leftIcon={this.addIcon}
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
          <div class="spectrum-rail__section items">
            {!this.expanded ? (
              <spectrum-button
                variant="ghost"
                size="medium"
                iconOnly={true}
                showLeftIcon={true}
                leftIcon={firstIconInList}
                onClick={() => this.toggleExpanded()}
                title="Items"
                aria-label="Items"
                state="active"
              />
            ) : (
              <div class="spectrum-rail__items-container">
                <slot name="items"></slot>
              </div>
            )}
          </div>

          {/* More Section */}
          <div class="spectrum-rail__section more">
            {!this.expanded ? (
              <spectrum-button
                variant="ghost"
                size="medium"
                iconOnly={true}
                showLeftIcon={true}
                leftIcon={this.moreIcon}
                onClick={(event) => this.handleMoreClick(event)}
                title={this.moreLabel}
                aria-label={this.moreLabel}
              />
            ) : (
              <div class="more-expanded">
                <spectrum-button
                  variant="secondary"
                  outline={true}
                  size="medium"
                  showLeftIcon={true}
                  leftIcon={this.moreIcon}
                  buttonText={this.moreLabel || 'Explore more'}
                  showButtonText={true}
                  showRightIcon={this.moreContextActions && this.moreContextActions.length > 0 ? true : true}
                  rightIcon={this.moreContextActions && this.moreContextActions.length > 0 ? "more_vert" : "chevron_right"}
                  onClick={(event) => this.handleMoreClick(event)}
                  class="more-button"
                  customStyle={{ width: '100%', justifyContent: 'space-between' }}
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
