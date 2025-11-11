import { Component, Host, h, Prop, State, Event, EventEmitter, Watch, Listen, Method } from '@stencil/core';

/**
 * Media item interface for the library
 */
export interface MediaItem {
  /** Unique identifier for the media item */
  id: string;
  /** Type of media: 'image' or 'video' */
  type: 'image' | 'video';
  /** Source URL for the media */
  url: string;
  /** Optional direct thumbnail URL (if not provided, will be auto-generated for videos) */
  thumbnailUrl?: string;
  /** Descriptive text for accessibility */
  altText: string;
  /** Optional caption or title to display */
  caption?: string;
  /** Optional video platform (youtube, vimeo, direct) */
  platform?: 'youtube' | 'vimeo' | 'direct';
}

/**
 * Event payload for media interactions
 */
export interface MediaActionPayload {
  /** Action performed */
  action: 'view' | 'close' | 'navigate' | 'error';
  /** Media item involved */
  mediaItem?: MediaItem;
  /** Index of the media item */
  index?: number;
  /** Error message if action is 'error' */
  errorMessage?: string;
}

@Component({
  tag: 'spectrum-media-library',
  styleUrl: 'spectrum-media-library.scss',
  shadow: true,
})
export class SpectrumMediaLibrary {
  /**
   * Array of media items or JSON string representing the media items
   * @example
   * // JavaScript array
   * component.mediaItems = [{id: '1', type: 'image', url: '...', altText: 'Image'}];
   * 
   * // JSON string  
   * <spectrum-media-library media-items='[{"id":"1","type":"image","url":"...","altText":"Image"}]'></spectrum-media-library>
   */
  @Prop() mediaItems: MediaItem[] | string = [];

  /**
   * Width of the media library container (CSS units: px, %, vh, vw)
   * @default '100%'
   */
  @Prop() width: string = '100%';

  /**
   * Height of the media library container (CSS units: px, %, vh, vw)
   * @default '400px'
   */
  @Prop() height: string = '400px';

  /**
   * Thumbnail size preset or custom size
   * @default 'medium'
   */
  @Prop() thumbnailSize: 'small' | 'medium' | 'large' | string = 'medium';

  /**
   * Enable horizontal scrolling (otherwise vertical)
   * @default false
   */
  @Prop() horizontal: boolean = false;

  /**
   * Gap between thumbnails (CSS units)
   * @default '1rem'
   */
  @Prop() gap: string = '1rem';

  /**
   * Enable lightbox on thumbnail click
   * @default true
   */
  @Prop() enableLightbox: boolean = true;

  /**
   * Show captions in lightbox
   * @default true
   */
  @Prop() showCaptions: boolean = true;

  /**
   * Enable keyboard navigation in lightbox
   * @default true
   */
  @Prop() enableKeyboardNav: boolean = true;

  /**
   * Event emitted when media item is interacted with
   */
  @Event({
    eventName: 'mediaAction',
    composed: true,
    cancelable: true,
    bubbles: true
  }) mediaAction: EventEmitter<MediaActionPayload>;

  /**
   * Internal parsed media items
   */
  private parsedMediaItems: MediaItem[] = [];

  /**
   * Currently displayed media item index in lightbox
   */
  @State() currentLightboxIndex: number = -1;

  /**
   * Lightbox open state
   */
  @State() isLightboxOpen: boolean = false;

  /**
   * Video loading state
   */
  @State() isVideoLoading: boolean = false;

  /**
   * Parse media items whether it's an object or JSON string
   */
  private parseMediaItems() {
    try {
      if (typeof this.mediaItems === 'string') {
        // Parse JSON string
        this.parsedMediaItems = JSON.parse(this.mediaItems);
      } else if (Array.isArray(this.mediaItems)) {
        // Use array directly
        this.parsedMediaItems = this.mediaItems;
      } else {
        // Fallback to empty array
        this.parsedMediaItems = [];
      }

      // Process video thumbnails
      this.parsedMediaItems = this.parsedMediaItems.map(item => {
        if (item.type === 'video' && !item.thumbnailUrl) {
          return {
            ...item,
            thumbnailUrl: this.extractVideoThumbnail(item.url, item.platform),
            platform: item.platform || this.detectVideoPlatform(item.url)
          };
        }
        return item;
      });
    } catch (error) {
      console.error('Invalid JSON in mediaItems:', error);
      this.parsedMediaItems = [];
      this.mediaAction.emit({
        action: 'error',
        errorMessage: 'Failed to parse media items'
      });
    }
  }

