import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-switch></spectrum-switch>');

    const element = await page.find('spectrum-switch');
    expect(element).toHaveClass('hydrated');
  });
});
