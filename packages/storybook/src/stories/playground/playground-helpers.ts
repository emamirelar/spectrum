import { html, nothing, TemplateResult } from 'lit';
import { action } from 'storybook/actions';

// ---------------------------------------------------------------------------
// Component Palette: IDs used in select dropdowns
// ---------------------------------------------------------------------------

export const COMPONENT_OPTIONS = [
  'none',
  'placeholder',
  'button',
  'button-cluster',
  'panel',
  'hero',
  'search-input',
  'conversation-panel',
  'rail',
  'accordion',
  'image-gallery',
  'chart',
  'avatar',
  'media-library',
] as const;

export type ComponentId = (typeof COMPONENT_OPTIONS)[number];

export const LAYOUT_OPTIONS = ['grid', 'flex', 'stack', 'sidebar', 'cluster'] as const;
export type LayoutId = (typeof LAYOUT_OPTIONS)[number];

// ---------------------------------------------------------------------------
// Sample data used by complex components
// ---------------------------------------------------------------------------

export const SAMPLE_NAV_DATA = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    id: 'dashboard',
    children: [
      { label: 'Overview', action: 'overview', id: 'overview' },
      { label: 'Analytics', action: 'analytics', id: 'analytics' },
      { label: 'Reports', action: 'reports', id: 'reports' },
    ],
  },
  {
    label: 'Content',
    icon: 'article',
    id: 'content',
    children: [
      { label: 'Pages', action: 'pages', id: 'pages' },
      { label: 'Media', action: 'media', id: 'media' },
      { label: 'Blog Posts', action: 'blog', id: 'blog' },
    ],
  },
];

export const SAMPLE_MESSAGES = [
  {
    id: 'msg-1',
    message: 'Welcome! This is a sample conversation panel rendered inside the layout playground.',
    sender: 'response',
    timestamp: new Date().toISOString(),
    explorations: [
      { label: 'Tell me more', value: 'Tell me more' },
      { label: 'Show examples', value: 'Show examples' },
    ],
  },
];

export const SAMPLE_ACTIONS = [
  { label: 'Share', icon: 'share', value: 'share' },
  { label: 'Export', icon: 'download', value: 'export' },
];

export const SAMPLE_HERO_SLIDES = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    title: 'Welcome to Spectrum',
    subtitle: 'Build beautiful interfaces with composable components',
    buttonText: 'Get Started',
    overlayPosition: 'center',
  },
];

export const SAMPLE_ACCORDION_SECTIONS = [
  { id: 'sec-1', title: 'Getting Started', content: 'Learn how to set up and use Spectrum components in your project.', expanded: true },
  { id: 'sec-2', title: 'Layout System', content: 'Explore the flexible layout primitives: Grid, Flex, Stack, Sidebar, and Cluster.' },
  { id: 'sec-3', title: 'Theming', content: 'Customize colors, typography, and spacing using design tokens.' },
];

export const SAMPLE_GALLERY_IMAGES = [
  { id: '1', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', alt: 'Mountain landscape' },
  { id: '2', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80', alt: 'Forest path' },
  { id: '3', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80', alt: 'Sunlit forest' },
  { id: '4', url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80', alt: 'Ocean waves' },
];

export const SAMPLE_CHART_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    { label: 'Revenue', data: [12, 19, 3, 5, 2, 15] },
    { label: 'Expenses', data: [8, 11, 5, 8, 3, 7] },
  ],
};

export const SAMPLE_MEDIA_ITEMS = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', altText: 'Mountain' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', altText: 'Forest' },
];

// ---------------------------------------------------------------------------
// Render helpers
// ---------------------------------------------------------------------------

