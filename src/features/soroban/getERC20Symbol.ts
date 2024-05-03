import { Contract, SorobanRpc, scValToNative } from 'stellar-sdk';

import createTransaction from 'src/utils/soroban/baseTransaction';
import getConfigs from '../getConfigs';

export const getERC20Symbol = async (user: string, contract: Contract): Promise<string> => {
  const { sorobanServer: server } = getConfigs();

  const account = await server.getAccount(user);

  const call = contract.call('symbol');
  const transactionResult = createTransaction(account, call);

  const txSimulate = await server.simulateTransaction(transactionResult);

  const value = scValToNative(txSimulate.result.retval);

  return value.toString();
};

export default getERC20Symbol;
