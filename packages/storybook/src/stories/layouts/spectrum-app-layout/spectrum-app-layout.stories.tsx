import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

// @ts-ignore
import type { SpectrumAppLayout } from "@unops-itg-npm/cpit-spectrum/src/components/spectrum-app-layout/spectrum-app-layout";

interface SpectrumAppLayoutArgs {
  headerHeight: string;
  footerHeight: string;
  sidebarExpandedWidth: string;
  sidebarCollapsedWidth: string;
  sidebarExpanded: boolean;
  sidebarCollapsible: boolean;
  sidebarPosition: "left" | "right";
  showHeader: boolean;
  headerTitle: string;
  showLogo: boolean;
  logoSrc: string;
  logoAlt: string;
  showProfile: boolean;
  profileText: string;
  showFooter: boolean;
  responsive: boolean;
  breakpoint: "sm" | "md" | "lg";
  collapseMobile: boolean;
  gap: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  debug: boolean;
}

const meta = {
  title: "Spectrum/Layouts/SpectrumAppLayout",
  tags: ["autodocs"],
  args: {
    headerHeight: "5rem",
    footerHeight: "5rem",
    sidebarExpandedWidth: "16rem",
    sidebarCollapsedWidth: "4rem",
    sidebarExpanded: true,
    sidebarCollapsible: true,
    sidebarPosition: "left",
    showHeader: true,
    headerTitle: "My Application",
    showLogo: true,
    logoSrc: "",
    logoAlt: "App Logo",
    showProfile: true,
    profileText: "Profile",
    showFooter: true,
    responsive: true,
    breakpoint: "md",
    collapseMobile: true,
    gap: "md",
    debug: false
  }
} satisfies Meta<SpectrumAppLayout>;

export default meta;

