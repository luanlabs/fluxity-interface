import { RateValue } from 'src/models';

export const rates = {
  daily: 86400,
  weekly: 604800,
  monthly: 2592000,
  quarterly: 10368000,
  annually: 365, // TODO
};

export const flowRateOptions: RateValue[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annually', label: 'Annually' },
];

export default flowRateOptions;
