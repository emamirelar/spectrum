import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumCarousel } from "@stencil-storybook-boilerplate/core/src/components/spectrum-carousel/spectrum-carousel";

interface CarouselItem {
  image: string;
  link?: string;
  text: string;
}

interface SpectrumCarouselArgs {
  content: string;
  show: number;
  autoplay: number;
  animationtime: number;
  gap: number;
  hoverpause: boolean;
}

const defaultContent: CarouselItem[] = [
  {
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2620&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "http://news.bbc.co.uk",
    text: "Egg"
  },
  {
    image: "https://images.unsplash.com/photo-1511993226957-cd166aba52d8?q=80&w=2596&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Green"
  },
  {
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "http://news.bbc.co.uk",
    text: "Orange"
  }
];

const meta = {
  title: 'Components/SpectrumCarousel',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  tags: ['autodocs'],
  args: {
    content: JSON.stringify(defaultContent),
    show: 3,
    autoplay: 3000,
    animationtime: 1000,
    gap: 0,
    hoverpause: true,
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'JSON string containing carousel items with image, optional link, and text properties'
    },
    show: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of items to show at once'
    },
    autoplay: {
      control: { type: 'number', min: 0, step: 500 },
      description: 'Autoplay interval in milliseconds (0 to disable)'
    },
    animationtime: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Animation duration in milliseconds'
    },
    gap: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Gap between carousel items in pixels'
    },
    hoverpause: {
      control: 'boolean',
      description: 'Whether to pause autoplay on hover'
    }
  }
} satisfies Meta<SpectrumCarousel>

export default meta

export const Carousel: StoryObj<SpectrumCarouselArgs> = {
  render: ({ content, show, autoplay, animationtime, gap, hoverpause }) =>
    html`<spectrum-carousel 
      content=${content} 
      show=${show} 
      autoplay=${autoplay} 
      animationtime=${animationtime} 
      gap=${gap} 
      ?hoverpause=${hoverpause} 
    ></spectrum-carousel>`
}
