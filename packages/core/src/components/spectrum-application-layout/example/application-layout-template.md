# Application Layout Template - Spectrum Design System

## Design Specifications

This responsive application layout template is based on the Figma Spectrum Design System featuring a **full-width 3-column flexible layout** with fixed header and footer sections. The design fills the entire viewport width and prioritizes flexibility, accessibility, and modern web application patterns with semantic color coding and seamless section boundaries with no gaps between areas.

## Design Analysis

### Visual Structure
The layout consists of **6 primary sections** organized in a 2×3 grid pattern:
- **Top Row**: Header sections with App ID, Middle content, and Utility areas
- **Bottom Row**: Main content sections with Left Area, Center Area, and Right Area
- **Fixed Elements**: Header and footer sections maintain consistent 72px height
- **Flexible Elements**: All areas grow to fill available space with a 1:2:1 flex ratio (left:center:right)

### Layout Dimensions

**Heights:**
- **Header/Footer**: 72px (fixed height for consistency)
- **Navigation Slot**: Takes up available space (flex: 1)
- **Content Slot**: Takes up available space (flex: 1)
- **Right Pane Slot**: Takes up available space (flex: 1)

**Widths:**
- **Total Width**: 100% of viewport width (full display)
- **Left Column** (App ID, Navigation, Footer Left): min-width: 96px, max-width: 320px
- **Right Column** (Utility, Right Pane, Footer Right): min-width: 96px, max-width: 320px
- **Center Column** (Middle, Content, Footer Center): Takes up available space (flex: 1)
- **Layout**: Seamless sections with no gaps between areas

### Layout System
**Constrained-width layout** with **fixed side columns** and **flexible center area**:

**Layout Approach:**
- **Left/Right Columns**: Fixed min/max width constraints (96px-320px)
- **Center Column**: Flexible width that takes up available space
- **All Heights**: Fixed in px for predictable vertical behavior

**Width Constraints:**
- **Left Column**: min-width: 96px, max-width: 320px
- **Right Column**: min-width: 96px, max-width: 320px
- **Center Column**: Flexible (grows/shrinks with viewport)

**Height Constraints:**
- **Header/Footer**: Fixed 72px height
- **Main Content Areas**: Flexible height (takes available space)

**Horizontal Spacing:**
- **vw Units**: Used only for proportional horizontal spacing (0.88vw base)
- **px Units**: Used for all layout widths and constraints

**Benefits:**
- ✅ **Predictable layout behavior** with fixed side column constraints
- ✅ **Flexible center area** adapts to content and viewport size
- ✅ **Fixed vertical dimensions** for consistent header/footer heights
- ✅ **Optimized for common application patterns** (nav + content + sidebar)
- ✅ **Typography and heights remain readable** by staying in px units
- ✅ **Responsive design** adapts gracefully to different screen sizes

## CSS Variables Reference

### Layout Foundation
```css
:root {
  /* Layout Heights - Fixed in px from Figma Frame */
  --layout-header-height: 72px;       /* h-[72px] from Figma */
  --layout-footer-height: 72px;       /* h-[72px] from Figma */
  
  /* Layout Widths - Fixed constraints for side areas */
  --layout-topbar-width: 100vw;       /* Full viewport width */
  --layout-left-width-min: 96px;      /* Left area min-width */
  --layout-left-width-max: 320px;     /* Left area max-width */
  --layout-right-width-min: 96px;     /* Right area min-width */
  --layout-right-width-max: 320px;    /* Right area max-width */
  
  /* Flex Properties - Left/Right fixed width, Center takes available space */
  --layout-side-flex-basis: auto;     /* Use min-width as basis */
  --layout-side-flex-grow: 0;         /* Don't grow beyond max-width */
  --layout-side-flex-shrink: 0;       /* Don't shrink below min-width */
  --layout-center-flex-grow: 1;       /* Center takes available space */
  --layout-center-flex-shrink: 0;     /* Center maintains content */
  
  /* Area Flex Properties */
  --layout-left-flex: 0 0 auto;       /* Left area: don't grow/shrink, use width constraints */
  --layout-center-flex: 1;            /* Center area: take available space */
  --layout-right-flex: 0 0 auto;      /* Right area: don't grow/shrink, use width constraints */
  
  /* Z-Index Layers */
  --z-header: 100;
  --z-footer: 100;
  --z-content: 1;
}
```

