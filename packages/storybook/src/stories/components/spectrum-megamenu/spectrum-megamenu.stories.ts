import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumMegaMenu } from "@stencil-storybook-boilerplate/core/src/components/spectrum-megamenu/spectrum-megamenu";

const meta = {
  title: 'Components/SpectrumMegaMenu',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    megamenuTitle: 'Mega Mega Menu',
    openIcon: 'menu',
    closeIcon: 'close',
    width: '',
    content:  `[
      {
        "title": "Section 1",
        "links": [
          {
            "title": "Link 1",
            "href": "http://www.google.com"
          },
          {
            "title": "Link 2",
            "href": "#"
          }
        ]
      },
      {
        "title": "Section 3",
        "links": [
          {
            "title": "Link 1",
            "href": "#"
          },
          {
            "title": "Link 2",
            "href": "#"
          }
        ]
      },
       {
        "title": "Section 2",
        "links": [
          {
            "title": "Link 1",
            "href": "#"
          },
          {
            "title": "Link 2",
            "href": "#"
          }
        ]
      },
      {
        "title": "Text Section 4",
        "text": "I'm baby same DIY chia, church-key chambray lyft woke. Distillery gochujang artisan typewriter you probably haven't heard of them mustache intelligentsia. 3 wolf moon sus vape tattooed. Solarpunk chillwave austin gorpcore tumeric, kogi chambray mixtape fixie you probably haven't heard of them tbh cornhole. Neutral milk hotel tumblr pabst distillery heirloom same knausgaard bicycle rights lo-fi tousled ugh cray. Gatekeep pop-up franzen jean shorts, four loko bruh dreamcatcher kogi tofu af before they sold out tote bag meditation polaroid."
      }
    ]`
  },
  argTypes: {
    megamenuTitle: {
      type: {
        required: true,
      },
    },
    openIcon: {
      type: {
        required: false,
      },
    },
    closeIcon: {
      type: {
        required: false,
      },
    },
    width: {
      type: {
        required: false,
      },
    },
    content: {
      type: {
        required: true,
      },
    }
  }
} satisfies Meta<SpectrumMegaMenu>

export default meta

export const MegaMenu = {
  render: ({ megamenuTitle, openIcon, closeIcon, width, content }) =>
      html`<spectrum-megamenu megamenuTitle=${megamenuTitle} content=${content} openIcon=${openIcon} closeIcon=${closeIcon} width=${width} />`,
} satisfies StoryObj<SpectrumMegaMenu>
