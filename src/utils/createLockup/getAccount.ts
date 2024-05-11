import getServer from '../soroban/getServer';

const getAccount = async (address: string, passPhrase: string) => {
  return await getServer(passPhrase).getAccount(address);
};
export default getAccount;
