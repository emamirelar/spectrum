import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumContainer } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-container/spectrum-container";

interface SpectrumContainerArgs {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "fluid";
  maxWidth: string;
  padding: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  paddingX: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "";
  paddingY: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "";
  centered: boolean;
  centerContent: boolean;
  responsive: boolean;
  fullWidthMobile: boolean;
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumContainer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Container Layout Component

The \`spectrum-container\` component provides content containment with max-width constraints, responsive padding, and centering capabilities. It's the foundation for creating consistent, readable layouts with proper content boundaries and spacing.

## Purpose

Container provides content width control and consistent padding for readable, well-structured layouts. It ensures content doesn't become too wide on large screens while maintaining proper spacing.

## Key Features

- **Max-Width Control**: Prevents content from becoming too wide on large screens
- **Responsive Padding**: Automatic padding adjustment based on screen size
- **Centering Options**: Both container and content centering capabilities
- **Size Variations**: Multiple preset sizes (xs, sm, md, lg, xl) plus custom options
- **Mobile Optimization**: Special handling for mobile devices
- **Flexible Padding**: Independent control of horizontal and vertical padding

## When to Use

- **Content Sections**: Wrapping main content areas with consistent boundaries
- **Reading Content**: Articles, blog posts, documentation where readability matters
- **Form Layouts**: Containing forms with appropriate width constraints
- **Card Content**: Interior content of cards or panels
- **Page Sections**: Different sections of a page that need consistent width
- **Responsive Design**: Any content that needs to adapt gracefully to screen sizes

## Basic Usage

\`\`\`html
<!-- Basic content container -->
<spectrum-container>
  <h1>Welcome to Our Platform</h1>
  <p>Your content here with optimal reading width and spacing.</p>
</spectrum-container>

<!-- Large container with extra padding -->
<spectrum-container size="xl" padding="lg">
  <div class="hero-content">
    <h1>Hero Section</h1>
    <p>Large hero content with generous spacing.</p>
  </div>
</spectrum-container>
\`\`\`

## Size Examples

### Different Container Sizes
Perfect for different content types and layouts:

\`\`\`html
<!-- Small container for focused content -->
<spectrum-container size="sm">
  <form class="login-form">
    <h2>Sign In</h2>
    <!-- Form fields -->
  </form>
</spectrum-container>

<!-- Medium container for articles -->
<spectrum-container size="md">
  <article>
    <h1>Article Title</h1>
    <p>Article content with comfortable reading width.</p>
  </article>
</spectrum-container>

<!-- Large container for dashboards -->
<spectrum-container size="lg">
  <div class="dashboard">
    <h1>Dashboard</h1>
    <!-- Dashboard widgets -->
  </div>
</spectrum-container>

<!-- Full width container -->
<spectrum-container size="full">
  <div class="full-width-content">
    <p>Content that uses full available width.</p>
  </div>
</spectrum-container>
\`\`\`

### Custom Width and Padding
Fine-tune container behavior:

\`\`\`html
<!-- Custom max-width -->
<spectrum-container max-width="900px" padding="xl">
  <div class="custom-content">
    <h2>Custom Container</h2>
    <p>Content with custom width constraints.</p>
  </div>
</spectrum-container>

<!-- Different horizontal and vertical padding -->
<spectrum-container padding-x="lg" padding-y="sm">
  <div class="asymmetric-padding">
    <h3>Asymmetric Spacing</h3>
    <p>More horizontal padding, less vertical padding.</p>
  </div>
</spectrum-container>
\`\`\`

### Responsive Behavior
Adapts to different screen sizes:

\`\`\`html
<!-- Responsive container with mobile optimization -->
<spectrum-container 
  responsive="true" 
  full-width-mobile="true"
  padding="lg">
  <div class="responsive-content">
    <h1>Responsive Content</h1>
    <p>Full width on mobile, constrained on desktop.</p>
  </div>
</spectrum-container>

<!-- Centered content within container -->
<spectrum-container 
  size="md" 
  center-content="true"
  padding="xl">
  <div class="centered-content">
    <h2>Centered Content</h2>
    <p>Both container and content are centered.</p>
  </div>
</spectrum-container>
\`\`\`

## Layout Comparison

**Use Container when:**
- Need max-width constraints
- Creating readable content layouts
- Want consistent padding across sections
- Building responsive content areas

**Use Stack when:**
- Simple linear item arrangements
- Need consistent spacing between items
- Building lists or sequences

**Use Flex when:**
- Complex alignment requirements
- Need flexbox-specific features
- Building component arrangements

**Use Grid when:**
- Two-dimensional layouts
- Precise positioning control
- Complex responsive patterns

## Common Patterns

### Article Layout
\`\`\`html
<spectrum-container size="md" padding="xl">
  <article>
    <header>
      <h1>Article Title</h1>
      <div class="meta">By Author • Date</div>
    </header>
    <div class="content">
      <p>Article content...</p>
    </div>
  </article>
</spectrum-container>
\`\`\`

### Form Container
\`\`\`html
<spectrum-container size="sm" padding="lg" center-content="true">
  <form>
    <h2>Contact Us</h2>
    <!-- Form fields -->
  </form>
</spectrum-container>
\`\`\`

### Section Wrapper
\`\`\`html
<spectrum-container size="lg" padding="xl">
  <section class="hero">
    <h1>Hero Title</h1>
    <p>Hero description</p>
    <button>Call to Action</button>
  </section>
</spectrum-container>
\`\`\`
        `
      }
    }
  },
  args: {
    size: "lg",
    maxWidth: "",
    padding: "md",
    paddingX: "",
    paddingY: "",
    centered: true,
    centerContent: false,
    responsive: true,
    fullWidthMobile: true,
    debug: false
  }
} satisfies Meta<SpectrumContainer>;

