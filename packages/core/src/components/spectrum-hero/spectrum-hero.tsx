import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';

// Import spectrum-button to ensure it's available
import '../spectrum-button/spectrum-button';

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
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.toggleAutoplay();
        break;
    }
  };

  private nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.parsedSlides.length;
    this.goToSlide(nextIndex);
  }

  private previousSlide() {
    const prevIndex = this.currentSlide === 0 ? this.parsedSlides.length - 1 : this.currentSlide - 1;
    this.goToSlide(prevIndex);
  }

  private goToSlide(index: number) {
    if (index >= 0 && index < this.parsedSlides.length) {
      this.currentSlide = index;
      this.slideChange.emit({
        action: 'slide-change',
        slideIndex: this.currentSlide,
        totalSlides: this.parsedSlides.length
      });
      this.log(`Moved to slide ${index}`);
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
        this.nextSlide();
      } else {
        this.previousSlide();
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
        
        {(slide.title || slide.subtitle || slide.buttonText) && (
          <div class={overlayClasses}>
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
            onClick={() => this.goToSlide(index)}
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
          onClick={() => this.previousSlide()}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          class="spectrum-hero__arrow spectrum-hero__arrow--next"
          onClick={() => this.nextSlide()}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div
          class="spectrum-hero"
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
