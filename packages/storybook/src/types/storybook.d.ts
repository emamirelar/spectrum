declare module '@storybook/react' {
  import { Meta as BaseMeta, StoryObj as BaseStoryObj } from '@storybook/web-components-vite';
  
  export type Meta<T = any> = BaseMeta<T>;
  export type StoryObj<T = any> = BaseStoryObj<T>;
  
  // Add any additional types needed from @storybook/react
} 