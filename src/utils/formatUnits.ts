import BN from './BN';

export const formatUnits = (amount: string, decimals: number) => {
  const number = new BN(amount).div(10 ** decimals).toFixed(5);
  return number;
};
