# CPIT Spectrum Web Components - Accessibility Fixes Required

This document outlines accessibility issues identified in CPIT Spectrum web components during Lighthouse auditing of the DDEV site. These issues should be addressed in the upstream component library.

## 🔍 Audit Details

- **Audit Date**: January 4, 2025
- **Lighthouse Version**: 12.8.1
- **Target URL**: https://starter-twig.ddev.site/home
- **Overall Accessibility Score**: 0.83 (83%)

## ❌ Critical Issues

### 1. Touch Target Size (`target-size`)

**Component**: `spectrum-hero`
**Impact**: Serious
**WCAG Guidelines**: WCAG 2.2 AA (2.5.8)

#### Issue Description

Hero component carousel dot buttons are too small for accessible touch interaction.

#### Failing Elements

```html
<!-- All hero dots fail the 24px minimum touch target requirement -->
<button
  class="spectrum-hero__dot spectrum-hero__dot--active"
  role="tab"
  aria-selected=""
  aria-label="Go to slide 1"
></button>
```

#### Current Measurements

- **Dot 1 (active)**: 14.4px × 14.4px (should be ≥24px × 24px)
- **Dot 2**: 12px × 12px (should be ≥24px × 24px)
- **Dot 3**: 12px × 12px (should be ≥24px × 24px)
- **Safe clickable space**: 12.8px diameter (should be ≥24px diameter)

#### Required Fix

- Increase button dimensions to minimum 24px × 24px
- Ensure adequate spacing between dots (24px minimum)
- Consider increasing padding/clickable area without changing visual size

### 2. Video Captions (`video-caption`)

**Component**: `spectrum-hero`
**Impact**: Critical
**WCAG Guidelines**: WCAG 2.1 AA (1.2.2)

#### Issue Description

Video elements in hero component lack captions for deaf and hearing-impaired users.

#### Failing Elements

```html
<video
  class="spectrum-hero__media"
  src="https://starter-twig.ddev.site/uploads/img/Video_Ready_No_Crosses.mp4"
  autoplay=""
  loop=""
  playsinline=""
  aria-label="Community Engagement"
></video>
```

#### Required Fix

- Add `<track>` elements with `kind="captions"`
- Provide caption files (WebVTT format recommended)
- Ensure captions are properly synchronized
- Consider subtitle support for multiple languages

#### Example Implementation

```html
<video
  class="spectrum-hero__media"
  src="video.mp4"
  autoplay
  loop
  playsinline
  aria-label="Community Engagement"
>
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" default />
  <track kind="captions" src="captions-fr.vtt" srclang="fr" label="Français" />
</video>
```

## 📋 Component-Specific Recommendations

### spectrum-hero Component

1. **Touch Accessibility**
   - Implement larger touch targets for carousel controls
   - Add keyboard navigation support
   - Ensure focus indicators are visible and properly sized

2. **Media Accessibility**
   - Support for video captions
   - Alternative content for users who cannot view videos
   - Proper ARIA labels and descriptions

3. **Motion Accessibility**
   - Respect `prefers-reduced-motion` settings
   - Provide pause/play controls for autoplay content
   - Consider animation duration and intensity

## 🛠️ Implementation Notes

### For Component Library Maintainers

1. **Testing Requirements**
   - Test with screen readers (NVDA, JAWS, VoiceOver)
   - Verify touch target sizes on mobile devices
   - Validate keyboard navigation paths
   - Check color contrast ratios

2. **Documentation Updates**
   - Update component API documentation
   - Provide accessibility usage examples
   - Document required caption file formats

3. **Breaking Changes**
   - Touch target size changes may affect visual layout
   - New caption requirements may require content updates
   - Consider providing migration guide for existing implementations

### For Project Implementers

**Immediate Workarounds** (until component fixes are available):

```css
/* Increase hero dot touch targets */
.spectrum-hero__dot {
  min-width: 24px !important;
  min-height: 24px !important;
  margin: 0 6px !important; /* Ensure adequate spacing */
}

/* Ensure focus visibility */
.spectrum-hero__dot:focus {
  outline: 2px solid #0070d2;
  outline-offset: 2px;
}
```

## 📊 Impact Assessment

### User Groups Affected

- **Motor impairments**: Small touch targets create interaction barriers
- **Visual impairments**: Screen reader users miss video content without captions
- **Hearing impairments**: Cannot access video content without captions
- **Cognitive impairments**: May struggle with precise targeting of small controls

### Compliance Impact

- **WCAG 2.1 AA**: Currently failing 1.2.2 (Captions)
- **WCAG 2.2 AA**: Currently failing 2.5.8 (Target Size)
- **Section 508**: Compliance issues with multimedia and interactive content
- **EN 301 549**: European accessibility standard violations

## 🔄 Follow-up Actions

1. **Report to Component Library Team**
   - Create issues in CPIT Spectrum repository
   - Provide detailed reproduction steps
   - Include WCAG compliance requirements

2. **Track Implementation**
   - Monitor component library releases
   - Test fixes in development environment
   - Update project when fixes are available

3. **User Testing**
   - Conduct accessibility testing with real users
   - Validate fixes meet actual user needs
   - Document lessons learned for future components

---

**Note**: This document should be shared with the CPIT Spectrum component library maintainers for upstream fixes. The issues identified affect the fundamental accessibility of the component library and should be prioritized for resolution.
