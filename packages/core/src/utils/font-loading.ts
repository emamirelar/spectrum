/**
 * Font Loading Utility for Spectrum Components
 * Prevents Flash of Unstyled Content (FOUC) for Material Symbols
 */

export interface FontLoadingOptions {
  timeout?: number;
  fallbackFonts?: string[];
}

export class FontLoader {
  private static instance: FontLoader | null = null;
  private loadedFonts = new Set<string>();
  private loadingPromises = new Map<string, Promise<void>>();

  static getInstance(): FontLoader {
    if (!FontLoader.instance) {
      FontLoader.instance = new FontLoader();
    }
    return FontLoader.instance;
  }

  /**
   * Load Material Symbols font and handle FOUC
   */
  async loadMaterialSymbols(options: FontLoadingOptions = {}): Promise<void> {
    const fontFamily = 'Material Symbols Outlined';
    const { timeout = 3000, fallbackFonts = ['Segoe UI Symbol', 'Noto Color Emoji', 'sans-serif'] } = options;

    // Return existing promise if already loading
    if (this.loadingPromises.has(fontFamily)) {
      return this.loadingPromises.get(fontFamily)!;
    }

    // Return immediately if already loaded
    if (this.loadedFonts.has(fontFamily)) {
      return Promise.resolve();
    }

    const loadingPromise = this.loadFont(fontFamily, timeout, fallbackFonts);
    this.loadingPromises.set(fontFamily, loadingPromise);

    try {
      await loadingPromise;
      this.loadedFonts.add(fontFamily);
      this.markFontAsLoaded();
    } catch (error) {
      console.warn(`Failed to load ${fontFamily}:`, error);
      this.markFontAsFailed();
    } finally {
      this.loadingPromises.delete(fontFamily);
    }
  }

  private async loadFont(fontFamily: string, timeout: number, fallbackFonts: string[]): Promise<void> {
    // Try using the CSS Font Loading API if available
    if ('fonts' in document && 'FontFace' in window) {
      try {
        const font = new FontFace(fontFamily, 'url(https://fonts.gstatic.com/s/materialsymbolsoutlined/v168/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2)', {
          display: 'swap',
          weight: '400',
          style: 'normal'
        });

        // Load the font first
        await Promise.race([
          font.load(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Font loading timeout')), timeout)
          )
        ]);

        // Add loaded font to document
        (document.fonts as any).add(font);

        return;
      } catch (error) {
        console.warn('CSS Font Loading API failed, falling back to detection:', error);
      }
    }

    // Fallback: Font detection using canvas
    return this.detectFontLoad(fontFamily, fallbackFonts, timeout);
  }

  private async detectFontLoad(fontFamily: string, fallbackFonts: string[], timeout: number): Promise<void> {
    const testText = 'home'; // Material Symbol that should be different from text
    const fallbackFont = fallbackFonts[0] || 'sans-serif';
    
    // Create test elements
    const testElement = document.createElement('div');
    testElement.style.cssText = `
      position: absolute;
      left: -9999px;
      top: -9999px;
      font-size: 72px;
      font-family: ${fallbackFont};
      visibility: hidden;
    `;
    testElement.textContent = testText;
    document.body.appendChild(testElement);

    const fallbackWidth = testElement.offsetWidth;
    const fallbackHeight = testElement.offsetHeight;

    // Change to target font
    testElement.style.fontFamily = `"${fontFamily}", ${fallbackFont}`;

    return new Promise<void>((resolve, reject) => {
      const startTime = Date.now();
      
      const checkFont = () => {
        const currentWidth = testElement.offsetWidth;
        const currentHeight = testElement.offsetHeight;
        
        // Font loaded if dimensions changed
        if (currentWidth !== fallbackWidth || currentHeight !== fallbackHeight) {
          document.body.removeChild(testElement);
          resolve();
          return;
        }
        
        // Timeout check
        if (Date.now() - startTime > timeout) {
          document.body.removeChild(testElement);
          reject(new Error('Font detection timeout'));
          return;
        }
        
        // Continue checking
        requestAnimationFrame(checkFont);
      };
      
      checkFont();
    });
  }

  private markFontAsLoaded(): void {
    document.documentElement.classList.add('fonts-loaded');
    document.documentElement.classList.remove('fonts-loading', 'fonts-failed');
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('fontsloaded', { 
      detail: { status: 'loaded' }
    }));
  }

  private markFontAsFailed(): void {
    document.documentElement.classList.add('fonts-failed');
    document.documentElement.classList.remove('fonts-loading', 'fonts-loaded');
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('fontsfailed', { 
      detail: { status: 'failed' }
    }));
  }

  /**
   * Preload Material Symbols font via link elements
   */
  static preloadMaterialSymbols(): void {
    // Only add if not already present
    if (document.querySelector('link[href*="Material+Symbols+Outlined"]')) {
      return;
    }

    const preconnectGoogle = document.createElement('link');
    preconnectGoogle.rel = 'preconnect';
    preconnectGoogle.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnectGoogle);

    const preconnectGstatic = document.createElement('link');
    preconnectGstatic.rel = 'preconnect';
    preconnectGstatic.href = 'https://fonts.gstatic.com';
    preconnectGstatic.crossOrigin = 'anonymous';
    document.head.appendChild(preconnectGstatic);

    const preloadCSS = document.createElement('link');
    preloadCSS.rel = 'preload';
    preloadCSS.as = 'style';
    preloadCSS.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
    document.head.appendChild(preloadCSS);

    const preloadFont = document.createElement('link');
    preloadFont.rel = 'preload';
    preloadFont.as = 'font';
    preloadFont.type = 'font/woff2';
    preloadFont.href = 'https://fonts.gstatic.com/s/materialsymbolsoutlined/v168/kJEhBvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oFsI.woff2';
    preloadFont.crossOrigin = 'anonymous';
    document.head.appendChild(preloadFont);

    const loadCSS = document.createElement('link');
    loadCSS.rel = 'stylesheet';
    loadCSS.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap';
    document.head.appendChild(loadCSS);
  }

  /**
   * Initialize font loading for the application
   */
  static async initialize(options?: FontLoadingOptions): Promise<void> {
    // Mark as loading
    document.documentElement.classList.add('fonts-loading');
    
    // Preload fonts
    FontLoader.preloadMaterialSymbols();
    
    // Load fonts
    const loader = FontLoader.getInstance();
    await loader.loadMaterialSymbols(options);
  }
}

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  FontLoader.initialize().catch(console.warn);
} 