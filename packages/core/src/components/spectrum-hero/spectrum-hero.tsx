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
  // Navigation support (optional direct navigation)
  buttonHref?: string; // URL for direct navigation when button is clicked
  buttonTarget?: string; // Target for navigation (e.g., '_blank' for new tab)
  buttonRel?: string; // Rel attribute for security when using target="_blank"
  // Responsive image support
  srcset?: string; // Responsive image sources (e.g., "image-320w.jpg 320w, image-640w.jpg 640w")
  sizes?: string; // Image sizes for different viewport conditions (e.g., "(max-width: 600px) 100vw, 50vw")
  // Video caption support for accessibility compliance (WCAG 2.1 AA - 1.2.2)
  captions?: Array<{
    src: string; // Path to WebVTT caption file
    srclang: string; // Language code (e.g., 'en', 'fr', 'es')
    label: string; // Human-readable label (e.g., 'English', 'Français')
    default?: boolean; // Whether this track should be enabled by default
    kind?: 'subtitles' | 'captions' | 'descriptions'; // Track type (defaults to 'captions')
  }>;
}

/**
 * Spectrum Hero Component
 * A hero section component that supports both images and video backgrounds,
 * with carousel functionality, text overlays, and call-to-action buttons.
 * 
 * Features:
 * - Responsive image support through srcset and sizes attributes for optimal delivery
 * - Direct navigation support for call-to-action buttons via href, target, and rel attributes
 * - Event-based interactions for custom handling alongside direct navigation
 * - Accessibility support with keyboard navigation and screen reader compatibility
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
  private intersectionObserver: IntersectionObserver | null = null;
  private preloadedResources: Set<string> = new Set();
  private preloadLinks: HTMLLinkElement[] = [];
  private videoElements: Map<number, HTMLVideoElement> = new Map();

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.updateSlides();
  }

  componentDidLoad() {
    this.setupAutoplay();
    this.setupKeyboardNavigation();
    this.updateShadeColors();
    this.setupIntersectionObserver();
    this.addResourceHints();
  }

  disconnectedCallback() {
    this.clearAutoplay();
    this.cleanupIntersectionObserver();
    this.cleanupPreloadLinks();
    this.cleanupVideoElements();
    if (this.keyboardNavigation) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  // ============== Watchers ==============
  @Watch('slides')
  slidesChanged() {
    this.updateSlides();
    this.addResourceHints();
    this.preloadAdjacentSlides();
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
      const previousSlides = this.parsedSlides;
      this.parsedSlides = JSON.parse(this.slides);
      this.log('Slides updated', this.parsedSlides);
      
      // Clean up video elements if slides have changed significantly
      if (previousSlides.length !== this.parsedSlides.length) {
        this.cleanupVideoElements();
      }
      
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
      const previousSlide = this.currentSlide;
      this.currentSlide = index;
      
      // Manage video playback for slide changes
      this.handleVideoPlaybackOnSlideChange(previousSlide, index);
      
      this.slideChange.emit({
        action: 'slide-change',
        slideIndex: this.currentSlide,
        totalSlides: this.parsedSlides.length
      });
      
      // Reset autoplay timer when user navigates manually
      if (isUserInitiated) {
        this.resetAutoplayTimer();
      }
      
      // Preload adjacent slides when slide changes
      this.preloadAdjacentSlides();
      
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
    // Always emit the event for tracking, even when using direct navigation
    this.heroAction.emit({
      action: slide.buttonAction || 'hero-action',
      slideIndex: index,
      slideTitle: slide.title
    });
    this.log('Hero action clicked', { 
      action: slide.buttonAction, 
      index, 
      title: slide.title,
      href: slide.buttonHref,
      target: slide.buttonTarget
    });
  };

  // ============== Preloading Methods ==============
  
  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return;
    
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.preloadAdjacentSlides();
          this.log('Hero came into viewport, preloading adjacent slides');
          // Only observe once - we don't need to keep checking
          this.intersectionObserver?.unobserve(this.el);
        }
      });
    }, {
      rootMargin: '50px' // Start preloading when hero is 50px away from viewport
    });
    
    this.intersectionObserver.observe(this.el);
  }

  private cleanupIntersectionObserver() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  private cleanupPreloadLinks() {
    this.preloadLinks.forEach(link => {
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    });
    this.preloadLinks = [];
  }

  private addResourceHints() {
    if (this.parsedSlides.length === 0) return;
    
    // Preload the first slide with high priority
    const firstSlide = this.parsedSlides[0];
    this.addPreloadLink(firstSlide, 'high');
    
    // Preload second slide with lower priority if it exists
    if (this.parsedSlides.length > 1) {
      const secondSlide = this.parsedSlides[1];
      this.addPreloadLink(secondSlide, 'auto');
    }
    
    this.log('Added resource hints for critical slides');
  }

  private addPreloadLink(slide: HeroSlide, fetchPriority: 'high' | 'auto' | 'low' = 'auto') {
    if (this.preloadedResources.has(slide.src)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = slide.src;
    
    if (slide.type === 'video') {
      link.as = 'video';
      // For videos, also preload poster if available
      if (slide.poster && !this.preloadedResources.has(slide.poster)) {
        const posterLink = document.createElement('link');
        posterLink.rel = 'preload';
        posterLink.href = slide.poster;
        posterLink.as = 'image';
        posterLink.setAttribute('fetchpriority', fetchPriority);
        document.head.appendChild(posterLink);
        this.preloadLinks.push(posterLink);
        this.preloadedResources.add(slide.poster);
      }
    } else {
      link.as = 'image';
      // Add responsive image hints if available
      if (slide.srcset) {
        link.setAttribute('imagesrcset', slide.srcset);
      }
      if (slide.sizes) {
        link.setAttribute('imagesizes', slide.sizes);
      }
    }
    
    link.setAttribute('fetchpriority', fetchPriority);
    document.head.appendChild(link);
    this.preloadLinks.push(link);
    this.preloadedResources.add(slide.src);
  }

  private preloadAdjacentSlides() {
    if (this.parsedSlides.length <= 1) return;
    
    const nextIndex = (this.currentSlide + 1) % this.parsedSlides.length;
    const prevIndex = this.currentSlide === 0 ? this.parsedSlides.length - 1 : this.currentSlide - 1;
    
    // Preload next slide (higher priority since autoplay goes forward)
    const nextSlide = this.parsedSlides[nextIndex];
    if (nextSlide.type === 'image') {
      this.preloadImage(nextSlide.src, nextSlide.srcset);
    } else if (nextSlide.type === 'video') {
      this.preloadVideo(nextSlide.src);
    }
    
    // Preload previous slide (lower priority)
    const prevSlide = this.parsedSlides[prevIndex];
    if (prevSlide.type === 'image') {
      this.preloadImage(prevSlide.src, prevSlide.srcset);
    } else if (prevSlide.type === 'video') {
      this.preloadVideo(prevSlide.src);
    }
    
    this.log('Preloaded adjacent slides', { nextIndex, prevIndex });
  }

  private preloadImage(src: string, srcset?: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }
    
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        this.log('Image preloaded successfully', src);
        resolve();
      };
      img.onerror = () => {
        this.log('Image preload failed', src);
        reject();
      };
      
      if (srcset) {
        img.srcset = srcset;
      }
      img.src = src;
    });
  }

  private preloadVideo(src: string): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }
    
    return new Promise<void>((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.muted = true; // Required for autoplay
      
      video.onloadedmetadata = () => {
        this.preloadedResources.add(src);
        this.log('Video metadata preloaded successfully', src);
        resolve();
      };
      video.onerror = () => {
        this.log('Video preload failed', src);
        reject();
      };
      
      video.src = src;
    });
  }

  private getVideoPreloadStrategy(slideIndex: number): 'none' | 'metadata' | 'auto' {
    if (slideIndex === this.currentSlide) return 'auto';
    
    // Check if this is an adjacent slide
    const nextIndex = (this.currentSlide + 1) % this.parsedSlides.length;
    const prevIndex = this.currentSlide === 0 ? this.parsedSlides.length - 1 : this.currentSlide - 1;
    
    const isAdjacent = slideIndex === nextIndex || slideIndex === prevIndex;
    return isAdjacent ? 'metadata' : 'none';
  }

  private isAdjacentSlide(slideIndex: number): boolean {
    if (this.parsedSlides.length <= 1) return false;
    
    const nextIndex = (this.currentSlide + 1) % this.parsedSlides.length;
    const prevIndex = this.currentSlide === 0 ? this.parsedSlides.length - 1 : this.currentSlide - 1;
    
    return slideIndex === nextIndex || slideIndex === prevIndex;
  }

  // ============== Video Management Methods ==============
  
  private handleVideoPlaybackOnSlideChange(previousSlideIndex: number, currentSlideIndex: number) {
    // Pause and reset video from previous slide if it was a video
    if (previousSlideIndex !== currentSlideIndex) {
      const previousSlide = this.parsedSlides[previousSlideIndex];
      if (previousSlide?.type === 'video') {
        this.pauseAndResetVideo(previousSlideIndex);
      }
    }
    
    // Play video on current slide if it's a video
    const currentSlide = this.parsedSlides[currentSlideIndex];
    if (currentSlide?.type === 'video') {
      // Use a small delay to ensure the video element is rendered
      setTimeout(() => {
        this.playVideo(currentSlideIndex);
      }, 100);
    }
  }

  private pauseAndResetVideo(slideIndex: number) {
    const videoElement = this.videoElements.get(slideIndex);
    if (videoElement) {
      try {
        videoElement.pause();
        videoElement.currentTime = 0;
        this.log(`Video paused and reset for slide ${slideIndex}`);
      } catch (error) {
        this.log(`Error pausing/resetting video for slide ${slideIndex}`, error);
      }
    }
  }

  private playVideo(slideIndex: number) {
    const videoElement = this.videoElements.get(slideIndex);
    if (videoElement) {
      try {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.log(`Video started playing for slide ${slideIndex}`);
            })
            .catch(error => {
              this.log(`Video play failed for slide ${slideIndex}`, error);
            });
        }
      } catch (error) {
        this.log(`Error playing video for slide ${slideIndex}`, error);
      }
    }
  }

  private registerVideoElement(slideIndex: number, videoElement: HTMLVideoElement) {
    this.videoElements.set(slideIndex, videoElement);
    this.log(`Video element registered for slide ${slideIndex}`);
  }

  private unregisterVideoElement(slideIndex: number) {
    this.videoElements.delete(slideIndex);
    this.log(`Video element unregistered for slide ${slideIndex}`);
  }

  private cleanupVideoElements() {
    // Pause and reset all videos before cleanup
    this.videoElements.forEach((videoElement, slideIndex) => {
      try {
        videoElement.pause();
        videoElement.currentTime = 0;
      } catch (error) {
        this.log(`Error cleaning up video for slide ${slideIndex}`, error);
      }
    });
    this.videoElements.clear();
    this.log('All video elements cleaned up');
  }

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
    const isAdjacent = this.isAdjacentSlide(index);
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
            preload={this.getVideoPreloadStrategy(index)}
            muted
            loop
            playsInline
            aria-label={slide.alt || 'Hero video'}
            ref={(videoEl) => {
              if (videoEl) {
                this.registerVideoElement(index, videoEl);
                // If this is the active slide, start playing
                if (isActive) {
                  setTimeout(() => this.playVideo(index), 100);
                }
              } else {
                // Video element is being unmounted
                this.unregisterVideoElement(index);
              }
            }}
            onLoadedData={() => {
              // Ensure video is ready before playing if it's the active slide
              if (isActive) {
                this.playVideo(index);
              }
            }}
          >
            {slide.captions?.map((caption) => (
              <track
                kind={caption.kind || 'captions'}
                src={caption.src}
                srclang={caption.srclang}
                label={caption.label}
                default={caption.default}
              />
            ))}
          </video>
        ) : (
          <img
            class="spectrum-hero__media"
            src={slide.src}
            srcset={slide.srcset}
            sizes={slide.sizes}
            alt={slide.alt || 'Hero image'}
            loading={index === 0 ? 'eager' : isAdjacent ? 'eager' : 'lazy'}
            {...(index === 0 ? { 'fetchpriority': 'high' } : 
                isAdjacent ? { 'fetchpriority': 'auto' } : 
                { 'fetchpriority': 'low' })}
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
                  size="medium"
                  buttonText={slide.buttonText}
                  action={slide.buttonAction || 'hero-action'}
                  href={slide.buttonHref}
                  target={slide.buttonTarget}
                  rel={slide.buttonRel}
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
