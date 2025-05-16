import { Component, h, Prop, Event, EventEmitter, State, Host, Fragment, Listen, Element } from '@stencil/core';
import { ContextMenuAction } from '../spectrum-context-menu/spectrum-context-menu';

/**
 * Collapsible List Item interface
 */
export interface CollapsibleListItem {
  label: string;
  icon?: string;
  action?: string;
  expanded?: boolean;
  children?: CollapsibleListItem[];
}

@Component({
  tag: 'spectrum-collapsible-list',
  styleUrl: 'spectrum-collapsible-list.scss',
  shadow: true,
})
export class SpectrumCollapsibleList {
  /**
   * The nested data structure for the list
   */
  @Prop() items: CollapsibleListItem[] = [];

  /**
   * Filter value to filter list items
   */
  @Prop() filter: string = '';

  /**
   * Context actions for all leaf nodes
   */
  @Prop() contextActions: ContextMenuAction[] = [];

  /**
   * Controls whether expanding one parent collapses other parents at the same level
   * Default is true (mutually exclusive expansion)
   */
  @Prop() mutuallyExclusive: boolean = true;

  /**
   * Internal state for expanded nodes (by label path)
   */
  @State() expandedMap: { [key: string]: boolean } = {};

  /**
   * Original items before filtering
   */
  @State() originalItems: CollapsibleListItem[] = [];

  /**
   * Currently open context menu key
   */
  @State() openContextMenuKey?: string;

  /**
   * Host element reference
   */
  @Element() hostElement!: HTMLElement;

  /**
   * Event emitted when a child node is clicked
   */
  @Event({ eventName: 'child-action' }) childAction: EventEmitter<{ action: string; label: string; }>; // eslint-disable-line

  /**
   * Event emitted when a parent node is expanded
   */
  @Event({ eventName: 'expand-action' }) expandAction: EventEmitter<{ label: string; }>; // eslint-disable-line

  /**
   * Event emitted when a parent node is contracted
   */
  @Event({ eventName: 'contract-action' }) contractAction: EventEmitter<{ label: string; }>; // eslint-disable-line

  /**
   * Event emitted when a context action is clicked
   */
  @Event({ eventName: 'context-action' }) contextAction: EventEmitter<{ value: string; label: string }>; // eslint-disable-line

  // Reference to the single context menu instance
  private contextMenuRef: HTMLSpectrumContextMenuElement | null = null;
  
  // Store references to context menu trigger icons by key
  private contextMenuIconRefs: { [key: string]: HTMLElement | null } = {};
  
  // Generic trigger references for list items
  private triggerRefs: { [key: string]: HTMLElement | null } = {};

  /**
   * Listen for context menu action clicks
   */
  @Listen('action-click')
  handleActionClick(event: CustomEvent<{ value: string; targetKey: string }>) {
    // Extract the item from the targetKey
    const targetKey = event.detail.targetKey;
    const itemPath = targetKey.split(' > ');
    const itemLabel = itemPath[itemPath.length - 1];
    
    this.contextAction.emit({ 
      value: event.detail.value, 
      label: itemLabel 
    });
    
    this.openContextMenuKey = undefined;
  }

  /**
   * Listen for context menu close events
   */
  @Listen('menu-close')
  handleMenuClose() {
    this.openContextMenuKey = undefined;
  }

  componentDidLoad() {
    // No need to store the host element anymore
  }

  componentWillLoad() {
    // Store original items when component loads
    this.originalItems = [...this.items];
  }

  componentWillUpdate() {
    // Update original items when items prop changes
    if (JSON.stringify(this.items) !== JSON.stringify(this.originalItems)) {
      this.originalItems = [...this.items];
    }
  }

  /**
   * Set reference to the context menu component
   */
  private setContextMenuRef = (el: HTMLSpectrumContextMenuElement | null) => {
    this.contextMenuRef = el;
  };

  /**
   * Set reference to a context menu icon for a specific item key
   */
  private setContextMenuIconRef = (key: string) => (el: HTMLElement | null) => {
    this.contextMenuIconRefs[key] = el;
  };

