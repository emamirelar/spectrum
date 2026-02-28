import { newE2EPage } from '@stencil/core/testing';

describe('spectrum-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<spectrum-progress value="50"></spectrum-progress>');
    const element = await page.find('spectrum-progress');
    expect(element).toHaveClass('hydrated');
  });
});
