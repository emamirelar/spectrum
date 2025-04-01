import { Component, Host, h, Prop } from '@stencil/core';

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
    return (
      <div class="message-wrapper response">
        <div class="agentIcon"></div>
        <div class="message">
          {response.message}
          <div class="actions">
            {this.renderActions(this.actions)}
          </div>
          <div class="sources">
            {response.sources ? this.renderSources(response.sources) : null}
          </div>
          <div class="explorations">
            {response.explorations ? this.renderExplorations(response.explorations) : null}
          </div>
        </div>
      </div>
    );
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
    console.log('Actions...', actionsArray);
    return (
        <div class="actions">
        {actionsArray.map((action) => {
          console.log('action', action);
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
    return (
      <div class="sources">
        {sources.map((source) => {
          return (
            <div class="source">
              {source.label}
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * RenderExplorations - render explorations in the conversation panel
   * @param explorations 
   */
  renderExplorations(explorations: any) {
    return (
      <div class="explorations">
        {explorations.map((exploration) => {
          return (
            <div class="exploration">
              {exploration.label}
            </div>
          );
        })}
      </div>
    );
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
