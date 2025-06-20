import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumGrid } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-grid/spectrum-grid";

interface SpectrumGridArgs {
  columns: string;
  minColumnWidth: string;
  autoColumns: string;
  rows: string;
  minRowHeight: string;
  autoRows: string;
  areas: string;
  gap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  rowGap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  columnGap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  alignItems: "start" | "end" | "center" | "stretch";
  justifyItems: "start" | "end" | "center" | "stretch";
  alignContent: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
  justifyContent: "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
  autoFit: boolean;
  autoFill: boolean;
  responsive: boolean;
  breakpoint: "sm" | "md" | "lg";
  mobileColumns: string;
  fullHeight: boolean;
  fullWidth: boolean;
  inline: boolean;
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumGrid",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Grid Layout Component

The \`spectrum-grid\` component provides comprehensive CSS Grid layout capabilities with support for grid templates, areas, responsive behavior, and auto-sizing. It's designed for complex two-dimensional layouts that require precise control over both rows and columns.

## Purpose

Grid provides complete CSS Grid control for layouts that need precise positioning in both dimensions. It's the most powerful layout component for complex, structured arrangements.

## Key Features

- **Complete CSS Grid Control**: Full access to grid template properties
- **Grid Areas**: Named grid areas for semantic layout definitions
- **Auto-Sizing**: Auto-fit and auto-fill with minimum sizes
- **Responsive Grids**: Different grid configurations for different screen sizes
- **Custom Gap Control**: Independent row and column gap control
- **Alignment Control**: Precise alignment for both items and content
- **Template Flexibility**: Support for custom grid templates and areas

## When to Use

- **Complex Layouts**: Multi-dimensional layouts with precise positioning
- **Card Grids**: Responsive card layouts with consistent sizing
- **Dashboard Layouts**: Widget arrangements with specific grid positioning
- **Magazine Layouts**: Complex article layouts with varying content sizes
- **Photo Galleries**: Image grids with aspect ratio control
- **Form Grids**: Complex form layouts with aligned fields
- **Any CSS Grid Layout**: When you need more control than flexbox provides

## Basic Usage

\`\`\`html
<!-- Simple 3-column grid -->
<spectrum-grid columns="1fr 1fr 1fr" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
  <div>Item 6</div>
</spectrum-grid>

<!-- Auto-fit responsive grid -->
<spectrum-grid 
  auto-fit="true" 
  min-column-width="250px" 
  gap="lg">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</spectrum-grid>
\`\`\`

## Common Patterns

### Responsive Card Grid
Cards that automatically fit based on content width:

\`\`\`html
<spectrum-grid 
  auto-fit="true"
  min-column-width="300px"
  gap="xl"
  align-items="stretch">
  <div class="product-card">Product 1</div>
  <div class="product-card">Product 2</div>
  <div class="product-card">Product 3</div>
  <div class="product-card">Product 4</div>
</spectrum-grid>
\`\`\`

### Dashboard Layout with Areas
Named grid areas for semantic layout:

\`\`\`html
<spectrum-grid 
  columns="200px 1fr 200px"
  rows="60px 1fr 40px"
  areas="'sidebar header actions'
         'sidebar main aside'
         'sidebar footer aside'"
  gap="md"
  full-height="true">
  
  <nav style="grid-area: sidebar;">Sidebar Navigation</nav>
  <header style="grid-area: header;">Page Header</header>
  <div style="grid-area: actions;">Action Buttons</div>
  <main style="grid-area: main;">Main Content</main>
  <aside style="grid-area: aside;">Secondary Content</aside>
  <footer style="grid-area: footer;">Footer</footer>
</spectrum-grid>
\`\`\`

### Photo Gallery Grid
Square grid for images with consistent sizing:

\`\`\`html
<spectrum-grid 
  auto-fill="true"
  min-column-width="200px"
  auto-rows="200px"
  gap="sm"
  align-items="center"
  justify-items="center">
  <img src="/photo1.jpg" alt="Photo 1" />
  <img src="/photo2.jpg" alt="Photo 2" />
  <img src="/photo3.jpg" alt="Photo 3" />
  <img src="/photo4.jpg" alt="Photo 4" />
</spectrum-grid>
\`\`\`

### Complex Form Layout
Multi-column form with spanning elements:

\`\`\`html
<spectrum-grid 
  columns="1fr 1fr"
  rows="auto auto auto auto"
  column-gap="lg"
  row-gap="md">
  
  <!-- Form title spans both columns -->
  <h2 style="grid-column: 1 / -1;">Contact Information</h2>
  
  <!-- Two-column form fields -->
  <div class="field">
    <label>First Name</label>
    <input type="text" />
  </div>
  
  <div class="field">
    <label>Last Name</label>
    <input type="text" />
  </div>
  
  <!-- Full-width field -->
  <div class="field" style="grid-column: 1 / -1;">
    <label>Email Address</label>
    <input type="email" />
  </div>
  
  <!-- Action buttons -->
  <div style="grid-column: 1 / -1; justify-self: end;">
    <spectrum-button variant="secondary">Cancel</spectrum-button>
    <spectrum-button variant="primary">Submit</spectrum-button>
  </div>
</spectrum-grid>
\`\`\`

## Layout Comparison

**Use Grid when:**
- Two-dimensional layouts
- Precise positioning control
- Grid template areas needed
- Complex responsive patterns
- Need both row and column control

**Use Flex when:**
- One-dimensional layouts
- Dynamic sizing and wrapping
- Alignment-focused layouts
- Simple responsive behavior

**Use Stack when:**
- Simple linear arrangements
- Basic spacing needs
- Single direction layouts

## Advanced Features

### Auto-Fit vs Auto-Fill
\`\`\`html
<!-- Auto-fit: Stretches items to fill space -->
<spectrum-grid auto-fit="true" min-column-width="200px">

<!-- Auto-fill: Maintains item size, creates empty columns -->
<spectrum-grid auto-fill="true" min-column-width="200px">
\`\`\`

### Responsive Grid Behavior
\`\`\`html
<spectrum-grid 
  columns="repeat(auto-fit, minmax(250px, 1fr))"
  mobile-columns="1fr"
  responsive="true"
  breakpoint="md"
  gap="lg">
  <!-- Responsive items -->
</spectrum-grid>
\`\`\`

### Custom Grid Templates
\`\`\`html
<spectrum-grid 
  columns="minmax(200px, 1fr) 3fr minmax(150px, 1fr)"
  rows="auto 1fr auto"
  min-row-height="100px"
  gap="xl">
  <!-- Complex grid items -->
</spectrum-grid>
\`\`\`
        `
      }
    }
  },
  args: {
    columns: "1fr",
    minColumnWidth: "",
    autoColumns: "",
    rows: "",
    minRowHeight: "",
    autoRows: "",
    areas: "",
    gap: "md",
    rowGap: "",
    columnGap: "",
    alignItems: "stretch",
    justifyItems: "stretch",
    alignContent: "stretch",
    justifyContent: "stretch",
    autoFit: false,
    autoFill: false,
    responsive: false,
    breakpoint: "md",
    mobileColumns: "1fr",
    fullHeight: false,
    fullWidth: false,
    inline: false,
    debug: false
  }
} satisfies Meta<SpectrumGrid>;

