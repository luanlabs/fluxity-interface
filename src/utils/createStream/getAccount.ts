import getServer from './getSever';

const getAccount = async (address: string) => {
  return await getServer().getAccount(address);
};
export default getAccount;
