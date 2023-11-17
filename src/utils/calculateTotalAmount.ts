import BN from 'bignumber.js';

import { FormValues as CreateStreamFormValues } from 'src/containers/CreateStreamMainCard';

import rateToNumber from './rateToNumber';
import dateToSeconds from './dateToSeconds';

export const calculateTotalAmount = (params: CreateStreamFormValues) => {
  let {
    startDate,
    endDate,
    rate: { amount },
  } = params;

  if (!startDate) {
    startDate = new Date();
  }

  const endDateTimestamp = dateToSeconds(endDate);
  const startDateTimestamp = dateToSeconds(startDate);

  const streamDuration = endDateTimestamp - startDateTimestamp;

  const totalAmount = new BN(amount)
    .times(streamDuration)
    .div(rateToNumber(params.rate.rate.value));

  return totalAmount;
};
