import { Horizon } from '@stellar/stellar-sdk';
import getServer from './soroban/getServer';

export type getAccountResult = Promise<Horizon.AccountResponse | null>;

const getAccount = async (publicKey: string, passPhrase: string) => {
  const { horizon: server } = getServer(passPhrase);
  try {
    const account = await server.loadAccount(publicKey);

    return account;
  } catch (error) {
    return null;
  }
};
export default getAccount;
