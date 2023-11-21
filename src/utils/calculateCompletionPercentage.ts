import BN from './BN';

export const calculateCompletionPercentage = (start_date: number, end_date: number) => {
  const currentDate = Date.now();
  const endDate = new Date(end_date).getTime() * 1000;
  const startDate = new Date(start_date).getTime() * 1000;

  if (currentDate < startDate) {
    return '0';
  }

  if (currentDate >= endDate) {
    return '100';
  }

  const elapsedTime = new BN(currentDate).minus(startDate);

  const totalTime = new BN(endDate).minus(startDate);

  const completionPercentage = new BN(elapsedTime).div(totalTime).times(100);

  return completionPercentage.toFixed(0);
};
