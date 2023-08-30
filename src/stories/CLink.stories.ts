import type { Meta, StoryObj } from '@storybook/react';

import CLink from '../components/CLink';

const meta = {
  title: 'Components/CLink',
  component: CLink,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {
    title: 'Documentation',
    url: '/documentation',
  },
};
