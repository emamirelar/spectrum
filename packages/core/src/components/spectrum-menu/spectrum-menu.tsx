import { Component, Element, Event, EventEmitter, h, Host, Listen, Method, Prop, State } from '@stencil/core';

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
   * The menu items configuration
   * icon: Material icon name (e.g. 'home', 'info', 'shopping_cart')
   */
  @Prop() items: Array<{
    label: string;
    href?: string;
    icon?: string; // Material icon name
    disabled?: boolean;
    children?: Array<{
      label: string;
      href?: string;
      icon?: string;
      disabled?: boolean;
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
   * Event emitted when a menu item is clicked
   */
  @Event() itemClick: EventEmitter<{
    label: string;
    href?: string;
  }>;

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

  componentWillLoad() {
    this.checkMobileView();
  }

  componentDidLoad() {
    this.checkMobileView();
  }

  private checkMobileView() {
    this.isMobile = window.innerWidth <= this.mobileBreakpoint;
  }

  private handleItemClick(item: { label: string; href?: string }) {
    if (item.href) {
      this.itemClick.emit(item);
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

  renderIcon(icon?: string) {
    if (!icon) return null;
    return <span class="material-symbols-outlined spectrum-menu__icon">{icon}</span>;
  }

  renderMenuItem(item: any, isSubmenu = false) {
    const itemClass = isSubmenu ? 'spectrum-menu__submenu-item' : 'spectrum-menu__item';
    const linkClass = `${itemClass}-link`;
    
    return (
      <li class={itemClass}>
        <a
          class={{
            [linkClass]: true,
            [`${linkClass}--active`]: this.activeItem === item.label,
            [`${linkClass}--disabled`]: item.disabled,
          }}
          href={item.href || '#'}
          onClick={(e) => {
            e.preventDefault();
            if (!item.disabled) {
              this.handleItemClick(item);
            }
          }}
          onMouseEnter={(e) => this.handleItemMouseEnter(e, item)}
          onMouseLeave={(e) => this.handleItemMouseLeave(e)}
          role="menuitem"
          tabindex={item.disabled ? -1 : 0}
          aria-disabled={item.disabled ? 'true' : 'false'}
        >
          {this.renderIcon(item.icon)}
          <span class="spectrum-menu__label">{item.label}</span>
        </a>
        {!isSubmenu && item.children && item.children.length > 0 && (
          <ul class="spectrum-menu__submenu" role="menu">
            {item.children.map((child) => this.renderMenuItem(child, true))}
          </ul>
        )}
      </li>
    );
  }

  private handleItemMouseEnter(event: MouseEvent, item: any) {
    if (item.children && item.children.length > 0) {
      const linkElement = event.target as HTMLElement;
      const submenu = linkElement.parentElement?.querySelector('.spectrum-menu__submenu') as HTMLElement;
      
      if (submenu) {
        const rect = linkElement.getBoundingClientRect();
        const spacing = 8; // 8px gap between menu item and submenu
        
        // Debug logging
        console.log('Menu orientation:', this.orientation);
        console.log('Menu item rect:', rect);
        console.log('Submenu element:', submenu);
        
        if (this.orientation === 'vertical') {
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
    return (
      <Host
        class={{
          'spectrum-menu': true,
          'spectrum-menu--mobile': this.isMobile,
          'spectrum-menu--horizontal': this.orientation === 'horizontal' && !this.isMobile,
          'spectrum-menu--vertical': this.orientation === 'vertical' && !this.isMobile,
        }}
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
                <nav class="spectrum-menu__mobile-nav" role="navigation">
                  <ul class="spectrum-menu__mobile-list" role="menu">
                    {this.items.map((item) => this.renderMenuItem(item))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        ) : (
          <nav class="spectrum-menu__nav" role="navigation">
            <ul class="spectrum-menu__list" role="menubar">
              {this.items.map((item) => this.renderMenuItem(item))}
            </ul>
          </nav>
        )}
      </Host>
    );
  }
} 