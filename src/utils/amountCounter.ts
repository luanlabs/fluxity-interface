import { IResponseStream } from 'src/models';
import decimalToNumber from './decimalToNumber';
import BN from './BN';

const amountCounter = (streamData: IResponseStream) => {
  const amount = decimalToNumber(streamData.amount, 7);

  if (streamData.status !== 'ongoing') {
    return Number(amount);
  }

  const time = streamData.end_date - streamData.start_date; //100%
  const nowTime = new Date().getTime() / 1000;
  const diffTime = nowTime - streamData.start_date;

  const newAmount = BN((diffTime * Number(amount)) / time).toFixed(3);

  return Number(newAmount);
};

export default amountCounter;
