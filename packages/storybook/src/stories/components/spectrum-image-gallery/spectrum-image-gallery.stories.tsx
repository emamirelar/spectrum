import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumImageGallery Component
 * 
 * The image gallery component provides a flexible and feature-rich interface for managing, displaying, and interacting with image collections. Perfect for media libraries, product catalogs, portfolio displays, and content management systems.
 * 
 * ### Key Features
 * - **Multi-Source Upload**: Support for file uploads and URL-based image addition
 * - **Flexible Selection**: Single, multiple, or no selection modes with visual feedback
 * - **Interactive Management**: Built-in delete, preview, and organize capabilities
 * - **Responsive Layout**: Vertical and horizontal scrolling with adaptive thumbnails
 * - **Rich Styling**: Background effects and frost overlays for enhanced visual appeal
 * - **Action Integration**: Customizable primary actions with event-driven architecture
 * 
 * ### Usage Guidelines
 * - Use for: Media libraries, product galleries, portfolio displays, image selectors
 * - Perfect for: Content management, e-commerce, creative workflows, document systems
 * - Avoid when: Simple static image display, complex editing interfaces, video-focused content
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **imageSelected**: Emitted when images are selected with image details
 * - **imageDeselect**: Emitted when images are deselected with image details  
 * - **imageAdded**: Emitted when new images are added with source information
 * - **imageDeleted**: Emitted when images are deleted with deletion summary
 * - **imagePreview**: Emitted when images are previewed with image details
 * - **primaryAction**: Emitted when primary action is triggered with selection context
 */

// Image configuration interface
interface ImageConfig {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  metadata?: Record<string, any>;
}

// Component interfaces for TypeScript support
interface SpectrumImageGalleryElement extends HTMLElement {
  images: ImageConfig[];
  allowUpload: boolean;
  allowUrlInput: boolean;
  allowDelete: boolean;
  selectionMode: 'single' | 'multi' | 'none';
  selectedImages: string[];
  scrollDirection: 'vertical' | 'horizontal';
  previewMode: boolean;
  background: 'opaque' | 'transparent' | 'partial-frost' | 'full-frost';
  frostControlBar: 'no' | 'partial' | 'full';
  debug: boolean;
  galleryTitle: string;
  primaryActionText: string;
  primaryActionIcon: string;
  primaryActionValue: string;
}

// Story arguments interface
interface SpectrumImageGalleryArgs extends SpectrumImageGalleryElement {}

// Sample image collections for stories
const sampleImages: ImageConfig[] = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',
    alt: 'Mountain landscape with lake reflection',
    title: 'Serene Mountain Vista',
    metadata: { category: 'landscape', location: 'Swiss Alps', photographer: 'John Smith' }
  },
  {
    id: 'img-2', 
    url: 'https://images.unsplash.com/photo-1497436072909-f5e4e52c46ca?q=80&w=2060&auto=format&fit=crop',
    alt: 'Desert landscape with sand dunes',
    title: 'Golden Sand Dunes',
    metadata: { category: 'landscape', location: 'Sahara Desert', photographer: 'Maria Garcia' }
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop',
    alt: 'Dense forest with sunlight filtering through trees',
    title: 'Enchanted Forest Path',
    metadata: { category: 'nature', location: 'Pacific Northwest', photographer: 'Alex Chen' }
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2070&auto=format&fit=crop',
    alt: 'Ocean waves crashing on rocky shore',
    title: 'Coastal Storm Waves',
    metadata: { category: 'seascape', location: 'Big Sur California', photographer: 'Emma Wilson' }
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
    alt: 'Tropical beach with palm trees and turquoise water',
    title: 'Paradise Beach',
    metadata: { category: 'tropical', location: 'Maldives', photographer: 'David Kim' }
  },
  {
    id: 'img-6',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop',
    alt: 'Star-filled night sky over mountain silhouettes',
    title: 'Starry Night Mountains',
    metadata: { category: 'astronomy', location: 'Yosemite National Park', photographer: 'Sarah Johnson' }
  }
];

