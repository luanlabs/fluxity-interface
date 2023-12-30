import { Contract, scValToNative } from 'stellar-sdk';

import ToScVal from 'src/utils/createStream/scVal';
import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import createTransaction from 'src/utils/soroban/baseTransaction';

const getERC20Allowance = async (
  contractAddress: string,
  owner: string,
  spenderAddress: string,
) => {
  const server = getServer();
  const account = await getAccount(owner);

  const from = ToScVal.address(owner);
  const spender = ToScVal.address(spenderAddress);

  const contract = new Contract(contractAddress);
  const call = contract.call('allowance', from, spender);

  const txXdr = createTransaction(account, call);
  const txXdrSimulate = await server.simulateTransaction(txXdr);
  const retval: string = scValToNative(Object(txXdrSimulate).result.retval);

  return retval;
};

export default getERC20Allowance;
