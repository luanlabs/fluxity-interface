import BN from './BN';

const decimalToNumber = (amount: string, decimal: number): string => {
  const value = BN(Number(amount) / 10 ** decimal).toFixed(3);

  return value.toString();
};

export default decimalToNumber;
