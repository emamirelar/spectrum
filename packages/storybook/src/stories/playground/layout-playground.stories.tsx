import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import {
  renderComponent,
  renderLayout,
  COMPONENT_OPTIONS,
  LAYOUT_OPTIONS,
  SAMPLE_NAV_DATA,
  SAMPLE_MESSAGES,
  SAMPLE_ACTIONS,
  SAMPLE_HERO_SLIDES,
  SAMPLE_ACCORDION_SECTIONS,
  SAMPLE_GALLERY_IMAGES,
  SAMPLE_CHART_DATA,
  SAMPLE_MEDIA_ITEMS,
  type ComponentId,
  type LayoutId,
} from './playground-helpers';

// ===========================================================================
// Interfaces
// ===========================================================================

interface AppShellArgs {
  // Theme
  themeColor: string;

  // Layout props
  sidebarExpanded: boolean;
  sidebarCollapsible: boolean;
  sidebarPosition: 'left' | 'right';
  showHeader: boolean;
  showFooter: boolean;
  showRightBar: boolean;
  rightBarWidth: string;
  gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  debug: boolean;

  // Slot component selectors
  sidebarComponent: ComponentId;
  mainComponent: ComponentId;
  headerContentComponent: ComponentId;
  rightBarComponent: ComponentId;
  footerComponent: ComponentId;

  // Sidebar component props (conditional)
  sidebarRailAppName: string;
  sidebarRailExpandedWidth: string;
  sidebarPlaceholderText: string;

  // Main component props (conditional)
  mainHeroHeight: string;
  mainConversationTitle: string;
  mainPanelTitle: string;
  mainPanelContent: string;
  mainChartType: string;
  mainChartTitle: string;
  mainPlaceholderText: string;

  // Header content props (conditional)
  headerPlaceholderText: string;
  headerSearchPlaceholder: string;

  // Right bar props (conditional)
  rightBarPlaceholderText: string;
  rightBarPanelTitle: string;

  // Footer props (conditional)
  footerPlaceholderText: string;
}

interface ContentLayoutArgs {
  // Theme
  themeColor: string;

  // Layout selector
  layoutType: LayoutId;
  debug: boolean;

  // Grid-specific
  gridColumns: string;
  gridGap: string;
  gridAutoFit: boolean;
  gridMinColumnWidth: string;

  // Flex-specific
  flexDirection: string;
  flexWrap: string;
  flexJustify: string;
  flexAlign: string;
  flexGap: string;

  // Stack-specific
  stackDirection: string;
  stackSpacing: string;
  stackAlign: string;

  // Sidebar-specific
  sidebarPosition: string;
  sidebarWidth: string;

  // Cluster-specific
  clusterSpacing: string;
  clusterJustify: string;

  // Cell selectors
  cell1Component: ComponentId;
  cell2Component: ComponentId;
  cell3Component: ComponentId;
  cell4Component: ComponentId;
  cell5Component: ComponentId;
  cell6Component: ComponentId;

  // Per-cell variant overrides
  cell1Variant: string;
  cell2Variant: string;
  cell3Variant: string;
  cell4Variant: string;
  cell5Variant: string;
  cell6Variant: string;
}

// ===========================================================================
// Meta
// ===========================================================================

