import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumCard Component
 * 
 * The card component provides a versatile content container for displaying information with optional header, footer, and actions. It follows Material Design 3 patterns and supports interactive states, media content, navigation, and flexible layouts.
 * 
 * ### Key Features
 * - **Multiple Variants**: Default, elevated, outlined, and filled styles
 * - **Background Effects**: Opaque, frost effects (partial/full), and transparent options
 * - **Interactive States**: Clickable cards with hover and active feedback
 * - **Navigation Support**: Direct HTML anchor tag navigation with same/new tab options
 * - **Media Support**: Image display with overlay capabilities
 * - **Header & Footer**: Optional sections with action slots
 * - **Size Variations**: Small, medium, large, and auto sizing
 * - **Integration Ready**: Works seamlessly with other Spectrum components
 * 
 * ### Usage Guidelines
 * - **Use for**: Content cards, product displays, article previews, user profiles, dashboards, navigation links
 * - **Perfect for**: Building consistent card layouts with interactive elements and navigation
 * - **Avoid when**: Simple content without structure would suffice, or when custom layouts are needed
 * 
 * ### Design Variants
 * - **Default**: Subtle elevation with border for standard content
 * - **Elevated**: Higher elevation without border for prominent content
 * - **Outlined**: Strong border without shadow for structured content
 * - **Filled**: Tinted background for grouped or categorized content
 * 
 * ### Navigation vs Interactive Cards
 * - **Navigation Cards**: Use `href` prop for HTML anchor tag navigation (same/new tab)
 * - **Interactive Cards**: Use `clickable` prop for custom event handling with `cardAction` events
 * - **Security**: Navigation cards automatically add `rel="noopener noreferrer"` for `target="_blank"`
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **cardAction**: Emitted when interactive (non-navigation) cards are clicked with action, cardId, and title
 * - Navigation cards use browser navigation instead of custom events
 */

// Component interfaces for TypeScript support
interface SpectrumCardElement extends HTMLElement {
  debug: boolean;
  variant: 'default' | 'elevated' | 'outlined' | 'filled';
  size: 'small' | 'medium' | 'large' | 'auto';
  background: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent';
  clickable: boolean;
  disabled: boolean;
  action: string;
  cardTitle?: string;
  cardSubtitle?: string;

