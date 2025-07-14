import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumImageGallery, ImageConfig, SelectionMode, ScrollDirection, FrostLevel, BackgroundLevel } from '../../../../../core/src/components/spectrum-image-gallery/spectrum-image-gallery';

interface SpectrumImageGalleryArgs {
  images: ImageConfig[];
  allowUpload: boolean;
  allowUrlInput: boolean;
  allowDelete: boolean;
  selectionMode: SelectionMode;
  selectedImages: string[];
  scrollDirection: ScrollDirection;
  previewMode: boolean;
  background: BackgroundLevel;
  frostControlBar: FrostLevel;
  isLoading: boolean;
  debug: boolean;
  primaryActionText: string;
  primaryActionIcon: string;
  primaryActionValue: string;
}

// Beautiful Unsplash images for demo
const unsplashImages: ImageConfig[] = [
  {
    id: 'nature-1',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    alt: 'Mountain landscape with morning mist',
    title: 'Misty Mountains',
    metadata: { photographer: 'John Westrock', category: 'nature' },
  },
  {
    id: 'architecture-1',
    url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=500&fit=crop',
    alt: 'Modern glass building architecture',
    title: 'Glass Architecture',
    metadata: { photographer: 'John Schnobrich', category: 'architecture' },
  },
  {
    id: 'nature-2',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=700&fit=crop',
    alt: 'Ocean waves on sandy beach',
    title: 'Ocean Waves',
    metadata: { photographer: 'Sean Oulashin', category: 'nature' },
  },
  {
    id: 'urban-1',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop',
    alt: 'City skyline at sunset',
    title: 'Urban Sunset',
    metadata: { photographer: 'Cody Board', category: 'urban' },
  },
  {
    id: 'nature-3',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=550&fit=crop',
    alt: 'Forest path through trees',
    title: 'Forest Path',
    metadata: { photographer: 'Luke Stackpoole', category: 'nature' },
  },
  {
    id: 'abstract-1',
    url: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop',
    alt: 'Abstract geometric patterns',
    title: 'Geometric Abstract',
    metadata: { photographer: 'Hal Gatewood', category: 'abstract' },
  },
  {
    id: 'architecture-2',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=650&fit=crop',
    alt: 'Desert canyon landscape',
    title: 'Canyon Views',
    metadata: { photographer: 'David Marcu', category: 'nature' },
  },
  {
    id: 'urban-2',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=350&fit=crop',
    alt: 'City street with buildings',
    title: 'Urban Street',
    metadata: { photographer: 'Pedro Lastra', category: 'urban' },
  },
  {
    id: 'nature-4',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop',
    alt: 'Tall mountain peaks',
    title: 'Mountain Peaks',
    metadata: { photographer: 'John Westrock', category: 'nature' },
  },
  {
    id: 'minimal-1',
    url: 'https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?w=400&h=280&fit=crop',
    alt: 'Minimalist composition',
    title: 'Minimal Design',
    metadata: { photographer: 'Alex Shut', category: 'minimal' },
  },
  {
    id: 'nature-5',
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=600&fit=crop',
    alt: 'Serene lake reflection',
    title: 'Lake Reflection',
    metadata: { photographer: 'Simon Berger', category: 'nature' },
  },
  {
    id: 'architecture-3',
    url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=450&fit=crop',
    alt: 'Modern architectural details',
    title: 'Modern Lines',
    metadata: { photographer: 'Jason Blackeye', category: 'architecture' },
  },
  {
    id: 'nature-4k',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=3840&h=2160&fit=crop&q=80',
    alt: 'High resolution mountain landscape with morning mist - 4K',
    title: 'Misty Mountains (4K)',
    metadata: { photographer: 'John Westrock', category: 'nature', resolution: '4K' },
  },
  {
    id: 'architecture-4k',
    url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=3840&h=2160&fit=crop&q=80',
    alt: 'High resolution modern glass building architecture - 4K',
    title: 'Glass Architecture (4K)',
    metadata: { photographer: 'John Schnobrich', category: 'architecture', resolution: '4K' },
  },
  {
    id: 'urban-4k',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=3840&h=2160&fit=crop&q=80',
    alt: 'High resolution city skyline at sunset - 4K',
    title: 'Urban Sunset (4K)',
    metadata: { photographer: 'Cody Board', category: 'urban', resolution: '4K' },
  },
];

