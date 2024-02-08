import dateToSeconds from '../utils/dateToSeconds';

export const isStreamCancellable = (endDate: number, cancellableDate: number) => {
  return cancellableDate !== endDate;
};

export const isStreamCancelled = (
  endDate: number,
  cancellableDate: number,
  isCancelled: boolean,
) => {
  const currentDate = dateToSeconds(new Date());

  return endDate > currentDate && cancellableDate < currentDate && !isCancelled;
};
