import { Address } from '@stellar/stellar-sdk';

import sorobanCall from './sorobanCall';

const getERC20Balance = async (contractAddress: string, passPhrase: string, user: string) => {
  const id = Address.fromString(user).toScVal();

  const retval = await sorobanCall<bigint>(user, passPhrase, contractAddress, 'balance', [id]);

  return retval.toString();
};

export default getERC20Balance;
