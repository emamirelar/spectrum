import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';

/** Interface for rail items that can be used in the spectrum-rail component */
export interface RailItem {
  /** Icon to display for the rail item */
  icon: string;
  /** Label to show as tooltip */
  label: string;
  /** Action identifier that will be emitted when clicked */
  action: string;
}

@Component({
  tag: 'spectrum-rail',
  styleUrl: 'spectrum-rail.scss',
  shadow: true,
})
export class SpectrumRail {
  /** Optional menu item at the top */
  @Prop() menuItem?: RailItem;

  /** Optional FAB (Floating Action Button) item */
  @Prop() fabItem?: RailItem;

  /** Top section items */
  @Prop() topItems: RailItem[] = [];

  /** Bottom section items */
  @Prop() bottomItems: RailItem[] = [];

  /** Emits when a rail item is clicked */
  @Event() railAction: EventEmitter<{ action: string, label: string }>;

  private handleItemClick(item: RailItem) {
    this.railAction.emit({
      action: item.action,
      label: item.label
    });
  }

  private renderRailItem(item: RailItem, variant: 'ghost' | 'primary' = 'ghost') {
    return (
      <div class="rail-item-wrapper">
        <spectrum-button
          class="rail-item"
          variant={variant}
          size="base"
          iconOnly={true}
          showLeftIcon={true}
          leftIcon={item.icon}
          onClick={() => this.handleItemClick(item)}
          title={item.label}
          aria-label={item.label}
        />
        <button 
          class="rail-label"
          onClick={() => this.handleItemClick(item)}
          aria-label={item.label}
        >
          {item.label}
        </button>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <div class="rail">
          {/* Menu Item */}
          {this.menuItem && (
            <div class="rail-section menu">
              {this.renderRailItem(this.menuItem)}
            </div>
          )}

          {/* FAB Item */}
          {this.fabItem && (
            <div class="rail-section fab">
              {this.renderRailItem(this.fabItem, 'primary')}
            </div>
          )}

          {/* Top Items */}
          {this.topItems.length > 0 && (
            <div class="rail-section top">
              {this.topItems.map((item) => this.renderRailItem(item))}
            </div>
          )}

          {/* Bottom Items */}
          {this.bottomItems.length > 0 && (
            <div class="rail-section bottom">
              {this.bottomItems.map((item) => this.renderRailItem(item))}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
