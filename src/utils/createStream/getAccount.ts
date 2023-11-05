import getServer from './getServer';

const getAccount = async (address: string) => {
  return await getServer().getAccount(address);
};
export default getAccount;
