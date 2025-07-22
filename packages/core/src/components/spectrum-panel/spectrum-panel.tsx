import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

export type BackgroundLevel = 'opaque' | 'partial-frost' | 'full-frost' | 'transparent';

@Component({
  tag: 'spectrum-panel',
  styleUrl: 'spectrum-panel.scss',
  shadow: false,
})
export class SpectrumPanel {
  /**
   * Whether to apply frost effect (translucent background with blur)
   * @deprecated Use background property instead
   */
  @Prop() frost: boolean = false;

  /**
   * Background level for the panel
   */
  @Prop() background: BackgroundLevel = 'opaque';

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Size preset for the panel
   * Default: 'full' (occupies all available space)
   */
  @Prop() size: 'small' | 'medium' | 'large' | 'full' | 'auto' = 'full';

  /**
   * Custom width for the panel (overrides size preset)
   * Can be any valid CSS width value (e.g., '300px', '50%', '20rem')
   */
  @Prop() width?: string;

  /**
   * Custom height for the panel
   * Can be any valid CSS height value (e.g., '200px', '100vh', 'auto')
   */
  @Prop() height?: string;

  /**
   * Whether to remove the default padding from the panel
   * Useful when the content needs to extend to the panel edges
   */
  @Prop() noPadding: boolean = false;

  /**
   * Title to display at the top of the panel
   */
  @Prop() panelTitle?: string;

  /**
   * Whether the title should be editable
   * Default: false
   */
  @Prop() titleEditable: boolean = false;

  /**
   * Event emitted when the title is changed (only when titleEditable is true)
   */
  @Event({
    eventName: 'titleChanged',
    bubbles: true,
    composed: true,
    cancelable: true
  }) titleChanged: EventEmitter<{action: string, value: string}>;

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-panel] ${message}`, ...args);
    }
  }

  /**
   * Handle title edit events
   */
  private handleTitleEdit = (event: KeyboardEvent | FocusEvent, newTitle: string) => {
    const eventType = event.type;
    
    if (eventType === 'keydown') {
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();
        (event.target as HTMLElement).blur(); // Remove focus to trigger blur event
        this.titleChanged.emit({
          action: 'titleChanged',
          value: newTitle.trim()
        });
      }
    } else if (eventType === 'blur') {
      this.titleChanged.emit({
        action: 'titleChanged',
        value: newTitle.trim()
      });
    }
  }

  /**
   * Render the title element
   */
  private renderTitle() {
    if (!this.panelTitle) return null;

    return (
      <h2 
        class={{
          'panel__title': true,
          'panel__title--editable': this.titleEditable,
          'panel__title--readonly': !this.titleEditable
        }}
        contentEditable={this.titleEditable}
        onKeyDown={this.titleEditable ? (event) => {
          const target = event.target as HTMLElement;
          this.handleTitleEdit(event, target.textContent || '');
        } : undefined}
        onBlur={this.titleEditable ? (event) => {
          const target = event.target as HTMLElement;
          this.handleTitleEdit(event, target.textContent || '');
        } : undefined}
      >
        {this.panelTitle}
      </h2>
    );
  }

  render() {
    this.debugLog('Rendering panel', { 
      background: this.background,
      frost: this.frost,
      size: this.size, 
      width: this.width, 
      height: this.height,
      noPadding: this.noPadding,
      panelTitle: this.panelTitle,
      titleEditable: this.titleEditable
    });
    
    // Use background property, but fall back to frost for backward compatibility
    const effectiveBackground = this.frost && this.background === 'opaque' ? 'partial-frost' : this.background;
    
    const panelClasses = {
      'panel': true,
      'panel--opaque': effectiveBackground === 'opaque',
      'panel--partial-frost': effectiveBackground === 'partial-frost',
      'panel--full-frost': effectiveBackground === 'full-frost',
      'panel--transparent': effectiveBackground === 'transparent',
      'panel--no-padding': this.noPadding,
      'panel--has-title': !!this.panelTitle,
      [`size-${this.size}`]: true
    };

    // Build inline styles for custom dimensions
    const customStyles: { [key: string]: string } = {};
    if (this.width) customStyles['--panel-custom-width'] = this.width;
    if (this.height) customStyles['--panel-custom-height'] = this.height;

    return (
      <Host class="panel-host" style={Object.keys(customStyles).length > 0 ? customStyles : undefined}>
        <div class={panelClasses}>
          {this.renderTitle()}
          <div class="panel__content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