  imageUrl?: string;
  imageAlt?: string;
  showHeaderActions: boolean;
  showFooterActions: boolean;
  width?: string;
  height?: string;
  noPadding: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

// Story arguments interface
interface SpectrumCardArgs extends SpectrumCardElement {
  headerActionsContent: string;
  footerActionsContent: string;
  content: string;
  mediaOverlayContent: string;
}

// Sample data for demonstrations
const sampleImages = {
  landscape: 'https://picsum.photos/400/200?random=1',
  portrait: 'https://picsum.photos/300/400?random=2',
  square: 'https://picsum.photos/300/300?random=3',
  tech: 'https://picsum.photos/400/200?random=4',
  nature: 'https://picsum.photos/400/200?random=5'
};

const sampleContent = {
  short: "Discover new possibilities with our innovative solutions.",
  medium: "Explore cutting-edge features designed to enhance your workflow and boost productivity. Our comprehensive suite of tools adapts to your needs.",
  long: "Transform your digital experience with our comprehensive platform. Built for modern teams, our solution combines powerful functionality with intuitive design, ensuring seamless collaboration and efficient project management across all your initiatives.",
  structured: `
<div style="display: flex; flex-direction: column; gap: 1rem;">
  <div style="display: flex; align-items: center; gap: 0.5rem;">
    <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">star</span>
    <span>Premium Feature</span>
  </div>
  <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">
    Enhanced capabilities with advanced analytics and real-time insights.
  </p>
</div>
  `,
  dashboard: `
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
  <div style="text-align: center; padding: 0.75rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px;">
    <div style="font-size: 1.25rem; font-weight: bold; color: var(--spectrum-sys-color-on-primary-container);">87%</div>
    <div style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-primary-container);">Completion</div>
  </div>
  <div style="text-align: center; padding: 0.75rem; background: var(--spectrum-sys-color-secondary-container); border-radius: 6px;">
    <div style="font-size: 1.25rem; font-weight: bold; color: var(--spectrum-sys-color-on-secondary-container);">24</div>
    <div style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-secondary-container);">Tasks</div>
  </div>
</div>
  `
};

const meta: Meta<SpectrumCardArgs> = {
  title: 'Spectrum/Components/SpectrumCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-card\` component provides a versatile content container for displaying structured information with optional interactions.

### Basic Usage
\`\`\`html
<spectrum-card
  card-title="Card Title"
  card-subtitle="Subtitle">
  <div slot="content">Content goes here.</div>
</spectrum-card>
\`\`\`

### With Media and Actions
\`\`\`html
<spectrum-card
  card-title="Interactive Card"
  image-url="image.jpg"
  clickable
  show-header-actions
  show-footer-actions>
  <spectrum-button slot="header-actions">Edit</spectrum-button>
  <div slot="content">Card content goes here.</div>
  <spectrum-button slot="footer-actions">Learn More</spectrum-button>
</spectrum-card>
\`\`\`

### Navigation Cards
\`\`\`html
<!-- Same tab navigation -->
<spectrum-card
  card-title="Article Card"
  href="/article/123">
  <div slot="content">Click to read more...</div>
</spectrum-card>

<!-- New tab navigation -->
<spectrum-card
  card-title="External Link"
  href="https://example.com"
  target="_blank">
  <div slot="content">Opens in new tab</div>
</spectrum-card>
\`\`\`

### Event Handling
\`\`\`javascript
// For interactive (non-navigation) cards
card.addEventListener('cardAction', (e) => {
  console.log('Card clicked:', e.detail);
});

// Navigation cards use browser navigation - no custom events
\`\`\`
        `,
      },
    },
    actions: {
      handles: ['cardAction'],
    },
  },
  argTypes: {
    debug: {
      control: 'boolean',
      description: 'Enable debug logging',
      table: { category: 'Debug' },
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
      description: 'Card visual style',
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'auto'],
      description: 'Predefined card size',
      table: { category: 'Layout' },
    },
    background: {
      control: 'select',
      options: ['opaque', 'partial-frost', 'full-frost', 'transparent'],
      description: 'Background effect level',
      table: { category: 'Appearance' },
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
      table: { category: 'Behavior' },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
      table: { category: 'State' },
    },
    action: {
      control: 'text',
      description: 'Action identifier for events',
      table: { category: 'Events' },
    },
    cardTitle: {
      control: 'text',
      description: 'Card title text',
      table: { category: 'Content' },
    },
    cardSubtitle: {
      control: 'text',
      description: 'Card subtitle text',
      table: { category: 'Content' },
    },

    imageUrl: {
      control: 'text',
      description: 'Image URL for card media',
      table: { category: 'Media' },
    },
    imageAlt: {
      control: 'text',
      description: 'Alt text for card image',
      table: { category: 'Media' },
    },
    showHeaderActions: {
      control: 'boolean',
      description: 'Show header actions slot',
      table: { category: 'Layout' },
    },
    showFooterActions: {
      control: 'boolean',
      description: 'Show footer actions slot',
      table: { category: 'Layout' },
    },
    width: {
      control: 'text',
      description: 'Custom card width',
      table: { category: 'Dimensions' },
    },
    height: {
      control: 'text',
      description: 'Custom card height',
      table: { category: 'Dimensions' },
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove default content padding',
      table: { category: 'Layout' },
    },
    href: {
      control: 'text',
      description: 'URL for navigation when card is used as a link',
      table: { category: 'Navigation' },
    },
    target: {
      control: 'select',
      options: ['', '_blank', '_self', '_parent', '_top'],
      description: 'Target for navigation (e.g., "_blank" for new tab)',
      table: { category: 'Navigation' },
    },
    rel: {
      control: 'text',
      description: 'Rel attribute for security when using target="_blank"',
      table: { category: 'Navigation' },
    },
    headerActionsContent: {
      control: 'textarea',
      description: 'Content for header actions slot (supports HTML)',
      table: { category: 'Slots' },
    },
    footerActionsContent: {
      control: 'textarea',
      description: 'Content for footer actions slot (supports HTML)',
      table: { category: 'Slots' },
    },
    content: {
      control: 'textarea',
      description: 'Content for default slot (supports HTML)',
      table: { category: 'Slots' },
    },
    mediaOverlayContent: {
      control: 'text',
      description: 'Content for media overlay slot',
      table: { category: 'Slots' },
    },
  },
  args: {
    debug: false,
    variant: 'default',
    size: 'medium',
    background: 'opaque',
    clickable: false,
    disabled: false,
    action: '',
    cardTitle: 'Test Card',
    cardSubtitle: 'Test Subtitle',
    imageUrl: '',
    imageAlt: '',
    showHeaderActions: false,
    showFooterActions: false,
    width: '',
    height: '',
    noPadding: false,
    href: '',
    target: '',
    rel: '',
    headerActionsContent: '',
    footerActionsContent: '',
    content: 'This is the main content area. You can put any HTML content here including text, components, and complex layouts.',
    mediaOverlayContent: '',
  },
};

