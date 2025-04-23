import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-megamenu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-megamenu></spectrum-megamenu>');

    const element = await page.find('spectrum-megamenu');
    expect(element).toHaveClass('hydrated');
  });
});
