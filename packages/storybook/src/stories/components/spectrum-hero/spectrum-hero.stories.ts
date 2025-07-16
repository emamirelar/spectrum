import { html } from 'lit';
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { action } from 'storybook/actions';

interface HeroSlide {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonAction?: string;
  overlayPosition?: 'left' | 'center' | 'right';
  overlayVertical?: 'top' | 'center' | 'bottom';
}

// Local interface definition since components are loaded globally
interface SpectrumHero extends HTMLElement {
  slides: string;
  autoplay: number;
  animationDuration: number;
  pauseOnHover: boolean;
  showDots: boolean;
  showArrows: boolean;
  height: string;
  keyboardNavigation: boolean;
  debug: boolean;
}

interface SpectrumHeroArgs {
  slides: string;
  autoplay: number;
  animationDuration: number;
  pauseOnHover: boolean;
  showDots: boolean;
  showArrows: boolean;
  height: string;
  keyboardNavigation: boolean;
  debug: boolean;
}

// Sample hero slides data
const singleHeroSlide: HeroSlide[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Modern office workspace with brick walls',
    title: 'Empowering Businesses with Innovative Solutions',
    subtitle: 'We provide cutting-edge technology and expert guidance to help your business thrive in today\'s dynamic market.',
    buttonText: 'Get Started',
    buttonAction: 'get-started',
    overlayPosition: 'left',
    overlayVertical: 'center'
  }
];

const multipleHeroSlides: HeroSlide[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Modern office workspace',
    title: 'Empowering Businesses with Innovative Solutions',
    subtitle: 'We provide cutting-edge technology and expert guidance to help your business thrive in today\'s dynamic market.',
    buttonText: 'Get Started',
    buttonAction: 'get-started',
    overlayPosition: 'left',
    overlayVertical: 'center'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Team collaboration',
    title: 'Transform Your Digital Experience',
    subtitle: 'Our expert team delivers comprehensive solutions that drive growth and innovation for your organization.',
    buttonText: 'Learn More',
    buttonAction: 'learn-more',
    overlayPosition: 'center',
    overlayVertical: 'center'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Technology and analytics',
    title: 'Data-Driven Success',
    subtitle: 'Harness the power of analytics and insights to make informed decisions and achieve exceptional results.',
    buttonText: 'Explore Solutions',
    buttonAction: 'explore',
    overlayPosition: 'right',
    overlayVertical: 'center'
  }
];

const videoHeroSlides: HeroSlide[] = [
  {
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Demo video showcasing our platform',
    title: 'See Our Platform in Action',
    subtitle: 'Watch how our innovative solutions can transform your business processes and drive measurable results.',
    buttonText: 'Watch Demo',
    buttonAction: 'watch-demo',
    overlayPosition: 'left',
    overlayVertical: 'bottom'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1553484771-371a605b060b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Professional team meeting',
    title: 'Expert Consultation',
    subtitle: 'Get personalized guidance from our team of experienced professionals and industry experts.',
    buttonText: 'Book Consultation',
    buttonAction: 'book-consultation',
    overlayPosition: 'center',
    overlayVertical: 'top'
  }
];

