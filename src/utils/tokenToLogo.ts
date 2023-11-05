import { IToken } from "src/reducers/tokens";

const tokenToLogo = (token: IToken) => {
  const tokenName = token.symbol.toLowerCase();

  return `../../../public/images/assets/${tokenName}.svg`;
};

export default tokenToLogo;
