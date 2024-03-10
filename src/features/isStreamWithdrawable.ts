import BN from 'src/utils/BN';
import { IResponseStream } from 'src/models';
import { IStream } from 'src/constants/types';
import dateToSeconds from 'src/utils/dateToSeconds';

const isStreamWithdrawable = ({
  start_date,
  cliff_date,
  amount,
  withdrawn,
  is_cancelled,
}: IStream | IResponseStream) => {
  const currentDate = dateToSeconds(new Date());

  if (is_cancelled) {
    return false;
  }

  return (
    cliff_date < currentDate &&
    start_date < currentDate &&
    new BN(withdrawn).isLessThan(amount) &&
    !is_cancelled
  );
};

export default isStreamWithdrawable;
