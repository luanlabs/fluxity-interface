import dateToSeconds from '../utils/dateToSeconds';

const isStreamWithdrawable = (
  startDate: number,
  endDate: number,
  cliffDate: number,
  amount: number,
  withdrawn: number,
  isCancelled: boolean,
) => {
  const currentDate = dateToSeconds(new Date());

  return (
    cliffDate < currentDate &&
    startDate > currentDate &&
    endDate > currentDate &&
    !isCancelled &&
    withdrawn < amount
  );
};

export default isStreamWithdrawable;
