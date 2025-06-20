import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumCluster } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-cluster/spectrum-cluster";

interface SpectrumClusterArgs {
  spacing: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  align: "start" | "center" | "end";
  justify: "start" | "center" | "end" | "space-between" | "space-around";
  wrap: boolean;
  noWrap: boolean;
  direction: "horizontal" | "vertical";
  responsive: boolean;
  breakpoint: "sm" | "md" | "lg";
  stackBelow: boolean;
  fullWidth: boolean;
  centerContainer: boolean;
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumCluster",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Cluster Layout Component

The \`spectrum-cluster\` component is designed for clustering items together with consistent spacing, natural wrapping behavior, and flexible alignment options. It's perfect for layouts where you need to group related elements that should flow naturally and wrap responsively.

## Purpose

Cluster handles the common pattern of grouping related items that should wrap naturally when space runs out. It's designed for collections of similar elements that need consistent spacing.

## Key Features

- **Natural Wrapping**: Items wrap automatically when space runs out
- **Consistent Spacing**: Uniform gaps between all items
- **Flexible Alignment**: Control both horizontal and vertical alignment
- **Direction Control**: Horizontal or vertical primary flow
- **Responsive Behavior**: Adapt layout based on screen size
- **Custom Spacing**: Support for both preset and custom spacing values

## When to Use

- **Tag Lists**: Displaying collections of tags, chips, or labels
- **Button Groups**: Arranging multiple related buttons
- **Card Collections**: Small card layouts that should wrap naturally
- **Icon Collections**: Groups of icons or small interactive elements
- **Badge/Chip Layouts**: Status indicators, categories, or filters
- **Responsive Toolbars**: Tool collections that adapt to container width

## Basic Usage

\`\`\`html
<!-- Simple tag cluster -->
<spectrum-cluster spacing="sm" align="center">
  <spectrum-chip>React</spectrum-chip>
  <spectrum-chip>JavaScript</spectrum-chip>
  <spectrum-chip>TypeScript</spectrum-chip>
  <spectrum-chip>CSS</spectrum-chip>
</spectrum-cluster>

<!-- Button group -->
<spectrum-cluster spacing="md" justify="center">
  <spectrum-button variant="primary">Save</spectrum-button>
  <spectrum-button variant="secondary">Cancel</spectrum-button>
  <spectrum-button variant="tertiary">Reset</spectrum-button>
</spectrum-cluster>
\`\`\`

## Common Patterns

### Responsive Tag Cloud
Tags that wrap and adapt to container size:

\`\`\`html
<spectrum-cluster 
  responsive="true"
  breakpoint="md"
  stack-below="true"
  spacing="sm"
  justify="center">
  <span class="tag">Design</span>
  <span class="tag">Development</span>
  <span class="tag">Marketing</span>
  <span class="tag">Sales</span>
</spectrum-cluster>
\`\`\`

### Icon Toolbar
Icons that maintain spacing without wrapping:

\`\`\`html
<spectrum-cluster 
  direction="horizontal"
  align="center"
  spacing="lg"
  no-wrap="true">
  <button class="icon-btn">📁</button>
  <button class="icon-btn">📊</button>
  <button class="icon-btn">⚙️</button>
  <button class="icon-btn">👤</button>
</spectrum-cluster>
\`\`\`

### Centered Content Group
Items distributed with equal spacing:

\`\`\`html
<spectrum-cluster 
  full-width="true" 
  center-container="true"
  justify="space-between"
  align="center"
  spacing="xl">
  <div class="info-block">Block 1</div>
  <div class="info-block">Block 2</div>
  <div class="info-block">Block 3</div>
</spectrum-cluster>
\`\`\`

### Badge Collection
Status badges or chips that wrap naturally:

\`\`\`html
<spectrum-cluster spacing="xs" align="center" wrap="true">
  <span class="badge success">Active</span>
  <span class="badge warning">Pending</span>
  <span class="badge info">In Review</span>
  <span class="badge error">Failed</span>
  <span class="badge neutral">Draft</span>
</spectrum-cluster>
\`\`\`

## Layout Comparison

**Use Cluster when:**
- Items should wrap naturally
- Collection of similar elements
- Need consistent spacing between items
- Items may vary in size
- Want natural flow behavior

**Use Stack when:**
- Simple linear arrangements
- All items in single direction
- No wrapping needed
- Basic alignment requirements

**Use Flex when:**
- Complex alignment control needed
- Specific flexbox features required
- Advanced responsive behavior
- Parent-child size relationships

**Use Grid when:**
- Two-dimensional control needed
- Precise positioning required
- Complex layout patterns
- Grid template areas

## Advanced Features

### Custom Spacing
\`\`\`html
<!-- Custom spacing value -->
<spectrum-cluster spacing="2.5rem">
  <div>Item 1</div>
  <div>Item 2</div>
</spectrum-cluster>
\`\`\`

### Responsive Behavior
\`\`\`html
<!-- Stack vertically on mobile -->
<spectrum-cluster 
  responsive="true"
  breakpoint="md"
  stack-below="true">
  <!-- Items -->
</spectrum-cluster>
\`\`\`

### No Wrap Control
\`\`\`html
<!-- Prevent wrapping -->
<spectrum-cluster no-wrap="true" spacing="md">
  <!-- Items stay on one line -->
</spectrum-cluster>
\`\`\`
        `
      }
    }
  },
  args: {
    spacing: "md",
    align: "start",
    justify: "start",
    wrap: true,
    noWrap: false,
    direction: "horizontal",
    responsive: false,
    breakpoint: "md",
    stackBelow: false,
    fullWidth: false,
    centerContainer: false,
    debug: false
  }
} satisfies Meta<SpectrumCluster>;