export default meta;

export const Default = {
  render: (args: SpectrumGridArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <spectrum-grid 
        columns=${args.columns}
        minColumnWidth=${args.minColumnWidth}
        rows=${args.rows}
        areas=${args.areas}
        gap=${args.gap}
        alignItems=${args.alignItems}
        justifyItems=${args.justifyItems}
        ?autoFit=${args.autoFit}
        ?autoFill=${args.autoFill}
        ?responsive=${args.responsive}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Grid Item 1</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Grid Item 2</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Grid Item 3</div>
        <div style="background: #fff3e0; padding: 1rem; border-radius: 4px;">Grid Item 4</div>
        <div style="background: #fce4ec; padding: 1rem; border-radius: 4px;">Grid Item 5</div>
        <div style="background: #e1f5fe; padding: 1rem; border-radius: 4px;">Grid Item 6</div>
      </spectrum-grid>
    </div>
  `
};

export const AutoFitColumns = {
  args: {
    autoFit: true,
    minColumnWidth: "200px",
    columns: ""
  },
  render: (args: SpectrumGridArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h4>Auto-fit columns (min-width: 200px)</h4>
      <p>Resize the window to see columns automatically adjust</p>
      <spectrum-grid 
        columns=${args.columns}
        minColumnWidth=${args.minColumnWidth}
        rows=${args.rows}
        areas=${args.areas}
        gap=${args.gap}
        alignItems=${args.alignItems}
        justifyItems=${args.justifyItems}
        ?autoFit=${args.autoFit}
        ?autoFill=${args.autoFill}
        ?responsive=${args.responsive}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Card 1</div>
        <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Card 2</div>
        <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Card 3</div>
        <div style="background: #fff3e0; padding: 1rem; border-radius: 4px;">Card 4</div>
        <div style="background: #fce4ec; padding: 1rem; border-radius: 4px;">Card 5</div>
        <div style="background: #e1f5fe; padding: 1rem; border-radius: 4px;">Card 6</div>
      </spectrum-grid>
    </div>
  `
};

export const GridAreas = {
  args: {
    columns: "200px 1fr 200px",
    rows: "auto 1fr auto",
    areas: `"header header header" "sidebar main aside" "footer footer footer"`,
    gap: "lg"
  },
  render: (args: SpectrumGridArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem; height: 500px;">
      <h4>Grid Template Areas Layout</h4>
      <spectrum-grid 
        columns=${args.columns}
        minColumnWidth=${args.minColumnWidth}
        rows=${args.rows}
        areas=${args.areas}
        gap=${args.gap}
        alignItems=${args.alignItems}
        justifyItems=${args.justifyItems}
        ?autoFit=${args.autoFit}
        ?autoFill=${args.autoFill}
        ?responsive=${args.responsive}
        ?debug=${args.debug}
      >
        <div style="grid-area: header; background: #e3f2fd; padding: 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Header</div>
        <div style="grid-area: sidebar; background: #f3e5f5; padding: 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Sidebar</div>
        <div style="grid-area: main; background: #e8f5e8; padding: 2rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Main Content</div>
        <div style="grid-area: aside; background: #fff3e0; padding: 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Aside</div>
        <div style="grid-area: footer; background: #fce4ec; padding: 1rem; border-radius: 4px; display: flex; align-items: center; justify-content: center;">Footer</div>
      </spectrum-grid>
    </div>
  `
};

export const ResponsiveGrid = {
  args: {
    columns: "repeat(3, 1fr)",
    responsive: true,
    mobileColumns: "1fr",
    breakpoint: "md",
    gap: "md"
  },
  render: (args: SpectrumGridArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h4>Responsive Grid Layout</h4>
      <p>Desktop: 3 columns | Mobile: 1 column</p>
      <spectrum-grid 
        columns=${args.columns}
        minColumnWidth=${args.minColumnWidth}
        rows=${args.rows}
        areas=${args.areas}
        gap=${args.gap}
        alignItems=${args.alignItems}
        justifyItems=${args.justifyItems}
        ?autoFit=${args.autoFit}
        ?autoFill=${args.autoFill}
        ?responsive=${args.responsive}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h5 style="margin: 0 0 0.5rem 0;">Feature 1</h5>
          <p style="margin: 0; font-size: 0.875rem;">Description of feature 1</p>
        </div>
        <div style="background: #f3e5f5; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h5 style="margin: 0 0 0.5rem 0;">Feature 2</h5>
          <p style="margin: 0; font-size: 0.875rem;">Description of feature 2</p>
        </div>
        <div style="background: #e8f5e8; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h5 style="margin: 0 0 0.5rem 0;">Feature 3</h5>
          <p style="margin: 0; font-size: 0.875rem;">Description of feature 3</p>
        </div>
        <div style="background: #fff3e0; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h5 style="margin: 0 0 0.5rem 0;">Feature 4</h5>
          <p style="margin: 0; font-size: 0.875rem;">Description of feature 4</p>
        </div>
        <div style="background: #fce4ec; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h5 style="margin: 0 0 0.5rem 0;">Feature 5</h5>
          <p style="margin: 0; font-size: 0.875rem;">Description of feature 5</p>
        </div>
        <div style="background: #e1f5fe; padding: 1.5rem; border-radius: 8px; text-align: center;">
          <h5 style="margin: 0 0 0.5rem 0;">Feature 6</h5>
          <p style="margin: 0; font-size: 0.875rem;">Description of feature 6</p>
        </div>
      </spectrum-grid>
    </div>
  `
};

export const CustomGaps = {
  args: {
    columns: "repeat(2, 1fr)",
    gap: "2rem",
    alignItems: "center",
    justifyItems: "center"
  },
  render: (args: SpectrumGridArgs) => html`
    <div style="border: 2px dashed #ccc; padding: 1rem;">
      <h4>Custom Gap and Alignment</h4>
      <spectrum-grid 
        columns=${args.columns}
        minColumnWidth=${args.minColumnWidth}
        rows=${args.rows}
        areas=${args.areas}
        gap=${args.gap}
        alignItems=${args.alignItems}
        justifyItems=${args.justifyItems}
        ?autoFit=${args.autoFit}
        ?autoFill=${args.autoFill}
        ?responsive=${args.responsive}
        ?debug=${args.debug}
      >
        <div style="background: #e3f2fd; padding: 2rem; border-radius: 8px; width: 150px; height: 100px; display: flex; align-items: center; justify-content: center;">A</div>
        <div style="background: #f3e5f5; padding: 2rem; border-radius: 8px; width: 150px; height: 100px; display: flex; align-items: center; justify-content: center;">B</div>
        <div style="background: #e8f5e8; padding: 2rem; border-radius: 8px; width: 150px; height: 100px; display: flex; align-items: center; justify-content: center;">C</div>
        <div style="background: #fff3e0; padding: 2rem; border-radius: 8px; width: 150px; height: 100px; display: flex; align-items: center; justify-content: center;">D</div>
      </spectrum-grid>
    </div>
  `
}; 