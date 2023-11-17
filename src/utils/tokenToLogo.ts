import { IToken } from 'src/reducers/tokens';

const tokenToLogo = (token: IToken) => {
  const tokenName = token.symbol.toLowerCase();

  return tokenName;
};

export default tokenToLogo;
