import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-collapsible-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-collapsible-list></spectrum-collapsible-list>');

    const element = await page.find('spectrum-collapsible-list');
    expect(element).toHaveClass('hydrated');
  });
});
