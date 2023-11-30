import { rates } from 'src/constants/rates';

export const rateToNumber = (rate: keyof typeof rates): number => rates[rate];

export const numberToRate = (number: number): keyof typeof rates | undefined => {
  const entry = Object.entries(rates).find(([, value]) => value === number);

  return entry ? (entry[0] as keyof typeof rates) : undefined;
};

export default rateToNumber;
