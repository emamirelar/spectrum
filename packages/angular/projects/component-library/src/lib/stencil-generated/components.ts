/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@stencil-storybook-boilerplate/core';


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
    proxyOutputs(this, this.el, ['explorationSelected']);
  }
}


export declare interface SpectrumConversationPanel extends Components.SpectrumConversationPanel {

  explorationSelected: EventEmitter<CustomEvent<string>>;
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
  inputs: ['background', 'backgroundPosition', 'backgroundSize', 'showSwatches']
})
@Component({
  selector: 'spectrum-wallpaper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['background', 'backgroundPosition', 'backgroundSize', 'showSwatches'],
})
export class SpectrumWallpaper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumWallpaper extends Components.SpectrumWallpaper {}


