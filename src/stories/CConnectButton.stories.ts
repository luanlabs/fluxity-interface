import type { Meta, StoryObj } from '@storybook/react';

import CConnectButton from 'src/components/CConnectButton';

const meta = {
  title: 'Components/CConnectButton',
  component: CConnectButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CConnectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CConnectButtonMinimized: Story = {
  args: { isMinimized: true },
};
export const CConnectButtonNotMinimized: Story = {
  args: { isMinimized: true },
};
