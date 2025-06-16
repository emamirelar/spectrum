import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';

// @ts-ignore because VSCode does not understand imports within Lerna monorepos
import type { SpectrumImageGallery, ImageConfig, SelectionMode, ScrollDirection } from '../../../../../core/src/components/spectrum-image-gallery/spectrum-image-gallery';

interface SpectrumImageGalleryArgs {
  images: ImageConfig[];
  allowUpload: boolean;
  allowUrlInput: boolean;
  allowDelete: boolean;
  selectionMode: SelectionMode;
  selectedImages: string[];
  scrollDirection: ScrollDirection;
  previewMode: boolean;
  frostBackground: boolean;
  isLoading: boolean;
  debug: boolean;
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
  // Additional images for better scrolling demonstration
  {
    id: 'nature-6',
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=500&fit=crop',
    alt: 'Tropical lake surrounded by mountains',
    title: 'Tropical Paradise',
    metadata: { photographer: 'Janusz Maniak', category: 'nature' },
  },
  {
    id: 'architecture-4',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=700&fit=crop',
    alt: 'Skyscrapers reaching into the sky',
    title: 'Reaching Heights',
    metadata: { photographer: 'Varun Yadav', category: 'architecture' },
  },
  {
    id: 'nature-7',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=350&fit=crop',
    alt: 'Golden sunset through forest',
    title: 'Golden Hour',
    metadata: { photographer: 'John Fowler', category: 'nature' },
  },
  {
    id: 'urban-3',
    url: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=400&h=600&fit=crop',
    alt: 'City lights at night',
    title: 'Night Lights',
    metadata: { photographer: 'Marc-Olivier Jodoin', category: 'urban' },
  },
  {
    id: 'nature-8',
    url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=450&fit=crop',
    alt: 'Snow-capped mountain peaks',
    title: 'Alpine Views',
    metadata: { photographer: 'John Fowler', category: 'nature' },
  },
  {
    id: 'architecture-5',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=550&fit=crop',
    alt: 'Modern curved building facade',
    title: 'Curved Lines',
    metadata: { photographer: 'Denys Nevozhai', category: 'architecture' },
  },
  {
    id: 'nature-9',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=320&fit=crop',
    alt: 'Peaceful mountain valley',
    title: 'Valley Serenity',
    metadata: { photographer: 'John Westrock', category: 'nature' },
  },
  {
    id: 'urban-4',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=650&fit=crop',
    alt: 'Busy city intersection',
    title: 'Urban Flow',
    metadata: { photographer: 'Denys Nevozhai', category: 'urban' },
  },
  {
    id: 'nature-10',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=400&fit=crop',
    alt: 'Misty forest landscape',
    title: 'Forest Mist',
    metadata: { photographer: 'Sebastian Unrau', category: 'nature' },
  },
  {
    id: 'architecture-6',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=480&fit=crop',
    alt: 'Glass building reflections',
    title: 'Glass Reflections',
    metadata: { photographer: 'Joel Filipe', category: 'architecture' },
  },
  {
    id: 'nature-11',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=700&fit=crop',
    alt: 'Mountain landscape panorama',
    title: 'Panoramic Views',
    metadata: { photographer: 'John Westrock', category: 'nature' },
  },
  {
    id: 'urban-5',
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=380&fit=crop',
    alt: 'City bridge at dusk',
    title: 'Bridge at Dusk',
    metadata: { photographer: 'Gautier Salles', category: 'urban' },
  },
  {
    id: 'nature-12',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=620&fit=crop',
    alt: 'Desert sand dunes',
    title: 'Desert Dunes',
    metadata: { photographer: 'David Marcu', category: 'nature' },
  },
  {
    id: 'architecture-7',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=350&fit=crop',
    alt: 'Minimalist building design',
    title: 'Minimal Architecture',
    metadata: { photographer: 'Pedro Lastra', category: 'architecture' },
  },
  {
    id: 'nature-13',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=800&fit=crop',
    alt: 'Waterfall in tropical forest',
    title: 'Tropical Falls',
    metadata: { photographer: 'Luke Stackpoole', category: 'nature' },
  },
  {
    id: 'urban-6',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=450&fit=crop',
    alt: 'Street art mural',
    title: 'Street Art',
    metadata: { photographer: 'Pedro Lastra', category: 'urban' },
  },
  {
    id: 'nature-14',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=320&fit=crop',
    alt: 'Rocky coastline waves',
    title: 'Coastal Rocks',
    metadata: { photographer: 'Sean Oulashin', category: 'nature' },
  },
  {
    id: 'architecture-8',
    url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=600&fit=crop',
    alt: 'Historic building facade',
    title: 'Historic Architecture',
    metadata: { photographer: 'John Schnobrich', category: 'architecture' },
  },
  {
    id: 'nature-15',
    url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=480&fit=crop',
    alt: 'Autumn forest colors',
    title: 'Autumn Colors',
    metadata: { photographer: 'Simon Berger', category: 'nature' },
  },
  {
    id: 'urban-7',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=420&fit=crop',
    alt: 'Urban park landscape',
    title: 'City Park',
    metadata: { photographer: 'Cody Board', category: 'urban' },
  },
  {
    id: 'nature-16',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=550&fit=crop',
    alt: 'Desert sunset landscape',
    title: 'Desert Sunset',
    metadata: { photographer: 'David Marcu', category: 'nature' },
  },
  {
    id: 'architecture-9',
    url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=380&fit=crop',
    alt: 'Contemporary office building',
    title: 'Modern Office',
    metadata: { photographer: 'Jason Blackeye', category: 'architecture' },
  },
  {
    id: 'nature-17',
    url: 'https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?w=400&h=650&fit=crop',
    alt: 'Prairie grassland horizon',
    title: 'Prairie Horizon',
    metadata: { photographer: 'Alex Shut', category: 'nature' },
  },
  {
    id: 'urban-8',
    url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
    alt: 'Busy marketplace scene',
    title: 'Urban Market',
    metadata: { photographer: 'Pedro Lastra', category: 'urban' },
  },
  {
    id: 'nature-18',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=720&fit=crop',
    alt: 'Redwood forest giants',
    title: 'Forest Giants',
    metadata: { photographer: 'Luke Stackpoole', category: 'nature' },
  },
];

