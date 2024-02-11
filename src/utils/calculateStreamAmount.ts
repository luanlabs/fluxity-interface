import BN from './BN';

const calculateStreamAmounts = (
  startDate: number,
  endDate: number,
  cliffDate: number,
  isCancalled: boolean,
  withdrawn: string,
  amount: string,
) => {
  const currentDate = Math.round(new Date().getTime() / 1000);

  if (currentDate <= startDate) {
    return {
      senderAmount: new BN(amount),
      receiverAmount: new BN(0),
    };
  }

  if (currentDate <= cliffDate) {
    return {
      senderAmount: new BN(amount),
      receiverAmount: new BN(0),
    };
  }

  if (isCancalled) {
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

  const receiverAmount = new BN(amount).times(proceededDate).div(totalDate);
  const senderAmount = new BN(amount).minus(receiverAmount);

  return {
    senderAmount,
    receiverAmount,
  };
};

export default calculateStreamAmounts;
