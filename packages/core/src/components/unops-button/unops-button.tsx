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
   */
  @Prop() label: string = "Button";

  /**
   * The button variant
   */
  @Prop() variant: buttonVariant = buttonVariant.primary;

  @Event() buttonPressed: EventEmitter<boolean>;

  private buttonEventHandler = (event: any) => {
    this.buttonPressed.emit(event);
  }  

  render() {
    return (
      <Host>
          <button onClick={this.buttonEventHandler} class="unops-button" data-variant={this.variant}>
          {this.label}
          </button>
      </Host>
    );
  }
}
