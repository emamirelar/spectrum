import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** View ID to navigate to */
  viewId: string;
  /** Context data for navigation */
  context?: Record<string, any>;
}

/**
 * Breadcrumb navigation component for hierarchical drill-down.
 * Displays navigation trail and allows users to navigate back through levels.
 */
@Component({
  tag: 'spectrum-breadcrumb',
  styleUrl: 'spectrum-breadcrumb.scss',
  shadow: false,
})
export class SpectrumBreadcrumb {
  /**
   * Array of breadcrumb items
   * Can be JSON string or array of objects
   */
  @Prop() items: BreadcrumbItem[] | string = [];
  
  /**
   * Configuration object (alternative to individual props)
   * Used when component is rendered by dashboard-widget-host
   */
  @Prop() config: { items?: BreadcrumbItem[]; separator?: string; maxItems?: number; showHome?: boolean; homeLabel?: string } | string;
  
  /**
   * Separator character/symbol between breadcrumbs
   */
  @Prop() separator: string = '/';
  
  /**
   * Maximum number of visible breadcrumbs (remaining collapsed)
   */
  @Prop() maxItems?: number;
  
  /**
   * Whether to show home/root link
   */
  @Prop() showHome: boolean = true;
  
  /**
   * Home link label
   */
  @Prop() homeLabel: string = 'Home';
  
  /**
   * Event emitted when a breadcrumb is clicked
   */
  @Event({
    eventName: 'breadcrumbClick',
    bubbles: true,
    composed: true,
  }) breadcrumbClick: EventEmitter<{ viewId: string; context: any; index: number }>;
  
  /**
   * Parsed breadcrumb items
   */
  private parsedItems: BreadcrumbItem[] = [];
  
  /**
   * Watch for items changes
   */
  @Watch('items')
  onItemsChange() {
    this.parseItems();
  }
  
  /**
   * Watch for config changes
   */
  @Watch('config')
  onConfigChange() {
    this.parseItems();
  }
  
  /**
   * Parse items from string or array
   */
  componentWillLoad() {
    this.parseItems();
  }
  
  /**
   * Parse items from JSON string, array, or config object
   */
  private parseItems() {
    try {
      // First, parse config if provided
      let parsedConfig: any = null;
      if (typeof this.config === 'string') {
        parsedConfig = JSON.parse(this.config);
      } else if (this.config) {
        parsedConfig = this.config;
      }
      
      // Get items from props first, then fall back to config
      if (typeof this.items === 'string' && this.items.trim()) {
        this.parsedItems = JSON.parse(this.items);
      } else if (Array.isArray(this.items) && this.items.length > 0) {
        this.parsedItems = this.items;
      } else if (parsedConfig?.items && Array.isArray(parsedConfig.items)) {
        this.parsedItems = parsedConfig.items;
      } else {
        this.parsedItems = [];
      }
      
      // Apply config settings
      if (parsedConfig) {
        if (parsedConfig.separator) {
          this.separator = parsedConfig.separator;
        }
        if (parsedConfig.showHome !== undefined) {
          this.showHome = parsedConfig.showHome;
        }
        if (parsedConfig.homeLabel) {
          this.homeLabel = parsedConfig.homeLabel;
        }
        if (parsedConfig.maxItems !== undefined) {
          this.maxItems = parsedConfig.maxItems;
        }
      }
    } catch (error) {
      console.error('[spectrum-breadcrumb] Failed to parse items:', error);
      this.parsedItems = [];
    }
  }
  
  /**
   * Handle breadcrumb click
   */
  private handleClick(item: BreadcrumbItem, index: number, event: MouseEvent) {
    event.preventDefault();
    
    this.breadcrumbClick.emit({
      viewId: item.viewId,
      context: item.context,
      index: index,
    });
  }
  
  /**
   * Get visible breadcrumb items (with collapse logic if maxItems is set)
   */
  private getVisibleItems(): Array<BreadcrumbItem | { isCollapsed: boolean }> {
    if (!this.maxItems || this.parsedItems.length <= this.maxItems) {
      return this.parsedItems;
    }
    
    // Show first item, collapsed indicator, and last (maxItems - 2) items
    const result: Array<BreadcrumbItem | { isCollapsed: boolean }> = [];
    result.push(this.parsedItems[0]);
    result.push({ isCollapsed: true } as any);
    
    const remainingCount = this.maxItems - 2;
    const startIndex = this.parsedItems.length - remainingCount;
    for (let i = startIndex; i < this.parsedItems.length; i++) {
      result.push(this.parsedItems[i]);
    }
    
    return result;
  }
  
  render() {
    const visibleItems = this.getVisibleItems();
    const itemCount = this.parsedItems.length;
    
    return (
      <Host>
        <nav class="spectrum-breadcrumb" aria-label="Breadcrumb">
          <ol class="spectrum-breadcrumb__list">
            {this.showHome && itemCount > 0 && (
              <li class="spectrum-breadcrumb__item">
                <a
                  href="#"
                  class="spectrum-breadcrumb__link"
                  onClick={(e) => this.handleClick({ label: this.homeLabel, viewId: 'home' }, -1, e)}
                  aria-label="Navigate to home"
                >
                  {this.homeLabel}
                </a>
                <span class="spectrum-breadcrumb__separator" aria-hidden="true">
                  {this.separator}
                </span>
              </li>
            )}
            
            {visibleItems.map((item, index) => {
              // Handle collapsed indicator
              if ('isCollapsed' in item && item.isCollapsed) {
                return (
                  <li class="spectrum-breadcrumb__item spectrum-breadcrumb__item--collapsed">
                    <span class="spectrum-breadcrumb__ellipsis" aria-label="More items">
                      ...
                    </span>
                    <span class="spectrum-breadcrumb__separator" aria-hidden="true">
                      {this.separator}
                    </span>
                  </li>
                );
              }
              
              const breadcrumbItem = item as BreadcrumbItem;
              const isLast = index === visibleItems.length - 1;
              const actualIndex = this.maxItems && index > 1 
                ? this.parsedItems.length - (visibleItems.length - index)
                : index;
              
              return (
                <li class="spectrum-breadcrumb__item">
                  {!isLast ? (
                    <a
                      href="#"
                      class="spectrum-breadcrumb__link"
                      onClick={(e) => this.handleClick(breadcrumbItem, actualIndex, e)}
                      aria-label={`Navigate to ${breadcrumbItem.label}`}
                    >
                      {breadcrumbItem.label}
                    </a>
                  ) : (
                    <span class="spectrum-breadcrumb__current" aria-current="page">
                      {breadcrumbItem.label}
                    </span>
                  )}
                  
                  {!isLast && (
                    <span class="spectrum-breadcrumb__separator" aria-hidden="true">
                      {this.separator}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Host>
    );
  }
}

