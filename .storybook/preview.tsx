import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { store } from '../src/store';
import theme from '../src/styles/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    nextjs: {
      appDirectory: true,
    },
  },
};
export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    </Provider>
  ),
];
export default preview;