  /**
   * Set reference to a list item row
   */
  private setTriggerRef = (key: string) => (el: HTMLElement | null) => {
    this.triggerRefs[key] = el;
  };

  /**
   * Get a unique key for a node based on its path
   */
  private getNodeKey(item: CollapsibleListItem, parentKey: string) {
    return parentKey ? `${parentKey} > ${item.label}` : item.label;
  }

  /**
   * Handle click on a parent node (expand/collapse)
   */
  private handleParentClick(item: CollapsibleListItem, key: string, parentKey = '') {
    const isExpanded = this.expandedMap[key] ?? !!item.expanded;
    
    if (!isExpanded) {
      // Create a new map to avoid direct mutation
      const newMap = { ...this.expandedMap };
      
      // If mutually exclusive, collapse siblings at this level
      if (this.mutuallyExclusive) {
        const siblingPrefix = parentKey ? parentKey + ' > ' : '';
        Object.keys(newMap).forEach(k => {
          // Only collapse direct siblings (not descendants)
          if (k.startsWith(siblingPrefix) && k.split(' > ').length === key.split(' > ').length) {
            newMap[k] = false;
          }
        });
      }
      
      // Expand the clicked item
      newMap[key] = true;
      this.expandedMap = newMap;
      this.expandAction.emit({ label: item.label });
    } else {
      // Just collapse this item
      this.expandedMap = { ...this.expandedMap, [key]: false };
      this.contractAction.emit({ label: item.label });
    }
  }

  /**
   * Handle click on a child (leaf) node
   */
  private handleChildClick(item: CollapsibleListItem) {
    if (item.action) {
      this.childAction.emit({ action: item.action, label: item.label });
    }
  }

  /**
   * Handle click on the context menu icon
   */
  private handleActionsIconClick(e: Event, key: string) {
    e.stopPropagation();
    e.preventDefault();
    
    // If the same menu is already open, close it
    if (this.openContextMenuKey === key) {
      this.contextMenuRef?.close();
      this.openContextMenuKey = undefined;
      return;
    }
    
    // Close any open menu
    if (this.openContextMenuKey && this.contextMenuRef) {
      this.contextMenuRef.close();
    }
    
    // Get the icon element for this item
    const iconElement = this.contextMenuIconRefs[key];
    if (!iconElement || !this.contextMenuRef) {
      console.warn('Missing icon element or context menu for key:', key);
      return;
    }
    
    // Get the icon position
    const iconRect = iconElement.getBoundingClientRect();
    
    // Calculate the menu position - to the right of the icon, centered vertically
    const menuX = iconRect.right;
    const menuY = iconRect.top + (iconRect.height / 2);
    
    // Set the target key for the context menu
    this.contextMenuRef.targetKey = key;
    
    console.log(`Opening context menu for key ${key} at position:`, { 
      x: menuX, 
      y: menuY, 
      iconRect: {
        left: Math.round(iconRect.left),
        top: Math.round(iconRect.top),
        right: Math.round(iconRect.right),
        bottom: Math.round(iconRect.bottom),
        width: Math.round(iconRect.width),
        height: Math.round(iconRect.height)
      }
    });
    
    // First set the trigger reference
    this.contextMenuRef.setTriggerRef(iconElement)
      .then(() => {
        // Open the menu (this renders the menu element)
        return this.contextMenuRef?.open();
      })
      .then(() => {
        // Position directly using coordinates after a short delay to ensure the menu is rendered
        setTimeout(() => {
          this.contextMenuRef?.positionAtCoordinates(menuX, menuY)
            .then(() => {
              this.openContextMenuKey = key;
            })
            .catch(err => {
              console.error('Error positioning menu at coordinates:', err);
            });
        }, 10);
      })
      .catch(err => {
        console.error('Error opening context menu:', err);
      });
  }

