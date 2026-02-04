import { Component, h, Host, Prop, Watch, Element, State } from '@stencil/core';
import {
  argbFromRgb,
  themeFromSourceColor,
  hexFromArgb,
} from '@material/material-color-utilities';
import { FontLoader } from '../../utils/font-loading';
import { getSpectrumVersion, getSpectrumInfo } from '../../utils/version';

@Component({
  tag: 'spectrum-theme',
  styleUrl: 'spectrum-theme.css',
  shadow: false,
})
export class SpectrumTheme {
  @Element() el!: HTMLElement;

  /**
   * Get the version of the Spectrum component library
   * @returns {string} The semantic version string
   */
  static getVersion(): string {
    return getSpectrumVersion();
  }

  /**
   * The primary color to generate the theme from
   * Can be any valid CSS color (hex, rgb, hsl)
   */
  @Prop() color: string = '#0070d2';

  /**
   * Whether to use dark mode
   * - undefined/null: Auto-detect from user's prefers-color-scheme preference
   * - true: Force dark mode
   * - false: Force light mode
   */
  @Prop() dark?: boolean;
  
  /**
   * Internal state tracking the effective dark mode (after auto-detection)
   */
  @State() private effectiveDark: boolean = false;

  /**
   * Whether to show theme color swatches (useful for development)
   */
  @Prop() showSwatches: boolean = false;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  /**
   * Theme configuration object for custom overrides
   */
  @Prop() config: string = '{}';

  /**
   * Whether to automatically load fonts and prevent FOUC
   */
  @Prop() autoLoadFonts: boolean = true;

  /**
   * Font loading timeout in milliseconds
   */
  @Prop() fontLoadTimeout: number = 3000;

  /**
   * Whether to preload fonts via link elements
   */
  @Prop() preloadFonts: boolean = true;

  /**
   * Whether to wait for wallpaper colors before showing content
   */
  @Prop() waitForWallpaper: boolean = false;

  /**
   * Timeout for wallpaper coordination in milliseconds
   */
  @Prop() coordinationTimeout: number = 2000;

  /**
   * Whether to hide content until theme is fully ready
   */
  @Prop() hideContentUntilReady: boolean = true;

  private themeConfig: any = {};
  private fontLoader: FontLoader | null = null;
  private wallpaperReady: boolean = false;
  @State() private fontsReady: boolean = false;
  private coordinationTimer: any = null;
  private wallpaperColorsApplied: boolean = false;
  private darkModeMediaQuery: MediaQueryList | null = null;
  
  // Static flag to track global font loading state
  private static globalFontsLoaded: boolean = false;
  private static fontLoadingPromise: Promise<void> | null = null;

  /**
   * Determine the effective dark mode based on prop and user preference
   */
  private getEffectiveDarkMode(): boolean {
    // If dark prop is explicitly set (true or false), use it
    if (this.dark !== undefined && this.dark !== null) {
      return this.dark;
    }
    
    // Otherwise, auto-detect from user's system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Default to light mode
    return false;
  }

  /**
   * Handle changes to the user's color scheme preference
   */
  private handleColorSchemeChange = (event: MediaQueryListEvent) => {
    // Only respond to changes if dark prop is not explicitly set
    if (this.dark === undefined || this.dark === null) {
      this.effectiveDark = event.matches;
      if (this.debug) {
        this.debugWarn(`Color scheme changed to: ${event.matches ? 'dark' : 'light'}`);
      }
      this.generateTheme();
    }
  };

  /**
   * Debug warning utility
   */
  private debugWarn(message: string, ...args: any[]) {
    if (this.debug) {
      console.warn(`[spectrum-theme] ${message}`, ...args);
    }
  }

  /**
   * Log version information when debug mode is enabled
   */
  private logVersionInfo() {
    if (this.debug) {
      const info = getSpectrumInfo();
      console.group(`🎨 Spectrum Theme v${info.version}`);
      console.log(`📦 Package: ${info.name}`);
      console.log(`🏗️ Build Date: ${info.buildDate}`);
      console.log(`🧩 Components: ${info.components}`);
      console.log(`🔧 Theme Config:`, this.themeConfig);
      console.log(`🎯 Mode: ${this.dark ? 'Dark' : 'Light'}`);
      console.log(`🎨 Color: ${this.color}`);
      console.groupEnd();
      
      // Also emit version info as a custom event
      this.el.dispatchEvent(new CustomEvent('spectrumversion', {
        detail: info,
        bubbles: true
      }));
    }
  }
  
