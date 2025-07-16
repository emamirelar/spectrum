import type { Meta, StoryObj } from "@storybook/web-components-vite";
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
  showRightBar: boolean;
  rightBarWidth: string;
  rightBarCollapsible: boolean;
  rightBarExpanded: boolean;
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
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum App Layout

A comprehensive application layout component with collapsible sidebar, header, main content, and footer areas. Built with CSS Grid for responsive behavior and smooth animations.

## Slots Overview

The spectrum-app-layout component provides **7 slots** for flexible content composition:

| Slot Name | Location | Purpose | Required |
|-----------|----------|---------|----------|
| \`logo\` | Header left | Custom logo content | No |
| \`header-content\` | Header center | Additional header elements | No |
| \`profile\` | Header right | User profile/menu | No |
| \`sidebar\` | Left/Right sidebar | Navigation content | No |
| \`right-bar\` | Right panel | Tools, properties, contextual actions | No |
| (default) | Main area | Primary application content | Yes |
| \`footer\` | Footer | Footer content | No |

## Basic Usage

\`\`\`html
<spectrum-app-layout header-title="My App" sidebar-expanded="true">
  <img slot="logo" src="/logo.svg" alt="My App" />
  <div slot="header-content">
    <input type="search" placeholder="Search..." />
  </div>
  <div slot="profile">👤 John Doe</div>
  <nav slot="sidebar">
    <a href="#home">🏠 Home</a>
    <a href="#about">ℹ️ About</a>
  </nav>
  <div>
    <h1>Welcome</h1>
    <p>Your main content goes here.</p>
  </div>
  <div slot="footer">© 2024 My Company</div>
</spectrum-app-layout>
\`\`\`

## Key Features

- **Flexible Layout**: Each slot accepts any HTML content
- **Responsive Design**: Adapts to different screen sizes
- **Collapsible Sidebar**: Smooth expand/collapse animations
- **Event Integration**: Emits events for sidebar and profile interactions
- **Customizable Dimensions**: Adjustable heights and widths
- **Position Control**: Sidebar can be left or right positioned

View the **Slots Examples** stories below to see detailed implementation examples for each slot.
        `
      }
    }
  },
  args: {
    headerHeight: "5rem",
    footerHeight: "5rem",
    sidebarExpandedWidth: "16rem",
    sidebarCollapsedWidth: "4rem",
    sidebarExpanded: true,
    sidebarCollapsible: true,
    sidebarPosition: "left",
    showRightBar: true,
    rightBarWidth: "16rem",
    rightBarCollapsible: true,
    rightBarExpanded: true,
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
    debug: true,
    showRightBar: true,
    responsive: false
  },
  render: (args: SpectrumAppLayoutArgs) => html`
    <div style="height: 600px; width: 100%; border: 2px dashed #ccc; position: relative; overflow: hidden;">
      <spectrum-app-layout 
        header-height=${args.headerHeight}
        footer-height=${args.footerHeight}
        sidebar-expanded-width=${args.sidebarExpandedWidth}
        sidebar-collapsed-width=${args.sidebarCollapsedWidth}
        ?sidebar-expanded=${args.sidebarExpanded}
        ?sidebar-collapsible=${args.sidebarCollapsible}
        sidebar-position=${args.sidebarPosition}
        ?show-right-bar=${args.showRightBar}
        right-bar-width=${args.rightBarWidth}
        ?right-bar-collapsible=${args.rightBarCollapsible}
        ?right-bar-expanded=${args.rightBarExpanded}
        ?show-header=${args.showHeader}
        header-title=${args.headerTitle}
        ?show-logo=${args.showLogo}
        logo-src=${args.logoSrc}
        logo-alt=${args.logoAlt}
        ?show-profile=${args.showProfile}
        profile-text=${args.profileText}
        ?show-footer=${args.showFooter}
        ?responsive=${args.responsive}
        breakpoint=${args.breakpoint}
        ?collapse-mobile=${args.collapseMobile}
        gap=${args.gap}
        ?debug=${args.debug}
        @sidebarToggle=${(e: CustomEvent) => console.log('Sidebar toggled:', e.detail)}
        @rightBarToggle=${(e: CustomEvent) => console.log('Right bar toggled:', e.detail)}
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
        
        <!-- Right bar content -->
        <div slot="right-bar" style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
          <!-- Right bar identifier -->
          <div style="background: #f3e5f5; padding: 1rem; border-radius: 8px; text-align: center; border: 2px solid #9c27b0;">
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🔧</div>
            <div style="font-weight: bold; color: #7b1fa2; font-size: 1rem;">RIGHT BAR AREA</div>
            <div style="font-size: 0.8rem; color: #666; margin-top: 0.25rem;">Tools & Properties</div>
          </div>
          
          <!-- Sample tool items -->
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #e1bee7;" 
               onmouseover="this.style.backgroundColor='#d1c4e9'"
               onmouseout="this.style.backgroundColor='#e1bee7'">
            <div style="width: 1.5rem; height: 1.5rem; background: #7b1fa2; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">🎨</div>
            <span style="font-weight: 500;">Properties</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #f0f0f0;"
               onmouseover="this.style.backgroundColor='#e0e0e0'"
               onmouseout="this.style.backgroundColor='#f0f0f0'">
            <div style="width: 1.5rem; height: 1.5rem; background: #757575; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">🔧</div>
            <span>Tools</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #f0f0f0;"
               onmouseover="this.style.backgroundColor='#e0e0e0'"
               onmouseout="this.style.backgroundColor='#f0f0f0'">
            <div style="width: 1.5rem; height: 1.5rem; background: #757575; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">📋</div>
            <span>Layers</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; background: #f0f0f0;"
               onmouseover="this.style.backgroundColor='#e0e0e0'"
               onmouseout="this.style.backgroundColor='#f0f0f0'">
            <div style="width: 1.5rem; height: 1.5rem; background: #757575; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white;">📐</div>
            <span>Inspector</span>
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
            <p style="margin-bottom: 1rem;">This app layout demonstrates all five main areas:</p>
            <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8; color: #666;">
              <li><strong style="color: #ff5722;">🏢 Header Area:</strong> Contains logo, title, header content, and profile sections</li>
              <li><strong style="color: #2196f3;">📂 Sidebar Area:</strong> Collapsible navigation menu with toggle functionality</li>
              <li><strong style="color: #4caf50;">📄 Main Area:</strong> Primary application content (this section you're reading)</li>
              <li><strong style="color: #9c27b0;">🔧 Right Bar Area:</strong> Tools, properties, and contextual actions panel</li>
              <li><strong style="color: #ff9800;">🦶 Footer Area:</strong> Footer information, links, and actions</li>
            </ul>
            <p style="color: #666; font-style: italic; margin-top: 1rem;">Try clicking the toggle buttons (› and ‹) to collapse the sidebar and right bar!</p>
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


// =============================================
// SLOTS EXAMPLES STORIES
// =============================================

export const SlotsOverview = {
  parameters: {
    docs: {
      description: {
        story: `
