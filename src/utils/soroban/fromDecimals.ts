import BigNumber from 'bignumber.js';

import BN from 'src/utils/BN';

const fromDecimals = (amount: BigNumber | string | number): string => {
  const value = new BN(amount).div(10 ** 7).toFixed(3);

  return value;
};

export default fromDecimals;
