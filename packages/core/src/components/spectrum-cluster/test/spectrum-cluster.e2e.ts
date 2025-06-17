import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-cluster', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-cluster></spectrum-cluster>');

    const element = await page.find('spectrum-cluster');
    expect(element).toHaveClass('hydrated');
  });
});
