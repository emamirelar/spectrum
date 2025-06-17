import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-sidebar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-sidebar></spectrum-sidebar>');

    const element = await page.find('spectrum-sidebar');
    expect(element).toHaveClass('hydrated');
  });
});
