import { Contract, scValToNative } from '@stellar/stellar-sdk';

import getServer from 'src/utils/soroban/getServer';
import createTransaction from 'src/utils/soroban/baseTransaction';

export const getERC20Symbol = async (
  user: string,
  passPhrase: string,
  contract: Contract,
): Promise<string> => {
  const server = getServer(passPhrase);
  const account = await server.getAccount(user);

  const call = contract.call('symbol');
  const transactionResult = createTransaction(account, passPhrase, call);

  const txSimulate = await server.simulateTransaction(transactionResult);

  const value = scValToNative(txSimulate.result.retval);

  return value.toString();
};

export default getERC20Symbol;