export function renderComponent(id: ComponentId, props: Record<string, any> = {}): TemplateResult | typeof nothing {
  switch (id) {
    case 'none':
      return nothing;

    case 'placeholder':
      return html`
        <div style="
          padding: 2rem;
          background: var(--spectrum-sys-color-surface-variant, #f0f0f0);
          border: 2px dashed var(--spectrum-sys-color-outline, #ccc);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 120px;
          color: var(--spectrum-sys-color-on-surface-variant, #666);
          font-family: var(--spectrum-sys-font-family, sans-serif);
        ">
          ${props.text || 'Placeholder Content'}
        </div>
      `;

    case 'button':
      return html`
        <spectrum-button
          variant=${props.variant || 'primary'}
          size=${props.size || 'medium'}
          button-text=${props.buttonText || 'Button'}
          ?show-left-icon=${!!props.leftIcon}
          left-icon=${props.leftIcon || ''}
          @buttonAction=${action('buttonAction')}
        ></spectrum-button>
      `;

    case 'button-cluster':
      return html`
        <spectrum-cluster spacing=${props.spacing || 'sm'} justify=${props.justify || 'start'}>
          <spectrum-button variant=${props.variant || 'primary'} button-text="Primary" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="secondary" button-text="Secondary" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="outline" button-text="Outline" @buttonAction=${action('buttonAction')}></spectrum-button>
          <spectrum-button variant="ghost" button-text="Ghost" @buttonAction=${action('buttonAction')}></spectrum-button>
        </spectrum-cluster>
      `;

    case 'panel':
      return html`
        <spectrum-panel
          panel-title=${props.panelTitle || 'Panel'}
          background=${props.background || 'opaque'}
          size=${props.size || 'full'}
          ?frost=${props.frost}
        >
          <div style="padding: 1rem; color: var(--spectrum-sys-color-on-surface, #333);">
            ${props.content || 'Panel content goes here. Add any components or text inside.'}
          </div>
        </spectrum-panel>
      `;

    case 'hero':
      return html`
        <spectrum-hero
          slides=${JSON.stringify(props.slides || SAMPLE_HERO_SLIDES)}
          height=${props.height || '400px'}
          ?show-dots=${props.showDots !== false}
          ?show-arrows=${props.showArrows !== false}
          ?rounded=${props.rounded}
          ?shaded=${props.shaded !== false}
          @heroAction=${action('heroAction')}
        ></spectrum-hero>
      `;

    case 'search-input':
      return html`
        <spectrum-search-input
          placeholder=${props.placeholder || 'Search...'}
          ?enable-voice-input=${props.enableVoiceInput !== false}
          ?enable-enter-submit=${props.enableEnterSubmit !== false}
          @searchChange=${action('searchChange')}
          @searchSubmit=${action('searchSubmit')}
        ></spectrum-search-input>
      `;

    case 'conversation-panel':
      return html`
        <spectrum-conversation-panel
          conversationtitle=${props.conversationTitle || 'Conversation'}
          messages=${JSON.stringify(props.messages || SAMPLE_MESSAGES)}
          actions=${JSON.stringify(props.actions || SAMPLE_ACTIONS)}
          ?loading=${props.loading}
          background=${props.background || 'opaque'}
          style="height: ${props.panelHeight || '400px'};"
          @actionClick=${action('actionClick')}
          @explorationClick=${action('explorationClick')}
        ></spectrum-conversation-panel>
      `;

    case 'rail':
      return html`
        <spectrum-rail
          app-name=${props.appName || 'Spectrum App'}
          expanded-width=${props.expandedWidth || '300px'}
          ?initial-expanded=${props.initialExpanded !== false}
          @railAction=${action('railAction')}
          @expandedChange=${action('expandedChange')}
        >
          <spectrum-collapsible-list
            slot="items"
            .items=${props.navData || SAMPLE_NAV_DATA}
            @childAction=${action('childAction')}
          ></spectrum-collapsible-list>
        </spectrum-rail>
      `;

    case 'accordion':
      return html`
        <spectrum-accordion
          variant=${props.variant || 'standard'}
          .sections=${props.sections || SAMPLE_ACCORDION_SECTIONS}
          expand-mode=${props.expandMode || 'single'}
          @accordionAction=${action('accordionAction')}
        ></spectrum-accordion>
      `;

    case 'image-gallery':
      return html`
        <spectrum-image-gallery
          images-json=${JSON.stringify(props.images || SAMPLE_GALLERY_IMAGES)}
          selection-mode=${props.selectionMode || 'none'}
          gallery-title=${props.galleryTitle || 'Gallery'}
          @imageAction=${action('imageAction')}
        ></spectrum-image-gallery>
      `;

    case 'chart':
      return html`
        <spectrum-chart
          type=${props.chartType || 'bar'}
          data=${JSON.stringify(props.data || SAMPLE_CHART_DATA)}
          chart-title=${props.chartTitle || 'Chart'}
          height=${props.chartHeight || '300px'}
        ></spectrum-chart>
      `;

    case 'avatar':
      return html`
        <spectrum-avatar
          label=${props.label || 'John Doe'}
          initials=${props.initials || 'JD'}
          size=${props.avatarSize || 'lg'}
          shape=${props.shape || 'circle'}
        ></spectrum-avatar>
      `;

    case 'media-library':
      return html`
        <spectrum-media-library
          media-items=${JSON.stringify(props.mediaItems || SAMPLE_MEDIA_ITEMS)}
          width="100%"
          height=${props.mediaHeight || '400px'}
          ?enable-lightbox=${props.enableLightbox !== false}
          ?show-captions=${props.showCaptions !== false}
        ></spectrum-media-library>
      `;

    default:
      return nothing;
  }
}

