import type { Meta, StoryObj } from '@storybook/react';

import CButton from '../components/CButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/CButton',
  component: CButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof CButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Form: Story = {
  args: {
    variant: 'form',
    content: 'Create Stream',
  },
};

export const SimpleOrange: Story = {
  args: {
    variant: 'simple',
    color: 'orange',
    content: 'Read Whitepaper',
  },
};

export const SimplePurple: Story = {
  args: {
    variant: 'simple',
    color: 'purple',
    content: 'Create Stream',
    logo: '',
  },
};

export const SimpleTestNet: Story = {
  args: {
    variant: 'simple',
    color: 'gray',
    content: 'Testnet',
    logo: '',
  },
};

export const SimpleWhithdraw: Story = {
  args: {
    variant: 'simple',
    color: 'white',
    content: 'Withdraw',
    logo: '',
  },
};

export const SimpleShare: Story = {
  args: {
    variant: 'simple',
    color: 'blue',
    content: 'Share',
    logo: '',
  },
};

export const SimpleHelp: Story = {
  args: {
    variant: 'simple',
    color: 'blueWhite',
    content: 'Get Help',
    logo: '',
  },
};