  /**
   * Detect video platform from URL
   */
  private detectVideoPlatform(url: string): 'youtube' | 'vimeo' | 'direct' {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    return 'direct';
  }

  /**
   * Extract video thumbnail URL from video URL
   */
  private extractVideoThumbnail(url: string, platform?: 'youtube' | 'vimeo' | 'direct'): string {
    const detectedPlatform = platform || this.detectVideoPlatform(url);

    switch (detectedPlatform) {
      case 'youtube': {
        // Extract YouTube video ID
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        
        if (videoId) {
          // Return high quality thumbnail
          return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        break;
      }
      case 'vimeo': {
        // Vimeo thumbnails require API call, return placeholder for now
        // In production, you'd make an API call to Vimeo's oEmbed endpoint
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234A90E2"%3E%3Cpath d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/%3E%3C/svg%3E';
      }
      default:
        // Direct video or unknown - return generic video icon
        return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234A90E2"%3E%3Cpath d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/%3E%3C/svg%3E';
    }

    // Fallback
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234A90E2"%3E%3Cpath d="M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/%3E%3C/svg%3E';
  }

  /**
   * Get embeddable video URL for iframe
   */
  private getEmbedUrl(url: string, platform: 'youtube' | 'vimeo' | 'direct'): string {
    switch (platform) {
      case 'youtube': {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[2].length === 11) ? match[2] : null;
        
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        return url;
      }
      case 'vimeo': {
        const regExp = /vimeo\.com\/(\d+)/;
        const match = url.match(regExp);
        const videoId = match ? match[1] : null;
        
        if (videoId) {
          return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }
        return url;
      }
      default:
        return url;
    }
  }

  /**
   * Watch for media items changes and re-parse
   */
  @Watch('mediaItems')
  onMediaItemsChange() {
    this.parseMediaItems();
  }

  /**
   * Initialize parsing during component load
   */
  componentWillLoad() {
    this.parseMediaItems();
  }

  /**
   * Handle thumbnail click
   */
  private handleThumbnailClick(index: number) {
    if (this.enableLightbox) {
      this.currentLightboxIndex = index;
      this.isLightboxOpen = true;
      this.isVideoLoading = true;

      const mediaItem = this.parsedMediaItems[index];
      this.mediaAction.emit({
        action: 'view',
        mediaItem,
        index
      });

      // Add keyboard listener
      if (this.enableKeyboardNav) {
        document.addEventListener('keydown', this.handleKeyDown);
      }
    }
  }

