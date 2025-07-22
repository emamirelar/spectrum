import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-badge></spectrum-badge>');

    const element = await page.find('spectrum-badge');
    expect(element).toHaveClass('hydrated');
  });
});
