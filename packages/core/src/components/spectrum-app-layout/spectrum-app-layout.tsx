import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';

/**
 * Spectrum App Layout Component
 * A comprehensive application layout with collapsible sidebar, header, main content, and footer.
 * Based on CSS Grid with responsive behavior and smooth animations.
 */
@Component({
  tag: 'spectrum-app-layout',
  styleUrl: 'spectrum-app-layout.scss',
  shadow: true,
})
export class SpectrumAppLayout {
  // ============== Component Properties ==============
  
  // Layout Configuration
  @Prop() headerHeight: string = '5rem';
  @Prop() footerHeight: string = '5rem';
  @Prop() sidebarExpandedWidth: string = '16rem';
  @Prop() sidebarCollapsedWidth: string = '4rem';
  
  // Sidebar Configuration
  @Prop({ mutable: true }) sidebarExpanded: boolean = true;
  @Prop() sidebarCollapsible: boolean = true;
  @Prop() sidebarPosition: 'left' | 'right' = 'left';
  
  // Right Bar Configuration
  @Prop() showRightBar: boolean = true;
  @Prop() rightBarWidth: string = '16rem';
  @Prop() rightBarCollapsible: boolean = true;
  @Prop({ mutable: true }) rightBarExpanded: boolean = true;
  
  // Header Configuration
  @Prop() showHeader: boolean = true;
  @Prop() headerTitle: string = '';
  @Prop() showLogo: boolean = true;
  @Prop() logoSrc: string = '';
  @Prop() logoAlt: string = 'Logo';
  @Prop() showProfile: boolean = true;
  @Prop() profileText: string = 'Profile';
  
  // Footer Configuration
  @Prop() showFooter: boolean = true;
  
  // Responsive Configuration
  @Prop() responsive: boolean = true;
  @Prop() breakpoint: 'sm' | 'md' | 'lg' = 'md';
  @Prop() collapseMobile: boolean = true;
  
  // Visual Configuration
  @Prop() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() debug: boolean = false;

  // ============== Component State ==============
  
  @State() internalSidebarExpanded: boolean = this.sidebarExpanded;
  @State() internalRightBarExpanded: boolean = this.rightBarExpanded;

  // ============== Component Events ==============
  
  @Event({
    eventName: 'sidebarToggle',
    composed: true,
    cancelable: true,
    bubbles: true
  }) sidebarToggle: EventEmitter<{ action: string; expanded: boolean }>;

