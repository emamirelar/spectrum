import { newSpecPage } from '@stencil/core/testing';
import { SpectrumAvatar } from '../spectrum-avatar';

describe('spectrum-avatar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumAvatar],
      html: `<spectrum-avatar></spectrum-avatar>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-avatar>
        <mock:shadow-root>
          <div class="spectrum-avatar spectrum-avatar--base spectrum-avatar--circle spectrum-avatar--default spectrum-avatar--has-icon">
            <span class="spectrum-avatar__icon spectrum-avatar__icon--fallback">
              <span class="material-symbols-outlined">person</span>
            </span>
          </div>
        </mock:shadow-root>
      </spectrum-avatar>
    `);
  });
});
