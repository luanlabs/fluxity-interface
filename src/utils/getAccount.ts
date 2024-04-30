import { Horizon } from '@stellar/stellar-sdk';
import getServer from './soroban/getServer';

export type getAccountResult = Promise<Horizon.AccountResponse | null>;

const getAccount = async (publicKey: string, passPhrase: string) => {
  const server = getServer(passPhrase);
  try {
    const account = await server.getAccount(publicKey);

    return account;
  } catch (error) {
    return null;
  }
};
export default getAccount;
