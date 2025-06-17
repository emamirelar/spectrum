import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumSidebar } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-sidebar/spectrum-sidebar";

interface SpectrumSidebarArgs {
  position: "left" | "right";
  width: string;
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumSidebar",
  tags: ["autodocs"],
  args: {
    position: "left",
    width: "250px",
    debug: false
  }
} satisfies Meta<SpectrumSidebar>;

export default meta;

export const Default = {
  render: (args: SpectrumSidebarArgs) => html`
    <div style="height: 400px; border: 2px dashed #ccc;">
      <spectrum-sidebar position=${args.position} width=${args.width} ?debug=${args.debug}>
        <div slot="sidebar" style="background: #f5f5f5; height: 100%; padding: 1rem;">
          <h3>Navigation</h3>
          <ul style="list-style: none; padding: 0;">
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </div>
        <div slot="main" style="background: white; height: 100%; padding: 1rem;">
          <h1>Main Content</h1>
          <p>This is the main content area.</p>
        </div>
      </spectrum-sidebar>
    </div>
  `
};
