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
 * - **Direct Navigation**: Optional direct navigation via href, target, and rel attributes
 * - **Custom Overlay Styling**: Full CSS control over overlay container appearance and layout
 * - **Design Enhancement**: Rounded corners and gradient shade overlay for better presentation
 * - **Responsive Design**: Adaptive layouts with configurable height and positioning
 * - **Accessibility**: Full keyboard navigation and screen reader support
 * - **Performance Optimized**: Efficient rendering with smooth animations
 * 
 * ### Navigation Modes
 * - **Event-based**: Traditional event emission for custom handling (default)
 * - **Direct navigation**: HTML anchor tags for immediate page navigation
 * - **Mixed approach**: Combine both modes in the same hero component
 * 
 * ### Usage Guidelines
 * - Use for: Landing page headers, feature showcases, product highlights
 * - Perfect for: Brand storytelling, product demos, call-to-action sections
 * - Avoid when: Simple static content would suffice, complex forms or data entry
 * 
 * ### Event System (Component Events Rule Compliant)
 * All events follow the Component Events Rule with consistent action attributes:
 * - **heroAction**: Emitted when action buttons are clicked with slide context (always fired, even with direct navigation)
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
  // Navigation support (optional direct navigation)
  buttonHref?: string; // URL for direct navigation when button is clicked
  buttonTarget?: string; // Target for navigation (e.g., '_blank' for new tab)
  buttonRel?: string; // Rel attribute for security when using target="_blank"
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
  rounded: boolean;
  shaded: boolean;
  overlayStyle: string;
  overlayPosition: 'left' | 'center' | 'right';
  overlayVertical: 'top' | 'center' | 'bottom';
  srcset: string;
  sizes: string;
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
  // Navigation support (optional direct navigation)
  buttonHref?: string;               // URL for direct navigation when button is clicked
  buttonTarget?: string;             // Target for navigation (e.g., '_blank' for new tab)
  buttonRel?: string;                // Rel attribute for security when using target="_blank"
  srcset?: string;                   // Responsive image sources with width descriptors
  sizes?: string;                    // Image sizes for different viewport conditions
}
\`\`\`

### Overlay Positioning
- **Horizontal**: left, center, right - Controls text alignment and positioning
- **Vertical**: top, center, bottom - Controls vertical placement of overlay content

### Media Support
- **Images**: Any web-compatible image format (JPEG, PNG, WebP, SVG)
- **Responsive Images**: Full srcset and sizes support for optimized delivery
- **Videos**: MP4, WebM with optional poster images for loading states

### Responsive Image Features
- **srcset**: Multiple image sources with width/density descriptors
- **sizes**: Media queries defining image display sizes
- **Performance**: Automatic selection of optimal image for device/viewport
- **Bandwidth**: Reduced data usage on mobile devices
- **Quality**: High-resolution images on retina displays

### Carousel Features
- **Autoplay**: Configurable timing with pause-on-hover support
- **Navigation**: Dots and arrows with keyboard accessibility
- **Transitions**: Smooth animations with customizable duration

### Interactive Controls
- **Overlay Position**: Use the controls panel to change horizontal (left, center, right) and vertical (top, center, bottom) positioning
- **Responsive Images**: Configure srcset and sizes for optimized image delivery across devices
- **Live Preview**: All changes update in real-time as you adjust the controls
- **All Stories**: Controls work across all story variants for easy experimentation

### Basic Usage
\`\`\`
<spectrum-hero
  slides='[{"type":"image","src":"image.jpg","srcset":"image-480w.jpg 480w, image-800w.jpg 800w, image-1200w.jpg 1200w","sizes":"(max-width: 600px) 100vw, 50vw","title":"Welcome","buttonText":"Get Started"}]'
  autoplay="5000"
  height="70vh"
  overlay-style="padding: 2rem 3rem; background: rgba(0,0,0,0.1);"
  rounded="true"
  shaded="true">
</spectrum-hero>
\`\`\`

### Navigation Examples

#### Direct Navigation
\`\`\`javascript
const directNavSlide = {
  type: 'image',
  src: '/hero-image.jpg',
  title: 'Welcome to Our Site',
  buttonText: 'Get Started',
  buttonHref: '/getting-started',  // Direct navigation
  buttonTarget: '_blank',          // Open in new tab
  buttonRel: 'noopener noreferrer' // Security for external links
};
\`\`\`

#### Event-Based Interaction
\`\`\`javascript
const eventSlide = {
  type: 'image',
  src: '/hero-image.jpg',
  title: 'Custom Action',
  buttonText: 'Sign Up',
  buttonAction: 'show-signup-modal' // Emits heroAction event
};

// Listen for events
document.addEventListener('heroAction', (event) => {
  if (event.detail.action === 'show-signup-modal') {
    // Show custom modal
  }
});
\`\`\`

#### Mixed Approach
\`\`\`javascript
const mixedSlides = [
  {
    // Direct navigation slide
    type: 'image',
    src: '/slide1.jpg',
    title: 'Visit Store',
    buttonText: 'Shop Now',
    buttonHref: '/store'
  },
  {
    // Event-based slide
    type: 'image',
    src: '/slide2.jpg', 
    title: 'Join Us',
    buttonText: 'Sign Up',
    buttonAction: 'show-signup'
  }
];
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
    debug: false,
    rounded: false,
    shaded: true,
    overlayStyle: '',
    overlayPosition: 'left',
    overlayVertical: 'center',
    srcset: '',
    sizes: ''
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
    },
    rounded: {
      control: 'boolean',
      description: 'Enable rounded corners using Spectrum design tokens',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    shaded: {
      control: 'boolean',
      description: 'Add gradient shade overlay between media and content for better text readability',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    },
    overlayStyle: {
      control: 'text',
      description: 'Custom CSS styles for the overlay container (CSS style string)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    overlayPosition: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Horizontal positioning of overlay content',
      table: {
        type: { summary: "'left' | 'center' | 'right'" },
        defaultValue: { summary: "'left'" }
      }
    },
    overlayVertical: {
      control: { type: 'select' },
      options: ['top', 'center', 'bottom'],
      description: 'Vertical positioning of overlay content',
      table: {
        type: { summary: "'top' | 'center' | 'bottom'" },
        defaultValue: { summary: "'center'" }
      }
    },
    srcset: {
      control: 'text',
      description: 'Responsive image sources for different screen densities (e.g., "image-320w.jpg 320w, image-640w.jpg 640w, image-1200w.jpg 1200w")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    },
    sizes: {
      control: 'text',
      description: 'Image sizes for different viewport conditions (e.g., "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw")',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<SpectrumHeroArgs>;

// Interactive render function
const renderHero = (args: SpectrumHeroArgs) => {
  // Parse slides and update overlay positions and responsive images dynamically
  let parsedSlides: HeroSlide[] = [];
  try {
    parsedSlides = JSON.parse(args.slides);
    // Update all slides with the current settings
    parsedSlides = parsedSlides.map(slide => ({
      ...slide,
      overlayPosition: args.overlayPosition,
      overlayVertical: args.overlayVertical,
      // Only add srcset and sizes if they're provided
      ...(args.srcset && { srcset: args.srcset }),
      ...(args.sizes && { sizes: args.sizes })
    }));
  } catch (error) {
    console.warn('Error parsing slides:', error);
    parsedSlides = [];
  }

  const dynamicSlides = JSON.stringify(parsedSlides);

  return html`
    <spectrum-theme 
      theme="light" 
      color="#1976d2"
    >
      <div style="width: 100%; min-height: 400px;">
        <spectrum-hero
          slides=${dynamicSlides}
          autoplay=${args.autoplay}
          animation-duration=${args.animationDuration}
          pause-on-hover=${args.pauseOnHover}
          show-dots=${args.showDots}
          show-arrows=${args.showArrows}
          height=${args.height}
          keyboard-navigation=${args.keyboardNavigation}
          debug=${args.debug}
          rounded=${args.rounded}
          shaded=${args.shaded}
          overlay-style=${args.overlayStyle}
          @heroAction=${(e: CustomEvent) => action('heroAction')(e.detail)}
          @slideChange=${(e: CustomEvent) => action('slideChange')(e.detail)}
        ></spectrum-hero>
      </div>
    </spectrum-theme>
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
 * Multi-slide carousel demonstrating both horizontal and vertical overlay positioning options.
 * Shows left, right, center horizontal positioning plus top, center, bottom vertical alignment.
 */
