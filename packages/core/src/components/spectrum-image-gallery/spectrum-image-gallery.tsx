import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { BackgroundLevel } from '../spectrum-panel/spectrum-panel';

export interface ImageConfig {
  id: string;
  url: string;
  alt?: string;
  title?: string;
  metadata?: Record<string, any>;
}

export interface ImageAddedEvent {
  image: ImageConfig;
  source: 'upload' | 'url';
}

export interface ImageDeletedEvent {
  deletedImages: ImageConfig[];
  deletedIds: string[];
  remainingCount: number;
}

export type SelectionMode = 'single' | 'multi' | 'none';
export type ScrollDirection = 'vertical' | 'horizontal';
export type FrostLevel = 'no' | 'partial' | 'full';

@Component({
  tag: 'spectrum-image-gallery',
  styleUrl: 'spectrum-image-gallery.scss',
  shadow: true,
})
export class SpectrumImageGallery {
  @Element() el: HTMLElement;

  // Configuration Properties
  @Prop() images: ImageConfig[] = [];
  @Prop() allowUpload: boolean = true;
  @Prop() allowUrlInput: boolean = true;
  @Prop() allowDelete: boolean = true;
  @Prop() selectionMode: SelectionMode = 'single';
  @Prop() selectedImages: string[] = [];
  @Prop() scrollDirection: ScrollDirection = 'vertical';
  
  /**
   * Enable preview mode for image viewing. 
   * When true: Hides control bar and selection UI for clean viewing experience.
   * When false: Shows control bar, selection indicators, and management features.
   * CRITICAL: Set to false when you need control bars and batch operations.
   */
  @Prop() previewMode: boolean = false;
  
  @Prop() background: BackgroundLevel = 'opaque';
  @Prop() frostControlBar: FrostLevel = 'no';
  @Prop() debug: boolean = false;
  @Prop() galleryTitle?: string;
  
  // Primary Action Properties
  @Prop() primaryActionText: string = '';
  @Prop() primaryActionIcon: string = '';
  @Prop() primaryActionValue: string = '';

  // Internal State
  @State() allImages: ImageConfig[] = [];
  @State() internalSelectedImages: string[] = [];
  @State() isUploadModalOpen: boolean = false;
  @State() isUrlModalOpen: boolean = false;
  @State() isAddModalOpen: boolean = false;
  @State() urlInputValue: string = '';
  @State() isLoading: boolean = false;
  @State() isPreviewModalOpen: boolean = false;
  @State() previewImage: ImageConfig | null = null;

  // Events
  @Event() imageSelected: EventEmitter<ImageConfig>;
  @Event() imageDeselect: EventEmitter<ImageConfig>;
  @Event() imageAdded: EventEmitter<ImageAddedEvent>;
  @Event() imageDeleted: EventEmitter<ImageDeletedEvent>;
  @Event() imagePreview: EventEmitter<ImageConfig>;
  @Event() primaryAction: EventEmitter<{ action: string; selectedImages: ImageConfig[]; selectedIds: string[]; count: number }>;

  // Element References
  private fileInputRef: HTMLInputElement;

  /**
   * Debug logging utility
   */
  private debugLog(message: string, ...args: any[]) {
    if (this.debug) {
      console.log(`[spectrum-image-gallery] ${message}`, ...args);
    }
  }

  /**
   * Debug error utility
   */
  private debugError(message: string, ...args: any[]) {
    if (this.debug) {
      console.error(`[spectrum-image-gallery] ${message}`, ...args);
    }
  }

  /**
   * Debug warning utility
   */
  private debugWarn(message: string, ...args: any[]) {
    if (this.debug) {
      console.warn(`[spectrum-image-gallery] ${message}`, ...args);
    }
  }

  componentWillLoad() {
    this.allImages = [...this.images];
    this.internalSelectedImages = [...this.selectedImages];
  }

