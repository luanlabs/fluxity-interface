import { UseFormReturn } from 'react-hook-form';

interface rateInNumber {
  form: UseFormReturn<any, undefined>;
  isFormValidated: boolean;
}

export const rateInNumber = (rateTime: string) => {
  const daily = 1000 * 60 * 60 * 24;
  const time = {
    daily: daily,
    weekly: daily * 7,
    monthly: daily * 30.4,
    quarterly: daily * 91,
    annualy: daily * 365,
  };

  let rate = time.monthly;

  if (rateTime === 'daily') {
    rate = daily;
  }
  if (rateTime === 'weekly') {
    rate = time.weekly;
  }
  if (rateTime === 'monthly') {
    rate = time.monthly;
  }
  if (rateTime === 'quarterly') {
    rate = time.quarterly;
  }
  if (rateTime === 'annualy') {
    rate = time.annualy;
  }

  return rate;
};
