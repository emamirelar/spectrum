/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@stencil-storybook-boilerplate/core';


@ProxyCmp({
  inputs: ['action', 'buttonText', 'customStyle', 'debug', 'disabled', 'iconOnly', 'leftIcon', 'minimalAnimation', 'outline', 'rightIcon', 'ripple', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'state', 'variant']
})
@Component({
  selector: 'spectrum-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'buttonText', 'customStyle', 'debug', 'disabled', 'iconOnly', 'leftIcon', 'minimalAnimation', 'outline', 'rightIcon', 'ripple', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'state', 'variant'],
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
  inputs: ['action', 'debug', 'disabled', 'label', 'leadingIcon', 'outline', 'ripple', 'selected', 'showTrailingIcon', 'size', 'trailingIcon', 'variant']
})
@Component({
  selector: 'spectrum-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'debug', 'disabled', 'label', 'leadingIcon', 'outline', 'ripple', 'selected', 'showTrailingIcon', 'size', 'trailingIcon', 'variant'],
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
  inputs: ['contextActions', 'debug', 'filter', 'items', 'mutuallyExclusive']
})
@Component({
  selector: 'spectrum-collapsible-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['contextActions', 'debug', 'filter', 'items', 'mutuallyExclusive'],
})
export class SpectrumCollapsibleList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['childAction', 'expandAction', 'contractAction', 'contextAction', 'itemRenamed']);
  }
}


export declare interface SpectrumCollapsibleList extends Components.SpectrumCollapsibleList {
  /**
   * Event emitted when a child node is clicked
   */
  childAction: EventEmitter<CustomEvent<{ action: string; label: string; id: string }>>;
  /**
   * Event emitted when a parent node is expanded
   */
  expandAction: EventEmitter<CustomEvent<{ action: string; label: string; id: string }>>;
  /**
   * Event emitted when a parent node is contracted
   */
  contractAction: EventEmitter<CustomEvent<{ action: string; label: string; id: string }>>;
  /**
   * Event emitted when a context action is clicked
   */
  contextAction: EventEmitter<CustomEvent<{ action: string; label: string; id: string }>>;
  /**
   * Event emitted when an item is renamed
   */
  itemRenamed: EventEmitter<CustomEvent<{ action: string; id: string; oldName: string; newName: string }>>;
}


@ProxyCmp({
  inputs: ['position'],
  methods: ['show', 'hide', 'isMenuOpen', 'positionAtCoordinates']
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
    proxyOutputs(this, this.el, ['actionClick', 'menuClose']);
  }
}


export declare interface SpectrumContextMenu extends Components.SpectrumContextMenu {
  /**
   * Event emitted when an action is clicked
   */
  actionClick: EventEmitter<CustomEvent<{ action: string; targetKey: string }>>;
  /**
   * Event emitted when the menu is closed
   */
  menuClose: EventEmitter<CustomEvent<{ action: string }>>;
}


@ProxyCmp({
  inputs: ['actions', 'conversationtitle', 'debug', 'loading', 'messages', 'sources'],
  methods: ['scrollToLatest']
})
@Component({
  selector: 'spectrum-conversation-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'conversationtitle', 'debug', 'loading', 'messages', 'sources'],
})
export class SpectrumConversationPanel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['explorationSelected', 'action', 'explore', 'sourceClick', 'titleChanged']);
  }
}


export declare interface SpectrumConversationPanel extends Components.SpectrumConversationPanel {

  explorationSelected: EventEmitter<CustomEvent<{ action: string; exploration: string }>>;

  action: EventEmitter<CustomEvent<{action: string, type: string, value: string, messageId?: string}>>;

  explore: EventEmitter<CustomEvent<{ action: string; value: string }>>;

  sourceClick: EventEmitter<CustomEvent<{ action: string; label: string; value: string; messageId?: string }>>;

  titleChanged: EventEmitter<CustomEvent<{action: string, value: string}>>;
}


@ProxyCmp({
  inputs: ['allowDelete', 'allowUpload', 'allowUrlInput', 'images', 'scrollDirection', 'selectedImages', 'selectionMode']
})
@Component({
  selector: 'spectrum-image-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowDelete', 'allowUpload', 'allowUrlInput', 'images', 'scrollDirection', 'selectedImages', 'selectionMode'],
})
export class SpectrumImageGallery {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['imageSelected', 'imageDeselect', 'imageAdded']);
  }
}


import type { ImageConfig as ISpectrumImageGalleryImageConfig } from '@stencil-storybook-boilerplate/core';
import type { ImageAddedEvent as ISpectrumImageGalleryImageAddedEvent } from '@stencil-storybook-boilerplate/core';

export declare interface SpectrumImageGallery extends Components.SpectrumImageGallery {

  imageSelected: EventEmitter<CustomEvent<ISpectrumImageGalleryImageConfig>>;

  imageDeselect: EventEmitter<CustomEvent<ISpectrumImageGalleryImageConfig>>;

