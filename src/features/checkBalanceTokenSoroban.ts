import { Contract, Horizon } from '@stellar/stellar-sdk';

import logger from 'src/utils/logger';

import getERC20Details from './soroban/getERC20Details';
import getContractIdFromAsset from './getContractIdFromAsset';

const checkBalanceTokenSoroban = async (
  address: string,
  userBalances: Horizon.HorizonApi.BalanceLineAsset[],
  networkPassphrase: string,
) => {
  const contracts = getContractIdFromAsset(userBalances, networkPassphrase);

  const availableContracts = [];

  for (let i = 0; i < contracts.length; i++) {
    try {
      const contract = new Contract(contracts[i].toString());

      const tokenDetails = getERC20Details(contract.toString(), networkPassphrase, address);

      availableContracts.push(tokenDetails);
    } catch (error) {
      logger.debug('Skipping contract that is not a valid token', error);
    }
  }

  const result = await Promise.all(availableContracts);

  const filteredResult = result.filter((x) => !!x);

  return filteredResult;
};

export default checkBalanceTokenSoroban;
