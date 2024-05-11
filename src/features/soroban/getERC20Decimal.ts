import sorobanCall from './sorobanCall';

const getERC20Decimal = async (contractAddress: string, passPhrase: string, user: string) => {
  const retval = await sorobanCall<bigint>(user, passPhrase, contractAddress, 'decimals');

  return retval.toString();
};

export default getERC20Decimal;
