import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-rail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-rail></spectrum-rail>');

    const element = await page.find('spectrum-rail');
    expect(element).toHaveClass('hydrated');
  });
});
