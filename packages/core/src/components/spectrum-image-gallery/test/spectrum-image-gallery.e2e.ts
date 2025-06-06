import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-image-gallery', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-image-gallery></spectrum-image-gallery>');

    const element = await page.find('spectrum-image-gallery');
    expect(element).toHaveClass('hydrated');
  });
});
