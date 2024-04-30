import { Contract, Address, scValToBigInt } from '@stellar/stellar-sdk';

import getServer from 'src/utils/soroban/getServer';
import createTransaction from 'src/utils/soroban/baseTransaction';

export const getERC20Balance = async (
  user: string,
  passPhrase: string,
  contract: Contract,
): Promise<string> => {
  const server = getServer(passPhrase);
  const account = await server.getAccount(user);

  const addressScVal = Address.fromString(user).toScVal();
  const call = contract.call('balance', addressScVal);
  const transactionResult = createTransaction(account, passPhrase, call);

  const txSimulate = await server.simulateTransaction(transactionResult);

  const value = scValToBigInt(txSimulate.result.retval);

  return value.toString();
};

export default getERC20Balance;