### Semantic Color System
```css
:root {
  /* Header/Topbar Colors */
  --color-app-id-bg: #d7fff6;                    /* Light teal - App branding area */
  --color-header-middle-bg: #eedeff;             /* Light purple - Search/header content */
  --color-utility-bg: rgba(255, 252, 233, 0.7);  /* Light yellow - User actions/utilities */
  
  /* Main Content Colors */
  --color-navigation-bg: #a2ffe9;                /* Mint green - Navigation area */
  --color-content-bg: rgba(221, 161, 251, 0.6);  /* Light purple - Main content */
  --color-right-pane-bg: #fff7b4;                /* Light yellow - Sidebar/panels */
  
  /* Footer Colors */
  --color-footer-left-bg: #77d6c0;               /* Darker teal - Footer navigation */
  --color-footer-center-bg: #f398ff;             /* Bright magenta - Footer content */
  --color-footer-right-bg: rgba(188, 181, 66, 0.7); /* Olive yellow - Footer utilities */
  
  /* Base Colors */
  --color-background: #ffffff;                    /* Primary background */
  --color-overlay: rgba(255, 255, 255, 0.3);     /* Topbar overlay */
  --color-text-primary: #000000;                 /* Primary text */
  --color-text-secondary: #666666;               /* Secondary text */
}
```

### Typography System
```css
:root {
  /* Font Families */
  --font-primary: 'Noto Sans', system-ui, -apple-system, sans-serif;
  --font-secondary: 'Noto Sans', Arial, sans-serif;
  
  /* Font Sizes - Kept in px for readability across all screen sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.8;
}
```

### Responsive Breakpoints
```css
:root {
  /* Breakpoint Variables - Traditional px-based for media queries */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### Spacing System
```css
:root {
  /* Horizontal Spacing - vw units for proportional width scaling */
  --spacing-h-xs: 0.29vw;    /* 4px -> (4/1366)*100 = 0.29vw */
  --spacing-h-sm: 0.59vw;    /* 8px -> (8/1366)*100 = 0.59vw */
  --spacing-h-md: 0.88vw;    /* 12px -> (12/1366)*100 = 0.88vw - Base spacing from design token 3:12 */
  --spacing-h-lg: 1.17vw;    /* 16px -> (16/1366)*100 = 1.17vw */
  --spacing-h-xl: 1.76vw;    /* 24px -> (24/1366)*100 = 1.76vw */
  --spacing-h-2xl: 2.34vw;   /* 32px -> (32/1366)*100 = 2.34vw */
  --spacing-h-3xl: 3.51vw;   /* 48px -> (48/1366)*100 = 3.51vw */
  
  /* Vertical Spacing - px units for consistent heights */
  --spacing-v-xs: 4px;
  --spacing-v-sm: 8px;
  --spacing-v-md: 12px;  /* Base spacing from design token 3:12 */
  --spacing-v-lg: 16px;
  --spacing-v-xl: 24px;
  --spacing-v-2xl: 32px;
  --spacing-v-3xl: 48px;
  
  /* Component Internal Spacing */
  --header-padding: var(--spacing-v-md);
  --content-padding: var(--spacing-v-lg);
  --footer-padding: var(--spacing-v-md);
}
```



### Transition System
```css
:root {
  /* Animation Durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  
  /* Easing Functions */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  
  /* Transition Presets */
  --transition-all: all var(--duration-normal) var(--ease-in-out);
  --transition-transform: transform var(--duration-normal) var(--ease-in-out);
  --transition-opacity: opacity var(--duration-fast) var(--ease-out);
}
```

## HTML Structure

### Semantic Layout Framework
```html
<div class="application-layout">
  <!-- Header Section -->
  <header class="layout-header" role="banner">
    <section class="header-app-id" aria-label="Application branding">
      <!-- App logo, brand, navigation trigger -->
    </section>
    <section class="header-middle" aria-label="Primary header content">
      <!-- Search bar, breadcrumbs, page title -->
    </section>
    <section class="header-utility" aria-label="User actions and utilities">
      <!-- User menu, notifications, settings -->
    </section>
  </header>

  <!-- Main Content Area -->
  <main class="layout-content" role="main">
    <!-- Left Area -->
    <nav class="content-navigation" role="navigation" aria-label="Left area navigation">
      <!-- Navigation menu, left content -->
    </nav>

    <!-- Center Area -->
    <section class="content-main" aria-label="Center area main content">
      <!-- Primary application content -->
    </section>

    <!-- Right Area -->
    <aside class="content-sidebar" role="complementary" aria-label="Right area sidebar">
      <!-- Sidebar panels, right content -->
    </aside>
  </main>

  <!-- Footer Section -->
  <footer class="layout-footer" role="contentinfo">
    <section class="footer-left" aria-label="Footer navigation">
      <!-- Secondary navigation, footer links -->
    </section>
    <section class="footer-center" aria-label="Footer content">
      <!-- Status information, breadcrumbs -->
    </section>
    <section class="footer-right" aria-label="Footer utilities">
      <!-- Additional actions, version info -->
    </section>
  </footer>
