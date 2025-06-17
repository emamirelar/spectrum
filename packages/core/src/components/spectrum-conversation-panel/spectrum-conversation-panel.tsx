import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Watch } from '@stencil/core';

@Component({
  tag: 'spectrum-conversation-panel',
  styleUrl: 'spectrum-conversation-panel.scss',
  shadow: false,
})
export class SpectrumConversationPanel {
  @Element() el: HTMLElement;
  private conversationPanelRef: HTMLDivElement;

  /**
     * Note that prop names are all lowercase to accomodate Storybook's args.
    **/

  /**
   * The messsages to display in the conversation panel
   * Default: null
  **/
  @Prop() messages: string = '';

  /**
   * The title to display in the conversation panel
   * Default: null
  **/
  @Prop() conversationtitle: string = 'No title provided';

  /**
   * The actions to display in the messages
   * Default: null
  **/
  @Prop() actions: string = '';

  /**
   * The sources to display in the messages
   * Default: null
  **/
  @Prop() sources: string = '';

  /**
   * Whether to show the loading indicator
   * Default: false
  **/
  @Prop() loading: boolean = false;

  /**
   * Whether to enable sound effects
   * Default: false
  **/
  @Prop() sound: boolean = false;

  /**
   * Whether to enable debug logging
   */
  @Prop() debug: boolean = false;

  @State() explorationsExpanded: boolean = false;
  @State() expandedMessageId: string | null = null;
  @State() expandedAccordionType: 'explorations' | null = null;
  @State() messageArray: any[] = [];
  @State() hoveredSourceChip: { messageId: string; sourceNumber: string; element: HTMLElement; sourceNumbers?: string[] } | null = null;
  @State() clickedSourceChip: { messageId: string; sourceNumber: string; element: HTMLElement; sourceNumbers?: string[] } | null = null;
  @State() showMobileSourceCard: boolean = false;
  @State() mobileSourceData: any = null;
  private messageIdMap: Map<number, string> = new Map();
  private hoverTimeout: NodeJS.Timeout | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private isAudioLooping: boolean = false;
  private previousMessageCount: number = 0;
  private previousLoadingState: boolean = false;

  @Event() explorationSelected: EventEmitter<{ action: string; exploration: string }>;
  @Event({
    eventName: 'action',
    bubbles: true,
    composed: true,
    cancelable: true
  }) action: EventEmitter<{action: string, type: string, value: string, messageId?: string}>;
  @Event() explore: EventEmitter<{ action: string; value: string }>;
  @Event() sourceClick: EventEmitter<{ action: string; label: string; value: string; messageId?: string }>;
  @Event({
    eventName: 'titleChanged',
    bubbles: true,
    composed: true,
    cancelable: true
  }) titleChanged: EventEmitter<{action: string, value: string}>;

  @Watch('messages')
  messagesChanged(newValue: string) {
    this.updateMessages(newValue);
    // Scroll to latest message after updating messages
    setTimeout(() => {
      this.scrollToLatest();
    }, 50); // Small delay to ensure DOM has updated
  }

  @Watch('loading')
  loadingChanged(newValue: boolean) {
    if (newValue) {
      this.scrollToLatest();
      // Start playing waiting sound if sound is enabled
      if (this.sound) {
        this.playWaitingSound();
      }
    } else {
      // Stop playing waiting sound
      this.stopWaitingSound();
    }
  }

