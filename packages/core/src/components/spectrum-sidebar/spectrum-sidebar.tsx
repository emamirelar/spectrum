import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Spectrum Sidebar Component
 * A layout component for creating sidebar + main content layouts
 * with responsive behavior and flexible positioning.
 */
@Component({
  tag: 'spectrum-sidebar',
  styleUrl: 'spectrum-sidebar.scss',
  shadow: true,
})
export class SpectrumSidebar {
  // ============== Component Properties ==============
  
  // Sidebar Position
  @Prop() position: 'left' | 'right' = 'left';
  
  // Sidebar Width
  @Prop() sidebarWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = 'md';
  @Prop() minSidebarWidth: string = '';
  @Prop() maxSidebarWidth: string = '';
  
  // Gap between sidebar and content
  @Prop() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  // Responsive behavior
  @Prop() responsive: boolean = true;
  @Prop() breakpoint: 'sm' | 'md' | 'lg' = 'md';
  @Prop() collapseBelow: boolean = true;
  @Prop() stackMobile: boolean = true;
  
  // Sidebar behavior
  @Prop() collapsible: boolean = false;
  @Prop() collapsed: boolean = false;
  @Prop() overlay: boolean = false;
  
  // Full height
  @Prop() fullHeight: boolean = false;
  
  // Debug mode
  @Prop() debug: boolean = false;

  // ============== Helper Methods ==============
  
  private getSidebarClasses(): string {
    const classes = ['spectrum-sidebar'];
    
    // Position
    classes.push(`spectrum-sidebar--${this.position}`);
    
    // Width classes
    if (this.isCustomWidth(this.sidebarWidth)) {
      classes.push('spectrum-sidebar--custom-width');
    } else {
      classes.push(`spectrum-sidebar--width-${this.sidebarWidth}`);
    }
    
    // Gap
    classes.push(`spectrum-sidebar--gap-${this.gap}`);
    
    // States
    if (this.collapsible) {
      classes.push('spectrum-sidebar--collapsible');
    }
    
    if (this.collapsed) {
      classes.push('spectrum-sidebar--collapsed');
    }
    
    if (this.overlay) {
      classes.push('spectrum-sidebar--overlay');
    }
    
    // Responsive
    if (this.responsive) {
      classes.push(`spectrum-sidebar--responsive-${this.breakpoint}`);
    }
    
    if (this.collapseBelow) {
      classes.push('spectrum-sidebar--collapse-below');
    }
    
    if (this.stackMobile) {
      classes.push('spectrum-sidebar--stack-mobile');
    }
    
    // Full height
    if (this.fullHeight) {
      classes.push('spectrum-sidebar--full-height');
    }
    
    // Debug
    if (this.debug) {
      classes.push('spectrum-sidebar--debug');
    }
    
    return classes.join(' ');
  }
  
  private isCustomWidth(value: string): boolean {
    return !['xs', 'sm', 'md', 'lg', 'xl'].includes(value);
  }
  
  private getCustomStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    // Custom sidebar width
    if (this.isCustomWidth(this.sidebarWidth)) {
      styles['--sidebar-width-custom'] = this.sidebarWidth;
    }
    
    if (this.minSidebarWidth) {
      styles['--sidebar-min-width'] = this.minSidebarWidth;
    }
    
    if (this.maxSidebarWidth) {
      styles['--sidebar-max-width'] = this.maxSidebarWidth;
    }
    
    return styles;
  }

  // ============== Render Method ==============
  
  render() {
    const customStyles = this.getCustomStyles();
    
    return (
      <Host style={customStyles}>
        <div class={this.getSidebarClasses()}>
          <aside class="spectrum-sidebar__sidebar">
            <slot name="sidebar"></slot>
          </aside>
          <main class="spectrum-sidebar__content">
            <slot></slot>
          </main>
        </div>
      </Host>
    );
  }
}