</div>
```

## CSS Implementation

### Base Layout Styles
```css
/* Application Layout Container */
.application-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: var(--color-background);
  font-family: var(--font-primary);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

/* Header Layout */
.layout-header {
  display: flex;
  height: var(--layout-header-height);
  background-color: var(--color-overlay);
  z-index: var(--z-header);
  position: relative;
  gap: 0; /* No gaps between header sections */
}

.header-app-id {
  flex: var(--layout-left-flex);
  background-color: var(--color-app-id-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--header-padding);
  min-width: var(--layout-left-width-min);
  max-width: var(--layout-left-width-max);
}

.header-middle {
  flex: var(--layout-center-flex);
  background-color: var(--color-header-middle-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--header-padding);
}

.header-utility {
  flex: var(--layout-right-flex);
  background-color: var(--color-utility-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--header-padding);
  min-width: var(--layout-right-width-min);
  max-width: var(--layout-right-width-max);
}

/* Main Content Layout */
.layout-content {
  display: flex;
  flex: 1;
  gap: 0; /* No gaps between sections */
}

.content-navigation {
  flex: var(--layout-left-flex);
  background-color: var(--color-navigation-bg);
  display: flex;
  flex-direction: column;
  padding: var(--content-padding);
  min-width: var(--layout-left-width-min);
  max-width: var(--layout-left-width-max);
}

.content-main {
  flex: var(--layout-center-flex);
  background-color: var(--color-content-bg);
  display: flex;
  flex-direction: column;
  padding: var(--content-padding);
  overflow-y: auto;
}

.content-sidebar {
  flex: var(--layout-right-flex);
  background-color: var(--color-right-pane-bg);
  display: flex;
  flex-direction: column;
  padding: var(--content-padding);
  min-width: var(--layout-right-width-min);
  max-width: var(--layout-right-width-max);
}

/* Footer Layout */
.layout-footer {
  display: flex;
  height: var(--layout-footer-height);
  z-index: var(--z-footer);
  position: relative;
  gap: 0; /* No gaps between footer sections */
}

.footer-left {
  flex: var(--layout-left-flex);
  background-color: var(--color-footer-left-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--footer-padding);
  min-width: var(--layout-left-width-min);
  max-width: var(--layout-left-width-max);
}

.footer-center {
  flex: var(--layout-center-flex);
  background-color: var(--color-footer-center-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--footer-padding);
}

