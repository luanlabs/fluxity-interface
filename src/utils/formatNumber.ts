import BN from 'src/utils/BN';

export const formatNumber = (number: number | string) => {
  let formattedNumber = number;

  formattedNumber = new BN(number).toString();

  const formattedParts = formattedNumber.split('.');
  formattedParts[0] = formattedParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedParts.join('.');
};
