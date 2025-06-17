import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-stack', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-stack></spectrum-stack>');

    const element = await page.find('spectrum-stack');
    expect(element).toHaveClass('hydrated');
  });
});
