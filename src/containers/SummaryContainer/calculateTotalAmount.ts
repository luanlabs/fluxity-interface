import BN from 'bignumber.js';

export const calculateTotalAmount = (
  startDate: Date,
  endDate: Date,
  amount: BN,
  rate: number
) => {
  const amountAsNumber = new BN(amount);

  let timeStampStartDate = new BN(new Date().getTime());
  let timeStampEndDate = new BN(endDate.getTime());

  if (startDate) {
    timeStampStartDate = new BN(startDate.getTime());
  }

  const calculateTime = timeStampEndDate.minus(timeStampStartDate);

  return amountAsNumber.times(calculateTime).div(new BN(rate));
};
