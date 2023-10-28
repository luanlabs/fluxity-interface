import type { Meta, StoryObj } from '@storybook/react';

import CProcessModal from '../components/CProcessModal';

const meta = {
  title: 'Components/CProcessModal',
  component: CProcessModal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CProcessModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CProcess: Story = {
  args: {
    isOpen: true,
    setIsOpen: true,
    title: 'Title',
    message: 'Message',
    height: '200px',
  },
};
