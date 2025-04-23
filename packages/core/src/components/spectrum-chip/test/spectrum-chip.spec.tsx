import { newSpecPage } from '@stencil/core/testing';
import { SpectrumChip } from '../spectrum-chip';

describe('spectrum-chip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SpectrumChip],
      html: `<spectrum-chip label="Test Chip"></spectrum-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-chip label="Test Chip">
        <mock:shadow-root>
          <div class="spectrum-chip spectrum-chip--assist" role="button" tabindex="0">
            <span class="spectrum-chip__label">Test Chip</span>
          </div>
        </mock:shadow-root>
      </spectrum-chip>
    `);
  });

  it('renders with leading icon', async () => {
    const page = await newSpecPage({
      components: [SpectrumChip],
      html: `<spectrum-chip label="Test Chip" leading-icon="face"></spectrum-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-chip label="Test Chip" leading-icon="face">
        <mock:shadow-root>
          <div class="spectrum-chip spectrum-chip--assist" role="button" tabindex="0">
            <span class="spectrum-chip__icon spectrum-chip__icon--leading">
              <span class="material-symbols-outlined">face</span>
            </span>
            <span class="spectrum-chip__label">Test Chip</span>
          </div>
        </mock:shadow-root>
      </spectrum-chip>
    `);
  });

  it('renders with trailing icon', async () => {
    const page = await newSpecPage({
      components: [SpectrumChip],
      html: `<spectrum-chip label="Test Chip" show-trailing-icon></spectrum-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-chip label="Test Chip" show-trailing-icon>
        <mock:shadow-root>
          <div class="spectrum-chip spectrum-chip--assist" role="button" tabindex="0">
            <span class="spectrum-chip__label">Test Chip</span>
            <span class="spectrum-chip__icon spectrum-chip__icon--trailing">
              <span class="material-symbols-outlined">close</span>
            </span>
          </div>
        </mock:shadow-root>
      </spectrum-chip>
    `);
  });

  it('renders selected state', async () => {
    const page = await newSpecPage({
      components: [SpectrumChip],
      html: `<spectrum-chip label="Test Chip" selected></spectrum-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-chip label="Test Chip" selected>
        <mock:shadow-root>
          <div class="spectrum-chip spectrum-chip--assist spectrum-chip--selected" role="button" tabindex="0">
            <span class="spectrum-chip__label">Test Chip</span>
          </div>
        </mock:shadow-root>
      </spectrum-chip>
    `);
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [SpectrumChip],
      html: `<spectrum-chip label="Test Chip" disabled></spectrum-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <spectrum-chip label="Test Chip" disabled>
        <mock:shadow-root>
          <div class="spectrum-chip spectrum-chip--assist spectrum-chip--disabled" role="button" tabindex="-1">
            <span class="spectrum-chip__label">Test Chip</span>
          </div>
        </mock:shadow-root>
      </spectrum-chip>
    `);
  });
}); 