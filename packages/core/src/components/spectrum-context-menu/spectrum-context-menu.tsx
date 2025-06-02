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
  action: string;
  
  /**
   * Unique identifier for the action
   */
  id: string;
  
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

  @State() isOpen: boolean = false;
  @State() actions: ContextMenuAction[] = [];
  @State() x: number = 0;
  @State() y: number = 0;
  @State() targetKey: string = '';

  /**
   * The key identifying the target component that triggered this menu
   */
  @Prop({ mutable: true }) position: 'left' | 'right' | 'top' | 'bottom' = 'right';

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
  }) actionClick: EventEmitter<{ action: string; targetKey: string }>;

  /**
   * Event emitted when the menu is closed
   */
  @Event({
    eventName: 'menu-close',
    composed: true,
    cancelable: true,
    bubbles: true
  }) menuClose: EventEmitter<void>;

  private log(_message: string, _data?: any) {
    if (this.debug) {
      // Debug logging disabled
    }
  }

  @Method()
  async show(actions: ContextMenuAction[], x: number, y: number, targetKey: string) {
    this.actions = actions;
    this.targetKey = targetKey;
    this.x = x;
    this.y = y;
    this.isOpen = true;
    this.el.dispatchEvent(new CustomEvent('menu-open', { detail: { targetKey } }));
  }

  @Method()
  async hide() {
    this.isOpen = false;
  }

  private handleActionClick(action: ContextMenuAction) {
    this.actionClick.emit({ action: action.action, targetKey: this.targetKey });
    this.hide();
  }

  private handleWindowClick = (event: MouseEvent) => {
    if (!this.isOpen) return;
    if (!this.el.shadowRoot.contains(event.target as Node)) {
      this.hide();
    }
  };

  componentDidLoad() {
    window.addEventListener('click', this.handleWindowClick);
  }
  disconnectedCallback() {
    window.removeEventListener('click', this.handleWindowClick);
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
      this.hide();
    } else if (event.key === 'Tab') {
      // Close the menu when tabbing out
      this.log('Tab key pressed, closing menu');
      this.hide();
    }
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

  render() {
    this.log('Rendering context menu', { isOpen: this.isOpen, actions: this.actions });
    
    return (
      <Host>
        {this.isOpen && (
          <div
            class="spectrum-context-menu"
            style={{
              position: 'fixed',
              left: `${this.x}px`,
              top: `${this.y}px`,
              zIndex: '9999',
            }}
            role="menu"
            aria-orientation="vertical"
          >
            <ul class="spectrum-context-menu__list">
              {this.actions.map((action) => (
                <li
                  class="spectrum-context-menu__item"
                  onClick={() => this.handleActionClick(action)}
                  role="menuitem"
                  tabindex="0"
                  key={`action-${action.id}`}
                  data-action={action.action}
                >
                  <span class="spectrum-context-menu__icon material-symbols-outlined">
                    {action.icon}
                  </span>
                  <span class="spectrum-context-menu__label">
                    {action.label}
                  </span>
                  {action.ripple && <span class="spectrum-context-menu__ripple" />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Host>
    );
  }
}
