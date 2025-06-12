import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-hero', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-hero></spectrum-hero>');

    const element = await page.find('spectrum-hero');
    expect(element).toHaveClass('hydrated');
  });
});