// ---------------------------------------------------------------------------
// Layout wrapper
// ---------------------------------------------------------------------------

export function renderLayout(
  type: LayoutId,
  props: Record<string, any>,
  children: TemplateResult | typeof nothing,
): TemplateResult {
  switch (type) {
    case 'grid':
      return html`
        <spectrum-grid
          columns=${props.columns || '1fr 1fr'}
          gap=${props.gap || 'md'}
          ?auto-fit=${props.autoFit}
          min-column-width=${props.minColumnWidth || ''}
          ?responsive=${props.responsive !== false}
          ?full-width=${props.fullWidth !== false}
          ?debug=${props.debug}
        >
          ${children}
        </spectrum-grid>
      `;

    case 'flex':
      return html`
        <spectrum-flex
          direction=${props.direction || 'row'}
          wrap=${props.wrap || 'wrap'}
          justify=${props.justify || 'start'}
          align=${props.align || 'stretch'}
          gap=${props.gap || 'md'}
          ?responsive=${props.responsive !== false}
          ?full-width=${props.fullWidth !== false}
          ?debug=${props.debug}
        >
          ${children}
        </spectrum-flex>
      `;

    case 'stack':
      return html`
        <spectrum-stack
          direction=${props.direction || 'vertical'}
          spacing=${props.spacing || 'md'}
          align=${props.align || 'stretch'}
          ?responsive=${props.responsive !== false}
          ?debug=${props.debug}
        >
          ${children}
        </spectrum-stack>
      `;

    case 'sidebar':
      return html`
        <spectrum-sidebar
          position=${props.position || 'left'}
          sidebar-width=${props.sidebarWidth || 'md'}
          gap=${props.gap || 'md'}
          ?responsive=${props.responsive !== false}
          ?collapsible=${props.collapsible}
          ?debug=${props.debug}
        >
          ${children}
        </spectrum-sidebar>
      `;

    case 'cluster':
      return html`
        <spectrum-cluster
          spacing=${props.spacing || 'md'}
          justify=${props.justify || 'start'}
          align=${props.align || 'center'}
          ?responsive=${props.responsive !== false}
          ?debug=${props.debug}
        >
          ${children}
        </spectrum-cluster>
      `;

    default:
      return html`<div>${children}</div>`;
  }
}

// ---------------------------------------------------------------------------
// Shared argType fragments
// ---------------------------------------------------------------------------

const componentSelectArgType = (label: string) => ({
  control: 'select' as const,
  options: [...COMPONENT_OPTIONS],
  description: `Component to render in the ${label} slot`,
  table: { category: 'Slot Selection' },
});

export const slotArgTypes = {
  sidebarComponent: { ...componentSelectArgType('sidebar') },
  mainComponent: { ...componentSelectArgType('main content') },
  headerContentComponent: { ...componentSelectArgType('header content') },
  rightBarComponent: { ...componentSelectArgType('right bar') },
  footerComponent: { ...componentSelectArgType('footer') },
};

export const layoutArgTypes = {
  layoutType: {
    control: 'select' as const,
    options: [...LAYOUT_OPTIONS],
    description: 'Layout wrapper type',
    table: { category: 'Layout' },
  },
};
