import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumConversationPanel } from "@stencil-storybook-boilerplate/core/src/components/spectrum-conversation-panel/spectrum-conversation-panel";

interface SpectrumConversationPanelArgs {
  messages: string;
  conversationtitle: string;
  actions: string;
  sources: string;
  loading: boolean;
}

const meta = {
  title: 'Components/SpectrumConversationPanel',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    messages: `[
      {
        "message": "Tell me about the Apollo 11 moon landing",
        "sender": "request",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "message": "The Apollo 11 mission was the first manned mission to land on the Moon. Launched on July 16, 1969, it carried astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins. Armstrong and Aldrin became the first humans to walk on the lunar surface on July 20, 1969, while Collins remained in lunar orbit.",
        "sender": "response",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "label": "NASA Apollo 11 Mission Overview",
            "value": "https://www.nasa.gov/mission/apollo-11/",
            "snippet": "The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth."
          }
        ],
        "explorations": [
          {
            "label": "What was the famous quote Neil Armstrong said when he first stepped on the moon?",
            "value": "What was the famous quote Neil Armstrong said when he first stepped on the moon?"
          },
          {
            "label": "How long did the astronauts stay on the lunar surface?",
            "value": "How long did the astronauts stay on the lunar surface?"
          },
          {
            "label": "What scientific experiments did they conduct on the moon?",
            "value": "What scientific experiments did they conduct on the moon?"
          },
          {
            "label": "What was the role of Michael Collins during the mission?",
            "value": "What was the role of Michael Collins during the mission?"
          }
        ]
      }
    ]`,
    conversationtitle: 'Apollo 11 Moon Landing',
    actions: `[
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
    ]`,
    sources: `[
      {
        "label": "NASA Apollo 11 Mission Overview",
        "value": "https://www.nasa.gov/mission/apollo-11/",
        "snippet": "The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth."
      }
    ]`,
    loading: false
  },
  argTypes: {
    messages: {
      control: 'text',
      description: 'JSON string containing an array of message objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of message objects with message, sender, timestamp, and optional sources'
        }
      }
    },
    conversationtitle: {
      control: 'text',
      description: 'Title of the conversation',
      table: {
        type: { summary: 'string' }
      }
    },
    actions: {
      control: 'text',
      description: 'JSON string containing an array of action objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of action objects with label, icon, and value'
        }
      }
    },
    sources: {
      control: 'text',
      description: 'JSON string containing an array of source objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of source objects with label, value, and snippet'
        }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show the loading indicator',
      table: {
        type: { summary: 'boolean' }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A conversation panel component that displays messages, actions, sources, and explorations.
          
          ## Events
          All events now include an action attribute to identify the type of action performed:
          
          - **action**: When action buttons are clicked
            - Payload: \`{ action: string, type: string, value: string }\`
          - **explorationSelected**: When an exploration is selected  
            - Payload: \`{ action: string, exploration: string }\`
          - **explore**: When exploring content
            - Payload: \`{ action: string, value: string }\`
          - **sourceClick**: When a source link is clicked
            - Payload: \`{ action: string, label: string, value: string }\`
          - **titleChanged**: When the conversation title is edited
            - Payload: \`{ action: string, value: string }\`
          
          ## Example Usage
          \`\`\`html
          <spectrum-conversation-panel
            @action={(e) => {
              // e.detail = { action: "share", type: "action", value: "share" }
              console.log('Action:', e.detail);
            }}
            @explorationSelected={(e) => {
              // e.detail = { action: "explorationSelected", exploration: "exploration text" }
              console.log('Exploration selected:', e.detail);
            }}
            @explore={(e) => {
              // e.detail = { action: "explore", value: "exploration content" }
              console.log('Explore:', e.detail);
            }}
            @sourceClick={(e) => {
              // e.detail = { action: "sourceClick", label: "NASA", value: "https://nasa.gov" }
              console.log('Source clicked:', e.detail);
            }}
            @titleChanged={(e) => {
              // e.detail = { action: "titleChanged", value: "New Title" }
              console.log('Title changed:', e.detail);
            }}
          />
          \`\`\`
        `
      }
    }
  }
} satisfies Meta<SpectrumConversationPanel>;

export default meta;

export const Default: StoryObj<SpectrumConversationPanelArgs> = {
  render: (args) => html`
    <div style="height: 600px; padding: 2rem; position: relative; background-color: #f0f0f0;">
      <spectrum-conversation-panel
        .messages=${args.messages}
        .conversationtitle=${args.conversationtitle}
        .actions=${args.actions}
        .sources=${args.sources}
        .loading=${args.loading}
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClick=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
        @titleChanged=${(e: CustomEvent) => action('Title Changed')(e.detail)}
      ></spectrum-conversation-panel>
    </div>
  `,
};