export const MultiSlideCarousel: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Left-aligned overlay demonstration',
        title: 'Left Positioning',
        subtitle: 'Content aligned to the left creates a strong visual anchor and natural reading flow',
        buttonText: 'Explore Left',
        buttonAction: 'demo-left',
        overlayPosition: 'left',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Right-aligned overlay demonstration',
        title: 'Right Positioning',
        subtitle: 'Right-aligned content creates balance and draws attention to the opposite side',
        buttonText: 'Try Right',
        buttonAction: 'demo-right',
        overlayPosition: 'right',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop',
        alt: 'Center-aligned overlay demonstration',
        title: 'Center Positioning',
        subtitle: 'Centered content provides maximum impact and symmetrical presentation',
        buttonText: 'See Center',
        buttonAction: 'demo-center',
        overlayPosition: 'center',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6ad42?q=80&w=2372&auto=format&fit=crop',
        alt: 'Top vertical alignment demonstration',
        title: 'Top Vertical Alignment',
        subtitle: 'Left-aligned content positioned at the top creates prominence and draws immediate attention',
        buttonText: 'Explore Top',
        buttonAction: 'demo-top',
        overlayPosition: 'left',
        overlayVertical: 'top'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
        alt: 'Center vertical alignment demonstration',
        title: 'Center Vertical Alignment',
        subtitle: 'Left-aligned content with center vertical positioning provides balanced composition',
        buttonText: 'Try Center',
        buttonAction: 'demo-center-vertical',
        overlayPosition: 'left',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop',
        alt: 'Bottom vertical alignment demonstration',
        title: 'Bottom Vertical Alignment',
        subtitle: 'Left-aligned content at the bottom creates grounding and stability in the design',
        buttonText: 'See Bottom',
        buttonAction: 'demo-bottom',
        overlayPosition: 'left',
        overlayVertical: 'bottom'
      }
    ]),
    autoplay: 5000,
    height: '80vh',
    showDots: true,
    showArrows: true,
    pauseOnHover: true
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This carousel demonstrates both horizontal and vertical overlay positioning with 6 comprehensive examples:

