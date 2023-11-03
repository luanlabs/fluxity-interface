import type { Meta, StoryObj } from '@storybook/react';

import CreateStreamConfirmModal from '../containers/Modals/CreateStreamConfirmModal';

const meta = {
  title: 'Components/Modal',
  component: CreateStreamConfirmModal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CreateStreamConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreateStreamConfirm: Story = {
  args: {
    isOpen: true,
    setIsOpen: true,
  },
};
