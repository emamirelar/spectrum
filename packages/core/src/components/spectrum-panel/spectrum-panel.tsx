import { Component, Host, h, Prop } from '@stencil/core';

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
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-panel] ${message}`, ...args);
    }
  }

  render() {
    this.debugLog('Rendering panel', { 
      background: this.background,
      frost: this.frost,
      size: this.size, 
      width: this.width, 
      height: this.height,
      noPadding: this.noPadding
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
      [`size-${this.size}`]: true
    };

    // Build inline styles for custom dimensions
    const customStyles: { [key: string]: string } = {};
    if (this.width) customStyles['--panel-custom-width'] = this.width;
    if (this.height) customStyles['--panel-custom-height'] = this.height;

    return (
      <Host class="panel-host" style={Object.keys(customStyles).length > 0 ? customStyles : undefined}>
        <div class={panelClasses}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
