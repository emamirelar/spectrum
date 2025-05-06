import { Component, h, Host, Prop, Watch, Element } from '@stencil/core';
import {
  argbFromRgb,
  themeFromSourceColor,
  hexFromArgb,
} from '@material/material-color-utilities';

@Component({
  tag: 'spectrum-theme',
  styleUrl: 'spectrum-theme.css',
  shadow: false,
})
export class SpectrumTheme {
  @Element() el!: HTMLElement;

  /**
   * The primary color to generate the theme from
   * Can be any valid CSS color (hex, rgb, hsl)
   */
  @Prop() color: string = '#0070d2';

  /**
   * Whether to use dark mode
   */
  @Prop() dark: boolean = false;

  /**
   * Whether to show theme color swatches (useful for development)
   */
  @Prop() showSwatches: boolean = false;

  /**
   * Theme configuration object for custom overrides
   */
  @Prop() config: string = '{}';

  private themeConfig: any = {};

  componentWillLoad() {
    try {
      this.themeConfig = JSON.parse(this.config);
    } catch (e) {
      console.warn('Invalid theme configuration:', e);
    }
    this.generateTheme();
  }

  @Watch('color')
  @Watch('dark')
  @Watch('config')
  generateTheme() {
    if (!this.color) return;

    // Handle different color formats
    if (this.color.startsWith('#')) {
      const r = parseInt(this.color.slice(1, 3), 16);
      const g = parseInt(this.color.slice(3, 5), 16);
      const b = parseInt(this.color.slice(5, 7), 16);
      this.applyTheme(r, g, b);
    } else if (this.color.startsWith('rgb')) {
      const match = this.color.match(/\d+/g);
      if (match && match.length >= 3) {
        this.applyTheme(
          parseInt(match[0]),
          parseInt(match[1]),
          parseInt(match[2])
        );
      }
    }
  }

  private applyTheme(r: number, g: number, b: number) {
    // Convert RGB to ARGB (Android RGB)
    const argb = argbFromRgb(r, g, b);
    
    // Generate theme from source color
    const theme = themeFromSourceColor(argb);
    const scheme = this.dark ? theme.schemes.dark : theme.schemes.light;

    // Base system variables that should be inherited
    const systemProperties = {
      '--spectrum-sys-font-family': this.themeConfig.typography?.['font-family'] || 'inherit',
      '--spectrum-sys-font-size': this.themeConfig.typography?.['font-size'] || 'inherit',
      '--spectrum-sys-font-size-small': this.themeConfig.typography?.['font-size-small'] || 'calc(var(--spectrum-sys-font-size) * 0.875)',
      '--spectrum-sys-font-size-large': this.themeConfig.typography?.['font-size-large'] || 'calc(var(--spectrum-sys-font-size) * 1.25)',
      '--spectrum-sys-font-size-x-large': this.themeConfig.typography?.['font-size-x-large'] || 'calc(var(--spectrum-sys-font-size) * 1.5)',
      '--spectrum-sys-font-weight-regular': this.themeConfig.typography?.['font-weight-regular'] || '400',
      '--spectrum-sys-font-weight-bold': this.themeConfig.typography?.['font-weight-bold'] || '700',
      '--spectrum-sys-spacing-small': this.themeConfig.spacing?.small || 'calc(var(--spectrum-sys-spacing) * 0.5)',
      '--spectrum-sys-spacing': this.themeConfig.spacing?.base || '1em',
      '--spectrum-sys-spacing-large': this.themeConfig.spacing?.large || 'calc(var(--spectrum-sys-spacing) * 2)',
      '--spectrum-sys-spacing-x-large': this.themeConfig.spacing?.['x-large'] || 'calc(var(--spectrum-sys-spacing) * 3)',
      '--spectrum-sys-animation-duration': this.themeConfig.effects?.['animation-duration'] || '200ms',
      '--spectrum-sys-animation-timing-function': this.themeConfig.effects?.['animation-timing-function'] || 'ease-out',
      // Material Symbols font settings
      '--spectrum-sys-icon-font-family': 'Material Symbols Outlined',
      '--spectrum-sys-icon-font-size': '20px',
      '--spectrum-sys-icon-font-weight': '400',
      '--spectrum-sys-icon-line-height': '1',
      '--spectrum-sys-icon-fill': '0',
      '--spectrum-sys-icon-weight': '400',
      '--spectrum-sys-icon-grade': '0',
      '--spectrum-sys-icon-optical-size': '24'
    };

    // Theme color properties
    const colorProperties = {
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

    // Apply system properties first
    Object.entries(systemProperties).forEach(([property, value]) => {
      this.el.style.setProperty(property, value);
    });

    // Then apply color properties
    Object.entries(colorProperties).forEach(([property, value]) => {
      this.el.style.setProperty(property, value);
    });

    // Apply any custom color overrides from config
    if (this.themeConfig.colors) {
      Object.entries(this.themeConfig.colors).forEach(([key, value]) => {
        this.el.style.setProperty(`--spectrum-color-${key}`, value as string);
      });
    }
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
      { label: 'Background', variable: '--spectrum-color-background' },
      { label: 'On Background', variable: '--spectrum-color-on-background' },
      { label: 'Surface', variable: '--spectrum-color-surface' },
      { label: 'On Surface', variable: '--spectrum-color-on-surface' },
    ];

    return (
      <div class="theme-swatches">
        {swatches.map(swatch => (
          <div class="theme-swatch" data-variable={swatch.variable}>
            {swatch.label}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <Host>
        <slot></slot>
        {this.renderSwatches()}
      </Host>
    );
  }
} 