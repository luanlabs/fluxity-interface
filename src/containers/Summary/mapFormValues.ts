import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter';
import { FormValues } from '../CreateStreamMainCard';
import { shortenAddress } from 'src/utils/shortenAddress';

import defaultTokenLogo from 'public/images/defaultToken.svg';

const options = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
};

export const mapFormValues = (values: FormValues) => {
  if (!values.startDate) {
    values.startDate = new Date();
  }

  const newValues = Object.entries(values)
    .filter((value) => value[1])
    .filter((value) => {
      if (value[0] === 'rate') {
        if (value[1].amount && value[1].amount != 0) {
          return true;
        }
        return false;
      }

      return true;
    })

    .map(([label, value]) => {
      if (label === 'token') {
        return {
          label: 'Token',
          value: value.label,
          icon: value.value.logo ? value.value.logo : defaultTokenLogo,
        };
      }

      if (label === 'rate') {
        return {
          label: 'Flow Rate',
          value: `${value.amount} / ${value.rate.label}`,
        };
      }

      if (label === 'startDate') {
        return {
          label: 'Start Date',
          value: value.toLocaleDateString('en-US', options),
        };
      }

      if (label === 'endDate') {
        return {
          label: 'End Date',
          value: value.toLocaleDateString('en-US', options),
        };
      }

      if (label === 'address') {
        return { label: 'To', value: shortenAddress(value, 5) };
      }

      if (label === 'streamingModel') {
        return { label: 'Streaming Model', value: capitalizeFirstLetter(value) };
      }

      if (label === 'isCancellable') {
        return { label: 'Cancellable Stream', value };
      }

      if (label === 'cliffDate') {
        return { label: 'Cliff Date', value: value.toLocaleDateString('en-US', options) };
      }

      return {
        label,
        value,
      };
    });

  return newValues;
};
