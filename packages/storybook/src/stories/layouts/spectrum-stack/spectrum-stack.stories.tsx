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
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Stack Layout Component

The \`spectrum-stack\` component provides vertical or horizontal stacking of child elements with consistent spacing and alignment options. It's the simplest layout component, perfect for linear arrangements of content with uniform spacing.

## Purpose

Stack is designed for simple linear layouts where you need consistent spacing between items. It handles the common pattern of arranging items in a single direction with uniform gaps.

## Key Features

- **Direction Control**: Vertical or horizontal stacking
- **Consistent Spacing**: Uniform gaps between all items  
- **Alignment Options**: Control alignment along both axes
- **Wrap Support**: Items can wrap to new lines when needed
- **Reverse Order**: Option to reverse the order of items
- **Responsive Behavior**: Different behavior on different screen sizes
- **Auto Spacing**: Automatic spacing distribution option

## When to Use

- **Simple Lists**: Vertical lists of items with consistent spacing
- **Button Groups**: Horizontal or vertical button arrangements  
- **Form Sections**: Stacking form fields with consistent spacing
- **Content Sections**: Stacking content blocks vertically
- **Navigation Items**: Simple navigation menus
- **Card Stacks**: Vertical arrangements of cards or panels
- **Any Linear Layout**: When you need simple, consistent item spacing

## Basic Usage

\`\`\`html
<!-- Vertical stack (default) -->
<spectrum-stack spacing="md">
  <div class="item">Item 1</div>
  <div class="item">Item 2</div>
  <div class="item">Item 3</div>
</spectrum-stack>

<!-- Horizontal stack -->
<spectrum-stack direction="horizontal" spacing="lg" align="center">
  <spectrum-button variant="primary">Save</spectrum-button>
  <spectrum-button variant="secondary">Cancel</spectrum-button>
  <spectrum-button variant="tertiary">Reset</spectrum-button>
</spectrum-stack>
\`\`\`

## Common Patterns

### Form Field Stack
Perfect for stacking form elements with consistent spacing:

\`\`\`html
<spectrum-stack spacing="lg" align="stretch">
  <h2>Contact Form</h2>
  <div class="field-group">
    <label>Full Name</label>
    <input type="text" />
  </div>
  <div class="field-group">
    <label>Email</label>
    <input type="email" />
  </div>
  <spectrum-stack direction="horizontal" justify="flex-end" spacing="md">
    <spectrum-button variant="secondary">Clear</spectrum-button>
    <spectrum-button variant="primary">Submit</spectrum-button>
  </spectrum-stack>
</spectrum-stack>
\`\`\`

### Navigation Menu
Horizontal navigation with consistent spacing:

\`\`\`html
<spectrum-stack direction="horizontal" spacing="lg" align="center" wrap="true">
  <a href="#home" class="nav-link active">Home</a>
  <a href="#about" class="nav-link">About</a>
  <a href="#services" class="nav-link">Services</a>
</spectrum-stack>
\`\`\`

### Content Sections
Vertical content stacking with generous spacing:

\`\`\`html
<spectrum-stack spacing="xl" align="stretch">
  <header class="page-header">
    <h1>Welcome</h1>
    <p>Introduction text</p>
  </header>
  <section class="hero-section">
    <!-- Hero content -->
  </section>
  <section class="features">
    <!-- Features content -->
  </section>
</spectrum-stack>
\`\`\`

## Layout Comparison

**Use Stack when:**
- Simple linear arrangements
- Consistent spacing between items
- Single direction layouts
- Basic alignment needs

**Use Flex when:**
- Complex alignment requirements
- Need flexbox-specific features
- Advanced responsive behavior
- Multiple alignment axes

**Use Grid when:**
- Two-dimensional layouts
- Precise positioning control
- Complex responsive patterns
- Grid template areas
        `
      }
    }
  },
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