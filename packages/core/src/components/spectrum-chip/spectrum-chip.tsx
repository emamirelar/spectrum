import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Watch } from '@stencil/core';

/**
 * Spectrum Chip Component
 * A versatile chip component that can be used for tags, filters, and selections.
 * Supports leading/trailing icons, selection states, and various interactive behaviors.
 */
@Component({
  tag: 'spectrum-chip',
  styleUrl: 'spectrum-chip.scss',
  shadow: true,
})
export class SpectrumChip {
  // ============== Component Properties ==============
  @Element() el: HTMLElement;

  // Debug Mode
  @Prop() debug: boolean = false;

  // Chip Variants and Appearance
  @Prop() variant: 'primary' | 'secondary' | 'assist' | 'filter' | 'input' | 'suggestion' = 'primary';
  @Prop() size: 'small' | 'medium' | 'large' | 'extra-small' = 'medium';
  @Prop() selected: boolean = false;
  @Prop() disabled: boolean = false;
  @Prop() outline: boolean = false;
  @Prop() ripple: boolean = false;
  @Prop() action: string = '';

  // Chip Content
  @Prop() label: string = '';
  @Prop() leadingIcon: string = '';
  @Prop() trailingIcon: string = 'close';
  @Prop() showTrailingIcon: boolean = false;

  // Sound Support
  @Prop() sound: boolean = false;

  // Chip State
  @State() isHovered: boolean = false;
  @State() isActive: boolean = false;
  @State() ripples: { x: number; y: number; id: number }[] = [];
  private rippleId: number = 0;
  private audioElement: HTMLAudioElement | null = null;

  // Events
  @Event() chipAction: EventEmitter<{ action?: string; label: string }>;

  // ============== Debug Helpers ==============
  private log(message: string, data?: any) {
    if (this.debug || message.toLowerCase().includes('audio') || message.toLowerCase().includes('sound') || message.toLowerCase().includes('beep')) {
      console.log(`[spectrum-chip] ${message}`, data);
    }
  }

  // ============== State Management ==============
  @Watch('selected')
  handleSelectedChange(newValue: boolean) {
    this.log('Selected state changed', { from: this.selected, to: newValue });
  }

  @Watch('sound')
  handleSoundChange(newValue: boolean) {
    if (newValue && !this.audioElement) {
      this.initializeAudio();
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
        './chip.mp3',
        '/chip.mp3',
        '../chip.mp3',
        'chip.mp3'
      ];

      // Try the first path
      this.audioElement = new Audio(possiblePaths[0]);
      this.audioElement.preload = 'auto';
      this.audioElement.volume = 0.3; // Slightly quieter for chip interactions
      
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
    if (!this.sound || this.disabled) return;

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

      // Create a simple beep sound (higher pitch for chip)
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure the beep sound (higher frequency for chip)
      oscillator.frequency.value = 1200; // 1200Hz frequency for chip (higher than button's 800Hz)
      oscillator.type = 'sine';

      // Set volume (softer for chip interactions)
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.005, audioContext.currentTime + 0.08);

      // Play for 80ms (shorter than button's 100ms)
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);

      this.log('Beep sound played');
    } catch (error) {
      this.log('Failed to play beep sound', error);
    }
  }

  // ============== Event Handlers ==============
  private handleMouseEnter = () => {
    if (!this.disabled) {
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
    if (!this.disabled) {
      this.log('Mouse down');
      this.isActive = true;
    }
  };

  private handleMouseUp = () => {
    this.log('Mouse up');
    this.isActive = false;
  };

  private handleClick = (event: MouseEvent) => {
    if (this.ripple && !this.disabled) {
      const chip = this.el.shadowRoot?.querySelector('.spectrum-chip');
      if (!chip) return;

      const rect = chip.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = this.rippleId++;
      
      this.ripples = [...this.ripples, { x, y, id }];
      
      // Remove ripple after animation completes
      setTimeout(() => {
        this.ripples = this.ripples.filter(r => r.id !== id);
      }, 600);
    }

    // Play sound if enabled and not disabled
    if (!this.disabled) {
      this.playSound();
    }

    if (!this.disabled && this.label) {
      this.chipAction.emit({
        action: this.action || undefined,
        label: this.label
      });
    }
  };

  private handleRemove = (e: Event) => {
    e.stopPropagation();
    if (!this.disabled) {
      this.log('Chip remove clicked');
      // Play sound for remove action too
      this.playSound();
      this.chipAction.emit({
        action: 'remove',
        label: this.label
      });
    }
  };

  // ============== Style Helpers ==============
  private getChipClasses(): string {
    const classes = ['spectrum-chip'];
    
    // Add variant class
    classes.push(`spectrum-chip--${this.variant}`);
    
    // Add size class
    classes.push(`spectrum-chip--${this.size}`);
    
    // Add outline class if needed
    if (this.outline) {
      classes.push('spectrum-chip--outline');
    }
    
    // Add disabled class if needed
    if (this.disabled) {
      classes.push('spectrum-chip--disabled');
    }

    this.log('Generated classes', { classes });
    return classes.join(' ');
  }

  // ============== Lifecycle Methods ==============
  componentWillLoad() {
    this.log('Component will load', {
      variant: this.variant,
      selected: this.selected,
      disabled: this.disabled,
      outline: this.outline,
      ripple: this.ripple,
      sound: this.sound
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
    this.log('Component disconnecting, cleaning up audio');
    // Clean up audio element when component is destroyed
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    
    // Clean up audio context
    const audioContext = (this as any).audioContext;
    if (audioContext && audioContext.close) {
      audioContext.close();
    }
  }

  // ============== Render Methods ==============
  render() {
    this.log('Rendering component', {
      selected: this.selected,
      isHovered: this.isHovered,
      isActive: this.isActive
    });

    return (
      <Host>
        <div 
          class={this.getChipClasses()}
          role="button"
          tabindex={this.disabled ? -1 : 0}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
          {this.ripple && this.ripples.map(ripple => (
            <span
              class="spectrum-chip__ripple"
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
              }}
            />
          ))}
          {this.leadingIcon && (
            <span class="spectrum-chip__icon spectrum-chip__icon--leading">
              <span class="material-symbols-outlined">{this.leadingIcon}</span>
            </span>
          )}
          
          <span class="spectrum-chip__label">{this.label}</span>
          
          {this.showTrailingIcon && (
            <span 
              class="spectrum-chip__icon spectrum-chip__icon--trailing"
              onClick={this.handleRemove}
            >
              <span class="material-symbols-outlined">{this.trailingIcon}</span>
            </span>
          )}
        </div>
      </Host>
    );
  }
} 