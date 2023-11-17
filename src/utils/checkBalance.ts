import BigNumber from 'bignumber.js';

import { IToken } from 'src/reducers/tokens';

import BN from './BN';
import toDecimals from './createStream/toDecimals';

export const checkBalance = (token: IToken, totalAmount: BigNumber) => {
  if (new BN(toDecimals(totalAmount).toString()).isGreaterThan(token.balance)) {
    return false;
  }

  return true;
};
