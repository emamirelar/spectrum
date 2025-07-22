import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { action } from 'storybook/actions';

/**
 * ## SpectrumHero Component
 * 
 * The hero component provides a powerful and flexible hero section with support for images, videos, carousel functionality, text overlays, and call-to-action buttons. Perfect for landing pages, feature highlights, and content showcases.
 * 
 * ### Key Features
 * - **Multi-Media Support**: Supports both images and videos with poster frames
 * - **Carousel Functionality**: Optional autoplay with customizable timing and transitions
 * - **Text Overlays**: Flexible positioning for titles, subtitles, and call-to-action buttons
 * - **Responsive Design**: Adaptive layouts with configurable height and positioning
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Performance Optimized**: Efficient rendering with smooth animations
 * 
 * ### Usage Guidelines
 * - Use for: Landing page headers, feature showcases, product highlights
 * - Perfect for: Brand storytelling, product demos, call-to-action sections
 * - Avoid when: Simple static content would suffice, complex forms or data entry
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **heroAction**: Emitted when action buttons are clicked with slide context
 * - **slideChange**: Emitted when slides change with current slide information
 */

// Hero slide interface
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

// Component interfaces for TypeScript support
interface SpectrumHeroElement extends HTMLElement {
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

// Story arguments interface
interface SpectrumHeroArgs extends SpectrumHeroElement {}

const meta: Meta<SpectrumHeroArgs> = {
  title: 'Spectrum/Components/SpectrumHero', // [[memory:3543783]]
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
The \`spectrum-hero\` component provides a sophisticated hero section with support for images, videos, carousel functionality, and interactive overlays.

### Data Structures

#### HeroSlide Interface
\`\`\`typescript
interface HeroSlide {
  type: 'image' | 'video';           // Media type
  src: string;                       // Media source URL
  poster?: string;                   // Video poster image
  alt?: string;                      // Accessibility description
  title?: string;                    // Overlay title text
  subtitle?: string;                 // Overlay subtitle text
  buttonText?: string;               // Call-to-action button text
  buttonAction?: string;             // Action identifier for events
  overlayPosition?: 'left' | 'center' | 'right';    // Horizontal positioning
  overlayVertical?: 'top' | 'center' | 'bottom';    // Vertical positioning
}
\`\`\`

### Overlay Positioning
- **Horizontal**: left, center, right - Controls text alignment and positioning
- **Vertical**: top, center, bottom - Controls vertical placement of overlay content

### Media Support
- **Images**: Any web-compatible image format (JPEG, PNG, WebP, SVG)
- **Videos**: MP4, WebM with optional poster images for loading states

### Carousel Features
- **Autoplay**: Configurable timing with pause-on-hover support
- **Navigation**: Dots and arrows with keyboard accessibility
- **Transitions**: Smooth animations with customizable duration

### Basic Usage
\`\`\`
<spectrum-hero
  slides='[{"type":"image","src":"image.jpg","title":"Welcome","buttonText":"Get Started"}]'
  autoplay="5000"
  height="70vh">
</spectrum-hero>
\`\`\`
        `
      }
    }
  },
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3',
        alt: 'Modern office workspace',
        title: 'Empowering Innovation',
        subtitle: 'Transform your business with cutting-edge solutions',
        buttonText: 'Get Started',
        buttonAction: 'get-started',
        overlayPosition: 'left',
        overlayVertical: 'center'
      }
    ]),
    autoplay: 0,
    animationDuration: 1000,
    pauseOnHover: true,
    showDots: true,
    showArrows: true,
    height: '60vh',
    keyboardNavigation: true,
    debug: false
  },
  argTypes: {
    slides: {
      control: 'text',
      description: 'JSON string of HeroSlide array containing slide content and configuration',
      table: {
        type: { summary: 'string (JSON)' },
        defaultValue: { summary: '[]' }
      }
    },
    autoplay: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'Autoplay interval in milliseconds (0 to disable)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' }
      }
    },
    animationDuration: {
      control: { type: 'number', min: 100, max: 3000, step: 100 },
      description: 'Slide transition animation duration in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1000' }
      }
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause autoplay when user hovers over the hero',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showDots: {
      control: 'boolean',
      description: 'Show navigation dots for slide selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows for manual slide control',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    height: {
      control: 'text',
      description: 'Hero height as CSS value (px, vh, rem, etc.)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '100vh' }
      }
    },
    keyboardNavigation: {
      control: 'boolean',
      description: 'Enable keyboard navigation (arrow keys)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    debug: {
      control: 'boolean',
      description: 'Enable debug mode with console logging',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumHeroArgs>;

// Interactive render function
const renderHero = (args: SpectrumHeroArgs) => {
  return html`
    <div style="width: 100%; min-height: 400px;">
      <spectrum-hero
        slides=${args.slides}
        autoplay=${args.autoplay}
        animation-duration=${args.animationDuration}
        pause-on-hover=${args.pauseOnHover}
        show-dots=${args.showDots}
        show-arrows=${args.showArrows}
        height=${args.height}
        keyboard-navigation=${args.keyboardNavigation}
        debug=${args.debug}
        @heroAction=${(e: CustomEvent) => action('heroAction')(e.detail)}
        @slideChange=${(e: CustomEvent) => action('slideChange')(e.detail)}
      ></spectrum-hero>
    </div>
  `;
};

// =================================================================
// STORIES
// =================================================================

/**
 * Interactive playground for exploring all hero component features and configurations.
 * Adjust the controls to see how different settings affect the hero behavior and appearance.
 */
export const Playground: Story = {
  render: renderHero
};

/**
 * Simple single slide hero with image background, centered overlay text, and call-to-action button.
 * Perfect for basic landing page implementations.
 */
export const SingleSlide: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Modern workspace with natural lighting',
        title: 'Welcome to the Future',
        subtitle: 'Discover innovative solutions that transform how you work and create',
        buttonText: 'Explore Now',
        buttonAction: 'explore',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '70vh',
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero
};

