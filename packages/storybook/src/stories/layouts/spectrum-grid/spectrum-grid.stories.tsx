import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumGrid } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-grid/spectrum-grid";

interface SpectrumGridArgs {
  columns: string;
  minColumnWidth: string;
  rows: string;
  areas: string;
  gap: "none" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  alignItems: "start" | "end" | "center" | "stretch";
  justifyItems: "start" | "end" | "center" | "stretch";
  autoFit: boolean;
  autoFill: boolean;
  responsive: boolean;
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumGrid",
  tags: ["autodocs"],
  args: {
    columns: "1fr 1fr 1fr",
    minColumnWidth: "",
    rows: "",
    areas: "",
    gap: "md",
    alignItems: "stretch",
    justifyItems: "stretch",
    autoFit: false,
    autoFill: false,
    responsive: false,
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