const meta = {
  title: 'Spectrum/Components/SpectrumImageGallery',
  component: 'spectrum-image-gallery',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A beautiful, responsive image gallery component with masonry and horizontal layouts. Features modal-based image upload, URL input, selection capabilities, and delete functionality.

**Key Features:**
- Masonry Layout: Pinterest-style vertical masonry using CSS columns
- Horizontal Scrolling: Linear horizontal layout for carousels and strips  
- File Upload: Modal-based drag & drop and file browser upload
- URL Input: Add images from external URLs with validation
- Selection Modes: Single select, multi-select, or no selection
- Delete Functionality: Remove selected images
- Event System: Rich events with complete image data
- Responsive Design: Adapts seamlessly to different screen sizes
- Accessibility: Full keyboard navigation and screen reader support
- Spectrum Theming: Consistent with Spectrum design patterns

**Upload Functionality:**
When users upload files, they are converted to base64 data URLs using FileReader for immediate display. Images appear instantly in the gallery with rich metadata including filename, size, type, and upload timestamp. Complete image data is emitted via imageAdded event. Images exist only in component state and are lost on page refresh.

**Event System:**
The imageAdded event is emitted when images are uploaded or added via URL. The imageSelected and imageDeselect events are emitted when images are selected/deselected and return ImageConfig objects directly.

**Important Notes:**
- No Persistence: Images are stored temporarily in component state only
- Client-Side Only: No server communication - parent must handle persistence  
- Base64 Storage: Uploaded images are converted to data URLs for immediate use
- Event-Driven: Use events to sync with external state management or APIs
        `,
      },
    },
  },
  args: {
    images: [],
    allowUpload: true,
    allowUrlInput: true,
    allowDelete: true,
    selectionMode: 'single',
    selectedImages: [],
    scrollDirection: 'vertical',
    previewMode: false,
    frostBackground: false,
    isLoading: false,
    debug: false,
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
      description: 'Enable file upload modal functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    allowUrlInput: {
      control: 'boolean',
      description: 'Enable URL input modal functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    allowDelete: {
      control: 'boolean',
      description: 'Enable delete functionality',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multi', 'none'],
      description: 'Image selection behavior mode',
      table: {
        type: { summary: "'single' | 'multi' | 'none'" },
        defaultValue: { summary: "'single'" },
      },
    },
    selectedImages: {
      control: 'object',
      description: 'Array of selected image IDs for controlled selection',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    scrollDirection: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Gallery layout and scroll direction',
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: "'vertical'" },
      },
    },
    previewMode: {
      control: 'boolean',
      description: 'Enable preview mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    frostBackground: {
      control: 'boolean',
      description: 'Enable frost background effect for the entire gallery',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
  },
} satisfies Meta<SpectrumImageGallery>;

export default meta;

const renderGallery = (args: SpectrumImageGalleryArgs) => html`
  <div style="height: 500px; width: 100%; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
    <spectrum-image-gallery
      .images=${args.images}
      .allowUpload=${args.allowUpload}
      .allowUrlInput=${args.allowUrlInput}
      .allowDelete=${args.allowDelete}
      .selectionMode=${args.selectionMode}
      .selectedImages=${args.selectedImages}
      .scrollDirection=${args.scrollDirection}
      .previewMode=${args.previewMode}
      .debug=${args.debug}
      @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
      @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
      @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
      @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
      @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
    ></spectrum-image-gallery>
  </div>
`;

const renderScrollableGallery = (args: SpectrumImageGalleryArgs) => html`
  <div style="height: 400px; width: 100%; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
    <spectrum-image-gallery
      .images=${args.images}
      .allowUpload=${args.allowUpload}
      .allowUrlInput=${args.allowUrlInput}
      .allowDelete=${args.allowDelete}
      .selectionMode=${args.selectionMode}
      .selectedImages=${args.selectedImages}
      .scrollDirection=${args.scrollDirection}
      .previewMode=${args.previewMode}
      .debug=${args.debug}
      @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
      @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
      @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
      @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
      @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
    ></spectrum-image-gallery>
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
        story: 'Gallery populated with beautiful Unsplash images demonstrating the masonry layout with varied image dimensions. Notice how the controls stick to the bottom during scrolling.',
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
        story: 'Gallery with single-selection mode enabled. Only one image can be selected at a time. Click images to see selection behavior.',
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
        story: 'Gallery with multi-selection enabled and some images pre-selected. Click images to see selection indicators and multiple selection behavior.',
      },
    },
  },
};

