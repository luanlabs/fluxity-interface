import { IStream } from 'src/constants/types';
import dateToSeconds from '../utils/dateToSeconds';
import { IResponseStream } from 'src/models';

const isStreamWithdrawable = ({
  start_date,
  cliff_date,
  amount,
  withdrawn,
  is_cancelled,
}: IStream | IResponseStream) => {
  const currentDate = dateToSeconds(new Date());
  if (isCancelled) {
    return false;
  }
  return (
    cliff_date < currentDate && start_date < currentDate && !is_cancelled && withdrawn < amount
  );
};

export default isStreamWithdrawable;
