import React from 'react';
import PreviousIcon from '../../svgs/previous';
import NextIcon from '../../svgs/next';

const getMonthName = (monthIndex: any) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[monthIndex];
};

const getFormattedDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const monthName = getMonthName(date.getMonth());
  const year = date.getFullYear();
  return `${day} ${monthName} ${year}`;
};

export const datePickerOptions = {
  title: '',
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-white dark:bg-white',
    todayBtn: '',
    clearBtn: '',
    icons: '!bg-transparent !text-gray-800 hover:!bg-gray-100',
    disabledText: '!bg-transparent rounded-[6px] !text-gray-400 ',
    input: 'hidden',
    inputIcon: 'hidden',
    selected: 'bg-royalblue dark:!text-white !text-white dark:hover:!bg-royalblue',
    text: 'dark:text-gray-900 !text-gray-900 hover:!bg-gray-100',
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
      <span>
        <PreviousIcon />
      </span>
    ),
    next: () => (
      <span>
        <NextIcon />
      </span>
    ),
  },
  datepickerClassNames: 'top-100',
  defaultDate: new Date(),
  language: 'en',
};

export default getFormattedDate;
