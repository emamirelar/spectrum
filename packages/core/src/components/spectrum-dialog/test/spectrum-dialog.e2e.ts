import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-dialog></spectrum-dialog>');

    const element = await page.find('spectrum-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
