import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumStack } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-stack/spectrum-stack";

interface SpectrumStackArgs {
  direction: "vertical" | "horizontal" | "column" | "row";
  spacing: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "auto";
  align: "start" | "center" | "end" | "stretch";
  justify: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
  wrap: boolean;
  reverse: boolean;
  responsive: boolean;
  breakpoint: "sm" | "md" | "lg";
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumStack",
  tags: ["autodocs"],
  args: {
    direction: "vertical",
    spacing: "md",
    align: "stretch",
    justify: "start",
    wrap: false,
    reverse: false,
    responsive: false,
    breakpoint: "md",
    debug: false
  }
} satisfies Meta<SpectrumStack>;

export default meta;

export const Default = {
  render: (args: SpectrumStackArgs) => html`
    <div style="height: 400px; border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-stack 
        direction=${args.direction} 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?reverse=${args.reverse}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Item 1</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Item 2</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Item 3</div>
        <div style="background: #fff3e0; padding: 1rem; border-radius: 4px;">Item 4</div>
      </spectrum-stack>
    </div>
  `
};

export const HorizontalStack = {
  args: {
    direction: "horizontal",
    spacing: "lg",
    align: "center"
  },
  render: (args: SpectrumStackArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-stack 
        direction=${args.direction} 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?reverse=${args.reverse}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Button 1</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Button 2</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Button 3</div>
      </spectrum-stack>
    </div>
  `
};

export const ResponsiveStack = {
  args: {
    direction: "horizontal",
    spacing: "md",
    responsive: true,
    breakpoint: "md"
  },
  render: (args: SpectrumStackArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h3>Resize window to see responsive behavior</h3>
      <spectrum-stack 
        direction=${args.direction} 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?reverse=${args.reverse}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; min-width: 150px;">Navigation</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px; flex: 1;">Content Area</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; min-width: 120px;">Sidebar</div>
      </spectrum-stack>
    </div>
  `
};

export const WithWrapping = {
  args: {
    direction: "horizontal",
    spacing: "sm",
    wrap: true,
    justify: "space-between"
  },
  render: (args: SpectrumStackArgs) => html`
    <div style="width: 300px; border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-stack 
        direction=${args.direction} 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?reverse=${args.reverse}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 0.5rem 1rem; border-radius: 4px;">Tag 1</div>
        <div style="background: #f3e5f5; padding: 0.5rem 1rem; border-radius: 4px;">Tag 2</div>
        <div style="background: #e8f5e8; padding: 0.5rem 1rem; border-radius: 4px;">Long Tag Name</div>
        <div style="background: #fff3e0; padding: 0.5rem 1rem; border-radius: 4px;">Tag 4</div>
        <div style="background: #fce4ec; padding: 0.5rem 1rem; border-radius: 4px;">Another Tag</div>
      </spectrum-stack>
    </div>
  `
}; 