import { newSpecPage } from '@stencil/core/testing';
import { SpectrumMediaLibrary, MediaItem } from '../spectrum-media-library';

describe('spectrum-media-library', () => {
  const sampleMediaItems: MediaItem[] = [
    {
      id: 'img1',
      type: 'image',
      url: 'https://example.com/image1.jpg',
      altText: 'Sample image 1',
      caption: 'Test caption 1'
    },
    {
      id: 'vid1',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      altText: 'Sample video',
      caption: 'Test video',
      platform: 'youtube'
    }
  ];

  it('renders with default properties', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('renders with media items', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    page.root.mediaItems = sampleMediaItems;
    await page.waitForChanges();
    
    const thumbnails = page.root.shadowRoot.querySelectorAll('.spectrum-media-library__thumbnail');
    expect(thumbnails.length).toBe(2);
  });

  it('parses JSON string media items', async () => {
    const jsonString = JSON.stringify(sampleMediaItems);
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    page.root.mediaItems = jsonString;
    await page.waitForChanges();
    
    const thumbnails = page.root.shadowRoot.querySelectorAll('.spectrum-media-library__thumbnail');
    expect(thumbnails.length).toBe(2);
  });

  it('handles invalid JSON gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    page.root.mediaItems = 'invalid json';
    await page.waitForChanges();
    
    const emptyState = page.root.shadowRoot.querySelector('.spectrum-media-library__empty');
    expect(emptyState).toBeTruthy();
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('applies horizontal layout modifier', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library horizontal></spectrum-media-library>`,
    });
    
    const container = page.root.shadowRoot.querySelector('.spectrum-media-library');
    expect(container.classList.contains('spectrum-media-library--horizontal')).toBe(true);
  });

  it('applies vertical layout modifier', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    const container = page.root.shadowRoot.querySelector('.spectrum-media-library');
    expect(container.classList.contains('spectrum-media-library--vertical')).toBe(true);
  });

  it('extracts YouTube video ID and thumbnail', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    const youtubeItem: MediaItem = {
      id: 'yt1',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      altText: 'YouTube video'
    };
    
    page.root.mediaItems = [youtubeItem];
    await page.waitForChanges();
    
    const thumbnail = page.root.shadowRoot.querySelector('.spectrum-media-library__thumbnail img');
    expect(thumbnail.getAttribute('src')).toContain('img.youtube.com');
    expect(thumbnail.getAttribute('src')).toContain('dQw4w9WgXcQ');
  });

  it('displays empty state when no items', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    const emptyState = page.root.shadowRoot.querySelector('.spectrum-media-library__empty');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toContain('No media items available');
  });

  it('shows video overlay icon for video items', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    page.root.mediaItems = sampleMediaItems;
    await page.waitForChanges();
    
    const videoOverlays = page.root.shadowRoot.querySelectorAll('.spectrum-media-library__thumbnail-overlay');
    expect(videoOverlays.length).toBeGreaterThan(0);
  });

  it('has proper ARIA attributes', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library></spectrum-media-library>`,
    });
    
    page.root.mediaItems = sampleMediaItems;
    await page.waitForChanges();
    
    const container = page.root.shadowRoot.querySelector('.spectrum-media-library');
    expect(container.getAttribute('role')).toBe('region');
    expect(container.getAttribute('aria-label')).toBe('Media library');
    
    const thumbnails = page.root.shadowRoot.querySelectorAll('.spectrum-media-library__thumbnail');
    thumbnails.forEach(thumbnail => {
      expect(thumbnail.getAttribute('role')).toBe('button');
      expect(thumbnail.getAttribute('aria-label')).toBeTruthy();
      expect(thumbnail.getAttribute('tabindex')).toBe('0');
    });
  });

  it('applies custom width and height', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library width="800px" height="600px"></spectrum-media-library>`,
    });
    
    expect(page.root.style.width).toBe('800px');
    expect(page.root.style.height).toBe('600px');
  });

  it('applies custom thumbnail size', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library thumbnail-size="large"></spectrum-media-library>`,
    });
    
    page.root.mediaItems = sampleMediaItems;
    await page.waitForChanges();
    
    const thumbnail = page.root.shadowRoot.querySelector('.spectrum-media-library__thumbnail') as HTMLElement;
    expect(thumbnail.style.width).toBe('200px');
    expect(thumbnail.style.height).toBe('200px');
  });

  it('emits mediaAction event on thumbnail click', async () => {
    const page = await newSpecPage({
      components: [SpectrumMediaLibrary],
      html: `<spectrum-media-library enable-lightbox="true"></spectrum-media-library>`,
    });
    
    page.root.mediaItems = sampleMediaItems;
    await page.waitForChanges();
    
    const eventSpy = jest.fn();
    page.doc.addEventListener('mediaAction', eventSpy);
    
    const thumbnail = page.root.shadowRoot.querySelector('.spectrum-media-library__thumbnail') as HTMLElement;
    thumbnail.click();
    await page.waitForChanges();
    
    expect(eventSpy).toHaveBeenCalled();
    const event = eventSpy.mock.calls[0][0];
    expect(event.detail.action).toBe('view');
    expect(event.detail.mediaItem).toBeTruthy();
    expect(event.detail.index).toBe(0);
  });
});
