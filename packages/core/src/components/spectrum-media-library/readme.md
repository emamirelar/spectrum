# spectrum-media-library

A comprehensive media library component that displays images and videos in a scrollable, responsive grid with an integrated lightbox viewer. Perfect for galleries, portfolios, documentation, and media management applications.

## Features

- **Multi-Media Support**: Display images and videos from multiple sources (YouTube, Vimeo, direct links)
- **Auto-Thumbnail Extraction**: Automatically generates thumbnails for YouTube videos
- **Interactive Lightbox**: Full-screen viewer with navigation, captions, and video player
- **Configurable Layout**: Choose between horizontal or vertical scrolling
- **Responsive Thumbnails**: Preset sizes (small, medium, large) or custom dimensions
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Touch Support**: Optimized for mobile devices with touch gestures
- **WCAG 2.1 AA Compliant**: Meets accessibility standards
- **Event System**: Comprehensive events for media interactions

## Usage

### Basic Example

```html
<spectrum-media-library></spectrum-media-library>
```

### With Image Gallery

```html
<spectrum-media-library
  width="100%"
  height="400px"
  thumbnail-size="medium"
  horizontal
>
</spectrum-media-library>

<script>
  const library = document.querySelector('spectrum-media-library');
  library.mediaItems = [
    {
      id: 'img1',
      type: 'image',
      url: 'https://example.com/image1.jpg',
      altText: 'Beautiful landscape',
      caption: 'Mountain sunset'
    },
    {
      id: 'img2',
      type: 'image',
      url: 'https://example.com/image2.jpg',
      altText: 'Ocean view',
      caption: 'Crystal clear waters'
    }
  ];
</script>
```

### With Videos (YouTube)

```html
<spectrum-media-library
  width="100%"
  height="350px"
  thumbnail-size="large"
>
</spectrum-media-library>

<script>
  const library = document.querySelector('spectrum-media-library');
  library.mediaItems = [
    {
      id: 'vid1',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      altText: 'Tutorial video',
      caption: 'How to use the component',
      platform: 'youtube' // Optional, auto-detected if omitted
    }
  ];
</script>
```

### Using JSON String (HTML-Only)

```html
<spectrum-media-library
  media-items='[
    {
      "id": "img1",
      "type": "image",
      "url": "https://example.com/image.jpg",
      "altText": "Sample image",
      "caption": "Sample caption"
    },
    {
      "id": "vid1",
      "type": "video",
      "url": "https://www.youtube.com/watch?v=VIDEO_ID",
      "altText": "Sample video",
      "platform": "youtube"
    }
  ]'
  width="100%"
  height="400px"
  thumbnail-size="medium"
></spectrum-media-library>
```

### Mixed Media Library

```html
<script>
  const library = document.querySelector('spectrum-media-library');
  library.mediaItems = [
    {
      id: 'img1',
      type: 'image',
      url: 'https://example.com/photo.jpg',
      altText: 'Photo',
      caption: 'Beautiful photo'
    },
    {
      id: 'vid1',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=VIDEO_ID',
      altText: 'Video tutorial',
      caption: 'Learn more'
    },
    {
      id: 'img2',
      type: 'image',
      url: 'https://example.com/graphic.png',
      altText: 'Graphic design',
      caption: 'Design mockup'
    }
  ];
</script>
```

### Vertical Layout (Sidebar)

```html
<spectrum-media-library
  width="300px"
  height="600px"
  thumbnail-size="medium"
  gap="1rem"
></spectrum-media-library>
```

## Properties

| Property | Attribute | Type | Default | Description |
|----------|-----------|------|---------|-------------|
| `mediaItems` | `media-items` | `MediaItem[] \| string` | `[]` | Array of media items or JSON string |
| `width` | `width` | `string` | `'100%'` | Width of the container (CSS units) |
| `height` | `height` | `string` | `'400px'` | Height of the container (CSS units) |
| `thumbnailSize` | `thumbnail-size` | `'small' \| 'medium' \| 'large' \| string` | `'medium'` | Thumbnail size preset or custom size |
| `horizontal` | `horizontal` | `boolean` | `false` | Enable horizontal scrolling |
| `gap` | `gap` | `string` | `'1rem'` | Gap between thumbnails |
| `enableLightbox` | `enable-lightbox` | `boolean` | `true` | Enable lightbox viewer |
| `showCaptions` | `show-captions` | `boolean` | `true` | Show captions in lightbox |
| `enableKeyboardNav` | `enable-keyboard-nav` | `boolean` | `true` | Enable keyboard navigation |

### MediaItem Interface

```typescript
interface MediaItem {
  id: string;                  // Unique identifier
  type: 'image' | 'video';     // Media type
  url: string;                 // Source URL
  thumbnailUrl?: string;       // Optional custom thumbnail (auto-generated for videos)
  altText: string;             // Accessibility description
  caption?: string;            // Optional caption for lightbox
  platform?: 'youtube' | 'vimeo' | 'direct';  // Video platform (auto-detected)
}
```

