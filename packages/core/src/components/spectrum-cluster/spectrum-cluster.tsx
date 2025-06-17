import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Spectrum Cluster Component
 * A layout component for clustering items together with consistent spacing,
 * natural wrapping, and flexible alignment options.
 */
@Component({
  tag: 'spectrum-cluster',
  styleUrl: 'spectrum-cluster.scss',
  shadow: true,
})
export class SpectrumCluster {
  // ============== Component Properties ==============
  
  // Spacing between items
  @Prop() spacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = 'md';
  
  // Alignment
  @Prop() align: 'start' | 'center' | 'end' = 'start';
  @Prop() justify: 'start' | 'center' | 'end' | 'space-between' | 'space-around' = 'start';
  
  // Wrapping behavior
  @Prop() wrap: boolean = true;
  @Prop() noWrap: boolean = false;
  
  // Direction preference
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';
  
  // Responsive behavior
  @Prop() responsive: boolean = false;
  @Prop() breakpoint: 'sm' | 'md' | 'lg' = 'md';
  @Prop() stackBelow: boolean = false;
  
  // Container properties
  @Prop() fullWidth: boolean = false;
  @Prop() centerContainer: boolean = false;
  
  // Debug mode
  @Prop() debug: boolean = false;

  // ============== Helper Methods ==============
  
  private getClusterClasses(): string {
    const classes = ['spectrum-cluster'];
    
    // Direction
    classes.push(`spectrum-cluster--${this.direction}`);
    
    // Spacing
    if (this.isCustomSpacing(this.spacing)) {
      classes.push('spectrum-cluster--spacing-custom');
    } else {
      classes.push(`spectrum-cluster--spacing-${this.spacing}`);
    }
    
    // Alignment
    classes.push(`spectrum-cluster--align-${this.align}`);
    classes.push(`spectrum-cluster--justify-${this.justify}`);
    
    // Wrapping
    if (this.noWrap || !this.wrap) {
      classes.push('spectrum-cluster--no-wrap');
    } else {
      classes.push('spectrum-cluster--wrap');
    }
    
    // Container properties
    if (this.fullWidth) {
      classes.push('spectrum-cluster--full-width');
    }
    
    if (this.centerContainer) {
      classes.push('spectrum-cluster--center-container');
    }
    
    // Responsive
    if (this.responsive) {
      classes.push(`spectrum-cluster--responsive-${this.breakpoint}`);
    }
    
    if (this.stackBelow) {
      classes.push('spectrum-cluster--stack-below');
    }
    
    // Debug
    if (this.debug) {
      classes.push('spectrum-cluster--debug');
    }
    
    return classes.join(' ');
  }
  
  private isCustomSpacing(value: string): boolean {
    return !['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value);
  }
  
  private getCustomStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    // Custom spacing
    if (this.isCustomSpacing(this.spacing)) {
      styles['--cluster-spacing-custom'] = this.spacing;
    }
    
    return styles;
  }

  // ============== Render Method ==============
  
  render() {
    const customStyles = this.getCustomStyles();
    
    return (
      <Host style={customStyles}>
        <div class={this.getClusterClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
