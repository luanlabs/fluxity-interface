import { Contract } from '@stellar/stellar-sdk';
import { IToken } from 'src/reducers/tokens';
import getERC20Balance from './soroban/getERC20Balance';

const getTokenBalances = async (user: string, passPhrase: string, tokens: IToken[]) => {
  const newTokens = [];

  for (let i = 0; i < tokens.length; ++i) {
    const contract = new Contract(tokens[i].address);

    const balance = await getERC20Balance(user, passPhrase, contract);

    newTokens.push({
      ...tokens[i],
      balance,
    });
  }

  return newTokens;
};

export default getTokenBalances;