## **Horizontal Positioning Examples (Slides 1-3)**

### **Slide 1: Left Horizontal**
- **Position**: \`overlayPosition: 'left', overlayVertical: 'center'\`
- **Best for**: Western reading patterns, natural content flow
- **Use case**: Text-heavy content, storytelling, traditional layouts

### **Slide 2: Right Horizontal** 
- **Position**: \`overlayPosition: 'right', overlayVertical: 'center'\`
- **Best for**: Creating visual balance, drawing attention
- **Use case**: Call-to-action focused content, complementing left-side imagery

### **Slide 3: Center Horizontal**
- **Position**: \`overlayPosition: 'center', overlayVertical: 'center'\` 
- **Best for**: Maximum impact, hero statements, symmetrical designs
- **Use case**: Brand messaging, product launches, attention-grabbing content

## **Vertical Positioning Examples (Slides 4-6)**

### **Slide 4: Top Vertical (Left-aligned)**
- **Position**: \`overlayPosition: 'left', overlayVertical: 'top'\`
- **Best for**: Prominence, immediate attention, header-style content
- **Use case**: Announcements, breaking news, priority messaging

### **Slide 5: Center Vertical (Left-aligned)**
- **Position**: \`overlayPosition: 'left', overlayVertical: 'center'\`
- **Best for**: Balanced composition, standard hero sections
- **Use case**: Product features, general messaging, balanced layouts

### **Slide 6: Bottom Vertical (Left-aligned)**
- **Position**: \`overlayPosition: 'left', overlayVertical: 'bottom'\`
- **Best for**: Grounding content, stable foundations, footer-style messaging
- **Use case**: Contact information, credits, supporting details

## **Design Guidelines:**
- **Horizontal**: Left (natural), Right (balance), Center (impact)
- **Vertical**: Top (prominence), Center (balance), Bottom (grounding)
- **Combinations**: Mix horizontal and vertical positioning for precise control

Perfect for understanding how positioning affects visual hierarchy, user attention, and content effectiveness.
        `
      }
    }
  }
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

/**
 * Hero with rounded corners demonstrating the design token-based border radius feature.
 * Shows how the rounded prop enhances visual presentation with Spectrum design consistency.
 */
export const RoundedCorners: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Modern workspace with rounded presentation',
        title: 'Elegant Design',
        subtitle: 'Sophisticated rounded corners using Spectrum design tokens',
        buttonText: 'View Gallery',
        buttonAction: 'view-gallery',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '70vh',
    rounded: true,
    shaded: true,
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the rounded corners feature:
- Uses Spectrum design tokens for consistent border radius
- Adapts responsively (smaller radius on mobile devices)
- Maintains visual hierarchy and accessibility
- Perfect for card-based layouts and modern designs

The \`rounded\` prop applies \`--spectrum-sys-shape-corner-large\` by default.
        `
      }
    }
  }
};

/**
 * Hero without gradient shade overlay, showing pure media display.
 * Demonstrates when to disable the shade for artistic or high-contrast content.
 */
export const NoShade: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'High contrast image without overlay',
        title: 'Pure Imagery',
        subtitle: 'Clean presentation without gradient overlay',
        buttonText: 'Explore',
        buttonAction: 'explore-clean',
        overlayPosition: 'right',
        overlayVertical: 'bottom'
      }
    ]),
    height: '70vh',
    rounded: false,
    shaded: false,
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story shows the hero without the gradient shade overlay:
- Pure media display without color filtering
- Text relies on natural image contrast and text shadows
- Ideal for high-contrast images or artistic presentations
- Best when image naturally provides good text contrast

Use \`shaded={false}\` when the background image provides sufficient contrast for text readability.
        `
      }
    }
  }
};