## Events

| Event | Detail Type | Description |
|-------|------------|-------------|
| `mediaAction` | `MediaActionPayload` | Emitted when media is interacted with |

### MediaActionPayload Interface

```typescript
interface MediaActionPayload {
  action: 'view' | 'close' | 'navigate' | 'error';
  mediaItem?: MediaItem;
  index?: number;
  errorMessage?: string;
}
```

### Event Handling Example

```javascript
const library = document.querySelector('spectrum-media-library');

library.addEventListener('mediaAction', (event) => {
  const { action, mediaItem, index } = event.detail;
  
  switch (action) {
    case 'view':
      console.log(`Viewing ${mediaItem.altText} at index ${index}`);
      break;
    case 'close':
      console.log('Lightbox closed');
      break;
    case 'navigate':
      console.log(`Navigated to ${mediaItem.altText}`);
      break;
    case 'error':
      console.error('Error:', event.detail.errorMessage);
      break;
  }
});
```

## Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `closeLightbox()` | `Promise<void>` | Programmatically close the lightbox |
| `navigatePrevious()` | `Promise<void>` | Navigate to previous media item |
| `navigateNext()` | `Promise<void>` | Navigate to next media item |

### Method Usage Example

```javascript
const library = document.querySelector('spectrum-media-library');

// Close lightbox programmatically
await library.closeLightbox();

// Navigate to next item
await library.navigateNext();

// Navigate to previous item
await library.navigatePrevious();
```

## Accessibility

### Keyboard Navigation

- **Tab**: Move focus between thumbnails
- **Enter/Space**: Open lightbox for focused thumbnail
- **Escape**: Close lightbox
- **Arrow Left**: Previous media item in lightbox
- **Arrow Right**: Next media item in lightbox

### Screen Reader Support

- All thumbnails have proper ARIA labels
- Lightbox has `role="dialog"` and `aria-modal="true"`
- Navigation buttons have descriptive labels
- Loading states are announced
- Media counter updates are announced

### Focus Management

- Visible focus indicators on all interactive elements
- Logical tab order through thumbnails
- Focus trapped within lightbox when open
- Focus returns to trigger element when closed

### High Contrast Mode

- Enhanced borders on thumbnails
- Increased outline visibility
- Button borders added for clarity

### Reduced Motion

- Respects `prefers-reduced-motion` setting
- Disables animations and transitions
- Maintains functionality without motion

## Video Platform Support

### YouTube

- **Auto-Detection**: Automatically detects YouTube URLs
- **Thumbnail Extraction**: Extracts high-quality thumbnails from video ID
- **Embed Support**: Converts to embeddable format with autoplay
- **URL Formats Supported**:
  - `https://www.youtube.com/watch?v=VIDEO_ID`
  - `https://youtu.be/VIDEO_ID`
  - `https://www.youtube.com/embed/VIDEO_ID`

### Vimeo

- **Auto-Detection**: Automatically detects Vimeo URLs
- **Embed Support**: Converts to player format
- **Placeholder Thumbnail**: Uses generic video icon (API integration recommended for thumbnails)
- **URL Format**: `https://vimeo.com/VIDEO_ID`

### Direct Video Links

- **File Support**: `.mp4`, `.webm`, `.ogg`
- **Native Player**: Uses HTML5 video element
- **Placeholder Thumbnail**: Uses generic video icon

## Styling with CSS Custom Properties

```css
spectrum-media-library {
  /* Container */
  --media-library-background: #ffffff;
  --media-library-border-radius: 0.5rem;
  --media-library-padding: 1rem;
  
  /* Thumbnails */
  --media-library-thumbnail-border: 1px solid #e0e0e0;
  --media-library-thumbnail-radius: 0.25rem;
  --media-library-thumbnail-hover-scale: 1.05;
  --media-library-thumbnail-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  /* Lightbox */
  --media-library-lightbox-background: rgba(0, 0, 0, 0.95);
  --media-library-lightbox-max-width: 90vw;
  --media-library-lightbox-max-height: 90vh;
  
  /* Interactive States */
  --media-library-focus-outline: #4A90E2;
  
  /* Transitions */
  --media-library-transition-duration: 0.2s;
}
```

## Responsive Design

The component is fully responsive and adapts to different screen sizes:

- **Desktop**: Large thumbnails with hover effects
- **Tablet**: Medium thumbnails with touch support
- **Mobile**: Small thumbnails, optimized lightbox controls

### Responsive Example

```html
<!-- Desktop -->
<spectrum-media-library
  width="100%"
  height="500px"
  thumbnail-size="large"
  gap="2rem"
></spectrum-media-library>

<!-- Mobile -->
<spectrum-media-library
  width="100%"
  height="300px"
  thumbnail-size="small"
  gap="0.5rem"
></spectrum-media-library>
```

