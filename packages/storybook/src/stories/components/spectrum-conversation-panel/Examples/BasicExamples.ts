import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// Sample conversation data for basic examples
export const simpleConversation = `[
  {
    "id": "msg-001",
    "message": "Hello! How can I help you today?",
    "sender": "request",
    "timestamp": "2024-03-20T09:00:00Z"
  },
  {
    "id": "msg-002", 
    "message": "Hi there! I'd be happy to help you with any questions you have.",
    "sender": "response",
    "timestamp": "2024-03-20T09:00:05Z"
  }
]`;

export const conversationWithSources = `[
  {
    "id": "msg-001",
    "message": "Tell me about renewable energy",
    "sender": "request",
    "timestamp": "2024-03-20T09:00:00Z"
  },
  {
    "id": "msg-002",
    "message": "Renewable energy comes from natural sources that are constantly replenished<sup>1</sup>. The main types include solar, wind, hydroelectric, and geothermal<cite>2</cite>.",
    "sender": "response", 
    "timestamp": "2024-03-20T09:00:05Z",
    "sources": [
      {
        "label": "Renewable Energy Basics",
        "value": "https://www.energy.gov/renewable-energy",
        "snippet": "Overview of renewable energy sources and their environmental benefits.",
        "number": "1"
      },
      {
        "label": "Types of Renewable Energy",
        "value": "https://www.nrel.gov/renewable-types",
        "snippet": "Comprehensive guide to different renewable energy technologies.",
        "number": "2"
      }
    ]
  }
]`;

export const conversationWithExplorations = `[
  {
    "id": "msg-001",
    "message": "What is artificial intelligence?",
    "sender": "request",
    "timestamp": "2024-03-20T09:00:00Z"
  },
  {
    "id": "msg-002",
    "message": "Artificial Intelligence (AI) is a branch of computer science focused on creating machines that can perform tasks requiring human intelligence.",
    "sender": "response",
    "timestamp": "2024-03-20T09:00:05Z",
    "explorations": [
      {
        "label": "What are the main types of AI?",
        "value": "What are the main types of AI?"
      },
      {
        "label": "How is machine learning related to AI?", 
        "value": "How is machine learning related to AI?"
      },
      {
        "label": "What are real-world AI applications?",
        "value": "What are real-world AI applications?"
      }
    ]
  }
]`;

export const basicActions = `[
  {
    "label": "Share",
    "icon": "share",
    "value": "share"
  },
  {
    "label": "Export",
    "icon": "download", 
    "value": "export"
  }
]`;

export const extendedActions = `[
  {
    "label": "Share",
    "icon": "share",
    "value": "share"
  },
  {
    "label": "Export",
    "icon": "download",
    "value": "export"
  },
  {
    "label": "Copy",
    "icon": "content_copy",
    "value": "copy"
  },
  {
    "label": "Bookmark",
    "icon": "bookmark",
    "value": "bookmark"
  },
  {
    "label": "Print",
    "icon": "print",
    "value": "print"
  }
]`;

// Basic render template with theme wrapper
export const BasicTemplate = (messages: string, title: string, actions: string = basicActions, options: any = {}) => html`
  <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
    <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
      <spectrum-conversation-panel
        .messages=${messages}
        .conversationtitle=${title}
        .actions=${actions}
        .sources=${options.sources || '[]'}
        .loading=${options.loading || false}
        .sound=${options.sound || false}
        .debug=${options.debug || false}
        .background=${options.background || 'opaque'}
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
        @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
      ></spectrum-conversation-panel>
    </div>
  </spectrum-theme>
`;

// Story functions for basic examples
export function SimpleConversation() {
  return BasicTemplate(
    simpleConversation,
    'Simple Conversation',
    basicActions
  );
}

export function ConversationWithSources() {
  return BasicTemplate(
    conversationWithSources,
    'Conversation with Source Citations',
    basicActions
  );
}

export function ConversationWithExplorations() {
  return BasicTemplate(
    conversationWithExplorations,
    'Conversation with Explorations',
    basicActions
  );
}

export function EmptyConversation() {
  return BasicTemplate(
    '[]',
    'Empty Conversation Panel',
    basicActions
  );
}

export function LoadingState() {
  return BasicTemplate(
    simpleConversation,
    'Loading State Demo',
    basicActions,
    { loading: true }
  );
}

export function EditableTitle() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 600px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface-variant, #f8f9fa);">
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--spectrum-sys-color-info-container, #e7f3ff); border-radius: var(--spectrum-sys-shape-corner-medium, 6px);">
          <p style="margin: 0; color: var(--spectrum-sys-color-on-info-container, #004085);">
            💡 <strong>Try clicking the title above the conversation to edit it!</strong> The title is editable - click to modify, press Enter or click outside to save.
          </p>
        </div>
        <spectrum-conversation-panel
          .messages=${simpleConversation}
          .conversationtitle=${'Click Me to Edit This Title'}
          .actions=${basicActions}
          .loading=${false}
          .sound=${false}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
          @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
          @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
}

export function MinimalConfiguration() {
  return html`
    <spectrum-theme color="#0070d2" auto-load-fonts preload-fonts hide-content-until-ready="false">
      <div style="height: 400px; padding: 1rem; position: relative; background: var(--spectrum-sys-color-surface, #ffffff);">
        <spectrum-conversation-panel
          .messages=${'[{"message": "Minimal setup", "sender": "response", "timestamp": "2024-03-20T09:00:00Z"}]'}
          .conversationtitle=${'Minimal Panel'}
          @action=${(e: CustomEvent) => action('Action')(e.detail)}
          @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
        ></spectrum-conversation-panel>
      </div>
    </spectrum-theme>
  `;
} 