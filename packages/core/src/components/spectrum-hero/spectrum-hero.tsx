import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';

export interface HeroSlide {
  type: 'image' | 'video';
  src: string;
  poster?: string; // For video posters
  alt?: string; // For accessibility
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonAction?: string;
  overlayPosition?: 'left' | 'center' | 'right';
  overlayVertical?: 'top' | 'center' | 'bottom';
}

/**
 * Spectrum Hero Component
 * A hero section component that supports both images and video backgrounds,
 * with carousel functionality, text overlays, and call-to-action buttons.
 */
@Component({
  tag: 'spectrum-hero',
  styleUrl: 'spectrum-hero.scss',
  shadow: true,
})
export class SpectrumHero {
  @Element() el: HTMLElement;

  // ============== Component Properties ==============
  
  /**
   * Hero slides as JSON string
   * Array of HeroSlide objects containing content for each slide
   */
  @Prop() slides: string = '[]';

  /**
   * Enable carousel autoplay
   * Time in milliseconds between slides (0 to disable)
   */
  @Prop() autoplay: number = 0;

  /**
   * Animation duration for slide transitions
   */
  @Prop() animationDuration: number = 1000;

  /**
   * Pause autoplay on hover
   */
  @Prop() pauseOnHover: boolean = true;

  /**
   * Show navigation dots
   */
  @Prop() showDots: boolean = true;

  /**
   * Show navigation arrows
   */
  @Prop() showArrows: boolean = true;

  /**
   * Hero height (CSS value)
   */
  @Prop() height: string = '100vh';

  /**
   * Enable keyboard navigation
   */
  @Prop() keyboardNavigation: boolean = true;

  /**
   * Debug mode
   */
  @Prop() debug: boolean = false;

  /**
   * Enable rounded corners using Spectrum design tokens
   */
  @Prop() rounded: boolean = false;

  /**
   * Add gradient shade overlay between media and content
   */
  @Prop() shaded: boolean = true;

  /**
   * Custom CSS styles for the overlay container (CSS style string)
   */
  @Prop() overlayStyle: string = '';

  // ============== Component State ==============
  @State() currentSlide: number = 0;
  @State() isPlaying: boolean = false;
  @State() parsedSlides: HeroSlide[] = [];

  // ============== Events ==============
  
