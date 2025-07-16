import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

// @ts-ignore
import type { SpectrumFlex } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-flex/spectrum-flex";

interface SpectrumFlexArgs {
  direction: "row" | "row-reverse" | "column" | "column-reverse";
  wrap: "nowrap" | "wrap" | "wrap-reverse";
  justify: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  align: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  alignContent: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch";
  gap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  rowGap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  columnGap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  inline: boolean;
  fullHeight: boolean;
  fullWidth: boolean;
  responsive: boolean;
  breakpoint: "sm" | "md" | "lg";
  mobileDirection: "row" | "column";
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumFlex",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Flex Layout Component

The \`spectrum-flex\` component provides advanced flexbox layout capabilities with comprehensive control over flex properties, responsive behavior, and fine-grained alignment options. It's designed for complex layouts that require precise control over how items are arranged and distributed.

## Purpose

Flex provides complete flexbox control for layouts that need more sophisticated alignment, distribution, and responsive behavior than simple stacking. It's the go-to choice for complex component arrangements.

## Key Features

- **Complete Flexbox Control**: All flexbox properties (direction, wrap, justify, align)
- **Responsive Behavior**: Different layouts for different screen sizes
- **Custom Gap Control**: Both uniform and separate row/column gaps
- **Alignment Options**: Precise control over main and cross axis alignment
- **Container Sizing**: Full width, full height, and inline options
- **Mobile Optimization**: Special mobile direction handling

## When to Use

- **Complex Layouts**: Multi-column layouts with precise alignment needs
- **Navigation Bars**: Headers, toolbars, and navigation components
- **Card Layouts**: Flexible card arrangements with equal spacing
- **Form Layouts**: Complex form arrangements with aligned inputs
- **Dashboard Widgets**: Responsive widget arrangements
- **Media Objects**: Content with images and text that need alignment
- **Any Flexbox Layout**: When you need more control than basic stack/cluster

## Basic Usage

\`\`\`html
<!-- Horizontal layout with center alignment -->
<spectrum-flex direction="row" justify="center" align="center" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</spectrum-flex>

<!-- Vertical stack with space between -->
<spectrum-flex direction="column" justify="space-between" gap="lg">
  <header>Header Content</header>
  <main>Main Content</main>
  <footer>Footer Content</footer>
</spectrum-flex>
\`\`\`

## Common Patterns

### Navigation Header
Perfect for app headers with logo, navigation, and actions:

\`\`\`html
<spectrum-flex 
  direction="row" 
  justify="space-between" 
  align="center"
  full-width="true"
  gap="md">
  <!-- Logo -->
  <div class="logo">
    <img src="/logo.svg" alt="Logo" />
  </div>
  
  <!-- Navigation -->
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
  
  <!-- Actions -->
  <div class="actions">
    <spectrum-button variant="primary">Sign In</spectrum-button>
  </div>
</spectrum-flex>
\`\`\`

### Responsive Card Grid
Cards that wrap and adapt to screen size:

\`\`\`html
<spectrum-flex 
  wrap="wrap"
  justify="space-between"
  align="stretch"
  gap="xl"
  responsive="true"
  mobile-direction="column">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</spectrum-flex>
\`\`\`

### Form Layout
Complex form with aligned sections:

\`\`\`html
<spectrum-flex direction="column" gap="lg" full-width="true">
  <!-- Form header -->
  <spectrum-flex direction="row" justify="space-between" align="center">
    <h2>Contact Form</h2>
    <span class="required">* Required</span>
  </spectrum-flex>
  
  <!-- Form fields -->
  <spectrum-flex direction="row" gap="md" wrap="wrap">
    <div class="field">
      <label>First Name *</label>
      <input type="text" required />
    </div>
    <div class="field">
      <label>Last Name *</label>
      <input type="text" required />
    </div>
  </spectrum-flex>
  
  <!-- Form actions -->
  <spectrum-flex direction="row" justify="flex-end" gap="sm">
    <spectrum-button variant="secondary">Cancel</spectrum-button>
    <spectrum-button variant="primary">Submit</spectrum-button>
  </spectrum-flex>
</spectrum-flex>
\`\`\`

### Media Object Pattern
Image with flexible content area:

\`\`\`html
<spectrum-flex direction="row" align="flex-start" gap="md">
  <!-- Image/Avatar -->
  <div class="media-object">
    <img src="/avatar.jpg" alt="User" class="avatar" />
  </div>
  
  <!-- Content -->
  <spectrum-flex direction="column" gap="sm" style="flex: 1;">
    <h3>John Doe</h3>
    <p>This is a media object pattern with flexible content area...</p>
    <div class="meta">2 hours ago</div>
  </spectrum-flex>
</spectrum-flex>
\`\`\`

## Layout Comparison

**Use Flex when:**
- Complex alignment requirements
- Need flexbox-specific features (justify-content, align-items)
- Advanced responsive behavior
- Wrapping layouts
- Space distribution control

**Use Stack when:**
- Simple linear arrangements
- Basic spacing needs
- Single direction layouts

**Use Grid when:**
- Two-dimensional layouts
- Precise positioning control
- Grid template areas
- Complex responsive patterns

## Advanced Features

### Custom Gap Control
\`\`\`html
<!-- Different row and column gaps -->
<spectrum-flex 
  wrap="wrap"
  row-gap="xl"
  column-gap="sm">
  <!-- Items with custom spacing -->
</spectrum-flex>
\`\`\`

### Responsive Direction
\`\`\`html
<spectrum-flex 
  direction="row"
  responsive="true"
  mobile-direction="column"
  breakpoint="md">
  <!-- Horizontal on desktop, vertical on mobile -->
</spectrum-flex>
\`\`\`
        `
      }
    }
  },
  args: {
    direction: "row",
    wrap: "nowrap",
    justify: "flex-start",
    align: "stretch",
    alignContent: "stretch",
    gap: "md",
    rowGap: "",
    columnGap: "",
    inline: false,
    fullHeight: false,
    fullWidth: false,
    responsive: false,
    breakpoint: "md",
    mobileDirection: "column",
    debug: false
  }
} satisfies Meta<SpectrumFlex>;

