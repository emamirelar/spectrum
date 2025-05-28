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
  inputs: ['contextActions', 'filter', 'items', 'mutuallyExclusive']
})
@Component({
  selector: 'spectrum-collapsible-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['contextActions', 'filter', 'items', 'mutuallyExclusive'],
})
export class SpectrumCollapsibleList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['child-action', 'expand-action', 'contract-action', 'context-action']);
  }
}


export declare interface SpectrumCollapsibleList extends Components.SpectrumCollapsibleList {
  /**
   * Event emitted when a child node is clicked
   */
  'child-action': EventEmitter<CustomEvent<{ action: string; label: string; }>>;
  /**
   * Event emitted when a parent node is expanded
   */
  'expand-action': EventEmitter<CustomEvent<{ label: string; }>>;
  /**
   * Event emitted when a parent node is contracted
   */
  'contract-action': EventEmitter<CustomEvent<{ label: string; }>>;
  /**
   * Event emitted when a context action is clicked
   */
  'context-action': EventEmitter<CustomEvent<{ value: string; label: string }>>;
}


@ProxyCmp({
  inputs: ['position'],
  methods: ['show', 'hide', 'positionAtCoordinates']
})
@Component({
  selector: 'spectrum-context-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['position'],
})
export class SpectrumContextMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['action-click', 'menu-close']);
  }
}


export declare interface SpectrumContextMenu extends Components.SpectrumContextMenu {
  /**
   * Event emitted when an action is clicked
   */
  'action-click': EventEmitter<CustomEvent<{ value: string; targetKey: string }>>;
  /**
   * Event emitted when the menu is closed
   */
  'menu-close': EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['actions', 'conversationtitle', 'loading', 'messages', 'sources'],
  methods: ['scrollToLatest']
})
@Component({
  selector: 'spectrum-conversation-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'conversationtitle', 'loading', 'messages', 'sources'],
})
export class SpectrumConversationPanel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['explorationSelected', 'action', 'explore', 'sourceClick']);
  }
}


export declare interface SpectrumConversationPanel extends Components.SpectrumConversationPanel {

  explorationSelected: EventEmitter<CustomEvent<string>>;

  action: EventEmitter<CustomEvent<{type: string, value: string}>>;

  explore: EventEmitter<CustomEvent<string>>;

  sourceClick: EventEmitter<CustomEvent<{label: string, value: string}>>;
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
  inputs: ['addLabel', 'appName', 'expandedWidth', 'initialExpanded', 'moreLabel', 'showAddButton'],
  methods: ['setExpanded', 'setShowAddButton']
})
@Component({
  selector: 'spectrum-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['addLabel', 'appName', 'expandedWidth', 'initialExpanded', 'moreLabel', 'showAddButton'],
})
export class SpectrumRail {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['expandedChange', 'searchChange', 'railAction', 'addAction']);
  }
}


export declare interface SpectrumRail extends Components.SpectrumRail {
  /**
   * Emits when the rail changes expanded state
   */
  expandedChange: EventEmitter<CustomEvent<boolean>>;
  /**
   * Emits when the search value changes
   */
  searchChange: EventEmitter<CustomEvent<{ value: string }>>;
  /**
   * Emits when a rail action is triggered
   */
  railAction: EventEmitter<CustomEvent<{ action: string, label: string }>>;
  /**
   * Emits when the add button is clicked
   */
  addAction: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['action', 'expanded', 'icon', 'label'],
  methods: ['onRailExpandedChange']
})
@Component({
  selector: 'spectrum-rail-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'expanded', 'icon', 'label'],
})
export class SpectrumRailItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumRailItem extends Components.SpectrumRailItem {}


@ProxyCmp({
  inputs: ['enableEnterSubmit', 'enableVoiceInput', 'maxLines', 'placeholder'],
  methods: ['setFocus']
})
@Component({
  selector: 'spectrum-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['enableEnterSubmit', 'enableVoiceInput', 'maxLines', 'placeholder'],
})
export class SpectrumSearchInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['searchSubmit', 'searchInput']);
  }
}


export declare interface SpectrumSearchInput extends Components.SpectrumSearchInput {

  searchSubmit: EventEmitter<CustomEvent<string>>;
  /**
   * Emits when input value changes, for real-time filtering
   */
  searchInput: EventEmitter<CustomEvent<string>>;
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


