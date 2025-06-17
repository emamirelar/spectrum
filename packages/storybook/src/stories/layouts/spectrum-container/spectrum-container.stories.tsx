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
    <div style="background: #f5f5f5; min-height: 300px;">
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
        </div>
      </spectrum-container>
    </div>
  `
};

export const SizeVariations = {
  render: (args: SpectrumContainerArgs) => html`
    <div style="background: #f5f5f5; padding: 2rem;">
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
    <div style="background: #f5f5f5; padding: 2rem;">
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