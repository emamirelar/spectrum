import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Spectrum Container Component
 * A container component with max-width constraints, responsive padding,
 * and centering capabilities for content layout.
 */
@Component({
  tag: 'spectrum-container',
  styleUrl: 'spectrum-container.scss',
  shadow: true,
})
export class SpectrumContainer {
  // ============== Component Properties ==============
  
  // Container Size
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid' = 'lg';
  @Prop() maxWidth: string = '';
  
  // Padding
  @Prop() padding: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Prop() paddingX: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '' = '';
  @Prop() paddingY: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '' = '';
  
  // Centering
  @Prop() centered: boolean = true;
  @Prop() centerContent: boolean = false;
  
  // Responsive behavior
  @Prop() responsive: boolean = true;
  @Prop() fullWidthMobile: boolean = true;
  
  // Debug mode
  @Prop() debug: boolean = false;

  // ============== Helper Methods ==============
  
  private getContainerClasses(): string {
    const classes = ['spectrum-container'];
    
    // Size variations
    classes.push(`spectrum-container--${this.size}`);
    
    // Custom max-width
    if (this.maxWidth) {
      classes.push('spectrum-container--custom-width');
    }
    
    // Padding classes
    classes.push(`spectrum-container--padding-${this.padding}`);
    
    if (this.paddingX) {
      classes.push(`spectrum-container--padding-x-${this.paddingX}`);
    }
    
    if (this.paddingY) {
      classes.push(`spectrum-container--padding-y-${this.paddingY}`);
    }
    
    // Centering
    if (this.centered) {
      classes.push('spectrum-container--centered');
    }
    
    if (this.centerContent) {
      classes.push('spectrum-container--center-content');
    }
    
    // Responsive
    if (this.responsive) {
      classes.push('spectrum-container--responsive');
    }
    
    if (this.fullWidthMobile) {
      classes.push('spectrum-container--full-width-mobile');
    }
    
    // Debug
    if (this.debug) {
      classes.push('spectrum-container--debug');
    }
    
    return classes.join(' ');
  }
  
  private getCustomStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    if (this.maxWidth) {
      styles['--container-max-width-custom'] = this.maxWidth;
    }
    
    return styles;
  }

  // ============== Render Method ==============
  
  render() {
    const customStyles = this.getCustomStyles();
    
    return (
      <Host style={customStyles}>
        <div class={this.getContainerClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
