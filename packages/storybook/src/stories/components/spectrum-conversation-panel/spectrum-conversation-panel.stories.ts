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
}

const meta = {
  title: 'Components/SpectrumConversationPanel',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    messages: `[
      {
        "role": "user",
        "content": "Tell me about the Apollo 11 moon landing",
        "timestamp": "2024-03-20T10:00:00Z"
      },
      {
        "role": "assistant",
        "content": "The Apollo 11 mission was the first manned mission to land on the Moon. Launched on July 16, 1969, it carried astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins. Armstrong and Aldrin became the first humans to walk on the lunar surface on July 20, 1969, while Collins remained in lunar orbit.",
        "timestamp": "2024-03-20T10:00:05Z",
        "sources": [
          {
            "title": "NASA Apollo 11 Mission Overview",
            "url": "https://www.nasa.gov/mission/apollo-11/",
            "snippet": "The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth."
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
        "title": "NASA Apollo 11 Mission Overview",
        "url": "https://www.nasa.gov/mission/apollo-11/",
        "snippet": "The primary objective of Apollo 11 was to complete a national goal set by President John F. Kennedy on May 25, 1961: perform a crewed lunar landing and return to Earth."
      }
    ]`
  },
  argTypes: {
    messages: {
      control: 'text',
      description: 'JSON string containing an array of message objects',
      table: {
        type: { 
          summary: 'string',
          detail: 'JSON string containing an array of message objects with role, content, timestamp, and optional sources'
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
          detail: 'JSON string containing an array of source objects with title, url, and snippet'
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
          A conversation panel component that displays messages, actions, sources, and explorations.
          Emits various events for user interactions:
          - action: When action buttons are clicked
          - explorationSelected: When an exploration is selected
          - explore: When exploring content
          - sourceClick: When a source link is clicked
          
          Example:
          \`\`\`html
          <spectrum-conversation-panel
            @action={(e) => {
              console.log('Action:', e.detail);
            }}
            @explorationSelected={(e) => {
              console.log('Exploration selected:', e.detail);
            }}
            @explore={(e) => {
              console.log('Explore:', e.detail);
            }}
            @sourceClick={(e) => {
              console.log('Source clicked:', e.detail);
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
        @action=${(e: CustomEvent) => action('Action')(e.detail)}
        @explorationSelected=${(e: CustomEvent) => action('Exploration Selected')(e.detail)}
        @explore=${(e: CustomEvent) => action('Explore')(e.detail)}
        @sourceClicked=${(e: CustomEvent) => action('Source Clicked')(e.detail)}
      ></spectrum-conversation-panel>
    </div>
  `,
};