  /**
   * Close lightbox
   */
  @Method()
  async closeLightbox() {
    this.isLightboxOpen = false;
    this.currentLightboxIndex = -1;
    this.isVideoLoading = false;

    this.mediaAction.emit({
      action: 'close'
    });

    // Remove keyboard listener
    if (this.enableKeyboardNav) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  /**
   * Navigate to previous media item
   */
  @Method()
  async navigatePrevious() {
    if (this.currentLightboxIndex > 0) {
      this.currentLightboxIndex--;
      this.isVideoLoading = true;
      
      const mediaItem = this.parsedMediaItems[this.currentLightboxIndex];
      this.mediaAction.emit({
        action: 'navigate',
        mediaItem,
        index: this.currentLightboxIndex
      });
    }
  }

  /**
   * Navigate to next media item
   */
  @Method()
  async navigateNext() {
    if (this.currentLightboxIndex < this.parsedMediaItems.length - 1) {
      this.currentLightboxIndex++;
      this.isVideoLoading = true;
      
      const mediaItem = this.parsedMediaItems[this.currentLightboxIndex];
      this.mediaAction.emit({
        action: 'navigate',
        mediaItem,
        index: this.currentLightboxIndex
      });
    }
  }

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.isLightboxOpen || !this.enableKeyboardNav) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.navigatePrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.navigateNext();
        break;
    }
  };

  /**
   * Listen for backdrop click to close lightbox
   */
  @Listen('click')
  handleBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('spectrum-media-library__lightbox')) {
      this.closeLightbox();
    }
  }

  /**
   * Get thumbnail size in pixels
   */
  private getThumbnailSize(): string {
    const presets = {
      small: '100px',
      medium: '150px',
      large: '200px'
    };

    return presets[this.thumbnailSize] || this.thumbnailSize;
  }

  /**
   * Handle video iframe load
   */
  private handleVideoLoad = () => {
    this.isVideoLoading = false;
  };

  /**
   * Clean up event listeners on disconnect
   */
  disconnectedCallback() {
    if (this.enableKeyboardNav) {
      document.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  /**
   * Render thumbnail
   */
  private renderThumbnail(item: MediaItem, index: number) {
    const thumbnailSize = this.getThumbnailSize();

    return (
      <div
        class="spectrum-media-library__thumbnail"
        style={{
          width: thumbnailSize,
          height: thumbnailSize
        }}
        onClick={() => this.handleThumbnailClick(index)}
        role="button"
        tabindex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleThumbnailClick(index);
          }
        }}
        aria-label={`View ${item.altText}`}
      >
        <img
          src={item.type === 'image' ? item.url : item.thumbnailUrl}
          alt={item.altText}
          class="spectrum-media-library__thumbnail-image"
          loading="lazy"
        />
        {item.type === 'video' && (
          <div class="spectrum-media-library__thumbnail-overlay">
            <svg
              class="spectrum-media-library__play-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  /**
   * Render lightbox content
   */
  private renderLightbox() {
    if (!this.isLightboxOpen || this.currentLightboxIndex < 0) {
      return null;
    }

    const currentItem = this.parsedMediaItems[this.currentLightboxIndex];
    const hasPrevious = this.currentLightboxIndex > 0;
    const hasNext = this.currentLightboxIndex < this.parsedMediaItems.length - 1;

    return (
      <div
        class="spectrum-media-library__lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Media viewer"
      >
        <div class="spectrum-media-library__lightbox-content">
          {/* Close Button */}
          <button
            class="spectrum-media-library__lightbox-close"
            onClick={() => this.closeLightbox()}
            aria-label="Close media viewer"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
            </svg>
          </button>

          {/* Previous Button */}
          {hasPrevious && (
            <button
              class="spectrum-media-library__lightbox-nav spectrum-media-library__lightbox-nav--prev"
              onClick={() => this.navigatePrevious()}
              aria-label="Previous media"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
              </svg>
            </button>
          )}

          {/* Media Content */}
          <div class="spectrum-media-library__lightbox-media">
            {currentItem.type === 'image' ? (
              <img
                src={currentItem.url}
                alt={currentItem.altText}
                class="spectrum-media-library__lightbox-image"
              />
            ) : (
              <div class="spectrum-media-library__lightbox-video">
                {this.isVideoLoading && (
                  <div class="spectrum-media-library__lightbox-loading">
                    <div class="spectrum-media-library__spinner" role="status" aria-live="polite">
                      <span class="sr-only">Loading video...</span>
                    </div>
                  </div>
                )}
                <iframe
                  src={this.getEmbedUrl(currentItem.url, currentItem.platform || 'direct')}
                  class="spectrum-media-library__lightbox-iframe"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  onLoad={this.handleVideoLoad}
                  title={currentItem.altText}
                />
              </div>
            )}
          </div>

          {/* Next Button */}
          {hasNext && (
            <button
              class="spectrum-media-library__lightbox-nav spectrum-media-library__lightbox-nav--next"
              onClick={() => this.navigateNext()}
              aria-label="Next media"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor" />
              </svg>
            </button>
          )}

          {/* Caption */}
          {this.showCaptions && (currentItem.caption || currentItem.altText) && (
            <div class="spectrum-media-library__lightbox-caption">
              {currentItem.caption || currentItem.altText}
            </div>
          )}

          {/* Counter */}
          <div class="spectrum-media-library__lightbox-counter" aria-live="polite">
            {this.currentLightboxIndex + 1} / {this.parsedMediaItems.length}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Host
        style={{
          width: this.width,
          height: this.height
        }}
      >
        <div
          class={{
            'spectrum-media-library': true,
            'spectrum-media-library--horizontal': this.horizontal,
            'spectrum-media-library--vertical': !this.horizontal
          }}
          style={{
            gap: this.gap
          }}
          role="region"
          aria-label="Media library"
        >
          {this.parsedMediaItems.length > 0 ? (
            this.parsedMediaItems.map((item, index) => this.renderThumbnail(item, index))
          ) : (
            <div class="spectrum-media-library__empty" role="status">
              <p>No media items available</p>
            </div>
          )}
        </div>

        {this.renderLightbox()}
      </Host>
    );
  }
}
