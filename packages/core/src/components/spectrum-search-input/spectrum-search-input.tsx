import { Component, Host, h, State, Event, EventEmitter, Method, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'spectrum-search-input',
  styleUrl: 'spectrum-search-input.scss',
  shadow: true,
})
export class SpectrumSearchInput {
  @Element() el: HTMLElement;
  
  @Prop() maxLines: number = 4;
  
  /**
   * Placeholder text for the search input
   */
  @Prop() placeholder: string = 'Ask anything...';
  
  /**
   * Whether to enable voice input capabilities (speech recognition)
   */
  @Prop() enableVoiceInput: boolean = true;
  
  /**
   * Whether to enable submitting search on Enter key press
   */
  @Prop() enableEnterSubmit: boolean = true;

  /**
   * Position of the search icon - 'left' or 'right'
   */
  @Prop() searchIconPosition: 'left' | 'right' = 'right';

  /**
   * Variant of the search button - 'primary' or 'ghost'
   */
  @Prop() searchButtonVariant: 'primary' | 'ghost' = 'primary';
  
  /**
   * Whether to clear the input value after submitting a search
   */
  @Prop() clearOnSubmit: boolean = false;
  
  @State() searchText: string = '';
  @State() isListening: boolean = false;
  @State() isSpeechAvailable: boolean = false;
  @State() isMultiline: boolean = false;
  
  @Event() searchSubmit: EventEmitter<{ action: string; value: string }>;
  
  /** Emits when input value changes, for real-time filtering */
  @Event() searchInput: EventEmitter<{ action: string; value: string }>;
  
  private inputRef?: HTMLTextAreaElement;
  private recognition: any;
  private lineHeight: number = 24; // Line height in pixels
  
  /**
   * Watch for changes to enableVoiceInput property
   */
  @Watch('enableVoiceInput')
  handleEnableVoiceInputChange(newValue: boolean) {
    if (newValue) {
      // Initialize speech recognition if newly enabled
      this.initSpeechRecognition();
    } else {
      // Disable speech recognition
      this.isSpeechAvailable = false;
      if (this.isListening && this.recognition) {
        this.recognition.abort();
        this.isListening = false;
      }
    }
  }
  
  /**
   * Initialize speech recognition if available and enabled
   */
  private initSpeechRecognition() {
    if (this.enableVoiceInput && 'webkitSpeechRecognition' in window) {
      this.recognition = new (window as any).webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.isSpeechAvailable = true;
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.searchText = transcript;
        this.isListening = false;
        this.adjustTextareaHeight();
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
      };
    } else {
      this.isSpeechAvailable = false;
    }
  }
  
  componentWillLoad() {
    // Initialize speech recognition if available and enabled
    this.initSpeechRecognition();
  }
  
  @Method()
  async setFocus() {
    this.inputRef?.focus();
  }
  
  private handleInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    this.searchText = textarea.value;
    this.adjustTextareaHeight();
    
    // Emit the input event for real-time filtering
    this.searchInput.emit({ action: 'input', value: this.searchText });
  };
  
  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.enableEnterSubmit && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSearch();
    }
  };
  
  private adjustTextareaHeight = () => {
    if (this.inputRef) {
      // Reset height to measure actual content height
      this.inputRef.style.height = '24px';
      
      // Calculate maximum height based on maxLines
      const maxHeight = (this.lineHeight * this.maxLines) + 32; // 32px for padding
      const contentHeight = this.inputRef.scrollHeight;
      
      // Check if content exceeds single line
      this.isMultiline = contentHeight > 56;
      
      if (this.isMultiline) {
        // If content height exceeds maxHeight, set to maxHeight and enable scrolling
        if (contentHeight > maxHeight) {
          this.inputRef.style.height = `${maxHeight}px`;
          this.inputRef.style.overflowY = 'auto';
        } else {
          this.inputRef.style.height = `${contentHeight}px`;
          this.inputRef.style.overflowY = 'hidden';
        }
      } else {
        this.inputRef.style.height = '24px';
        this.inputRef.style.overflowY = 'hidden';
      }
    }
  };
  
  private handleSearch = () => {
    this.searchSubmit.emit({ action: 'submit', value: this.searchText });
    
    // Clear the input if clearOnSubmit is enabled
    if (this.clearOnSubmit) {
      this.searchText = '';
      this.adjustTextareaHeight();
    }
  };
  
  private handleVoiceInput = () => {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();
    }
  };
  
  render() {
    const searchButton = (
      <spectrum-button
        variant={this.searchButtonVariant}
        iconOnly={true}
        size="sm"
        leftIcon="search"
        showLeftIcon={true}
        onClick={this.handleSearch}
        aria-label="Search"
      />
    );

    const voiceButton = this.enableVoiceInput && this.isSpeechAvailable && (
      <spectrum-button
        variant="ghost"
        iconOnly={true}
        size="sm"
        leftIcon="mic"
        showLeftIcon={true}
        onClick={this.handleVoiceInput}
        state={this.isListening ? 'active' : 'default'}
        aria-label="Voice search"
      />
    );

    return (
      <Host>
        <div class="spectrum-search-input">
          <div class={{
            'spectrum-search-input__container': true,
            'spectrum-search-input__container--multiline': this.isMultiline
          }}>
            {this.searchIconPosition === 'left' && (
              <div class="spectrum-search-input__buttons--left">
                {searchButton}
              </div>
            )}
            <textarea
              ref={(el) => this.inputRef = el}
              class={{
                'spectrum-search-input__field': true,
                'spectrum-search-input__field--icon-left': this.searchIconPosition === 'left',
              }}
              value={this.searchText}
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
              placeholder={this.placeholder}
              rows={1}
              aria-label="Search input"
            />
            <div class="spectrum-search-input__buttons">
              {this.searchIconPosition === 'right' && searchButton}
              {voiceButton}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
