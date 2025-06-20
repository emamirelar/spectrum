# Spectrum App Layout - Slots Usage Guide

The `spectrum-app-layout` component provides 6 different slots for flexible content composition. This guide shows you how to use each slot effectively.

## Available Slots

| Slot Name | Location | Purpose | Required |
|-----------|----------|---------|----------|
| `logo` | Header left | Custom logo content | No |
| `header-content` | Header center | Additional header elements | No |
| `profile` | Header right | User profile/menu | No |
| `sidebar` | Left/Right sidebar | Navigation content | No |
| (default) | Main area | Primary application content | Yes |
| `footer` | Footer | Footer content | No |

## Slot Usage Examples

### 1. Logo Slot (`slot="logo"`)

Replace the default logo placeholder with custom content:

```html
<spectrum-app-layout>
  <!-- Custom Logo -->
  <div slot="logo" class="custom-logo">
    <img src="/path/to/logo.svg" alt="My App" />
  </div>
</spectrum-app-layout>
```

**Advanced Logo Examples:**

```html
<!-- Logo with company name -->
<div slot="logo" style="display: flex; align-items: center; gap: 8px;">
  <img src="/logo.svg" alt="Logo" style="height: 32px;" />
  <span style="font-weight: bold; font-size: 18px;">MyApp</span>
</div>

<!-- Icon-only logo -->
<div slot="logo" style="background: #2196f3; color: white; border-radius: 8px; padding: 8px; font-size: 16px; text-align: center;">
  🚀
</div>

<!-- Custom branded logo -->
<div slot="logo" class="branded-logo">
  <svg width="40" height="40" viewBox="0 0 40 40">
    <!-- Your SVG logo here -->
  </svg>
</div>
```

### 2. Header Content Slot (`slot="header-content"`)

Add additional elements to the header (search, notifications, breadcrumbs, etc.):

```html
<spectrum-app-layout>
  <!-- Header content -->
  <div slot="header-content" style="display: flex; align-items: center; gap: 16px;">
    <!-- Search bar -->
    <input type="search" placeholder="Search..." style="padding: 8px; border-radius: 4px; border: 1px solid #ccc;" />
    
    <!-- Notifications -->
    <button style="padding: 8px; background: transparent; border: none; cursor: pointer;">
      🔔 <span class="notification-badge">3</span>
    </button>
    
    <!-- Breadcrumbs -->
    <nav>
      <span>Home</span> › <span>Dashboard</span> › <span>Analytics</span>
    </nav>
  </div>
</spectrum-app-layout>
```

**More Header Content Examples:**

```html
<!-- Action buttons -->
<div slot="header-content">
  <spectrum-button variant="primary">New Project</spectrum-button>
  <spectrum-button variant="secondary">Import</spectrum-button>
</div>

<!-- Status indicator -->
<div slot="header-content" style="display: flex; align-items: center; gap: 8px;">
  <div style="width: 8px; height: 8px; background: #4caf50; border-radius: 50%;"></div>
  <span>System Online</span>
</div>

<!-- Tab navigation -->
<div slot="header-content">
  <nav style="display: flex; gap: 16px;">
    <a href="#dashboard" style="padding: 8px 16px; text-decoration: none;">Dashboard</a>
    <a href="#analytics" style="padding: 8px 16px; text-decoration: none;">Analytics</a>
    <a href="#reports" style="padding: 8px 16px; text-decoration: none;">Reports</a>
  </nav>
</div>
```

### 3. Profile Slot (`slot="profile"`)

Customize the user profile area:

```html
<spectrum-app-layout>
  <!-- Custom profile -->
  <div slot="profile" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
    <img src="/avatar.jpg" alt="User" style="width: 32px; height: 32px; border-radius: 50%;" />
    <div>
      <div style="font-weight: 500;">John Doe</div>
      <div style="font-size: 12px; color: #666;">Admin</div>
    </div>
    <span>▼</span>
  </div>
</spectrum-app-layout>
```

