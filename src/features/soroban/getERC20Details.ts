import { Contract } from '@stellar/stellar-sdk';
import getERC20Balance from './getERC20Balance';
import getERC20Decimal from './getERC20Decimal';
import getERC20Symbol from './getERC20Symbol';

export type TokenDetailsType = {
  address: string;
  balance: string;
  symbol: string;
  decimals: string;
};

const getERC20Details = async (
  userAddress: string,
  passPhrase: string,
  contract: Contract,
): Promise<TokenDetailsType> => {
  const balance = getERC20Balance(userAddress, passPhrase, contract);
  const symbol = getERC20Symbol(userAddress, passPhrase, contract);
  const decimals = getERC20Decimal(userAddress, passPhrase, contract);

  const result = await Promise.all([balance, symbol, decimals]);

  return {
    address: contract.contractId(),
    balance: result[0],
    symbol: result[1],
    decimals: result[2],
  };
};

export default getERC20Details;