  /**
   * Event emitted when a hero action button is clicked
   */
  @Event({
    eventName: 'heroAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) heroAction: EventEmitter<{ action: string; slideIndex: number; slideTitle?: string }>;

  /**
   * Event emitted when slide changes
   */
  @Event({
    eventName: 'slideChange',
    composed: true,
    cancelable: true,
    bubbles: true
  }) slideChange: EventEmitter<{ action: string; slideIndex: number; totalSlides: number }>;

  // ============== Private Properties ==============
  private autoplayInterval: NodeJS.Timeout | null = null;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.updateSlides();
  }

  componentDidLoad() {
    this.setupAutoplay();
    this.setupKeyboardNavigation();
    this.updateShadeColors();
  }

  disconnectedCallback() {
    this.clearAutoplay();
  }

  // ============== Watchers ==============
  @Watch('slides')
  slidesChanged() {
    this.updateSlides();
  }

  @Watch('autoplay')
  autoplayChanged() {
    this.setupAutoplay();
  }

  // ============== Private Methods ==============
  private log(message: string, data?: any) {
    if (this.debug) {
      console.log(`[SpectrumHero] ${message}`, data);
    }
  }

  private updateSlides() {
    try {
      this.parsedSlides = JSON.parse(this.slides);
      this.log('Slides updated', this.parsedSlides);
      
      // Reset current slide if it's out of bounds
      if (this.currentSlide >= this.parsedSlides.length) {
        this.currentSlide = 0;
      }
    } catch (error) {
      this.log('Error parsing slides', error);
      this.parsedSlides = [];
    }
  }

  private setupAutoplay() {
    this.clearAutoplay();
    
    if (this.autoplay > 0 && this.parsedSlides.length > 1) {
      this.isPlaying = true;
      this.autoplayInterval = setInterval(() => {
        this.nextSlide();
      }, this.autoplay);
      this.log('Autoplay started', this.autoplay);
    }
  }

  private clearAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
      this.isPlaying = false;
      this.log('Autoplay cleared');
    }
  }

  private resetAutoplayTimer() {
    if (this.autoplay > 0 && this.parsedSlides.length > 1) {
      this.clearAutoplay();
      this.setupAutoplay();
      this.log('Autoplay timer reset due to user interaction');
    }
  }

  private setupKeyboardNavigation() {
    if (this.keyboardNavigation) {
      document.addEventListener('keydown', this.handleKeydown);
    }
  }

  private handleKeydown = (event: KeyboardEvent) => {
    if (!this.el.matches(':focus-within')) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide(true);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide(true);
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.toggleAutoplay();
        break;
    }
  };

  private nextSlide(isUserInitiated: boolean = false) {
    const nextIndex = (this.currentSlide + 1) % this.parsedSlides.length;
    this.goToSlide(nextIndex, isUserInitiated);
  }

  private previousSlide(isUserInitiated: boolean = false) {
    const prevIndex = this.currentSlide === 0 ? this.parsedSlides.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex, isUserInitiated);
  }

  private goToSlide(index: number, isUserInitiated: boolean = false) {
    if (index >= 0 && index < this.parsedSlides.length) {
      this.currentSlide = index;
      this.slideChange.emit({
        action: 'slide-change',
        slideIndex: this.currentSlide,
        totalSlides: this.parsedSlides.length
      });
      
      // Reset autoplay timer when user navigates manually
      if (isUserInitiated) {
        this.resetAutoplayTimer();
      }
      
      this.log(`Moved to slide ${index}`, { userInitiated: isUserInitiated });
    }
  }

  private toggleAutoplay() {
    if (this.isPlaying) {
      this.clearAutoplay();
    } else {
      this.setupAutoplay();
    }
  }

  private handleMouseEnter = () => {
    if (this.pauseOnHover && this.isPlaying) {
      this.clearAutoplay();
      this.log('Autoplay paused on hover');
    }
  };

  private handleMouseLeave = () => {
    if (this.pauseOnHover && this.autoplay > 0) {
      this.setupAutoplay();
      this.log('Autoplay resumed after hover');
    }
  };

  private handleTouchStart = (event: TouchEvent) => {
    this.touchStartX = event.touches[0].clientX;
  };

  private handleTouchEnd = (event: TouchEvent) => {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  };

  private handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = this.touchStartX - this.touchEndX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        this.nextSlide(true);
      } else {
        this.previousSlide(true);
      }
    }
  }

  private handleButtonClick = (slide: HeroSlide, index: number) => {
    this.heroAction.emit({
      action: slide.buttonAction || 'hero-action',
      slideIndex: index,
      slideTitle: slide.title
    });
    this.log('Hero action clicked', { action: slide.buttonAction, index, title: slide.title });
  };

  // ============== Render Methods ==============
  private renderShade() {
    if (!this.shaded) return null;

    // Parse the spectrum color and set RGB custom properties
    this.updateShadeColors();

    return (
      <div class="spectrum-hero__shade" />
    );
  }

  private updateShadeColors() {
    try {
      const computedStyle = getComputedStyle(this.el);
      const hexColor = computedStyle.getPropertyValue('--spectrum-color-on-primary-container').trim();
      
      if (hexColor) {
        const rgb = this.hexToRgb(hexColor);
        if (rgb) {
          this.el.style.setProperty('--hero-shade-r', rgb.r.toString());
          this.el.style.setProperty('--hero-shade-g', rgb.g.toString());
          this.el.style.setProperty('--hero-shade-b', rgb.b.toString());
        }
      }
    } catch (error) {
      // Fallback colors are already set in CSS - no action needed
    }
  }

  private hexToRgb(hex: string): {r: number, g: number, b: number} | null {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Handle 3-digit hex
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // Parse 6-digit hex
    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private parseOverlayStyle(): { [key: string]: string } {
    if (!this.overlayStyle) return {};
    
    const styles: { [key: string]: string } = {};
    const declarations = this.overlayStyle.split(';').filter(d => d.trim());
    
    declarations.forEach(declaration => {
      const [property, value] = declaration.split(':').map(s => s.trim());
      if (property && value) {
        // Convert kebab-case to camelCase for JSX
        const camelProperty = property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        styles[camelProperty] = value;
      }
    });
    
    return styles;
  }

  private renderSlide(slide: HeroSlide, index: number) {
    const isActive = index === this.currentSlide;
    const overlayClasses = [
      'spectrum-hero__overlay',
      `spectrum-hero__overlay--${slide.overlayPosition || 'left'}`,
      `spectrum-hero__overlay--${slide.overlayVertical || 'center'}`
    ].join(' ');

    // Determine slide state for transitions
    let slideClass = 'spectrum-hero__slide';
    if (isActive) {
      slideClass += ' spectrum-hero__slide--active';
    } else if (index < this.currentSlide) {
      slideClass += ' spectrum-hero__slide--prev';
    } else {
      slideClass += ' spectrum-hero__slide--next';
    }

    return (
      <div
        class={slideClass}
        key={index}
        aria-hidden={!isActive}
      >
        {slide.type === 'video' ? (
          <video
            class="spectrum-hero__media"
            src={slide.src}
            poster={slide.poster}
            autoplay
            muted
            loop
            playsInline
            aria-label={slide.alt || 'Hero video'}
          />
        ) : (
          <img
            class="spectrum-hero__media"
            src={slide.src}
            alt={slide.alt || 'Hero image'}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        )}
        
        {this.renderShade()}
        
        {(slide.title || slide.subtitle || slide.buttonText) && (
          <div 
            class={overlayClasses}
            style={this.parseOverlayStyle()}
          >
            <div class="spectrum-hero__content">
              {slide.title && (
                <h1 class="spectrum-hero__title">{slide.title}</h1>
              )}
              {slide.subtitle && (
                <p class="spectrum-hero__subtitle">{slide.subtitle}</p>
              )}
              {slide.buttonText && (
                <spectrum-button
                  class="spectrum-hero__button"
                  variant="primary"
                  size="lg"
                  buttonText={slide.buttonText}
                  action={slide.buttonAction || 'hero-action'}
                  onClick={() => this.handleButtonClick(slide, index)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  private renderDots() {
    if (!this.showDots || this.parsedSlides.length <= 1) return null;

    return (
      <div class="spectrum-hero__dots" role="tablist" aria-label="Hero slides">
        {this.parsedSlides.map((_, index) => (
          <button
            class={`spectrum-hero__dot ${index === this.currentSlide ? 'spectrum-hero__dot--active' : ''}`}
            onClick={() => this.goToSlide(index, true)}
            role="tab"
            aria-selected={index === this.currentSlide}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    );
  }

  private renderArrows() {
    if (!this.showArrows || this.parsedSlides.length <= 1) return null;

    return (
      <div class="spectrum-hero__arrows">
        <button
          class="spectrum-hero__arrow spectrum-hero__arrow--prev"
          onClick={() => this.previousSlide(true)}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          class="spectrum-hero__arrow spectrum-hero__arrow--next"
          onClick={() => this.nextSlide(true)}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    );
  }

  render() {
    const heroClasses = [
      'spectrum-hero',
      this.rounded ? 'spectrum-hero--rounded' : ''
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div
          class={heroClasses}
          style={{ '--hero-height': this.height }}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
          tabindex="0"
          role="region"
          aria-label="Hero section"
          aria-live="polite"
        >
          <div class="spectrum-hero__slides">
            {this.parsedSlides.map((slide, index) => this.renderSlide(slide, index))}
          </div>
          
          {this.renderArrows()}
          {this.renderDots()}

          {this.parsedSlides.length > 1 && (
            <div class="spectrum-hero__progress">
              <div 
                class="spectrum-hero__progress-bar"
                style={{ 
                  width: `${((this.currentSlide + 1) / this.parsedSlides.length) * 100}%` 
                }}
              />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
