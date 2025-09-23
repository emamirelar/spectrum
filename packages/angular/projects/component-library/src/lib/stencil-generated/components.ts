/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@unops-itg-npm/cpit-spectrum';


@ProxyCmp({
  inputs: ['accordionId', 'chipVariant', 'collapsedIcon', 'debug', 'disabled', 'expandMode', 'expanded', 'expandedIcon', 'haptic', 'horizontalScroll', 'label', 'outline', 'sections', 'sound', 'variant']
})
@Component({
  selector: 'spectrum-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accordionId', 'chipVariant', 'collapsedIcon', 'debug', 'disabled', 'expandMode', 'expanded', 'expandedIcon', 'haptic', 'horizontalScroll', 'label', 'outline', 'sections', 'sound', 'variant'],
})
export class SpectrumAccordion {
  protected el: HTMLSpectrumAccordionElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['accordionToggle']);
  }
}


export declare interface SpectrumAccordion extends Components.SpectrumAccordion {
  /**
   * Event emitted when the accordion is toggled
   */
  accordionToggle: EventEmitter<CustomEvent<{ expanded: boolean; accordionId: string; sectionId?: string; expandedSections?: string[]; }>>;
}


@ProxyCmp({
  inputs: ['breakpoint', 'collapseMobile', 'debug', 'footerHeight', 'gap', 'headerHeight', 'headerTitle', 'logoAlt', 'logoSrc', 'profileText', 'responsive', 'rightBarCollapsible', 'rightBarExpanded', 'rightBarWidth', 'showFooter', 'showHeader', 'showLogo', 'showProfile', 'showRightBar', 'sidebarCollapsedWidth', 'sidebarCollapsible', 'sidebarExpanded', 'sidebarExpandedWidth', 'sidebarPosition']
})
@Component({
  selector: 'spectrum-app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['breakpoint', 'collapseMobile', 'debug', 'footerHeight', 'gap', 'headerHeight', 'headerTitle', 'logoAlt', 'logoSrc', 'profileText', 'responsive', 'rightBarCollapsible', 'rightBarExpanded', 'rightBarWidth', 'showFooter', 'showHeader', 'showLogo', 'showProfile', 'showRightBar', 'sidebarCollapsedWidth', 'sidebarCollapsible', 'sidebarExpanded', 'sidebarExpandedWidth', 'sidebarPosition'],
})
export class SpectrumAppLayout {
  protected el: HTMLSpectrumAppLayoutElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['sidebarToggle', 'profileAction', 'rightBarToggle']);
  }
}


export declare interface SpectrumAppLayout extends Components.SpectrumAppLayout {

  sidebarToggle: EventEmitter<CustomEvent<{ action: string; expanded: boolean }>>;

  profileAction: EventEmitter<CustomEvent<{ action: string; type: 'profile' }>>;

  rightBarToggle: EventEmitter<CustomEvent<{ action: string; expanded: boolean }>>;
}


@ProxyCmp({
  inputs: ['debug', 'leftCollapsed', 'rightCollapsed', 'showContentNavigation', 'showContentSidebar', 'showFooterCenter', 'showFooterLeft', 'showFooterRight', 'showHeaderAppId', 'showHeaderMiddle', 'showHeaderUtility']
})
@Component({
  selector: 'spectrum-application-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['debug', 'leftCollapsed', 'rightCollapsed', 'showContentNavigation', 'showContentSidebar', 'showFooterCenter', 'showFooterLeft', 'showFooterRight', 'showHeaderAppId', 'showHeaderMiddle', 'showHeaderUtility'],
})
export class SpectrumApplicationLayout {
  protected el: HTMLSpectrumApplicationLayoutElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumApplicationLayout extends Components.SpectrumApplicationLayout {}


@ProxyCmp({
  inputs: ['action', 'alt', 'avatarId', 'clickable', 'customStyle', 'debug', 'disabled', 'icon', 'initials', 'label', 'shape', 'showStatus', 'size', 'src', 'status', 'variant']
})
@Component({
  selector: 'spectrum-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'alt', 'avatarId', 'clickable', 'customStyle', 'debug', 'disabled', 'icon', 'initials', 'label', 'shape', 'showStatus', 'size', 'src', 'status', 'variant'],
})
export class SpectrumAvatar {
  protected el: HTMLSpectrumAvatarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['avatarAction']);
  }
}


