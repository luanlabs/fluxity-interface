import type { Meta, StoryObj } from '@storybook/react';

import TransactionSuccessModal from '../containers/TransactionSuccessModal';

const meta = {
  title: 'Components/Modal',
  component: TransactionSuccessModal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TransactionSuccessModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionSuccess: Story = {};