const meta = {
  title: 'Spectrum/Components/SpectrumHero',
  component: 'spectrum-hero',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Spectrum Hero Component

A versatile hero component that supports both image and video backgrounds with customizable content overlays, carousel functionality, and responsive design.

## Features

- **Multiple Media Types**: Support for both images and videos with poster frames
- **Carousel Functionality**: Smooth horizontal slide transitions between multiple slides
- **Flexible Content Positioning**: Position text overlays in 9 different positions (3 horizontal × 3 vertical)
- **Interactive Elements**: Navigation arrows, dots, and keyboard controls
- **Autoplay Support**: Configurable autoplay with pause on hover
- **Responsive Design**: Optimized for all screen sizes with mobile-first approach
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Integration**: Uses spectrum-button component for consistent styling

## Slide Configuration

Each slide is defined by a \`HeroSlide\` object with the following properties:

### Required Properties
- **type**: \`'image' | 'video'\` - Media type for the slide
- **src**: \`string\` - URL to the image or video file

### Optional Properties
- **poster**: \`string\` - Poster image URL for videos (recommended)
- **alt**: \`string\` - Alt text for accessibility (recommended)
- **title**: \`string\` - Main heading text
- **subtitle**: \`string\` - Supporting text content
- **buttonText**: \`string\` - Call-to-action button text
- **buttonAction**: \`string\` - Action identifier for button clicks
- **overlayPosition**: \`'left' | 'center' | 'right'\` - Horizontal text alignment (default: 'left')
- **overlayVertical**: \`'top' | 'center' | 'bottom'\` - Vertical text positioning (default: 'center')

## Usage Examples

### Single Hero Slide
\`\`\`typescript
const heroSlide = [{
  type: 'image',
  src: 'https://example.com/hero-image.jpg',
  alt: 'Hero image description',
  title: 'Welcome to Our Platform',
  subtitle: 'Discover amazing features and capabilities',
  buttonText: 'Get Started',
  buttonAction: 'get-started',
  overlayPosition: 'center',
  overlayVertical: 'center'
}];
\`\`\`

### Multiple Slides with Different Positions
\`\`\`typescript
const heroSlides = [
  {
    type: 'image',
    src: 'slide1.jpg',
    title: 'Left Aligned Content',
    overlayPosition: 'left',
    overlayVertical: 'center'
  },
  {
    type: 'video',
    src: 'video.mp4',
    poster: 'video-poster.jpg',
    title: 'Centered Content',
    overlayPosition: 'center',
    overlayVertical: 'center'
  },
  {
    type: 'image',
    src: 'slide3.jpg',
    title: 'Right Aligned Content',
    overlayPosition: 'right',
    overlayVertical: 'bottom'
  }
];
\`\`\`

### HTML Implementation
\`\`\`html
<spectrum-hero
  slides='[{"type":"image","src":"hero.jpg","title":"Hero Title"}]'
  autoplay="5000"
  height="80vh"
  show-dots="true"
  show-arrows="true"
  keyboard-navigation="true"
></spectrum-hero>
\`\`\`

## Events

The component emits two main events:

### heroAction
Fired when a slide's call-to-action button is clicked.
\`\`\`typescript
{
  action: string;        // Button action identifier
  slideIndex: number;    // Index of the current slide
  slideTitle?: string;   // Title of the current slide
}
\`\`\`

### slideChange
Fired when the active slide changes (navigation, autoplay, etc.).
\`\`\`typescript
{
  action: 'slide-change';
  slideIndex: number;    // New active slide index
  totalSlides: number;   // Total number of slides
}
\`\`\`

## Keyboard Navigation

When \`keyboardNavigation\` is enabled:
- **Left Arrow**: Previous slide
- **Right Arrow**: Next slide
- **Space/Enter**: Toggle autoplay

## Best Practices

1. **Image Optimization**: Use optimized images (WebP format recommended) with appropriate dimensions
2. **Alt Text**: Always provide descriptive alt text for accessibility
3. **Video Posters**: Include poster images for videos to improve loading experience
4. **Content Length**: Keep titles concise and subtitles under 2 lines for best readability
5. **Button Actions**: Use descriptive action identifiers for analytics and event handling
6. **Responsive Testing**: Test on various screen sizes to ensure content remains readable

## Performance Considerations

- First slide image uses \`loading="eager"\` for immediate display
- Subsequent slides use \`loading="lazy"\` for performance
- Videos are set to autoplay, muted, and loop for seamless experience
- Autoplay pauses on hover to improve user experience
        `
      }
    }
  },
  args: {
    slides: JSON.stringify(singleHeroSlide),
    autoplay: 0,
    animationDuration: 1000,
    pauseOnHover: true,
    showDots: true,
    showArrows: true,
    height: '100vh',
    keyboardNavigation: true,
    debug: false,
  },
  argTypes: {
    slides: {
      control: 'text',
      description: 'JSON string containing array of HeroSlide objects. Each slide can be an image or video with customizable content overlay.',
      table: {
        type: { 
          summary: 'string (JSON)' 
        },
        defaultValue: { 
          summary: '[]' 
        }
      }
    },
    autoplay: {
      control: { type: 'number', min: 0, step: 1000 },
      description: 'Autoplay interval in milliseconds. Set to 0 to disable autoplay. Recommended: 3000-8000ms.',
      table: {
        type: { 
          summary: 'number' 
        },
        defaultValue: { 
          summary: '0' 
        }
      }
    },
    animationDuration: {
      control: { type: 'number', min: 0, step: 100 },
      description: 'Duration of slide transition animations in milliseconds. Affects slide movement speed.',
      table: {
        type: { 
          summary: 'number' 
        },
        defaultValue: { 
          summary: '1000' 
        }
      }
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause autoplay when user hovers over the hero component. Improves user experience.',
      table: {
        type: { 
          summary: 'boolean' 
        },
        defaultValue: { 
          summary: 'true' 
        }
      }
    },
    showDots: {
      control: 'boolean',
      description: 'Display navigation dots at the bottom. Hidden automatically for single slides.',
      table: {
        type: { 
          summary: 'boolean' 
        },
        defaultValue: { 
          summary: 'true' 
        }
      }
    },
    showArrows: {
      control: 'boolean',
      description: 'Display navigation arrows on the sides. Hidden automatically for single slides.',
      table: {
        type: { 
          summary: 'boolean' 
        },
        defaultValue: { 
          summary: 'true' 
        }
      }
    },
    height: {
      control: 'text',
      description: 'Hero component height as CSS value. Common values: "100vh", "80vh", "600px", "50rem".',
      table: {
        type: { 
          summary: 'string' 
        },
        defaultValue: { 
          summary: '"100vh"' 
        }
      }
    },
    keyboardNavigation: {
      control: 'boolean',
      description: 'Enable keyboard controls: Arrow keys for navigation, Space/Enter to toggle autoplay.',
      table: {
        type: { 
          summary: 'boolean' 
        },
        defaultValue: { 
          summary: 'true' 
        }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode to log component actions to console. Useful for development.',
      table: {
        type: { 
          summary: 'boolean' 
        },
        defaultValue: { 
          summary: 'false' 
        }
      }
    }
  }
} satisfies Meta<SpectrumHero>

