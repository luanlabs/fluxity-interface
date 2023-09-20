export const formatNumber = (number: number | string) => {
  const parsedNumber = Number(number) / 1_000_000;
  const formattedNumber = parsedNumber
    .toFixed(3)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  return formattedNumber;
};
