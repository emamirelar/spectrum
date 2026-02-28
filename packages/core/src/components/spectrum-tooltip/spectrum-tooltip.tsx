import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';

@Component({
  tag: 'spectrum-tooltip',
  styleUrl: 'spectrum-tooltip.scss',
  shadow: true,
})
export class SpectrumTooltip {
  @Element() el: HTMLElement;
  @Event() tooltipShow: EventEmitter<void>;
  @Event() tooltipHide: EventEmitter<void>;

  @Prop() variant: 'plain' | 'rich' = 'plain';
  @Prop() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Prop() text?: string;
  @Prop({ mutable: true }) visible: boolean = false;
  @Prop() delay: number = 300;
  @Prop() trigger: 'hover' | 'click' | 'manual' = 'hover';

  @State() isPositioned: boolean = false;

  private showTimeout: ReturnType<typeof setTimeout>;
  private hideTimeout: ReturnType<typeof setTimeout>;

  @Watch('visible')
  onVisibleChange(newVal: boolean) {
    if (newVal) this.tooltipShow.emit();
    else this.tooltipHide.emit();
  }

  disconnectedCallback() {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
  }

  @Method()
  async show() {
    this.visible = true;
  }

  @Method()
  async hide() {
    this.visible = false;
  }

  private handleTriggerEnter = () => {
    if (this.trigger !== 'hover') return;
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => { this.visible = true; }, this.delay);
  };

  private handleTriggerLeave = () => {
    if (this.trigger !== 'hover') return;
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => { this.visible = false; }, 100);
  };

  private handleTriggerClick = () => {
    if (this.trigger !== 'click') return;
    this.visible = !this.visible;
  };

  private handleTriggerFocus = () => {
    if (this.trigger !== 'hover') return;
    clearTimeout(this.hideTimeout);
    this.showTimeout = setTimeout(() => { this.visible = true; }, this.delay);
  };

  private handleTriggerBlur = () => {
    if (this.trigger !== 'hover') return;
    clearTimeout(this.showTimeout);
    this.hideTimeout = setTimeout(() => { this.visible = false; }, 100);
  };

  private handleTooltipEnter = () => {
    if (this.trigger !== 'hover' || this.variant !== 'rich') return;
    clearTimeout(this.hideTimeout);
  };

  private handleTooltipLeave = () => {
    if (this.trigger !== 'hover' || this.variant !== 'rich') return;
    this.hideTimeout = setTimeout(() => { this.visible = false; }, 100);
  };

  render() {
    const tooltipClasses: { [key: string]: boolean } = {
      'spectrum-tooltip__popup': true,
      [`spectrum-tooltip__popup--${this.position}`]: true,
      [`spectrum-tooltip__popup--${this.variant}`]: true,
      'spectrum-tooltip__popup--visible': this.visible,
    };

    return (
      <Host class="spectrum-tooltip">
        <div
          class="spectrum-tooltip__trigger"
          onMouseEnter={this.handleTriggerEnter}
          onMouseLeave={this.handleTriggerLeave}
          onClick={this.handleTriggerClick}
          onFocus={this.handleTriggerFocus}
          onBlur={this.handleTriggerBlur}
        >
          <slot />
        </div>
        <div
          class={tooltipClasses}
          role="tooltip"
          aria-hidden={(!this.visible).toString()}
          onMouseEnter={this.handleTooltipEnter}
          onMouseLeave={this.handleTooltipLeave}
        >
          <span class="spectrum-tooltip__arrow" />
          {this.variant === 'plain' ? (
            <span class="spectrum-tooltip__text">{this.text}</span>
          ) : (
            <div class="spectrum-tooltip__content">
              <slot name="content" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