export default meta;
type Story = StoryObj<SpectrumCardArgs>;

// Template function
const Template = (args: SpectrumCardArgs) => html`
  <spectrum-card
    .debug=${args.debug}
    .variant=${args.variant}
    .size=${args.size}
    .background=${args.background}
    .clickable=${args.clickable}
    .disabled=${args.disabled}
    .action=${args.action}
    .cardTitle=${args.cardTitle}
    .cardSubtitle=${args.cardSubtitle}

    .imageUrl=${args.imageUrl}
    .imageAlt=${args.imageAlt}
    .showHeaderActions=${args.showHeaderActions}
    .showFooterActions=${args.showFooterActions}
    .width=${args.width}
    .height=${args.height}
    .noPadding=${args.noPadding}
    .href=${args.href}
    .target=${args.target}
    .rel=${args.rel}
    @cardAction=${action('cardAction')}
  >
    ${args.headerActionsContent ? html`<div slot="header-actions" innerHTML=${args.headerActionsContent}></div>` : ''}
    <div slot="content">${args.content || 'Default card content'}</div>
    ${args.footerActionsContent ? html`<div slot="footer-actions" innerHTML=${args.footerActionsContent}></div>` : ''}
    ${args.mediaOverlayContent ? html`<div slot="media-overlay" innerHTML=${args.mediaOverlayContent}></div>` : ''}
  </spectrum-card>
`;

// Grid template for multiple cards
const GridTemplate = (cards: Partial<SpectrumCardArgs>[]) => html`
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; padding: 1rem;">
    ${cards.map(card => Template({ ...meta.args, ...card } as SpectrumCardArgs))}
  </div>
`;

// Stories

// Playground story for testing and experimentation
export const Playground: Story = {
  render: Template,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for testing and experimentation with all card features. Use the controls panel to modify the card properties in real-time.'
      }
    }
  }
};

export const Default: Story = {
  render: Template,
};

export const Variants: Story = {
  render: (args) => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 1rem;">
      ${Template({ ...args, cardTitle: 'Default Card', variant: 'default' })}
      ${Template({ ...args, cardTitle: 'Elevated Card', variant: 'elevated' })}
      ${Template({ ...args, cardTitle: 'Outlined Card', variant: 'outlined' })}
      ${Template({ ...args, cardTitle: 'Filled Card', variant: 'filled' })}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different visual styles for cards, each serving different design purposes.',
      },
    },
  },
};

export const Sizes: Story = {
  render: (args) => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start; padding: 1rem;">
      ${Template({ ...args, cardTitle: 'Small Card', size: 'small' })}
      ${Template({ ...args, cardTitle: 'Medium Card', size: 'medium' })}
      ${Template({ ...args, cardTitle: 'Large Card', size: 'large' })}
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different predefined sizes for cards. Auto size adapts to container width.',
      },
    },
  },
};

export const WithMedia: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 1rem;">
      <spectrum-card
        card-title="Landscape Image"
        card-subtitle="Nature Photography"
        image-url="${sampleImages.landscape}"
        image-alt="Beautiful landscape"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">${sampleContent.short}</div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Badge Overlay"
        card-subtitle="Positioned Badge"
        image-url="${sampleImages.tech}"
        image-alt="Technology image"
        @cardAction=${action('cardAction')}
      >
        <spectrum-badge slot="media-overlay" text="New" variant="primary" style="position: absolute; top: 1rem; right: 1rem;"></spectrum-badge>
        ${sampleContent.short}
      </spectrum-card>
      
      <spectrum-card
        card-title="Full Overlay"
        card-subtitle="With Background"
        image-url="${sampleImages.square}"
        image-alt="Square image"
        @cardAction=${action('cardAction')}
      >
        <div slot="media-overlay" data-overlay="full">
          <span style="font-size: 1.5rem; font-weight: bold;">Coming Soon</span>
        </div>
        ${sampleContent.short}
      </spectrum-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Cards with media content and optional overlay elements.

