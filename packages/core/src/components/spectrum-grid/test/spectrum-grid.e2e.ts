import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-grid></spectrum-grid>');

    const element = await page.find('spectrum-grid');
    expect(element).toHaveClass('hydrated');
  });
});
