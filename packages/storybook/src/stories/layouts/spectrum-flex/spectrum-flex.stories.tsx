import type { Meta, StoryObj } from "@storybook/web-components";
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