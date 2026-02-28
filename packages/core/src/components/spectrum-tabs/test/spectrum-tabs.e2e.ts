import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-tabs></spectrum-tabs>');
    const element = await page.find('spectrum-tabs');
    expect(element).toHaveClass('hydrated');
  });
});
