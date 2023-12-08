import { log } from 'console';
import dateToSeconds from './dateToSeconds';

const isWithdraw = (
  startDate: number,
  cliffDate: number,
  amount: number,
  withdrawn: number,
  isCancelled: boolean,
) => {
  const currentDate = dateToSeconds(new Date());

  if (cliffDate > currentDate && currentDate < startDate && withdrawn === amount && isCancelled) {
    return true;
  }

  return false;
};

export default isWithdraw;
