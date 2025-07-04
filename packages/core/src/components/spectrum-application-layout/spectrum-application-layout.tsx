import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'spectrum-application-layout',
  styleUrl: 'spectrum-application-layout.scss',
  shadow: true,
})
export class SpectrumApplicationLayout {
  
  /**
   * Show/hide the header app ID slot (brand, logo, nav toggle)
   */
  @Prop() showHeaderAppId: boolean = true;
  
  /**
   * Show/hide the header middle slot (search, breadcrumbs, page title)
   */
  @Prop() showHeaderMiddle: boolean = true;
  
  /**
   * Show/hide the header utility slot (user menu, notifications, settings)
   */
  @Prop() showHeaderUtility: boolean = true;
  
  /**
   * Show/hide the content navigation slot (main navigation, left content)
   */
  @Prop() showContentNavigation: boolean = true;
  
  /**
   * Show/hide the content sidebar slot (sidebar, right content, panels)
   */
  @Prop() showContentSidebar: boolean = false;
  
  /**
   * Show/hide the footer left slot (secondary navigation, footer links)
   */
  @Prop() showFooterLeft: boolean = true;
  
  /**
   * Show/hide the footer center slot (status information, breadcrumbs)
   */
  @Prop() showFooterCenter: boolean = true;
  
  /**
   * Show/hide the footer right slot (additional actions, version info)
   */
  @Prop() showFooterRight: boolean = false;

  /**
   * Enable debug mode to show semantic colors and placeholder content
   */
  @Prop() debug: boolean = false;

  /**
   * Collapse the left sidebar and footer sections to 96px width
   */
  @Prop() leftCollapsed: boolean = false;

  /**
   * Collapse the right sidebar and footer sections to 96px width
   */
  @Prop() rightCollapsed: boolean = false;

  render() {
    const layoutClasses = [
      'application-layout',
      this.debug ? 'debug' : '',
      this.leftCollapsed ? 'left-collapsed' : '',
      this.rightCollapsed ? 'right-collapsed' : ''
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={layoutClasses}>
          {/* Header Section */}
          <header class="layout-header" role="banner">
            <section 
              class={`header-app-id ${!this.showHeaderAppId ? 'hidden' : ''}`} 
              part="header-app-id"
              aria-label="Application branding"
            >
              <slot name="header-app-id">
                {this.debug && (
                  <div class="slot-content">
                    <h1 class="app-brand">App ID Slot</h1>
                    <span class="slot-label">Brand • Logo • Nav Toggle</span>
                  </div>
                )}
              </slot>
            </section>
            <section 
              class={`header-middle ${!this.showHeaderMiddle ? 'hidden' : ''}`} 
              part="header-middle"
              aria-label="Primary header content"
            >
              <slot name="header-middle">
                {this.debug && (
                  <div class="slot-content">
                    <h2 class="slot-title">Middle Slot</h2>
                    <span class="slot-label">Search • Breadcrumbs • Page Title</span>
                  </div>
                )}
              </slot>
            </section>
            <section 
              class={`header-utility ${!this.showHeaderUtility ? 'hidden' : ''}`} 
              part="header-utility"
              aria-label="User actions and utilities"
            >
              <slot name="header-utility">
                {this.debug && (
                  <div class="slot-content">
                    <h2 class="slot-title">Utility Slot</h2>
                    <span class="slot-label">User Menu • Notifications • Settings</span>
                  </div>
                )}
              </slot>
            </section>
          </header>

          {/* Main Content Area */}
          <main class="layout-content" role="main">
            {/* Left Area */}
            <nav 
              class={`content-navigation ${!this.showContentNavigation ? 'hidden' : ''}`} 
              part="content-navigation"
              role="navigation" 
              aria-label="Left area navigation"
            >
              <slot name="content-navigation">
                {this.debug && (
                  <div class="slot-content">
                    <h2 class="slot-title">Navigation Slot</h2>
                    <span class="slot-label">Main Navigation • Left Content</span>
                  </div>
                )}
              </slot>
            </nav>

            {/* Center Area - Always visible */}
            <section 
              class="content-main" 
              part="content-main"
              aria-label="Center area main content"
            >
              <slot name="content-main">
                {this.debug && (
                  <div class="slot-content">
                    <h2 class="slot-title">Content Slot</h2>
                    <span class="slot-label">Primary Application Content</span>
                  </div>
                )}
              </slot>
            </section>

            {/* Right Area */}
            <aside 
              class={`content-sidebar ${!this.showContentSidebar ? 'hidden' : ''}`} 
              part="content-sidebar"
              role="complementary" 
              aria-label="Right area sidebar"
            >
              <slot name="content-sidebar">
                {this.debug && (
                  <div class="slot-content">
                    <h2 class="slot-title">Right Pane Slot</h2>
                    <span class="slot-label">Sidebar • Right Content • Panels</span>
                  </div>
                )}
              </slot>
            </aside>
          </main>

          {/* Footer Section */}
          <footer class="layout-footer" role="contentinfo">
            <section 
              class={`footer-left ${!this.showFooterLeft ? 'hidden' : ''}`} 
              part="footer-left"
              aria-label="Footer navigation"
            >
              <slot name="footer-left">
                {this.debug && (
                  <div class="slot-content">
                    <h3 class="slot-title">Footer Left Slot</h3>
                    <span class="slot-label">Secondary Navigation • Footer Links</span>
                  </div>
                )}
              </slot>
            </section>
            <section 
              class={`footer-center ${!this.showFooterCenter ? 'hidden' : ''}`} 
              part="footer-center"
              aria-label="Footer content"
            >
              <slot name="footer-center">
                {this.debug && (
                  <div class="slot-content">
                    <h3 class="slot-title">Footer Center Slot</h3>
                    <span class="slot-label">Status Information • Breadcrumbs</span>
                  </div>
                )}
              </slot>
            </section>
            <section 
              class={`footer-right ${!this.showFooterRight ? 'hidden' : ''}`} 
              part="footer-right"
              aria-label="Footer utilities"
            >
              <slot name="footer-right">
                {this.debug && (
                  <div class="slot-content">
                    <h3 class="slot-title">Footer Right Slot</h3>
                    <span class="slot-label">Additional Actions • Version Info</span>
                  </div>
                )}
              </slot>
            </section>
          </footer>

          {/* Screen Reader Support */}
          <div class="sr-only" aria-live="polite" id="status-announcements"></div>
        </div>
      </Host>
    );
  }
}
