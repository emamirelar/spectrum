import { Component, Host, h, Prop, Event, EventEmitter, Method, State, Listen, Element } from '@stencil/core';

export interface ContextMenuAction {
  /**
   * Display label for the action
   */
  label: string;
  
  /**
   * Icon name for Material Symbols icon
   */
  icon: string;
  
  /**
   * Action identifier
   */
  value: string;
  
  /**
   * Whether to show ripple effect (optional)
   */
  ripple?: boolean;
}

/**
 * Spectrum Context Menu Component
 * A popup menu for contextual actions that can be attached to any element.
 */
@Component({
  tag: 'spectrum-context-menu',
  styleUrl: 'spectrum-context-menu.scss',
  shadow: true,
})
export class SpectrumContextMenu {
  @Element() el: HTMLElement;

  /**
   * Array of action objects to display in the menu
   */
  @Prop() actions: ContextMenuAction[] = [];

  /**
   * The key identifying the target component that triggered this menu
   */
  @Prop({ mutable: true }) targetKey: string = '';

  /**
   * Whether the menu is currently open
   */
  @Prop({ mutable: true }) isOpen: boolean = false;

  /**
   * Position of the menu relative to the trigger element
   */
  @Prop() position: 'left' | 'right' | 'top' | 'bottom' = 'right';

  /**
   * Reference to the element that triggered the menu
   */
  @State() triggerElement: HTMLElement | null = null;

  /**
   * Debug mode
   */
  @State() debug: boolean = true;

  /**
   * Event emitted when an action is clicked
   */
  @Event({
    eventName: 'action-click',
    composed: true,
    cancelable: true,
    bubbles: true
  }) actionClick: EventEmitter<{ value: string; targetKey: string }>;

  /**
   * Event emitted when the menu is closed
   */
  @Event({
    eventName: 'menu-close',
    composed: true,
    cancelable: true,
    bubbles: true
  }) menuClose: EventEmitter<void>;

  private log(message: string, data?: any) {
    if (this.debug) {
      console.log(`[SpectrumContextMenu] ${message}`, data ? data : '');
    }
  }

  /**
   * Listen for clicks outside the menu to close it
   */
  @Listen('click', { target: 'window' })
  handleWindowClick(event: MouseEvent) {
    if (!this.isOpen) return;
    
    // Check if the click was inside the menu
    const clickedInside = this.el.contains(event.target as Node);
    
    // Also check if the click was on the trigger element (which we want to ignore for closing)
    const clickedOnTrigger = this.triggerElement && this.triggerElement.contains(event.target as Node);
    
    if (!clickedInside && !clickedOnTrigger) {
      this.log('Click outside detected, closing menu');
      this.close();
    }
  }