const portfolioImages: ImageConfig[] = [
  {
    id: 'port-1',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
    alt: 'Modern office workspace with natural lighting',
    title: 'Corporate Workspace Design',
    metadata: { project: 'TechCorp HQ', client: 'TechCorp Inc', year: '2024' }
  },
  {
    id: 'port-2',
    url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop',
    alt: 'Minimalist bedroom with large windows',
    title: 'Minimalist Bedroom Suite',
    metadata: { project: 'Urban Loft', client: 'Private Residence', year: '2024' }
  },
  {
    id: 'port-3',
    url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2058&auto=format&fit=crop',
    alt: 'Modern kitchen with island and pendant lighting',
    title: 'Contemporary Kitchen Design',
    metadata: { project: 'Suburban Home', client: 'Johnson Family', year: '2023' }
  },
  {
    id: 'port-4',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
    alt: 'Spacious living room with modern furniture',
    title: 'Open Concept Living Space',
    metadata: { project: 'Downtown Condo', client: 'Urban Living LLC', year: '2023' }
  }
];

const productImages: ImageConfig[] = [
  {
    id: 'prod-1',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    alt: 'Smart watch with black band on white background',
    title: 'ProWatch Series X',
    metadata: { sku: 'PW-001', price: '$299', category: 'Electronics' }
  },
  {
    id: 'prod-2',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    alt: 'Wireless headphones in sleek black design',
    title: 'AudioMax Pro Headphones',
    metadata: { sku: 'AM-002', price: '$199', category: 'Audio' }
  },
  {
    id: 'prod-3',
    url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop',
    alt: 'Smartphone with edge-to-edge display',
    title: 'Galaxy Phone Ultra',
    metadata: { sku: 'GP-003', price: '$899', category: 'Mobile' }
  },
  {
    id: 'prod-4',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    alt: 'High-end running shoes with modern design',
    title: 'RunMax Elite Sneakers',
    metadata: { sku: 'RM-004', price: '$149', category: 'Footwear' }
  }
];

// Mixed aspect ratio images for masonry demonstration
const masonryImages: ImageConfig[] = [
  {
    id: 'masonry-1',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&h=1200&auto=format&fit=crop',
    alt: 'Tall mountain landscape - portrait orientation',
    title: 'Mountain Peak Vista',
    metadata: { aspectRatio: 'portrait', category: 'landscape' }
  },
  {
    id: 'masonry-2',
    url: 'https://images.unsplash.com/photo-1497436072909-f5e4e52c46ca?q=80&w=1200&h=600&auto=format&fit=crop',
    alt: 'Wide desert panorama - landscape orientation',
    title: 'Desert Panorama',
    metadata: { aspectRatio: 'landscape', category: 'desert' }
  },
  {
    id: 'masonry-3',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&h=800&auto=format&fit=crop',
    alt: 'Square forest composition',
    title: 'Forest Symmetry',
    metadata: { aspectRatio: 'square', category: 'nature' }
  },
  {
    id: 'masonry-4',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=600&h=1000&auto=format&fit=crop',
    alt: 'Tall ocean waves - portrait orientation',
    title: 'Crashing Waves',
    metadata: { aspectRatio: 'portrait', category: 'ocean' }
  },
  {
    id: 'masonry-5',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&h=700&auto=format&fit=crop',
    alt: 'Extra wide beach panorama',
    title: 'Tropical Paradise',
    metadata: { aspectRatio: 'wide', category: 'tropical' }
  },
  {
    id: 'masonry-6',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=900&h=900&auto=format&fit=crop',
    alt: 'Square night sky composition',
    title: 'Starry Night',
    metadata: { aspectRatio: 'square', category: 'astronomy' }
  },
  {
    id: 'masonry-7',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=700&h=1200&auto=format&fit=crop',
    alt: 'Tall waterfall - portrait orientation',
    title: 'Cascading Falls',
    metadata: { aspectRatio: 'portrait', category: 'waterfall' }
  },
  {
    id: 'masonry-8',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1300&h=650&auto=format&fit=crop',
    alt: 'Wide mountain range panorama',
    title: 'Alpine Range',
    metadata: { aspectRatio: 'landscape', category: 'mountains' }
  }
];