export const Default = {
  args: {
    debug: true
  },
  render: (args: SpectrumAppLayoutArgs) => html`
    <div style="height: 600px; width: 100%; border: 2px dashed #ccc; position: relative; overflow: hidden;">
      <spectrum-app-layout 
        headerHeight=${args.headerHeight}
        footerHeight=${args.footerHeight}
        sidebarExpandedWidth=${args.sidebarExpandedWidth}
        sidebarCollapsedWidth=${args.sidebarCollapsedWidth}
        ?sidebarExpanded=${args.sidebarExpanded}
        ?sidebarCollapsible=${args.sidebarCollapsible}
        sidebarPosition=${args.sidebarPosition}
        ?showHeader=${args.showHeader}
        headerTitle=${args.headerTitle}
        ?showLogo=${args.showLogo}
        logoSrc=${args.logoSrc}
        logoAlt=${args.logoAlt}
        ?showProfile=${args.showProfile}
        profileText=${args.profileText}
        ?showFooter=${args.showFooter}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?collapseMobile=${args.collapseMobile}
        gap=${args.gap}
        ?debug=${args.debug}
        @sidebarToggle=${(e: CustomEvent) => console.log('Sidebar toggled:', e.detail)}
        @profileAction=${(e: CustomEvent) => console.log('Profile clicked:', e.detail)}
      >
        <!-- Logo slot -->
        <div slot="logo" style="width: 100%; height: 100%; background: #ff5722; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 0.75rem; text-align: center; line-height: 1.2;">
          🏢<br/>LOGO<br/>AREA
        </div>
        
        <!-- Header content -->
        <div slot="header-content" style="background: #2196f3; color: white; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold; font-size: 0.875rem;">
          📍 HEADER CONTENT AREA
        </div>
        
        <!-- Profile slot -->
        <div slot="profile" style="background: #4caf50; color: white; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold; font-size: 0.875rem;">
          👤 PROFILE AREA
        </div>
        
        <!-- Sidebar content -->
        <div slot="sidebar" style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
          <!-- Sidebar identifier -->
          <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; text-align: center; border: 2px solid #2196f3;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📂</div>
            <div style="font-weight: bold; color: #1976d2; font-size: 1rem;">SIDEBAR AREA</div>
            <div style="font-size: 0.8rem; color: #666; margin-top: 0.25rem;">Navigation & Menu</div>
          </div>
          
          <!-- Sample navigation items -->
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #bbdefb;" 
               onmouseover="this.style.backgroundColor='#90caf9'"
               onmouseout="this.style.backgroundColor='#bbdefb'">
            <div style="width: 1.5rem; height: 1.5rem; background: #1976d2; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">🏠</div>
            <span style="font-weight: 500;">Dashboard</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #f0f0f0;"
               onmouseover="this.style.backgroundColor='#e0e0e0'"
               onmouseout="this.style.backgroundColor='#f0f0f0'">
            <div style="width: 1.5rem; height: 1.5rem; background: #757575; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">📊</div>
            <span>Analytics</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #f0f0f0;"
               onmouseover="this.style.backgroundColor='#e0e0e0'"
               onmouseout="this.style.backgroundColor='#f0f0f0'">
            <div style="width: 1.5rem; height: 1.5rem; background: #757575; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">📁</div>
            <span>Projects</span>
          </div>
        </div>
        
        <!-- Main content -->
        <div style="display: flex; flex-direction: column; gap: 1.5rem; height: 100%;">
          <!-- Main area identifier -->
          <div style="background: #e8f5e8; padding: 2rem; border-radius: 12px; text-align: center; border: 3px solid #4caf50;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📄</div>
            <h1 style="margin: 0; color: #2e7d32; font-size: 1.8rem; font-weight: bold;">MAIN CONTENT AREA</h1>
            <p style="color: #388e3c; margin: 0.5rem 0 0 0; font-size: 1rem;">This is where your primary application content goes</p>
          </div>
          
          <div>
            <h2 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 600;">Sample Dashboard Content</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
              <div style="background: #e3f2fd; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px solid #2196f3;">
                <h3 style="margin: 0 0 0.5rem 0; color: #1976d2;">Sample Widget 1</h3>
                <div style="font-size: 2rem; font-weight: 600; color: #1976d2;">12,345</div>
                <p style="color: #1565c0; margin: 0.5rem 0 0 0; font-size: 0.9rem;">Content in main area</p>
              </div>
              <div style="background: #f3e5f5; padding: 1.5rem; border-radius: 8px; text-align: center; border: 2px solid #9c27b0;">
                <h3 style="margin: 0 0 0.5rem 0; color: #7b1fa2;">Sample Widget 2</h3>
                <div style="font-size: 2rem; font-weight: 600; color: #7b1fa2;">$45,678</div>
                <p style="color: #6a1b9a; margin: 0.5rem 0 0 0; font-size: 0.9rem;">More main content</p>
              </div>
            </div>
          </div>
          
          <div style="background: white; padding: 2rem; border-radius: 8px; border: 2px solid #ff9800; flex: 1;">
            <h2 style="margin: 0 0 1rem 0; color: #e65100;">🏗️ Layout Structure Overview</h2>
            <p style="margin-bottom: 1rem;">This app layout demonstrates all four main areas:</p>
            <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8; color: #666;">
              <li><strong style="color: #ff5722;">🏢 Header Area:</strong> Contains logo, title, header content, and profile sections</li>
              <li><strong style="color: #2196f3;">📂 Sidebar Area:</strong> Collapsible navigation menu with toggle functionality</li>
              <li><strong style="color: #4caf50;">📄 Main Area:</strong> Primary application content (this section you're reading)</li>
              <li><strong style="color: #ff9800;">🦶 Footer Area:</strong> Footer information, links, and actions</li>
            </ul>
          </div>
        </div>
        
        <!-- Footer content -->
        <div slot="footer" style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 1rem;">
          <div style="background: #ff9800; color: white; padding: 0.5rem 1rem; border-radius: 4px; font-weight: bold; font-size: 0.875rem;">
            🦶 FOOTER AREA
          </div>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span style="color: #666; cursor: pointer; padding: 0.5rem; font-size: 0.875rem; border-radius: 4px; background: #f5f5f5;">Home</span>
            <span style="color: #666; cursor: pointer; padding: 0.5rem; font-size: 0.875rem; border-radius: 4px; background: #f5f5f5;">About</span>
            <span style="color: #666; cursor: pointer; padding: 0.5rem; font-size: 0.875rem; border-radius: 4px; background: #f5f5f5;">Contact</span>
          </div>
          <span style="color: #666; font-size: 0.8rem;">© 2024</span>
        </div>
      </spectrum-app-layout>
    </div>
  `
};

