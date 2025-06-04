import { Component, h, Host, Prop, State, Element, Watch } from '@stencil/core';
import {
  argbFromRgb,
  themeFromSourceColor,
  hexFromArgb,
} from '@material/material-color-utilities';

@Component({
  tag: 'spectrum-wallpaper',
  styleUrl: 'spectrum-wallpaper.scss',
  shadow: false,
})
export class SpectrumWallpaper {
  @Element() hostElement: HTMLElement;

  @State() dominantColor: string = '';
  private imageLoadPromise: Promise<void> | null = null;

  /**
   * The background value (color, gradient, or image URL)
   */
  @Prop() background: string;

  /**
   * Whether to show the theme color swatches
   */
  @Prop({ attribute: 'show-swatches' }) showSwatches: boolean = false;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * The background image position
   */
  @Prop({ attribute: 'backgroundposition' }) backgroundposition: string = 'center';

  /**
   * The background image size
   */
  @Prop({ attribute: 'backgroundsize' }) backgroundsize: string = 'cover';

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-wallpaper] ${message}`, ...args);
    }
  }

  /**
   * Debug warning utility
   */
  private debugWarn(message: string, ...args: any[]) {
    if (this.debug) {
      console.warn(`[spectrum-wallpaper] ${message}`, ...args);
    }
  }

  /**
   * Debug error utility
   */
  private debugError(message: string, ...args: any[]) {
    if (this.debug) {
      console.error(`[spectrum-wallpaper] ${message}`, ...args);
    }
  }

  componentWillLoad() {
    // Debug verification - this should always log if debug is enabled
    this.debugLog('Debug mode enabled - component initializing');
    
    if (this.background) {
      this.extractDominantColor();
    } else {
      // Apply default theme when no background is provided
      this.debugLog('No background provided, applying default theme');
      this.updateTheme('#0070d2'); // Default blue theme
    }
  }

  @Watch('background')
  async extractDominantColor() {
    if (!this.background) return;

    // If we already have a loading promise, wait for it to complete
    if (this.imageLoadPromise) {
      await this.imageLoadPromise;
    }

    // Start new loading process
    this.imageLoadPromise = new Promise<void>((resolve) => {
      // Extract URL from background string if it's in url() format
      let imageUrl = this.background;
      const urlMatch = this.background.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch) {
        imageUrl = urlMatch[1];
      }

      // Only try image extraction for actual URLs
      if (imageUrl.startsWith('http') || imageUrl.startsWith('//') || imageUrl.startsWith('blob:')) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          this.debugLog('Image loaded successfully:', imageUrl);
          try {
            const color = this.extractColorFromImage(img);
            this.updateTheme(color);
            this.debugLog('Theme updated with extracted color:', color);
          } catch (error) {
            this.debugWarn('Color extraction failed, using fallback color:', error);
            const fallbackColor = this.extractColorFromBackground(this.background);
            this.updateTheme(fallbackColor);
          }
          resolve();
        };

        img.onerror = (error) => {
          this.debugWarn('Image failed to load:', imageUrl, error);
          // If image fails to load, extract color from background string
          const color = this.extractColorFromBackground(this.background);
          this.updateTheme(color);
          resolve();
        };

        img.src = imageUrl;
      } else {
        // Not an image URL, extract color from background string directly
        const color = this.extractColorFromBackground(this.background);
        this.updateTheme(color);
        resolve();
      }
    });

    await this.imageLoadPromise;
  }

  private extractColorFromImage(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '#0070d2'; // Fallback to default blue

    // Scale down large images for better performance and to avoid memory issues
    const maxSize = 300;
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    
    try {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const color = this.getAverageColor(imageData);
      this.debugLog('Extracted color from image:', color);
      return color;
    } catch (error) {
      this.debugWarn('Failed to extract color from image (likely CORS issue):', error);
      // If CORS prevents canvas extraction, fall back to default blue for ocean
      return '#0070d2';
    }
  }

  private extractColorFromBackground(background: string): string {
    this.debugLog('Extracting color from background string:', background);
    
    // Try to extract color from gradient
    const gradientMatch = background.match(/linear-gradient\([^)]+\)/);
    if (gradientMatch) {
      return this.extractColorFromGradient(gradientMatch[0]);
    }

    // If it's a URL, try to guess color based on URL or fallback
    if (background.includes('url(')) {
      // For ocean images, default to blue
      if (background.includes('1439066615861')) { // Ocean image ID
        this.debugLog('Ocean image detected, using blue fallback');
        return '#1976d2';
      }
      // For forest images, default to green  
      if (background.includes('1441974231531')) { // Forest image ID
        this.debugLog('Forest image detected, using green fallback');
        return '#388e3c';
      }
      // Generic image fallback
      return '#0070d2';
    }

    // Try to use as solid color
    if (background.startsWith('#')) {
      return background;
    }
    
    return '#0070d2';
  }

  private extractColorFromGradient(gradient: string): string {
    // Extract first color from gradient
    const colorMatch = gradient.match(/#[0-9a-fA-F]{6}/);
    return colorMatch ? colorMatch[0] : '#000000';
  }

  private getAverageColor(imageData: ImageData): string {
    const data = imageData.data;
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  private updateTheme(color: string) {
    this.debugLog('Updating theme with color:', color);
    try {
      const scheme = this.generateThemeFromColor(color);
      this.applyTheme(scheme);
      this.debugLog('Theme successfully applied with scheme:', scheme);
    } catch (error) {
      this.debugError('Failed to generate or apply theme:', error);
      // Apply a basic fallback theme
      this.applyFallbackTheme(color);
    }
  }

  private applyFallbackTheme(color: string) {
    this.debugLog('Applying fallback theme with color:', color);
    const fallbackProperties = {
      '--spectrum-color-primary': color,
      '--spectrum-color-on-primary': '#ffffff',
      '--spectrum-color-background': '#ffffff',
      '--spectrum-color-on-background': '#000000',
      '--spectrum-color-surface': '#f5f5f5',
      '--spectrum-color-on-surface': '#000000',
    };
    
    Object.entries(fallbackProperties).forEach(([property, value]) => {
      this.hostElement.style.setProperty(property, value);
    });
  }

  private generateThemeFromColor(color: string): any {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Convert RGB to ARGB using Material utilities
    const argb = argbFromRgb(r, g, b);
    
    // Generate proper Material Design 3 theme from source color
    const theme = themeFromSourceColor(argb);
    
    // Use light scheme for now (could add dark mode support later)
    return theme.schemes.light;
  }

  private applyTheme(scheme: any) {
    const customProperties = this.generateCustomProperties(scheme);
    this.debugLog('Applying theme with custom properties:', Object.keys(customProperties).length, 'properties');
    Object.entries(customProperties).forEach(([property, value]) => {
      this.hostElement.style.setProperty(property, value);
      this.debugLog(`Set ${property}: ${value}`);
    });
  }

  private generateCustomProperties(scheme: any): Record<string, string> {
    return {
      '--spectrum-color-primary': hexFromArgb(scheme.primary),
      '--spectrum-color-on-primary': hexFromArgb(scheme.onPrimary),
      '--spectrum-color-primary-container': hexFromArgb(scheme.primaryContainer),
      '--spectrum-color-on-primary-container': hexFromArgb(scheme.onPrimaryContainer),
      '--spectrum-color-secondary': hexFromArgb(scheme.secondary),
      '--spectrum-color-on-secondary': hexFromArgb(scheme.onSecondary),
      '--spectrum-color-secondary-container': hexFromArgb(scheme.secondaryContainer),
      '--spectrum-color-on-secondary-container': hexFromArgb(scheme.onSecondaryContainer),
      '--spectrum-color-tertiary': hexFromArgb(scheme.tertiary),
      '--spectrum-color-on-tertiary': hexFromArgb(scheme.onTertiary),
      '--spectrum-color-tertiary-container': hexFromArgb(scheme.tertiaryContainer),
      '--spectrum-color-on-tertiary-container': hexFromArgb(scheme.onTertiaryContainer),
      '--spectrum-color-error': hexFromArgb(scheme.error),
      '--spectrum-color-on-error': hexFromArgb(scheme.onError),
      '--spectrum-color-error-container': hexFromArgb(scheme.errorContainer),
      '--spectrum-color-on-error-container': hexFromArgb(scheme.onErrorContainer),
      '--spectrum-color-background': hexFromArgb(scheme.background),
      '--spectrum-color-on-background': hexFromArgb(scheme.onBackground),
      '--spectrum-color-surface': hexFromArgb(scheme.surface),
      '--spectrum-color-on-surface': hexFromArgb(scheme.onSurface),
      '--spectrum-color-surface-variant': hexFromArgb(scheme.surfaceVariant),
      '--spectrum-color-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
      '--spectrum-color-outline': hexFromArgb(scheme.outline),
      '--spectrum-color-outline-variant': hexFromArgb(scheme.outlineVariant),
      '--spectrum-color-shadow': hexFromArgb(scheme.shadow),
      '--spectrum-color-scrim': hexFromArgb(scheme.scrim),
      '--spectrum-color-inverse-surface': hexFromArgb(scheme.inverseSurface),
      '--spectrum-color-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
      '--spectrum-color-inverse-primary': hexFromArgb(scheme.inversePrimary),
    };
  }

  // Copy the variable to the clipboard
  private swatchClicked(variable: string) {
    navigator.clipboard.writeText(variable);
  }


  private renderSwatches() {
    if (!this.showSwatches) return null;

    const swatches = [
      { label: 'Primary', variable: '--spectrum-color-primary' },
      { label: 'On Primary', variable: '--spectrum-color-on-primary' },
      { label: 'Primary Container', variable: '--spectrum-color-primary-container' },
      { label: 'On Primary Container', variable: '--spectrum-color-on-primary-container' },
      { label: 'Secondary', variable: '--spectrum-color-secondary' },
      { label: 'On Secondary', variable: '--spectrum-color-on-secondary' },
      { label: 'Secondary Container', variable: '--spectrum-color-secondary-container' },
      { label: 'On Secondary Container', variable: '--spectrum-color-on-secondary-container' },
      { label: 'Tertiary', variable: '--spectrum-color-tertiary' },
      { label: 'On Tertiary', variable: '--spectrum-color-on-tertiary' },
      { label: 'Tertiary Container', variable: '--spectrum-color-tertiary-container' },
      { label: 'On Tertiary Container', variable: '--spectrum-color-on-tertiary-container' },
      { label: 'Error', variable: '--spectrum-color-error' },
      { label: 'On Error', variable: '--spectrum-color-on-error' },
      { label: 'Error Container', variable: '--spectrum-color-error-container' },
      { label: 'On Error Container', variable: '--spectrum-color-on-error-container' },
      { label: 'Background', variable: '--spectrum-color-background' },
      { label: 'On Background', variable: '--spectrum-color-on-background' },
      { label: 'Surface', variable: '--spectrum-color-surface' },
      { label: 'On Surface', variable: '--spectrum-color-on-surface' },
      { label: 'Surface Variant', variable: '--spectrum-color-surface-variant' },
      { label: 'On Surface Variant', variable: '--spectrum-color-on-surface-variant' },
      { label: 'Outline', variable: '--spectrum-color-outline' },
      { label: 'Outline Variant', variable: '--spectrum-color-outline-variant' },
      { label: 'Shadow', variable: '--spectrum-color-shadow' },
      { label: 'Scrim', variable: '--spectrum-color-scrim' },
      { label: 'Inverse Surface', variable: '--spectrum-color-inverse-surface' },
      { label: 'Inverse On Surface', variable: '--spectrum-color-inverse-on-surface' },
      { label: 'Inverse Primary', variable: '--spectrum-color-inverse-primary' }
    ];

    return (
      <div class="swatches">
        {swatches.map(({ label, variable }) => (
          <div class="swatch" title={variable} onClick={() => this.swatchClicked(variable)}>
            <div class="swatch-color" style={{ backgroundColor: `var(${variable})` }}></div>
            <div class="swatch-label">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const style = {
      background: this.background,
      backgroundPosition: this.backgroundposition,
      backgroundSize: this.backgroundsize,
      backgroundRepeat: 'no-repeat'
    };

    return (
      <Host class="wallpaper-host">
      <div class="wallpaper" style={style}>
        <slot></slot>
        {this.renderSwatches()}
      </div>
      </Host>
    );
  }
} 


// backgroundRepeat: 'no-repeat',
//       width: '100%',
//       height: '100%',
//       minHeight: '100vh',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',