const meta: Meta = {
  title: 'Spectrum/Playground/Layout Playground',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Layout Playground

An interactive playground for composing pages using Spectrum layout components and UI components. Select a layout, choose which components go into each slot, and adjust their properties -- all from the controls panel below.

## How To Use

1. **Pick a story** from the sidebar (App Shell, Content Layout, or a Page Template)
2. **Open the Controls panel** (bottom of the page)
3. **Select components** for each slot using the dropdown selectors
4. **Adjust properties** for each component using the controls that appear
5. **Watch events** in the Actions panel to see component interactions

## Available Layouts

| Layout | Use Case |
|--------|----------|
| **App Shell** | Full application with header, sidebar, main content, right bar, and footer |
| **Grid** | Two-dimensional card/widget layouts |
| **Flex** | One-dimensional row or column arrangements |
| **Stack** | Vertical or horizontal stacks with consistent spacing |
| **Sidebar** | Two-column sidebar + main content |
| **Cluster** | Inline groups of items with wrapping |

## Available Components

Buttons, Panels, Hero sections, Search inputs, Conversation panels, Navigation rails, Accordions, Image galleries, Charts, Avatars, Media libraries, and generic placeholders.
        `,
      },
    },
    layout: 'fullscreen',
  },
};

export default meta;

// ===========================================================================
// Helper: gather slot props from args by prefix
// ===========================================================================

function slotProps(args: Record<string, any>, slotPrefix: string, componentId: ComponentId): Record<string, any> {
  const map: Record<string, Record<string, string>> = {
    rail: { [`${slotPrefix}RailAppName`]: 'appName', [`${slotPrefix}RailExpandedWidth`]: 'expandedWidth' },
    hero: { [`${slotPrefix}HeroHeight`]: 'height' },
    'conversation-panel': { [`${slotPrefix}ConversationTitle`]: 'conversationTitle' },
    panel: { [`${slotPrefix}PanelTitle`]: 'panelTitle', [`${slotPrefix}PanelContent`]: 'content' },
    chart: { [`${slotPrefix}ChartType`]: 'chartType', [`${slotPrefix}ChartTitle`]: 'chartTitle' },
    'search-input': { [`${slotPrefix}SearchPlaceholder`]: 'placeholder' },
    placeholder: { [`${slotPrefix}PlaceholderText`]: 'text' },
    accordion: {},
    'image-gallery': {},
    'button-cluster': {},
    button: {},
    avatar: {},
    'media-library': {},
    none: {},
  };

  const mapping = map[componentId] || {};
  const result: Record<string, any> = {};
  for (const [argKey, propKey] of Object.entries(mapping)) {
    if (args[argKey] !== undefined) {
      result[propKey] = args[argKey];
    }
  }
  return result;
}

// ===========================================================================
// Story 1: App Shell Playground
// ===========================================================================

type AppShellStory = StoryObj<AppShellArgs>;

const renderAppShell = (args: AppShellArgs) => {
  const sidebar = renderComponent(args.sidebarComponent, slotProps(args, 'sidebar', args.sidebarComponent));
  const main = renderComponent(args.mainComponent, slotProps(args, 'main', args.mainComponent));
  const headerContent = renderComponent(args.headerContentComponent, slotProps(args, 'header', args.headerContentComponent));
  const rightBar = renderComponent(args.rightBarComponent, slotProps(args, 'rightBar', args.rightBarComponent));
  const footer = renderComponent(args.footerComponent, slotProps(args, 'footer', args.footerComponent));

  return html`
    <spectrum-theme color=${args.themeColor}>
      <spectrum-app-layout
        ?sidebar-expanded=${args.sidebarExpanded}
        ?sidebar-collapsible=${args.sidebarCollapsible}
        sidebar-position=${args.sidebarPosition}
        ?show-header=${args.showHeader}
        ?show-footer=${args.showFooter}
        ?show-right-bar=${args.showRightBar}
        right-bar-width=${args.rightBarWidth}
        gap=${args.gap}
        ?debug=${args.debug}
        header-title="Playground"
        @sidebarToggle=${action('sidebarToggle')}
        @rightBarToggle=${action('rightBarToggle')}
        @profileAction=${action('profileAction')}
      >
        ${headerContent !== nothing ? html`<div slot="header-content">${headerContent}</div>` : nothing}
        ${sidebar !== nothing ? html`<div slot="sidebar" style="height: 100%;">${sidebar}</div>` : nothing}
        ${rightBar !== nothing ? html`<div slot="right-bar" style="padding: 1rem;">${rightBar}</div>` : nothing}
        <div style="padding: 1rem; min-height: 60vh;">${main}</div>
        ${footer !== nothing ? html`<div slot="footer" style="padding: 0.5rem 1rem;">${footer}</div>` : nothing}
      </spectrum-app-layout>
    </spectrum-theme>
  `;
};

export const AppShellPlayground: AppShellStory = {
  name: 'App Shell',
  render: renderAppShell,
  args: {
    themeColor: '#1976d2',
    sidebarExpanded: true,
    sidebarCollapsible: true,
    sidebarPosition: 'left',
    showHeader: true,
    showFooter: true,
    showRightBar: false,
    rightBarWidth: '280px',
    gap: 'none',
    debug: false,

    sidebarComponent: 'rail',
    mainComponent: 'placeholder',
    headerContentComponent: 'search-input',
    rightBarComponent: 'none',
    footerComponent: 'button-cluster',

    sidebarRailAppName: 'My App',
    sidebarRailExpandedWidth: '300px',
    sidebarPlaceholderText: 'Sidebar content',

    mainHeroHeight: '400px',
    mainConversationTitle: 'Chat',
    mainPanelTitle: 'Main Panel',
    mainPanelContent: 'Main content goes here.',
    mainChartType: 'bar',
    mainChartTitle: 'Revenue',
    mainPlaceholderText: 'Main content area — select a component from the Controls panel',

    headerPlaceholderText: 'Header content',
    headerSearchPlaceholder: 'Search...',

    rightBarPlaceholderText: 'Right bar content',
    rightBarPanelTitle: 'Properties',

    footerPlaceholderText: '© 2026 Spectrum Design System',
  },
  argTypes: {
    // -- Theme --
    themeColor: { control: 'color', table: { category: 'Theme' } },

    // -- Layout --
    sidebarExpanded: { control: 'boolean', table: { category: 'Layout' } },
    sidebarCollapsible: { control: 'boolean', table: { category: 'Layout' } },
    sidebarPosition: { control: 'inline-radio', options: ['left', 'right'], table: { category: 'Layout' } },
    showHeader: { control: 'boolean', table: { category: 'Layout' } },
    showFooter: { control: 'boolean', table: { category: 'Layout' } },
    showRightBar: { control: 'boolean', table: { category: 'Layout' } },
    rightBarWidth: { control: 'text', table: { category: 'Layout' }, if: { arg: 'showRightBar' } },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout' } },
    debug: { control: 'boolean', table: { category: 'Layout' } },

    // -- Slot selectors --
    sidebarComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Sidebar' } },
    mainComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Main' } },
    headerContentComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Header' }, if: { arg: 'showHeader' } },
    rightBarComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Right Bar' }, if: { arg: 'showRightBar' } },
    footerComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Footer' }, if: { arg: 'showFooter' } },

    // -- Sidebar conditional props --
    sidebarRailAppName: { control: 'text', table: { category: 'Slot: Sidebar' }, if: { arg: 'sidebarComponent', eq: 'rail' } },
    sidebarRailExpandedWidth: { control: 'text', table: { category: 'Slot: Sidebar' }, if: { arg: 'sidebarComponent', eq: 'rail' } },
    sidebarPlaceholderText: { control: 'text', table: { category: 'Slot: Sidebar' }, if: { arg: 'sidebarComponent', eq: 'placeholder' } },

    // -- Main conditional props --
    mainHeroHeight: { control: 'text', table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'hero' } },
    mainConversationTitle: { control: 'text', table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'conversation-panel' } },
    mainPanelTitle: { control: 'text', table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'panel' } },
    mainPanelContent: { control: 'text', table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'panel' } },
    mainChartType: { control: 'select', options: ['bar', 'line', 'pie', 'doughnut', 'radar'], table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'chart' } },
    mainChartTitle: { control: 'text', table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'chart' } },
    mainPlaceholderText: { control: 'text', table: { category: 'Slot: Main' }, if: { arg: 'mainComponent', eq: 'placeholder' } },

    // -- Header conditional props --
    headerPlaceholderText: { control: 'text', table: { category: 'Slot: Header' }, if: { arg: 'headerContentComponent', eq: 'placeholder' } },
    headerSearchPlaceholder: { control: 'text', table: { category: 'Slot: Header' }, if: { arg: 'headerContentComponent', eq: 'search-input' } },

    // -- Right bar conditional props --
    rightBarPlaceholderText: { control: 'text', table: { category: 'Slot: Right Bar' }, if: { arg: 'rightBarComponent', eq: 'placeholder' } },
    rightBarPanelTitle: { control: 'text', table: { category: 'Slot: Right Bar' }, if: { arg: 'rightBarComponent', eq: 'panel' } },

    // -- Footer conditional props --
    footerPlaceholderText: { control: 'text', table: { category: 'Slot: Footer' }, if: { arg: 'footerComponent', eq: 'placeholder' } },
  },
  parameters: {
    docs: {
      description: {
        story: `
Full application shell using \`spectrum-app-layout\`. Use the controls to assign components to each slot:

- **Sidebar**: Navigation rail, accordion, buttons, placeholder, or any component
- **Main**: Hero, conversation panel, chart, panel, image gallery, or any component
- **Header Content**: Search input, buttons, placeholder, or any component
- **Right Bar**: Panel, accordion, buttons, placeholder, or any component
- **Footer**: Button cluster, placeholder, or any component

Toggle the sidebar, header, footer, and right bar on/off. Adjust layout gap and debug mode to visualize boundaries.
        `,
      },
    },
  },
};

