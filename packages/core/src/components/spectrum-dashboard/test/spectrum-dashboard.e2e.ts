import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-dashboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-dashboard></spectrum-dashboard>');

    const element = await page.find('spectrum-dashboard');
    expect(element).toHaveClass('hydrated');
  });

  it('displays slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-dashboard>Test Content</spectrum-dashboard>');

    const element = await page.find('spectrum-dashboard');
    expect(element.textContent).toEqual('Test Content');
  });
});



