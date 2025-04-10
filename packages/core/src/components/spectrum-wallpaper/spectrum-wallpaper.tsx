import { Component, h, Prop, State, Element, Watch } from '@stencil/core';
import {
  argbFromRgb,
  themeFromSourceColor,
  hexFromArgb,
} from '@material/material-color-utilities';

@Component({
  tag: 'spectrum-wallpaper',
  styleUrl: 'spectrum-wallpaper.css',
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
  @Prop() showSwatches: boolean = false;

  /**
   * The background image position
   */
  @Prop() backgroundPosition: string = 'center';

  /**
   * The background image size
   */
  @Prop() backgroundSize: string = 'cover';

  componentWillLoad() {
    console.log('Component will load, background:', this.background);
    if (this.background) {
      this.extractDominantColor();
    }
  }

  @Watch('background')
  async extractDominantColor() {
    console.log('Extracting dominant color for background:', this.background);
    if (!this.background) return;

    // If we already have a loading promise, wait for it to complete
    if (this.imageLoadPromise) {
      await this.imageLoadPromise;
      return;
    }

    if (this.background.startsWith('url(')) {
      // Handle image URL
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      // Create a promise to handle the image load
      this.imageLoadPromise = new Promise((resolve) => {
        img.onload = async () => {
          try {
            console.log('Image loaded successfully');
            const color = await this.extractColorFromImage(img);
            console.log('Extracted color:', color);
            this.dominantColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            this.generateTheme(color[0], color[1], color[2]);
            resolve();
          } catch (error) {
            console.error('Error extracting color:', error);
            this.extractColorFromBackground();
            resolve();
          }
        };

        img.onerror = (error) => {
          console.error('Error loading image:', error);
          this.extractColorFromBackground();
          resolve();
        };
      });

      try {
        // Set the source and wait for it to load
        img.src = this.background.slice(4, -1); // Remove 'url(' and ')'
        console.log('Waiting for image to load...');
        await this.imageLoadPromise;
      } catch (error) {
        console.error('Error in image loading process:', error);
        this.extractColorFromBackground();
      } finally {
        this.imageLoadPromise = null;
      }
    } else {
      // Handle color or gradient
      this.extractColorFromBackground();
    }
  }

  private async extractColorFromImage(img: HTMLImageElement): Promise<[number, number, number]> {
    // Create a canvas to analyze the image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Set canvas size to a reasonable size for analysis
    const maxSize = 100;
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // Draw the image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Calculate average color
    let r = 0, g = 0, b = 0;
    const pixelCount = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    return [
      Math.round(r / pixelCount),
      Math.round(g / pixelCount),
      Math.round(b / pixelCount)
    ];
  }

  private extractColorFromBackground() {
    if (!this.background) return;

    // Handle different background formats
    if (this.background.startsWith('linear-gradient')) {
      // For gradients, extract the first color
      const match = this.background.match(/rgba?\([^)]+\)|#[a-f\d]{3,8}/gi);
      if (match && match.length > 0) {
        this.dominantColor = match[0];
        this.generateThemeFromCssColor(this.dominantColor);
      }
    } else {
      // For solid colors
      this.dominantColor = this.background;
      this.generateThemeFromCssColor(this.background);
    }
  }

  private generateThemeFromCssColor(cssColor: string) {
    // Handle different color formats
    if (cssColor.startsWith('#')) {
      // Convert hex to RGB
      const r = parseInt(cssColor.slice(1, 3), 16);
      const g = parseInt(cssColor.slice(3, 5), 16);
      const b = parseInt(cssColor.slice(5, 7), 16);
      this.generateTheme(r, g, b);
    } else if (cssColor.startsWith('rgb')) {
      // Extract RGB values
      const match = cssColor.match(/\d+/g);
      if (match && match.length >= 3) {
        this.generateTheme(
          parseInt(match[0]),
          parseInt(match[1]),
          parseInt(match[2])
        );
      }
    }
  }

  private generateTheme(r: number, g: number, b: number) {
    // Convert RGB to ARGB (Android RGB)
    const argb = argbFromRgb(r, g, b);
    
    // Generate theme from source color
    const theme = themeFromSourceColor(argb);

    // Convert theme colors to CSS custom properties
    const customProperties = {
      '--spectrum-color-primary': hexFromArgb(theme.schemes.light.primary),
      '--spectrum-color-on-primary': hexFromArgb(theme.schemes.light.onPrimary),
      '--spectrum-color-primary-container': hexFromArgb(theme.schemes.light.primaryContainer),
      '--spectrum-color-on-primary-container': hexFromArgb(theme.schemes.light.onPrimaryContainer),
      '--spectrum-color-secondary': hexFromArgb(theme.schemes.light.secondary),
      '--spectrum-color-on-secondary': hexFromArgb(theme.schemes.light.onSecondary),
      '--spectrum-color-secondary-container': hexFromArgb(theme.schemes.light.secondaryContainer),
      '--spectrum-color-on-secondary-container': hexFromArgb(theme.schemes.light.onSecondaryContainer),
      '--spectrum-color-tertiary': hexFromArgb(theme.schemes.light.tertiary),
      '--spectrum-color-on-tertiary': hexFromArgb(theme.schemes.light.onTertiary),
      '--spectrum-color-tertiary-container': hexFromArgb(theme.schemes.light.tertiaryContainer),
      '--spectrum-color-on-tertiary-container': hexFromArgb(theme.schemes.light.onTertiaryContainer),
      '--spectrum-color-error': hexFromArgb(theme.schemes.light.error),
      '--spectrum-color-on-error': hexFromArgb(theme.schemes.light.onError),
      '--spectrum-color-error-container': hexFromArgb(theme.schemes.light.errorContainer),
      '--spectrum-color-on-error-container': hexFromArgb(theme.schemes.light.onErrorContainer),
      '--spectrum-color-background': hexFromArgb(theme.schemes.light.background),
      '--spectrum-color-on-background': hexFromArgb(theme.schemes.light.onBackground),
      '--spectrum-color-surface': hexFromArgb(theme.schemes.light.surface),
      '--spectrum-color-on-surface': hexFromArgb(theme.schemes.light.onSurface),
      '--spectrum-color-surface-variant': hexFromArgb(theme.schemes.light.surfaceVariant),
      '--spectrum-color-on-surface-variant': hexFromArgb(theme.schemes.light.onSurfaceVariant),
      '--spectrum-color-outline': hexFromArgb(theme.schemes.light.outline),
      '--spectrum-color-outline-variant': hexFromArgb(theme.schemes.light.outlineVariant),
      '--spectrum-color-shadow': hexFromArgb(theme.schemes.light.shadow),
      '--spectrum-color-scrim': hexFromArgb(theme.schemes.light.scrim),
      '--spectrum-color-inverse-surface': hexFromArgb(theme.schemes.light.inverseSurface),
      '--spectrum-color-inverse-on-surface': hexFromArgb(theme.schemes.light.inverseOnSurface),
      '--spectrum-color-inverse-primary': hexFromArgb(theme.schemes.light.inversePrimary),
    };

    // Apply custom properties to the document root
    const root = document.documentElement;
    Object.entries(customProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
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
          <div class="swatch" title={variable}>
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
      backgroundPosition: this.backgroundPosition,
      backgroundSize: this.backgroundSize,
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <div class="wallpaper" style={style}>
        <slot></slot>
        {this.renderSwatches()}
      </div>
    );
  }
} 