export default meta;

export const Default = {
  render: (args: SpectrumFlexArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-flex 
        direction=${args.direction}
        wrap=${args.wrap}
        justify=${args.justify}
        align=${args.align}
        alignContent=${args.alignContent}
        gap=${args.gap}
        rowGap=${args.rowGap}
        columnGap=${args.columnGap}
        ?inline=${args.inline}
        ?fullHeight=${args.fullHeight}
        ?fullWidth=${args.fullWidth}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        mobileDirection=${args.mobileDirection}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; min-width: 100px;">Item 1</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px; min-width: 100px;">Item 2</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; min-width: 100px;">Item 3</div>
      </spectrum-flex>
    </div>
  `
};

export const JustifyContentVariations = {
  render: (args: SpectrumFlexArgs) => html`
    <div style="background: #f5f5f5; padding: 2rem;">
      <div style="margin-bottom: 2rem;">
        <h4>justify="flex-start" (default)</h4>
        <div style="border: 2px dashed #ccc; padding: 1rem;">
          <spectrum-flex justify="flex-start" gap="sm">
            <div style="background: #e3f2fd; padding: 0.75rem; border-radius: 4px;">A</div>
            <div style="background: #f3e5f5; padding: 0.75rem; border-radius: 4px;">B</div>
            <div style="background: #e8f5e8; padding: 0.75rem; border-radius: 4px;">C</div>
          </spectrum-flex>
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h4>justify="center"</h4>
        <div style="border: 2px dashed #ccc; padding: 1rem;">
          <spectrum-flex justify="center" gap="sm">
            <div style="background: #e3f2fd; padding: 0.75rem; border-radius: 4px;">A</div>
            <div style="background: #f3e5f5; padding: 0.75rem; border-radius: 4px;">B</div>
            <div style="background: #e8f5e8; padding: 0.75rem; border-radius: 4px;">C</div>
          </spectrum-flex>
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h4>justify="space-between"</h4>
        <div style="border: 2px dashed #ccc; padding: 1rem;">
          <spectrum-flex justify="space-between" gap="sm">
            <div style="background: #e3f2fd; padding: 0.75rem; border-radius: 4px;">A</div>
            <div style="background: #f3e5f5; padding: 0.75rem; border-radius: 4px;">B</div>
            <div style="background: #e8f5e8; padding: 0.75rem; border-radius: 4px;">C</div>
          </spectrum-flex>
        </div>
      </div>
    </div>
  `
};

export const ColumnLayout = {
  args: {
    direction: "column",
    gap: "lg",
    align: "center"
  },
  render: (args: SpectrumFlexArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem; height: 400px;">
      <spectrum-flex 
        direction=${args.direction}
        wrap=${args.wrap}
        justify=${args.justify}
        align=${args.align}
        alignContent=${args.alignContent}
        gap=${args.gap}
        rowGap=${args.rowGap}
        columnGap=${args.columnGap}
        ?inline=${args.inline}
        ?fullHeight=${args.fullHeight}
        ?fullWidth=${args.fullWidth}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        mobileDirection=${args.mobileDirection}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; width: 200px;">Header Section</div>
        <div style="background: #f3e5f5; padding: 2rem; border-radius: 4px; width: 200px; flex: 1;">Main Content Area</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; width: 200px;">Footer Section</div>
      </spectrum-flex>
    </div>
  `
};

export const ResponsiveFlex = {
  args: {
    direction: "row",
    responsive: true,
    mobileDirection: "column",
    breakpoint: "md",
    gap: "md"
  },
  render: (args: SpectrumFlexArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h3>Resize window to see responsive behavior</h3>
      <p>Desktop: Row layout | Mobile: Column layout</p>
      <spectrum-flex 
        direction=${args.direction}
        wrap=${args.wrap}
        justify=${args.justify}
        align=${args.align}
        alignContent=${args.alignContent}
        gap=${args.gap}
        rowGap=${args.rowGap}
        columnGap=${args.columnGap}
        ?inline=${args.inline}
        ?fullHeight=${args.fullHeight}
        ?fullWidth=${args.fullWidth}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        mobileDirection=${args.mobileDirection}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; min-width: 150px; flex: 1;">Navigation</div>
        <div style="background: #f3e5f5; padding: 2rem; border-radius: 4px; flex: 2;">Main Content</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; min-width: 120px; flex: 1;">Sidebar</div>
      </spectrum-flex>
    </div>
  `
};

export const FlexWrap = {
  args: {
    wrap: "wrap",
    gap: "sm",
    justify: "flex-start"
  },
  render: (args: SpectrumFlexArgs) => html`
    <div style="width: 400px; border: 2px dashed #ccc; padding: 1rem;">
      <h4>Flex Wrap Example (400px container)</h4>
      <spectrum-flex 
        direction=${args.direction}
        wrap=${args.wrap}
        justify=${args.justify}
        align=${args.align}
        alignContent=${args.alignContent}
        gap=${args.gap}
        rowGap=${args.rowGap}
        columnGap=${args.columnGap}
        ?inline=${args.inline}
        ?fullHeight=${args.fullHeight}
        ?fullWidth=${args.fullWidth}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        mobileDirection=${args.mobileDirection}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 0.75rem; border-radius: 4px; min-width: 120px;">Item 1</div>
        <div style="background: #f3e5f5; padding: 0.75rem; border-radius: 4px; min-width: 120px;">Item 2</div>
        <div style="background: #e8f5e8; padding: 0.75rem; border-radius: 4px; min-width: 120px;">Item 3</div>
        <div style="background: #fff3e0; padding: 0.75rem; border-radius: 4px; min-width: 120px;">Item 4</div>
        <div style="background: #fce4ec; padding: 0.75rem; border-radius: 4px; min-width: 120px;">Item 5</div>
      </spectrum-flex>
    </div>
  `
};

export const CustomGaps = {
  args: {
    gap: "2rem",
    justify: "center"
  },
  render: (args: SpectrumFlexArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h4>Custom Gap: ${args.gap}</h4>
      <spectrum-flex 
        direction=${args.direction}
        wrap=${args.wrap}
        justify=${args.justify}
        align=${args.align}
        alignContent=${args.alignContent}
        gap=${args.gap}
        rowGap=${args.rowGap}
        columnGap=${args.columnGap}
        ?inline=${args.inline}
        ?fullHeight=${args.fullHeight}
        ?fullWidth=${args.fullWidth}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        mobileDirection=${args.mobileDirection}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Large</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Custom</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Spacing</div>
      </spectrum-flex>
      
      <div style="margin-top: 2rem;">
        <h4>Separate Row/Column Gaps</h4>
        <spectrum-flex wrap="wrap" rowGap="1rem" columnGap="3rem" ?debug=${args.debug}>
          <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; min-width: 100px;">A</div>
          <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px; min-width: 100px;">B</div>
          <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; min-width: 100px;">C</div>
          <div style="background: #fff3e0; padding: 1rem; border-radius: 4px; min-width: 100px;">D</div>
        </spectrum-flex>
      </div>
    </div>
  `
};

export const FullHeightLayout = {
  args: {
    direction: "column",
    fullHeight: true,
    gap: "md"
  },
  render: (args: SpectrumFlexArgs) => html`
    <div style="height: 500px; border: 2px dashed #ccc; padding: 1rem;">
      <h4>Full Height Layout (500px container)</h4>
      <spectrum-flex 
        direction=${args.direction}
        wrap=${args.wrap}
        justify=${args.justify}
        align=${args.align}
        alignContent=${args.alignContent}
        gap=${args.gap}
        rowGap=${args.rowGap}
        columnGap=${args.columnGap}
        ?inline=${args.inline}
        ?fullHeight=${args.fullHeight}
        ?fullWidth=${args.fullWidth}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        mobileDirection=${args.mobileDirection}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Fixed Header</div>
        <div style="background: #f3e5f5; padding: 2rem; border-radius: 4px; flex: 1; display: flex; align-items: center; justify-content: center;">
          <div>Flexible Content Area<br/>Takes remaining space</div>
        </div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Fixed Footer</div>
      </spectrum-flex>
    </div>
  `
}; 