  /**
   * Reset global font loading state (useful for development/testing)
   */
  static resetFontLoadingState() {
    SpectrumTheme.globalFontsLoaded = false;
    SpectrumTheme.fontLoadingPromise = null;
  }

  /**
   * Initialize font loading and FOUC prevention
   */
  private async initializeFontLoading() {
    // If fonts are already loaded globally, just mark this instance as ready
    if (SpectrumTheme.globalFontsLoaded) {
      this.fontsReady = true;
      if (this.debug) {
        this.debugWarn('Fonts already loaded globally, marking instance as ready');
      }
      return;
    }
    
    // If font loading is already in progress, wait for it
    if (SpectrumTheme.fontLoadingPromise) {
      if (this.debug) {
        this.debugWarn('Font loading already in progress, waiting for completion');
      }
      try {
        await SpectrumTheme.fontLoadingPromise;
        this.fontsReady = true;
        if (this.debug) {
          this.debugWarn('Fonts loaded by another instance, marking this instance as ready');
        }
      } catch (error) {
        this.fontsReady = true;
        if (this.debug) {
          this.debugWarn('Font loading failed in another instance, marking this instance as ready anyway');
        }
      }
      return;
    }
    
    // This is the first instance, so start font loading
    if (this.debug) {
      this.debugWarn('Starting font loading for first instance');
    }
    SpectrumTheme.fontLoadingPromise = this.performFontLoading();
    
    try {
      await SpectrumTheme.fontLoadingPromise;
      SpectrumTheme.globalFontsLoaded = true;
      this.fontsReady = true;
      if (this.debug) {
        this.debugWarn('Font loading completed successfully');
      }
    } catch (error) {
      SpectrumTheme.globalFontsLoaded = true; // Mark as loaded even if failed
      this.fontsReady = true;
      if (this.debug) {
        this.debugWarn('Font loading failed, but marking as ready to proceed');
      }
    } finally {
      SpectrumTheme.fontLoadingPromise = null;
    }
  }
  
  private async performFontLoading(): Promise<void> {
    // Mark document as fonts loading
    document.documentElement.classList.add('fonts-loading');
    
    // Preload fonts if enabled
    if (this.preloadFonts) {
      FontLoader.preloadMaterialSymbols();
    }
    
    // Get or create font loader instance
    this.fontLoader = FontLoader.getInstance();
    
    // Configure font loading options
    const fontOptions = {
      timeout: this.fontLoadTimeout,
      fallbackFonts: this.themeConfig.fontFallbacks || ['Segoe UI Symbol', 'Noto Color Emoji', 'Arial', 'sans-serif']
    };
    
    // Load Material Symbols font
    await this.fontLoader.loadMaterialSymbols(fontOptions);
    
    if (this.debug) {
      this.debugWarn('Material Symbols font loaded successfully');
    }
  }

  async componentWillLoad() {
    try {
      this.themeConfig = JSON.parse(this.config);
    } catch (e) {
      if (this.debug) {
        this.debugWarn('Invalid theme configuration:', e);
      }
    }
    
    // Initialize effective dark mode (auto-detect if not explicitly set)
    this.effectiveDark = this.getEffectiveDarkMode();
    
    // Set up listener for user preference changes (only if not explicitly set)
    if (typeof window !== 'undefined' && window.matchMedia && (this.dark === undefined || this.dark === null)) {
      this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.darkModeMediaQuery.addEventListener('change', this.handleColorSchemeChange);
      
      if (this.debug) {
        this.debugWarn(`Dark mode: auto-detected as ${this.effectiveDark ? 'dark' : 'light'} (from user preference)`);
      }
    } else if (this.debug) {
      this.debugWarn(`Dark mode: explicitly set to ${this.dark}`);
    }
    
    // Initialize font loading if enabled
    if (this.autoLoadFonts) {
      await this.initializeFontLoading();
    } else {
      // If not auto-loading fonts, consider them ready
      this.fontsReady = true;
    }
    
    // Only generate initial theme if not waiting for wallpaper coordination
    if (!this.waitForWallpaper) {
      this.generateTheme();
    } else if (this.debug) {
      this.debugWarn('Skipping initial theme generation - waiting for wallpaper coordination');
    }
  }

