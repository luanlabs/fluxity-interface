import dateToSeconds from '../utils/dateToSeconds';

const isStreamCancellable = (endDate: number, cancellableDate: number, isCancelled: boolean) => {
  const currentDate = dateToSeconds(new Date());

  return endDate > currentDate && cancellableDate < currentDate && !isCancelled;
};

export default isStreamCancellable;
