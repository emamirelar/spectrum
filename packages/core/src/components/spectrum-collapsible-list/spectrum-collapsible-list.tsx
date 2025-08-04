import { Component, h, Prop, Event, EventEmitter, State, Host, Fragment, Element, Listen } from '@stencil/core';
import { ContextMenuAction } from '../spectrum-context-menu/spectrum-context-menu';

/**
 * Collapsible List Item interface
 */
export interface CollapsibleListItem {
  label: string;
  icon?: string;
  action?: string;
  id: string;
  expanded?: boolean;
  children?: CollapsibleListItem[];
  contextActions?: ContextMenuAction[]; // Optional per-parent context actions
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
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Internal state for expanded nodes (by label path)
   */
  @State() expandedMap: { [key: string]: boolean } = {};

  /**
   * Original items before filtering
   */
  @State() originalItems: CollapsibleListItem[] = [];

  /**
   * State to track which item is being edited (by item id)
   */
  @State() editingItemId: string | null = null;

  /**
   * State to store the original name when editing starts
   */
  @State() originalEditingName: string = '';

  /**
   * Host element reference
   */
  @Element() hostElement!: HTMLElement;

  /**
   * Event emitted when a child node is clicked
   */
  @Event({
    eventName: 'childAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) childAction: EventEmitter<{ action: string; label: string; id: string }>;

  /**
   * Event emitted when a parent node is expanded
   */
  @Event({
    eventName: 'expandAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) expandAction: EventEmitter<{ action: string; label: string; id: string }>;

  /**
   * Event emitted when a parent node is contracted
   */
  @Event({
    eventName: 'contractAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) contractAction: EventEmitter<{ action: string; label: string; id: string }>;

  /**
   * Event emitted when a context action is clicked
   */
  @Event({
    eventName: 'contextAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) contextAction: EventEmitter<{ action: string; label: string; id: string }>;

  /**
   * Event emitted when an item is renamed
   */
  @Event({
    eventName: 'itemRenamed',
    composed: true,
    cancelable: true,
    bubbles: true
  }) itemRenamed: EventEmitter<{ action: string; id: string; oldName: string; newName: string }>;

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
   * Get a unique key for a node based on its path
   */
  private getNodeKey(item: CollapsibleListItem, parentKey: string) {
    const label = item.label || 'untitled';
    return parentKey ? `${parentKey} > ${label}` : label;
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
      this.expandAction.emit({ action: 'expand', label: item.label, id: item.id });
    } else {
      // Just collapse this item
      this.expandedMap = { ...this.expandedMap, [key]: false };
      this.contractAction.emit({ action: 'contract', label: item.label, id: item.id });
    }
  }

  /**
   * Handle click on a child (leaf) node
   */
  private handleChildClick(item: CollapsibleListItem) {
    if (item.action) {
      this.childAction.emit({ action: item.action, label: item.label, id: item.id });
    }
  }

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-collapsible-list] ${message}`, ...args);
    }
  }

  /**
   * Debug warning utility
   */
  private debugWarn(message: string, ...args: any[]) {
    if (this.debug) {
      console.warn(`[spectrum-collapsible-list] ${message}`, ...args);
    }
  }

  /**
   * Handle click on the context menu icon
   */
  private async handleActionsIconClick(e: MouseEvent, item: CollapsibleListItem, actions?: ContextMenuAction[]) {
    e.stopPropagation();
    e.preventDefault();
    const iconElement = e.currentTarget as HTMLElement;
    if (!iconElement) {
      this.debugWarn('Missing icon element for item:', item);
      return;
    }

    // Create or get the global context menu
    let menu = document.querySelector('spectrum-context-menu') as any;
    if (!menu) {
      menu = document.createElement('spectrum-context-menu');
      document.body.appendChild(menu);
    }

    // Check if the menu is already open
    let isOpen = false;
    if (typeof menu['isMenuOpen'] === 'function') {
      isOpen = await menu['isMenuOpen']();
    }

    if (isOpen) {
      // If menu is open, hide it
      if (typeof menu['hide'] === 'function') {
        menu['hide']();
      } else {
        this.debugWarn('Global context menu exists but hide method is not available');
      }
    } else {
      // If menu is closed, show it
      const iconRect = iconElement.getBoundingClientRect();
      if (typeof menu['show'] === 'function') {
        menu['show'](actions, iconRect.right, iconRect.top + iconRect.height / 2, item.id);
      } else {
        this.debugWarn('Global context menu exists but show method is not available');
      }
    }
  }

  /**
   * Start editing an item
   */
  private startEditing(item: CollapsibleListItem) {
    this.editingItemId = item.id;
    this.originalEditingName = item.label;
    
    // Force a re-render and then focus the input
    setTimeout(() => {
      const input = this.hostElement.shadowRoot?.querySelector(`#edit-input-${item.id}`) as HTMLInputElement;
      if (input) {
        input.focus();
        input.select();
        
        this.debugLog(`Started editing item: ${item.label} (id: ${item.id})`);
      } else {
        this.debugWarn(`Could not find input element for item: ${item.id}`);
        // Try again with a longer delay
        setTimeout(() => {
          const retryInput = this.hostElement.shadowRoot?.querySelector(`#edit-input-${item.id}`) as HTMLInputElement;
          if (retryInput) {
            retryInput.focus();
            retryInput.select();
          }
        }, 100);
      }
    }, 50); // Increased timeout to allow for proper rendering
  }

  /**
   * Complete the rename operation
   */
  private completeRename(newName: string) {
    if (this.editingItemId && newName.trim() !== '') {
      const trimmedName = newName.trim();
      
      this.debugLog(`Completing rename for ${this.editingItemId}: "${this.originalEditingName}" -> "${trimmedName}"`);
      
      // Only emit if the name actually changed
      if (trimmedName !== this.originalEditingName) {
        const renameEvent = {
          action: 'rename',
          id: this.editingItemId,
          oldName: this.originalEditingName,
          newName: trimmedName
        };
        
        this.debugLog(`Emitting itemRenamed event:`, renameEvent);
        
        this.itemRenamed.emit(renameEvent);
      } else {
        this.debugLog(`Name unchanged, not emitting event`);
      }
    } else {
      this.debugLog(`Rename cancelled - empty name or no editing item`);
    }
    
    // Reset editing state
    this.editingItemId = null;
    this.originalEditingName = '';
  }

  /**
   * Cancel the rename operation
   */
  private cancelRename() {
    this.editingItemId = null;
    this.originalEditingName = '';
  }

  /**
   * Handle key events during editing
   */
  private handleEditKeyDown(e: KeyboardEvent, currentValue: string) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.completeRename(currentValue);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.cancelRename();
    }
  }

  /**
   * Handle blur event during editing
   */
  private handleEditBlur(e: FocusEvent) {
    const input = e.target as HTMLInputElement;
    this.completeRename(input.value);
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
        if (filteredChildren.length > 0 || (item.label || '').toLowerCase().includes(lowerFilter)) {
          return {
            ...item,
            children: filteredChildren
          };
        }
        // Return parent with empty children if it matches the filter
        else if ((item.label || '').toLowerCase().includes(lowerFilter)) {
          return {
            ...item,
            children: []
          };
        }
        // Skip parent if it has no matching children and doesn't match itself
        return null;
      }
      
      // For leaf items, only include if label matches filter
      return (item.label || '').toLowerCase().includes(lowerFilter) ? item : null;
    }).filter(Boolean) as CollapsibleListItem[];
  }

  /**
   * Render a list of items with proper hierarchy
   */
  private renderItems(items: CollapsibleListItem[], parentKey = '', parentContextActions?: ContextMenuAction[]) {
    const filteredItems = this.filterItems(items, this.filter);
    
    return filteredItems.map(item => {
      const key = this.getNodeKey(item, parentKey);
      const isParent = Array.isArray(item.children);
      const isExpanded = this.expandedMap[key] ?? !!item.expanded;
      const contextIconId = `context-icon-${(key || 'unknown').replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`;
      // Determine context actions for this branch
      const currentContextActions = item.contextActions || parentContextActions || this.contextActions;

      return (
        <li class={`spectrum-collapsible-list__item ${isParent ? 'spectrum-collapsible-list__item--parent' : ''} ${isExpanded ? 'spectrum-collapsible-list__item--expanded' : ''}`}>
          <div 
            class="spectrum-collapsible-list__row"
            onClick={() => isParent ? this.handleParentClick(item, key, parentKey) : this.handleChildClick(item)}
          >
            {this.renderIcon(item.icon, !isParent)}
            {this.editingItemId === item.id ? (
              <input
                id={`edit-input-${item.id}`}
                class="spectrum-collapsible-list__edit-input"
                type="text"
                value={item.label || ''}
                onKeyDown={(e) => this.handleEditKeyDown(e, (e.target as HTMLInputElement).value)}
                onBlur={(e) => this.handleEditBlur(e)}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span class="spectrum-collapsible-list__label">{item.label || 'Untitled'}</span>
            )}
            {isParent && (
              <>
                <span class="spectrum-collapsible-list__child-count">{item.children?.length}</span>
                <span class={`spectrum-collapsible-list__icon spectrum-collapsible-list__expand-icon spectrum-collapsible-list__icon--outlined ${isExpanded ? 'spectrum-collapsible-list__icon--expanded' : ''}`}>
                  {isExpanded ? 'expand_less' : 'expand_more'}
                </span>
              </>
            )}
            {!isParent && currentContextActions?.length > 0 && (
              <span 
                class="spectrum-collapsible-list__icon spectrum-collapsible-list__icon--outlined spectrum-collapsible-list__context-icon"
                onClick={(e) => this.handleActionsIconClick(e, item, currentContextActions)}
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
              })), key, item.contextActions || parentContextActions)}
            </div>
          )}
        </li>
      );
    });
  }

  /**
   * Handle context menu action clicks
   */
  @Listen('actionClick', { target: 'document' })
  handleContextAction(event: CustomEvent<{ action: string; targetKey: string }>) {
    // Find the leaf node in our items array
    const findNode = (items: CollapsibleListItem[], key: string): CollapsibleListItem | undefined => {
      for (const item of items) {
        if (item.children) {
          for (const child of item.children) {
            if (child.id === key) {
              return child;
            }
          }
          const result = findNode(item.children, key);
          if (result) return result;
        }
      }
      return undefined;
    };

    // Find the node
    const node = findNode(this.originalItems, event.detail.targetKey);
    if (!node) {
      this.debugWarn('Could not find node for target key:', event.detail.targetKey);
      return;
    }

    // Check if this is a rename action
    if (event.detail.action === 'rename') {
      this.startEditing(node);
      return;
    }

    // Emit our own event with the action and the node's properties
    this.contextAction.emit({ 
      action: event.detail.action, 
      label: node.label, 
      id: node.id 
    });
  }

  render() {
    return (
      <Host>
        <ul class="spectrum-collapsible-list__list">
          {this.renderItems(this.originalItems)}
        </ul>
        {/* No context menu rendered here; singleton is used globally */}
      </Host>
    );
  }
}
