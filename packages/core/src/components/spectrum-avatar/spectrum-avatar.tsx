import { Component, Host, h, Prop, Element, Event, EventEmitter, State, Watch } from '@stencil/core';

/**
 * Spectrum Avatar Component
 * A versatile avatar component for displaying user profile images, initials, or icons.
 * Supports multiple sizes, shapes, status indicators, and interactive states.
 */
@Component({
  tag: 'spectrum-avatar',
  styleUrl: 'spectrum-avatar.scss',
  shadow: true,
})
export class SpectrumAvatar {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;
  @Event() avatarAction: EventEmitter<{ action?: string; label?: string; id?: string }>;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Avatar Content
  @Prop() src: string = '';
  @Prop() alt: string = '';
  @Prop() initials: string = '';
  @Prop() icon: string = '';
  @Prop() label: string = '';
  @Prop() avatarId: string = '';

  // Avatar Appearance
  @Prop() size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' = 'base';
  @Prop() shape: 'circle' | 'square' | 'rounded' = 'circle';
  @Prop() variant: 'default' | 'outlined' | 'filled' = 'default';

  // Status Indicator
  @Prop() status: 'none' | 'online' | 'offline' | 'busy' | 'away' = 'none';
  @Prop() showStatus: boolean = false;

  // Interactive States
  @Prop() clickable: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() action: string = '';

  // Custom Styling
  @Prop() customStyle: { [key: string]: string } = {};

  // Internal State
  @State() imageLoaded: boolean = false;
  @State() imageError: boolean = false;
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;

  // ============== Watchers ==============
  @Watch('src')
  handleSrcChange(newSrc: string) {
    if (newSrc) {
      this.imageLoaded = false;
      this.imageError = false;
      this.preloadImage(newSrc);
    }
  }

  // ============== Debug Helpers ==============
  private log(message: string, data?: any) {
    if (this.debug) {
      console.log(`[spectrum-avatar] ${message}`, data);
    }
  }

  // ============== Image Management ==============
  private preloadImage(src: string) {
    const img = new Image();
    img.onload = () => {
      this.imageLoaded = true;
      this.imageError = false;
      this.log('Image loaded successfully', src);
    };
    img.onerror = () => {
      this.imageLoaded = false;
      this.imageError = true;
      this.log('Image failed to load', src);
    };
    img.src = src;
  }

  // ============== Event Handlers ==============
  private handleMouseEnter = () => {
    if (this.clickable && !this.disabled) {
      this.isHovered = true;
      this.log('Mouse entered');
    }
  };

  private handleMouseLeave = () => {
    if (this.clickable) {
      this.isHovered = false;
      this.isActive = false;
      this.log('Mouse left');
    }
  };

  private handleMouseDown = () => {
    if (this.clickable && !this.disabled) {
      this.isActive = true;
      this.log('Mouse down');
    }
  };

  private handleMouseUp = () => {
    if (this.clickable) {
      this.isActive = false;
      this.log('Mouse up');
    }
  };

  private handleClick = () => {
    if (this.clickable && !this.disabled) {
      this.avatarAction.emit({
        action: this.action || 'click',
        label: this.label || this.alt || this.initials,
        id: this.avatarId || undefined
      });
      this.log('Avatar clicked', {
        action: this.action,
        label: this.label,
        id: this.avatarId
      });
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.clickable && !this.disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.handleClick();
    }
  };

  // ============== Style Helpers ==============
  private getAvatarStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    if (this.disabled) {
      styles.opacity = '0.5';
      styles.cursor = 'not-allowed';
    } else if (this.clickable) {
      styles.cursor = 'pointer';
    }

    // Apply dynamic coloring when showing initials
    const isShowingInitials = this.shouldShowInitials();
    if (isShowingInitials) {
      const initials = this.getInitialsFromLabel();
      const colors = this.getInitialsColor(initials);
      styles.backgroundColor = colors.background;
      styles.color = colors.color;
    }