**Overlay Types:**
- **Positioned Elements**: Use \`position: absolute\` styling for badges, buttons, etc.
- **Full Overlays**: Add \`data-overlay="full"\` attribute for centered content with dark background

\`\`\`html
<!-- Positioned badge -->
<spectrum-badge slot="media-overlay" text="New" style="position: absolute; top: 1rem; right: 1rem;"></spectrum-badge>

<!-- Full overlay with background -->
<div slot="media-overlay" data-overlay="full">
  <span>Coming Soon</span>
</div>
\`\`\`
        `,
      },
    },
  },
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 1rem;">
      <spectrum-card
        card-title="Clickable Card"
        card-subtitle="Click me!"
        clickable="true"
        action="card-click"
        variant="elevated"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">${sampleContent.short}</div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Disabled Card"
        card-subtitle="Not available"
        clickable="true"
        disabled="true"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">${sampleContent.short}</div>
      </spectrum-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive card states including clickable and disabled variations.',
      },
    },
  },
};

export const Navigation: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 1rem;">
      <spectrum-card
        card-title="Same Tab Navigation"
        card-subtitle="Click to navigate"
        href="https://example.com"
        variant="elevated"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">This card navigates to a new page in the same tab.</div>
      </spectrum-card>
      
      <spectrum-card
        card-title="New Tab Navigation"
        card-subtitle="Opens in new tab"
        href="https://github.com"
        target="_blank"
        variant="outlined"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">This card opens the link in a new tab for safety.</div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Internal Link"
        card-subtitle="Navigate within app"
        href="#section-2"
        variant="default"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">This card navigates to another section of the app.</div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Disabled Navigation"
        card-subtitle="Cannot navigate"
        href="https://example.com"
        disabled="true"
        variant="filled"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">This navigation card is disabled.</div>
      </spectrum-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Navigation cards use HTML anchor tags for proper browser navigation behavior.

**Features:**
- **Same Tab**: Default navigation behavior (no target specified)
- **New Tab**: Use \`target="_blank"\` with automatic \`rel="noopener noreferrer"\` for security
- **Internal Links**: Use hash links for same-page navigation
- **Disabled State**: Navigation cards can be disabled like regular cards
- **Accessibility**: Proper keyboard navigation and screen reader support

**Security:**
- Automatically adds \`rel="noopener noreferrer"\` when \`target="_blank"\` is used
- Can override with custom \`rel\` attribute if needed

**Events:**
- Navigation cards don't emit \`cardAction\` events - browser handles navigation
- Use regular clickable cards for custom event handling
        `,
      },
    },
  },
};

export const WithActions: Story = {
  render: () => html`
    <spectrum-card
      card-title="Product Card"
      card-subtitle="Premium Package"
      image-url="${sampleImages.tech}"
      variant="elevated"
      show-header-actions="true"
      show-footer-actions="true"
      @cardAction=${action('cardAction')}
    >
      <div slot="header-actions">
        <spectrum-chip label="Featured" variant="primary"></spectrum-chip>
        <spectrum-button variant="ghost" button-text="Edit" left-icon="edit" icon-only></spectrum-button>
      </div>
      
      <div slot="content">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">star</span>
            <span>Premium Feature</span>
          </div>
          <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant);">
            Enhanced capabilities with advanced analytics and real-time insights.
          </p>
        </div>
      </div>
      
      <div slot="footer-actions">
        <spectrum-button variant="secondary" button-text="Learn More"></spectrum-button>
        <spectrum-button variant="primary" button-text="Get Started"></spectrum-button>
      </div>
    </spectrum-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Card with header and footer action slots containing buttons and chips, plus rich HTML content.',
      },
    },
  },
};

export const BackgroundEffects: Story = {
  render: () => html`
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; min-height: 400px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
        <spectrum-card
          card-title="Opaque Card"
          background="opaque"
          @cardAction=${action('cardAction')}
        >
          ${sampleContent.short}
        </spectrum-card>
        
        <spectrum-card
          card-title="Partial Frost"
          background="partial-frost"
          @cardAction=${action('cardAction')}
        >
          ${sampleContent.short}
        </spectrum-card>
        
        <spectrum-card
          card-title="Full Frost"
          background="full-frost"
          @cardAction=${action('cardAction')}
        >
          ${sampleContent.short}
        </spectrum-card>
        
        <spectrum-card
          card-title="Transparent"
          background="transparent"
          @cardAction=${action('cardAction')}
        >
          ${sampleContent.short}
        </spectrum-card>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different background effects demonstrated over a gradient background.',
      },
    },
  },
};

