import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Watch } from '@stencil/core';

/**
 * Spectrum Toast Component
 * A notification component that displays messages at screen edges.
 * Supports various variants, positioning, and auto-dismiss functionality.
 */
@Component({
  tag: 'spectrum-toast',
  styleUrl: 'spectrum-toast.scss',
  shadow: true,
})
export class SpectrumToast {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;
  @Event() toastAction: EventEmitter<{ action: string; toast: any }>;
  @Event() toastDismiss: EventEmitter<{ action: string; toast: any }>;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Toast Configuration
  @Prop() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' = 'primary';
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'top';
  @Prop() visible: boolean = false;
  @Prop() autoClose: boolean = true;
  @Prop() duration: number = 4000; // Auto-close duration in milliseconds
  @Prop() dismissible: boolean = true;
  @Prop() persistent: boolean = false; // If true, won't auto-close

  // Toast Content
  @Prop() toastTitle: string = '';
  @Prop() message: string = '';
  @Prop() showIcon: boolean = true;
  @Prop() icon: string = '';
  @Prop() showCloseButton: boolean = true;
  @Prop() actionLabel: string = '';
  @Prop() actionValue: string = '';

  // Toast State
  @State() isVisible: boolean = false;
  @State() isAnimating: boolean = false;
  private autoCloseTimer: number | null = null;

  @Watch('visible')
  handleVisibleChange(newValue: boolean) {
    this.debugLog('Visible changed', { newValue });
    if (newValue) {
      this.show();
    } else {
      this.hide();
    }
  }

  @Watch('variant')
  handleVariantChange(newValue: string) {
    this.debugLog('Variant changed', { newValue });
  }

  // ============== Debug Helpers ==============
  private debugLog(message: string, data?: any) {
    if (this.debug) {
      console.log(`[spectrum-toast] ${message}`, data);
    }
  }

  // ============== Toast Management ==============
  @Method()
  async show() {
    this.debugLog('Showing toast');
    this.isAnimating = true;
    this.isVisible = true;
    
    // Start auto-close timer if enabled
    if (this.autoClose && !this.persistent) {
      this.startAutoCloseTimer();
    }

    // Remove animation class after animation completes
    setTimeout(() => {
      this.isAnimating = false;
    }, 300);
  }

  @Method()
  async hide() {
    this.debugLog('Hiding toast');
    this.isAnimating = true;
    
    // Clear auto-close timer
    this.clearAutoCloseTimer();
    
    // Wait for animation to complete
    setTimeout(() => {
      this.isVisible = false;
      this.isAnimating = false;
      this.toastDismiss.emit({
        action: 'dismiss',
        toast: this.getToastData()
      });
    }, 300);
  }

  @Method()
  async dismiss() {
    if (this.dismissible) {
      await this.hide();
    }
  }

  // ============== Timer Management ==============
  private startAutoCloseTimer() {
    this.clearAutoCloseTimer();
    if (this.duration > 0) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.dismiss();
      }, this.duration);
    }
  }

  private clearAutoCloseTimer() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  // ============== Event Handlers ==============
  private handleCloseClick = () => {
    this.debugLog('Close button clicked');
    this.dismiss();
  };

  private handleActionClick = () => {
    this.debugLog('Action button clicked');
    this.toastAction.emit({
      action: this.actionValue || 'action',
      toast: this.getToastData()
    });
  };

  private handleMouseEnter = () => {
    // Pause auto-close on hover
    if (this.autoClose && !this.persistent) {
      this.clearAutoCloseTimer();
    }
  };

  private handleMouseLeave = () => {
    // Resume auto-close on mouse leave
    if (this.autoClose && !this.persistent && this.isVisible) {
      this.startAutoCloseTimer();
    }
  };

  // ============== Helper Methods ==============
  private getToastData() {
    return {
      title: this.toastTitle,
      message: this.message,
      variant: this.variant,
      position: this.position
    };
  }

  private getDefaultIcon(): string {
    if (this.icon) return this.icon;
    
    switch (this.variant) {
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      case 'primary':
        return 'info';
      case 'secondary':
        return 'info';
      case 'ghost':
        return 'info';
      default:
        return 'info';
    }
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.debugLog('Component will load', {
      variant: this.variant,
      position: this.position,
      visible: this.visible
    });
    
    if (this.visible) {
      this.isVisible = true;
    }
  }

  componentDidLoad() {
    this.debugLog('Component did load');
    
    if (this.visible) {
      this.show();
    }
  }

  disconnectedCallback() {
    this.clearAutoCloseTimer();
  }

  // ============== Render Methods ==============
  render() {
    if (!this.isVisible) {
      return null;
    }

    this.debugLog('Rendering toast', {
      isVisible: this.isVisible,
      isAnimating: this.isAnimating,
      variant: this.variant,
      position: this.position
    });

    const toastClasses: { [key: string]: boolean } = {
      'spectrum-toast': true,
      [`spectrum-toast--${this.variant}`]: true,
      'spectrum-toast--visible': this.isVisible,
      'spectrum-toast--animating': this.isAnimating,
      'spectrum-toast--dismissible': this.dismissible,
    };

    const hostClasses: { [key: string]: boolean } = {
      [`spectrum-toast--${this.position}`]: true,
    };

    return (
      <Host class={hostClasses}>
        <div
          class={toastClasses}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div class="spectrum-toast__content-wrapper">
            {this.showIcon && (
              <div class="spectrum-toast__icon">
                <span class="material-symbols-outlined">
                  {this.getDefaultIcon()}
                </span>
              </div>
            )}
            
            <div class="spectrum-toast__text-content">
              {this.toastTitle && (
                <div class="spectrum-toast__title">{this.toastTitle}</div>
              )}
              {this.message && (
                <div class="spectrum-toast__message">{this.message}</div>
              )}
              <slot></slot>
            </div>
            
            {this.showCloseButton && this.dismissible && (
              <div class="spectrum-toast__close-wrapper">
                <spectrum-button
                  variant="ghost"
                  size="sm"
                  iconOnly={true}
                  leftIcon="close"
                  onClick={this.handleCloseClick}
                  aria-label="Close notification"
                >
                </spectrum-button>
              </div>
            )}
          </div>
          
          {this.actionLabel && (
            <div class="spectrum-toast__action-wrapper">
              <spectrum-button
                variant="outline"
                size="sm"
                buttonText={this.actionLabel}
                showButtonText={true}
                onClick={this.handleActionClick}
              >
                {this.actionLabel}
              </spectrum-button>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
