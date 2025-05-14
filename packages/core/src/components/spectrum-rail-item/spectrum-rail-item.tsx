import { Component, Host, h, Prop, Method, Element } from '@stencil/core';

/**
 * Spectrum Rail Item Component
 * A component designed to work within the rail that automatically
 * switches between icon-only and full display modes
 */
@Component({
  tag: 'spectrum-rail-item',
  styleUrl: 'spectrum-rail-item.scss',
  shadow: true,
})
export class SpectrumRailItem {
  @Element() el!: HTMLElement;

  /** The icon to display */
  @Prop() icon!: string;

  /** The label to display */
  @Prop() label!: string;

  /** Optional action identifier */
  @Prop() action?: string;

  /** Current expanded state */
  @Prop({ mutable: true, reflect: true }) expanded: boolean = false;

  /** Callback for when rail expansion state changes */
  @Method()
  async onRailExpandedChange(expanded: boolean) {
    this.expanded = expanded;
    return expanded;
  }

  render() {
    return (
      <Host
        class={{
          'rail-item': true,
          'rail-item--expanded': this.expanded
        }}
      >
        <div class="rail-item-icon">
          <spectrum-button
            variant="ghost"
            size="base"
            iconOnly={true}
            showLeftIcon={true}
            leftIcon={this.icon}
            title={this.label}
            aria-label={this.label}
          />
        </div>
        <div class="rail-item-label">
          {this.label}
        </div>
      </Host>
    );
  }
} 