export const NoSelection: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 8),
    selectionMode: 'none',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with no selection capability. Images are not clickable and show no interactive selection states. Perfect for display-only use cases.',
      },
    },
  },
};

export const UploadOnly: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 6),
    allowUpload: true,
    allowUrlInput: false,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with only file upload enabled. The URL input modal is disabled, showing only the upload button.',
      },
    },
  },
};

export const UrlInputOnly: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 4),
    allowUpload: false,
    allowUrlInput: true,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with only URL input enabled. The file upload modal is disabled, showing only the URL input button.',
      },
    },
  },
};

export const ReadOnly: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 10),
    allowUpload: false,
    allowUrlInput: false,
    selectionMode: 'none',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Complete read-only gallery with no upload, URL input, or selection capabilities. Images are purely for display with no interactive elements.',
      },
    },
  },
};

export const ResponsiveDemo: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages,
    selectionMode: 'multi',
  },
  render: (args: SpectrumImageGalleryArgs) => html`
    <div style="height: 500px; width: 100%; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; resize: both; min-width: 300px; min-height: 300px;">
      <spectrum-image-gallery
        .images=${args.images}
        .allowUpload=${args.allowUpload}
        .allowUrlInput=${args.allowUrlInput}
        .selectionMode=${args.selectionMode}
        .selectedImages=${args.selectedImages}
        @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
        @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
        @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
        @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
      ></spectrum-image-gallery>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Resizable container demonstrating responsive behavior. Drag the corner to resize and see how the masonry layout adapts from 1-5 columns based on available space. Controls remain sticky at the bottom.',
      },
    },
  },
};

export const EventHandling: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 8),
    selectionMode: 'multi',
  },
  render: (args: SpectrumImageGalleryArgs) => html`
    <div>
      <div style="margin-bottom: 16px; padding: 12px; background: #f0f8ff; border-radius: 8px; border-left: 4px solid #0070d2;">
        <strong>Event Handling Demo:</strong> 
        Check the Actions panel below to see events fired when interacting with the gallery.
        Try selecting images, uploading files, adding URLs, or deleting selected images.
        <br><strong>Events:</strong> imageSelected, imageDeselect, imageAdded, and imageDeleted events with complete data payloads.
      </div>
      <div style="height: 500px; width: 100%; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <spectrum-image-gallery
          .images=${args.images}
          .allowUpload=${args.allowUpload}
          .allowUrlInput=${args.allowUrlInput}
          .selectionMode=${args.selectionMode}
          .selectedImages=${args.selectedImages}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
          @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        ></spectrum-image-gallery>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all events emitted by the gallery component. Check the Actions panel to see detailed event information including imageSelected, imageDeselect, imageAdded, and imageDeleted events with complete data payloads.',
      },
    },
  },
};

