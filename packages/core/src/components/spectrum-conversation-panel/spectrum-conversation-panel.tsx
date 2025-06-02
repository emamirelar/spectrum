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

  @State() sourcesExpanded: boolean = false;
  @State() explorationsExpanded: boolean = false;
  @State() expandedMessageId: string | null = null;
  @State() expandedAccordionType: 'sources' | 'explorations' | null = null;
  @State() messageArray: any[] = [];
  private messageIdMap: Map<number, string> = new Map();

  @Event() explorationSelected: EventEmitter<string>;
  @Event({
    eventName: 'action',
    bubbles: true,
    composed: true,
    cancelable: true
  }) action: EventEmitter<{type: string, value: string}>;
  @Event() explore: EventEmitter<string>;
  @Event() sourceClick: EventEmitter<{label: string, value: string}>;
  @Event({
    eventName: 'titleChanged',
    bubbles: true,
    composed: true,
    cancelable: true
  }) titleChanged: EventEmitter<{action: string, value: string}>;

  @Watch('messages')
  messagesChanged(newValue: string) {
    this.updateMessages(newValue);
  }

  @Watch('loading')
  loadingChanged(newValue: boolean) {
    if (newValue) {
      this.scrollToLatest();
    }
  }

  private updateMessages(messages: string) {
    try {
      const parsedMessages = JSON.parse(messages);
      this.messageArray = parsedMessages;
      this.messageIdMap.clear();
      parsedMessages.forEach((_, index) => {
        this.messageIdMap.set(index, `msg-${index}`);
      });
    } catch (error) {
      console.error('Failed to parse messages:', error);
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
      this.conversationPanelRef.scrollTo({
        top: this.conversationPanelRef.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  componentDidLoad() {
    this.updateMessages(this.messages);
    this.scrollToLatest();
  }

  /** 
   * RenderMessages - render messages in the conversation panel
  **/
  renderMessages() {
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

    return [
      <div class="message-wrapper response" id={`message-${messageId}`}>
        <div class="agentIcon"></div>
        <div class="message">
          <div innerHTML={response.message}></div>
          <div class="actions">
            {this.renderActions()}
          </div>
          <div class="accordion-row">
            <spectrum-chip 
              variant="secondary"
              outline={true}
              label="Dive Deeper"
              leadingIcon={activeAccordion === 'explorations' ? 'arrow_drop_up' : 'arrow_drop_down'}
              onClick={() => this.handleExplorationsClick(messageId)}
              selected={activeAccordion === 'explorations'}
            />
            <spectrum-chip 
              variant="secondary"
              outline={true}
              label="Sources and related content"
              leadingIcon={activeAccordion === 'sources' ? 'arrow_drop_up' : 'arrow_drop_down'}
              onClick={() => this.handleSourcesClick(messageId)}
              selected={activeAccordion === 'sources'}
            />
          </div>
        </div>
      </div>,
      activeAccordion === 'explorations' && (
        <div class="accordion-content expanded" id={`explorations-content-${messageId}`}>
          <div class="scroll-container">
            {response.explorations ? this.renderExplorations(response.explorations) : null}
          </div>
        </div>
      ),
      activeAccordion === 'sources' && (
        <div class="accordion-content expanded" id={`sources-content-${messageId}`}>
          <div class="scroll-container">
            {response.sources ? this.renderSources(response.sources) : null}
          </div>
        </div>
      )
    ];
  }

  /**
   * RenderActions - render actions in the conversation panel
   * actions are an array of objects and are passed in as a string from Storybook
   * the objects have a label and an icon and an action event to emit
   * to the component as a prop
   * @param actions 
   */
  private renderActions() {
    if (!this.actions) return null;

    try {
      const actionsList = JSON.parse(this.actions);
      return (
        <div class="spectrum-conversation-panel__actions">
          {actionsList.map((action: any) => (
            <spectrum-button
              variant="ghost"
              iconOnly={true}
              showLeftIcon={true}
              leftIcon={action.icon}
              action={action.value}
              onClick={() => this.action.emit({
                type: 'action',
                value: action.value
              })}
            />
          ))}
        </div>
      );
    } catch (error) {
      console.error('Error parsing actions:', error);
      return null;
    }
  }

  /**
   * RenderSources - render sources in the conversation panel 
   * @param sources 
   */
  renderSources(sources: any) {
    return sources.map((source, index) => {
      let displayUrl = source.value;
      try {
        const url = new URL(source.value);
        displayUrl = url.hostname;
      } catch (error) {
        // If URL parsing fails, just use the original URL string
        console.warn(`Invalid URL: ${source.value}`);
      }
      
      return (
        <a 
          href={source.value} 
          target="_blank" 
          rel="noopener noreferrer" 
          class="content-card"
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            this.sourceClick.emit({
              label: source.label,
              value: source.value
            });
            window.open(source.value, '_blank');
          }}
        >
          <div class="number">{index + 1}</div>
          <div class="card-content">
            <div class="title">{source.label}</div>
            <div class="subtitle">{displayUrl}</div>
            <div class="snippet">{source.snippet}</div>
          </div>
        </a>
      );
    });
  }

  /**
   * RenderExplorations - render explorations in the conversation panel
   * @param explorations 
   */
  renderExplorations(explorations: any) {
    return (
      <div class="explorations-container">
        {explorations.map((exploration) => (
          <button 
            class="exploration-chip"
            onClick={() => this.action.emit({
              type: 'exploration-action',
              value: exploration.label
            })}
          >
            <span class="material-symbols-outlined">prompt_suggestion</span>
            <span class="chip-label">{exploration.label}</span>
          </button>
        ))}
      </div>
    );
  }

  private handleExplorationsClick = (messageId: string) => {
    this.toggleAccordion(messageId, 'explorations');
  }

  private handleSourcesClick = (messageId: string) => {
    this.toggleAccordion(messageId, 'sources');
  }

  toggleAccordion(messageId: string, accordion: 'sources' | 'explorations') {
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
      </Host>
    );
  }
}
