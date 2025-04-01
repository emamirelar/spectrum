import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumConversationPanel } from "@stencil-storybook-boilerplate/core/src/components/spectrum-conversation-panel/spectrum-conversation-panel";

const meta = {
  title: 'Components/SpectrumConversationPanel',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    actions: `[
      {
        "label": "Share",
        "icon": "share",
        "value": "action1"
      },
      {
        "label": "Regenerate",
        "icon": "refresh",
        "value": "action2"
      },
      {
        "label": "Copy",
        "icon": "content_copy",
        "value": "action3"
      }
    ]`,
    messages: `[
      {
        "sender": "request",
        "message": "I need help?"
      },
      {
        "sender": "response",
        "message": "Yes you do",
        "sources": [
          {
            "label": "Source 1",
            "value": "source1"
          },
          {
            "label": "Source 2",
            "value": "source2"
          }
        ],
        "explorations": [
          {
            "label": "Exploration 1",
            "value": "exploration1"
          },
          {
            "label": "Exploration 2",
            "value": "exploration2"
          }
        ]
      }
    ]`,
    conversationtitle: 'Conversation Title'
  },
  argTypes: {
    messages: {
      type: {
        required: true,
      },
    },
      actions: {
        type: {
          required: true,
        },
      },
      conversationtitle: {
        type: {
          required: true,
        },
      },
  }
} satisfies Meta<SpectrumConversationPanel>

export default meta

export const ConversationPanel = {
  render: ({ messages, actions, conversationtitle }) =>
      html`<div class="wallpaper"><spectrum-conversation-panel messages=${messages} actions=${actions} conversationtitle=${conversationtitle} /></div>`
} satisfies StoryObj<SpectrumConversationPanel>
