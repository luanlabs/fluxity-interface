import { Contract } from '@stellar/stellar-sdk';
import { HorizonApi } from '@stellar/stellar-sdk/lib/horizon';

import { Testnet } from 'src/constants/networks';

import getERC20Details from './soroban/getERC20Details';
import getContractIdFromAsset from './getContractIdFromAsset';

const checkBalanceTokenSoroban = async (
  address: string,
  userBalances: HorizonApi.BalanceLineAsset[],
  networkPassphrase: string,
) => {
  const contracts = await getContractIdFromAsset(userBalances, networkPassphrase);

  const availableContracts = [];

  for (let i = 0; i < contracts.length; i++) {
    try {
      const contract = new Contract(contracts[i]);
      const tokenDetails = getERC20Details(contract.toString(), Testnet.networkPassphrase, address);

      availableContracts.push(tokenDetails);
    } catch {
      console.log('not found :', contracts[i]);
    }
  }

  const result = await Promise.all(availableContracts);

  return result;
};

export default checkBalanceTokenSoroban;