  /**
   * Listen for keyboard events to close the menu on Escape
   */
  @Listen('keydown', { target: 'window' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;
    
    if (event.key === 'Escape') {
      this.log('Escape key pressed, closing menu');
      event.preventDefault();
      this.close();
    } else if (event.key === 'Tab') {
      // Close the menu when tabbing out
      this.log('Tab key pressed, closing menu');
      this.close();
    }
  }

  /**
   * Set the trigger element reference
   */
  @Method()
  async setTriggerRef(element: HTMLElement) {
    this.triggerElement = element;
    this.log('Trigger element set', element);
    return true;
  }

  /**
   * Open the menu
   */
  @Method()
  async open() {
    if (!this.triggerElement) {
      this.log('Cannot open menu: No trigger element set');
      return false;
    }
    
    this.isOpen = true;
    
    // Position the menu relative to the trigger after a short delay
    // to ensure the menu is rendered in the DOM
    setTimeout(() => {
      this.positionMenu();
    }, 10);
    
    this.log('Menu opened');
    return true;
  }

  /**
   * Close the menu
   */
  @Method()
  async close() {
    if (!this.isOpen) return true;
    
    this.isOpen = false;
    
    // Emit the menu-close event - also dispatch a native event for global listeners
    this.log('Emitting menu-close event');
    
    // Emit via StencilJS event emitter
    const event = this.menuClose.emit();
    
    // Also dispatch a native event for global document listeners
    this.dispatchNativeEvent('menu-close');
    
    this.log('Menu closed, event emitted:', { event });
    
    return true;
  }

  /**
   * Position the menu at specific coordinates
   */
  @Method()
  async positionAtCoordinates(x: number, y: number) {
    if (!this.isOpen) {
      this.log('Cannot position menu: Menu is not open');
      return false;
    }
    
    const menuElement = this.el.shadowRoot?.querySelector('.spectrum-context-menu') as HTMLElement;
    if (!menuElement) {
      this.log('Cannot position menu: Menu element not found');
      return false;
    }
    
    // Get the menu dimensions
    const menuRect = menuElement.getBoundingClientRect();
    
    // Position the menu so it doesn't go off-screen
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let leftPos = x;
    let topPos = y - menuRect.height / 2; // Center vertically at the Y coordinate
    
    // Adjust if the menu would go off the right edge
    if (leftPos + menuRect.width > windowWidth) {
      leftPos = windowWidth - menuRect.width - 8; // 8px safety margin
    }
    
    // Adjust if the menu would go off the top or bottom
    if (topPos < 8) {
      topPos = 8; // 8px safety margin from top
    } else if (topPos + menuRect.height > windowHeight - 8) {
      topPos = windowHeight - menuRect.height - 8; // 8px safety margin from bottom
    }
    
    // Apply the position
    menuElement.style.position = 'fixed';
    menuElement.style.left = `${leftPos}px`;
    menuElement.style.top = `${topPos}px`;
    
    this.log('Menu positioned at coordinates', { x, y, final: { left: leftPos, top: topPos } });
    return true;
  }

  /**
   * Position the menu relative to the trigger element
   */
  private positionMenu() {
    if (!this.triggerElement) {
      this.log('Cannot position menu: No trigger element set');
      return;
    }
    
    const menuElement = this.el.shadowRoot?.querySelector('.spectrum-context-menu') as HTMLElement;
    if (!menuElement) {
      this.log('Cannot position menu: Menu element not found');
      return;
    }
    
    // Get the trigger element's position
    const triggerRect = this.triggerElement.getBoundingClientRect();
    
    // Position based on the specified position prop
    switch (this.position) {
      case 'right':
        this.positionAtCoordinates(triggerRect.right, triggerRect.top + triggerRect.height / 2);
        break;
      case 'left':
        this.positionAtCoordinates(triggerRect.left - menuElement.offsetWidth, triggerRect.top + triggerRect.height / 2);
        break;
      case 'top':
        this.positionAtCoordinates(triggerRect.left + triggerRect.width / 2, triggerRect.top - menuElement.offsetHeight / 2);
        break;
      case 'bottom':
        this.positionAtCoordinates(triggerRect.left + triggerRect.width / 2, triggerRect.bottom + menuElement.offsetHeight / 2);
        break;
      default:
        this.positionAtCoordinates(triggerRect.right, triggerRect.top + triggerRect.height / 2);
    }
  }

  /**
   * Helper function to dispatch a native custom event
   */
  private dispatchNativeEvent(eventName: string, detail?: any) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail
    });
    
    // Dispatch on the element itself
    this.el.dispatchEvent(event);
    
    // Also dispatch on document for global listeners
    document.dispatchEvent(event);
    
    this.log(`Dispatched native ${eventName} event`, { detail });
  }

  /**
   * Handle click on a menu action
   */
  private handleActionClick(action: ContextMenuAction, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    this.log('Action clicked, emitting event for action:', action);
    
    // Emit the action-click event with the action value and target key
    const eventData = {
      value: action.value,
      targetKey: this.targetKey
    };
    
    // Emit via StencilJS event emitter
    const emitted = this.actionClick.emit(eventData);
    
    // Also dispatch a native event for global document listeners
    this.dispatchNativeEvent('action-click', eventData);
    
    this.log('Action event emitted:', { emitted, eventData });
    
    // Close the menu after clicking an action
    this.close();
  }
  
  /**
   * Render an action item
   */
  private renderActionItem(action: ContextMenuAction, index: number) {
    return (
      <li 
        class="spectrum-context-menu__item" 
        onClick={(e) => this.handleActionClick(action, e)}
        role="menuitem"
        tabindex="0"
        key={`action-${index}-${action.value}`}
        data-value={action.value}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleActionClick(action, e as unknown as MouseEvent);
          }
        }}
      >
        <span class="spectrum-context-menu__icon material-symbols-outlined">
          {action.icon}
        </span>
        <span class="spectrum-context-menu__label">
          {action.label}
        </span>
        {action.ripple && (
          <span class="spectrum-context-menu__ripple" />
        )}
      </li>
    );
  }

  render() {
    this.log('Rendering context menu', { isOpen: this.isOpen, actions: this.actions });
    
    return (
      <Host>
        {this.isOpen && (
          <div 
            class="spectrum-context-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <ul class="spectrum-context-menu__list">
              {this.actions.map((action, index) => this.renderActionItem(action, index))}
            </ul>
          </div>
        )}
      </Host>
    );
  }
} 