export const CollapsedSidebar = {
  args: {
    sidebarExpanded: false,
    debug: true
  },
  render: (args: SpectrumAppLayoutArgs) => html`
    <div style="height: 600px; border: 2px dashed #ccc;">
      <spectrum-app-layout 
        headerHeight=${args.headerHeight}
        footerHeight=${args.footerHeight}
        sidebarExpandedWidth=${args.sidebarExpandedWidth}
        sidebarCollapsedWidth=${args.sidebarCollapsedWidth}
        ?sidebarExpanded=${args.sidebarExpanded}
        ?sidebarCollapsible=${args.sidebarCollapsible}
        sidebarPosition=${args.sidebarPosition}
        ?showHeader=${args.showHeader}
        headerTitle=${args.headerTitle}
        ?showLogo=${args.showLogo}
        logoSrc=${args.logoSrc}
        logoAlt=${args.logoAlt}
        ?showProfile=${args.showProfile}
        profileText=${args.profileText}
        ?showFooter=${args.showFooter}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?collapseMobile=${args.collapseMobile}
        gap=${args.gap}
        ?debug=${args.debug}
      >
        <div slot="logo" style="width: 100%; height: 100%; background: #e3f2fd; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #1976d2;">📱</div>
        
        <div slot="sidebar" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <div style="display: flex; align-items: center; justify-content: center; padding: 0.75rem; border-radius: 6px; cursor: pointer;">
            <div style="width: 1.5rem; height: 1.5rem; background: #e3f2fd; border-radius: 4px; display: flex; align-items: center; justify-content: center;">🏠</div>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; padding: 0.75rem; border-radius: 6px; cursor: pointer;">
            <div style="width: 1.5rem; height: 1.5rem; background: #f3e5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center;">📊</div>
          </div>
          <div style="display: flex; align-items: center; justify-content: center; padding: 0.75rem; border-radius: 6px; cursor: pointer;">
            <div style="width: 1.5rem; height: 1.5rem; background: #e8f5e8; border-radius: 4px; display: flex; align-items: center; justify-content: center;">📁</div>
          </div>
        </div>
        
        <div>
          <h1>Collapsed Sidebar Mode</h1>
          <p>The sidebar is now collapsed, showing only icons. The main content area takes up more space.</p>
          <p>Click the toggle button to expand the sidebar and see the full navigation labels.</p>
        </div>
        
        <div slot="footer" style="display: flex; justify-content: center; align-items: center;">
          <span style="color: #666;">© 2024 My App</span>
        </div>
      </spectrum-app-layout>
    </div>
  `
};

