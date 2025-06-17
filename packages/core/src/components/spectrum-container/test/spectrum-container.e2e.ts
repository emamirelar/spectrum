import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-container', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-container></spectrum-container>');

    const element = await page.find('spectrum-container');
    expect(element).toHaveClass('hydrated');
  });
});
