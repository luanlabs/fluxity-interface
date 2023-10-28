import { AccountResponse, Server } from 'stellar-sdk';

const server = new Server('https://horizon-futurenet.stellar.org');

export type getAccountResult = Promise<AccountResponse | null>;

const getAccount = async (publicKey: string) => {
  try {
    const account = await server.loadAccount(publicKey);

    return account;
  } catch (error) {
    return null;
  }
};
export default getAccount;
