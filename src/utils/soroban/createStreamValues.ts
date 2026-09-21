import dateToSeconds from 'src/utils/dateToSeconds';
import toDecimals from 'src/utils/createLockup/toDecimals';
import { FormValues } from 'src/containers/CreateLockup';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';

import BN from '../BN';
import { rateToNumber } from '../rates';
import { OperationType } from 'src/models';

const toXdrValue = (params: FormValues, address: string, opertaionType: OperationType) => {
  let startDate = dateToSeconds(params.startDate ? params.startDate : new Date()).toString();

  const endDate = dateToSeconds(params.endDate).toString();
  const currentDate = dateToSeconds(new Date()).toString();

  let cliffDate = startDate;

  if (params.cliffDate) {
    cliffDate = dateToSeconds(params.cliffDate).toString();
  }

  if (new BN(startDate).isLessThan(currentDate)) {
    startDate = currentDate;
  }

  const cancellableDate = params.isCancellable === 'ON' ? startDate : endDate;

  const amount = toDecimals(calculateTotalAmount(params));

  const isVesting = opertaionType === 'vesting';

  return {
    amount: amount,
    cancellable_date: cancellableDate,
    cliff_date: cliffDate,
    end_date: endDate,
    is_vesting: isVesting,
    rate: rateToNumber(params.rate.rate.value),
    receiver: params.address,
    sender: address,
    spender: address,
    start_date: startDate,
    token: params.token.value.address,
  };
};

export default toXdrValue;