export default meta;

// Event handlers for Storybook actions
const handleHeroAction = (e: CustomEvent) => {
  action('heroAction')(e.detail);
};

const handleSlideChange = (e: CustomEvent) => {
  action('slideChange')(e.detail);
};

// Base render function
const renderHero = (args: SpectrumHeroArgs) => html`
  <spectrum-hero
    slides=${args.slides}
    autoplay=${args.autoplay}
    animation-duration=${args.animationDuration}
    ?pause-on-hover=${args.pauseOnHover}
    ?show-dots=${args.showDots}
    ?show-arrows=${args.showArrows}
    height=${args.height}
    ?keyboard-navigation=${args.keyboardNavigation}
    ?debug=${args.debug}
    @heroAction=${handleHeroAction}
    @slideChange=${handleSlideChange}
  ></spectrum-hero>
`;

// Single Hero Section
export const SingleHero: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify(singleHeroSlide),
    autoplay: 0,
    height: '70vh',
  },
  parameters: {
    docs: {
      description: {
        story: 'A single hero section with image background, text overlay, and call-to-action button. Perfect for landing pages and feature highlights.',
      },
    },
  },
  render: renderHero
};

// Carousel Hero with Multiple Slides
export const CarouselHero: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify(multipleHeroSlides),
    autoplay: 5000,
    height: '80vh',
    showDots: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A hero carousel with multiple slides, autoplay functionality, and navigation controls. Showcases different content positioning and messaging.',
      },
    },
  },
  render: renderHero
};

// Video Hero
export const VideoHero: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify(videoHeroSlides),
    autoplay: 8000,
    height: '90vh',
    pauseOnHover: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A hero section supporting both video and image content. The video plays automatically with poster fallback and smooth transitions.',
      },
    },
  },
  render: renderHero
};

// Compact Hero (Reduced Height)
export const CompactHero: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify([{
      ...singleHeroSlide[0],
      title: 'Welcome to Our Platform',
      subtitle: 'Streamlined solutions for modern businesses.',
      overlayPosition: 'center'
    }]),
    height: '50vh',
    showDots: false,
    showArrows: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A compact hero section perfect for secondary pages or when you need to conserve vertical space while still making an impact.',
      },
    },
  },
  render: renderHero
};

// No Navigation Controls
export const MinimalHero: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify(multipleHeroSlides),
    autoplay: 6000,
    showDots: false,
    showArrows: false,
    pauseOnHover: false,
    keyboardNavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A minimal hero carousel with no visible navigation controls, relying entirely on autoplay. Clean and distraction-free presentation.',
      },
    },
  },
  render: renderHero
};

// Fast Autoplay
export const FastAutoplay: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify(multipleHeroSlides),
    autoplay: 2000,
    animationDuration: 500,
  },
  parameters: {
    docs: {
      description: {
        story: 'A hero carousel with fast autoplay and quick transitions, ideal for showcasing multiple features or products rapidly.',
      },
    },
  },
  render: renderHero
};

// Bottom Positioning
export const BottomPositioned: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify([{
      ...singleHeroSlide[0],
      overlayPosition: 'center',
      overlayVertical: 'bottom',
      title: 'Innovation Starts Here',
      subtitle: 'Join thousands of companies transforming their business with our platform.'
    }]),
    height: '75vh',
  },
  parameters: {
    docs: {
      description: {
        story: 'A hero section with content positioned at the bottom, creating a different visual hierarchy and drawing attention to the lower portion.',
      },
    },
  },
  render: renderHero
};