.footer-right {
  flex: var(--layout-right-flex);
  background-color: var(--color-footer-right-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--footer-padding);
  min-width: var(--layout-right-width-min);
  max-width: var(--layout-right-width-max);
}
```

## Responsive Design Implementation

### Tablet Layout (≤ 1024px)
```css
@media (max-width: 1024px) {
  :root {
    /* Adjust width constraints for tablets */
    --layout-left-width-min: 80px;     /* Smaller minimum width */
    --layout-left-width-max: 250px;    /* Smaller maximum width */
    --layout-right-width-min: 80px;    /* Smaller minimum width */
    --layout-right-width-max: 250px;   /* Smaller maximum width */
    
    /* Adjust horizontal spacing for smaller screens */
    --spacing-h-xs: 0.5vw;     /* Slightly larger relative spacing on smaller screens */
    --spacing-h-sm: 0.8vw;
    --spacing-h-md: 1.2vw;
    --spacing-h-lg: 1.6vw;
    --spacing-h-xl: 2.4vw;
    --spacing-h-2xl: 3.2vw;
    --spacing-h-3xl: 4.8vw;
    
    /* Vertical spacing remains consistent in px */
    --spacing-v-sm: 6px;      /* Slightly smaller padding on tablets */
    --spacing-v-md: 10px;
    --spacing-v-lg: 14px;
    
    --header-padding: var(--spacing-v-sm);
    --content-padding: var(--spacing-v-md);
    --footer-padding: var(--spacing-v-sm);
  }
  
  .layout-content {
    flex-direction: column;
  }
  
  .content-navigation,
  .content-main,
  .content-sidebar {
    width: 100%;
    flex: none;
  }
  
  .content-main {
    order: 1;
    flex: 1; /* Main content takes available space */
  }
  
  .content-navigation {
    order: 2;
  }
  
  .content-sidebar {
    order: 3;
  }
}
```

### Mobile Layout (≤ 768px)
```css
@media (max-width: 768px) {
  :root {
    /* Mobile width constraints - full width stacking */
    --layout-left-width-min: 100%;     /* Full width on mobile */
    --layout-left-width-max: 100%;     /* Full width on mobile */
    --layout-right-width-min: 100%;    /* Full width on mobile */
    --layout-right-width-max: 100%;    /* Full width on mobile */
    
    /* Mobile-optimized horizontal spacing */
    --spacing-h-xs: 0.8vw;
    --spacing-h-sm: 1.2vw;
    --spacing-h-md: 1.8vw;
    --spacing-h-lg: 2.4vw;
    --spacing-h-xl: 3.6vw;
    --spacing-h-2xl: 4.8vw;
    --spacing-h-3xl: 7.2vw;
    
    /* Mobile vertical spacing */
    --spacing-v-xs: 3px;
    --spacing-v-sm: 6px;
    --spacing-v-md: 8px;
    --spacing-v-lg: 12px;
    
    /* Mobile header/footer heights remain fixed */
    --layout-header-height: 60px;
    --layout-footer-height: 60px;
    --font-size-base: 14px;
  }
  
  .layout-header,
  .layout-footer {
    flex-direction: column;
    height: auto;
  }
  
  .header-app-id,
  .header-middle,
  .header-utility,
  .footer-left,
  .footer-center,
  .footer-right {
    width: 100%;
    flex: none;
  }
  
  .header-middle,
  .footer-center {
    order: -1;
  }
}
```

## Accessibility Features

### Keyboard Navigation
```css
/* Focus States */
.header-app-id:focus-within,
.header-middle:focus-within,
.header-utility:focus-within,
.content-navigation:focus-within,
.content-main:focus-within,
.content-sidebar:focus-within,
.footer-left:focus-within,
.footer-center:focus-within,
.footer-right:focus-within {
  outline: 2px solid #005fcc;
  outline-offset: 2px;
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --color-app-id-bg: #00ff00;
    --color-header-middle-bg: #0000ff;
    --color-utility-bg: #ffff00;
    --color-navigation-bg: #00ffff;
    --color-content-bg: #ff00ff;
    --color-right-pane-bg: #ff8000;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --transition-all: none;
    --transition-transform: none;
    --transition-opacity: none;
  }
}
```

### Screen Reader Support
```css
/* Screen Reader Only Content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Usage Guidelines

### 1. Implementation Steps
1. **Include CSS Variables**: Add the variable definitions to your root stylesheet
2. **Set up HTML Structure**: Use the semantic HTML structure provided
3. **Customize Variables**: Adjust colors, spacing, and dimensions for your brand
4. **Test Responsiveness**: Verify layout behavior across breakpoints
5. **Validate Accessibility**: Test keyboard navigation and screen reader compatibility

### 2. Customization Examples

#### Brand Color Override
```css
:root {
  --color-app-id-bg: #your-brand-primary;
  --color-header-middle-bg: #your-brand-secondary;
  --color-utility-bg: #your-brand-accent;
}
```

#### Layout Proportion Adjustment
```css
:root {
  --layout-left-flex: 1;   /* Left area proportion */
  --layout-center-flex: 3; /* Make center area take more space (1:3:1 ratio) */
  --layout-right-flex: 1;  /* Right area proportion */
  --layout-header-height: 80px;  /* Taller header */
}
```

#### Typography Customization
```css
:root {
  --font-primary: 'Your Custom Font', sans-serif;
  --font-size-base: 18px;
  --line-height-normal: 1.6;
}
```

### 3. Content Integration Patterns

#### Left Area Integration
```html
<nav class="content-navigation">
  <ul class="nav-menu">
    <li><a href="#dashboard">Dashboard</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#settings">Settings</a></li>
  </ul>
</nav>
```

#### Center Area Integration
```html
<section class="content-main">
  <header class="content-header">
    <h1>Page Title</h1>
    <nav class="breadcrumbs">...</nav>
  </header>
  <div class="content-body">
    <!-- Main content -->
  </div>
