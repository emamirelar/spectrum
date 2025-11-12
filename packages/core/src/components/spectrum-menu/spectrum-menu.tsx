import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

/**
 * Spectrum Menu Component
 * A responsive navigation menu component that supports both horizontal and vertical layouts,
 * with mobile-optimized behavior and support for nested menu items.
 * 
 * @example
 * // JavaScript array
 * <spectrum-menu .items=${[{label: 'Home', href: '/'}]}></spectrum-menu>
 * 
 * @example
 * // JSON string (HTML-friendly)
 * <spectrum-menu 
 *   items='[{"label":"Home","href":"/"},{"label":"About","href":"/about"}]'>
 * </spectrum-menu>
 */
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
   * The left navigation items configuration
   * Used for horizontal layout with separate left and right sections
   */
  @Prop({ attribute: 'left-items' }) leftItems: string | Array<{
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
   * The right navigation items configuration
   * Used for horizontal layout with separate left and right sections
   */
  @Prop({ attribute: 'right-items' }) rightItems: string | Array<{
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
   * URL to navigate to when the logo is clicked
   * When provided, the logo becomes a clickable link
   */
  @Prop() logoHref: string;

  /**
   * Accessible label for the logo
   * Used for screen readers and ARIA labeling
   */
  @Prop() logoLabel: string = 'Home';

  /**
   * The megamenu footer items configuration (optional)
   * Used for the footer section of megamenu variant
   * Can be provided as a JSON string or array of objects
   */
  @Prop() megamenuFooterItems: string | Array<{
    label: string;
    href?: string;
    icon?: string;
    disabled?: boolean;
  }> = [];

  /**
   * The megamenu footer title configuration (optional)
   * Can be provided as a simple string or as a JSON string with text and icon
   * @example "Our Sites" or '{"text":"Our Sites","icon":"public"}'
   */
  @Prop() megamenuFooterTitle: string = '';

  /**
   * The megamenu footer title icon (optional)
   * Material icon name to display with the footer title
   */
  @Prop() megamenuFooterTitleIcon: string = '';


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
   * Parsed left menu items (internal state)
   */
  @State() parsedLeftItems: Array<{
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
   * Parsed right menu items (internal state)
   */
  @State() parsedRightItems: Array<{
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
   * Parsed megamenu footer items (internal state)
   */
  @State() parsedMegamenuFooterItems: Array<{
    label: string;
    href?: string;
    icon?: string;
    disabled?: boolean;
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

  @Watch('leftItems')
  leftItemsChanged(newValue: string | Array<any>) {
    this.parseLeftItems(newValue);
  }

  @Watch('rightItems')
  rightItemsChanged(newValue: string | Array<any>) {
    this.parseRightItems(newValue);
  }

  @Watch('megamenuFooterItems')
  megamenuFooterItemsChanged(newValue: string | Array<any>) {
    this.parseMegamenuFooterItems(newValue);
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
    this.parseLeftItems(this.leftItems);
    this.parseRightItems(this.rightItems);
    this.parseMegamenuFooterItems(this.megamenuFooterItems);
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

  private handleLogoClick() {
    if (this.logoHref) {
      // Emit event for logo click
      this.itemClick.emit({ label: this.logoLabel, href: this.logoHref });
      
      // Navigate directly if directNavigation is enabled
      if (this.directNavigation) {
        window.location.href = this.logoHref;
        return;
      }
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

  private parseLeftItems(items: string | Array<any>) {
    if (typeof items === 'string') {
      try {
        this.parsedLeftItems = JSON.parse(items);
      } catch (e) {
        console.error('Failed to parse leftItems JSON:', e);
        this.parsedLeftItems = [];
      }
    } else {
      this.parsedLeftItems = items;
    }
  }

  private parseRightItems(items: string | Array<any>) {
    if (typeof items === 'string') {
      try {
        this.parsedRightItems = JSON.parse(items);
      } catch (e) {
        console.error('Failed to parse rightItems JSON:', e);
        this.parsedRightItems = [];
      }
    } else {
      this.parsedRightItems = items;
    }
  }

  private parseMegamenuFooterItems(items: string | Array<any>) {
    if (typeof items === 'string') {
      try {
        this.parsedMegamenuFooterItems = JSON.parse(items);
      } catch (e) {
        console.error('Failed to parse megamenuFooterItems JSON:', e);
        this.parsedMegamenuFooterItems = [];
      }
    } else {
      this.parsedMegamenuFooterItems = items;
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
                    e.stopPropagation();
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
                      e.stopPropagation();
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
                          e.stopPropagation();
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
                            e.stopPropagation();
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
          e.stopPropagation();
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
            e.stopPropagation();
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
                {this.parsedMegamenuFooterItems && this.parsedMegamenuFooterItems.length > 0 && (
                <div class="spectrum-menu__megamenu-footer">
                  {this.megamenuFooterTitle && (
                    <div class="spectrum-menu__megamenu-footer-title-container">
                      {this.megamenuFooterTitleIcon && this.renderIcon(this.megamenuFooterTitleIcon)}
                      <div class="spectrum-menu__megamenu-footer-title">{this.megamenuFooterTitle}</div>
                    </div>
                  )}
                  <div class="spectrum-menu__megamenu-footer-items">
                    {this.parsedMegamenuFooterItems.map((footerItem) => (
                      <div
                        class={{
                          'spectrum-menu__megamenu-footer-item': true,
                          'spectrum-menu__megamenu-footer-item--disabled': footerItem.disabled,
                        }}
                        role="menuitem"
                        tabindex={footerItem.disabled ? -1 : 0}
                        aria-disabled={footerItem.disabled ? 'true' : 'false'}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (!footerItem.disabled) {
                            this.handleItemClick(footerItem);
                          }
                        }}
                      >
                        <a
                          class="spectrum-menu__megamenu-footer-item-link"
                          href={footerItem.href || '#'}
                          tabindex={-1}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!footerItem.disabled) {
                              this.handleItemClick(footerItem);
                            }
                          }}
                        >
                          {this.renderIcon(footerItem.icon)}
                          <span class="spectrum-menu__megamenu-footer-item-label">{footerItem.label}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
    // Skip positioning logic for mobile menus - they use static positioning
    if (this.isMobile) {
      return;
    }
    
    if (item.children && item.children.length > 0) {
      const menuItemElement = event.currentTarget as HTMLElement;
      const submenu = menuItemElement.querySelector('.spectrum-menu__submenu, .spectrum-menu__megamenu') as HTMLElement;
      
      if (submenu) {
        // Get the bounds of the actual menu item element
        const rect = menuItemElement.getBoundingClientRect();
        const spacing = 8; // 8px gap between menu item and submenu
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (this.variant === 'megamenu') {
          // Let CSS control positioning and visibility for megamenu
          submenu.style.removeProperty('position');
          submenu.style.removeProperty('top');
          submenu.style.removeProperty('left');
          submenu.style.removeProperty('width');
          // Let CSS hover control visibility
          submenu.style.removeProperty('visibility');
          submenu.style.removeProperty('opacity');
        } else if (this.orientation === 'vertical') {
          // Get host element bounds for relative positioning calculations
          const hostRect = this.el.getBoundingClientRect();
          
          // Temporarily position submenu off-screen to get accurate measurements
          submenu.style.position = 'absolute';
          submenu.style.left = '-9999px';
          submenu.style.top = '-9999px';
          submenu.style.visibility = 'visible';
          submenu.style.opacity = '1';
          
          // Force a reflow to get accurate dimensions
          submenu.offsetHeight;
          const submenuRect = submenu.getBoundingClientRect();
          
          // Calculate optimal horizontal position relative to host
          let left = (rect.right - hostRect.left) + spacing;
          
          // Check if submenu would overflow on the right
          if (hostRect.left + left + submenuRect.width > viewportWidth - spacing) {
            // Try positioning to the left of the menu item
            const leftPosition = (rect.left - hostRect.left) - submenuRect.width - spacing;
            if (hostRect.left + leftPosition >= spacing) {
              left = leftPosition;
            } else {
              // If both sides don't fit, position as far right as possible with some margin
              left = Math.max(spacing - hostRect.left, viewportWidth - hostRect.left - submenuRect.width - spacing);
            }
          }
          
          // Calculate optimal vertical position relative to host
          let top = rect.top - hostRect.top;
          
          // Check if submenu would overflow on the bottom
          if (hostRect.top + top + submenuRect.height > viewportHeight - spacing) {
            // Try aligning bottom of submenu with bottom of viewport
            const topPosition = viewportHeight - hostRect.top - submenuRect.height - spacing;
            if (hostRect.top + topPosition >= spacing) {
              top = topPosition;
            } else {
              // If submenu is taller than viewport, align to top with some margin
              top = spacing - hostRect.top;
            }
          }
          
          // Apply final positioning and let CSS hover control visibility
          submenu.style.left = `${left}px`;
          submenu.style.top = `${top}px`;
          submenu.style.removeProperty('visibility');
          submenu.style.removeProperty('opacity');
          
        } else {
          // Horizontal menu - position submenu below the menu item
          // Get host element bounds for relative positioning calculations
          const hostRect = this.el.getBoundingClientRect();
          
          // Temporarily position submenu off-screen to get accurate measurements
          submenu.style.position = 'absolute';
          submenu.style.left = '-9999px';
          submenu.style.top = '-9999px';
          submenu.style.visibility = 'visible';
          submenu.style.opacity = '1';
          
          // Force a reflow to get accurate dimensions
          submenu.offsetHeight;
          const submenuRect = submenu.getBoundingClientRect();
          
          // Calculate optimal horizontal position relative to host
          let left = rect.left - hostRect.left;
          
          // Check if submenu would overflow on the right
          if (hostRect.left + left + submenuRect.width > viewportWidth - spacing) {
            // Try aligning right edge of submenu with right edge of menu item
            const rightAlignedLeft = (rect.right - hostRect.left) - submenuRect.width;
            if (hostRect.left + rightAlignedLeft >= spacing) {
              left = rightAlignedLeft;
            } else {
              // If submenu is wider than available space, position as far right as possible
              left = Math.max(spacing - hostRect.left, viewportWidth - hostRect.left - submenuRect.width - spacing);
            }
          }
          
          // Calculate optimal vertical position relative to host
          let top = (rect.bottom - hostRect.top) + spacing;
          
          // Check if submenu would overflow on the bottom
          if (hostRect.top + top + submenuRect.height > viewportHeight - spacing) {
            // Try positioning above the menu item
            const topPosition = (rect.top - hostRect.top) - submenuRect.height - spacing;
            if (hostRect.top + topPosition >= spacing) {
              top = topPosition;
            } else {
              // If submenu doesn't fit above or below, position as high as possible
              top = Math.max(spacing - hostRect.top, viewportHeight - hostRect.top - submenuRect.height - spacing);
            }
          }
          
          // Apply final positioning and let CSS hover control visibility
          submenu.style.left = `${left}px`;
          submenu.style.top = `${top}px`;
          submenu.style.removeProperty('visibility');
          submenu.style.removeProperty('opacity');
        }
      }
    }
  }

  private handleItemMouseLeave(_event: MouseEvent) {
    // Reset positioning is handled by CSS
  }

  /**
   * Check if we should use the new layout with separate left/right items and logo
   */
  private useNewLayout(): boolean {
    return this.parsedLeftItems.length > 0 || this.parsedRightItems.length > 0;
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
            <div class="spectrum-menu__mobile-nav">
              <div class="spectrum-menu__mobile-nav-spacer"></div>
              
              {this.useNewLayout() && (
                <div class="spectrum-menu__mobile-nav-logo">
                  {this.logoHref ? (
                    <a
                      href={this.logoHref}
                      class="spectrum-menu__logo-link"
                      aria-label={this.logoLabel}
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleLogoClick();
                      }}
                      tabindex={0}
                    >
                      <slot name="mobile-nav-logo">
                        <slot name="logo"></slot>
                      </slot>
                    </a>
                  ) : (
                    <div class="spectrum-menu__logo-container" aria-label={this.logoLabel}>
                      <slot name="mobile-nav-logo">
                        <slot name="logo"></slot>
                      </slot>
                    </div>
                  )}
                </div>
              )}
              
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
            </div>
            {this.isMobileMenuOpen && (
              <div class="spectrum-menu__mobile-overlay">
                <div class="spectrum-menu__mobile-header">
                  <div class="spectrum-menu__mobile-header-content">
                    {this.useNewLayout() && (
                      <div class="spectrum-menu__mobile-header-logo">
                        {this.logoHref ? (
                          <a
                            href={this.logoHref}
                            class="spectrum-menu__logo-link"
                            aria-label={this.logoLabel}
                            onClick={(e) => {
                              e.preventDefault();
                              this.handleLogoClick();
                            }}
                            tabindex={0}
                          >
                            <slot name="mobile-nav-logo">
                              <slot name="logo"></slot>
                            </slot>
                          </a>
                        ) : (
                          <div class="spectrum-menu__logo-container" aria-label={this.logoLabel}>
                            <slot name="mobile-nav-logo">
                              <slot name="logo"></slot>
                            </slot>
                          </div>
                        )}
                      </div>
                    )}
                    <h2 class="spectrum-menu__mobile-title">{this.mobileMenuTitle}</h2>
                  </div>
                  <button
                    class="spectrum-menu__mobile-close"
                    onClick={() => this.toggleMobileMenu()}
                    aria-label="Close menu"
                    type="button"
                  >
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </div>
                <nav class="spectrum-menu__mobile-content" role="navigation" aria-label={this.mobileMenuTitle}>
                  {this.useNewLayout() ? (
                    <div class="spectrum-menu__mobile-layout">
                      {/* Left items in mobile */}
                      {this.parsedLeftItems.length > 0 && (
                        <div class="spectrum-menu__mobile-section">
                          <div class="spectrum-menu__mobile-list" role="menu" aria-label="Left navigation">
                            {this.parsedLeftItems.map((item) => this.renderMenuItem(item))}
                          </div>
                        </div>
                      )}
                      
                      {/* Right items in mobile */}
                      {this.parsedRightItems.length > 0 && (
                        <div class="spectrum-menu__mobile-section">
                          <div class="spectrum-menu__mobile-list" role="menu" aria-label="Right navigation">
                            {this.parsedRightItems.map((item) => this.renderMenuItem(item))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div class="spectrum-menu__mobile-list" role="menu" aria-label={this.mobileMenuTitle}>
                      {this.parsedItems.map((item) => this.renderMenuItem(item))}
                    </div>
                  )}
                </nav>
              </div>
            )}
          </div>
        ) : (
          <nav class="spectrum-menu__nav" role="navigation" aria-label="Main navigation">
            {this.useNewLayout() ? (
              <div class="spectrum-menu__layout">
                {/* Left navigation items as separate menubar */}
                {this.parsedLeftItems.length > 0 && (
                  <div class="spectrum-menu__section spectrum-menu__section--left" role="menubar" aria-label="Left navigation">
                    {this.parsedLeftItems.map((item) => this.renderMenuItem(item))}
                  </div>
                )}
                
                {/* Logo section with proper semantics and accessibility */}
                <div 
                  class="spectrum-menu__section spectrum-menu__section--logo" 
                  role="banner" 
                  aria-label="Site logo and branding"
                >
                  {this.logoHref ? (
                    <a
                      href={this.logoHref}
                      class="spectrum-menu__logo-link"
                      aria-label={this.logoLabel}
                      onClick={(e) => {
                        e.preventDefault();
                        this.handleLogoClick();
                      }}
                      tabindex={0}
                    >
                      <slot name="logo"></slot>
                    </a>
                  ) : (
                    <div class="spectrum-menu__logo-container" aria-label={this.logoLabel}>
                      <slot name="logo"></slot>
                    </div>
                  )}
                </div>
                
                {/* Right navigation items as separate menubar */}
                {this.parsedRightItems.length > 0 && (
                  <div class="spectrum-menu__section spectrum-menu__section--right" role="menubar" aria-label="Right navigation">
                    {this.parsedRightItems.map((item) => this.renderMenuItem(item))}
                  </div>
                )}
              </div>
            ) : (
              <div class="spectrum-menu__list" role="menubar" aria-label="Main navigation">
                {this.parsedItems.map((item) => this.renderMenuItem(item))}
              </div>
            )}
          </nav>
        )}
      </Host>
    );
  }
} 