import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

/**
 * # Spectrum Media Library
 * 
 * A comprehensive media library component that displays images and videos in a scrollable, responsive grid with an integrated lightbox viewer.
 * 
 * ## Features
 * 
 * - **Configurable Container**: Set custom width and height for the library
 * - **Thumbnail Sizes**: Choose from preset sizes (small, medium, large) or custom dimensions
 * - **Multi-Media Support**: Display images and videos (YouTube, Vimeo, direct links)
 * - **Auto-Thumbnail Extraction**: Automatically extracts YouTube video thumbnails
 * - **Interactive Lightbox**: Full-screen viewer with navigation and captions
 * - **Keyboard Navigation**: Arrow keys for navigation, Escape to close
 * - **Accessibility**: WCAG 2.1 AA compliant with ARIA support
 * - **Responsive**: Mobile-optimized with touch support
 * 
 * ## Use Cases
 * 
 * - Photo galleries and portfolios
 * - Video libraries and courses
 * - Media asset management
 * - Documentation with visual content
 * - Product showcases
 * 
 * @component spectrum-media-library
 * @status stable
 * @since 1.0.0
 */

const meta: Meta = {
  title: 'Spectrum/Components/SpectrumMediaLibrary',
  component: 'spectrum-media-library',
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive media library component with lightbox viewer, supporting both images and videos from multiple sources.',
      },
    },
  },
  argTypes: {
    mediaItems: {
      control: 'object',
      description: 'Array of media items or JSON string representing the media items',
      table: {
        type: { summary: 'MediaItem[] | string' },
        defaultValue: { summary: '[]' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the media library container (CSS units)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'text',
      description: 'Height of the media library container (CSS units)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '400px' },
      },
    },
    thumbnailSize: {
      control: 'select',
      options: ['small', 'medium', 'large', '180px'],
      description: 'Thumbnail size preset or custom size',
      table: {
        type: { summary: "'small' | 'medium' | 'large' | string" },
        defaultValue: { summary: 'medium' },
      },
    },
    horizontal: {
      control: 'boolean',
      description: 'Enable horizontal scrolling (otherwise vertical)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between thumbnails (CSS units)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '1rem' },
      },
    },
    enableLightbox: {
      control: 'boolean',
      description: 'Enable lightbox on thumbnail click',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showCaptions: {
      control: 'boolean',
      description: 'Show captions in lightbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    enableKeyboardNav: {
      control: 'boolean',
      description: 'Enable keyboard navigation in lightbox',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Sample image URLs (using picsum.photos for demo)
const sampleImages = [
  {
    id: 'img1',
    type: 'image' as const,
    url: 'https://picsum.photos/800/600?random=1',
    altText: 'Beautiful landscape with mountains',
    caption: 'Majestic mountain peaks at sunset',
  },
  {
    id: 'img2',
    type: 'image' as const,
    url: 'https://picsum.photos/800/600?random=2',
    altText: 'Ocean waves on beach',
    caption: 'Crystal clear ocean waters',
  },
  {
    id: 'img3',
    type: 'image' as const,
    url: 'https://picsum.photos/800/600?random=3',
    altText: 'Forest with tall trees',
    caption: 'Dense forest in autumn colors',
  },
  {
    id: 'img4',
    type: 'image' as const,
    url: 'https://picsum.photos/800/600?random=4',
    altText: 'City skyline at night',
    caption: 'Urban skyline illuminated',
  },
  {
    id: 'img5',
    type: 'image' as const,
    url: 'https://picsum.photos/800/600?random=5',
    altText: 'Desert dunes',
    caption: 'Golden sand dunes at dawn',
  },
];

// Sample videos (YouTube examples)
const sampleVideos = [
  {
    id: 'vid1',
    type: 'video' as const,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    altText: 'Sample video 1',
    caption: 'Never Gonna Give You Up',
    platform: 'youtube' as const,
  },
  {
    id: 'vid2',
    type: 'video' as const,
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    altText: 'Sample video 2',
    caption: 'Gangnam Style',
    platform: 'youtube' as const,
  },
];

// Mixed media library
const mixedMedia = [
  ...sampleImages.slice(0, 3),
  sampleVideos[0],
  sampleImages[3],
  sampleVideos[1],
  sampleImages[4],
];

/**
 * Default media library with images and videos in horizontal layout.
 */
export const Default: Story = {
  args: {
    mediaItems: mixedMedia,
    width: '100%',
    height: '400px',
    thumbnailSize: 'medium',
    horizontal: true,
    gap: '1rem',
    enableLightbox: true,
    showCaptions: true,
    enableKeyboardNav: true,
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
      gap=${args.gap}
      ?enable-lightbox=${args.enableLightbox}
      ?show-captions=${args.showCaptions}
      ?enable-keyboard-nav=${args.enableKeyboardNav}
      @mediaAction=${(e: CustomEvent) => console.log('Media action:', e.detail)}
    ></spectrum-media-library>
  `,
};

/**
 * Image-only gallery with large thumbnails in a grid layout.
 */
export const ImageGallery: Story = {
  args: {
    mediaItems: sampleImages,
    width: '100%',
    height: '500px',
    thumbnailSize: 'large',
    horizontal: true,
    gap: '1.5rem',
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
      gap=${args.gap}
    ></spectrum-media-library>
  `,
};

/**
 * Video library with YouTube videos showing automatic thumbnail extraction.
 */
export const VideoLibrary: Story = {
  args: {
    mediaItems: sampleVideos,
    width: '100%',
    height: '300px',
    thumbnailSize: 'medium',
    horizontal: true,
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
    ></spectrum-media-library>
  `,
};

/**
 * Vertical scrolling layout for sidebar or narrow containers.
 */
export const VerticalLayout: Story = {
  args: {
    mediaItems: sampleImages.slice(0, 5),
    width: '300px',
    height: '600px',
    thumbnailSize: 'medium',
    horizontal: false,
    gap: '1rem',
  },
  render: (args) => html`
    <div style="display: flex; justify-content: center;">
      <spectrum-media-library
        .mediaItems=${args.mediaItems}
        width=${args.width}
        height=${args.height}
        thumbnail-size=${args.thumbnailSize}
        ?horizontal=${args.horizontal}
        gap=${args.gap}
      ></spectrum-media-library>
    </div>
  `,
};

/**
 * Small thumbnails for compact displays or many items.
 */
export const SmallThumbnails: Story = {
  args: {
    mediaItems: mixedMedia,
    width: '100%',
    height: '250px',
    thumbnailSize: 'small',
    horizontal: true,
    gap: '0.5rem',
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
      gap=${args.gap}
    ></spectrum-media-library>
  `,
};

/**
 * Custom thumbnail size with specific pixel dimensions.
 */
export const CustomThumbnailSize: Story = {
  args: {
    mediaItems: sampleImages.slice(0, 4),
    width: '100%',
    height: '400px',
    thumbnailSize: '200px',
    horizontal: true,
    gap: '2rem',
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
      gap=${args.gap}
    ></spectrum-media-library>
  `,
};

/**
 * Lightbox disabled for click-through to external links behavior.
 */
export const WithoutLightbox: Story = {
  args: {
    mediaItems: sampleImages.slice(0, 4),
    width: '100%',
    height: '300px',
    thumbnailSize: 'medium',
    horizontal: true,
    enableLightbox: false,
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
      ?enable-lightbox=${args.enableLightbox}
    ></spectrum-media-library>
    <p style="margin-top: 1rem; color: #666;">
      Lightbox is disabled. Clicking thumbnails will not open the viewer.
    </p>
  `,
};

/**
 * Lightbox without captions for minimal interface.
 */
export const NoCaptions: Story = {
  args: {
    mediaItems: mixedMedia,
    width: '100%',
    height: '350px',
    thumbnailSize: 'medium',
    horizontal: true,
    showCaptions: false,
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
      thumbnail-size=${args.thumbnailSize}
      ?horizontal=${args.horizontal}
      ?show-captions=${args.showCaptions}
    ></spectrum-media-library>
  `,
};

/**
 * Empty state when no media items are provided.
 */
export const EmptyState: Story = {
  args: {
    mediaItems: [],
    width: '100%',
    height: '300px',
  },
  render: (args) => html`
    <spectrum-media-library
      .mediaItems=${args.mediaItems}
      width=${args.width}
      height=${args.height}
    ></spectrum-media-library>
  `,
};

/**
 * Using JSON string for HTML-only implementation (no JavaScript required).
 */
export const WithJSONString: Story = {
  render: () => {
    const jsonString = JSON.stringify([
      {
        id: 'img1',
        type: 'image',
        url: 'https://picsum.photos/800/600?random=10',
        altText: 'Mountain landscape',
        caption: 'Beautiful mountains',
      },
      {
        id: 'img2',
        type: 'image',
        url: 'https://picsum.photos/800/600?random=11',
        altText: 'Ocean view',
        caption: 'Peaceful ocean',
      },
      {
        id: 'vid1',
        type: 'video',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        altText: 'Sample video',
        caption: 'YouTube Video',
        platform: 'youtube',
      },
    ]);

    return html`
      <spectrum-media-library
        media-items='${jsonString}'
        width="100%"
        height="350px"
        thumbnail-size="medium"
      ></spectrum-media-library>
      <details style="margin-top: 1rem;">
        <summary style="cursor: pointer; color: #4A90E2;">View HTML Source</summary>
        <pre style="background: #f5f5f5; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;">
&lt;spectrum-media-library
  media-items='${jsonString}'
  width="100%"
  height="350px"
  thumbnail-size="medium"
&gt;&lt;/spectrum-media-library&gt;</pre>
      </details>
    `;
  },
};

/**
 * Event handling example showing how to listen to media interactions.
 */
export const WithEventHandling: Story = {
  render: () => {
    const handleMediaAction = (e: CustomEvent) => {
      const { action, mediaItem, index } = e.detail;
      const output = document.getElementById('event-output');
      if (output) {
        const timestamp = new Date().toLocaleTimeString();
        const message = `[${timestamp}] Action: ${action}${mediaItem ? `, Media: ${mediaItem.altText}` : ''}${index !== undefined ? `, Index: ${index}` : ''}`;
        output.textContent = message + '\n' + output.textContent;
      }
    };

    return html`
      <spectrum-media-library
        .mediaItems=${mixedMedia.slice(0, 5)}
        width="100%"
        height="350px"
        thumbnail-size="medium"
        @mediaAction=${handleMediaAction}
      ></spectrum-media-library>
      <div style="margin-top: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">Event Log:</h4>
        <pre id="event-output" style="background: #f5f5f5; padding: 1rem; border-radius: 0.5rem; max-height: 150px; overflow-y: auto; font-size: 0.875rem;">Waiting for interactions...</pre>
      </div>
    `;
  },
};

/**
 * Responsive design example showing how the component adapts to different screen sizes.
 */
export const Responsive: Story = {
  render: () => html`
    <div style="display: grid; gap: 2rem;">
      <div>
        <h3 style="margin-bottom: 1rem;">Desktop (100% width)</h3>
        <spectrum-media-library
          .mediaItems=${sampleImages.slice(0, 5)}
          width="100%"
          height="350px"
          thumbnail-size="large"
          horizontal
        ></spectrum-media-library>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem;">Tablet (768px width)</h3>
        <div style="max-width: 768px; margin: 0 auto;">
          <spectrum-media-library
            .mediaItems=${sampleImages.slice(0, 4)}
            width="100%"
            height="300px"
            thumbnail-size="medium"
            horizontal
          ></spectrum-media-library>
        </div>
      </div>
      
      <div>
        <h3 style="margin-bottom: 1rem;">Mobile (375px width)</h3>
        <div style="max-width: 375px; margin: 0 auto;">
          <spectrum-media-library
            .mediaItems=${sampleImages.slice(0, 3)}
            width="100%"
            height="250px"
            thumbnail-size="small"
            horizontal
          ></spectrum-media-library>
        </div>
      </div>
    </div>
  `,
};

/**
 * Accessibility features demonstration with keyboard navigation and screen reader support.
 */
export const Accessibility: Story = {
  render: () => html`
    <div>
      <spectrum-media-library
        .mediaItems=${mixedMedia.slice(0, 4)}
        width="100%"
        height="350px"
        thumbnail-size="medium"
        horizontal
      ></spectrum-media-library>
      
      <div style="margin-top: 2rem; padding: 1.5rem; background: #f5f5f5; border-radius: 0.5rem;">
        <h4 style="margin-top: 0;">Accessibility Features:</h4>
        <ul style="margin-bottom: 0;">
          <li><strong>Keyboard Navigation:</strong> Use Tab to focus thumbnails, Enter/Space to open lightbox</li>
          <li><strong>Lightbox Navigation:</strong> Arrow Left/Right to navigate, Escape to close</li>
          <li><strong>Screen Reader:</strong> All interactive elements have proper ARIA labels</li>
          <li><strong>Focus Indicators:</strong> Visible focus outlines on all interactive elements</li>
          <li><strong>High Contrast Mode:</strong> Enhanced borders and outlines</li>
          <li><strong>Reduced Motion:</strong> Respects prefers-reduced-motion setting</li>
        </ul>
      </div>
    </div>
  `,
};

