import BN from './BN';

import { IResponseStream } from 'src/models';
import decimalToNumber from './decimalToNumber';

const amountCounter = (streamData: IResponseStream) => {
  const amount = decimalToNumber(streamData.amount, 7);

  if (streamData.status !== 'ongoing') {
    return Number(amount);
  }

  const time = streamData.end_date - streamData.start_date;
  const nowTime = new Date().getTime() / 1000;
  const diffTime = nowTime - streamData.start_date;

  const newAmount = BN((diffTime * Number(amount)) / time);

  return new BN(newAmount).toFixed(3);
};

export default amountCounter;
