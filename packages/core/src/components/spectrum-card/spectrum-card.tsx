import { Component, Host, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import { BackgroundLevel } from '../spectrum-panel/spectrum-panel';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'small' | 'medium' | 'large' | 'auto';

/**
 * Spectrum Card Component
 * A versatile card component for displaying content with optional header, footer, and actions.
 * Supports media, interactive states, and follows Material Design 3 patterns.
 */
@Component({
  tag: 'spectrum-card',
  styleUrl: 'spectrum-card.scss',
  shadow: true,
})
export class SpectrumCard {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Card variant/style
   */
  @Prop() variant: CardVariant = 'default';

  /**
   * Size of the card
   */
  @Prop() size: CardSize = 'medium';

  /**
   * Background level for the card
   */
  @Prop() background: BackgroundLevel = 'opaque';

  /**
   * Whether the card is clickable
   */
  @Prop() clickable: boolean = false;

  /**
   * Whether the card is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Action identifier for events
   */
  @Prop() action: string = '';

  /**
   * Card title
   */
  @Prop() cardTitle?: string;

  /**
   * Card subtitle
   */
  @Prop() cardSubtitle?: string;



  /**
   * Image URL for card media
   */
  @Prop() imageUrl?: string;

  /**
   * Alt text for card image
   */
  @Prop() imageAlt?: string;

  /**
   * Whether to show header actions slot
   */
  @Prop() showHeaderActions: boolean = false;

  /**
   * Whether to show footer actions slot
   */
  @Prop() showFooterActions: boolean = false;

  /**
   * Custom width for the card
   */
  @Prop() width?: string;

  /**
   * Custom height for the card
   */
  @Prop() height?: string;

  /**
   * Whether to remove default padding
   */
  @Prop() noPadding: boolean = false;

  /**
   * URL for navigation when card is used as a link
   */
  @Prop() href?: string;

  /**
   * Target for navigation (e.g., '_blank' for new tab)
   */
  @Prop() target?: string;

  /**
   * Rel attribute for security when using target="_blank"
   */
  @Prop() rel?: string;

  // ============== Component State ==============
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;

  // ============== Events ==============
  /**
   * Event emitted when card is clicked
   */
  @Event({
    eventName: 'cardAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) cardAction: EventEmitter<{action: string; cardId?: string; title?: string}>;



  // ============== Debug Helpers ==============
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-card] ${message}`, ...args);
    }
  }

  // ============== Event Handlers ==============
  private handleMouseEnter = () => {
    if (!this.disabled) {
      this.debugLog('Mouse entered');
      this.isHovered = true;
    }
  };

  private handleMouseLeave = () => {
    this.debugLog('Mouse left');
    this.isHovered = false;
    this.isActive = false;
  };

  private handleMouseDown = () => {
    if (!this.disabled && this.clickable) {
      this.debugLog('Mouse down');
      this.isActive = true;
    }
  };

  private handleMouseUp = () => {
    this.debugLog('Mouse up');
    this.isActive = false;
  };

  private handleClick = () => {
    // Don't emit events for navigation cards - let the browser handle the navigation
    if (this.href) return;
    
    if (!this.disabled && this.clickable) {
      this.debugLog('Card clicked', { action: this.action, title: this.cardTitle });
      this.cardAction.emit({
        action: this.action || 'click',
        cardId: this.el.id || undefined,
        title: this.cardTitle
      });
    }
  };



  // ============== Style Helpers ==============
  private getCardStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    if (this.width) styles['--card-custom-width'] = this.width;
    if (this.height) styles['--card-custom-height'] = this.height;

    if (this.disabled) {
      styles.cursor = 'not-allowed';
    } else if (this.clickable) {
      styles.cursor = 'pointer';
    }

    return styles;
  }

  // ============== Render Helpers ==============
  private renderMedia() {
    if (!this.imageUrl) return null;

    return (
      <div class="spectrum-card__media">
        <img 
          src={this.imageUrl} 
          alt={this.imageAlt || this.cardTitle || 'Card image'}
          class="spectrum-card__image"
        />
        <slot name="media-overlay"></slot>
      </div>
    );
  }

  private renderHeader() {
    if (!this.cardTitle && !this.showHeaderActions) return null;

    return (
      <div class="spectrum-card__header">
        <div class="spectrum-card__header-content">
          {this.cardTitle && (
            <h3 class="spectrum-card__title">{this.cardTitle}</h3>
          )}
          {this.cardSubtitle && (
            <p class="spectrum-card__subtitle">{this.cardSubtitle}</p>
          )}
        </div>
        {this.showHeaderActions && (
          <div class="spectrum-card__header-actions">
            <slot name="header-actions"></slot>
          </div>
        )}
      </div>
    );
  }

  private renderContent() {
    return (
      <div class="spectrum-card__content">
        <slot name="content"></slot>
      </div>
    );
  }

  private renderFooter() {
    if (!this.showFooterActions) return null;

    return (
      <div class="spectrum-card__footer">
        <slot name="footer-actions"></slot>
      </div>
    );
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.debugLog('Component will load', {
      variant: this.variant,
      size: this.size,
      clickable: this.clickable,
      background: this.background
    });
  }

  // ============== Render Method ==============
  render() {
    this.debugLog('Rendering card', {
      isHovered: this.isHovered,
      isActive: this.isActive,
      clickable: this.clickable,
      disabled: this.disabled,
      href: this.href
    });

    const cardClasses = {
      'spectrum-card': true,
      [`spectrum-card--${this.variant}`]: true,
      [`spectrum-card--${this.size}`]: true,
      [`spectrum-card--${this.background}`]: true,
      'spectrum-card--clickable': this.clickable || !!this.href,
      'spectrum-card--navigation': !!this.href,
      'spectrum-card--disabled': this.disabled,
      'spectrum-card--hover': this.isHovered && !this.disabled,
      'spectrum-card--active': this.isActive && !this.disabled,
      'spectrum-card--no-padding': this.noPadding,
      'spectrum-card--has-media': !!this.imageUrl,
      'spectrum-card--has-header': !!(this.cardTitle || this.showHeaderActions),
      'spectrum-card--has-footer': this.showFooterActions
    };

    const commonProps = {
      class: cardClasses,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick
    };

    const cardContent = [
      <slot name="media">{this.renderMedia()}</slot>,
      this.renderHeader(),
      this.renderContent(),
      this.renderFooter()
    ];

    return (
      <Host class="card-host" style={this.getCardStyles()}>
        {this.href ? (
          <a 
            {...commonProps}
            href={this.href}
            target={this.target}
            rel={this.target === '_blank' && !this.rel ? 'noopener noreferrer' : this.rel}
            tabindex={this.disabled ? '-1' : '0'}
            aria-disabled={this.disabled ? 'true' : undefined}
          >
            {cardContent}
          </a>
        ) : (
          <div 
            {...commonProps}
            role={this.clickable ? 'button' : undefined}
            tabindex={this.clickable && !this.disabled ? '0' : undefined}
            aria-disabled={this.disabled ? 'true' : undefined}
          >
            {cardContent}
          </div>
        )}
      </Host>
    );
  }
}
