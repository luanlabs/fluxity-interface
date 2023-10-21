import type { Meta, StoryObj } from '@storybook/react';

import Aside from '../containers/Aside';

const meta = {
  title: 'Containers/Aside',
  component: Aside,
  parameters: {
    layout: 'padded',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Aside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MinimizedAside: Story = {
  args: {
    isMinimized: true,
    onMinimized: () => {},
  },
};

export const MaximizedAside: Story = {
  args: {
    isMinimized: false,
    onMinimized: () => {},
  },
};
