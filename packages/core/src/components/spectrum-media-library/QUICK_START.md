# Spectrum Media Library - Quick Start Guide

## Installation

The component is included in the `@unops-itg-npm/cpit-spectrum` package.

```bash
npm install @unops-itg-npm/cpit-spectrum
```

## 5-Minute Quick Start

### 1. Basic HTML Usage

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@unops-itg-npm/cpit-spectrum/dist/spectrum/spectrum.esm.js"></script>
</head>
<body>
  <spectrum-media-library
    media-items='[
      {
        "id": "img1",
        "type": "image",
        "url": "https://picsum.photos/800/600?random=1",
        "altText": "Beautiful landscape"
      },
      {
        "id": "vid1",
        "type": "video",
        "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "altText": "Sample video"
      }
    ]'
    width="100%"
    height="400px"
    thumbnail-size="medium"
  ></spectrum-media-library>
</body>
</html>
```

### 2. JavaScript Usage

```javascript
// Get reference to component
const library = document.querySelector('spectrum-media-library');

// Set media items
library.mediaItems = [
  {
    id: 'photo1',
    type: 'image',
    url: '/images/photo1.jpg',
    altText: 'Vacation photo',
    caption: 'Summer 2024'
  },
  {
    id: 'tutorial',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=VIDEO_ID',
    altText: 'Tutorial video',
    caption: 'How to get started',
    platform: 'youtube'
  }
];

// Listen to events
library.addEventListener('mediaAction', (event) => {
  console.log('User action:', event.detail.action);
  console.log('Media item:', event.detail.mediaItem);
});
```

### 3. React Usage

```jsx
import { SpectrumMediaLibrary } from '@unops-itg-npm/cpit-spectrum-react';

function MyGallery() {
  const mediaItems = [
    {
      id: 'img1',
      type: 'image',
      url: '/images/photo.jpg',
      altText: 'Description',
      caption: 'My photo'
    }
  ];

  const handleMediaAction = (e) => {
    console.log('Action:', e.detail.action);
  };

  return (
    <SpectrumMediaLibrary
      mediaItems={mediaItems}
      width="100%"
      height="400px"
      thumbnailSize="medium"
      onMediaAction={handleMediaAction}
    />
  );
}
```

### 4. Vue Usage

```vue
<template>
  <spectrum-media-library
    :media-items="mediaItems"
    width="100%"
    height="400px"
    thumbnail-size="medium"
    @mediaAction="handleAction"
  />
</template>

<script>
export default {
  data() {
    return {
      mediaItems: [
        {
          id: 'img1',
          type: 'image',
          url: '/images/photo.jpg',
          altText: 'Description',
          caption: 'My photo'
        }
      ]
    };
  },
  methods: {
    handleAction(event) {
      console.log('Action:', event.detail.action);
    }
  }
};
</script>
```

## Common Patterns

### Image Gallery

```javascript
library.mediaItems = [
  { id: '1', type: 'image', url: '/photo1.jpg', altText: 'Photo 1' },
  { id: '2', type: 'image', url: '/photo2.jpg', altText: 'Photo 2' },
  { id: '3', type: 'image', url: '/photo3.jpg', altText: 'Photo 3' }
];
library.thumbnailSize = 'large';
library.horizontal = true;
```

### Video Library

```javascript
library.mediaItems = [
  {
    id: 'lesson1',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=VIDEO_1',
    altText: 'Lesson 1',
    caption: 'Introduction'
  },
  {
    id: 'lesson2',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=VIDEO_2',
    altText: 'Lesson 2',
    caption: 'Advanced Topics'
  }
];
```

### Mixed Media

```javascript
library.mediaItems = [
  { id: 'img1', type: 'image', url: '/photo.jpg', altText: 'Photo' },
  { id: 'vid1', type: 'video', url: 'https://youtube.com/...', altText: 'Video' },
  { id: 'img2', type: 'image', url: '/graphic.png', altText: 'Graphic' }
];
```

## Key Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mediaItems` | Array/String | `[]` | Media items to display |
| `width` | String | `'100%'` | Container width |
| `height` | String | `'400px'` | Container height |
| `thumbnailSize` | String | `'medium'` | Thumbnail size (small/medium/large) |
| `horizontal` | Boolean | `false` | Horizontal scrolling |
| `gap` | String | `'1rem'` | Gap between thumbnails |

## Keyboard Shortcuts

- **Tab** - Focus thumbnails
- **Enter/Space** - Open lightbox
- **Escape** - Close lightbox
- **Arrow Left/Right** - Navigate media

## YouTube Integration

The component automatically extracts thumbnails from YouTube URLs:

```javascript
{
  id: 'video1',
  type: 'video',
  url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  altText: 'My video',
  // thumbnail is auto-generated!
}
```

Supported YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

## Customization

### Custom Thumbnail Size

```javascript
library.thumbnailSize = '180px'; // Custom pixel size
```

### Custom Styling

```css
spectrum-media-library {
  --media-library-background: #f5f5f5;
  --media-library-thumbnail-radius: 1rem;
  --media-library-thumbnail-hover-scale: 1.1;
}
```

### Vertical Sidebar Layout

```html
<spectrum-media-library
  width="300px"
  height="600px"
  thumbnail-size="small"
></spectrum-media-library>
```

## Event Handling

```javascript
library.addEventListener('mediaAction', (event) => {
  const { action, mediaItem, index } = event.detail;
  
  switch (action) {
    case 'view':
      console.log(`Viewing ${mediaItem.altText}`);
      break;
    case 'close':
      console.log('Lightbox closed');
      break;
    case 'navigate':
      console.log(`Navigated to index ${index}`);
      break;
    case 'error':
      console.error('Error:', event.detail.errorMessage);
      break;
  }
});
```

## Programmatic Control

```javascript
// Close lightbox
await library.closeLightbox();

// Navigate to next
await library.navigateNext();

// Navigate to previous
await library.navigatePrevious();
```

## Troubleshooting

### Media items not showing?
Check that your media items have required properties:
- `id` (unique)
- `type` ('image' or 'video')
- `url` (valid URL)
- `altText` (for accessibility)

### YouTube thumbnails not loading?
Ensure the URL is in a supported format and the video ID is valid.

### Lightbox not opening?
Check that `enableLightbox` is set to `true` (default).

### Keyboard navigation not working?
Ensure `enableKeyboardNav` is set to `true` (default) and the component has focus.

## Next Steps

- 📖 Read the [full README](./readme.md) for complete API documentation
- 🎨 Explore [Storybook examples](../../../../storybook/src/stories/components/spectrum-media-library/)
- 🔍 Check out [use cases](../../../../storybook/src/stories/components/spectrum-media-library/use-cases.mdx)
- ♿ Review [accessibility guidelines](./readme.md#accessibility)

## Need Help?

- Check the [component README](./readme.md)
- View [Storybook examples](../../../../storybook/)
- Review [use cases documentation](../../../../storybook/src/stories/components/spectrum-media-library/use-cases.mdx)
- Open an issue on GitHub

---

**Quick Start Guide** | **Spectrum Media Library**  
Version 1.0.0 | October 2025





