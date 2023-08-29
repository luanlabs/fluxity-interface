import type { Meta, StoryObj } from '@storybook/react';

import CDatePicker from '../components/CDatePicker';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Components/CInput',
  component: CDatePicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof CDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DefaultCDatePicker: Story = {
  args: {},
};

export const StartDate: Story = {
  args: {
    label: 'Start date (optional)',
  },
};

export const EndDate: Story = {
  args: {
    label: 'End date (optional)',
  },
};

export const CliffDate: Story = {
  args: {
    label: 'Cliff date (optional)',
  },
};