const meta: Meta<SpectrumImageGallery> = {
  title: 'Spectrum/Components/SpectrumImageGallery',
  component: 'spectrum-image-gallery',
  tags: ['autodocs'],
  args: {
    images: [],
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    selectionMode: 'single',
    selectedImages: [],
    scrollDirection: 'vertical',
    previewMode: false,
    background: 'opaque',
    frostControlBar: 'no',
    isLoading: false,
    debug: false,
    primaryActionText: '',
    primaryActionIcon: '',
    primaryActionValue: '',
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of image configurations to display in the gallery',
      table: {
        type: { summary: 'ImageConfig[]' },
        defaultValue: { summary: '[]' },
      },
    },
    allowUpload: {
      control: 'boolean',
      description: 'Enable file upload functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    allowUrlInput: {
      control: 'boolean',
      description: 'Enable URL input functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    allowDelete: {
      control: 'boolean',
      description: 'Enable image deletion functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multi'],
      description: 'Image selection behavior',
      table: {
        type: { summary: 'SelectionMode' },
        defaultValue: { summary: 'single' },
      },
    },
    selectedImages: {
      control: 'object',
      description: 'Array of selected image IDs',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    scrollDirection: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Gallery scroll direction and layout',
      table: {
        type: { summary: 'ScrollDirection' },
        defaultValue: { summary: 'vertical' },
      },
    },
    previewMode: {
      control: 'boolean',
      description: 'Enable preview mode - images open in modal instead of selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    background: {
      control: 'select',
      options: ['opaque', 'partial-frost', 'full-frost', 'transparent'],
      description: 'Background style for the gallery',
      table: {
        type: { summary: 'BackgroundLevel' },
        defaultValue: { summary: 'opaque' },
      },
    },
    frostControlBar: {
      control: 'select',
      options: ['no', 'partial', 'full'],
      description: 'Frost effect level for the control bar',
      table: {
        type: { summary: 'FrostLevel' },
        defaultValue: { summary: 'no' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    debug: {
      control: 'boolean',
      description: 'Debug mode indicator',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    primaryActionText: {
      control: 'text',
      description: 'Text for the primary action button (shown when images are selected)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    primaryActionIcon: {
      control: 'text',
      description: 'Icon for the primary action button (Material Icons name)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    primaryActionValue: {
      control: 'text',
      description: 'Value emitted when primary action is triggered (defaults to primaryActionText)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
} satisfies Meta<SpectrumImageGallery>;

export default meta;

const renderGallery = (args: SpectrumImageGalleryArgs) => html`
  <div style="height: 500px; width: 100%;">
    <spectrum-image-gallery
      .images=${args.images}
      .allowUpload=${args.allowUpload}
      .allowUrlInput=${args.allowUrlInput}
      .allowDelete=${args.allowDelete}
      .selectionMode=${args.selectionMode}
      .selectedImages=${args.selectedImages}
      .scrollDirection=${args.scrollDirection}
      .previewMode=${args.previewMode}
      .background=${args.background}
      .frostControlBar=${args.frostControlBar}
      .debug=${args.debug}
      .primaryActionText=${args.primaryActionText}
      .primaryActionIcon=${args.primaryActionIcon}
      .primaryActionValue=${args.primaryActionValue}
      @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
      @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
      @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
      @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
      @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
      @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
    ></spectrum-image-gallery>
  </div>
`;

export const Docs: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: [
      ...unsplashImages.slice(0, 2),
      ...unsplashImages.filter(img => img.id.includes('4k')).slice(0, 1),
      ...unsplashImages.slice(2, 6),
    ],
    selectionMode: 'multi',
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    previewMode: false,
    background: 'opaque',
    frostControlBar: 'no',
    primaryActionText: 'Export',
    primaryActionIcon: 'file_download',
    primaryActionValue: 'export-selected',
    debug: false,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: `
# Spectrum Image Gallery Documentation

A comprehensive image gallery component with selection, preview, upload, and management capabilities.

## Features

### Core Functionality
- **Masonry Layout**: Responsive CSS Grid with container queries
- **Image Upload**: File upload with drag & drop support
- **URL Input**: Add images directly from URLs with validation
- **Selection Modes**: Single, multi, or no selection
- **Preview Mode**: Full-screen image preview with navigation
- **Delete Operations**: Remove selected images with confirmation
- **Primary Actions**: Custom actions on selected images

### Visual Options
- **Background Styles**: Opaque, partial-frost, full-frost, or transparent
- **Control Bar Styling**: Independent frost effects for action bar
- **Scroll Directions**: Vertical masonry or horizontal scrolling
- **Responsive Design**: Mobile-first with container queries

## Basic Usage

\`\`\`tsx
import { SpectrumImageGallery } from '@unops-itg-npm/cpit-spectrum';

// Basic gallery
<spectrum-image-gallery
  .images={imageArray}
  selectionMode="multi"
  allowUpload={true}
  allowDelete={true}
/>

// Preview-only mode
<spectrum-image-gallery
  .images={imageArray}
  previewMode={true}
  background="transparent"
/>
\`\`\`

## Props Reference

### Image Management
- \`images\`: Array of ImageConfig objects with id, url, alt, title, metadata
- \`allowUpload\`: Enable file upload functionality (default: true)
- \`allowUrlInput\`: Enable URL input functionality (default: true)
- \`allowDelete\`: Enable image deletion (default: true)

### Selection & Interaction
- \`selectionMode\`: 'single' | 'multi' | 'none' (default: 'single')
- \`selectedImages\`: Array of selected image IDs
- \`previewMode\`: Click to preview instead of select (default: false)

### Layout & Appearance
- \`scrollDirection\`: 'vertical' | 'horizontal' (default: 'vertical')
- \`background\`: 'opaque' | 'partial-frost' | 'full-frost' | 'transparent' (default: 'opaque')
- \`frostControlBar\`: 'no' | 'partial' | 'full' (default: 'no')

### Primary Actions
- \`primaryActionText\`: Text for primary action button
- \`primaryActionIcon\`: Material icon name for primary action
- \`primaryActionValue\`: Custom value emitted with primary action

### Development
- \`debug\`: Enable console logging for debugging (default: false)

## Events

\`\`\`tsx
<spectrum-image-gallery
  @imageSelected={(e) => console.log('Selected:', e.detail)}
  @imageDeselect={(e) => console.log('Deselected:', e.detail)}
  @imageAdded={(e) => console.log('Added:', e.detail)}
  @imageDeleted={(e) => console.log('Deleted:', e.detail)}
  @imagePreview={(e) => console.log('Previewing:', e.detail)}
  @primaryAction={(e) => console.log('Primary action:', e.detail)}
/>
\`\`\`

## Image Configuration

\`\`\`tsx
interface ImageConfig {
  id: string;              // Unique identifier
  url: string;             // Image URL (data URLs supported)
  alt?: string;            // Alt text for accessibility
  title?: string;          // Display title
  metadata?: any;          // Custom metadata object
}
\`\`\`

## Background Styles

- **Opaque**: Standard solid background with border and shadow
- **Partial**: 33% frost effect with blur for subtle transparency
- **Full**: 66% frost effect with heavy blur for glass appearance
- **Transparent**: No background, border, or shadow (overlay use)

## Best Practices

1. **Performance**: For large galleries, consider lazy loading and pagination
2. **Accessibility**: Always provide alt text for images
3. **Mobile**: Test on various screen sizes - component is fully responsive
4. **Events**: Handle all events for proper state management
5. **4K Images**: Component handles high-resolution images gracefully
6. **Primary Actions**: Use for bulk operations like export, share, or organize

## Preview Mode Features

- Full-screen modal with keyboard navigation (arrow keys, escape)
- Secondary spectrum buttons for close, previous, next
- Image counter (X of Y) when multiple images
- Preserves aspect ratio with viewport-fit sizing
- Touch-friendly navigation on mobile devices
        `,
      },
    },
  },
};