  @Watch('sound')
  handleSoundChange(newValue: boolean) {
    if (newValue && !this.audioElement) {
      this.initializeAudio();
    } else if (!newValue) {
      // If sound is disabled, stop any playing audio
      this.stopWaitingSound();
    }
  }

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-conversation-panel] ${message}`, ...args);
    }
  }

  /**
   * Debug error utility
   */
  private debugError(message: string, ...args: any[]) {
    if (this.debug) {
      console.error(`[spectrum-conversation-panel] ${message}`, ...args);
    }
  }

  /**
   * Debug warning utility
   */
  private debugWarn(message: string, ...args: any[]) {
    if (this.debug) {
      console.warn(`[spectrum-conversation-panel] ${message}`, ...args);
    }
  }

  private updateMessages(messages: string) {
    try {
      const parsedMessages = JSON.parse(messages);
      this.messageArray = parsedMessages;
      this.messageIdMap.clear();
      parsedMessages.forEach((message, index) => {
        // Use message.id if available, otherwise fallback to generated ID
        const messageId = message.id || `msg-${index}`;
        this.messageIdMap.set(index, messageId);
      });
    } catch (error) {
      this.debugError('Failed to parse messages:', error);
      this.messageArray = [];
      this.messageIdMap.clear();
    }
  }

  /**
   * Scrolls the conversation panel to the latest message
   */
  @Method()
  async scrollToLatest() {
    if (this.conversationPanelRef) {
      // Use requestAnimationFrame to ensure DOM is fully rendered
      requestAnimationFrame(() => {
        if (this.conversationPanelRef) {
          this.conversationPanelRef.scrollTo({
            top: this.conversationPanelRef.scrollHeight,
            behavior: 'smooth'
          });
        }
      });
    }
  }

  componentDidLoad() {
    this.debugLog('Component loaded, updating messages and scrolling to latest');
    this.updateMessages(this.messages);
    
    // Initialize tracking values
    this.previousMessageCount = this.messageArray.length;
    this.previousLoadingState = this.loading;
    
    // Add click outside listener for closing clicked source chips
    document.addEventListener('click', this.handleDocumentClick);
    
    // Use a longer delay to ensure all DOM elements are rendered
    setTimeout(() => {
      this.scrollToLatest();
    }, 100);
  }

  componentWillLoad() {
    this.debugLog('Component will load', {
      loading: this.loading,
      sound: this.sound
    });

    // Initialize audio if sound is enabled
    if (this.sound) {
      this.initializeAudio();
    }
  }

  componentDidUpdate() {
    // Only scroll to latest when messages change or loading state changes
    // Don't scroll on hover state changes or other UI state changes
    const currentMessageCount = this.messageArray.length;
    const currentLoadingState = this.loading;
    
    if (currentMessageCount !== this.previousMessageCount || 
        currentLoadingState !== this.previousLoadingState) {
      setTimeout(() => {
        this.scrollToLatest();
      }, 50);
    }
    
    // Update tracked values
    this.previousMessageCount = currentMessageCount;
    this.previousLoadingState = currentLoadingState;
  }

  disconnectedCallback() {
    this.debugLog('Component disconnecting, cleaning up audio');
    // Clean up audio element when component is destroyed
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
    this.isAudioLooping = false;
    
    // Clear any hover timeouts
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    
    // Remove document click listener
    document.removeEventListener('click', this.handleDocumentClick);
  }

  /** 
   * RenderMessages - render messages in the conversation panel
  **/
  renderMessages() {
    this.debugLog('Rendering messages', { messageCount: this.messageArray.length, loading: this.loading });
    return (
      <div class="conversation-panel" ref={(el) => this.conversationPanelRef = el}>
        {this.messageArray.map((message, index) => {
          return this.renderMessage(message, message.sender, index);
        })}
        {this.loading && (
          <div class="message-wrapper response">
            <div class="agentIcon"></div>
            <div class="message">
              <div class="loader">
                <span class="dot">.</span>
                <span class="dot">.</span>
                <span class="dot">.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /**
   * RenderMessage - render a message in the conversation panel
   * use renderRequest or renderResponse depending on the message type
   * @param message - the message to render
   * @param sender - the sender of the message
   * @param index - the index of the message in the array
  **/
  renderMessage(message: object, sender: string, index: number) {
    if (sender === 'request') {
      return this.renderRequest(message, index);
    } else if (sender === 'response') {
      return this.renderResponse(message, index);
    }
    return null;
  }

  /**
   * RenderRequest - render a request in the conversation panel
   * @param request - the request to render
   * @param index - the index of the message in the array
   */
  renderRequest(request: any, index: number) {
    const messageId = this.messageIdMap.get(index);
    return (
      <div class="message-wrapper request" id={`message-${messageId}`}>
        <div class="message">
          {request.message}
        </div>
        <div class="userIcon"></div>
      </div>
    );
  }

  /**
   * RenderResponse - render a response in the conversation panel
   * @param response 
   */
  renderResponse(response: any, index: number) {
    const messageId = this.messageIdMap.get(index);
    const isExpanded = this.expandedMessageId === messageId;
    const activeAccordion = isExpanded ? this.expandedAccordionType : null;

    // Check if data exists for conditional rendering
    const hasExplorations = response.explorations && Array.isArray(response.explorations) && response.explorations.length > 0;

    return [
      <div class="message-wrapper response" id={`message-${messageId}`}>
        <div class="agentIcon"></div>
        <div class="message">
          <div class="message-content">
            {this.parseAndReplaceSourceTags(response.message, response.sources || [], messageId)}
          </div>
          <div class="actions">
            {this.renderActions(messageId)}
          </div>
          {hasExplorations && (
            <spectrum-accordion
              expanded={activeAccordion === 'explorations'}
              label="Dive Deeper"
              sound={this.sound}
              horizontalScroll={false}
              accordionId={`explorations-${messageId}`}
              onAccordionToggle={(event) => this.handleAccordionToggle(event, messageId, 'explorations')}
            >
              {this.renderExplorations(response.explorations, messageId)}
            </spectrum-accordion>
          )}
        </div>
      </div>
    ];
  }

  /**
   * RenderActions - render actions in the conversation panel
   * actions are an array of objects and are passed in as a string from Storybook
   * the objects have a label and an icon and an action event to emit
   * to the component as a prop
   * @param messageId - the ID of the message these actions belong to
   */
  private renderActions(messageId?: string) {
    this.debugLog('renderActions called', { actions: this.actions, messageId });
    if (!this.actions) {
      this.debugLog('No actions provided, returning null');
      return null;
    }

    try {
      const actionsList = JSON.parse(this.actions);
      this.debugLog('Parsed actions successfully', { actionsList, length: actionsList.length });
      return (
        <div class="spectrum-conversation-panel__actions">
          {actionsList.map((action: any) => (
            <spectrum-button
              variant="ghost"
              iconOnly={true}
              showLeftIcon={true}
              leftIcon={action.icon}
              sound={this.sound}
              onClick={() => this.action.emit({
                action: action.value || action.label || 'action',
                type: 'action',
                value: action.value,
                messageId: messageId
              })}
            />
          ))}
        </div>
      );
    } catch (error) {
      this.debugError('Error parsing actions:', error);
      return null;
    }
  }

  /**
   * RenderExplorations - render explorations in the conversation panel
   * @param explorations 
   * @param messageId - the ID of the message these explorations belong to
   */
  renderExplorations(explorations: any, messageId?: string) {
    this.debugLog('renderExplorations called', { explorations, messageId });
    if (!explorations || !Array.isArray(explorations) || explorations.length === 0) {
      this.debugLog('No valid explorations provided');
      return null;
    }
    
    // Return chips directly without container div for accordion usage
    return explorations.map((exploration) => (
      <spectrum-chip
        variant="secondary"
        label={exploration.label}
        leadingIcon="prompt_suggestion"
        sound={this.sound}
        onClick={() => this.action.emit({
          action: 'explore',
          type: 'exploration',
          value: exploration.value,
          messageId: messageId
        })}
      />
    ));
  }

  private handleAccordionToggle = (event: CustomEvent, messageId: string, accordionType: 'explorations') => {
    const { expanded } = event.detail;
    
    if (expanded) {
      this.expandedMessageId = messageId;
      this.expandedAccordionType = accordionType;
    } else {
      this.expandedMessageId = null;
      this.expandedAccordionType = null;
    }
  }

  toggleAccordion(messageId: string, accordion: 'explorations') {
    this.debugLog('Toggling accordion', { messageId, accordion, currentExpanded: this.expandedMessageId });
    if (this.expandedMessageId === messageId && this.expandedAccordionType === accordion) {
      // Clicking the same accordion - collapse it
      this.expandedMessageId = null;
      this.expandedAccordionType = null;
    } else {
      // Expanding a different accordion
      this.expandedMessageId = messageId;
      this.expandedAccordionType = accordion;
    }
  }

  /**
   * Handle title edit events (Enter key press or blur)
   * @param event - The keyboard or focus event
   * @param newTitle - The new title value
   */
  private handleTitleEdit = (event: KeyboardEvent | FocusEvent, newTitle: string) => {
    const eventType = event.type;
    
    if (eventType === 'keydown') {
      const keyEvent = event as KeyboardEvent;
      if (keyEvent.key === 'Enter') {
        keyEvent.preventDefault();
        (event.target as HTMLElement).blur(); // Remove focus to trigger blur event
        this.titleChanged.emit({
          action: 'titleChanged',
          value: newTitle.trim()
        });
      }
    } else if (eventType === 'blur') {
      this.titleChanged.emit({
        action: 'titleChanged',
        value: newTitle.trim()
      });
    }
  }

  /**
   * Parse HTML content and replace <cite> and <sup> tags with source chips
   */
  private parseAndReplaceSourceTags(htmlContent: string, sources: any[], messageId: string): any {
    this.debugLog('parseAndReplaceSourceTags called', { htmlContent, sourcesLength: sources?.length, messageId });
    
    if (!sources || !Array.isArray(sources) || sources.length === 0) {
      this.debugLog('No sources found, returning original content');
      return <div innerHTML={htmlContent}></div>;
    }

    // Check for both cite and sup tags
    const citeRegex = /<cite>(\d+)<\/cite>/g;
    const supRegex = /<sup>(\d+)<\/sup>/g;
    
    const citeMatches = [...htmlContent.matchAll(citeRegex)];
    const supMatches = [...htmlContent.matchAll(supRegex)];
    
    // Combine all matches and sort by position
    const allMatches = [
      ...citeMatches.map(match => ({ ...match, tagType: 'cite' as const })),
      ...supMatches.map(match => ({ ...match, tagType: 'sup' as const }))
    ].sort((a, b) => a.index! - b.index!);
    
    if (allMatches.length === 0) {
      this.debugLog('No cite or sup tags found in content');
      return <div innerHTML={htmlContent}></div>;
    }

    this.debugLog('Found citation tags, processing...', { 
      matchCount: allMatches.length, 
      citeCount: citeMatches.length, 
      supCount: supMatches.length 
    });
    
    // Group adjacent citations
    const citationGroups = this.groupAdjacentCitations(allMatches, htmlContent);
    
    // Build an array of elements
    const elements: any[] = [];
    let lastIndex = 0;
    
    citationGroups.forEach((group) => {
      const groupStart = group.matches[0].index!;
      const groupEnd = group.matches[group.matches.length - 1].index! + group.matches[group.matches.length - 1][0].length;

      // Add text before the citation group
      if (groupStart > lastIndex) {
        const beforeText = htmlContent.substring(lastIndex, groupStart);
        if (beforeText.trim()) {
          elements.push(<span innerHTML={beforeText} />);
        }
      }

      if (group.matches.length === 1) {
        // Single citation - render as before
        const match = group.matches[0];
        const sourceNumber = match[1];
        const source = sources.find(s => 
          s.number === sourceNumber || 
          s.number === parseInt(sourceNumber) || 
          s.number?.toString() === sourceNumber
        );

        if (source) {
          elements.push(
            <spectrum-chip
              size="extra-small"
              variant="secondary"
              outline={true}
              label={source.label}
              sound={this.sound}
              style={{ margin: '0 2px', verticalAlign: 'middle', display: 'inline-flex' }}
              onMouseEnter={(e) => this.handleSourceChipHover(e, messageId, sourceNumber, source)}
              onMouseLeave={() => this.handleSourceChipLeave()}
              onClick={(e) => this.handleSourceChipClick(e, messageId, sourceNumber, source)}
            />
          );
        }
      } else {
        // Multiple adjacent citations - render as grouped chip
        const sourceNumbers = group.matches.map(m => m[1]);
        const validSources = sourceNumbers
          .map(num => sources.find(s => 
            s.number === num || 
            s.number === parseInt(num) || 
            s.number?.toString() === num
          ))
          .filter(Boolean);

        if (validSources.length > 0) {
          elements.push(
            <spectrum-chip
              size="extra-small"
              variant="secondary"
              outline={true}
              label={`${validSources.length} citations`}
              sound={this.sound}
              style={{ margin: '0 2px', verticalAlign: 'middle', display: 'inline-flex' }}
              onMouseEnter={(e) => this.handleGroupedSourceChipHover(e, messageId, sourceNumbers)}
              onMouseLeave={() => this.handleSourceChipLeave()}
              onClick={(e) => this.handleGroupedSourceChipClick(e, messageId, sourceNumbers, validSources)}
            />
          );
        }
      }

      lastIndex = groupEnd;
    });

    // Add remaining text after the last citation group
    if (lastIndex < htmlContent.length) {
      const remainingText = htmlContent.substring(lastIndex);
      if (remainingText.trim()) {
        elements.push(<span innerHTML={remainingText} />);
      }
    }

    this.debugLog('Created elements for rendering', { elementsLength: elements.length });
    
    // Return a div containing all elements
    return <div style={{ display: 'inline' }}>{elements}</div>;
  }

  /**
   * Group adjacent citations together
   */
  private groupAdjacentCitations(matches: any[], htmlContent: string): { matches: any[] }[] {
    if (matches.length === 0) return [];
    
    const groups: { matches: any[] }[] = [];
    let currentGroup: any[] = [matches[0]];
    
    for (let i = 1; i < matches.length; i++) {
      const currentMatch = matches[i];
      const previousMatch = matches[i - 1];
      
      // Calculate the text between this citation and the previous one
      const previousEnd = previousMatch.index! + previousMatch[0].length;
      const currentStart = currentMatch.index!;
      const textBetween = htmlContent.substring(previousEnd, currentStart);
      
      // Consider citations adjacent if there's only whitespace, punctuation, or very short text between them
      const isAdjacent = /^[\s,;.!?\-–—]*$/.test(textBetween) || textBetween.length <= 3;
      
      if (isAdjacent) {
        currentGroup.push(currentMatch);
      } else {
        groups.push({ matches: currentGroup });
        currentGroup = [currentMatch];
      }
    }
    
    // Don't forget the last group
    groups.push({ matches: currentGroup });
    
    return groups;
  }

  /**
   * Handle source chip hover
   */
  private handleSourceChipHover = (event: MouseEvent, messageId: string, sourceNumber: string, _source: any) => {
    const target = event.target as HTMLElement;
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      return; // Don't show hover on mobile
    }
    
    // Clear any existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    
    this.hoveredSourceChip = {
      messageId,
      sourceNumber,
      element: target
    };
  }

  /**
   * Handle grouped source chip hover
   */
  private handleGroupedSourceChipHover = (event: MouseEvent, messageId: string, sourceNumbers: string[]) => {
    const target = event.target as HTMLElement;
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      return; // Don't show hover on mobile
    }
    
    // Clear any existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    
    this.hoveredSourceChip = {
      messageId,
      sourceNumber: sourceNumbers[0], // Use first source number as primary
      sourceNumbers: sourceNumbers,
      element: target
    };
  }

  /**
   * Handle source chip leave
   */
  private handleSourceChipLeave = () => {
    // Only hide on leave if not clicked (clicked state persists)
    if (!this.clickedSourceChip) {
      // Set a delay before hiding to allow user to hover over the card
      this.hoverTimeout = setTimeout(() => {
        this.hoveredSourceChip = null;
      }, 300); // 300ms delay
    } else {
      // If clicked, just clear hover state but keep overlay visible
      this.hoveredSourceChip = null;
    }
  }

  /**
   * Handle source overlay hover (keep it visible when hovering over the card)
   */
  private handleSourceOverlayEnter = () => {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  /**
   * Handle source overlay leave
   */
  private handleSourceOverlayLeave = () => {
    // Only hide overlay if not clicked (clicked state persists)
    if (!this.clickedSourceChip) {
      this.hoveredSourceChip = null;
    } else {
      // If clicked, just clear hover state but keep overlay visible
      this.hoveredSourceChip = null;
    }
  }

  /**
   * Handle source chip click
   */
  private handleSourceChipClick = (event: MouseEvent, messageId: string, sourceNumber: string, source: any) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      this.mobileSourceData = source;
      this.showMobileSourceCard = true;
    } else {
      // On desktop, toggle clicked state or emit the source click event
      if (this.clickedSourceChip && 
          this.clickedSourceChip.messageId === messageId && 
          this.clickedSourceChip.sourceNumber === sourceNumber) {
        // Already clicked - close it
        this.clickedSourceChip = null;
      } else {
        // Toggle to show this chip's cards
        this.clickedSourceChip = {
          messageId,
          sourceNumber,
          element: event.target as HTMLElement
        };
      }
      
      // Also emit the source click event
      this.sourceClick.emit({
        action: 'sourceClick',
        label: source.label,
        value: source.value,
        messageId: messageId
      });
    }
  }

  /**
   * Handle grouped source chip click
   */
  private handleGroupedSourceChipClick = (event: MouseEvent, messageId: string, sourceNumbers: string[], sources: any[]) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Check if we're on mobile
    if (window.innerWidth <= 768) {
      // For mobile, show the first source in the group
      if (sources.length > 0) {
        this.mobileSourceData = sources[0];
        this.showMobileSourceCard = true;
      }
    } else {
      // On desktop, toggle clicked state for grouped chips
      const primarySourceNumber = sourceNumbers[0];
      if (this.clickedSourceChip && 
          this.clickedSourceChip.messageId === messageId && 
          this.clickedSourceChip.sourceNumber === primarySourceNumber) {
        // Already clicked - close it
        this.clickedSourceChip = null;
      } else {
        // Toggle to show this group's cards
        this.clickedSourceChip = {
          messageId,
          sourceNumber: primarySourceNumber,
          sourceNumbers: sourceNumbers,
          element: event.target as HTMLElement
        };
      }
      
      // Also emit the source click event for the first source in the group
      if (sources.length > 0) {
        this.sourceClick.emit({
          action: 'sourceClick',
          label: sources[0].label,
          value: sources[0].value,
          messageId: messageId
        });
      }
    }
  }

  /**
   * Handle clicks outside of source cards to close them
   */
  private handleDocumentClick = (event: MouseEvent) => {
    if (!this.clickedSourceChip) return;
    
    const target = event.target as HTMLElement;
    
    // Check if click is inside a source hover overlay or on a source chip
    const isInsideSourceOverlay = target.closest('.source-hover-overlay');
    const isSourceChip = target.closest('spectrum-chip[size="extra-small"]');
    
    // Close if clicking outside both the overlay and chips
    if (!isInsideSourceOverlay && !isSourceChip) {
      this.clickedSourceChip = null;
    }
  }

  /**
   * Close mobile source card
   */
  private closeMobileSourceCard = () => {
    this.showMobileSourceCard = false;
    this.mobileSourceData = null;
  }

  /**
   * Render desktop hover overlay for source chips
   */
  private renderSourceHoverOverlay() {
    // Show overlay if either hovered or clicked
    const activeChip = this.hoveredSourceChip || this.clickedSourceChip;
    if (!activeChip) return null;

    const messageId = activeChip.messageId;
    const sourceNumbers = activeChip.sourceNumbers || [activeChip.sourceNumber];
    
    // Find the source data from the message
    const message = this.messageArray.find((_msg, index) => this.messageIdMap.get(index) === messageId);
    if (!message || !message.sources) return null;

    // Get all sources for the hovered citation(s)
    const sources = sourceNumbers
      .map(num => message.sources.find(s => 
        s.number === num || 
        s.number === parseInt(num) || 
        s.number?.toString() === num
      ))
      .filter(Boolean);

    if (sources.length === 0) return null;

    // Calculate position based on the chip element
    const chipElement = activeChip.element;
    const chipRect = chipElement.getBoundingClientRect();

    const isGrouped = sources.length > 1;

    return (
      <div 
        class="source-hover-overlay"
        style={{
          position: 'fixed',
          top: `${chipRect.bottom + 8}px`,
          left: `${chipRect.left}px`,
          zIndex: '1000'
        }}
        onMouseEnter={this.handleSourceOverlayEnter}
        onMouseLeave={this.handleSourceOverlayLeave}
      >
        {isGrouped ? (
          <div class="grouped-sources">
            {sources.map((source, index) => {
              let displayUrl = source.value;
              try {
                const url = new URL(source.value);
                displayUrl = url.hostname;
              } catch (error) {
                this.debugWarn(`Invalid URL: ${source.value}`);
              }

              return (
                <a 
                  key={index}
                  href={source.value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="content-card hover-card grouped-card"
                  onClick={() => this.sourceClick.emit({
                    action: 'sourceClick',
                    label: source.label,
                    value: source.value,
                    messageId: messageId
                  })}
                  style={{ marginBottom: index < sources.length - 1 ? '8px' : '0' }}
                >
                  {source.number && (
                    <div class="number">{source.number}</div>
                  )}
                  <div class="card-content">
                    <div class="subtitle">{displayUrl}</div>
                    <div class="title">{source.label}</div>
                    {source.snippet && (
                      <div class="snippet">{source.snippet}</div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          // Single source - render as before
          (() => {
            const source = sources[0];
            let displayUrl = source.value;
            try {
              const url = new URL(source.value);
              displayUrl = url.hostname;
            } catch (error) {
              this.debugWarn(`Invalid URL: ${source.value}`);
            }

            return (
              <a 
                href={source.value} 
                target="_blank" 
                rel="noopener noreferrer"
                class="content-card hover-card"
                onClick={() => this.sourceClick.emit({
                  action: 'sourceClick',
                  label: source.label,
                  value: source.value,
                  messageId: messageId
                })}
              >
                {source.number && (
                  <div class="number">{source.number}</div>
                )}
                <div class="card-content">
                  <div class="subtitle">{displayUrl}</div>
                  <div class="title">{source.label}</div>
                  {source.snippet && (
                    <div class="snippet">{source.snippet}</div>
                  )}
                </div>
              </a>
            );
          })()
        )}
      </div>
    );
  }

  /**
   * Render mobile source card that slides up from bottom
   */
  private renderMobileSourceCard() {
    if (!this.mobileSourceData) return null;

    const source = this.mobileSourceData;
    let displayUrl = source.value;
    try {
      const url = new URL(source.value);
      displayUrl = url.hostname;
    } catch (error) {
      this.debugWarn(`Invalid URL: ${source.value}`);
    }

    return (
      <div class="mobile-source-overlay" onClick={this.closeMobileSourceCard}>
        <div class="mobile-source-card" onClick={(e) => e.stopPropagation()}>
          <div class="mobile-card-header">
            <button class="close-button" onClick={this.closeMobileSourceCard}>
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          <div class="source-card">
            {source.number && (
              <div class="number">{source.number}</div>
            )}
            <div class="card-content">
              <div class="subtitle">{displayUrl}</div>
              <div class="title">{source.label}</div>
              {source.snippet && (
                <div class="snippet">{source.snippet}</div>
              )}
            </div>
            <a 
              href={source.value} 
              target="_blank" 
              rel="noopener noreferrer"
              class="view-source-button"
            >
              View Source
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ============== Audio Management ==============
  private initializeAudio() {
    try {
      this.debugLog('Initializing audio for waiting sound');
      this.loadWaitingSound();
    } catch (error) {
      this.debugError('Failed to initialize audio', error);
    }
  }

  private loadWaitingSound() {
    try {
      // Try multiple possible paths for the waiting.mp3 file
      const possiblePaths = [
        './waiting.mp3',
        '/waiting.mp3',
        '../waiting.mp3',
        'waiting.mp3',
        '/assets/waiting.mp3',
        './assets/waiting.mp3'
      ];

      // Try the first path
      this.audioElement = new Audio(possiblePaths[0]);
      this.audioElement.preload = 'auto';
      this.audioElement.volume = 0.3;
      this.audioElement.loop = true;
      
      // Test if the audio can be loaded
      this.audioElement.addEventListener('canplaythrough', () => {
        this.debugLog('Waiting sound loaded successfully');
      });
      
      this.audioElement.addEventListener('error', (e) => {
        this.debugWarn('Waiting sound failed to load from path, trying next path', e);
        // Try other paths if the first one fails
        this.tryAlternatePaths(possiblePaths.slice(1));
      });
      
      this.audioElement.addEventListener('ended', () => {
        // This shouldn't trigger since we're using loop=true, but just in case
        if (this.isAudioLooping && this.loading) {
          this.audioElement?.play();
        }
      });
      
    } catch (error) {
      this.debugError('Failed to load waiting sound', error);
    }
  }

  private tryAlternatePaths(paths: string[]) {
    if (paths.length === 0) {
      this.debugWarn('All audio paths failed, no waiting sound available');
      return;
    }

    const nextPath = paths[0];
    this.debugLog('Trying alternate audio path:', nextPath);
    
    if (this.audioElement) {
      this.audioElement.src = nextPath;
      this.audioElement.load();
      
      // Remove old error listener and add new one for remaining paths
      this.audioElement.addEventListener('error', () => {
        this.tryAlternatePaths(paths.slice(1));
      }, { once: true });
    }
  }

  private playWaitingSound() {
    if (!this.sound || !this.audioElement) return;

    try {
      this.debugLog('Starting waiting sound');
      this.isAudioLooping = true;
      this.audioElement.currentTime = 0;
      const playPromise = this.audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          this.debugError('Failed to play waiting sound', error);
        });
      }
    } catch (error) {
      this.debugError('Error playing waiting sound', error);
    }
  }

  private stopWaitingSound() {
    if (this.audioElement && this.isAudioLooping) {
      try {
        this.debugLog('Stopping waiting sound');
        this.audioElement.pause();
        this.audioElement.currentTime = 0;
        this.isAudioLooping = false;
      } catch (error) {
        this.debugError('Error stopping waiting sound', error);
      }
    }
  }

  render() {
    return (
      <Host class="conversation-panel-host">
          <div class="panel frost">
              <h2 
                class="conversation-title"
                contentEditable={true}
                onKeyDown={(event) => {
                  const target = event.target as HTMLElement;
                  this.handleTitleEdit(event, target.textContent || '');
                }}
                onBlur={(event) => {
                  const target = event.target as HTMLElement;
                  this.handleTitleEdit(event, target.textContent || '');
                }}
              >
                {this.conversationtitle}
              </h2>
              {this.renderMessages()}
          </div>
          
          {/* Desktop hover/click overlay for source chips */}
          {(this.hoveredSourceChip || this.clickedSourceChip) && this.renderSourceHoverOverlay()}
          
          {/* Mobile source card */}
          {this.showMobileSourceCard && this.renderMobileSourceCard()}
      </Host>
    );
  }
}
