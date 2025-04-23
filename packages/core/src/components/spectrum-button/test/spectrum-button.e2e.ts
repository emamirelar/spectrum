import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-button></spectrum-button>');

    const element = await page.find('spectrum-button');
    expect(element).toHaveClass('hydrated');
  });
});