const renderFullscreenGallery = (args: SpectrumImageGalleryArgs, backgroundImage: string) => html`
  <div style="
    height: 100vh; 
    width: 100vw; 
    position: fixed;
    top: 0;
    left: 0;
    background-image: url('${backgroundImage}');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    box-sizing: border-box;
  ">
    <div style="
      width: 100%;
      max-width: 1200px;
      height: 80vh;
      max-height: 800px;
    ">
    <spectrum-image-gallery
      .images=${args.images}
      .allowUpload=${args.allowUpload}
      .allowUrlInput=${args.allowUrlInput}
      .allowDelete=${args.allowDelete}
      .selectionMode=${args.selectionMode}
      .selectedImages=${args.selectedImages}
      .scrollDirection=${args.scrollDirection}
      .previewMode=${args.previewMode}
        .background=${args.background}
        .frostControlBar=${args.frostControlBar}
      .debug=${args.debug}
        .primaryActionText=${args.primaryActionText}
        .primaryActionIcon=${args.primaryActionIcon}
        .primaryActionValue=${args.primaryActionValue}
      @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
      @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
      @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
      @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
      @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
        @primaryAction=${(e: CustomEvent) => action('primaryAction')(e.detail)}
    ></spectrum-image-gallery>
    </div>
  </div>
`;

export const Default: StoryObj<SpectrumImageGalleryArgs> = {
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Default empty gallery showing the clean initial state with upload and URL input options available.',
      },
    },
  },
};

