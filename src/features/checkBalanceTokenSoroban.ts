import { Contract } from 'stellar-sdk';
import getContractIdFromAsset from './getContractIdFromAsset';
import getERC20Details from './soroban/getERC20Details';

const checkBalanceTokenSoroban = async (address: string) => {
  const contracts = await getContractIdFromAsset(address);

  const availableContracts = [];

  for (let i = 0; i < contracts.length; i++) {
    try {
      const contract = new Contract(contracts[i]);
      console.log(contracts[i]);
      const tokenDetails = await getERC20Details(address, contract);

      availableContracts.push({
        ...tokenDetails,
        name: '',
        logo: '',
        _id: '',
      });
    } catch {
      console.log('not found :', contracts[i]);
    }
  }

  return availableContracts;
};

export default checkBalanceTokenSoroban;
