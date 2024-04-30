import { xdr } from '@stellar/stellar-sdk';

import ToScVal from 'src/utils/createLockup/scVal';
import dateToSeconds from 'src/utils/dateToSeconds';
import toDecimals from 'src/utils/createLockup/toDecimals';
import { FormValues } from 'src/containers/CreateLockup';
import { calculateTotalAmount } from 'src/utils/calculateTotalAmount';

import BN from '../BN';
import { rateToNumber } from '../rates';

const { scvMap } = xdr.ScVal;
const { ScMapEntry: addToMap } = xdr;

const toXdrValue = (params: FormValues, address: string) => {
  let startDate = dateToSeconds(params.startDate ? params.startDate : new Date()).toString();

  const endDate = dateToSeconds(params.endDate).toString();
  const currentDate = dateToSeconds(new Date()).toString();

  let cliffDate = currentDate;

  if (params.cliffDate) {
    cliffDate = dateToSeconds(params.cliffDate).toString();
  }

  if (new BN(startDate).isLessThan(currentDate)) {
    startDate = currentDate;
  }

  const cancellableDate = params.isCancellable === 'ON' ? startDate : endDate;

  const amount = toDecimals(calculateTotalAmount(params));

  return scvMap([
    new addToMap({
      key: ToScVal.symbol('amount'),
      val: ToScVal.i128(amount),
    }),
    new addToMap({
      key: ToScVal.symbol('cancellable_date'),
      val: ToScVal.u64(cancellableDate),
    }),
    new addToMap({
      key: ToScVal.symbol('cliff_date'),
      val: ToScVal.u64(cliffDate),
    }),
    new addToMap({
      key: ToScVal.symbol('end_date'),
      val: ToScVal.u64(endDate),
    }),
    new addToMap({
      key: ToScVal.symbol('rate'),
      val: ToScVal.u32(rateToNumber(params.rate.rate.value)),
    }),
    new addToMap({
      key: ToScVal.symbol('receiver'),
      val: ToScVal.address(params.address),
    }),
    new addToMap({
      key: ToScVal.symbol('sender'),
      val: ToScVal.address(address),
    }),
    new addToMap({
      key: ToScVal.symbol('start_date'),
      val: ToScVal.u64(startDate),
    }),
    new addToMap({
      key: ToScVal.symbol('token'),
      val: ToScVal.address(params.token.value.address),
    }),
  ]);
};

export default toXdrValue;
