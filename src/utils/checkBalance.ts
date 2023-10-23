import BN from 'src/utils/BN';
import { userData } from 'src/containers/SummaryContainer/userData';

export const checkBalance = (token, totalAmount) => {
  const foundToken = userData.find(
    (balance) =>
      balance.asset_code === token.asset_code &&
      balance.asset_issuer === token.asset_issuer,
  );

  if (!foundToken) {
    return [false, 'Token was not found'];
  }

  if (totalAmount.isGreaterThan(new BN(foundToken.balance))) {
    return [false, 'The account balance is insufficient'];
  }

  return [true, ''];
};
