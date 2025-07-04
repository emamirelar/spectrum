import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumApplicationLayout } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-application-layout/spectrum-application-layout";

interface SpectrumApplicationLayoutArgs {
  showHeaderAppId: boolean;
  showHeaderMiddle: boolean;
  showHeaderUtility: boolean;
  showContentNavigation: boolean;
  showContentSidebar: boolean;
  showFooterLeft: boolean;
  showFooterCenter: boolean;
  showFooterRight: boolean;
  debug: boolean;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumApplicationLayout",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Application Layout

A comprehensive full-viewport application layout template based on the Figma Spectrum Design System. Features a **slot-based architecture** with **9 named slots** for maximum flexibility and a responsive **3-column layout** that adapts to all screen sizes.

## Slot Configuration

Each slot can be controlled individually using boolean properties:

### Header Slots
- **header-app-id** (default: true) - Brand, logo, navigation toggle
- **header-middle** (default: true) - Search bar, breadcrumbs, page title  
- **header-utility** (default: true) - User menu, notifications, settings

### Content Slots
- **content-navigation** (default: true) - Main navigation, left content
- **content-main** (always visible) - Primary application content
- **content-sidebar** (default: false) - Sidebar, right content, panels

### Footer Slots
- **footer-left** (default: true) - Secondary navigation, footer links
- **footer-center** (default: true) - Status information, breadcrumbs
- **footer-right** (default: false) - Additional actions, version info

## Layout Controls

### Debug Mode
The **debug** property controls whether semantic colors and placeholder content are shown:
- **Enabled (true)**: Shows colored areas and slot labels for development
- **Disabled (false)**: Transparent layout ready for production content

### Collapsed States
Control sidebar widths with collapse toggles:
- **leftCollapsed** (default: false) - Collapse left content and footer to 96px width
- **rightCollapsed** (default: false) - Collapse right content and footer to 96px width

## Usage

\`\`\`html
<!-- Production layout (clean/transparent) -->
<spectrum-application-layout 
  show-content-sidebar="true"
  show-footer-right="true">
  <div slot="header-app-id">My App</div>
  <div slot="content-main">Main Content</div>
  <div slot="content-sidebar">Sidebar Content</div>
</spectrum-application-layout>

<!-- Development layout (with debug colors/labels) -->
<spectrum-application-layout 
  debug="true"
  show-content-sidebar="true">
  <div slot="content-main">Main Content</div>
</spectrum-application-layout>

<!-- Collapsed sidebar layout -->
<spectrum-application-layout 
  show-content-sidebar="true"
  right-collapsed="true">
  <div slot="content-main">Main Content</div>
  <div slot="content-sidebar">Collapsed Sidebar</div>
</spectrum-application-layout>
\`\`\`

## Key Features

- **Responsive 3-column layout** with fixed header/footer
- **9 configurable slots** for maximum flexibility
- **Debug mode** for development vs production layouts
- **Collapsible sidebars** with 96px collapsed width (responsive)
- **Semantic HTML structure** with proper ARIA labels
- **Accessibility features** including focus states and screen reader support
- **Seamless sections** with no gaps between areas
        `,
      },
    },
  },
  argTypes: {
    debug: {
      control: "boolean",
      description: "Enable debug mode to show semantic colors and placeholder content",
      table: {
        category: "Debug",
        defaultValue: { summary: "false" },
      },
    },
    leftCollapsed: {
      control: "boolean",
      description: "Collapse left content and footer sections to 96px width",
      table: {
        category: "Layout Controls",
        defaultValue: { summary: "false" },
      },
    },
    rightCollapsed: {
      control: "boolean",
      description: "Collapse right content and footer sections to 96px width",
      table: {
        category: "Layout Controls",
        defaultValue: { summary: "false" },
      },
    },
    showHeaderAppId: {
      control: "boolean",
      description: "Show/hide the header app ID slot (brand, logo, nav toggle)",
      table: {
        category: "Header Slots",
        defaultValue: { summary: "true" },
      },
    },
    showHeaderMiddle: {
      control: "boolean", 
      description: "Show/hide the header middle slot (search, breadcrumbs, page title)",
      table: {
        category: "Header Slots",
        defaultValue: { summary: "true" },
      },
    },
    showHeaderUtility: {
      control: "boolean",
      description: "Show/hide the header utility slot (user menu, notifications, settings)",
      table: {
        category: "Header Slots", 
        defaultValue: { summary: "true" },
      },
    },
    showContentNavigation: {
      control: "boolean",
      description: "Show/hide the content navigation slot (main navigation, left content)",
      table: {
        category: "Content Slots",
        defaultValue: { summary: "true" },
      },
    },
    showContentSidebar: {
      control: "boolean",
      description: "Show/hide the content sidebar slot (sidebar, right content, panels)",
      table: {
        category: "Content Slots",
        defaultValue: { summary: "false" },
      },
    },
    showFooterLeft: {
      control: "boolean",
      description: "Show/hide the footer left slot (secondary navigation, footer links)",
      table: {
        category: "Footer Slots",
        defaultValue: { summary: "true" },
      },
    },
    showFooterCenter: {
      control: "boolean",
      description: "Show/hide the footer center slot (status information, breadcrumbs)",
      table: {
        category: "Footer Slots",
        defaultValue: { summary: "true" },
      },
    },
    showFooterRight: {
      control: "boolean",
      description: "Show/hide the footer right slot (additional actions, version info)",
      table: {
        category: "Footer Slots",
        defaultValue: { summary: "false" },
      },
    },
  },
} satisfies Meta<SpectrumApplicationLayoutArgs>;

