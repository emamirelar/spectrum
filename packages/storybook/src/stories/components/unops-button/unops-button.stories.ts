import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components";

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { UnopsButton } from "@stencil-storybook-boilerplate/core/src/components/unops-button/unops-button";

const meta = {
  title: 'Components/UnopsButton',
  // TODO: for now we won't use autodocs but will in the future when we right a template
  // tags: ['autodocs'],
  args: {
    variant: 'primary',
    label: 'Primary'
  },
  argTypes: {
    label: {
      type: {
        required: true,
      },
    },
    variant: {
      options: [0, 1, 2, 3, 4, 5 ], // iterator
      mapping: ['primary', 'secondary', 'tertiary', 'affirmative', 'warning', 'destructive'], // values
      control: {
        type: 'select', 
        labels: ['primary', 'secondary', 'tertiary', 'affirmative', 'warning', 'destructive'],
      },
    }
  }
} satisfies Meta<UnopsButton>

export default meta

export const Button = {
  render: ({ label, variant}) =>
      html`<unops-button label=${label} variant=${variant}></unops-button>`
} satisfies StoryObj<UnopsButton>
