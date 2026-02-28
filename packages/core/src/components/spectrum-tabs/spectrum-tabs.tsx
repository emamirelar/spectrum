import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Listen } from '@stencil/core';

export interface TabItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  id?: string;
}

@Component({
  tag: 'spectrum-tabs',
  styleUrl: 'spectrum-tabs.scss',
  shadow: true,
})
export class SpectrumTabs {
  @Element() el: HTMLElement;
  @Event() tabChange: EventEmitter<{ action: string; index: number; tab: TabItem }>;

  @Prop() variant: 'primary' | 'secondary' = 'primary';
  @Prop() size: 'sm' | 'small' | 'base' | 'medium' | 'lg' | 'large' = 'base';
  @Prop() items: TabItem[] | string = [];
  @Prop({ mutable: true }) selectedIndex: number = 0;
  @Prop() scrollable: boolean = false;
  @Prop() disabled: boolean = false;

  @State() isFocusedIndex: number = -1;
  @State() indicatorStyle: { [key: string]: string } = {};

  private tabRefs: HTMLElement[] = [];

  @Watch('selectedIndex')
  onSelectedChange() {
    this.updateIndicator();
  }

  componentDidLoad() {
    this.updateIndicator();
  }

  componentDidUpdate() {
    this.updateIndicator();
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;
    const tabs = this.getParsedItems();
    const currentFocus = this.isFocusedIndex >= 0 ? this.isFocusedIndex : this.selectedIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault();
        let next = currentFocus - 1;
        while (next >= 0 && tabs[next]?.disabled) next--;
        if (next >= 0) {
          this.isFocusedIndex = next;
          this.tabRefs[next]?.focus();
        }
        break;
      }
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        let next = currentFocus + 1;
        while (next < tabs.length && tabs[next]?.disabled) next++;
        if (next < tabs.length) {
          this.isFocusedIndex = next;
          this.tabRefs[next]?.focus();
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        let next = 0;
        while (next < tabs.length && tabs[next]?.disabled) next++;
        if (next < tabs.length) {
          this.isFocusedIndex = next;
          this.tabRefs[next]?.focus();
        }
        break;
      }
      case 'End': {
        event.preventDefault();
        let next = tabs.length - 1;
        while (next >= 0 && tabs[next]?.disabled) next--;
        if (next >= 0) {
          this.isFocusedIndex = next;
          this.tabRefs[next]?.focus();
        }
        break;
      }
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.isFocusedIndex >= 0 && !tabs[this.isFocusedIndex]?.disabled) {
          this.selectTab(this.isFocusedIndex);
        }
        break;
    }
  }

  private getParsedItems(): TabItem[] {
    if (typeof this.items === 'string') {
      try { return JSON.parse(this.items); } catch { return []; }
    }
    return this.items as TabItem[];
  }

  private selectTab(index: number) {
    const tabs = this.getParsedItems();
    if (this.disabled || tabs[index]?.disabled) return;
    this.selectedIndex = index;
    this.tabChange.emit({ action: 'select', index, tab: tabs[index] });
  }

  private updateIndicator() {
    requestAnimationFrame(() => {
      const activeTab = this.tabRefs[this.selectedIndex];
      if (activeTab) {
        this.indicatorStyle = {
          width: `${activeTab.offsetWidth}px`,
          transform: `translateX(${activeTab.offsetLeft}px)`,
        };
      }
    });
  }

  private getMappedSize(): string {
    switch (this.size) {
      case 'small': return 'sm';
      case 'large': return 'lg';
      case 'medium': return 'base';
      default: return this.size;
    }
  }

  render() {
    const tabs = this.getParsedItems();
    const wrapperClasses: { [key: string]: boolean } = {
      'spectrum-tabs': true,
      [`spectrum-tabs--${this.variant}`]: true,
      [`spectrum-tabs--${this.getMappedSize()}`]: true,
      'spectrum-tabs--scrollable': this.scrollable,
      'spectrum-tabs--disabled': this.disabled,
    };

    this.tabRefs = [];

    return (
      <Host>
        <div class={wrapperClasses} role="tablist" aria-orientation="horizontal">
          <div class="spectrum-tabs__list">
            {tabs.map((tab, i) => {
              const tabClasses: { [key: string]: boolean } = {
                'spectrum-tabs__tab': true,
                'spectrum-tabs__tab--selected': i === this.selectedIndex,
                'spectrum-tabs__tab--disabled': !!tab.disabled || this.disabled,
                'spectrum-tabs__tab--focused': i === this.isFocusedIndex,
              };
              return (
                <button
                  ref={(el) => { if (el) this.tabRefs[i] = el; }}
                  class={tabClasses}
                  role="tab"
                  type="button"
                  tabindex={i === this.selectedIndex ? '0' : '-1'}
                  aria-selected={(i === this.selectedIndex).toString()}
                  aria-disabled={(!!tab.disabled || this.disabled) ? 'true' : undefined}
                  id={tab.id || `spectrum-tab-${i}`}
                  onClick={() => this.selectTab(i)}
                  onFocus={() => { this.isFocusedIndex = i; }}
                  onBlur={() => { this.isFocusedIndex = -1; }}
                >
                  {tab.icon && (
                    <span class="spectrum-tabs__icon" aria-hidden="true">
                      <span class="material-symbols-outlined">{tab.icon}</span>
                    </span>
                  )}
                  <span class="spectrum-tabs__label">{tab.label}</span>
                </button>
              );
            })}
            <span class="spectrum-tabs__indicator" style={this.indicatorStyle} />
          </div>
        </div>
        <div class="spectrum-tabs__panels">
          <slot name="tab-content" />
        </div>
      </Host>
    );
  }
}
