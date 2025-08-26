import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-card></spectrum-card>');

    const element = await page.find('spectrum-card');
    expect(element).toHaveClass('hydrated');
  });
});