  connectedCallback() {
    document.addEventListener('keydown', this.handlePreviewKeydown);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handlePreviewKeydown);
  }

  /**
   * CSS columns handle masonry automatically - no manual calculation needed
   */
  private calculateMasonryRowSpan(_item: HTMLElement) {
    if (this.scrollDirection !== 'vertical') return;
    
    // CSS columns handle the masonry layout automatically
    // No manual row span calculation needed
    this.debugLog(`Masonry handled by native CSS masonry`);
  }



  @Watch('images')
  onImagesChange() {
    this.allImages = [...this.images];
    // Recalculate masonry layout when images change
    setTimeout(() => this.recalculateMasonryLayout(), 100);
  }

  /**
   * Recalculate masonry layout for all items
   */
  private recalculateMasonryLayout() {
    // CSS columns handle masonry automatically - no manual calculation needed
    this.debugLog('Masonry layout handled by CSS columns');
  }

  @Watch('selectedImages')
  onSelectedImagesChange() {
    this.internalSelectedImages = [...this.selectedImages];
  }

  private generateId(): string {
    return `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private handleImageSelect(image: ImageConfig) {
    // If in preview mode, show preview modal instead of selecting
    if (this.previewMode) {
      this.handlePreview(image);
      this.imagePreview.emit(image);
      return;
    }

    // Don't allow selection if selection is disabled
    if (this.selectionMode === 'none') {
      return;
    }

    let newSelection: string[];
    let action: 'select' | 'deselect';

    if (this.selectionMode === 'multi') {
      const isSelected = this.internalSelectedImages.includes(image.id);
      if (isSelected) {
        newSelection = this.internalSelectedImages.filter(id => id !== image.id);
        action = 'deselect';
      } else {
        newSelection = [...this.internalSelectedImages, image.id];
        action = 'select';
      }
    } else {
      // Single select mode
      const isSelected = this.internalSelectedImages.includes(image.id);
      newSelection = isSelected ? [] : [image.id];
      action = isSelected ? 'deselect' : 'select';
    }

    this.internalSelectedImages = newSelection;

    // Emit events based on action
    if (action === 'select') {
      // When selecting: emit both legacy and new select events
      const selectedImageObjects = this.allImages.filter(img => 
        newSelection.includes(img.id)
      );

      this.imageSelected.emit(selectedImageObjects[0]);
    } else {
      // When deselecting: emit only the deselect event
      this.imageDeselect.emit(image);
    }
  }

  private closeUploadModal() {
    this.isUploadModalOpen = false;
  }

  private closeUrlModal() {
    this.isUrlModalOpen = false;
    this.urlInputValue = '';
  }

  private openAddModal() {
    this.isAddModalOpen = true;
    this.urlInputValue = '';
  }

  private closeAddModal() {
    this.isAddModalOpen = false;
    this.urlInputValue = '';
  }

  private handleFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    this.handleFileUpload(files);
    input.value = ''; // Reset input
    this.closeUploadModal();
    this.closeAddModal();
  }

  private async handleFileUpload(files: File[]) {
    this.isLoading = true;

    for (const file of files) {
      try {
        const imageUrl = await this.fileToDataUrl(file);
        const image: ImageConfig = {
          id: this.generateId(),
          url: imageUrl,
          alt: file.name,
          title: file.name,
          metadata: {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            uploadDate: new Date().toISOString()
          }
        };

        this.allImages = [...this.allImages, image];
        
        this.imageAdded.emit({
          image,
          source: 'upload'
        });
      } catch (error) {
        this.debugError('Failed to process file:', error);
      }
    }

    this.isLoading = false;
  }

  private fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  private validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 10 seconds
      setTimeout(() => resolve(false), 10000);
    });
  }

  private async handleUrlAdd() {
    if (!this.urlInputValue.trim()) return;

    this.isLoading = true;

    try {
      const url = new URL(this.urlInputValue.trim());
      
      // Validate that the image can actually be loaded
      const isValid = await this.validateImageUrl(url.toString());
      
      if (!isValid) {
        this.debugError('Image URL is not accessible or not a valid image:', url.toString());
        alert('Unable to load image from this URL. Please check the URL and ensure the image is publicly accessible.');
        this.isLoading = false;
        return;
      }
      
      const image: ImageConfig = {
        id: this.generateId(),
        url: url.toString(),
        alt: 'Image from URL',
        title: url.toString(),
        metadata: {
          source: 'url',
          addedDate: new Date().toISOString()
        }
      };

      this.allImages = [...this.allImages, image];
      
      this.imageAdded.emit({
        image,
        source: 'url'
      });

      this.closeUrlModal();
      this.closeAddModal();
    } catch (error) {
      this.debugError('Invalid URL:', error);
      alert('Please enter a valid URL');
    }

    this.isLoading = false;
  }

  private renderThumbnail(image: ImageConfig, index: number) {
    const isSelected = this.internalSelectedImages.includes(image.id);
    const isSelectable = this.selectionMode !== 'none' && !this.previewMode;
    const isClickable = isSelectable || this.previewMode;

    return (
      <div
        class={{
          'gallery__item': true,
          'gallery__item--selected': isSelected && !this.previewMode,
          'gallery__item--selectable': isClickable
        }}
        onClick={isClickable ? () => this.handleImageSelect(image) : undefined}
        role={isClickable ? "button" : undefined}
        tabindex={isClickable ? 0 : undefined}
        aria-label={isClickable ? (image.alt || image.title || `Image ${index + 1}`) : undefined}
        aria-selected={isSelectable ? isSelected.toString() : undefined}
      >
                <img
          src={image.url}
          alt={image.alt || image.title || ''}
          loading="lazy"
          crossorigin="anonymous"
          onLoad={(e) => {
            const imgElement = e.target as HTMLImageElement;
            const itemElement = imgElement.closest('.gallery__item') as HTMLElement;
            if (itemElement) {
              this.calculateMasonryRowSpan(itemElement);
            }
          }}
          onError={(e) => {
            const imgElement = e.target as HTMLImageElement;
            // Replace with a placeholder/broken image indicator
            imgElement.style.display = 'none';
            const placeholder = imgElement.nextElementSibling as HTMLElement || 
              imgElement.parentElement.querySelector('.gallery__image-error');
            if (!placeholder || !placeholder.classList.contains('gallery__image-error')) {
              const errorDiv = document.createElement('div');
              errorDiv.className = 'gallery__image-error';
              errorDiv.innerHTML = `
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21,5V6.59L12.41,15.18L10.59,13.36L5,18.95V19H19V5M21,19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19A2,2 0 0,1 21,5V19Z"/>
                </svg>
                <span>Failed to load</span>
              `;
              imgElement.parentElement.appendChild(errorDiv);
            }
            this.debugWarn(`Failed to load image: ${image.url}`);
          }}
        />
        {isSelected && isSelectable && (
          <div class="gallery__selection-overlay"></div>
        )}
        {isSelected && isSelectable && (
          <spectrum-badge
            variant="primary"
            size="large"
            text="✓"
            circular={true}
            class="gallery__selection-badge"
          />
        )}
      </div>
    );
  }

  private renderUploadModal() {
    if (!this.isUploadModalOpen || this.isAddModalOpen) return null;

    return (
      <div class="modal-overlay" onClick={() => this.closeUploadModal()}>
        <div class="modal" onClick={(e) => e.stopPropagation()}>
          <div class="modal__header">
            <h3>Upload Images</h3>
            <spectrum-button
              variant="ghost"
              iconOnly={true}
              size="base"
              leftIcon="close"
              showLeftIcon={true}
              onClick={() => this.closeUploadModal()}
              aria-label="Close modal"
            />
          </div>
          <div class="modal__content">
            <div class="upload-area">
              <input
                type="file"
                ref={el => this.fileInputRef = el}
                multiple
                accept="image/*"
                onChange={(event) => this.handleFileInputChange(event)}
                class="upload-area__input"
              />
              <div class="upload-area__content">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
                <p>Drag & drop images here</p>
                <spectrum-button
                  variant="primary"
                  size="base"
                  buttonText="Browse Files"
                  showButtonText={true}
                  onClick={() => this.fileInputRef?.click()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private renderUrlModal() {
    if (!this.isUrlModalOpen || this.isAddModalOpen) return null;

    return (
      <div class="modal-overlay" onClick={() => this.closeUrlModal()}>
        <div class="modal" onClick={(e) => e.stopPropagation()}>
          <div class="modal__header">
            <h3>Add Image URL</h3>
            <spectrum-button
              variant="ghost"
              iconOnly={true}
              size="base"
              leftIcon="close"
              showLeftIcon={true}
              onClick={() => this.closeUrlModal()}
              aria-label="Close modal"
            />
          </div>
          <div class="modal__content">
            <div class="url-input">
              <label htmlFor="url-field">Image URL:</label>
              <input
                id="url-field"
                type="url"
                value={this.urlInputValue}
                onInput={(event) => this.urlInputValue = (event.target as HTMLInputElement).value}
                placeholder="https://example.com/image.jpg"
                class="url-input__field"
              />
              <div class="modal__actions">
                <spectrum-button
                  variant="secondary"
                  size="base"
                  buttonText="Cancel"
                  showButtonText={true}
                  onClick={() => this.closeUrlModal()}
                />
                <spectrum-button
                  variant="primary"
                  size="base"
                  buttonText="Add Image"
                  showButtonText={true}
                  onClick={() => this.handleUrlAdd()}
                  disabled={!this.urlInputValue.trim()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private handleDeleteSelected() {
    if (this.internalSelectedImages.length === 0) return;

    const selectedIds = [...this.internalSelectedImages];
    
    // Get the actual image objects that will be deleted
    const imagesToDelete = this.allImages.filter(image => 
      selectedIds.includes(image.id)
    );
    
    // Remove selected images from the gallery
    this.allImages = this.allImages.filter(image => 
      !selectedIds.includes(image.id)
    );
    
    // Clear selection
    this.internalSelectedImages = [];
    
    // Emit the delete event with deleted image data
    this.imageDeleted.emit({
      deletedImages: imagesToDelete,
      deletedIds: selectedIds,
      remainingCount: this.allImages.length
    });
    
    this.debugLog(`Deleted ${selectedIds.length} images. Gallery now has ${this.allImages.length} images.`);
  }

  private handlePrimaryAction() {
    if (this.internalSelectedImages.length === 0 || !this.primaryActionText) return;

    const selectedIds = [...this.internalSelectedImages];
    
    // Get the actual image objects that are selected
    const selectedImages = this.allImages.filter(image => 
      selectedIds.includes(image.id)
    );
    
    // Emit the primary action event with selected image data
    this.primaryAction.emit({
      action: this.primaryActionValue || this.primaryActionText,
      selectedImages: selectedImages,
      selectedIds: selectedIds,
      count: selectedIds.length
    });
    
    this.debugLog(`Primary action triggered for ${selectedIds.length} images:`, {
      action: this.primaryActionValue || this.primaryActionText,
      selectedIds
    });
  }

  private handlePreview(image: ImageConfig) {
    this.previewImage = image;
    this.isPreviewModalOpen = true;
    this.debugLog('Opening preview for image:', image.id);
  }

  private closePreviewModal() {
    this.isPreviewModalOpen = false;
    this.previewImage = null;
    this.debugLog('Closing preview modal');
  }

  private navigatePreview(direction: 'next' | 'previous') {
    if (!this.previewImage || this.allImages.length <= 1) return;

    const currentIndex = this.allImages.findIndex(img => img.id === this.previewImage.id);
    if (currentIndex === -1) return;

    let newIndex: number;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % this.allImages.length;
    } else {
      newIndex = currentIndex === 0 ? this.allImages.length - 1 : currentIndex - 1;
    }

    this.previewImage = this.allImages[newIndex];
    this.imagePreview.emit(this.previewImage);
    this.debugLog(`Navigated to ${direction} image:`, this.previewImage.id);
  }

  private handlePreviewKeydown = (event: KeyboardEvent) => {
    if (!this.isPreviewModalOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closePreviewModal();
        break;
      case 'ArrowLeft':
        this.navigatePreview('previous');
        break;
      case 'ArrowRight':
        this.navigatePreview('next');
        break;
    }
  }

  private renderPreviewModal() {
    if (!this.isPreviewModalOpen || !this.previewImage) return null;

    const currentIndex = this.allImages.findIndex(img => img.id === this.previewImage.id);
    const hasMultipleImages = this.allImages.length > 1;

    return (
      <div class="preview-modal" onClick={() => this.closePreviewModal()}>
        <div class="preview-modal__content" onClick={(e) => e.stopPropagation()}>
          <spectrum-button
            variant="secondary"
            iconOnly={true}
            size="base"
            leftIcon="close"
            showLeftIcon={true}
            onClick={() => this.closePreviewModal()}
            aria-label="Close preview"
            class="preview-modal__close"
          />
          
          {hasMultipleImages && (
            <spectrum-button
              variant="secondary"
              iconOnly={true}
              size="base"
              leftIcon="keyboard_arrow_left"
              showLeftIcon={true}
              onClick={() => this.navigatePreview('previous')}
              aria-label="Previous image"
              class="preview-modal__nav preview-modal__nav--prev"
            />
          )}
          
          <img
            src={this.previewImage.url}
            alt={this.previewImage.alt || this.previewImage.title || 'Preview image'}
            loading="lazy"
            crossorigin="anonymous"
            class="preview-modal__image"
          />
          
          {hasMultipleImages && (
            <spectrum-button
              variant="secondary"
              iconOnly={true}
              size="base"
              leftIcon="keyboard_arrow_right"
              showLeftIcon={true}
              onClick={() => this.navigatePreview('next')}
              aria-label="Next image"
              class="preview-modal__nav preview-modal__nav--next"
            />
          )}
          
          {(this.previewImage.title || this.previewImage.alt) && (
            <div class="preview-modal__caption">
              {this.previewImage.title || this.previewImage.alt}
            </div>
          )}
          
          {hasMultipleImages && (
            <div class="preview-modal__counter">
              {currentIndex + 1} of {this.allImages.length}
            </div>
          )}
        </div>
      </div>
    );
  }

  private renderAddModal() {
    if (!this.isAddModalOpen) return null;

    return (
      <div class="modal-overlay" onClick={() => this.closeAddModal()}>
        <div class="modal" onClick={(e) => e.stopPropagation()}>
          <div class="modal__header">
            <h3>Add Images</h3>
            <spectrum-button
              variant="ghost"
              iconOnly={true}
              size="base"
              leftIcon="close"
              showLeftIcon={true}
              onClick={() => this.closeAddModal()}
              aria-label="Close modal"
            />
          </div>
          <div class="modal__content">
            <div class="add-options">
              <div class="add-option">
                <h4>Upload from Computer</h4>
                <div class="upload-area">
                  <input
                    type="file"
                    ref={el => this.fileInputRef = el}
                    multiple
                    accept="image/*"
                    onChange={(event) => this.handleFileInputChange(event)}
                    class="upload-area__input"
                  />
                  <div class="upload-area__content">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                    </svg>
                    <p>Drag & drop images here</p>
                    <spectrum-button
                      variant="secondary"
                      size="base"
                      buttonText="Browse Files"
                      showButtonText={true}
                      onClick={() => this.fileInputRef?.click()}
                    />
                  </div>
                </div>
              </div>
              
              <div class="add-option-divider">
                <span>OR</span>
              </div>
              
              <div class="add-option">
                <h4>Add from URL</h4>
                <div class="url-input">
                  <label htmlFor="url-field">Image URL:</label>
                  <input
                    id="url-field"
                    type="url"
                    value={this.urlInputValue}
                    onInput={(event) => this.urlInputValue = (event.target as HTMLInputElement).value}
                    placeholder="https://example.com/image.jpg"
                    class="url-input__field"
                  />
                  <spectrum-button
                    variant="secondary"
                    size="base"
                    buttonText="Add from URL"
                    showButtonText={true}
                    onClick={() => this.handleUrlAdd()}
                    disabled={!this.urlInputValue.trim() || this.isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const hasImages = this.allImages.length > 0;
    
    this.debugLog(`Rendering gallery: ${this.allImages.length} images, hasImages: ${hasImages}`);

    return (
      <Host>
        <spectrum-panel 
          background={this.background} 
          debug={this.debug}
          size="full"
          noPadding={true}
          panelTitle={this.galleryTitle}
          titleEditable={false}
        >
          <div class={{
            'gallery': true,
            'gallery--vertical': this.scrollDirection === 'vertical',
            'gallery--horizontal': this.scrollDirection === 'horizontal'
          }}>
            {hasImages ? (
              <div class={{
                'gallery__grid': true,
                'gallery__grid--vertical': this.scrollDirection === 'vertical',
                'gallery__grid--horizontal': this.scrollDirection === 'horizontal'
              }}>
                {this.allImages.map((image, index) => {
                  this.debugLog(`Rendering image ${index}:`, image);
                  return this.renderThumbnail(image, index);
                })}
              </div>
            ) : (
              <div class="gallery__empty">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19M19,19H5V5H19M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z"/>
                </svg>
                <h3>No images in gallery</h3>
                <p>Click the Add button to upload images or add them by URL</p>
              </div>
            )}
          </div>

          {/* Controls as a separate section within the panel */}
          {!this.previewMode && (
            <div class={{
              'gallery__controls': true,
              'gallery__controls--vertical': this.scrollDirection === 'vertical',
              'gallery__controls--horizontal': this.scrollDirection === 'horizontal',
              'gallery__controls--frost': this.frostControlBar !== 'no',
              'gallery__controls--frost-partial': this.frostControlBar === 'partial',
              'gallery__controls--frost-full': this.frostControlBar === 'full'
            }}>
              {[
                // Delete button - shown when images are selected and delete is allowed (left position)
                this.allowDelete && this.internalSelectedImages.length > 0 && (
                  <spectrum-button
                    variant="danger"
                    size="base"
                    buttonText={this.internalSelectedImages.length === 1 ? 'Delete' : `Delete (${this.internalSelectedImages.length})`}
                    showButtonText={true}
                    leftIcon="delete"
                    showLeftIcon={true}
                    disabled={this.isLoading}
                    onClick={() => this.handleDeleteSelected()}
                  />
                ),

                // Primary action button - shown when images are selected and primary action is configured (right position)
                this.primaryActionText && this.internalSelectedImages.length > 0 && (
                  <spectrum-button
                    variant="primary"
                    size="base"
                    buttonText={this.primaryActionText}
                    showButtonText={true}
                    leftIcon={this.primaryActionIcon}
                    showLeftIcon={!!this.primaryActionIcon}
                    disabled={this.isLoading}
                    onClick={() => this.handlePrimaryAction()}
                  />
                ),

                // Add button - shown when no images are selected
                (this.allowUrlInput || this.allowUpload) && this.internalSelectedImages.length === 0 && (
                  <spectrum-button
                    variant="primary"
                    size="base"
                    buttonText="Add"
                    showButtonText={true}
                    leftIcon="add"
                    showLeftIcon={true}
                    disabled={this.isLoading}
                    onClick={() => this.openAddModal()}
                  />
                )
              ]}
            </div>
          )}

          {this.renderAddModal()}
          {this.renderUploadModal()}
          {this.renderUrlModal()}
        </spectrum-panel>

        {this.renderPreviewModal()}
      </Host>
    );
  }
}