  @Event({
    eventName: 'profileAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) profileAction: EventEmitter<{ action: string; type: 'profile' }>;

  @Event({
    eventName: 'rightBarToggle',
    composed: true,
    cancelable: true,
    bubbles: true
  }) rightBarToggle: EventEmitter<{ action: string; expanded: boolean }>;

  // ============== Watchers ==============
  
  @Watch('sidebarExpanded')
  watchSidebarExpanded(newValue: boolean) {
    this.internalSidebarExpanded = newValue;
  }

  @Watch('rightBarExpanded')
  watchRightBarExpanded(newValue: boolean) {
    this.internalRightBarExpanded = newValue;
  }

  // ============== Lifecycle Methods ==============
  
  componentWillLoad() {
    this.internalSidebarExpanded = this.sidebarExpanded;
    this.internalRightBarExpanded = this.rightBarExpanded;
  }

  // ============== Event Handlers ==============
  
  private handleSidebarToggle = () => {
    if (!this.sidebarCollapsible) return;
    
    // Update both internal state and prop
    const newExpanded = !this.internalSidebarExpanded;
    this.internalSidebarExpanded = newExpanded;
    this.sidebarExpanded = newExpanded;
    
    this.sidebarToggle.emit({
      action: 'toggle',
      expanded: newExpanded
    });
  };

  private handleProfileClick = () => {
    this.profileAction.emit({
      action: 'click',
      type: 'profile'
    });
  };

  private handleRightBarToggle = () => {
    if (!this.rightBarCollapsible) return;
    
    // Update both internal state and prop
    const newExpanded = !this.internalRightBarExpanded;
    this.internalRightBarExpanded = newExpanded;
    this.rightBarExpanded = newExpanded;
    
    this.rightBarToggle.emit({
      action: 'toggle',
      expanded: newExpanded
    });
  };

  // ============== Helper Methods ==============
  
  private getLayoutClasses(): string {
    const classes = ['spectrum-app-layout'];
    
    // Sidebar position
    classes.push(`spectrum-app-layout--sidebar-${this.sidebarPosition}`);
    
    // Sidebar state
    if (this.internalSidebarExpanded) {
      classes.push('spectrum-app-layout--sidebar-expanded');
    } else {
      classes.push('spectrum-app-layout--sidebar-collapsed');
    }
    
    // Layout sections
    if (!this.showHeader) {
      classes.push('spectrum-app-layout--no-header');
    }
    
    if (!this.showFooter) {
      classes.push('spectrum-app-layout--no-footer');
    }
    
    // Gap
    classes.push(`spectrum-app-layout--gap-${this.gap}`);
    
    // Responsive
    if (this.responsive) {
      classes.push(`spectrum-app-layout--responsive-${this.breakpoint}`);
    }
    
    if (this.collapseMobile) {
      classes.push('spectrum-app-layout--collapse-mobile');
    }
    
    // Right bar
    if (this.showRightBar) {
      classes.push('spectrum-app-layout--with-right-bar');
      if (this.internalRightBarExpanded) {
        classes.push('spectrum-app-layout--right-bar-expanded');
      } else {
        classes.push('spectrum-app-layout--right-bar-collapsed');
      }
    }
    
    // Debug
    if (this.debug) {
      classes.push('spectrum-app-layout--debug');
    }
    
    return classes.join(' ');
  }
  
  private getSidebarClasses(): string {
    const classes = ['spectrum-app-layout__sidebar'];
    
    if (this.internalSidebarExpanded) {
      classes.push('spectrum-app-layout__sidebar--expanded');
    } else {
      classes.push('spectrum-app-layout__sidebar--collapsed');
    }
    
    if (this.sidebarCollapsible) {
      classes.push('spectrum-app-layout__sidebar--collapsible');
    }
    
    return classes.join(' ');
  }
  
  private getToggleClasses(): string {
    const classes = ['spectrum-app-layout__toggle'];
    
    if (this.internalSidebarExpanded) {
      classes.push('spectrum-app-layout__toggle--expanded');
    }
    
    return classes.join(' ');
  }
  
  private getRightBarClasses(): string {
    const classes = ['spectrum-app-layout__right-bar'];
    
    if (this.internalRightBarExpanded) {
      classes.push('spectrum-app-layout__right-bar--expanded');
    } else {
      classes.push('spectrum-app-layout__right-bar--collapsed');
    }
    
    if (this.rightBarCollapsible) {
      classes.push('spectrum-app-layout__right-bar--collapsible');
    }
    
    return classes.join(' ');
  }
  
  private getRightBarToggleClasses(): string {
    const classes = ['spectrum-app-layout__right-bar-toggle'];
    
    if (this.internalRightBarExpanded) {
      classes.push('spectrum-app-layout__right-bar-toggle--expanded');
    }
    
    return classes.join(' ');
  }
  
  private getCustomStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    // Layout dimensions
    styles['--app-layout-header-height'] = this.headerHeight;
    styles['--app-layout-footer-height'] = this.footerHeight;
    styles['--app-layout-sidebar-expanded-width'] = this.sidebarExpandedWidth;
    styles['--app-layout-sidebar-collapsed-width'] = this.sidebarCollapsedWidth;
    
    // Current sidebar width
    const currentSidebarWidth = this.internalSidebarExpanded 
      ? this.sidebarExpandedWidth 
      : this.sidebarCollapsedWidth;
    styles['--app-layout-sidebar-current-width'] = currentSidebarWidth;
    
    // Right bar dimensions
    styles['--app-layout-right-bar-width'] = this.rightBarWidth;
    styles['--app-layout-right-bar-collapsed-width'] = '3rem';
    
    // Current right bar width
    const currentRightBarWidth = this.internalRightBarExpanded 
      ? this.rightBarWidth 
      : '3rem';
    styles['--app-layout-right-bar-current-width'] = currentRightBarWidth;
    
    return styles;
  }

  // ============== Render Method ==============
  
  render() {
    const customStyles = this.getCustomStyles();
    
    return (
      <Host style={customStyles} class={this.getLayoutClasses()}>
        {/* Header */}
        {this.showHeader && (
          <header class="spectrum-app-layout__header">
            {this.showLogo && (
              <div class="spectrum-app-layout__logo">
                {this.logoSrc ? (
                  <img src={this.logoSrc} alt={this.logoAlt} />
                ) : (
                  <div class="spectrum-app-layout__logo-placeholder">
                    <slot name="logo"></slot>
                  </div>
                )}
              </div>
            )}
            
            {this.headerTitle && (
              <h2 class="spectrum-app-layout__title">{this.headerTitle}</h2>
            )}
            
            <slot name="header-content"></slot>
            
            <div class="spectrum-app-layout__header-spacer"></div>
            
            {this.showProfile && (
              <div class="spectrum-app-layout__profile" onClick={this.handleProfileClick}>
                <slot name="profile">
                  <span>{this.profileText}</span>
                </slot>
              </div>
            )}
          </header>
        )}
        
        {/* Sidebar */}
        <nav class={this.getSidebarClasses()}>
          {this.sidebarCollapsible && (
            <button 
              class={this.getToggleClasses()} 
              onClick={this.handleSidebarToggle}
              type="button"
              aria-label={this.internalSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <span>›</span>
            </button>
          )}
          
          <div class="spectrum-app-layout__sidebar-content">
            <slot name="sidebar"></slot>
          </div>
        </nav>
        
        {/* Main Content */}
        <main class="spectrum-app-layout__main">
          <slot></slot>
        </main>
        
        {/* Right Bar */}
        {this.showRightBar && (
          <aside class={this.getRightBarClasses()}>
            {this.rightBarCollapsible && (
              <button 
                class={this.getRightBarToggleClasses()} 
                onClick={this.handleRightBarToggle}
                type="button"
                aria-label={this.internalRightBarExpanded ? 'Collapse right bar' : 'Expand right bar'}
              >
                <span>‹</span>
              </button>
            )}
            
            <div class="spectrum-app-layout__right-bar-content">
              <slot name="right-bar"></slot>
            </div>
          </aside>
        )}
        
        {/* Footer */}
        {this.showFooter && (
          <footer class="spectrum-app-layout__footer">
            <slot name="footer"></slot>
          </footer>
        )}
      </Host>
    );
  }
}
