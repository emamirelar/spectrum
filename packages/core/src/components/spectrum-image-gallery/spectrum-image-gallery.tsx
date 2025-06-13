import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';

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
  @Prop() previewMode: boolean = false;
  @Prop() frostBackground: boolean = false;
  @Prop() debug: boolean = false;

  // Internal State
  @State() allImages: ImageConfig[] = [];
  @State() internalSelectedImages: string[] = [];
  @State() isUploadModalOpen: boolean = false;
  @State() isUrlModalOpen: boolean = false;
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

  @Watch('images')
  onImagesChange() {
    this.allImages = [...this.images];
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

  private openUploadModal() {
    this.isUploadModalOpen = true;
  }

  private closeUploadModal() {
    this.isUploadModalOpen = false;
  }

  private openUrlModal() {
    this.isUrlModalOpen = true;
    this.urlInputValue = '';
  }

  private closeUrlModal() {
    this.isUrlModalOpen = false;
    this.urlInputValue = '';
  }

  private handleFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files || []);
    this.handleFileUpload(files);
    input.value = ''; // Reset input
    this.closeUploadModal();
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
          <div class="gallery__selection-indicator">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </div>
        )}
      </div>
    );
  }

  private renderUploadModal() {
    if (!this.isUploadModalOpen) return null;

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
    if (!this.isUrlModalOpen) return null;

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

  private renderPreviewModal() {
    if (!this.isPreviewModalOpen || !this.previewImage) return null;

    return (
      <div class="preview-modal-overlay" onClick={() => this.closePreviewModal()}>
        <div class="preview-modal" onClick={(e) => e.stopPropagation()}>
          <spectrum-button
            variant="ghost"
            iconOnly={true}
            size="base"
            leftIcon="close"
            showLeftIcon={true}
            onClick={() => this.closePreviewModal()}
            aria-label="Close preview"
            class="preview-modal__close"
          />
          <img
            src={this.previewImage.url}
            alt={this.previewImage.alt || this.previewImage.title || 'Preview image'}
            loading="lazy"
            crossorigin="anonymous"
            class="preview-modal__image"
          />
          {(this.previewImage.title || this.previewImage.alt) && (
            <div class="preview-modal__caption">
              {this.previewImage.title || this.previewImage.alt}
            </div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const hasImages = this.allImages.length > 0;
    
    this.debugLog(`Rendering gallery: ${this.allImages.length} images, hasImages: ${hasImages}`);

    return (
      <Host>
        <div class={{
          'gallery': true,
          'gallery--vertical': this.scrollDirection === 'vertical',
          'gallery--horizontal': this.scrollDirection === 'horizontal',
          'gallery--frost': this.frostBackground
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
              <p>Upload images or add them by URL to get started</p>
            </div>
          )}

          {/* Always show controls container for frost background, but conditionally show buttons */}
          <div class={{
            'gallery__controls': true,
            'gallery__controls--vertical': this.scrollDirection === 'vertical',
            'gallery__controls--horizontal': this.scrollDirection === 'horizontal'
          }}>
            {this.previewMode ? (
              // In preview mode, show a subtle indicator
              <div class="gallery__preview-indicator">
                <span>Preview Mode - Click images to enlarge</span>
              </div>
            ) : (
              // Normal mode - show all control buttons
              [
                this.allowDelete && this.internalSelectedImages.length > 0 && (
                  <spectrum-button
                    variant="danger"
                    size="base"
                    buttonText={`Delete (${this.internalSelectedImages.length})`}
                    showButtonText={true}
                    leftIcon="delete"
                    showLeftIcon={true}
                    disabled={this.isLoading}
                    onClick={() => this.handleDeleteSelected()}
                  />
                ),

                this.allowUrlInput && (
                  <spectrum-button
                    variant="secondary"
                    size="base"
                    buttonText="Add Image URL"
                    showButtonText={true}
                    leftIcon="add_link"
                    showLeftIcon={true}
                    disabled={this.isLoading}
                    onClick={() => this.openUrlModal()}
                  />
                ),

                this.allowUpload && (
                  <spectrum-button
                    variant="primary"
                    size="base"
                    buttonText="Upload Image"
                    showButtonText={true}
                    leftIcon="upload_file"
                    showLeftIcon={true}
                    disabled={this.isLoading}
                    onClick={() => this.openUploadModal()}
                  />
                )
              ]
            )}
          </div>

          {this.renderUploadModal()}
          {this.renderUrlModal()}
        </div>

        {this.renderPreviewModal()}
      </Host>
    );
  }
}
