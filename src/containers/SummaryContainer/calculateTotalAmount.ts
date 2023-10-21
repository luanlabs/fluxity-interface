import BN from 'bignumber.js';

export const calculateTotalAmount = (
  startDate: Date,
  endDate: Date,
  amount: BN,
  time: number,
) => {
  const amountAsNumber = new BN(amount);

  let timeStampStartDate = new BN(new Date().getTime());
  let timeStampEndDate = new BN(endDate.getTime());

  if (startDate) {
    timeStampStartDate = new BN(startDate.getTime());
  }

  const calulateTime = timeStampEndDate.minus(timeStampStartDate);

  return amountAsNumber.times(calulateTime).div(new BN(time));
};