export declare interface SpectrumAvatar extends Components.SpectrumAvatar {

  avatarAction: EventEmitter<CustomEvent<{ action?: string; label?: string; id?: string }>>;
}


@ProxyCmp({
  inputs: ['circular', 'debug', 'size', 'text', 'variant']
})
@Component({
  selector: 'spectrum-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['circular', 'debug', 'size', 'text', 'variant'],
})
export class SpectrumBadge {
  protected el: HTMLSpectrumBadgeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumBadge extends Components.SpectrumBadge {}


@ProxyCmp({
  inputs: ['action', 'buttonText', 'customStyle', 'debug', 'disabled', 'haptic', 'href', 'iconOnly', 'leftIcon', 'minimalAnimation', 'outline', 'rel', 'rightIcon', 'ripple', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'sound', 'state', 'target', 'variant']
})
@Component({
  selector: 'spectrum-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'buttonText', 'customStyle', 'debug', 'disabled', 'haptic', 'href', 'iconOnly', 'leftIcon', 'minimalAnimation', 'outline', 'rel', 'rightIcon', 'ripple', 'showButtonText', 'showLeftIcon', 'showRightIcon', 'size', 'sound', 'state', 'target', 'variant'],
})
export class SpectrumButton {
  protected el: HTMLSpectrumButtonElement;
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
  inputs: ['action', 'background', 'cardSubtitle', 'cardTitle', 'clickable', 'debug', 'disabled', 'height', 'href', 'imageAlt', 'imageUrl', 'noPadding', 'rel', 'showFooterActions', 'showHeaderActions', 'size', 'target', 'textOverflow', 'variant', 'width']
})
@Component({
  selector: 'spectrum-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'background', 'cardSubtitle', 'cardTitle', 'clickable', 'debug', 'disabled', 'height', 'href', 'imageAlt', 'imageUrl', 'noPadding', 'rel', 'showFooterActions', 'showHeaderActions', 'size', 'target', 'textOverflow', 'variant', 'width'],
})
export class SpectrumCard {
  protected el: HTMLSpectrumCardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['cardAction']);
  }
}


export declare interface SpectrumCard extends Components.SpectrumCard {
  /**
   * Event emitted when card is clicked
   */
  cardAction: EventEmitter<CustomEvent<{action: string; cardId?: string; title?: string}>>;
}