  imageAdded: EventEmitter<CustomEvent<ISpectrumImageGalleryImageAddedEvent>>;
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
  inputs: ['addIcon', 'addLabel', 'appName', 'collapsedOffset', 'expandedWidth', 'initialExpanded', 'moreLabel', 'showAddButton'],
  methods: ['setExpanded', 'setShowAddButton']
})
@Component({
  selector: 'spectrum-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['addIcon', 'addLabel', 'appName', 'collapsedOffset', 'expandedWidth', 'initialExpanded', 'moreLabel', 'showAddButton'],
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
  expandedChange: EventEmitter<CustomEvent<{ action: string; expanded: boolean }>>;
  /**
   * Emits when the search value changes
   */
  searchChange: EventEmitter<CustomEvent<{ action: string; value: string }>>;
  /**
   * Emits when a rail action is triggered
   */
  railAction: EventEmitter<CustomEvent<{ action: string; id: string }>>;
  /**
   * Emits when the add button is clicked
   */
  addAction: EventEmitter<CustomEvent<{ action: string }>>;
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
  inputs: ['clearOnSubmit', 'enableEnterSubmit', 'enableVoiceInput', 'maxLines', 'placeholder', 'searchButtonVariant', 'searchIconPosition'],
  methods: ['setFocus']
})
@Component({
  selector: 'spectrum-search-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['clearOnSubmit', 'enableEnterSubmit', 'enableVoiceInput', 'maxLines', 'placeholder', 'searchButtonVariant', 'searchIconPosition'],
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

  searchSubmit: EventEmitter<CustomEvent<{ action: string; value: string }>>;
  /**
   * Emits when input value changes, for real-time filtering
   */
  searchInput: EventEmitter<CustomEvent<{ action: string; value: string }>>;
}


@ProxyCmp({
  inputs: ['action', 'customStyle', 'debug', 'disabled', 'dropdownIcon', 'errorText', 'invalid', 'itemHeight', 'loading', 'loadingText', 'maxHeight', 'mobileFullscreen', 'multiple', 'noResultsText', 'options', 'placeholder', 'required', 'searchPlaceholder', 'searchTitle', 'searchable', 'selectAllText', 'selectedValue', 'selectedValues', 'selectionsLabel', 'showDropdownIcon', 'showIcon', 'showSelectAll', 'size', 'state', 'touchOptimized', 'variant', 'virtualScrolling']
})
@Component({
  selector: 'spectrum-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'customStyle', 'debug', 'disabled', 'dropdownIcon', 'errorText', 'invalid', 'itemHeight', 'loading', 'loadingText', 'maxHeight', 'mobileFullscreen', 'multiple', 'noResultsText', 'options', 'placeholder', 'required', 'searchPlaceholder', 'searchTitle', 'searchable', 'selectAllText', 'selectedValue', 'selectedValues', 'selectionsLabel', 'showDropdownIcon', 'showIcon', 'showSelectAll', 'size', 'state', 'touchOptimized', 'variant', 'virtualScrolling'],
})
export class SpectrumSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selectChange', 'searchChange', 'dropdownOpen', 'dropdownClose']);
  }
}


import type { SpectrumSelectOption as ISpectrumSelectSpectrumSelectOption } from '@stencil-storybook-boilerplate/core';

export declare interface SpectrumSelect extends Components.SpectrumSelect {

  selectChange: EventEmitter<CustomEvent<{ value: string; label: string; option: [object Object] | null; selectedValues?: string[]; selectedOptions?: [object Object][]; }>>;

  searchChange: EventEmitter<CustomEvent<string>>;

  dropdownOpen: EventEmitter<CustomEvent<void>>;

  dropdownClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['color', 'config', 'dark', 'debug', 'showSwatches']
})
@Component({
  selector: 'spectrum-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'config', 'dark', 'debug', 'showSwatches'],
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
  inputs: ['actionLabel', 'actionValue', 'autoClose', 'debug', 'dismissible', 'duration', 'icon', 'message', 'persistent', 'position', 'showCloseButton', 'showIcon', 'toastTitle', 'variant', 'visible'],
  methods: ['show', 'hide', 'dismiss']
})
@Component({
  selector: 'spectrum-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionLabel', 'actionValue', 'autoClose', 'debug', 'dismissible', 'duration', 'icon', 'message', 'persistent', 'position', 'showCloseButton', 'showIcon', 'toastTitle', 'variant', 'visible'],
})
export class SpectrumToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['toastAction', 'toastDismiss']);
  }
}


export declare interface SpectrumToast extends Components.SpectrumToast {

  toastAction: EventEmitter<CustomEvent<{ action: string; toast: any }>>;

  toastDismiss: EventEmitter<CustomEvent<{ action: string; toast: any }>>;
}


@ProxyCmp({
  inputs: ['background', 'backgroundposition', 'backgroundsize', 'debug', 'showSwatches']
})
@Component({
  selector: 'spectrum-wallpaper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['background', 'backgroundposition', 'backgroundsize', 'debug', 'showSwatches'],
})
export class SpectrumWallpaper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumWallpaper extends Components.SpectrumWallpaper {}


