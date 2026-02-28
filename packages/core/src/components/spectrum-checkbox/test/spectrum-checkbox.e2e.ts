import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-checkbox></spectrum-checkbox>');
    const element = await page.find('spectrum-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