/**
 * Multi-slide carousel demonstrating different overlay positions and media types.
 * Includes both images and video with autoplay functionality.
 */
export const MultiSlideCarousel: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Modern office space',
        title: 'Innovation Hub',
        subtitle: 'Where creativity meets technology in perfect harmony',
        buttonText: 'Learn More',
        buttonAction: 'learn-more',
        overlayPosition: 'left',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Team collaboration',
        title: 'Collaborative Excellence',
        subtitle: 'Building the future together through teamwork and shared vision',
        buttonText: 'Join Us',
        buttonAction: 'join-team',
        overlayPosition: 'right',
        overlayVertical: 'center'
      },
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop',
        alt: 'Dynamic video showcase',
        title: 'Experience Innovation',
        subtitle: 'See our solutions in action with interactive demonstrations',
        buttonText: 'Watch Demo',
        buttonAction: 'watch-demo',
        overlayPosition: 'center',
        overlayVertical: 'bottom'
      }
    ]),
    autoplay: 5000,
    height: '80vh',
    showDots: true,
    showArrows: true,
    pauseOnHover: true
  },
  render: renderHero
};

/**
 * Video-focused hero with poster image and minimal overlay content.
 * Ideal for product demonstrations and dynamic content.
 */
export const VideoHero: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'video',
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        poster: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop',
        alt: 'Product demonstration video',
        title: 'See It In Action',
        subtitle: 'Experience the power of our platform with this interactive demo',
        buttonText: 'Start Free Trial',
        buttonAction: 'start-trial',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '100vh',
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero
};

/**
 * Minimal hero with no text overlay, focusing purely on visual impact.
 * Perfect for image-first designs and artistic presentations.
 */
export const ImageOnly: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Beautiful minimal workspace'
      }
    ]),
    height: '60vh',
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero
};

/**
 * Hero optimized for mobile and smaller screen presentations.
 * Demonstrates responsive behavior with appropriate height and positioning.
 */
export const MobileOptimized: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Mobile-friendly hero image',
        title: 'Mobile First',
        subtitle: 'Designed for the way you work on every device',
        buttonText: 'Get the App',
        buttonAction: 'get-app',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '50vh',
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: `
This story demonstrates the hero component optimized for mobile devices with:
- Reduced height (50vh) for better mobile viewing
- Centered overlay positioning for readability
- Simplified navigation (no dots or arrows)
- Focus on essential content only

The component automatically adapts its text sizing and spacing for smaller screens.
        `
      }
    }
  }
};

/**
 * Fast-cycling carousel demonstrating rapid autoplay with smooth transitions.
 * Shows multiple content variations quickly for attention-grabbing displays.
 */
export const FastAutoplay: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Technology workspace',
        title: 'Innovation',
        subtitle: 'Cutting-edge solutions for modern challenges'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Collaboration space',
        title: 'Collaboration',
        subtitle: 'Teams working together to build the future'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop',
        alt: 'Creative environment',
        title: 'Creativity',
        subtitle: 'Where ideas come to life through design and technology'
      }
    ]),
    autoplay: 2000,
    animationDuration: 500,
    height: '70vh',
    showDots: true,
    showArrows: false,
    pauseOnHover: true
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
Fast autoplay demonstration with:
- 2-second slide intervals for rapid cycling
- 500ms transition duration for smooth, quick changes
- Pause-on-hover enabled for user control
- Dots navigation for manual override

Perfect for attention-grabbing displays and rapid content showcasing.
        `
      }
    }
  }
}; 