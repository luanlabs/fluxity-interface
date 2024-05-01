import { IToken } from 'src/reducers/tokens';
import getERC20Balance from './soroban/getERC20Balance';

const getTokenBalances = async (user: string, passPhrase: string, tokens: IToken[]) => {
  const newTokens = [];

  for (let i = 0; i < tokens.length; ++i) {
    const balance = await getERC20Balance(tokens[i].address, passPhrase, user);

    newTokens.push({
      ...tokens[i],
      balance,
    });
  }

  return newTokens;
};

export default getTokenBalances;
