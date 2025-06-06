import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-select></spectrum-select>');

    const element = await page.find('spectrum-select');
    expect(element).toHaveClass('hydrated');
  });
});
