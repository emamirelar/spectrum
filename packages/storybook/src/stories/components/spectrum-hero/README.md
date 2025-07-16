# Spectrum Hero

A powerful, flexible hero section component with carousel functionality, media backgrounds, and call-to-action buttons. Part of the Spectrum Design System.

## Features

✨ **Rich Media Support** - Image, video, and gradient backgrounds with overlay options
🎠 **Carousel Functionality** - Multiple hero slides with smooth transitions and navigation
🎯 **Call-to-Action Integration** - Built-in button support with multiple variants and sizes
📏 **Responsive Design** - Automatic layout adaptation for all screen sizes
🎨 **Content Overlay** - Text and button overlays with customizable positioning
♿ **Accessibility First** - Full keyboard navigation, focus management, and screen reader support

## Installation

```bash
npm install @spectrum/core
```

## Basic Usage

```html
<!-- Simple hero with image background -->
<spectrum-hero 
  backgroundImage="./hero-bg.jpg"
  title="Welcome to Our Platform"
  subtitle="Discover amazing features that will transform your workflow"
  primaryButtonText="Get Started"
  primaryButtonAction="get-started">
</spectrum-hero>

<!-- Hero with video background -->
<spectrum-hero 
  backgroundVideo="./hero-video.mp4"
  backgroundImage="./hero-fallback.jpg"
  title="Innovation in Motion"
  subtitle="Experience the future of digital solutions"
  primaryButtonText="Watch Demo"
  primaryButtonAction="watch-demo"
  secondaryButtonText="Learn More"
  secondaryButtonAction="learn-more">
</spectrum-hero>

<!-- Hero carousel with multiple slides -->
<spectrum-hero carousel="true" autoplay="true" autoplayInterval="5000">
  <spectrum-hero-slide 
    backgroundImage="./slide1.jpg"
    title="First Feature"
    subtitle="Discover our innovative solutions"
    primaryButtonText="Explore"
    primaryButtonAction="explore-1">
  </spectrum-hero-slide>
  <spectrum-hero-slide 
    backgroundImage="./slide2.jpg"
    title="Second Feature"
    subtitle="Streamline your workflow"
    primaryButtonText="Try Now"
    primaryButtonAction="try-2">
  </spectrum-hero-slide>
  <spectrum-hero-slide 
    backgroundImage="./slide3.jpg"
    title="Third Feature"
    subtitle="Scale your business"
    primaryButtonText="Get Started"
    primaryButtonAction="start-3">
  </spectrum-hero-slide>
</spectrum-hero>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'compact' \| 'full-screen' \| 'banner'` | `'default'` | Hero section style variant |
| `backgroundImage` | `string` | `''` | Background image URL |
| `backgroundVideo` | `string` | `''` | Background video URL |
| `backgroundGradient` | `string` | `''` | CSS gradient for background |
| `overlay` | `boolean` | `true` | Whether to show content overlay |
| `overlayOpacity` | `number` | `0.4` | Overlay opacity (0-1) |
| `overlayColor` | `string` | `'#000000'` | Overlay color |
| `title` | `string` | `''` | Main hero title |
| `subtitle` | `string` | `''` | Hero subtitle/description |
| `textAlign` | `'left' \| 'center' \| 'right'` | `'center'` | Text alignment |
| `contentPosition` | `'top' \| 'center' \| 'bottom'` | `'center'` | Vertical content positioning |
| `height` | `string` | `'500px'` | Hero section height |
| `minHeight` | `string` | `'400px'` | Minimum hero section height |

### Button Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `primaryButtonText` | `string` | `''` | Primary button label |
| `primaryButtonAction` | `string` | `''` | Primary button action identifier |
| `primaryButtonVariant` | `string` | `'primary'` | Primary button variant |
| `secondaryButtonText` | `string` | `''` | Secondary button label |
| `secondaryButtonAction` | `string` | `''` | Secondary button action identifier |
| `secondaryButtonVariant` | `string` | `'secondary'` | Secondary button variant |
| `buttonSize` | `'small' \| 'medium' \| 'large'` | `'large'` | Button size for all buttons |
| `buttonGap` | `string` | `'1rem'` | Gap between buttons |

### Carousel Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `carousel` | `boolean` | `false` | Enable carousel functionality |
| `autoplay` | `boolean` | `false` | Auto-advance slides |
| `autoplayInterval` | `number` | `5000` | Autoplay interval (ms) |
| `showNavigation` | `boolean` | `true` | Show navigation arrows |
| `showIndicators` | `boolean` | `true` | Show slide indicators |
| `transition` | `'slide' \| 'fade' \| 'scale'` | `'slide'` | Slide transition type |
| `transitionDuration` | `number` | `600` | Transition duration (ms) |
| `pauseOnHover` | `boolean` | `true` | Pause autoplay on hover |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `heroAction` | `CustomEvent<{action: string, buttonType: 'primary' \| 'secondary'}>` | Fired when button is clicked |
| `slideChange` | `CustomEvent<{action: 'slide-change', currentSlide: number, totalSlides: number}>` | Fired when carousel slide changes |
| `carouselPlay` | `CustomEvent<{action: 'play'}>` | Fired when carousel starts playing |
| `carouselPause` | `CustomEvent<{action: 'pause'}>` | Fired when carousel is paused |
| `mediaLoaded` | `CustomEvent<{action: 'media-loaded', type: 'image' \| 'video'}>` | Fired when background media loads |
| `mediaError` | `CustomEvent<{action: 'media-error', type: 'image' \| 'video'}>` | Fired when background media fails to load |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `nextSlide()` | - | `void` | Advance to next slide |
| `previousSlide()` | - | `void` | Go to previous slide |
| `goToSlide(index: number)` | `index` | `void` | Go to specific slide |
| `play()` | - | `void` | Start carousel autoplay |
| `pause()` | - | `void` | Pause carousel autoplay |
| `getCurrentSlide()` | - | `number` | Get current slide index |
| `getTotalSlides()` | - | `number` | Get total number of slides |