@ProxyCmp({
  inputs: ['action', 'debug', 'disabled', 'haptic', 'label', 'leadingIcon', 'outline', 'ripple', 'selected', 'showTrailingIcon', 'size', 'sound', 'trailingIcon', 'variant']
})
@Component({
  selector: 'spectrum-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['action', 'debug', 'disabled', 'haptic', 'label', 'leadingIcon', 'outline', 'ripple', 'selected', 'showTrailingIcon', 'size', 'sound', 'trailingIcon', 'variant'],
})
export class SpectrumChip {
  protected el: HTMLSpectrumChipElement;
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
  inputs: ['align', 'breakpoint', 'centerContainer', 'debug', 'direction', 'fullWidth', 'justify', 'noWrap', 'responsive', 'spacing', 'stackBelow', 'wrap']
})
@Component({
  selector: 'spectrum-cluster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'breakpoint', 'centerContainer', 'debug', 'direction', 'fullWidth', 'justify', 'noWrap', 'responsive', 'spacing', 'stackBelow', 'wrap'],
})
export class SpectrumCluster {
  protected el: HTMLSpectrumClusterElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumCluster extends Components.SpectrumCluster {}


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
  protected el: HTMLSpectrumCollapsibleListElement;
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
  inputs: ['centerContent', 'centered', 'debug', 'fullWidthMobile', 'maxWidth', 'padding', 'paddingX', 'paddingY', 'responsive', 'size']
})
@Component({
  selector: 'spectrum-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['centerContent', 'centered', 'debug', 'fullWidthMobile', 'maxWidth', 'padding', 'paddingX', 'paddingY', 'responsive', 'size'],
})
export class SpectrumContainer {
  protected el: HTMLSpectrumContainerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumContainer extends Components.SpectrumContainer {}


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
  protected el: HTMLSpectrumContextMenuElement;
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
  inputs: ['actions', 'background', 'conversationtitle', 'debug', 'loading', 'messages', 'sound', 'sources'],
  methods: ['scrollToLatest']
})
@Component({
  selector: 'spectrum-conversation-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actions', 'background', 'conversationtitle', 'debug', 'loading', 'messages', 'sound', 'sources'],
})
export class SpectrumConversationPanel {
  protected el: HTMLSpectrumConversationPanelElement;
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
  inputs: ['autoLoadGTM', 'consentVersion', 'cookieExpireDays', 'cookieName', 'cookiePolicyUrl', 'debug', 'gtmContainerId', 'message', 'position', 'privacyPolicyUrl', 'showCookieStatus', 'showDetails', 'showOnFirstVisit', 'translations'],
  methods: ['getStoredConsent', 'updateConsent', 'showConsent', 'hideConsent', 'resetConsent']
})
@Component({
  selector: 'spectrum-cookie-compliance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoLoadGTM', 'consentVersion', 'cookieExpireDays', 'cookieName', 'cookiePolicyUrl', 'debug', 'gtmContainerId', 'message', 'position', 'privacyPolicyUrl', 'showCookieStatus', 'showDetails', 'showOnFirstVisit', 'translations'],
})
export class SpectrumCookieCompliance {
  protected el: HTMLSpectrumCookieComplianceElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['consentUpdated', 'consentDismissed']);
  }
}


import type { CookieConsent as ISpectrumCookieComplianceCookieConsent } from '@unops-itg-npm/cpit-spectrum';

export declare interface SpectrumCookieCompliance extends Components.SpectrumCookieCompliance {
  /**
   * Event emitted when consent is given or updated
   */
  consentUpdated: EventEmitter<CustomEvent<ISpectrumCookieComplianceCookieConsent>>;
  /**
   * Event emitted when consent banner is dismissed
   */
  consentDismissed: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['background', 'buttons', 'closeOnEscape', 'closeOnOutsideClick', 'debug', 'dialogId', 'dialogTitle', 'height', 'noPadding', 'open', 'showCloseButton', 'size', 'width'],
  methods: ['show', 'hide', 'toggle']
})
@Component({
  selector: 'spectrum-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['background', 'buttons', 'closeOnEscape', 'closeOnOutsideClick', 'debug', 'dialogId', 'dialogTitle', 'height', 'noPadding', 'open', 'showCloseButton', 'size', 'width'],
})
export class SpectrumDialog {
  protected el: HTMLSpectrumDialogElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['dialogAction', 'dialogClose']);
  }
}


export declare interface SpectrumDialog extends Components.SpectrumDialog {
  /**
   * Event emitted when dialog actions occur
   */
  dialogAction: EventEmitter<CustomEvent<{action: string; dialogId?: string; buttonId?: string}>>;
  /**
   * Event emitted when dialog is closed
   */
  dialogClose: EventEmitter<CustomEvent<{action: string; dialogId?: string}>>;
}


