import { Component, Element, Host, h, Prop } from '@stencil/core';
import Glide from '@glidejs/glide'

@Component({
  tag: 'spectrum-carousel',
  /* TODO: JW - is there a better way to reference the glide styles? */
  styleUrls: ['spectrum-carousel.scss', '../../../../../node_modules/@glidejs/glide/src/assets/sass/glide.core.scss', '../../../../../node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss'],
  shadow: true,
})
export class SpectrumCarousel {

  /**
   * Note that prop names are all lowercase to accomodate Storybook's args.
   */

  /** content
   * The carousel content as a json structure
   * of slides each with an image, optional link and optiopnal text
   * { "image": "url", "link": "url", "text": "text" }
   * Default: []
  **/
  @Prop() content: string = '';

  /**Show
   * The number of slides to show at once
   * Default: 3
  **/
  @Prop() show: number = 3;

  /** autoplay 
   * The time in milliseconds between slide transitions
   * 0 indicates no autoplay
   * Default: 0
   *  
  **/
  @Prop() autoplay: number = 0;

  /** animationtime
   * The time in milliseconds for the slide transition animation
   * Default: 1000
  **/
  @Prop() animationtime: number = 1000;

  /** gap
   * The gap between slides in pixels
   * Default: 0
  **/
  @Prop() gap: number = 0;

  /** hobverpause
   * Pause the carousel when the mouse is over it
   * Default: true
  **/
  @Prop() hoverpause: boolean = true;

  @Element() el: HTMLElement;
  carousel: HTMLElement;
  glideInstance: any;

  componentDidRender() {
    this.carousel = this.el.shadowRoot.querySelector('.glide');
    this.initGlide();
  }

  componentWillUpdate() {
    if (this.glideInstance) {
      this.glideInstance.destroy();
    }
  }

  initGlide() {
    this.glideInstance = new Glide(this.carousel, {
      type: 'carousel',
      startAt: 0,
      perView: Number(this.show),
      breakpoints: {
        1024: {
          perView: 2
        },
        600: {
          perView: 1
        },
      },
      focusAt: 'center',
      gap: Number(this.gap),
      autoplay: Number(this.autoplay),
      hoverpause: this.hoverpause,
      animationDuration: Number(this.animationtime),
      animationTimingFunc: 'ease-in-out',
      keyboard: true,
    }).mount();
  }

  /**
   * Iterate over the passed content and render each slide in the carousel
   * 
  **/
  renderSlides() {
    return JSON.parse(this.content).map((slide) => {
      return (
        <li class="glide__slide carousel__slide">
          <a
            href={slide.link}
            target="_blank"
          >
            <p class="carousel__text">{slide.text}</p>
            <img
              class="carousel__image"
              src={slide.image}
            />

          </a>
        </li>
      );
    });
  }


  render() {
    return (
      <Host>
        <div class="glide carousel">


          <div class="glide__track carousel__track" data-glide-el="track">
            <ul class="glide__slides">
              {this.renderSlides()}
            </ul>
          </div>

          <div class="carousel__controls" data-glide-el="controls">
            <button class="button--icon" data-glide-dir="<">arrow_back</button>
            <button class="button--icon" data-glide-dir=">">arrow_forward</button>
          </div>


          <div class="glide__bullets" data-glide-el="controls[nav]">
            <button class="glide__bullet" data-glide-dir="=0"></button>
            <button class="glide__bullet" data-glide-dir="=1"></button>
            <button class="glide__bullet" data-glide-dir="=2"></button>
          </div>


        </div>
      </Host>
    );
  }
}