## Use Cases

### Photo Gallery

```javascript
library.mediaItems = [
  { id: '1', type: 'image', url: '/photos/1.jpg', altText: 'Photo 1', caption: 'Vacation 2024' },
  { id: '2', type: 'image', url: '/photos/2.jpg', altText: 'Photo 2', caption: 'Summer trip' },
  // ... more photos
];
```

### Video Course Library

```javascript
library.mediaItems = [
  { id: 'lesson1', type: 'video', url: 'https://youtube.com/...', altText: 'Lesson 1', caption: 'Introduction' },
  { id: 'lesson2', type: 'video', url: 'https://youtube.com/...', altText: 'Lesson 2', caption: 'Advanced topics' },
];
```

### Product Showcase

```javascript
library.mediaItems = [
  { id: 'prod1', type: 'image', url: '/products/1.jpg', altText: 'Product view 1' },
  { id: 'demo1', type: 'video', url: 'https://youtube.com/...', altText: 'Product demo' },
  { id: 'prod2', type: 'image', url: '/products/2.jpg', altText: 'Product view 2' },
];
```

### Documentation with Visuals

```javascript
library.mediaItems = [
  { id: 'step1', type: 'image', url: '/docs/step1.png', altText: 'Step 1', caption: 'Login screen' },
  { id: 'tutorial', type: 'video', url: 'https://youtube.com/...', altText: 'Video tutorial' },
  { id: 'step2', type: 'image', url: '/docs/step2.png', altText: 'Step 2', caption: 'Dashboard' },
];
```

## Best Practices

1. **Always provide `altText`**: Essential for accessibility and SEO
2. **Use appropriate thumbnail sizes**: Match thumbnail size to your layout
3. **Optimize images**: Use compressed images for better performance
4. **Add captions**: Help users understand context
5. **Handle errors**: Listen to `mediaAction` events with action='error'
6. **Lazy loading**: Component uses `loading="lazy"` for images automatically
7. **Video thumbnails**: Let component auto-generate YouTube thumbnails
8. **Responsive design**: Test on different screen sizes

## Performance Considerations

- **Lazy Loading**: Images load as they come into view
- **Efficient Scrolling**: Uses CSS overflow for smooth scrolling
- **Optimized Animations**: GPU-accelerated transforms
- **Event Cleanup**: Automatically removes event listeners on disconnect
- **Memory Management**: Lightbox resources cleaned up when closed

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- iOS Safari: ✅ Full support with touch gestures
- Android Chrome: ✅ Full support with touch gestures

## Dependencies

- None! Pure web component with no external dependencies
- Works with all modern frameworks (React, Vue, Angular, vanilla JS)

## TypeScript Support

Full TypeScript support with exported interfaces:

```typescript
import { MediaItem, MediaActionPayload } from '@unops-itg-npm/cpit-spectrum';

const items: MediaItem[] = [
  {
    id: 'img1',
    type: 'image',
    url: '/image.jpg',
    altText: 'Description',
    caption: 'Optional caption'
  }
];
```

---

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                      | Type                    | Default    |
| ------------------- | --------------------- | ---------------------------------------------------------------- | ----------------------- | ---------- |
| `enableKeyboardNav` | `enable-keyboard-nav` | Enable keyboard navigation in lightbox                           | `boolean`               | `true`     |
| `enableLightbox`    | `enable-lightbox`     | Enable lightbox on thumbnail click                               | `boolean`               | `true`     |
| `gap`               | `gap`                 | Gap between thumbnails (CSS units)                               | `string`                | `'1rem'`   |
| `height`            | `height`              | Height of the media library container (CSS units: px, %, vh, vw) | `string`                | `'400px'`  |
| `horizontal`        | `horizontal`          | Enable horizontal scrolling (otherwise vertical)                 | `boolean`               | `false`    |
| `mediaItems`        | `media-items`         | Array of media items or JSON string representing the media items | `MediaItem[] \| string` | `[]`       |
| `showCaptions`      | `show-captions`       | Show captions in lightbox                                        | `boolean`               | `true`     |
| `thumbnailSize`     | `thumbnail-size`      | Thumbnail size preset or custom size                             | `string`                | `'medium'` |
| `width`             | `width`               | Width of the media library container (CSS units: px, %, vh, vw)  | `string`                | `'100%'`   |


## Events

| Event         | Description                                      | Type                              |
| ------------- | ------------------------------------------------ | --------------------------------- |
| `mediaAction` | Event emitted when media item is interacted with | `CustomEvent<MediaActionPayload>` |


## Methods

### `closeLightbox() => Promise<void>`

Close lightbox

#### Returns

Type: `Promise<void>`



### `navigateNext() => Promise<void>`

Navigate to next media item

#### Returns

Type: `Promise<void>`



### `navigatePrevious() => Promise<void>`

Navigate to previous media item

#### Returns

Type: `Promise<void>`




----------------------------------------------


