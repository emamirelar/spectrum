import { newSpecPage } from '@stencil/core/testing';
import { SpectrumMenu } from '../spectrum-menu';

describe('spectrum-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumMenu],
      html: `<spectrum-menu></spectrum-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-menu class="spectrum-menu spectrum-menu--horizontal">
        <mock:shadow-root>
          <nav class="spectrum-menu__nav" role="navigation">
            <ul class="spectrum-menu__list" role="menubar"></ul>
          </nav>
        </mock:shadow-root>
      </spectrum-menu>
    `);
  });

  it('renders with items', async () => {
    const items = [
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'About', href: '/about', icon: 'info' }
    ];

    const page = await newSpecPage({
      components: [SpectrumMenu],
      html: `<spectrum-menu></spectrum-menu>`,
    });

    page.root.items = items;
    await page.waitForChanges();

    const menuItems = page.root.shadowRoot.querySelectorAll('.spectrum-menu__item');
    expect(menuItems.length).toBe(2);
  });

  it('renders in mobile mode', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const page = await newSpecPage({
      components: [SpectrumMenu],
      html: `<spectrum-menu mobile-breakpoint="768"></spectrum-menu>`,
    });

    await page.waitForChanges();

    expect(page.root).toHaveClass('spectrum-menu--mobile');
  });
}); 