export default meta;

export const Default = {
  render: (args: SpectrumContainerArgs) => html`
    <!-- 
      NOTE: The gray background below is added by this Storybook demo for visualization only.
      The spectrum-container component itself is completely invisible and only provides layout functionality.
      In real applications, the container has no visual presence - it only controls spacing and max-width.
    -->
    <div style="background: #f5f5f5; min-height: 300px; position: relative;">
      <div style="position: absolute; top: 8px; left: 8px; font-size: 12px; color: #666; background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px;">
        📋 Demo background - Container is invisible
      </div>
      <spectrum-container 
        size=${args.size}
        maxWidth=${args.maxWidth}
        padding=${args.padding}
        paddingX=${args.paddingX}
        paddingY=${args.paddingY}
        ?centered=${args.centered}
        ?centerContent=${args.centerContent}
        ?responsive=${args.responsive}
        ?fullWidthMobile=${args.fullWidthMobile}
        ?debug=${args.debug}
      >
        <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="margin-top: 0;">Container Content</h2>
          <p>This content is contained within a spectrum-container with responsive max-width constraints and proper padding.</p>
          <p>The container centers itself and provides consistent spacing across different screen sizes.</p>
          <p><strong>Note:</strong> The gray area around this white box is added by Storybook for visualization. The actual container component is invisible.</p>
        </div>
      </spectrum-container>
    </div>
  `
};

export const SizeVariations = {
  render: (args: SpectrumContainerArgs) => html`
    <div style="background: #f5f5f5; padding: 2rem; position: relative;">
      <div style="position: absolute; top: 8px; right: 8px; font-size: 12px; color: #666; background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px;">
        📋 Demo background only
      </div>
      <div style="margin-bottom: 2rem;">
        <h3>Extra Small (xs)</h3>
        <spectrum-container size="xs" ?debug=${args.debug}>
          <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px; text-align: center;">XS Container</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Small (sm)</h3>
        <spectrum-container size="sm" ?debug=${args.debug}>
          <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px; text-align: center;">SM Container</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Medium (md)</h3>
        <spectrum-container size="md" ?debug=${args.debug}>
          <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px; text-align: center;">MD Container</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Large (lg) - Default</h3>
        <spectrum-container size="lg" ?debug=${args.debug}>
          <div style="background: #fff3e0; padding: 1rem; border-radius: 4px; text-align: center;">LG Container</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Extra Large (xl)</h3>
        <spectrum-container size="xl" ?debug=${args.debug}>
          <div style="background: #fce4ec; padding: 1rem; border-radius: 4px; text-align: center;">XL Container</div>
        </spectrum-container>
      </div>
    </div>
  `
};