  componentDidLoad() {
    if (this.debug) {
      this.debugWarn('ComponentDidLoad - hideContentUntilReady:', this.hideContentUntilReady, 'autoLoadFonts:', this.autoLoadFonts, 'waitForWallpaper:', this.waitForWallpaper, 'fontsReady:', this.fontsReady);
      this.logVersionInfo();
    }
    
    // Initialize theme loading state ONLY if content hiding is enabled
    if (this.hideContentUntilReady) {
      // Only add theme-loading if it's not already present (prevent multiple instances from interfering)
      if (!document.documentElement.classList.contains('theme-loading')) {
        document.documentElement.classList.add('theme-loading');
        if (this.debug) {
          this.debugWarn('Added theme-loading class to html');
        }
      } else if (this.debug) {
        this.debugWarn('theme-loading class already present on html');
      }
    }

    // Listen for font loading events if auto-loading is enabled and fonts aren't already ready
    if (this.autoLoadFonts && !this.fontsReady) {
      document.addEventListener('fontsloaded', this.handleFontsLoaded.bind(this));
      document.addEventListener('fontsfailed', this.handleFontsFailed.bind(this));
      if (this.debug) {
        this.debugWarn('Set up font loading event listeners');
      }
    } else if (this.autoLoadFonts && this.fontsReady) {
      if (this.debug) {
        this.debugWarn('Fonts already ready, skipping event listeners');
      }
    } else {
      // If not auto-loading fonts, mark them as ready immediately
      this.fontsReady = true;
      if (this.debug) {
        this.debugWarn('Fonts marked as ready (auto-loading disabled)');
      }
    }

    // Listen for wallpaper events if coordination is enabled
    if (this.waitForWallpaper) {
      document.addEventListener('wallpaper-colors-ready', this.handleWallpaperReady.bind(this));
      document.addEventListener('wallpaper-colors-failed', this.handleWallpaperFailed.bind(this));
      
      // Set coordination timeout
      this.coordinationTimer = setTimeout(() => {
        if (this.debug) {
          this.debugWarn('Wallpaper coordination timeout, proceeding without wallpaper');
        }
        this.wallpaperReady = true;
        this.checkThemeReady();
      }, this.coordinationTimeout);

      // Check if wallpaper component exists
      this.checkForWallpaperComponent();
    } else {
      // Not waiting for wallpaper, so it's ready
      this.wallpaperReady = true;
      if (this.debug) {
        this.debugWarn('Wallpaper marked as ready (coordination disabled)');
      }
    }

    // Check if theme is ready after a small delay to ensure all initialization is complete
    setTimeout(() => {
      if (this.debug) {
        this.debugWarn('Checking theme ready state - fonts:', this.fontsReady, 'wallpaper:', this.wallpaperReady);
      }
      this.checkThemeReady();
    }, 10);
  }

  disconnectedCallback() {
    // Clean up dark mode media query listener
    if (this.darkModeMediaQuery) {
      this.darkModeMediaQuery.removeEventListener('change', this.handleColorSchemeChange);
      this.darkModeMediaQuery = null;
    }
    
    // Clean up event listeners (remove regardless of current state)
    if (this.autoLoadFonts) {
      document.removeEventListener('fontsloaded', this.handleFontsLoaded.bind(this));
      document.removeEventListener('fontsfailed', this.handleFontsFailed.bind(this));
    }

    // Clean up wallpaper coordination
    if (this.waitForWallpaper) {
      document.removeEventListener('wallpaper-colors-ready', this.handleWallpaperReady.bind(this));
      document.removeEventListener('wallpaper-colors-failed', this.handleWallpaperFailed.bind(this));
      this.clearCoordinationTimer();
    }

    // Clean up theme loading state
    if (this.hideContentUntilReady) {
      document.documentElement.classList.remove('theme-loading', 'theme-ready');
    }
  }

