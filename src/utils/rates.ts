import { rates } from 'src/constants/rates';

export const rateToNumber = (rate: keyof typeof rates): number => rates[rate];

export const numberToRate = (number: number): string => {
  if (number === rates.daily) {
    return 'Day';
  }
  if (number === rates.weekly) {
    return 'Week';
  }
  if (number === rates.monthly) {
    return 'Month';
  }
  if (number === rates.quarterly) {
    return 'Quarter';
  }
  if (number === rates.annually) {
    return 'Year';
  }
  return 'Month';
};

export default rateToNumber;
