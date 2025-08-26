import { Component, Host, h, Fragment, Prop, State, Watch, Element, Event, EventEmitter } from '@stencil/core';

/**
 * Spectrum Button Component
 * A versatile button component with multiple variants, sizes, and states.
 * Supports icons, text, and various interactive states.
 */
@Component({
  tag: 'spectrum-button',
  styleUrl: 'spectrum-button.scss',
  shadow: true,
})
export class SpectrumButton {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;
  @Event() buttonAction: EventEmitter<{ action?: string; label: string }>;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Button Variants and Appearance
  @Prop() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'fab' = 'primary';
  @Prop() size: 'sm' | 'base' | 'medium' | 'lg' = 'base';
  @Prop() outline: boolean = false;
  @Prop() iconOnly: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() ripple: boolean = false;
  @Prop() action: string = '';
  @Prop() customStyle: { [key: string]: string } = {};
  @Prop() minimalAnimation: boolean = false;

  // Button Content
  @Prop() showButtonText: boolean = true;
  @Prop() buttonText: string = '';
  @Prop() showLeftIcon: boolean = false;
  @Prop() leftIcon: string = '';
  @Prop() showRightIcon: boolean = false;
  @Prop() rightIcon: string = '';

  // Navigation Support (optional direct navigation)
  @Prop() href?: string; // URL for navigation when button is used as a link
  @Prop() target?: string; // Target for navigation (e.g., '_blank' for new tab)
  @Prop() rel?: string; // Rel attribute for security when using target="_blank"

  // Sound Support
  @Prop() sound: boolean = false;

  // Haptic Feedback Support
  @Prop() haptic: boolean = false;

  // Button State
  @Prop() state: 'default' | 'hover' | 'active' | 'disabled' = 'default';
  @State() currentState: string = 'default';
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;
  @State() ripples: { x: number; y: number; id: number }[] = [];
  private rippleId: number = 0;
  private audioElement: HTMLAudioElement | null = null;

  @Watch('iconOnly')
  handleIconOnlyChange(newValue: boolean) {
    if (newValue && this.leftIcon) {
      this.showLeftIcon = true;
    }
  }

  @Watch('variant')
  handleVariantChange(newValue: string) {
    if (newValue === 'fab') {
      this.ripple = true;
      if (this.leftIcon) {
        this.iconOnly = true;
        this.showLeftIcon = true;
      }
    }
  }

  @Watch('sound')
  handleSoundChange(newValue: boolean) {
    if (newValue && !this.audioElement) {
      this.initializeAudio();
    }
  }

  @Watch('haptic')
  handleHapticChange(newValue: boolean) {
    if (newValue) {
      this.log('Haptic feedback enabled');
    }
  }

  // ============== Debug Helpers ==============
  private log(message: string, data?: any) {
    // Temporarily enable logging for sound-related messages
    if (this.debug || message.toLowerCase().includes('audio') || message.toLowerCase().includes('sound') || message.toLowerCase().includes('beep')) {
      console.log(`[spectrum-button] ${message}`, data);
    }
  }

  // ============== Audio Management ==============
  private initializeAudio() {
    try {
      // Create a simple beep sound using Web Audio API as fallback
      // This ensures sound works even if the MP3 file isn't accessible
      this.createBeepSound();
    } catch (error) {
      this.log('Failed to initialize audio', error);
    }
  }

  private createBeepSound() {
    try {
      // Create AudioContext for generating a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Store the audio context for later use
      (this as any).audioContext = audioContext;
      
      this.log('Audio context created successfully');
    } catch (error) {
      this.log('Failed to create audio context', error);
      // Fallback to trying to load the MP3 file
      this.tryLoadMP3();
    }
  }

  private tryLoadMP3() {
    try {
      // Try multiple approaches to load the MP3 file
      const possiblePaths = [
        './button.mp3',
        '/button.mp3',
        '../button.mp3',
        'button.mp3'
      ];

      // Try the first path
      this.audioElement = new Audio(possiblePaths[0]);
      this.audioElement.preload = 'auto';
      this.audioElement.volume = 0.5;
      
      // Test if the audio can be loaded
      this.audioElement.addEventListener('canplaythrough', () => {
        this.log('Audio file loaded successfully');
      });
      
      this.audioElement.addEventListener('error', (e) => {
        this.log('Audio file failed to load, trying alternative approach', e);
        // If MP3 fails, use the Web Audio API beep
        this.createBeepSound();
      });
      
    } catch (error) {
      this.log('Failed to load MP3, using beep sound', error);
      this.createBeepSound();
    }
  }