  private handleFontsLoaded(event: CustomEvent) {
    if (this.debug) {
      this.debugWarn('Fonts loaded event received:', event.detail);
    }
    this.fontsReady = true;
    this.checkThemeReady();
    
    // Emit custom event from theme component
    this.el.dispatchEvent(new CustomEvent('themefontsloaded', {
      detail: { ...event.detail, theme: 'spectrum' },
      bubbles: true
    }));
  }

  private handleFontsFailed(event: CustomEvent) {
    if (this.debug) {
      this.debugWarn('Fonts failed event received:', event.detail);
    }
    this.fontsReady = true; // Consider failed as ready to proceed
    this.checkThemeReady();
    
    // Emit custom event from theme component
    this.el.dispatchEvent(new CustomEvent('themefontsfailed', {
      detail: { ...event.detail, theme: 'spectrum' },
      bubbles: true
    }));
  }

  private handleWallpaperReady(event: CustomEvent) {
    if (this.debug) {
      this.debugWarn('Wallpaper colors ready:', event.detail);
    }
    
    // Apply the extracted colors from wallpaper
    if (event.detail && event.detail.colors) {
      this.applyWallpaperColors(event.detail.colors);
      if (this.debug) {
        this.debugWarn('Applied wallpaper colors to theme');
      }
    }
    
    this.wallpaperReady = true;
    this.clearCoordinationTimer();
    this.checkThemeReady();

    // Emit custom event from theme component
    this.el.dispatchEvent(new CustomEvent('themewallpaperready', {
      detail: { ...event.detail, theme: 'spectrum' },
      bubbles: true
    }));
  }

  private handleWallpaperFailed(event: CustomEvent) {
    if (this.debug) {
      this.debugWarn('Wallpaper colors failed:', event.detail);
    }
    this.wallpaperReady = true; // Consider failed as ready to proceed
    this.clearCoordinationTimer();
    this.checkThemeReady();

    // Emit custom event from theme component
    this.el.dispatchEvent(new CustomEvent('themewallpaperfailed', {
      detail: { ...event.detail, theme: 'spectrum' },
      bubbles: true
    }));
  }

  private checkForWallpaperComponent() {
    // Check if spectrum-wallpaper component exists in the DOM
    const wallpaperComponent = document.querySelector('spectrum-wallpaper');
    if (!wallpaperComponent) {
      if (this.debug) {
        this.debugWarn('No wallpaper component found, proceeding without coordination');
      }
      this.wallpaperReady = true;
      this.clearCoordinationTimer();
      this.checkThemeReady();
    }
  }

  private checkThemeReady() {
    const fontsOk = !this.autoLoadFonts || this.fontsReady;
    const wallpaperOk = !this.waitForWallpaper || this.wallpaperReady;
    
    if (this.debug) {
      this.debugWarn('CheckThemeReady - fontsOk:', fontsOk, '(autoLoadFonts:', this.autoLoadFonts, 'fontsReady:', this.fontsReady, ')');
      this.debugWarn('CheckThemeReady - wallpaperOk:', wallpaperOk, '(waitForWallpaper:', this.waitForWallpaper, 'wallpaperReady:', this.wallpaperReady, ')');
    }
    
    if (fontsOk && wallpaperOk) {
      this.markThemeReady();
    } else if (this.debug) {
      this.debugWarn('Theme not ready yet - waiting for fonts or wallpaper');
    }
  }

  private markThemeReady() {
    if (this.debug) {
      this.debugWarn('MarkThemeReady called - hideContentUntilReady:', this.hideContentUntilReady);
    }
    
    if (this.hideContentUntilReady) {
      document.documentElement.classList.remove('theme-loading');
      document.documentElement.classList.add('theme-ready');
      if (this.debug) {
        this.debugWarn('Removed theme-loading, added theme-ready class to html');
      }
    }

    if (this.debug) {
      this.debugWarn('Theme fully ready - fonts:', this.fontsReady, 'wallpaper:', this.wallpaperReady);
    }
    
    // Emit theme ready event
    this.el.dispatchEvent(new CustomEvent('themeready', {
      detail: { 
        fonts: this.fontsReady,
        wallpaper: this.wallpaperReady,
        theme: 'spectrum'
      },
      bubbles: true
    }));
  }

  private clearCoordinationTimer() {
    if (this.coordinationTimer) {
      clearTimeout(this.coordinationTimer);
      this.coordinationTimer = null;
    }
  }

