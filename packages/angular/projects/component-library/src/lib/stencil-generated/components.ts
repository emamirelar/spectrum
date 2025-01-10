/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@stencil-storybook-boilerplate/core';


@ProxyCmp({
  inputs: ['ariaLabel', 'disabled', 'label', 'tabIndex', 'variant']
})
@Component({
  selector: 'unops-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['ariaLabel', 'disabled', 'label', 'tabIndex', 'variant'],
})
export class UnopsButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['buttonPressed']);
  }
}


export declare interface UnopsButton extends Components.UnopsButton {
  /**
   * Emitted when the button is pressed
   */
  buttonPressed: EventEmitter<CustomEvent<boolean>>;
}