**More Profile Examples:**

```html
<!-- Simple avatar with dropdown -->
<div slot="profile" onclick="toggleProfileMenu()">
  <img src="/avatar.jpg" alt="Profile" style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;" />
</div>

<!-- Profile with status -->
<div slot="profile" style="position: relative;">
  <img src="/avatar.jpg" alt="Profile" style="width: 36px; height: 36px; border-radius: 50%;" />
  <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #4caf50; border: 2px solid white; border-radius: 50%;"></div>
</div>

<!-- Profile menu button -->
<spectrum-button slot="profile" variant="tertiary" onclick="showProfileMenu()">
  👤 Profile
</spectrum-button>
```

### 4. Sidebar Slot (`slot="sidebar"`)

Add navigation and sidebar content:

```html
<spectrum-app-layout>
  <!-- Sidebar navigation -->
  <nav slot="sidebar">
    <!-- Navigation section -->
    <div class="nav-section">
      <h3>Main</h3>
      <a href="#dashboard" class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>Dashboard</span>
      </a>
      <a href="#analytics" class="nav-item">
        <span class="nav-icon">📊</span>
        <span>Analytics</span>
      </a>
      <a href="#projects" class="nav-item">
        <span class="nav-icon">📁</span>
        <span>Projects</span>
      </a>
    </div>
    
    <!-- Secondary section -->
    <div class="nav-section">
      <h3>Tools</h3>
      <a href="#settings" class="nav-item">
        <span class="nav-icon">⚙️</span>
        <span>Settings</span>
      </a>
      <a href="#help" class="nav-item">
        <span class="nav-icon">❓</span>
        <span>Help</span>
      </a>
    </div>
  </nav>
</spectrum-app-layout>
```

**Advanced Sidebar Examples:**

```html
<!-- Sidebar with user info and navigation -->
<div slot="sidebar">
  <!-- User info at top -->
  <div style="padding: 16px; border-bottom: 1px solid #eee; text-align: center;">
    <img src="/avatar.jpg" style="width: 48px; height: 48px; border-radius: 50%;" />
    <div style="margin-top: 8px; font-weight: 500;">John Doe</div>
    <div style="font-size: 12px; color: #666;">Administrator</div>
  </div>
  
  <!-- Navigation menu -->
  <div style="padding: 16px 0;">
    <!-- Your navigation items here -->
  </div>
  
  <!-- Bottom actions -->
  <div style="margin-top: auto; padding: 16px; border-top: 1px solid #eee;">
    <spectrum-button variant="secondary" size="small">Logout</spectrum-button>
  </div>
</div>

<!-- Collapsible sidebar with spectrum components -->
<div slot="sidebar">
  <spectrum-collapsible-list>
    <!-- Your collapsible navigation here -->
  </spectrum-collapsible-list>
</div>

<!-- Sidebar with search -->
<div slot="sidebar">
  <div style="padding: 16px;">
    <spectrum-search-input placeholder="Search menu..."></spectrum-search-input>
  </div>
  <!-- Navigation items -->
</div>
```

### 5. Default Slot (Main Content)

The main application content goes in the default slot:

```html
<spectrum-app-layout>
  <!-- Other slots... -->
  
  <!-- Main content (default slot) -->
  <div class="main-content">
    <header class="page-header">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </header>
    
    <div class="content-grid">
      <div class="widget">Widget 1</div>
      <div class="widget">Widget 2</div>
      <div class="widget">Widget 3</div>
    </div>
  </div>
</spectrum-app-layout>
```

### 6. Footer Slot (`slot="footer"`)

Add footer content:

```html
<spectrum-app-layout>
  <!-- Footer content -->
  <div slot="footer" style="display: flex; justify-content: space-between; align-items: center;">
    <!-- Left side -->
    <div>
      <span>© 2024 My Company</span>
    </div>
    
    <!-- Center -->
    <nav style="display: flex; gap: 16px;">
      <a href="#privacy">Privacy</a>
      <a href="#terms">Terms</a>
      <a href="#support">Support</a>
    </nav>
    
    <!-- Right side -->
    <div>
      <span>Version 1.2.3</span>
    </div>
  </div>
</spectrum-app-layout>
```

