import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Listen, Watch } from '@stencil/core';

/**
 * Button configuration for dialog control bar
 */
export interface DialogButton {
  id: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline';
  disabled?: boolean;
  action?: string;
}

/**
 * Spectrum Dialog Component
 * A modal dialog component using the HTML dialog element with background shade.
 * Features close functionality, optional title, control bar, and uses spectrum-panel for styling.
 */
@Component({
  tag: 'spectrum-dialog',
  styleUrl: 'spectrum-dialog.scss',
  shadow: true,
})
export class SpectrumDialog {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;
  
  private dialogElement: HTMLDialogElement;

  /**
   * Event emitted when dialog actions occur
   */
  @Event({
    eventName: 'dialogAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) dialogAction: EventEmitter<{action: string; dialogId?: string; buttonId?: string}>;

  /**
   * Event emitted when dialog is closed
   */
  @Event({
    eventName: 'dialogClose',
    composed: true,
    cancelable: true,
    bubbles: true
  }) dialogClose: EventEmitter<{action: string; dialogId?: string}>;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Whether the dialog is open
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * Optional dialog identifier for event handling
   */
  @Prop() dialogId?: string;

  /**
   * Optional title for the dialog
   */
  @Prop() dialogTitle?: string;

  /**
   * Whether to show the close button
   */
  @Prop() showCloseButton: boolean = true;

  /**
   * Whether clicking outside the dialog should close it
   */
  @Prop() closeOnOutsideClick: boolean = true;

  /**
   * Whether pressing Escape should close the dialog
   */
  @Prop() closeOnEscape: boolean = true;

  /**
   * Array of buttons for the control bar
   */
  @Prop() buttons: DialogButton[] = [];

  /**
   * Background level for the dialog panel
   */
  @Prop() background: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent' = 'opaque';

  /**
   * Size of the dialog
   */
  @Prop() size: 'small' | 'medium' | 'large' | 'full' | 'auto' = 'medium';

  /**
   * Custom width for the dialog
   */
  @Prop() width?: string;

  /**
   * Custom height for the dialog
   */
  @Prop() height?: string;

  /**
   * Whether to remove padding from the content area
   */
  @Prop() noPadding: boolean = false;

  /**
   * Internal state for managing dialog visibility
   */
  @State() isVisible: boolean = false;

  /**
   * Watch for changes to the open prop
   */
  @Watch('open')
  handleOpenChange(newValue: boolean) {
    this.debugLog('Open changed', { newValue });
    if (newValue) {
      this.show();
    } else {
      this.hide();
    }
  }

  // ============== Lifecycle Methods ==============
  componentDidLoad() {
    this.debugLog('Component loaded');
    if (this.open) {
      this.show();
    }
  }

  disconnectedCallback() {
    this.debugLog('Component disconnected');
    // Clean up any event listeners or timers if needed
  }

  // ============== Public Methods ==============
  /**
   * Show the dialog
   */
  @Method()
  async show() {
    this.debugLog('Showing dialog');
    if (this.dialogElement) {
      this.dialogElement.showModal();
      this.isVisible = true;
      this.open = true;
      this.dialogAction.emit({
        action: 'open',
        dialogId: this.dialogId
      });
    }
  }

  /**
   * Hide the dialog
   */
  @Method()
  async hide() {
    this.debugLog('Hiding dialog');
    if (this.dialogElement) {
      this.dialogElement.close();
      this.isVisible = false;
      this.open = false;
      this.dialogClose.emit({
        action: 'close',
        dialogId: this.dialogId
      });
    }
  }

  /**
   * Toggle dialog visibility
   */
  @Method()
  async toggle() {
    if (this.isVisible) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  // ============== Event Handlers ==============
  /**
   * Handle close button click
   */
  private handleCloseClick = () => {
    this.debugLog('Close button clicked');
    this.hide();
  };

  /**
   * Handle control bar button clicks
   */
  private handleButtonClick = (button: DialogButton) => {
    this.debugLog('Button clicked', { button });
    this.dialogAction.emit({
      action: button.action || 'buttonClick',
      dialogId: this.dialogId,
      buttonId: button.id
    });
  };

  /**
   * Handle backdrop click (outside dialog)
   */
  private handleBackdropClick = (event: MouseEvent) => {
    if (this.closeOnOutsideClick && event.target === this.dialogElement) {
      this.debugLog('Backdrop clicked');
      this.hide();
    }
  };

  /**
   * Listen for Escape key to close dialog
   */
  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (this.closeOnEscape && event.key === 'Escape' && this.isVisible) {
      this.debugLog('Escape key pressed');
      this.hide();
    }
  }

  // ============== Helper Methods ==============
  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-dialog] ${message}`, ...args);
    }
  }

  /**
   * Get dialog element reference
   */
  private getDialogRef = (el: HTMLDialogElement) => {
    this.dialogElement = el;
  };

  /**
   * Render the dialog title
   */
  private renderTitle() {
    if (!this.dialogTitle) return null;

    return (
      <div class="spectrum-dialog__header">
        <h2 class="spectrum-dialog__title">{this.dialogTitle}</h2>
        {this.showCloseButton && (
          <button
            class="spectrum-dialog__close-button"
            onClick={this.handleCloseClick}
            aria-label="Close dialog"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
    );
  }

  /**
   * Render the control bar with buttons
   */
  private renderControlBar() {
    if (!this.buttons || this.buttons.length === 0) return null;

    return (
      <div class="spectrum-dialog__control-bar">
        {this.buttons.map(button => (
          <spectrum-button
            key={button.id}
            variant={button.variant || 'secondary'}
            disabled={button.disabled || false}
            buttonText={button.label}
            onClick={() => this.handleButtonClick(button)}
          />
        ))}
      </div>
    );
  }

  // ============== Render Method ==============
  render() {
    this.debugLog('Rendering dialog', {
      open: this.open,
      isVisible: this.isVisible,
      title: this.dialogTitle,
      buttonsCount: this.buttons?.length || 0
    });

    const dialogClasses = {
      'spectrum-dialog': true
    };

    // Set dimensions for full size dialogs
    const panelWidth = this.size === 'full' ? '90vw' : this.width;
    const panelHeight = this.size === 'full' ? '90vh' : this.height;

    return (
      <Host>
        <dialog
          ref={this.getDialogRef}
          class={dialogClasses}
          onClick={this.handleBackdropClick}
          aria-labelledby={this.dialogTitle ? 'dialog-title' : undefined}
        >
          <spectrum-panel
            background={this.background}
            size={this.size}
            width={panelWidth}
            height={panelHeight}
            noPadding={this.noPadding}
            class="spectrum-dialog__panel"
          >
            {this.renderTitle()}
            
            <div class="spectrum-dialog__content">
              <slot name="content"></slot>
            </div>
            
            {this.renderControlBar()}
          </spectrum-panel>
        </dialog>
      </Host>
    );
  }
}