@ProxyCmp({
  inputs: ['align', 'alignContent', 'breakpoint', 'columnGap', 'debug', 'direction', 'fullHeight', 'fullWidth', 'gap', 'inline', 'justify', 'mobileDirection', 'responsive', 'rowGap', 'wrap']
})
@Component({
  selector: 'spectrum-flex',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'alignContent', 'breakpoint', 'columnGap', 'debug', 'direction', 'fullHeight', 'fullWidth', 'gap', 'inline', 'justify', 'mobileDirection', 'responsive', 'rowGap', 'wrap'],
})
export class SpectrumFlex {
  protected el: HTMLSpectrumFlexElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumFlex extends Components.SpectrumFlex {}


@ProxyCmp({
  inputs: ['alignContent', 'alignItems', 'areas', 'autoColumns', 'autoFill', 'autoFit', 'autoRows', 'breakpoint', 'columnGap', 'columns', 'debug', 'fullHeight', 'fullWidth', 'gap', 'inline', 'justifyContent', 'justifyItems', 'minColumnWidth', 'minRowHeight', 'mobileColumns', 'responsive', 'rowGap', 'rows']
})
@Component({
  selector: 'spectrum-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['alignContent', 'alignItems', 'areas', 'autoColumns', 'autoFill', 'autoFit', 'autoRows', 'breakpoint', 'columnGap', 'columns', 'debug', 'fullHeight', 'fullWidth', 'gap', 'inline', 'justifyContent', 'justifyItems', 'minColumnWidth', 'minRowHeight', 'mobileColumns', 'responsive', 'rowGap', 'rows'],
})
export class SpectrumGrid {
  protected el: HTMLSpectrumGridElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumGrid extends Components.SpectrumGrid {}


@ProxyCmp({
  inputs: ['animationDuration', 'autoplay', 'carouselMode', 'debug', 'height', 'keyboardNavigation', 'overlayStyle', 'pauseOnHover', 'rounded', 'shaded', 'showArrows', 'showDots', 'slides']
})
@Component({
  selector: 'spectrum-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['animationDuration', 'autoplay', 'carouselMode', 'debug', 'height', 'keyboardNavigation', 'overlayStyle', 'pauseOnHover', 'rounded', 'shaded', 'showArrows', 'showDots', 'slides'],
})
export class SpectrumHero {
  protected el: HTMLSpectrumHeroElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['heroAction', 'slideChange', 'imageNavigation']);
  }
}


export declare interface SpectrumHero extends Components.SpectrumHero {
  /**
   * Event emitted when a hero action button is clicked
   */
  heroAction: EventEmitter<CustomEvent<{ action: string; slideIndex: number; slideTitle?: string; navigationType: 'event' | 'direct'; href?: string }>>;
  /**
   * Event emitted when slide changes
   */
  slideChange: EventEmitter<CustomEvent<{ action: string; slideIndex: number; totalSlides: number }>>;
  /**
   * Event emitted when an image is clicked in carousel mode
   */
  imageNavigation: EventEmitter<CustomEvent<{ action: string; slideIndex: number; direction: 'next' | 'previous' }>>;
}


@ProxyCmp({
  inputs: ['allowDelete', 'allowUpload', 'allowUrlInput', 'background', 'debug', 'frostControlBar', 'galleryTitle', 'images', 'imagesJson', 'previewMode', 'primaryActionIcon', 'primaryActionText', 'primaryActionValue', 'scrollDirection', 'selectedImages', 'selectionMode']
})
@Component({
  selector: 'spectrum-image-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowDelete', 'allowUpload', 'allowUrlInput', 'background', 'debug', 'frostControlBar', 'galleryTitle', 'images', 'imagesJson', 'previewMode', 'primaryActionIcon', 'primaryActionText', 'primaryActionValue', 'scrollDirection', 'selectedImages', 'selectionMode'],
})
export class SpectrumImageGallery {
  protected el: HTMLSpectrumImageGalleryElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['imageSelected', 'imageDeselect', 'imageAdded', 'imageDeleted', 'imagePreview', 'primaryAction']);
  }
}


