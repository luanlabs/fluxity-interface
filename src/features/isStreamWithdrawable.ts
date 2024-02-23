import dateToSeconds from 'src/utils/dateToSeconds';

const isStreamWithdrawable = (
  startDate: number,
  endDate: number,
  cliffDate: number,
  amount: number,
  withdrawn: number,
  isCancelled: boolean,
) => {
  const currentDate = dateToSeconds(new Date());
  if (isCancelled) {
    return false;
  }
  return (
    cliffDate < currentDate &&
    startDate < currentDate &&
    endDate > currentDate &&
    withdrawn < amount
  );
};

export default isStreamWithdrawable;