## Complete Example

Here's a comprehensive example using all slots:

```html
<spectrum-app-layout 
  header-title="My Application"
  sidebar-expanded="true"
  sidebar-collapsible="true"
>
  <!-- Logo -->
  <div slot="logo" style="display: flex; align-items: center; gap: 8px;">
    <img src="/logo.svg" alt="MyApp" style="height: 32px;" />
    <span style="font-weight: bold;">MyApp</span>
  </div>
  
  <!-- Header content -->
  <div slot="header-content" style="display: flex; align-items: center; gap: 16px;">
    <input type="search" placeholder="Search..." style="padding: 8px; border-radius: 4px;" />
    <button style="padding: 8px; background: transparent; border: none;">🔔</button>
  </div>
  
  <!-- Profile -->
  <div slot="profile" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
    <img src="/avatar.jpg" alt="User" style="width: 32px; height: 32px; border-radius: 50%;" />
    <span>John Doe</span>
  </div>
  
  <!-- Sidebar -->
  <nav slot="sidebar" style="padding: 16px;">
    <div style="margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666; text-transform: uppercase;">Navigation</h3>
      <a href="#dashboard" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; border-radius: 8px;">
        <span>🏠</span> Dashboard
      </a>
      <a href="#projects" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; border-radius: 8px;">
        <span>📁</span> Projects
      </a>
      <a href="#analytics" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; border-radius: 8px;">
        <span>📊</span> Analytics
      </a>
    </div>
    
    <div>
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #666; text-transform: uppercase;">Tools</h3>
      <a href="#settings" style="display: flex; align-items: center; gap: 12px; padding: 12px; text-decoration: none; border-radius: 8px;">
        <span>⚙️</span> Settings
      </a>
    </div>
  </nav>
  
  <!-- Main content -->
  <div style="padding: 24px;">
    <h1>Welcome to MyApp Dashboard</h1>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 24px;">
      <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3>Widget 1</h3>
        <p>Content goes here...</p>
      </div>
      <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h3>Widget 2</h3>
        <p>More content...</p>
      </div>
    </div>
  </div>
  
  <!-- Footer -->
  <div slot="footer" style="display: flex; justify-content: between; align-items: center;">
    <span>© 2024 My Company</span>
    <nav style="display: flex; gap: 16px;">
      <a href="#help">Help</a>
      <a href="#about">About</a>
    </nav>
    <span>v1.0.0</span>
  </div>
</spectrum-app-layout>
```

## Best Practices

### 1. Slot Content Styling
- Use CSS custom properties for consistent theming
- Consider the collapse behavior when designing sidebar content
- Make sure content is accessible and responsive

### 2. Sidebar Collapse Considerations
- Design sidebar content to work in both expanded and collapsed states
- Use icons that are recognizable when text is hidden
- Consider tooltips for collapsed state

### 3. Header Layout
- Keep header content focused and not overcrowded
- Use proper spacing and alignment
- Consider mobile responsiveness

### 4. Performance
- Avoid heavy content in slots that might be hidden/shown frequently
- Use lazy loading for complex sidebar content if needed

### 5. Accessibility
- Ensure all interactive elements are keyboard accessible
- Use proper ARIA labels and roles
- Provide alternative text for images and icons

## CSS Classes for Styling

You can use these CSS classes to style slot content:

```css
/* Navigation items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.nav-item.active {
  background-color: var(--spectrum-sys-color-primary-container);
  color: var(--spectrum-sys-color-on-primary-container);
}

/* Section headers */
.nav-section h3 {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  margin: 16px 0 8px 0;
}

/* Widget styling for main content */
.widget {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.widget:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

This guide should help you effectively use all the slots in the spectrum-app-layout component! 