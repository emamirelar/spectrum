/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@stencil-storybook-boilerplate/core';


@ProxyCmp({
  inputs: ['action', 'buttonText', 'debug', 'disabled', 'iconOnly', 'leftIcon', 'outline', 'rightIcon', 'ripple', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'state', 'variant']
})
@Component({
  selector: 'spectrum-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'buttonText', 'debug', 'disabled', 'iconOnly', 'leftIcon', 'outline', 'rightIcon', 'ripple', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'state', 'variant'],
})
export class SpectrumButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['buttonAction']);
  }
}


export declare interface SpectrumButton extends Components.SpectrumButton {

  buttonAction: EventEmitter<CustomEvent<{ action?: string; label: string }>>;
}


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
  inputs: ['action', 'debug', 'disabled', 'label', 'leadingIcon', 'outline', 'ripple', 'selected', 'showTrailingIcon', 'trailingIcon', 'variant']
})
@Component({
  selector: 'spectrum-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'debug', 'disabled', 'label', 'leadingIcon', 'outline', 'ripple', 'selected', 'showTrailingIcon', 'trailingIcon', 'variant'],
})
export class SpectrumChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['chipAction']);
  }
}


export declare interface SpectrumChip extends Components.SpectrumChip {

  chipAction: EventEmitter<CustomEvent<{ action?: string; label: string }>>;
}


@ProxyCmp({
  inputs: ['actions', 'conversationtitle', 'messages', 'sources'],
  methods: ['scrollToLatest']
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

  action: EventEmitter<CustomEvent<{type: string, value: string}>>;

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
  inputs: ['bottomItems', 'fabItem', 'menuItem', 'topItems']
})
@Component({
  selector: 'spectrum-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['bottomItems', 'fabItem', 'menuItem', 'topItems'],
})
export class SpectrumRail {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['railAction']);
  }
}


export declare interface SpectrumRail extends Components.SpectrumRail {
  /**
   * Emits when a rail item is clicked
   */
  railAction: EventEmitter<CustomEvent<{ action: string, label: string }>>;
}


@ProxyCmp({
  inputs: ['maxLines'],
  methods: ['setFocus']
})
@Component({
  selector: 'spectrum-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['maxLines'],
})
export class SpectrumSearchInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['searchSubmit']);
  }
}


export declare interface SpectrumSearchInput extends Components.SpectrumSearchInput {

  searchSubmit: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['color', 'config', 'dark', 'showSwatches']
})
@Component({
  selector: 'spectrum-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'config', 'dark', 'showSwatches'],
})
export class SpectrumTheme {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumTheme extends Components.SpectrumTheme {}


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


