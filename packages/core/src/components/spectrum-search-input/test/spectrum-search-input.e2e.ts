import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-search-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-search-input></spectrum-search-input>');

    const element = await page.find('spectrum-search-input');
    expect(element).toHaveClass('hydrated');
  });
});
