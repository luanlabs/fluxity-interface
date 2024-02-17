export type UserInfo = {
  asset_type?: string;
  balance?: string;
};

export const checkUserActived = (token: UserInfo) => {
  if (token.balance) {
    return true;
  }

  return false;
};

export const checkUserBalance = (token: UserInfo) => {
  if (Number(token.balance) < 3) {
    return false;
  }

  return true;
};
