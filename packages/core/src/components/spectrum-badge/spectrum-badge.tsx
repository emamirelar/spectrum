import { Component, Host, h, Prop } from '@stencil/core';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'spectrum-badge',
  styleUrl: 'spectrum-badge.scss',
  shadow: true,
})
export class SpectrumBadge {
  /**
   * The variant/color of the badge
   */
  @Prop() variant: BadgeVariant = 'primary';

  /**
   * The size of the badge
   */
  @Prop() size: BadgeSize = 'medium';

  /**
   * The text content of the badge
   */
  @Prop() text: string = '';

  /**
   * Whether the badge should be circular (for single characters/icons)
   */
  @Prop() circular: boolean = false;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-badge] ${message}`, ...args);
    }
  }

  render() {
    this.debugLog('Rendering badge', { 
      variant: this.variant, 
      size: this.size, 
      text: this.text,
      circular: this.circular 
    });

    const badgeClasses = {
      'spectrum-badge': true,
      [`spectrum-badge--${this.variant}`]: true,
      [`spectrum-badge--${this.size}`]: true,
      'spectrum-badge--circular': this.circular
    };

    return (
      <Host>
        <div class={badgeClasses}>
          {this.text && <span class="spectrum-badge__text">{this.text}</span>}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
