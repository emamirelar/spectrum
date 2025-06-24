import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'spectrum-panel',
  styleUrl: 'spectrum-panel.scss',
  shadow: false,
})
export class SpectrumPanel {
  /**
   * Whether to apply frost effect (translucent background with blur)
   * Default: false
   */
  @Prop() frost: boolean = false;

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
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-panel] ${message}`, ...args);
    }
  }

  render() {
    this.debugLog('Rendering panel', { 
      frost: this.frost, 
      size: this.size, 
      width: this.width, 
      height: this.height 
    });
    
    // Copy the exact class approach from conversation panel
    const panelClasses = [
      'panel',
      this.frost ? 'frost' : '',
      `size-${this.size}`
    ].filter(Boolean).join(' ');

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
