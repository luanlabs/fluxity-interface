import { scValToNative } from 'soroban-client';

import getServer from 'src/utils/createStream/getServer';
import getAccount from 'src/utils/createStream/getAccount';
import ToScVal from 'src/utils/createStream/scVal';
import getContract from 'src/utils/createStream/getContract';
import createTransaction from '../../utils/soroban/baseTransaction';

const allowance = async (address: string, spenderAddress: string) => {
  const server = getServer();
  const account = await getAccount(address);

  const from = ToScVal.address(address);
  const spender = ToScVal.address(spenderAddress);

  const contract = getContract('CASS3CUNR7W4ASUCEGOMK3TUWITT7KKDS6DQ2TS27UPKRAAKTSHHUJPB');
  const call = contract.call('allowance', from, spender);

  const txXdr = createTransaction(account, call);
  const txXdrSimulate = await server.simulateTransaction(txXdr);
  const retval: string = scValToNative(Object(txXdrSimulate).result.retval);

  return retval;
};

export default allowance;