    return { ...styles, ...this.customStyle };
  }

  private shouldShowInitials(): boolean {
    // Show initials if no image source or image failed to load, and no icon is specified
    const hasImage = this.src && this.imageLoaded && !this.imageError;
    const hasIcon = !!this.icon;
    const hasInitials = !!this.getInitialsFromLabel();
    
    return !hasImage && !hasIcon && hasInitials;
  }

  private getInitialsFromLabel(): string {
    if (this.initials) return this.initials;
    
    const generateInitials = (text: string): string => {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      
      if (words.length === 0) return '';
      if (words.length === 1) return words[0].charAt(0).toUpperCase();
      
      // Use first and last name only
      const firstName = words[0];
      const lastName = words[words.length - 1];
      
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    };
    
    if (this.label) {
      return generateInitials(this.label);
    }
    if (this.alt) {
      return generateInitials(this.alt);
    }
    return '';
  }

  private getInitialsColor(initials: string): { background: string; color: string } {
    if (!initials) {
      return {
        background: 'var(--avatar-background)',
        color: 'var(--avatar-color)'
      };
    }

    // Predefined color palette with good contrast ratios
    // These colors work well with white text and follow Spectrum design principles
    const colorPalette = [
      { background: '#0070d2', color: '#ffffff' }, // Spectrum Blue
      { background: '#2e844a', color: '#ffffff' }, // Spectrum Green  
      { background: '#ff9900', color: '#ffffff' }, // Spectrum Orange
      { background: '#ba0517', color: '#ffffff' }, // Spectrum Red
      { background: '#005fb2', color: '#ffffff' }, // Spectrum Dark Blue
      { background: '#7f525d', color: '#ffffff' }, // Spectrum Purple
      { background: '#0891b2', color: '#ffffff' }, // Spectrum Teal
      { background: '#8b5cf6', color: '#ffffff' }, // Spectrum Violet
      { background: '#dc2626', color: '#ffffff' }, // Spectrum Crimson
      { background: '#059669', color: '#ffffff' }, // Spectrum Emerald
      { background: '#d97706', color: '#ffffff' }, // Spectrum Amber
      { background: '#7c2d12', color: '#ffffff' }, // Spectrum Brown
    ];

    // Simple hash function to get consistent color for same initials
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      const char = initials.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Get color index from hash
    const colorIndex = Math.abs(hash) % colorPalette.length;
    
    this.log('Generated color for initials', { 
      initials, 
      hash, 
      colorIndex, 
      color: colorPalette[colorIndex] 
    });
    
    return colorPalette[colorIndex];
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.log('Component will load', {
      src: this.src,
      initials: this.initials,
      size: this.size,
      shape: this.shape,
      clickable: this.clickable
    });

    // Preload image if src is provided
    if (this.src) {
      this.preloadImage(this.src);
    }
  }

  componentDidLoad() {
    this.log('Component did load');
  }

  // ============== Render Methods ==============
  private renderStatusIndicator() {
    if (!this.showStatus || this.status === 'none') return null;

    return (
      <span class={`spectrum-avatar__status spectrum-avatar__status--${this.status}`}></span>
    );
  }

  private renderContent() {
    // Priority: Image > Icon > Initials
    if (this.src && this.imageLoaded && !this.imageError) {
      return (
        <img
          class="spectrum-avatar__image"
          src={this.src}
          alt={this.alt || this.label || 'Avatar'}
        />
      );
    }

    if (this.icon) {
      return (
        <span class="spectrum-avatar__icon">
          <span class="material-symbols-outlined">{this.icon}</span>
        </span>
      );
    }

    const initials = this.getInitialsFromLabel();
    if (initials) {
      return (
        <span class="spectrum-avatar__initials">{initials}</span>
      );
    }

    // Fallback to person icon
    return (
      <span class="spectrum-avatar__icon spectrum-avatar__icon--fallback">
        <span class="material-symbols-outlined">person</span>
      </span>
    );
  }

  render() {
    this.log('Rendering component', {
      imageLoaded: this.imageLoaded,
      imageError: this.imageError,
      isHovered: this.isHovered,
      isActive: this.isActive
    });

    const isShowingInitials = this.shouldShowInitials();
    const avatarClasses: { [key: string]: boolean } = {
      'spectrum-avatar': true,
      [`spectrum-avatar--${this.size}`]: true,
      [`spectrum-avatar--${this.shape}`]: true,
      [`spectrum-avatar--${this.variant}`]: true,
      'spectrum-avatar--clickable': this.clickable,
      'spectrum-avatar--disabled': this.disabled,
      'spectrum-avatar--hover': this.isHovered,
      'spectrum-avatar--active': this.isActive,
      'spectrum-avatar--has-status': this.showStatus && this.status !== 'none',
      'spectrum-avatar--has-image': this.src && this.imageLoaded && !this.imageError,
      'spectrum-avatar--has-icon': !!this.icon,
      'spectrum-avatar--has-initials': !!this.getInitialsFromLabel(),
      'spectrum-avatar--initials-colored': isShowingInitials,
    };

    const WrapperTag = this.clickable ? 'button' : 'div';
    const wrapperProps = this.clickable ? {
      disabled: this.disabled,
      'aria-label': this.label || this.alt || `Avatar ${this.getInitialsFromLabel()}`,
      tabIndex: this.disabled ? -1 : 0,
      onKeyDown: this.handleKeyDown,
    } : {};

    return (
      <Host>
        <WrapperTag
          class={avatarClasses}
          style={this.getAvatarStyles()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onClick={this.handleClick}
          {...wrapperProps}
        >
          {this.renderContent()}
          {this.renderStatusIndicator()}
        </WrapperTag>
      </Host>
    );
  }
}
