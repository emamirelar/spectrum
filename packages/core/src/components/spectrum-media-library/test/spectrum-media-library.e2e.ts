import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-media-library', () => {
  const sampleMediaItems = JSON.stringify([
    {
      id: 'img1',
      type: 'image',
      url: 'https://picsum.photos/800/600?random=1',
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
    },
    {
      id: 'img2',
      type: 'image',
      url: 'https://picsum.photos/800/600?random=2',
      altText: 'Sample image 2',
      caption: 'Test caption 2'
    }
  ]);

  it('renders and is hydrated', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-media-library></spectrum-media-library>');

    const element = await page.find('spectrum-media-library');
    expect(element).toHaveClass('hydrated');
  });

  it('renders thumbnails from media items', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const thumbnails = await component.findAll('.spectrum-media-library__thumbnail');
    expect(thumbnails.length).toBe(3);
  });

  it('opens lightbox on thumbnail click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    const lightbox = await component.find('.spectrum-media-library__lightbox');
    expect(lightbox).toBeTruthy();
  });

  it('closes lightbox on close button click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox
    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    // Close lightbox
    const closeButton = await component.find('.spectrum-media-library__lightbox-close');
    await closeButton.click();
    await page.waitForChanges();

    const lightbox = await component.find('.spectrum-media-library__lightbox');
    expect(lightbox).toBeFalsy();
  });

  it('supports keyboard navigation - Enter to open lightbox', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Focus first thumbnail
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    const lightbox = await component.find('.spectrum-media-library__lightbox');
    expect(lightbox).toBeTruthy();
  });

  it('supports keyboard navigation - Escape to close lightbox', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox
    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    const lightbox = await component.find('.spectrum-media-library__lightbox');
    expect(lightbox).toBeFalsy();
  });

  it('navigates to next item with arrow right', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox on first item
    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    // Navigate to next
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    const counter = await component.find('.spectrum-media-library__lightbox-counter');
    const counterText = await counter.getProperty('textContent');
    expect(counterText).toContain('2 / 3');
  });

  it('navigates to previous item with arrow left', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox on first item
    const thumbnails = await component.findAll('.spectrum-media-library__thumbnail');
    await thumbnails[1].click();
    await page.waitForChanges();

    // Navigate to previous
    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();

    const counter = await component.find('.spectrum-media-library__lightbox-counter');
    const counterText = await counter.getProperty('textContent');
    expect(counterText).toContain('1 / 3');
  });

  it('emits mediaAction event on thumbnail click', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const mediaActionSpy = await page.spyOnEvent('mediaAction');

    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    expect(mediaActionSpy).toHaveReceivedEventTimes(1);
    expect(mediaActionSpy.firstEvent.detail.action).toBe('view');
    expect(mediaActionSpy.firstEvent.detail.index).toBe(0);
  });

  it('has proper ARIA attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const container = await component.find('.spectrum-media-library');
    const role = await container.getAttribute('role');
    const ariaLabel = await container.getAttribute('aria-label');

    expect(role).toBe('region');
    expect(ariaLabel).toBe('Media library');
  });

  it('thumbnails have proper accessibility attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    const role = await thumbnail.getAttribute('role');
    const ariaLabel = await thumbnail.getAttribute('aria-label');
    const tabindex = await thumbnail.getAttribute('tabindex');

    expect(role).toBe('button');
    expect(ariaLabel).toBeTruthy();
    expect(tabindex).toBe('0');
  });

  it('lightbox has proper modal semantics', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox
    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    const lightbox = await component.find('.spectrum-media-library__lightbox');
    const role = await lightbox.getAttribute('role');
    const ariaModal = await lightbox.getAttribute('aria-modal');
    const ariaLabel = await lightbox.getAttribute('aria-label');

    expect(role).toBe('dialog');
    expect(ariaModal).toBe('true');
    expect(ariaLabel).toBe('Media viewer');
  });

  it('displays captions when enabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}' show-captions="true"></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox
    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    const caption = await component.find('.spectrum-media-library__lightbox-caption');
    expect(caption).toBeTruthy();
    const captionText = await caption.getProperty('textContent');
    expect(captionText).toBeTruthy();
  });

  it('hides captions when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}' show-captions="false"></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    // Open lightbox
    const thumbnail = await component.find('.spectrum-media-library__thumbnail');
    await thumbnail.click();
    await page.waitForChanges();

    const caption = await component.find('.spectrum-media-library__lightbox-caption');
    expect(caption).toBeFalsy();
  });

  it('displays empty state when no media items', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-media-library></spectrum-media-library>');

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const emptyState = await component.find('.spectrum-media-library__empty');
    expect(emptyState).toBeTruthy();
    const emptyText = await emptyState.getProperty('textContent');
    expect(emptyText).toContain('No media items available');
  });

  it('applies horizontal layout class', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-media-library horizontal></spectrum-media-library>');

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const container = await component.find('.spectrum-media-library');
    const classes = await container.getProperty('className');
    expect(classes).toContain('spectrum-media-library--horizontal');
  });

  it('applies vertical layout class by default', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-media-library></spectrum-media-library>');

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const container = await component.find('.spectrum-media-library');
    const classes = await container.getProperty('className');
    expect(classes).toContain('spectrum-media-library--vertical');
  });

  it('shows video play icon overlay on video thumbnails', async () => {
    const page = await newE2EPage();
    await page.setContent(`<spectrum-media-library media-items='${sampleMediaItems}'></spectrum-media-library>`);

    const component = await page.find('spectrum-media-library');
    await page.waitForChanges();

    const overlays = await component.findAll('.spectrum-media-library__thumbnail-overlay');
    expect(overlays.length).toBeGreaterThan(0);

    const playIcon = await component.find('.spectrum-media-library__play-icon');
    expect(playIcon).toBeTruthy();
  });
});
