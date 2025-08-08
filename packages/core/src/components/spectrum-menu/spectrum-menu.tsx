import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'spectrum-menu',
  styleUrl: 'spectrum-menu.scss',
  shadow: true,
})
export class SpectrumMenu {
  @Element() el!: HTMLSpectrumMenuElement;

  /**
   * The orientation of the menu
   */
  @Prop() orientation: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * The variant of the menu
   */
  @Prop() variant: 'default' | 'megamenu' = 'default';

  /**
   * The menu items configuration
   * Can be provided as a JSON string or array of objects
   * icon: Material icon name (e.g. 'home', 'info', 'shopping_cart')
   * For megamenu variant, children can have additional properties like description and columns
   */
  @Prop() items: string | Array<{
    label: string;
    href?: string;
    icon?: string; // Material icon name
    disabled?: boolean;
    description?: string; // For megamenu descriptions
    children?: Array<{
      label: string;
      href?: string;
      icon?: string;
      disabled?: boolean;
      description?: string;
      children?: Array<{
        label: string;
        href?: string;
        icon?: string;
        disabled?: boolean;
        description?: string;
      }>;
    }>;
  }> = [];

  /**
   * The breakpoint at which the menu switches to mobile view
   */
  @Prop() mobileBreakpoint: number = 768;

  /**
   * The title displayed in the mobile menu header
   */
  @Prop() mobileMenuTitle: string = 'Menu';

  /**
   * Whether to enable direct browser navigation when menu items are clicked
   * When true, clicking a menu item will navigate to its href in the current tab
   * When false, only the itemClick event will be emitted
   */
  @Prop() directNavigation: boolean = false;

  /**
   * Navigation color for the menu text
   * When provided, this will override the default theme color
   */
  @Prop() navigationColor: string;

  /**
   * Color for mobile menu icons (hamburger, close, and menu item icons)
   * When provided, this will override the default icon color
   */
  @Prop() mobileIconColor: string = '#000000';

  /**
   * Whether the menu is currently in mobile view
   */
  @State() isMobile: boolean = false;

  /**
   * Whether the mobile menu is open
   */
  @State() isMobileMenuOpen: boolean = false;

  /**
   * The currently active menu item
   */
  @State() activeItem: string | null = null;

  /**
   * Parsed menu items (internal state)
   */
  @State() parsedItems: Array<{
    label: string;
    href?: string;
    icon?: string;
    disabled?: boolean;
    description?: string;
    children?: Array<{
      label: string;
      href?: string;
      icon?: string;
      disabled?: boolean;
      description?: string;
      children?: Array<{
        label: string;
        href?: string;
        icon?: string;
        disabled?: boolean;
        description?: string;
      }>;
    }>;
  }> = [];

  /**
   * Event emitted when a menu item is clicked
   */
  @Event() itemClick: EventEmitter<{
    label: string;
    href?: string;
  }>;