/**
 * Hero showcasing both rounded corners and gradient shade features together.
 * Perfect example of modern card-based hero design with enhanced readability.
 */
export const RoundedWithShade: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Complete hero design showcase',
        title: 'Complete Design',
        subtitle: 'Rounded corners with gradient shade for optimal presentation',
        buttonText: 'Get Started',
        buttonAction: 'get-started-complete',
        overlayPosition: 'left',
        overlayVertical: 'center'
      }
    ]),
    height: '80vh',
    rounded: true,
    shaded: true,
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story combines both new features:
- **Rounded corners**: Elegant Spectrum design token-based border radius
- **Gradient shade**: Dynamic color overlay using \`--spectrum-color-on-primary-container\`
- **Enhanced readability**: Text remains readable on any background
- **Design consistency**: Follows Spectrum design system principles

The gradient shade uses \`color-mix()\` for modern browser support with fallback colors.
        `
      }
    }
  }
};

/**
 * Hero with dynamic theming based on wallpaper color extraction.
 * Demonstrates coordination between spectrum-wallpaper, spectrum-theme, and hero gradient shade.
 */
export const WallpaperThemedHero: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2340&auto=format&fit=crop',
        alt: 'Mountain landscape with dynamic theming',
        title: 'Dynamic Theming',
        subtitle: 'Colors extracted from wallpaper image create a cohesive design system',
        buttonText: 'Experience Nature',
        buttonAction: 'explore-nature',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '90vh',
    rounded: true,
    shaded: true,
    autoplay: 0,
    showDots: false,
    showArrows: false,
    debug: false
  },
    render: (args: SpectrumHeroArgs) => {
    return html`
      <div style="width: 100%; height: 100vh; position: relative;">
        <spectrum-wallpaper 
          background="url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80)"
          background-size="cover"
          background-position="center"
          .showSwatches=${false}
          debug="false"
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
        >
          <spectrum-theme 
            theme="light" 
            wait-for-wallpaper="true"
            coordination-timeout="3000"
            debug="false"
          >
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;">
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
                rounded=${args.rounded}
                shaded=${args.shaded}
                overlay-style=${args.overlayStyle}
                @heroAction=${(e: CustomEvent) => action('heroAction')(e.detail)}
                @slideChange=${(e: CustomEvent) => action('slideChange')(e.detail)}
              ></spectrum-hero>
            </div>
          </spectrum-theme>
        </spectrum-wallpaper>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates advanced theming coordination:

### **Wallpaper Color Extraction**
- **spectrum-wallpaper** extracts dominant colors from the mountain landscape image
- **Analyzes** the image to find complementary color palettes
- **Generates** Material Design 3 compatible color schemes

### **Theme Coordination** 
- **spectrum-theme** waits for wallpaper color extraction (\`wait-for-wallpaper="true"\`)
- **Applies** extracted colors to create a cohesive theme
- **Generates** \`--spectrum-color-on-primary-container\` from the image colors

### **Hero Integration**
- **Gradient shade** automatically adapts to the extracted theme colors
- **Text readability** is enhanced using colors derived from the wallpaper
- **Visual harmony** between background, theme, and content overlay

### **Technical Implementation**
- Event-based coordination prevents FOUC (Flash of Unstyled Content)
- Fallback colors ensure graceful degradation
- Cross-browser compatible color parsing and application

Try changing the wallpaper image URL to see how the entire design system adapts!
        `
      }
    }
  }
};

/**
 * Hero with vibrant sunset wallpaper demonstrating warm color theming.
 * Shows how the gradient shade adapts to orange/red color palettes.
 */
export const SunsetThemedHero: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2340&auto=format&fit=crop',
        alt: 'Sunset landscape with warm theming',
        title: 'Sunset Vibes',
        subtitle: 'Warm colors create an inviting atmosphere',
        buttonText: 'Watch Sunset',
        buttonAction: 'watch-sunset',
        overlayPosition: 'right',
        overlayVertical: 'bottom'
      }
    ]),
    height: '85vh',
    rounded: false,
    shaded: true,
    autoplay: 0,
    showDots: false,
    showArrows: false,
    debug: false
  },
  render: (args: SpectrumHeroArgs) => {
    return html`
      <div style="width: 100%; height: 100vh; position: relative;">
        <spectrum-wallpaper 
          background="url(https://images.unsplash.com/photo-1495954484750-af469f2f9be5?w=1200&q=80)"
          background-size="cover"
          background-position="center"
          .showSwatches=${false}
          debug="false"
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
        >
          <spectrum-theme 
            theme="light" 
            wait-for-wallpaper="true"
            coordination-timeout="3000"
            debug="false"
          >
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;">
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
                rounded=${args.rounded}
                shaded=${args.shaded}
                overlay-style=${args.overlayStyle}
                @heroAction=${(e: CustomEvent) => action('heroAction')(e.detail)}
                @slideChange=${(e: CustomEvent) => action('slideChange')(e.detail)}
              ></spectrum-hero>
            </div>
          </spectrum-theme>
        </spectrum-wallpaper>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
This story showcases warm color theming with a sunset wallpaper:

- **Vibrant sunset image** provides orange, red, and pink dominant colors
- **Warm color palette** creates an inviting, energetic atmosphere  
- **Hero gradient shade** adapts to complement the warm tones
- **Text contrast** automatically optimized for sunset-derived colors

Perfect for demonstrating how the component system handles different color moods and palettes.
        `
      }
    }
  }
};

