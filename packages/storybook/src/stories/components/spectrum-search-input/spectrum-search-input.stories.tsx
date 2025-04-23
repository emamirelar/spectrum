import { html } from 'lit-html';
import { Meta, StoryFn } from '@storybook/web-components';

export default {
  title: 'Components/SpectrumSearchInput',
  component: 'spectrum-search-input',
  argTypes: {},
} as Meta;

const Template: StoryFn = () => {
  return html`
    <div style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <spectrum-search-input
        @searchSubmit=${(e: CustomEvent<string>) => console.log('Search submitted:', e.detail)}
      ></spectrum-search-input>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {}; 