export const RightSidebar = {
  args: {
    sidebarPosition: "right",
    headerTitle: "Right Sidebar Layout"
  },
  render: (args: SpectrumAppLayoutArgs) => html`
    <div style="height: 600px; border: 2px dashed #ccc;">
      <spectrum-app-layout 
        headerHeight=${args.headerHeight}
        footerHeight=${args.footerHeight}
        sidebarExpandedWidth=${args.sidebarExpandedWidth}
        sidebarCollapsedWidth=${args.sidebarCollapsedWidth}
        ?sidebarExpanded=${args.sidebarExpanded}
        ?sidebarCollapsible=${args.sidebarCollapsible}
        sidebarPosition=${args.sidebarPosition}
        ?showHeader=${args.showHeader}
        headerTitle=${args.headerTitle}
        ?showLogo=${args.showLogo}
        logoSrc=${args.logoSrc}
        logoAlt=${args.logoAlt}
        ?showProfile=${args.showProfile}
        profileText=${args.profileText}
        ?showFooter=${args.showFooter}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?collapseMobile=${args.collapseMobile}
        gap=${args.gap}
        ?debug=${args.debug}
      >
        <div slot="logo" style="width: 100%; height: 100%; background: #f3e5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #7b1fa2;">🎨</div>
        
        <div slot="sidebar" style="display: flex; flex-direction: column; gap: 0.5rem;">
          <h4 style="margin: 0 0 0.5rem 0; color: #666; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.5px;">Tools</h4>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; background: rgba(123, 31, 162, 0.1);">
            <div style="width: 1.5rem; height: 1.5rem; background: #f3e5f5; border-radius: 4px; display: flex; align-items: center; justify-content: center;">✏️</div>
            <span>Edit</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer;">
            <div style="width: 1.5rem; height: 1.5rem; background: #e8f5e8; border-radius: 4px; display: flex; align-items: center; justify-content: center;">🎨</div>
            <span>Design</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer;">
            <div style="width: 1.5rem; height: 1.5rem; background: #fff3e0; border-radius: 4px; display: flex; align-items: center; justify-content: center;">📋</div>
            <span>Properties</span>
          </div>
        </div>
        
        <div>
          <h1>Right Sidebar Layout</h1>
          <p>This layout demonstrates the sidebar on the right side, which is useful for:</p>
          <ul>
            <li>Tool palettes</li>
            <li>Property panels</li>
            <li>Secondary navigation</li>
            <li>Contextual actions</li>
          </ul>
          <div style="background: #f9f9f9; padding: 2rem; border-radius: 8px; margin-top: 2rem;">
            <h3>Main Content Area</h3>
            <p>Your primary content goes here, with the sidebar providing supporting tools and options on the right.</p>
          </div>
        </div>
        
        <div slot="footer" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span style="color: #666;">Right Sidebar Demo</span>
          <span style="color: #666;">v1.0.0</span>
        </div>
      </spectrum-app-layout>
    </div>
  `
};

export const MinimalLayout = {
  args: {
    showHeader: false,
    showFooter: false,
    sidebarCollapsible: false,
    gap: "lg"
  },
  render: (args: SpectrumAppLayoutArgs) => html`
    <div style="height: 600px; border: 2px dashed #ccc;">
      <spectrum-app-layout 
        headerHeight=${args.headerHeight}
        footerHeight=${args.footerHeight}
        sidebarExpandedWidth=${args.sidebarExpandedWidth}
        sidebarCollapsedWidth=${args.sidebarCollapsedWidth}
        ?sidebarExpanded=${args.sidebarExpanded}
        ?sidebarCollapsible=${args.sidebarCollapsible}
        sidebarPosition=${args.sidebarPosition}
        ?showHeader=${args.showHeader}
        headerTitle=${args.headerTitle}
        ?showLogo=${args.showLogo}
        logoSrc=${args.logoSrc}
        logoAlt=${args.logoAlt}
        ?showProfile=${args.showProfile}
        profileText=${args.profileText}
        ?showFooter=${args.showFooter}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?collapseMobile=${args.collapseMobile}
        gap=${args.gap}
        ?debug=${args.debug}
      >
        <div slot="sidebar" style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem 0;">
          <div style="padding: 1rem; background: #e3f2fd; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
            <div style="font-weight: 600;">Documentation</div>
          </div>
          <div style="padding: 1rem; background: #f3e5f5; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔧</div>
            <div style="font-weight: 600;">Tools</div>
          </div>
          <div style="padding: 1rem; background: #e8f5e8; border-radius: 8px; text-align: center;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">💡</div>
            <div style="font-weight: 600;">Ideas</div>
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; text-align: center; padding: 2rem;">
          <h1 style="font-size: 3rem; margin: 0 0 1rem 0; color: #333;">Minimal Layout</h1>
          <p style="font-size: 1.25rem; color: #666; margin: 0 0 2rem 0; max-width: 600px;">
            This layout focuses on content with a clean, distraction-free design. 
            No header or footer - just sidebar and main content.
          </p>
          <div style="display: flex; gap: 1rem;">
            <button style="padding: 1rem 2rem; background: #1976d2; color: white; border: none; border-radius: 6px; font-size: 1rem; cursor: pointer;">Get Started</button>
            <button style="padding: 1rem 2rem; background: transparent; color: #1976d2; border: 2px solid #1976d2; border-radius: 6px; font-size: 1rem; cursor: pointer;">Learn More</button>
          </div>
        </div>
      </spectrum-app-layout>
    </div>
  `
};

