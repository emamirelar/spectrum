import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { buttonVariant } from './buttonVariant';

@Component({
  tag: 'unops-button',
  styleUrl: 'unops-button.scss',
  shadow: true,
})
export class UnopsButton {

  /**
   * The button label
   * Default: Button
   */
  @Prop() label: string = "Button";

  /**
   * The button aria-label
   * Default: this.label
   */
  @Prop() ariaLabel: string = this.label;

  /**
   * The button variant
   * Default: primary
   */
  @Prop() variant: buttonVariant = buttonVariant.primary;

  /**
   * If true, the button is disabled
   * Default: false
   */
  @Prop() disabled: boolean = false;

  /**
   * The tab index of the button
   * Default: 0
   */
  @Prop() tabIndex: number = 0;

  /**
   * Emitted when the button is pressed
   */

  @Event() buttonPressed: EventEmitter<boolean>;

  private buttonEventHandler = (event: any) => {
    if (this.disabled) {
      return;
    }
    this.buttonPressed.emit(event);
  }  

  render() {
    return (
      <Host>
          <button onClick={this.buttonEventHandler} disabled={this.disabled} class="unops-button" data-variant={this.variant} aria-label={this.label}>
          {this.label}
          </button>
      </Host>
    );
  }
}
