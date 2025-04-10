import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'spectrum-conversation-panel',
  styleUrl: 'spectrum-conversation-panel.scss',
  shadow: true,
})
export class SpectrumConversationPanel {

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

  @State() sourcesExpanded: boolean = false;
  @State() explorationsExpanded: boolean = false;
  @State() activeAccordion: 'sources' | 'explorations' | null = null;

  @Event() explorationSelected: EventEmitter<string>;

  /** 
   * RenderMessages - render messages in the conversation panel
   * @param messages - the messages to render
  **/
  renderMessages(messages: string) {

    // console.log(messages);

    var messageArray = JSON.parse(messages);

    // console.log(messageArray);
    return (
      <div class="conversationPanel">
        {messageArray.map((message) => {
          // console.log(message);
          return this.renderMessage(message, message.sender);
        })}
      </div>
    );
  }

  /**
   * RenderMessage - render a message in the conversation panel
   * use renderRequest or renderResponse depending on the message type
   * @param message - the message to render
   * @param sender - the sender of the message
  **/
  renderMessage(message: object, sender: string) {
    if (sender === 'request') {
      return this.renderRequest(message);
    } else if (sender === 'response') {
      return this.renderResponse(message);
    }
    return null;
  }

  /**
   * RenderRequest - render a request in the conversation panel
   * @param request 
   */
  renderRequest(request: any) {

    return (
      <div class="message-wrapper request">
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
  renderResponse(response: any) {
    return [
      <div class="message-wrapper response">
        <div class="agentIcon"></div>
        <div class="message">
          <div innerHTML={response.message}></div>
          <div class="actions">
            {this.renderActions(this.actions)}
          </div>
          <div class="accordion-row">
            <button 
              class="button border" 
              onClick={() => this.toggleAccordion('explorations')}
            >
              <span class="button-label">Dive Deeper</span>
              <span class="button-icon material-symbols-outlined">
                {this.activeAccordion === 'explorations' ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
            </button>
            <button 
              class="button border" 
              onClick={() => this.toggleAccordion('sources')}
            >
              <span class="button-label">Sources and related content</span>
              <span class="button-icon material-symbols-outlined">
                {this.activeAccordion === 'sources' ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
            </button>
          </div>
        </div>
      </div>,
      this.activeAccordion === 'explorations' && (
        <div class="accordion-content expanded">
          <div class="scroll-container">
            {response.explorations ? this.renderExplorations(response.explorations) : null}
          </div>
        </div>
      ),
      this.activeAccordion === 'sources' && (
        <div class="accordion-content expanded">
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
  renderActions(actions: any) {
    var actionsArray = JSON.parse(actions);
    return (
        <div class="actions">
        {actionsArray.map((action) => {
          return (
            <div class="action">
              <button class="clear"><span class="material-symbols-outlined">{action.icon}</span></button>
            </div>
          )
        })}
      </div>
    );
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
        >
          <div class="number">{index + 1}</div>
          <div class="card-content">
            <div class="title">{source.label}</div>
            <div class="subtitle">{displayUrl}</div>
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
            onClick={() => this.explorationSelected.emit(exploration.value)}
          >
            <span class="material-symbols-outlined">prompt_suggestion</span>

            <span class="chip-label">{exploration.label}</span>
          </button>
        ))}
      </div>
    );
  }

  toggleAccordion(accordion: 'sources' | 'explorations') {
    if (this.activeAccordion === accordion) {
      this.activeAccordion = null;
    } else {
      this.activeAccordion = accordion;
    }
  }

  render() {
    return (
      <Host>
        <slot>
          <div class="panel frost">
            <div class="header">
              <h2 class="conversation-title">
                {this.conversationtitle}
              </h2>
            </div>
            {this.renderMessages(this.messages)}
          </div>
        </slot>
      </Host>
    );
  }
}
