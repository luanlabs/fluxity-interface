import type { Meta, StoryObj } from '@storybook/react';

import ClaimTokens from '../containers/ClaimTokens';

const meta = {
  title: 'containers/ClaimTokens',
  component: ClaimTokens,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClaimTokens>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClaimTokenContainer: Story = {
  args: {},
};
