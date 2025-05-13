import { Component, h, Prop, Event, EventEmitter, State, Host, Fragment } from '@stencil/core';

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
  @Prop() contextActions: { label: string; icon: string; value: string }[] = [];

  /**
   * Internal state for expanded nodes (by label path)
   */
  @State() expandedMap: { [key: string]: boolean } = {};

  /**
   * Original items before filtering
   */
  @State() originalItems: CollapsibleListItem[] = [];

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

  @State() openPopoverKey?: string;

  private popoverRefs: { [key: string]: HTMLUListElement | null } = {};
  private triggerRefs: { [key: string]: HTMLElement | null } = {};
  private outsideClickHandler = (event: MouseEvent) => {
    if (!this.openPopoverKey) return;
    const popover = this.popoverRefs[this.openPopoverKey];
    const trigger = this.triggerRefs[this.openPopoverKey];
    const path = event.composedPath();
    if (
      popover && !path.includes(popover) &&
      trigger && !path.includes(trigger)
    ) {
      this.openPopoverKey = undefined;
    }
  };

  componentDidLoad() {
    this.hostElement = (this as any).el || (this as any).host || (this as any).base || (this as any).root || (this as any);
  }

  componentDidUpdate() {
    if (this.openPopoverKey) {
      window.addEventListener('click', this.outsideClickHandler, true);
      this.positionPopoverMenu(this.openPopoverKey);
    } else {
      window.removeEventListener('click', this.outsideClickHandler, true);
      // Reset all popover positions
      Object.keys(this.popoverRefs).forEach(key => this.resetPopoverMenuPosition(key));
    }
  }

  disconnectedCallback() {
    window.removeEventListener('click', this.outsideClickHandler, true);
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

  private setPopoverRef = (key: string) => (el: HTMLUListElement | null) => {
    if (el) {
      this.popoverRefs[key] = el;
      el.addEventListener('close', this.handlePopoverClose);
    } else if (this.popoverRefs[key]) {
      this.popoverRefs[key]?.removeEventListener('close', this.handlePopoverClose);
      this.popoverRefs[key] = null;
    }
  };

  private setTriggerRef = (key: string) => (el: HTMLElement | null) => {
    this.triggerRefs[key] = el;
  };

  private getNodeKey(item: CollapsibleListItem, parentKey: string) {
    return parentKey ? `${parentKey} > ${item.label}` : item.label;
  }

  private handleParentClick(item: CollapsibleListItem, key: string, parentKey = '') {
    const isExpanded = this.expandedMap[key] ?? !!item.expanded;
    if (!isExpanded) {
      // Collapse all siblings at this level
      const newMap = { ...this.expandedMap };
      const siblingPrefix = parentKey ? parentKey + ' > ' : '';
      Object.keys(newMap).forEach(k => {
        // Only collapse direct siblings (not grandchildren)
        if (k.startsWith(siblingPrefix) && k.split(' > ').length === key.split(' > ').length) {
          newMap[k] = false;
        }
      });
      newMap[key] = true;
      this.expandedMap = newMap;
      this.expandAction.emit({ label: item.label });
    } else {
      this.expandedMap = { ...this.expandedMap, [key]: false };
      this.contractAction.emit({ label: item.label });
    }
  }

  private handleChildClick(item: CollapsibleListItem) {
    if (item.action) {
      this.childAction.emit({ action: item.action, label: item.label });
    }
  }

  private handleContextActionClick(item: CollapsibleListItem, action: { label: string; icon: string; value: string }) {
    this.contextAction.emit({ value: action.value, label: item.label });
    this.openPopoverKey = undefined;
  }

  private handlePopoverClose = () => {
    console.log('Popover close event fired');
    this.openPopoverKey = undefined;
  };

  private handleActionsIconClick(e: Event, key: string) {
    e.stopPropagation();
    if (this.openPopoverKey === key) {
      this.openPopoverKey = undefined;
    } else {
      this.openPopoverKey = key;
      // Show the popover programmatically
      setTimeout(() => {
        const popover = this.hostElement.shadowRoot?.getElementById(`popover-${key.replace(/\s+/g, '-')}`) as any;
        if (popover && typeof popover.showPopover === 'function') {
          popover.showPopover();
        }
      }, 0);
    }
  }

  private renderPopoverMenu(item: CollapsibleListItem, key: string) {
    if (!Array.isArray(this.contextActions) || this.contextActions.length === 0) return null;
    if (this.openPopoverKey !== key) return null;
    return (
      <ul
        popover=""
        id={`popover-${key.replace(/\s+/g, '-')}`}
        class="spectrum-collapsible-list__popover-menu"
        style={{ '--popover-anchor': `--anchor-${key.replace(/\s+/g, '-')}` }}
        onFocusout={this.handlePopoverClose}
        ref={this.setPopoverRef(key)}
      >
        {this.contextActions.map((action) => (
          <li 
            class="spectrum-collapsible-list__popover-menu-item" 
            key={action.value}
            onClick={e => {
              e.stopPropagation();
              this.handleContextActionClick(item, action);
            }}
          >
            {this.renderIcon(action.icon)}
            <span>{action.label}</span>
          </li>
        ))}
      </ul>
    );
  }

  private renderIcon(icon: string, outlined = false) {
    // Use Material Symbols Outlined, outlined if requested
    return (
      <span
        class={{
          'spectrum-collapsible-list__icon': true,
          'material-symbols-outlined': true,
          'spectrum-collapsible-list__icon--outlined': outlined,
        }}
        style={{
          fontVariationSettings: outlined
            ? '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24'
            : '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
        }}
      >
        {icon}
      </span>
    );
  }

  private hostElement!: HTMLElement;

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

  private renderItems(items: CollapsibleListItem[], parentKey = '') {
    const filteredItems = this.filterItems(items, this.filter);
    
    return filteredItems.map(item => {
      const key = this.getNodeKey(item, parentKey);
      const isParent = Array.isArray(item.children);
      const isExpanded = this.expandedMap[key] ?? !!item.expanded;

      return (
        <li class={`spectrum-collapsible-list__item ${isParent ? 'spectrum-collapsible-list__item--parent' : ''} ${isExpanded ? 'spectrum-collapsible-list__item--expanded' : ''}`}>
          <div 
            class="spectrum-collapsible-list__row"
            onClick={() => isParent ? this.handleParentClick(item, key, parentKey) : this.handleChildClick(item)}
            ref={this.setTriggerRef(key)}
          >
            {this.renderIcon(item.icon)}
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
                class="spectrum-collapsible-list__icon spectrum-collapsible-list__icon--outlined"
                onClick={(e) => this.handleActionsIconClick(e, key)}
              >
                more_vert
              </span>
            )}
          </div>
          {isParent && isExpanded && item.children && (
            <div class="spectrum-collapsible-list__children">
              {this.renderItems(item.children, key)}
            </div>
          )}
          {this.renderPopoverMenu(item, key)}
        </li>
      );
    });
  }

  private positionPopoverMenu(key: string) {
    const popover = this.popoverRefs[key];
    const trigger = this.triggerRefs[key];
    if (popover && trigger) {
      // Only update the gap using the theme variable
      let spacing = 8;
      const computedStyle = window.getComputedStyle(trigger);
      const spacingVar = computedStyle.getPropertyValue('--collapsible-list-spacing');
      if (spacingVar) {
        const parsed = parseFloat(spacingVar);
        if (!isNaN(parsed)) spacing = parsed;
      }
      const triggerRect = trigger.getBoundingClientRect();
      const popoverRect = popover.getBoundingClientRect();
      const left = triggerRect.right + spacing;
      const top = triggerRect.top + triggerRect.height / 2 - popoverRect.height / 2;
      popover.style.position = 'fixed';
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      popover.style.zIndex = '9999';
    }
  }

  private resetPopoverMenuPosition(key: string) {
    const popover = this.popoverRefs[key];
    if (popover) {
      popover.style.position = '';
      popover.style.left = '';
      popover.style.top = '';
      popover.style.zIndex = '';
    }
  }

  render() {
    return (
      <Host>
        <ul class="spectrum-collapsible-list__list">
          {this.renderItems(this.originalItems)}
        </ul>
      </Host>
    );
  }
}