import type { ImageConfig as ISpectrumImageGalleryImageConfig } from '@unops-itg-npm/cpit-spectrum';
import type { ImageAddedEvent as ISpectrumImageGalleryImageAddedEvent } from '@unops-itg-npm/cpit-spectrum';
import type { ImageDeletedEvent as ISpectrumImageGalleryImageDeletedEvent } from '@unops-itg-npm/cpit-spectrum';

export declare interface SpectrumImageGallery extends Components.SpectrumImageGallery {

  imageSelected: EventEmitter<CustomEvent<ISpectrumImageGalleryImageConfig>>;

  imageDeselect: EventEmitter<CustomEvent<ISpectrumImageGalleryImageConfig>>;

  imageAdded: EventEmitter<CustomEvent<ISpectrumImageGalleryImageAddedEvent>>;

  imageDeleted: EventEmitter<CustomEvent<ISpectrumImageGalleryImageDeletedEvent>>;

  imagePreview: EventEmitter<CustomEvent<ISpectrumImageGalleryImageConfig>>;

  primaryAction: EventEmitter<CustomEvent<{ action: string; selectedImages: [object Object][]; selectedIds: string[]; count: number }>>;
}


@ProxyCmp({
  inputs: ['directNavigation', 'items', 'leftItems', 'logoHref', 'logoLabel', 'mobileBreakpoint', 'mobileIconColor', 'mobileMenuTitle', 'navigationColor', 'orientation', 'rightItems', 'variant'],
  methods: ['close']
})
@Component({
  selector: 'spectrum-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['directNavigation', 'items', 'leftItems', 'logoHref', 'logoLabel', 'mobileBreakpoint', 'mobileIconColor', 'mobileMenuTitle', 'navigationColor', 'orientation', 'rightItems', 'variant'],
})
export class SpectrumMenu {
  protected el: HTMLSpectrumMenuElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['itemClick']);
  }
}


export declare interface SpectrumMenu extends Components.SpectrumMenu {
  /**
   * Event emitted when a menu item is clicked
   */
  itemClick: EventEmitter<CustomEvent<{ label: string; href?: string; }>>;
}


@ProxyCmp({
  inputs: ['background', 'debug', 'frost', 'height', 'noPadding', 'panelTitle', 'size', 'titleEditable', 'width']
})
@Component({
  selector: 'spectrum-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['background', 'debug', 'frost', 'height', 'noPadding', 'panelTitle', 'size', 'titleEditable', 'width'],
})
export class SpectrumPanel {
  protected el: HTMLSpectrumPanelElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['titleChanged']);
  }
}


export declare interface SpectrumPanel extends Components.SpectrumPanel {
  /**
   * Event emitted when the title is changed (only when titleEditable is true)
   */
  titleChanged: EventEmitter<CustomEvent<{action: string, value: string}>>;
}


@ProxyCmp({
  inputs: ['addIcon', 'addLabel', 'appName', 'collapsedOffset', 'debug', 'expandedWidth', 'initialExpanded', 'moreContextActions', 'moreIcon', 'moreLabel', 'showAddButton'],
  methods: ['setExpanded', 'setShowAddButton']
})
@Component({
  selector: 'spectrum-rail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['addIcon', 'addLabel', 'appName', 'collapsedOffset', 'debug', 'expandedWidth', 'initialExpanded', 'moreContextActions', 'moreIcon', 'moreLabel', 'showAddButton'],
})
export class SpectrumRail {
  protected el: HTMLSpectrumRailElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['expandedChange', 'searchChange', 'railAction', 'addAction', 'moreContextAction']);
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
  /**
   * Emits when a context menu action is triggered
   */
  moreContextAction: EventEmitter<CustomEvent<{ action: string; label: string; id: string }>>;
}