/**
 * Red wallpaper with white hero content - demonstrating color contrast theming
 */
export const RedWallpaperWhiteHero: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1477601263568-180e2c6d046e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Beautiful landscape image',
        title: 'Pure Elegance',
        subtitle: 'Where red passion meets white serenity',
        buttonText: 'Explore Contrast',
        buttonAction: 'explore-contrast',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '90vh',
    rounded: true,
    shaded: true,
    autoplay: 0,
    showDots: false,
    showArrows: false,
    debug: false
  },
  render: (args: SpectrumHeroArgs) => {
    return html`
      <div style="width: 100%; height: 100vh; position: relative;">
        <spectrum-wallpaper 
          background="url(https://images.unsplash.com/photo-1568535904307-f48b760a39f3?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
          background-size="cover"
          background-position="center"
          .showSwatches=${false}
          debug="false"
          style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;"
        >
          <spectrum-theme 
            theme="light" 
            wait-for-wallpaper="true"
            coordination-timeout="3000"
            debug="false"
          >
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10;">
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
                rounded=${args.rounded}
                shaded=${args.shaded}
                overlay-style=${args.overlayStyle}
                @heroAction=${(e: CustomEvent) => action('heroAction')(e.detail)}
                @slideChange=${(e: CustomEvent) => action('slideChange')(e.detail)}
              ></spectrum-hero>
            </div>
          </spectrum-theme>
        </spectrum-wallpaper>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: `
**Red wallpaper with white hero content** - demonstrating contrasting color theming:

- **Red flowers/roses wallpaper** drives the theme color extraction  
- **Snow covered mountains hero** provides high contrast white content
- **Dynamic shade** will show red tints from the wallpaper theming
- **Color coordination** between warm red background and cool white content

This showcases how the wallpaper's extracted colors influence the hero's shade overlay, creating a cohesive design even with contrasting content.
        `
      }
    }
  }
};

/**
 * Hero with custom overlay styling demonstrating the flexible CSS control feature.
 * Shows how the overlayStyle attribute provides complete control over overlay appearance.
 */
export const CustomOverlayStyle: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Office workspace with custom padding',
        title: 'Enhanced Styling',
        subtitle: 'Custom overlay styles create sophisticated layouts with complete control over appearance',
        buttonText: 'Learn More',
        buttonAction: 'learn-overlay-styling',
        overlayPosition: 'left',
        overlayVertical: 'center'
      }
    ]),
    height: '70vh',
    rounded: true,
    shaded: true,
    overlayStyle: 'padding: 3rem 4rem;',
    autoplay: 0,
    showDots: false,
    showArrows: false
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the overlayStyle feature:
- **Custom overlay styling**: \`overlay-style="padding: 3rem 4rem;"\` creates generous spacing around content
- **Full CSS control**: Apply any CSS properties like padding, margin, background, border, etc.
- **CSS flexibility**: Accepts any valid CSS declaration string with multiple properties
- **Advanced styling**: Create complex overlay effects beyond simple padding

### OverlayStyle Examples:
- \`overlay-style="padding: 2rem;"\` - Simple uniform padding
- \`overlay-style="padding: 1rem 2rem; background: rgba(0,0,0,0.2);"\` - Padding with background
- \`overlay-style="margin: 2rem; border-radius: 1rem; backdrop-filter: blur(10px);"\` - Advanced glass effect
- \`overlay-style="width: 50%; max-width: 600px; padding: 2rem;"\` - Width control with padding

Perfect for creating sophisticated overlay designs and complete control over content presentation.
        `
      }
    }
  }
};

/**
 * Comparison of different overlay styles showing how CSS affects overlay appearance.
 * Demonstrates multiple slides with different overlay styling configurations.
 */
