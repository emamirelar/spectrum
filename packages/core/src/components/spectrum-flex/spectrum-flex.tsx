import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Spectrum Flex Component
 * An advanced flexbox layout component with comprehensive flex properties,
 * responsive behavior, and fine-grained control over flex container and items.
 */
@Component({
  tag: 'spectrum-flex',
  styleUrl: 'spectrum-flex.scss',
  shadow: true,
})
export class SpectrumFlex {
  // ============== Component Properties ==============
  
  // Flex Direction
  @Prop() direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  
  // Flex Wrap
  @Prop() wrap: 'nowrap' | 'wrap' | 'wrap-reverse' = 'nowrap';
  
  // Justify Content (main axis)
  @Prop() justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' = 'flex-start';
  
  // Align Items (cross axis)
  @Prop() align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' = 'stretch';
  
  // Align Content (when wrapped)
  @Prop() alignContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch' = 'stretch';
  
  // Gap between items
  @Prop() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = 'md';
  @Prop() rowGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = '';
  @Prop() columnGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = '';
  
  // Flex container properties
  @Prop() inline: boolean = false;
  @Prop() fullHeight: boolean = false;
  @Prop() fullWidth: boolean = false;
  
  // Responsive behavior
  @Prop() responsive: boolean = false;
  @Prop() breakpoint: 'sm' | 'md' | 'lg' = 'md';
  @Prop() mobileDirection: 'row' | 'column' = 'column';
  
  // Debug mode
  @Prop() debug: boolean = false;

  // ============== Helper Methods ==============
  
  private getFlexClasses(): string {
    const classes = ['spectrum-flex'];
    
    // Display type
    if (this.inline) {
      classes.push('spectrum-flex--inline');
    }
    
    // Direction
    classes.push(`spectrum-flex--direction-${this.direction}`);
    
    // Wrap
    classes.push(`spectrum-flex--wrap-${this.wrap}`);
    
    // Justify content
    classes.push(`spectrum-flex--justify-${this.justify}`);
    
    // Align items
    classes.push(`spectrum-flex--align-${this.align}`);
    
    // Align content
    if (this.wrap !== 'nowrap') {
      classes.push(`spectrum-flex--align-content-${this.alignContent}`);
    }
    
    // Gap classes
    if (this.gap && this.gap !== 'none') {
      if (this.isCustomGap(this.gap)) {
        classes.push('spectrum-flex--gap-custom');
      } else {
        classes.push(`spectrum-flex--gap-${this.gap}`);
      }
    }
    
    if (this.rowGap) {
      if (this.isCustomGap(this.rowGap)) {
        classes.push('spectrum-flex--row-gap-custom');
      } else {
        classes.push(`spectrum-flex--row-gap-${this.rowGap}`);
      }
    }
    
    if (this.columnGap) {
      if (this.isCustomGap(this.columnGap)) {
        classes.push('spectrum-flex--column-gap-custom');
      } else {
        classes.push(`spectrum-flex--column-gap-${this.columnGap}`);
      }
    }
    
    // Size modifiers
    if (this.fullHeight) {
      classes.push('spectrum-flex--full-height');
    }
    
    if (this.fullWidth) {
      classes.push('spectrum-flex--full-width');
    }
    
    // Responsive
    if (this.responsive) {
      classes.push(`spectrum-flex--responsive-${this.breakpoint}`);
      classes.push(`spectrum-flex--mobile-${this.mobileDirection}`);
    }
    
    // Debug
    if (this.debug) {
      classes.push('spectrum-flex--debug');
    }
    
    return classes.join(' ');
  }
  
  private isCustomGap(value: string): boolean {
    return !['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value);
  }
  
  private getCustomStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    // Custom gap values
    if (this.gap && this.isCustomGap(this.gap)) {
      styles['--flex-gap-custom'] = this.gap;
    }
    
    if (this.rowGap && this.isCustomGap(this.rowGap)) {
      styles['--flex-row-gap-custom'] = this.rowGap;
    }
    
    if (this.columnGap && this.isCustomGap(this.columnGap)) {
      styles['--flex-column-gap-custom'] = this.columnGap;
    }
    
    return styles;
  }

  // ============== Render Method ==============
  
  render() {
    const customStyles = this.getCustomStyles();
    
    return (
      <Host style={customStyles}>
        <div class={this.getFlexClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
