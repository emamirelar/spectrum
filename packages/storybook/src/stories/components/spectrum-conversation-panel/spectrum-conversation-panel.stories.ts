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
        "message": "When did man land on the moon?"
      },
      {
        "sender": "response",
        "message": "This historic event occurred during the Apollo 11 mission, where American astronauts Neil Armstrong and Buzz Aldrin landed the lunar module 'Eagle' on the Moon's surface. Neil Armstrong became the first human to step onto the Moon at 02:56 UTC on July 21, 1969.<ul><li>Neil Armstrong</li><li>Buzz Aldrin</li><li>Michael Collins</li></ul>",
        "sources": [
          {
            "label": "Stuff",
            "value": "https://www.google.com"
          },
          {
            "label": "Things",
            "value": "https://www.bbc.com/news/live/cp8vyy35g3mt"
          },
          {
            "label": "More stuff",
            "value": "https://www.ibm.com"
          },
          {
            "label": "Other things",
            "value": "https://www.ibm.com"
          },
          {
            "label": "Other things",
            "value": "https://www.ibm.com"
          },
          {
            "label": "Other things",
            "value": "https://www.ibm.com"
          }
        ],
        "explorations": [
          {
            "label": "Who was the first person to walk on the moon?",
            "value": "exploration1"
          },
          {
            "label": "Who was the first person to go into space?",
            "value": "exploration2"
          }
        ]
      }
    ]`,
    conversationtitle: 'Conversation Title',
    backgroundColor: '#667eea',
    backgroundImage: 'https://images.unsplash.com/photo-1742302954292-1f903368084e?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
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
    backgroundColor: {
      control: 'color',
      description: 'The background color of the wallpaper',
    },
    backgroundImage: {
      control: 'text',
      description: 'The background image URL',
    },
    backgroundPosition: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
      description: 'The background image position',
    },
    backgroundSize: {
      control: 'select',
      options: ['cover', 'contain', 'auto', '100% 100%'],
      description: 'The background image size',
    }
  }
} satisfies Meta<SpectrumConversationPanel>

export default meta

export const ConversationPanel = {
  render: ({ messages, actions, conversationtitle, backgroundColor, backgroundImage, backgroundPosition, backgroundSize }) =>
      html`<spectrum-wallpaper
        background-color="${backgroundColor}"
        background-image="${backgroundImage}"
        background-position="${backgroundPosition}"
        background-size="${backgroundSize}"
        style="width: 100%; height: 100vh;"
      >
        <spectrum-conversation-panel 
          messages="${messages}"
          actions="${actions}"
          conversationtitle="${conversationtitle}"
          style="display: block; width: 100%; height: 100%;"
        ></spectrum-conversation-panel>
      </spectrum-wallpaper>`
} satisfies StoryObj<SpectrumConversationPanel>
