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
            "label": "NASA History",
            "value": "https://www.nasa.gov/history"
          },
          {
            "label": "Apollo 11 Mission",
            "value": "https://www.nasa.gov/mission_pages/apollo/apollo-11.html"
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
      },
      {
        "sender": "request",
        "message": "What was the name of the lunar module?"
      },
      {
        "sender": "response",
        "message": "The lunar module used in the Apollo 11 mission was named 'Eagle'. It was designed specifically for landing on the Moon and returning to lunar orbit. The name was chosen to represent the United States' national symbol and the spirit of exploration.<ul><li>Eagle Lunar Module</li><li>Lunar Landing Vehicle</li><li>Apollo Spacecraft</li></ul>",
        "sources": [
          {
            "label": "NASA Lunar Module",
            "value": "https://www.nasa.gov/lunar-module"
          }
        ],
        "explorations": [
          {
            "label": "How many lunar modules were built?",
            "value": "exploration3"
          },
          {
            "label": "What happened to the lunar module after the mission?",
            "value": "exploration4"
          }
        ]
      },
      {
        "sender": "request",
        "message": "How long did they stay on the moon?"
      },
      {
        "sender": "response",
        "message": "Neil Armstrong and Buzz Aldrin spent approximately 21 hours and 36 minutes on the lunar surface. During this time, they conducted experiments, collected samples, and took photographs. The actual time spent outside the lunar module was about 2 hours and 31 minutes during their single moonwalk.<ul><li>21 hours 36 minutes total</li><li>2 hours 31 minutes EVA</li><li>Lunar surface activities</li></ul>",
        "sources": [
          {
            "label": "Apollo 11 Timeline",
            "value": "https://www.nasa.gov/apollo-11-timeline"
          }
        ],
        "explorations": [
          {
            "label": "What experiments did they conduct on the moon?",
            "value": "exploration5"
          },
          {
            "label": "How many moon rocks did they bring back?",
            "value": "exploration6"
          }
        ]
      },
      {
        "sender": "request",
        "message": "What was the famous quote when they landed?"
      },
      {
        "sender": "response",
        "message": "The most famous quote from the Apollo 11 mission was spoken by Neil Armstrong as he became the first human to step onto the lunar surface: 'That's one small step for man, one giant leap for mankind.' This iconic phrase was heard by millions of people watching the live broadcast around the world.<ul><li>Neil Armstrong's quote</li><li>First words on the moon</li><li>Historic broadcast</li></ul>",
        "sources": [
          {
            "label": "NASA Audio Archive",
            "value": "https://www.nasa.gov/audio-archive"
          }
        ],
        "explorations": [
          {
            "label": "What other famous quotes came from the mission?",
            "value": "exploration7"
          },
          {
            "label": "How many people watched the moon landing?",
            "value": "exploration8"
          }
        ]
      }
    ]`,
    conversationtitle: 'Apollo 11 Moon Landing',
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
        background=${backgroundImage ? `url(${backgroundImage})` : backgroundColor}
        .backgroundPosition=${backgroundPosition}
        .backgroundSize=${backgroundSize}
        .showSwatches=${false}
      >
        <spectrum-conversation-panel 
          messages="${messages}"
          actions="${actions}"
          conversationtitle="${conversationtitle}"
        ></spectrum-conversation-panel>
      </spectrum-wallpaper>`
} satisfies StoryObj<SpectrumConversationPanel>