export const CustomDimensions: Story = {
  render: () => html`
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start; padding: 1rem;">
      <spectrum-card
        card-title="Custom Width"
        width="280px"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">${sampleContent.short}</div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Custom Height"
        height="300px"
        @cardAction=${action('cardAction')}
      >
        ${sampleContent.dashboard}
      </spectrum-card>
      
      <spectrum-card
        card-title="Custom Both"
        width="350px"
        height="250px"
        @cardAction=${action('cardAction')}
      >
        ${sampleContent.medium}
      </spectrum-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Cards with custom width and height dimensions.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; padding: 1rem;">
      <spectrum-card
        card-title="User Analytics"
        card-subtitle="Last 30 days"
        variant="elevated"
        show-header-actions="true"
        show-footer-actions="true"
        @cardAction=${action('cardAction')}
      >
        <div slot="header-actions">
          <spectrum-button variant="ghost" button-text="Refresh" left-icon="refresh" icon-only></spectrum-button>
        </div>
        
        <div slot="content">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            <div style="text-align: center; padding: 0.75rem; background: var(--spectrum-sys-color-primary-container); border-radius: 6px;">
              <div style="font-size: 1.25rem; font-weight: bold; color: var(--spectrum-sys-color-on-primary-container);">87%</div>
              <div style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-primary-container);">Completion</div>
            </div>
            <div style="text-align: center; padding: 0.75rem; background: var(--spectrum-sys-color-secondary-container); border-radius: 6px;">
              <div style="font-size: 1.25rem; font-weight: bold; color: var(--spectrum-sys-color-on-secondary-container);">24</div>
              <div style="font-size: 0.75rem; color: var(--spectrum-sys-color-on-secondary-container);">Tasks</div>
            </div>
          </div>
        </div>
        
        <div slot="footer-actions">
          <spectrum-button variant="primary" button-text="View Details"></spectrum-button>
        </div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Quick Actions"
        variant="outlined"
        show-footer-actions="true"
      >
        <div slot="content">Manage your account settings and preferences.</div>
        <div slot="footer-actions">
          <spectrum-button variant="secondary" button-text="Settings"></spectrum-button>
          <spectrum-button variant="primary" button-text="Profile"></spectrum-button>
        </div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Recent Activity"
        card-subtitle="Updated 2 minutes ago"
        variant="filled"
        clickable="true"
        action="view-activity"
        @cardAction=${action('cardAction')}
      >
        <div slot="content">
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-primary);">check_circle</span>
              <span>Task completed</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--spectrum-sys-color-surface-container); border-radius: 6px;">
              <span class="material-symbols-outlined" style="color: var(--spectrum-sys-color-secondary);">schedule</span>
              <span>Meeting scheduled</span>
            </div>
          </div>
        </div>
      </spectrum-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Dashboard-style cards with various content types and interactive elements.',
      },
    },
  },
};

export const ProductCatalog: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; padding: 1rem;">
      <spectrum-card
        card-title="Wireless Headphones"
        card-subtitle="Premium Audio"
        image-url="${sampleImages.tech}"
        variant="elevated"
        clickable="true"
        action="view-product"
        show-header-actions="true"
        show-footer-actions="true"
        @cardAction=${action('cardAction')}
      >
        <div slot="header-actions">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: bold; color: var(--spectrum-sys-color-primary);">$299</span>
            <div style="display: flex; align-items: center; gap: 0.25rem;">
              <span class="material-symbols-outlined" style="font-size: 1rem; color: #ffa500;">star</span>
              <span style="font-size: 0.875rem;">4.8</span>
            </div>
          </div>
        </div>
        
        <div slot="content">
          <p>High-quality wireless headphones with noise cancellation and 30-hour battery life.</p>
        </div>
        
        <div slot="footer-actions">
          <spectrum-button variant="secondary" button-text="Add to Cart" left-icon="shopping_cart"></spectrum-button>
          <spectrum-button variant="primary" button-text="Buy Now"></spectrum-button>
        </div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Smart Watch"
        card-subtitle="Fitness Tracker"
        image-url="${sampleImages.square}"
        variant="elevated"
        clickable="true"
        action="view-product"
        show-header-actions="true"
        show-footer-actions="true"
        @cardAction=${action('cardAction')}
      >
        <div slot="header-actions">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: bold; color: var(--spectrum-sys-color-primary);">$399</span>
            <div style="display: flex; align-items: center; gap: 0.25rem;">
              <span class="material-symbols-outlined" style="font-size: 1rem; color: #ffa500;">star</span>
              <span style="font-size: 0.875rem;">4.6</span>
            </div>
          </div>
        </div>
        
        <div slot="content">
          <p>Advanced fitness tracking with GPS, heart rate monitoring, and sleep analysis.</p>
        </div>
        
        <div slot="footer-actions">
          <spectrum-button variant="secondary" button-text="Add to Cart" left-icon="shopping_cart"></spectrum-button>
          <spectrum-button variant="primary" button-text="Buy Now"></spectrum-button>
        </div>
      </spectrum-card>
      
      <spectrum-card
        card-title="Laptop Stand"
        card-subtitle="Ergonomic Design"
        image-url="${sampleImages.landscape}"
        variant="elevated"
        clickable="true"
        action="view-product"
        show-header-actions="true"
        show-footer-actions="true"
        @cardAction=${action('cardAction')}
      >
        <div slot="header-actions">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: bold; color: var(--spectrum-sys-color-primary);">$79</span>
            <div style="display: flex; align-items: center; gap: 0.25rem;">
              <span class="material-symbols-outlined" style="font-size: 1rem; color: #ffa500;">star</span>
              <span style="font-size: 0.875rem;">4.9</span>
            </div>
          </div>
        </div>
        
        <div slot="content">
          <p>Adjustable aluminum laptop stand for improved posture and workspace organization.</p>
        </div>
        
        <div slot="footer-actions">
          <spectrum-button variant="secondary" button-text="Add to Cart" left-icon="shopping_cart"></spectrum-button>
          <spectrum-button variant="primary" button-text="Buy Now"></spectrum-button>
        </div>
      </spectrum-card>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Product catalog cards with images, pricing, ratings, and purchase actions.',
      },
    },
  },
};

// Use Cases
export const UseCases: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; padding: 1rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Content Cards</h3>
        ${GridTemplate([
          { 
            cardTitle: 'Article Preview', 
            cardSubtitle: 'Technology News',
            content: sampleContent.medium,
            imageUrl: sampleImages.tech,
            clickable: true,
            action: 'read-article'
          },
          { 
            cardTitle: 'User Profile', 
            cardSubtitle: 'John Doe',
            content: `
              <div style="display: flex; align-items: center; gap: 1rem;">
                <spectrum-avatar size="large" initials="JD"></spectrum-avatar>
                <div>
                  <p style="margin: 0; font-weight: 500;">Software Engineer</p>
                  <p style="margin: 0; color: var(--spectrum-sys-color-on-surface-variant); font-size: 0.875rem;">San Francisco, CA</p>
                </div>
              </div>
            `,
            showFooterActions: true,
            footerActionsContent: `
              <spectrum-button variant="secondary" button-text="Message"></spectrum-button>
              <spectrum-button variant="primary" button-text="Connect"></spectrum-button>
            `
          },
        ])}
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem;">Form Cards</h3>
        ${GridTemplate([
          { 
            cardTitle: 'Contact Form', 
            cardSubtitle: 'Get in touch',
            content: `
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="text" placeholder="Your name" style="padding: 0.75rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 6px;">
                <input type="email" placeholder="Your email" style="padding: 0.75rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 6px;">
                <textarea placeholder="Your message" rows="3" style="padding: 0.75rem; border: 1px solid var(--spectrum-sys-color-outline); border-radius: 6px; resize: vertical;"></textarea>
              </div>
            `,
            showFooterActions: true,
            footerActionsContent: `
              <spectrum-button variant="secondary" button-text="Clear"></spectrum-button>
              <spectrum-button variant="primary" button-text="Send Message"></spectrum-button>
            `,
            variant: 'outlined'
          },
          { 
            cardTitle: 'Settings Panel', 
            cardSubtitle: 'Preferences',
            content: `
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Notifications</span>
                  <input type="checkbox" checked>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Dark Mode</span>
                  <input type="checkbox">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Auto-save</span>
                  <input type="checkbox" checked>
                </div>
              </div>
            `,
            showFooterActions: true,
            footerActionsContent: '<spectrum-button variant="primary" button-text="Save Changes"></spectrum-button>',
            variant: 'filled'
          },
        ])}
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world use cases showing how cards can be used for different content types and interactions.',
      },
    },
  },
};
