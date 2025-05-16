import { Component, h, Host, Prop, State, Element, Watch } from '@stencil/core';

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
   * The background image position
   */
  @Prop({ attribute: 'backgroundposition' }) backgroundposition: string = 'center';

  /**
   * The background image size
   */
  @Prop({ attribute: 'backgroundsize' }) backgroundsize: string = 'cover';

  componentWillLoad() {
    if (this.background) {
      this.extractDominantColor();
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
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const color = this.extractColorFromImage(img);
        this.updateTheme(color);
        resolve();
      };

      img.onerror = () => {
        // If image fails to load, try to extract color from background string
        const color = this.extractColorFromBackground(this.background);
        this.updateTheme(color);
        resolve();
      };

      img.src = this.background;
    });

    await this.imageLoadPromise;
  }

  private extractColorFromImage(img: HTMLImageElement): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return '#000000';

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const color = this.getAverageColor(imageData);
    return color;
  }

  private extractColorFromBackground(background: string): string {
    // Try to extract color from gradient
    const gradientMatch = background.match(/linear-gradient\([^)]+\)/);
    if (gradientMatch) {
      return this.extractColorFromGradient(gradientMatch[0]);
    }

    // Try to use as solid color
    return this.background;
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
    const theme = this.generateThemeFromColor(color);
    this.applyTheme(theme);
  }

  private generateThemeFromColor(color: string): any {
    // Convert hex to RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Convert to ARGB for Material theme
    const argb = (255 << 24) | (r << 16) | (g << 8) | b;

    // Generate theme
    return {
      primary: argb,
      onPrimary: 0xFFFFFFFF,
      primaryContainer: argb,
      onPrimaryContainer: 0xFFFFFFFF,
      secondary: argb,
      onSecondary: 0xFFFFFFFF,
      secondaryContainer: argb,
      onSecondaryContainer: 0xFFFFFFFF,
      tertiary: argb,
      onTertiary: 0xFFFFFFFF,
      tertiaryContainer: argb,
      onTertiaryContainer: 0xFFFFFFFF,
      error: 0xFFB32620,
      onError: 0xFFFFFFFF,
      errorContainer: 0xFFF2B8B5,
      onErrorContainer: 0xFF410E0B,
      background: 0xFFFFFBFE,
      onBackground: 0xFF1C1B1F,
      surface: 0xFFFFFBFE,
      onSurface: 0xFF1C1B1F,
      surfaceVariant: 0xFFE7E0EC,
      onSurfaceVariant: 0xFF49454F,
      outline: 0xFF79747E,
      outlineVariant: 0xFFCAC4D0,
      shadow: 0xFF000000,
      scrim: 0xFF000000,
      inverseSurface: 0xFF313033,
      inverseOnSurface: 0xFFF4EFF4,
      inversePrimary: argb,
      surfaceTint: argb,
    };
  }

  private applyTheme(theme: any) {
    const customProperties = this.generateCustomProperties(theme);
    Object.entries(customProperties).forEach(([property, value]) => {
      this.hostElement.style.setProperty(property, value);
    });
  }

  private generateCustomProperties(theme: any): Record<string, string> {
    return {
      '--md-sys-color-primary': `#${theme.primary.toString(16).slice(2)}`,
      '--md-sys-color-on-primary': `#${theme.onPrimary.toString(16).slice(2)}`,
      '--md-sys-color-primary-container': `#${theme.primaryContainer.toString(16).slice(2)}`,
      '--md-sys-color-on-primary-container': `#${theme.onPrimaryContainer.toString(16).slice(2)}`,
      '--md-sys-color-secondary': `#${theme.secondary.toString(16).slice(2)}`,
      '--md-sys-color-on-secondary': `#${theme.onSecondary.toString(16).slice(2)}`,
      '--md-sys-color-secondary-container': `#${theme.secondaryContainer.toString(16).slice(2)}`,
      '--md-sys-color-on-secondary-container': `#${theme.onSecondaryContainer.toString(16).slice(2)}`,
      '--md-sys-color-tertiary': `#${theme.tertiary.toString(16).slice(2)}`,
      '--md-sys-color-on-tertiary': `#${theme.onTertiary.toString(16).slice(2)}`,
      '--md-sys-color-tertiary-container': `#${theme.tertiaryContainer.toString(16).slice(2)}`,
      '--md-sys-color-on-tertiary-container': `#${theme.onTertiaryContainer.toString(16).slice(2)}`,
      '--md-sys-color-error': `#${theme.error.toString(16).slice(2)}`,
      '--md-sys-color-on-error': `#${theme.onError.toString(16).slice(2)}`,
      '--md-sys-color-error-container': `#${theme.errorContainer.toString(16).slice(2)}`,
      '--md-sys-color-on-error-container': `#${theme.onErrorContainer.toString(16).slice(2)}`,
      '--md-sys-color-background': `#${theme.background.toString(16).slice(2)}`,
      '--md-sys-color-on-background': `#${theme.onBackground.toString(16).slice(2)}`,
      '--md-sys-color-surface': `#${theme.surface.toString(16).slice(2)}`,
      '--md-sys-color-on-surface': `#${theme.onSurface.toString(16).slice(2)}`,
      '--md-sys-color-surface-variant': `#${theme.surfaceVariant.toString(16).slice(2)}`,
      '--md-sys-color-on-surface-variant': `#${theme.onSurfaceVariant.toString(16).slice(2)}`,
      '--md-sys-color-outline': `#${theme.outline.toString(16).slice(2)}`,
      '--md-sys-color-outline-variant': `#${theme.outlineVariant.toString(16).slice(2)}`,
      '--md-sys-color-shadow': `#${theme.shadow.toString(16).slice(2)}`,
      '--md-sys-color-scrim': `#${theme.scrim.toString(16).slice(2)}`,
      '--md-sys-color-inverse-surface': `#${theme.inverseSurface.toString(16).slice(2)}`,
      '--md-sys-color-inverse-on-surface': `#${theme.inverseOnSurface.toString(16).slice(2)}`,
      '--md-sys-color-inverse-primary': `#${theme.inversePrimary.toString(16).slice(2)}`,
      '--md-sys-color-surface-tint': `#${theme.surfaceTint.toString(16).slice(2)}`,
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
      backgroundSize: this.backgroundsize
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