### Hero Slide Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `backgroundImage` | `string` | `''` | Slide background image |
| `backgroundVideo` | `string` | `''` | Slide background video |
| `title` | `string` | `''` | Slide title |
| `subtitle` | `string` | `''` | Slide subtitle |
| `primaryButtonText` | `string` | `''` | Slide primary button text |
| `primaryButtonAction` | `string` | `''` | Slide primary button action |
| `secondaryButtonText` | `string` | `''` | Slide secondary button text |
| `secondaryButtonAction` | `string` | `''` | Slide secondary button action |

## CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--hero-background` | `var(--spectrum-sys-color-surface)` | Hero background color |
| `--hero-text-color` | `var(--spectrum-sys-color-on-surface)` | Hero text color |
| `--hero-title-size` | `var(--spectrum-sys-typescale-display-large-size)` | Title font size |
| `--hero-subtitle-size` | `var(--spectrum-sys-typescale-body-large-size)` | Subtitle font size |
| `--hero-content-padding` | `var(--spectrum-sys-spacing-xx-large)` | Content padding |
| `--hero-content-max-width` | `800px` | Maximum content width |
| `--hero-overlay-background` | `rgba(0, 0, 0, 0.4)` | Overlay background |
| `--hero-button-gap` | `var(--spectrum-sys-spacing)` | Gap between buttons |
| `--hero-transition-duration` | `0.6s` | Transition duration |
| `--hero-border-radius` | `var(--spectrum-sys-shape-corner-medium)` | Hero border radius |

## Advanced Usage

### Dynamic Content Updates

```javascript
// Get hero component
const hero = document.querySelector('spectrum-hero');

// Listen for button actions
hero.addEventListener('heroAction', (e) => {
  const { action, buttonType } = e.detail;
  console.log(`${buttonType} button clicked:`, action);
});

// Control carousel programmatically
hero.addEventListener('slideChange', (e) => {
  const { currentSlide, totalSlides } = e.detail;
  console.log(`Slide ${currentSlide + 1} of ${totalSlides}`);
});

// Navigate carousel
hero.nextSlide();
hero.goToSlide(2);
hero.pause();
```

### Responsive Background Images

```html
<!-- Different images for different screen sizes -->
<spectrum-hero 
  backgroundImage="./hero-desktop.jpg"
  backgroundImageTablet="./hero-tablet.jpg"
  backgroundImageMobile="./hero-mobile.jpg"
  title="Responsive Hero">
</spectrum-hero>
```

### Custom Content Overlay

```html
<!-- Hero with custom content slot -->
<spectrum-hero backgroundImage="./hero-bg.jpg" overlay="false">
  <div slot="content" class="custom-hero-content">
    <h1>Custom Hero Title</h1>
    <p>Custom subtitle with <strong>HTML formatting</strong></p>
    <div class="custom-buttons">
      <spectrum-button variant="primary" size="large">Custom Action</spectrum-button>
      <spectrum-button variant="outline" size="large">Learn More</spectrum-button>
    </div>
  </div>
</spectrum-hero>
```

## Variants

### Default
Standard hero section with centered content and medium height.

### Compact
Reduced height hero suitable for secondary pages.

### Full Screen
Full viewport height hero for maximum impact.

### Banner
Horizontal banner-style hero for promotional content.

## Media Handling

### Image Optimization
- Supports WebP format with JPEG fallback
- Lazy loading for improved performance
- Responsive image selection based on viewport
- Automatic image compression and optimization

### Video Backgrounds
- MP4 format with poster image fallback
- Autoplay with muted attribute for browser compliance
- Loop and controls configuration
- Mobile-friendly with image fallback

### Performance Considerations
- Preload critical hero images
- Use appropriate image sizes for different viewports
- Implement lazy loading for carousel slides
- Optimize video compression for web delivery

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate to interactive elements
- **Enter/Space**: Activate buttons
- **Arrow Keys**: Navigate carousel slides (when focused)
- **Home/End**: Go to first/last slide
- **Escape**: Pause autoplay

### Screen Reader Support
- Proper heading hierarchy for titles
- Alt text for background images
- Carousel slide announcements
- Button action descriptions
- Auto-play status announcements

### Focus Management
- Clear focus indicators on all interactive elements
- Focus trapped within hero during keyboard navigation
- Logical focus order through content
- Focus restoration after carousel navigation

## Related Components

- **spectrum-button**: Provides call-to-action button functionality
- **spectrum-carousel**: Can be used for more complex carousel needs

## Migration Notes

### From Other Hero Components
When migrating from other hero implementations:
1. Update background image properties to new naming convention
2. Replace button markup with new button properties
3. Update event handlers to use new event structure with `action` attribute
4. Convert custom overlays to use slot-based content

### Performance Optimization
- Use next-gen image formats (WebP, AVIF) with fallbacks
- Implement critical CSS for above-the-fold hero content
- Preload hero images for instant display
- Use appropriate video compression for background videos

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Examples

See the **Examples** section in Storybook for comprehensive usage patterns including:
- Basic hero implementations
- Carousel configurations
- Media background options
- Content positioning
- Integration patterns

---

**Part of Spectrum Design System** • [View Source](../../packages/core/src/components/spectrum-hero/) • [Report Issues](../../issues) 