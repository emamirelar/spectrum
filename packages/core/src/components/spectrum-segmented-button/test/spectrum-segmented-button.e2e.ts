import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-segmented-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-segmented-button></spectrum-segmented-button>');
    const element = await page.find('spectrum-segmented-button');
    expect(element).toHaveClass('hydrated');
  });
});