  /**
   * Apply colors extracted from wallpaper component
   */
  private applyWallpaperColors(scheme: any) {
    if (!scheme) return;

    if (this.debug) {
      this.debugWarn('Applying wallpaper colors scheme:', scheme);
    }

    // Mark that wallpaper colors have been applied
    this.wallpaperColorsApplied = true;

    // Apply the complete theme using the wallpaper scheme
    this.applyThemeScheme(scheme);
  }

  @Watch('dark')
  onDarkPropChange() {
    // When dark prop changes, recalculate effective dark mode
    this.effectiveDark = this.getEffectiveDarkMode();
    
    // Update or remove the media query listener based on explicit setting
    if (this.dark !== undefined && this.dark !== null) {
      // Dark mode explicitly set - remove auto-detection listener
      if (this.darkModeMediaQuery) {
        this.darkModeMediaQuery.removeEventListener('change', this.handleColorSchemeChange);
        this.darkModeMediaQuery = null;
      }
    } else if (!this.darkModeMediaQuery && typeof window !== 'undefined' && window.matchMedia) {
      // Dark mode not set - enable auto-detection
      this.darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.darkModeMediaQuery.addEventListener('change', this.handleColorSchemeChange);
    }
    
    if (this.debug) {
      this.debugWarn(`Dark prop changed: effectiveDark is now ${this.effectiveDark}`);
    }
    
    // Re-generate the theme with the new dark mode setting
    this.generateTheme();
  }

  @Watch('color')
  @Watch('config')
  @Watch('autoLoadFonts')
  @Watch('fontLoadTimeout')
  async generateTheme() {
    if (!this.color) return;

    // Don't override wallpaper colors if they've been applied and we're waiting for wallpaper
    if (this.waitForWallpaper && this.wallpaperColorsApplied) {
      if (this.debug) {
        this.debugWarn('Skipping theme generation - wallpaper colors already applied');
      }
      return;
    }

    // Re-initialize font loading if font properties changed
    if (this.autoLoadFonts && !this.fontLoader) {
      await this.initializeFontLoading();
    }

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
    const scheme = this.effectiveDark ? theme.schemes.dark : theme.schemes.light;

    // Apply the scheme
    this.applyThemeScheme(scheme);
  }