export const OverlayStyleVariations: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Default styling example',
        title: 'Default Styling',
        subtitle: 'Uses the component default CSS styles for clean, minimal presentation',
        buttonText: 'Default',
        buttonAction: 'default-style',
        overlayPosition: 'center',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Compact styling example',
        title: 'Compact Style',
        subtitle: 'Efficient use of space with focused content presentation',
        buttonText: 'Compact',
        buttonAction: 'compact-style',
        overlayPosition: 'left',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop',
        alt: 'Premium styling example',
        title: 'Premium Design',
        subtitle: 'Luxurious spacing and enhanced background create an elevated experience',
        buttonText: 'Premium',
        buttonAction: 'premium-style',
        overlayPosition: 'right',
        overlayVertical: 'center'
      }
    ]),
    height: '75vh',
    rounded: false,
    shaded: true,
    overlayStyle: 'padding: 1rem 2rem;',
    autoplay: 4000,
    showDots: true,
    showArrows: true,
    pauseOnHover: true
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This carousel demonstrates how different overlay styles affect the overall feel of hero content:

### **Slide 1**: Default CSS Styling
- Uses component's default styling with minimal overlay styles
- Standard spacing for typical use cases

### **Slide 2**: Compact Style (\`padding: 1rem 2rem;\`)
- Compact presentation for dense content
- Good for mobile-first designs
- Maintains readability while maximizing content area

### **Slide 3**: Premium Style (\`padding: 3rem 4rem; background: rgba(0,0,0,0.1);\`)  
- Spacious, premium feel with subtle background enhancement
- Better for luxury brands or artistic presentations
- Creates strong visual hierarchy with enhanced readability

### **Design Considerations:**
- **Mobile**: Use smaller padding and minimal effects for limited screen space
- **Desktop**: Larger padding and advanced effects for better visual impact
- **Content density**: More content = less styling, minimal content = more visual effects
- **Brand alignment**: Premium brands can use more effects, utility brands keep it minimal

### **Advanced Styling Options:**
- Background colors/gradients for enhanced readability
- Border radius for modern card-like appearance
- Backdrop filters for glass morphism effects
- Width controls for content area management

The autoplay cycle lets you compare how different overlay styles affect the same content layout.
        `
      }
    }
  }
};

/**
 * Full viewport hero demonstrating complete screen takeover for maximum impact.
 * Perfect for landing pages and immersive brand experiences.
 */
export const FullViewport: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop&ixlib=rb-4.0.3',
        alt: 'Immersive full-screen workspace',
        title: 'Immersive Experience',
        subtitle: 'Full viewport height creates maximum visual impact and complete user engagement',
        buttonText: 'Enter Experience',
        buttonAction: 'enter-full-experience',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '100vh',
    autoplay: 0,
    showDots: false,
    showArrows: false,
    rounded: false,
    shaded: true,
    overlayStyle: 'padding: 4rem; text-align: center;'
  },
  render: (args: SpectrumHeroArgs) => {
    return html`
      <spectrum-theme 
        theme="light" 
        color="#1976d2"
      >
        <div style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 999;">
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
            rounded=${args.rounded}
            shaded=${args.shaded}
            overlay-style=${args.overlayStyle}
            @heroAction=${(e: CustomEvent) => action('heroAction')(e.detail)}
            @slideChange=${(e: CustomEvent) => action('slideChange')(e.detail)}
          ></spectrum-hero>
        </div>
      </spectrum-theme>
    `;
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
This story demonstrates a true full viewport hero experience:

### **Full Viewport Features**
- **100vh height**: Occupies the complete browser viewport height
- **Full-screen positioning**: Uses \`position: fixed\` and \`100vw\` width for complete screen takeover
- **Maximum impact**: Creates an immersive, distraction-free experience
- **Center-focused**: Overlay content is centered both horizontally and vertically

### **Design Characteristics**
- **No navigation controls**: Clean, minimal interface without dots or arrows
- **Generous padding**: \`padding: 4rem\` with center text alignment for balanced composition
- **Shade overlay**: Maintains text readability across any background image
- **Fixed positioning**: Ensures consistent viewport coverage regardless of container

### **Ideal Use Cases**
- **Landing page heroes**: First impression with maximum visual impact
- **Brand storytelling**: Immersive narrative experiences
- **Product launches**: Dramatic reveals and announcements
- **Portfolio showcases**: Full-screen artistic presentations
- **App splash screens**: Loading or welcome experiences

### **Implementation Notes**
- Uses Storybook's \`layout: 'fullscreen'\` parameter for proper viewport display
- \`position: fixed\` with \`z-index: 999\` ensures proper layering
- \`100vw\` width handles any container constraints
- Responsive typography and spacing adapt to all screen sizes

Perfect for when you need the hero to be the primary focus with no competing elements.
        `
      }
    }
  }
};

/**
 * Responsive images hero demonstrating srcset and sizes for optimized image delivery.
 * Shows how the component automatically selects the best image for each device and viewport.
 */
