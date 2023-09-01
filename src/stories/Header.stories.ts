import type { Meta, StoryObj } from '@storybook/react';

import Header from '../containers/Header';

const meta = {
  title: 'Containers/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderContainer: Story = {};
