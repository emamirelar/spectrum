import { Component, Host, h, Prop } from '@stencil/core';

/**
 * Spectrum Grid Component
 * A comprehensive CSS Grid layout component with support for grid templates,
 * areas, responsive behavior, and auto-sizing capabilities.
 */
@Component({
  tag: 'spectrum-grid',
  styleUrl: 'spectrum-grid.scss',
  shadow: true,
})
export class SpectrumGrid {
  // ============== Component Properties ==============
  
  // Grid Template Columns
  @Prop() columns: string = '1fr';
  @Prop() minColumnWidth: string = '';
  @Prop() autoColumns: string = '';
  
  // Grid Template Rows
  @Prop() rows: string = '';
  @Prop() minRowHeight: string = '';
  @Prop() autoRows: string = '';
  
  // Grid Areas
  @Prop() areas: string = '';
  
  // Gap properties
  @Prop() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = 'md';
  @Prop() rowGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = '';
  @Prop() columnGap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string = '';
  
  // Alignment properties
  @Prop() alignItems: 'start' | 'end' | 'center' | 'stretch' = 'stretch';
  @Prop() justifyItems: 'start' | 'end' | 'center' | 'stretch' = 'stretch';
  @Prop() alignContent: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly' = 'stretch';
  @Prop() justifyContent: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly' = 'stretch';
  
  // Auto-fit and auto-fill
  @Prop() autoFit: boolean = false;
  @Prop() autoFill: boolean = false;
  
  // Responsive behavior
  @Prop() responsive: boolean = false;
  @Prop() breakpoint: 'sm' | 'md' | 'lg' = 'md';
  @Prop() mobileColumns: string = '1fr';
  
  // Container properties
  @Prop() fullHeight: boolean = false;
  @Prop() fullWidth: boolean = false;
  @Prop() inline: boolean = false;
  
  // Debug mode
  @Prop() debug: boolean = false;

  // ============== Helper Methods ==============
  
  private getGridClasses(): string {
    const classes = ['spectrum-grid'];
    
    // Display type
    if (this.inline) {
      classes.push('spectrum-grid--inline');
    }
    
    // Auto-sizing
    if (this.autoFit) {
      classes.push('spectrum-grid--auto-fit');
    }
    
    if (this.autoFill) {
      classes.push('spectrum-grid--auto-fill');
    }
    
    // Gap classes
    if (this.gap && this.gap !== 'none') {
      if (this.isCustomValue(this.gap)) {
        classes.push('spectrum-grid--gap-custom');
      } else {
        classes.push(`spectrum-grid--gap-${this.gap}`);
      }
    }
    
    if (this.rowGap) {
      if (this.isCustomValue(this.rowGap)) {
        classes.push('spectrum-grid--row-gap-custom');
      } else {
        classes.push(`spectrum-grid--row-gap-${this.rowGap}`);
      }
    }
    
    if (this.columnGap) {
      if (this.isCustomValue(this.columnGap)) {
        classes.push('spectrum-grid--column-gap-custom');
      } else {
        classes.push(`spectrum-grid--column-gap-${this.columnGap}`);
      }
    }
    
    // Alignment classes
    classes.push(`spectrum-grid--align-items-${this.alignItems}`);
    classes.push(`spectrum-grid--justify-items-${this.justifyItems}`);
    classes.push(`spectrum-grid--align-content-${this.alignContent}`);
    classes.push(`spectrum-grid--justify-content-${this.justifyContent}`);
    
    // Size modifiers
    if (this.fullHeight) {
      classes.push('spectrum-grid--full-height');
    }
    
    if (this.fullWidth) {
      classes.push('spectrum-grid--full-width');
    }
    
    // Responsive
    if (this.responsive) {
      classes.push(`spectrum-grid--responsive-${this.breakpoint}`);
    }
    
    // Debug
    if (this.debug) {
      classes.push('spectrum-grid--debug');
    }
    
    return classes.join(' ');
  }
  
  private isCustomValue(value: string): boolean {
    return !['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value);
  }
  
  private getGridTemplateColumns(): string {
    if (this.autoFit && this.minColumnWidth) {
      return `repeat(auto-fit, minmax(${this.minColumnWidth}, 1fr))`;
    }
    
    if (this.autoFill && this.minColumnWidth) {
      return `repeat(auto-fill, minmax(${this.minColumnWidth}, 1fr))`;
    }
    
    return this.columns;
  }
  
  private getCustomStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    // Grid template columns
    const templateColumns = this.getGridTemplateColumns();
    if (templateColumns) {
      styles['--grid-template-columns'] = templateColumns;
    }
    
    // Grid template rows
    if (this.rows) {
      styles['--grid-template-rows'] = this.rows;
    }
    
    // Grid template areas
    if (this.areas) {
      styles['--grid-template-areas'] = this.areas;
    }
    
    // Auto columns and rows
    if (this.autoColumns) {
      styles['--grid-auto-columns'] = this.autoColumns;
    }
    
    if (this.autoRows) {
      styles['--grid-auto-rows'] = this.autoRows;
    }
    
    // Custom gap values
    if (this.gap && this.isCustomValue(this.gap)) {
      styles['--grid-gap-custom'] = this.gap;
    }
    
    if (this.rowGap && this.isCustomValue(this.rowGap)) {
      styles['--grid-row-gap-custom'] = this.rowGap;
    }
    
    if (this.columnGap && this.isCustomValue(this.columnGap)) {
      styles['--grid-column-gap-custom'] = this.columnGap;
    }
    
    // Responsive mobile columns
    if (this.responsive && this.mobileColumns) {
      styles['--grid-mobile-columns'] = this.mobileColumns;
    }
    
    return styles;
  }

  // ============== Render Method ==============
  
  render() {
    const customStyles = this.getCustomStyles();
    
    return (
      <Host style={customStyles}>
        <div class={this.getGridClasses()}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
