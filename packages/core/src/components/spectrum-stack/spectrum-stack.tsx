import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Spectrum Stack Component
 * A layout component for vertical or horizontal stacking of child elements
 * with consistent spacing and alignment options.
 */
@Component({
  tag: 'spectrum-stack',
  styleUrl: 'spectrum-stack.scss',
  shadow: true,
})
export class SpectrumStack {
  // ============== Component Properties ==============
  
  // Stack Direction
  @Prop() direction: 'vertical' | 'horizontal' | 'column' | 'row' = 'vertical';
  
  // Spacing between items
  @Prop() spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'auto' = 'md';
  
  // Alignment options
  @Prop() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
  @Prop() justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' = 'start';
  
  // Wrap behavior
  @Prop() wrap: boolean = false;
  
  // Reverse order
  @Prop() reverse: boolean = false;
  
  // Responsive behavior
  @Prop() responsive: boolean = false;
  @Prop() breakpoint: 'sm' | 'md' | 'lg' = 'md';
  
  // Debug mode
  @Prop() debug: boolean = false;

  // ============== Helper Methods ==============
  
  private getStackClasses(): string {
    const classes = ['spectrum-stack'];
    
    // Direction classes
    const dir = this.direction === 'column' ? 'vertical' : this.direction === 'row' ? 'horizontal' : this.direction;
    classes.push(`spectrum-stack--${dir}`);
    
    // Spacing classes
    classes.push(`spectrum-stack--spacing-${this.spacing}`);
    
    // Alignment classes
    classes.push(`spectrum-stack--align-${this.align}`);
    classes.push(`spectrum-stack--justify-${this.justify}`);
    
    // Wrap class
    if (this.wrap) {
      classes.push('spectrum-stack--wrap');
    }
    
    // Reverse class
    if (this.reverse) {
      classes.push('spectrum-stack--reverse');
    }
    
    // Responsive class
    if (this.responsive) {
      classes.push(`spectrum-stack--responsive-${this.breakpoint}`);
    }
    
    // Debug class
    if (this.debug) {
      classes.push('spectrum-stack--debug');
    }
    
    return classes.join(' ');
  }

  // ============== Render Method ==============
  
  render() {
    return (
      <Host>
        <div class={this.getStackClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