# Complete Slots Demonstration

This story showcases all 7 available slots with realistic content examples:

- **Logo Slot**: Company branding with SVG logo
- **Header Content Slot**: Search bar, notifications, and status indicator  
- **Profile Slot**: User avatar with dropdown menu
- **Sidebar Slot**: Multi-section navigation with user info
- **Right Bar Slot**: Tools, properties, and contextual actions
- **Main Content**: Dashboard with widgets and information
- **Footer Slot**: Copyright, links, and version info

Click the sidebar toggle button to see the collapse behavior in action.
        `
      }
    }
  },
  render: () => html`
    <div style="height: 700px; border: 2px dashed #ccc;">
      <spectrum-app-layout header-title="Slots Demo" sidebar-expanded="true">
        <!-- LOGO SLOT -->
        <div slot="logo" style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 32px; height: 32px; background: linear-gradient(45deg, #2196f3, #21cbf3); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">S</div>
          <span style="font-weight: bold; color: #1976d2;">Spectrum</span>
        </div>
        
        <!-- HEADER CONTENT SLOT -->
        <div slot="header-content" style="display: flex; align-items: center; gap: 16px;">
          <div style="display: flex; align-items: center; background: #f5f5f5; border-radius: 6px; padding: 8px 12px; min-width: 200px;">
            <span style="color: #666; margin-right: 8px;">🔍</span>
            <input type="search" placeholder="Search..." style="border: none; background: none; outline: none; flex: 1;" />
          </div>
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: #e8f5e8; border-radius: 6px; font-size: 14px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: #4caf50;"></div>
            <span>Online</span>
          </div>
          <button style="padding: 8px; background: transparent; border: none; cursor: pointer; border-radius: 6px; display: flex; align-items: center;">
            🔔 <span style="background: #f44336; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 11px; display: inline-flex; align-items: center; justify-content: center; margin-left: 4px;">3</span>
          </button>
        </div>
        
        <!-- PROFILE SLOT -->
        <div slot="profile" style="display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 8px 12px; border-radius: 8px;">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%234caf50'/%3E%3Ctext x='16' y='20' text-anchor='middle' fill='white' font-family='Arial' font-size='14' font-weight='bold'%3EJD%3C/text%3E%3C/svg%3E" style="width: 32px; height: 32px; border-radius: 50%;" />
          <div>
            <div style="font-weight: 500; font-size: 14px;">John Doe</div>
            <div style="font-size: 12px; color: #666;">Admin</div>
          </div>
          <span style="color: #666; font-size: 12px;">▼</span>
        </div>
        
        <!-- SIDEBAR SLOT -->
        <nav slot="sidebar" style="padding: 16px; display: flex; flex-direction: column; height: 100%;">
          <div style="padding: 16px; background: #f8f9fa; border-radius: 12px; text-align: center; margin-bottom: 24px;">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%234caf50'/%3E%3Ctext x='24' y='28' text-anchor='middle' fill='white' font-family='Arial' font-size='20' font-weight='bold'%3EJD%3C/text%3E%3C/svg%3E" style="width: 48px; height: 48px; border-radius: 50%; margin-bottom: 8px;" />
            <div style="font-weight: 500;">John Doe</div>
            <div style="font-size: 12px; color: #666;">Administrator</div>
          </div>
          
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; margin: 0 0 12px 0; padding: 0 12px;">Main</h3>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; color: inherit; border-radius: 8px; background: #e3f2fd; color: #1976d2; font-weight: 500;">
              <span>🏠</span> Dashboard
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; color: inherit; border-radius: 8px;">
              <span>📊</span> Analytics
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; color: inherit; border-radius: 8px;">
              <span>📁</span> Projects
            </a>
          </div>
          
          <div style="margin-top: auto;">
            <h3 style="font-size: 12px; font-weight: 600; color: #666; text-transform: uppercase; margin: 0 0 12px 0; padding: 0 12px;">Support</h3>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; color: inherit; border-radius: 8px;">
              <span>❓</span> Help
            </a>
          </div>
        </nav>
        
        <!-- MAIN CONTENT -->
        <div style="padding: 24px; height: 100%; overflow-y: auto;">
          <h1 style="margin: 0 0 8px 0;">Slots Documentation</h1>
          <p style="color: #666; margin: 0 0 32px 0;">Complete example showing all 7 available slots in action.</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 12px 0;">📋 Slots Overview</h3>
              <p style="margin: 0;">7 flexible slots for complete layout customization</p>
            </div>
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 12px 0;">🎯 Easy Integration</h3>
              <p style="margin: 0;">Simply add slot="name" to any HTML element</p>
            </div>
            <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 12px 0;">📱 Responsive</h3>
              <p style="margin: 0;">Automatically adapts to different screen sizes</p>
            </div>
          </div>
        </div>
        
        <!-- FOOTER SLOT -->
        <div slot="footer" style="display: flex; justify-content: space-between; align-items: center; padding: 0 16px;">
          <span style="color: #666; font-size: 14px;">© 2024 Spectrum UI</span>
          <nav style="display: flex; gap: 16px;">
            <a href="#" style="color: #666; text-decoration: none; font-size: 14px;">Privacy</a>
            <a href="#" style="color: #666; text-decoration: none; font-size: 14px;">Terms</a>
            <a href="#" style="color: #666; text-decoration: none; font-size: 14px;">Support</a>
          </nav>
          <span style="color: #666; font-size: 12px;">v1.0.0</span>
        </div>
      </spectrum-app-layout>
    </div>
  `
};

export const SlotsImplementationGuide = {
  parameters: {
    docs: {
      description: {
        story: `
# Slots Implementation Guide

This guide provides practical code examples for implementing each slot type with best practices and common patterns.

## Slot Specifications

### Logo Slot
- **Location**: Header left area
- **Recommended size**: 32-48px height  
- **Content**: Images, text, or complex branded elements

### Header Content Slot
- **Location**: Header center area (flexible width)
- **Content**: Search bars, navigation, actions, status indicators
- **Layout**: Automatically adjusts between logo and profile

### Profile Slot  
- **Location**: Header right area
- **Content**: User info, avatars, dropdown menus, login buttons
- **Interaction**: Can include click handlers and complex UI

### Sidebar Slot
- **Location**: Left or right sidebar (configurable)
- **Content**: Navigation menus, user info, tools, recent items
- **Responsive**: Content fades gracefully when collapsed

### Footer Slot
- **Location**: Bottom area spanning full width
- **Content**: Copyright, links, version info, status indicators
- **Layout**: Typically uses flexbox for left/center/right arrangement

## Code Examples

Each slot demonstrates production-ready patterns you can adapt for your applications.
        `
      }
    }
  },
  render: () => html`
    <div style="padding: 24px; max-width: 1200px; margin: 0 auto;">
      <h1>Slots Implementation Examples</h1>
      
      <!-- Logo Examples -->
      <section style="margin-bottom: 48px;">
        <h2>Logo Slot Examples</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
          
          <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
              <strong>Simple Image Logo</strong>
            </div>
            <div style="padding: 16px;">
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;img slot="logo" 
     src="/logo.svg" 
     alt="Company Logo" 
     style="height: 32px;" /&gt;</code></pre>
            </div>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
              <strong>Logo with Text</strong>
            </div>
            <div style="padding: 16px;">
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;div slot="logo" style="display: flex; align-items: center; gap: 8px;"&gt;
  &lt;img src="/icon.svg" style="height: 24px;" /&gt;
  &lt;span style="font-weight: bold;"&gt;MyApp&lt;/span&gt;
&lt;/div&gt;</code></pre>
            </div>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
              <strong>Icon-Only Logo</strong>
            </div>
            <div style="padding: 16px;">
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;div slot="logo" style="width: 32px; height: 32px; 
     background: #2196f3; border-radius: 8px; 
     display: flex; align-items: center; 
     justify-content: center; color: white; 
     font-weight: bold;"&gt;
  A
&lt;/div&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Header Content Examples -->
      <section style="margin-bottom: 48px;">
        <h2>Header Content Slot Examples</h2>
        <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
          
          <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
              <strong>Search Bar with Actions</strong>
            </div>
            <div style="padding: 16px;">
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;div slot="header-content" style="display: flex; align-items: center; gap: 16px;"&gt;
  &lt;!-- Search --&gt;
  &lt;div style="display: flex; align-items: center; background: #f5f5f5; 
              border-radius: 6px; padding: 8px 12px; min-width: 200px;"&gt;
    &lt;span style="margin-right: 8px;"&gt;🔍&lt;/span&gt;
    &lt;input type="search" placeholder="Search..." 
           style="border: none; background: none; outline: none; flex: 1;" /&gt;
  &lt;/div&gt;
  
  &lt;!-- Actions --&gt;
  &lt;button style="padding: 8px 16px; background: #2196f3; color: white; 
                 border: none; border-radius: 6px;"&gt;
    New Project
  &lt;/button&gt;
  
  &lt;!-- Notifications --&gt;
  &lt;button style="padding: 8px; background: transparent; border: none;"&gt;
    🔔 &lt;span class="badge"&gt;3&lt;/span&gt;
  &lt;/button&gt;
&lt;/div&gt;</code></pre>
            </div>
          </div>
          
          <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
              <strong>Tab Navigation</strong>
            </div>
            <div style="padding: 16px;">
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;nav slot="header-content" style="display: flex; border-bottom: 2px solid #eee;"&gt;
  &lt;a href="#dashboard" style="padding: 8px 16px; text-decoration: none; 
                               color: #2196f3; border-bottom: 2px solid #2196f3; 
                               margin-bottom: -2px;"&gt;
    Dashboard
  &lt;/a&gt;
  &lt;a href="#projects" style="padding: 8px 16px; text-decoration: none; color: #666;"&gt;
    Projects
  &lt;/a&gt;
  &lt;a href="#reports" style="padding: 8px 16px; text-decoration: none; color: #666;"&gt;
    Reports
  &lt;/a&gt;
&lt;/nav&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Sidebar Examples -->
      <section style="margin-bottom: 48px;">
        <h2>Sidebar Slot Examples</h2>
        <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
            <strong>Complete Navigation Sidebar</strong>
          </div>
          <div style="padding: 16px;">
            <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;nav slot="sidebar" style="padding: 16px; display: flex; flex-direction: column; height: 100%;"&gt;
  &lt;!-- User Info Section --&gt;
  &lt;div style="padding: 16px; background: #f8f9fa; border-radius: 12px; 
              text-align: center; margin-bottom: 24px;"&gt;
    &lt;img src="/avatar.jpg" style="width: 48px; height: 48px; border-radius: 50%; 
                                  margin-bottom: 8px;" /&gt;
    &lt;div style="font-weight: 500;"&gt;John Doe&lt;/div&gt;
    &lt;div style="font-size: 12px; color: #666;"&gt;Administrator&lt;/div&gt;
  &lt;/div&gt;
  
  &lt;!-- Main Navigation --&gt;
  &lt;div style="margin-bottom: 24px;"&gt;
    &lt;h3 style="font-size: 12px; font-weight: 600; color: #666; 
               text-transform: uppercase; margin: 0 0 12px 0; padding: 0 12px;"&gt;
      Navigation
    &lt;/h3&gt;
    &lt;a href="#dashboard" style="display: flex; align-items: center; gap: 12px; 
                               padding: 12px; text-decoration: none; color: inherit; 
                               border-radius: 8px; background: #e3f2fd; 
                               color: #1976d2; font-weight: 500;"&gt;
      &lt;span&gt;🏠&lt;/span&gt; Dashboard
    &lt;/a&gt;
    &lt;a href="#projects" style="display: flex; align-items: center; gap: 12px; 
                              padding: 12px; text-decoration: none; color: inherit; 
                              border-radius: 8px;"&gt;
      &lt;span&gt;📁&lt;/span&gt; Projects
    &lt;/a&gt;
  &lt;/div&gt;
  
  &lt;!-- Bottom Section --&gt;
  &lt;div style="margin-top: auto;"&gt;
    &lt;a href="#settings" style="display: flex; align-items: center; gap: 12px; 
                              padding: 12px; text-decoration: none; color: inherit; 
                              border-radius: 8px;"&gt;
      &lt;span&gt;⚙️&lt;/span&gt; Settings
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/nav&gt;</code></pre>
          </div>
        </div>
      </section>
      
      <!-- Footer Examples -->
      <section>
        <h2>Footer Slot Examples</h2>
        <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
          
          <div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background: #f8f9fa; padding: 12px; border-bottom: 1px solid #ddd;">
              <strong>Standard Footer Layout</strong>
            </div>
            <div style="padding: 16px;">
              <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; margin: 0; overflow-x: auto;"><code>&lt;div slot="footer" style="display: flex; justify-content: space-between; 
                              align-items: center; padding: 0 16px;"&gt;
  &lt;!-- Left: Copyright --&gt;
  &lt;span style="color: #666; font-size: 14px;"&gt;© 2024 My Company&lt;/span&gt;
  
  &lt;!-- Center: Links --&gt;
  &lt;nav style="display: flex; gap: 16px;"&gt;
    &lt;a href="#privacy" style="color: #666; text-decoration: none; font-size: 14px;"&gt;Privacy&lt;/a&gt;
    &lt;a href="#terms" style="color: #666; text-decoration: none; font-size: 14px;"&gt;Terms&lt;/a&gt;
    &lt;a href="#support" style="color: #666; text-decoration: none; font-size: 14px;"&gt;Support&lt;/a&gt;
  &lt;/nav&gt;
  
  &lt;!-- Right: Version --&gt;
  &lt;span style="color: #666; font-size: 12px;"&gt;v1.0.0&lt;/span&gt;
&lt;/div&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
};