export const ResponsiveImages: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3',
        alt: 'Responsive workspace image optimized for all devices',
        title: 'Responsive Performance',
        subtitle: 'Optimized images automatically adapt to your device and connection speed',
        buttonText: 'Experience Speed',
        buttonAction: 'experience-responsive',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '80vh',
    autoplay: 0,
    showDots: false,
    showArrows: false,
    rounded: true,
    shaded: true,
    overlayStyle: 'padding: 3rem; text-align: center;',
    srcset: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.0.3 480w, https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3 800w, https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3 1200w, https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3 1920w',
    sizes: '(max-width: 480px) 100vw, (max-width: 800px) 100vw, (max-width: 1200px) 100vw, 1920px'
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates responsive image optimization with srcset and sizes:

### **Responsive Image Configuration**

#### **srcset Breakpoints**
- **480w**: Mobile portrait - Small, fast-loading image for mobile devices
- **800w**: Tablet/mobile landscape - Medium resolution for tablets and small laptops  
- **1200w**: Desktop - High resolution for standard desktop screens
- **1920w**: Large desktop/retina - Ultra-high resolution for large monitors and retina displays

#### **sizes Media Queries**
- **(max-width: 480px) 100vw**: Mobile devices use full viewport width
- **(max-width: 800px) 100vw**: Tablets use full viewport width
- **(max-width: 1200px) 100vw**: Small desktops use full viewport width
- **1920px**: Large screens cap at 1920px maximum width

### **Performance Benefits**

#### **Bandwidth Optimization**
- **Mobile users**: Automatically receive 480w image (~50KB instead of ~500KB)
- **Tablet users**: Get 800w image optimized for their screen size
- **Desktop users**: Receive full 1200w+ image for crisp display
- **Retina displays**: Automatically select 2x resolution when needed

#### **Loading Performance**
- **Faster initial load**: Browsers request only the optimal image size
- **Reduced data usage**: Significant bandwidth savings on mobile connections
- **Better user experience**: Faster page loads improve engagement
- **SEO benefits**: Core Web Vitals improvements from optimized images

### **Implementation Best Practices**

#### **Image Widths**
- Choose breakpoints that match your design's key viewport sizes
- Include at least 3-4 sizes: mobile (320-480w), tablet (768-800w), desktop (1200w), large (1920w+)
- Consider 2x versions for retina displays (add density descriptors like \`2x\`)

#### **Sizes Attribute**
- Match your CSS layout: if hero takes 50% width on desktop, use \`50vw\`
- Include viewport-specific rules for responsive designs  
- End with a fallback size (no media query) for the largest screens

#### **Format Optimization**
- Use modern formats (WebP, AVIF) when supported
- Provide JPEG fallbacks for broader compatibility
- Consider different compression levels for different breakpoints

### **Browser Support**
- **srcset**: Supported in all modern browsers (97%+ global support)
- **sizes**: Full support across all major browsers
- **Graceful degradation**: Falls back to \`src\` attribute in older browsers

### **Testing Responsive Images**
- **Browser DevTools**: Network tab shows which image size was loaded
- **Device simulation**: Test different viewport sizes to verify correct image selection  
- **Connection throttling**: Verify performance on slower connections
- **Real devices**: Test on actual mobile devices for accurate performance assessment

Use the controls panel to experiment with different srcset and sizes configurations!
        `
      }
    }
  }
};

/**
 * Direct navigation hero demonstrating HTML anchor tag functionality.
 * Button will navigate directly to the specified URL without emitting custom events for navigation.
 */
export const DirectNavigation: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Direct navigation demo',
        title: 'Direct Navigation',
        subtitle: 'Click the button to navigate directly to an external site',
        buttonText: 'Visit Example.com',
        buttonHref: 'https://example.com',
        buttonTarget: '_blank',
        buttonRel: 'noopener noreferrer',
        overlayPosition: 'center',
        overlayVertical: 'center'
      }
    ]),
    height: '70vh',
    autoplay: 0,
    showDots: false,
    showArrows: false,
    rounded: true,
    shaded: true
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates direct navigation functionality:

### **Direct Navigation Features**
- **buttonHref**: \`"https://example.com"\` - Direct URL navigation
- **buttonTarget**: \`"_blank"\` - Opens link in new tab/window
- **buttonRel**: \`"noopener noreferrer"\` - Security attributes for external links
- **No custom navigation logic**: Browser handles the navigation directly

### **Security Considerations**
- \`noopener\`: Prevents the new page from accessing \`window.opener\`
- \`noreferrer\`: Prevents referrer information from being passed
- Automatic application when \`target="_blank"\` without explicit \`rel\` attribute

### **Event Behavior**
- \`heroAction\` event is still emitted for tracking and analytics
- Navigation happens via standard browser anchor tag behavior
- No need for custom event listeners for navigation logic

### **Use Cases**
- External website links
- Documentation links
- Social media profiles
- Download links
- Contact pages

Perfect for simple navigation scenarios where custom logic isn't needed.
        `
      }
    }
  }
};

