/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@stencil-storybook-boilerplate/core';


@ProxyCmp({
  inputs: ['buttonText', 'iconOnly', 'leftIcon', 'outline', 'rightIcon', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'state', 'variant']
})
@Component({
  selector: 'spectrum-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['buttonText', 'iconOnly', 'leftIcon', 'outline', 'rightIcon', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'state', 'variant'],
})
export class SpectrumButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumButton extends Components.SpectrumButton {}


@ProxyCmp({
  inputs: ['animationtime', 'autoplay', 'content', 'gap', 'hoverpause', 'show']
})
@Component({
  selector: 'spectrum-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animationtime', 'autoplay', 'content', 'gap', 'hoverpause', 'show'],
})
export class SpectrumCarousel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumCarousel extends Components.SpectrumCarousel {}


@ProxyCmp({
  inputs: ['actions', 'conversationtitle', 'messages', 'sources']
})
@Component({
  selector: 'spectrum-conversation-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'conversationtitle', 'messages', 'sources'],
})
export class SpectrumConversationPanel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['explorationSelected', 'action', 'explore']);
  }
}


export declare interface SpectrumConversationPanel extends Components.SpectrumConversationPanel {

  explorationSelected: EventEmitter<CustomEvent<string>>;

  action: EventEmitter<CustomEvent<string>>;

  explore: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['closeicon', 'content', 'megamenutitle', 'openicon', 'width']
})
@Component({
  selector: 'spectrum-megamenu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['closeicon', 'content', 'megamenutitle', 'openicon', 'width'],
})
export class SpectrumMegamenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumMegamenu extends Components.SpectrumMegamenu {}


@ProxyCmp({
  inputs: ['background', 'backgroundposition', 'backgroundsize', 'showSwatches']
})
@Component({
  selector: 'spectrum-wallpaper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['background', 'backgroundposition', 'backgroundsize', 'showSwatches'],
})
export class SpectrumWallpaper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumWallpaper extends Components.SpectrumWallpaper {}