  /**
   * Render an icon with Material Symbols
   */
  private renderIcon(icon: string, isChild = false, outlined = false) {
    // Use Material Symbols Outlined, outlined if requested or if it's a child node
    return (
      <span
        class={{
          'spectrum-collapsible-list__icon': true,
          'material-symbols-outlined': true,
          'spectrum-collapsible-list__icon--outlined': isChild || outlined,
        }}
        style={{
          fontVariationSettings: (isChild || outlined)
            ? '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24'
            : '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
        }}
      >
        {icon}
      </span>
    );
  }

  /**
   * Filter items based on search term
   */
  private filterItems(items: CollapsibleListItem[], filter: string): CollapsibleListItem[] {
    if (!filter) return items;
    
    const lowerFilter = filter.toLowerCase();
    
    return items.map(item => {
      // Always include parent items, but with filtered children
      if (item.children && item.children.length > 0) {
        const filteredChildren = this.filterItems(item.children, filter)
          .filter(child => child !== null) as CollapsibleListItem[];
        
        // Only return parent if it has matching children or its label matches
        if (filteredChildren.length > 0 || item.label.toLowerCase().includes(lowerFilter)) {
          return {
            ...item,
            children: filteredChildren
          };
        }
        // Return parent with empty children if it matches the filter
        else if (item.label.toLowerCase().includes(lowerFilter)) {
          return {
            ...item,
            children: []
          };
        }
        // Skip parent if it has no matching children and doesn't match itself
        return null;
      }
      
      // For leaf items, only include if label matches filter
      return item.label.toLowerCase().includes(lowerFilter) ? item : null;
    }).filter(Boolean) as CollapsibleListItem[];
  }

  /**
   * Render a list of items with proper hierarchy
   */
  private renderItems(items: CollapsibleListItem[], parentKey = '') {
    const filteredItems = this.filterItems(items, this.filter);
    
    return filteredItems.map(item => {
      const key = this.getNodeKey(item, parentKey);
      const isParent = Array.isArray(item.children);
      const isExpanded = this.expandedMap[key] ?? !!item.expanded;
      const contextIconId = `context-icon-${key.replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;

      return (
        <li class={`spectrum-collapsible-list__item ${isParent ? 'spectrum-collapsible-list__item--parent' : ''} ${isExpanded ? 'spectrum-collapsible-list__item--expanded' : ''}`}>
          <div 
            class="spectrum-collapsible-list__row"
            onClick={() => isParent ? this.handleParentClick(item, key, parentKey) : this.handleChildClick(item)}
            ref={this.setTriggerRef(key)}
          >
            {this.renderIcon(item.icon, !isParent)}
            <span class="spectrum-collapsible-list__label">{item.label}</span>
            {isParent && (
              <>
                <span class="spectrum-collapsible-list__child-count">{item.children?.length}</span>
                <span class={`spectrum-collapsible-list__icon spectrum-collapsible-list__expand-icon spectrum-collapsible-list__icon--outlined ${isExpanded ? 'spectrum-collapsible-list__icon--expanded' : ''}`}>
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </>
            )}
            {!isParent && this.contextActions?.length > 0 && (
              <span 
                class="spectrum-collapsible-list__icon spectrum-collapsible-list__icon--outlined spectrum-collapsible-list__context-icon"
                onClick={(e) => this.handleActionsIconClick(e, key)}
                ref={this.setContextMenuIconRef(key)}
                id={contextIconId}
              >
                more_vert
              </span>
            )}
          </div>
          {isParent && isExpanded && item.children && (
            <div class="spectrum-collapsible-list__children">
              {this.renderItems(item.children.map(child => ({
                ...child,
                icon: child.icon || item.icon // Inherit parent's icon if child doesn't have one
              })), key)}
            </div>
          )}
        </li>
      );
    });
  }

  render() {
    return (
      <Host>
        <ul class="spectrum-collapsible-list__list">
          {this.renderItems(this.originalItems)}
        </ul>
        
        {/* Single reusable context menu for all items */}
        {this.contextActions?.length > 0 && (
          <spectrum-context-menu
            ref={this.setContextMenuRef}
            actions={this.contextActions}
            targetKey=""
            isOpen={false}
            position="right"
          ></spectrum-context-menu>
        )}
      </Host>
    );
  }
}
