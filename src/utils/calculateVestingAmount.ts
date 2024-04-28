import BN from './BN';
import BigNumber from 'bignumber.js';

const calculateVestingAmounts = (
  startDate: number,
  endDate: number,
  cliffDate: number,
  isCancelled: boolean,
  withdrawn: string,
  rate: string,
  amount: string,
) => {
  const currentDate = Math.round(new Date().getTime() / 1000);

  if (currentDate <= startDate || currentDate <= cliffDate) {
    return {
      senderAmount: new BN(amount),
      receiverAmount: new BN(0),
    };
  }

  if (isCancelled) {
    return {
      senderAmount: new BN(amount).minus(withdrawn),
      receiverAmount: new BN(withdrawn),
    };
  }

  if (currentDate >= endDate) {
    return {
      senderAmount: new BN(0),
      receiverAmount: new BN(amount),
    };
  }

  const totalDate = new BN(endDate).minus(startDate);
  const proceededDate = new BN(currentDate).minus(startDate);
  const rateInSeconds = new BN(rate);

  const times = new BN(proceededDate).div(rateInSeconds).integerValue(BigNumber.ROUND_FLOOR);
  const oneTimeAmount = new BN(amount).times(rateInSeconds).div(totalDate);

  const receiverAmount = new BN(times).times(oneTimeAmount);
  const senderAmount = new BN(amount).minus(receiverAmount);

  return {
    senderAmount,
    receiverAmount,
  };
};

export default calculateVestingAmounts;
