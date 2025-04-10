import { newSpecPage } from '@stencil/core/testing';
import { SpectrumWallpaper } from '../spectrum-wallpaper';

describe('spectrum-wallpaper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumWallpaper],
      html: `<spectrum-wallpaper></spectrum-wallpaper>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-wallpaper>
        <mock:shadow-root>
          <div class="wallpaper" style="background-color: rgb(255, 255, 255); background-image: none; background-position: center; background-size: cover;">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </spectrum-wallpaper>
    `);
  });

  it('renders with custom background', async () => {
    const page = await newSpecPage({
      components: [SpectrumWallpaper],
      html: `<spectrum-wallpaper background-color="#000000" background-image="https://example.com/image.jpg"></spectrum-wallpaper>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-wallpaper background-color="#000000" background-image="https://example.com/image.jpg">
        <mock:shadow-root>
          <div class="wallpaper" style="background-color: rgb(0, 0, 0); background-image: url(https://example.com/image.jpg); background-position: center; background-size: cover;">
            <slot></slot>
          </div>
        </mock:shadow-root>
      </spectrum-wallpaper>
    `);
  });
}); 