@ProxyCmp({
})
@Component({
  selector: 'spectrum-rail-alternative',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class SpectrumRailAlternative {
  protected el: HTMLSpectrumRailAlternativeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumRailAlternative extends Components.SpectrumRailAlternative {}


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
  protected el: HTMLSpectrumRailItemElement;
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
  protected el: HTMLSpectrumSearchInputElement;
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
  inputs: ['data', 'directNavigation', 'emptyMessage', 'enableUrlSync', 'loading', 'maxPageButtons', 'pageParam', 'resultTemplate', 'resultsPerPage', 'showMetadata', 'showPagination', 'showScores', 'showThumbnails', 'sizeParam', 'translations'],
  methods: ['navigateToPage', 'getPaginationState']
})
@Component({
  selector: 'spectrum-search-results',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['data', 'directNavigation', 'emptyMessage', 'enableUrlSync', 'loading', 'maxPageButtons', 'pageParam', 'resultTemplate', 'resultsPerPage', 'showMetadata', 'showPagination', 'showScores', 'showThumbnails', 'sizeParam', 'translations'],
})
export class SpectrumSearchResults {
  protected el: HTMLSpectrumSearchResultsElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['resultAction', 'paginationAction']);
  }
}


import type { SearchResultActionPayload as ISpectrumSearchResultsSearchResultActionPayload } from '@unops-itg-npm/cpit-spectrum';
import type { PaginationActionPayload as ISpectrumSearchResultsPaginationActionPayload } from '@unops-itg-npm/cpit-spectrum';

export declare interface SpectrumSearchResults extends Components.SpectrumSearchResults {
  /**
   * Emitted when a search result is clicked or interacted with
   */
  resultAction: EventEmitter<CustomEvent<ISpectrumSearchResultsSearchResultActionPayload>>;
  /**
   * Emitted when pagination controls are used
   */
  paginationAction: EventEmitter<CustomEvent<ISpectrumSearchResultsPaginationActionPayload>>;
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
  protected el: HTMLSpectrumSelectElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['selectChange', 'searchChange', 'dropdownOpen', 'dropdownClose']);
  }
}


import type { SpectrumSelectOption as ISpectrumSelectSpectrumSelectOption } from '@unops-itg-npm/cpit-spectrum';

export declare interface SpectrumSelect extends Components.SpectrumSelect {

  selectChange: EventEmitter<CustomEvent<{ value: string; label: string; option: [object Object] | null; selectedValues?: string[]; selectedOptions?: [object Object][]; }>>;

  searchChange: EventEmitter<CustomEvent<string>>;

  dropdownOpen: EventEmitter<CustomEvent<void>>;

  dropdownClose: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  inputs: ['breakpoint', 'collapseBelow', 'collapsed', 'collapsible', 'debug', 'fullHeight', 'gap', 'maxSidebarWidth', 'minSidebarWidth', 'overlay', 'position', 'responsive', 'sidebarWidth', 'stackMobile']
})
@Component({
  selector: 'spectrum-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['breakpoint', 'collapseBelow', 'collapsed', 'collapsible', 'debug', 'fullHeight', 'gap', 'maxSidebarWidth', 'minSidebarWidth', 'overlay', 'position', 'responsive', 'sidebarWidth', 'stackMobile'],
})
export class SpectrumSidebar {
  protected el: HTMLSpectrumSidebarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumSidebar extends Components.SpectrumSidebar {}


@ProxyCmp({
  inputs: ['align', 'breakpoint', 'debug', 'direction', 'justify', 'responsive', 'reverse', 'spacing', 'wrap']
})
@Component({
  selector: 'spectrum-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['align', 'breakpoint', 'debug', 'direction', 'justify', 'responsive', 'reverse', 'spacing', 'wrap'],
})
export class SpectrumStack {
  protected el: HTMLSpectrumStackElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumStack extends Components.SpectrumStack {}


@ProxyCmp({
  inputs: ['accessibleDescribedBy', 'accessibleLabel', 'accessibleLabelledBy', 'checked', 'disabled', 'label', 'loading', 'name', 'showIcons', 'size', 'value', 'variant']
})
@Component({
  selector: 'spectrum-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibleDescribedBy', 'accessibleLabel', 'accessibleLabelledBy', 'checked', 'disabled', 'label', 'loading', 'name', 'showIcons', 'size', 'value', 'variant'],
})
export class SpectrumSwitch {
  protected el: HTMLSpectrumSwitchElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['switchChange']);
  }
}