const meta: Meta<SpectrumImageGalleryArgs> = {
  title: 'Spectrum/Components/SpectrumImageGallery', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-image-gallery\` component provides a comprehensive solution for managing and displaying image collections with upload, selection, and organization capabilities.

### Data Structures

#### ImageConfig Interface
\`\`\`typescript
interface ImageConfig {
  id: string;                    // Unique identifier
  url: string;                   // Image source URL  
  alt?: string;                  // Accessibility description
  title?: string;                // Display title
  metadata?: Record<string, any>; // Additional data (tags, categories, etc.)
}
\`\`\`

### Selection Modes
- **single**: Only one image can be selected at a time
- **multi**: Multiple images can be selected simultaneously
- **none**: Selection is disabled (display-only mode)

### Scroll Directions
- **vertical**: Traditional grid layout with vertical scrolling
- **horizontal**: Horizontal carousel-style layout with side scrolling

### Background Options
- **opaque**: Solid background (default)
- **transparent**: No background for overlay scenarios
- **partial-frost**: Subtle frost effect for depth
- **full-frost**: Full frost background for emphasis

### Upload Methods
- **File Upload**: Direct file selection from device
- **URL Input**: Add images by providing URLs
- **Combined**: Both methods available simultaneously

### Preview Mode Behavior
- **previewMode: false** (default): Shows control bar, selection UI, and management features
- **previewMode: true**: Hides control bar and selection UI for pure image viewing experience
- **Critical**: Set previewMode to false when you need control bar, selection, and batch operations

### Primary Actions
Configure custom action buttons that appear when images are selected:
- Custom text and icons via Material Design icons
- Event-driven with selected image context
- Flexible positioning and styling
- **Only visible when previewMode is false**

### Event Handling
All events provide comprehensive context including selected images, metadata, and action details for seamless integration with your application logic.

### Basic Usage
\`\`\`
<spectrum-image-gallery
  .images=\${imageArray}
  selection-mode="multi"
  allow-upload="true"
  primary-action-text="Process Selected"
  primary-action-icon="check_circle">
</spectrum-image-gallery>
\`\`\`
        `
      }
    }
  },
  args: {
    images: sampleImages,
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    selectionMode: 'single',
    selectedImages: [],
    scrollDirection: 'vertical',
    previewMode: false,
    background: 'opaque',
    frostControlBar: 'no',
    debug: false,
    galleryTitle: 'Image Gallery',
    primaryActionText: 'Process Images',
    primaryActionIcon: 'check_circle',
    primaryActionValue: 'process'
  },
  argTypes: {
    images: {
      control: { type: 'object' },
      description: 'Array of ImageConfig objects containing image data and metadata',
      table: {
        type: { summary: 'ImageConfig[]' },
        defaultValue: { summary: '[]' }
      }
    },
    allowUpload: {
      control: 'boolean',
      description: 'Enable file upload functionality for adding new images',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    allowUrlInput: {
      control: 'boolean',
      description: 'Enable URL input functionality for adding images from web',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    allowDelete: {
      control: 'boolean',
      description: 'Enable delete functionality for removing images',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multi', 'none'],
      description: 'Image selection behavior mode',
      table: {
        type: { summary: "'single' | 'multi' | 'none'" },
        defaultValue: { summary: 'single' }
      }
    },
    selectedImages: {
      control: { type: 'object' },
      description: 'Array of currently selected image IDs',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' }
      }
    },
    scrollDirection: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Gallery scroll direction and layout orientation',
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' }
      }
    },
    previewMode: {
      control: 'boolean',
      description: 'Enable full-size image preview on click. IMPORTANT: When true, hides control bar and selection UI for pure viewing experience.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    background: {
      control: 'select',
      options: ['opaque', 'transparent', 'partial-frost', 'full-frost'],
      description: 'Background styling for the gallery container',
      table: {
        type: { summary: "'opaque' | 'transparent' | 'partial-frost' | 'full-frost'" },
        defaultValue: { summary: 'opaque' }
      }
    },
    frostControlBar: {
      control: 'select',
      options: ['no', 'partial', 'full'],
      description: 'Frost effect level for control bar overlay',
      table: {
        type: { summary: "'no' | 'partial' | 'full'" },
        defaultValue: { summary: 'no' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode with console logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    galleryTitle: {
      control: 'text',
      description: 'Optional title displayed at the top of the gallery',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    primaryActionText: {
      control: 'text',
      description: 'Text for primary action button (shown when images selected)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    primaryActionIcon: {
      control: 'text',
      description: 'Material Design icon for primary action button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    primaryActionValue: {
      control: 'text',
      description: 'Value identifier for primary action events',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumImageGalleryArgs>;

// Interactive render function
const renderImageGallery = (args: SpectrumImageGalleryArgs) => {
  return html`
    <div style="width: 100%; height: 600px; padding: 1rem; box-sizing: border-box;">
      <spectrum-image-gallery
        .images=${args.images}
        allow-upload=${args.allowUpload}
        allow-url-input=${args.allowUrlInput}
        allow-delete=${args.allowDelete}
        selection-mode=${args.selectionMode}
        .selectedImages=${args.selectedImages}
        scroll-direction=${args.scrollDirection}
        preview-mode=${args.previewMode}
        background=${args.background}
        frost-control-bar=${args.frostControlBar}
        debug=${args.debug}
        gallery-title=${args.galleryTitle}
        primary-action-text=${args.primaryActionText}
        primary-action-icon=${args.primaryActionIcon}
        primary-action-value=${args.primaryActionValue}
        @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
        @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
        @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
        @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
        @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
      ></spectrum-image-gallery>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all image gallery features and configurations.
 * Adjust the controls to see how different settings affect gallery behavior and appearance.
 */
export const Playground: Story = {
  render: renderImageGallery
};

/**
 * Basic image gallery with landscape photos, single selection mode, and upload capabilities.
 * Perfect for simple image selection and viewing scenarios.
 */
export const BasicGallery: Story = {
  args: {
    images: sampleImages,
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: false,
    selectionMode: 'single',
    scrollDirection: 'vertical',
    galleryTitle: 'Nature Photography Collection',
    primaryActionText: 'Set as Featured',
    primaryActionIcon: 'star',
    primaryActionValue: 'feature'
  },
  render: renderImageGallery
};

/**
 * Portfolio gallery showcasing interior design work with multiple selection for batch operations.
 * Demonstrates professional use case with metadata and bulk actions.
 */
export const PortfolioGallery: Story = {
  args: {
    images: portfolioImages,
    allowUpload: true,
    allowUrlInput: false,
    allowDelete: true,
    selectionMode: 'multi',
    scrollDirection: 'vertical',
    previewMode: true,
    galleryTitle: 'Interior Design Portfolio',
    primaryActionText: 'Create Portfolio',
    primaryActionIcon: 'collections',
    primaryActionValue: 'create-portfolio',
    background: 'partial-frost',
    frostControlBar: 'partial'
  },
  render: renderImageGallery
};

/**
 * E-commerce product gallery with horizontal scrolling and enhanced selection feedback.
 * Optimized for product catalog browsing and selection workflows.
 */
export const ProductCatalog: Story = {
  args: {
    images: productImages,
    allowUpload: false,
    allowUrlInput: false,
    allowDelete: false,
    selectionMode: 'single',
    scrollDirection: 'horizontal',
    previewMode: true,
    galleryTitle: 'Featured Products',
    primaryActionText: 'Add to Cart',
    primaryActionIcon: 'shopping_cart',
    primaryActionValue: 'add-to-cart',
    background: 'opaque'
  },
  render: renderImageGallery
};

/**
 * Content management interface with full upload capabilities and multi-selection for bulk operations.
 * Ideal for admin panels and content management systems.
 */
export const ContentManager: Story = {
  args: {
    images: [...sampleImages, ...portfolioImages].slice(0, 8),
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    selectionMode: 'multi',
    scrollDirection: 'vertical',
    previewMode: true,
    galleryTitle: 'Media Library',
    primaryActionText: 'Publish Selected',
    primaryActionIcon: 'publish',
    primaryActionValue: 'publish',
    background: 'opaque',
    frostControlBar: 'full',
    debug: true
  },
  render: renderImageGallery
};

/**
 * Display-only gallery with no interaction capabilities for pure presentation scenarios.
 * Perfect for showcasing content without editing functionality.
 */
export const DisplayOnly: Story = {
  args: {
    images: sampleImages.slice(0, 4),
    allowUpload: false,
    allowUrlInput: false,
    allowDelete: false,
    selectionMode: 'none',
    scrollDirection: 'vertical',
    previewMode: true,
    galleryTitle: 'Landscape Showcase',
    primaryActionText: '',
    primaryActionIcon: '',
    primaryActionValue: '',
    background: 'full-frost'
  },
  render: renderImageGallery
};

/**
 * Empty gallery state showing upload interface and onboarding experience.
 * Demonstrates the initial state when no images are present.
 */
export const EmptyState: Story = {
  args: {
    images: [],
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: false,
    selectionMode: 'multi',
    scrollDirection: 'vertical',
    galleryTitle: 'My Photo Collection',
    primaryActionText: 'Organize Photos',
    primaryActionIcon: 'photo_library',
    primaryActionValue: 'organize',
    background: 'opaque'
  },
  render: renderImageGallery
};

/**
 * Masonry layout gallery demonstrating mixed aspect ratios and dynamic grid arrangements.
 * Shows how the gallery handles portrait, landscape, square, and wide images naturally.
 */
export const MasonryLayout: Story = {
  args: {
    images: masonryImages,
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    selectionMode: 'multi',
    scrollDirection: 'vertical',
    previewMode: false, // Allow control bar to show for multi-selection
    galleryTitle: 'Mixed Media Collection',
    primaryActionText: 'Create Collage',
    primaryActionIcon: 'grid_view',
    primaryActionValue: 'create-collage',
    background: 'opaque',
    frostControlBar: 'partial'
  },
  render: renderImageGallery,
  parameters: {
    docs: {
      description: {
        story: `
Masonry layout demonstration with varied aspect ratios:
- **Portrait**: Tall vertical images (2:3 ratio)
- **Landscape**: Wide horizontal images (2:1 ratio) 
- **Square**: Even dimensions (1:1 ratio)
- **Wide**: Extra wide panoramas (2:1+ ratio)

The gallery automatically arranges images in a natural masonry layout that adapts to different screen sizes while preserving image proportions.
        `
      }
    }
  }
};

/**
 * Control bar demonstration with frost effects and interactive selection feedback.
 * Shows the control bar overlay with different frost levels and selection states.
 */
export const ControlBarDemo: Story = {
  args: {
    images: portfolioImages,
    allowUpload: true,
    allowUrlInput: false,
    allowDelete: true,
    selectionMode: 'multi',
    selectedImages: ['port-1', 'port-3'], // Pre-select some images to show control bar
    scrollDirection: 'vertical',
    previewMode: false, // CRITICAL: Must be false to show control bar
    galleryTitle: 'Design Portfolio - Control Bar Demo',
    primaryActionText: 'Export Selected',
    primaryActionIcon: 'file_download',
    primaryActionValue: 'export',
    background: 'partial-frost',
    frostControlBar: 'full',
    debug: true
  },
  render: (args) => html`
    <div style="width: 100%; height: 600px; padding: 1rem; box-sizing: border-box; background: #f0f0f0; border-radius: 8px;">
      <h3 style="margin-bottom: 1rem; color: #333;">Control Bar Should Be Visible (2 images pre-selected)</h3>
      <spectrum-image-gallery
        .images=${args.images}
        allow-upload=${args.allowUpload}
        allow-url-input=${args.allowUrlInput}
        allow-delete=${args.allowDelete}
        selection-mode=${args.selectionMode}
        .selectedImages=${args.selectedImages}
        scroll-direction=${args.scrollDirection}
        preview-mode=${args.previewMode}
        background=${args.background}
        frost-control-bar=${args.frostControlBar}
        gallery-title=${args.galleryTitle}
        primary-action-text=${args.primaryActionText}
        primary-action-icon=${args.primaryActionIcon}
        primary-action-value=${args.primaryActionValue}
        debug=${args.debug}
        @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
        @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
        @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
        @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
      ></spectrum-image-gallery>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Control bar demonstration with full frost overlay:
- **Pre-selected Images**: 2 images are pre-selected to show control bar
- **Full Frost Bar**: Maximum overlay effect for visual emphasis
- **Multi-selection**: Click to add/remove images from selection
- **Export Action**: Primary action button appears when images selected
- **Debug Mode**: Enabled to help troubleshoot selection issues
- **Visual Indicators**: Selected images should have visual feedback

The control bar appears when images are selected and provides batch operation controls.
        `
      }
    }
  }
};

/**
 * Horizontal carousel gallery with generous height for comfortable browsing.
 * Optimized for product displays and image selection workflows.
 */
export const HorizontalCarousel: Story = {
  args: {
    images: productImages,
    allowUpload: false,
    allowUrlInput: false,
    allowDelete: false,
    selectionMode: 'single',
    scrollDirection: 'horizontal',
    previewMode: false, // Allow control bar to show when image selected
    galleryTitle: 'Product Gallery',
    primaryActionText: 'Add to Cart',
    primaryActionIcon: 'shopping_cart',
    primaryActionValue: 'add-to-cart',
    background: 'opaque',
    frostControlBar: 'partial'
  },
  render: (args) => html`
    <div style="width: 100%; height: 500px; padding: 2rem; box-sizing: border-box; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px;">
      <spectrum-image-gallery
        .images=${args.images}
        allow-upload=${args.allowUpload}
        allow-url-input=${args.allowUrlInput}
        allow-delete=${args.allowDelete}
        selection-mode=${args.selectionMode}
        .selectedImages=${args.selectedImages}
        scroll-direction=${args.scrollDirection}
        preview-mode=${args.previewMode}
        background=${args.background}
        frost-control-bar=${args.frostControlBar}
        gallery-title=${args.galleryTitle}
        primary-action-text=${args.primaryActionText}
        primary-action-icon=${args.primaryActionIcon}
        primary-action-value=${args.primaryActionValue}
        @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
        @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
        @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
      ></spectrum-image-gallery>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Horizontal carousel with generous height (500px) for comfortable product browsing:
- **Increased Height**: 500px with 2rem padding for spacious layout
- **Product Focus**: Single selection perfect for shopping scenarios
- **Preview Mode**: Click images for full-size viewing
- **Custom Background**: Gradient background with rounded corners
- **Generous Spacing**: Proper proportions for product display

Perfect for product galleries, media carousels, and selection interfaces.
        `
      }
    }
  }
};

/**
 * Simple control bar demonstration to clearly show selection and control functionality.
 * Focuses on making the control bar and selection states highly visible.
 */
export const SimpleControlBar: Story = {
  args: {
    images: productImages,
    allowUpload: false,
    allowUrlInput: false,
    allowDelete: true,
    selectionMode: 'multi',
    selectedImages: ['prod-1', 'prod-2'], // Pre-select first two products
    scrollDirection: 'vertical',
    previewMode: false,
    galleryTitle: 'Select Products for Cart',
    primaryActionText: 'Add to Cart',
    primaryActionIcon: 'shopping_cart',
    primaryActionValue: 'add-to-cart',
    background: 'opaque',
    frostControlBar: 'partial',
    debug: true
  },
  render: (args) => html`
    <div style="width: 100%; max-width: 800px; margin: 0 auto; padding: 2rem; background: white; border: 2px solid #ddd; border-radius: 8px;">
      <h3 style="margin-bottom: 1rem; color: #333; text-align: center;">Control Bar Demo - 2 Products Pre-selected</h3>
      <p style="margin-bottom: 2rem; color: #666; text-align: center;">The control bar should appear at the bottom with "Add to Cart" button</p>
      <spectrum-image-gallery
        .images=${args.images}
        allow-upload=${args.allowUpload}
        allow-url-input=${args.allowUrlInput}
        allow-delete=${args.allowDelete}
        selection-mode=${args.selectionMode}
        .selectedImages=${args.selectedImages}
        scroll-direction=${args.scrollDirection}
        preview-mode=${args.previewMode}
        background=${args.background}
        frost-control-bar=${args.frostControlBar}
        gallery-title=${args.galleryTitle}
        primary-action-text=${args.primaryActionText}
        primary-action-icon=${args.primaryActionIcon}
        primary-action-value=${args.primaryActionValue}
        debug=${args.debug}
        @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
        @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
        @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
      ></spectrum-image-gallery>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Simple control bar demonstration with clear visibility:
- **Pre-selected Products**: Watch and headphones are pre-selected
- **Visible Control Bar**: Should appear at bottom with "Add to Cart" button
- **Clean Background**: White background for maximum contrast
- **Debug Mode**: Console logging enabled to trace selection
- **Multi-selection**: Click any product to add/remove from selection
- **Partial Frost**: Subtle frost effect on control bar

This story specifically focuses on demonstrating the control bar functionality.
        `
      }
    }
  }
};

/**
 * Preview mode comparison showing the critical difference between preview and management modes.
 * Demonstrates when control bars are visible vs hidden.
 */
export const PreviewModeComparison: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
      <div style="border: 2px solid #ddd; border-radius: 8px; padding: 1rem; background: white;">
        <h3 style="margin-bottom: 1rem; color: #333; text-align: center;">Management Mode (previewMode: false)</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.9rem; text-align: center;">✅ Control bar visible when images selected</p>
        <spectrum-image-gallery
          .images=${productImages}
          allow-upload="false"
          allow-url-input="false"
          allow-delete="true"
          selection-mode="multi"
          .selectedImages=${['prod-1', 'prod-2']}
          scroll-direction="vertical"
          preview-mode="false"
          gallery-title="Management Mode"
          primary-action-text="Add to Cart"
          primary-action-icon="shopping_cart"
          primary-action-value="add-to-cart"
          background="opaque"
          frost-control-bar="partial"
          @imageSelected=${(e: CustomEvent) => action('management-imageSelected')(e.detail)}
          @primaryAction=${(e: CustomEvent) => action('management-primaryAction')(e.detail)}
        ></spectrum-image-gallery>
      </div>
      
      <div style="border: 2px solid #ddd; border-radius: 8px; padding: 1rem; background: white;">
        <h3 style="margin-bottom: 1rem; color: #333; text-align: center;">Preview Mode (previewMode: true)</h3>
        <p style="margin-bottom: 1rem; color: #666; font-size: 0.9rem; text-align: center;">❌ Control bar hidden for viewing</p>
        <spectrum-image-gallery
          .images=${productImages}
          allow-upload="false"
          allow-url-input="false"
          allow-delete="true"
          selection-mode="multi"
          .selectedImages=${['prod-1', 'prod-2']}
          scroll-direction="vertical"
          preview-mode="true"
          gallery-title="Preview Mode"
          primary-action-text="Add to Cart"
          primary-action-icon="shopping_cart"
          primary-action-value="add-to-cart"
          background="opaque"
          frost-control-bar="partial"
          @imageSelected=${(e: CustomEvent) => action('preview-imageSelected')(e.detail)}
          @primaryAction=${(e: CustomEvent) => action('preview-primaryAction')(e.detail)}
        ></spectrum-image-gallery>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Critical behavior demonstration:

**Left (Management Mode - previewMode: false):**
- ✅ Control bar visible at bottom with "Add to Cart" button
- ✅ Selection indicators visible on images
- ✅ Management features enabled

**Right (Preview Mode - previewMode: true):**
- ❌ Control bar hidden for clean viewing
- ❌ Selection UI minimized
- ✅ Click images for full-size preview

Both galleries have the same selectedImages array, but only the left shows the control bar.
        `
      }
    }
  }
};

/**
 * Frosted control interface demonstrating advanced frost effects and overlay controls.
 * Shows maximum visual impact with full frost backgrounds and control elements.
 */
export const FrostedInterface: Story = {
  args: {
    images: sampleImages.slice(0, 6),
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    selectionMode: 'multi',
    selectedImages: ['img-1', 'img-3', 'img-5'], // Pre-select for control bar visibility
    scrollDirection: 'vertical',
    previewMode: false, // CRITICAL: Must be false to show control bar
    galleryTitle: 'Frosted Glass Interface',
    primaryActionText: 'Process Selection',
    primaryActionIcon: 'auto_fix_high',
    primaryActionValue: 'process',
    background: 'full-frost',
    frostControlBar: 'full',
    debug: true
  },
  render: (args) => html`
    <div style="width: 100%; height: 700px; padding: 1rem; box-sizing: border-box; background: url('https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?q=80&w=2070&auto=format&fit=crop') center/cover; border-radius: 12px;">
      <h3 style="margin-bottom: 1rem; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.7); text-align: center;">3 Images Pre-selected - Control Bar Should Be Visible</h3>
      <spectrum-image-gallery
        .images=${args.images}
        allow-upload=${args.allowUpload}
        allow-url-input=${args.allowUrlInput}
        allow-delete=${args.allowDelete}
        selection-mode=${args.selectionMode}
        .selectedImages=${args.selectedImages}
        scroll-direction=${args.scrollDirection}
        preview-mode=${args.previewMode}
        background=${args.background}
        frost-control-bar=${args.frostControlBar}
        gallery-title=${args.galleryTitle}
        primary-action-text=${args.primaryActionText}
        primary-action-icon=${args.primaryActionIcon}
        primary-action-value=${args.primaryActionValue}
        debug=${args.debug}
        @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
        @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
        @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
        @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
      ></spectrum-image-gallery>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
Frosted glass interface with maximum visual effects:
- **Full Frost Background**: Complete frosted glass effect over scenic background
- **Full Frost Control Bar**: Maximum overlay effect for controls
- **3 Pre-selected Images**: Mountain, waves, and stars are pre-selected
- **Scenic Background**: Beautiful landscape background to show frost transparency
- **Debug Mode**: Console logging to help troubleshoot selection
- **Height Increased**: 700px for better visibility

Demonstrates the gallery's advanced visual styling capabilities for premium interfaces.
        `
      }
    }
  }
};