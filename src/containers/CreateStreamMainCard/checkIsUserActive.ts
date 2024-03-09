export type xlmAssetType = {
  asset_type?: string;
  balance?: string;
};

export const checkIsUserActive = (token: xlmAssetType) => {
  if (token.balance) {
    return true;
  }

  return false;
};

export const checkUserBalance = (token: xlmAssetType) => {
  if (Number(token.balance) < 2) {
    return false;
  }

  return true;
};
