import { Component, Host, h, State, Event, EventEmitter, Method, Element, Prop } from '@stencil/core';

@Component({
  tag: 'spectrum-search-input',
  styleUrl: 'spectrum-search-input.scss',
  shadow: true,
})
export class SpectrumSearchInput {
  @Element() el: HTMLElement;
  
  @Prop() maxLines: number = 4;
  
  @State() searchText: string = '';
  @State() isListening: boolean = false;
  @State() isSpeechAvailable: boolean = false;
  @State() isMultiline: boolean = false;
  
  @Event() searchSubmit: EventEmitter<string>;
  
  private inputRef?: HTMLTextAreaElement;
  private recognition: any;
  private lineHeight: number = 24; // Line height in pixels
  
  componentWillLoad() {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window) {
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
    }
  }
  
  @Method()
  async setFocus() {
    this.inputRef?.focus();
  }
  
  private handleInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    this.searchText = textarea.value;
    this.adjustTextareaHeight();
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
    this.searchSubmit.emit(this.searchText);
  };
  
  private handleVoiceInput = () => {
    if (this.recognition) {
      this.isListening = true;
      this.recognition.start();
    }
  };
  
  render() {
    return (
      <Host>
        <div class="spectrum-search-input">
          <div class={{
            'spectrum-search-input__container': true,
            'spectrum-search-input__container--multiline': this.isMultiline
          }}>
            <textarea
              ref={(el) => this.inputRef = el}
              class="spectrum-search-input__field"
              value={this.searchText}
              onInput={this.handleInput}
              placeholder="Ask anything..."
              rows={1}
              aria-label="Search input"
            />
            <div class="spectrum-search-input__buttons">
              {this.isSpeechAvailable && (
                <spectrum-button
                  variant="ghost"
                  iconOnly={true}
                  size="base"
                  leftIcon="mic"
                  onClick={this.handleVoiceInput}
                  state={this.isListening ? 'active' : 'default'}
                  aria-label="Voice search"
                />
              )}
              <spectrum-button
                variant="primary"
                iconOnly={true}
                size="base"
                leftIcon="search"
                onClick={this.handleSearch}
                aria-label="Search"
              />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