export const NatureCollection: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.filter(img => img.metadata?.category === 'nature'),
    selectionMode: 'multi',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Curated collection of nature photography demonstrating the gallery with thematically related content. Shows how the masonry layout works with varied natural landscape images.',
      },
    },
  },
};

export const ArchitectureCollection: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: [
      ...unsplashImages.filter(img => img.metadata?.category === 'architecture'),
      ...unsplashImages.filter(img => img.metadata?.category === 'urban'),
    ],
    selectionMode: 'single',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Collection of architectural and urban photography with single-select mode enabled. Only one image can be selected at a time, perfect for choosing a single architectural reference.',
      },
    },
  },
};

export const HorizontalScrolling: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages,
    scrollDirection: 'horizontal',
  },
  render: renderScrollableGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery with horizontal scrolling layout and 30 images. Images are displayed in a single row with fixed height and variable width. Notice how the controls are positioned on the right side. Scroll horizontally to see all images.',
      },
    },
  },
};

export const HorizontalWithSelection: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 20),
    scrollDirection: 'horizontal',
    selectionMode: 'multi',
    selectedImages: ['nature-1', 'urban-1'],
  },
  render: renderScrollableGallery,
  parameters: {
    docs: {
      description: {
        story: 'Horizontal scrolling gallery with multi-selection enabled and 20 images. Perfect for image carousels where users need to select multiple items. Scroll to see all images.',
      },
    },
  },
};

export const HorizontalEmpty: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    scrollDirection: 'horizontal',
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Empty horizontal gallery showing the initial state with controls positioned on the right side.',
      },
    },
  },
};

export const VerticalScrollingDemo: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages,
    scrollDirection: 'vertical',
    selectionMode: 'single',
  },
  render: renderScrollableGallery,
  parameters: {
    docs: {
      description: {
        story: 'Vertical masonry layout with 30 images demonstrating vertical scrolling behavior. The masonry columns adapt to the content and create a natural flow. Scroll down to see all images.',
      },
    },
  },
};

export const ScrollDirectionComparison: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 15),
    selectionMode: 'single',
  },
  render: (args: SpectrumImageGalleryArgs) => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; height: 450px;">
      <div style="border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <h4 style="margin: 0; padding: 12px; background: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Vertical (Masonry) - Scroll Down</h4>
        <spectrum-image-gallery
          .images=${args.images}
          .allowUpload=${false}
          .allowUrlInput=${false}
          .selectionMode=${args.selectionMode}
          .scrollDirection=${'vertical'}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
          @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        ></spectrum-image-gallery>
      </div>
      <div style="border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <h4 style="margin: 0; padding: 12px; background: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Horizontal - Scroll Right</h4>
        <spectrum-image-gallery
          .images=${args.images}
          .allowUpload=${false}
          .allowUrlInput=${false}
          .selectionMode=${args.selectionMode}
          .scrollDirection=${'horizontal'}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
          @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
        ></spectrum-image-gallery>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of vertical masonry layout versus horizontal scrolling layout with 15 images each. Try scrolling in both directions to see the different behaviors.',
      },
    },
  },
};