  private applyThemeScheme(scheme: any) {
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

    // Theme color properties - using BOTH naming conventions for compatibility
    const colorProperties = {
      // Standard spectrum-color-* variables (for swatches and external components)
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
      
      // System color variables (for demo content and components)
      '--spectrum-sys-color-primary': hexFromArgb(scheme.primary),
      '--spectrum-sys-color-on-primary': hexFromArgb(scheme.onPrimary),
      '--spectrum-sys-color-primary-container': hexFromArgb(scheme.primaryContainer),
      '--spectrum-sys-color-on-primary-container': hexFromArgb(scheme.onPrimaryContainer),
      '--spectrum-sys-color-secondary': hexFromArgb(scheme.secondary),
      '--spectrum-sys-color-on-secondary': hexFromArgb(scheme.onSecondary),
      '--spectrum-sys-color-secondary-container': hexFromArgb(scheme.secondaryContainer),
      '--spectrum-sys-color-on-secondary-container': hexFromArgb(scheme.onSecondaryContainer),
      '--spectrum-sys-color-tertiary': hexFromArgb(scheme.tertiary),
      '--spectrum-sys-color-on-tertiary': hexFromArgb(scheme.onTertiary),
      '--spectrum-sys-color-tertiary-container': hexFromArgb(scheme.tertiaryContainer),
      '--spectrum-sys-color-on-tertiary-container': hexFromArgb(scheme.onTertiaryContainer),
      '--spectrum-sys-color-error': hexFromArgb(scheme.error),
      '--spectrum-sys-color-on-error': hexFromArgb(scheme.onError),
      '--spectrum-sys-color-error-container': hexFromArgb(scheme.errorContainer),
      '--spectrum-sys-color-on-error-container': hexFromArgb(scheme.onErrorContainer),
      '--spectrum-sys-color-background': hexFromArgb(scheme.background),
      '--spectrum-sys-color-on-background': hexFromArgb(scheme.onBackground),
      '--spectrum-sys-color-surface': hexFromArgb(scheme.surface),
      '--spectrum-sys-color-on-surface': hexFromArgb(scheme.onSurface),
      '--spectrum-sys-color-surface-variant': hexFromArgb(scheme.surfaceVariant),
      '--spectrum-sys-color-on-surface-variant': hexFromArgb(scheme.onSurfaceVariant),
      '--spectrum-sys-color-outline': hexFromArgb(scheme.outline),
      '--spectrum-sys-color-outline-variant': hexFromArgb(scheme.outlineVariant),
      '--spectrum-sys-color-shadow': hexFromArgb(scheme.shadow),
      '--spectrum-sys-color-scrim': hexFromArgb(scheme.scrim),
      '--spectrum-sys-color-inverse-surface': hexFromArgb(scheme.inverseSurface),
      '--spectrum-sys-color-inverse-on-surface': hexFromArgb(scheme.inverseOnSurface),
      '--spectrum-sys-color-inverse-primary': hexFromArgb(scheme.inversePrimary),
    };

    // Apply system properties to theme component
    Object.entries(systemProperties).forEach(([property, value]) => {
      this.el.style.setProperty(property, value);
    });

    // Apply color properties to DOCUMENT ROOT so they're globally available
    Object.entries(colorProperties).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
      if (this.debug) {
        this.debugWarn(`Applied to document root: ${property} = ${value}`);
      }
    });

    // Apply any custom color overrides from config to document root
    if (this.themeConfig.colors) {
      Object.entries(this.themeConfig.colors).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--spectrum-color-${key}`, value as string);
        document.documentElement.style.setProperty(`--spectrum-sys-color-${key}`, value as string);
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

  // Copy the variable to the clipboard
  private swatchClicked(variable: string) {
    navigator.clipboard.writeText(variable);
  }

  render() {
    return (
      <Host>
        <slot></slot>
        {this.renderSwatches()}
        {this.autoLoadFonts && this.renderFontLoadingIndicator()}
        {this.debug && this.renderVersionIndicator()}
      </Host>
    );
  }

  private renderFontLoadingIndicator() {
    // Only show during development or when debug is enabled
    if (!this.debug) return null;
    
    // Don't show if fonts are already ready
    if (this.fontsReady) return null;
    
    // Don't show if auto-loading is disabled
    if (!this.autoLoadFonts) return null;

    return (
      <div class="font-loading-indicator" style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        padding: '8px 12px', 
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
        color: 'white', 
        fontSize: '12px', 
        borderRadius: '4px', 
        zIndex: '9999',
        fontFamily: 'monospace'
      }}>
        <span class="material-symbols-outlined" style={{ fontSize: '16px', marginRight: '4px' }}>
          font_download
        </span>
        Loading fonts...
      </div>
    );
  }

  private renderVersionIndicator() {
    const version = getSpectrumVersion();
    const isReady = this.fontsReady && (!this.waitForWallpaper || this.wallpaperReady);
    
    return (
      <div class="version-indicator" style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        padding: '8px 12px', 
        backgroundColor: isReady ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 193, 7, 0.9)', 
        color: 'white', 
        fontSize: '11px', 
        borderRadius: '4px', 
        zIndex: '9999',
        fontFamily: 'monospace',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease'
      }}
      onClick={() => this.copyVersionToClipboard()}
      title="Click to copy version info to clipboard">
        <span class="material-symbols-outlined" style={{ fontSize: '14px', marginRight: '4px', verticalAlign: 'middle' }}>
          {isReady ? 'check_circle' : 'schedule'}
        </span>
        <span style={{ verticalAlign: 'middle' }}>
          Spectrum v{version} {isReady ? '✓' : '⏳'}
        </span>
      </div>
    );
  }

  private copyVersionToClipboard() {
    const info = getSpectrumInfo();
    const versionText = `Spectrum Components v${info.version}\nPackage: ${info.name}\nBuild: ${info.buildDate}`;
    
    navigator.clipboard.writeText(versionText).then(() => {
      if (this.debug) {
        console.log('📋 Version info copied to clipboard');
      }
    }).catch(() => {
      if (this.debug) {
        console.warn('📋 Failed to copy version info to clipboard');
      }
    });
  }
} 