import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-carousel></spectrum-carousel>');

    const element = await page.find('spectrum-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
