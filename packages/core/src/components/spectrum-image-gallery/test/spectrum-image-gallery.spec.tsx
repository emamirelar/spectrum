import { newSpecPage } from '@stencil/core/testing';
import { SpectrumImageGallery } from '../spectrum-image-gallery';

// Mock images for testing
const mockImages = [
  {
    id: 'test-1',
    url: 'https://example.com/image1.jpg',
    alt: 'Test image 1',
    title: 'Test Image 1',
    metadata: { category: 'test' },
  },
  {
    id: 'test-2',
    url: 'https://example.com/image2.jpg',
    alt: 'Test image 2',
    title: 'Test Image 2',
    metadata: { category: 'test' },
  },
];

describe('spectrum-image-gallery', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    expect(page.root).toEqualHtml(`
      <spectrum-image-gallery>
        <mock:shadow-root>
          <div class="gallery gallery--vertical">
            <div class="gallery__empty">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19M19,19H5V5H19M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z"></path>
              </svg>
              <h3>No images in gallery</h3>
              <p>Upload images or add them by URL to get started</p>
            </div>
            <div class="gallery__controls gallery__controls--vertical">
              <button class="btn btn--primary" type="button">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"></path>
                </svg>
                Upload Image
              </button>
              <button class="btn btn--secondary" type="button">
                Add Image URL
              </button>
            </div>
          </div>
        </mock:shadow-root>
      </spectrum-image-gallery>
    `);
  });

  it('renders with images', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    const gallery = page.root.shadowRoot.querySelector('.gallery__grid');
    expect(gallery).toBeTruthy();
    
    const items = page.root.shadowRoot.querySelectorAll('.gallery__item');
    expect(items.length).toBe(2);
  });

  it('disables upload when allowUpload is false', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery allow-upload="false"></spectrum-image-gallery>`,
    });
    
    const uploadButton = page.root.shadowRoot.querySelector('.btn--primary');
    expect(uploadButton).toBeFalsy();
  });

  it('disables URL input when allowUrlInput is false', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery allow-url-input="false"></spectrum-image-gallery>`,
    });
    
    const urlButton = page.root.shadowRoot.querySelector('.btn--secondary');
    expect(urlButton).toBeFalsy();
  });

  it('shows empty state when no images', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    const emptyState = page.root.shadowRoot.querySelector('.gallery__empty');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent).toContain('No images in gallery');
  });

  it('handles selectionMode property', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="multi"></spectrum-image-gallery>`,
    });
    
    expect(page.rootInstance.selectionMode).toBe('multi');
  });

  it('handles selectedImages property', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    page.root.selectedImages = ['test-1'];
    await page.waitForChanges();
    
    expect(page.rootInstance.internalSelectedImages).toEqual(['test-1']);
  });

  it('opens upload modal when upload button is clicked', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    const uploadButton = page.root.shadowRoot.querySelector('.btn--primary') as HTMLButtonElement;
    uploadButton.click();
    await page.waitForChanges();
    
    expect(page.rootInstance.isUploadModalOpen).toBe(true);
    
    const modal = page.root.shadowRoot.querySelector('.modal-overlay');
    expect(modal).toBeTruthy();
  });

  it('opens URL modal when URL button is clicked', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    const urlButton = page.root.shadowRoot.querySelector('.btn--secondary') as HTMLButtonElement;
    urlButton.click();
    await page.waitForChanges();
    
    expect(page.rootInstance.isUrlModalOpen).toBe(true);
    
    const modal = page.root.shadowRoot.querySelector('.modal-overlay');
    expect(modal).toBeTruthy();
  });

  it('closes modal when close button is clicked', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    // Open modal first
    const uploadButton = page.root.shadowRoot.querySelector('.btn--primary') as HTMLButtonElement;
    uploadButton.click();
    await page.waitForChanges();
    
    // Close modal
    const closeButton = page.root.shadowRoot.querySelector('.modal__close') as HTMLButtonElement;
    closeButton.click();
    await page.waitForChanges();
    
    expect(page.rootInstance.isUploadModalOpen).toBe(false);
  });

  it('generates unique IDs for images', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    const id1 = page.rootInstance.generateId();
    const id2 = page.rootInstance.generateId();
    
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^img-\d+-[a-z0-9]+$/);
  });

  it('handles single select mode', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="single"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    let eventDetail: any;
    page.root.addEventListener('imageSelected', (e: any) => {
      eventDetail = e.detail;
    });
    
    const item = page.root.shadowRoot.querySelector('.gallery__item') as HTMLElement;
    item.click();
    await page.waitForChanges();
    
    expect(eventDetail).toBeTruthy();
    expect(eventDetail).toEqual(mockImages[0]);
  });

  it('handles multi select mode', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="multi"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    let eventDetail: any;
    page.root.addEventListener('imageSelected', (e: any) => {
      eventDetail = e.detail;
    });
    
    const items = page.root.shadowRoot.querySelectorAll('.gallery__item') as NodeListOf<HTMLElement>;
    
    // Select first image
    items[0].click();
    await page.waitForChanges();
    expect(eventDetail).toEqual(mockImages[0]);
    
    // Select second image (should add to selection)
    items[1].click();
    await page.waitForChanges();
    expect(eventDetail).toEqual(mockImages[1]);
  });

  it('handles none selection mode', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="none"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    let eventFired = false;
    page.root.addEventListener('imageSelected', () => {
      eventFired = true;
    });
    
    const item = page.root.shadowRoot.querySelector('.gallery__item') as HTMLElement;
    item.click();
    await page.waitForChanges();
    
    // No event should be fired and no selection should occur
    expect(eventFired).toBe(false);
    expect(page.rootInstance.internalSelectedImages.length).toBe(0);
    
    // Item should not have selectable class
    expect(item.classList.contains('gallery__item--selectable')).toBe(false);
  });

  it('shows selection indicators for selected images', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    page.root.selectedImages = ['test-1'];
    await page.waitForChanges();
    
    const selectedItem = page.root.shadowRoot.querySelector('.gallery__item--selected');
    expect(selectedItem).toBeTruthy();
    
    const indicator = selectedItem.querySelector('.gallery__selection-indicator');
    expect(indicator).toBeTruthy();
  });

  it('handles scrollDirection property', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery scroll-direction="horizontal"></spectrum-image-gallery>`,
    });
    
    expect(page.rootInstance.scrollDirection).toBe('horizontal');
    
    const gallery = page.root.shadowRoot.querySelector('.gallery');
    expect(gallery.classList.contains('gallery--horizontal')).toBe(true);
  });

  it('defaults to vertical scrollDirection', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    expect(page.rootInstance.scrollDirection).toBe('vertical');
    
    const gallery = page.root.shadowRoot.querySelector('.gallery');
    expect(gallery.classList.contains('gallery--vertical')).toBe(true);
  });

  it('applies correct CSS classes for horizontal layout', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery scroll-direction="horizontal"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    const gallery = page.root.shadowRoot.querySelector('.gallery');
    const grid = page.root.shadowRoot.querySelector('.gallery__grid');
    const controls = page.root.shadowRoot.querySelector('.gallery__controls');
    
    expect(gallery.classList.contains('gallery--horizontal')).toBe(true);
    expect(grid.classList.contains('gallery__grid--horizontal')).toBe(true);
    expect(controls.classList.contains('gallery__controls--horizontal')).toBe(true);
  });

  it('applies correct CSS classes for vertical layout', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery scroll-direction="vertical"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    const gallery = page.root.shadowRoot.querySelector('.gallery');
    const grid = page.root.shadowRoot.querySelector('.gallery__grid');
    const controls = page.root.shadowRoot.querySelector('.gallery__controls');
    
    expect(gallery.classList.contains('gallery--vertical')).toBe(true);
    expect(grid.classList.contains('gallery__grid--vertical')).toBe(true);
    expect(controls.classList.contains('gallery__controls--vertical')).toBe(true);
  });

  it('emits imageSelected when selecting an image', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="single"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    let eventDetail: any;
    page.root.addEventListener('imageSelected', (e: any) => {
      eventDetail = e.detail;
    });
    
    const item = page.root.shadowRoot.querySelector('.gallery__item') as HTMLElement;
    item.click();
    await page.waitForChanges();
    
    expect(eventDetail).toBeTruthy();
    expect(eventDetail).toEqual(mockImages[0]);
  });

  it('emits imageDeselect event when deselecting an image', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="single"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    page.root.selectedImages = ['test-1'];
    await page.waitForChanges();
    
    let deselectEventDetail: any;
    page.root.addEventListener('imageDeselect', (e: any) => {
      deselectEventDetail = e.detail;
    });
    
    const item = page.root.shadowRoot.querySelector('.gallery__item') as HTMLElement;
    item.click(); // This should deselect the already selected image
    await page.waitForChanges();
    
    expect(deselectEventDetail).toBeTruthy();
    expect(deselectEventDetail).toEqual(mockImages[0]);
  });

  it('emits only imageSelected when selecting, not when deselecting', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="single"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    let imageSelectedFired = false;
    
    page.root.addEventListener('imageSelected', () => {
      imageSelectedFired = true;
    });
    
    const item = page.root.shadowRoot.querySelector('.gallery__item') as HTMLElement;
    item.click();
    await page.waitForChanges();
    
    expect(imageSelectedFired).toBe(true);
  });

  it('does not emit imageSelected when deselecting, only imageDeselect', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="single"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    page.root.selectedImages = ['test-1'];
    await page.waitForChanges();
    
    let imageSelectedFired = false;
    let deselectEventFired = false;
    
    page.root.addEventListener('imageSelected', () => {
      imageSelectedFired = true;
    });
    
    page.root.addEventListener('imageDeselect', () => {
      deselectEventFired = true;
    });
    
    const item = page.root.shadowRoot.querySelector('.gallery__item') as HTMLElement;
    item.click(); // This should deselect the already selected image
    await page.waitForChanges();
    
    expect(imageSelectedFired).toBe(false); // Should NOT fire when deselecting
    expect(deselectEventFired).toBe(true); // Should fire when deselecting
  });

  it('emits imageDeleted event when images are deleted', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery selection-mode="multi"></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    page.root.selectedImages = ['test-1', 'test-2'];
    await page.waitForChanges();
    
    let deleteEventDetail: any;
    page.root.addEventListener('imageDeleted', (e: any) => {
      deleteEventDetail = e.detail;
    });
    
    // Call handleDeleteSelected method directly
    const instance = page.rootInstance;
    instance.handleDeleteSelected();
    await page.waitForChanges();
    
    expect(deleteEventDetail).toBeTruthy();
    expect(deleteEventDetail.deletedImages).toHaveLength(2);
    expect(deleteEventDetail.deletedIds).toEqual(['test-1', 'test-2']);
    expect(deleteEventDetail.remainingCount).toBe(0);
    expect(deleteEventDetail.deletedImages[0]).toEqual(mockImages[0]);
    expect(deleteEventDetail.deletedImages[1]).toEqual(mockImages[1]);
  });

  it('does not emit imageDeleted event when no images are selected for deletion', async () => {
    const page = await newSpecPage({
      components: [SpectrumImageGallery],
      html: `<spectrum-image-gallery></spectrum-image-gallery>`,
    });
    
    page.root.images = mockImages;
    await page.waitForChanges();
    
    let deleteEventFired = false;
    page.root.addEventListener('imageDeleted', () => {
      deleteEventFired = true;
    });
    
    // Call handleDeleteSelected method directly with no selection
    const instance = page.rootInstance;
    instance.handleDeleteSelected();
    await page.waitForChanges();
    
    expect(deleteEventFired).toBe(false);
  });
});