/**
 * Event-based hero demonstrating traditional custom event handling.
 * Button emits custom events for complete control over user interactions.
 */
export const EventBased: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Event-based interaction demo',
        title: 'Event-Based Interaction',
        subtitle: 'Click the button to see custom event emission in the Actions panel',
        buttonText: 'Trigger Custom Event',
        buttonAction: 'custom-signup-action',
        overlayPosition: 'left',
        overlayVertical: 'center'
      }
    ]),
    height: '70vh',
    autoplay: 0,
    showDots: false,
    showArrows: false,
    rounded: false,
    shaded: true
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates traditional event-based interactions:

### **Event-Based Features**
- **buttonAction**: \`"custom-signup-action"\` - Custom action identifier
- **No href attribute**: Button renders as \`<button>\` element, not \`<a>\`
- **Full custom control**: Application handles all interaction logic

### **Event Handling Pattern**
\`\`\`javascript
document.addEventListener('heroAction', (event) => {
  const { action, slideIndex, slideTitle } = event.detail;
  
  switch(action) {
    case 'custom-signup-action':
      // Show signup modal
      showSignupModal();
      break;
    case 'other-action':
      // Handle other actions
      break;
  }
});
\`\`\`

### **Event Payload**
- \`action\`: "custom-signup-action" (from buttonAction)
- \`slideIndex\`: Current slide number (0-based)
- \`slideTitle\`: "Event-Based Interaction" (slide title)

### **Use Cases**
- Modal dialogs
- Form submissions  
- Custom navigation logic
- Analytics tracking
- Multi-step workflows
- Conditional actions

Check the Actions panel below to see the emitted event details when you click the button!
        `
      }
    }
  }
};

/**
 * Mixed navigation hero demonstrating both direct navigation and event-based slides in one carousel.
 * Shows the flexibility of combining different interaction patterns within the same component.
 */
export const MixedNavigation: Story = {
  args: {
    slides: JSON.stringify([
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop',
        alt: 'Direct navigation slide',
        title: 'Direct Navigation',
        subtitle: 'This slide navigates directly to Google',
        buttonText: 'Visit Google',
        buttonHref: 'https://google.com',
        buttonTarget: '_blank',
        overlayPosition: 'left',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2326&auto=format&fit=crop',
        alt: 'Event-based slide',
        title: 'Event-Based Action',
        subtitle: 'This slide emits a custom event',
        buttonText: 'Show Modal',
        buttonAction: 'show-modal-action',
        overlayPosition: 'right',
        overlayVertical: 'center'
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2339&auto=format&fit=crop',
        alt: 'Internal navigation slide',
        title: 'Internal Navigation',
        subtitle: 'This slide navigates to an internal page',
        buttonText: 'Go to About',
        buttonHref: '/about',
        buttonAction: 'internal-page-visit',
        overlayPosition: 'center',
        overlayVertical: 'bottom'
      }
    ]),
    height: '75vh',
    autoplay: 4000,
    showDots: true,
    showArrows: true,
    pauseOnHover: true,
    rounded: false,
    shaded: true
  },
  render: renderHero,
  parameters: {
    docs: {
      description: {
        story: `
This carousel demonstrates mixing direct navigation and event-based interactions:

### **Slide 1: Direct External Navigation**
- **Pattern**: Direct navigation to external site
- **buttonHref**: \`"https://google.com"\`
- **buttonTarget**: \`"_blank"\` (new tab)
- **Use case**: External links, documentation, social media

### **Slide 2: Event-Based Custom Action**
- **Pattern**: Custom event emission for application logic
- **buttonAction**: \`"show-modal-action"\`
- **No href**: Renders as button element
- **Use case**: Modals, forms, custom workflows

### **Slide 3: Direct Internal Navigation** 
- **Pattern**: Direct navigation to internal page
- **buttonHref**: \`"/about"\`
- **buttonAction**: \`"internal-page-visit"\` (for analytics)
- **Use case**: Internal page navigation with tracking

### **Event Emission Behavior**
All slides emit \`heroAction\` events regardless of navigation type:
- **Direct navigation slides**: Event fired for tracking, then browser navigates
- **Event-based slides**: Event fired for custom handling

### **Implementation Benefits**
- **Flexibility**: Choose the right pattern for each slide
- **Performance**: Direct navigation for simple links, events for complex logic
- **Analytics**: Track all interactions consistently
- **Maintainability**: Clear separation of concerns

### **Best Practices**
- Use direct navigation for simple page transitions
- Use events for modals, forms, and complex interactions
- Always include \`buttonAction\` for analytics, even with direct navigation
- Consider user expectations (external links in new tabs)

Watch the carousel cycle through all three patterns and check the Actions panel for event details!
        `
      }
    }
  }
};

 