export default meta;
type Story = StoryObj<SpectrumApplicationLayoutArgs>;

// Default story with all default settings
export const Default: Story = {
  args: {
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: true,
    showContentSidebar: false,
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: false,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
};

// Debug mode story showing colored layout
export const DebugMode: Story = {
  args: {
    debug: true,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: true,
    showContentSidebar: false,
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: false,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Debug mode enabled showing semantic colors and slot labels. This is helpful during development to visualize the layout structure and understand where each slot is positioned.

**Features in Debug Mode:**
- Colored background areas for each slot
- Descriptive slot labels and purposes
- Visual layout structure indicator
- Development-friendly placeholder content
        `,
      },
    },
  },
};

// Collapsed sidebars story
export const CollapsedSidebars: Story = {
  args: {
    debug: false,
    leftCollapsed: true,
    rightCollapsed: true,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: true,
    showContentSidebar: true,
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: true,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates collapsed sidebars with both left and right sides collapsed to 96px width. This provides a more compact layout while maintaining access to all functionality.

**Collapsed Features:**
- Left content: 96px width (desktop), 80px (tablet), 60px (mobile)
- Right content: 96px width (desktop), 80px (tablet), 60px (mobile)  
- Footer sections match content widths when collapsed
- Header sections remain at normal width (not affected by collapse)
- Center content area expands to fill available space
- All slots remain functional with reduced width
        `,
      },
    },
  },
};

// Story with all slots enabled
export const AllSlots: Story = {
  args: {
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: true,
    showContentSidebar: true,
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: true,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
};

// All slots with debug mode - show colored layout
export const AllSlotsDebug: Story = {
  name: "All Slots - Debug Mode",
  args: {
    debug: true,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: true,
    showContentSidebar: true,
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: true,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
        <!-- No slot content provided - shows default fallback content -->
      </spectrum-application-layout>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Shows all 9 slots visible with debug mode enabled, displaying semantic colors and default fallback content. This demonstrates the complete layout structure with visual indicators for each area.

**Visible Slots:**
- Header: App ID (red), Middle (blue), Utility (green)  
- Content: Navigation (orange), Main (light blue), Sidebar (pink)
- Footer: Left (yellow), Center (purple), Right (cyan)

Each slot displays its purpose and suggested content types.
        `,
      },
    },
  },
};

// Minimal layout story
export const Minimal: Story = {
  args: {
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: false,
    showHeaderUtility: false,
    showContentNavigation: false,
    showContentSidebar: false,
    showFooterLeft: false,
    showFooterCenter: false,
    showFooterRight: false,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
};

// Content focused layout
export const ContentFocused: Story = {
  args: {
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: false,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: false,
    showContentSidebar: true,
    showFooterLeft: false,
    showFooterCenter: true,
    showFooterRight: false,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
};

// Right sidebar focused layout
export const RightSidebarFocus: Story = {
  args: {
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: false,  // Left nav OFF
    showContentSidebar: true,      // Right sidebar ON
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: true,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
};

// Left navigation focused layout  
export const LeftNavigationFocus: Story = {
  args: {
    debug: false,
    leftCollapsed: false,
    rightCollapsed: false,
    showHeaderAppId: true,
    showHeaderMiddle: true,
    showHeaderUtility: true,
    showContentNavigation: true,   // Left nav ON
    showContentSidebar: false,     // Right sidebar OFF
    showFooterLeft: true,
    showFooterCenter: true,
    showFooterRight: false,
  },
  render: (args) => html`
    <style>
      .storybook-layout-wrapper spectrum-application-layout::part(header-app-id),
      .storybook-layout-wrapper spectrum-application-layout::part(header-middle),
      .storybook-layout-wrapper spectrum-application-layout::part(header-utility),
      .storybook-layout-wrapper spectrum-application-layout::part(content-navigation),
      .storybook-layout-wrapper spectrum-application-layout::part(content-main),
      .storybook-layout-wrapper spectrum-application-layout::part(content-sidebar),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-left),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-center),
      .storybook-layout-wrapper spectrum-application-layout::part(footer-right) {
        border: 1px dotted #999 !important;
      }
      
      .storybook-layout-wrapper spectrum-application-layout {
        --slot-border: 1px dotted #999;
      }
    </style>
    <div class="storybook-layout-wrapper" style="height: 100vh; width: 100%; position: relative; overflow: hidden;">
      <spectrum-application-layout
        .debug=${args.debug}
        .leftCollapsed=${args.leftCollapsed}
        .rightCollapsed=${args.rightCollapsed}
        .showHeaderAppId=${args.showHeaderAppId}
        .showHeaderMiddle=${args.showHeaderMiddle}
        .showHeaderUtility=${args.showHeaderUtility}
        .showContentNavigation=${args.showContentNavigation}
        .showContentSidebar=${args.showContentSidebar}
        .showFooterLeft=${args.showFooterLeft}
        .showFooterCenter=${args.showFooterCenter}
        .showFooterRight=${args.showFooterRight}
      >
      </spectrum-application-layout>
    </div>
  `,
}; 