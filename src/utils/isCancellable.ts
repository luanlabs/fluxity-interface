import dateToSeconds from './dateToSeconds';

const isCancellable = (endDate: number, cancellableDate: number, isCancelled: boolean) => {
  const currentDate = dateToSeconds(new Date());

  if (endDate > currentDate && cancellableDate < currentDate && !isCancelled) {
    return true;
  }
  return false;
};

export default isCancellable;
