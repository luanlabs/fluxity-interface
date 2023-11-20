import { Contract } from 'soroban-client';
import { IToken } from 'src/reducers/tokens';
import getERC20Balance from './soroban/getERC20Balance';

const getTokenBalances = async (user: string, tokens: IToken[]) => {
  const newTokens = [];

  for (let i = 0; i < tokens.length; ++i) {
    const contract = new Contract(tokens[i].address);

    const balance = await getERC20Balance(user, contract);

    newTokens.push({
      ...tokens[i],
      balance,
    });
  }

  return newTokens;
};

export default getTokenBalances;
