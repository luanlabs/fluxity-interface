import BN from 'src/utils/BN';

export type xlmAssetType = {
  asset_type?: string;
  balance?: string;
  buyingLiabilities?: string;
  sellingLiabilities?: string;
};

export const checkIsUserActive = (token: xlmAssetType) => {
  if (token.balance) {
    return true;
  }

  return false;
};

export const checkUserBalance = (token: xlmAssetType) => {
  let isXLMInsufficient;

  if (token.balance && token.sellingLiabilities && token.buyingLiabilities) {
    isXLMInsufficient = new BN(token.balance).minus(
      new BN(token.sellingLiabilities).plus(token.buyingLiabilities),
    );
  }

  if (isXLMInsufficient?.isLessThan(1.2)) {
    return false;
  }

  return true;
};
