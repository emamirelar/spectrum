// import { Component, Element, Host, h, Prop } from '@stencil/core';
import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'spectrum-megamenu',
  styleUrl: 'spectrum-megamenu.scss',
  shadow: true,
})
export class SpectrumMegamenu {

  /**
   * Note that prop names are all lowercase to accomodate Storybook's args.
  */

  /**
   * The megamenu title text
   * Default: Mega Menu
  **/
  @Prop() megamenutitle: string = "Mega Menu (Default Title)";

  /**
   * The megamenu open button icon
   * Default: menu
  **/
  @Prop() openicon: string = "menu";
  /**
   * The megamenu close button icon
   * Default: close
  **/
  @Prop() closeicon: string = "close";

  /** The megamenu content as a json structure
   * of sections and links
   * sections are objects with a title and links
   * links are an array of objects with a title and href
   * optionally text can be added to a section 
   * with a title and text pair
   * Default: []
  **/
  @Prop() content: string= '';

  /**
   * A custom width for the megamenu
   * Default: null 
  **/
  @Prop() width: string = null;

  // @Element() el: HTMLElement;
  // megaMenu: HTMLElement;

  // componentDidLoad() {
  //   this.megaMenu = this.el.shadowRoot.querySelector('.megamenu');
  // }

  // componentWillLoad() {
  //   this.content = this.content.length > 0 ? JSON.parse(this.content) : [];
  // }

  /** 
   * renderMegamenu - render the megamenu
   * @param title - the title of the megamenu
   * @param content - the content of the megamenu
   * @param closeIcon - the icon for the close button
   * @returns - the megamenu element
  */

  renderMegamenu(title, content, closeIcon) {

    content = JSON.parse(this.content);
    let customStyle = this.width ? { width: this.width, maxWidth: this.width, minWidth: this.width } : {};

    return (
      <div class="megamenu" style={customStyle}>
        <div class="megamenu__header">
          <h2 class="megamenu__title">{title}</h2>
          <button popoverTarget="popover__megamenu" popoverTargetAction="hide" class="button--icon">{closeIcon}</button>
        </div>
        <div class="megamenu__content">
          {content.length === 0 ? (
            <div class="megamenu__column">
              <h3>No menu available</h3>
            </div>
          ) : (
            content.map(section => this.renderSection(section))
          )}
        </div>
      </div>
    );
  }

  /**
   * renderSection - render a section of the megamenu
   * @param section - the section object
   * @returns - the section element 
   */

  renderSection(section) {
    if (!section.links && !section.text) {
      return (
        <div class="megamenu__section">
          <h3 class="megamenu__section__header">{section.title}</h3>
          <p>No links available</p>
        </div>
      );
    }
    else if (section.text) {
      return (
        <div class="megamenu__section">
          <h3 class="megamenu__section__header">{section.title}</h3>
          <div class="megamenu__content__text">
            {section.text}
          </div>
        </div>
      );
    }
    else return (
      <div class="megamenu__section">
        <h3 class="megamenu__section__header">{section.title}</h3>
        <ul class="megamenu__content__list">
          {section.links.map(link => (
            <li><a href={link.href}>{link.title}</a></li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <Host>
        <style>
          {`
            :host {
              --spectrum-comp-megamenu-width: 10em;
            }
          `}
        </style>
        <button popoverTarget="popover__megamenu" class="button--icon">{this.openicon}</button>
        <div popover="" class="popover--fullscreen" id="popover__megamenu">
          {this.renderMegamenu(this.megamenutitle, this.content, this.closeicon)}
        </div>
      </Host>
    );
  }
}
