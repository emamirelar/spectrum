import { Component, h, Prop, Event, EventEmitter, State, Host } from '@stencil/core';

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
   * Context actions for all leaf nodes
   */
  @Prop() contextActions: { label: string; icon: string; value: string }[] = [];

  /**
   * Internal state for expanded nodes (by label path)
   */
  @State() expandedMap: { [key: string]: boolean } = {};

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

  private renderList(items: CollapsibleListItem[], parentKey = '', parentIcon?: string) {
    return (
      <ul class="spectrum-collapsible-list__list">
        {items.map(item => {
          const key = this.getNodeKey(item, parentKey);
          const isParent = !!item.children && item.children.length > 0;
          const isLeafWithActions = !isParent && Array.isArray(this.contextActions) && this.contextActions.length > 0;
          const isExpanded = this.expandedMap[key] ?? !!item.expanded;
          const icon = item.icon || parentIcon;
          return (
            <li
              class={{
                'spectrum-collapsible-list__item': true,
                'spectrum-collapsible-list__item--parent': isParent,
                'spectrum-collapsible-list__item--expanded': isParent && isExpanded,
              }}
              tabIndex={0}
              onClick={e => {
                e.stopPropagation();
                if (isParent) {
                  this.handleParentClick(item, key, parentKey);
                } else {
                  this.handleChildClick(item);
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (isParent) {
                    this.handleParentClick(item, key, parentKey);
                  } else {
                    this.handleChildClick(item);
                  }
                }
              }}
            >
              <div class="spectrum-collapsible-list__row">
                {this.renderIcon(icon, !item.icon && !!parentIcon)}
                <span class="spectrum-collapsible-list__label">{item.label}</span>
                {isParent && [
                  <span class="spectrum-collapsible-list__child-count">
                    {item.children!.length}
                  </span>,
                  <spectrum-button
                    variant="ghost"
                    iconOnly
                    leftIcon={isExpanded ? 'expand_less' : 'expand_more'}
                    showLeftIcon={true}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    onClick={e => {
                      e.stopPropagation();
                      this.handleParentClick(item, key, parentKey);
                    }}
                    tabIndex={0}
                  />
                ]}
                {isLeafWithActions && [
                  <spectrum-button
                    variant="ghost"
                    iconOnly
                    leftIcon="more_vert"
                    showLeftIcon={true}
                    aria-label="Show actions"
                    id={`anchor-${key.replace(/\s+/g, '-')}`}
                    // @ts-ignore
                    anchor-name={`--anchor-${key.replace(/\s+/g, '-')}`}
                    // @ts-ignore
                    popovertarget={`popover-${key.replace(/\s+/g, '-')}`}
                    onClick={e => this.handleActionsIconClick(e, key)}
                    ref={this.setTriggerRef(key)}
                  />,
                  this.renderPopoverMenu(item, key)
                ]}
              </div>
              {isParent && isExpanded && (
                <div class="spectrum-collapsible-list__children">
                  {this.renderList(item.children!, key, icon)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
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
        <nav class="spectrum-collapsible-list">
          {this.renderList(this.items)}
        </nav>
      </Host>
    );
  }
}