export const PreviewMode: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    previewMode: true,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Gallery in preview mode where clicking images opens an enlarged modal view instead of selecting them. Upload and delete controls are hidden. Click any image to see the preview modal with smooth animations.',
      },
    },
  },
};

export const PreviewModeHorizontal: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 15),
    previewMode: true,
    scrollDirection: 'horizontal',
  },
  render: renderScrollableGallery,
  parameters: {
    docs: {
      description: {
        story: 'Horizontal gallery in preview mode. Perfect for image carousels where users can scroll through images and click to see detailed previews.',
      },
    },
  },
};

export const PreviewModeNatureCollection: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.filter(img => img.metadata?.category === 'nature'),
    previewMode: true,
  },
  render: renderGallery,
  parameters: {
    docs: {
      description: {
        story: 'Nature photography collection in preview mode. Each image opens in an enlarged modal view with optional captions. Check the Actions panel to see imagePreview events.',
      },
    },
  },
};

export const PreviewModeComparison: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 8),
  },
  render: (args: SpectrumImageGalleryArgs) => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; height: 500px;">
      <div style="border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <h4 style="margin: 0; padding: 12px; background: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Selection Mode</h4>
        <spectrum-image-gallery
          .images=${args.images}
          .allowUpload=${false}
          .allowUrlInput=${false}
          .selectionMode=${'single'}
          .previewMode=${false}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
        ></spectrum-image-gallery>
      </div>
      <div style="border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden;">
        <h4 style="margin: 0; padding: 12px; background: #f5f5f5; border-bottom: 1px solid #e0e0e0;">Preview Mode</h4>
        <spectrum-image-gallery
          .images=${args.images}
          .allowUpload=${false}
          .allowUrlInput=${false}
          .previewMode=${true}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
        ></spectrum-image-gallery>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of selection mode versus preview mode. Left side shows normal selection behavior, right side shows preview modal behavior when clicking images.',
      },
    },
  },
};

export const OnWallpaper: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 12),
    selectionMode: 'multi',
    frostBackground: true,
  },
  render: (args: SpectrumImageGalleryArgs) => html`
    <div style="
      height: 100vh; 
      width: 100vw; 
      position: fixed;
      top: 0;
      left: 0;
      background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop');
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
          .frostBackground=${args.frostBackground}
          .debug=${args.debug}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
          @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
          @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
        ></spectrum-image-gallery>
      </div>
    </div>
  `,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Image gallery with frost background effect displayed on a full-screen mountain landscape. The entire gallery has a semi-transparent frosted glass appearance with backdrop blur, making it beautifully visible against the background while maintaining full functionality.',
      },
    },
  },
};

export const OnWallpaperPreviewMode: StoryObj<SpectrumImageGalleryArgs> = {
  args: {
    images: unsplashImages.slice(0, 15),
    previewMode: true,
    scrollDirection: 'horizontal',
    frostBackground: true,
  },
  render: (args: SpectrumImageGalleryArgs) => html`
    <div style="
      height: 100vh; 
      width: 100vw; 
      position: fixed;
      top: 0;
      left: 0;
      background-image: url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop');
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
        max-height: 600px;
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
          .frostBackground=${args.frostBackground}
          .debug=${args.debug}
          @imageSelected=${(e: CustomEvent) => action('imageSelected')(e.detail)}
          @imageDeselect=${(e: CustomEvent) => action('imageDeselect')(e.detail)}
          @imageAdded=${(e: CustomEvent) => action('imageAdded')(e.detail)}
          @imageDeleted=${(e: CustomEvent) => action('imageDeleted')(e.detail)}
          @imagePreview=${(e: CustomEvent) => action('imagePreview')(e.detail)}
        ></spectrum-image-gallery>
      </div>
    </div>
  `,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Horizontal image gallery in preview mode with frost background effect on a full-screen forest landscape. The entire gallery has a beautiful frosted glass appearance. Click any image to see the preview modal with smooth animations.',
      },
    },
  },
}; 