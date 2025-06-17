import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-flex', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-flex></spectrum-flex>');

    const element = await page.find('spectrum-flex');
    expect(element).toHaveClass('hydrated');
  });
});
