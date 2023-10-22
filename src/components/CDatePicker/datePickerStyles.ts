import styled from 'styled-components';

export const Wrapper = styled.div`
  .react-datepicker {
    background-color: white;
    border: none;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    padding: 0 10px;
  }

  .react-datepicker__day--disabled {
    color: rgb(107 114 128/0.6);
  }

  .react-datepicker__header {
    border-bottom: solid 5px white !important;
    background: white !important;
  }

  .react-datepicker__current-month {
    color: #111 !important;
    font-weight: normal;
    padding: 15px 0px;
  }

  .react-datepicker__month {
    margin-top: 0;
  }

  .react-datepicker__day-names {
    margin-top: 0px;
    margin-bottom: -17px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: white;
  }

  .react-datepicker__navigation {
    margin-top: 22px;
    padding: 0 30px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: rgb(107 114 128/6);
  }

  .react-datepicker__day-name {
    color: rgb(107 114 128/1);
  }

  .react-datepicker__day.react-datepicker__day {
    border-radius: 6px;
    padding: 0 0;
    text-align: center;
    line-height: 2.1rem;
    font-size: 0.875rem;
    font-weight: normal !important;
    padding: 0 17px !important;
  }

  .react-datepicker__day {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .react-datepicker__week {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .react-datepicker__day.react-datepicker__day--selected {
    border: none;
    border-radius: 6px;
    background-color: ${({ theme }) => theme.colors.royalBlue};
    color: white;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__time-list-item.react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => theme.colors.royalBlue};
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: ${({ theme }) => theme.colors.royalBlue};
  }

  .react-datepicker__time-container {
    float: right;
    border-left: 1px solid #d9d9d9;
    width: 85px;
  }

  .react-datepicker-time__header {
    margin-top: 18px;
    font-weight: normal;
  }

  .react-datepicker__time-list {
    scrollbar-width: none;
    scrollbar-color: #ababab #ffffff;
  }

  .react-datepicker__time-list::-webkit-scrollbar {
    width: 7px;
  }

  .react-datepicker__time-list::-webkit-scrollbar-track {
    background: rgb(107 114 128/0.09);
  }

  .react-datepicker__time-list::-webkit-scrollbar-thumb {
    background-color: #ababab;
    border-radius: 6px;
    border: 0px solid #ffffff;
  }
`;
