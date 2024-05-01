import getERC20Symbol from './getERC20Symbol';
import getERC20Decimal from './getERC20Decimal';
import getERC20Balance from './getERC20Balance';

export type TokenDetailsType = {
  address: string;
  balance: string;
  symbol: string;
  decimals: string;
};

const getERC20Details = async (
  contract: string,
  passPhrase: string,
  userAddress: string,
): Promise<TokenDetailsType> => {
  const balance = getERC20Balance(contract, passPhrase, userAddress);
  const symbol = getERC20Symbol(contract, passPhrase, userAddress);
  const decimals = getERC20Decimal(contract, passPhrase, userAddress);

  const result = await Promise.all([balance, symbol, decimals]);

  return {
    address: contract,
    balance: result[0],
    symbol: result[1],
    decimals: result[2],
  };
};

export default getERC20Details;