export default meta;

export const Default = {
  render: (args: SpectrumClusterArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-cluster 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?noWrap=${args.noWrap}
        direction=${args.direction}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?stackBelow=${args.stackBelow}
        ?fullWidth=${args.fullWidth}
        ?centerContainer=${args.centerContainer}
        ?debug=${args.debug}
      >
        <span style="background: #e3f2fd; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">Design</span>
        <span style="background: #f3e5f5; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">Development</span>
        <span style="background: #e8f5e8; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">UI/UX</span>
        <span style="background: #fff3e0; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">Frontend</span>
        <span style="background: #fce4ec; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">JavaScript</span>
        <span style="background: #e1f5fe; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">React</span>
        <span style="background: #f9fbe7; padding: 0.5rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">CSS</span>
      </spectrum-cluster>
    </div>
  `
};

export const ButtonCluster = {
  args: {
    spacing: "sm",
    justify: "center"
  },
  render: (args: SpectrumClusterArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-cluster 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?noWrap=${args.noWrap}
        direction=${args.direction}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?stackBelow=${args.stackBelow}
        ?fullWidth=${args.fullWidth}
        ?centerContainer=${args.centerContainer}
        ?debug=${args.debug}
      >
        <button style="background: #1976d2; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">Primary</button>
        <button style="background: transparent; color: #1976d2; border: 2px solid #1976d2; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">Secondary</button>
        <button style="background: #f5f5f5; color: #333; border: 1px solid #ddd; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">Cancel</button>
      </spectrum-cluster>
    </div>
  `
};

export const ConstrainedWidth = {
  args: {
    spacing: "xs",
    wrap: true,
    centerContainer: true
  },
  render: (args: SpectrumClusterArgs) => html`
    <div style="width: 200px; border: 2px dashed #ccc; padding: 1rem; margin: 0 auto;">
      <h4>Constrained Container (200px)</h4>
      <spectrum-cluster 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?noWrap=${args.noWrap}
        direction=${args.direction}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?stackBelow=${args.stackBelow}
        ?fullWidth=${args.fullWidth}
        ?centerContainer=${args.centerContainer}
        ?debug=${args.debug}
      >
        <span style="background: #e3f2fd; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">Small</span>
        <span style="background: #f3e5f5; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">Medium Tag</span>
        <span style="background: #e8f5e8; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">Large Tag Name</span>
        <span style="background: #fff3e0; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">XL</span>
        <span style="background: #fce4ec; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.75rem;">Another</span>
      </spectrum-cluster>
    </div>
  `
};

export const ResponsiveCluster = {
  args: {
    spacing: "md",
    responsive: true,
    stackBelow: true,
    breakpoint: "md",
    justify: "space-between"
  },
  render: (args: SpectrumClusterArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h3>Resize window to see responsive behavior</h3>
      <spectrum-cluster 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?noWrap=${args.noWrap}
        direction=${args.direction}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?stackBelow=${args.stackBelow}
        ?fullWidth=${args.fullWidth}
        ?centerContainer=${args.centerContainer}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; min-width: 120px;">Logo</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px; flex: 1;">Navigation</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; min-width: 100px;">Search</div>
        <div style="background: #fff3e0; padding: 1rem; border-radius: 4px; min-width: 80px;">Profile</div>
      </spectrum-cluster>
    </div>
  `
};

export const CustomSpacing = {
  args: {
    spacing: "2rem",
    justify: "center"
  },
  render: (args: SpectrumClusterArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h4>Custom Spacing (2rem)</h4>
      <spectrum-cluster 
        spacing=${args.spacing}
        align=${args.align}
        justify=${args.justify}
        ?wrap=${args.wrap}
        ?noWrap=${args.noWrap}
        direction=${args.direction}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?stackBelow=${args.stackBelow}
        ?fullWidth=${args.fullWidth}
        ?centerContainer=${args.centerContainer}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px;">Item A</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 8px;">Item B</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 8px;">Item C</div>
      </spectrum-cluster>
    </div>
  `
}; 