export const CustomMaxWidth = {
  args: {
    maxWidth: "600px",
    debug: true
  },
  render: (args: SpectrumContainerArgs) => html`
    <div style="background: #f5f5f5; padding: 2rem;">
      <h3>Custom Max Width: ${args.maxWidth}</h3>
      <spectrum-container 
        size=${args.size}
        maxWidth=${args.maxWidth}
        padding=${args.padding}
        paddingX=${args.paddingX}
        paddingY=${args.paddingY}
        ?centered=${args.centered}
        ?centerContent=${args.centerContent}
        ?responsive=${args.responsive}
        ?fullWidthMobile=${args.fullWidthMobile}
        ?debug=${args.debug}
      >
        <div style="background: white; padding: 2rem; border-radius: 8px;">
          <h4>Custom Container Width</h4>
          <p>This container has a custom max-width of ${args.maxWidth} instead of using the predefined size options.</p>
        </div>
      </spectrum-container>
    </div>
  `
};

export const PaddingVariations = {
  render: (args: SpectrumContainerArgs) => html`
    <div style="background: #f5f5f5; padding: 2rem; position: relative;">
      <div style="position: absolute; top: 8px; right: 8px; font-size: 12px; color: #666; background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px;">
        📋 Demo background only
      </div>
      <div style="margin-bottom: 2rem;">
        <h3>No Padding</h3>
        <spectrum-container padding="none" ?debug=${true}>
          <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Content touches container edges</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Small Padding</h3>
        <spectrum-container padding="sm" ?debug=${true}>
          <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Small padding around content</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Large Padding</h3>
        <spectrum-container padding="lg" ?debug=${true}>
          <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Large padding around content</div>
        </spectrum-container>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3>Custom X/Y Padding</h3>
        <spectrum-container paddingX="xl" paddingY="xs" ?debug=${true}>
          <div style="background: #fff3e0; padding: 1rem; border-radius: 4px;">Extra large horizontal, extra small vertical padding</div>
        </spectrum-container>
      </div>
    </div>
  `
};

export const CenteredContent = {
  args: {
    centerContent: true,
    padding: "lg"
  },
  render: (args: SpectrumContainerArgs) => html`
    <div style="background: #f5f5f5; min-height: 400px;">
      <spectrum-container 
        size=${args.size}
        maxWidth=${args.maxWidth}
        padding=${args.padding}
        paddingX=${args.paddingX}
        paddingY=${args.paddingY}
        ?centered=${args.centered}
        ?centerContent=${args.centerContent}
        ?responsive=${args.responsive}
        ?fullWidthMobile=${args.fullWidthMobile}
        ?debug=${args.debug}
      >
        <div style="background: white; padding: 2rem; border-radius: 8px; text-align: center; max-width: 300px;">
          <h3>Centered Content</h3>
          <p>This content is centered both horizontally and vertically within the container.</p>
          <button style="background: #1976d2; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer;">Action Button</button>
        </div>
      </spectrum-container>
    </div>
  `
};

export const FluidContainer = {
  args: {
    size: "fluid",
    padding: "md"
  },
  render: (args: SpectrumContainerArgs) => html`
    <div style="background: #f5f5f5; padding: 2rem;">
      <h3>Fluid Container (100% width)</h3>
      <spectrum-container 
        size=${args.size}
        maxWidth=${args.maxWidth}
        padding=${args.padding}
        paddingX=${args.paddingX}
        paddingY=${args.paddingY}
        ?centered=${args.centered}
        ?centerContent=${args.centerContent}
        ?responsive=${args.responsive}
        ?fullWidthMobile=${args.fullWidthMobile}
        ?debug=${args.debug}
      >
        <div style="background: white; padding: 2rem; border-radius: 8px;">
          <h4>Full Width Container</h4>
          <p>This container takes up the full width of its parent, with no max-width constraints.</p>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
            <div style="background: #e3f2fd; padding: 1rem; border-radius: 4px;">Column 1</div>
            <div style="background: #f3e5f5; padding: 1rem; border-radius: 4px;">Column 2</div>
            <div style="background: #e8f5e8; padding: 1rem; border-radius: 4px;">Column 3</div>
          </div>
        </div>
      </spectrum-container>
    </div>
  `
}; 