// ===========================================================================
// Story 2: Content Layout Playground
// ===========================================================================

type ContentLayoutStory = StoryObj<ContentLayoutArgs>;

function getLayoutProps(args: ContentLayoutArgs): Record<string, any> {
  const base = { debug: args.debug };
  switch (args.layoutType) {
    case 'grid':
      return { ...base, columns: args.gridColumns, gap: args.gridGap, autoFit: args.gridAutoFit, minColumnWidth: args.gridMinColumnWidth };
    case 'flex':
      return { ...base, direction: args.flexDirection, wrap: args.flexWrap, justify: args.flexJustify, align: args.flexAlign, gap: args.flexGap };
    case 'stack':
      return { ...base, direction: args.stackDirection, spacing: args.stackSpacing, align: args.stackAlign };
    case 'sidebar':
      return { ...base, position: args.sidebarPosition, sidebarWidth: args.sidebarWidth };
    case 'cluster':
      return { ...base, spacing: args.clusterSpacing, justify: args.clusterJustify };
    default:
      return base;
  }
}

const renderContentLayout = (args: ContentLayoutArgs) => {
  const cells = [
    { id: args.cell1Component, variant: args.cell1Variant },
    { id: args.cell2Component, variant: args.cell2Variant },
    { id: args.cell3Component, variant: args.cell3Variant },
    { id: args.cell4Component, variant: args.cell4Variant },
    { id: args.cell5Component, variant: args.cell5Variant },
    { id: args.cell6Component, variant: args.cell6Variant },
  ].filter(c => c.id !== 'none');

  const isSidebar = args.layoutType === 'sidebar';

  const cellTemplates = cells.map((cell, i) => {
    const comp = renderComponent(cell.id as ComponentId, { variant: cell.variant });
    if (isSidebar && i === 0) {
      return html`<div slot="sidebar">${comp}</div>`;
    }
    return comp;
  });

  const children = html`${cellTemplates.map(t => t)}`;

  return html`
    <spectrum-theme color=${args.themeColor}>
      <div style="padding: 1.5rem; min-height: 100vh;">
        ${renderLayout(args.layoutType, getLayoutProps(args), children)}
      </div>
    </spectrum-theme>
  `;
};