  @Watch('items')
  itemsChanged(newValue: string | Array<any>) {
    this.parseItems(newValue);
  }

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.checkMobileView();
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isMobileMenuOpen && !this.el.contains(event.target as Node)) {
      this.isMobileMenuOpen = false;
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    
    // Only handle keyboard navigation for menuitem elements
    if (!target.getAttribute('role')?.includes('menuitem')) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        // Close mobile menu or submenu
        if (this.isMobileMenuOpen) {
          this.isMobileMenuOpen = false;
          // Focus the mobile toggle button
          const toggleButton = this.el.shadowRoot?.querySelector('.spectrum-menu__mobile-toggle') as HTMLButtonElement;
          toggleButton?.focus();
        }
        break;
      
      case 'Enter':
      case ' ':
        // Activate the current menu item
        event.preventDefault();
        target.click();
        break;
      
      case 'ArrowDown':
      case 'ArrowUp':
        // Navigate within menu
        this.navigateMenu(event, target);
        break;
      
      case 'ArrowRight':
        // Open submenu if available
        if (target.getAttribute('aria-haspopup') === 'true') {
          // Trigger mouse enter to show submenu
          target.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        }
        break;
      
      case 'ArrowLeft':
        // Close submenu and return to parent
        if (target.closest('.spectrum-menu__submenu')) {
          const parentItem = target.closest('.spectrum-menu__item')?.parentElement?.closest('.spectrum-menu__item');
          if (parentItem) {
            (parentItem as HTMLElement).focus();
          }
        }
        break;
    }
  }

  private navigateMenu(event: KeyboardEvent, currentElement: HTMLElement) {
    event.preventDefault();
    
    // Find all menuitem elements in the current menu level
    const menuContainer = currentElement.closest('[role="menu"], [role="menubar"]');
    if (!menuContainer) return;
    
    const menuItems = Array.from(menuContainer.children).filter(
      child => child.getAttribute('role') === 'menuitem' && !child.hasAttribute('aria-disabled')
    ) as HTMLElement[];
    
    const currentIndex = menuItems.indexOf(currentElement);
    let nextIndex: number;
    
    if (event.key === 'ArrowDown') {
      nextIndex = currentIndex + 1 >= menuItems.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? menuItems.length - 1 : currentIndex - 1;
    }
    
    menuItems[nextIndex]?.focus();
  }

  componentWillLoad() {
    this.checkMobileView();
    this.parseItems(this.items);
  }

  componentDidLoad() {
    this.checkMobileView();
  }

  private checkMobileView() {
    this.isMobile = window.innerWidth <= this.mobileBreakpoint;
  }

  private handleItemClick(item: { label: string; href?: string }) {
    if (item.href) {
      // Emit the event for custom handling
      this.itemClick.emit(item);
      
      // Navigate directly if directNavigation is enabled
      if (this.directNavigation) {
        window.location.href = item.href;
        return; // Return early since we're navigating away
      }
    }
    
    this.activeItem = item.label;
    if (this.isMobile) {
      this.isMobileMenuOpen = false;
    }
  }

  private toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @Method()
  async close() {
    this.isMobileMenuOpen = false;
  }

  private parseItems(items: string | Array<any>) {
    if (typeof items === 'string') {
      try {
        this.parsedItems = JSON.parse(items);
      } catch (e) {
        console.error('Failed to parse items JSON:', e);
        this.parsedItems = [];
      }
    } else {
      this.parsedItems = items;
    }
  }

  renderIcon(icon?: string) {
    if (!icon) return null;
    return <span class="material-symbols-outlined spectrum-menu__icon">{icon}</span>;
  }

  renderMegamenuContent(children: any[]) {
    // Group children into columns (max 4 columns)
    const columns = [];
    const itemsPerColumn = Math.ceil(children.length / 4);
    
    for (let i = 0; i < children.length; i += itemsPerColumn) {
      columns.push(children.slice(i, i + itemsPerColumn));
    }

    return (
      <div class="spectrum-menu__megamenu-columns">
        {columns.map((column) => (
          <div class="spectrum-menu__megamenu-column">
            {column.map((item) => (
              <div class="spectrum-menu__megamenu-section">
                <div
                  class={{
                    'spectrum-menu__megamenu-item': true,
                    'spectrum-menu__megamenu-item--disabled': item.disabled,
                  }}
                  role="menuitem"
                  tabindex={item.disabled ? -1 : 0}
                  aria-disabled={item.disabled ? 'true' : 'false'}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!item.disabled) {
                      this.handleItemClick(item);
                    }
                  }}
                >
                  <a
                    class="spectrum-menu__megamenu-item-link"
                    href={item.href || '#'}
                    tabindex={-1} // Remove from tab order since parent div handles focus
                    onClick={(e) => {
                      e.preventDefault();
                      if (!item.disabled) {
                        this.handleItemClick(item);
                      }
                    }}
                  >
                    <div class="spectrum-menu__megamenu-item-header">
                      {this.renderIcon(item.icon)}
                      <span class="spectrum-menu__megamenu-item-label">{item.label}</span>
                    </div>
                    {item.description && (
                      <p class="spectrum-menu__megamenu-item-description">{item.description}</p>
                    )}
                  </a>
                </div>
                {item.children && item.children.length > 0 && (
                  <div class="spectrum-menu__megamenu-subitems" role="group" aria-label={`${item.label} subitems`}>
                    {item.children.map((subitem) => (
                      <div
                        class={{
                          'spectrum-menu__megamenu-subitem': true,
                          'spectrum-menu__megamenu-subitem--disabled': subitem.disabled,
                        }}
                        role="menuitem"
                        tabindex={subitem.disabled ? -1 : 0}
                        aria-disabled={subitem.disabled ? 'true' : 'false'}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!subitem.disabled) {
                            this.handleItemClick(subitem);
                          }
                        }}
                      >
                        <a
                          class="spectrum-menu__megamenu-subitem-link"
                          href={subitem.href || '#'}
                          tabindex={-1} // Remove from tab order since parent div handles focus
                          onClick={(e) => {
                            e.preventDefault();
                            if (!subitem.disabled) {
                              this.handleItemClick(subitem);
                            }
                          }}
                        >
                          {this.renderIcon(subitem.icon)}
                          <div class="spectrum-menu__megamenu-subitem-content">
                            <span class="spectrum-menu__megamenu-subitem-label">{subitem.label}</span>
                            {subitem.description && (
                              <span class="spectrum-menu__megamenu-subitem-description">{subitem.description}</span>
                            )}
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  renderMenuItem(item: any, isSubmenu = false) {
    const itemClass = isSubmenu ? 'spectrum-menu__submenu-item' : 'spectrum-menu__item';
    
    return (
      <div
        class={{
          [itemClass]: true,
          [`${itemClass}--active`]: this.activeItem === item.label,
          [`${itemClass}--disabled`]: item.disabled,
        }}
        role="menuitem"
        tabindex={item.disabled ? -1 : 0}
        aria-disabled={item.disabled ? 'true' : 'false'}
        onClick={(e) => {
          e.preventDefault();
          if (!item.disabled) {
            this.handleItemClick(item);
          }
        }}
        onMouseEnter={(e) => this.handleItemMouseEnter(e, item)}
        onMouseLeave={(e) => this.handleItemMouseLeave(e)}
        aria-haspopup={item.children && item.children.length > 0 ? 'true' : 'false'}
        aria-expanded={item.children && item.children.length > 0 ? 'false' : undefined}
      >
        <a
          class="spectrum-menu__item-link"
          href={item.href || '#'}
          onClick={(e) => {
            e.preventDefault();
            if (!item.disabled) {
              this.handleItemClick(item);
            }
          }}
          tabindex={-1} // Remove from tab order since parent div handles focus
        >
          {this.renderIcon(item.icon)}
          <span class="spectrum-menu__label">{item.label}</span>
        </a>
        {!isSubmenu && item.children && item.children.length > 0 && (
          this.variant === 'megamenu' ? (
            <div class="spectrum-menu__megamenu" role="menu" aria-label={`${item.label} submenu`}>
              <div class="spectrum-menu__megamenu-content">
                {this.renderMegamenuContent(item.children)}
              </div>
            </div>
          ) : (
            <div class="spectrum-menu__submenu" role="menu" aria-label={`${item.label} submenu`}>
              {item.children.map((child) => this.renderMenuItem(child, true))}
            </div>
          )
        )}
      </div>
    );
  }

  private handleItemMouseEnter(event: MouseEvent, item: any) {
    if (item.children && item.children.length > 0) {
      const linkElement = event.target as HTMLElement;
      const submenu = linkElement.parentElement?.querySelector('.spectrum-menu__submenu, .spectrum-menu__megamenu') as HTMLElement;
      
      if (submenu) {
        const rect = linkElement.getBoundingClientRect();
        const spacing = 8; // 8px gap between menu item and submenu
        
        if (this.variant === 'megamenu') {
          // Megamenu positioning - full width below the menu bar
          submenu.style.top = `${rect.bottom + spacing}px`;
          submenu.style.left = '0px';
          submenu.style.width = '100vw';
        } else if (this.orientation === 'vertical') {
          // Position submenu to the right of the menu item
          submenu.style.top = `${rect.top}px`;
          submenu.style.left = `${rect.right + spacing}px`;
          
          // Ensure submenu doesn't go off-screen on the right
          const submenuRect = submenu.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          if (rect.right + spacing + submenuRect.width > viewportWidth) {
            // Position to the left of the menu item if it would overflow
            submenu.style.left = `${rect.left - submenuRect.width - spacing}px`;
          }
        } else {
          // Horizontal menu - position submenu below the menu item
          submenu.style.top = `${rect.bottom + spacing}px`;
          submenu.style.left = `${rect.left}px`;
          
          // Ensure submenu doesn't go off-screen on the right
          const submenuRect = submenu.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          
          if (rect.left + submenuRect.width > viewportWidth) {
            // Align to the right edge if it would overflow
            submenu.style.left = `${viewportWidth - submenuRect.width - spacing}px`;
          }
          
          // Ensure submenu doesn't go off-screen on the bottom
          const viewportHeight = window.innerHeight;
          if (rect.bottom + spacing + submenuRect.height > viewportHeight) {
            // Position above the menu item if it would overflow
            submenu.style.top = `${rect.top - submenuRect.height - spacing}px`;
          }
        }
      }
    }
  }

  private handleItemMouseLeave(_event: MouseEvent) {
    // Reset positioning is handled by CSS
  }

  render() {
    const hostStyle = {
      ...(this.navigationColor && { '--menu-color': this.navigationColor }),
      ...(this.mobileIconColor && { '--mobile-icon-color': this.mobileIconColor })
    };

    return (
      <Host
        class={{
          'spectrum-menu': true,
          'spectrum-menu--mobile': this.isMobile,
          'spectrum-menu--horizontal': this.orientation === 'horizontal' && !this.isMobile,
          'spectrum-menu--vertical': this.orientation === 'vertical' && !this.isMobile,
          'spectrum-menu--megamenu': this.variant === 'megamenu',
        }}
        style={hostStyle}
      >
        {this.isMobile ? (
          <div class="spectrum-menu__mobile">
            <button
              class="spectrum-menu__mobile-toggle"
              onClick={() => this.toggleMobileMenu()}
              aria-expanded={this.isMobileMenuOpen}
              aria-label="Toggle menu"
              type="button"
            >
              <span class="spectrum-menu__hamburger">
                <span class="spectrum-menu__hamburger-line"></span>
                <span class="spectrum-menu__hamburger-line"></span>
                <span class="spectrum-menu__hamburger-line"></span>
              </span>
            </button>
            {this.isMobileMenuOpen && (
              <div class="spectrum-menu__mobile-overlay">
                <div class="spectrum-menu__mobile-header">
                  <h2 class="spectrum-menu__mobile-title">{this.mobileMenuTitle}</h2>
                  <button
                    class="spectrum-menu__mobile-close"
                    onClick={() => this.toggleMobileMenu()}
                    aria-label="Close menu"
                    type="button"
                  >
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </div>
                <nav class="spectrum-menu__mobile-nav" role="navigation" aria-label={this.mobileMenuTitle}>
                  <div class="spectrum-menu__mobile-list" role="menu" aria-label={this.mobileMenuTitle}>
                    {this.parsedItems.map((item) => this.renderMenuItem(item))}
                  </div>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <nav class="spectrum-menu__nav" role="navigation" aria-label="Main navigation">
            <div class="spectrum-menu__list" role="menubar" aria-label="Main navigation">
              {this.parsedItems.map((item) => this.renderMenuItem(item))}
            </div>
          </nav>
        )}
      </Host>
    );
  }
} 