export const CustomDimensions = {
  args: {
    headerHeight: "4rem",
    footerHeight: "3rem",
    sidebarExpandedWidth: "20rem",
    sidebarCollapsedWidth: "5rem",
    gap: "xl",
    debug: true
  },
  render: (args: SpectrumAppLayoutArgs) => html`
    <div style="height: 600px; border: 2px dashed #ccc;">
      <spectrum-app-layout 
        headerHeight=${args.headerHeight}
        footerHeight=${args.footerHeight}
        sidebarExpandedWidth=${args.sidebarExpandedWidth}
        sidebarCollapsedWidth=${args.sidebarCollapsedWidth}
        ?sidebarExpanded=${args.sidebarExpanded}
        ?sidebarCollapsible=${args.sidebarCollapsible}
        sidebarPosition=${args.sidebarPosition}
        ?showHeader=${args.showHeader}
        headerTitle="Custom Layout"
        ?showLogo=${args.showLogo}
        logoSrc=${args.logoSrc}
        logoAlt=${args.logoAlt}
        ?showProfile=${args.showProfile}
        profileText=${args.profileText}
        ?showFooter=${args.showFooter}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?collapseMobile=${args.collapseMobile}
        gap=${args.gap}
        ?debug=${args.debug}
      >
        <div slot="logo" style="width: 100%; height: 100%; background: #e8f5e8; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #388e3c;">⚡</div>
        
        <div slot="sidebar" style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; border-radius: 8px; color: white; text-align: center;">
            <h4 style="margin: 0 0 0.5rem 0;">Wide Sidebar</h4>
            <p style="margin: 0; font-size: 0.875rem; opacity: 0.9;">20rem width when expanded</p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div style="padding: 1rem; background: rgba(102, 126, 234, 0.1); border-radius: 6px; border-left: 4px solid #667eea;">Custom Navigation Item 1</div>
            <div style="padding: 1rem; background: rgba(118, 75, 162, 0.1); border-radius: 6px; border-left: 4px solid #764ba2;">Custom Navigation Item 2</div>
            <div style="padding: 1rem; background: rgba(102, 126, 234, 0.1); border-radius: 6px; border-left: 4px solid #667eea;">Custom Navigation Item 3</div>
          </div>
        </div>
        
        <div>
          <h1>Custom Dimensions Layout</h1>
          <p><strong>This layout demonstrates custom sizing:</strong></p>
          <ul>
            <li>Header height: {args.headerHeight}</li>
            <li>Footer height: {args.footerHeight}</li>
            <li>Sidebar expanded: {args.sidebarExpandedWidth}</li>
            <li>Sidebar collapsed: {args.sidebarCollapsedWidth}</li>
            <li>Gap size: {args.gap}</li>
          </ul>
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem; border-radius: 12px; color: white; text-align: center; margin-top: 2rem;">
            <h2 style="margin: 0 0 1rem 0;">Customizable Layout</h2>
            <p style="margin: 0; font-size: 1.125rem; opacity: 0.9;">All dimensions are fully customizable through component properties.</p>
          </div>
        </div>
        
        <div slot="footer" style="display: flex; justify-content: center; align-items: center;">
          <span style="color: #666; font-size: 0.875rem;">Compact Footer • Custom Dimensions Demo</span>
        </div>
      </spectrum-app-layout>
    </div>
  `
}; 