import { Contract, scValToNative } from '@stellar/stellar-sdk';

import ToScVal from 'src/utils/createLockup/scVal';
import getServer from 'src/utils/soroban/getServer';
import getAccount from 'src/utils/createLockup/getAccount';
import createTransaction from 'src/utils/soroban/baseTransaction';

const getERC20Allowance = async (
  contractAddress: string,
  passPhrase: string,
  owner: string,
  spenderAddress: string,
) => {
  const server = getServer(passPhrase);
  const account = await getAccount(owner, passPhrase);

  const from = ToScVal.address(owner);
  const spender = ToScVal.address(spenderAddress);

  const contract = new Contract(contractAddress);
  const call = contract.call('allowance', from, spender);

  const txXdr = createTransaction(account, passPhrase, call);
  const txXdrSimulate = await server.simulateTransaction(txXdr);
  const retVal: string = scValToNative(Object(txXdrSimulate).result.retVal);

  return retVal;
};

export default getERC20Allowance;
