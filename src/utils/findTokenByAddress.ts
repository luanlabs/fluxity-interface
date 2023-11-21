import { IToken } from 'src/reducers/tokens';

export const findTokenByAddress = (tokenAddress: string, tokens: IToken[]) => {
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].address === tokenAddress) {
      if (tokens[i].symbol === 'native') {
        return 'XLM';
      }
      return tokens[i].symbol;
    }
  }

  return '';
};