export const WithImages: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery populated with beautiful Unsplash images demonstrating the masonry layout with varied image dimensions, including 4K high-resolution images.',
      },
    },
  },
};

export const HighResolution4K: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: [
      ...unsplashImages.slice(0, 3),
      ...unsplashImages.filter(img => img.id.includes('4k')),
      ...unsplashImages.slice(3, 6),
    ],
    selectionMode: 'single',
    previewMode: true,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery featuring 4K high-resolution images (3840x2160) mixed with standard images. Enable preview mode to see how the component handles large images with navigation controls.',
      },
    },
  },
};

export const SingleSelect: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 8),
    selectionMode: 'single',
    selectedImages: ['nature-1'],
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with single-selection mode enabled. Only one image can be selected at a time.',
      },
    },
  },
};

export const MultiSelect: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 8),
    selectionMode: 'multi',
    selectedImages: ['nature-1', 'architecture-1', 'nature-3'],
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with multi-selection enabled and some images pre-selected.',
      },
    },
  },
};

export const FrostBackgroundPartial: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    selectionMode: 'multi',
    background: 'partial-frost',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gallery with partial frost background effect (45% white tint) on a mountain landscape. The gallery has a noticeable white tint that allows the background to show through.',
      },
    },
  },
};

export const FrostBackgroundFull: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    selectionMode: 'multi',
    background: 'full-frost',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gallery with full frost background effect (blur + subtle tint) on a mountain landscape. The gallery has a beautiful frosted glass appearance with backdrop blur.',
      },
    },
  },
};

export const FrostControlBarPartial: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 15),
    selectionMode: 'multi',
    frostControlBar: 'partial',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gallery with partial frost control bar effect (45% white tint) on a forest landscape. Only the control bar has a noticeable white tint while the gallery content remains clear.',
      },
    },
  },
};

export const FrostControlBarFull: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 15),
    selectionMode: 'multi',
    frostControlBar: 'full',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gallery with full frost control bar effect (blur + subtle tint) on a forest landscape. Only the control bar has the enhanced frost effect with blur and translucency.',
      },
    },
  },
};

export const MatchingFrostLevels: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    selectionMode: 'multi',
    background: 'full-frost',
    frostControlBar: 'full',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gallery with matching frost levels for both background and control bar. Notice how the control bar has square edges when both frost settings match, creating a seamless appearance.',
      },
    },
  },
};

export const DifferentFrostLevels: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    selectionMode: 'multi',
    background: 'partial-frost',
    frostControlBar: 'full',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gallery with different frost levels for background (partial-frost) and control bar (full). The control bar has rounded edges when frost settings differ, creating visual separation.',
      },
    },
  },
};

export const HorizontalLayout: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 15),
    selectionMode: 'multi',
    scrollDirection: 'horizontal',
    frostControlBar: 'full',
  },
  render: (args: SpectrumImageGalleryArgs) => renderFullscreenGallery(args, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Horizontal image gallery with frost control bar effect. The right-side control bar has the enhanced frost effect while the horizontal scrolling gallery content remains clear.',
      },
    },
  },
};

export const PrimaryActionTextOnly: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 10),
    selectionMode: 'multi',
    selectedImages: ['nature-1', 'architecture-1'],
    primaryActionText: 'Download',
    primaryActionValue: 'download-selected',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with primary action button (text only) that appears when images are selected. The primary action button appears before the delete button.',
      },
    },
  },
};

export const PrimaryActionWithIcon: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 10),
    selectionMode: 'multi',
    selectedImages: ['nature-1', 'architecture-1', 'nature-3'],
    primaryActionText: 'Share',
    primaryActionIcon: 'share',
    primaryActionValue: 'share-images',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with primary action button including both text and icon. The share icon appears alongside the text when images are selected.',
      },
    },
  },
};

export const PrimaryActionBulkOperations: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 8),
    selectionMode: 'multi',
    selectedImages: ['nature-1', 'architecture-1', 'nature-3', 'urban-1'],
    primaryActionText: 'Add to Album',
    primaryActionIcon: 'photo_library',
    primaryActionValue: 'add-to-album',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery configured for bulk operations with primary action for adding selected images to an album. Shows how primary action can be used for organizational features.',
      },
    },
  },
};

export const PrimaryActionWorkflow: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    selectionMode: 'multi',
    selectedImages: ['nature-1', 'architecture-1'],
    primaryActionText: 'Process',
    primaryActionIcon: 'auto_fix_high',
    primaryActionValue: 'process-images',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with primary action for image processing workflow. Demonstrates how the primary action can trigger complex operations on selected images.',
      },
    },
  },
};

 