  private playSound() {
    if (!this.sound) return;

    try {
      // First try to play the MP3 audio element if available
      if (this.audioElement) {
        this.audioElement.currentTime = 0;
        const playPromise = this.audioElement.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            this.log('MP3 playback failed, trying beep sound', error);
            this.playBeepSound();
          });
        }
      } else {
        // Fallback to beep sound
        this.playBeepSound();
      }
    } catch (error) {
      this.log('Error playing sound', error);
      this.playBeepSound();
    }
  }

  private playBeepSound() {
    try {
      const audioContext = (this as any).audioContext;
      if (!audioContext) {
        this.log('No audio context available');
        return;
      }

      // Create a simple beep sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure the beep sound
      oscillator.frequency.value = 800; // 800Hz frequency
      oscillator.type = 'sine';

      // Set volume
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      // Play for 100ms
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);

      this.log('Beep sound played');
    } catch (error) {
      this.log('Failed to play beep sound', error);
    }
  }

  // ============== Haptic Feedback Management ==============
  private triggerHapticFeedback() {
    if (!this.haptic || this.disabled) return;

    try {
      // Check if vibration API is supported
      if ('vibrate' in navigator) {
        // Standard haptic feedback for button interactions
        // Pattern: [vibrate, pause, vibrate] in milliseconds
        const success = navigator.vibrate([60]); // Single medium vibration for button
        
        if (success) {
          this.log('Haptic feedback triggered');
        } else {
          this.log('Haptic feedback failed - invalid parameters or unsupported');
        }
      } else {
        this.log('Vibration API not supported on this device');
      }
    } catch (error) {
      this.log('Error triggering haptic feedback', error);
    }
  }

  // ============== State Management ==============
  @Watch('state')
  handleStateChange(newValue: string) {
    this.log('State changed', { from: this.currentState, to: newValue });
    this.currentState = newValue;
  }

  // ============== Event Handlers ==============
  private handleMouseEnter = () => {
    if (this.currentState !== 'disabled') {
      this.log('Mouse entered');
      this.isHovered = true;
    }
  };

  private handleMouseLeave = () => {
    this.log('Mouse left');
    this.isHovered = false;
    this.isActive = false;
  };

  private handleMouseDown = () => {
    if (this.currentState !== 'disabled') {
      this.log('Mouse down');
      this.isActive = true;
    }
  };

  private handleMouseUp = () => {
    this.log('Mouse up');
    this.isActive = false;
  };

  private handleClick = (event: MouseEvent) => {
    // Don't emit events for navigation buttons - let the browser handle the navigation
    if (this.href) return;

    if (this.ripple && !this.disabled) {
      const button = this.el.shadowRoot?.querySelector('button, a');
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = this.rippleId++;
      
      this.ripples = [...this.ripples, { x, y, id }];
      
      // Remove ripple after animation completes
      setTimeout(() => {
        this.ripples = this.ripples.filter(r => r.id !== id);
      }, 600);
    }

    // Play sound and trigger haptic feedback if enabled and not disabled
    if (!this.disabled) {
      this.playSound();
      this.triggerHapticFeedback();
    }

    if (!this.disabled && this.buttonText) {
      this.buttonAction.emit({
        action: this.action || undefined,
        label: this.buttonText
      });
    }
  };

  // ============== Style Helpers ==============
  private getButtonStyles(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};

    // Apply cursor style for disabled state
    if (this.currentState === 'disabled') {
      styles.cursor = 'not-allowed';
    }

    // Merge custom styles with default styles
    return { ...styles, ...this.customStyle };
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.log('Component will load', {
      variant: this.variant,
      size: this.size,
      state: this.state,
      iconOnly: this.iconOnly,
      sound: this.sound,
      haptic: this.haptic
    });

    // Initialize audio if sound is enabled
    if (this.sound) {
      this.initializeAudio();
    }
  }

  componentDidLoad() {
    this.log('Component did load');
  }

  disconnectedCallback() {
    // Clean up audio element when component is destroyed
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    
    // Clean up audio context
    const audioContext = (this as any).audioContext;
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close().catch(error => {
        this.log('Error closing audio context', error);
      });
      (this as any).audioContext = null;
    }
  }

  // ============== Render Methods ==============
  render() {
    this.log('Rendering component', {
      currentState: this.currentState,
      isHovered: this.isHovered,
      isActive: this.isActive,
      sound: this.sound,
      href: this.href
    });

    const buttonClasses: { [key: string]: boolean } = {
      'spectrum-button': true,
      [`spectrum-button--${this.variant}`]: true,
      [`spectrum-button--${this.size === 'medium' ? 'base' : this.size}`]: true,
      'spectrum-button--disabled': this.disabled,
      'spectrum-button--outline': this.outline,
      'spectrum-button--icon-only': this.iconOnly,
      'spectrum-button--hover': this.isHovered,
      'spectrum-button--active': this.isActive,
      'spectrum-button--minimal-animation': this.minimalAnimation,
      'spectrum-button--navigation': !!this.href,
    };

    const commonProps = {
      class: buttonClasses,
      style: this.getButtonStyles(),
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onClick: this.handleClick
    };

    const buttonContent = [
      this.ripple && this.ripples.map(ripple => (
        <span
          class="spectrum-button__ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      )),
      !this.iconOnly && (
        <Fragment>
          {this.showLeftIcon && (
            <span class="spectrum-button__icon">
              <span class="material-symbols-outlined">{this.leftIcon}</span>
            </span>
          )}
          {this.showButtonText && (
            <span class="spectrum-button__text">{this.buttonText}</span>
          )}
          {this.showRightIcon && (
            <span class="spectrum-button__icon">
              <span class="material-symbols-outlined">{this.rightIcon}</span>
            </span>
          )}
        </Fragment>
      ),
      this.iconOnly && this.showLeftIcon && (
        <span class="spectrum-button__icon">
          <span class="material-symbols-outlined">{this.leftIcon}</span>
        </span>
      )
    ];

    return (
      <Host>
        {this.href ? (
          <a
            {...commonProps}
            href={this.href}
            target={this.target}
            rel={this.target === '_blank' && !this.rel ? 'noopener noreferrer' : this.rel}
            tabindex={this.disabled ? '-1' : '0'}
            aria-disabled={this.disabled ? 'true' : undefined}
          >
            {buttonContent}
          </a>
        ) : (
          <button
            {...commonProps}
            disabled={this.disabled}
            type="button"
          >
            {buttonContent}
          </button>
        )}
      </Host>
    );
  }
}
