import type { Meta, StoryObj } from '@storybook/react';

import CNavLink from '../components/CNavLink';
import Home from 'src/svgs/Home';

const meta = {
  title: 'Components/CNavLink',
  component: CNavLink,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CNavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavLink: Story = {
  args: {
    title: 'Home',
    icon: <Home fill="#EBFDFF" />,
    activeIcon: <Home />,
    url: '/',
  },
};