</section>
```

#### Right Area Integration
```html
<aside class="content-sidebar">
  <div class="sidebar-panel">
    <h3>Quick Actions</h3>
    <!-- Panel content -->
  </div>
  <div class="sidebar-panel">
    <h3>Recent Activity</h3>
    <!-- Panel content -->
  </div>
</aside>
```

## JavaScript Integration

### Basic Layout Controller
```javascript
class ApplicationLayout {
  constructor() {
    this.layout = document.querySelector('.application-layout');
    this.leftArea = document.querySelector('.content-navigation');
    this.centerArea = document.querySelector('.content-main');
    this.rightArea = document.querySelector('.content-sidebar');
    this.init();
  }

  init() {
    this.setupResponsiveHandlers();
    this.setupKeyboardNavigation();
    this.setupA11yFeatures();
  }

  setupResponsiveHandlers() {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    mediaQuery.addEventListener('change', (e) => {
      this.handleResponsiveChange(e.matches);
    });
  }

  handleResponsiveChange(isMobile) {
    this.layout.classList.toggle('mobile-layout', isMobile);
    this.announceLayoutChange(isMobile);
  }

  announceLayoutChange(isMobile) {
    const message = isMobile ? 'Layout changed to mobile view' : 'Layout changed to desktop view';
    this.announceToScreenReader(message);
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  }
}

// Initialize layout
document.addEventListener('DOMContentLoaded', () => {
  new ApplicationLayout();
});
```

## Performance Considerations

### CSS Optimization
```css
/* Use contain for performance */
.content-main {
  contain: layout style paint;
}

.content-navigation,
.content-sidebar {
  contain: layout style;
}

/* Optimize repaints */
.layout-header,
.layout-footer {
  will-change: transform;
}

/* Seamless layout - no gaps for optimal performance */
.layout-header,
.layout-content,
.layout-footer {
  gap: 0;
}
```

### Loading Strategy
```html
<!-- Critical CSS inline -->
<style>
  /* Critical layout styles */
</style>

<!-- Non-critical CSS deferred -->
<link rel="preload" href="layout-theme.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

## Testing Checklist

### Visual Testing
- [ ] Layout fills entire viewport width (100% of display)
- [ ] All color values match Figma specifications
- [ ] Header and footer maintain 72px height
- [ ] Center area grows to fill available space
- [ ] Left area and right area flex appropriately with 1:2:1 ratio
- [ ] All sections touch seamlessly with no gaps between areas

### Responsive Testing
- [ ] Layout adapts correctly at tablet breakpoints
- [ ] Mobile layout stacks sections appropriately
- [ ] Layout fills entire viewport width on all screen sizes
- [ ] Touch targets meet minimum 44px requirement
- [ ] Text remains readable at all sizes

### Accessibility Testing
- [ ] Keyboard navigation works through all sections
- [ ] Screen reader announces section changes
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Layout works with high contrast mode

### Performance Testing
- [ ] Initial layout renders within 1 second
- [ ] Responsive changes are smooth (60fps)
- [ ] No layout shifts during load
- [ ] Memory usage remains stable
- [ ] Layout performs well at all viewport widths

## Integration with Design Systems

### Design Token Integration
```css
/* Map design tokens to CSS variables */
:root {
  --color-primary: var(--spectrum-color-primary, #d7fff6);
  --color-secondary: var(--spectrum-color-secondary, #eedeff);
  --spacing-base: var(--spectrum-spacing-base, 12px); /* For internal component spacing */
  --font-family-base: var(--spectrum-font-family, 'Inter', sans-serif);
}
```

### Component Library Integration
```html
<!-- Use existing components within layout -->
<header class="layout-header">
  <section class="header-app-id">
    <spectrum-app-brand></spectrum-app-brand>
  </section>
  <section class="header-middle">
    <spectrum-search-bar></spectrum-search-bar>
  </section>
  <section class="header-utility">
    <spectrum-user-menu></spectrum-user-menu>
  </section>
</header>
```

## File Organization

```
components/
├── ApplicationLayout/
│   ├── application-layout.md          # This specification
│   ├── application-layout.html        # HTML template
│   ├── application-layout.css         # Main styles
│   ├── application-layout.js          # JavaScript controller
│   ├── application-layout-theme.css   # Theme variables
│   └── application-layout-mobile.css  # Mobile-specific styles
```

This comprehensive specification provides teams with everything needed to implement a consistent, accessible, and responsive application layout template based on the Figma Spectrum Design System. 