// Right Aligned Content
export const RightAligned: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify([{
      ...singleHeroSlide[0],
      overlayPosition: 'right',
      overlayVertical: 'center',
      title: 'Cutting-Edge Technology',
      subtitle: 'Experience the future of business automation and digital transformation.'
    }]),
  },
  parameters: {
    docs: {
      description: {
        story: 'A hero section with right-aligned content overlay, perfect for images with important elements on the left side.',
      },
    },
  },
  render: renderHero
};

// Debug Mode
export const DebugMode: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify(multipleHeroSlides),
    autoplay: 3000,
    debug: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero component with debug mode enabled. Check the browser console to see detailed logging information about component behavior.',
      },
    },
  },
  render: renderHero
};

// Mobile Optimized
export const MobileOptimized: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify([{
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Mobile-first design',
      title: 'Mobile-First Experience',
      subtitle: 'Optimized for all devices with responsive design.',
      buttonText: 'Try Mobile App',
      buttonAction: 'mobile-app',
      overlayPosition: 'center',
      overlayVertical: 'center'
    }]),
    height: '60vh',
    showDots: true,
    showArrows: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'A hero section optimized for mobile devices with appropriate sizing and touch-friendly navigation controls.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: renderHero
};

// Slide Structure Documentation
export const SlideStructureExamples: StoryObj<SpectrumHeroArgs> = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Complete slide example',
        title: 'Complete Slide Example',
        subtitle: 'This slide demonstrates all available properties including positioning, content, and actions.',
        buttonText: 'View Documentation',
        buttonAction: 'view-docs',
        overlayPosition: 'left',
        overlayVertical: 'center'
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Video slide with poster',
        title: 'Video Slide Example',
        subtitle: 'Videos support poster images and autoplay with muted audio for better user experience.',
        buttonText: 'Learn More',
        buttonAction: 'learn-video',
        overlayPosition: 'center',
        overlayVertical: 'bottom'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Minimal slide example',
        title: 'Minimal Content Slide',
        // No subtitle or button - demonstrates optional properties
        overlayPosition: 'right',
        overlayVertical: 'top'
      }
    ]),
    autoplay: 4000,
    height: '70vh',
    debug: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
## Slide Structure Examples

This story demonstrates different slide configurations and how to structure the \`slides\` JSON property.

### Example 1: Complete Slide (All Properties)
\`\`\`json
{
  "type": "image",
  "src": "https://example.com/image.jpg",
  "alt": "Descriptive alt text for accessibility",
  "title": "Main Heading Text",
  "subtitle": "Supporting description text that provides context",
  "buttonText": "Call to Action",
  "buttonAction": "action-identifier",
  "overlayPosition": "left",
  "overlayVertical": "center"
}
\`\`\`

### Example 2: Video Slide with Poster
\`\`\`json
{
  "type": "video",
  "src": "https://example.com/video.mp4",
  "poster": "https://example.com/poster.jpg",
  "alt": "Video description",
  "title": "Video Title",
  "subtitle": "Video description text",
  "buttonText": "Watch Now",
  "buttonAction": "play-video",
  "overlayPosition": "center",
  "overlayVertical": "bottom"
}
\`\`\`

### Example 3: Minimal Slide (Required Properties Only)
\`\`\`json
{
  "type": "image",
  "src": "https://example.com/image.jpg",
  "title": "Simple Title"
}
\`\`\`

### Overlay Positioning Options

**Horizontal Positions (\`overlayPosition\`):**
- \`"left"\` - Left-aligned content (default)
- \`"center"\` - Center-aligned content  
- \`"right"\` - Right-aligned content

**Vertical Positions (\`overlayVertical\`):**
- \`"top"\` - Content at top of slide
- \`"center"\` - Content vertically centered (default)
- \`"bottom"\` - Content at bottom of slide

### Complete Implementation Example
\`\`\`html
<spectrum-hero
  slides='[
    {
      "type": "image",
      "src": "hero1.jpg",
      "alt": "Hero image 1",
      "title": "Welcome",
      "subtitle": "Get started today",
      "buttonText": "Sign Up",
      "buttonAction": "signup",
      "overlayPosition": "center"
    },
    {
      "type": "video", 
      "src": "demo.mp4",
      "poster": "demo-poster.jpg",
      "title": "See It In Action",
      "buttonText": "Watch Demo",
      "overlayPosition": "left",
      "overlayVertical": "bottom"
    }
  ]'
  autoplay="5000"
  height="80vh"
  show-dots="true"
  show-arrows="true"
></spectrum-hero>
\`\`\`

**Note:** The \`debug\` mode is enabled in this story to show console logs of component actions.
        `,
      },
    },
  },
  render: renderHero
}; 