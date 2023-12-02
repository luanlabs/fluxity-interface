import { rates } from 'src/constants/rates';

export const rateToNumber = (rate: keyof typeof rates): number => rates[rate];

export const numberToRate = (number: number): string | undefined => {
  if (number === rates.daily) {
    return 'Day';
  } else if (number === rates.weekly) {
    return 'Week';
  } else if (number === rates.monthly) {
    return 'Month';
  } else if (number === rates.quarterly) {
    return 'Quarter';
  } else if (number === rates.annually) {
    return 'Annual';
  }
};

export default rateToNumber;
