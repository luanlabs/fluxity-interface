import sorobanCall from './sorobanCall';

const getERC20Symbol = async (contractAddress: string, passPhrase: string, user: string) => {
  const retval = await sorobanCall<string>(user, passPhrase, contractAddress, 'symbol');

  return retval;
};

export default getERC20Symbol;