export declare interface SpectrumSwitch extends Components.SpectrumSwitch {

  switchChange: EventEmitter<CustomEvent<{ action: string; checked: boolean; value?: string }>>;
}


@ProxyCmp({
  inputs: ['autoLoadFonts', 'color', 'config', 'coordinationTimeout', 'dark', 'debug', 'fontLoadTimeout', 'hideContentUntilReady', 'preloadFonts', 'showSwatches', 'waitForWallpaper']
})
@Component({
  selector: 'spectrum-theme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoLoadFonts', 'color', 'config', 'coordinationTimeout', 'dark', 'debug', 'fontLoadTimeout', 'hideContentUntilReady', 'preloadFonts', 'showSwatches', 'waitForWallpaper'],
})
export class SpectrumTheme {
  protected el: HTMLSpectrumThemeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumTheme extends Components.SpectrumTheme {}


@ProxyCmp({
  inputs: ['actionLabel', 'actionValue', 'autoClose', 'debug', 'dismissible', 'duration', 'icon', 'maxWidth', 'message', 'minWidth', 'persistent', 'position', 'showCloseButton', 'showIcon', 'toastTitle', 'variant', 'visible'],
  methods: ['show', 'hide', 'dismiss']
})
@Component({
  selector: 'spectrum-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionLabel', 'actionValue', 'autoClose', 'debug', 'dismissible', 'duration', 'icon', 'maxWidth', 'message', 'minWidth', 'persistent', 'position', 'showCloseButton', 'showIcon', 'toastTitle', 'variant', 'visible'],
})
export class SpectrumToast {
  protected el: HTMLSpectrumToastElement;
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
  inputs: ['applyToRoot', 'background', 'backgroundPosition', 'backgroundSize', 'debug', 'preloadColors', 'showSwatches', 'signalReady']
})
@Component({
  selector: 'spectrum-wallpaper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['applyToRoot', 'background', 'backgroundPosition', 'backgroundSize', 'debug', 'preloadColors', 'showSwatches', 'signalReady'],
})
export class SpectrumWallpaper {
  protected el: HTMLSpectrumWallpaperElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface SpectrumWallpaper extends Components.SpectrumWallpaper {}


@ProxyCmp({
  inputs: ['allowStepSelection', 'completeButtonLabel', 'cookieExpirationDays', 'currentStep', 'nextButtonLabel', 'persistProgress', 'previousButtonLabel', 'showNavigation', 'showTimeIndicators', 'steps', 'wizardId'],
  methods: ['nextStep', 'previousStep', 'goToStep', 'completeWizard', 'resetProgress', 'getTotalEstimatedTime']
})
@Component({
  selector: 'spectrum-wizard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowStepSelection', 'completeButtonLabel', 'cookieExpirationDays', 'currentStep', 'nextButtonLabel', 'persistProgress', 'previousButtonLabel', 'showNavigation', 'showTimeIndicators', 'steps', 'wizardId'],
})
export class SpectrumWizard {
  protected el: HTMLSpectrumWizardElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['stepChange', 'wizardComplete']);
  }
}


import type { WizardStepChangeEvent as ISpectrumWizardWizardStepChangeEvent } from '@unops-itg-npm/cpit-spectrum';
import type { WizardCompleteEvent as ISpectrumWizardWizardCompleteEvent } from '@unops-itg-npm/cpit-spectrum';

export declare interface SpectrumWizard extends Components.SpectrumWizard {
  /**
   * Emitted when step changes
   */
  stepChange: EventEmitter<CustomEvent<ISpectrumWizardWizardStepChangeEvent>>;
  /**
   * Emitted when wizard is completed
   */
  wizardComplete: EventEmitter<CustomEvent<ISpectrumWizardWizardCompleteEvent>>;
}


