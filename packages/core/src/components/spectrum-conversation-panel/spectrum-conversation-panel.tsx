import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Method, Watch } from '@stencil/core';
import { BackgroundLevel } from '../spectrum-panel/spectrum-panel';

/**
 * Spectrum Conversation Panel Component
 * A chat-like interface component that displays messages, sources, and explorations
 * with support for JSON string input for HTML compatibility.
 * 
 * @example
 * // JSON string (HTML-friendly)
 * <spectrum-conversation-panel 
 *   messages='[{"id":"msg1","isRequest":true,"content":"Hello!","timestamp":"2023-01-01"}]'>
 * </spectrum-conversation-panel>
 */

export interface ContentCard {
  title: string;
  subtitle: string;
  snippet: string;
  url: string;
  number: number;
}

export interface ExplorationItem {
  label: string;
  icon: string;
  action: string;
}

export interface Message {
  id: string;
  isRequest: boolean;
  content: string;
  timestamp: string;
  sources?: ContentCard[];
  explorations?: ExplorationItem[];
  title?: string;
  isStepwise?: boolean;
}

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
   * The messages to display in the conversation panel as JSON string
   * @example
   * // JSON string format
   * <spectrum-conversation-panel 
   *   messages='[{"id":"msg1","isRequest":true,"content":"Hello!","timestamp":"2023-01-01"}]'>
   * </spectrum-conversation-panel>
   */
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

  /**
   * Background level for the panel
   */
  @Prop() background: BackgroundLevel = 'opaque';

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

  /**
   * Scrolls to the bottom of the expanded accordion containing explorations
   * @param messageId - The ID of the message containing the explorations
   * @param explorationsCount - The total number of explorations (unused but kept for compatibility)
   */
  private scrollToLastExploration(messageId: string, explorationsCount: number) {
    // Wait for DOM to update after accordion expansion and animations
    setTimeout(() => {
      if (!this.conversationPanelRef) {
        return;
      }
      
      // Find the message container first
      const messageContainer = this.el?.querySelector(`#message-${messageId}`);
      if (!messageContainer) {
        return;
      }
      
      // Find the accordion within this message container
      const accordion = messageContainer.querySelector('spectrum-accordion');
      if (!accordion) {
        return;
      }
      
      // Check if accordion has chips (meaning it's expanded)
      const chips = accordion.querySelectorAll('spectrum-chip');
      if (chips.length === 0) {
        // Retry with longer delay if accordion not expanded yet
        setTimeout(() => this.scrollToLastExploration(messageId, explorationsCount), 200);
        return;
      }
      
      // Scroll to the bottom of the expanded accordion
      const accordionRect = accordion.getBoundingClientRect();
      const panelRect = this.conversationPanelRef.getBoundingClientRect();
      
      // Calculate scroll position to show the bottom of the accordion
      const scrollTop = this.conversationPanelRef.scrollTop + 
                       accordionRect.bottom - panelRect.bottom + 20; // 20px padding
      
      this.conversationPanelRef.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }, 500); // Wait for accordion expansion animations
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
    this.debugLog('renderResponse - checking explorations', { 
      messageId, 
      hasExplorations, 
      explorations: response.explorations, 
      explorationsLength: response.explorations?.length 
    });

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
          {hasExplorations && (() => {
            this.debugLog('RENDERING ACCORDION!', { 
              messageId, 
              expanded: activeAccordion === 'explorations',
              activeAccordion,
              expandedMessageId: this.expandedMessageId,
              expandedAccordionType: this.expandedAccordionType
            });
            return (
              <spectrum-accordion
                variant="chip"
                expanded={activeAccordion === 'explorations'}
                label="Dive Deeper"
                sound={this.sound}
                horizontalScroll={false}
                accordionId={`explorations-${messageId}`}
                onAccordionToggle={(event) => this.handleAccordionToggle(event, messageId, 'explorations')}
              >
                {this.renderExplorations(response.explorations, messageId)}
              </spectrum-accordion>
            );
          })()}
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
    this.debugLog('renderExplorations called', { explorations, messageId, explorationsLength: explorations?.length });
    if (!explorations || !Array.isArray(explorations) || explorations.length === 0) {
      this.debugLog('No valid explorations provided', { explorations });
      return null;
    }
    
    // Return chips directly without container div for accordion usage
    this.debugLog('Creating exploration chips', { count: explorations.length, messageId });
    return explorations.map((exploration) => {
      this.debugLog('Creating chip for exploration', exploration.label);
      return (
        <spectrum-chip
          variant="secondary"
          label={exploration.label}
          leadingIcon="prompt_suggestion"
          sound={this.sound}
          onClick={() => {
            this.debugLog('Exploration clicked', { exploration: exploration.label, messageId });
            this.action.emit({
              action: 'explore',
              type: 'exploration',
              value: exploration.value,
              messageId: messageId
            });
          }}
        />
      );
    });
  }

  private handleAccordionToggle = (event: CustomEvent, messageId: string, accordionType: 'explorations') => {
    const { expanded } = event.detail;
    this.debugLog('Accordion toggled', { messageId, accordionType, expanded, event: event.detail });
    
    if (expanded) {
      this.debugLog('Accordion expanded - setting state', { messageId, accordionType });
      this.expandedMessageId = messageId;
      this.expandedAccordionType = accordionType;
      
      // Scroll to show the bottom of the expanded accordion
      if (accordionType === 'explorations') {
        this.scrollToLastExploration(messageId, 0); // explorationsCount not needed for this approach
      }
    } else {
      this.debugLog('Accordion collapsed - clearing state');
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
  /**
   * Parse HTML content and replace <cite> and <sup> tags with source chips using DOM traversal
   */
  private parseAndReplaceSourceTags(htmlContent: string, sources: any[], messageId: string): any {
    this.debugLog('parseAndReplaceSourceTags called', { htmlContent, sourcesLength: sources?.length, messageId });
    
    if (!sources || !Array.isArray(sources) || sources.length === 0) {
      this.debugLog('No sources found, returning original content');
      return <div innerHTML={htmlContent}></div>;
    }

    // Parse HTML using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${htmlContent}</div>`, 'text/html');
    const container = doc.body.firstChild as HTMLElement;
    
    if (!container) {
      this.debugLog('Failed to parse HTML content');
      return <div innerHTML={htmlContent}></div>;
    }

    // Find all citation elements (cite and sup tags)
    const citationElements = container.querySelectorAll('cite, sup');
    
    if (citationElements.length === 0) {
      this.debugLog('No cite or sup tags found in parsed content');
      return <div innerHTML={htmlContent}></div>;
    }

    this.debugLog('Found citation elements', { count: citationElements.length });

    // Convert citations to data for grouping
    const citationData: Array<{
      element: Element;
      sourceNumber: string;
      source: any;
      position: number;
    }> = [];

    citationElements.forEach((element, index) => {
      const sourceNumber = element.textContent?.trim() || '';
      const source = sources.find(s => 
        s.number === sourceNumber || 
        s.number === parseInt(sourceNumber) || 
        s.number?.toString() === sourceNumber
      );

      if (source) {
        citationData.push({
          element,
          sourceNumber,
          source,
          position: index
        });
      }
    });

    // Group adjacent citations by checking DOM proximity
    const citationGroups = this.groupAdjacentCitationElements(citationData);
    
    // Convert DOM tree to JSX elements
    const convertedContent = this.convertDOMToJSX(container, citationGroups, messageId);

    this.debugLog('Converted DOM to JSX successfully');
    
    return convertedContent;
  }

  /**
   * Group adjacent citation elements in the DOM
   */
  private groupAdjacentCitationElements(citationData: Array<{
    element: Element;
    sourceNumber: string;
    source: any;
    position: number;
  }>): Array<{
    elements: Array<{element: Element; sourceNumber: string; source: any}>;
    isGrouped: boolean;
  }> {
    if (citationData.length === 0) return [];

    const groups: Array<{
      elements: Array<{element: Element; sourceNumber: string; source: any}>;
      isGrouped: boolean;
    }> = [];
    
    let currentGroup = [citationData[0]];

    for (let i = 1; i < citationData.length; i++) {
      const current = citationData[i];
      const previous = citationData[i - 1];
      
      // Check if elements are adjacent in DOM
      const isAdjacent = this.areElementsAdjacent(previous.element, current.element);
      
      if (isAdjacent) {
        currentGroup.push(current);
      } else {
        // Finish current group
        groups.push({
          elements: currentGroup.map(({ element, sourceNumber, source }) => ({ element, sourceNumber, source })),
          isGrouped: currentGroup.length > 1
        });
        currentGroup = [current];
      }
    }
    
    // Add the last group
    groups.push({
      elements: currentGroup.map(({ element, sourceNumber, source }) => ({ element, sourceNumber, source })),
      isGrouped: currentGroup.length > 1
    });

    return groups;
  }

  /**
   * Check if two elements are adjacent (only whitespace/punctuation between them)
   */
  private areElementsAdjacent(elem1: Element, elem2: Element): boolean {
    let nextNode = elem1.nextSibling;
    
    while (nextNode && nextNode !== elem2) {
      if (nextNode.nodeType === Node.TEXT_NODE) {
        const text = nextNode.textContent || '';
        // If there's significant text between them, they're not adjacent
        if (text.trim().length > 3 && !/^[\s,;.!?\-–—]*$/.test(text.trim())) {
          return false;
        }
      } else if (nextNode.nodeType === Node.ELEMENT_NODE) {
        // If there's another element between them, they're not adjacent
        return false;
      }
      nextNode = nextNode.nextSibling;
    }
    
    return nextNode === elem2;
  }

  /**
   * Convert DOM nodes to JSX elements, replacing citation groups with spectrum-chip components
   */
  private convertDOMToJSX(node: Node, citationGroups: Array<{
    elements: Array<{element: Element; sourceNumber: string; source: any}>;
    isGrouped: boolean;
  }>, messageId: string): any {
    
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      
      // Check if this element is part of a citation group
      const citationGroup = citationGroups.find(group => 
        group.elements.some(item => item.element === element)
      );
      
      if (citationGroup) {
        // If this is the first element in a group, render the group
        const isFirstInGroup = citationGroup.elements[0].element === element;
        
        if (isFirstInGroup) {
          if (citationGroup.isGrouped) {
            // Render grouped citation chip
            const sourceNumbers = citationGroup.elements.map(item => item.sourceNumber);
            const validSources = citationGroup.elements.map(item => item.source);
            
            return [
              ' ',
              <spectrum-chip
                size="extra-small"
                variant="secondary"
                outline={true}
                label={`${validSources.length} citations`}
                sound={this.sound}
                onMouseEnter={(e) => this.handleGroupedSourceChipHover(e, messageId, sourceNumbers)}
                onMouseLeave={() => this.handleSourceChipLeave()}
                onClick={(e) => this.handleGroupedSourceChipClick(e, messageId, sourceNumbers, validSources)}
              />
            ];
          } else {
            // Render single citation chip
            const { sourceNumber, source } = citationGroup.elements[0];
            return [
              ' ',
              <spectrum-chip
                size="extra-small"
                variant="secondary"
                outline={true}
                label={source.label}
                sound={this.sound}
                onMouseEnter={(e) => this.handleSourceChipHover(e, messageId, sourceNumber, source)}
                onMouseLeave={() => this.handleSourceChipLeave()}
                onClick={(e) => this.handleSourceChipClick(e, messageId, sourceNumber, source)}
              />
            ];
          }
        } else {
          // Skip other elements in the group (they're handled by the first element)
          return null;
        }
      }
      
      // Regular element - convert children and create JSX element
      const tagName = element.tagName.toLowerCase();
      const children: any[] = [];
      
      for (let i = 0; i < node.childNodes.length; i++) {
        const child = this.convertDOMToJSX(node.childNodes[i], citationGroups, messageId);
        if (child !== null) {
          children.push(child);
        }
      }
      
      // Create JSX element based on tag name
      const props: any = {};
      
      // Copy attributes
      if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          props[attr.name] = attr.value;
        }
      }
      
      // Return appropriate JSX element
      switch (tagName) {
        case 'ul':
          return <ul {...props}>{children}</ul>;
        case 'ol':
          return <ol {...props}>{children}</ol>;
        case 'li':
          return <li {...props}>{children}</li>;
        case 'p':
          return <p {...props}>{children}</p>;
        case 'div':
          return <div {...props}>{children}</div>;
        case 'span':
          return <span {...props}>{children}</span>;
        case 'strong':
          return <strong {...props}>{children}</strong>;
        case 'em':
          return <em {...props}>{children}</em>;
        case 'br':
          return <br />;
        case 'a':
          return <a {...props}>{children}</a>;
        default:
          // For any other elements, use a span
          return <span {...props}>{children}</span>;
      }
    }
    
    return null;
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

    // Get all sources for the hovered citation(s) - limit to 9 cards max
    const sources = sourceNumbers
      .map(num => message.sources.find(s => 
        s.number === num || 
        s.number === parseInt(num) || 
        s.number?.toString() === num
      ))
      .filter(Boolean)
      .slice(0, 9); // Limit to 9 cards maximum

    if (sources.length === 0) return null;

    // Calculate position based on the chip element
    const chipElement = activeChip.element;
    const chipRect = chipElement.getBoundingClientRect();

    const isGrouped = sources.length > 1;

    // Smart positioning logic to avoid clipping
    const { overlayStyle, gridClass } = this.calculateOverlayPosition(chipRect, sources.length, isGrouped);

    return (
      <div 
        class={`source-hover-overlay ${gridClass}`}
        style={overlayStyle}
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
   * Calculate optimal overlay position to avoid clipping
   */
  private calculateOverlayPosition(chipRect: DOMRect, sourceCount: number, isGrouped: boolean): {
    overlayStyle: any;
    gridClass: string;
  } {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Estimated card dimensions
    const cardHeight = 120; // Approximate height of a source card
    const cardWidth = 280; // Approximate width of a source card
    const gap = 8; // Gap between cards
    
    // Calculate grid dimensions
    let columns = 1;
    let rows = 1;
    
    if (isGrouped && sourceCount > 1) {
      columns = Math.min(3, sourceCount);
      rows = Math.min(3, Math.ceil(sourceCount / 3));
    }
    
    // Calculate total overlay dimensions
    const overlayWidth = (cardWidth * columns) + (gap * (columns - 1));
    const overlayHeight = (cardHeight * rows) + (gap * (rows - 1));
    
    // Default position (below the chip)
    let top = chipRect.bottom + 8;
    let left = chipRect.left;
    let positionClass = 'position-below';
    
    // Check if overlay would be clipped at the bottom
    const spaceBelow = viewportHeight - chipRect.bottom;
    const spaceAbove = chipRect.top;
    
    if (spaceBelow < overlayHeight + 16 && spaceAbove > overlayHeight + 16) {
      // Position above the chip if there's more space above
      top = chipRect.top - overlayHeight - 8;
      positionClass = 'position-above';
    }
    
    // Check if overlay would be clipped on the right
    const spaceRight = viewportWidth - chipRect.left;
    if (spaceRight < overlayWidth + 16) {
      // Adjust left position to keep overlay in viewport
      left = Math.max(16, viewportWidth - overlayWidth - 16);
    }
    
    // Generate grid class based on layout
    const gridClass = `grid-${columns}x${rows} ${positionClass}`;
    
    const overlayStyle = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: '1000',
      maxWidth: `${overlayWidth}px`,
      maxHeight: `${overlayHeight}px`
    };
    
    return { overlayStyle, gridClass };
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
          <spectrum-panel 
            background={this.background}
            debug={this.debug}
            size="full"
            panelTitle={this.conversationtitle}
            titleEditable={true}
            onTitleChanged={(event) => {
              this.titleChanged.emit(event.detail);
            }}
          >
              {this.renderMessages()}
          </spectrum-panel>
          
          {/* Desktop hover/click overlay for source chips */}
          {(this.hoveredSourceChip || this.clickedSourceChip) && this.renderSourceHoverOverlay()}
          
          {/* Mobile source card */}
          {this.showMobileSourceCard && this.renderMobileSourceCard()}
      </Host>
    );
  }
}