export const ContentLayoutPlayground: ContentLayoutStory = {
  name: 'Content Layout',
  render: renderContentLayout,
  args: {
    themeColor: '#4CAF50',
    layoutType: 'grid',
    debug: false,

    gridColumns: '1fr 1fr 1fr',
    gridGap: 'md',
    gridAutoFit: false,
    gridMinColumnWidth: '250px',

    flexDirection: 'row',
    flexWrap: 'wrap',
    flexJustify: 'start',
    flexAlign: 'stretch',
    flexGap: 'md',

    stackDirection: 'vertical',
    stackSpacing: 'md',
    stackAlign: 'stretch',

    sidebarPosition: 'left',
    sidebarWidth: 'md',

    clusterSpacing: 'md',
    clusterJustify: 'start',

    cell1Component: 'panel',
    cell2Component: 'panel',
    cell3Component: 'panel',
    cell4Component: 'chart',
    cell5Component: 'chart',
    cell6Component: 'accordion',

    cell1Variant: '',
    cell2Variant: '',
    cell3Variant: '',
    cell4Variant: '',
    cell5Variant: '',
    cell6Variant: '',
  },
  argTypes: {
    themeColor: { control: 'color', table: { category: 'Theme' } },

    // -- Layout selector --
    layoutType: { control: 'select', options: [...LAYOUT_OPTIONS], table: { category: 'Layout' } },
    debug: { control: 'boolean', table: { category: 'Layout' } },

    // -- Grid controls --
    gridColumns: { control: 'text', table: { category: 'Layout: Grid' }, if: { arg: 'layoutType', eq: 'grid' } },
    gridGap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout: Grid' }, if: { arg: 'layoutType', eq: 'grid' } },
    gridAutoFit: { control: 'boolean', table: { category: 'Layout: Grid' }, if: { arg: 'layoutType', eq: 'grid' } },
    gridMinColumnWidth: { control: 'text', table: { category: 'Layout: Grid' }, if: { arg: 'layoutType', eq: 'grid' } },

    // -- Flex controls --
    flexDirection: { control: 'select', options: ['row', 'row-reverse', 'column', 'column-reverse'], table: { category: 'Layout: Flex' }, if: { arg: 'layoutType', eq: 'flex' } },
    flexWrap: { control: 'select', options: ['nowrap', 'wrap', 'wrap-reverse'], table: { category: 'Layout: Flex' }, if: { arg: 'layoutType', eq: 'flex' } },
    flexJustify: { control: 'select', options: ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'], table: { category: 'Layout: Flex' }, if: { arg: 'layoutType', eq: 'flex' } },
    flexAlign: { control: 'select', options: ['start', 'end', 'center', 'stretch', 'baseline'], table: { category: 'Layout: Flex' }, if: { arg: 'layoutType', eq: 'flex' } },
    flexGap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout: Flex' }, if: { arg: 'layoutType', eq: 'flex' } },

    // -- Stack controls --
    stackDirection: { control: 'select', options: ['vertical', 'horizontal'], table: { category: 'Layout: Stack' }, if: { arg: 'layoutType', eq: 'stack' } },
    stackSpacing: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout: Stack' }, if: { arg: 'layoutType', eq: 'stack' } },
    stackAlign: { control: 'select', options: ['start', 'end', 'center', 'stretch'], table: { category: 'Layout: Stack' }, if: { arg: 'layoutType', eq: 'stack' } },

    // -- Sidebar controls --
    sidebarPosition: { control: 'inline-radio', options: ['left', 'right'], table: { category: 'Layout: Sidebar' }, if: { arg: 'layoutType', eq: 'sidebar' } },
    sidebarWidth: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout: Sidebar' }, if: { arg: 'layoutType', eq: 'sidebar' } },

    // -- Cluster controls --
    clusterSpacing: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout: Cluster' }, if: { arg: 'layoutType', eq: 'cluster' } },
    clusterJustify: { control: 'select', options: ['start', 'end', 'center', 'space-between', 'space-around'], table: { category: 'Layout: Cluster' }, if: { arg: 'layoutType', eq: 'cluster' } },

    // -- Cell selectors --
    cell1Component: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Cell 1' } },
    cell2Component: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Cell 2' } },
    cell3Component: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Cell 3' } },
    cell4Component: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Cell 4' } },
    cell5Component: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Cell 5' } },
    cell6Component: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Cell 6' } },

    cell1Variant: { control: 'text', description: 'Override variant/style for cell 1', table: { category: 'Cell 1' }, if: { arg: 'cell1Component', neq: 'none' } },
    cell2Variant: { control: 'text', description: 'Override variant/style for cell 2', table: { category: 'Cell 2' }, if: { arg: 'cell2Component', neq: 'none' } },
    cell3Variant: { control: 'text', description: 'Override variant/style for cell 3', table: { category: 'Cell 3' }, if: { arg: 'cell3Component', neq: 'none' } },
    cell4Variant: { control: 'text', description: 'Override variant/style for cell 4', table: { category: 'Cell 4' }, if: { arg: 'cell4Component', neq: 'none' } },
    cell5Variant: { control: 'text', description: 'Override variant/style for cell 5', table: { category: 'Cell 5' }, if: { arg: 'cell5Component', neq: 'none' } },
    cell6Variant: { control: 'text', description: 'Override variant/style for cell 6', table: { category: 'Cell 6' }, if: { arg: 'cell6Component', neq: 'none' } },
  },
  parameters: {
    docs: {
      description: {
        story: `
Choose a **layout wrapper** (Grid, Flex, Stack, Sidebar, Cluster) and populate up to 6 cells with any Spectrum component.

- **Grid**: Define columns, gap, and auto-fit behavior for card/widget layouts
- **Flex**: Control direction, wrapping, alignment, and gap
- **Stack**: Vertical or horizontal stacking with spacing
- **Sidebar**: Two-column layout with configurable sidebar width and position
- **Cluster**: Inline groups of items with natural wrapping

Each cell can contain any component from the palette. Toggle debug mode to visualize layout boundaries.
        `,
      },
    },
  },
};

// ===========================================================================
// Story 3a: Page Template — Dashboard
// ===========================================================================

export const DashboardTemplate: AppShellStory = {
  name: 'Template: Dashboard',
  render: (args: AppShellArgs) => {
    const sidebar = renderComponent(args.sidebarComponent, slotProps(args, 'sidebar', args.sidebarComponent));
    const headerContent = renderComponent(args.headerContentComponent, slotProps(args, 'header', args.headerContentComponent));
    const footer = renderComponent(args.footerComponent, slotProps(args, 'footer', args.footerComponent));

    return html`
      <spectrum-theme color=${args.themeColor}>
        <spectrum-app-layout
          ?sidebar-expanded=${args.sidebarExpanded}
          ?sidebar-collapsible=${args.sidebarCollapsible}
          sidebar-position=${args.sidebarPosition}
          ?show-header=${args.showHeader}
          ?show-footer=${args.showFooter}
          gap=${args.gap}
          header-title="Dashboard"
          @sidebarToggle=${action('sidebarToggle')}
        >
          ${headerContent !== nothing ? html`<div slot="header-content">${headerContent}</div>` : nothing}
          ${sidebar !== nothing ? html`<div slot="sidebar" style="height: 100%;">${sidebar}</div>` : nothing}

          <div style="padding: 1.5rem;">
            <spectrum-stack direction="vertical" spacing="lg">
              <spectrum-grid columns="1fr 1fr 1fr" gap="md" responsive>
                <spectrum-panel panel-title="Total Users" background="opaque">
                  <div style="padding: 1rem; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--spectrum-sys-color-primary);">12,847</div>
                    <div style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0.25rem;">+12% from last month</div>
                  </div>
                </spectrum-panel>
                <spectrum-panel panel-title="Revenue" background="opaque">
                  <div style="padding: 1rem; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--spectrum-sys-color-primary);">$48.2K</div>
                    <div style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0.25rem;">+8% from last month</div>
                  </div>
                </spectrum-panel>
                <spectrum-panel panel-title="Active Sessions" background="opaque">
                  <div style="padding: 1rem; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 700; color: var(--spectrum-sys-color-primary);">1,024</div>
                    <div style="color: var(--spectrum-sys-color-on-surface-variant); margin-top: 0.25rem;">Live right now</div>
                  </div>
                </spectrum-panel>
              </spectrum-grid>

              <spectrum-grid columns="2fr 1fr" gap="md" responsive>
                <spectrum-panel panel-title="Revenue Trend" background="opaque">
                  <spectrum-chart
                    type="line"
                    data=${JSON.stringify(SAMPLE_CHART_DATA)}
                    chart-title=""
                    height="300px"
                  ></spectrum-chart>
                </spectrum-panel>
                <spectrum-panel panel-title="Distribution" background="opaque">
                  <spectrum-chart
                    type="doughnut"
                    data=${JSON.stringify({
                      labels: ['Desktop', 'Mobile', 'Tablet'],
                      datasets: [{ label: 'Traffic', data: [55, 35, 10] }],
                    })}
                    chart-title=""
                    height="300px"
                  ></spectrum-chart>
                </spectrum-panel>
              </spectrum-grid>
            </spectrum-stack>
          </div>

          ${footer !== nothing ? html`<div slot="footer" style="padding: 0.5rem 1rem;">${footer}</div>` : nothing}
        </spectrum-app-layout>
      </spectrum-theme>
    `;
  },
  args: {
    themeColor: '#1565C0',
    sidebarExpanded: true,
    sidebarCollapsible: true,
    sidebarPosition: 'left',
    showHeader: true,
    showFooter: true,
    showRightBar: false,
    rightBarWidth: '280px',
    gap: 'none',
    debug: false,

    sidebarComponent: 'rail',
    mainComponent: 'placeholder',
    headerContentComponent: 'search-input',
    rightBarComponent: 'none',
    footerComponent: 'placeholder',

    sidebarRailAppName: 'Dashboard',
    sidebarRailExpandedWidth: '280px',
    sidebarPlaceholderText: '',
    mainHeroHeight: '',
    mainConversationTitle: '',
    mainPanelTitle: '',
    mainPanelContent: '',
    mainChartType: '',
    mainChartTitle: '',
    mainPlaceholderText: '',
    headerPlaceholderText: '',
    headerSearchPlaceholder: 'Search dashboard...',
    rightBarPlaceholderText: '',
    rightBarPanelTitle: '',
    footerPlaceholderText: '© 2026 Spectrum Design System — Dashboard Template',
  },
  argTypes: {
    themeColor: { control: 'color', table: { category: 'Theme' } },
    sidebarExpanded: { control: 'boolean', table: { category: 'Layout' } },
    sidebarCollapsible: { control: 'boolean', table: { category: 'Layout' } },
    sidebarPosition: { control: 'inline-radio', options: ['left', 'right'], table: { category: 'Layout' } },
    showHeader: { control: 'boolean', table: { category: 'Layout' } },
    showFooter: { control: 'boolean', table: { category: 'Layout' } },
    gap: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Layout' } },
    debug: { control: 'boolean', table: { category: 'Layout' } },
    sidebarComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Sidebar' } },
    headerContentComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Header' } },
    footerComponent: { control: 'select', options: [...COMPONENT_OPTIONS], table: { category: 'Slot: Footer' } },
    sidebarRailAppName: { control: 'text', table: { category: 'Slot: Sidebar' }, if: { arg: 'sidebarComponent', eq: 'rail' } },
    sidebarRailExpandedWidth: { control: 'text', table: { category: 'Slot: Sidebar' }, if: { arg: 'sidebarComponent', eq: 'rail' } },
    headerSearchPlaceholder: { control: 'text', table: { category: 'Slot: Header' }, if: { arg: 'headerContentComponent', eq: 'search-input' } },
    footerPlaceholderText: { control: 'text', table: { category: 'Slot: Footer' }, if: { arg: 'footerComponent', eq: 'placeholder' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'A pre-composed **dashboard** template with KPI cards, line chart, doughnut chart, navigation rail, and search header. Adjust all parts from the controls panel.',
      },
    },
  },
};

// ===========================================================================
// Story 3b: Page Template — Landing Page
// ===========================================================================

export const LandingPageTemplate: ContentLayoutStory = {
  name: 'Template: Landing Page',
  render: (args: ContentLayoutArgs) => {
    return html`
      <spectrum-theme color=${args.themeColor}>
        <spectrum-stack direction="vertical" spacing="none">
          <spectrum-hero
            slides=${JSON.stringify([
              {
                type: 'image',
                src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
                title: 'Build Something Amazing',
                subtitle: 'A composable design system for modern web applications',
                buttonText: 'Get Started',
                overlayPosition: 'center',
              },
            ])}
            height="70vh"
            shaded
            @heroAction=${action('heroAction')}
          ></spectrum-hero>

          <div style="padding: 3rem 2rem;">
            <spectrum-container size="lg" centered>
              <spectrum-stack direction="vertical" spacing="xl">
                <div style="text-align: center;">
                  <h2 style="font-size: 2rem; margin: 0 0 0.5rem; color: var(--spectrum-sys-color-on-surface);">Features</h2>
                  <p style="color: var(--spectrum-sys-color-on-surface-variant); max-width: 600px; margin: 0 auto;">Everything you need to build production-ready interfaces, all in one place.</p>
                </div>

                <spectrum-grid columns="1fr 1fr 1fr" gap="lg" responsive>
                  <spectrum-panel panel-title="Composable Layouts" background="opaque">
                    <div style="padding: 1rem; color: var(--spectrum-sys-color-on-surface);">
                      Grid, Flex, Stack, Sidebar, and Cluster primitives that snap together like building blocks.
                    </div>
                  </spectrum-panel>
                  <spectrum-panel panel-title="Rich Components" background="opaque">
                    <div style="padding: 1rem; color: var(--spectrum-sys-color-on-surface);">
                      Buttons, charts, galleries, conversation panels, and more — ready for production.
                    </div>
                  </spectrum-panel>
                  <spectrum-panel panel-title="Accessible by Default" background="opaque">
                    <div style="padding: 1rem; color: var(--spectrum-sys-color-on-surface);">
                      WCAG 2.1 AA compliant with keyboard navigation, screen reader support, and focus management.
                    </div>
                  </spectrum-panel>
                </spectrum-grid>

                <div style="text-align: center; padding: 2rem 0;">
                  <spectrum-cluster spacing="md" justify="center">
                    <spectrum-button variant="primary" size="lg" button-text="Documentation" @buttonAction=${action('buttonAction')}></spectrum-button>
                    <spectrum-button variant="outline" size="lg" button-text="View on GitHub" @buttonAction=${action('buttonAction')}></spectrum-button>
                  </spectrum-cluster>
                </div>
              </spectrum-stack>
            </spectrum-container>
          </div>

          <div style="padding: 1.5rem 2rem; border-top: 1px solid var(--spectrum-sys-color-outline, #e0e0e0); text-align: center; color: var(--spectrum-sys-color-on-surface-variant);">
            © 2026 Spectrum Design System
          </div>
        </spectrum-stack>
      </spectrum-theme>
    `;
  },
  args: {
    themeColor: '#6A1B9A',
    layoutType: 'stack',
    debug: false,
    gridColumns: '', gridGap: '', gridAutoFit: false, gridMinColumnWidth: '',
    flexDirection: '', flexWrap: '', flexJustify: '', flexAlign: '', flexGap: '',
    stackDirection: 'vertical', stackSpacing: 'none', stackAlign: 'stretch',
    sidebarPosition: '', sidebarWidth: '',
    clusterSpacing: '', clusterJustify: '',
    cell1Component: 'none', cell2Component: 'none', cell3Component: 'none',
    cell4Component: 'none', cell5Component: 'none', cell6Component: 'none',
    cell1Variant: '', cell2Variant: '', cell3Variant: '',
    cell4Variant: '', cell5Variant: '', cell6Variant: '',
  },
  argTypes: {
    themeColor: { control: 'color', table: { category: 'Theme' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'A pre-composed **landing page** with a hero banner, feature cards grid, call-to-action buttons, and a footer. Change the theme color to see how everything adapts.',
      },
    },
  },
};

// ===========================================================================
// Story 3c: Page Template — Admin Panel
// ===========================================================================

export const AdminPanelTemplate: AppShellStory = {
  name: 'Template: Admin Panel',
  render: (args: AppShellArgs) => {
    return html`
      <spectrum-theme color=${args.themeColor}>
        <spectrum-app-layout
          sidebar-expanded
          sidebar-collapsible
          show-header
          show-footer
          header-title="Admin Panel"
          @sidebarToggle=${action('sidebarToggle')}
        >
          <div slot="header-content" style="display: flex; align-items: center; gap: 1rem; width: 100%;">
            <spectrum-search-input
              placeholder="Search users, settings..."
              style="flex: 1;"
              @searchChange=${action('searchChange')}
              @searchSubmit=${action('searchSubmit')}
            ></spectrum-search-input>
            <spectrum-avatar label="Admin" initials="AD" size="base" shape="circle"></spectrum-avatar>
          </div>

          <nav slot="sidebar" style="padding: 0.5rem;">
            <spectrum-collapsible-list
              .items=${[
                {
                  label: 'Users',
                  icon: 'people',
                  id: 'users',
                  children: [
                    { label: 'All Users', action: 'all-users', id: 'all-users' },
                    { label: 'Roles', action: 'roles', id: 'roles' },
                    { label: 'Permissions', action: 'permissions', id: 'permissions' },
                  ],
                },
                {
                  label: 'Settings',
                  icon: 'settings',
                  id: 'settings',
                  children: [
                    { label: 'General', action: 'general', id: 'general' },
                    { label: 'Security', action: 'security', id: 'security' },
                    { label: 'Integrations', action: 'integrations', id: 'integrations' },
                  ],
                },
                {
                  label: 'Reports',
                  icon: 'assessment',
                  id: 'reports',
                  children: [
                    { label: 'Usage', action: 'usage', id: 'usage' },
                    { label: 'Audit Log', action: 'audit', id: 'audit' },
                  ],
                },
              ]}
              @childAction=${action('childAction')}
            ></spectrum-collapsible-list>
          </nav>

          <div style="padding: 1.5rem;">
            <spectrum-stack direction="vertical" spacing="lg">
              <spectrum-flex justify="space-between" align="center">
                <h2 style="margin: 0; color: var(--spectrum-sys-color-on-surface);">User Management</h2>
                <spectrum-button variant="primary" button-text="Add User" show-left-icon left-icon="person_add" @buttonAction=${action('buttonAction')}></spectrum-button>
              </spectrum-flex>

              <spectrum-grid columns="1fr 1fr 1fr 1fr" gap="md" responsive>
                <spectrum-panel panel-title="Total Users" background="opaque">
                  <div style="padding: 1rem; text-align: center; font-size: 1.75rem; font-weight: 600; color: var(--spectrum-sys-color-primary);">342</div>
                </spectrum-panel>
                <spectrum-panel panel-title="Active" background="opaque">
                  <div style="padding: 1rem; text-align: center; font-size: 1.75rem; font-weight: 600; color: var(--spectrum-sys-color-primary);">298</div>
                </spectrum-panel>
                <spectrum-panel panel-title="Pending" background="opaque">
                  <div style="padding: 1rem; text-align: center; font-size: 1.75rem; font-weight: 600; color: var(--spectrum-sys-color-primary);">31</div>
                </spectrum-panel>
                <spectrum-panel panel-title="Suspended" background="opaque">
                  <div style="padding: 1rem; text-align: center; font-size: 1.75rem; font-weight: 600; color: var(--spectrum-sys-color-primary);">13</div>
                </spectrum-panel>
              </spectrum-grid>

              <spectrum-panel panel-title="Recent Activity" background="opaque">
                <spectrum-chart
                  type="bar"
                  data=${JSON.stringify({
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                      { label: 'Sign-ups', data: [12, 19, 8, 15, 22, 5, 3] },
                      { label: 'Logins', data: [45, 62, 55, 70, 68, 30, 25] },
                    ],
                  })}
                  height="280px"
                ></spectrum-chart>
              </spectrum-panel>
            </spectrum-stack>
          </div>

          <div slot="footer" style="padding: 0.5rem 1rem; display: flex; justify-content: space-between; align-items: center; color: var(--spectrum-sys-color-on-surface-variant);">
            <span>Admin Panel v2.1.0</span>
            <spectrum-cluster spacing="sm">
              <spectrum-button variant="ghost" size="sm" button-text="Privacy Policy" @buttonAction=${action('buttonAction')}></spectrum-button>
              <spectrum-button variant="ghost" size="sm" button-text="Terms of Service" @buttonAction=${action('buttonAction')}></spectrum-button>
            </spectrum-cluster>
          </div>
        </spectrum-app-layout>
      </spectrum-theme>
    `;
  },
  args: {
    themeColor: '#00897B',
    sidebarExpanded: true,
    sidebarCollapsible: true,
    sidebarPosition: 'left',
    showHeader: true,
    showFooter: true,
    showRightBar: false,
    rightBarWidth: '280px',
    gap: 'none',
    debug: false,
    sidebarComponent: 'rail',
    mainComponent: 'placeholder',
    headerContentComponent: 'search-input',
    rightBarComponent: 'none',
    footerComponent: 'placeholder',
    sidebarRailAppName: 'Admin', sidebarRailExpandedWidth: '280px', sidebarPlaceholderText: '',
    mainHeroHeight: '', mainConversationTitle: '', mainPanelTitle: '', mainPanelContent: '',
    mainChartType: '', mainChartTitle: '', mainPlaceholderText: '',
    headerPlaceholderText: '', headerSearchPlaceholder: 'Search...',
    rightBarPlaceholderText: '', rightBarPanelTitle: '',
    footerPlaceholderText: '',
  },
  argTypes: {
    themeColor: { control: 'color', table: { category: 'Theme' } },
    sidebarExpanded: { control: 'boolean', table: { category: 'Layout' } },
    showHeader: { control: 'boolean', table: { category: 'Layout' } },
    showFooter: { control: 'boolean', table: { category: 'Layout' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'A pre-composed **admin panel** with collapsible navigation, user management stats, activity chart, search header, and admin avatar. Toggle sections on/off and change the theme.',
      },
    },
  },
};

// ===========================================================================
// Story 3d: Page Template — Chat Application
// ===========================================================================

export const ChatAppTemplate: AppShellStory = {
  name: 'Template: Chat App',
  render: (args: AppShellArgs) => {
    return html`
      <spectrum-theme color=${args.themeColor}>
        <spectrum-app-layout
          ?sidebar-expanded=${args.sidebarExpanded}
          sidebar-collapsible
          show-header
          ?show-footer=${false}
          header-title="Spectrum Chat"
          @sidebarToggle=${action('sidebarToggle')}
        >
          <div slot="header-content" style="display: flex; align-items: center; gap: 0.75rem;">
            <spectrum-chip variant="primary" label="Online" size="small"></spectrum-chip>
          </div>

          <div slot="sidebar" style="height: 100%;">
            <spectrum-rail
              app-name="Conversations"
              expanded-width="320px"
              initial-expanded
              @railAction=${action('railAction')}
              @expandedChange=${action('expandedChange')}
            >
              <spectrum-collapsible-list
                slot="items"
                .items=${[
                  {
                    label: 'Pinned',
                    icon: 'push_pin',
                    id: 'pinned',
                    children: [
                      { label: 'Project Alpha', action: 'project-alpha', id: 'project-alpha' },
                      { label: 'Design Review', action: 'design-review', id: 'design-review' },
                    ],
                  },
                  {
                    label: 'Recent',
                    icon: 'schedule',
                    id: 'recent',
                    children: [
                      { label: 'Sprint Planning', action: 'sprint-planning', id: 'sprint-planning' },
                      { label: 'Bug Triage', action: 'bug-triage', id: 'bug-triage' },
                      { label: 'Architecture Discussion', action: 'arch-discussion', id: 'arch-discussion' },
                      { label: 'Code Review', action: 'code-review', id: 'code-review' },
                    ],
                  },
                ]}
                @childAction=${action('childAction')}
              ></spectrum-collapsible-list>
            </spectrum-rail>
          </div>

          <div style="display: flex; flex-direction: column; height: calc(100vh - 5rem);">
            <spectrum-conversation-panel
              conversationtitle="Project Alpha"
              messages=${JSON.stringify([
                {
                  id: 'msg-1',
                  message: 'Hey team, I just pushed the new layout system. Can you take a look?',
                  sender: 'request',
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                },
                {
                  id: 'msg-2',
                  message: 'Looks great! The grid and flex components compose really nicely together. I tested the responsive breakpoints and they work well across all viewports.',
                  sender: 'response',
                  timestamp: new Date(Date.now() - 1800000).toISOString(),
                  explorations: [
                    { label: 'Show me the test results', value: 'Show me the test results' },
                    { label: 'What about accessibility?', value: 'What about accessibility?' },
                  ],
                },
              ])}
              actions=${JSON.stringify([
                { label: 'Share', icon: 'share', value: 'share' },
                { label: 'Pin', icon: 'push_pin', value: 'pin' },
              ])}
              background="opaque"
              style="flex: 1; min-height: 0;"
              @actionClick=${action('actionClick')}
              @explorationClick=${action('explorationClick')}
            ></spectrum-conversation-panel>

            <div style="padding: 0.75rem 1rem; border-top: 1px solid var(--spectrum-sys-color-outline, #e0e0e0);">
              <spectrum-search-input
                placeholder="Type a message..."
                enable-enter-submit
                @searchChange=${action('searchChange')}
                @searchSubmit=${action('searchSubmit')}
              ></spectrum-search-input>
            </div>
          </div>
        </spectrum-app-layout>
      </spectrum-theme>
    `;
  },
  args: {
    themeColor: '#2196F3',
    sidebarExpanded: true,
    sidebarCollapsible: true,
    sidebarPosition: 'left',
    showHeader: true,
    showFooter: false,
    showRightBar: false,
    rightBarWidth: '280px',
    gap: 'none',
    debug: false,
    sidebarComponent: 'rail',
    mainComponent: 'conversation-panel',
    headerContentComponent: 'none',
    rightBarComponent: 'none',
    footerComponent: 'none',
    sidebarRailAppName: 'Conversations', sidebarRailExpandedWidth: '320px', sidebarPlaceholderText: '',
    mainHeroHeight: '', mainConversationTitle: 'Project Alpha', mainPanelTitle: '', mainPanelContent: '',
    mainChartType: '', mainChartTitle: '', mainPlaceholderText: '',
    headerPlaceholderText: '', headerSearchPlaceholder: '',
    rightBarPlaceholderText: '', rightBarPanelTitle: '',
    footerPlaceholderText: '',
  },
  argTypes: {
    themeColor: { control: 'color', table: { category: 'Theme' } },
    sidebarExpanded: { control: 'boolean', table: { category: 'Layout' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'A pre-composed **chat application** with a conversation list rail, message panel, and input bar. Mimics a team messaging interface.',
      },
    },
  },
};
