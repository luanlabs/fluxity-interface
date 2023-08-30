import exponentialLogo from '../../../public/images/exponential.svg';
import linearLogo from '../../../public/images/linear.svg';

import { Model } from './index';

const useStreamModel = (model: Model) => {
  const logo = model === 'linear' ? linearLogo : exponentialLogo;
  const title = model === 'linear' ? 'Linear' : 'Exponential';
  const description =
    model === 'linear'
      ? 'Send tokens at a constant rate/second'
      : 'Use an exponential curve with a rate increasing over time.';

  return {
    logo,
    title,
    description,
  };
};

export default useStreamModel;
