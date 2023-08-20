import type { Meta, StoryObj } from '@storybook/react';
import RootLayout from '../app/layout';

const meta = {
  title: 'Layout',
  component: RootLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RootLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayoutStory: Story = {
  args: {
    children: (
      <div>
        <h1>Content Goes Here</h1>
      </div>
    ),
  },
};
