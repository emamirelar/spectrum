import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-toast></spectrum-toast>');

    const element = await page.find('spectrum-toast');
    expect(element).toHaveClass('hydrated');
  });
});
