import { ITokenDetails } from 'src/models';

import getERC20Symbol from './getERC20Symbol';
import getERC20Decimal from './getERC20Decimal';
import getERC20Balance from './getERC20Balance';
import passPhraseToNetworkDetail from 'src/utils/passPhraseToNetworkDetail';

const getERC20Details = async (
  contract: string,
  passPhrase: string,
  userAddress: string,
): Promise<ITokenDetails | null> => {
  try {
    const balance = getERC20Balance(contract, passPhrase, userAddress);
    const symbol = getERC20Symbol(contract, passPhrase, userAddress);
    const decimals = getERC20Decimal(contract, passPhrase, userAddress);

    const result = await Promise.all([balance, symbol, decimals]);

    const networkName = passPhraseToNetworkDetail(passPhrase).network;

    return {
      address: contract,
      balance: result[0],
      symbol: result[1] === 'native' ? 'XLM' : result[1],
      decimals: result[2],
      name: '',
      logo: '',
      _id: '',
      claimable: false,
      network: networkName,
    };
  } catch (error) {
    return null;
  }
};

export default getERC20Details;
