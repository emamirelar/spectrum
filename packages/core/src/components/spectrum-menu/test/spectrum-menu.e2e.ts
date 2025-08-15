import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-menu></spectrum-menu>');

    const element = await page.find('spectrum-menu');
    expect(element).toHaveClass('hydrated');
  });

  it('emits itemClick event when menu item is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <spectrum-menu items='[{"label": "Home", "href": "/"}]'></spectrum-menu>
    `);

    const menu = await page.find('spectrum-menu');
    const itemClickSpy = await menu.spyOnEvent('itemClick');

    // Wait for component to load and render
    await page.waitForChanges();

    // Click on the first menu item
    const menuItem = await page.find('spectrum-menu >>> .spectrum-menu__item-link');
    await menuItem.click();

    expect(itemClickSpy).toHaveReceivedEventDetail({
      label: 'Home',
      href: '/'
    });
  });

  it('toggles mobile menu when hamburger is clicked', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 500, height: 600 }); // Mobile viewport
    
    await page.setContent(`
      <spectrum-menu 
        mobile-breakpoint="768"
        items='[{"label": "Home", "href": "/"}]'>
      </spectrum-menu>
    `);

    await page.waitForChanges();

    // Check mobile toggle button exists
    const toggleButton = await page.find('spectrum-menu >>> .spectrum-menu__mobile-toggle');
    expect(toggleButton).toBeTruthy();

    // Check overlay is not visible initially
    let overlay = await page.find('spectrum-menu >>> .spectrum-menu__mobile-overlay');
    expect(overlay).toBeFalsy();

    // Click toggle button
    await toggleButton.click();
    await page.waitForChanges();

    // Check overlay is now visible
    overlay = await page.find('spectrum-menu >>> .spectrum-menu__mobile-overlay');
    expect(overlay).toBeTruthy();
  });
}); 