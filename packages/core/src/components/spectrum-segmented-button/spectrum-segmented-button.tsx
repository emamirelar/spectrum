import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Listen } from '@stencil/core';

export interface SegmentItem {
  label: string;
  icon?: string;
  value: string;
  disabled?: boolean;
}

@Component({
  tag: 'spectrum-segmented-button',
  styleUrl: 'spectrum-segmented-button.scss',
  shadow: true,
})
export class SpectrumSegmentedButton {
  @Element() el: HTMLElement;

  @Event({
    eventName: 'segmentChange',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) segmentChange: EventEmitter<{ action: string; index: number; value: string; selected: boolean }>;

  /** Segment items as array or JSON string */
  @Prop() items: SegmentItem[] | string = [];

  /** Currently selected index (single-select mode) */
  @Prop({ mutable: true }) selectedIndex: number = 0;

  /** Allow multiple segment selection */
  @Prop() multiSelect: boolean = false;

  /** Size variant */
  @Prop() size: 'sm' | 'base' | 'lg' = 'base';

  /** Disable entire segmented button */
  @Prop() disabled: boolean = false;

  /** Accessible label for the group */
  @Prop() ariaLabel: string;

  @State() selectedIndices: Set<number> = new Set([0]);
  @State() focusedIndex: number = -1;

  private segmentRefs: HTMLElement[] = [];
  private parsedItems: SegmentItem[] = [];

  private parseItems() {
    if (typeof this.items === 'string') {
      try {
        this.parsedItems = JSON.parse(this.items);
      } catch {
        console.error('spectrum-segmented-button: invalid JSON in items prop');
        this.parsedItems = [];
      }
    } else if (Array.isArray(this.items)) {
      this.parsedItems = this.items;
    } else {
      this.parsedItems = [];
    }
  }

  @Watch('items')
  onItemsChange() {
    this.parseItems();
  }

  @Watch('selectedIndex')
  onSelectedIndexChange() {
    if (!this.multiSelect) {
      this.selectedIndices = new Set([this.selectedIndex]);
    }
  }

  componentWillLoad() {
    this.parseItems();
    if (this.multiSelect) {
      this.selectedIndices = new Set([this.selectedIndex]);
    } else {
      this.selectedIndices = new Set([this.selectedIndex]);
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    const items = this.parsedItems;
    const currentFocus = this.focusedIndex >= 0 ? this.focusedIndex : this.selectedIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault();
        let next = currentFocus - 1;
        while (next >= 0 && items[next]?.disabled) next--;
        if (next >= 0) {
          this.focusedIndex = next;
          this.segmentRefs[next]?.focus();
        }
        break;
      }
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        let next = currentFocus + 1;
        while (next < items.length && items[next]?.disabled) next++;
        if (next < items.length) {
          this.focusedIndex = next;
          this.segmentRefs[next]?.focus();
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        let next = 0;
        while (next < items.length && items[next]?.disabled) next++;
        if (next < items.length) {
          this.focusedIndex = next;
          this.segmentRefs[next]?.focus();
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        let next = items.length - 1;
        while (next >= 0 && items[next]?.disabled) next--;
        if (next >= 0) {
          this.focusedIndex = next;
          this.segmentRefs[next]?.focus();
        }
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.focusedIndex >= 0 && !items[this.focusedIndex]?.disabled) {
          this.toggleSegment(this.focusedIndex);
        }
        break;
    }
  }

  private toggleSegment(index: number) {
    const items = this.parsedItems;
    if (this.disabled || items[index]?.disabled) return;

    const item = items[index];
    if (this.multiSelect) {
      const newSet = new Set(this.selectedIndices);
      const wasSelected = newSet.has(index);
      if (wasSelected) {
        if (newSet.size > 1) {
          newSet.delete(index);
        }
      } else {
        newSet.add(index);
      }
      this.selectedIndices = newSet;
      this.segmentChange.emit({
        action: wasSelected ? 'deselect' : 'select',
        index,
        value: item.value,
        selected: !wasSelected,
      });
    } else {
      this.selectedIndex = index;
      this.selectedIndices = new Set([index]);
      this.segmentChange.emit({
        action: 'select',
        index,
        value: item.value,
        selected: true,
      });
    }
  }

  render() {
    const items = this.parsedItems;
    const wrapperClasses: Record<string, boolean> = {
      'spectrum-segmented-button': true,
      [`spectrum-segmented-button--${this.size}`]: true,
      'spectrum-segmented-button--disabled': this.disabled,
      'spectrum-segmented-button--multi': this.multiSelect,
    };

    this.segmentRefs = [];

    return (
      <Host>
        <div
          class={wrapperClasses}
          role={this.multiSelect ? 'toolbar' : 'radiogroup'}
          aria-label={this.ariaLabel || 'Segmented button'}
          aria-disabled={this.disabled ? 'true' : undefined}
        >
          {items.map((item, i) => {
            const isSelected = this.selectedIndices.has(i);
            const isDisabled = !!item.disabled || this.disabled;
            const segmentClasses: Record<string, boolean> = {
              'spectrum-segmented-button__segment': true,
              'spectrum-segmented-button__segment--selected': isSelected,
              'spectrum-segmented-button__segment--disabled': isDisabled,
              'spectrum-segmented-button__segment--focused': i === this.focusedIndex,
            };

            return (
              <button
                ref={(el) => { if (el) this.segmentRefs[i] = el; }}
                class={segmentClasses}
                role={this.multiSelect ? undefined : 'radio'}
                type="button"
                tabindex={(!this.multiSelect && i === this.selectedIndex) || (this.multiSelect && i === 0) ? '0' : '-1'}
                aria-checked={this.multiSelect ? undefined : isSelected.toString()}
                aria-pressed={this.multiSelect ? isSelected.toString() : undefined}
                aria-disabled={isDisabled ? 'true' : undefined}
                onClick={() => this.toggleSegment(i)}
                onFocus={() => { this.focusedIndex = i; }}
                onBlur={() => { this.focusedIndex = -1; }}
              >
                {item.icon && (
                  <span class="spectrum-segmented-button__icon" aria-hidden="true">
                    <span class="material-symbols-outlined">{item.icon}</span>
                  </span>
                )}
                <span class="spectrum-segmented-button__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
