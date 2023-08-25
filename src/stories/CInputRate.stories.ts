import type { Meta, StoryObj } from '@storybook/react';

import CInputRate from '../components/CInputRate';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/CInput',
  component: CInputRate,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof CInputRate>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const FlowRate: Story = {
  args: {
    label: 'Flow rate',
    details: 'Flow rate',
    placeHolder: '0.0',
  },
};

export const FlowRateWithoutDetail: Story = {
  args: {
    label: 'Flow rate',
    details: '',
    placeHolder: '0.0',
  },
};

export const FlowRateWithoutLabel: Story = {
  args: {
    placeHolder: '0.0',
  },
};
