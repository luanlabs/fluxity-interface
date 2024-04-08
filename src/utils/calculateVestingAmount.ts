import { CInputRateValue } from 'src/components/CInputRate';
import BN from './BN';

const calculateVestingAmounts = (
  startDate: number,
  endDate: number,
  cliffDate: number,
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

  if (currentDate >= endDate) {
    return {
      senderAmount: new BN(0),
      receiverAmount: new BN(amount),
    };
  }

  const totalDate = new BN(endDate).minus(startDate);
  const proceededDate = new BN(currentDate).minus(startDate);
  const rateInSeconds = new BN(rate);

  const times = new BN(proceededDate).div(rateInSeconds);
  const oneTimeAmount = new BN(totalDate).div(rateInSeconds).times(amount);

  // TODO: Handle non-divisible duration / rate scenario

  const receiverAmount = new BN(times).times(oneTimeAmount);
  const senderAmount = new BN(amount).minus(receiverAmount);

  return {
    senderAmount,
    receiverAmount,
  };
};

export default calculateVestingAmounts;
