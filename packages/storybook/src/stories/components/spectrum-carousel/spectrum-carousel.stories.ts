import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumCarousel } from "@stencil-storybook-boilerplate/core/src/components/spectrum-carousel/spectrum-carousel";

const meta = {
  title: 'Components/SpectrumCarousel',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    content:  `[
      {
        "image": "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "link": "http://news.bbc.co.uk",
        "text": "Egg"
      },
      {
        "image": "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?q=80&w=2596&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "text": "Green"
      },
      {
        "image": "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "link": "http://news.bbc.co.uk",
        "text": "Orange"
      }

    ]`,
    show: 3,
    autoplay: 3000,
    animationtime: 1000,
    gap:0,
    hoverpause: true,
  },
  argTypes: {
    content: {
      type: {
        required: true,
      },
    },
    show: {
      type: {
        required: false,
      },
    },
    autoplay: {
      type: {
        required: false,
      },
    },
    animationtime: {
      type: {
        required: false,
      },
    },
    gap: {
      type: {
        required: false,
      },
    },
    hoverpause: {
      type: {
        required: false,
      },
    },
  }
} satisfies Meta<SpectrumCarousel>

export default meta

export const Carousel = {
  render: ({ content, show, autoplay, animationtime, gap, hoverpause }) =>
      html`<spectrum-carousel content=${content} show=${show} autoplay=${autoplay} animationtime=${animationtime} gap=${gap} hoverpause=${hoverpause} />`
} satisfies StoryObj<SpectrumCarousel>
