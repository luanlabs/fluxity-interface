import { rates } from 'src/constants/rates';

const rateToNumber = (rate: keyof typeof rates): number => rates[rate];

export default rateToNumber;
